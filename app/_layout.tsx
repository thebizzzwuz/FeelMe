import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return(
    <>
      <PaperProvider theme={theme}>
        <StatusBar style="light" />
        <Stack>
          <Stack.Screen 
          name="index"
          options={{
            headerTitle: 'Feel Me',
          }}
          />
          <Stack.Screen 
          name="(tabs)"
          options={{
            headerShown: false,
          }}
          />
          <Stack.Screen 
          name="+not-found"
          options={{
          }}/>
        </Stack>
      </PaperProvider>
    </>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#56d3adff',
    accent: '#f1c40f',
    Background: '#25282E',
  },
};