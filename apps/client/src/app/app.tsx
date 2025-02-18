import { AdminEditUser, AdminNewToast, Login ,NotFound , UserRegistration } from "../components";
import { Routes, Route } from 'react-router-dom';
import { NewToast } from "../components/new-toast";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      <Route path="/admin-new-toast" element={<AdminNewToast />} />
      <Route path="/admin-edit-user" element={<AdminEditUser/>}/>

      <Route path="/user-registration" element={<UserRegistration />} />
      <Route path="/new-toast" element={<NewToast />} />
      <Route path="/edit-user" element={<AdminEditUser/>}/>
  
      <Route path='*' element={<NotFound/>} />
   
    </Routes>
  );
}
