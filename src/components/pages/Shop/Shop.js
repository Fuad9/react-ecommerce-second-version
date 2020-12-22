import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import "./Shop.css";

import { addToDatabaseCart, getDatabaseCart } from "../../../utilities/databaseManager";
import Loading from "../../../utilities/Loading";

import Product from "../Product/Product";
import Cart from "../Cart/Cart";

const Shop = () => {
   const [products, setProducts] = useState([]);
   const [cart, setCart] = useState([]);
   const [search, setSearch] = useState("");
   const [loading, setLoading] = useState(false);

   /* calling product data from api ========================= */
   useEffect(() => {
      const getData = async () => {
         try {
            setLoading(true);
            const response = await Axios.get(
               "https://frozen-everglades-38727.herokuapp.com/products?search=" + search
            );
            setProducts(response.data);
            setLoading(false);
         } catch (error) {
            setLoading(false);
         }
      };
      getData();
   }, [search]);

   /* Showing individual items by product keys ========================= */
   useEffect(() => {
      const savedCart = getDatabaseCart();
      const productKeys = Object.keys(savedCart);

      fetch("https://frozen-everglades-38727.herokuapp.com/productsByKeys", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(productKeys),
      })
         .then((res) => res.json())
         .then((data) => setCart(data));
   }, []);

   /* Adding items to cart and setting product Id to local storage ====================== */
   const handleAddProduct = (prod) => {
      console.log("clicked");
      const sameProduct = cart.find((pd) => pd.key === prod.key);
      let count = 1;
      let newCart;
      if (sameProduct) {
         count = sameProduct.quantity + 1;
         sameProduct.quantity = count;
         const others = cart.filter((pd) => pd.key !== prod.key);
         newCart = [...others, sameProduct];
      } else {
         prod.quantity = 1;
         newCart = [...cart, prod];
      }
      setCart(newCart);
      addToDatabaseCart(prod.key, count);
   };

   return (
      <div className="shop-container">
         {/* Showing All Products ============================ */}
         <div className="product-container">
            <input
               type="text"
               onChange={(e) => setSearch(e.target.value)}
               placeholder="search products"
            />
            <button className="btn btn-primary">Search</button>
            <br />

            {products.map((prod) =>
               loading ? (
                  <Loading />
               ) : (
                  <Product
                     key={prod.key}
                     showAddToCart={true}
                     product={prod}
                     handleAddProduct={handleAddProduct}
                  />
               )
            )}
         </div>

         {/* Showing Cart =========================== */}
         <Cart cart={cart} className="">
            <Link to="/review">
               <button className="cart-button">Review Order</button>
            </Link>
         </Cart>
      </div>
   );
};

export default Shop;
