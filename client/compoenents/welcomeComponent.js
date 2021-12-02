import React, {useState} from 'react';
import { StyleSheet,Image,Text} from 'react-native';
import{Card,View,Button} from 'react-native-ui-lib'
const cardImage = require('../assets/photos/letsStart.jpg')

const WelcomeComponent = props => {
    return (
        <View style={styles.Container}>
            <Image style={styles.ImageContainer} source={cardImage}/>
            <View style={styles.TextAndButtonContainer}>
                <View style={styles.TextContainer}>
                    <Text style={{fontSize:20}} >ברוך הבא לניסוי פעולה משותפת מרחוק</Text>
                    <Text style={{fontSize:20}}>שים לב שעליך להפעיל את הצלילים במכשיר</Text>
                </View>
                <Button label='continue' onPress={props.onPress}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        display:'flex',
        justifyContent:'space-between',
        padding:15
        // fontSize:'50px'
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
        // justifyContent: 'space-evenly',
        // marginBottom: '10%'
    },
    TextAndButtonContainer:{
        justifyContent:'space-between',
    }
});
export  default WelcomeComponent
