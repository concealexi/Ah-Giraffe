import React, {useState, useContext} from "react";
import {Text} from 'react-native-paper';
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ImageBackground,
    Image,
} from 'react-native';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import AppScreen from "../AppScreen";
import FAB from "../../components/FAB";
import TaskFormDialog from "./components/TaskFormDialog";
import Bone from "../../components/Bone";
import DataContext from "../../DataContext";
import TaskCompletedFormDialog from "./components/TaskCompletedFormDialog";
import getTodayTimestamps from "../../utils/getTodayTimestamps";

const boneCount = 10;

const checkAvailability = (current, timestamps = {}) => timestamps.startOfDay < current && timestamps.endOfDay > current;

const TaskScreen = () => {
    const {tasks = [], addTask, editTask, removeTask, increaseBone} = useContext(DataContext);
    const [visibleTaskFormDialog, setVisibleTaskFormDialog] = React.useState(false);
    const [visibleTaskCompletedFormDialog, setVisibleTaskCompletedFormDialog] = React.useState(false);
    const [curTask, setCurTask] = useState();
    const timestamps = getTodayTimestamps();

    const handleAddTask = (name, quantity) => {
        addTask({
            id: tasks.length + 1,
            name,
            completedQuantity: 0,
            totalQuantity: quantity,
            completed: false,
            modifyTime: 0
        });
    };

    const toggleTaskCompletion = (task) => {
        setCurTask(task);
        setVisibleTaskCompletedFormDialog(true);
    };

    const handEditTask = (quantity) => {
        if (!curTask) return;
        const completedQuantity = parseInt(curTask.completedQuantity) + parseInt(quantity);
        const completed = completedQuantity >= curTask.totalQuantity;
        editTask({
            ...curTask,
            completedQuantity: completed ? curTask.totalQuantity : completedQuantity,
            modifyTime: timestamps.current,
            completed
        });
        setCurTask(undefined);
        setVisibleTaskCompletedFormDialog(false);
        if (completed) {
            increaseBone(boneCount);
        }
    };

    const deleteTask = taskId => {
        removeTask(taskId);
    };

    const renderRightActions = taskId => (
        <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTask(taskId)}
        >
            <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground
            source={require('../../assets/images/task_background.png')}
            style={styles.backgroundImage}
            resizeMode='cover'>
            <AppScreen>
                <Bone/>
                <GestureHandlerRootView style={styles.container}>
                    <FlatList
                        data={tasks}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => (
                            <Swipeable renderRightActions={() => renderRightActions(item.id)}>
                                <View style={styles.taskItem}>
                                    <View style={styles.taskItemInfo}>
                                        <View style={styles.taskItemName}>
                                            <View style={styles.taskItemNameDot}/>
                                            <Text style={styles.taskItemNameText}>{item.name}</Text>
                                        </View>
                                        <View style={styles.taskItemQuantity}>
                                            <Image
                                                source={require("../../assets/icons/dog.png")}
                                                style={{width: 20, height: 27}}
                                            />
                                            <Text style={styles.taskItemQuantityText}>
                                                {Math.ceil((item.completedQuantity / item.totalQuantity) * 100)}%
                                                completed!
                                            </Text>
                                        </View>
                                    </View>
                                    {!item.completed && (
                                        <View style={styles.repeatsContainer}>
                                            <TouchableOpacity
                                                onPress={() => toggleTaskCompletion(item)}
                                                disabled={checkAvailability(item.modifyTime, timestamps)}
                                            >
                                                <Image
                                                    source={require("../../assets/icons/footprint.png")}
                                                    style={{
                                                        width: 43,
                                                        height: 43,
                                                        tintColor: checkAvailability(item.modifyTime, timestamps) ? '#ccc' : undefined
                                                    }}
                                                    resizeMode="contain"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </Swipeable>
                        )}
                        contentContainerStyle={styles.listContent}
                    />
                </GestureHandlerRootView>
            </AppScreen>

            <TaskCompletedFormDialog
                visible={visibleTaskCompletedFormDialog}
                onDismiss={() => setVisibleTaskCompletedFormDialog(false)}
                onPress={handEditTask}
            />

            <TaskFormDialog
                visible={visibleTaskFormDialog}
                onDismiss={() => setVisibleTaskFormDialog(false)}
                onPress={(name, quantity) => {
                    handleAddTask(name, quantity);
                    setVisibleTaskFormDialog(false);
                }}
            />

            <FAB
                onPress={() => {
                    setVisibleTaskFormDialog(true);
                }}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
        paddingBottom: 60,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        padding: 16,
    },
    listContent: {
        gap: 10
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    taskItemInfo: {
        gap: 4
    },
    taskItemName: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    taskItemNameDot: {
        width: 5,
        height: 5,
        backgroundColor: '#000',
        borderRadius: 3,
    },
    taskItemNameText: {
        fontSize: 15,
        fontWeight: 500
    },
    taskItemQuantity: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginLeft: 11
    },
    taskItemQuantityText: {
        fontSize: 15,
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
    repeatsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default TaskScreen;
