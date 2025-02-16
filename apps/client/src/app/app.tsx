import { Login } from "../components";
import { Routes, Route } from 'react-router-dom';
import { UserRegistration } from "../components/user_registration/user_registration"; 
import { NewToast } from "../components/new_toast/new_toast";




export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user_registration" element={<UserRegistration />} />
      <Route path="/new_toast" element={<NewToast />} />
      
    </Routes>
  );
}
