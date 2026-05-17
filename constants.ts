import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'The Silent Signal',
    category: 'Audio Spectrum',
    description: 'Visualizing the background radiation of the universe as an endless loop.',
    year: 'UNKNOWN',
    color: '#ef4444' // red-500
  },
  {
    id: '02',
    title: 'Glass Cathedral',
    category: 'Virtual Monument',
    description: 'A procedural structure that only exists when no one is looking.',
    year: '2025',
    color: '#ffffff' // white
  },
  {
    id: '03',
    title: 'Echo Chamber',
    category: 'Social Sculpture',
    description: 'An infinite recursive mirror of digital discourse.',
    year: '2024',
    color: '#64748b' // slate-500
  },
  {
    id: '04',
    title: 'Obsidian Monolith',
    category: 'Data Storage',
    description: 'The final repository of deleted secrets.',
    year: 'ETERNAL',
    color: '#000000' // black (will render as dark grey/void)
  },
  {
    id: '05',
    title: 'Red Horizon',
    category: 'Simulation',
    description: 'A sunset that never completes its descent.',
    year: '2024',
    color: '#f87171' // red-400
  },
  {
    id: '06',
    title: 'Void State',
    category: 'Anti-Matter',
    description: 'The absence of interface. Pure interaction.',
    year: 'NULL',
    color: '#cbd5e1' // slate-300
  }
];

export const PHILOSOPHY_AXIOMS = [
  {
    roman: 'I',
    title: 'Truth',
    tagline: 'Destroy All Secrets',
    content: 'Information wants to be free, but truth wants to be hidden. We exist at the intersection of exposure and encryption.',
    businessValue: 'Verification-first marketplace builds lasting trust. Every product authenticated, every transaction transparent.',
    icon: 'Eye'
  },
  {
    roman: 'II',
    title: 'Permanence',
    tagline: 'Eternal Stand',
    content: 'In a world of ephemeral feeds and vanishing stories, we build the unmoving. The permanent. The eternal.',
    businessValue: 'Long-term partnerships over quick wins. We architect solutions that outlast trends and survive cycles.',
    icon: 'Infinity'
  },
  {
    roman: 'III',
    title: 'Perspective',
    tagline: 'Outside the Walls',
    content: 'We do not operate within the garden. We stand outside, in the wild, observing the structure from the void.',
    businessValue: 'Unconventional insights from unconventional places. We see patterns others miss.',
    icon: 'Compass'
  },
  {
    roman: 'IV',
    title: 'Focus',
    tagline: 'Silence is Golden',
    content: 'The loudest message is the one not sent. We engineer the pause, the breath, the gap in the code.',
    businessValue: 'Strategic restraint drives impact. Every feature earns its place, every release means something.',
    icon: 'VolumeX'
  }
];

export const BRAND_PILLARS = [
  {
    id: 'verification',
    title: 'Verified',
    tagline: 'Every product. Every transaction. Verified.',
    description: 'Blockchain-backed verification ensures 100% authenticity from manufacture to delivery.',
    businessAngle: 'Trust is the currency of e-commerce. We mint it.'
  },
  {
    id: 'transparency',
    title: 'Transparency',
    tagline: 'The new standard in commerce',
    description: 'No hidden fees. No虚假 reviews. No fake products. Just honest commerce.',
    businessAngle: 'In a world of doubt, we are the answer.'
  },
  {
    id: 'innovation',
    title: 'Vision',
    tagline: 'See what others miss',
    description: 'AI-powered curation meets human-verified quality control.',
    businessAngle: 'The future of commerce is already here. We just make it visible.'
  },
  {
    id: 'community',
    title: 'Community',
    tagline: 'Outside the garden. In the wild.',
    description: 'A community of creators, vendors, and pioneers building the new standard.',
    businessAngle: 'Not a marketplace. A movement.'
  }
];

export const EXTERNAL_LINKS = {
  inkglass: {
    name: 'InkGlass AI',
    description: 'AI app with glassmorphism/e-ink aesthetic, featuring Markdown editor, improved error handling, loading skeletons, accessibility enhancements, and keyboard shortcuts',
    github: 'https://github.com/destroyallsecrets/inkglass-ai',
    vercel: 'https://inkglass-ai.vercel.app'
  }
};