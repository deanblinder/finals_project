import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import {Circle, NativeBaseProvider, Button, Heading, createIcon, Center, Avatar,Pressable,Text} from 'native-base';
import {store} from '../state/state'
import AdministratorScreen from "./AdministratortScreen";
import api from "../api";

const GamePlayScreen = (props) =>{
    let [isLoading,setLoading] = useState(true)
    let [playerTimeStampArr, setPlayerTimeStampArr] = useState([])
    let [agentTimeStampArr, setAgentTimeStampArr] = useState([])
    let [playerDiffPressArr, setPlayerDiffPressArr] = useState([])
    let [agentDiffPressArr, setAgentDiffPressArr] = useState([])
    let [agentCircleColor, setAgentCircleColor] = useState("secondary.400")
    let [playerCircleColor, setPlayerCircleColor] = useState("secondary.400")
    let [numberOfAgentPresses, setNumberOfAgentPresses] = useState(0)
    let [numberOfPresses, setNumberOfPresses] = useState(0)
    let [avgPlayerPresses, setAvgPlayerPresses] = useState(0)
    let [avgAgentPresses, setAvgAgentPresses] = useState(2000)
    let [intervalID,setMyInterval] = useState(null)
    // let numberOfPresses = 0
    let sumOfPlayerDiffPressArr = 0
    let sumOfAgentDiffPressArr = 0
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
        console.log(store.getAgentType())
        intervalID = setMyInterval(setInterval(agentPress,2000))
        // avgPlayerPresses= 2000
        // console.log('myInterval',myInterval)
        setTimeout(() => {
            setLoading(false)
            clearInterval(intervalID)
        }, 10000);

    },[]);
    const onNextPress = () => {
        //TODO:need to have userID or same detail of the user and agent
        // and add actionOwner
        // const userID = 3;
        // await api.sendPressTimeStamp(userID,"player",playerTimeStampArr) //send also 2 arrays
        // open when fix the algo
        // await api.sendPressTimeStamp(userID,"agent",agentTimeStampArr) //send also 2 arrays
        props.navigation.navigate({routeName:'Questionnaire'});
    }
    const agentPress  = () => {
        setAgentCircleColor('secondary.900')
        setTimeout(()=>{setAgentCircleColor("secondary.400")},10)
        // setAgentTimeStampArr(agentTimeStampArr=>[...agentTimeStampArr,timeStamp])
        // let diffBetweenPresses
        // if (numberOfAgentPresses >= 2){
        //     diffBetweenPresses = agentTimeStampArr[agentTimeStampArr.length-1]-agentTimeStampArr[agentTimeStampArr.length-2]
        //     setAgentDiffPressArr(agentDiffPressArr=>[...agentDiffPressArr,diffBetweenPresses])
        //     sumOfAgentDiffPressArr = mySum(agentDiffPressArr,3);
        //     setAvgAgentPresses(sumOfAgentDiffPressArr/3)
        // }
        // let num = numberOfAgentPresses + 1
        // setNumberOfAgentPresses(num)
        console.log('-------------agent----------------')
    }
    const playerPress = async (timeStamp) => {
        console.log('-------------player----------------')
        setPlayerCircleColor('secondary.900')
        setTimeout(()=>{setPlayerCircleColor("secondary.400")},10)
        setPlayerTimeStampArr(playerTimeStampArr=>[...playerTimeStampArr,timeStamp])
        let diffBetweenPresses
        if (numberOfPresses > 2){
            diffBetweenPresses = playerTimeStampArr[playerTimeStampArr.length-1]-playerTimeStampArr[playerTimeStampArr.length-2]
            await setPlayerDiffPressArr(playerDiffPressArr=>[...playerDiffPressArr,diffBetweenPresses])
            sumOfPlayerDiffPressArr = mySum(playerDiffPressArr,3);
            // await setAvgPlayerPresses(sumOfPlayerDiffPressArr/3)
            // const linsteningLevel = 0.5*avgPlayerPresses + 0.5*avgAgentPresses
            // console.log("player --- linsteningLevel",linsteningLevel)
            // console.log("player --- sumOfPlayerDiffPressArr",sumOfPlayerDiffPressArr)
            // console.log("player --- playerTimeStampArr",playerDiffPressArr)
            // console.log("player --- avgPlayerPresses",sumOfPlayerDiffPressArr/3)
            let avg = (sumOfPlayerDiffPressArr/3)
            setAgentCircleColor('secondary.900')
            setTimeout(()=>{setAgentCircleColor("secondary.400")},10)
            clearInterval(intervalID)
            intervalID = setMyInterval(setInterval(agentPress,avg))
        }

        let num = numberOfPresses +1
        await setNumberOfPresses(num)
        console.log('numberOfPresses',numberOfPresses)
        console.log('-------------player----------------')
    }


    const mySum = (arr,num) => {
        let sum = 0;
        let len
        if (arr.length-num < 0){
            len = arr.length
        }
        else{
            len = arr.length-num
        }
        for (let i = len; i < arr.length; i++) {
            sum += arr[i];
        }
        console.log('sum',sum)
        return sum
    }
    const renderAgentCircle = () =>{
        return(
            <Circle size={170} bg={agentCircleColor}>
                סוכן
            </Circle>
        )

    }
    const renderPlayerCircle = () =>{
        return(
            <Pressable onPress={()=>playerPress(new Date().getTime())}>
                <Circle size={170} bg={playerCircleColor}>
                    משתמש
                </Circle>
            </Pressable>
        )

    }
        return (
            <NativeBaseProvider>
                { isLoading ?
                    <View style={styles.container}>
                        <View style={styles.buttons}>
                            <View style={styles.buttonsContainer}>
                            {renderAgentCircle()}
                            {renderPlayerCircle()}
                            </View>
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
    },
    buttonsContainer:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
});
export default GamePlayScreen
