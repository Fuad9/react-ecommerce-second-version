import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Axios from "axios";

import Loading from "../../../utilities/Loading";

import Product from "../Product/Product";

const ProductDetails = () => {
   const { productKey } = useParams();
   const [product, setProduct] = useState({});
   const [loading, setLoading] = useState(false);

   /* Showing individual item by product key ==================== */
   useEffect(() => {
      const getData = async () => {
         try {
            setLoading(true);
            const response = await Axios.get(
               "https://frozen-everglades-38727.herokuapp.com/product/" + productKey
            );
            setProduct(response.data);
            setLoading(false);
         } catch (error) {
            setLoading(false);
         }
      };
      getData();
   }, [productKey]);

   return (
      <div>
         <Link to="/">
            <h1>Go to Shop</h1>
         </Link>
         <h2 className="text-center">Your Product Details</h2>
         {loading ? <Loading /> : <Product showAddToCart={false} product={product} />}
      </div>
   );
};

export default ProductDetails;
