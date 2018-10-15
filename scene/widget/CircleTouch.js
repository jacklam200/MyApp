
import React from 'react'; 

import {  
    AppRegistry,
    PanResponder,
    StyleSheet,
    View,
    processColor,
  } from 'react-native';

  
var CIRCLE_SIZE = 80;  
var CIRCLE_COLOR = 'blue';  
var CIRCLE_HIGHLIGHT_COLOR = 'green';

export default class CircleTouch extends Component {
    constructor(props) {
        super(props);
        // this.props = {
        // }
        this._panResponder = {},
        this._previousLeft =  0,
        this._previousTop = 0,
        this._circleStyles = {},
        this.circle = (null = ?{ setNativeProps(props)void }),
    }

    componentWillMount(){

        this._panResponder = PanResponder.create({
          onStartShouldSetPanResponder: (evt, gestureState) => true,
          onMoveShouldSetPanResponder: (evt, gestureState) => true,
          onPanResponderGrant: this._handlePanResponderGrant,
          onPanResponderMove: this._handlePanResponderMove,
          onPanResponderRelease: this._handlePanResponderEnd,
          onPanResponderTerminate: this._handlePanResponderEnd,
        });

        this._previousLeft = 20;
        this._previousTop = 84;
        this._circleStyles = {
        style: {
            left: this._previousLeft,
            top: this._previousTop
            }
        };

    }

    componentDidMount() {
        this._updatePosition();
    }

    render() {
        return (
          <View style={styles.container}>
            <View
              style={styles.circle}
              {...this._panResponder.panHandlers}
            />
          </View>
        );
    }


    _highlight() {
        const circle = this.circle;
        circle && circle.setNativeProps({
          style: {
            backgroundColor: processColor(CIRCLE_HIGHLIGHT_COLOR)
          }
        });
    }
    
    _unHighlight() {
        const circle = this.circle;
        circle && circle.setNativeProps({
          style: {
            backgroundColor: processColor(CIRCLE_COLOR)
          }
        });
    }
    _updatePosition() {
        this.circle && this.circle.setNativeProps(this._circleStyles);
    }

    _handlePanResponderGrant(e, gestureState) {
        this._highlight();
    }

    _handlePanResponderMove(e, gestureState) {
        this._circleStyles.style.left = this._previousLeft + gestureState.dx;
        this._circleStyles.style.top = this._previousTop + gestureState.dy;
        this._updatePosition();
      }

      _handlePanResponderEnd(e, gestureState) {
        this._unHighlight();
        this._previousLeft += gestureState.dx;
        this._previousTop += gestureState.dy;
      }

    
}

var styles = StyleSheet.create({  
    circle: {
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_SIZE / 2,
      backgroundColor: CIRCLE_COLOR,
      position: 'absolute',
      left: 0,
      top: 0,
    },
    container: {
      flex: 1,
      paddingTop: 64,
    },
  });
