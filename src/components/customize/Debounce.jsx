// Debounce.js
import { useEffect, useRef } from 'react';

/**
 * Custom hook for debouncing any fast-changing value.
 * @param {Function} callback - Function to run after delay
 * @param {Array} deps - Dependencies to watch
 * @param {number} delay 
 */
export default function useDebounce(callback, deps, delay = 500) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [...deps]);
}