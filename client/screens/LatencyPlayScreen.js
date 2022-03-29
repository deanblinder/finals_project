import React, {useEffect, useState,useRef} from 'react';
import { StyleSheet, View,TouchableOpacity,Animated} from 'react-native';
import {Circle, NativeBaseProvider, Button, Heading, createIcon, Center, Avatar,Pressable,Text} from 'native-base';
import {store} from '../state/state'
import AdministratorScreen from "./AdministratortScreen";
import api from "../api";

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
    let [intervalID,setMyInterval] = useState(null)
    let [intervalID2,setMyInterval2] = useState(null)
    let [isIntervalID,setIsIntervalID] = useState(true)
    let [numberOfAgentPresses,setNumberOfAgentPresses] = useState(false)
    // let [linsteningLevel,setLinsteningLevel] = useState(0)
    let [gitter,setGitter] = useState(0)
    let [latency,setLatency] = useState(0)
    let [playerTimeStamp, setPlayerTimeStamp] = useState(0)
    let [agentTimeStamp, setAgentTimeStamp] = useState(0)
    let sumOfPlayerDiffPressArr = 0
    const MAX_DIFFERENCE_TIME = 5000
    useEffect(() => {
        setLatency(store.getLatency())
        setGitter(store.getGitter())
        setMyInterval(setInterval(agentPress,2000))
        setTimeout(() => {
            setMyInterval(clearInterval(intervalID))
            setMyInterval2(clearInterval(intervalID2))
            setLoading(false)
        }, parseInt(store.getGameTime())*1000);

    },[]);
    const onNextPress = () => {
        props.navigation.navigate({routeName:'Questionnaire'});
    }
    const playAgain = () => {
        props.navigation.navigate({routeName:'FindPlayer'});
    }
    // const differenceBetweenPressTime = () =>{
    //     // console.log("playerTimeStamp",playerTimeStamp/1000)
    //     // console.log("agentTimeStamp",agentTimeStamp/1000)
    //     console.log("diff: ", agentTimeStamp - playerTimeStamp)
    //
    //     if(agentTimeStamp - playerTimeStamp >= MAX_DIFFERENCE_TIME){
    //         clearInterval(intervalID)
    //         clearInterval(intervalID2)
    //     }
    // }
    const agentPress = () => {
        agentButtonFadeOut()
        setTimeout(() => {
            agentButtonFadeIn()
        }, 250)
        let timeStamp = new Date().getTime()
        setAgentTimeStamp(timeStamp)
        setAgentTimeStampArr([...agentTimeStampArr,timeStamp])
        let diffBetweenPresses
        if (numberOfAgentPresses >= 2){
            // differenceBetweenPressTime()
            let currTime = new Date().getTime()
            // console.log("timeStamp: ", timeStamp)
            // console.log("currTime: ",  currTime)
            // console.log("playerTimeStamp: ",  playerTimeStamp)
            // console.log("diff: ", currTime - playerTimeStamp)
            // if(currTime - playerTimeStamp >= MAX_DIFFERENCE_TIME){
            //     // console.log("in if")
            //
            //     clearInterval(intervalID)
            //     clearInterval(intervalID2)
            //
            // }

            diffBetweenPresses = agentTimeStampArr[agentTimeStampArr.length-1]-agentTimeStampArr[agentTimeStampArr.length-2]
            setAgentDiffPressArr([...agentDiffPressArr,diffBetweenPresses])
            let sumOfAgentDiffPressArr = mySum(agentDiffPressArr,parseInt(store.getAvgOff()));
            setAvgAgentPresses(sumOfAgentDiffPressArr/parseInt(store.getAvgOff()))
        }
        setNumberOfAgentPresses(numberOfAgentPresses+1)
    }
    const playerPress = () => {
        // console.log("in player pess")
        let timeStamp = new Date().getTime()
        setPlayerTimeStamp(timeStamp)
        let percent = 0.5
        playerButtonFadeOut()
        setTimeout(() => {
            playerButtonFadeIn()
        }, 250)
        setPlayerTimeStampArr([...playerTimeStampArr, timeStamp])
        let diffBetweenPresses
        // console.log("type of :",  typeof (numberOfPresses))
        if (numberOfPresses > 2) {
            diffBetweenPresses = playerTimeStampArr[playerTimeStampArr.length - 1] - playerTimeStampArr[playerTimeStampArr.length - 2]
            setPlayerDiffPressArr([...playerDiffPressArr, diffBetweenPresses])
            let num = parseInt(store.getAvgOff())
            sumOfPlayerDiffPressArr = mySum(playerDiffPressArr, num);
            setAvgPlayerPresses(sumOfPlayerDiffPressArr / (num === 0 ? 1 : num))
            const listeningLevel = (((1 - percent) * avgPlayerPresses) + (percent * avgAgentPresses))
            let rndGitter = Math.floor(Math.random() * gitter)
            const rand = Math.random()
            if (rand >= 0.5){
                rndGitter = rndGitter*-1
            }
            const LatencyGitter = ((listeningLevel + latency) + rndGitter)
            // console.log("rndGitter: ", rndGitter)
            // console.log("listeningLevel: ", listeningLevel)
            // console.log("LatencyGitter: ", LatencyGitter)
            // setLinsteningLevel(LatencyGitter)
            let timeStamp2 = new Date().getTime()
            let timePassed = timeStamp2 - timeStamp
            if (isIntervalID) {
                setMyInterval2(setInterval(agentPress, LatencyGitter))
                setTimeout(() => {
                    clearInterval(intervalID)
                }, (listeningLevel - (timePassed-110)))
                setIsIntervalID(!isIntervalID)
            } else {

                setMyInterval(setInterval(agentPress, LatencyGitter))
                setTimeout(() => {
                    clearInterval(intervalID2)
                }, (listeningLevel - (timePassed-110)))
                setIsIntervalID(!isIntervalID)
            }
            // console.log('end if')
        }
        // console.log("outside the end if");
        setNumberOfPresses(numberOfPresses +1)
        // console.log(numberOfPresses)
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
    const mySum = (arr,num) => {
        let sum = 0;
        if (arr.length-num < 0){
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
            <View>
                <Animated.View
                    style={[
                        2 ,
                        {
                            // Bind opacity to animated value
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
            <Pressable onPressIn={playerPress}>
                <Animated.View
                    style={[
                        2 ,
                        {
                            // Bind opacity to animated value
                            opacity: playerOpacity
                        }
                    ]}
                >
                    <View style={styles.playerButton}>
                        <Text style={{textAlign: 'center',fontSize:20,color:'black'}}>אני</Text>
                    </View>
                </Animated.View>
            </Pressable>
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
});
export default LatencyPlayScreen