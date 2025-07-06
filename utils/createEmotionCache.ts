// utils/createEmotionCache.ts

import createCache from '@emotion/cache';

/**
 * Creates an Emotion cache for consistent styling with MUI + Emotion.
 * Uses 'prepend: true' to ensure MUI styles are loaded first, allowing custom styles to override.
 *
 * @returns Emotion Cache
 */
export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
