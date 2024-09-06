"use client"
import { appFirebease, uploadFile } from "@/services/firebase";
import { getAuth , signOut } from "firebase/auth";
import { useUsuario } from "@/context/sesion";
import { useState } from "react";
import { useRouter } from "next/navigation";

import "./admin.css"

const auth = getAuth(appFirebease)

const ProductForm = () => {
  const [messageError , setMessageError] = useState("");
  const [messageSuccess , setMessageSuccess] = useState("");

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: [],
    type: '',
    ingredients: [],
    size: '',
    skinType: '',
    usage: '',
    benefits: [],
    expirationDate: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if(name === "image" && files.length > 0) {
      setProduct( {
        ...product,
        [name]: [...files],
      }) 
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setProduct({
      ...product,
      [field]: value.split(',').map(item => item.trim()),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, image, type, ingredients, size, skinType, usage, benefits, expirationDate } = product;
    if(!name || !description || !price || !image || !type || !ingredients || !size || !skinType || !usage || !benefits || !expirationDate) {
      setMessageError("Por favor, rellena todos los campos obligatorios.");
      setTimeout(() => {
        setMessageError("");
      }, 3000);
      return;
    }
    const sss = await uploadFile(image)
    const date = new Date();
    const formattedDate = date.toISOString().substring(0, 10);
    const res = await fetch("/api/postproductos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price,
        image: sss,
        type,
        ingredients,
        size,
        skinType,
        usage,
        benefits,
        createdAt: formattedDate,
        expirationDate,
      }),
    })
    const data = await res.json()
    if(res.ok) {
      setMessageSuccess(data.message);
      setTimeout(() => {
        setMessageSuccess("");
      }, 3000);
      setProduct({
        name: '',
        description: '',
        price: '',
        image: [],
        type: '',
        ingredients: [],
        size: '',
        skinType: '',
        usage: '',
        benefits: [],

      });
    }else{
      setMessageError(data.message);
      setTimeout(() => {
        setMessageError("");
      }, 3000);
    }

  };
  
  
  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Imagen (URL):</label>
        <input
          type="file"
          multiple
          name="image"
          id="image"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Tipo:</label>
        <input
          type="text"
          name="type"
          value={product.type}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Ingredientes (separados por coma):</label>
        <input
          type="text"
          name="ingredients"
          value={product.ingredients.join(', ')}
          onChange={(e) => handleArrayChange(e, 'ingredients')}
        />
      </div>
      <div>
        <label>Tamaño:</label>
        <input
          type="text"
          name="size"
          value={product.size}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Tipo de Piel:</label>
        <input
          type="text"
          name="skinType"
          value={product.skinType}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Uso:</label>
        <textarea
          name="usage"
          value={product.usage}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Beneficios (separados por coma):</label>
        <input
          type="text"
          name="benefits"
          value={product.benefits.join(', ')}
          onChange={(e) => handleArrayChange(e, 'benefits')}
        />
      </div>
      <div>
        <label>Fecha de Expiración:</label>
        <input
          type="text"
          name="expirationDate"
          value={product.expirationDate}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Guardar Producto</button>
      {messageError && <p className="admin-error">{messageError}</p>}
      {messageSuccess && <p className="admin-success">{messageSuccess}</p>}
    </form>
  );
};

export default function UserAdmin () {
  const ruta = useRouter()
  const [textOptions , setTextOptions] = useState("")
  const { usuariodata, setUsuario, emailCurrent } = useUsuario()
  const handleText = (e) => {
    setTextOptions(e.target.value)
  }

  const renderoptions = () => {
    switch(textOptions){
      case "Productos":
        return <ProductForm />
      default:
        return <ProductForm/>
    }
  };

  return (
    <>
      {
        usuariodata && emailCurrent === "cremas1305@gmail.com" ? (

          <div className="admin-container">
            <div className="admin-header">
              <button onClick={handleText} className="admin-button">Productos</button>
              <button onClick={() => {
                signOut(auth);
                ruta.push('/cuenta/loginprotected');
              }} className="admin-button">Cerrar sesión</button>
            </div>
            <div>
              {renderoptions()}
            </div>
          </div>
        ): <div> No eres administrador </div>
      }
    </>
  )
}
