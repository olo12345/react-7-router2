import { createContext, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {

    function Register(userEmail, userPassword) {
        if (users.find(u => u.email === userEmail)) {
            alert('El usuario ya existe');
            return null;
        }
        setUsers((prev) => ([...prev, { email: userEmail, password: userPassword }]));
    }

    function Logout() {
        setUser(null);
        setToken(false);
        alert('Logout exitoso');
    }

    function Login(userEmail, userPassword) {
        const loggedUser = users.find(u => u.email === userEmail && u.password === userPassword);
        if (!loggedUser) {
            alert('Usuario o contraseña incorrectos');
            return null;
        }
        setUser(loggedUser);
        setToken(true);
        alert('Login exitoso');
    }

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(true);
    return (
        <UserContext.Provider value={{ user, Register, Login, Logout, token }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;

export { UserContext }