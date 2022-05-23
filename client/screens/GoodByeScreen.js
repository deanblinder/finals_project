import React, {useState} from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback, ScrollView, BackHandler} from 'react-native';
import {
    NativeBaseProvider,
    Button,
    View,
    Heading,
    TextArea,Input
} from 'native-base';
import uuid from 'react-native-uuid';

import api from "../api";
import {store} from "../state/state";
export default function GoodByeScreen() {
    const [textAreaValue, setTextAreaValue] = useState('')
    const [isDone,setIsDone] = useState(false)
    const [deviceUid,setDeviceUid] = useState(uuid.v4())

    const press = () => {
        // const deviceUUID = uuid.v4()
        api.sendFeedBack(deviceUid,textAreaValue)
        setIsDone(true)

    }
    const DismissKeyboard = ({children})=>(
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );
    const renderFeedBack = () =>{
        return(
            <ScrollView style={styles.container}>
            <View>
                    <View style={{marginBottom:'10%'}}>
                        <Heading  style={{textAlign:'right'}} size='lg'>תודה רבה על ההשתתפות בניסוי. </Heading>
                    </View>
                    <View style={{marginBottom:'10%'}}>
                        <Heading  style={{textAlign:'right'}} size='sm'>לסיום, אנא ציינ/י עם איזה מהמשתתפים שפעלת מולם תעדיף/י להמשיך בניסוי המשך, אם יהיה?
                        </Heading>
                    </View>
                    <View style={{marginBottom:'10%'}}>
                        <Heading  style={{textAlign:'right'}} size='sm'>אם תרצה/י לכתוב דבר מה על תחושותייך במהלך הניסוי, אנא כתב/י כאן:
                        </Heading>
                    </View>
                    <TextArea
                        value={textAreaValue}
                        onChangeText={(text)=>{setTextAreaValue(text)}}
                        // numberOfLines={10}
                        h={100}
                        placeholder="מלא כאן"
                        w={{
                            base: "100%",
                            md: "40%",
                        }}
                        // totalLines={100}
                    />

                </View>
                <View style={{justifyContent:'space-between',marginTop:'20%'}}>
                    <Heading style={{textAlign:'right'}} size='sm'>נשמח לשמוע ממך במייל זה: </Heading>
                    <Heading style={{textAlign:'right'}} size='sm'>rinottm@post.bgu.ac.il</Heading>
                </View>
                <View style={{marginTop:'50%'}}>
                    <Button onPress={press}>סיום ויציאה מהאפליקציה</Button>
                </View>

            </ScrollView>
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
