export const Footer = () => {
    return (
        <div className="footer" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2.5vh'} }>
            <div className="redes" style={{width: '40%', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <h2>Contacto</h2>
                <hr/>
                <p>+573204268930</p>
            </div>
            <div className="info" style={{width: '40%', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', fontSize: '1.5vh', gap: '1vh'}}>
                <h3> Sobre Los Productos</h3>
                <p>
                    💖 Beneficios:
                    Elimina lunares, mezquinos y verrugas con nuestro tratamiento garantizado. ¡Resultados efectivos! Contáctanos al +573204268930
                </p>
            </div>
        </div>
    )
}