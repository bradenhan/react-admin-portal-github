import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

import { Provider } from "react-redux";
import { store,persisstore } from "./redux/store";

import { PersistGate } from "redux-persist/integration/react"; // 引入 PersistGate


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#00b96b",
        borderRadius: 3,
        fontSize: 12,
        size: 12,
      },
    }}
  >
    <BrowserRouter>
      <Provider store={store}> 
        <PersistGate loading={null} persistor={persisstore}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </ConfigProvider>
  // </React.StrictMode>
); 
reportWebVitals();
