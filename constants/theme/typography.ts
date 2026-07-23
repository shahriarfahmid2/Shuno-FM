/**
 * Typography tokens from the Shuno FM Figma file ("Fonts" frame, node 2:365).
 * Mirrors the --font-* / --text-* variables in global.css — keep both in sync.
 *
 * Three typefaces:
 * - Aeonik          — English headings (Regular / Medium / Bold)
 * - Li Ador Noirrit  — Bangla headings (Regular / SemiBold / Bold)
 * - Kalpurush        — Bangla body text (Regular only)
 *
 * `fontFamily` values double as the keys used to register fonts with
 * `useFonts` in app/_layout.tsx — keep the two in sync.
 */
export const fontFamily = {
  aeonikRegular: "Aeonik-Regular",
  aeonikMedium: "Aeonik-Medium",
  aeonikBold: "Aeonik-Bold",
  liAdorRegular: "LiAdorNoirrit-Regular",
  liAdorSemiBold: "LiAdorNoirrit-SemiBold",
  liAdorBold: "LiAdorNoirrit-Bold",
  kalpurush: "Kalpurush-Regular",
} as const;

export type FontFamilyToken = keyof typeof fontFamily;

/**
 * Semantic type scale matching the named text styles in Figma
 * (Main Headline, 1st/2nd/3rd main, Sub headline). `lineHeight` here is a
 * ready-to-use RN pixel value (fontSize * Figma's line-height ratio).
 */
export const fontSize = {
  h1: { fontSize: 36, lineHeight: 45 }, // Main Headline
  h2: { fontSize: 28, lineHeight: 35 },
  h3: { fontSize: 24, lineHeight: 30 }, // 1st main
  h4: { fontSize: 18, lineHeight: 22 }, // 2nd main
  h5: { fontSize: 16, lineHeight: 19 }, // 3rd main
  body: { fontSize: 16, lineHeight: 23 }, // Sub headline / S-H Main (Kalpurush)
  caption: { fontSize: 13, lineHeight: 16 }, // Sub headline / S-H S-B (Kalpurush)
} as const;

export type FontSizeToken = keyof typeof fontSize;
