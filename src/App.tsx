import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { MenuLateral } from './shared/components';
import { AppThemeProvider } from './shared/contexts/ThemeContext';
import { DrawerProvider } from './shared/contexts';
import { Dashboard } from './pages';

export const App = () => {
  return (

    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>

          <Dashboard>
            <AppRoutes />
          </Dashboard>

        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>

  );
}