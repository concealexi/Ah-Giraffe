import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import RootNavigator from "./navigation/RootNavigator";
import { DataProvider } from './DataContext';
import { initializeApp } from 'firebase/app';
import {firebaseConfig} from "./firebaseConfig";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6F4E37',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
};

initializeApp(firebaseConfig);

const App = () => {

  return (
      <DataProvider>
        <PaperProvider theme={theme}>
          <RootNavigator />
        </PaperProvider>
      </DataProvider>
  );
}

export default App;
