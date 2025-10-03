import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Button, Text, View } from 'react-native'

type Props = {
    navigation: NativeStackNavigationProp<any>
}
export default function Detailed({ navigation }: Props) {
    return (
        <View className="flex-1 items-center justify-center mt-4">
            <Text className="text-2xl font-bold mb-4 text-red-500">Welcome to Detailed</Text>
            <Button
                onPress={() => navigation.navigate('Home')}
                title="Go to Home"
            />
        </View>
    )
}
