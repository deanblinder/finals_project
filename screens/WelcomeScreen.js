import React from 'react';
import {StyleSheet } from 'react-native';
const cardImage = require('../assets/photos/letsStart.jpg')
import { NativeBaseProvider, Heading,Image ,View,Text,Button,Spacer} from 'native-base';

const WelcomeScreen = (props) => {
    const onStartPress=()=>{
        props.navigation.navigate({routeName:'Guidelines'});
    }
    return (
        <NativeBaseProvider>
            <View style={styles.Container}>
                    <Image
                        source={cardImage}
                        width={400}
                        height={400}
                    />
                    <View style={styles.TextContainer}>
                            <Heading size={"lg"}>ברוך הבא לניסוי פעולה משותפת מרחוק</Heading>
                            <Text fontSize={"lg"}>שים לב שעליך להפעיל את הצלילים במכשיר</Text>
                    </View>
                    <Button onPress={onStartPress}>המשך</Button>
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    Container:{
        padding:15,
        justifyContent: 'space-between',
        flex:3
    },
    ImageContainer: {
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        // marginBottom:'10%',
        width:'100%',
        // height:'70%'
    },
    TextContainer: {
        textAlign:'center',
        display:'flex',
        justifyContent: 'space-evenly',
        flex:2

        // marginBottom: '10%'
    },
});
export default WelcomeScreen
