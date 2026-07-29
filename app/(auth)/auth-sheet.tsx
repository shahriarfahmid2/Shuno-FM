import { images } from "@/constants/images";
import { useSignIn, useSignUp, useSSO } from "@clerk/expo";
import { Image } from "expo-image";
import { Href, router, Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// How dark the dimmed backdrop behind the sheet is — 0 is fully see-through, 1 is solid black.
const BACKDROP_OPACITY = 0.6;

// Format-only check (local-part@domain.tld) — deliberately doesn't restrict
// to specific providers, so work/organization domains keep working. It only
// catches malformed input (missing "@", no domain, no TLD); it can't tell a
// real domain from a made-up one — that would need a server-side lookup.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_FORMAT_ERROR = "সঠিক ইমেইল এড্রেস দিন";

type AuthMode = "login" | "signup" | "verify";
type VerifyContext = "login" | "signup";
type VerifyNotice = { type: "error" | "success"; text: string };

type LoginCardProps = {
  email: string;
  onChangeEmail: (value: string) => void;
  onSwitchToSignup: () => void;
  onSubmit: () => void;
  onGoogleSignIn: () => void;
  submitting: boolean;
  errorMessage?: string;
};

/** Figma "Frame 754" — login bottom sheet (node 6426:1311). */
function LoginCard({
  email,
  onChangeEmail,
  onSwitchToSignup,
  onSubmit,
  onGoogleSignIn,
  submitting,
  errorMessage,
}: LoginCardProps) {
  // Local, client-side format check — runs before onSubmit ever calls Clerk,
  // so a malformed email never reaches the "no account found" (server) path.
  const [emailFormatError, setEmailFormatError] = useState<string | undefined>(undefined);
  const displayError = emailFormatError ?? errorMessage;

  // Original Figma spacing has only a 15px gap between the email field and
  // the login button — no room for an error line. That gap only opens up
  // (pushing everything below it down by the same amount) when there's
  // actually an error to show; with no error the layout is back to exactly
  // as it was.
  const hasError = Boolean(displayError);
  const ERROR_GAP = 14;
  const shift = hasError ? ERROR_GAP : 0;

  const handleChangeEmail = (value: string) => {
    onChangeEmail(value);
    if (emailFormatError) {
      setEmailFormatError(undefined);
    }
  };

  const handleSubmitPress = () => {
    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailFormatError(EMAIL_FORMAT_ERROR);
      return;
    }
    setEmailFormatError(undefined);
    onSubmit();
  };

  return (
    <View
      style={{ width: 393, height: 424 + shift }}
      className="self-center overflow-hidden rounded-tl-[37px] rounded-tr-4xl bg-white"
    >
      <Text
        style={{ position: "absolute", left: 0, top: 38, width: "100%" }}
        className="text-center font-li-ador-semibold text-[28px] leading-[36.4px] text-black"
      >
        লগিন
      </Text>

      <TextInput
        value={email}
        onChangeText={handleChangeEmail}
        placeholder="Email Address"
        placeholderTextColor="#9b9b9b"
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          position: "absolute",
          left: 24,
          top: 91,
          width: 346,
          height: 49,
          paddingHorizontal: 24,
          textAlignVertical: "center",
        }}
        className="rounded-full border-[1.2px] border-[#dbdbdb] bg-white font-aeonik-regular text-[15px] text-black"
      />

      {displayError ? (
        <Text
          style={{ position: "absolute", left: 30, top: 144, width: 342 }}
          className="text-left font-kalpurush text-[12px] leading-[16px] text-[#d32f2f]"
        >
          {displayError}
        </Text>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleSubmitPress}
        disabled={submitting || !email}
        style={{ position: "absolute", left: 24, top: 155 + shift, width: 346, height: 61 }}
        className="items-center justify-center rounded-full border border-[#dbdbdb] bg-black"
      >
        <Text className="font-li-ador-regular text-[18px] leading-[18.9px] text-[#f5f5f5]">
          {submitting ? "..." : "লগিন করুন"}
        </Text>
      </TouchableOpacity>

      <Text
        style={{ position: "absolute", left: 79, top: 230 + shift, width: 236 }}
        className="text-center font-aeonik-regular text-[16px] leading-[22.56px] text-[#6d6d6d]"
      >
        Or
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onGoogleSignIn}
        style={{ position: "absolute", left: 24, top: 266 + shift, width: 346, height: 53 }}
        className="flex-row items-center justify-center gap-2 rounded-full border-[1.2px] border-[#dbdbdb] bg-white"
      >
        <Image source={images.onboardingGmailIcon} style={{ width: 20, height: 20 }} contentFit="contain" />
        <Text className="font-aeonik-medium text-[16px] leading-[19.2px] text-black">Continue with google</Text>
      </TouchableOpacity>

      <Text
        style={{ position: "absolute", left: 79, top: 338 + shift, width: 236 }}
        className="text-center font-kalpurush text-[16px] leading-[22.56px] text-black"
      >
        একাউন্ট নেই?{" "}
        <Text className="underline" onPress={onSwitchToSignup}>
          ক্রিয়েট করুন
        </Text>
      </Text>
    </View>
  );
}

