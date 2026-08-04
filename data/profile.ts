import { images } from "@/constants/images";

export type ProfileStat = { id: string; value: string; label: string };

/** "Stats Wrap" cards (Figma node 6621:7868). */
export const profileStats: ProfileStat[] = [
  { id: "listened", value: "128h", label: "Listened" },
  { id: "finished", value: "24", label: "Finished" },
  { id: "in-progress", value: "12", label: "In Progress" },
  { id: "saved", value: "12", label: "Saved" },
];

/**
 * Mocked profile — Clerk owns the real user identity, but sign-in isn't
 * wired to this screen yet (same "deliberately deferred" approach as
 * data/settings.ts's mockSubscription). Swap for `useUser()` from
 * `@clerk/expo` once real accounts are ready.
 */
export const mockProfile = {
  firstName: "Fahmid",
  lastName: "Hasan",
  email: "fahmid.hasan@gmail.com",
  memberSince: "Member since Jan 2025",
  avatar: images.profileAvatar,
};
