import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
    Input,
    NativeBaseProvider,
    FormControl,
    WarningOutlineIcon,
    Stack,
    Box,
    Heading,
    Button,
    Select, CheckIcon
} from 'native-base';

export const Form = () => {
    return (
        <Box
            w={{
                base: "90%",
                md: "25%",
            }}
        >
            <FormControl isRequired>
                <Stack mx="4">
                    <FormControl.Label >מייל</FormControl.Label>
                    <Input style={{textAlign:'right'}} type="email" defaultValue="" placeholder="מייל" />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Atleast 6 characters are required.
                    </FormControl.ErrorMessage>

                    <FormControl.Label>גיל</FormControl.Label>
                    <Input style={{textAlign:'right'}} type="number" defaultValue="" placeholder="גיל" />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Atleast 6 characters are required.
                    </FormControl.ErrorMessage>
                    <FormControl isRequired isInvalid={false}>
                        <FormControl.Label>בחר מגדר</FormControl.Label>
                        <Select style={{textAlign:'right'}}
                            minWidth="200"
                            accessibilityLabel="Choose Service"
                            placeholder="בחר מגדר"
                            _selectedItem={{
                                bg: "teal.600",
                                startIcon: <CheckIcon size={5} />,
                            }}
                            mt="1"
                        >
                            <Select.Item label="זכר" value="male" />
                            <Select.Item label="נקבה" value="Female" />
                            <Select.Item label="אחר" value="other" />
                        </Select>
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Please make a selection!
                        </FormControl.ErrorMessage>
                    </FormControl>
                </Stack>
            </FormControl>
        </Box>
    )
}

const RegisterScreen = (props) => {
   const onStartPress = () => {
        props.navigation.navigate({routeName:'FindPlayer'});
    }
    return (
        <NativeBaseProvider>
        <View style={styles.container}>
                <Heading size={"lg"}>בבקשה מלא את הפרטים שלך</Heading>
                <Form/>
            <Button onPress={onStartPress}>המשך</Button>
        </View>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        padding:15,
        flex: 1,
        justifyContent: 'space-between'
    },
});
export default RegisterScreen
