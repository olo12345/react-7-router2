import {createContext, useState } from "react";
import { pizzaCart } from "./../assets/pizzas.js";


const CartContext = createContext()


function CartProvider({ children }) {
    const [cart, setCart] = useState(pizzaCart)
    const total = cart.reduce((totalTemp, pizza) => totalTemp + (pizza.price * pizza.count), 0)

    function addToCart(pizza) {
        if (!pizza || !pizza.id) return
        const index = cart.findIndex(item => item.id.toUpperCase() === pizza.id.toUpperCase())
        if (index === -1) {
            setCart(prevCart => [...prevCart, { ...pizza, count: 1 }])
        } else {
            setCart(prevCart => prevCart.map((item, i) => {
                return i !== index ? item : { ...item, count: item.count + 1 }
            }
            ))
        }
    }

    function restarCount(id) {
        const index = cart.findIndex(pizza => pizza.id === id)
        if (cart[index].count === 1) {
            setCart(prevCart => prevCart.filter((pizza, i) => i !== index
            ))
            return
        }
        setCart(prevCart => prevCart.map((pizza, i) => {
            return i !== index ? pizza : { ...pizza, count: pizza.count - 1 }
        }
        ))
    }

    function sumarCount(id) {
        const index = cart.findIndex(pizza => pizza.id === id)
        setCart(prevCart => prevCart.map((pizza, i) => {
            return i !== index ? pizza : { ...pizza, count: pizza.count + 1 }
        }
        ))
    }

    return (
        <CartContext.Provider value={{cart, addToCart, total, restarCount, sumarCount}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider

export { CartContext }