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
import BaseComponent from '../base/BaseComponent'
import EditText from '../widget/EditText'
import LoginButton from '../widget/LoginBtn'
import TabBar from '../widget/TabBar'
import LoginStyles from '../css/logincss'
import ContainerStyles from '../device/dimensions'
export default class LoginScene extends BaseComponent {
    constructor(props) {
        super(props);
        this.userName = "";
        this.password = "";
        this.state = {
            myName: 'I am MyName!',
            activePage:0,
        }
    }


    renderView() {

        let kk = "kk";
        let tabArray = ["test1", "test2"];
        return (
            
            <ScrollView contentContainerStyle={LoginStyles.container}>
                <Image source={require('../image/dc_icon_danei_logo.png')} style={[LoginStyles.logo]}/>
                <TabBar tabs={tabArray} activeTab={this.state.activePage} goToPage={(page)=>{
                    console.log("page:" + page);
                    this.setState({ activePage: page});
                }}/>

                {this.renderLogin()}
            
                <LoginButton style={{ marginTop: 80 }} name='登录' onPressCallback={this.onPressCallback} />
                <Text style={LoginStyles.desc}>登录说明</Text>
                <Image source={require('../image/dc_icon_tianhong_logo.png') } style={LoginStyles.bottomLogo}/>
            </ScrollView>
        );
    }

    renderLogin(){
        if(this.state.activePage == 0){
            return this.renderRainbowLogin();
            
        }
        return this.renderBBCLogin();
        
    }

    renderRainbowLogin(){
       
        return (
            <View>
                <EditText name='输入用户名/注册手机号' onChangeText={(text) => {
                    this.userName = text;
                }} />
                <EditText name='输入密码' secureTextEntry={true} onChangeText={(text) => {
                    this.password = text;
                }} />
            </View>
        );
    }

    renderBBCLogin(){
        return (
            <View>
                <EditText name='输入用户名/注册手机号' onChangeText={(text) => {
                    this.userName = text;
                }} />
                <EditText name='输入密码' secureTextEntry={true} onChangeText={(text) => {
                    this.password = text;
                }} />
                <EditText name='输入密码' onChangeText={(text) => {
                    this.password = text;
                }} />
            </View>
        );
    }

    getClassName() {
        return "LoginScene";
    }

    onPressCallback = () => {
        console.log("login");
        // let formData = new FormData();
        // formData.append("clientId", "32322");
        // formData.append("loginName", this.userName);
        // formData.append("pwd", this.password);
        // let usepsw = this.password + this.userName;
        // this.setState({ myName: usepsw });
        /* let url = "http://localhost:8080/loginApp";
         NetUitl.postJson(url,formData,(responseText) => {
               alert(responseText);
               this.onLoginSuccess();
         }) */


    };

}






