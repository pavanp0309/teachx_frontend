import "/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/antd/dist/reset.css";
import "./styles/index.css"
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store  from "./store/store.js";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Provider store={store}>
    <App />
    </Provider>
  </BrowserRouter>
);
