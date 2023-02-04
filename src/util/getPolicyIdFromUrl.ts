export function getPolicyIdFromUrl(url: string): string {
  const after = 'policies/';
  const index = url.indexOf(after);
  const length = after.length;
  return url.slice(index + length);
}
