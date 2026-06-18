export interface LiveVideo {
  videoId: string | null;
  title: string;
  channel: string;
  thumbnail: string | null;
}

export interface LiveResponse {
  live: LiveVideo[];
}
