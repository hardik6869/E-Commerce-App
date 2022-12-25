import { createContext, useContext, useState } from "react";


const LocalStateContext =  createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({children}){
    // This is our custom State Provider! we will srtore data (state) and functionality (uodaters) in here and anyone can access it via the consumers!

    // Close Cart By default 
    const [cartOpen, setCartOpen ]= useState(false);

    const toggelCart = () => setCartOpen(!cartOpen);
    const closeCart = () => setCartOpen(false);
    const openCart = () => setCartOpen(true);

    return <LocalStateProvider value={{cartOpen, setCartOpen, toggelCart, closeCart, openCart}}>
        {children}
    </LocalStateProvider>
}

// Make a custom hook for accessing the cart local State

const useCart = () => {
    // we use a consumer here to access the local state 
    const all = useContext(LocalStateContext)
    return all;
}

export {CartStateProvider, useCart};