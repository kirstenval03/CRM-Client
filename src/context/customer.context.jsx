
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { get } from "../services/authService";

const CustomerContext = createContext()

const CustomerProvider = ({ children }) => {

    const [customers, setCustomers] = useState([])

    const getCustomers = () => {

        get('/customers')
            .then((response) => {
                console.log("Customers", response.data)
                setCustomers(response.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <CustomerContext.Provider value={{ customers, getCustomers, setCustomers}}>
            {children}
        </CustomerContext.Provider>
    )
}

export { CustomerContext, CustomerProvider }
