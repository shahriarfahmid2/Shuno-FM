# Fonts

The 7 files below are the ones actually loaded by `useFonts` in
[app/\_layout.tsx](../../app/_layout.tsx) and referenced by
`constants/theme/typography.ts` / `global.css`. Don't rename them without
updating both.

| File | Typeface | Weight | Used for |
| --- | --- | --- | --- |
| `Aeonik-Regular.ttf` | Aeonik | Regular | English body/headings |
| `Aeonik-Medium.ttf` | Aeonik | Medium | English headings |
| `Aeonik-Bold.ttf` | Aeonik | Bold | English headings |
| `LiAdorNoirrit-Regular.ttf` | Li Ador Noirrit | Regular | Bangla headings |
| `LiAdorNoirrit-SemiBold.ttf` | Li Ador Noirrit | SemiBold | Bangla headings |
| `LiAdorNoirrit-Bold.ttf` | Li Ador Noirrit | Bold | Bangla headings |
| `Kalpurush-Regular.ttf` | Kalpurush | Regular | Bangla body text |

The other `.ttf` files in this folder (Aeonik Air/Light/Black/Thin + italics,
`Aeonik_OVERVIEW-*`, Li Ador Noirrit ExtraLight/Light + italics) are unused
extra weights from the font package — kept for future use, not wired into
the type scale yet.

**iOS note:** iOS looks fonts up by their internal PostScript name, not the
filename. If a font silently fails to render on iOS only, rename its file to
match its own PostScript name and update the matching `--font-*` value in
[global.css](../../global.css) to the same string.
