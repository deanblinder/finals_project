import React, {useState} from 'react';
import { StyleSheet} from 'react-native';
import {View,Box, Checkbox, Stack, Text} from "native-base";


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
          <Box alignItems="center">
                <Stack style={{
                    flexDirection: "row"
                }}  alignItems="flex-start">
                    <View style={{flexDirection:'row'}}>
                        <View style={{justifyContent:'center',marginRight:5}}>
                            <Text>בכלל לא</Text>
                        </View>
                        <View style={{display:"flex",justifyContent:'center',flexDirection:"row"}}>
                            <Text style={{marginTop:"auto",marginBottom:"auto"}}>{'  '}1</Text>
                                <Checkbox isDisabled={rate && rate !== '1'}  onChange={()=>onChangeBox('1')}  value="1" my="1"/>
                        </View>

                        <View style={{display:"flex",justifyContent:'center',flexDirection:"row"}}>
                            <Text style={{marginTop:"auto",marginBottom:"auto"}}>{'  '}2</Text>
                                <Checkbox isDisabled={rate && rate !== '2'} onChange={()=>onChangeBox('2')} value="2" my="1"/>
                        </View>

                        <View style={{display:"flex",justifyContent:'center',flexDirection:"row"}}>
                            <Text style={{marginTop:"auto",marginBottom:"auto"}}>{'  '}3</Text>
                                <Checkbox isDisabled={rate && rate !== '3'} onChange={()=>onChangeBox('3')} value="3" my="1"/>
                            </View>

                        <View style={{display:"flex",justifyContent:'center',flexDirection:"row"}}>
                            <Text style={{marginTop:"auto",marginBottom:"auto"}}>{'  '}4</Text>
                                <Checkbox isDisabled={rate && rate !== '4'} onChange={()=>onChangeBox('4')} value="4" my="1"/>
                            </View>
                        <View style={{display:"flex",justifyContent:'center',flexDirection:"row"}}>
                            <Text style={{marginTop:"auto",marginBottom:"auto"}}>{'  '}5</Text>
                            <Checkbox isDisabled={rate && rate !== '5'} onChange={()=>onChangeBox('5')} value="5" my="1"/>
                        </View>


                        <View style={{justifyContent:'center',marginLeft:5}}>
                            <Text>מאוד</Text>
                        </View>
                    </View>
                </Stack>
            </Box>
    );
}

const styles = StyleSheet.create({

});
export default PickerComponent
