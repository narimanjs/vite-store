/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout/Layout.tsx';
import Cart from './components/Pages/Cart/Cart.tsx';
import ErrorPage from './components/Pages/Error/Error.tsx';
// import Product from './components/Pages/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import AuthLayout from './layout/Auth/AuthLayout.tsx';
import Login from './components/Pages/Login/Login.tsx';
import Register from './components/Pages/Register/Register.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { Success } from './components/Pages/Succes/Success.tsx';

const Menu = lazy(() => import('./components/Pages/Menu/Menu.tsx'));
const Product = lazy(() => import('./components/Pages/Product/Product.tsx'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<>Loading.!..</>}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/success',
        element: <Success />,
      },
      {
        path: '/product/:id',
        element: (
          <Suspense fallback={<>Loading.!..!</>}>
            {' '}
            <Product />
          </Suspense>
        ),
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          // await new Promise<void>(resolve => {
          //   setTimeout(() => {
          //     resolve();
          //   }, 3000);
          // });
          const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          return data;
        },
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
