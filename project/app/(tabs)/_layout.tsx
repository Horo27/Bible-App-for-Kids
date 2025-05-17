import { Tabs } from 'expo-router';
import { Home, Book, Info } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#8A4FFF',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: '#8A4FFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
          headerTitle: 'Bible Stories',
        }}
      />
      <Tabs.Screen
        name="chapters"
        options={{
          title: 'Chapters',
          tabBarIcon: ({ color, size }) => <Book size={size} color={color} />,
          headerTitle: 'Bible Chapters',
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, size }) => <Info size={size} color={color} />,
          headerTitle: 'About',
        }}
      />
    </Tabs>
  );
}