import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getDatabaseCart, removeFromDatabaseCart } from "../../../utilities/databaseManager";
import fakeData from "../../../fakeData";

import ReviewItems from "../ReviewItems/ReviewItems";
import Cart from "../Cart/Cart";

const Review = () => {
   const [cart, setCart] = useState([]);

   /* to remove an item -------------------------- */
   const removeItem = (productKey) => {
      const newCart = cart.filter((prod) => prod.key !== productKey);
      setCart(newCart);
      removeFromDatabaseCart(productKey);
   };

   /* to load multiple data not all from database --------------------- */
   useEffect(() => {
      const savedCart = getDatabaseCart();
      const productKeys = Object.keys(savedCart);

      fetch("https://frozen-everglades-38727.herokuapp.com/productsByKeys", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(productKeys),
      })
         .then((res) => res.json())
         .then((data) => {
            const countProducts = productKeys.map((k) => {
               const product = fakeData.find((prod) => prod.key === k);
               product.quantity = savedCart[k];
               return product;
            });
            setCart(countProducts);
         });
   }, []);

   return (
      <>
         <Link to="/">
            <h1>Go to Shop</h1>
         </Link>

         <div className="shop-container">
            {/* Showing Items ============================= */}
            <div className="product">
               {cart.map((prod) => (
                  <ReviewItems key={prod.key} product={prod} removeItem={removeItem}></ReviewItems>
               ))}
            </div>

            {/* Showing Cart =============================== */}
            <Cart cart={cart} />
         </div>
      </>
   );
};

export default Review;
