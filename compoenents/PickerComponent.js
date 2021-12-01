import React, {useState} from 'react';
import { StyleSheet} from 'react-native';
import{View,Text} from 'react-native-ui-lib'
import {Checkbox, FormControl, WarningOutlineIcon} from "native-base";


const GuidelineComponent = (props) => {
    const [groupValue, setGroupValue] = useState(["Phone", "Email"])
    return (
        <View style={styles.Container}>

            <FormControl isInvalid>
                <FormControl.Label
                    _text={{
                        fontSize: "lg",
                        bold: true,
                    }}
                >
                    {props.title}
                </FormControl.Label>

                <Checkbox.Group
                    mt="2"
                    // colorScheme="green"
                    defaultValue={groupValue}
                    accessibilityLabel="choose multiple items"
                    onChange={(values) => {
                        setGroupValue(values || [])
                    }}
                    justify-content="space-between"
                    flexDirection="row"

                >
                    <Text style={{margin: 10}}>בכלל לא</Text>
                    <Checkbox value="1" my="1">
                        1
                    </Checkbox>
                    <Checkbox value="2" my="1">
                        2
                    </Checkbox>
                    <Checkbox value="3" my="1">
                        3
                    </Checkbox>
                    <Checkbox value="4" my="1">
                        4
                    </Checkbox>
                    <Text style={{margin: 10}}>במידה רבה</Text>
                </Checkbox.Group>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    חייב לבחור בדיוק תשובה אחת
                </FormControl.ErrorMessage>
            </FormControl>
        </View>
    );
}

const styles = StyleSheet.create({
    Container:{
        margin:10,
    },
});
export default GuidelineComponent
