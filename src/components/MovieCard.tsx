import React from "react";
import { Dimensions, Image, TouchableWithoutFeedback } from "react-native";
import { image500 } from "../api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

interface MovieItem {
    id: number;
    poster_path: string;
    title?: string;
}

interface MovieCardProps {
    item: MovieItem;
}

type RootStackParamList = {
    Movie: { id: number };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Movie">;

export default function MovieCard({ item }: MovieCardProps) {
    const { width, height } = Dimensions.get("window");
    const navigation = useNavigation<NavigationProp>();

    return (
        <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Movie", { id: item?.id })}
        >
            <Image
                className="cursor-pointer"
                source={{ uri: image500(item?.poster_path) || "" }}
                style={{
                    width: width,
                    height: height * 0.72,
                    borderRadius: 24,
                }}
            />
        </TouchableWithoutFeedback>
    );
}
