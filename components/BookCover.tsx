import { Image } from "expo-image";
import { ImageSourcePropType, StyleProp, View, ViewStyle } from "react-native";

type BookCoverProps = {
  source: ImageSourcePropType;
  width: number;
  height: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Bordered, rounded book/summary cover — Figma "Thumbnail" pattern reused for
 * the hero carousel and the book rows (e.g. nodes 101:1694, 101:1712).
 */
export function BookCover({ source, width, height, radius = 8, style }: BookCoverProps) {
  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius: radius,
          borderWidth: 0.7,
          borderColor: "#646464",
          overflow: "hidden",
          backgroundColor: "#c8c7cc",
        },
        style,
      ]}
    >
      <Image source={source} style={{ width: "100%", height: "100%" }} contentFit="cover" />
    </View>
  );
}
