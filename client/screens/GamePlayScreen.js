import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {Circle, NativeBaseProvider, Button, Heading, createIcon, Center, Avatar,Pressable} from 'native-base';
import AdministratorScreen from "./AdministratortScreen";
import api from "../api";

const GamePlayScreen = (props) => {
    const [isLoading,setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 4000);
    });
    const press = () => {
        console.log('----')
        api.sendPressTimeStamp([1,2,3,4],[2,3,54,65]) //send also 2 arrays
        props.navigation.navigate({routeName:'Questionnaire'});
    }
    return (
        <NativeBaseProvider>
            { isLoading ?
            <View style={styles.container}>
            <View style={styles.buttons}>
                <Pressable style={{margin:10}} onPress={()=>console.log('send current press time in an array')}>
                    <Circle size={170} bg="secondary.400">
                        סוכן
                    </Circle>
                </Pressable>
                <Pressable onPress={()=>console.log('send current press time in an array')}>
                    <Circle size={170} bg="secondary.400">
                        משתמש
                    </Circle>
                </Pressable>
            </View>
            </View> :
                <View style={styles.gameOverContainer}>
                    <Heading style={{justifyContent:'center',alignItems: 'center'}}>המשחק נגמר</Heading>
                    <Button onPress={press}>המשך</Button>
                </View>}

        </NativeBaseProvider>
    );
}
GamePlayScreen.navigationOptions = navigationData =>{
    return{
        title: '',
        headerTitleAlign: 'center'
        // headerTitleStyle: 'open-sans',
    }
}

const styles = StyleSheet.create({
    container: {
        padding:15,
        flex: 1,
        justifyContent: 'space-between'
    },
    gameOverContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default GamePlayScreen
