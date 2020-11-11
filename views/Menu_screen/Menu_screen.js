import * as React from 'react';
import { Button, Text, View, Dimensions, StatusBar } from 'react-native';

export default function TestScreen({ navigation })
{
  	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

			<View style={{ alignItems: 'center', justifyContent: 'center',
				width: Dimensions.get("window").width - 40, 
				height: Dimensions.get("screen").height - 130,
				borderWidth: 1,
				borderColor: 'rgb(10,10,10)',
				borderStyle: 'solid',
				borderRadius: 30
      		}}>
				<Button title="API monster hunter" onPress={() => navigation.push('AR')}></Button>
				<View style={{height: 30}}></View>
				<Button title="Google Map"></Button>
    		</View>
    	</View>
  	);
}

