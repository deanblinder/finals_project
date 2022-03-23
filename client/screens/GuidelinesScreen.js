import React from 'react';
import { StyleSheet} from 'react-native';
import{View} from 'react-native-ui-lib'
import {Center, Heading, SectionList,NativeBaseProvider,Text,Button} from "native-base";
import AdministratorScreen from "../screens/AdministratortScreen";

export const Guidelines = () => {
    const data = [
        {
            title: "הנחיות",
            data: [" בניסוי יוצגו על מהסך שני לחצנים. כפתור כחול עם כיתוב ״אני״, וכפתור אדום עם כיתוב ״משתתפ/ת מרוחק/ת״. אתם תחלצו על הכפתור ״אני״, והמשתתפ/ת מרוחק/ת על הכפתור השני.",
                "מטרתכם היא לנסות ללחוץ באותו זמן, ככל האפשר.",
                " בניסוי יהיו שלושה משחקונים בני דקה. בכל שלב תפעו מול משתתפ/ת אחר/ת. בסיום כל משחקון - תתבקשו לענות על שאלון.",
                " אנא הקפידו לסיים את כל המשחקונים. בסיום הניסוי יוצג מסך סיום המשחק.",
                " תודה מראש על השתתפותכם! "],
        },
    ]
    return (
        <SectionList
            px="12"
            mb="4"
            style = {{paddingTop: 50}}
            sections={data}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
                <Text style={{textAlign:'center'}} py="4" minW="64" >
                    {item}
                </Text>
            )}
        />
    )
}
const GuidelinesScreen = (props) => {

    const onStartPress = () => {
        props.navigation.navigate({routeName:'Register'});
    }
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Heading style={{textAlign:'center'}} size={"lg"}>הוראות</Heading>
                <Guidelines/>
                <Button onPress={onStartPress}>המשך</Button>
            </View>
        </NativeBaseProvider>
    );
}
GuidelinesScreen.navigationOptions = navigationData =>{
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
    },
});
export default GuidelinesScreen
