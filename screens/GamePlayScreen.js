import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {Icon, IconButton, NativeBaseProvider, Button, Heading} from 'native-base';
import { Entypo } from "@expo/vector-icons"

const GamePlayScreen = (props) => {
    const [isLoading,setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    });
    const press = () => {
        props.navigation.navigate({routeName:'Questionnaire'});
    }
    return (
        <NativeBaseProvider>
            { isLoading ?
            <View style={styles.container}>
            <View style={styles.buttons}>
                <IconButton
                    icon={<Icon size="200" as={Entypo} name="emoji-flirt" />}/>

                <IconButton
                            icon={<Icon size="200" as={Entypo} name="emoji-happy" />}/>

            </View>

            </View> :
                <View style={styles.gameOverContainer}>
                    <Heading style={{justifyContent:'center',alignItems: 'center'}}>המשחק נגמר</Heading>
                    <Button onPress={press}>המשך</Button>
                </View>}

        </NativeBaseProvider>
    );
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
