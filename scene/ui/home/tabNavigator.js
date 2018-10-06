import React, { Component } from 'react';

import {
  Platform,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import{
  TabNavigator,
  createBottomTabNavigator
} from 'react-navigation'
import MainScene from '../../ui/home/mainScene';
import DataScene from '../../ui/home/dataScene';
import MemberScene from '../../ui/home/memberScene';
import MineScene from '../../ui/home/mineScene';

const iconHomeDefault = require('../../image/icon_tab_home_default.png');
const iconHomeSelected = require('../../image/icon_tab_home_selected.png');
const iconDataDefault = require('../../image/icon_tab_data_default.png');
const iconDataSelected = require('../../image/icon_tab_data_selected.png');
const iconMemberDefault = require('../../image/icon_tab_members_default.png');
const iconMemberSelected = require('../../image/icon_tab_members_selected.png');
const iconMyDefault = require('../../image/icon_tab_my_default.png');
const iconMySelected = require('../../image/icon_tab_my_selected.png');

export const AppNavigator =  createBottomTabNavigator({
	MainScene: {
        screen: MainScene, navigationOptions: {
		tabBarLabel: '首页',
		tabBarIcon: ({ tintColor, focused }) => (
			<Image resizeMode='contain'
				source={!focused ? iconHomeDefault : iconHomeSelected}
				style={[{height: 24, width: 24}]}
			/>
		)
	}},
	DataScene: {screen: DataScene, navigationOptions: {
		tabBarLabel: '数据',
		tabBarIcon: ({ tintColor, focused }) => (
				<Image style={[{height: 24, width: 24}]} 
					resizeMode='contain' 
					source={!focused ? iconDataDefault : iconDataSelected}
				/>
		)
	}},
	MemberScene: {screen: MemberScene, navigationOptions: {
		tabBarLabel: '会员',
		tabBarIcon: ({ tintColor, focused }) => (
				<Image style={[{height: 24, width: 24}]} 
					resizeMode='contain' 
					source={!focused ? iconMemberDefault : iconMemberSelected}
				/>
		)}
	},
	MineScene: {screen: MineScene, navigationOptions: {
		tabBarLabel: '我的',
		tabBarIcon: ({ tintColor, focused }) => (
				
			
				<Image style={[{height: 24, width: 24}]} 
					resizeMode='contain' 
					source={!focused ? iconMyDefault : iconMySelected }
				/>
		)},
	}
}, {
	tabBarPosition: 'bottom',
	lazy: true, // 是否懒加载
	//是否在更改标签时显示动画
    animationEnabled: false,
    //是否允许在标签之间进行滑动
    swipeEnabled: false,
    //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    backBehavior: "none",
	initialRouteName: 'MainScene',
	tabBarOptions: {
		showIcon: true,
		pressOpacity: 0.8,
		style: {
			height:50,
			backgroundColor: '#ffffff',
			zIndex: 0,
			position: 'relative'
    	},
    	labelStyle: {
			color: '#323232',
        	fontSize: 10,
			paddingVertical: 0,
			marginTop: 6.67
    	},
		iconStyle: {
			marginTop: -6.67
		},
		tabStyle: {
			backgroundColor: 'rgb(255,255,255)',
		},
	}
});