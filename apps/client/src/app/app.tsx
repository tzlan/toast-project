import {
  AdminEditUser,
  AdminNewToast,
  Login,
  NotFound,
  RecordPage,
  UserRegistration,
} from '../components';

import { Routes, Route } from 'react-router-dom';
import { NewToast } from '../components/new-toast';
import { ToastPast } from '../components/toast-past';
import { Criminal } from '../components/criminal';
import { Dashboard } from '../components/dashboard';
import { AdminDashboard } from '../components/admin-dashboard';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/login" element={<Login />} />

      {/**Admin routes */}
      <Route path="/admin-new-toast" element={<AdminNewToast />} />
      <Route path="/admin-edit-user" element={<AdminEditUser />} />
      <Route path="/edit-user" element={<AdminEditUser />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      {/**Form routes */}
      <Route path="/user-registration" element={<UserRegistration />} />
      <Route path="/new-toast" element={<NewToast />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/**Routes */}
      <Route path="/record-page" element={<RecordPage />} />
      <Route path="/toast-past" element={<ToastPast />} />
      <Route path="/criminal" element={<Criminal />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
