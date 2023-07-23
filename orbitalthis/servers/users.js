import {addDoc, collection, getDocs, getFirestore, query, updateDoc, where} from "firebase/firestore";
import * as Crypto from "expo-crypto";

export const getUser =  async (username) => {
    const collectionRef = getCollectionRef();

    const q = query(collectionRef, where('username', '==', username));
    try {
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docSnapshot = querySnapshot.docs[0];
            return docSnapshot.data();
        }
    } catch (e) {
        console.error('Error getUser document:', e);
    }

    return null;
}

export const getCollectionRef = () => {
    const db = getFirestore();
    return collection(db, 'users');
}
