import "./App.css";
// import Button from "@mui/material/Button";
import { React } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/mainpage/MainPage";
import Details from "./components/details/Detail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/details",
    element: <Details />,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
