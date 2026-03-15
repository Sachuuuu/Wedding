import {
  CalendarHeart,
  Clock3,
  GlassWater,
  MapPinned,
  Shirt
} from "lucide-react";

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
    title: "Wedding Ceremony",
    description: "A warm gathering to witness the beginning of our forever.",
    icon: CalendarHeart
  },
  {
    title: "Reception",
    description: "A beautiful day of music, laughter, and celebration with loved ones.",
    icon: GlassWater
  },
  {
    title: "Venue",
    description: "Lotus Ballroom Shangri-La, Colombo",
    icon: MapPinned
  },
  {
    title: "Time",
    description: "Poruwa Ceremony at 09:30 AM · Reception at 10:00 AM to 02:30 PM",
    icon: Clock3
  },
  {
    title: "Dress Code",
    description: "Elegant attire or formal traditional wear.",
    icon: Shirt
  }
];
