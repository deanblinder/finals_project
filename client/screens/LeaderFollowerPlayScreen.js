import React, {useEffect, useState,useRef} from 'react';
import { StyleSheet, View,Animated} from 'react-native';
import {NativeBaseProvider, Button, Heading,Pressable,Text} from 'native-base';
import {store} from '../state/state'
import api from "../api";

const LeaderFollowerPlayScreen = (props) =>{
    const agentOpacity = useRef(new Animated.Value(1)).current;
    const playerOpacity = useRef(new Animated.Value(1)).current;
    let [isLoading,setLoading] = useState(true)
    const playerTimeStampArr = useRef([])
    const agentTimeStampArr = useRef([])
    const playerDiffPressArr = useRef([])
    const agentDiffPressArr = useRef([])
    const startGameTime = useRef()
    const numberOfPresses = useRef(0)
    const avgAgentPresses = useRef(2000)
    const intervalID1 = useRef()
    const didPlayerStartPlay = useRef(false)
    const timeoutID =  useRef(0)
    const listeningLevel2 =useRef(2000)
    let [timePassedId,setTimePassedId] = useState(null)
    const numberOfAgentPresses = useRef(0)
    let [isFinish,setIsFinish] = useState(false)
    let [isTimePassed,setIsTimePassed] = useState(false)
    const TIME_UNTIL_AGENT_STOP_PRESS = 4000
    useEffect(() => {
        store.setGameNumber(store.getGameNumber()+1)
        startGameTime.current = new Date().getTime()
        setWeightForGame()
        timeoutID.current = setTimeout(agentPress,listeningLevel2.current)
        setTimeout(() => {
            setIsFinish(true)
        }, parseInt(store.getGameTime())*1000);
    },[]);

    useEffect(()=>{
        if (isFinish){
            clearTimeout(timeoutID.current)
            setLoading(false)
        }
    },    [isFinish])


    useEffect(()=>{
        if (isTimePassed){
            console.log('isTimePassed effect')
            // clearInterval(intervalID1.current)
            clearTimeout(timeoutID.current)
        }
    }, [isTimePassed])



    const setWeightForGame = () => {
        ////////////////////////////////////////////// remove at the end, just for administrator
        // let administratorWeight = store.getAgentType()
        // store.setWeight(administratorWeight)
        // let administratorAVG = store.getAvgOff()
        // store.setAvgOf(administratorAVG)
        // let administratorGameTime = store.getGameTime()
        // store.setGameTime(administratorGameTime)
        //////////////////////////////////////////////
        let randomIndex = getRndInteger(0,store.getWeightExp().length)
        let weightExperience = store.getWeightExp()[randomIndex]
        store.setWeight(weightExperience)
        store.setDeleteWeightExp(randomIndex)
        console.log("LeadFollowAgent_"+store.getWeight())
    }
    const onNextPress = () => {
        api.sendPressTimeStamp(store.getModel(), playerTimeStampArr.current, agentTimeStampArr.current, "LeadFollowAgent_" + store.getWeight())
        props.navigation.push('Questionnaire');
        // props.navigation.navigate({routeName:'FindPlayer'});
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
    const agentPress = () => {
        if (!didPlayerStartPlay.current && ( new Date().getTime() - startGameTime.current > TIME_UNTIL_AGENT_STOP_PRESS )){
            setIsTimePassed(true)
        }
        const timeStamp = new Date().getTime()
        buttonFadeFunc({isAgent:true})
        agentTimeStampArr.current.push(timeStamp)
        if (numberOfAgentPresses.current > 2) {
            const diffBetweenAgentPresses = agentTimeStampArr.current[agentTimeStampArr.current.length- 1] - agentTimeStampArr.current[agentTimeStampArr.current.length - 2]
            agentDiffPressArr.current.push(diffBetweenAgentPresses)
            const numOfLastPresses = parseInt(store.getAvgOff())
            const  divBy =  agentDiffPressArr.current.length < numOfLastPresses ?agentDiffPressArr.current.length : numOfLastPresses
            const sumOfAgentDiffPressArr = mySum(agentDiffPressArr.current,numOfLastPresses);
            avgAgentPresses.current = sumOfAgentDiffPressArr / divBy
        }
        numberOfAgentPresses.current = numberOfAgentPresses.current +1
        timeoutID.current = setTimeout(agentPress,listeningLevel2.current-(30))
    }

    const playerPress = () => {
        didPlayerStartPlay.current = true
        if (isTimePassed){
            setIsTimePassed(false)
            timeoutID.current = setTimeout(agentPress,600)
        }
        clearTimeout(timePassedId)
        const timeUntilAgentStopPress = setTimeout(() => {
            setIsTimePassed(true)
        }, TIME_UNTIL_AGENT_STOP_PRESS)
        setTimePassedId(timeUntilAgentStopPress)
        const timeStamp = new Date().getTime()
        buttonFadeFunc({isAgent:false})
        playerTimeStampArr.current.push(timeStamp)
        if (numberOfPresses.current > 2) {
            clearInterval(intervalID1.current)
            const diffBetweenPlayerPresses = playerTimeStampArr.current[playerTimeStampArr.current.length - 1] - playerTimeStampArr.current[playerTimeStampArr.current.length - 2]
            playerDiffPressArr.current.push(diffBetweenPlayerPresses)
            const numOfLastPresses = parseInt(store.getAvgOff())
            const sumOfPlayerDiffPress = mySum(playerDiffPressArr.current, numOfLastPresses);
            const  divBy =  playerDiffPressArr.current.length < numOfLastPresses ?playerDiffPressArr.current.length : numOfLastPresses
            const avgPlayerPresses = sumOfPlayerDiffPress / divBy
            listeningLevel2.current = (((1 - store.getWeight()) * avgPlayerPresses) + (store.getWeight() * avgAgentPresses.current))
        }
        numberOfPresses.current = numberOfPresses.current + 1

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
        if (arr.length < num){
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
                    <View style={styles.agentButton} >
                        <Text style={{textAlign: 'center',fontSize:20,color:'black',justifyContent:'center'}}>משתתף מרוחק</Text>
                    </View>
                </Animated.View>
            </View>

        )
    }
    const renderPlayerCircle = () =>{
        return(
            <View style={styles.circleBorderPlayer}>
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
                        <Text style={{textAlign: 'center',fontSize:20,color:'black',justifyContent:'center'}}>אני</Text>
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
                        <Heading>הסתיים משחקון {store.getGameNumber()} מתוך 3</Heading>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Button size={"lg"} style={{width:'100%'}} onPress={onNextPress}>המשך לשאלון</Button>
                        {/*<Button size={"lg"} style={{width:'45%'}} onPress={playAgain}>שחק שוב</Button>*/}
                    </View>
                </View>}

        </NativeBaseProvider>
    );
}

LeaderFollowerPlayScreen.navigationOptions = navigationData =>{
    return{
        title: '',
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
        // borderWidth: 3,
        borderRadius: (150 / 2),
        width: 150,
        height: 150,
        textAlign:'center'
    },
    agentButton: {
        backgroundColor: '#ff7f50',
        justifyContent: 'center',
        alignContent: 'center',
        // borderWidth: 3,
        borderRadius: (150 / 2),
        width: 150,
        height: 150,

    },
    circleBorderPlayer: {
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
export default LeaderFollowerPlayScreen
