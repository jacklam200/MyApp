/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import{
  StackNavigator,
  createStackNavigator
} from 'react-navigation'
import Launcher from './Launcher'
import LoginScene from './ui/loginScene'
import HomeScene from './ui/homeScene'
export default App = createStackNavigator({
    // 默认加载第一个页面,这里用来注册需要跳转的页面
    Launcher:{
      screen:Launcher,
      navigationOptions: {
        /**headerTitle: 'Detail'*/
        title:'Launcher Page',
        header:null,
      }
      
      
    },
    LoginScene:{
      screen:LoginScene,
      navigationOptions: {
        /**headerTitle: 'Detail'*/
        title:'Login Page',
        header:null,
      }
    },

    HomeScene:{
      screen:HomeScene,
      navigationOptions: {
        /**headerTitle: 'Detail'*/
        title:'Home Page',
        header:null,
      }
    },
  
});

