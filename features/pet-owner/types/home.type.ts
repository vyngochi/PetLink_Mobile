import { LucideIcon } from 'lucide-react-native';

export interface QuickServiceType {
  id: string;
  name: string;
  iconName: string; // Used for LucideIcon mapping if needed
  bgColorClass: string;
  textColorClass: string;
}

export interface ClinicType {
  id: string;
  name: string;
  rating: number;
  distance: string;
  priceStart: number;
  imageUrl: string;
}

export interface PetCareTipType {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
}
