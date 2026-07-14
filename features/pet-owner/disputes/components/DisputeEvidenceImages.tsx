import { X } from "lucide-react-native";
import React, { useState } from "react";
import { Image, Modal, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { ApiDisputeEvidence } from "@/features/pet-owner/shared/types/booking.type";

type DisputeEvidenceImagesProps = {
  evidence: ApiDisputeEvidence[];
};

export function DisputeEvidenceImages({
  evidence,
}: DisputeEvidenceImagesProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!evidence || evidence.length === 0) return null;

  return (
    <>
      <View className="mt-3">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 8,
            paddingHorizontal: 4,
            paddingVertical: 4,
          }}
        >
          {evidence.map((item, index) => (
            <Pressable
              key={`${item.url}-${index}`}
              className="overflow-hidden rounded-xl bg-muted/20"
              onPress={() => setSelectedImage(item.url)}
            >
              <Image
                source={{ uri: item.url }}
                className="h-28 w-28"
                resizeMode="cover"
              />
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Modal
        visible={!!selectedImage}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <SafeAreaView className="flex-1 bg-black/90">
          <View className="flex-1">
            <View className="items-end mt-1 p-4">
              <Pressable
                onPress={() => setSelectedImage(null)}
                className="h-10 w-10 items-center justify-center rounded-full bg-white/20 active:bg-white/30"
              >
                <X size={24} color="#ffffff" />
              </Pressable>
            </View>
            <View className="flex-1 items-center justify-center px-4 pb-10">
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  className="h-full w-full"
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}
