import React from "react";
import {
    Dimensions,
    Image,
    Text,
    View,
    ScrollView,
    TouchableWithoutFeedback,
} from "react-native";
import { image185 } from "../api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

interface MovieItem {
    id: number;
    title?: string;
    poster_path?: string;
}

interface UpcomingMoviesProps {
    upcoming?: MovieItem[]; // optional bo‘ldi
    title: string;
}

type RootStackParamList = {
    Movie: { id: number };
};
type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Movie"
>;

export default function UpcomingMovies({
    upcoming,
    title,
}: UpcomingMoviesProps) {
    const { width, height } = Dimensions.get("window");
    const navigation = useNavigation<NavigationProp>();

    if (!Array.isArray(upcoming) || upcoming.length === 0) {
        return null; // agar hech narsa bo‘lmasa, chiqarmaydi
    }

    return (
        <View className="mb-8 space-y-4 mx-4">
            <Text className="text-xl text-white font-semibold my-2">
                {title}
            </Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px space-x-4"
                contentContainerStyle={{ paddingRight: 15 }}
            >
                {upcoming.map((item) => (
                    <TouchableWithoutFeedback
                        key={item?.id}
                        onPress={() =>
                            navigation.navigate("Movie", { id: item?.id })
                        }
                    >
                        <View className="space-y-2 mr-4">
                            {item?.poster_path ? (
                                <Image
                                    source={{
                                        uri: image185(item.poster_path) || "",
                                    }}
                                    style={{
                                        width: width * 0.3,
                                        height: height * 0.2,
                                        borderRadius: 10,
                                    }}
                                />
                            ) : (
                                <View
                                    style={{
                                        width: width * 0.3,
                                        height: height * 0.2,
                                        borderRadius: 10,
                                        backgroundColor: "#444", // fallback placeholder
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text className="text-white text-xs">
                                        No Image
                                    </Text>
                                </View>
                            )}
                            <Text className="text-sm text-white font-semibold my-2">
                                {item?.title
                                    ? item.title.length > 12
                                        ? item.title.slice(0, 12) + "..."
                                        : item.title
                                    : "Untitled"}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </ScrollView>
        </View>
    );
}
