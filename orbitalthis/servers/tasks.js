import {addDoc, collection, deleteDoc, getDocs, getFirestore, query, updateDoc, where} from "firebase/firestore";
import * as Crypto from "expo-crypto";

export const getTasks = async (uid) => {
    const taskCollectionRef = getTaskCollectionRef();
    const q = query(taskCollectionRef, where('uid', '==', uid));

    try {

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return querySnapshot.docs.map((doc) => doc.data());
        }

    } catch (e) {
        console.error('Error add document:', e);
    }

    return [];
}

export const addTask = async (name, quantity, uid) => {
    const id = Crypto.randomUUID();
    const created_at = Date.now();

    const data = {
        id,
        name,
        completedQuantity: 0,
        totalQuantity: quantity,
        completed: false,
        modifyTime: 0,
        created_at,
        uid: uid,
    };

    const taskCollectionRef = getTaskCollectionRef();

    try {

        await addDoc(taskCollectionRef, data);
        return true;

    } catch (e) {
        console.error('Error add document:', e);
    }

    return true;
}

export const editQuantityById = async (id, quantity) => {
    const taskCollectionRef = getTaskCollectionRef();
    const q = query(taskCollectionRef, where('id', '==', id));

    const querySnapshot = await getDocs(q);
    try {
        if (querySnapshot.empty) {
            return false;
        } else {
            const ref = querySnapshot.docs[0].ref;
            const data = querySnapshot.docs[0].data();

            if(data.completed) {
                return false;
            }

            const completedQuantity = data.completedQuantity + quantity;
            const completed = completedQuantity >= data.totalQuantity;

            await updateDoc(ref, {
                completed,
                modifyTime: Date.now(),
                completedQuantity: completed ? data.totalQuantity : completedQuantity,
            });

            return true;
        }
    } catch (e) {
        console.error('Error editQuantity document:', e);
    }

    return false;
}

export const deleteTaskById = async (id) => {
    const taskCollectionRef = getTaskCollectionRef();
    const q = query(taskCollectionRef, where('id', '==', id));

    try {
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const ref = querySnapshot.docs[0].ref;
            await deleteDoc(ref);

            return true;
        }
    } catch (e) {
        console.error('Error deleteTask document:', e);
    }

    return false;
}
export const getTaskCollectionRef = () => {
    const db = getFirestore();
    return collection(db, 'tasks');
}
