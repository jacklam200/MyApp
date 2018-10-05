import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';

import BaseComponent from './base/BaseComponent'
import LauncherStyles from './css/launchercss'
export default class Launcher extends BaseComponent {
    renderView() {
        return (
            <Image style={[LauncherStyles.container]}
             source={require('./image/dc_launchimage.png')} />
        );
    }

    // 复杂的操作:定时器\网络请求
     componentDidMount(){
         super.componentDidMount();
        // 定时: 隔2s切换到Login
         setTimeout(()=>{
            this.props.navigation.navigate('LoginScene');
         }, 2000);
        // this.props.navigation.navigate('LoginScene');
        // this.props.navigation.navigate('HomeScene');
     }

}