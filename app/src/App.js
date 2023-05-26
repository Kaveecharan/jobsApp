import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import AdminPage from './Pages/AdminPage';
import ErrorPage from './Pages/ErrorPage';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useSelector, useDispatch } from 'react-redux';
import AuthUser from './Components/AuthUser';
import { setUser } from './redux/userSlice'; 

const App = () => {
  const user = useSelector((state) => state.user.username);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const {getToken, getUser} = AuthUser()
  const dispatch = useDispatch()

  useEffect(() => {
    if (getToken) {
      const user_details = getUser()
      const user = { 
        username: user_details?.name,
        isAdmin: user_details?.role == 'admin' 
      }
      dispatch(setUser(user));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/" />} />
        {isAdmin && <Route path="/admin" element={<AdminPage />} />}
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default WrappedApp;
