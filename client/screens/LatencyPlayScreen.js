import React, {useEffect, useState,useRef} from 'react';
import { StyleSheet, View,TouchableOpacity,Animated} from 'react-native';
import {Circle, NativeBaseProvider, Button, Heading, createIcon, Center, Avatar,Pressable,Text} from 'native-base';
import {store} from '../state/state'
import AdministratorScreen from "./AdministratortScreen";
import api from "../api";
import uuid from "react-native-uuid";

const LatencyPlayScreen = (props) =>{
    const agentOpacity = useRef(new Animated.Value(1)).current;
    const playerOpacity = useRef(new Animated.Value(1)).current;
    let [isLoading,setLoading] = useState(true)
    let [playerTimeStampArr, setPlayerTimeStampArr] = useState([])
    let [agentTimeStampArr, setAgentTimeStampArr] = useState([])
    let [playerDiffPressArr, setPlayerDiffPressArr] = useState([])
    let [agentDiffPressArr, setAgentDiffPressArr] = useState([])
    let [numberOfPresses, setNumberOfPresses] = useState(0)
    let [avgPlayerPresses, setAvgPlayerPresses] = useState(0)
    let [avgAgentPresses, setAvgAgentPresses] = useState(2000)
    let [intervalID1,setMyInterval1] = useState(null)
    let [intervalID2,setMyInterval2] = useState(null)
    let [isIntervalID1,setIsIntervalID1] = useState(true)
    let [numberOfAgentPresses,setNumberOfAgentPresses] = useState(0)
    let [timePassedId,setTimePassedId] = useState(0)
    let [isFinish,setIsFinish] = useState(false)
    let [isTimePassed,setIsTimePassed] = useState(false)
    let sumOfPlayerDiffPress = 0
    const TIME_UNTIL_AGENT_STOP_PRESS = 4000
    useEffect(() => {
        setGitterLatencyForGame()
        setMyInterval1(setInterval(agentPress,2000))
        setTimeout(() => {
            setIsFinish(true)
        }, parseInt(store.getGameTime())*1000);

    },[]);

    useEffect(()=>{
        if (isFinish){
            clearInterval(intervalID1)
            clearInterval(intervalID2)
            setLoading(false)
        }
    },    [isFinish])


    useEffect(()=>{
        if (isTimePassed){
            clearInterval(intervalID1)
            clearInterval(intervalID2)
            setIsTimePassed(false)
        }
    },    [isTimePassed])

    const onNextPress = () => {
        api.sendPressTimeStamp(store.getModel(),playerTimeStampArr, agentTimeStampArr, "LatencyAgent_Gitter_"+store.getGitter()+"_Latency_"+store.getLatency())
        props.navigation.navigate({routeName:'Questionnaire'});

    }
    const buttonFadeFunc = ({isAgent}) => {
        if (isAgent){
            agentButtonFadeOut()
            setTimeout(() => {
                agentButtonFadeIn()
            }, 250)
        }
        else{
            playerButtonFadeOut()
            setTimeout(() => {
                playerButtonFadeIn()
            }, 250)
        }
    }
    const playAgain = () => {
        props.navigation.navigate({routeName:'FindPlayer'});
    }
    const agentPress = () => {
        let timeStamp = new Date().getTime()
        buttonFadeFunc({isAgent:true})
        const arr = agentTimeStampArr
        arr.push(timeStamp)
        setAgentTimeStampArr(arr)
        const num = parseInt(store.getAvgOff())
        let diffBetweenAgentPresses;
        // console.log("diff_arr_agent: ", agentDiffPressArr)
        numberOfAgentPresses = numberOfAgentPresses + 1
        setNumberOfAgentPresses(numberOfAgentPresses)

        if (numberOfAgentPresses > num){
            diffBetweenAgentPresses = agentTimeStampArr[agentTimeStampArr.length-1]-agentTimeStampArr[agentTimeStampArr.length-2]
            if(diffBetweenAgentPresses > 250){
                const diff_arr = agentDiffPressArr
                diff_arr.push(diffBetweenAgentPresses)
                setAgentDiffPressArr(diff_arr)
                let sumOfAgentDiffPress = mySum(agentDiffPressArr,num);
                avgAgentPresses = sumOfAgentDiffPress / (num === 0 ? 1 : (agentDiffPressArr.length<num?agentDiffPressArr.length:num))
            }
            else{
                const arr_pop = agentTimeStampArr
                arr_pop.pop()
                setAgentTimeStampArr(arr_pop)
                numberOfAgentPresses = numberOfAgentPresses - 1
                setNumberOfAgentPresses(numberOfAgentPresses)
            }

        }
        else{
            if(numberOfAgentPresses > 1) {
                diffBetweenAgentPresses = agentTimeStampArr[agentTimeStampArr.length-1] - agentTimeStampArr[agentTimeStampArr.length - 2]
                if (diffBetweenAgentPresses > 250) {
                    const diff_arr = agentDiffPressArr
                    diff_arr.push(diffBetweenAgentPresses)
                    setAgentDiffPressArr(diff_arr)
                }
                else{
                    const arr_pop = agentTimeStampArr
                    arr_pop.pop()
                    setAgentTimeStampArr(arr_pop)
                    numberOfAgentPresses = numberOfAgentPresses - 1
                    setNumberOfAgentPresses(numberOfAgentPresses)
                }
            }
        }
    }


    const playerPress = () => {
        clearTimeout(timePassedId)
        const timeUntilAgentStopPress = setTimeout(() => {
            setIsTimePassed(true)
        }, TIME_UNTIL_AGENT_STOP_PRESS)
        setTimePassedId(timeUntilAgentStopPress)
        let timeStamp = new Date().getTime()
        let percent = 0.5
        buttonFadeFunc({isAgent:false})
        const arrPlayerTimeStamp = playerTimeStampArr
        arrPlayerTimeStamp.push(timeStamp)
        setPlayerTimeStampArr(arrPlayerTimeStamp)
        const num = parseInt(store.getAvgOff())
        numberOfPresses = numberOfPresses + 1
        setNumberOfPresses(numberOfPresses)
        if (numberOfPresses > num) {
            let diffBetweenPlayerPresses = playerTimeStampArr[playerTimeStampArr.length - 1] - playerTimeStampArr[playerTimeStampArr.length - 2]
            if (diffBetweenPlayerPresses > 130) {
                const diffArrayPlayer = playerDiffPressArr
                diffArrayPlayer.push(diffBetweenPlayerPresses)
                setPlayerDiffPressArr(diffArrayPlayer)
                sumOfPlayerDiffPress = mySum(playerDiffPressArr, num);
                avgPlayerPresses = sumOfPlayerDiffPress / (num === 0 ? 1 : (playerDiffPressArr.length < num ? playerDiffPressArr.length : num))
                const listeningLevel = (((1 - percent) * avgPlayerPresses) + (percent * avgAgentPresses))
                let rndGitter = Math.floor(Math.random() * store.getGitter())
                const rand = Math.random()
                if (rand >= 0.5) {
                    rndGitter = rndGitter * -1
                }
                const LatencyGitter = ((listeningLevel + store.getLatency()) + rndGitter)

                let timeStamp2 = new Date().getTime()
                let timePassed = timeStamp2 - timeStamp
                if (listeningLevel !== 0) {
                    if (isIntervalID1) {
                        setMyInterval2(setInterval(agentPress, LatencyGitter - (timePassed - 120)))
                        setTimeout(() => {
                            clearInterval(intervalID1)
                        }, (LatencyGitter - (timePassed - 120)))
                    } else {
                        setMyInterval1(setInterval(agentPress, LatencyGitter - (timePassed - 120)))
                        setTimeout(() => {
                            clearInterval(intervalID2)
                        }, (LatencyGitter - (timePassed - 120)))

                    }
                    isIntervalID1 = !isIntervalID1
                    setIsIntervalID1(isIntervalID1)
                }
            }
            else{
                const arr_pop = playerTimeStampArr
                arr_pop.pop()
                setPlayerTimeStampArr(arr_pop)
                numberOfPresses = numberOfPresses - 1
                setNumberOfPresses(numberOfPresses)
            }
        }
        else {
            if (numberOfPresses > 1) {
                let diffBetweenPlayerPresses = playerTimeStampArr[playerTimeStampArr.length - 1] - playerTimeStampArr[playerTimeStampArr.length - 2]
                if (diffBetweenPlayerPresses > 250) {
                    const diffArrayPlayer = playerDiffPressArr
                    diffArrayPlayer.push(diffBetweenPlayerPresses)
                    setPlayerDiffPressArr(diffArrayPlayer)
                } else {
                    const arr_pop = playerTimeStampArr
                    arr_pop.pop()
                    setPlayerTimeStampArr(arr_pop)
                    numberOfPresses = numberOfPresses - 1
                    setNumberOfPresses(numberOfPresses)
                }
            }
        }
    }

    const setGitterLatencyForGame = () => {
        let randomIndex = getRndInteger(0,store.getGitterParams().length)
        let gitterExperience = store.getGitterParams()[randomIndex]
        let latencyExperience = store.getLatencyParams()[randomIndex]
        store.setGitter(gitterExperience)
        store.setLatency(latencyExperience)
        // console.log("gitterAfter: ", store.getGitter())
        // console.log("latencyAfter: ", store.getLatency())
        store.setDeleteGitterParams(randomIndex)
        store.setDeleteLatencyParams(randomIndex)
    }
    const agentButtonFadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(agentOpacity, {
            toValue: 1,
            duration: 10,
            useNativeDriver:true
        }).start();
    };
    const agentButtonFadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(agentOpacity, {
            toValue: 0.2,
            duration: 10,
            useNativeDriver:true
        }).start();
    };
    const playerButtonFadeIn = () => {
        Animated.timing(playerOpacity, {
            toValue: 1,
            duration: 10,
            useNativeDriver:true
        }).start();
    };
    const playerButtonFadeOut = () => {
        Animated.timing(playerOpacity, {
            toValue: 0.2,
            duration: 10,
            useNativeDriver:true
        }).start();
    };
    const getRndInteger = (min,max) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    const mySum = (arr,num) => {
        let sum = 0;
        if (arr.length-num <= 0){
            for (let i = 0; i < arr.length; i++) {
                sum += arr[i];
            }
        }
        else{
            for (let i = arr.length-num; i < arr.length; i++) {
                sum += arr[i];
            }
        }
        return sum
    }
    const renderAgentCircle = () =>{
        return(
            <View style={styles.circleBorderAgent}>
                <Animated.View
                    style={[
                        2 ,
                        {
                            opacity: agentOpacity
                        }
                    ]}
                >
                    <View style={styles.agentButton} />
                </Animated.View>
            </View>

        )
    }
    const renderPlayerCircle = () =>{
        return(
            <View style={styles.circleBorder}>
                <Pressable onPressIn={playerPress}>
                    <Animated.View
                        style={[
                            2 ,
                            {
                                opacity: playerOpacity
                            }
                        ]}
                    >
                        <View style={styles.playerButton}>
                            <Text style={{textAlign: 'center',fontSize:20,color:'black'}}>אני</Text>
                        </View>
                    </Animated.View>
                </Pressable>
            </View>
        )
    }
    return (
        <NativeBaseProvider>
            { isLoading ?
                <View style={styles.container}>
                    <View style={styles.buttonsContainer}>
                        {renderAgentCircle()}
                        {renderPlayerCircle()}
                    </View>
                </View> :
                <View style={styles.gameOverContainer}>
                    <View style={{alignItems: 'center',justifyContent:'center',flex:1}}>
                        <Heading>המשחק נגמר!</Heading>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Button size={"lg"} style={{width:'45%'}} onPress={onNextPress}>המשך</Button>
                        <Button size={"lg"} style={{width:'45%'}} onPress={playAgain}>שחק שוב</Button>
                    </View>
                </View>}

        </NativeBaseProvider>
    );
}

LatencyPlayScreen.navigationOptions = navigationData =>{
    return{
        title: 'Latency Game',
        headerTitleAlign: 'center'
    }
}

const styles = StyleSheet.create({
    container: {
        padding:15,
        flex: 1,
        justifyContent: 'space-between'
    },
    gameOverContainer:{
        flex: 1,
        justifyContent: 'space-between',
        padding:20
    },
    buttons:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    playerButton: {
        backgroundColor: 'rgba(20,174,255,0.51)',
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 3,
        borderRadius: (150 / 2),
        width: 150,
        height: 150,
    },
    agentButton: {
        backgroundColor: '#ff7f50',
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 3,
        borderRadius: (150 / 2),
        width: 150,
        height: 150,

    },
    circleBorder: {
        borderWidth: 3,
        borderRadius: (150 / 2),
        width: 153,
        height: 153,
        justifyContent: 'center',
        alignContent: 'center',
    },
    circleBorderAgent:{
        borderWidth: 3,
        borderRadius: (150 / 2),
        width: 155,
        height: 154,
        justifyContent: 'center',
        alignContent: 'center',
    }
});
export default LatencyPlayScreen
