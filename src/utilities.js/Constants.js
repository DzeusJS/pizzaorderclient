const API_BASE_URL_DEVELOPMENT = "https://localhost:7259";
const API_BASE_URL_PRODUCTION = "https://appname.azurewebsites.net";

const ENDPOINTS = {
  GET_ALL_ORDERS: "get-all-orders",
  GET_ALL_TOPPINGS: "get-all-toppings",
  GET_ALL_PIZZAS: "get-all-pizzas",
  GET_ORDERS_BY_ID: "get-orders_by_id",
  CREATE_POST: "create-orders",
  UPDATE_POST: "update-orders",
  DELETE_POST_BY_ID: "delete-orders-by-id",
};
const development = {
  API_URL_GET_ALL_ORDERS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_ALL_ORDERS}`,
  API_URL_GET_ORDERS_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.GET_ORDERS_BY_ID}`,
  API_URL_CREATE_POST: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.CREATE_ORDER}`,
  API_URL_UPDATE_POST: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.UPDATE_ORDER}`,
  API_URL_DELETE_POST_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINTS.DELETE_ORDER_BY_ID}`,
};
const production = {
  API_URL_GET_ALL_ORDERS: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.GET_ALL_ORDERS}`,
  API_URL_GET_ALL_PIZZAS: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.GET_ALL_PIZZAS}`,
  API_URL_GET_ALL_TOPPINGS: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.GET_ALL_TOPPINGS}`,
  API_URL_GET_ORDERS_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.GET_ORDERS_BY_ID}`,
  API_URL_CREATE_POST: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.CREATE_ORDER}`,
  API_URL_UPDATE_POST: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.UPDATE_ORDER}`,
  API_URL_DELETE_POST_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINTS.DELETE_ORDER_BY_ID}`,
};

const Constants =
  process.env.NODE_ENV === "development" ? development : production;

export default Constants;