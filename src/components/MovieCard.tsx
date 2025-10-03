import React from 'react'
import { Dimensions, Image, Text, View } from 'react-native'
import { image500 } from '../api'

export default function MovieCard({ item }: any) {
    const { width, height } = Dimensions.get('window');
    return (
        <View className="">
            <Image
                source={{ uri: image500(item?.poster_path) || "" }}
                className="h-full w-full rounded-3xl"
                style={{ width: width, height: height * 0.72 }}
            />
        </View>
    )
}
