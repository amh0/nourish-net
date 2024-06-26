import React from "react";
import ReactDOM from "react-dom/client";
import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import PageContextProvider from "./context/PageContext";
import { AuthContextProvider } from "./context/authContext";
TimeAgo.addDefaultLocale(es);
TimeAgo.addLocale(es);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
    <PageContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </PageContextProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
