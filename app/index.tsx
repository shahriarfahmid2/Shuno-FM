import { BottomMenu } from "@/components/BottomMenu";
import { PlayButton } from "@/components/PlayButton";
import { PrimaryButton } from "@/components/PrimaryButton";
import { images } from "@/constants/images";
import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView contentContainerClassName="gap-6 p-6" className="flex-1">
        <View className="items-center gap-3">
          <Image source={images.logo} style={{ width: 64, height: 64 }} />
          <Text className="font-aeonik-bold text-h2 text-ink">Shuno FM</Text>
        </View>

        <View className="gap-2">
          <Text className="font-li-ador-bold text-h3 text-ink">
            আমি বাংলা বলি
          </Text>
          <Text className="font-aeonik-bold text-h3 text-ink">
            I&rsquo;m english
          </Text>
          <Text className="font-kalpurush text-body text-ink-secondary">
            আমি বাংলা বলি
          </Text>
          <Text className="font-kalpurush text-caption text-ink-tertiary">
            আমি বাংলা বলি
          </Text>
        </View>

        <View className="gap-3">
          <PrimaryButton variant="primary">এগিয়ে যান</PrimaryButton>
          <PrimaryButton variant="black">এগিয়ে যান</PrimaryButton>
          <PrimaryButton variant="white">এগিয়ে যান</PrimaryButton>
        </View>

        <PlayButton />
      </ScrollView>

      <BottomMenu variant="white" active="home" />
    </SafeAreaView>
  );
}
