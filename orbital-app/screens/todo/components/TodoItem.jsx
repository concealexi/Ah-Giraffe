import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Checkbox, Dialog, Button} from 'react-native-paper';

const TodoItem = ({todo, toggleTodo}) => (
    <View style={styles.container}>
        <Checkbox.Android
            style={styles.checkbox}
            status={todo.completed ? 'checked' : 'unchecked'}
            onPress={() => toggleTodo(todo)}
            color='#F5DEB3'
            disabled={todo.completed}
        />
        <Text style={styles.todoText}>{todo.title}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        paddingRight: 8,
    },
    checkbox: {
        marginRight: 8,
        color: '#F5DEB3'
    },
    todoText: {
        flex: 1,
    },
});

export default TodoItem;
