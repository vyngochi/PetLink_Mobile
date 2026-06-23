import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ServiceDetailView } from '../../../features/pet-owner/provider-detail/service-detail/views/ServiceDetailView';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  const serviceId = typeof id === 'string' ? id : '';

  return <ServiceDetailView serviceId={serviceId} />;
}
