import React,{useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import createApiClient from '../api';
import {
    Input,
    NativeBaseProvider,
    FormControl,
    WarningOutlineIcon,
    Stack,
    Box,
    Heading,
    Button,
    Text, extendTheme
} from 'native-base';

const api = createApiClient;

const AdministratorScreen = (props) => {
    const [username,setUsername] = useState(undefined)
    const [password,setPassword] = useState(undefined)
    const [showError, setShowError] = useState(false)
    const onNextPress  = async () => {
        let response;
        console.log('1---')
        if (username && password) {
            console.log('---')
            response = await api.administratorLogin(username, password);
            console.log('status: ',response)
            // console.log(status)
        }
        if (response.status === 200) {
            // if (true){
            props.navigation.navigate({routeName: 'ChangeParam'});
        } else {
            Alert.alert(
                "שם משתמש או סיסמה שגויים",
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
    return (
        <NativeBaseProvider>
        <View style={styles.container}>
            <View style={{flex:1,justifyContent: 'center'}}>
                <Heading style={{marginBottom:20}} size={"lg"}>הכנס פרטים</Heading>
                <Box
                    w={{
                        base: "90%",
                        md: "25%",
                    }}
                >
                    <FormControl isRequired>
                        <Stack mx="4">
                            <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                                <Text>שם משתמש</Text>
                            </View>
                            <Input style={{textAlign:'right'}} onChangeText={(text)=>{setUsername(text)}} type="email" defaultValue="" placeholder="שם משתמש" />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                Atleast 6 characters are required.
                            </FormControl.ErrorMessage>
                            <View style={{margin:10}}>
                                <Text>סיסמה</Text>
                            </View>
                            <Input style={{textAlign:'right'}} onChangeText={(text)=>{setPassword(text)}}  type="password" defaultValue="" placeholder="סיסמה" />
                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                Atleast 6 characters are required.
                            </FormControl.ErrorMessage>
                        </Stack>
                    </FormControl>
                </Box>
                {!(username && password) &&
                    <View style={{marginBottom:10}}>
                        <Text fontSize={'lg'} style={{textAlign:'center',color: 'red'}}>נא הכנס את כל הפרטים</Text>
                    </View>}
            </View>

            <Button onPress={onNextPress}>המשך</Button>
        </View>
        </NativeBaseProvider>
    );
}
AdministratorScreen.navigationOptions = navigationData =>{
    return{
        title: 'כניסת מנהל',
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
});
export default AdministratorScreen
