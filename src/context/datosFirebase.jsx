// datosFirebase.jsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/services/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
    const [cremasData, setCremasData] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "productosCremas"), (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id, ...doc.data(),                          
            }));
            setCremasData(data);
        });
        return () => unsubscribe();
    }, []);
    return (
        <FirebaseContext.Provider value={{ cremasData }}>
            {children}
        </FirebaseContext.Provider>
    );
};

export function useFirebase() {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error("useFirebase debe usarse dentro de un FirebaseProvider");
    }
    return context;
}
