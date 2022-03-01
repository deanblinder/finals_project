import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {Circle, NativeBaseProvider, Button, Heading, createIcon, Center, Avatar,Pressable} from 'native-base';
import AdministratorScreen from "./AdministratortScreen";
import api from "../api";

const GamePlayScreen = (props) => {
    let [isLoading,setLoading] = useState(true)
    let [playerTimeStampArr, setPlayerTimeStampArr] = useState([])
    let [playerDiffPressArr, setPlayerDiffPressArr] = useState([])
    let [agentTimeStampArr, setAgentTimeStampArr] = useState([])
    let [circleColor, setCircleColor] = useState("secondary.400")
    let [numberOfPresses, setNumberOfPresses] = useState(0)
    let [avgPlayerPresses, setAvgPlayerPresses] = useState(0)
    // let [myInterval, setMyInterval] = useState()
    //TODO: pot all the new code in a time loop of 1 min (mark in ***)
    // --- *************** ---
    //need to have userID or same detail of the user and agent
    // const play = function () {
    //     const userId = 1
    //     const agentType = 'fast'
    //     agentTimeStamp = [1645992161077,1645992161351,1645992161626,1645992161861,1645992162202]
    //     let meanPastAgentActions = average(agentTimeStamp)
    //     let meanPastUserActions = average(playerTimeStamp)
    //     //get algo type: 1 - agentLeader 2 - agentFollower 3 - network
    //     const algoType = 1
    //     let listeningLevel = 0
    //     // pressTimeNextAction = releaseTimeNextAction(listeningLevel) + totalTimeBetweenActions(const)
    //     let pressTimeNextAction  = 0
    //     let totalTimeBetweenActions = 0
    //     if(algoType === 1){
    //         listeningLevel = 0.8*meanPastAgentActions + 0.2*meanPastUserActions
    //         totalTimeBetweenActions = 0.5
    //     }
    //     else if(algoType === 2){
    //         listeningLevel = 0.2*meanPastAgentActions + 0.8*meanPastUserActions
    //         totalTimeBetweenActions = 0.5
    //     }
    //     else if(algoType === 3){
    //         listeningLevel = 0.5*meanPastAgentActions + 0.5*meanPastUserActions
    //         //    add the rest of the network algo
    //     }
    //     pressTimeNextAction = listeningLevel + totalTimeBetweenActions
    //     if (!isNaN(playerTimeStamp)){
    //         playerTimeStamp.push(pressTimeNextAction)
    //     }
    //     if (!isNaN(pressTimeNextAction)){
    //         agentTimeStamp.push(pressTimeNextAction)
    //     }
    //     setTimeout(play, 10000); // repeat myself
    //
    // }

    //TODO: --- *************** ---

    useEffect(() => {
        setInterval(agentPress,2000)
        // console.log('myInterval',myInterval)
        setTimeout(() => {
            setLoading(false)
        }, 30000);

    },[]);
    const onNextPress = async () => {
        //TODO:need to have userID or same detail of the user and agent
        // and add actionOwner
        const userID = 3;
        await api.sendPressTimeStamp(userID,"player",playerTimeStampArr) //send also 2 arrays
        // open when fix the algo
        await api.sendPressTimeStamp(userID,"agent",agentTimeStampArr) //send also 2 arrays
        props.navigation.navigate({routeName:'Questionnaire'});
    }

    const playerPress = async (timeStamp) => {
        const newAgentTimeStamp = [...playerTimeStampArr]
        newAgentTimeStamp.push(timeStamp)
        await  setPlayerTimeStampArr(newAgentTimeStamp)
        if (numberOfPresses >= 2){
            console.log('playerTimeStemp',playerTimeStampArr)
            let tempPlayerDiffPress = [...playerDiffPressArr]
            const diffBetweenPresses = playerTimeStampArr[playerTimeStampArr.length-1]-playerTimeStampArr[playerTimeStampArr.length-2]
            console.log("diffBetweenPresses",diffBetweenPresses)
            tempPlayerDiffPress.push(diffBetweenPresses)
            setPlayerDiffPressArr(tempPlayerDiffPress)
            console.log('playerDiff',playerDiffPressArr)
            const sumOfPlayerDiffPressArr = lodash.sum(playerDiffPressArr);
            console.log("sumOfPlayerDiffPressArr",sumOfPlayerDiffPressArr)
            setAvgPlayerPresses(sumOfPlayerDiffPressArr/playerDiffPressArr.length)
            let intervalId = setInterval(agentPress,avgPlayerPresses)
            // clearInterval(intervalId)
        }
        // else {
        //     setInterval(myCallback,2000)
        // }
        setNumberOfPresses(numberOfPresses+1)
    }
    // const sum = function(array) {
    //     var total = 0;
    //     for (var i=0; i<array.length; i++) {
    //         total += array[i];
    //     }
    //     return total;
    // };
    // const average = function(array) {
    //     let arraySum = sum(array);
    //     return arraySum / array.length;
    // };
    const agentPress = () => {
        setCircleColor('secondary.200')
        setTimeout(()=>{setCircleColor("secondary.400")},100)
        // clearInterval(intervalId)
    }
    //
    const renderAgentCircle = () =>{
        return(
        // <Pressable style={{margin:10}} onPress={()=>console.log('send current press time in an array')}>
            <Circle size={170} bg={circleColor}>
                סוכן
            </Circle>
        // </Pressable>
        )

    }
    return (
        <NativeBaseProvider>
            { isLoading ?
            <View style={styles.container}>
            <View style={styles.buttons}>
                {renderAgentCircle()}
                {/*{play()}*/}
                <Pressable onPress={()=>playerPress(new Date().getTime())}>
                    <Circle size={170} bg="secondary.400">
                        משתמש
                    </Circle>
                </Pressable>
            </View>
            </View> :
                <View style={styles.gameOverContainer}>
                    <Heading style={{justifyContent:'center',alignItems: 'center'}}>המשחק נגמר</Heading>
                    <Button onPress={onNextPress}>המשך</Button>
                </View>}

        </NativeBaseProvider>
    );
}
GamePlayScreen.navigationOptions = navigationData =>{
    return{
        title: '',
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
    gameOverContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default GamePlayScreen
