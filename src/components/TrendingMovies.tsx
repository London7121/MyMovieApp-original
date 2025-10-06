import React from 'react'
import { View, Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import MovieCard from './MovieCard';

export default function TrendingMovies({ trending }: any) {
    const { width } = Dimensions.get('window');

    return (
        <View className=''>
            <Carousel
                width={width}
                height={600}
                autoPlay={true}
                data={trending}
                loop={true}
                scrollAnimationDuration={1500}
                renderItem={({ item }: any) => <MovieCard item={item} />}
                mode="parallax"
            />
        </View>
    )
}
