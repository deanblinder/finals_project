import React,{useState} from 'react';
import {StyleSheet, View,Alert} from 'react-native';
import {
    Input,
    NativeBaseProvider,
    FormControl,
    WarningOutlineIcon,
    Stack,
    Box,
    Heading,
    Button,
    Select, CheckIcon,Text,extendTheme
} from 'native-base';
import AdministratorScreen from "./AdministratortScreen";
import api from "../api";

const ChangeParamAdministratorScreen = (props) => {
    const [agent,setAgent] = useState(undefined)
    const [latency,setLatency] = useState(undefined)
    const [variance,setVariance] = useState(undefined)
    const [showError, setShowError] = useState(false)
    const onConfirmationPress =  () => {
        if (agent && latency && variance){
            console.log("--1-1-1--")
            api.changeAgentParams(agent,latency,variance)
            props.navigation.navigate({routeName:'Welcome'})
        }
    }
   const onUpdatePress = () => {
        console.log(agent , latency , variance)
       if (agent && latency && variance) {
           Alert.alert(
               "פרטים שונו",
               "",
               [
                   {text: "ביטול", style: "cancel"},
                   {
                       text: " אישור", onPress: () => {
                           onConfirmationPress()
                       }
                   }
               ],
           );
       }else {
           setShowError(true)
       }
   }

    return (

        <NativeBaseProvider>
        <View style={styles.container}>
            <View style={{justifyContent: 'center',flex:1}}>
                <Heading size={"lg"}>בבקשה מלא את הפרטים שלך</Heading>
            <Box
                w={{
                    base: "90%",
                    md: "25%",
                }}
            >
                <FormControl isRequired style={{marginBottom:15,marginTop:15}}>
                    <Stack mx="4">
                        <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                            <Text>בחר סוכן</Text>
                        </View>
                        <Select style={{textAlign:'right'}}
                                minWidth="200"
                                accessibilityLabel="Choose Service"
                                placeholder="סוג סוכן"
                                _selectedItem={{
                                    bg: "teal.600",
                                    startIcon: <CheckIcon size={5} />,
                                }}
                                mt="1"
                                onValueChange={(agent) => setAgent(agent)}
                        >
                            <Select.Item label="איטי-מפוזר" value="slow-l" onValueChange={(val) => setAgent(val)}/>
                            <Select.Item label="איטי-מסונכרן" value="slow-h" onValueChange={(val) => setAgent(val)}/>
                            <Select.Item label="אמצע" value="middle" onValueChange={(val) => setAgent(val)}/>
                            <Select.Item label="מהיר מפוזר" value="fast-l" onValueChange={(val) => setAgent(val)}/>
                            <Select.Item label="מסונכרן" value="fast-h" onValueChange={(val) => setAgent(val)}/>

                        </Select>
                        <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                            <Text>עכבה (ms)</Text>
                        </View>
                        <Input style={{textAlign:'right'}} onChangeText={(text)=>{setLatency(text)}} type="email" defaultValue="" placeholder="הכנס עקבה" />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Atleast 6 characters are required.
                        </FormControl.ErrorMessage>

                        <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                            <Text>שונות (ms)</Text>
                        </View>
                        <Input style={{textAlign:'right'}} onChangeText={(text)=>{setVariance(text)}}  type="number" defaultValue="" placeholder="הכנס שונות" />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Atleast 6 characters are required.
                        </FormControl.ErrorMessage>
                        <FormControl isRequired isInvalid={false}>

                            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                Please make a selection!
                            </FormControl.ErrorMessage>
                        </FormControl>
                    </Stack>
                </FormControl>
            </Box>
                    {!(agent && variance && latency) &&
                    <View style={{marginBottom:10}}>
                        <Text fontSize={'lg'} style={{textAlign:'center',color:'red'}}>נא הכנס את כל הפרטים</Text>
                    </View>}
                    <View>
                        <Button onPress={onUpdatePress}>עדכן</Button>
                    </View>
            </View>
            {/*<Button onPress={onEndPress}>סיום</Button>*/}
        </View>
        </NativeBaseProvider>
    );
}

ChangeParamAdministratorScreen.navigationOptions = navigationData =>{
    return{
        title: 'שינוי הפטרמטים של הסוכן',
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
export default ChangeParamAdministratorScreen
