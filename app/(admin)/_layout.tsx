import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";
import {PaperProvider} from "react-native-paper";


export default function RootLayout() {
  return(
      // <Tabs screenOptions={{ tabBarStyle: { display: 'none' } }} />
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
                name= {focused ? "speedometer" : "speedometer-outline"}
                size={24}
                color= {color} />
        ),
      }}/>

        <Tabs.Screen name ="viewStudy"
                     options={{
                         headerTitle: 'View Study',
                         tabBarIcon: ({focused, color}) => (
                             <Ionicons
                                 name= {focused ? "trending-up" : "trending-up-outline"}
                                 size={24}
                                 color= {color} />
                         ),
                     }}/>

        <Tabs.Screen name ="createStudy"
                     options={{
                         headerTitle: 'Create Study',
                         tabBarIcon: ({focused, color}) => (
                             <Ionicons
                                 name= {focused ? "clipboard" : "clipboard-outline"}
                                 size={24}
                                 color= {color} />
                         ),
                     }}/>

        <Tabs.Screen name ="createParticipants"
                     options={{
                         headerTitle: 'Create Participants',
                         tabBarIcon: ({focused, color}) => (
                             <Ionicons
                                 name= {focused ? "person-add" : "person-add-outline"}
                                 size={24}
                                 color= {color} />
                         ),
                     }}/>

    </Tabs>
      </PaperProvider>
  );
}

