export function generateId(): string {
  // simple unique id based on timestamp and random suffix
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
