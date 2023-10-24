import React, { useState } from "react";
import Constants from "../utilities.js/Constants";
export default function OrderUpdateForm(props) {
  const initialFormData = Object.freeze({
    title: props.order.title,
    totalcost: props.order.totalcost,
    pizzas: props.order.pizzas,
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

    const orderToUpdate = {
      orderId: props.order.orderId,
      title: formData.title,
      totalcost: formData.totalcost,
      pizzas: formData.pizzas,
    };
    const url = Constants.API_URL_UPDATE_ORDER;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderToUpdate),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert();
      });

    props.onOrderUpdated(orderToUpdate);
  };

  return (
    <form className="w-100 px-5">
      <h1 className="mt-5">Update the order titled "{props.order.title}".</h1>
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
        <label className="h3 form-label">order price</label>
        <input
          value={formData.totalcost}
          name="totalcost"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mt-4">
        <label className="h3 form-label">order price</label>
        <input
          value={formData.pizzas}
          name="pizzas"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-dark btn-lg w-100 mt-5">
        Submit
      </button>
      <button
        onClick={() => props.onOrderUpdated(null)}
        className="btn btn-dark btn-lg w-100 mt-5"
      >
        Cancel
      </button>
    </form>
  );
}
