import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import RootNavigator from "./navigation/RootNavigator";
import { DataProvider } from './DataContext';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6F4E37',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
};

export default function App() {
  return (
      <DataProvider>
        <PaperProvider theme={theme}>
          <RootNavigator />
        </PaperProvider>
      </DataProvider>
  );
}
