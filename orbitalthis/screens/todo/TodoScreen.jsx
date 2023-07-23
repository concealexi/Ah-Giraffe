import {ImageBackground, SectionList, StyleSheet, View, StatusBar, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useState, useContext} from 'react';
import TodoItem from "./components/TodoItem";
import TodoFormDialog from "./components/TodoFormDialog";
import TodoToggleDialog from "./components/TodoToggleDialog";
import FAB from "../../components/FAB";
import AppScreen from "../AppScreen";
import DataContext from "../../DataContext";
import Bone from "../../components/Bone";
import {Swipeable} from "react-native-gesture-handler";
import {addTodo, deleteTodo, getTodos, updateTodo} from "../../servers/todos";

const boneCount = 1;

const transformData = (data) => {
    return data.reduce((result, item) => {
        if (item.completed) {
            const finishedGroup = result.find(group => group.title === 'Finished');
            if (finishedGroup) {
                finishedGroup.data.push(item);
            } else {
                result.push({title: 'Finished', data: [item]});
            }
        } else {
            const defaultGroup = result.find(group => group.title === 'Todo');
            if (defaultGroup) {
                defaultGroup.data.push(item);
            } else {
                result.unshift({title: 'Todo', data: [item]});
            }
        }
        return result;
    }, []);
};


const TodoScreen = () => {
    const [sections, setSections] = useState([]);
    const [visible, setVisible] = React.useState(false);
    const [toggleLoading, setToggleLoading] = React.useState(false);
    const [addTodoLoading, setAddTodoLoading] = React.useState(false);
    const [deleteTodoLoading, setDeleteTodoLoading] = React.useState(false);
    const [visibleTodoFormDialog, setVisibleTodoFormDialog] = React.useState(false);
    const [curItem, setCurItem] = useState();
    const [todos, setTodos] = useState([]);
    const {increaseBone, userInfo} = useContext(DataContext);

    useEffect(() => {
        (async () => {
            await fetchTodos();
        })();
    }, []);

    useEffect(() => {
        setSections(transformData(todos));
    }, [todos]);

    const fetchTodos = async () => {
        const values = await getTodos(userInfo.id);
        setTodos(values);
    }

    const handleAddTodo = async (title) => {
        setAddTodoLoading(true);
        try{
            const result = await addTodo(title, userInfo.id);
            if(result) {
                await fetchTodos();
            }
        } finally {
            setAddTodoLoading(false);
            setVisibleTodoFormDialog(false);
        }
    };

    const toggleTodo = async () => {
        setToggleLoading(true);
        try {
            const result = await updateTodo(curItem);
            if(result) {
                await increaseBone(boneCount);
                await fetchTodos();
            }
        } finally {
            setToggleLoading(false);
            hideDialog();
        }
    };

    const handleDeleteTodo = async (id) => {
        const result = await deleteTodo(id);
        if(result) {
            await fetchTodos();
        }
    }

    const hideDialog = () => {
        setVisible(false);
        setCurItem(undefined);
    };

    const renderRightActions = todoId => (
        <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteTodo(todoId)}
        >
            <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
    );

    return (
        <>
            <StatusBar
                backgroundColor={'#FFFFFF'}
                barStyle="dark-content"
            />
            <AppScreen style={{backgroundColor: '#FFFFFF'}}>
                <View style={styles.container}>
                    <ImageBackground
                        source={require('../../assets/images/todo_background.png')}
                        style={styles.backgroundImage}
                        resizeMode='cover'
                    >
                        <Bone/>
                        <SectionList
                            style={styles.sectionContainer}
                            sections={sections}
                            stickySectionHeadersEnabled={false}
                            renderItem={({item}) => (
                                <View>
                                    <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                                        <TodoItem key={item.id} todo={item} toggleTodo={value => {
                                            setCurItem(value);
                                            setVisible(true);
                                        }}/>
                                    </Swipeable>
                                </View>
                            )}
                            renderSectionHeader={({section}) => (
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.sectionTitle}>{section.title}</Text>
                                </View>
                            )}
                        />
                    </ImageBackground>
                </View>

                <TodoToggleDialog
                    visible={visible}
                    onDismiss={hideDialog}
                    onPress={() => {
                        toggleTodo();
                    }}
                    loading={toggleLoading}
                />

                <TodoFormDialog
                    visible={visibleTodoFormDialog}
                    onDismiss={() => setVisibleTodoFormDialog(false)}
                    onPress={text => {
                        handleAddTodo(text);
                    }}
                    loading={addTodoLoading}
                />

                <FAB
                    onPress={() => {
                        setVisibleTodoFormDialog(true);
                    }}
                />
            </AppScreen>
        </>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey', //color of margin!still need to work on, it has no effect
        flexDirection: 'column',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        padding: 16,
        paddingTop: 0
    },
    sectionContainer: {
        marginBottom: 16
    },
    sectionHeader: {
        paddingVertical: 10,
    },
    sectionTitle: {
        fontWeight: 700
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: '100%',
        marginLeft: 10
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16
    },
});

export default TodoScreen;
