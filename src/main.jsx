import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { ProtectedRoute } from "./components/index.js";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store/store.js";
import { Provider } from "react-redux";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const AddNewBlogPage = lazy(() => import("./pages/AddNewBlogPage.jsx"));
const BlogPage = lazy(() => import("./pages/BlogPage.jsx"));
const UpdatedBlogPage = lazy(() => import("./pages/UpdateBlogPage.jsx"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

// persistor.purge(); // To restart redux toolkit to initial state

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      // for all
      <Route path="" element={<HomePage />} />
      <Route path="blog/:id" element={<BlogPage />} />
      <Route path="*" element={<NotFoundPage />} />
      // only for unAuthorized
      <Route element={<ProtectedRoute isPublic={true} />}>
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
      // only for Authorized
      <Route element={<ProtectedRoute />}>
        <Route path="/blog/add-new" element={<AddNewBlogPage />} />
        <Route path="blog/update/:id" element={<UpdatedBlogPage />} />
        <Route path="profile" element={<UserProfilePage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}></RouterProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
