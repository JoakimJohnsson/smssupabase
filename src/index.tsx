import React from "react";
import ReactDOM from "react-dom/client";
import "draft-js/dist/Draft.css";
import "./assets/css/main.scss";
import {App} from "./App";


const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}
