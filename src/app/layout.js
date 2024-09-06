import { UsuarioProvider } from "@/context/sesion"
import { FirebaseProvider } from "@/context/datosFirebase"
import { Headers } from "@/components/headers"
import "./global.css"

export const metadata = {
  title: 'Cremas',
  description: 'Cremas para quitar las berrugas',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UsuarioProvider>
          <FirebaseProvider>
            <Headers />
            {children}
          </FirebaseProvider>
        </UsuarioProvider>
      </body>
    </html>
  )
}
