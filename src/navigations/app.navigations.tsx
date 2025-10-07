import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import Person from '../components/Person';
import Search from '../screens/Search';

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
                name="Movie"
                component={Movie}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Person"
                component={Person}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Search"
                component={Search}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
