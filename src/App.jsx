import { Route, Routes } from "react-router-dom";
import Spin from "./pages/spin";
import Login from "./pages/login";

function App() {
  return (
    <Routes>
      <Route index path="/login" element={<Login />} />
      <Route path="/" element={<Spin />} />
    </Routes>
  );
}

export default App;
