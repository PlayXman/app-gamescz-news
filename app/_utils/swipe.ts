/**
 * The app runs on device supporting touch inputs.
 */
export function isTouchDevice(): boolean {
  return window != null && 'ontouchstart' in window;
}
