import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
//import jwtDecode from "jwt-decode"; //javi --> npm install jwt-decode

const SessionContext = createContext()

function useSession(){
    return useContext(SessionContext)
}

function useLogOut(){ 
    const { onLogout } = useSession()
    return onLogout
}

function useLogin(){
    const { onLogin } = useSession()
    return onLogin
}

function useToken(){
    const { token } = useSession()
    return token
}

// javi --> para que no se pierda el token al recargar la página
// const useToken = () => {
//     const token = localStorage.getItem("token");
//     if (!token) return null;

//     try {
//         const decoded = jwtDecode(token);
//         return decoded; // Esto debería incluir el email si está en el payload del token
//     } catch (error) {
//         console.error("Token inválido", error);
//         return null;
//     }
// };

function SessionProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"))

    const navigate = useNavigate()

    const onLogout = () => {
        localStorage.clear()
        setToken(null)
    }

    const onLogin = (jwt) => {
        localStorage.setItem("token", jwt)
        setToken(jwt)
    }
    
    // useEffect( () => {
    //     fetch("http://localhost:2025/api/usuario",{
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'auth-token': token
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if( data.message ){
    //             onLogout()
    //             navigate("/login")
    //         }else{
    //             onLogin(token)
    //         }
    //     })
    // },[] )

    return (
        <SessionContext.Provider value={{ token, onLogout, onLogin }}>
            {children}
        </SessionContext.Provider>

    )
}

export { SessionContext, SessionProvider, useSession, useLogOut, useLogin, useToken }