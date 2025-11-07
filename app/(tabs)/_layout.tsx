import { Ionicons } from '@expo/vector-icons';
import { Tabs } from "expo-router";
import {hide} from "expo-splash-screen";


export default function RootLayout() {
  return(
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
      <Tabs.Screen name = "userDashboard"
      options={{
        headerTitle: hide,
          headerTitleAlign: "center",
          tabBarLabel: 'Participant Dashboard',
        tabBarIcon: ({focused, color}) => ( 
            <Ionicons 
                name= {focused ? "home-sharp" : "home-outline"}
                size={24} 
                color= {color} />
        ),
      }}
      />

        <Tabs.Screen name = "adminDashboard"
                     options={{
                         headerTitle: hide,
                         headerTitleAlign: "center",
                         tabBarLabel: 'Admin Dashboard',
                         tabBarIcon: ({focused, color}) => (
                             <Ionicons
                                 name= {focused ? "home-sharp" : "home-outline"}
                                 size={24}
                                 color= {color} />
                         ),
                     }}
        />

        <Tabs.Screen name = "createStudy"
                     options={{
                         headerTitle: hide,
                         headerTitleAlign: "center",
                         tabBarLabel: 'Create Study',
                         tabBarIcon: ({focused, color}) => (
                             <Ionicons
                                 name= {focused ? "flask-sharp" : "flask-outline"}
                                 size={24}
                                 color= {color} />
                         ),
                     }}
        />

      <Tabs.Screen name ="about"
      options={{
        headerTitle: 'About',
          tabBarLabel: 'About',
        tabBarIcon: ({focused, color}) => ( 
            <Ionicons 
                name= {focused ? "information-circle" : "information-circle-outline"}
                size={24} 
                color= {color} />
        ),
      }}/>
      <Tabs.Screen 
      name="+not-found"
      options={{
      }}/>
    </Tabs>
  );
}
