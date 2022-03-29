import React, {useState} from 'react';
import { StyleSheet} from 'react-native';
import{View,Text} from 'react-native-ui-lib'
import {Checkbox, FormControl, WarningOutlineIcon} from "native-base";


const PickerComponent = (props) => {

    const [rate, setRate] = useState(undefined)
    const onChangeBox = (val) => {
        if (rate === undefined){
            props.rating(val)
            setRate(val)
        }
        else{
            setRate(undefined)
            props.rating(undefined)
        }
    }
    return (
        // <View style={styles.Container}>
            <View style={{justifyContent:'space-between',flexDirection:"row"}}>
                <Text style={{margin: 10}}>בכלל לא</Text>
                <View>
                    <Checkbox isDisabled={rate && rate !== '1'}  onChange={()=>onChangeBox('1')}  value="1" my="1">
                        1
                    </Checkbox>
                </View>
                <View >
                    <Checkbox isDisabled={rate && rate !== '2'} onChange={()=>onChangeBox('2')} value="2" my="1">
                        2
                    </Checkbox>
                </View>
                <View>
                    <Checkbox isDisabled={rate && rate !== '3'} onChange={()=>onChangeBox('3')} value="3" my="1">
                        3
                    </Checkbox>
                </View>
                <View>
                    <Checkbox isDisabled={rate && rate !== '4'} onChange={()=>onChangeBox('4')} value="4" my="1">
                        4
                    </Checkbox>
                </View>
                <View>
                    <Checkbox isDisabled={rate && rate !== '5'} onChange={()=>onChangeBox('5')} value="5" my="1">
                        5
                    </Checkbox>
                </View>
                <Text style={{margin: 10}}>במידה רבה</Text>
            </View>
        // </View>
    );
}

// const styles = StyleSheet.create({
//
// });
export default PickerComponent
