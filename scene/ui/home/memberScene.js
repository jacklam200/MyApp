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
import SodiumTool from '../../utils/SodiumTool'
export default class MemberScene extends BaseComponent {
    constructor(props) {
        super(props)
        this.state = {
            sodium_version: 'test',
            sodium_nonce:'nonce',
            sodium_result:'pubkey',
            sodium_source:'prikey',
            sodium_origin:'test',
            sodiumError:'error'
        }
    }

    componentWillMount() {
        super. componentWillMount();

        SodiumTool.encodeByClientSecretKey("test",
         "1c2f4ddfa053b682a13c43fca7f82782438078ce29e1dab10857813c336f71e8",
          "a6fac5cb60f64f886f74a7fb4601ee5068b04affc768048c6506faac757f8c41")
        .then(([nonceB64, resultB64])=> {
            this.setState({
                sodium_nonce : nonceB64,
                sodium_result : resultB64})
        })
        .catch((error)=> {

         } );

         SodiumTool.decodeByServerPublicKey("VTNzaATdyxRnzUGE1AdyG6TohEU=",
         "1c2f4ddfa053b682a13c43fca7f82782438078ce29e1dab10857813c336f71e8",
          "a6fac5cb60f64f886f74a7fb4601ee5068b04affc768048c6506faac757f8c41", 
          "u1X43BOyyyUSxCrc/P/XWy3V3hf1Z0qv")
        .then((result)=> {
            this.setState({
                sodium_source : result})
        })
        .catch((error)=> {

         } );
    }

    render(){
        super.render();
        return (
            <View>
               <Text>version:{this.state.sodium_version}</Text>
                <Text>nonce:{this.state.sodium_nonce}</Text>
                <Text>source:{this.state.sodium_source}</Text>
                <Text>result:{this.state.sodium_result}</Text>
                <Text>error:{this.state.sodiumError}</Text>
            </View>
        );
    }
}