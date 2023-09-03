import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "./store";
import GraphMap from "./components/GraphMap";
import Chart from "./components/Chart";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Contact />} />
          <Route path="/graphmap" element={<GraphMap />} />
          <Route path="/charts" element={<Chart />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
