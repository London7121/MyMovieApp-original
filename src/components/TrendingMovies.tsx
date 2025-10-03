import React from 'react'
import { Text, View, Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import MovieCard from './MovieCard';

export default function TrendingMovies({ trending }: any) {
    const { width, height } = Dimensions.get('window');

    return (
        <View className='mb-4 border-b border-slate-700'>
            <Carousel
                width={width}
                height={600}
                autoPlay={true}
                data={trending}
                loop={true}
                scrollAnimationDuration={1500}
                renderItem={({ item }: any) => <MovieCard item={item} />}
                mode="parallax"
                // modeConfig={{ parallaxScrollingScale: 0.9, parallaxScrollingOffset: 50 }}
            />
        </View>
    )
}
