"use client";
import { Footer } from "@/components/footer";
import { Atras, Adelante } from "@/components/icons/wa";
import { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "@/services/firebase";

export default function Home () {
    const [contadorSlider, setContadorSlider] = useState(0);
    const [imagesSlider, setImagesSlider] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imagesRef = ref(storage, 'imagesSlider');
                const listResult = await listAll(imagesRef);
                const urls = await Promise.all(
                    listResult.items.map(async (item) => {
                        const url = await getDownloadURL(item);
                        return url;
                    })
                );
                setImagesSlider(urls); // Guarda las URLs en el estado
            } catch (error) {
                console.log(error);
            }
        };

        fetchImages();
    }, []);

    const handleAtras = () => {
        setContadorSlider((prev) => 
            prev > 0 ? prev - 1 : imagesSlider.length - 1
        );
    };

    const handleAdelante = () => {
        setContadorSlider((prev) => 
            prev < imagesSlider.length - 1 ? prev + 1 : 0
        );
    };

    return (
        <>
            <div className="home">
                <h2></h2>
                <div className="home-info-ff">
                    <p>
                        ✨ Descubre el Secreto para una Piel Radiante✨

                        🌟 Nuestras cremas están formuladas con ingredientes naturales de alta calidad, diseñadas para mejorar tu piel de las imperfecciones.

                        💖 Beneficios:
                        Quita los lunares mezquinos y berrugas, tratamiento garantizado, contacto: +573204268930
                        No esperes más y dale a tu piel el cuidado que se merece. ¡Haz tu pedido hoy mismo y comienza a sentir la diferencia!

                        📦 Envíos a todo el país. ¡Te lo llevamos directo a tu puerta!
                    </p>
                </div> 
                <div className="home-info-slider">
                    <div className="home-hijo-publicidad">
                        <button onClick={handleAtras} style={{ position: "absolute", top: "50%", left: "0", backgroundColor: "black", color: "white", border: "none", width: "3rem", height: "3rem", borderRadius: "50%", border: "1px solid white" }}>
                            <Atras />
                        </button>
                        {imagesSlider.length > 0 && (
                            <img
                                src={imagesSlider[contadorSlider]}
                                style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                                alt="Slider"
                            />
                        )}
                        <button onClick={handleAdelante} style={{ position: "absolute", top: "50%", right: "0", backgroundColor: "black", color: "white", border: "none", width: "3rem", height: "3rem", borderRadius: "50%", border: "1px solid white" }}>
                            <Adelante />
                        </button>
                    </div>
                    <div className="home-hijo-masinfo">

                        <img
                            style={{ width: "100%", height: "100%" }}
                            src="https://firebasestorage.googleapis.com/v0/b/cremas-5a324.appspot.com/o/images%2Fimage.png?alt=media&token=dba90b40-a0d5-4383-88d9-3aaa2a758b28"
                            alt="Info"
                        />

                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}
