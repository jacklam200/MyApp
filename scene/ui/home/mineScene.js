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
import HttpRequest from '../../network/http/HttpRequest'
import CircleTouch from '../../widget/CircleTouch';
export default class MineScene extends BaseComponent {

    componentWillMount() {
        super. componentWillMount();
        let request = new HttpRequest();
        request.serverUrl("http://hlj-api2.rainbowcn.net/rainpay-ms-app/getAccountBalance");
        request.header("x-http-version", "3.7.5.1");
        request.header("x-http-package", "cn.rainbow.westore");
        request.header("x-http-screenheight", "2392");
        request.header("x-http-deviceuid", "801de88b366c610885fa993dd2949889");
        request.header("j-http-devicetoken", "190e35f7e0144e50540");
        request.header("x-http-devicetype", "android");
        request.header("x-http-timestamp", "1539074222");
        request.header("x-http-devicetoken", "190e35f7e0144e50540");
        request.header("x-http-interface-v", "1.0.0");
        request.header("x-http-token", "ea49cd0c9b9078d584cd5c9024869802");
        request.header("x-http-screenwidth", "1440");
        request.header("x-http-member", "10002");
        var js = {
            vipAccount:"7800100000002282",
        };
        request.json(js);
        request.startAsync(true).then((e)=>{
            console.log("startAsync result:" + e);
            console.log("one filed:" + e.message);
        });
        console.log("start");
    }
    
    render(){
        console.log("start MineScene render");
        super.render();
        
        return (
            <View style={{ flex:1, flexDirection:'column'}}>
                <View style={{ position: 'absolute', width: 60, height: 100, backgroundColor: 'powderblue' }}>
                    <Text>我是里面的MineScene View</Text>
                </View>
                <View style={{ backgroundColor: 'red' }}>
                    <Text>我是里面下面的View</Text>
                </View>

                <View style={{flex:1, backgroundColor: 'black' }}>
                    <CircleTouch/>
                </View>
        </View>
        );
    }
}