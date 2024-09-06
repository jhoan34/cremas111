"use client";
import Link from "next/link";
import { useUsuario } from "@/context/sesion";

const renderAdmin = () => {
    return (
        <div>
            <Link href="cuenta/userAdmin">Cuenta </Link>
        </div>
    )
};

export const Headers = () => {
    const { emailCurrent, usuariodata } = useUsuario();
    return (
        <nav className="nav-headers">
            <div className="nav-hijo">
                <div>
                    <Link href="/"> Home </Link>
                </div>
                <div>
                    <Link href="/productos"> Productos </Link>
                </div>
                {usuariodata && emailCurrent === "cremas1305@gmail.com" ? renderAdmin() : null}
            </div>
        </nav>
    );
};
