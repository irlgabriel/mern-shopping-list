import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import AppNavbar from "./components/AppNavbar";
import ItemModal from './components/ItemModal';
import ShoppingList from "./components/ShoppingList";
import "./App.css";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <ItemModal />

        <ShoppingList />
      </div>
    </Provider>
  );
}

export default App;
