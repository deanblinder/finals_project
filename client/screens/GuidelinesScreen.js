import React from 'react';
import { StyleSheet} from 'react-native';
import {View,Center, Heading, SectionList,NativeBaseProvider,Text,Button} from "native-base";
import AdministratorScreen from "../screens/AdministratortScreen";

export const Guidelines = () => {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.Text}>בניסוי יוצגו על מהסך שני לחצנים. כפתור כחול עם כיתוב ״אני״, וכפתור אדום עם כיתוב ״משתתפ/ת מרוחק/ת״. אתם תחלצו על הכפתור ״אני״, והמשתתפ/ת הרחוק/ה ת/ילחץ על הכפתור השני.</Text>
                <Text style={{fontWeight:'bold',...styles.Text}}>מטרתכם היא לנסות ללחוץ על הלחצנים באותו זמן, ככל האפשר.</Text>
                <Text style={styles.Text}>בניסוי יהיו שלושה משחקונים בני דקה. בכל אחד מהמשחקונים תפעלו מול משתתפ/ת אחר/ת. בסיום כל משחקון - תתבקשו לענות על שאלון.</Text>
                <Text style={styles.Text}> אנא הקפידו לסיים את כל שלושת המשחקונים והשאלונים.</Text>
                <Text style={styles.Text}> תודה מראש על השתתפותכם! </Text>
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
                <Heading style={{textAlign:'center'}} size={"lg"}>הוראות לניסוי</Heading>
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
    }
}

const styles = StyleSheet.create({
    container: {
        padding:15,
        flex: 1,
        textAlign:'center',
    },
    Text:{
        textAlign:'right',
        marginTop: 15,
        fontSize:15
    }
});
export default GuidelinesScreen
