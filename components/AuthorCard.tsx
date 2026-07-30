import { Image } from "expo-image";
import { ImageSourcePropType, Text, View } from "react-native";

type AuthorCardProps = {
  name: string;
  avatar: ImageSourcePropType;
};

/** Circular author photo + name — Figma "User" pattern (e.g. node 101:1813). */
export function AuthorCard({ name, avatar }: AuthorCardProps) {
  return (
    <View className="w-[72px] items-center">
      <View
        className="size-[65px] overflow-hidden rounded-full"
        style={{ backgroundColor: "#000000", borderWidth: 0.5, borderColor: "#646464" }}
      >
        <Image source={avatar} style={{ width: "100%", height: "100%" }} contentFit="cover" />
      </View>
      <Text
        numberOfLines={2}
        className="mt-2 text-center font-aeonik-regular text-[13px] leading-[18px] text-white"
      >
        {name}
      </Text>
    </View>
  );
}
