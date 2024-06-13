import React from 'react';
import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.scss';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <div>App Router</div>,
  },
];

const App: React.FC = () => {
  const router = createBrowserRouter(routes);

  return (
    <div styleName='app'>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
