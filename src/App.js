import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./components/homscreen/HomeScreen";
import Checkout from "./components/checkout/Checkout";

function App() {
  return (
    <Router>
      <div className="container">
        <HomeScreen />

        <Checkout />


        {/* <Routes>
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/checkout" element={<Checkout/>} />
        </Routes> */}

      </div>
    </Router>
  );
}

export default App;
