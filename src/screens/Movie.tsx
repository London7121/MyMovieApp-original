import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    ChevronLeftIcon,
    HeartIcon,
} from "react-native-heroicons/outline";

import { SafeAreaView } from "react-native-safe-area-context";
import {
    fetchMovieCredits,
    fetchMovieDetails,
    fetchSimilarMovies,
    image500,
} from "../api";
import Loader from "../components/Loader/Loader";
import { LinearGradient } from 'expo-linear-gradient';
import UpcomingMovies from "../components/UpcomingMovies";
import Cast from "../components/Cast";
import ProgressLoader from "../components/Loader/ProgressLoader";

interface MovieDetails {
    id: number;
    poster_path: string;
    title?: string;
    overview?: string;
    release_date?: string;
    [key: string]: any;
}

type RootStackParamList = {
    Movie: { id: number };
};

export default function Movie() {
    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState<MovieDetails>({} as MovieDetails);
    const [cast, setCast] = useState<any[]>([]);
    const [similarMovie, setSimilarMovie] = useState<any[]>([]);
    const [isFavourite, setIsFavourite] = useState(false);

    const { width, height } = Dimensions.get("window");
    const navigation = useNavigation();

    const route = useRoute<RouteProp<RootStackParamList, "Movie">>();
    const { id } = route.params;

    useEffect(() => {
        if (!id) return;

        const getMovieDetails = async () => {
            const data = await fetchMovieDetails(id);
            if (data) setMovie(data);
            setIsLoading(false);
        };

        const getMovieCredits = async () => {
            const data = await fetchMovieCredits(id);
            if (data?.cast) setCast(data.cast);
        };

        const getSimilarMovies = async () => {
            const data = await fetchSimilarMovies(id);
            if (data?.results) setSimilarMovie(data.results);
        };

        getMovieDetails();
        getMovieCredits();
        getSimilarMovies();
    }, [id]);

    return (
        <ScrollView
            contentContainerStyle={{
                paddingBottom: 20,
            }}
            className="flex-1 bg-slate-900"
        >
            <View className="w-full">
                <SafeAreaView className="absolute w-full z-20 flex-row justify-between items-center p-4">
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon strokeWidth={2.5} size={30} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsFavourite(!isFavourite)}
                    >
                        <HeartIcon
                            strokeWidth={2.5}
                            size={35}
                            color={isFavourite ? "red" : "white"}
                        />
                    </TouchableOpacity>
                </SafeAreaView>
                {isLoading ? (
                    <ProgressLoader />
                ) : (
                    <View>
                        <Image
                            source={{ uri: image500(movie?.poster_path) || "" }}
                            style={{ width, height: height * 0.5 }}
                        />
                        <LinearGradient
                            colors={["transparent", "rgba(23, 23, 23, 0.8)", "rgba(23, 23, 23, 1)"]}
                            style={{
                                width,
                                height: height * 0.4,
                            }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className="absolute bottom-0"
                        />
                    </View>
                )}
            </View>
            <View className="space-y-4 px-4 mt-6" style={{ marginTop: -40 }}>
                <Text className="text-white text-3xl font-bold tracking-widest">
                    {movie?.title || "N/A"}
                </Text>

                {movie?.id && (
                    <Text className="text-neutral-400 font-semibold text-base text-center my-3">
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                            {movie?.status ?? "Unknown"} ·
                            {typeof movie?.release_date === "string"
                                ? movie.release_date.split("-")[0]
                                : "N/A"} ·
                            {movie?.runtime ? `${movie.runtime} min` : "N/A"}
                        </Text>
                    </Text>
                )}

                <View className="flex-row justify-center mx-4 items-center space-x-2 gap-3">
                    {Array.isArray(movie?.genres) &&
                        movie.genres.map((genre: any) => (
                            <View key={genre?.id} className="border border-neutral-500 rounded-full px-3 py-1">
                                <Text className="text-neutral-400 font-semibold text-base text-center">
                                    {genre?.name}
                                </Text>
                            </View>
                        ))}

                </View>

                <Text className="text-neutral-400 text-base tracking-wide leading-6 mt-4">
                    {movie?.overview || "N/A"}
                </Text>
            </View>

            {movie?.id && cast.length > 0 && <Cast cast={cast} />}

            {movie?.id && similarMovie?.length > 0 && (
                <UpcomingMovies
                    upcoming={similarMovie}
                    title={"Similar movies"}
                />
            )}
        </ScrollView>
    );
}
