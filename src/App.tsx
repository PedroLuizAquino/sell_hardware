import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeProvider } from './shared/contexts/ThemeContext';
import { AuthProvider, DrawerProvider } from './shared/contexts';
import { Dashboard } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const App = () => {
  return (

    <AuthProvider>
      <ToastContainer />
      <AppThemeProvider>
        <DrawerProvider>
          <BrowserRouter>

            <Dashboard>
              <AppRoutes />
            </Dashboard>

          </BrowserRouter>
        </DrawerProvider>
      </AppThemeProvider>

    </AuthProvider>

  );
}