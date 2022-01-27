import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

import { Route, Routes } from "react-router-dom";

import "./styles/global.scss";
function App() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route index element={<Home />} />
      <Route path="/rooms/new" element={<NewRoom />} />
      <Route path="/rooms/:id" element={<Room />} />
      <Route path="admin/rooms/:id" element={<AdminRoom />} />
    </Routes>
  );
}

export default App;
