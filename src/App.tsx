import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { AppThemeProvider } from './shared/contexts/ThemeContext';
import { AuthProvider, DrawerProvider } from './shared/contexts';
import { Dashboard } from './pages';

export const App = () => {
  return (

    <AuthProvider>
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