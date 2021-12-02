import React,{useState} from 'react';
import { StyleSheet} from 'react-native';
import {
    NativeBaseProvider,
    Button,
    View,
     Heading,Text
} from 'native-base';
import GuidelineComponent from "../compoenents/PickerComponent";
import AdministratorScreen from "./AdministratortScreen";
import api from "../api";

const QuestionnaireScreen =(props) => {
    const [qDict, setQDict] = useState({
        questionOne:undefined,
        questionTwo:undefined,
        questionThree:undefined,
        questionFour:undefined
    })

    const sendRating1 = (rating) => {
        const tempQDict = {...qDict}
        tempQDict.questionOne=rating
        setQDict(tempQDict)
    }
    const sendRating2 = (rating) => {
        const tempQDict = {...qDict}
        tempQDict.questionTwo=rating
        setQDict(tempQDict)
    }
    const sendRating3 = (rating) => {
        const tempQDict = {...qDict}
        tempQDict.questionThree=rating
        setQDict(tempQDict)
    }

    const sendRating4 = (rating) => {
        const tempQDict = {...qDict}
        tempQDict.questionFour=rating
        setQDict(tempQDict)
    }
    const onNextPress = () =>{
        //send Qdict
        if (qDict.questionOne && qDict.questionTwo && qDict.questionThree && qDict.questionFour){
            // getUserId from server
            // user id, agent id,
            api.sendQuestionnaireAnswers(qDict) // send user id,
            props.navigation.navigate({routeName:'GoodBye'});
        }
    }
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Heading size={"md"}>אנא מלא את השאלון</Heading>
                <GuidelineComponent title='באיזה מידה 1' rating={sendRating1}/>
                <GuidelineComponent title='באיזה מידה 2' rating={sendRating2}/>
                <GuidelineComponent title='באיזה מידה 3' rating={sendRating3}/>
                <GuidelineComponent title='באיזה מידה 4' rating={sendRating4}/>
            {!(qDict.questionOne && qDict.questionTwo && qDict.questionThree && qDict.questionFour) &&
                    <View>
                        <Text fontSize={'lg'} style={{textAlign:'center',color: 'red'}}>נא הכנס את כל הפרטים</Text>
                    </View>
                }
                <Button onPress={onNextPress}>המשך</Button>
            </View>
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
