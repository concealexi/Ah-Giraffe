import {ImageBackground, SectionList, StyleSheet, View, StatusBar} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useState, useContext} from 'react';
import TodoItem from "./components/TodoItem";
import TodoFormDialog from "./components/TodoFormDialog";
import TodoToggleDialog from "./components/TodoToggleDialog";
import FAB from "../../components/FAB";
import AppScreen from "../AppScreen";
import DataContext from "../../DataContext";
import Bone from "../../components/Bone";

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
    const [visibleTodoFormDialog, setVisibleTodoFormDialog] = React.useState(false);
    const [curItem, setCurItem] = useState();
    const { todos, addTodo, editTodo, removeTodo, increaseBone } = useContext(DataContext);

    useEffect(() => {
        setSections(transformData(todos));
    }, [todos]);


    const handleAddTodo = (title) => {
        addTodo({id: todos.length + 1, title: title, completed: false});
    };

    const toggleTodo = () => {
        editTodo({
            ...curItem,
            completed: true
        });
        increaseBone(boneCount);
        hideDialog();
    };

    const hideDialog = () => {
        setVisible(false);
        setCurItem(undefined);
    };

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
                        <Bone />
                        <SectionList
                            style={styles.sectionContainer}
                            sections={sections}
                            stickySectionHeadersEnabled={false}
                            renderItem={({item}) => (
                                <TodoItem key={item.id} todo={item} toggleTodo={value => {
                                    setCurItem(value);
                                    setVisible(true);
                                }}/>
                            )}
                            renderSectionHeader={({ section }) => (
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
                />

                <TodoFormDialog
                    visible={visibleTodoFormDialog}
                    onDismiss={() => setVisibleTodoFormDialog(false)}
                    onPress={text => {
                        handleAddTodo(text);
                        setVisibleTodoFormDialog(false);
                    }}
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
});

export default TodoScreen;
