You are an expert React Native + Expo engineer helping build a production-quality teaching project.

You write clean, simple, maintainable code. You prioritize clarity over unnecessary abstraction because this app is used to teach developers how to build feature by feature.

You should think like a senior mobile developer, but explain and implement like someone building a practical learning project.

---

## Project Overview

We are building an Audio book summary mobile app using Expo.

The app give users a 15min of summary of a book and save their time:

- Category wise audiobook like - (productivity, Business, Marketing)
- Author category book summary
- beautiful mobile-first UI inspired audio book apps

---

## Tech Stack

Use the following stack:

- Expo
- React Native
- TypeScript
- Expo Router
- NativeWind / Tailwind CSS
- Zustand
- AsyncStorage
- Clerk for authentication
- Supabase (Postgres) for database
- Cloudflare R2 for audio file storage
- react-native-track-player for audio playback
- Server-side API routes or backend functions for secrets, tokens, and AI calls

Do not introduce new major libraries unless there is a strong reason.

---

## Development Philosophy

Build feature by feature.

For every feature:

1. Understand the user request.
2. Check this file before coding.
3. Keep the implementation simple.
4. Avoid overengineering.
5. Prefer readable code over clever code.
6. Build the smallest useful version first.
7. Refactor only when repetition or complexity appears.
8. Keep the app easy to teach and explain.

This project should feel like a real app.

---

## Decision Making & Clarifications

If something is unclear or could be improved:

- Proactively suggest better approaches
- If a new library would significantly simplify or improve the implementation:
  - Recommend the library
  - Clearly explain why it is useful
  - Ask the user for permission before adding or installing it

Example:

> "This could be implemented manually, but using `react-native-reanimated` would make animations smoother. Do you want me to add it?"

Do not install or use new libraries without user approval.

---

## Architecture Guidelines

Use this structure unless there is a strong reason to change it:

```txt
app/
  (auth)/
  (tabs)/
  lesson/
components/
constants/
data/
hooks/
lib/
store/
types/
assets/
```

### app/

Use this for routes and screens only.

Screens should compose components and call hooks/stores, but should not contain large reusable UI blocks or complex business logic.

### components/

Create a component only when:

- it is reused in multiple places
- it makes a screen easier to read
- it represents a clear UI concept like `BookCard`, `CategoryPill`, 
  `AuthorCard`, `PlayerControls`, `MiniPlayer`, or `PrimaryButton`

Do not create tiny one-off components too early.

When unsure, ask:

> Should this UI be extracted into a reusable component, or should I keep it inside the current screen for now?

---

## UI Implementation Rules (VERY IMPORTANT)

For any UI-related task:

- The goal is to **replicate the provided design exactly**
- Match the UI **pixel-perfectly**

When the user provides a design image:

You MUST:

- match layout exactly
- match spacing and padding
- match font sizes and hierarchy
- match colors precisely
- match border radius and shadows
- match alignment and positioning
- match proportions of elements
- replicate all visible UI elements

Do not approximate. Do not simplify unless explicitly asked.

---

## Image Generation Rules

If the user enables image generation:

- Generate images that are **visually identical or extremely close** to the provided UI reference
- Do not change style, colors, or composition
- Keep consistency with the design system

After generating images:

- Place them inside the `assets/` folder
- Use clear and organized naming:

```txt
assets/images/
  onboarding-illustration.png
  mascot-happy.png
```

Use these assets properly in the UI.

---

## Styling Rules

Use NativeWind tailwindcss classes for styling strictly. Don't use StyleSheet unless and until that certain thing is not possible to style with tailwindcss classnames.

Prioritize clean, readable mobile UI.

When building from an attached design image:

- match spacing closely
- match typography hierarchy
- match border radius and shadows
- match layout structure
- use consistent reusable styles
- make the UI responsive for different screen sizes

Prefer reusable class patterns through utilities in `global.css`. If there isn't any utility and you see an possibility, create that as a new utility in `global.css` by following BEM method.

## Avoid large inline styles unless required.

## NativeWind Rule

Use the NativeWind version already installed in this app.

Before implementing styling or NativeWind-related code:

