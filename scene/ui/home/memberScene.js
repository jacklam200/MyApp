import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Image,
    Text,
    Alert,
    ScrollView,
    Button
} from 'react-native';

import BaseComponent from '../../base/BaseComponent'

export default class MemberScene extends BaseComponent {
    render(){
        super.render();
        return (
            <View style={{ flex:1, flexDirection:'column'}}>
                <View style={{ position: 'absolute', width: 60, height: 100, backgroundColor: 'powderblue' }}>
                    <Text>我是里面的MemberScene View</Text>
                </View>
                <View style={{ backgroundColor: 'red' }}>
                    <Text>我是里面下面的View</Text>
            </View>
        </View>
        );
    }
}