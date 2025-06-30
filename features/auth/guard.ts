export function login(password: string): boolean {
  return password === process.env.SESSION_SECRET;
}
