import { HapticTab } from "@/components/haptic-tab";
import CommonHeader from "@/components/header-view";
import { Colors } from "@/constants/theme";
import { useGetMe } from "@/features/authentication/shared/hooks/useGetMe";
import HomeLeftHeader from "@/features/pet-owner/home/components/HomeLeftHeader";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuth } from "@/lib/auth";
import { Tabs } from "expo-router";
import {
  CalendarHeart,
  CircleUserRound,
  House,
  MessageCircleHeart,
  SearchCheck,
} from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated: isLogged } = useAuth();
  useGetMe();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontFamily: "Montserrat-Bold",
        },
        tabBarStyle: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 80,
          paddingTop: 10,
          overflow: "hidden",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          headerShown: true,
          tabBarIcon: ({ color }) => <House size={28} color={color} />,
          header: () => <CommonHeader RightContent={<HomeLeftHeader />} />,
        }}
      />
      <Tabs.Screen
        name="providers"
        options={{
          title: "Dịch vụ",
          tabBarIcon: ({ color }) => <SearchCheck size={28} color={color} />,
        }}
      />
      <Tabs.Protected guard={isLogged}>
        <Tabs.Screen
          name="booking"
          options={{
            title: "Đặt lịch",
            tabBarIcon: ({ color }) => (
              <CalendarHeart size={28} color={color} />
            ),
            href: isLogged ? "/(tabs)/booking" : null,
          }}
        />
      </Tabs.Protected>

      <Tabs.Protected guard={isLogged}>
        <Tabs.Screen
          name="chat"
          options={{
            title: "Tin nhắn",
            tabBarIcon: ({ color }) => (
              <MessageCircleHeart size={28} color={color} />
            ),
            href: isLogged ? "/(tabs)/chat" : null,
          }}
        />
      </Tabs.Protected>

      <Tabs.Screen
        name="profile"
        options={{
          title: "Tôi",
          tabBarIcon: ({ color }) => (
            <CircleUserRound size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
