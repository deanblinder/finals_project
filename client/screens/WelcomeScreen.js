import React from 'react';
import {StyleSheet } from 'react-native';
const cardImage = require('../assets/photos/letsStart.jpg')
import {
    NativeBaseProvider,
    Heading,
    Image,
    View,
    Button,
} from 'native-base';

const WelcomeScreen = (props) => {

    const onStartPress=()=>{
        props.navigation.navigate({routeName:'Guidelines'});
    }
    const onStartAdministrator =()=>{
        props.navigation.navigate({routeName:'Administrator'});
    }
    return (
        <NativeBaseProvider>
            <View style={styles.Container} >
                    <Image
                        source={cardImage}
                        width={400}
                        height={400}
                    />
                    <View style={styles.TextContainer}>
                            <Heading size={"md"} style={{textAlign: 'right'}} >ברוך הבא לניסוי פעולה משותפת מרחוק.</Heading>
                            <Heading size={"md"} style={{textAlign: 'right'}} >בניסוי תפעלו יחד עם שלושה משתתפים מרוחקים, דרך הטלפון. </Heading>
                            <Heading size={"md"} style={{textAlign: 'right'}} >אנא קראו את ההוראות בתשומת לב לפני שתתחילו. </Heading>
                    </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <Button size={"lg"} style={{width:'45%',textAlign: 'right'}} onPress={onStartAdministrator}>כניסת מנהל מערכת</Button>
                    <Button size={"lg"} style={{width:'45%',textAlign: 'right'}} onPress={onStartPress}>כניסת משתמש</Button>
                </View>

            </View>
        </NativeBaseProvider>
    );
}
WelcomeScreen.navigationOptions = navigationData =>{
    return{
        title: 'ברוכים הבאים',
        headerTitleAlign: 'center'
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
    TextContainer: {
        textAlign:'center',
        display:'flex',
        justifyContent: 'space-evenly',
        flex:2
    },
});
export default WelcomeScreen
