
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage , ref , uploadBytes, getDownloadURL } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBxT8Y-xviCNFG-jQVqa9_NW-6le2OZ6gY",
    authDomain: "cremas-5a324.firebaseapp.com",
    projectId: "cremas-5a324",
    storageBucket: "cremas-5a324.appspot.com",
    messagingSenderId: "875587542873",
    appId: "1:875587542873:web:b826048a9cd87cf8da3648",
    measurementId: "G-7FB7M4DB03"
};

// Initialize Firebase
export const appFirebease = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebease);
export const storage = getStorage(appFirebease);

export async function uploadFile(files) {
    const uploadPromises = files.map(async (file) => {
        console.log(file);
        const storageRef = ref(storage, `imagesProductos/${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    });

    // Wait for all uploads to complete
    return Promise.all(uploadPromises);
}
