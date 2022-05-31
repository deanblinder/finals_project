import React, {useState} from 'react';
import { StyleSheet} from 'react-native';
import {View, Box, Checkbox, Stack, Text, Radio} from "native-base";


const PickerComponent = (props) => {

    const [rate, setRate] = useState(undefined)
    const onChangeBox = (val) => {
        // if (rate === undefined){
            props.rating(val)
            setRate(val)
        // }
        // else{
        //     setRate(undefined)
        //     props.rating(undefined)
        // }
    }
    return (
          <View alignItems="center">
                {/*<Stack style={{*/}
                {/*    flexDirection: "row"*/}
                {/*}}  alignItems="flex-start">*/}
                {/*    <View style={{flexDirection:'row'}}>*/}
                {/*        <View style={{justifyContent:'center',marginRight:5}}>*/}
                {/*            <Text>בכלל לא</Text>*/}
                {/*        </View>*/}
                {/*        <View style={{display:"flex",justifyContent:'center',flexDirection:"row"}}>*/}
                {/*            <Text style={{marginTop:"auto",marginBottom:"auto"}}>{'  '}1</Text>*/}
                {/*                <Checkbox isDisabled={rate && rate !== '1'}  onChange={()=>onChangeBox('1')}  value="1" my="1"/>*/}
                {/*        </View>*/}

                {/*        <View style={{display:"flex",justifyContent:'center',flexDirection:"row"}}>*/}
                {/*            <Text style={{marginTop:"auto",marginBottom:"auto"}}>{'  '}2</Text>*/}
                {/*                <Checkbox isDisabled={rate && rate !== '2'} onChange={()=>onChangeBox('2')} value="2" my="1"/>*/}
                {/*        </View>*/}

                {/*        <View style={{display:"flex",justifyContent:'center',flexDirection:"row"}}>*/}
                {/*            <Text style={{marginTop:"auto",marginBottom:"auto"}}>{'  '}3</Text>*/}
                {/*                <Checkbox isDisabled={rate && rate !== '3'} onChange={()=>onChangeBox('3')} value="3" my="1"/>*/}
                {/*            </View>*/}

                {/*        <View style={{display:"flex",justifyContent:'center',flexDirection:"row"}}>*/}
                {/*            <Text style={{marginTop:"auto",marginBottom:"auto"}}>{'  '}4</Text>*/}
                {/*                <Checkbox isDisabled={rate && rate !== '4'} onChange={()=>onChangeBox('4')} value="4" my="1"/>*/}
                {/*            </View>*/}
                {/*        <View style={{display:"flex",justifyContent:'center',flexDirection:"row"}}>*/}
                {/*            <Text style={{marginTop:"auto",marginBottom:"auto"}}>{'  '}5</Text>*/}
                {/*            <Checkbox isDisabled={rate && rate !== '5'} onChange={()=>onChangeBox('5')} value="5" my="1"/>*/}
                {/*        </View>*/}


                {/*        <View style={{justifyContent:'center',marginLeft:5}}>*/}
                {/*            <Text>מאוד</Text>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</Stack>*/}
              <View>

              <Radio.Group  style={{}} name="exampleGroup" accessibilityLabel="pick a size" onChange={nextValue => {onChangeBox(nextValue)}}>
                  <Stack direction={{
                      base: "row",
                      md: "row"
                  }} alignItems={{
                      base: "flex-start",
                      md: "center"
                  }} space={1} w="75%">

                      <Text my={2}  style={{marginRight:'7%',fontWeight:'bold',fontSize:15}}>מאוד</Text>
                      <Radio value="5" colorScheme="red" size="sm" my={1}>
                          5
                      </Radio>
                      <Radio value="4" colorScheme="red" size="sm" my={1}>
                          4
                      </Radio>
                      <Radio value="3" colorScheme="red" size="sm" my={1}>
                          3
                      </Radio>
                      <Radio value="2" colorScheme="red" size="sm" my={1}>
                          2
                      </Radio>
                      <Radio value="1" colorScheme="red" size="sm" my={1}>
                          1
                      </Radio>
                          <Text my={2} style={{marginLeft:'7%',fontWeight:'bold',fontSize:15}}>
                              בכלל לא
                          </Text>
                  </Stack>

              </Radio.Group>
          </View>
          </View>
    );
}

const styles = StyleSheet.create({

});
export default PickerComponent
