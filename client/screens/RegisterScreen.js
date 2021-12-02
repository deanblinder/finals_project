import React,{useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
    Input,
    NativeBaseProvider,
    FormControl,
    WarningOutlineIcon,
    Stack,
    Box,
    Heading,
    Button,
    Select, CheckIcon, Text, extendTheme
} from 'native-base';
import AdministratorScreen from "./AdministratortScreen";
import api from "../api";

const RegisterScreen = (props) => {
    const [mail,setMail] = useState('')
    const [age,setAge] = useState('')
    const [gender,setGender] = useState('')
    const [showError,setShowError] = useState(false)
   const onNextPress = () => {
        if (mail && age && gender){
            // validation tests
            // send uuid of mobile
            // send model of mobile
            // send android version
            api.registerPlayer(mail,age,gender)
            props.navigation.navigate({routeName:'FindPlayer'});
        }
        else {
            setShowError(true)
        }

    }
    return (
        <NativeBaseProvider>
        <View style={styles.container}>
               <Heading size={"lg"}>בבקשה מלא את הפרטים שלך</Heading>
            <Box
                w={{
                    base: "90%",
                    md: "25%",
                }}
            >
                <FormControl isRequired>
                    <Stack mx="4">
                        <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                            <Text>מייל</Text>
                        </View>
                        <Input style={{textAlign:'right'}} onChangeText={(text)=>{setMail(text)}} type="email" defaultValue="" placeholder="מייל" />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Atleast 6 characters are required.
                        </FormControl.ErrorMessage>

                        <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                            <Text>גיל</Text>
                        </View>
                        <Input style={{textAlign:'right'}} onChangeText={(text)=>{setAge(text)}}  type="number" defaultValue="" placeholder="גיל" />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Atleast 6 characters are required.
                        </FormControl.ErrorMessage>
                        <FormControl isRequired isInvalid={false}>
                            <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                                <Text>בחר מגדר</Text>
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
