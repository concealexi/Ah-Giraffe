import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from "react-native";
import PetScreen from "../screens/pet/PetScreen";
import TodoScreen from "../screens/todo/TodoScreen";
import TaskScreen from "../screens/task/TaskScreen";
import {useNavigation} from "@react-navigation/native";

const AppTab = createBottomTabNavigator();

const screens = [
    {
        name: 'TODO',
        component: TodoScreen,
        options: {
            title: 'TodoScreen',
            icon: require('../assets/icons/todo.png'),
            focusedIcon: require('../assets/icons/todo_activated.png'),
            headerShown: false,
        },
    },
    {
        name: 'task',
        component: TaskScreen,
        options: {
            title: 'TaskScreen',
            icon: require('../assets/icons/task.png'),
            focusedIcon: require('../assets/icons/task_activated.png'),
            headerShown: false,
            tabBarStyle: {
                backgroundColor: 'rgba(249, 246, 204, 0.9)'
            }
        },
    },
    {
        name: 'pet',
        component: PetScreen,
        options: {
            title: 'PetScreen',
            icon: require('../assets/icons/pet.png'),
            focusedIcon: require('../assets/icons/pet_activated.png'),
            headerShown: false,
        },
    },
];

const TabNavigator = () => {
    const navigation = useNavigation();

    return(
        <AppTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'transparent',
                tabBarStyle: styles.tabBarStyle,
                tabBarLabelStyle: {
                    display: 'none',
                },
            }}
        >
            {screens
                // .filter((screen) => screen.name !== 'pet')
                .map(screen => (
                <AppTab.Screen
                    key={screen.name}
                    name={screen.options.title}
                    component={screen.component}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Image
                                source={focused ? screen.options.focusedIcon : screen.options.icon}
                                style={styles.icon}
                            />
                        ),
                        headerShown: screen.options.headerShown,
                        tabBarStyle: {
                            ...styles.tabBarStyle,
                            ...screen.options.tabBarStyle
                        },
                    }}
                    listeners={({ navigation, route }) => ({
                        tabPress: (e) => {
                            e.preventDefault();
                            navigation.navigate(screen.name === 'pet' ? "PetScreen" : route);
                        },
                    })}
                />
            ))}
        </AppTab.Navigator>
    )
};

const styles = StyleSheet.create({
    icon: {
        width: 34,
        height: 34,
    },
    tabBarStyle: {
        borderTopWidth: 0,
        elevation: 0,
        height: 78,
        paddingTop: 5,
        paddingBottom: 5
    }
});

export default TabNavigator;
