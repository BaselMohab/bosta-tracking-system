import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Error from './components/error/Error';
import Loader from './components/LoadingComponent/Loader';

const HomePage = lazy(() => import('./pages/home'));
const TrackingShipments = lazy(() => import('./pages/trackingShipments'));

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'shippments',
        element: <TrackingShipments />,
      },
    ],
  },
]);

function App() {
  return (
      <Suspense fallback={<div><Loader /></div>}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Suspense>
  );
}

export default App;
