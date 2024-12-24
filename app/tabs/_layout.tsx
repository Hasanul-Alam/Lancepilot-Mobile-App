import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ tabBarLabel: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="inbox"
        options={{ tabBarLabel: "Inbox", headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        options={{ tabBarLabel: "Profile", headerShown: false }}
      />
      <Tabs.Screen
        name="menu"
        options={{ tabBarLabel: "Menu", headerShown: false }}
      />
    </Tabs>
  );
}
