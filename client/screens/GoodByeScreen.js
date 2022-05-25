import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, Keyboard, TouchableWithoutFeedback, ScrollView, BackHandler, Alert} from 'react-native';
import {CheckBox, checkbox} from 'react-native-elements'
import {
    NativeBaseProvider,
    Button,
    View,
    Heading,
    TextArea, Input
} from 'native-base';
import uuid from 'react-native-uuid';

import api from "../api";
import {store} from "../state/state";
export default function GoodByeScreen() {
    const [textAreaValue, setTextAreaValue] = useState('')
    const [isDone,setIsDone] = useState(false)
    const [playerOne,setPlayerOne] = useState(false)
    const [playerTwo,setPlayerTwo] = useState(false)
    const [playerThree,setPlayerThree] = useState(false)

    // const [deviceUid,setDeviceUid] = useState(uuid.v4())
    const [bestPlayer,setBestPlayer] = useState('')
    const press = () => {
        if(bestPlayer !== '') {
            api.sendFeedBack(store.getModel(), textAreaValue, bestPlayer)
            setIsDone(true)
        }
    }
    const DismissKeyboard = ({children})=>(
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );
    const bestPlayerOne = () => {
        setPlayerOne(true)
        setPlayerTwo(false)
        setPlayerThree(false)
        setBestPlayer(''+ 1)
    }
    const bestPlayerTwo = () => {
        setPlayerOne(false)
        setPlayerTwo(true)
        setPlayerThree(false)
        setBestPlayer(''+2)
    }
    const bestPlayerThree = () => {
        setPlayerOne(false)
        setPlayerTwo(false)
        setPlayerThree(true)
        setBestPlayer(''+3)
    }
    const renderFeedBack = () => {
        return (
            <NativeBaseProvider>
                <ScrollView style={styles.container}>
                    <View>
                        <View style={{marginBottom: '10%'}}>
                            <Heading style={{textAlign: 'right'}} size='lg'>תודה רבה על ההשתתפות בניסוי. </Heading>
                        </View>
                        <View style={{marginBottom: '10%'}}>
                            <Heading style={{textAlign: 'right'}} size='sm'>לסיום, אנא ציינ/י עם איזה מהמשתתפים שפעלת
                                מולם תעדיף/י להמשיך בניסוי המשך, אם יהיה?
                            </Heading>
                        </View>
                        <View style={{marginBottom: '10%', flexDirection: 'row', justifyContent: 'center'}}>
                            <CheckBox containerStyle={{backgroundColor: 'transparent'}} style={{alignSelf: 'center'}}
                                      title='1' center checked={playerOne} checkedIcon='dot-circle-o'
                                      uncheckedIcon='circle-o' onPress={bestPlayerOne}>
                            </CheckBox>
                            <CheckBox containerStyle={{backgroundColor: 'transparent'}} style={{alignSelf: 'center'}}
                                      title='2' center checked={playerTwo} checkedIcon='dot-circle-o'
                                      uncheckedIcon='circle-o' onPress={bestPlayerTwo}>
                            </CheckBox>
                            <CheckBox containerStyle={{backgroundColor: 'transparent'}} style={{alignSelf: 'center'}}
                                      title='3' center checked={playerThree} checkedIcon='dot-circle-o'
                                      uncheckedIcon='circle-o' onPress={bestPlayerThree}>
                            </CheckBox>
                        </View>
                        <View style={{marginBottom: '10%'}}>
                            <Heading style={{textAlign: 'right'}} size='sm'>אם תרצה/י לכתוב דבר מה על תחושותייך במהלך
                                הניסוי, אנא כתב/י כאן:
                            </Heading>
                        </View>
                        <TextArea
                            value={textAreaValue}
                            onChangeText={(text) => {
                                setTextAreaValue(text)
                            }}
                            h={100}
                            placeholder="מלא כאן"
                            w={{
                                base: "100%",
                                md: "40%",
                            }}
                        />

                    </View>
                    <View style={{justifyContent: 'space-between', marginTop: '10%'}}>
                        <Heading style={{textAlign: 'right'}} size='sm'>נשמח לשמוע ממך במייל זה: </Heading>
                        <Heading style={{textAlign: 'right'}} size='sm'>rinottm@post.bgu.ac.il</Heading>
                    </View>
                    {(bestPlayer === '') &&
                        <View style={{marginTop: '10%'}}>
                            <Text fontSize={'lg'} style={{textAlign: 'center', color: 'red'}}>אנא בחר שחקן מועדף</Text>
                        </View>
                    }
                    <View style={{marginTop: '35%'}}>
                        <Button onPress={press}>סיום ויציאה מהאפליקציה</Button>
                    </View>

                </ScrollView>
            </NativeBaseProvider>

        )
    }

    const renderTanks = () =>{
        setTimeout(() => {
            BackHandler.exitApp();

        }, 2000);

        return(
            <View style={styles.textContainer}>
                <Heading size='2xl'>תודה רבה!</Heading>
            </View>
        )
    }
    return (
        <NativeBaseProvider>
            {isDone ? renderTanks() : renderFeedBack()}
        </NativeBaseProvider>
    );
}
GoodByeScreen.navigationOptions = navigationData =>{
    return{
        title: 'סיום הניסוי',
        headerTitleAlign: 'center',

    }
}

const styles = StyleSheet.create({
    container: {
        padding:15,
        flex: 1,
        // backgroundColor:'blue'

    },
    textContainer:{
        padding:15,
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
});
