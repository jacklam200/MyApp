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

export default class HomeScene extends BaseComponent {
    render(){
        super.render();
        return (
            <View style={{flexDirection:'row'}}>
            <View style={{ width: 60, height: 100, backgroundColor: 'powderblue' }}>
                <Text>我是里面的View</Text>
            </View>
            <View style={{ backgroundColor: 'red' }}>
                <Text>我是里面下面的View</Text>
            </View>
        </View>
        );
    }
}