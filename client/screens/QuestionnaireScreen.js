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

const QuestionnaireScreen =(props) => {
    const [textAreaValue, setTextAreaValue] = useState('')
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
        console.log(tempQDict)

        tempQDict.questionOne=rating
         setQDict(tempQDict)
    }
    const sendRating2 = (rating) => {
        const tempQDict = qDict
        console.log(tempQDict)


        tempQDict.questionTwo=rating
        setQDict(tempQDict)
    }
    const sendRating3 = (rating) => {
        const tempQDict = qDict
        console.log(tempQDict)
        tempQDict.questionThree=rating
        setQDict(tempQDict)
    }
    const sendRating4 = (rating) => {
        const tempQDict = qDict
        console.log(tempQDict)
        tempQDict.questionFour=rating
        setQDict(tempQDict)
    }
    const sendRating5 = (rating) => {
        const tempQDict = qDict
        console.log(tempQDict)
        tempQDict.questionFive=rating
        setQDict(tempQDict)
    }
    const sendRating6 = (rating) => {
        const tempQDict = qDict
        console.log(tempQDict)
        tempQDict.questionSix=rating
        setQDict(tempQDict)
    }
    const sendText7 = (text) => {
        setTextAreaValue(text)
        const tempQDict = qDict
        console.log(tempQDict)
        tempQDict.questionSeven=textAreaValue
        setQDict(tempQDict)
    }

    const onNextPress = () =>{
        console.log(qDict)
        //send Qdict
        if (qDict.questionOne && qDict.questionTwo && qDict.questionThree && qDict.questionFour && qDict.questionFive && qDict.questionSix && qDict.questionSeven){
            const deviceUUID = uuid.v4()
            // api.sendQuestionnaireAnswers(qDict,deviceUUID) // send user id,
            props.navigation.navigate({routeName:'GoodBye'});
        }
    }
    return (
        <NativeBaseProvider>
            <ScrollView>
            <View style={styles.container}>
                <Heading size={"md"}>אנא מלא את השאלון</Heading>
                <Text style={{ paddingTop: 20}}> 1. באיזה מידה התרכזת במשימה?</Text>
                <PickerComponent title='באיזה מידה התרכזת במשימה? 1' rating={sendRating1}/>

                <Text style={{ paddingTop: 15}}> 2. באיזה מידה  הרגשת שהלחיצות שלך תואמות את אלה של המשתתפ/ת 1? </Text>
                <PickerComponent title='באיזה מידה  הרגשת שהלחיצות שלך תואמות את אלה של המשתתפ/ת 1? 2' rating={sendRating2}/>

                <Text style={{ paddingTop: 15}}>3. האם חשת ״תחושת ביחד״ כשלחצת עם המשתתפ/ת השני/יה? </Text>
                <PickerComponent title='האם חשת ״תחושת ביחד״ כשלחצת עם המשתתפ/ת השני/יה? 3' rating={sendRating3}/>

                <Text style={{ paddingTop: 15}}>4. באיזו מידה הרגשת שאת/ה והמשתתפ/ת השני/ה שיתפתם פעולה?</Text>
                <PickerComponent title='באיזו מידה הרגשת שאת/ה והמשתתפ/ת השני/ה שיתפתם פעולה? 4' rating={sendRating4}/>

                <Text style={{ paddingTop: 15}}>5. כמה קירבה את/ה מרגיש/ה כרגע למשתתפ/ת המרוחק/ת בניסוי:</Text>
                <PickerComponent title='כמה קירבה את/ה מרגיש/ה כרגע למשתתפ/ת המרוחק/ת בניסוי: 5' rating={sendRating5}/>

                <Text style={{ paddingTop: 15}}>6. באיזו מידה תהי/ה פתוח לשיתוף פעולה נוסף עם המשתתפ/ת המרוחק/ת הזה בניסוי המשך? </Text>
                <PickerComponent title='באיזו מידה תהי/ה פתוח לשיתוף פעולה נוסף עם המשתתפ/ת המרוחק/ת הזה בניסוי המשך? 6' rating={sendRating6}/>

                <Text  style={{paddingTop:15}} >7. תאר/י בכמה מילים את חוווית המשחק מול משתתפ/ת 1  </Text>
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
        justifyContent: 'space-between'
    },
});
export default QuestionnaireScreen
