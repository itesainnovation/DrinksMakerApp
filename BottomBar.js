import React from 'react';
import {View, StyleSheet} from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import Home from './Home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from 'react-navigation-stack';
import Settings from './Settings';
import NewDrink from './NewDrink';
import SuccessScreenDrink from './SuccessScreenDrink';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import BluetoothSettings from "./BluetoothSettings";
import CleanSettings from "./CleanSettings";
import ServeComponent from "./ServeComponent";
import SetMachine from "./SetMachine";
import SuccessServeScreen from "./SuccessServeScreen";

const TabHome = createStackNavigator({
    Home: {
        screen: Home,
    },
    Serve: {
        screen: ServeComponent,
    },
    SuccessServeScreen: {
        screen: SuccessServeScreen,
    },
});
const TabNew = createStackNavigator({
    NewDrink: {
        screen: NewDrink,
    },
    SuccessScreenDrink: {
        screen: SuccessScreenDrink,
    },
});
const TabConfig = createStackNavigator({
    Settings: {
        screen: Settings,
    },
    Bluetooth:{
      screen: BluetoothSettings,
    },
    Clean:{
      screen: CleanSettings,
    },
    Set:{
        screen: SetMachine,
    },


});
const BottomBar = createMaterialBottomTabNavigator(
    {
        Home: { screen: TabHome, navigationOptions: {
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon size={26} name="home-modern" style={{ color: tintColor }} />
                ), title: 'Home',
            } },
        Add: { screen: TabNew, navigationOptions: {
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon size={26} name="plus" style={{ color: tintColor }} />
                ),
            } },
        Settings: { screen: TabConfig, navigationOptions: {
                tabBarIcon: ({ tintColor, focused }) => (
                    <Icon size={26} name="settings-outline" style={{ color: tintColor }} />
                ),
            } },
    },
    {
        labeled: false,
        initialRouteName: 'Home',
        activeColor: '#fff',
        inactiveColor: 'rgba(255,255,255,0.51)',
        barStyle: { backgroundColor: '#303030' },
    }
);


export default createAppContainer(BottomBar);

const styles = StyleSheet.create({
  container: {

  },
});