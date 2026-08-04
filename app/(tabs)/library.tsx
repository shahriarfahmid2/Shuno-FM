import { BookCover } from "@/components/BookCover";
import { images } from "@/constants/images";
import { colors } from "@/constants/theme";
import { LibraryInProgressBook, LibraryLink, libraryInProgressBooks, libraryLinks } from "@/data/library";
import { Image } from "expo-image";
import { Href, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Rect } from "react-native-svg";

function PlayIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <Path
        d="M6.20354 3.89468C5.53782 3.47103 4.66667 3.94925 4.66667 4.73834V9.26166C4.66667 10.0508 5.53782 10.529 6.20354 10.1053L9.75758 7.84366C10.3751 7.45071 10.3751 6.54929 9.75758 6.15634L6.20354 3.89468Z"
        fill="#140808"
      />
    </Svg>
  );
}

function HeartTileIcon() {
  return (
    <Svg width={46} height={46} viewBox="0 0 46 46" fill="none">
      <Rect width={46} height={46} rx={13} fill="#313131" />
      <Path
        d="M31.9243 15.6118C31.3496 14.9494 30.6278 14.4166 29.8109 14.0519C28.994 13.6871 28.1024 13.4996 27.2002 13.5026C25.6566 13.4581 24.1538 13.9789 23.001 14.9578C21.8482 13.9789 20.3453 13.4581 18.8017 13.5026C17.8996 13.4996 17.0079 13.6871 16.191 14.0519C15.3741 14.4166 14.6523 14.9494 14.0776 15.6118C13.0771 16.7679 12.0305 18.8611 12.7244 22.2725C13.8319 27.72 22.137 32.1904 22.4876 32.3734C22.6439 32.4564 22.8199 32.5 22.9989 32.5C23.1778 32.5 23.3538 32.4564 23.5101 32.3734C23.8629 32.1864 32.1679 27.716 33.2733 22.2725C33.9715 18.8611 32.9248 16.7679 31.9243 15.6118ZM31.2168 21.8924C30.4336 25.7438 24.7416 29.3261 23.001 30.3442C20.5486 28.9341 15.5032 25.3937 14.7904 21.8924C14.2519 19.2462 14.9888 17.709 15.7027 16.885C16.0802 16.451 16.5539 16.1021 17.0897 15.8631C17.6255 15.6241 18.2101 15.5011 18.8017 15.5028C19.4336 15.4577 20.067 15.5693 20.6401 15.8268C21.2132 16.0842 21.7065 16.4788 22.0719 16.972C22.162 17.1299 22.2949 17.2619 22.4568 17.3543C22.6187 17.4467 22.8036 17.496 22.9923 17.4971C23.181 17.4982 23.3666 17.4511 23.5297 17.3607C23.6927 17.2703 23.8274 17.1398 23.9196 16.983C24.2842 16.4859 24.7786 16.0881 25.3539 15.8285C25.9292 15.569 26.5655 15.4567 27.2002 15.5028C27.793 15.5001 28.3792 15.6226 28.9163 15.8616C29.4535 16.1006 29.9283 16.4501 30.3066 16.885C31.0184 17.709 31.7553 19.2462 31.2168 21.8924Z"
        fill="white"
      />
    </Svg>
  );
}

function DownloadIcon() {
  return (
    <Svg width={19} height={19} viewBox="0 0 19 19" fill="none">
      <Path
        d="M10.0423 14.0103C9.90297 14.163 9.70611 14.25 9.49964 14.25C9.29317 14.25 9.0963 14.163 8.95699 14.0103L5.03541 9.71074C4.76139 9.41031 4.78221 8.94409 5.08192 8.66941C5.38163 8.39472 5.84672 8.41556 6.12074 8.71599L8.76434 11.6144V0.737069C8.76434 0.330001 9.09356 0 9.49964 0C9.90572 0 10.2349 0.330001 10.2349 0.737069V11.6144L12.8786 8.71599C13.1526 8.41556 13.6177 8.39472 13.9174 8.66941C14.2171 8.94409 14.2379 9.41031 13.9638 9.71074L10.0423 14.0103Z"
        fill="white"
      />
      <Path
        d="M1.46154 12.5875C1.46154 12.194 1.13437 11.875 0.73077 11.875C0.327181 11.875 0 12.194 0 12.5875V12.6397C0 13.9389 0 14.9861 0.113533 15.8097C0.23145 16.6648 0.483702 17.3847 1.07019 17.9565C1.65667 18.5284 2.39511 18.7744 3.27214 18.8893C4.11688 19 5.19094 19 6.52346 19H12.4766C13.8091 19 14.8831 19 15.7279 18.8893C16.6049 18.7744 17.3433 18.5284 17.9299 17.9565C18.5163 17.3847 18.7686 16.6648 18.8865 15.8097C19 14.9861 19 13.9389 19 12.6397V12.5875C19 12.194 18.6728 11.875 18.2692 11.875C17.8657 11.875 17.5385 12.194 17.5385 12.5875C17.5385 13.9511 17.5369 14.9022 17.438 15.6198C17.3418 16.3169 17.1661 16.686 16.8964 16.9489C16.6267 17.2119 16.2481 17.3833 15.5331 17.4771C14.7971 17.5735 13.8217 17.575 12.4231 17.575H6.57692C5.17832 17.575 4.20287 17.5735 3.46689 17.4771C2.75193 17.3833 2.37331 17.2119 2.10365 16.9489C1.83399 16.686 1.65816 16.3169 1.56204 15.6198C1.46309 14.9022 1.46154 13.9511 1.46154 12.5875Z"
        fill="white"
      />
    </Svg>
  );
}

function ChevronRightIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M6.75 13.5L11.25 9L6.75 4.5"
        stroke="#C8C7CC"
        strokeWidth={2.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function BackIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M11.25 13.5L6.75 9L11.25 4.5"
        stroke="#C8C7CC"
        strokeWidth={2.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function InProgressCard({ book, onPress, onPlay }: { book: LibraryInProgressBook; onPress: () => void; onPlay: () => void }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="h-[106px] w-[305px] flex-row items-center gap-3 rounded-[16px] border border-[#424242] bg-black py-[10px] pl-[14px] pr-[14px]"
    >
      <BookCover source={book.cover} width={51} height={76} radius={6} style={{ borderColor: "#3d3d3d" }} />
      <View className="flex-1 gap-2">
        <Text numberOfLines={1} className="font-aeonik-bold text-[13.5px] leading-[18px] text-white">
          {book.title}
        </Text>
        <Text numberOfLines={1} className="font-aeonik-regular text-[11px] leading-[14px] text-[#c8c7cc]">
          {book.author}
        </Text>
        <View className="flex-row items-center gap-[10px]">
          <View className="h-[5px] flex-1 overflow-hidden rounded-[20px] bg-[#404042]">
            <View
              className="h-[5px] rounded-[20px] bg-primary"
              style={{ width: `${book.progress * 100}%` }}
            />
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={onPlay} className="size-8 items-center justify-center rounded-full bg-white">
            <PlayIcon />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function LibraryLinkRow({ link, onPress }: { link: LibraryLink; onPress?: () => void }) {
  const isFavourites = link.id === "favourites";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className="h-[83px] w-full flex-row items-center gap-[14px] rounded-[16px] border border-[#424242] bg-black py-[13px] pl-[14px] pr-4"
    >
      {isFavourites ? (
        <HeartTileIcon />
      ) : (
        <View className="size-[46px] items-center justify-center rounded-[13px] bg-[#313131]">
          <DownloadIcon />
        </View>
      )}
      <View className="flex-1 gap-1">
        <Text className="font-aeonik-bold text-[15px] leading-5 text-white">{link.label}</Text>
        <Text className="font-aeonik-regular text-[11.5px] leading-[15px] text-[#c8c7cc]">{link.count} Titles</Text>
      </View>
      <ChevronRightIcon />
    </TouchableOpacity>
  );
}

/** Figma "My library page" (node 6606:4557) — rendered as a tab, not a pushed route. */
export default function LibraryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    // No bottom inset — the shared tab bar (app/(tabs)/_layout.tsx) handles
    // the home-indicator safe area below this screen's content.
    <SafeAreaView edges={[]} style={{ flex: 1, backgroundColor: "#000000" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View>
          {/* Glow bleeds up behind the status bar, same technique as the home
              and explore screens' header glow. */}
          <View
            pointerEvents="none"
            style={{ position: "absolute", left: -242, top: -113, width: 796, height: 229 }}
          >
            <Image source={images.libraryGlow} style={{ width: "100%", height: "100%" }} contentFit="cover" />
          </View>

          <View className="px-5" style={{ paddingTop: insets.top + 16 }}>
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={8}
              onPress={() => router.back()}
              className="mb-4 size-9 items-center justify-center rounded-full bg-[rgba(255,255,255,0.08)]"
            >
              <BackIcon />
            </TouchableOpacity>
            <Text className="font-aeonik-bold text-[30px] leading-[39px] tracking-[-0.5px] text-white">
              My Library
            </Text>
            <View className="mt-2 h-1 w-[46px] rounded-full bg-primary" />
          </View>
        </View>

        <View className="mt-7 flex-row items-center px-5">
          <Text className="font-aeonik-bold text-[19px] leading-[25px] text-white">In progress</Text>
          <View className="flex-1" />
          <TouchableOpacity activeOpacity={0.7} hitSlop={8} onPress={() => router.push("/history")}>
            <Text className="font-aeonik-medium text-[13px] leading-[17px]" style={{ color: colors.primary }}>
              My History
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12, paddingLeft: 19, paddingRight: 8, paddingTop: 14 }}
        >
          {libraryInProgressBooks.map((book) => (
            <InProgressCard
              key={book.id}
              book={book}
              onPress={() => router.push({ pathname: "/book", params: { id: book.id } } as Href)}
              onPlay={() => router.push("/player")}
            />
          ))}
        </ScrollView>

        <View className="mt-[23px] gap-3 px-5">
          {libraryLinks.map((link) => (
            <LibraryLinkRow
              key={link.id}
              link={link}
              onPress={
                link.id === "favourites"
                  ? () => router.push("/favourites")
                  : link.id === "downloads"
                    ? () => router.push("/downloads")
                    : undefined
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
