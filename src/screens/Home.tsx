import React, { useEffect, useState } from 'react'
import { Image, ScrollView, StatusBar, Text, View } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { fetchTopRatedMovie, fetchTrendingMovies, fetchUpcomingMovie } from '../api/index'
import TrendingMovies from '../components/TrendingMovies'
import UpcomingMovies from '../components/UpcomingMovies'
import TopRatedMovies from '../components/TopRatedMovies'

type Props = {
    navigation: NativeStackNavigationProp<any>
}

export default function Home({ navigation }: Props) {

    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])

    useEffect(() => {
        getTendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, [])

    const getTendingMovies = async () => {
        const data = await fetchTrendingMovies();
        setTrending(data?.results)
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovie();
        setUpcoming(data?.results)
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovie();
        setTopRated(data?.results)
    }

    return (
        <View className="flex-1 bg-slate-900">
            <SafeAreaView>
                <StatusBar barStyle="light-content" />
                <View className="flex-row items-center justify-between mx-4  my-2">
                    {/* <Image source={require('../../assets/images/icon.png')} className="h-[50px] w-[50px] rounded-xl" /> */}
                    <Text className="text-red-500 text-3xl font-bold">LOGO</Text>
                    <MagnifyingGlassIcon color="white" size={30} strokeWidth={2} />
                </View>
            </SafeAreaView >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            >
                {trending?.length > 0 && (<TrendingMovies trending={trending} />)}
                {upcoming?.length > 0 && (<UpcomingMovies upcoming={upcoming} title={"Upcoming Movie"} />)}
                {topRated?.length > 0 && (<TopRatedMovies />)}
            </ScrollView>
        </View >
    )
}
