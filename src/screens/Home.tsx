import React from 'react'
import { Button, Text, View } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type Props = {
    navigation: NativeStackNavigationProp<any>
}

export default function Home({navigation}: Props) {
    return (
        <View className="flex-1 items-center justify-center mt-4">
            <Text className="text-[40px] font-bold mb-4 text-red-500">Home</Text>
            <Button 
                onPress={() => navigation.navigate('Detailed')}
                title="Go to Details"
            />
        </View>
    )
}
