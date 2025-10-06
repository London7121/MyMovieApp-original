import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import * as Progress from 'react-native-progress';

export default function ProgressLoader() {
    const { width, height } = Dimensions.get("window");

    return (
        <View style={{ width, height }} className='absolute flex-row justify-center items-center'>
            <Progress.CircleSnail
                size={70}
                thickness={6}
                color={['#E50914', '#FFF', '#E50914']}
                indeterminate={true}
            />
        </View>
    )
}
