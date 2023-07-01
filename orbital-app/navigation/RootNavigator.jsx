import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import PetScreen from "../screens/pet/PetScreen";
import TabNavigator from "./TabNavigator";


const AppStack = createStackNavigator();

const RootNavigator = () => (
    <NavigationContainer>
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="Tab" component={TabNavigator} />
            <AppStack.Screen name="PetScreen" component={PetScreen} />
        </AppStack.Navigator>
    </NavigationContainer>
);

export default RootNavigator;
