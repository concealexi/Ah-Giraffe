import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getTodayTimestamps from "./utils/getTodayTimestamps";

const DataContext = createContext();


const {current } = getTodayTimestamps();

export const DataProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [todos, setTodos] = useState([]);
    const [petInfo, editPetInfo] = useState({
        bones: 0,
        emotions: 100,
        expirationTime: current
    });

    useEffect(() => {
        (async () => {
           await getDataFromStorage();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await saveDataToStorage();
        })();
    }, [tasks, todos, petInfo]);

    const getDataFromStorage = async () => {
        try {
            const jsonTasks = await AsyncStorage.getItem('tasks');
            if (jsonTasks !== null) {
                const parsedTasks = JSON.parse(jsonTasks);
                setTasks(parsedTasks);
            }

            const jsonTodos = await AsyncStorage.getItem('todos');
            if (jsonTodos !== null) {
                const parsedTodos = JSON.parse(jsonTodos);
                setTodos(parsedTodos);
            }

            const jsonPetInfo = await AsyncStorage.getItem('petInfo');
            if (jsonPetInfo !== null) {
                const parsedPetInfo = JSON.parse(jsonPetInfo);
                editPetInfo(parsedPetInfo);
            }
        } catch (error) {
            console.log('Error retrieving data from storage:', error);
        }
    };

    const saveDataToStorage = async () => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));

            await AsyncStorage.setItem('todos', JSON.stringify(todos));

            await AsyncStorage.setItem('petInfo', JSON.stringify(petInfo));
        } catch (error) {
            console.log('Error saving data to storage:', error);
        }
    };

    const addTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const editTask = (newTask) => {
        setTasks((prevTasks) => {
            const filterTasks = prevTasks.filter(item => item.id !== newTask.id);
            return [...filterTasks, newTask];
        });
    };

    const removeTask = (id) => {
        const updatedTasks = tasks.filter(item => item.id !== id);
        setTasks(updatedTasks);
    };

    const increaseBone = (count) => {
        editPetInfo(prevInfo => ({
            ...prevInfo,
            bones:  prevInfo.bones + parseInt(count),
        }));
    };

    const decreaseBone = (count) => {
        editPetInfo(prevInfo => {
            const newBones =  prevInfo.bones - parseInt(count);
            return {
                ...prevInfo,
                bones: newBones < 0 ? 0 : newBones
            };
        });
    };

    const increaseEmotions = (count) => {
        editPetInfo(prevInfo => {
            const newEmotions =  prevInfo.emotions + parseInt(count);
            return {
                ...prevInfo,
                emotions: newEmotions > 100 ? 100 : newEmotions
            };
        });
    };

    const decreaseEmotions = (count) => {
        editPetInfo(prevInfo => {
            const newEmotions =  prevInfo.emotions - parseInt(count);
            return {
                ...prevInfo,
                emotions: newEmotions < 0 ? 0 : newEmotions
            };
        });
    };

    const addTodo = (newTodo) => {
        setTodos((todos) => [...todos, newTodo]);
    }

    const editTodo = (newTodo) => {
        setTodos((prevTodos) => {
            const filterTodos = prevTodos.filter(item => item.id !== newTodo.id);
            return [...filterTodos, newTodo];
        });
    };

    const removeTodo = (id) => {
        const updatedTodos = tasks.filter(item => item.id !== id);
        setTasks(updatedTodos);
    };

    const setPetInfo = (newPetInfo = {}) => {
        delete newPetInfo.emotions;
        delete newPetInfo.bones;
        editPetInfo(prevInfo => {
            return {
                ...prevInfo,
                ...newPetInfo
            };
        });
    }

    return (
        <DataContext.Provider value={
            {
                tasks,
                addTask,
                editTask,
                removeTask,
                todos,
                addTodo,
                editTodo,
                removeTodo,
                petInfo,
                setPetInfo,
                increaseBone,
                decreaseBone,
                increaseEmotions,
                decreaseEmotions
            }
        }>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
