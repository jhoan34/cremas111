"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useUsuario } from "@/context/sesion"
import { appFirebease } from "@/services/firebase"
import "./login.css"

const auth = getAuth(appFirebease)

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const router = useRouter() // Agregar useRouter aquí
    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            if (userCredential.user.email === "cremas1305@gmail.com") {
                setMessage("Login exitoso")
                setTimeout(() => {
                    setMessage("")
                }, 3000)
                router.push("/cuenta/userAdmin")
            }

        } catch (error) {
            setError("Error al iniciar sesión")
            setTimeout(() => {
                setError("")
            }, 3000)
        }
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <div className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                {error && <p className="login-error">{error}</p>}
                {message && <p className="login-message">{message}</p>}
            </div>

            <button onClick={handleLogin} className="login-button">Login</button>
        </div>
    )
}
