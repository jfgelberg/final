import { call } from "./api.service"

export async function login({ email, password }){
    return call( { uri: "usuarios/login", method: "POST", body: { "email": email, "password": password } } )
}

export async function register({ email, password, confirmPassword }){
    return call( { uri: "usuarios", method: "POST", body: { "email": email, "password": password, "passwordConfirm": confirmPassword } } )
}