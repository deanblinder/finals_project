import React, {useEffect, useState,useRef} from 'react';
import { StyleSheet, View,TouchableOpacity,Animated} from 'react-native';
import {Circle, NativeBaseProvider, Button, Heading, createIcon, Center, Avatar,Pressable,Text} from 'native-base';
import {store} from '../state/state'
import AdministratorScreen from "./AdministratortScreen";
import api from "../api";

const LeaderFollowerPlayScreen = (props) =>{
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
    let [timePassedId,setTimePassedId] = useState(null)
    let [numberOfAgentPresses,setNumberOfAgentPresses] = useState(false)
    let [linsteningLevel,setLinsteningLevel] = useState(0)
    let [isFinish,setIsFinish] = useState(false)
    let [isTimePassed,setIsTimePassed] = useState(false)
    let sumOfPlayerDiffPressArr = 0
    useEffect(() => {
        const id = setInterval(agentPress,2000);
        setMyInterval(id)
        console.log({id})
        setTimeout(() => {
            setIsFinish(true)
        }, parseInt(store.getGameTime())*1000*2);

    },[]);
    useEffect(()=>{
        if (isFinish){
            console.log({intervalID})
            console.log({intervalID2})
            clearInterval(intervalID)
            clearInterval(intervalID2)
            setLoading(false)
        }
    },    [isFinish])


    useEffect(()=>{
        if (isTimePassed){
            console.log('isTimePassed')
            console.log({intervalID})
            console.log({intervalID2})
            clearInterval(intervalID)
            clearInterval(intervalID2)
            setIsTimePassed(false)
        }
    },    [isTimePassed])
    const onNextPress = () => {
        props.navigation.navigate({routeName:'Questionnaire'});
    }
    const playAgain = () => {
        props.navigation.navigate({routeName:'FindPlayer'});
    }
    const agentPress = () => {
        agentButtonFadeOut()
        setTimeout(() => {
            agentButtonFadeIn()
        }, 250)
        let timeStamp = new Date().getTime()
        console.log('timeStamp: ',timeStamp)

        setAgentTimeStampArr([...agentTimeStampArr,timeStamp])
        let diffBetweenPresses
        if (numberOfAgentPresses >= 2){
            diffBetweenPresses = agentTimeStampArr[agentTimeStampArr.length-1]-agentTimeStampArr[agentTimeStampArr.length-2]
            setAgentDiffPressArr([...agentDiffPressArr,diffBetweenPresses])
            let sumOfAgentDiffPressArr = mySum(agentDiffPressArr,parseInt(store.getAvgOff()));
            setAvgAgentPresses(sumOfAgentDiffPressArr/parseInt(store.getAvgOff()))
        }
        setNumberOfAgentPresses(numberOfAgentPresses+1)
    }
    const playerPress = () => {
        clearTimeout(timePassedId)
        console.log({timePassedId})
        const fiveSecondsId = setTimeout(() => {
            console.log({timePassedId})
            setIsTimePassed(true)
        }, 5000)
        setTimePassedId(fiveSecondsId)
        let timeStamp = new Date().getTime()
        let percent = 0
        if (store.getAgentType() === 0) {
            percent = 0.0
        } else if (store.getAgentType() === 1) {
            percent = 0.2
        } else if (store.getAgentType() === 2) {
            percent = 0.4
        } else if (store.getAgentType() === 3) {
            percent = 0.6
        } else if (store.getAgentType() === 4) {
            percent = 0.8
        } else if (store.getAgentType() === 5) {
            percent = 1
        }
        playerButtonFadeOut()
        setTimeout(() => {
            playerButtonFadeIn()
        }, 250)
        setPlayerTimeStampArr([...playerTimeStampArr, timeStamp])
        let diffBetweenPresses
        if (numberOfPresses > 2) {
            diffBetweenPresses = playerTimeStampArr[playerTimeStampArr.length - 1] - playerTimeStampArr[playerTimeStampArr.length - 2]
            setPlayerDiffPressArr([...playerDiffPressArr, diffBetweenPresses])
            let num = parseInt(store.getAvgOff())
            sumOfPlayerDiffPressArr = mySum(playerDiffPressArr, num);
            setAvgPlayerPresses(sumOfPlayerDiffPressArr / (num === 0 ? 1 : num))
            const linsteningLevel = (((1 - percent) * avgPlayerPresses) + (percent * avgAgentPresses))
            //(linsteningLevel + letancy) +- gitter
            setLinsteningLevel(linsteningLevel)
            let timeStamp2 = new Date().getTime()
            let timePassed = timeStamp2 - timeStamp
            if (isIntervalID) {
                setMyInterval2(setInterval(agentPress, linsteningLevel))
                setTimeout(() => {
                    clearInterval(intervalID)
                    console.log({intervalID})
                }, (linsteningLevel - (timePassed-110)))
                setIsIntervalID(!isIntervalID)
            } else {
                setMyInterval(setInterval(agentPress, linsteningLevel))
                setTimeout(() => {
                    clearInterval(intervalID2)
                    console.log({intervalID2})
                }, (linsteningLevel - (timePassed-110)))
                setIsIntervalID(!isIntervalID)
            }
        }
        setNumberOfPresses(numberOfPresses +1)
        // console.log("numberOfPresses", numberOfPresses)

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
        // console.log(arr.length,num)
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
                        <Text style={{textAlign: 'center',fontSize:20,color:'black',justifyContent:'center'}}>??????</Text>
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
                        <Heading>?????????? ????????!</Heading>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Button size={"lg"} style={{width:'45%'}} onPress={onNextPress}>????????</Button>
                        <Button size={"lg"} style={{width:'45%'}} onPress={playAgain}>?????? ??????</Button>
                    </View>
                </View>}

        </NativeBaseProvider>
    );
}

LeaderFollowerPlayScreen.navigationOptions = navigationData =>{
    return{
        title: 'Leader-Follower Game',
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
        textAlign:'center'
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
export default LeaderFollowerPlayScreen
