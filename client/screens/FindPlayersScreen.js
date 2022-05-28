import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
    NativeBaseProvider,
    Heading,
    HStack,
    Spinner,
    View,
    Button
} from 'native-base';
import {store} from "../state/state";

const FindPlayersScreen = (props) => {

    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, (Math.floor(Math.random() * 5)+1)*1000);
    },[]);


    const press = () => {
        if (store.getExperimentType() === 'followerLeader'){
            props.navigation.push('LeaderFollowerPlay')
        }
        else {
            props.navigation.navigate({routeName:'LatencyPlay'})
        }
    }
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <View style={{alignItems: 'center',justifyContent:'center',flex:1}}>
                    <HStack space={2} alignItems="center">
                        {isLoading ? <View>
                            <Spinner size="lg" accessibilityLabel="Loading posts" />
                                <Heading color="primary.500" fontSize="md">
                                    מחפש משתתפ/ת מרוחק/ת....
                                </Heading>
                        </View>: <View>
                            <Heading color="primary.500" fontSize="4xl" style={{textAlign:'right'}}>
                            נמצא משתתף מרוחק
                        </Heading></View>}
                    </HStack>
                </View>

                <View>
                    {!isLoading ?
                            <View>
                                <Button onPress={press}>התחל ניסוי</Button>
                            </View>
                        : undefined}
                </View>
            </View>
        </NativeBaseProvider>
    );
}

FindPlayersScreen.navigationOptions = navigationData =>{
    return{
        title: 'חיפוש משתתף',
        headerTitleAlign: 'center'
    }
}

const styles = StyleSheet.create({
    container: {
        padding:15,
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'space-between',
        // justifyItems:'space-between'
    },
});

export default FindPlayersScreen
