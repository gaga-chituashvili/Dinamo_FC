import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

interface FcDinamoLogo {
  id: number;
  image: string;
  url: string;
  order: number;
  isHead: boolean;
  first: boolean;
}

export interface SponsorDto {
  id: number;
  name: string;
  logoUrl: string;
  websiteUrl: string;
}

@Injectable()
export class SponsorsService {
  private readonly logger = new Logger(SponsorsService.name);
  private cache: { data: SponsorDto[]; cachedAt: number } | null = null;
  private readonly CACHE_TTL = 60 * 60 * 1000; // 1 hour

  async findAll(): Promise<SponsorDto[]> {
    if (this.cache && Date.now() - this.cache.cachedAt < this.CACHE_TTL) {
      return this.cache.data;
    }

    try {
      const { data } = await axios.get<FcDinamoLogo[]>(
        'https://fcdinamo.ge/api/footer-logos/',
      );

      const sponsors: SponsorDto[] = data.map((item) => ({
        id: item.id,
        name: item.url,
        logoUrl: item.image,
        websiteUrl: item.url,
      }));

      this.cache = { data: sponsors, cachedAt: Date.now() };
      return sponsors;
    } catch (err) {
      this.logger.error('Failed to fetch sponsors:', err);
      return this.cache?.data ?? [];
    }
  }
}
