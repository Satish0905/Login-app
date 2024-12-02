import React from "react";
import Login from "./log";
import Product from "./product";

export default function Home() {
  return (
    
    <div>
      <div className="fixed-form">
      <Login></Login>
      </div>
      <Product></Product>
    </div>
    
  );
}
