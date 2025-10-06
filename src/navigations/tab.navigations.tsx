import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Detailed from '../screens/Movie';
const Tab = createBottomTabNavigator();

export default function TabNavigations() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: 'orange',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ focused, color, size }) => {
                    return <MaterialIcons
                        name={route.name === 'Home' ? 'home' : 'details'}
                        size={size}
                        color={color}
                    />
                }
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
            <Tab.Screen
                name="Detailed"
                component={Detailed}
                options={{ headerShown: false }}

            />
        </Tab.Navigator>
    );
}
