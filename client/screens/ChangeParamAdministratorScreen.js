import React,{useState} from 'react';
import {StyleSheet, View, Alert, ScrollView} from 'react-native';
import {store} from '../state/state'
import {
    Input,
    NativeBaseProvider,
    FormControl,
    Stack,
    Box,
    Heading,
    Button,
    Select, CheckIcon,Text,extendTheme
} from 'native-base';
import AdministratorScreen from "./AdministratortScreen";
import api from "../api";

const ChangeParamAdministratorScreen = (props) => {
    const [latancy,setLatancy] = useState()
    const [gitter,setGitter] = useState()
    // const [avg,setAvg] = useState(1)
    const [showError, setShowError] = useState(false)
    const [experimentType, setExperimentType] = useState('')
    // useEffect(() => {
    //
    // },[]);
    const onConfirmationPress = () => {
        // if (agent && latency && variance){
        // if (true){
        // await api.changeAgentParams(agent,latency,variance)
        store.setLatacyGitterObjectSameForEach(gitter,latancy)
        props.navigation.push('Welcome')
        // }
    }
    const onUpdatePress = () => {
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
    const renderLeadExperiment = () => {
        return(
            <ScrollView >
                <View style={styles.container}>
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
                            onValueChange={(agent) => store.setWeightExpSameForEach(parseFloat(agent))}
                    >
                        <Select.Item label="0 לסוכן" value="0" onValueChange={() => store.setWeightExpSameForEach(parseFloat(0))}/>
                        <Select.Item label="0.2 לסוכן" value="0.2" onValueChange={() => store.setWeightExpSameForEach(parseFloat(0.2))}/>
                        <Select.Item label="0.4 לסוכן" value="0.4" onValueChange={() => store.setWeightExpSameForEach(parseFloat(0.4))}/>
                        <Select.Item label="0.6 לסוכן" value="0.6" onValueChange={() => store.setWeightExpSameForEach(parseFloat(0.6))}/>
                        <Select.Item label="0.8 לסוכן" value="0.8" onValueChange={() => store.setWeightExpSameForEach(parseFloat(0.8))}/>
                        <Select.Item label="1 לסוכן" value="1" onValueChange={() => store.setWeightExpSameForEach(parseFloat(1))}/>
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
                        <Select.Item label="1" value="1" onValueChange={() => store.setAvgOf(1)}/>
                        <Select.Item label="2" value="2" onValueChange={() => store.setAvgOf(2)}/>
                        <Select.Item label="3" value="3" onValueChange={() => store.setAvgOf(3)}/>
                        <Select.Item label="4" value="4" onValueChange={() => store.setAvgOf(4)}/>
                        <Select.Item label="5" value="5" onValueChange={() => store.setAvgOf(5)}/>
                        <Select.Item label="6" value="6" onValueChange={() => store.setAvgOf(6)}/>
                    </Select>
                    <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                        <Text style={{textAlign:'right'}}>זמן משחק</Text>
                    </View>
                    <Input style={{textAlign:'right'}} onChangeText={(time)=>{store.setGameTime(parseInt(time))}} type="number" defaultValue="" placeholder="הכנס זמן משחק בשניות" />

                </View>
            </ScrollView>
        )
    }
    const renderLatencyExperiment = () => {
        return(
            <ScrollView >
                <View style={styles.container}>
                    <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                        <Text style={{textAlign:'right'}}>עכבה (ms)</Text>
                    </View>
                    <Input style={{textAlign:'right'}} onChangeText={(val)=>{setLatancy(parseInt(val))}} defaultValue="" type="number" placeholder="הכנס עכבה" />
                    <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                        <Text style={{textAlign:'right'}}>שונות (ms)</Text>
                    </View>
                    <Input style={{textAlign:'right'}} onChangeText={(val)=>{setGitter(parseInt(val))}} defaultValue="" type="number" placeholder="הכנס שונות" />
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
                        <Select.Item label="1" value="1" onValueChange={() => store.setAvgOf(1)}/>
                        <Select.Item label="2" value="2" onValueChange={() => store.setAvgOf(2)}/>
                        <Select.Item label="3" value="3" onValueChange={() => store.setAvgOf(3)}/>
                        <Select.Item label="4" value="4" onValueChange={() => store.setAvgOf(4)}/>
                        <Select.Item label="5" value="5" onValueChange={() => store.setAvgOf(5)}/>
                        <Select.Item label="6" value="6" onValueChange={() => store.setAvgOf(6)}/>
                    </Select>
                    <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                        <Text style={{textAlign:'right'}}>זמן משחק</Text>
                    </View>
                    <Input style={{textAlign:'right'}} onChangeText={(time)=>{store.setGameTime(parseInt(time))}} type="number" defaultValue="" placeholder="הכנס זמן משחק בשניות" />
                </View>
            </ScrollView>
        )
    }

    const onPickFollowerLeaderExperiment = () => {
        setExperimentType('followerLeader')
        store.setExperimentType('followerLeader')
    }
    const onPickLatencyExperiment = () => {
        setExperimentType('latency')
        store.setExperimentType('latency')

    }

    const chooseParamScreen = (value) => {
        if(value === 'followerLeader'){
            onPickFollowerLeaderExperiment()
        }
        else{
            onPickLatencyExperiment()
        }
    }

    return (
        <NativeBaseProvider>
            <ScrollView >
                <View style={styles.container}>
                    <View>
                        <Heading size={"lg"}>בבקשה מלא את הפרטים שלך</Heading>
                    </View>
                    <View style={{justifyContent: 'center',flex:1}}>

                        <Box
                            w={{
                                base: "90%",
                                md: "25%",
                            }}
                        >
                            <FormControl isRequired style={{marginBottom:15,marginTop:15}}>
                                <Stack mx="4">
                                    <View style={{margin:10,textAlign:'right',justifyContent: 'space-between'}}>
                                        <Text style={{textAlign:'right'}}>בחר ניסוי</Text>
                                    </View>
                                    <Select style={{textAlign:'right'}}
                                            minWidth="200"
                                            accessibilityLabel="Choose Service"
                                            placeholder="מוביל מובל"
                                            _selectedItem={{
                                                bg: "teal.600",
                                                startIcon: <CheckIcon size={5} />,
                                            }}
                                            mt="1"
                                            onValueChange={(value) => chooseParamScreen(value)}
                                    >
                                        <Select.Item label="מוביל מובל" value="followerLeader" onValueChange={() => onPickFollowerLeaderExperiment()}/>
                                        <Select.Item label="עכבה" value="latency" onValueChange={() => onPickLatencyExperiment()}/>
                                    </Select>
                                    {/*{renderLeadExperiment()}*/}
                                    {experimentType === 'latency' ? renderLatencyExperiment() : renderLeadExperiment()}

                                </Stack>
                            </FormControl>
                        </Box>
                        <View>
                            <Button onPress={onUpdatePress}>עדכן</Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
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
