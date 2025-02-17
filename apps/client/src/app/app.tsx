import { Login } from "../components";
import { Routes, Route } from 'react-router-dom';
import { UserRegistration } from "../components/user-registration/user-registration"; 
import { NewToast } from "../components/new-toast/new-toast";
import {NotFound} from "../components/not-found/not-found";
import {AdminEditUser} from "../components/admin-edit-user/admin-edit-user";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user-registration" element={<UserRegistration />} />
      <Route path="/new-toast" element={<NewToast />} />
      <Route path="/edit-user" element={<AdminEditUser/>}/>
      <Route path='*' element={<NotFound/>} />
   
    </Routes>
  );
}
