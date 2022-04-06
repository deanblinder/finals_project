import React from 'react';
import {StyleSheet,Text } from 'react-native';
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
                        alt = {'myImage'}
                    />
                    <View style={styles.TextContainer}>
                            <Text size={"md"} style={styles.Text} >ברוך הבא לניסוי פעולה משותפת מרחוק.</Text>
                            <Text size={"md"} style={styles.Text} >בניסוי תפעלו יחד עם שלושה משתתפים מרוחקים, דרך הטלפון. </Text>
                            <Text size={"md"} style={styles.Text} >אנא קראו את ההוראות בתשומת לב לפני שתתחילו. </Text>
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
    Text:{
      textAlign:'right',
      fontWeight:'bold'
    },
    TextContainer: {
        fontWeight:'bold',
        marginVertical:10,
        textAlign:'center',
        display:'flex',
        justifyContent: 'space-evenly',
        flex:3
    },
});
export default WelcomeScreen