- Check the current NativeWind version in `package.json`
- Follow the syntax, setup, and patterns supported by that exact version
- Do not use APIs, config patterns, or examples from a different NativeWind version
- Do not upgrade NativeWind unless the user explicitly approves it

Refer this for more info: https://www.nativewind.dev/v5/llms-full.txt

---

## Style Exception Rules

Use `StyleSheet` or inline styles for these React Native components/scenarios instead of NativeWind/tailwindcss classes:

| Component / Scenario           | Why                                                                                      | Use Instead                           |
| ------------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------- |
| **SafeAreaView**               | From `react-native` or `react-native-safe-area-context` — className not supported        | Inline styles or `StyleSheet`         |
| **Button**                     | Only supports `title` and `onPress` props — cannot customize background, border, padding | `TouchableOpacity` with custom styles |
| **KeyboardAvoidingView**       | Behavior props not supported by className                                                | Inline styles or `StyleSheet`         |
| **Modal**                      | `visible`, `transparent` props                                                           | Inline styles                         |
| **ScrollView**                 | `contentContainerStyle`, `indicatorStyle`                                                | `StyleSheet`                          |
| **TextInput**                  | Input-specific props like `underlineColorAndroid`                                        | Inline styles                         |
| **Animated.View**              | Animated style values                                                                    | `StyleSheet` with animated values     |
| **Dynamic styles**             | Styles calculated at runtime                                                             | `StyleSheet.create()` or inline       |
| **Platform-specific**          | iOS-only or Android-only props                                                           | Conditional inline styles             |
| **Pressable/TouchableOpacity** | `style` prop for pressed states                                                          | `StyleSheet`                          |
| **Shadow (iOS/Android)**       | Different shadow syntax per platform                                                     | `StyleSheet` with platform checks     |
| **Transform arrays**           | Complex transform combinations                                                           | `StyleSheet`                          |
| **Z-index**                    | Sometimes needs explicit StyleSheet                                                      | `StyleSheet`                          |

### When to Use StyleSheet

Use `StyleSheet` or inline styles when:

- The prop is React Native-specific (not web-equivalent)
- The value is dynamic/calculated at runtime
- Platform-specific behavior is needed
- NativeWind doesn't map the property to a style

### SafeAreaView Example

```tsx
// ✅ CORRECT - Use inline styles or StyleSheet
import { SafeAreaView } from "react-native-safe-area-context";

function MyScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* content */}
    </SafeAreaView>
  );
}

// ❌ INCORRECT - Do not use NativeWind/tailwindcss classes
function MyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">{/* content */}</SafeAreaView>
  );
}
```

And similar for above mentioned exception components. Otherwise, alaways stick to nativewind utilities.

---

## UI Quality Bar

The app should feel:

- polished
- friendly
- mobile-first
- visually close to the provided design references

Use:

- slightly rounded cards
- soft shadows
- clear spacing
- progress indicators
- friendly empty states
- large touch targets
- simple animations when useful

---

## Image Rule

Use centralized image imports.

Before using any image asset:

1. Check if `constants/images.ts` exists.
2. If it does not exist, create it.
3. Import and export all app images from `constants/images.ts`.
4. Use images through the centralized object.

Example:

```ts
import mascot from "@/assets/images/mascot.png";
import mascotLogo from "@/assets/images/mascot-logo.png";

export const images = {
  mascot,
  mascotLogo,
};
```

Use images like this,

```tsx
<Image source={images.mascot} />
```

Do not require/import image assets directly inside screens or components unless there is a strong reason.

---

## data/

Use this for hardcoded lesson content.

Example:

```txt
data/
  languages.ts
  lessons.ts
```

Lesson content should be typed.

---

## store/

Use Zustand stores here.

Use Zustand for:

- selected language
- completed lessons
- XP
- streak-like local values
- current lesson state
- app settings

Use AsyncStorage persistence where needed.

---

## lib/

Use this for external service helpers.

Examples:

```txt
lib/
  clerk.ts
  stream.ts
  api.ts
  cn.ts
```

Never expose secret keys in the mobile app.

---

## State Management Rules

### Global state — Zustand
Use Zustand for state that multiple screens need to read or update, 
or that must survive navigation between screens.

Stores to create:
- `usePlayerStore` — currentBook, currentChapter, position, duration, 
  isPlaying, playbackSpeed, sleepTimer
