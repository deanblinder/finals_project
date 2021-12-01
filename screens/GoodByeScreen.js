import React, {useState} from 'react';
import { StyleSheet} from 'react-native';
import {
    NativeBaseProvider,
    Button,
    View,
    Text,
    Heading,
    TextArea,
} from 'native-base';
export default function GoodByeScreen() {
    const press = () => {
        setIsDone(true)
    }
    const [isDone,setIsDone] = useState(false)
    return (
        <NativeBaseProvider>
            {!isDone ? <View style={styles.container}>
                <View>
                    <Heading size='lg'>תודה על השתתפותך</Heading>
                    <Heading size='sm'>נשמח לשמוע על תחושותיך במהלך הניסוי</Heading>
                    <TextArea
                        numberOfLines={10}
                        h={20}
                        placeholder="מלא כאן"
                        w={{
                            base: "100%",
                            md: "40%",
                        }}
                    />
                </View>

                <Heading size='sm'>נשמח לשמוע ממך במייל זה: </Heading>
                    <Text size='sm'>test@gmail.com </Text>
                <Button onPress={press}>סיים</Button>
            </View>:
                <View style={styles.textContainer}>
                    <Heading size='2xl'>תודה רבה!</Heading>
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
    textContainer:{
        padding:15,
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
});
