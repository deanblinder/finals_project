import React, {useEffect, useState,useRef} from 'react';
import { StyleSheet, View,TouchableOpacity,Animated} from 'react-native';
import {Circle, NativeBaseProvider, Button, Heading, createIcon, Center, Avatar,Pressable,Text} from 'native-base';
import {store} from '../../../../Downloads/finals_project-algo/client/state/state'
import AdministratorScreen from "./AdministratortScreen";
import api from "../../../../Downloads/finals_project-algo/client/api";

const GamePlayScreen = (props) =>{
    const fadeAnim = useRef(new Animated.Value(1)).current;
    let [isLoading,setLoading] = useState(true)
    let [playerTimeStampArr, setPlayerTimeStampArr] = useState([])
    let [agentTimeStampArr, setAgentTimeStampArr] = useState([])
    let [playerDiffPressArr, setPlayerDiffPressArr] = useState([])
    let [agentDiffPressArr, setAgentDiffPressArr] = useState([])
    let [numberOfPresses, setNumberOfPresses] = useState(0)
    let [avgPlayerPresses, setAvgPlayerPresses] = useState(0)
    let [avgAgentPresses, setAvgAgentPresses] = useState(2000)
    let [intervalID,setMyInterval] = useState(null)
    let [numberOfAgentPresses,setNumberOfAgentPresses] = useState(false)
    let [isInterval,setIsInterval] = useState(false)
    let sumOfPlayerDiffPressArr = 0
    useEffect(() => {
        console.log(store.getAvgOff(),typeof store.getAvgOff());
        setMyInterval(setInterval(agentPress,2000))
        setTimeout(() => {
            setMyInterval(clearInterval(intervalID))
            setLoading(false)
        }, 30000);

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
    const playAgain = () => {
        props.navigation.navigate({routeName:'FindPlayer'});
    }
    const agentPress = () => {
        fadeOut()
        setTimeout(() => {
            fadeIn()
        }, 100)
        let timeStamp = new Date().getTime()
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
        let timeStamp = new Date().getTime()
        let percent = 0
        console.log('store',typeof store.getAgentType())
        if (store.getAgentType() == 0){
            percent = 0.0
        } else if (store.getAgentType() == 1){
            percent = 0.2
        }else if (store.getAgentType() == 2){
            percent = 0.4

        }else if (store.getAgentType() == 3){
            percent = 0.6

        }else if (store.getAgentType() == 4){
            percent = 0.8

        }else if (store.getAgentType() == 5){
            percent = 1
        }
        console.log(percent,'percent')
        setPlayerTimeStampArr([...playerTimeStampArr,timeStamp])
        let diffBetweenPresses
        if (numberOfPresses > 2){
            diffBetweenPresses = playerTimeStampArr[playerTimeStampArr.length-1]-playerTimeStampArr[playerTimeStampArr.length-2]
            setPlayerDiffPressArr([...playerDiffPressArr,diffBetweenPresses])
            sumOfPlayerDiffPressArr = mySum(playerDiffPressArr,parseInt(store.getAvgOff()));
            setAvgPlayerPresses(sumOfPlayerDiffPressArr/parseInt(store.getAvgOff()))
            const linsteningLevel = (((1-percent)*avgPlayerPresses) + (percent*avgAgentPresses))
            clearInterval(intervalID)
            setMyInterval(setInterval(agentPress,linsteningLevel))
        }
        setNumberOfPresses(numberOfPresses +1)
    }
    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 10,
            useNativeDriver:true
        }).start();
    };

    const fadeOut = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(fadeAnim, {
            toValue: 0.1,
            duration: 10,
            useNativeDriver:true
        }).start();
    };
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
        return sum
    }
    const renderAgentCircle = () =>{
        return(
            <Pressable onPress={agentPress}>
                    <Animated.View
                        style={[
                            2 ,
                            {
                                // Bind opacity to animated value
                                opacity: fadeAnim
                            }
                        ]}
                    >
                        <View style={styles.agentButton} />
                    </Animated.View>
            </Pressable>

        )
    }
    const renderPlayerCircle = () =>{
        return(
        <View style={styles.container1}>
            <TouchableOpacity
                activeOpacity={0.1} //The opacity of the button when it is pressed
                style = {styles.playerButton}
                onPress = {playerPress}
            >
            </TouchableOpacity>
        </View>
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
                        <View></View>
                        <View style={{alignItems: 'center'}}>
                            <Heading >המשחק נגמר!</Heading>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Button size={"lg"} style={{width:'45%'}} onPress={onNextPress}>המשך</Button>
                            <Button size={"lg"} style={{width:'45%'}} onPress={playAgain}>שחק שוב</Button>
                        </View>
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
        // alignItems: 'center',
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
    container1: {
        position: 'relative',
        zIndex: 0,
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
    pressedAgentButtonStyle: {
        backgroundColor: '#ff7f50',
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 3,
        borderRadius: (150 / 2),
        width: 150,
        height: 150,
        opacity: 0.1
    },
});
export default GamePlayScreen
