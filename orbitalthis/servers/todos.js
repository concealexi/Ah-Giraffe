import {addDoc, collection, deleteDoc, getDocs, getFirestore, query, updateDoc, where} from "firebase/firestore";
import * as Crypto from "expo-crypto";

export const getTodos = async (uid) => {
    const todoCollectionRef = getTodoCollectionRef();
    const q = query(todoCollectionRef, where('uid', '==', uid));

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

export const addTodo = async (title, uid) => {
    const id = Crypto.randomUUID();
    const created_at = Date.now();

    const dataToAdd = {
        id,
        title,
        completed: false,
        created_at,
        uid: uid,
    };

    try{

        const todoCollectionRef = getTodoCollectionRef();

        await addDoc(todoCollectionRef, dataToAdd);

        return true;

    } catch (e) {
        console.error('Error add document:', e);
    }

    return true;
}

export const updateTodo = async (item) => {
    const todoCollectionRef = getTodoCollectionRef();
    const q = query(todoCollectionRef, where('id', '==', item.id));

    try {

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const ref = querySnapshot.docs[0].ref;
            const data = querySnapshot.docs[0].data();

            if(data.completed) {
                return false;
            }

            await updateDoc(ref, {completed: true});

            return true;
        }


    } catch (e) {
        console.error('Error updateTodo document:', e);
    }

    return true;
}

export const deleteTodo = async (id) => {
    const todoCollectionRef = getTodoCollectionRef();
    const q = query(todoCollectionRef, where('id', '==', id));
    try {

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const ref = querySnapshot.docs[0].ref;
            await deleteDoc(ref);

            return  true;
        }

    } catch (e) {
        console.error('Error deleteTodo document:', e);
    }

    return true;
}

export const getTodoCollectionRef = () => {
    const db = getFirestore();
    return collection(db, 'todos');
}
