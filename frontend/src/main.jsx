import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeRoute from './routes/HomeRoute.jsx';
import AddEmployeeRoute from './routes/AddEmployeeRoute.jsx';
import EmployeeListRoute from './routes/EmployeeListRoute.jsx';
import { Provider } from 'react-redux';
import { store } from './store/index.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      { path: '/', element: <HomeRoute></HomeRoute> },
      { path: '/employees', element: <EmployeeListRoute></EmployeeListRoute> },
      { path: '/add-employee', element: <AddEmployeeRoute></AddEmployeeRoute> },
    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
