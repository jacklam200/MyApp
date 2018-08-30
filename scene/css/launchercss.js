import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Dimensions
  } from 'react-native';

let win_width = Dimensions.get("window").width;
let win_height = Dimensions.get("window").height;

  const LauncherStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        width: win_width,
        height:win_height,
    }
});
module.exports = LauncherStyles;