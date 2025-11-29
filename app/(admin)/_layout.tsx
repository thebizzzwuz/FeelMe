import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";
import {PaperProvider} from "react-native-paper";


export default function RootLayout() {
  return(
      <PaperProvider>
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#ffd33d', 
            headerStyle: {
                backgroundColor: '#25282E',
            },
            headerShadowVisible: false,
            headerTintColor: '#FFFFFF',
            tabBarStyle: {
                backgroundColor: '#25282E',       
            }
        }}
    >
      {/* <Tabs.Screen 
      name="index"
      options={{
        headerTitle: 'Feel Me',
        tabBarIcon: ({focused, color}) => ( 
            <Ionicons 
                name= {focused ? "home-sharp" : "home-outline"}
                size={24} 
                color= {color} />
        ),
      }}
      /> */}
      <Tabs.Screen name ="admin-dashboard"
      options={{
        headerTitle: 'Admin Dashboard',
        tabBarIcon: ({focused, color}) => ( 
            <Ionicons 
                name= {focused ? "information-circle" : "information-circle-outline"}
                size={24} 
                color= {color} />
        ),
      }}/>

    </Tabs>
      </PaperProvider>
  );
}
