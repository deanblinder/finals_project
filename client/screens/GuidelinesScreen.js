import React from 'react';
import { StyleSheet} from 'react-native';
import {View,Center, Heading, SectionList,NativeBaseProvider,Text,Button} from "native-base";
import AdministratorScreen from "../screens/AdministratortScreen";

export const Guidelines = () => {
    const data = [
        {
            title: "הנחיות",
            data: [" בניסוי יוצגו על מהסך שני לחצנים. כפתור כחול עם כיתוב ״אני״, וכפתור כתום עם כיתוב ״משתתפ/ת מרוחק/ת״. אתם תחלצו על הכפתור ״אני״, והמשתתפ/ת מרוחק/ת על הכפתור השני.",
                "מטרתכם היא לנסות ללחוץ באותו זמן, ככל האפשר.",
                " בניסוי יהיו שלושה משחקונים בני דקה. בכל שלב תפעו מול משתתפ/ת אחר/ת. בסיום כל משחקון - תתבקשו לענות על שאלון.",
                " אנא הקפידו לסיים את כל המשחקונים. בסיום הניסוי יוצג מסך סיום המשחק.",
                " תודה מראש על השתתפותכם! "],
        },
    ]
    return (
        // <SectionList
        //     px="12"
        //     mb="4"
        //     style = {{paddingTop: 50}}
        //     sections={data}
        //     keyExtractor={(item, index) => item + index}
        //     renderItem={({ item, index }) => (
        //         <Text style={{textAlign:'center'}} py="4" minW="64" >
        //             {item}
        //         </Text>
        //     )}
        // />
        <View style={styles.container}>
            <View>
                <Text style={{marginTop: 15}}>בניסוי יוצגו על מהסך שני לחצנים. כפתור כחול עם כיתוב ״אני״, וכפתור אדום עם כיתוב ״משתתפ/ת מרוחק/ת״. אתם תחלצו על הכפתור ״אני״, והמשתתפ/ת מרוחק/ת על הכפתור השני.</Text>
                <Text style={{fontWeight:'bold', marginTop:15}}>מטרתכם היא לנסות ללחוץ באותו זמן, ככל האפשר.</Text>
                <Text style={{marginTop: 15}}>בניסוי יהיו שלושה משחקונים בני דקה. בכל שלב תפעו מול משתתפ/ת אחר/ת. בסיום כל משחקון - תתבקשו לענות על שאלון.</Text>
                <Text style={{marginTop: 15}}> אנא הקפידו לסיים את כל המשחקונים. בסיום הניסוי יוצג מסך סיום המשחק.</Text>
                <Text style={{marginTop: 15}}> תודה מראש על השתתפותכם! </Text>
            </View>
        </View>
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
                <Button onPress={onStartPress}>המשך לניסוי</Button>
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
        textAlign:'center',
        // justifyContent:'space-around',
        // marginBottom:'70%'
    },
});
export default GuidelinesScreen
