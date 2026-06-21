import React from 'react';
import { GuestProfileView } from '../../features/guest/guest-profile/views/GuestProfileView';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GuestProfile() {
  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <GuestProfileView />
    </SafeAreaView>
  );
}
