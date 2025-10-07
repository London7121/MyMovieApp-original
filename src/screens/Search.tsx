import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchSearchMovie, image185 } from '../api'
import { debounce } from "lodash"
import ProgressLoader from '../components/Loader/ProgressLoader'

const { width, height } = Dimensions.get('window');
interface MovieDetails {
    id: number;
    profile_path: string;
    title?: string;
    overview?: string;
    release_date?: string;
    [key: string]: any;
}

export default function Search() {
    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(true);
    const [results, setResults] = useState<MovieDetails>({} as MovieDetails);

    const handleSearch = (searchText: string) => {
        if (searchText && searchText.length > 3) {
            setIsLoading(true);
            fetchSearchMovie({
                query: searchText,
                include_adult: false,
                page: '1',
            }).then(data => {
                setIsLoading(false);
                setResults(data.results);
            });
        } else {
            setResults([]);
            setIsLoading(false);
        }
    };

    const handleTextDobounce = useCallback(
        debounce(handleSearch, 400),
        []
    );
    return (
        <SafeAreaView className='flex-1 bg-slate-900'>
            <View className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-400 rounded-full'>
                <TextInput
                    onChangeText={handleTextDobounce}
                    placeholder='Search movie'
                    placeholderTextColor={"lightgray"}
                    className='pl-6 flex-1 text-base font-semibold text-white tracking-wide'
                />
                <TouchableOpacity onPress={() => navigation.navigate("Home")} className='rounded-full p-3 m-1 bg-neutral-400'>
                    <XMarkIcon color={"white"} />
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <ProgressLoader />
            ) : results?.length > 0 ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 15 }}
                    className='space-y-3 border'
                >
                    <Text className='text-white font-semibold ml-1'>
                        Relusts ({results?.length})
                    </Text>
                    <View className='flex-row justify-between flex-wrap mt-3'>
                        {
                            results?.map((item, idx) => (
                                <TouchableWithoutFeedback key={idx}>
                                    <View className='space-y-2 mb-4'>
                                        <Image
                                            source={{ uri: image185(item?.poster_path) || "" }}
                                            className='rounded-3xl'
                                            style={{
                                                width: width * 0.44,
                                                height: height * 0.3
                                            }}
                                        />
                                        <Text className="text-sm text-white font-semibold my-2">
                                            {item?.title
                                                ? item.title.length > 18
                                                    ? item.title.slice(0, 18) + "..."
                                                    : item.title
                                                : "Untitled"}
                                        </Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            ))
                        }
                    </View>
                </ScrollView>
            ) : (
                <View className='flex-col items-center justify-center'>
                    <Image
                        source={require('../../assets/movie-time.webp')}
                        className='h-100 w-100 bg-transparent'
                    />
                    <Text className='text-white text-3xl font-semibold pb-4'>Movies not found</Text>
                </View>
            )}
        </SafeAreaView>
    )
}
