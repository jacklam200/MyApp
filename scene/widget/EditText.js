import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity
  } from 'react-native';

  export default class EditView extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
      
        return (

          <View style={LoginStyles.TextInputView}>
            <Image source={this.props.image} 
                    style={LoginStyles.TextInputImage}/>
            <TextInput style={LoginStyles.TextInput}
              placeholder={this.props.name}
              secureTextEntry={this.props.secureTextEntry}
              onChangeText={
                (text) => {
                  this.setState({text});
                  this.props.onChangeText(text);
                }
              }
            />
           </View>
        );
      }
  }

  const LoginStyles = StyleSheet.create({

    TextInputView: {
      marginTop: 10,
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      alignItems:'center',
    },
    TextInputInnerView:{
      backgroundColor:'white',
      height:48,
      flexDirection:'row',
      alignItems:'center',
    },
    TextInputImage:{
      width:20,
      height:20,
      justifyContent: 'flex-start'

    },
  
    TextInput: {
      height:50,
      flex: 1,
      textAlign: 'left',
      textAlignVertical:'bottom',
      flexDirection: 'row',
    },
  });