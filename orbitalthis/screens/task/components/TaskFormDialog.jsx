import {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput, Dialog, Portal, useTheme} from 'react-native-paper';

const TaskFormDialog = (
    {
        visible = false,
        onDismiss,
        onPress,
        loading = false,
    }
) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const theme = useTheme();
    const [disabled, setDisabled] = useState(true);

    const onSubmit = () => {
        onPress?.(name.trim(), quantity.trim());
    }

    useEffect(() => {
        setName('');
        setQuantity('');
    }, [visible]);

    useEffect(() => {
        setDisabled(!(name.trim() !== '' && quantity !== '' && parseInt(quantity) > 0));
    }, [name, quantity]);

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss}>
                <Dialog.Title>Add a new task.</Dialog.Title>
                <Dialog.Content>
                    <View style={styles.container}>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                mode="outlined"
                                label="Task Name"
                                value={name}
                                onChangeText={setName}
                                style={styles.textInput}
                                placeholder="Enter a task name"
                                placeholderTextColor={theme.colors.secondary}
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                textColor={theme.colors.primary}
                                selectionColor={theme.colors.primary}
                                outlineStyle={styles.textInputOutlineStyle}
                            />
                        </View>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                mode="outlined"
                                label="Task Total Quantity"
                                value={quantity}
                                onChangeText={value => {
                                    if (value === '' || parseInt(value) >= 0) {
                                        setQuantity(value);
                                    }
                                }}
                                style={styles.textInput}
                                placeholder="Enter a task total quantity"
                                placeholderTextColor={theme.colors.secondary}
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                                textColor={theme.colors.primary}
                                selectionColor={theme.colors.primary}
                                outlineStyle={styles.textInputOutlineStyle}
                                keyboardType="numeric"
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
        height: 130,
    },
    textInputContainer: {
        flex: 1,
    },
    textInput: {
        height: 46,
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: '#F5DEB3',
    },
    textInputOutlineStyle: {
        borderWidth: 0,
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

export default TaskFormDialog;
