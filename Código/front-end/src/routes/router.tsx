import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {
    CustomerRequest,
    LoginAdmin,
    MenuItems,
    Orders,
    PrivateRoute,
    Records,
    RegisterAdmin,
} from './imports';
import {useEffect, useState} from 'react';

const isAuthenticated = (): boolean => {
  return localStorage.getItem('isLogado') === 'true';
};

function Router() {
  const [auth, setAuth] = useState<boolean>(isAuthenticated());

  useEffect(() => {
    const handleStorageChange = () => {
      setAuth(isAuthenticated());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleLocalChange = () => {
      setAuth(isAuthenticated());
    };
    window.addEventListener('localStorageChange', handleLocalChange);
    return () => {
      window.removeEventListener('localStorageChange', handleLocalChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={auth ? <Navigate to="/admin/items" /> : <RegisterAdmin />} />
        <Route path="/login" element={auth ? <Navigate to="/admin/items" /> : <LoginAdmin />} />
        <Route element={<PrivateRoute isAuthenticated={auth} />}>
          <Route path="/admin/items" element={<MenuItems />} />
          <Route path="/admin/orders" element={<Orders />} />
        </Route>
        <Route path="/" element={<CustomerRequest />} />
        <Route path="/admin/records" element={<Records />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
