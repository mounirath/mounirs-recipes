/**
 * French translations for the raw-materials catalog, keyed by material key.
 * Missing keys fall back to the Arabic content in materials.ts.
 */

export interface MaterialFrContent {
  /** French display name (for materials whose Arabic name is shown in recipes). */
  name?: string;
  role: string;
  description: string;
  specs: string[];
  safety: string[];
  alternatives: string[];
}

export const MATERIALS_FR: Record<string, MaterialFrContent> = {
  texapon: {
    name: "Texapon N70",
    role: "Détergent de base (tensioactif anionique)",
    description:
      "Tensioactif anionique concentré à 70 %, c'est le cœur de tout détergent : il produit la mousse et élimine les graisses et les salissures. Utilisé dans presque toutes les recettes, du liquide vaisselle au shampoing auto. Liquide très visqueux à l'origine, à diluer dans l'eau selon la formule.",
    specs: [
      "Aspect : liquide très visqueux (pâte translucide)",
      "Teneur active : 70 % ± 2",
      "pH (solution à 10 %) : 7 – 9",
      "Solubilité : se dissout facilement dans l'eau en remuant",
      "Conditionnement : fûts ou bidons de 20 – 230 kg",
    ],
    safety: [
      "Peut irriter les yeux et la peau sensible — portez des gants",
      "Éviter le contact direct avec les yeux ; rincer abondamment à l'eau",
    ],
    alternatives: [
      "SLES (même matière à d'autres concentrations)",
      "LABSA (acide sulfonique) après neutralisation du pH",
    ],
  },
  labsa: {
    name: "Acide sulfonique (LABSA)",
    role: "Détergent puissant économique",
    description:
      "Acide fort utilisé comme détergent principal dans les poudres et les liquides économiques. Il doit être neutralisé à la soude (NaOH) pour devenir le sulfonate actif. Plus dégraissant que le Texapon mais plus irritant pour la peau, c'est pourquoi on le mélange généralement avec des matières plus douces.",
    specs: [
      "Aspect : liquide brun foncé visqueux",
      "Teneur active : 96 % ± 2",
      "pH (pur) : fortement acide ~1 – 2",
      "Requiert : neutralisation à la NaOH jusqu'à pH 7 – 8 avant usage",
    ],
    safety: [
      "Acide corrosif pour la peau et les yeux — gants et lunettes obligatoires",
      "Ajouter lentement dans l'eau en remuant (réaction exothermique à la neutralisation)",
    ],
    alternatives: ["Texapon N70", "SLES 70 %"],
  },
  cocamide: {
    role: "Épaississant et stabilisant de mousse",
    description:
      "Tensioactif non ionique dérivé de la noix de coco. Sa fonction principale est d'augmenter la densité et la stabilité de la mousse et d'améliorer la viscosité. Utilisé avec le Texapon dans les liquides vaisselle et les shampoings pour renforcer le pouvoir nettoyant et la sensation de consistance.",
    specs: [
      "Aspect : liquide visqueux jaune pâle",
      "Teneur active : 85 – 90 %",
      "pH (solution à 10 %) : 8 – 10",
      "Solubilité : soluble dans l'eau et les alcools",
    ],
    safety: ["Éviter le contact avec les yeux", "Stocker à l'abri des fortes chaleurs"],
    alternatives: ["CDE", "Bétaïne (partiellement, pour la mousse)"],
  },
  cde: {
    role: "Stabilisant de mousse et épaississant",
    description:
      "Matière dérivée de l'huile de coco agissant comme stabilisant de mousse et agent de consistance. Semblable au Cocamide DEA, il le remplace dans les formules auto. Il renforce la stabilité de la mousse, surtout dans les shampoings auto et les produits moussants.",
    specs: [
      "Aspect : liquide visqueux ambré",
      "Teneur : rapport 1:1 ou 2:1 selon le type",
      "pH (solution à 10 %) : 9 – 11",
    ],
    safety: ["Éviter le contact avec les yeux", "Stocker à l'abri du grand froid (gélifie)"],
    alternatives: ["Cocamide DEA", "Cocamidopropyl bétaïne"],
  },
  betaine: {
    role: "Détergent doux complémentaire",
    description:
      "Tensioactif amphotère doux pour la peau. Ajouté avec le SLES pour adoucir le produit, enrichir la mousse crémeuse et stabiliser la viscosité. Indispensable dans les savons liquides pour les mains et les liquides vaisselle de qualité supérieure.",
    specs: [
      "Aspect : liquide clair légèrement teinté",
      "Teneur active : 30 % (typique)",
      "pH (pur) : 5 – 7",
      "Compatible avec : anioniques, cationiques et non ioniques",
    ],
    safety: ["Relativement doux — portez des gants pour les grandes quantités"],
    alternatives: ["Cocamide DEA", "SLES légèrement augmenté"],
  },
  "butyl-glycol": {
    role: "Solvant dégraissant",
    description:
      "Solvant organique puissant utilisé pour éliminer les graisses et les huiles. Essentiel dans les nettoyants four, moteur et vitres (favorise un séchage rapide sans traces). Se mélange bien à l'eau et confère un pouvoir dégraissant rapide.",
    specs: [
      "Aspect : liquide clair, légère odeur",
      "Densité : ~0,90 g/cm³",
      "Point d'éclair : ~62 °C",
      "Solubilité : miscible à l'eau et aux alcools",
    ],
    safety: [
      "Inflammable — tenir éloigné des flammes",
      "Utiliser dans un endroit bien ventilé",
      "Éviter le contact cutané prolongé",
    ],
    alternatives: [
      "Isopropanol (moins efficace sur les graisses)",
      "Propylène glycol (pour les couches légères)",
    ],
  },
  isopropanol: {
    role: "Alcool de nettoyage à séchage rapide",
    description:
      "Alcool à évaporation rapide utilisé dans les nettoyants vitres, lave-glaces et parfums d'intérieur. Il assure un séchage rapide sans traces et élimine certains germes. Base des sprays vitres avec l'eau et un peu de Texapon.",
    specs: [
      "Aspect : liquide clair, odeur alcoolique",
      "Pureté : 99,5 % ou 91 % selon le grade",
      "Densité : ~0,786 g/cm³",
      "Point d'éclair : ~12 °C (très inflammable)",
    ],
    safety: [
      "Très inflammable — tenir éloigné de toute étincelle ou flamme",
      "Utiliser dans un endroit bien ventilé",
      "Éviter d'inhaler directement",
    ],
    alternatives: ["Éthanol (absolu ou dénaturé)", "Butyl glycol (pour les graisses épaisses)"],
  },
  "propylene-glycol": {
    role: "Humectant, stabilisant et cosolvant",
    description:
      "Liquide clair visqueux peu volatil utilisé comme humectant, pour stabiliser la formule et lier l'eau aux autres composants. Il sert de support aux parfums et colorants et empêche le dessèchement des produits à évaporation rapide. L'une des matières les plus utilisées dans nos recettes.",
    specs: [
      "Aspect : liquide clair visqueux, inodore",
      "Densité : ~1,036 g/cm³",
      "Point de congélation : ~ -59 °C",
      "Solubilité : miscible à l'eau, aux alcools et aux acides",
    ],
    safety: [
      "Relativement sûr (utilisé en cosmétique et en alimentaire)",
      "Éviter le contact direct avec les yeux",
    ],
    alternatives: ["Glycérine (plus lourde et moins chère)", "Butyl glycol (dégraissage intensif)"],
  },
  glycerine: {
    role: "Humectant et stabilisant",
    description:
      "Polyol très épais utilisé comme humectant (retient l'eau) et stabilisant des formules. Il augmente la densité du produit et l'empêche de sécher ; utilisé dans les rénovateurs de tableau de bord et les savons liquides.",
    specs: [
      "Aspect : liquide clair très visqueux",
      "Pureté : 99,5 %",
      "Densité : ~1,26 g/cm³",
      "Solubilité : miscible à l'eau et aux alcools",
    ],
    safety: ["Très sûr", "Très visqueux — nettoyer la verrerie immédiatement"],
    alternatives: ["Propylène glycol"],
  },
  cetiol: {
    name: "Cétiol C5",
    role: "Émollient cosmétique",
    description:
      "Ester lipidique léger dérivé de la noix de coco. Il agit comme émollient et agent lustrant dans les produits pour tableau de bord et la rénovation des plastiques extérieurs. Il apporte brillance et un toucher soyeux sans effet gras.",
    specs: [
      "Aspect : huile claire légèrement jaunâtre",
      "Densité : ~0,86 g/cm³",
      "Toucher : léger, non gras",
      "Se mélange bien aux : huiles, alcools et à l'eau avec un cosolvant",
    ],
    safety: ["Sûr pour la peau", "Sèche en surface — refermer le flacon"],
    alternatives: ["Huile minérale légère", "Silicone liquide (mais plus lourd)"],
  },
  "citric-acid": {
    name: "Acide citrique",
    role: "Acide de nettoyage et détartrant",
    description:
      "Acide organique naturel utilisé pour dissoudre le tartre, nettoyer les salles de bain et ajuster le pH. Relativement sûr et d'action plus lente, mais très efficace sur le calcaire. À dissoudre d'abord dans un peu d'eau avant l'ajout.",
    specs: [
      "Aspect : poudre cristalline blanche",
      "Pureté : 99,5 – 100,5 %",
      "pH (solution à 1 %) : ~2,2",
      "Solubilité : 59 % dans l'eau à 20 °C",
    ],
    safety: [
      "Irrite les yeux — éviter toute projection oculaire",
      "Porter des gants aux concentrations élevées",
      "Ne jamais mélanger directement avec le chlore",
    ],
    alternatives: ["Acide lactique", "Acide formique (plus fort mais plus dangereux)"],
  },
  naoh: {
    name: "Hydroxyde de sodium (soude caustique)",
    role: "Alcali fort (neutralisation et nettoyage)",
    description:
      "Alcali caustique utilisé pour neutraliser les acides (comme le LABSA) et comme détergent puissant pour les graisses carbonisées des fours et cuisines. Sa réaction avec l'eau est fortement exothermique — toujours l'ajouter lentement dans l'eau, jamais l'inverse.",
    specs: [
      "Aspect : perles ou écailles blanches",
      "Pureté : 98 – 99 %",
      "pH (solution à 1 %) : ~14",
      "Réaction avec l'eau : fortement exothermique",
    ],
    safety: [
      "Très corrosif pour la peau et les yeux — équipement de protection complet obligatoire",
      "Verser les perles dans l'eau lentement, jamais l'inverse",
      "Stocker dans un contenant fermé, à l'abri de l'humidité",
    ],
    alternatives: ["Carbonate de sodium (beaucoup plus faible)"],
  },
  "sodium-hypochlorite": {
    name: "Hypochlorite de sodium (Eau de Javel)",
    role: "Blanchissant et désinfectant (chlore)",
    description:
      "La matière active de l'eau de Javel : elle blanchit et désinfecte avec puissance. Utilisée diluée (15-16 % actif). Ne jamais mélanger avec des acides, l'ammoniaque ou des parfums — cela libère du chlore gazeux toxique.",
    specs: [
      "Aspect : liquide jaune verdâtre",
      "Teneur active : 12 – 16 % (en Cl₂ actif)",
      "pH : 11 – 13 (alcalin stable)",
      "Se décompose à la lumière et à la chaleur — stockage opaque et frais",
    ],
    safety: [
      "Vapeurs nuisibles — bonne ventilation obligatoire",
      "Ne jamais mélanger avec des acides ou l'ammoniaque (chlore gazeux toxique)",
      "Flacons opaques à l'abri du soleil",
    ],
    alternatives: ["Peroxyde d'hydrogène (plus sûr mais plus faible)"],
  },
  hcl: {
    name: "Acide chlorhydrique",
    role: "Acide fort pour ciment et rouille",
    description:
      "Acide très fort utilisé pour nettoyer le ciment, les impuretés métalliques et éliminer la rouille. L'une des matières les plus dangereuses du catalogue — son usage exige une ventilation maximale, un équipement complet, et il ne doit jamais être mélangé au chlore.",
    specs: [
      "Aspect : liquide clair à jaune pâle",
      "Concentration : ~30 – 33 %",
      "Vapeurs suffoquantes dès l'ouverture du flacon",
    ],
    safety: [
      "Corrosif, vapeurs suffoquantes — équipement complet (gants, lunettes, masque)",
      "Utiliser en extérieur ou avec ventilation maximale",
      "Ne jamais mélanger avec le chlore ni les alcalis concentrés",
    ],
    alternatives: ["Acide citrique concentré (plus lent et plus sûr)"],
  },
  formol: {
    role: "Conservateur antibactérien",
    description:
      "Conservateur qui empêche le développement des bactéries et moisissures dans les produits aqueux. Les doses utilisées sont très faibles (0,1 – 0,5 %). Il s'ajoute en fin de fabrication, une fois les réactions terminées. Sa sécurité est débattue pour les produits de contact, mais il reste courant dans l'industrie ménagère traditionnelle.",
    specs: [
      "Aspect : liquide clair, odeur piquante",
      "Concentration : 37 % de formaldéhyde dans l'eau",
      "Dose typique : 0,1 – 0,5 %",
    ],
    safety: [
      "Odeur piquante — éviter d'inhaler",
      "Cancérogène potentiel à fortes doses — respecter les doses",
      "Tenir hors de portée des enfants",
    ],
    alternatives: ["Conservateur alternatif (benzoate / phénoxyéthanol)"],
  },
  meg: {
    name: "Monoéthylène glycol (MEG)",
    role: "Base du liquide de refroidissement",
    description:
      "Base du liquide de refroidissement moteur : elle abaisse le point de congélation et élève le point d'ébullition. À mélanger à l'eau distillée à ~50 % avec des inhibiteurs de corrosion. Toxique en cas d'ingestion malgré son goût sucré — tenir loin des enfants et des animaux.",
    specs: [
      "Aspect : liquide clair visqueux, inodore",
      "Densité : ~1,113 g/cm³",
      "Point de congélation (50 %) : ~ -37 °C",
      "Point d'ébullition : ~197 °C",
    ],
    safety: [
      "Toxique en cas d'ingestion — tenir loin des enfants et des animaux",
      "Éviter le contact cutané prolongé",
      "Ne pas déverser dans les égouts (toxique pour l'environnement)",
    ],
    alternatives: ["Propylène glycol (antigel moins toxique — véhicules récents)"],
  },
  fragrance: {
    name: "Parfum",
    role: "Odeur finale du produit",
    description:
      "Huiles parfumées concentrées ajoutées en fin de fabrication pour donner au produit son odeur caractéristique (citron, Marseille, lavande...). Doses faibles (0,1 – 0,5 %) car très concentrées. À dissoudre dans le propylène glycol ou l'alcool pour une répartition homogène.",
    specs: [
      "Aspect : liquide huileux concentré",
      "Dose typique : 0,1 – 0,5 %",
      "À dissoudre dans : PG ou éthanol avant l'ajout",
    ],
    safety: ["Ne pas appliquer pur sur la peau", "Inflammable — tenir éloigné des flammes"],
    alternatives: [
      "Huiles essentielles naturelles (dose doublée)",
      "Sans parfum (produit neutre)",
    ],
  },
  nacl: {
    name: "Sel de table",
    role: "Modificateur de viscosité",
    description:
      "Le sel de table ordinaire sert à ajuster la viscosité des liquides détergents. À ajouter progressivement en remuant — un excès fluidifie à nouveau le produit ; ajoutez donc par petites doses en surveillant la consistance.",
    specs: [
      "Aspect : cristaux blancs",
      "Pureté : alimentaire 99 % ou technique",
      "Dose typique : 0,5 – 2 %",
      "Remarque : pic vers 2 – 3 % puis le produit se fluidifie",
    ],
    safety: [
      "Sûr",
      "Corrosif pour l'inox avec le temps — utilisez des récipients plastiques",
    ],
    alternatives: ["Sel technique (moins cher)"],
  },
  xanthan: {
    role: "Épaississant (formation de gel)",
    description:
      "Polymères naturels qui épaississent les solutions aqueuses et transforment le liquide en gel (comme le gel WC). À disperser lentement sous agitation constante, ou à prémélanger avec la glycérine pour éviter les grumeaux.",
    specs: [
      "Aspect : poudre blanche légère",
      "Dose typique : 0,3 – 1 %",
      "Exige une agitation constante jusqu'à dissolution complète",
    ],
    safety: ["Sûr", "Grumelle vite — prémélangez-la avec un autre liquide"],
    alternatives: ["Sel (pour une viscosité liquide uniquement)", "Carbomer (gel translucide)"],
  },
  ethanol: {
    name: "Éthanol",
    role: "Alcool solvant et parfumant",
    description:
      "Alcool éthylique utilisé comme solvant des parfums et des sprays de nettoyage rapide. Il s'évapore vite et laisse une surface propre. Sert aussi dans les sprays anti-insectes et les désodorisants.",
    specs: [
      "Aspect : liquide clair, odeur alcoolique",
      "Pureté : 96 % (absolu) ou dénaturé",
      "Point d'éclair : ~13 °C (très inflammable)",
    ],
    safety: [
      "Très inflammable",
      "Utiliser dans un endroit bien ventilé",
      "Éviter d'inhaler directement",
    ],
    alternatives: ["Isopropanol (évaporation plus lente, plus dégraissant)"],
  },
  paraffin: {
    name: "Huile de paraffine",
    role: "Huile de lustrage et base de cire",
    description:
      "Huile minérale légère utilisée comme base des lustrants bois et meubles. Elle véhicule la cire et apporte brillance et protection de surface. À mélanger avec la cire chaude au bain-marie.",
    specs: [
      "Aspect : huile claire visqueuse",
      "Densité : ~0,85 g/cm³",
      "Non miscible à l'eau — se mélange aux solvants organiques",
    ],
    safety: ["Légèrement inflammable", "Surface glissante — nettoyer immédiatement"],
    alternatives: ["Cétiol C5 (plus léger)", "Huile de silicone (brillance supérieure)"],
  },
  carnauba: {
    name: "Cire de carnauba",
    role: "Cire de polissage naturelle",
    description:
      "La plus dure des cires naturelles ; utilisée dans la cire carrosserie et le lustrant bois. Elle forme une couche protectrice et une brillance durable. À dissoudre au bain-marie tiède (60 °C) avec l'huile et le solvant.",
    specs: [
      "Aspect : écailles ou blocs jaunâtres",
      "Point de fusion : 82 – 86 °C",
      "Origine : végétale (feuilles de palmier brésilien)",
    ],
    safety: [
      "Manipuler chaud — attention aux brûlures",
      "Stocker à l'abri de la chaleur",
    ],
    alternatives: ["Cire d'abeille (plus souple)", "Cire polymère synthétique"],
  },
  "corrosion-inhibitor": {
    name: "Inhibiteur de corrosion",
    role: "Protection des métaux dans les liquides de refroidissement",
    description:
      "Additif chimique qui empêche la corrosion des métaux du circuit de refroidissement (fer, aluminium, cuivre). Indispensable avec le MEG car le glycol brut provoque une corrosion progressive. Dose de 1 – 2 %.",
    specs: [
      "Aspect : liquide ou poudre concentrée",
      "Dose typique : 1 – 2 %",
    ],
    safety: ["Suivre les instructions du fournisseur", "Éviter le contact avec les yeux"],
    alternatives: ["Aucune alternative — indispensable dans le liquide de refroidissement"],
  },
  "anti-foam": {
    role: "Anti-mousse pour liquides de refroidissement",
    description:
      "Additif qui empêche la formation de mousse dans les liquides de refroidissement lors de la rotation de la pompe. À très faible dose (0,1 – 0,3 %), il préserve l'efficacité du refroidissement et évite les bulles.",
    specs: ["Aspect : émulsion liquide", "Dose typique : 0,1 – 0,3 %"],
    safety: ["Sûr selon les instructions du fournisseur"],
    alternatives: ["Pas de substitut direct"],
  },
  cod: {
    role: "Détergent spécial jantes",
    description:
      "Détergent technique spécialisé utilisé dans la formule de rénovation des jantes pour éliminer la poussière de frein et les graisses tenaces. S'ajoute après le Texapon pour renforcer le pouvoir détergent.",
    specs: ["Aspect : liquide brun clair", "Dose typique : 3 – 5 %"],
    safety: ["Porter des gants", "Éviter le contact avec les yeux"],
    alternatives: ["Butyl glycol (plus dégraissant)"],
  },
  dye: {
    name: "Colorant",
    role: "Identité visuelle du produit",
    description:
      "Colorants liquides concentrés ajoutés à très faible dose (0,1 – 0,2 %) pour donner au produit sa couleur caractéristique (bleu pour les vitres, vert pour le tableau de bord...). À dissoudre d'abord dans un peu d'eau pour une répartition homogène.",
    specs: ["Aspect : liquide concentré", "Dose typique : 0,05 – 0,2 %"],
    safety: ["Tache les mains et les surfaces — manipuler avec soin"],
    alternatives: ["Sans colorant (produit translucide)"],
  },
  "tea-tree": {
    name: "Huile d'arbre à thé",
    role: "Désinfectant naturel",
    description:
      "Huile essentielle aux propriétés antibactériennes et antifongiques. Utilisée dans les désinfectants naturels pour surfaces. À ajouter en fin de fabrication car elle est volatile.",
    specs: [
      "Aspect : huile claire, odeur herbacée",
      "Dose typique : 0,5 – 1 %",
    ],
    safety: ["Généralement non irritante", "Éviter le contact avec les yeux"],
    alternatives: ["Huile de lavande (odeur plus douce)", "Désinfectant synthétique"],
  },
  turpentine: {
    name: "Térébenthine",
    role: "Solvant des cires et huiles",
    description:
      "Solvant naturel dérivé du pin, utilisé dans le lustrant bois pour dissoudre et répartir la cire. Évaporation forte et odeur caractéristique.",
    specs: [
      "Aspect : liquide clair, odeur de pin",
      "Point d'éclair : ~35 °C",
    ],
    safety: ["Inflammable", "Utiliser avec une bonne ventilation"],
    alternatives: ["White spirit (synthétique)"],
  },
  "marseille-soap": {
    name: "Savon de Marseille",
    role: "Base de nettoyage naturelle (savon traditionnel)",
    description:
      "Savon traditionnel à base d'huile d'olive, pilier des recettes de lessive et de nettoyage naturels. Râpé puis dissous dans l'eau tiède, il donne une solution nettoyante douce pour la peau et efficace sur les salissures courantes. Le choix idéal pour des produits sans additifs chimiques de synthèse.",
    specs: [
      "Aspect : cubes ou copeaux faciles à râper",
      "Ingrédient principal : huile d'olive (72 % ou plus)",
      "Solubilité : se dissout dans l'eau tiède en remuant",
      "Usage : 10–50 % selon la recette (liquide ou poudre)",
    ],
    safety: [
      "Sûr et doux pour la peau",
      "Alcalin naturel — ne pas utiliser sur laine ni soie",
    ],
    alternatives: [
      "Savon noir (plus dégraissant)",
      "Savon de Castille liquide (prêt à l'emploi)",
    ],
  },
  "black-soap": {
    name: "Savon noir",
    role: "Nettoyant naturel puissant multi-usages",
    description:
      "Savon traditionnel d'huile d'olive et de potasse : liquide brun huileux concentré. Très efficace sur les graisses et les taches tenaces, utilisé pour la vaisselle, la lessive et les sols. 100 % naturel et entièrement biodégradable.",
    specs: [
      "Aspect : liquide huileux brun foncé",
      "Base : huile d'olive + potasse (alcalin naturel)",
      "Dose typique : 5–12 %",
      "Entièrement biodégradable",
    ],
    safety: [
      "Concentré — toujours diluer dans l'eau",
      "Éviter le contact avec les yeux ; rincer à l'eau en cas de contact",
    ],
    alternatives: [
      "Savon de Marseille (plus doux)",
      "SLES dilué (version synthétique)",
    ],
  },
  "castile-soap": {
    name: "Savon de Castille",
    role: "Savon liquide végétal multi-usages",
    description:
      "Savon liquide végétal concentré fabriqué à partir d'huiles végétales (olive, coco...). Très doux pour la peau, c'est la base du savon pour les mains naturel et des nettoyants doux. À diluer dans l'eau distillée et à parfumer aux huiles essentielles.",
    specs: [
      "Aspect : liquide concentré clair à translucide",
      "Base : huiles végétales + potasse",
      "Dose typique : 20–30 % du produit final",
      "Diluer dans l'eau distillée pour éviter la sur-viscosité",
    ],
    safety: ["Très sûr pour la peau", "Éviter le contact avec les yeux"],
    alternatives: [
      "Savon de Marseille dissous (moins cher)",
      "Savon pour les mains commercial (alternative synthétique)",
    ],
  },
  "baking-soda": {
    name: "Bicarbonate de soude",
    role: "Nettoyant doux et déodorant naturel",
    description:
      "Poudre blanche douce utilisée dans les recettes naturelles comme adjuvant de lavage, déodorant et adoucissant léger. Elle renforce le pouvoir lavant et adoucit l'eau. Matière très sûre, disponible partout à prix minime.",
    specs: [
      "Aspect : poudre cristalline blanche",
      "Pureté : grade alimentaire largement disponible",
      "pH : ~8,3 (légèrement alcalin)",
      "Dose typique : 1–30 % selon la recette",
    ],
    safety: ["Très sûr (grade alimentaire)", "Conserver au sec"],
    alternatives: ["Cristaux de soude (plus puissants, moins doux)"],
  },
  "soda-crystals": {
    name: "Cristaux de soude",
    role: "Détergent puissant et dégraissant naturel",
    description:
      "Carbonate de sodium hydraté — poudre puissante utilisée dans les lessives en poudre naturelles pour dégraisser, enlever les taches d'huile et adoucir l'eau dure. Plus fort que le bicarbonate mais plus alcalin, on le combine donc avec lui pour équilibrer douceur et efficacité.",
    specs: [
      "Aspect : cristaux ou poudre blanche",
      "Composition : carbonate de sodium hydraté (Na₂CO₃)",
      "pH : ~11,5 (fortement alcalin)",
      "Dose typique : 10–20 % des poudres",
    ],
    safety: [
      "Irrite la peau — portez des gants pour les grandes quantités",
      "Conserver dans un contenant hermétique, à l'abri de l'humidité",
    ],
    alternatives: ["Bicarbonate de soude (plus doux mais plus faible)"],
  },
  "white-vinegar": {
    name: "Vinaigre blanc",
    role: "Acide naturel contre le tartre, brillance",
    description:
      "Acide acétique dilué (~8 %) — la base du nettoyage naturel : il dissout le calcaire, fait briller le vitrage et neutralise les odeurs. Toujours diluer dans l'eau, et ne jamais mélanger avec le chlore (gaz toxique). À éviter sur le marbre et la pierre naturelle.",
    specs: [
      "Aspect : liquide clair",
      "Concentration : acide acétique ~8 %",
      "Dose typique : 5–25 % selon l'usage",
      "Disponible partout à prix très bas",
    ],
    safety: [
      "Ne jamais mélanger avec le chlore ou l'ammoniaque (gaz chlore toxique)",
      "Ne pas utiliser sur marbre, pierre naturelle ou bois non traité",
    ],
    alternatives: [
      "Acide citrique (plus fort sur le calcaire)",
      "Jus de citron (plus doux, plus cher)",
    ],
  },
  "essential-oil": {
    name: "Huile essentielle",
    role: "Parfum naturel et bienfaits additionnels",
    description:
      "Huiles essentielles naturelles concentrées (citron, lavande, eucalyptus, arbre à thé...) utilisées dans les recettes naturelles pour parfumer et pour leurs propriétés (antibactérienne pour l'arbre à thé, fraîche pour l'eucalyptus). À ajouter en fin de fabrication à très faible dose.",
    specs: [
      "Aspect : liquide huileux très concentré et odorant",
      "Dose typique : 0,5–1 %",
      "Variétés courantes : citron, lavande, eucalyptus, arbre à thé, menthe",
      "Prémélanger avec un solvant (PG ou alcool) pour une répartition homogène",
    ],
    safety: [
      "Concentré — ne pas appliquer pur sur la peau",
      "Certaines huiles sont déconseillées aux femmes enceintes et aux animaux (se renseigner avant usage)",
    ],
    alternatives: [
      "Parfum de synthèse (moins cher, tenue plus longue)",
      "Sans parfum (produit neutre)",
    ],
  },
};
