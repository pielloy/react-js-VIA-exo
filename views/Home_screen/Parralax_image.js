import * as React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, StatusBar   } from 'react-native';
import Easing from 'react-native/Libraries/Animated/src/Easing';

class Parallax_screen extends React.Component {
    constructor (props) { 
        super(props);
        this.state = {
            leftPosition: new Animated.Value(0)
        }
        const moveImages = (speed) => {
            Animated.timing(
                this.state.leftPosition,
                {
                    toValue: -((Dimensions.get("screen").height * 1920) / 1080),
                    duration: speed,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            ).start(() => {
                this.state.leftPosition.setValue(0);
                moveImages(speed);
            });
        }
        this.moveImages = moveImages;
        this.speed_flag = true;
    }

    render () {
        if (this.speed_flag) {
            this.moveImages(this.props.speed);
            console.log(this.props.speed);
            this.speed_flag = false;
        }
        return (
            <View>
                <Animated.View style={{flex: 1, flexDirection: 'row', translateX: this.state.leftPosition}}>
                    <Image style={page.image} source={this.props.source}></Image>
                    <Image style={page.image} source={this.props.source}></Image>
                </Animated.View>
            </View>
        );
    }
};

const page = StyleSheet.create({
    image: {
        height: Dimensions.get("screen").height,
        width: (Dimensions.get("screen").height * 1920) / 1080,
        resizeMode: 'contain'
    }
});

export default Parallax_screen;

//   1080 -> 1920
//     ?  ->  ?
//