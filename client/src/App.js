import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <ShoppingList />
      </div>
    </Provider>
  );
}

export default App;
