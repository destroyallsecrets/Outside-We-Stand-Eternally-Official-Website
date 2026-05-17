import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'RUNit Basketball',
    category: 'Web App',
    description: 'RUNit is a concept created by a client and developed by Outside We Stand Eternally LLC.',
    year: '2026',
    color: '#ef4444',
    status: 'building',
    techStack: ['typescript', 'react', 'vercel'],
    repoUrl: 'https://github.com/destroyallsecrets/RUNit-Basketball',
    demoUrl: 'https://runit-basketball.vercel.app',
    stars: 0,
    views: 0,
    lastUpdated: '2026-04-23'
  },
  {
    id: '02',
    title: 'OWSE Official Website',
    category: 'Corporate Site',
    description: 'Vibe Coded. Stay mad. The official OWSE corporatepresence.',
    year: '2026',
    color: '#ffffff',
    status: 'live',
    techStack: ['typescript', 'react', 'nextjs', 'vercel', 'framer', 'tailwind'],
    repoUrl: 'https://github.com/destroyallsecrets/Outside-We-Stand-Eternally-Official-Website',
    demoUrl: 'https://master-web-architect.vercel.app',
    stars: 1,
    views: 100,
    lastUpdated: '2026-03-26'
  },
  {
    id: '03',
    title: 'Inkglass AI',
    category: 'AI Tool',
    description: 'AI-powered inkglass interface for creative applications.',
    year: '2026',
    color: '#06b6d4',
    status: 'live',
    techStack: ['typescript', 'react', 'vercel', 'openai'],
    repoUrl: 'https://github.com/destroyallsecrets/inkglass-ai',
    demoUrl: 'https://inkglass-ai.vercel.app',
    stars: 0,
    views: 0,
    lastUpdated: '2026-03-26'
  },
  {
    id: '04',
    title: 'Matrix Mapper',
    category: 'Visualization',
    description: 'Vibe Coded. Stay mad. A matrix visualization tool.',
    year: '2026',
    color: '#22c55e',
    status: 'archived',
    techStack: ['typescript', 'react', 'canvas'],
    repoUrl: 'https://github.com/destroyallsecrets/matrix-mapper',
    stars: 0,
    views: 0,
    lastUpdated: '2026-02-26'
  },
  {
    id: '05',
    title: 'Orthos Christianity Fact Check',
    category: 'Fact Check',
    description: 'Vibe Coded in the name of The LORD. A fact-checking tool for Christian claims.',
    year: '2026',
    color: '#3b82f6',
    status: 'archived',
    techStack: ['typescript', 'react', 'vercel'],
    repoUrl: 'https://github.com/destroyallsecrets/Orthos-Christianity-Fact-Check',
    demoUrl: 'https://christianity-fact-check.vercel.app',
    stars: 0,
    views: 0,
    lastUpdated: '2026-02-17'
  },
  {
    id: '06',
    title: 'OWSE QR Pro Generator 2.0',
    category: 'Utility',
    description: 'Vibe Coded. Stay mad. Professional QR code generator.',
    year: '2026',
    color: '#a855f7',
    status: 'archived',
    techStack: ['typescript', 'react', 'vercel'],
    repoUrl: 'https://github.com/destroyallsecrets/OWSE-QR-Pro-Generator-2.0',
    demoUrl: 'https://owse-qr-pro-generator-2-0.vercel.app',
    stars: 1,
    views: 10,
    lastUpdated: '2026-02-16'
  },
  {
    id: '07',
    title: 'Agentic Pro',
    category: 'AI Agent',
    description: 'Professional AI agent platform for autonomous tasks.',
    year: '2026',
    color: '#ec4899',
    status: 'building',
    techStack: ['typescript', 'react', 'vercel', 'openai'],
    repoUrl: 'https://github.com/destroyallsecrets/agentic-pro',
    stars: 0,
    views: 0,
    lastUpdated: '2026-02-10'
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

export const EXTERNAL_LINKS = {
  inkglass: {
    name: 'InkGlass AI',
    description: 'AI app with glassmorphism/e-ink aesthetic, featuring Markdown editor, improved error handling, loading skeletons, accessibility enhancements, and keyboard shortcuts',
    github: 'https://github.com/destroyallsecrets/inkglass-ai',
    vercel: 'https://inkglass-ai.vercel.app'
  }
};