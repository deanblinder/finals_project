import React from 'react';
import { StyleSheet} from 'react-native';
import {
    NativeBaseProvider,
    Button,
    View,
     Heading
} from 'native-base';
import GuidelineComponent from "../compoenents/PickerComponent";

const QuestionnaireScreen =(props) => {

    const onStartPress = () =>{
        props.navigation.navigate({routeName:'GoodBye'});
    }
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Heading size={"md"}>אנא מלא את השאלון</Heading>
                <GuidelineComponent title='באיזה מידה 1'/>
                <GuidelineComponent title='באיזה מידה 2'/>
                <GuidelineComponent title='באיזה מידה 3'/>
                <Button onPress={onStartPress}>המשך</Button>
            </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        padding:15,
        flex: 1,
        justifyContent: 'space-between'
    },
});
export default QuestionnaireScreen
