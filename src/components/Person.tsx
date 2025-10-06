import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { fetchPersonDetail, fetchPersonMovies, image342 } from '../api'
import ProgressLoader from './Loader/ProgressLoader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline'
import UpcomingMovies from './UpcomingMovies'

type RootStackParamList = {
    Movie: { id: number };
};

interface MovieDetails {
    id: number;
    profile_path: string;
    title?: string;
    overview?: string;
    release_date?: string;
    [key: string]: any;
}


export default function Person() {
    const navigation = useNavigation()
    const [person, setPerson] = useState<MovieDetails>({} as MovieDetails)
    const [isLoading, setIsLoading] = useState(true);
    const { width, height } = Dimensions.get("window");
    const [personMovies, setPersonMovies] = useState([])
    const [isFavourite, setIsFavourite] = useState(false);
    const route = useRoute<RouteProp<RootStackParamList, "Movie">>();
    const { id } = route.params;

    const personDetail = async () => {
        const data = await fetchPersonDetail(id)
        setPerson(data)
        setIsLoading(false)
    }
    const personMovie = async () => {
        const data = await fetchPersonMovies(id)
        setPersonMovies(data?.cast)
    }

    useEffect(() => {
        personDetail()
        personMovie()
    }, [id])

    return (
        <ScrollView className='flex-1 bg-slate-900' contentContainerStyle={{ paddingBottom: 20 }}>
            {isLoading ? <ProgressLoader /> :
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
            }
            {isLoading ? <ProgressLoader /> :
                (
                    <View className='mt-14'>
                        <View
                            className='flex-col items-center justify-center'
                            style={{
                                shadowColor: 'gray',
                                shadowRadius: 40,
                                shadowOffset: { width: 0, height: 5 },
                                shadowOpacity: 1
                            }}
                        >
                            <View className='items-center rounded-full overflow-hidden h-[288px] w-[288px] border-neutral-500 border-r-2'>
                                <Image
                                    source={{ uri: image342(person?.profile_path) || "" }}
                                    style={{ height: height * 0.43, width: width * 0.74 }}
                                />
                            </View>
                            <View className='mt-6'>
                                <Text className='text-3xl text-white font-bold text-center'>{person?.name}</Text>
                                <Text className='text-neutral-400 text-base text-center'>{person?.place_of_birth}</Text>
                            </View>
                        </View>
                        <View className='mx-3 p-4 mt-6 flex-row items-center justify-between  bg-neutral-800 rounded-full'>
                            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                <Text className='text-white font-semibold'>Gender</Text>
                                <Text className='text-neutral-400 text-sm'>{person?.gender === 1 ? 'Female' : 'Male'}</Text>
                            </View>
                            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                <Text className='text-white font-semibold'>Birthday</Text>
                                <Text className='text-neutral-400 text-sm'>{person?.birthday}</Text>
                            </View>
                            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                <Text className='text-white font-semibold'>known for</Text>
                                <Text className='text-neutral-400 text-sm'>{person?.known_for_department}</Text>
                            </View>
                            <View className='border-r-2 border-r-neutral-400 px-2 items-center'>
                                <Text className='text-white font-semibold'>Popularity</Text>
                                <Text className='text-neutral-400 text-sm'>{person?.popularity?.toFixed(2)} %</Text>
                            </View>
                        </View>
                        <View className='my-6 mx-4 space-y-2'>
                            <Text className='text-white text-lg'>Biography</Text>
                            <Text className='text-neutral-400 tracking-wide'>{person?.biography}</Text>
                        </View>
                        {person?.id && personMovies.length > 0 && <UpcomingMovies upcoming={personMovies} title={"Moviees"} />}
                    </View>
                )}
        </ScrollView>
    )
}
