import React, {useState, useContext, useEffect} from "react";
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
import {addTask, deleteTaskById, editQuantityById, getTasks} from "../../servers/tasks";

const boneCount = 10;

const checkAvailability = (current, timestamps = {}) => timestamps.startOfDay < current && timestamps.endOfDay > current;

const TaskScreen = () => {
    const {increaseBone, userInfo} = useContext(DataContext);
    const [visibleTaskFormDialog, setVisibleTaskFormDialog] = React.useState(false);
    const [visibleTaskCompletedFormDialog, setVisibleTaskCompletedFormDialog] = React.useState(false);
    const [curTask, setCurTask] = useState();
    const timestamps = getTodayTimestamps();
    const [tasks, setTasks] = useState([]);
    const [addLoading, setAddLoading] = useState(false);
    const [editLoading, setEditLoading] = useState(false);

    useEffect(() => {
        (async () => {
            await fetchTasks();
        })();
    }, []);

    const fetchTasks = async () => {
        const values = await getTasks(userInfo.id);
        setTasks(values);
    }

    const handleAddTask = async (name, quantity) => {
        setAddLoading(true);
        try {
            const result = await addTask(name, parseInt(quantity), userInfo.id);
            if(result) {
                await fetchTasks();
            }
        } finally {
            setAddLoading(false);
            setVisibleTaskFormDialog(false);
        }
    };

    const toggleTaskCompletion = (task) => {
        setCurTask(task);
        setVisibleTaskCompletedFormDialog(true);
    };

    const handEditTask = async  (quantity) => {
        if (!curTask) return;

        setEditLoading(true);

        try {
            const result = await editQuantityById(curTask.id, parseInt(quantity));

            if(result) {
                await increaseBone(boneCount);
                await fetchTasks();
            }
        } finally {
            setEditLoading(false);
            setVisibleTaskCompletedFormDialog(false);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            const result = await deleteTaskById(taskId);
            if(result) {
                await fetchTasks();
            }
        } catch (e) {

        }
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
                loading={editLoading}
            />

            <TaskFormDialog
                visible={visibleTaskFormDialog}
                onDismiss={() => setVisibleTaskFormDialog(false)}
                onPress={async (name, quantity) => {
                    await handleAddTask(name, quantity);
                }}
                loading={addLoading}
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
