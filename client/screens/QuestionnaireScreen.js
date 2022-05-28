import React,{useState} from 'react';
import {Keyboard, ScrollView, StyleSheet} from 'react-native';
import {Text} from 'react-native-ui-lib'
import {
    NativeBaseProvider,
    Button,
    View,
    TextArea
} from 'native-base';
import PickerComponent from "../compoenents/PickerComponent";
import api from "../api";
import {store} from '../state/state'

const QuestionnaireScreen =(props) => {
    const [textAreaValue, setTextAreaValue] = useState('')
    let [agent_type,setAgent_type] = useState('')
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
    const updateAgentType = () => {
        if (store.getExperimentType() === 'followerLeader'){
            // setPercentForGame()
            //old one -  setAgent_type("LeadFollowAgent_" + percent)
            // setAgent_type("LeadFollowAgent_" + store.getWeight())
            agent_type = "LeadFollowAgent_weight_" + store.getWeight()
            setAgent_type(agent_type)
            console.log("agent_type:", agent_type)
        }
        else{
            console.log("in else")
            agent_type = "LatencyAgent_Gitter_"+store.getGitter()+"_Latency_"+store.getLatency()
            setAgent_type(agent_type)
        }
    }
    const DismissKeyboard = ({children})=>(
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );
    const onNextPress = () =>{
        // console.log(qDict)
        //send Qdict

        if (qDict.questionOne && qDict.questionTwo && qDict.questionThree && qDict.questionFour && qDict.questionFive && qDict.questionSix && qDict.questionSeven){
            updateAgentType()
            // console.log("here")
            api.sendAnswers(store.getModel(),agent_type,qDict,store.getGameNumber())
            // api.sendQuestionnaireAnswers(qDict,agent_type,deviceUUID) // send user id,
            console.log("count before is now: ", store.getGameNumber())
            if(store.getGameNumber() < 3){
                props.navigation.navigate({routeName:'FindPlayer'});
            }
            else {
                props.navigation.navigate({routeName: 'GoodBye'});
            }
        }
    }
    return (
        <NativeBaseProvider>
            <ScrollView>
            <View style={styles.container} aria-label="Close" accessible={true}>
                <Text center text60>הסתיים המשחקון</Text>
                <Text center text60>{ 'להלן מספר שאלות לגבי משחקון ' + (store.getGameNumber()) + ' עם משתתפ/ת ' + + (store.getGameNumber())}</Text>
                <Text style={{paddingTop: 20,...styles.text}}> 1. באיזה מידה התרכזת במשימה?</Text>
                <PickerComponent title='באיזה מידה התרכזת במשימה? 1' rating={sendRating1}/>

                <Text style={styles.text}> 2. באיזה מידה  הרגשת שהלחיצות שלך תואמות את אלה של משתתפ/ת {store.getGameNumber()}? </Text>
                <PickerComponent title='באיזה מידה  הרגשת שהלחיצות שלך תואמות את אלה של המשתתפ/ת 1? 2' rating={sendRating2}/>

                <Text style={styles.text}>3. האם חשת ״תחושת ביחד״ כשלחצת עם משתתפ/ת {store.getGameNumber()}? </Text>
                <PickerComponent title='האם חשת ״תחושת ביחד״ כשלחצת עם המשתתפ/ת השני/יה? 3' rating={sendRating3}/>

                <Text style={styles.text}>4. באיזו מידה הרגשת שאת/ה ומשתתפ/ת {store.getGameNumber()}  שיתפתם פעולה?</Text>
                <PickerComponent title='באיזו מידה הרגשת שאת/ה והמשתתפ/ת השני/ה שיתפתם פעולה? 4' rating={sendRating4}/>

                <Text style={styles.text}>5. כמה קירבה את/ה מרגיש/ה כרגע למשתתפ/ת {store.getGameNumber()}  בניסוי:</Text>
                <PickerComponent title='כמה קירבה את/ה מרגיש/ה כרגע למשתתפ/ת המרוחק/ת בניסוי: 5' rating={sendRating5}/>

                <Text style={styles.text}>6. באיזו מידה תהי/ה פתוח לשיתוף פעולה נוסף עם משתתפ/ת {store.getGameNumber()} בניסוי המשך? </Text>
                <PickerComponent title='באיזו מידה תהי/ה פתוח לשיתוף פעולה נוסף עם המשתתפ/ת המרוחק/ת הזה בניסוי המשך? 6' rating={sendRating6}/>

                <Text  style={styles.text} >7. תאר/י בכמה מילים את חוווית המשחק מול משתתפ/ת {store.getGameNumber()}  </Text>
                <TextArea
                    value={textAreaValue}
                    onChangeText={(text)=>{sendText7(text)}}
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
                {
                    store.getGameNumber()===3?
                        <Button aria-label="Close" onPress={onNextPress}>סיום ומעבר למשוב</Button>:
                        <Button aria-label="Close" onPress={onNextPress}>המשך למשחקון הבא</Button>

                }
            </View>
            </ScrollView>
        </NativeBaseProvider>
    );
}
QuestionnaireScreen.navigationOptions = navigationData =>{
    return{
        title:'שאלון',
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
