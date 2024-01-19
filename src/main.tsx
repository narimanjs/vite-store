import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Menu from './components/Pages/Menu/Menu.tsx';
import Layout from './layout/Layout/Layout.tsx';
import Cart from './components/Pages/Cart/Cart.tsx';
import ErrorPage from './components/Pages/Error/Error.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Menu />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
