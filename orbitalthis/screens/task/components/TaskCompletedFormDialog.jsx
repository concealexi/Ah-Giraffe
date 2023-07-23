import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput, Dialog, Portal, useTheme} from 'react-native-paper';

const TodoFormDialog = (
    {
        visible = false,
        onDismiss,
        onPress,
        loading = false,
    }
) => {
    const [quantity, setQuantity] = useState('');
    const theme = useTheme();
    const [disabled, setDisabled] = useState(true);

    const onSubmit = () => {
        onPress?.(quantity);
    }

    useEffect(() => {
        setQuantity('');
    }, [visible]);

    useEffect(() => {
        setDisabled(!(quantity !== '' && quantity > 0));
    }, [quantity]);

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss}>
                <Dialog.Title>Today's completed quantity.</Dialog.Title>
                <Dialog.Content>
                    <View style={styles.container}>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                value={quantity}
                                onChangeText={value => {
                                    if (value === '' || parseInt(value) >= 0) {
                                        setQuantity(value);
                                    }
                                }}
                                style={styles.textInput}
                                placeholder="Enter your completed quantity"
                                placeholderTextColor={theme.colors.secondary}
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                textColor={theme.colors.primary}
                                selectionColor={theme.colors.primary}
                            />
                        </View>
                    </View>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button
                        onPress={onDismiss}
                        style={styles.button}
                        labelStyle={styles.buttonLabel}
                        disabled={loading}
                    >Cancel</Button>
                    <Button
                        onPress={onSubmit}
                        disabled={disabled}
                        mode="contained"
                        style={[
                            styles.button,
                            !disabled && {backgroundColor: '#F5DEB3'},
                            !disabled && {color: 'black'},
                        ]}
                        labelStyle={[
                            styles.buttonLabel,
                            !disabled && {color: 'black'},
                        ]}
                        loading={loading}
                    >Confirm</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 46,
    },
    textInputContainer: {
        flex: 1,
    },
    textInput: {
        flex: 1,
        height: 46,
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: '#F5DEB3',
    },
    submitButtonContainer: {
        marginLeft: 'auto',
    },
    button: {
        borderRadius: 4,
    },
    buttonLabel: {
        paddingHorizontal: 8
    }
});


export default TodoFormDialog;
