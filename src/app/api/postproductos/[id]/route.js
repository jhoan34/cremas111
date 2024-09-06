import { NextResponse } from "next/server";
import { db } from "@/services/firebase";
import { nanoid } from 'nanoid';
import { collection, doc, setDoc, deleteDoc} from "firebase/firestore"; // Importa las funciones necesarias

export async function DELETE(req, { params }) {
    const { id } = params;
    console.log(id);

    if (!id) {
        return NextResponse.json({ error: 'Faltan datos requeridos en el cuerpo de la solicitud' }, { status: 400 });
    }

    try {
        const productRef = doc(db, "productosCremas", id);
        await deleteDoc(productRef);
        return NextResponse.json({ message: 'Producto eliminado correctamente' }, { status: 200 });
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        return NextResponse.json({ error: 'Error al eliminar el producto' }, { status: 500 });
    }
}