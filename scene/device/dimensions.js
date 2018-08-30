
import {
    PixelRatio,
    StyleSheet,
    Dimensions} from 'react-native';


 const dp2px = dp=>PixelRatio.getPixelSizeForLayoutSize(dp);
const px2dp = px=>PixelRatio.roundToNearestPixel(px);
let designSize = {width:1080,height:1920}; //假设设计尺寸为：720*1280
let pxRatio = PixelRatio.get();
let win_width = Dimensions.get("window").width;
let win_height = Dimensions.get("window").height;
let width = dp2px(win_width);
let height = dp2px(win_height);
let design_scale = designSize.width/width;
height = height*design_scale
let scale = 1/pxRatio/design_scale;

const ContainerStyles = StyleSheet.create({
    dimensions: {
        width: width,
        height: height,
        transform: [{translateX: -width * .5}, {translateY: -height * .5}, {scale: scale}, {translateX: width * .5}, {translateY: height * .5}]
    }
});

module.exports = ContainerStyles;