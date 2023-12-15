
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { get } from "../services/authService";

const UserContext = createContext()

const UserProvider = ({ children }) => {

    const [users, setUsers] = useState([])

    const getUsers = () => {

        get('/users')
            .then((response) => {
                console.log("Users", response.data)
                setUsers(response.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <UserContext.Provider value={{ users, getUsers, setUsers}}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }