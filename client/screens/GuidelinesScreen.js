import React from 'react';
import { StyleSheet} from 'react-native';
import{View} from 'react-native-ui-lib'
import {Center, Heading, SectionList,NativeBaseProvider,Text,Button} from "native-base";
import AdministratorScreen from "./AdministratortScreen";

export const Guidelines = () => {
    const data = [
        {
            title: "הנחיות",
            data: ["1.נא לבדוק....", "2.נא לבדוק....", "3.נא לבדוק....", "4.נא לבדוק....", "5.נא לבדוק...."],
        },
    ]
    return (
        <SectionList
            px="12"
            mb="4"
            sections={data}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
                <Text style={{textAlign:'right'}} py="4" minW="64">
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
