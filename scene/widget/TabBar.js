import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
  } from 'react-native';

export default class TabBar extends Component {
    // propTypes = {
    //     activeTab: React.PropTypes.number,
    //     tabs: React.PropTypes.array,
    //     activeTextColor: React.PropTypes.string,
    //     inactiveTextColor: React.PropTypes.string,
    //     activeBgColor: React.PropTypes.string,
    //     inactiveBgColor: React.PropTypes.string
    // }
    constructor(props) {
        super(props);
        this.props = {
                defaultLeftDrawable: '../image/tab_bt_left_default.png',
                selectedLeftDrawable: '../image/tab_bt_left_selected.png',
                defaultRightDrawable:'../image/tab_bt_right_default.png',
                selectedRightDrawable:'../image/tab_bt_right_selected.png'};
       }
       
       render() {
         return (
            <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
                {/*  tabs 循环 */}
                {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page;
                    const renderTab = this.renderTab;
                    return renderTab(name, page, isTabActive, this.props.goToPage);
                })}
          </View>
         );
       }

       renderTab(name, page, isTabActive, onPressHandler){

            // const { activeTextColor, inactiveTextColor, activeBgColor, inactiveBgColor} = this.props;
            const textColor = isTabActive ?  '#000000' : '#fed226';
            
            var leftDrawable = isTabActive
            ? require("../image/tab_bt_left_selected.png")
            : require("../image/tab_bt_left_default.png");
            var rightDrawable = isTabActive
            ? require("../image/tab_bt_right_selected.png")
            : require("../image/tab_bt_right_default.png");

            var icon = page == 0 ?
            leftDrawable : rightDrawable;

            return <TouchableOpacity
            style={{flex: 1, }}
                key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
          >
            <View style={[styles.tab,]}>
            
              <Image source={icon} style={styles.image}/>
              <Text style={[{color: textColor, fontSize: 13 },  ]}>
                  {name}
              </Text>
             
            </View>
          </TouchableOpacity>;
       }
     
}

const styles = StyleSheet.create({
    tab: {
      // position: 'absolute',
      position:'absolute',
      width:102,
      height:30,
      alignItems: 'center',
      justifyContent: 'center'
    },
    image:{
      position:'absolute',
      justifyContent:'center',
      width:102,
      height:30,
      resizeMode: "stretch"
    },
    tabs: {
      height: 36,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
  });