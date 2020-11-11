import * as React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import Easing from 'react-native/Libraries/Animated/src/Easing';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import Parallax_image from './Parralax_image';

function onSwipeUp(state) {
    console.log("Alut a va ?")
}

export default function HomeScreen ({ navigation }) {
    return (
    <View>

        <Parallax_image source={require('../../assets/Parallax/parallax_1.png')} speed={80000}></Parallax_image>
        <Parallax_image source={require('../../assets/Parallax/parallax_2.png')} speed={60000}></Parallax_image>
        <Parallax_image source={require('../../assets/Parallax/parallax_3.png')} speed={40000}></Parallax_image>
        <Parallax_image source={require('../../assets/Parallax/parallax_4.png')} speed={20000}></Parallax_image>
        <Parallax_image source={require('../../assets/Parallax/parallax_5.png')} speed={10000}></Parallax_image>
        <GestureRecognizer style={page.view_reset} onSwipeUp={() => {navigation.navigate('Game')}}>
            <Text style={page.title}>Continue</Text>
            <Image source={require('../../assets/drag_up.png')} style={page.image}></Image>
        </GestureRecognizer> 
    </View>);
};

const page = StyleSheet.create({
    image: {
        height: 150,
        width: 200, 
        resizeMode: 'contain'
    },
    view_reset: {
        position: "absolute",
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        height: Dimensions.get("screen").height,
        width: Dimensions.get("screen").width
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: 10,
        paddingLeft: 20, 
        paddingRight: 20
    } 
});

// style={{flex: 1, justifyContent: 'flex-end'}}          