type SignupCardProps = {
  firstName: string;
  lastName: string;
  email: string;
  onChangeFirstName: (value: string) => void;
  onChangeLastName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onSwitchToLogin: () => void;
  onSubmit: () => void;
  onGoogleSignIn: () => void;
  submitting: boolean;
  errorMessage?: string;
};

type SignupValidation = { firstName?: string; lastName?: string; email?: string };

/** Figma "Frame 751" — email sign-up bottom sheet (node 6426:1244). */
function SignupCard({
  firstName,
  lastName,
  email,
  onChangeFirstName,
  onChangeLastName,
  onChangeEmail,
  onSwitchToLogin,
  onSubmit,
  onGoogleSignIn,
  submitting,
  errorMessage,
}: SignupCardProps) {
  // Client-side, on-submit validation for all three fields. Kept local (not
  // lifted to AuthSheetScreen) since it's pure presentation/validation that
  // never needs to leave this card — only a fully-valid submit calls
  // onSubmit, so Clerk's API is never hit with empty names or a malformed
  // email.
  const [validation, setValidation] = useState<SignupValidation>({});
  const emailError = validation.email ?? errorMessage;

  // Two independent gaps stack on top of each other: one opens up under the
  // name row when either name is missing, the other under the email field
  // when the email is missing/invalid/already-registered — same "shift only
  // when there's something to show" pattern as LoginCard.
  const NAME_ERROR_GAP = 20;
  const EMAIL_ERROR_GAP = 14;
  const nameShift = validation.firstName || validation.lastName ? NAME_ERROR_GAP : 0;
  const emailShift = emailError ? EMAIL_ERROR_GAP : 0;
  const shift = nameShift + emailShift;

  const handleChangeFirstName = (value: string) => {
    onChangeFirstName(value);
    if (validation.firstName) {
      setValidation((prev) => ({ ...prev, firstName: undefined }));
    }
  };

  const handleChangeLastName = (value: string) => {
    onChangeLastName(value);
    if (validation.lastName) {
      setValidation((prev) => ({ ...prev, lastName: undefined }));
    }
  };

  const handleChangeEmail = (value: string) => {
    onChangeEmail(value);
    if (validation.email) {
      setValidation((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleSubmitPress = () => {
    const nextValidation: SignupValidation = {};
    if (!firstName.trim()) {
      nextValidation.firstName = "নামের প্রথম অংশ লিখুন";
    }
    if (!lastName.trim()) {
      nextValidation.lastName = "নামের শেষ অংশ লিখুন";
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      nextValidation.email = EMAIL_FORMAT_ERROR;
    }
    setValidation(nextValidation);
    if (nextValidation.firstName || nextValidation.lastName || nextValidation.email) {
      return;
    }
    onSubmit();
  };

  return (
    <View
      style={{ width: 393, height: 496 + shift }}
      className="self-center overflow-hidden rounded-tl-[37px] rounded-tr-4xl bg-white"
    >
      <Text
        style={{ position: "absolute", left: 0, top: 36, width: "100%" }}
        className="text-center font-li-ador-semibold text-[28px] leading-[36.4px] text-black"
      >
        সাইন আপ
      </Text>

      <TextInput
        value={firstName}
        onChangeText={handleChangeFirstName}
        placeholder="First name"
        placeholderTextColor="#9b9b9b"
        style={{
          position: "absolute",
          left: 24,
          top: 97,
          width: 167,
          height: 49,
          paddingHorizontal: 24,
          textAlignVertical: "center",
        }}
        className="rounded-full border-[1.2px] border-[#dbdbdb] bg-white font-aeonik-regular text-[15px] text-black"
      />
      <TextInput
        value={lastName}
        onChangeText={handleChangeLastName}
        placeholder="Last name"
        placeholderTextColor="#9b9b9b"
        style={{
          position: "absolute",
          left: 202,
          top: 96,
          width: 168,
          height: 49,
          paddingHorizontal: 24,
          textAlignVertical: "center",
        }}
        className="rounded-full border-[1.2px] border-[#dbdbdb] bg-white font-aeonik-regular text-[15px] text-black"
      />

      {validation.firstName ? (
        <Text
          style={{ position: "absolute", left: 30, top: 150, width: 158 }}
          className="text-left font-kalpurush text-[12px] leading-[16px] text-[#d32f2f]"
        >
          {validation.firstName}
        </Text>
      ) : null}
      {validation.lastName ? (
        <Text
          style={{ position: "absolute", left: 208, top: 150, width: 160 }}
          className="text-left font-kalpurush text-[12px] leading-[16px] text-[#d32f2f]"
        >
          {validation.lastName}
        </Text>
      ) : null}

      <TextInput
        value={email}
        onChangeText={handleChangeEmail}
        placeholder="Email Address"
        placeholderTextColor="#9b9b9b"
        keyboardType="email-address"
        autoCapitalize="none"
        style={{
          position: "absolute",
          left: 24,
          top: 159 + nameShift,
          width: 346,
          height: 49,
          paddingHorizontal: 24,
          textAlignVertical: "center",
        }}
        className="rounded-full border-[1.2px] border-[#dbdbdb] bg-white font-aeonik-regular text-[15px] text-black"
      />

      {emailError ? (
        <Text
          style={{ position: "absolute", left: 30, top: 212 + nameShift, width: 342 }}
          className="text-left font-kalpurush text-[12px] leading-[16px] text-[#d32f2f]"
        >
          {emailError}
        </Text>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleSubmitPress}
        disabled={submitting}
        style={{ position: "absolute", left: 24, top: 227 + shift, width: 346, height: 59 }}
        className="items-center justify-center rounded-full bg-black"
      >
        <Text className="font-li-ador-regular text-[18px] leading-[18.9px] text-[#f5f5f5]">
          {submitting ? "..." : "একাউন্ট ক্রিয়েট করুন"}
        </Text>
      </TouchableOpacity>

      <Text
        style={{ position: "absolute", left: 79, top: 302 + shift, width: 236 }}
        className="text-center font-aeonik-regular text-[16px] leading-[22.56px] text-[#6d6d6d]"
      >
        Or
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onGoogleSignIn}
        style={{ position: "absolute", left: 24, top: 338 + shift, width: 346, height: 53 }}
        className="flex-row items-center justify-center gap-2 rounded-full border-[1.2px] border-[#dbdbdb] bg-white"
      >
        <Image source={images.onboardingGmailIcon} style={{ width: 20, height: 20 }} contentFit="contain" />
        <Text className="font-aeonik-medium text-[16px] leading-[19.2px] text-black">Continue with google</Text>
      </TouchableOpacity>

      <Text
        style={{ position: "absolute", left: 79, top: 410 + shift, width: 236 }}
        className="text-center font-kalpurush text-[16px] leading-[22.56px] text-black"
      >
        অলরেডি একাউন্ট আছে?{" "}
        <Text className="underline" onPress={onSwitchToLogin}>
          লগিন করুন
        </Text>
      </Text>

      {/* Clerk's bot-protection widget mounts here — required on any screen
          that can create a sign-up (sign_up.captcha_enabled is on for this
          instance). Invisible unless a challenge is actually triggered. */}
      <View nativeID="clerk-captcha" />
    </View>
  );
}

type VerifyCardProps = {
  email: string;
  code: string;
  onChangeCode: (value: string) => void;
  onSubmit: () => void;
  onResend: () => void;
  onBack: () => void;
  submitting: boolean;
  notice?: VerifyNotice | null;
};

/** New card (no Figma source) — email verification code step, styled to
 * match LoginCard/SignupCard so it reads as part of the same sheet. */
function VerifyCard({ email, code, onChangeCode, onSubmit, onResend, onBack, submitting, notice }: VerifyCardProps) {
  return (
    <View
      style={{ width: 393, height: 400 }}
      className="self-center overflow-hidden rounded-tl-[37px] rounded-tr-4xl bg-white"
    >
      <Text
        style={{ position: "absolute", left: 0, top: 38, width: "100%" }}
        className="text-center font-li-ador-semibold text-[28px] leading-[36.4px] text-black"
      >
        OTP ভেরিফাই করুন
      </Text>

      <Text
        style={{ position: "absolute", left: 40, top: 86, width: 313 }}
        className="text-center font-kalpurush text-[13px] leading-[19.6px] text-[#6d6d6d]"
      >
        {email} ইমেইলে পাঠানো কোডটি লিখুন
      </Text>

      <TextInput
        value={code}
        onChangeText={onChangeCode}
        placeholder="Verification code"
        placeholderTextColor="#9b9b9b"
        keyboardType="number-pad"
        maxLength={6}
        style={{
          position: "absolute",
          left: 24,
          top: 125,
          width: 346,
          height: 49,
          paddingHorizontal: 24,
          textAlign: "center",
          textAlignVertical: "center",
        }}
        className="rounded-full border-[1.2px] border-[#dbdbdb] bg-white font-aeonik-regular text-[18px] text-black"
      />

      {/* Resend link (left) and wrong-code error (right) share one row
          directly under the code field, mirroring how LoginCard/SignupCard
          surface their field-level errors. */}
      <Text
        style={{ position: "absolute", left: 30, top: 185, width: 200 }}
        className="text-left font-kalpurush text-[13px] leading-[19.6px] text-black"
      >
        কোড পাননি?{" "}
        <Text className="underline" onPress={onResend}>
          আবার পাঠান
        </Text>
      </Text>

      {notice ? (
        <Text
          style={{ position: "absolute", right: 29, top: 185, width: 170 }}
          className={`text-right font-kalpurush text-[12px] leading-[16px] ${
            notice.type === "error" ? "text-[#d32f2f]" : "text-[#2e7d32]"
          }`}
        >
          {notice.text}
        </Text>
      ) : null}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onSubmit}
        disabled={submitting || !code}
        style={{ position: "absolute", left: 24, top: 215, width: 346, height: 61 }}
        className="items-center justify-center rounded-full bg-black"
      >
        <Text className="font-li-ador-regular text-[18px] leading-[18.9px] text-[#f5f5f5]">
          {submitting ? "..." : "ভেরিফাই করুন"}
        </Text>
      </TouchableOpacity>

      <Text
        style={{ position: "absolute", left: 40, top: 300, width: 313 }}
        className="text-center font-kalpurush text-[14px] leading-4.5 text-[#6d6d6d]"
      >
        <Text className="underline" onPress={onBack}>
          ইমেইল পরিবর্তন করুন
        </Text>
      </Text>
    </View>
  );
}

/**
 * Combined login / email sign-up / verify-code bottom sheet. Switching
 * between the forms flips local `mode` state instead of navigating to a new
 * screen, so switching back and forth doesn't grow the navigation
 * back-stack (every caller pushes this single route once; `mode` param
 * only picks which form shows first).
 */
export default function AuthSheetScreen() {
  // "verify" is a dev-only shortcut (?mode=verify) for jumping straight to
  // the OTP card while styling it — see AGENTS.md-adjacent note below. Not
  // reachable from any in-app button; those only ever pass "login"/"signup".
  const { mode: initialMode } = useLocalSearchParams<{ mode?: "login" | "signup" | "verify" }>();
  const [mode, setMode] = useState<AuthMode>(
    initialMode === "signup" || initialMode === "verify" ? initialMode : "login",
  );
  const [verifyContext, setVerifyContext] = useState<VerifyContext>("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [verifyEmail, setVerifyEmail] = useState(initialMode === "verify" ? "preview@example.com" : "");
  const [code, setCode] = useState("");
  const [verifyNotice, setVerifyNotice] = useState<VerifyNotice | null>(null);
  const [ssoLoading, setSsoLoading] = useState(false);

  const { signIn, errors: signInErrors, fetchStatus: signInFetchStatus } = useSignIn();
  const { signUp, errors: signUpErrors, fetchStatus: signUpFetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();
  const navigation = useNavigation();

  // signIn/signUp are shared Clerk client state, not local component state —
  // a failed attempt (and its errors) would otherwise still be sitting there
  // the next time this screen mounts, even after navigating away entirely.
  // Resetting on unmount covers every way this screen can close: backdrop
  // tap, hardware/gesture back, or navigating to another route.
  const signInRef = useRef(signIn);
  signInRef.current = signIn;
  const signUpRef = useRef(signUp);
  signUpRef.current = signUp;
  const verifyNoticeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      void signInRef.current.reset();
      void signUpRef.current.reset();
      if (verifyNoticeTimeoutRef.current) {
        clearTimeout(verifyNoticeTimeoutRef.current);
      }
    };
  }, []);

  const handleLoginSubmit = async () => {
    const { error } = await signIn.emailCode.sendCode({ emailAddress: loginEmail });
    if (error) {
      return;
    }
    setVerifyEmail(loginEmail);
    setVerifyContext("login");
    setCode("");
    setVerifyNotice(null);
    setMode("verify");
  };

  const handleSignupSubmit = async () => {
    const { error } = await signUp.create({
      emailAddress: signupEmail,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
    });
    if (error) {
      return;
    }
    await signUp.verifications.sendEmailCode();
    setVerifyEmail(signupEmail);
    setVerifyContext("signup");
    setCode("");
    setVerifyNotice(null);
    setMode("verify");
  };

  const handleVerifySubmit = async () => {
    setVerifyNotice(null);
    if (verifyContext === "login") {
      const { error } = await signIn.emailCode.verifyCode({ code });
      if (error) {
        setVerifyNotice({ type: "error", text: "ভুল ওটিপি" });
        return;
      }
      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              return;
            }
            const url = decorateUrl("/home");
            if (url.startsWith("http")) {
              if (typeof window !== "undefined") window.location.href = url;
            } else {
              router.replace(url as Href);
            }
          },
        });
      }
    } else {
      const { error } = await signUp.verifications.verifyEmailCode({ code });
      if (error) {
        setVerifyNotice({ type: "error", text: "ভুল ওটিপি" });
        return;
      }
      if (signUp.status === "complete") {
        await signUp.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              return;
            }
            const url = decorateUrl("/home");
            if (url.startsWith("http")) {
              if (typeof window !== "undefined") window.location.href = url;
            } else {
              router.replace(url as Href);
            }
          },
        });
      }
    }
  };

  const handleResendCode = async () => {
    const { error } =
      verifyContext === "login"
        ? await signIn.emailCode.sendCode()
        : await signUp.verifications.sendEmailCode();

    if (verifyNoticeTimeoutRef.current) {
      clearTimeout(verifyNoticeTimeoutRef.current);
      verifyNoticeTimeoutRef.current = null;
    }

    if (error) {
      setVerifyNotice(null);
      return;
    }

    setVerifyNotice({ type: "success", text: "নতুন OTP পাঠানো হয়েছে" });
    verifyNoticeTimeoutRef.current = setTimeout(() => {
      // Functional update guards against clearing a newer notice (e.g. a
      // wrong-code error) that may have replaced this one before the
      // timer fired.
      setVerifyNotice((current) => (current?.type === "success" ? null : current));
      verifyNoticeTimeoutRef.current = null;
    }, 6000);
  };

  const handleBackFromVerify = useCallback(() => {
    setMode(verifyContext === "signup" ? "signup" : "login");
    setCode("");
    setVerifyNotice(null);
  }, [verifyContext]);

  // On the OTP step, the phone's hardware back button / swipe-back gesture
  // sends the user to login/signup instead of leaving the sheet. A
  // successful verify also removes this screen (router.replace("/home") in
  // finalize's navigate callback) which fires this same "beforeRemove" event
  // — only GO_BACK/POP are actual back-navigation, so REPLACE must be let
  // through or a correct code would get bounced back to login/signup instead
  // of reaching /home.
  useEffect(() => {
    return navigation.addListener("beforeRemove", (e) => {
      if (mode !== "verify") {
        return;
      }
      if (e.data.action.type !== "GO_BACK" && e.data.action.type !== "POP") {
        return;
      }
      e.preventDefault();
      handleBackFromVerify();
    });
  }, [navigation, mode, handleBackFromVerify]);

  const handleGoogleSignIn = async () => {
    setSsoLoading(true);
    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" });
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/home");
      }
      // No createdSessionId means the user cancelled — nothing to do.
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setSsoLoading(false);
    }
  };

  // The navigator's own "slide_from_bottom" screen animation moved the whole
  // screen — backdrop included — as one rigid unit, which read as the dark
  // tint sliding up rather than fading in behind the sheet. The navigator
  // animation is turned off (animation: "none" below) and replaced with
  // these two independent values instead: the backdrop fades in on its own
  // while the card keeps its slide-up motion.
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const cardTranslateY = useRef(new Animated.Value(Dimensions.get("window").height)).current;

  useEffect(() => {
    Animated.timing(backdropOpacity, {
      toValue: BACKDROP_OPACITY,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(cardTranslateY, {
      toValue: 0,
      duration: 320,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [backdropOpacity, cardTranslateY]);

  // KeyboardAvoidingView's Android "height" behavior resizes this whole
  // screen's container while the keyboard is open, but on some devices
  // (edge-to-edge display, this screen being a transparentModal) it doesn't
  // reliably restore that height once the keyboard closes — the card stays
  // shifted up, leaving a black gap at the bottom where the backdrop no
  // longer reaches the true screen edge. Tracking the keyboard manually and
  // only padding the card's own positioner (never the backdrop, which is a
  // separate always-full-screen sibling below) sidesteps that restore bug.
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, (event) => {
      Animated.timing(keyboardOffset, {
        toValue: event.endCoordinates.height,
        duration: event.duration || 250,
        useNativeDriver: false,
      }).start();
    });
    const hideSub = Keyboard.addListener(hideEvent, (event) => {
      Animated.timing(keyboardOffset, {
        toValue: 0,
        duration: event.duration || 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [keyboardOffset]);

  return (
    <View style={{ flex: 1 }}>
      {/* contentStyle overrides the root Stack's opaque black background
          (app/_layout.tsx) — without this, the screen behind can never show
          through no matter what opacity the backdrop above has. */}
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "none",
          contentStyle: { backgroundColor: "transparent" },
        }}
      />

      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#000000",
          opacity: backdropOpacity,
        }}
      />

      {/* No-op on the OTP step — the dimmed backdrop still blocks touches
          from reaching whatever's behind the sheet, but tapping it does
          nothing; only the phone's back button/gesture leaves this step. */}
      <Pressable
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        onPress={() => {
          if (mode !== "verify") {
            router.back();
          }
        }}
      />

      {/* box-none so the empty space above the card (this View spans the
          full screen because of flex: 1) doesn't swallow taps meant for the
          backdrop Pressable behind it — only the card itself should
          intercept touches. */}
      <Animated.View
        pointerEvents="box-none"
        style={{ flex: 1, justifyContent: "flex-end", paddingBottom: keyboardOffset }}
      >
        <Animated.View style={{ transform: [{ translateY: cardTranslateY }] }}>
          {mode === "login" ? (
            <LoginCard
              email={loginEmail}
              onChangeEmail={setLoginEmail}
              onSwitchToSignup={() => setMode("signup")}
              onSubmit={handleLoginSubmit}
              onGoogleSignIn={handleGoogleSignIn}
              submitting={signInFetchStatus === "fetching" || ssoLoading}
              errorMessage={signInErrors.fields.identifier ? "কোন একাউন্ট খুজে পাওয়া যায়নি" : undefined}
            />
          ) : mode === "signup" ? (
            <SignupCard
              firstName={firstName}
              lastName={lastName}
              email={signupEmail}
              onChangeFirstName={setFirstName}
              onChangeLastName={setLastName}
              onChangeEmail={setSignupEmail}
              onSwitchToLogin={() => setMode("login")}
              onSubmit={handleSignupSubmit}
              onGoogleSignIn={handleGoogleSignIn}
              submitting={signUpFetchStatus === "fetching" || ssoLoading}
              errorMessage={signUpErrors.fields.emailAddress ? "অলরেডি একাউন্ট আছে, লগিন করুন" : undefined}
            />
          ) : (
            <VerifyCard
              email={verifyEmail}
              code={code}
              onChangeCode={setCode}
              onSubmit={handleVerifySubmit}
              onResend={handleResendCode}
              onBack={handleBackFromVerify}
              submitting={
                verifyContext === "login"
                  ? signInFetchStatus === "fetching"
                  : signUpFetchStatus === "fetching"
              }
              notice={verifyNotice}
            />
          )}
        </Animated.View>
      </Animated.View>
    </View>
  );
}
