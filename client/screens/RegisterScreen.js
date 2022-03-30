import React,{useState,useEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {
    Input,
    NativeBaseProvider,
    FormControl,
    WarningOutlineIcon,
    Stack,
    Box,
    Heading,
    Button,
    Select, CheckIcon, Text
} from 'native-base';
import api from "../api";
import uuid from 'react-native-uuid';

const RegisterScreen = (props) => {
    const [mail,setMail] = useState(undefined)
    const [age,setAge] = useState(undefined)
    const [gender,setGender] = useState(undefined)
    const [deviceUid,setDeviceUid] = useState(uuid.v4())
    const [showError,setShowError] = useState(false)
   const onNextPress = () => {
        // if (validateAge(age) && validateEmail(mail) && gender){
       if (true){
            // api.registerPlayer(mail,age,gender,deviceUid)
            props.navigation.navigate({routeName:'FindPlayer'});
        }
        else {
            Alert.alert(
                "לפחות אחד מהפרטים אינו חוקי",
                "",
                [
                    {
                        text: " אישור", onPress: () => {
                        }
                    }
                ],
            );
            setShowError(true)
        }

    }
    useEffect(() => {
    }, []);

    const validateEmail = (inputText) => {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(inputText && inputText.match(mailformat)) {
            return true;
        }
        return false;
    }
    const validateAge = (inputText) => {
        if (inputText > 0 && inputText <= 100){
            return true
        }
        return false
    }
    return (
        <NativeBaseProvider>
        <View style={styles.container}>
               <Heading style={{textAlign:'center'}} size={"lg"}>בבקשה מלא את הפרטים שלך</Heading>
            <Box
                w={{
                    base: "90%",
                    md: "25%",
                }}
            >
                <FormControl isRequired>
                    <Stack mx="4">
                        <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                            <Text style={{textAlign:'right'}}>מייל</Text>
                        </View>
                        <Input style={{textAlign:'right'}} onChangeText={(text)=>{setMail(text)}} type="email" defaultValue="" placeholder="מייל" />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Atleast 6 characters are required.
                        </FormControl.ErrorMessage>

                        <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                            <Text style={{textAlign:'right'}}>גיל</Text>
                        </View>
                        <Input style={{textAlign:'right'}} onChangeText={(text)=>{setAge(text)}}  type="number" defaultValue="" placeholder="גיל" />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Atleast 6 characters are required.
                        </FormControl.ErrorMessage>
                        <FormControl isRequired isInvalid={false}>
                            <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                                <Text style={{textAlign:'right'}}>בחר מגדר</Text>
                            </View>
                            <Select style={{textAlign:'right'}}
                                    minWidth="200"
                                    accessibilityLabel="Choose Service"
                                    placeholder="בחר מגדר"
                                    _selectedItem={{
                                        bg: "teal.600",
                                        startIcon: <CheckIcon size={5} />,
                                    }}
                                    mt="1"
                                    onValueChange={(gender) => setGender(gender)}
                            >
                                <Select.Item label="זכר" value="male" />
                                <Select.Item label="נקבה" value="Female" />
                                <Select.Item label="אחר" value="other" />
                            </Select>
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                Please make a selection!
                            </FormControl.ErrorMessage>
                        </FormControl>
                    </Stack>
                </FormControl>
                {!(mail && age && gender)&&<View >
                            <Text fontSize={'lg'} style={{textAlign:'center',color: 'red'}}>נא הכנס את כל הפרטים</Text>
                        </View>}

            </Box>
            <Button onPress={onNextPress}>המשך</Button>
        </View>
        </NativeBaseProvider>
    );
}

RegisterScreen.navigationOptions = navigationData =>{
    return{
        title: 'הרשמה',
        headerTitleAlign: 'center'
    }
}

const styles = StyleSheet.create({
    textStyles: {
        marginTop:10,
        color:'red'
    }
    ,
    container: {
        padding:15,
        flex: 1,
        justifyContent: 'space-between'
    },
});
export default RegisterScreen
