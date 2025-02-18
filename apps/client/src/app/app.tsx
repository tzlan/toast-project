import { AdminEditUser, Login ,NotFound , UserRegistration , NewToast} from "../components";
import { Routes, Route } from 'react-router-dom';




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
