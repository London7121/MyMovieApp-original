import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { image185 } from "../api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Person = {
    id: number;
    profile_path?: string;
    character?: string;
    original_name?: string;
};

type CastProps = {
    cast?: Person[];
};

type RootStackParamList = {
    Person: { id: number };
};

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Person"
>;

export default function Cast({ cast }: CastProps) {
    const navigation = useNavigation<NavigationProp>();

    if (!Array.isArray(cast) || cast.length === 0) {
        return null; 
    }

    return (
        <View className="my-6">
            <Text className="text-white text-xl mx-4 mb-5 mt-6">Actors</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {cast.map((person) => (
                    <TouchableOpacity
                        key={person.id}
                        className="mr-4 items-center mb-6"
                        onPress={() =>
                            navigation.navigate("Person", { id: person.id })
                        }
                    >
                        <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                            <Image
                                className="rounded-2xl h-24 w-20"
                                source={{
                                    uri: image185(person?.profile_path) || "",
                                }}
                            />
                        </View>
                        <Text className="text-white text-xs mt-1">
                            {person?.character
                                ? person.character.length > 10
                                    ? person.character.slice(0, 10) + "..."
                                    : person.character
                                : ""}
                        </Text>
                        <Text className="text-neutral-400 text-xs">
                            {person?.original_name
                                ? person.original_name.length > 10
                                    ? person.original_name.slice(0, 10) + "..."
                                    : person.original_name
                                : ""}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}
