/**
 * Color tokens from the Shuno FM Figma file (Primary color, Menu, Frame frames).
 * Mirrors the --color-* variables in global.css — keep both in sync.
 */
export const colors = {
  primary: "#e04242",
  accent: "#ff2e2e",
  white: "#ffffff",
  black: "#000000",
  ink: "#000000",
  inkSecondary: "#393939",
  inkTertiary: "#4e4e4e",
  muted: "#797979",
  mutedInverse: "#ececec",
} as const;

export type ColorToken = keyof typeof colors;
