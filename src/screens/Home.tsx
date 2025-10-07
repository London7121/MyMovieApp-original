import React, { useEffect, useState } from 'react'
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { fetchPopularMovie, fetchTopRatedMovie, fetchTrendingMovies, fetchUpcomingMovie } from '../api/index'
import TrendingMovies from '../components/TrendingMovies'
import UpcomingMovies from '../components/UpcomingMovies'
import ProgressLoader from '../components/Loader/ProgressLoader'
import { useNavigation } from '@react-navigation/native'


export default function Home() {
    const navigation = useNavigation()
    const [loading, setIsLoading] = useState(true)
    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const [popular, setPopular] = useState([])

    useEffect(() => {

        const getData = () => {
            getTendingMovies();
            getUpcomingMovies();
            getTopRatedMovies();
            getPopularMovies();
            setIsLoading(false)
        }
        getData();
    }, [])

    const getTendingMovies = async () => {
        const data = await fetchTrendingMovies();
        setTrending(data?.results)
        setIsLoading(false)
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovie();
        setUpcoming(data?.results)
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovie();
        setTopRated(data?.results)
    }
    const getPopularMovies = async () => {
        const data = await fetchPopularMovie();
        setPopular(data?.results)
    }

    return (
        <View className="flex-1 bg-slate-900">
            <SafeAreaView>
                <StatusBar barStyle="light-content" />
                <View className="flex-row items-center justify-between mx-4  my-2">
                    {/* <Image source={require('../../assets/images/icon.png')} className="h-[50px] w-[50px] rounded-xl" /> */}
                    <Text className="text-red-500 text-3xl font-bold">LOGO</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <MagnifyingGlassIcon color="white" size={30} strokeWidth={2} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView >
            {
                loading ? <ProgressLoader /> :
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: 100,
                        }}
                    >
                        {trending?.length > 0 && (<TrendingMovies trending={trending} />)}
                        {upcoming?.length > 0 && (<UpcomingMovies upcoming={upcoming} title={"Upcoming Movie"} />)}
                        {popular?.length > 0 && (<UpcomingMovies upcoming={popular} title={"Popular Movie"} />)}
                        {popular?.length > 0 && (<UpcomingMovies upcoming={trending?.reverse()} title={"Trending Movie"} />)}
                        {topRated?.length > 0 && (<TrendingMovies trending={topRated} />)}
                    </ScrollView>
            }


        </View >
    )
}
