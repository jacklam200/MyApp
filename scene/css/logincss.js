import React, { Component } from 'react';
import {
    PixelRatio,
    StyleSheet,
    Dimensions
  } from 'react-native'; 

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    logo:{
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'white',
        width:160,
        height:118,
        marginTop:20,
        marginBottom:20,
    },
    desc:{
        flex: 1,
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'white',
    },
    bottomLogo:{
    
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'flex-end',
        width:60,
        height:15,
        backgroundColor:'white',
        marginBottom:20,
    }

});
module.exports = LoginStyles;