import React, { useState } from "react";
import Constants from "./utilities.js/Constants";
import OrderCreateForm from "./components/OrderCreateForm";
import OrderUpdateForm from "./components/OrderUpdateForm";
function App() {
  const [orders, setorders] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [pizzaSizes, setPizzaSizes] = useState([]);

  const [showingCreateNewOrderForm, setShowingCreateNewOrderForm] =
    useState(false);
  const [orderCurrentlyBeingUpdated, setOrderCurrentlyBeingUpdated] =
    useState(null);

  function getorders() {
    const url = Constants.API_URL_GET_ALL_ORDERS;
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((ordersFromServer) => {
        setorders(ordersFromServer);
      })
      .catch((error) => {
        console.log(error);
        alert();
      });
  }
  function getToppings() {
    const url = Constants.API_URL_GET_ALL_TOPPINGS; // Replace with actual URL
    fetch(url)
      .then((response) => response.json())
      .then((toppingsFromServer) => {
        setToppings(toppingsFromServer);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getPizzaSizes() {
    const url = Constants.API_URL_GET_ALL_PIZZA_SIZES; // Replace with actual URL
    fetch(url)
      .then((response) => response.json())
      .then((pizzaSizesFromServer) => {
        setPizzaSizes(pizzaSizesFromServer);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function deleteorder(orderId) {
    const url = `${Constants.API_URL_DELETE_order_BY_ID}/${orderId}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        onorderDeleted(orderId);
      })
      .catch((error) => {
        console.log(error);
        alert();
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {showingCreateNewOrderForm === false &&
            orderCurrentlyBeingUpdated === null && (
              <div>
                <h1>PIcOSSSS</h1>
                <div className="mt-5">
                  <button
                    onClick={getorders}
                    className="btn btn-dark btn-lg w-100"
                  >
                    Get orders from server
                  </button>
                  <button
                    onClick={() => setShowingCreateNewOrderForm(true)}
                    className="btn btn-secondary btn-lg w-100 mt-4"
                  >
                    Create new Order
                  </button>
                </div>
              </div>
            )}

          {orders.length > 0 &&
            showingCreateNewOrderForm === false &&
            orderCurrentlyBeingUpdated === null &&
            renderordersTable()}

          {showingCreateNewOrderForm && (
            <OrderCreateForm
              onOrderCreated={onOrderCreated}
              topping={toppings}
              pizzaSizes={pizzaSizes}
            />
          )}
          {orderCurrentlyBeingUpdated != null && (
            <OrderUpdateForm
              order={orderCurrentlyBeingUpdated}
              onOrderUpdated={onOrderUpdated}
              topping={toppings}
              pizzaSizes={pizzaSizes}
            />
          )}
        </div>
      </div>
    </div>
  );

  function renderordersTable() {
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col">orderId (PK)</th>
              <th scope="col">Title</th>
              <th scope="col">Total Price</th>
              <th scope="col">Pizzas</th>
              <th scope="col">Toppings</th>
              <th scope="col">CRUD operations</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <th scope="row">{order.orderId}</th>
                <td>{order.title}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.pizzas.map((pizza) => (
                    <div key={pizza.id}>{pizza.size}</div>
                  ))}
                </td>
                <td>
                  {order.toppings.map((topping) => (
                    <div key={topping.id}>{topping.name}</div>
                  ))}
                </td>

                <td>
                  <button
                    onClick={() => setOrderCurrentlyBeingUpdated(order)}
                    className="btn btn-dark btn-lg mx-3 my-3"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete the order title "${order.title}"?`
                        )
                      )
                        deleteorder(order.orderId);
                    }}
                    className="btn btn-secondary btn-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={() => setorders([])}
          className="btn btn-dark btn-lg w-100"
        >
          Empty orders ARRAY
        </button>
      </div>
    );
  }

  function onOrderCreated(createdorder) {
    setShowingCreateNewOrderForm(false);
    if (createdorder === null) return;
    alert(
      `order successfully created, After clicking ok, your new order titled "${createdorder.title}" will show up in the table`
    );
    getorders();
  }
  function onOrderUpdated(updatedorder) {
    setOrderCurrentlyBeingUpdated(null);
    if (updatedorder === null) {
      return;
    }

    let ordersCopy = [...orders];
    const index = ordersCopy.findIndex((ordersCopyorder, currentIndex) => {
      if (ordersCopyorder.orderId === updatedorder.orderId) {
        return true;
      }
    });
    if (index !== -1) {
      ordersCopy[index] = updatedorder;
    }
    setorders(ordersCopy);
    alert(
      `order succesfuly updated, after ok look for the with the title "${updatedorder.title}" in the table below to see updates. `
    );
  }
  function onorderDeleted(deletedorderId) {
    let ordersCopy = [...orders];
    const index = ordersCopy.findIndex((ordersCopyorder, currentIndex) => {
      if (ordersCopyorder.orderId === deletedorderId) {
        return true;
      }
    });
    if (index !== -1) {
      ordersCopy.splice(index, 1);
    }
    setorders(ordersCopy);
    alert("order successfuly deleted");
  }
}

export default App;
