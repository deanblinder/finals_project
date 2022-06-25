import React, {useState} from 'react';
import { StyleSheet,Image,Button} from 'react-native';
import{Card,View,Text} from 'react-native-ui-lib'
const cardImage = require('../assets/photos/letsStart.jpg')

const GuidelineComponent = props => {
    return (
        <View style={styles.Container}>
           <Text textAlign='right'>{props.guidlineNum}. {props.guidlineTitle} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Container:{
        margin:10,
       backgroundColor:'red',
        textAlign:'right',
    },
});
export  default GuidelineComponent
