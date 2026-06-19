export function extractEraYear(title: string): string {
  const match = title.match(/^(\d+)/);
  if (!match) return "";

  const num = match[1];
  if (num.length === 4) return num;
  return `19${num.padStart(2, "0")}`;
}
