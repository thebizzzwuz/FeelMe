import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return(
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen 
        //name="(tabs)"
        name= 'preintervention'  // edit this to display on smartphone
        options={{
          title: 'Baseline Intervention', // edit this to display on smartphone
          headerShown: false,
        }}
        />
        <Stack.Screen 
        name="+not-found"
        options={{
        }}/>
      </Stack>
    </>
  );
}
