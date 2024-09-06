"use client";
import { Wa , Adelante, Atras} from "./icons/wa";
import { useFirebase } from "@/context/datosFirebase";
import { useState } from "react";

export const CardItem = ({ idparams }) => {
  const { cremasData } = useFirebase();
  const [contador, setContador] = useState(0);
  const [message , setmessage] = useState("")

  const crema = cremasData.find((crema) => crema.uid.toString() === idparams);
  const handleAtras = () => {
    if (contador > 0) {
        setContador(contador - 1);   
    }
    else{
        setContador(crema.images.length - 1);
    }
   
  };

  const handleAdelante = () => {
    if (contador < crema.images.length - 1) {
        setContador(contador + 1);   
    }else{
        setContador(0);
    }

  };

  const handleWhatsapp = async () => {
    let message = `Hola, me interesa este producto, esta es la url del producto nombre: ${crema.name}, precio: ${crema.price}; esta es la url del proyecto: https://cuidado-y-belleza.vercel.app/productos/${idparams}`;
    window.open(`https://wa.me/+573204268930?text=${encodeURIComponent(message)}`, "_blank");
  }


  return (
    <>
      {crema ? (

        <div className="card-item">
          <div className="card-item-image">
            <button onClick={handleAtras} style={{position : 'absolute', top : '50%', left : '0',backgroundColor: "black", color : 'white', border: "none", width: '3rem', height: '3rem', borderRadius: '50%', border: '1px solid white'}}>
                <Atras/>
            </button>
            <img src={crema.images[contador]} alt={crema.name} />
            <button onClick={handleAdelante}  style={{position : 'absolute', top : '50%', right : '0', backgroundColor: "black", color : 'white', border: "none", width: '3rem', height: '3rem', borderRadius: '50%', border: '1px solid white' }}>
                <Adelante/>
            </button>
          </div>
          <div className="card-item-text">
                <div className="card-item-info">
                <h1>{crema.name}</h1>
                <h2 style={{color : 'green'}}>Precio: ${crema.price}</h2>
                <hr/>
                <div className="srt">
                    <h3 style={{color : 'green'}}>Descripción:</h3>
                    <p style={{fontSize : '1.1rem'}}>{crema.description}</p>
                </div>
                <hr/>
                <div className="srt">
                    <h3 style={{color : 'green'}}>Uso:</h3>
                    <p style={{fontSize : '1.1rem'}}>{crema.usage}</p>
                </div>
                <div className="srt">
                    <h3 style={{color : 'green'}}>Tipo:</h3>
                    <p style={{fontSize : '1.1rem'}}>{crema.type}</p>
                </div>
                <div className="srt">
                    <h3 style={{color : 'green'}}>Contenido:</h3>
                    <p style={{fontSize : '1.1rem'}}>{crema.size}</p>
                </div>
                <hr/>
                <div>
                    <p>Ingredientes: {crema.ingredients}</p>
                    <small>Expiracion: {crema.expirationDate} </small>
                </div>

                </div>
                <div className="container-contact" style={{display : 'flex', flexDirection : 'column'}}>
                    <h2 style={{color : 'green'}}>Manda Una Captura Del Producto </h2>
                    <button onClick={handleWhatsapp}>
                        <Wa /> Contactar Por Whatsapp
                    </button>
                    {message && <p style={{color : 'green'}}>{message}</p>}
                </div>
          </div>
        </div>

      ) : (
        <div>
          <h1>Cargando...</h1>
        </div>
      )}
    </>
  );
};
