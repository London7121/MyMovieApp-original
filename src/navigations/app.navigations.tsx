import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Detailed from '../screens/Detailed';

const Stack = createNativeStackNavigator();

export default function AppNavigations() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Detailed"
                component={Detailed}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
