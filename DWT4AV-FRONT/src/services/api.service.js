export async function call({ uri, method = "GET", body = undefined }) {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Token no encontrado. Por favor, inicia sesión.");
    }

    const fetchOptions = {
        headers: {
            "Content-Type": "application/json",
            "auth-token": token,
        },
        method,
    };

    if (body) {
        fetchOptions.body = JSON.stringify(body);
    }

    return fetch(`http://localhost:2025/api/${uri}`, fetchOptions)
        .then(async (response) => {
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem("token");
                }

                throw await response.json();
            }
            return response.json();
        })
        .catch((error) => {
            console.error("Error en el API Service:", error.message);
            throw error;
        });
}
