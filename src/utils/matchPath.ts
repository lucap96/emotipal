export function matchPath(pattern: string, path: string): boolean {
  const regex = new RegExp(`^${pattern.replace(/:\w+/g, '[^/]+')}$`);
  return regex.test(path);
}
