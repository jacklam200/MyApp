import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
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
        // this.props = {
        //         activeTextColor: '#323232',
        //         inactiveTextColor: '#fed226',
        //         activeBgColor:'#ff0000',
        //         inactiveBgColor:'#ffffff'};
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
            const textColor = isTabActive ?  '#323232' : '#fed226';
            const BgColor = isTabActive ? '#ff0000' : '#ffffff';
            return <TouchableOpacity
            style={{flex: 1, }}
                key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
          >
            <View style={[styles.tab,]}>
              <Text style={[{color: textColor, backgroundColor:BgColor, fontSize: 13 },  ]}>
                {name}
              </Text>
            </View>
          </TouchableOpacity>;
       }
     
}

const styles = StyleSheet.create({
    tab: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    tabs: {
      height: 36,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
  });