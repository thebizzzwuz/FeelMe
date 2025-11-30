// import { Stack } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import { DefaultTheme, PaperProvider } from "react-native-paper";

// export default function RootLayout() {
//   return(
//     <>
//       <PaperProvider theme={theme}>
//         <StatusBar style="light" />
//         <Stack>
//           <Stack.Screen 
//           name="index"
//           options={{
//             headerTitle: 'Feel Me',
//           }}
//           />
//           {/* <Stack.Screen 
//           name="(tabs)"
//           options={{
//             headerShown: false,
//           }}
//           /> */}
//           <Stack.Screen 
//           name="+not-found"
//           options={{
//           }}/>
//         </Stack>
//       </PaperProvider>
//     </>
//   );
// }

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#56d3adff',
//     accent: '#f1c40f',
//     Background: '#25282E',
//   },
// };

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#56d3ad',
        tabBarStyle: { backgroundColor: '#25282E' },
      }}
    >
      <Tabs.Screen
        name="userDashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="pre-intervention"
        options={{
          title: 'Pre',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="pencil" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="post-intervention"
        options={{
          title: 'Post',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="check" color={color} size={size} />
          ),
        }}
      />
      {/* Add other tabs as needed */}
    </Tabs>
  );
}
