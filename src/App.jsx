import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ProtectRoute from './components/auth/ProtectRoute';
import { LayoutLoader } from './components/layout/Loaders';
import { server } from './constants/config';
import { useDispatch, useSelector } from 'react-redux';
import { userExists, userNotExists } from './redux/reducers/auth';
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const GroupManagement = lazy(() => import("./pages/admin/GroupManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessageManagment = lazy(() => import("./pages/admin/MessageManagment"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import("./pages/Login"));
const Chats = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));

import { Toaster } from "react-hot-toast"
import { SocketProvider } from './socket';


function App() {

  const dispatch = useDispatch();
  const { user, loader } = useSelector(state => state.auth)

  useEffect(() => {
    axios.get(`${server}/api/v1/user/me`, { withCredentials: true }).then(res => {
      dispatch(userExists(res.data.user));
    }).catch(() => {
      dispatch(userNotExists())
    })
  }, [dispatch])
  return loader ? <LayoutLoader /> : (
    <Router>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<SocketProvider><ProtectRoute user={user} redirect="/login" /></SocketProvider>}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chats />} />
            <Route path="/groups" element={<Groups />} />
          </Route>
          <Route element={<ProtectRoute user={!user} redirect="/" />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagment />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster />

    </Router>
  )
}

export default App