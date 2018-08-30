import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import Resolution from '../device/Resolution'
import ResolutionStyles from '../device/resolutioncss'
import CommonStyles from '../css/commoncss'
export default class BaseComponent extends Component {

    constructor(props) {
        super(props);
        console.log(this.getClassName(), "constructor");
    }
    componentWillMount() {
        console.log(this.getClassName(), "componentWillMount");
    }

    render() {
        // <Resolution.FixWidthView style={ResolutionStyles.container}>
        //     {this.renderView()}
        //   </Resolution.FixWidthView>
        console.log(this.getClassName(), "render");
        return (
            <View style={CommonStyles.container}>
                {this.renderView()}
            </View>

        );
        
        
    }

    renderView(){
        return (
            <View/>
        );
    }

    getClassName(){
        return "";
    }
    componentDidMount(){
        console.log(this.getClassName(), "componentDidMount");
    }
  
    componentWillReceiveProps(nextProps){
        console.log(this.getClassName(), "componentWillReceiveProps");
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log(this.getClassName(), "shouldComponentUpdate");
        return true;
    }

    componentWillUpdate(  
        nextProps, nextState
      ){
        console.log(this.getClassName(), "componentWillUpdate");
      }

     componentDidUpdate(  
        prevProps, prevState
      ){
        console.log(this.getClassName(), "componentDidUpdate");
      }

      componentWillUnmount(){
        console.log(this.getClassName(), "componentWillUnmount");
      }

}