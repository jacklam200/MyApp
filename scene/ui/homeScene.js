import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Image,
    Text,
    Alert,
    Button
} from 'react-native';

import BaseComponent from '../base/BaseComponent'
import { AppNavigator } from '../ui/home/tabNavigator';
export default class HomeScene extends BaseComponent {
    render(){
        var item = this.props.navigation.state.params;
        console.log(item);
        super.render();
        
        return (
            <AppNavigator screenProps={item}/>
        );
    }
}