"use client"
import Link from "next/link";
import { useUsuario } from "@/context/sesion";
import { useFirebase } from "@/context/datosFirebase"
import { useRef, useState } from "react";

export const CardProducts = () => {
    const { cremasData } = useFirebase();
    const { emailCurrent, usuariodata } = useUsuario(); 
    const [message , setmessage] = useState("")
    const color = useRef(null)

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/postproductos/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
    
            if (res.ok) {
                setmessage("Producto eliminado");
            } else {
                setmessage(data.error || "Error al eliminar el producto");
            }
        } catch (error) {
            console.error("Error en la solicitud de eliminación:", error);
            setmessage("Error al eliminar el producto");
        } finally {
            setTimeout(() => {
                setmessage("");
            }, 2000);
        }
    };
    

    return(
        <>
            {
                cremasData.map((crema) => (
                    <div key={crema.id} className="card-product">
                        <div className="card-product-image">
                            <img style={{width: '100%', height: '100%', borderRadius: '2%'}} src={crema.images} />
                        </div>
                        <div className="card-product-text">
                            <div className="card-product-name">
                                <h3>Nombre: {crema.name}</h3>
                                <h3>Precio: ${crema.price}</h3>
                            </div>
                            <div className="card-product-verproduct">
                                <Link href={`/productos/${crema.uid}`}>Ver Producto</Link>
                            </div>
                            {
                                usuariodata && emailCurrent === "cremas1305@gmail.com" ? (
                                    <div className="card-product-delete">
                                        <button style={{backgroundColor : color.current}} className="card-product-delete" onClick={() => handleDelete(crema.id)}>
                                            ELIMINAR Producto
                                        </button>
                                    </div>
                                ) : null
                            }
                            {
                                message === "producto eliminado" ? <p style={{color : 'green'}}>{message}</p> : <p style={{color : 'red'}}>{message}</p>
                            }
                        </div>
                    </div>
                ))
            }
        </>
    );
}
