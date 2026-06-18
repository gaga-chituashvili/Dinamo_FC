export function formatTimeAgo(dateStr: string): string | null {
  if (!dateStr) return null;

  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;

  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "ახლახან";
  if (diffHours < 24) return `${diffHours} საათის წინ`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} დღის წინ`;
}
