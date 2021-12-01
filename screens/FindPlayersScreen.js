import React, {useEffect, useState} from 'react';
import { StyleSheet} from 'react-native';
import {
    NativeBaseProvider,
    Heading,
    HStack,
    Spinner,
    View,
    Button
} from 'native-base';

const FindPlayersScreen = (props) => {

    const [isLoading,setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000);
    });
    const press = () =>{
        props.navigation.navigate({routeName:'Play'})
    }
    return (
        <NativeBaseProvider>
        <View style={styles.container}>
            <View style={{alignItems: 'center',justifyContent:'center',flex:1}}>
                <HStack space={2} alignItems="center">
                    {isLoading ? <View>
                        <Spinner size="lg" accessibilityLabel="Loading posts" />
                            <Heading color="primary.500" fontSize="md">
                                מחפש שחקן
                            </Heading>
                    </View>: <View>
                        <Heading color="primary.500" fontSize="4xl">
                        מצא!
                    </Heading></View>}
                </HStack>
            </View>
            <View>
                {!isLoading ? <Button onPress={press}>שחק</Button> : null}
            </View>
        </View>
        </NativeBaseProvider>
    );
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
