import React, {useState} from 'react';
import { StyleSheet} from 'react-native';
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

    const press = async () => {
        const deviceUUID = uuid.v4()
        await api.sendFeedBack(textAreaValue,deviceUUID)
        // setIsDone(true)

    }
    return (
        <NativeBaseProvider>
            {!isDone ? <View style={styles.container}>
                    <View>
                        <View style={{marginBottom:20}}>
                            <Heading  style={{textAlign:'right'}} size='lg'>תודה על השתתפותך</Heading>
                        </View>
                        <View style={{marginBottom:40}}>
                            <Heading  style={{textAlign:'right'}} size='sm'>נשמח לשמוע על תחושותיך במהלך הניסוי</Heading>
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
                    <View style={{justifyContent:'space-between'}}>
                    <Heading style={{textAlign:'right'}} size='sm'>נשמח לשמוע ממך במייל זה: </Heading>
                    <Heading style={{textAlign:'right'}} size='sm'>test@gmail.com</Heading>
                </View>
                    <Button onPress={press}>סיים</Button>
            </View>:
                <View style={styles.textContainer}>
                    <Heading size='2xl'>תודה רבה!</Heading>
                </View>}
        </NativeBaseProvider>
    );
}
GoodByeScreen.navigationOptions = navigationData =>{
    return{
        title: '',
        headerTitleAlign: 'center'
    }
}

const styles = StyleSheet.create({
    container: {
        padding:15,
        flex: 1,
        justifyContent: 'space-between',
        // backgroundColor:'blue'

    },
    textContainer:{
        padding:15,
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
});
