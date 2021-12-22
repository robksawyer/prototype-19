/**
 * @file useIsoLayoutEffect.js
 * Hook to suppress useLayoutEffect error on SSR.
 */

import { useLayoutEffect, useEffect } from 'react';

const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export { useIsoLayoutEffect as useLayoutEffect };
