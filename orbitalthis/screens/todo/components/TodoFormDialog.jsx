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
    const [text, setText] = useState('');
    const theme = useTheme();

    const onSubmit = () => {
        onPress?.(text);
    }

    useEffect(() => {
        setText('');
    }, [visible]);

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss}>
                <Dialog.Title>Create a new to-do.</Dialog.Title>
                <Dialog.Content>
                    <View style={styles.container}>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                value={text}
                                onChangeText={setText}
                                style={styles.textInput}
                                placeholder="Enter your to-do"
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
                        disabled={text.trim() === ''}
                        mode="contained"
                        style={[
                            styles.button,
                            text.trim() !== '' && {backgroundColor: '#F5DEB3'},
                            text.trim() !== '' && {color: 'black'},
                        ]}
                        labelStyle={[
                            styles.buttonLabel,
                            text.trim() !== '' && {color: 'black'},
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
