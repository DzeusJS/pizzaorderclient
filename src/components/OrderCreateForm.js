import React, { useState } from "react";
import Constants from "../utilities.js/Constants";
export default function OrderCreateForm(props) {
  const initialFormData = Object.freeze({
    title: "order id",
    totalCost: 0,
    pizzas: [],
  });
  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const orderToCreate = {
      orderId: 0,
      title: formData.title,
      totalCost: formData.totalCost,
      pizzas: formData.pizzas,
    };
    const url = Constants.API_URL_CREATE_ORDER;
    fetch(url, {
      method: "POST",
      headers: {
        "totalCost-Type": "application/json",
      },
      body: JSON.stringify(orderToCreate),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert();
      });

    props.onOrderCreated(orderToCreate);
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">Create new order</h1>
      <div className="mt-5">
        <label className="h3 form-label">order title</label>
        <input
          value={formData.title}
          name="title"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mt-4">
        <label className="h3 form-label">order totalCost</label>
        <input
          value={formData.totalCost}
          name="totalCost"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mt-4">
        <label className="h3 form-label">order PIZZAS</label>
        <select
          value={formData.pizzas}
          name="pizzas"
          className="form-control"
          onChange={handleChange}
        >
          {props.pizzaSizes.map((pizza) => (
            <option key={pizza} value={pizza}>
              {pizza}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">
        Submit
      </button>
      <button
        onClick={() => props.onOrderCreated(null)}
        className="btn btn-dark btn-lg w-100 mt-5"
      >
        Cancel
      </button>
    </form>
  );
}
