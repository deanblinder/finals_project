import React,{useState} from 'react';
import {StyleSheet, View,Alert} from 'react-native';
import {store} from '../state/state'
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
    const [avg,setAvg] = useState(1)
    const [latency,setLatency] = useState(undefined)
    const [variance,setVariance] = useState(undefined)
    const [showError, setShowError] = useState(false)
    const onConfirmationPress = () => {
        // if (agent && latency && variance){
        // if (true){
        //     console.log("--1-1-1--")
            // await api.changeAgentParams(agent,latency,variance)
            props.navigation.navigate({routeName:'Welcome'})
        // }
    }
   const onUpdatePress = () => {
        console.log(agent , latency , variance)
       // if (agent && latency && variance) {
       if (true) {
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
                            <Text style={{textAlign:'right'}}>בחר סוכן</Text>
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
                                onValueChange={(agent) => store.setAgentType(agent)}
                        >
                            <Select.Item label="0 לסוכן" value="0" onValueChange={() => setAgent(0)}/>
                            <Select.Item label="0.2 לסוכן" value="1" onValueChange={() => setAgent(1)}/>
                            <Select.Item label="0.4 לסוכן" value="2" onValueChange={() => setAgent(2)}/>
                            <Select.Item label="0.6 לסוכן" value="3" onValueChange={() => setAgent(3)}/>
                            <Select.Item label="0.8 לסוכן" value="4" onValueChange={() => setAgent(4)}/>
                            <Select.Item label="1 לסוכן" value="5" onValueChange={() => setAgent(5)}/>
                        </Select>
                        <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                            <Text style={{textAlign:'right'}}>בחר ממוצע</Text>
                        </View>
                        <Select style={{textAlign:'right'}}
                                minWidth="200"
                                accessibilityLabel="Choose Service"
                                placeholder="ממוצע של x לחיצות"
                                _selectedItem={{
                                    bg: "teal.600",
                                    startIcon: <CheckIcon size={5} />,
                                }}
                                mt="1"
                                onValueChange={(avg) => store.setAvgOf(parseInt(avg))}
                        >
                            <Select.Item label="1" value="0" onValueChange={() => setAvg(0)}/>
                            <Select.Item label="2" value="1" onValueChange={() => setAvg(1)}/>
                            <Select.Item label="3" value="2" onValueChange={() => setAvg(2)}/>
                            <Select.Item label="4" value="3" onValueChange={() => setAvg(3)}/>
                            <Select.Item label="5" value="4" onValueChange={() => setAvg(4)}/>
                            <Select.Item label="6" value="5" onValueChange={() => setAvg(5)}/>
                        </Select>
                        <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                            <Text style={{textAlign:'right'}}>זמן משחק</Text>
                        </View>
                        <Input style={{textAlign:'right'}} onChangeText={(time)=>{store.setGameTime(parseInt(time))}} type="number" defaultValue="" placeholder="הכנס זמן משחק בשניות" />
                        {/*<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>*/}
                        {/*    Atleast 6 characters are required.*/}
                        {/*</FormControl.ErrorMessage>*/}

                        {/*<View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>*/}
                        {/*    <Text>שונות (ms)</Text>*/}
                        {/*</View>*/}
                        {/*<Input style={{textAlign:'right'}} onChangeText={(text)=>{setVariance(text)}}  type="number" defaultValue="" placeholder="הכנס שונות" />*/}
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
        title: 'שינוי הפטרמטים',
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
