export function isObject(value: unknown): value is { [key: string]: unknown } {
  if (typeof value !== 'object') return false
  if (!value) return false

  return value.constructor === Object
}
