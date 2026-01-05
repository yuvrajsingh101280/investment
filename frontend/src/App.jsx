import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Dashboard from "./pages/Dasboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invest" element={<CreateInvestment />} />
      </Routes>
    </BrowserRouter>
  );
}
