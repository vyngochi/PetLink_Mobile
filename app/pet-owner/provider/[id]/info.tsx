import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ProviderInfoView } from '../../../../features/pet-owner/provider-detail/provider-info/views/ProviderInfoView';

export default function ProviderInfoScreen() {
  const { id } = useLocalSearchParams();
  const providerId = typeof id === 'string' ? id : '';

  return <ProviderInfoView providerId={providerId} />;
}
