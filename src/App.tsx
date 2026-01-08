
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';

function App() {

  const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    children:[{
      path:"/landingpage",
      element:   <LandingPage/>,
    }
  ],
  },
]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
