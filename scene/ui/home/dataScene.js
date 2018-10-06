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
import Base64 from 'base64-js'
import Sodium from 'react-native-sodium'

const clientPublicKey = '888ec4532f7b5cff30609f5ebe904f23797bc31dedd0dcb2afd39cd84a20c76a';
const clientPrivateKey = '1c2f4ddfa053b682a13c43fca7f82782438078ce29e1dab10857813c336f71e8';
const serverPublicKey = 'a6fac5cb60f64f886f74a7fb4601ee5068b04affc768048c6506faac757f8c41';
const serverPrivateKey = '70050e783ced42343079347d33b8154c576f29330eb9a25dd610b6dafef3bc4b';

function* _nonce(){
    var nonce = null;
    yield Sodium.randombytes_buf(Sodium.crypto_box_NONCEBYTES).then((value) => {
        console.log("promise value:" + value);
        nonce = Base64.toByteArray(value);
        console.log("promise:" + nonce);
      })
     console.log("_nonce:" + nonce);
    
    return nonce;
}
export default class DataScene extends BaseComponent {
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
        this._encrypt(this.state.sodium_origin);
    }
    
    render(){
        console.log("version:" + this.state.sodium_version);
        console.log("nonce:" + this.state.sodium_nonce);
        console.log("source:" + this.state.sodium_source);
        console.log("result:" + this.state.sodium_result);
        console.log("error:" + this.state.sodiumError);
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

    _encrypt(text){
        console.log('_encrypt:' + text);
        Sodium.sodium_version_string()
        .then((version) => this.setState({sodium_version: version}))
        .catch((error) => this._handleError(error))
       
        
        // var p = new Promise(function(resolve, reject){
        //     resolve();
        // });
       
        Promise.all([Sodium.randombytes_buf(Sodium.crypto_box_NONCEBYTES)]).
        then(([n]) =>{
             // 1c2f4ddfa053b682a13c43fca7f82782438078ce29e1dab10857813c336f71e8
            let alice_secretkey = this.hexStringToBytes(clientPrivateKey);
            console.log('alice_secretkey:' + alice_secretkey);
            // a6fac5cb60f64f886f74a7fb4601ee5068b04affc768048c6506faac757f8c41
            let bob_publickey =  this.hexStringToBytes(serverPublicKey);// pk
            console.log('bob_publickey:' + bob_publickey); 
            console.log("nonce value:" + n);
            nonce = Base64.toByteArray(n);
            console.log("nonce:" + nonce);
            console.log("text:" + text);
            this.setState({sodium_nonce:n});
            let rawText = this.stringToByte(text);
            console.log("raw text:" + text);
            Sodium.crypto_box_easy(Base64.fromByteArray(rawText),n,Base64.fromByteArray(bob_publickey),
            Base64.fromByteArray(alice_secretkey)).
                then((result) =>{
                    console.log("result:" + result);
                    this.setState({sodium_result:result});
                    Sodium.crypto_box_open_easy(result,n,Base64.fromByteArray(bob_publickey),
                    Base64.fromByteArray(alice_secretkey))
                        .then((mm) => {
                            console.log("decode result base64:" + mm);
                            let source = Base64.toByteArray(mm);
                            let sourceStr = this.byteToString(source);
                            console.log("decode result :" + sourceStr);
                            this.setState({sodium_source:sourceStr});
                        });

                });

        });
        
       
    }

    _decode(text, nonce){
        console.log('_decode:' + text);
        console.log('nonce:' + nonce);
    }

    _handleError(error) {
        console.log(error)
        this.setState({sodiumError: error})
      }


      

    _nonce2Base64(nonce){
        let nonceB64 = Base64.fromByteArray(nonce);
        return nonceB64;

    }

    _nonceFromBase64(nonceB64){

    }

    stringToByte(str) {
        var bytes = new Array();
        var len, c;
        len = str.length;
        for(var i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if(c >= 0x010000 && c <= 0x10FFFF) {
                bytes.push(((c >> 18) & 0x07) | 0xF0);
                bytes.push(((c >> 12) & 0x3F) | 0x80);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if(c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(((c >> 12) & 0x0F) | 0xE0);
                bytes.push(((c >> 6) & 0x3F) | 0x80);
                bytes.push((c & 0x3F) | 0x80);
            } else if(c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(((c >> 6) & 0x1F) | 0xC0);
                bytes.push((c & 0x3F) | 0x80);
            } else {
                bytes.push(c & 0xFF);
            }
        }
        return bytes;
    

    }

     byteToString(arr) {
        if(typeof arr === 'string') {
            return arr;
        }
        var str = '',
            _arr = arr;
        for(var i = 0; i < _arr.length; i++) {
            var one = _arr[i].toString(2),
                v = one.match(/^1+?(?=0)/);
            if(v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = _arr[i].toString(2).slice(7 - bytesLength);
                for(var st = 1; st < bytesLength; st++) {
                    store += _arr[st + i].toString(2).slice(2);
                }
                str += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            } else {
                str += String.fromCharCode(_arr[i]);
            }
        }
        return str;
    }


    hexStringToBytes(hexString){
        var d = null;
        if(hexString !== 'undefined' && hexString.length >0){
            hexString = hexString.toUpperCase();
            console.log('hexStringToBytes:' + hexString);
            let length = hexString.length / 2;
            d = new Uint8Array(length);
            let hexChars =this.toCharArray(hexString);
            console.log('toCharArray:' + hexChars);
            for (let i = 0; i < length; i++) {
                let pos = i * 2;
                d[i] =(this.charToByte(hexChars[pos]) << 4 | this.charToByte(hexChars[pos + 1]));
            }

            console.log('toBytes:' + d);
        }

        return d;
    }

    toCharArray(hexString){
        return hexString.split("");
    }

    charToByte(c) {
        return "0123456789ABCDEF".indexOf(c);
    }
}