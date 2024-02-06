import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider
} from 'react-router-dom';
import { useAppSelector } from './hooks/hooks';
import { currentUser } from './store/slices/login/login-slice';
import Error404 from './components/error404';
import Library from "./components/library";
import Comic from './components/comic';
import Favorites from "./components/favorites";
import Purchases from "./components/purchases";
import App from './App';

const CustomRoute: React.FC = () => {
  const user = useAppSelector(currentUser);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />} errorElement={<Error404 />}>
        <Route index element={<Library />} />
        <Route path='page/:idLibrary?' element={<Library />} />
        <Route path='comic/:idComic' element={<Comic />} />
        <Route path='favorites' element={user ? <Favorites /> : <Navigate to='/' />} />
        <Route path='favorites/page/:idFavorite' element={user ? <Favorites /> : <Navigate to='/' />} />
        <Route path='purchases' element={user ? <Purchases /> : <Navigate to='/' />} />
        <Route path='purchases/page/:idPurchase' element={user ? <Purchases /> : <Navigate to='/' />} />
      </Route>
    )
  );
  
  return (
    <RouterProvider router={router} />
  );
};

export default CustomRoute;
