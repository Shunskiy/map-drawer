import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App";
import Map from "./Map";

const RoutesProvider = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route index element={<App />} />
        <Route path="map" element={<Map />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesProvider;
