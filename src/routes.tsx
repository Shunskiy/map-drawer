import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import Map from "./Map"

const RoutesProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<App />}></Route>
				<Route path="map" element={<Map />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default RoutesProvider;
