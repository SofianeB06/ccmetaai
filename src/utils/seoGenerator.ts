import { MarketingFramework } from '../types';

export const generateSEOContent = (content: string, framework: MarketingFramework) => {
  // Extract key information from content
  const words = content.split(' ').filter(w => w.length > 3);
  const keywords = words.slice(0, 5).join(' ');
  
  const titles = generateTitles(keywords, framework);
  const metaDescriptions = generateMetaDescriptions(keywords, framework);
  
  return { titles, metaDescriptions };
};

const generateTitles = (keywords: string, framework: MarketingFramework): string[] => {
  const baseTitle = keywords.substring(0, 40);
  
  switch (framework.code) {
    case 'AIDA':
      return [
        `${baseTitle} - Solution Innovante`,
        `Découvrez ${baseTitle} Maintenant`,
        `${baseTitle}: Transformez Votre Approche`
      ];
    case 'PAS':
      return [
        `Problème ${baseTitle}? Voici la Solution`,
        `${baseTitle}: Fini les Complications`,
        `Résolvez ${baseTitle} Définitivement`
      ];
    case 'BAB':
      return [
        `Avant/Après: ${baseTitle} Transformé`,
        `${baseTitle}: De 0 à Expert`,
        `Votre ${baseTitle} Avant vs Maintenant`
      ];
    case 'STDC':
      return [
        `${baseTitle}: Votre Rêve Devient Réalité`,
        `Transition vers ${baseTitle} Parfait`,
        `${baseTitle}: De l'Idée au Succès`
      ];
    case 'QUEST':
      return [
        `Guide Complet: ${baseTitle}`,
        `${baseTitle}: Questions & Solutions`,
        `Maîtrisez ${baseTitle} Facilement`
      ];
    case 'PASTOR':
      return [
        `${baseTitle}: Histoire de Réussite`,
        `Témoignage: ${baseTitle} qui Marche`,
        `${baseTitle}: Preuve par l'Exemple`
      ];
    default:
      return [
        `${baseTitle} - Solutions Professionnelles`,
        `Expertise ${baseTitle} Garantie`,
        `${baseTitle}: Votre Partenaire de Confiance`
      ];
  }
};

const generateMetaDescriptions = (keywords: string, framework: MarketingFramework): string[] => {
  const baseDesc = keywords.substring(0, 80);
  
  switch (framework.code) {
    case 'AIDA':
      return [
        `Captivez votre attention avec ${baseDesc}. Découvrez une solution qui éveillera votre intérêt et transformera votre désir en action concrète.`,
        `${baseDesc} attire, intéresse et inspire. Une approche unique qui génère l'envie d'agir immédiatement. Rejoignez-nous maintenant.`,
        `Attention garantie avec ${baseDesc}. De l'intérêt initial au désir profond, jusqu'à l'action décisive. Votre succès commence ici.`
      ];
    case 'PAS':
      return [
        `Votre problème ${baseDesc} vous préoccupe? Nous amplifions votre frustration pour mieux vous proposer la solution définitive.`,
        `${baseDesc} pose problème? Cette situation empire chaque jour. Heureusement, nous avons LA solution qui change tout.`,
        `Problème ${baseDesc} identifié. Les conséquences s'aggravent. Découvrez notre solution éprouvée qui résout tout immédiatement.`
      ];
    case 'BAB':
      return [
        `Avant: ${baseDesc} compliqué. Après: simplicité absolue. Découvrez le pont qui relie votre situation actuelle au succès désiré.`,
        `${baseDesc} transformé! De la difficulté initiale au résultat extraordinaire. Le chemin vers votre réussite commence maintenant.`,
        `Votre avant/après ${baseDesc} vous attend. Franchissez le pont vers une nouvelle réalité. Transformation garantie aujourd'hui.`
      ];
    case 'STDC':
      return [
        `${baseDesc}: de l'excellence à la transition parfaite. Votre rêve devient réalité grâce à notre approche personnalisée et efficace.`,
        `Partez de l'excellence ${baseDesc}, transitionnez en douceur vers vos rêves les plus fous. Conclusion naturelle et réussie assurée.`,
        `${baseDesc} d'exception mène à votre rêve ultime. Transition fluide, résultats extraordinaires. Votre succès commence ici.`
      ];
    case 'QUEST':
      return [
        `Questions sur ${baseDesc}? Nous qualifions, comprenons, éduquons, stimulons et facilitons votre transition vers le succès.`,
        `${baseDesc} démystifié: qualification, compréhension, éducation complète. Stimulation garantie pour une transition réussie.`,
        `Qualifiez votre ${baseDesc}, comprenez les enjeux, éduquez-vous efficacement. Stimulation et transition vers l'excellence assurées.`
      ];
    case 'PASTOR':
      return [
        `Problème ${baseDesc}? Notre histoire amplifie votre situation. Témoignages authentiques, offre exceptionnelle. Répondez maintenant.`,
        `${baseDesc} amplifié par notre histoire unique. Témoignages clients, offre irrésistible. Votre réponse détermine votre succès.`,
        `Histoire vraie: ${baseDesc} résolu. Témoignages probants, offre limitée dans le temps. Répondez avant qu'il ne soit trop tard.`
      ];
    default:
      return [
        `Solutions professionnelles ${baseDesc}. Expertise reconnue, résultats garantis. Faites confiance à notre savoir-faire éprouvé.`,
        `${baseDesc} avec l'excellence en standard. Notre expertise vous accompagne vers le succès. Partenaire de confiance depuis des années.`,
        `Professionnel ${baseDesc} certifié. Solutions sur-mesure, accompagnement personnalisé. Votre réussite est notre priorité absolue.`
      ];
  }
};

export const validateSEOContent = (title: string, metaDescription: string) => {
  return {
    titleLength: title.length,
    titleValid: title.length <= 65,
    metaLength: metaDescription.length,
    metaValid: metaDescription.length <= 155
  };
};
