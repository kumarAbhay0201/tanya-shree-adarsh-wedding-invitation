import { Calendar, Clock, Heart, Sparkles } from 'lucide-react';

export const events = [
  { title: 'Sangeet Ceremony', image: '/sangeet.png', date: '27th November 2026', day: 'Friday', time: '4:00 PM Onwards', address: 'At our residence (House No. 52-C, Near Surmount International School Senior Wing, Taramandal, Gorakhpur)', dress: '', icon: Heart },
  { title: 'Haldi Ceremony', image: '/haldi.png', date: '28th November 2026', day: 'Saturday', time: 'Time to be announced', address: 'At our residence (House No. 52-C, Near Surmount International School Senior Wing, Taramandal, Gorakhpur)', dress: 'Purple', icon: Sparkles },
  { title: 'Mehndi Ceremony', image: '/mehndi.png', date: '29th November 2026', day: 'Sunday', time: 'Time to be announced', address: 'At our residence (House No. 52-C, Near Surmount International School Senior Wing, Taramandal, Gorakhpur)', dress: 'Green', icon: Calendar },
  { title: 'Wedding Ceremony', image: '/wedding.png', date: '30th November 2026', day: 'Monday', time: '7:00 PM Onwards', address: 'Railway Club, Gorakhpur', dress: 'Royal Traditional', icon: Clock }
];

export const initialWishes = [];

export const openingMessages = [
  'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥'
];

export const familyGroups = [
  { relation: 'Dada & Dadi', members: ['Shri. Jai Prakash Mall', 'Smt. Sumitra Singh'] },
  { relation: 'Papa & Mummy', members: ['Shri. Dhirendra Kumar Mall', 'Dr. Sunita Singh'] },
  { relation: 'Chacha & Chachi', members: ['Shri. Virendra Kumar Mall', 'Smt. Neetu Singh'] },
  { relation: 'Chachu & Chachi', members: ['Shri. Bhupendra Kumar Mall', 'Smt. Kanupa Mall'] },
  { relation: 'Bade Fufa & Badi Bua', members: ['Shri. Gyanendra Singh', 'Smt. Arti Singh'] },
  { relation: 'Chote Fufa & Choti Bua', members: ['Shri. Rahul Singh', 'Smt. Bharti Singh'] }
];

export const siblings = [
  'Shreya Mall', 'Aryan Singh', 'Pranjal Singh', 'Tanmay Singh', 'Nishant Mall',
  'Vanya Mall', 'Aaradhya Mall', 'Viraj Mall', 'Aarav Singh', 'Devansh Mall'
];
