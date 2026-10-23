export type EventMap = Record<string, Record<string, unknown>>;

/**
 * Lightweight no-op analytics helper matching akoder.xyz's trackEvent signature.
 */
export function trackEvent<K extends string>(
  eventName: K,
  properties?: Record<string, unknown>,
): void {
  void eventName;
  void properties;
}
