import React from 'react'
import { Dimensions, Image, Text, View, ScrollView } from 'react-native'
import { image185 } from '../api'

export default function UpcomingMovies({ upcoming, title }: any) {
    const { width, height } = Dimensions.get('window');

    return (
        <View className='mb-8 space-y-4'>
            <Text className=' text-xl text-red-500 font-semibold my-2'>{title}</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className='px space-x-4'
                contentContainerStyle={{ paddingRight: 15 }}
            >
                {upcoming?.map((item: any) => (
                    <View key={item?.id} className='space-y-2 mr-4'>
                        <Image source={{ uri: image185(item?.poster_path) || "" }}
                            className='text-white text-lg'
                            style={{ width: width * 0.3, height: height * 0.2, borderRadius: 10 }}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
