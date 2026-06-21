import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Resend } from 'resend';
import { User } from '../../auth/entities/user.entity';

export interface LiveVideo {
  videoId: string;
  title: string;
  channel: string;
  thumbnail: string | null;
}

interface YouTubeSearchItem {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails?: { high?: { url: string } };
  };
}

interface YouTubeSearchResponse {
  items?: YouTubeSearchItem[];
}

@Injectable()
export class LiveService {
  private readonly logger = new Logger(LiveService.name);
  private readonly resend = new Resend(process.env.RESEND_API_KEY);
  private liveNotifiedAt: number | null = null;
  private cache: { data: { live: LiveVideo[] }; cachedAt: number } | null =
    null;
  private readonly CACHE_TTL_LIVE = 5 * 60 * 1000;
  private readonly CACHE_TTL_IDLE = 60 * 1000;

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async getLive(): Promise<{ live: LiveVideo[] }> {
    if (this.cache) {
      const age = Date.now() - this.cache.cachedAt;
      const hasLive = this.cache.data.live.length > 0;
      const ttl = hasLive ? this.CACHE_TTL_LIVE : this.CACHE_TTL_IDLE;

      if (age < ttl) {
        return this.cache.data;
      }
    }

    try {
      const apiKey = process.env.YOUTUBE_API_KEY;
      const query = encodeURIComponent('დინამო თბილისი OR Dinamo tbilisi');
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&eventType=live&key=${apiKey}&maxResults=5`;
      const { data } = await axios.get<YouTubeSearchResponse>(url);

      const videos: LiveVideo[] = (data.items ?? []).map((item) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails?.high?.url ?? null,
      }));

      const result = { live: videos };
      this.cache = { data: result, cachedAt: Date.now() };
      return result;
    } catch (err) {
      this.logger.error(
        'getLive error:',
        err instanceof Error ? err.message : err,
      );
      return this.cache?.data ?? { live: [] };
    }
  }

  async checkAndNotifyLive(): Promise<void> {
    try {
      const result = await this.getLive();
      const isLive = result.live.some((v) => v.videoId);
      if (!isLive) {
        this.liveNotifiedAt = null;
        return;
      }
      if (
        this.liveNotifiedAt &&
        Date.now() - this.liveNotifiedAt < 60 * 60 * 1000
      )
        return;

      this.liveNotifiedAt = Date.now();
      this.logger.log('Live started — sending notifications');

      const users = await this.userRepo.find({
        select: { email: true, name: true },
      });
      await Promise.all(
        users.map((user) =>
          this.resend.emails.send({
            from: 'onboarding@resend.dev',
            to: user.email,
            subject: 'დინამო თბილისის მატჩი დაიწყო!',
            html: `
              <div style="font-family:sans-serif;max-width:500px;margin:0 auto">
                <h2 style="color:#ef4444">პირდაპირი ტრანსლაცია დაიწყო!</h2>
                <p>გამარჯობა ${user.name},</p>
                <p>დინამო თბილისის მატჩი ახლა მიმდინარეობს!</p>
                <a href="https://dinamotb.fly.dev/live" style="display:inline-block;background:#ef4444;color:white;padding:12px 24px;text-decoration:none;font-weight:bold;margin-top:16px">
                  ყურება
                </a>
              </div>
            `,
          }),
        ),
      );
    } catch (err) {
      this.logger.error('Live notification error:', err);
    }
  }
}
