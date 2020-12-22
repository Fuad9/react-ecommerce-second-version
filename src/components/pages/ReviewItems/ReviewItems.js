import React from "react";

const ReviewItems = (props) => {
   const { name, quantity, price, key } = props.product;

   return (
      <div>
         <h3 className="product-name">{name}</h3>
         <h5>Quantity: {quantity}</h5>
         <h5>Price: {price}</h5>
         <button className="btn btn-danger" onClick={() => props.removeItem(key)}>
            Remove
         </button>
      </div>
   );
};

export default ReviewItems;
