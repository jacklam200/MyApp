import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Image,
    Text,
    FlatList,
    RefreshControl,
    Alert,
    ScrollView,
    Button,
    Dimensions
} from 'react-native';
let win_width = Dimensions.get("window").width;
let win_height = Dimensions.get("window").height;
import BaseComponent from '../../base/BaseComponent'

export default class MainScene extends BaseComponent {
    render(){
        var data = this.props.screenProps;
        console.log(data);
        super.render();
        return (
            <View style={{ flex:1, flexDirection:'column', backgroundColor:'#CCCBC8'}}>
                {this._renderHeader()}
                <FlatList
                data={[{key: 'a'}, {key: 'b'}, {key: 'c'}
                , {key: 'd'} , {key: 'e'} , {key: 'f'}
                , {key: 'g'} , {key: 'h'} , {key: 'i'}
                , {key: 'j'} , {key: 'k'} , {key: 'l'}
                , {key: 'm'} , {key: 'n'} , {key: 'o'}
                , {key: 'p'} , {key: 'q'}
                , {key: 'r'} , {key: 's'} ,  {key: 't'}
                , {key: 'u'} , {key: 'v'} ,  {key: 'w'}
                , {key: 'x'} , {key: 'y'} ,  {key: 'z'}]}
                renderItem={this._renderItem}
                ListHeaderComponent={this._header}
                ListFooterComponent={this._footer}
                onRefresh={this.refreshing}
                refreshing={false}
                onEndReached={
                    this._onload
                }
                onEndReachedThreshold={0}
                numColumns ={1}
                />
        </View>
        );
    }

    refreshing(){
        let timer =  setTimeout(()=>{
                    clearTimeout(timer)
                    alert('刷新成功')
                },1500)
    }
    _onload(){
        let timer =  setTimeout(()=>{
            clearTimeout(timer)
            alert('加载成功')
        },1500)
    }


    _renderItem = (item) => {
        var txt = '第' + item.index + '个' + ' title=' + item.item.key;
        var bgColor = item.index % 2 == 0 ? 'white' : 'gray';
        return <View style={{alignItems:"center",backgroundColor:'#F8F8F8', height:100, 
        marginLeft:15, marginRight:15, marginBottom:15,borderRadius:9, width:win_width-30,
       flex:1, flexDirection:"row"}}> 
            <Image source={require('../../image/dc_dj_picking_icon_reduction.png')}
                style={{width:40,height:40, marginLeft:15,marginRight:15}} />
            <Text style={{flex:1, color:"#0E264A", fontSize:18}}>打包</Text>
            <Text  style={{color:"#EF4142", fontSize:18}}>8单</Text>
            <Image source={require('../../image/dc_dj_picking_icon_extended_gray.png')}
            style={{width:14,height:14, marginLeft:6,marginRight:14}}/>
        </View>
    }

     _renderHeader() {
        return <Text 
        style={[{backgroundColor:'#0E264A', textAlign:'center', textAlignVertical:'center', height:44, color:"#ffffff",fontSize:18}]}>
        天虹到家</Text>;
    }

    _header = () => {
        var data = this.props.screenProps;
        console.log(data.data.data.userRealName);
        return <View style={[{backgroundColor:'#CCCBC8',marginBottom:20,flexDirection:'column'}]}>
            <Image resizeMode='stretch' source={require('../../image/dc_dj_picking_icon_head_radian.png')} 
                style={{height:84, justifyContent:'center',width:win_width, position:'absolute',}}
            />
            <View style={{alignItems:"center",backgroundColor:'#F8F8F8', height:150, 
            marginLeft:15, marginRight:15, marginTop:7, borderRadius:9, width:win_width-30,
           flex:1}}> 
                <Image source={require('../../image/ic_launcher.png')}
                    style={{width:60,height:60, borderRadius:30, marginTop:14,resizeMethod:'resize'}}/>
                <Text style={{marginTop:8, color:"#0F254A", fontSize:16}}>{data.data.data.jobNumber}</Text>
                <View style={{flexDirection:"row", marginTop:7}}>
                    <Text style={{ color:"#999999", fontSize:13}}>君尚3019</Text>
                    <Text style={{marginLeft:15, marginRight:15,color:"#999999", fontSize:13}}>|</Text>
                    <Text style={{ color:"#999999", fontSize:13}}>居家生活</Text>
                </View>
            </View>
        </View>;
    }

    _footer = () => {
        return <Text style={[{backgroundColor:'red'}]}>这是尾部</Text>;
    }
}