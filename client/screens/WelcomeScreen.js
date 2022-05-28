import React from 'react';
import {Platform, StyleSheet} from 'react-native';
const cardImage = require('../assets/photos/letsStart.jpg')
import {
    NativeBaseProvider,
    Text,
    Heading,
    Image,
    View,
    Button,
} from 'native-base';

const WelcomeScreen = (props) => {

    const onStartPress=()=>{
        props.navigation.push('Guidelines');
    }
    const onStartAdministrator =()=>{
        props.navigation.push('Administrator');
    }
    return (
        <NativeBaseProvider>
            <View style={styles.Container} >
                    <View style={styles.TextContainer}>
                            <Text style={{...styles.Text, textAlign: 'right'}} >ברוכים הבאים לניסוי פעולה משותפת מרחוק.</Text>
                            <Text style={{...styles.Text, textAlign: 'right'}} >בניסוי תפעלו יחד עם משתתפים מרוחקים, דרך הטלפון. </Text>
                            <Text style={styles.Text} >אנא קראו את ההוראות בתשומת לב לפני שתתחילו. </Text>
                    </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Button size={"lg"} style={{width:'45%',textAlign: 'right'}} onPress={onStartAdministrator}>כניסת מנהל מערכת</Button>
                    <Button size={"lg"} style={{width:'45%',textAlign: 'right'}} onPress={onStartPress}>המשך להוראות</Button>
                </View>

            </View>
        </NativeBaseProvider>
    );
}
WelcomeScreen.navigationOptions = navigationData =>{
    return{
        title: 'ברוכים הבאים',
        headerTitleAlign: 'center',
    }
}



const styles = StyleSheet.create({
    Container:{
        padding:15,
        justifyContent: 'space-between',
        flex:3
    },
    ImageContainer: {
        width:'100%',
    },
    Text:{
      textAlign:'right',
      fontWeight:'bold',
        fontSize: 20,
        marginBottom: 20
    },
    TextContainer: {
        // fontWeight:'bold',
        // marginVertical:10,
        // textAlign:'right',
        // display:'flex',
        justifyContent: 'center',
        textAlign: 'right',
        flex:1,
        // direction: "rtl"
    },
});
export default WelcomeScreen
