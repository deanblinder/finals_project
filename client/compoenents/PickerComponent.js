import React, {useState} from 'react';
import { StyleSheet} from 'react-native';
import {View,Box, Checkbox, FormControl, HStack, Stack, WarningOutlineIcon,Text} from "native-base";


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
        // <View>
          <Box alignItems="center">
                <Stack style={{
                    flexDirection: "row"
                }}  alignItems="flex-start">
                    <View style={{flexDirection:'row'}}>
                        <View style={{justifyContent:'center',marginRight:5}}>
                            <Text>בכלל לא</Text>
                        </View>
                        <Checkbox isDisabled={rate && rate !== '1'}  onChange={()=>onChangeBox('1')}  value="1" my="1">
                            1
                        </Checkbox>

                    <Checkbox isDisabled={rate && rate !== '2'} onChange={()=>onChangeBox('2')} value="2" my="1">
                        2
                    </Checkbox>

                    <Checkbox isDisabled={rate && rate !== '3'} onChange={()=>onChangeBox('3')} value="3" my="1">
                        3
                    </Checkbox>

                    <Checkbox isDisabled={rate && rate !== '4'} onChange={()=>onChangeBox('4')} value="4" my="1">
                        4
                    </Checkbox>

                    <Checkbox isDisabled={rate && rate !== '5'} onChange={()=>onChangeBox('5')} value="5" my="1">
                        5
                    </Checkbox>
                        <View style={{justifyContent:'center',marginLeft:5}}>
                            <Text>במידה רבה</Text>
                        </View>
                    </View>
                </Stack>
            </Box>
        // </View>
    );
}

const styles = StyleSheet.create({

});
export default PickerComponent
