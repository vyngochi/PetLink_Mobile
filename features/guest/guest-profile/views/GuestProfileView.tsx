import {
  Activity,
  ArrowRight,
  Globe,
  HelpCircle,
  Info,
  Plus,
  Stethoscope,
  User,
  Users,
} from "lucide-react-native";
import React from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { BentoItem } from "../components/BentoItem";
import { SettingsMenuItem } from "../components/SettingsMenuItem";

export function GuestProfileView() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View className="px-5 pt-4">
        <View className="flex-col items-center py-6 text-center">
          <View className="relative mb-6">
            <View
              className="flex items-center justify-center w-24 h-24 overflow-hidden border-4 rounded-full bg-secondary/10 border-card"
              style={{
                shadowColor: "#0f172a",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.08,
                shadowRadius: 24,
                elevation: 4,
              }}
            >
              <User className="text-secondary" size={48} />
            </View>
            <View className="absolute p-2 border-2 rounded-full -bottom-1 -right-1 bg-primary border-card">
              <Plus className="text-primary-foreground" size={16} />
            </View>
          </View>
          <Text className="mb-2 text-3xl text-center font-mbold text-foreground">
            Tham gia PetLink
          </Text>
          <Text className="font-default text-sm text-muted-foreground max-w-[280px] text-center">
            Tạo tài khoản để truy cập các dịch vụ chăm sóc thú cưng và chuyên gia
            của chúng tôi
          </Text>
        </View>

        <View className="flex-col gap-4 mb-8">
          <Pressable
            className="flex-row items-center justify-center w-full gap-2 rounded-full h-14 bg-primary active:opacity-90"
            style={{
              shadowColor: "#0f172a",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 12,
              elevation: 2,
            }}
          >
            <Text className="text-lg text-primary-foreground font-mbold">
              Đăng Ký
            </Text>
            <ArrowRight color={"white"} className="text-primary-foreground" size={20} />
          </Pressable>
          <Pressable className="flex-row items-center justify-center w-full border-2 rounded-full h-14 border-primary active:bg-primary/10">
            <Text className="text-lg text-primary font-mbold">Đăng Nhập</Text>
          </Pressable>
        </View>

        <View className="mb-8">
          <Text className="mb-4 text-xs tracking-widest uppercase font-mbold text-muted-foreground">
            Tại sao chọn PetLink?
          </Text>
          <View className="flex-row flex-wrap gap-4">
            <View className="w-full">
              <BentoItem
                title="Theo dõi sức khỏe thú cưng"
                description="Theo dõi lịch tiêm phòng, lịch sử khám bệnh và nhật ký sức khỏe hàng ngày."
                Icon={Activity}
                isLarge
              />
            </View>

            <View className="flex-row w-full gap-4">
              <View className="flex-1">
                <BentoItem
                  title="Đặt lịch hẹn với bác sĩ thú y"
                  description="Đặt lịch hẹn với các bác sĩ thú y uy tín"
                  Icon={Stethoscope}
                  iconBgColorClass="bg-secondary/20"
                  iconColorClass="text-secondary"
                />
              </View>
              <View className="flex-1">
                <BentoItem
                  title="Cộng đồng thú cưng"
                  description="Tham gia vào cộng đồng PetLink với những thú cưng khác và chia sẻ kinh nghiệm, mẹo chăm sóc thú cưng."
                  Icon={Users}
                  iconBgColorClass="bg-[#df852a]"
                  iconColorClass="text-white"
                />
              </View>
            </View>
          </View>
        </View>

        <View className="mb-4">
          <Text className="px-1 mb-2 text-xs tracking-widest uppercase font-mbold text-muted-foreground">
            Cài đặt & thông tin
          </Text>
          <View className="overflow-hidden border bg-card rounded-3xl border-border">
            <SettingsMenuItem title="Trợ giúp & Hỗ trợ" Icon={HelpCircle} />
            <SettingsMenuItem
              title="Ngôn ngữ"
              subtitle="Tiếng Việt"
              Icon={Globe}
            />
            <SettingsMenuItem title="Về PetLink" Icon={Info} isLast />
          </View>
        </View>

        <View className="relative h-48 mt-6 mb-8 overflow-hidden rounded-3xl">
          <ImageBackground
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVNXohnpv9prwchN6gYzzXPJV2sqPLkgBLFD9LkxZde4J_Q4hGPqKMbDXPEYJ0BvHgCAxMamnGOvqAV-B_SHqojkoFGVUq1c_LhgrKmvUHAZHI1FKmAdoEn_Yo8IXvK52NdUfIT7RHBZV_jhnbJ3Ze-oKC4gAC81x-S609C680T3ax1eHc5cHhWWlB3LdGfGLV1k2IZmZemeT5DsWy7vQXydvH5u3eqVwkKND_IdyV2VfzkizIFJzx4J5Dxt1W9OpQLWAYk4bjPmVS",
            }}
            className="w-full h-full"
            resizeMode="cover"
          >
            <View className="absolute inset-0 bg-primary/20" />
            <View className="absolute inset-0 flex-col justify-end p-4 bg-black/30">
              <Text className="text-lg text-white font-mbold">
                Chúng tôi luôn ở đây vì bạn.
              </Text>
            </View>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  );
}
