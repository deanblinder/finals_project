import React, {useState} from 'react';
import {StyleSheet, Keyboard, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {
    NativeBaseProvider,
    Button,
    View,
    Heading,
    TextArea,Input
} from 'native-base';
import uuid from 'react-native-uuid';

import api from "../api";
export default function GoodByeScreen() {
    const [textAreaValue, setTextAreaValue] = useState('')
    const [isDone,setIsDone] = useState(false)

    const press = () => {
        const deviceUUID = uuid.v4()
        api.sendFeedBack(deviceUUID,textAreaValue)
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
                        <Heading  style={{textAlign:'right'}} size='sm'>אם תרצי/ה, נשמח לשמוע אם תרצי לומר דבר מה על תחושותיך במהלך הניסוי.
                            אנא כתב/י כאן:
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
                    <Heading style={{textAlign:'right'}} size='sm'>test@gmail.com</Heading>
                </View>
                <View style={{marginTop:'50%'}}>
                    <Button onPress={press}>סיים</Button>
                </View>

            </ScrollView>
            )
    }

    const renderTanks = () =>{
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
        title: '',
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
