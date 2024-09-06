import { NextResponse } from "next/server";
import { db } from "@/services/firebase";
import { nanoid } from 'nanoid';
import { collection, doc, setDoc, deleteDoc} from "firebase/firestore"; // Importa las funciones necesarias

export async function POST(req) {
    try {
        const body = await req.json();
        console.log(body);

        if (!body) {
            return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
        }

        const { name, description, price, type, ingredients, size, skinType, usage, benefits, expirationDate, image } = body;

        if (!name || !description || !price || !type || !ingredients || !size || !skinType || !usage || !benefits || !expirationDate) {
            return NextResponse.json({ error: 'Faltan datos requeridos en el cuerpo de la solicitud' }, { status: 400 });
        }

        const parseDates = {
            name: String(name),
            description: String(description),
            price: Number(price),
            type: String(type),
            ingredients: String(ingredients),
            size: String(size),
            skinType: String(skinType),
            usage: String(usage),
            benefits: String(benefits),
            expirationDate: String(expirationDate),
        };

        const id = nanoid(3);
        const createdAt = new Date().toISOString();

        const newProduct = {
            uid: id,
            ...parseDates,
            images: image,
            createdAt,
        };

        const uid = Date.now().toString(20);
        const productRef = doc(collection(db, "productosCremas"), uid);

        await setDoc(productRef, newProduct);

        return NextResponse.json({ message: 'Producto creado con éxito' }, { status: 200 });
    } catch (error) {
        console.error("Error al registrar el producto:", error);
        return NextResponse.json({ error: 'Error al registrar el producto' }, { status: 500 });
    }
}

