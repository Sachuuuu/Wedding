import {
  CalendarHeart,
  Clock3,
  GlassWater,
  MapPinned,
  Shirt
} from "lucide-react";
import { siteConfig } from '@/lib/config';
export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Story", href: "#story" },
  { label: "Details", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "RSVP", href: "#rsvp" }
];

export const galleryImages = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Romantic gallery image 1"
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "Romantic gallery image 2"
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Romantic gallery image 3"
  },
  {
    src: "/images/gallery-4.jpg",
    alt: "Romantic gallery image 4"
  },
  {
    src: "/images/gallery-5.jpg",
    alt: "Romantic gallery image 5"
  },
  {
    src: "/images/gallery-6.jpg",
    alt: "Romantic gallery image 6"
  }
];

export const eventCards = [
  {
    title: `${siteConfig.ceremonyType}`,
    description: `${siteConfig.ceremonyDescription}`,
    icon: CalendarHeart
  },
  {
    title: "Reception",
    description: `${siteConfig.receptionDescription}`,
    icon: GlassWater
  },
  {
    title: "Venue",
    description: `${siteConfig.venue}`,
    icon: MapPinned
  },
  {
    title: "Time",
    description: `${siteConfig.time}`,
    icon: Clock3
  },
  {
    title: "Dress Code",
    description: `${siteConfig.dressCode}`,
    icon: Shirt
  }
];
