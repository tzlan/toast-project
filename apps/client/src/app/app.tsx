import { Login } from "../components";
import { Routes, Route } from 'react-router-dom';
import { User_registration } from "../components/user_registration/user_registration";  // ajoutez ce chemin selon votre structure


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user_registration" element={<User_registration />} />
    </Routes>
  );
}
