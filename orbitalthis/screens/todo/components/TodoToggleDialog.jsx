import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Dialog, Portal, Text} from 'react-native-paper';

const TodoToggleDialog = (
    {
        visible = false,
        onDismiss,
        onPress,
        loading = false
    }
) => (
    <Portal>
        <Dialog visible={visible} onDismiss={onDismiss}>
            <Dialog.Content>
                <Text variant="bodyMedium">Are you sure to completed this to-do?</Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button
                    onPress={onDismiss}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                    disabled={loading}
                >Cancel</Button>
                <Button
                    onPress={onPress}
                    mode="contained"
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                    loading={loading}
                >Confirm</Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>
);

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
    },
    buttonLabel: {
        paddingHorizontal: 8
    }
});

export default TodoToggleDialog;
