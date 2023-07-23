import {addDoc, collection, getDocs, getFirestore, query, updateDoc, where} from "firebase/firestore";
import * as Crypto from "expo-crypto";


export const addPet = async (uid) => {
    const id = Crypto.randomUUID();
    const expirationTime = Date.now();

    const petCollectionRef = getPetCollectionRef();

    try {

        const data = {
            id,
            bones: 0,
            emotions: 100,
            expirationTime,
            uid: uid,
        };
        await addDoc(petCollectionRef, data);
        return  true;
    } catch (error) {
        console.error('Error add document:', error);
    }

    return false;
}

export const editBonesByUid = async (uid, bones, type) => {

    const petCollectionRef = getPetCollectionRef();
    const q = query(petCollectionRef, where('uid', '==', uid));

    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return false;
        } else {
            const ref = querySnapshot.docs[0].ref;
            const data = querySnapshot.docs[0].data();

            let newBones;

            if(type === 'increment') {
                newBones = data.bones + bones;
            } else{
                newBones = Math.max(0, data.bones - bones);
            }

            await updateDoc(ref, { bones: newBones });
            return true;
        }
    } catch (error) {
        console.error('Error updating document:', error);
    }

    return false;
}

export const editEmotionsByUid = async (uid, emotions, type) => {

    const petCollectionRef = getPetCollectionRef();
    const q = query(petCollectionRef, where('uid', '==', uid));

    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return false;
        } else {
            const ref = querySnapshot.docs[0].ref;
            const data = querySnapshot.docs[0].data();

            let newEmotions;

            if(type === 'increment') {
                newEmotions = data.emotions + emotions;
            } else {
                newEmotions = Math.max(0, data.emotions - emotions);
            }

            await updateDoc(ref, { emotions: newEmotions > 100 ? 100 : newEmotions });
            return true;
        }
    } catch (error) {
        console.error('Error updating document:', error);
    }

    return false;
}

export const editExpirationTimeByUid = async (uid, expirationTime) => {

    const petCollectionRef = getPetCollectionRef();
    const q = query(petCollectionRef, where('uid', '==', uid));

    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await updateDoc(docRef, { expirationTime: expirationTime });
            return true;
        }
    } catch (error) {
        console.error('Error updating document:', error);
    }

    return false;
}

export const getPet = async (uid) => {
    const petCollectionRef = getPetCollectionRef();
    const q = query(petCollectionRef, where('uid', '==', uid));

    try {
        const querySnapshot = await getDocs(q);

        const docSnapshot = querySnapshot.docs[0];
        return docSnapshot.data();
    } catch (e) {
        console.error('Error get document:', e);
    }

    return {};
}

export const getPetCollectionRef = () => {
    const db = getFirestore();
    return collection(db, 'pets');
}
