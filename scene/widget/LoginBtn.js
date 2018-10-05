import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
export default class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
       }
       render() {
         return (
           <View  style={LoginStyles.loginContainer}>
           <TouchableOpacity onPress={this.props.onPressCallback} style={LoginStyles.loginTextView}>
             <Text style={LoginStyles.loginText} >
                 {this.props.name}
             </Text>
           </TouchableOpacity>
           </View>
         );
       }
     
}

const LoginStyles = StyleSheet.create({

    loginText: {
       color: '#323232',
       fontWeight: 'bold',
       flexDirection: 'row',
      
    },
    loginContainer:{
      marginTop: 10,
      height:44,
      flexDirection: 'row',
    },
    loginTextView: {
      flexDirection: 'row',
      flex:1,
      backgroundColor: '#fed427',
      borderRadius:5,
      alignItems: 'center',
      justifyContent:'center',
    },
  });