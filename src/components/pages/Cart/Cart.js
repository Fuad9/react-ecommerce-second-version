import React from "react";
import "./Cart.css";

const Cart = (props) => {
   const cart = props.cart;
   const totalItemPrice = cart.reduce(
      (total, prod) => total + prod.price * (prod.quantity || 1),
      0
   );

   // // Applying for loop
   // let totalItemPrice = 0;
   // for (let i = 0; i < cart.length; i++) {
   //   const product = cart[i];
   //   console.log(product);
   //   const quantity = product.quantity || 1;
   //   totalItemPrice = totalItemPrice + product.price * quantity;
   // }

   // Setting shipping cost
   let shipping = 0;
   if (totalItemPrice > 35) {
      shipping = 0;
   } else if (totalItemPrice > 15) {
      shipping = 4.99;
   } else if (totalItemPrice > 0) {
      shipping = 12.99;
   }

   const tax = (totalItemPrice / 10).toFixed(2);

   const grandTotalPrice = (totalItemPrice + shipping + Number(tax)).toFixed(2);

   const formatNumber = (num) => {
      let precision = num.toFixed(2);
      return Number(precision);
   };

   return (
      <div className="ml-3">
         <h3>Order Summary</h3>
         <h5>Items Ordered: {cart.length}</h5>
         <h5>Items Price: {formatNumber(totalItemPrice)}</h5>
         <h5>Shipping & Handling: {shipping}</h5>
         <h5>Total before tax: {formatNumber(shipping + totalItemPrice)}</h5>
         <h5>Estimated tax: {tax}</h5>
         <h5>Order Total : {grandTotalPrice}</h5>
         {props.children}
      </div>
   );
};

export default Cart;