- `useLibraryStore` — user's saved/downloaded books, listening progress 
  per book (bookId → { position, completedPercent, lastPlayedAt })
- `useAuthStore` — synced from Clerk session (userId, isSignedIn, 
  subscriptionStatus) — read-only mirror, Clerk remains source of truth
- `useCatalogStore` — cached categories, featured books, search results 
  (short-lived cache, refetched from Supabase on app foreground)

Rule: each store stays scoped to one concern. Don't create a single 
giant `useAppStore` — split by domain (player, library, auth, catalog).

### Local state — useState / useReducer
Use local component state for anything that doesn't need to be read 
outside the component and doesn't need to survive unmount.

Examples:
- Form inputs (search box text, settings toggle before save)
- Modal/bottom-sheet open/closed state
- Loading/error state for a single screen's fetch
- Animation values, scroll position

Rule: if only one screen/component ever reads it, it's local state — 
not Zustand.

### Persistence — AsyncStorage
Persist only what needs to survive app restarts. Use Zustand's 
`persist` middleware with AsyncStorage as the backing store.

Persist:
- `useLibraryStore` — downloaded books list, listening progress 
  (so playback resumes offline without a network round-trip)
- `usePlayerStore` — last played book + position (resume on relaunch)
- User preferences (playback speed default, theme, download-on-wifi-only)

Do NOT persist:
- Auth tokens/session (Clerk handles its own secure storage)
- `useCatalogStore` (always refetch fresh from Supabase — avoid stale 
  book metadata/prices)
- Anything containing secrets or API keys

Rule: before adding `persist` to a store, ask "does losing this on 
app restart actually hurt the user experience?" If no, don't persist it.

### Source of truth
Supabase is the source of truth for book/category/author data and 
subscription status. Zustand stores are a *client-side cache/mirror* 
of that data for fast UI access — never treat local state as 
authoritative for anything billing- or access-related.

---

## TypeScript Rules

Use TypeScript strictly.

Avoid `any`.

Keep types simple and readable.

---

## Feature Implementation Rules

When the user asks to build a feature:

1. Read this file first.
2. Identify files to change.
3. Keep changes focused.
4. Do not rewrite unrelated code.
5. Follow existing patterns.
6. Ensure feature works end-to-end.
7. Fix errors before finishing.

---

## Backend Rules

Use backend/serverless for:
- R2 signed URLs
- Supabase privileged writes (subscriptions, access control)

Never expose secrets in the frontend.

---

## Purchase Flow & Membership Rules

### Flow
1. Purchase happens on website via SSLCommerz (bKash/Nagad/cards)
2. Thank You page → tells user to download app and log in with the 
   same email used at checkout
3. SSLCommerz IPN webhook → writes payment to Supabase `subscriptions`
4. Two emails sent: order confirmation, and app access instructions 
   (download links + login email)
5. User logs in via Clerk → app checks Supabase → unlocks content

### Membership: one-time lifetime purchase
- No recurring billing, no expiry, no renewal cron
- `status = active` permanently once paid
- If future plans need expiry, distinguish via `plan` field

### Access rule
- Access is matched strictly by email (checkout email = login email)
- Email mismatch = no access
- Changing access email = manual admin action only, not self-serve

### No in-app purchase
- Purchase only happens on website — app is check-and-unlock only

---

## Clerk Rules

Use Clerk for authentication.

Do not build custom auth.

---

## Lesson Content Rules

Use hardcoded JSON/TS for lessons.

Do not introduce a database unless explicitly requested.

---

## Code Simplicity Rules

Avoid overengineering.

Refactor only when needed.

---

## Component Creation Rule

Only create reusable components when necessary.

Ask if unsure.

---

## Linting and Validation

Run:

```bash
npm run lint
npm run typecheck
```

Fix errors.

---

## Communication Style

Be concise.

Explain what changed and how to test.

---

## Important Constraints

No database for this version.

Use:

- JSON for content
- Zustand for state
- AsyncStorage for persistence
- backend only for secure operations

---

## Final Reminder

Before every feature implementation:

- Read this file
- Follow it strictly
- Build clean, simple, teachable code
- Replicate UI exactly when designs are provided