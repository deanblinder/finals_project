import React,{useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
    NativeBaseProvider,
    Button,
    View,
    Heading, Text, TextArea
} from 'native-base';
import PickerComponent from "../compoenents/PickerComponent";
import AdministratorScreen from "./AdministratortScreen";
import api from "../api";
import uuid from "react-native-uuid";
// import GuidelineComponent from "../compoenents/GuidelineComponent";
import {store} from '../state/state'

const QuestionnaireScreen =(props) => {
    const [textAreaValue, setTextAreaValue] = useState('')
    const [agent_type,setAgent_type] = useState('')
    let [percent, setPercent] = useState(0)

    let [qDict, setQDict] = useState({
        questionOne:undefined,
        questionTwo:undefined,
        questionThree:undefined,
        questionFour:undefined,
        questionFive:undefined,
        questionSix:undefined,
        questionSeven:''
    })

    const sendRating1 = (rating) => {
        const tempQDict = qDict

        tempQDict.questionOne=rating
         setQDict(tempQDict)
    }
    const sendRating2 = (rating) => {
        const tempQDict = qDict


        tempQDict.questionTwo=rating
        setQDict(tempQDict)
    }
    const sendRating3 = (rating) => {
        const tempQDict = qDict
        tempQDict.questionThree=rating
        setQDict(tempQDict)
    }
    const sendRating4 = (rating) => {
        const tempQDict = qDict
        tempQDict.questionFour=rating
        setQDict(tempQDict)
    }
    const sendRating5 = (rating) => {
        const tempQDict = qDict
        tempQDict.questionFive=rating
        setQDict(tempQDict)
    }
    const sendRating6 = (rating) => {
        const tempQDict = qDict
        tempQDict.questionSix=rating
        setQDict(tempQDict)
    }
    const sendText7 = (text) => {
        setTextAreaValue(text)
        const tempQDict = qDict
        tempQDict.questionSeven=textAreaValue
        setQDict(tempQDict)
    }
    const setPercentForGame = () => {
        switch (store.getAgentType()) {
            case 0:
                setPercent(0.0)
                break
            case 1:
                setPercent(0.2)
                break
            case 2:
                setPercent(0.4)
                break
            case 3:
                setPercent(0.6)
                break
            case 4:
                setPercent(0.8)
                break
            case 5:
                setPercent(1)
                break
            default:
                setPercent(0.0)
        }
    }
    const updateAgentType = () => {
        // console.log("here")
        if (store.getExperimentType() === 'followerLeader'){
            // console.log("Im in if")

            setPercentForGame()
            setAgent_type("LeadFollowAgent_" + percent)
        }
        else{
            // console.log("Im in else")
            setAgent_type("LatencyAgent_"+store.getGitter()+"_"+store.getLatency())
            // console.log("agentType", agent_type)
        }
    }
    const onNextPress = () =>{
        // console.log(qDict)
        //send Qdict

        if (qDict.questionOne && qDict.questionTwo && qDict.questionThree && qDict.questionFour && qDict.questionFive && qDict.questionSix && qDict.questionSeven){
            const user_id = uuid.v4()
            updateAgentType()
            console.log("agent_type", agent_type)
            api.sendAnswers(user_id,agent_type,qDict)
            // api.sendQuestionnaireAnswers(qDict,agent_type,deviceUUID) // send user id,
            props.navigation.navigate({routeName:'GoodBye'});
        }
    }
    return (
        <NativeBaseProvider>
            <ScrollView>
            <View style={styles.container}>
                <Heading size={"md"} style={{textAlign:'right'}}>אנא מלא את השאלון</Heading>
                <Text style={{paddingTop: 20,...styles.text}}> 1. באיזה מידה התרכזת במשימה?</Text>
                <PickerComponent title='באיזה מידה התרכזת במשימה? 1' rating={sendRating1}/>

                <Text style={styles.text}> 2. באיזה מידה  הרגשת שהלחיצות שלך תואמות את אלה של המשתתפ/ת 1? </Text>
                <PickerComponent title='באיזה מידה  הרגשת שהלחיצות שלך תואמות את אלה של המשתתפ/ת 1? 2' rating={sendRating2}/>

                <Text style={styles.text}>3. האם חשת ״תחושת ביחד״ כשלחצת עם המשתתפ/ת השני/יה? </Text>
                <PickerComponent title='האם חשת ״תחושת ביחד״ כשלחצת עם המשתתפ/ת השני/יה? 3' rating={sendRating3}/>

                <Text style={styles.text}>4. באיזו מידה הרגשת שאת/ה והמשתתפ/ת השני/ה שיתפתם פעולה?</Text>
                <PickerComponent title='באיזו מידה הרגשת שאת/ה והמשתתפ/ת השני/ה שיתפתם פעולה? 4' rating={sendRating4}/>

                <Text style={styles.text}>5. כמה קירבה את/ה מרגיש/ה כרגע למשתתפ/ת המרוחק/ת בניסוי:</Text>
                <PickerComponent title='כמה קירבה את/ה מרגיש/ה כרגע למשתתפ/ת המרוחק/ת בניסוי: 5' rating={sendRating5}/>

                <Text style={styles.text}>6. באיזו מידה תהי/ה פתוח לשיתוף פעולה נוסף עם המשתתפ/ת המרוחק/ת הזה בניסוי המשך? </Text>
                <PickerComponent title='באיזו מידה תהי/ה פתוח לשיתוף פעולה נוסף עם המשתתפ/ת המרוחק/ת הזה בניסוי המשך? 6' rating={sendRating6}/>

                <Text  style={styles.text} >7. תאר/י בכמה מילים את חוווית המשחק מול משתתפ/ת 1  </Text>
                <TextArea
                    value={textAreaValue}
                    onChangeText={(text)=>{sendText7(text)}}
                    // numberOfLines={10}
                    // h={100}
                    placeholder="מלא כאן"
                    w={{
                        base: "100%",
                        md: "40%",}}
                    totalLines={10}
                />
            {!(qDict.questionOne && qDict.questionTwo && qDict.questionThree && qDict.questionFour && qDict.questionFive && qDict.questionSix && qDict.questionSeven) &&
                <View>
                        <Text fontSize={'lg'} style={{textAlign:'center',color: 'red'}}>נא הכנס את כל הפרטים</Text>
                </View>
                }
                <Button onPress={onNextPress}>המשך</Button>
            </View>
            </ScrollView>
        </NativeBaseProvider>
    );
}
QuestionnaireScreen.navigationOptions = navigationData =>{
    return{
        title: '',
        headerTitleAlign: ''
        // headerTitleStyle: 'open-sans',
    }
}

const styles = StyleSheet.create({
    container: {
        padding:15,
        flex: 1,
        justifyContent: 'space-between',

    },
    text:{
        textAlign:'right',
        paddingTop: 15,
        marginBottom:5
    }
});
export default QuestionnaireScreen
