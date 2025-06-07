import { MarketingFramework } from '../types';

export const MARKETING_FRAMEWORKS: MarketingFramework[] = [
  {
    name: 'AIDA',
    code: 'AIDA',
    description: 'Attention, Interest, Desire, Action',
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    name: 'PAS',
    code: 'PAS', 
    description: 'Problem, Agitation, Solution',
    color: 'bg-red-100 text-red-800 border-red-200'
  },
  {
    name: 'STDC',
    code: 'STDC',
    description: 'Star, Transition, Dream, Close',
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  {
    name: 'BAB',
    code: 'BAB',
    description: 'Before, After, Bridge',
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  {
    name: 'QUEST',
    code: 'QUEST',
    description: 'Qualify, Understand, Educate, Stimulate, Transition',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  {
    name: 'PASTOR',
    code: 'PASTOR',
    description: 'Problem, Amplify, Story, Testimonial, Offer, Response',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  }
];

export const detectFramework = (content: string): MarketingFramework => {
  const frameworks = MARKETING_FRAMEWORKS;
  
  // Simple content analysis simulation
  const lowerContent = content.toLowerCase();
  
  if (lowerContent.includes('problem') || lowerContent.includes('solution')) {
    return {
      ...frameworks.find(f => f.code === 'PAS')!,
      justification: 'Contenu axé sur la résolution de problèmes'
    };
  }
  
  if (lowerContent.includes('before') || lowerContent.includes('after')) {
    return {
      ...frameworks.find(f => f.code === 'BAB')!,
      justification: 'Structure avant/après identifiée'
    };
  }
  
  if (lowerContent.includes('story') || lowerContent.includes('testimonial')) {
    return {
      ...frameworks.find(f => f.code === 'PASTOR')!,
      justification: 'Présence d\'éléments narratifs et témoignages'
    };
  }
  
  // Default to AIDA
  return {
    ...frameworks.find(f => f.code === 'AIDA')!,
    justification: 'Framework polyvalent adapté au contenu'
  };
};