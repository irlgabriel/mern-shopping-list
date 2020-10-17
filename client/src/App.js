import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import "./App.css";

function App() {
  useEffect(() => {
    console.log("dispatching loadUser")
    store.dispatch(loadUser);
  }, [])
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
