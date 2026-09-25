export function fit(text: string): string {
  const longest = Math.max(
    1,
    ...text.split(/\s+/).map(word => [...word].length),
  );
  return `--chars:${longest}`;
}
