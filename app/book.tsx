import { BookCover } from "@/components/BookCover";
import { PlayButton } from "@/components/PlayButton";
import { getAuthor } from "@/data/author";
import { getBook } from "@/data/book";
import { useLibraryStore } from "@/store/useLibraryStore";
import { Image } from "expo-image";
import { Href, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";

function BackArrowIcon() {
  return (
    <Svg width={11.5} height={9.83} viewBox="0 0 11.5 9.83333" fill="none">
      <Path
        d="M0.75 4.91667H10.75M4.91667 9.08333L0.75 4.91667L4.91667 0.75"
        stroke="#ffffff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ListIcon({ size = 12 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path
        d="M4 3.00034L10.5 3.0007M4 6.00035L10.5 6.00075M4 9.00035L10.5 9.00075M1.75 3H1.755M1.75 6H1.755M1.75 9H1.755M2 3C2 3.13807 1.88807 3.25 1.75 3.25C1.61193 3.25 1.5 3.13807 1.5 3C1.5 2.86193 1.61193 2.75 1.75 2.75C1.88807 2.75 2 2.86193 2 3ZM2 6C2 6.13805 1.88807 6.25 1.75 6.25C1.61193 6.25 1.5 6.13805 1.5 6C1.5 5.86195 1.61193 5.75 1.75 5.75C1.88807 5.75 2 5.86195 2 6ZM2 9C2 9.13805 1.88807 9.25 1.75 9.25C1.61193 9.25 1.5 9.13805 1.5 9C1.5 8.86195 1.61193 8.75 1.75 8.75C1.88807 8.75 2 8.86195 2 9Z"
        stroke="#B8B8B8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function TimeIcon({ size = 12 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <Path d="M6 4V6L7.5 7.5" stroke="#B8B8B8" strokeLinecap="round" />
      <Path
        d="M6 10.5C8.48528 10.5 10.5 8.48528 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 8.48528 3.51472 10.5 6 10.5Z"
        stroke="#B8B8B8"
      />
    </Svg>
  );
}

function CheckIcon() {
  return (
    <Svg width={16} height={12} viewBox="0 0 16 12" fill="none">
      <Path
        d="M1 6.55555L5.3077 11L15 1"
        stroke="#E04242"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ChapterArrowIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <Path
        d="M4.66025 2.04137C4.58393 2.11951 4.5412 2.2244 4.5412 2.33363C4.5412 2.44285 4.58393 2.54774 4.66025 2.62587L8.92413 7L4.66025 11.3732C4.58393 11.4514 4.5412 11.5563 4.5412 11.6655C4.5412 11.7747 4.58393 11.8796 4.66025 11.9578C4.69735 11.9959 4.7417 12.0261 4.79069 12.0468C4.83968 12.0675 4.89232 12.0781 4.9455 12.0781C4.99868 12.0781 5.05132 12.0675 5.10031 12.0468C5.1493 12.0261 5.19365 11.9959 5.23075 11.9578L9.765 7.30537C9.84464 7.22367 9.88921 7.11409 9.88921 7C9.88921 6.88591 9.84464 6.77633 9.765 6.69462L5.23075 2.04225C5.19365 2.00415 5.1493 1.97387 5.10031 1.95319C5.05132 1.93251 4.99868 1.92186 4.9455 1.92186C4.89232 1.92186 4.83968 1.93251 4.79069 1.95319C4.7417 1.97387 4.69735 2.00415 4.66025 2.04225V2.04137Z"
        fill="white"
      />
    </Svg>
  );
}

/** "money-svgrepo-com" category icon (Figma node 129:517) — fanned stack of bills. */
function MoneyIcon() {
  return (
    <Svg width={23} height={24} viewBox="0 0 23 24" fill="none">
      <Path d="M5.26854 3.6973H22.1171C22.4228 3.6973 22.6565 3.94122 22.6565 4.26019V15.1991C22.6565 15.5181 22.4228 15.762 22.1171 15.762H5.26854C4.96286 15.762 4.7291 15.5181 4.7291 15.1991V4.26019C4.7291 3.94122 4.96286 3.6973 5.26854 3.6973Z" fill="#9DBE87" />
      <Path d="M22.1171 16.1373H5.26854C4.76506 16.1373 4.36947 15.7245 4.36947 15.1991V4.26019C4.36947 3.73482 4.76506 3.32203 5.26854 3.32203H22.1171C22.6206 3.32203 23.0162 3.73482 23.0162 4.26019V15.1991C23.0162 15.7057 22.6206 16.1373 22.1171 16.1373ZM5.26854 4.07256C5.16065 4.07256 5.08873 4.14761 5.08873 4.26019V15.1991C5.08873 15.3117 5.16065 15.3868 5.26854 15.3868H22.1171C22.225 15.3868 22.2969 15.3117 22.2969 15.1991V4.26019C22.2969 4.14761 22.225 4.07256 22.1171 4.07256H5.26854Z" fill="#131313" />
      <Path d="M3.74013 5.29217H20.6066C20.9123 5.29217 21.1461 5.53609 21.1461 5.85506V16.794C21.1461 17.113 20.9123 17.3569 20.6066 17.3569H3.74013C3.43444 17.3569 3.20068 17.113 3.20068 16.794V5.85506C3.20068 5.53609 3.43444 5.29217 3.74013 5.29217Z" fill="#9DBE87" />
      <Path d="M20.5887 17.7321H3.74013C3.23665 17.7321 2.84106 17.3194 2.84106 16.794V5.85506C2.84106 5.32969 3.23665 4.9169 3.74013 4.9169H20.6066C21.1101 4.9169 21.5057 5.32969 21.5057 5.85506V16.794C21.4877 17.3006 21.0921 17.7321 20.5887 17.7321ZM3.74013 5.66743C3.63224 5.66743 3.56031 5.74248 3.56031 5.85506V16.794C3.56031 16.9066 3.63224 16.9816 3.74013 16.9816H20.6066C20.7145 16.9816 20.7865 16.9066 20.7865 16.794V5.85506C20.7865 5.74248 20.7145 5.66743 20.6066 5.66743H3.74013Z" fill="#131313" />
      <Path d="M2.33758 6.84951H19.2041C19.5098 6.84951 19.7435 7.09343 19.7435 7.4124V18.3513C19.7435 18.6703 19.5098 18.9142 19.2041 18.9142H2.33758C2.0319 18.9142 1.79814 18.6703 1.79814 18.3513V7.4124C1.79814 7.11219 2.0319 6.84951 2.33758 6.84951Z" fill="#9DBE87" />
      <Path d="M19.2041 19.2895H2.33758C1.8341 19.2895 1.43851 18.8767 1.43851 18.3513V7.4124C1.43851 6.88704 1.8341 6.47425 2.33758 6.47425H19.2041C19.7076 6.47425 20.1032 6.88704 20.1032 7.4124V18.3513C20.1032 18.8579 19.6896 19.2895 19.2041 19.2895ZM2.33758 7.22477C2.22969 7.22477 2.15776 7.29983 2.15776 7.4124V18.3513C2.15776 18.4639 2.22969 18.539 2.33758 18.539H19.2041C19.312 18.539 19.3839 18.4639 19.3839 18.3513V7.4124C19.3839 7.29983 19.312 7.22477 19.2041 7.22477H2.33758Z" fill="#131313" />
      <Path d="M0.899069 8.23798H17.7656C18.0713 8.23798 18.305 8.48191 18.305 8.80088V19.7398C18.305 20.0588 18.0713 20.3027 17.7656 20.3027H0.899069C0.593385 20.3027 0.359628 20.0588 0.359628 19.7398V8.80088C0.359628 8.50067 0.593385 8.23798 0.899069 8.23798Z" fill="#9DBE87" />
      <Path d="M17.7656 20.678H0.899069C0.39559 20.678 1.30236e-07 20.2652 1.30236e-07 19.7398V8.80088C1.30236e-07 8.27551 0.39559 7.86272 0.899069 7.86272H17.7656C18.2691 7.86272 18.6647 8.27551 18.6647 8.80088V19.7398C18.6647 20.2652 18.2511 20.678 17.7656 20.678ZM0.899069 8.61325C0.79118 8.61325 0.719255 8.6883 0.719255 8.80088V19.7398C0.719255 19.8524 0.79118 19.9274 0.899069 19.9274H17.7656C17.8735 19.9274 17.9454 19.8524 17.9454 19.7398V8.80088C17.9454 8.6883 17.8735 8.61325 17.7656 8.61325H0.899069Z" fill="#131313" />
      <Path d="M15.4999 18.614H3.16472C3.16472 17.7321 2.46345 17.0004 1.61832 17.0004V11.3339C2.46345 11.3339 3.16472 10.6021 3.16472 9.72027H15.4999C15.4999 10.6021 16.2012 11.3339 17.0463 11.3339V17.0004C16.1832 17.0004 15.4999 17.7321 15.4999 18.614Z" fill="#D6F0C5" />
      <Path d="M15.4999 18.9893H3.16472C2.96693 18.9893 2.80509 18.8204 2.80509 18.614C2.80509 17.9385 2.26565 17.3756 1.61832 17.3756C1.42053 17.3756 1.2587 17.2068 1.2587 17.0004V11.3339C1.2587 11.1275 1.42053 10.9586 1.61832 10.9586C2.26565 10.9586 2.80509 10.3957 2.80509 9.72027C2.80509 9.51388 2.96693 9.34501 3.16472 9.34501H15.4999C15.6977 9.34501 15.8596 9.51388 15.8596 9.72027C15.8596 10.3957 16.399 10.9586 17.0463 10.9586C17.2441 10.9586 17.406 11.1275 17.406 11.3339V17.0004C17.406 17.2068 17.2441 17.3756 17.0463 17.3756C16.399 17.3756 15.8596 17.9385 15.8596 18.614C15.8596 18.8204 15.6977 18.9893 15.4999 18.9893ZM3.48839 18.2388H15.1583C15.3021 17.4507 15.9135 16.8128 16.6687 16.6626V11.6716C15.9135 11.5215 15.3021 10.8836 15.1583 10.0955H3.48839C3.34453 10.8836 2.73317 11.5215 1.97795 11.6716V16.6439C2.73317 16.8128 3.34453 17.4507 3.48839 18.2388Z" fill="#131313" />
      <Path d="M9.3683 16.7189C8.79289 16.7189 8.18152 16.4938 7.74997 15.9121C7.6241 15.7433 7.66006 15.5181 7.80392 15.3868C7.96575 15.2554 8.18152 15.2929 8.30739 15.443C8.73895 16.0247 9.40426 16.0435 9.83581 15.8934C10.1954 15.762 10.4112 15.5181 10.4112 15.2554C10.4112 15.0115 9.85379 14.8426 9.3683 14.6925C8.61308 14.4486 7.66006 14.1671 7.66006 13.229C7.66006 12.7787 7.92979 12.3659 8.3973 12.122C8.9727 11.8217 9.9437 11.7092 10.8607 12.4034C11.0226 12.5348 11.0585 12.7599 10.9327 12.9288C10.8068 13.0976 10.591 13.1352 10.4292 13.0038C9.81783 12.5348 9.13454 12.5535 8.72096 12.7787C8.50519 12.8913 8.36134 13.0601 8.36134 13.229C8.36134 13.5855 8.86482 13.7544 9.54811 13.9795C10.2853 14.2047 11.0945 14.4674 11.0945 15.2554C11.0945 15.8371 10.6809 16.3624 10.0336 16.6064C9.85379 16.6626 9.60205 16.7189 9.3683 16.7189Z" fill="#131313" />
      <Path d="M9.33233 12.6286C9.13454 12.6286 8.9727 12.4597 8.9727 12.2533V11.4277C8.9727 11.2213 9.13454 11.0525 9.33233 11.0525C9.53013 11.0525 9.69196 11.2213 9.69196 11.4277V12.2533C9.69196 12.4785 9.53013 12.6286 9.33233 12.6286Z" fill="#131313" />
      <Path d="M9.33233 17.4319C9.13454 17.4319 8.9727 17.2631 8.9727 17.0567V16.4375C8.9727 16.2311 9.13454 16.0622 9.33233 16.0622C9.53013 16.0622 9.69196 16.2311 9.69196 16.4375V17.0567C9.69196 17.2631 9.53013 17.4319 9.33233 17.4319Z" fill="#131313" />
      <Path d="M3.97388 14.3923C3.97388 14.4835 3.99109 14.5737 4.02453 14.658C4.05796 14.7422 4.10697 14.8187 4.16875 14.8832C4.23053 14.9477 4.30387 14.9988 4.38459 15.0337C4.46531 15.0686 4.55182 15.0865 4.63919 15.0865C4.72656 15.0865 4.81308 15.0686 4.8938 15.0337C4.97452 14.9988 5.04786 14.9477 5.10964 14.8832C5.17142 14.8187 5.22043 14.7422 5.25386 14.658C5.2873 14.5737 5.3045 14.4835 5.3045 14.3923C5.3045 14.2082 5.23441 14.0316 5.10964 13.9014C4.98487 13.7712 4.81565 13.6981 4.63919 13.6981C4.46274 13.6981 4.29352 13.7712 4.16875 13.9014C4.04398 14.0316 3.97388 14.2082 3.97388 14.3923Z" fill="#AECD99" />
      <Path d="M4.63919 15.443C4.08177 15.443 3.61426 14.974 3.61426 14.3735C3.61426 13.7731 4.06379 13.304 4.63919 13.304C5.19662 13.304 5.66413 13.7731 5.66413 14.3735C5.66413 14.974 5.19662 15.443 4.63919 15.443ZM4.63919 14.0733C4.47736 14.0733 4.33351 14.2047 4.33351 14.3923C4.33351 14.5799 4.45938 14.7113 4.63919 14.7113C4.80103 14.7113 4.94488 14.5799 4.94488 14.3923C4.94488 14.2047 4.80103 14.0733 4.63919 14.0733Z" fill="#131313" />
      <Path d="M13.3961 14.3923C13.3961 14.5764 13.4662 14.753 13.591 14.8832C13.7158 15.0134 13.885 15.0865 14.0614 15.0865C14.2379 15.0865 14.4071 15.0134 14.5319 14.8832C14.6566 14.753 14.7267 14.5764 14.7267 14.3923C14.7267 14.2082 14.6566 14.0316 14.5319 13.9014C14.4071 13.7712 14.2379 13.6981 14.0614 13.6981C13.885 13.6981 13.7158 13.7712 13.591 13.9014C13.4662 14.0316 13.3961 14.2082 13.3961 14.3923Z" fill="#AECD99" />
      <Path d="M14.0614 15.443C13.504 15.443 13.0365 14.974 13.0365 14.3735C13.0365 13.7731 13.486 13.304 14.0614 13.304C14.6189 13.304 15.0864 13.7731 15.0864 14.3735C15.0864 14.974 14.6189 15.443 14.0614 15.443ZM14.0614 14.0733C13.8996 14.0733 13.7557 14.2047 13.7557 14.3923C13.7557 14.5799 13.8816 14.7113 14.0614 14.7113C14.2412 14.7113 14.3671 14.5799 14.3671 14.3923C14.3671 14.2047 14.2233 14.0733 14.0614 14.0733Z" fill="#131313" />
    </Svg>
  );
}

function LearnPointRow({ text }: { text: string }) {
  return (
    <View className="flex-row items-center gap-4">
      <CheckIcon />
      <Text className="flex-1 font-kalpurush text-[13px] leading-[19px] text-white">{text}</Text>
    </View>
  );
}

function ChapterRow({ number, title, isLast }: { number: string; title: string; isLast: boolean }) {
  return (
    <View>
      <View className="flex-row items-center gap-[11px] py-[13px]">
        <Text className="font-li-ador-regular text-[24px] leading-[31.2px] text-primary">{number}</Text>
        <Text className="flex-1 font-li-ador-regular text-[14px] leading-[18.2px] text-white">{title}</Text>
        <ChapterArrowIcon />
      </View>
      {!isLast && <View className="ml-[30px] h-px bg-[#727272]" />}
    </View>
  );
}

/**
 * Figma "About Audiobook" page (node 127:407) — pushed from a book cover tap
 * (e.g. the home screen's "বিজনেস ই-বুক" row), so it wires its own top
 * safe-area inset and has no bottom menu, matching app/author.tsx.
 */
export default function BookScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const selectedBook = getBook(id);
  const authorInfo = getAuthor("robert-kiyosaki");
  const hasStarted = useLibraryStore((state) => Boolean(state.progressByBookId[selectedBook.id]));

  return (
    <View style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          {/* Ambient glow behind the header is the book's own cover, blurred —
              matches the Figma frame's "image 49" backdrop, which is the same
              cover image cropped and blurred rather than a separate asset. */}
          <View pointerEvents="none" style={{ position: "absolute", left: -16.5, top: -23, width: 428, height: 285, overflow: "hidden" }}>
            <Image source={selectedBook.cover} style={{ width: "100%", height: "100%" }} contentFit="cover" blurRadius={25} />
          </View>

          <View className="px-6" style={{ paddingTop: insets.top + 16 }}>
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={8}
              onPress={() => router.back()}
              className="size-[42px] items-center justify-center rounded-full border border-white"
            >
              <BackArrowIcon />
            </TouchableOpacity>

            <View className="mt-9 items-center">
              <BookCover source={selectedBook.cover} width={198} height={295} radius={8} style={{ borderColor: "#777777" }} />

              <Text className="mt-[22px] font-kalpurush text-[16px] leading-[20.8px] text-[#aaaaaa]">সামারি</Text>
              <Text className="mt-0.5 font-li-ador-regular text-[32px] leading-[41.6px] text-white">{selectedBook.title}</Text>
              <TouchableOpacity activeOpacity={0.7} hitSlop={6} onPress={() => router.push({ pathname: "/author", params: { id: authorInfo.id } } as Href)}>
                <Text className="mt-0.5 font-kalpurush text-[16px] leading-[20.8px] text-white">{selectedBook.authorName}</Text>
              </TouchableOpacity>

              <View className="mt-[18px] w-[307px]">
                <PlayButton
                  label={hasStarted ? "Continue করুন" : undefined}
                  onPress={() => router.push("/player")}
                />
              </View>

              <View className="mt-5 flex-row items-center gap-[33px]">
                <View className="flex-row items-center gap-[8px]">
                  <ListIcon size={14} />
                  <Text className="font-kalpurush text-[13px] leading-[17px] text-[#b8b8b8]">{selectedBook.chaptersLabel}</Text>
                </View>
                <View className="flex-row items-center gap-[8px]">
                  <TimeIcon size={14} />
                  <Text className="font-kalpurush text-[13px] leading-[17px] text-[#b8b8b8]">{selectedBook.durationLabel}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-16 px-6">
          <Text className="font-li-ador-regular text-[20px] leading-[26px] text-white">{selectedBook.whatsInsideTitle}</Text>
          <Text className="mt-[6px] font-kalpurush text-[14px] leading-[22px] text-[#d0d0d0]">
            {selectedBook.whatsInsideDescription}
          </Text>
        </View>

        <View className="mt-9 px-6">
          <Text className="font-li-ador-regular text-[20px] leading-[26px] text-white">{selectedBook.whoItsForTitle}</Text>
          <Text className="mt-[5px] font-kalpurush text-[14px] leading-[22px] text-[#d0d0d0]">
            {selectedBook.whoItsForDescription}
          </Text>
        </View>

        <View className="mt-8 px-6">
          <View className="rounded-xl border border-[#4c4c4c] px-6 py-[21px]">
            <View className="flex-row items-center gap-[10px]">
              <Text className="text-[20px] leading-[26px]">🎯</Text>
              <Text className="font-li-ador-regular text-[20px] leading-[26px] text-white">আপনি যা শিখবেন</Text>
            </View>
            <View className="mt-6 gap-4">
              {selectedBook.learnPoints.map((point) => (
                <LearnPointRow key={point} text={point} />
              ))}
            </View>
          </View>
        </View>

        <View className="mt-10 px-6">
          <Text className="font-li-ador-regular text-[24px] leading-[31.2px] text-white">অধ্যায়</Text>
        </View>
        <View className="mt-[19px] h-px bg-[#727272]" />
        <View className="px-6">
          {selectedBook.chapters.map((chapter, index) => (
            <ChapterRow
              key={chapter.number}
              number={chapter.number}
              title={chapter.title}
              isLast={index === selectedBook.chapters.length - 1}
            />
          ))}
        </View>

        <View className="mt-16 px-6">
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.push({ pathname: "/author", params: { id: authorInfo.id } } as Href)} className="self-start">
            <View className="size-20 overflow-hidden rounded-full bg-[#1a1a1a]">
              <Image source={authorInfo.avatar} style={{ width: "100%", height: "100%" }} contentFit="cover" />
            </View>
            <Text className="mt-3 font-li-ador-regular text-[16px] leading-[20.8px] text-white">{authorInfo.name}</Text>
          </TouchableOpacity>
          <Text className="mt-[6px] font-kalpurush text-[14px] leading-[22px] text-[#aeaeae]">{authorInfo.bio}</Text>
        </View>

        <View className="mt-6 px-6">
          <Text className="font-li-ador-regular text-[24px] leading-[31.2px] text-white">ক্যাটাগরি</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            className="mt-2 h-10 flex-row items-center gap-[7px] self-start rounded border border-[#dadada] px-[7px]"
          >
            <MoneyIcon />
            <Text className="font-li-ador-regular text-[14px] leading-[18.2px] text-white">{selectedBook.categoryLabel}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
