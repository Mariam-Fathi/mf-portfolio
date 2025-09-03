import { useEffect } from "react";

/**
 * Detect clicks outside of a given ref element and run a callback.
 *
 * @param ref - A React ref pointing to the element to detect outside clicks for.
 * @param callback - A function called when a click/touch is detected outside.
 */
export const useOutsideClick = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
