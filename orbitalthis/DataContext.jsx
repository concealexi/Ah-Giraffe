import React, { createContext, useState, useEffect } from 'react';
import getTodayTimestamps from "./utils/getTodayTimestamps";
import {editBonesByUid, editEmotionsByUid, editExpirationTimeByUid, getPet} from "./servers/pets";

const DataContext = createContext();


const {current } = getTodayTimestamps();

export const DataProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [petInfo, editPetInfo] = useState({});

    useEffect(() => {
        (async () => {
            if(userInfo) {
               const pet = await getPet(userInfo.id);
                editPetInfo(pet);
            }
        })();
    }, [userInfo]);

    const increaseBone = async (count) => {
        const result = await editBonesByUid(userInfo.id, parseInt(count), 'increment');
        if(result) {
            editPetInfo(prevInfo => ({
                ...prevInfo,
                bones:  prevInfo.bones + parseInt(count),
            }));
        }
    };

    const decreaseBone = async (count) => {
        const result = await editBonesByUid(userInfo.id, parseInt(count), 'decrease');
        if(result) {
            editPetInfo(prevInfo => {
                const newBones =  prevInfo.bones - parseInt(count);
                return {
                    ...prevInfo,
                    bones: Math.max(0, newBones)
                };
            });
        }
    };

    const increaseEmotions = async (count) => {
        const result = await editEmotionsByUid(userInfo.id, parseInt(count), 'increment');
        if(result) {
            editPetInfo(prevInfo => {
                const newEmotions =  prevInfo.emotions + parseInt(count);
                return {
                    ...prevInfo,
                    emotions: newEmotions > 100 ? 100 : newEmotions
                };
            });
        }
    };

    const decreaseEmotions = async (count) => {
        const result = await editEmotionsByUid(userInfo.id, parseInt(count), 'decrease');
        if(result) {
            editPetInfo(prevInfo => {
                const newEmotions =  prevInfo.emotions - parseInt(count);
                return {
                    ...prevInfo,
                    emotions: newEmotions < 0 ? 0 : newEmotions
                };
            });
        }
    };

    const editExpirationTime = async (expirationTime) => {
        const result = await editExpirationTimeByUid(userInfo.id, expirationTime);

        if(result) {
            editPetInfo(prevInfo => ({
                ...prevInfo,
                expirationTime
            }));
        }
    }

    return (
        <DataContext.Provider value={
            {
                petInfo,
                editExpirationTime,
                increaseBone,
                decreaseBone,
                increaseEmotions,
                decreaseEmotions,
                userInfo,
                setUserInfo
            }
        }>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;
