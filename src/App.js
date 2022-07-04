// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// hooks
import useAuth from './hooks/useAuth';
// components
import RtlLayout from './components/RtlLayout';
import NotistackProvider from './components/NotistackProvider';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen, { ProgressBarStyle } from './components/LoadingScreen';
import ThemePrimaryColor from './components/ThemePrimaryColor';

// ----------------------------------------------------------------------

export default function App() {
  const { isInitialized } = useAuth();
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <RtlLayout>
          <NotistackProvider>
            <GlobalStyles />
            <ProgressBarStyle />
            <ScrollToTop />
            {isInitialized ? <Router /> : <LoadingScreen />}
          </NotistackProvider>
        </RtlLayout>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
