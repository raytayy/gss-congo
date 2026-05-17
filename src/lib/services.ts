/**
 * GSS Congo — Services catalogue.
 * Single source of truth for the 9 services. Consumed by:
 *   - Header (mega-panel)
 *   - Footer (services column)
 *   - ServicesBento (homepage)
 *   - Service hub page (/fr/services/, /en/services/)
 *   - Each service detail page
 *
 * Priority field drives the bento layout (top 3 get wide tiles).
 * Source: cahier des charges §4 + decision D4.
 */

export type Locale = 'fr' | 'en';

export type LocalisedString = Record<Locale, string>;

export interface Service {
  /** URL-safe slug per locale. Used in route generation. */
  slug: LocalisedString;
  /** Display name. Short — fits in 1-2 words on a tile. */
  name: LocalisedString;
  /** One-line description for tiles. ≤ 90 chars. */
  blurb: LocalisedString;
  /** SEO meta description (130-160 chars). Falls back to blurb if absent. */
  metaDescription?: LocalisedString;
  /** Long-form description for the detail page hero. */
  intro?: LocalisedString;
  /** What this service includes (3-6 bullets). */
  scope?: { fr: string[]; en: string[] };
  /** Who this is for. */
  audience?: LocalisedString;
  /** 1 = top priority, larger tile in bento. */
  priority?: 1 | 2 | 3;
  /** Bento sizing hint. Top 3 default to 'wide'. */
  span?: 'wide' | 'normal';
  /** Lucide icon name (custom-stroked at 1.5px in components). */
  icon: string;
  /** Path to hero image (relative to public/). Generated atmospheric photos. */
  image: string;
}

export const services: Service[] = [
  {
    slug: { fr: 'gardiennage-intervention', en: 'guarding-and-intervention' },
    name: { fr: 'Gardiennage & Intervention', en: 'Guarding & Intervention' },
    blurb: {
      fr: 'Présence statique et mobile, équipes en intervention sous 20 minutes.',
      en: 'Static and mobile presence, response teams within 20 minutes.',
    },
    metaDescription: {
      fr: "Gardiennage statique et mobile à Kinshasa. Équipes d'intervention sous 20 minutes, 24h/24, sur sites industriels, tertiaires et résidentiels.",
      en: 'Static and mobile guarding in Kinshasa. Response teams within 20 minutes, 24/7, across industrial, commercial and residential sites.',
    },
    intro: {
      fr: 'GSS analyse et étudie les risques et menaces de votre environnement, puis engage les moyens humains et techniques nécessaires pour un gardiennage efficace, sur mesure et selon vos besoins. Nous mettons en œuvre des moyens dédiés à la sécurisation de vos locaux pour prévenir tout risque d’intrusion, de dégradation et de vol.',
      en: 'GSS analyses and studies the risks and threats of your environment, then deploys the human and technical means required for effective bespoke guarding. We deploy dedicated resources to secure your premises against intrusion, damage, and theft.',
    },
    scope: {
      fr: [
        'Agents de prévention et de sécurité formés à nos protocoles',
        'Agents qualifiés SSIAP pour les sites soumis à la réglementation',
        'Agents cynophiles et maîtres-chiens pour la dissuasion renforcée',
        'Équipes mobiles d’intervention sous 20 minutes',
        'Coordination centrale et supervision en temps réel',
      ],
      en: [
        'Prevention and security agents trained to our protocols',
        'SSIAP-qualified agents for regulated sites',
        'Canine handlers and K9 teams for reinforced deterrence',
        'Mobile response teams within 20 minutes',
        'Central coordination and real-time supervision',
      ],
    },
    audience: {
      fr: 'Industries · Ambassades · Hôtellerie · BTP · Établissements recevant du public',
      en: 'Industries · Embassies · Hospitality · Construction · Public-facing venues',
    },
    priority: 1,
    span: 'wide',
    icon: 'Shield',
    image: '/images/services/gardiennage.jpg',
  },
  {
    slug: { fr: 'securite-residentielle', en: 'residential-security' },
    name: { fr: 'Sécurité Résidentielle', en: 'Residential Security' },
    blurb: {
      fr: 'Discrétion et constance pour résidences privées et VIP.',
      en: 'Discretion and consistency for private residences and VIPs.',
    },
    metaDescription: {
      fr: "Protection de résidences privées et VIP à Kinshasa. Gardiens dédiés, contrôle d'accès, levée de doute, discrétion et constance dans la durée.",
      en: 'Protection of private and VIP residences in Kinshasa. Dedicated guards, access control, doubt verification, discretion and long-term consistency.',
    },
    intro: {
      fr: 'Protéger un foyer ne se fait pas avec les mêmes gestes que protéger une usine. Profil bas, présence rassurante, agents formés à la confidentialité.',
      en: 'Protecting a home does not require the same posture as protecting a factory. Low profile, reassuring presence, agents trained in discretion.',
    },
    scope: {
      fr: [
        'Gardiennage 24h/24 ou aux heures convenues',
        'Contrôle des entrées et des livraisons',
        'Patrouilles discrètes du périmètre',
        'Liaison avec le personnel de maison',
        'Plan d\'évacuation et procédures d\'urgence',
      ],
      en: [
        '24/7 or scheduled-hours guarding',
        'Entry and delivery control',
        'Discreet perimeter patrols',
        'Liaison with household staff',
        'Evacuation plan and emergency procedures',
      ],
    },
    audience: {
      fr: 'Résidences privées · Familles VIP · Diplomatie · Cadres expatriés',
      en: 'Private residences · VIP families · Diplomats · Expatriate executives',
    },
    priority: 2,
    span: 'wide',
    icon: 'Home',
    image: '/images/services/residentielle.jpg',
  },
  {
    slug: { fr: 'securite-industrielle', en: 'industrial-security' },
    name: { fr: 'Sécurité Industrielle', en: 'Industrial Security' },
    blurb: {
      fr: 'Sites industriels, chantiers, entrepôts. Posture proportionnée au risque.',
      en: 'Industrial sites, construction, warehouses. Posture sized to risk.',
    },
    metaDescription: {
      fr: "Sécurité industrielle pour sites, entrepôts et chantiers BTP à Kinshasa. Gardiennage, contrôle d'accès véhicules, supervision périmétrique 24/7.",
      en: 'Industrial security for sites, warehouses and construction in Kinshasa. Guarding, vehicle access control, 24/7 perimeter supervision.',
    },
    intro: {
      fr: 'Chaque site industriel a sa propre carte des risques. Nous l\'établissons avec vous, puis nous déployons un dispositif calibré : ni surdimensionné, ni insuffisant.',
      en: 'Every industrial site has its own risk map. We draw it with you, then deploy a calibrated posture — neither oversized nor insufficient.',
    },
    scope: {
      fr: [
        'Audit de risques, cartographie des points sensibles',
        'Gardiennage périmétrique, contrôle d\'accès véhicules',
        'Surveillance des chargements et déchargements',
        'Coordination avec la sécurité interne',
        'Reporting incidents en temps réel',
      ],
      en: [
        'Risk audit, sensitive-point mapping',
        'Perimeter guarding, vehicle access control',
        'Loading/unloading supervision',
        'Coordination with internal security',
        'Real-time incident reporting',
      ],
    },
    audience: {
      fr: 'Usines · Entrepôts · Chantiers · Sites miniers · Logistique',
      en: 'Factories · Warehouses · Construction sites · Mining · Logistics',
    },
    priority: 3,
    span: 'wide',
    icon: 'Factory',
    image: '/images/services/industrielle.jpg',
  },
  {
    slug: { fr: 'securite-elite', en: 'elite-security' },
    name: { fr: 'Sécurité d\'Élite', en: 'Elite Security' },
    blurb: {
      fr: 'Costume-cravate, profil bas, présence sans intimidation.',
      en: 'Suited, low-profile, presence without intimidation.',
    },
    metaDescription: {
      fr: 'Sécurité haut de gamme à Kinshasa pour VIP, ambassades et institutions. Agents en costume-cravate, profil bas, présence sans intimidation.',
      en: 'Premium security in Kinshasa for VIPs, embassies and institutions. Suited agents, low profile, presence without intimidation.',
    },
    intro: {
      fr: 'Pour les contextes où l\'uniforme n\'est pas adapté : événements privés, accueils diplomatiques, déplacements sensibles. Agents en costume, formation au protocole, discrétion absolue.',
      en: 'For contexts where the uniform is wrong: private events, diplomatic receptions, sensitive movements. Suited agents, protocol training, absolute discretion.',
    },
    scope: {
      fr: [
        'Agents en tenue civile élégante',
        'Formation protocole et étiquette',
        'Coordination en oreillette discrète',
        'Plans de mouvement et itinéraires alternatifs',
        'Rapport post-mission confidentiel',
      ],
      en: [
        'Agents in elegant civilian attire',
        'Protocol and etiquette training',
        'Discreet earpiece coordination',
        'Movement plans and alternative routes',
        'Confidential post-mission report',
      ],
    },
    audience: {
      fr: 'Événements privés · Réceptions diplomatiques · VIP en visite',
      en: 'Private events · Diplomatic receptions · Visiting VIPs',
    },
    icon: 'UserCheck',
    image: '/images/services/elite.jpg',
  },
  {
    slug: { fr: 'escorte-facilitation', en: 'escort-and-facilitation' },
    name: { fr: 'Escorte & Facilitation', en: 'Escort & Facilitation' },
    blurb: {
      fr: 'Trajets, accueils protocolaires, déplacements sensibles.',
      en: 'Transfers, protocol receptions, sensitive movements.',
    },
    metaDescription: {
      fr: 'Escorte sécurisée et facilitation à Kinshasa. Trajets, accueils protocolaires, déplacements sensibles pour dirigeants, ambassades et ONG.',
      en: 'Secure escort and facilitation in Kinshasa. Transfers, protocol receptions, sensitive movements for executives, embassies and NGOs.',
    },
    intro: {
      fr: 'Le bon trajet n\'est pas toujours le plus court. Étude d\'itinéraire, véhicule blindé ou banalisé selon le contexte, agents formés à la conduite défensive.',
      en: 'The right route is not always the shortest. Itinerary study, armored or unmarked vehicle as needed, agents trained in defensive driving.',
    },
    scope: {
      fr: [
        'Étude d\'itinéraire et reconnaissance préalable',
        'Conduite défensive certifiée',
        'Coordination avec services aéroportuaires',
        'Accueil protocolaire et facilitation administrative',
        'Liaison radio permanente',
      ],
      en: [
        'Route study and prior reconnaissance',
        'Certified defensive driving',
        'Coordination with airport services',
        'Protocol reception and administrative facilitation',
        'Permanent radio liaison',
      ],
    },
    audience: {
      fr: 'Cadres en mission · Délégations · Familles VIP · Médias',
      en: 'Executives on assignment · Delegations · VIP families · Media',
    },
    icon: 'Car',
    image: '/images/services/escorte.jpg',
  },
  {
    slug: { fr: 'securite-parking', en: 'parking-security' },
    name: { fr: 'Sécurité Parking', en: 'Parking Security' },
    blurb: {
      fr: 'Gestion d\'accès, surveillance et fluidité des parkings privés.',
      en: 'Access control, surveillance and flow for private car parks.',
    },
    metaDescription: {
      fr: "Gestion d'accès, surveillance et fluidité des parkings privés à Kinshasa. Agents formés au contrôle des entrées-sorties et à la levée d'incident.",
      en: 'Access control, surveillance and flow for private car parks in Kinshasa. Agents trained in entry/exit control and incident response.',
    },
    intro: {
      fr: 'Un parking est le premier et le dernier point de contact avec votre site. Il doit être sûr, rapide, et impeccable. Nous combinons agents et systèmes.',
      en: 'A car park is the first and last contact point with your site. It must be safe, fast, and impeccable. We combine agents and systems.',
    },
    scope: {
      fr: [
        'Contrôle d\'accès véhicules et piétons',
        'Gestion des places réservées',
        'Surveillance vidéo intégrée',
        'Assistance aux usagers',
        'Reporting incidents et comportements suspects',
      ],
      en: [
        'Vehicle and pedestrian access control',
        'Reserved-spot management',
        'Integrated video surveillance',
        'User assistance',
        'Incident and suspicious-behaviour reporting',
      ],
    },
    audience: {
      fr: 'Centres commerciaux · Hôtels · Bureaux · Résidences',
      en: 'Shopping centres · Hotels · Offices · Residences',
    },
    icon: 'ParkingCircle',
    image: '/images/services/parking.jpg',
  },
  {
    slug: { fr: 'desinsectisation-fumigation', en: 'pest-control-and-fumigation' },
    name: { fr: 'Désinsectisation / Fumigation', en: 'Pest Control / Fumigation' },
    blurb: {
      fr: 'Traitement professionnel des locaux, conformité hygiène.',
      en: 'Professional facility treatment, hygiene compliance.',
    },
    metaDescription: {
      fr: 'Désinsectisation et fumigation professionnelles à Kinshasa pour bureaux, entrepôts et résidences. Conformité hygiène, intervention planifiée.',
      en: 'Professional pest control and fumigation in Kinshasa for offices, warehouses and residences. Hygiene compliance, scheduled intervention.',
    },
    intro: {
      fr: 'L\'hygiène est une dimension de la sécurité. Traitement professionnel des locaux selon les protocoles internationaux, sans interruption d\'activité.',
      en: 'Hygiene is a security dimension. Professional treatment of premises following international protocols, without interrupting operations.',
    },
    scope: {
      fr: [
        'Inspection et identification des nuisibles',
        'Traitement adapté (insectes, rongeurs)',
        'Produits homologués, faible toxicité',
        'Suivi post-traitement à 7 et 30 jours',
        'Certificat de conformité hygiène',
      ],
      en: [
        'Inspection and pest identification',
        'Tailored treatment (insects, rodents)',
        'Approved low-toxicity products',
        'Follow-up at 7 and 30 days',
        'Hygiene compliance certificate',
      ],
    },
    audience: {
      fr: 'Hôtels · Restaurants · Bureaux · Entrepôts alimentaires',
      en: 'Hotels · Restaurants · Offices · Food warehouses',
    },
    icon: 'SprayCan',
    image: '/images/services/fumigation.jpg',
  },
  {
    slug: { fr: 'video-surveillance', en: 'video-surveillance' },
    name: { fr: 'Vidéo Surveillance', en: 'Video Surveillance' },
    blurb: {
      fr: 'Supervision continue, archivage sécurisé, levée de doute 24/7.',
      en: 'Continuous supervision, secure archiving, 24/7 verification.',
    },
    metaDescription: {
      fr: 'Supervision vidéo 24/7 à Kinshasa. Archivage sécurisé, levée de doute en temps réel, alerte intervention. Adapté entreprises et résidences.',
      en: '24/7 video supervision in Kinshasa. Secure archiving, real-time doubt verification, response dispatch. Adapted for businesses and residences.',
    },
    intro: {
      fr: 'Les caméras ne suffisent pas. Ce qu\'il faut, c\'est une équipe qui les regarde — et qui sait quoi faire quand quelque chose change. Notre centre de supervision tourne 24h/24.',
      en: 'Cameras alone are not enough. What you need is a team watching them — and knowing what to do when something changes. Our supervision centre runs 24/7.',
    },
    scope: {
      fr: [
        'Centre de supervision 24/7',
        'Levée de doute en moins de 90 secondes',
        'Archivage sécurisé 30 jours minimum',
        'Coordination avec équipes d\'intervention',
        'Rapports mensuels d\'activité',
      ],
      en: [
        '24/7 supervision centre',
        'Doubt verification under 90 seconds',
        'Secure archiving for 30 days minimum',
        'Coordination with response teams',
        'Monthly activity reports',
      ],
    },
    audience: {
      fr: 'Sites industriels · Commerces · Résidences · Bureaux',
      en: 'Industrial sites · Retail · Residences · Offices',
    },
    icon: 'Video',
    image: '/images/services/video-surveillance.jpg',
  },
  {
    slug: { fr: 'installation-cameras', en: 'camera-installation' },
    name: { fr: 'Installation Caméras', en: 'Camera Installation' },
    blurb: {
      fr: 'Étude, déploiement et maintenance de systèmes caméra IP.',
      en: 'Survey, deployment and maintenance of IP camera systems.',
    },
    metaDescription: {
      fr: 'Étude, installation et maintenance de systèmes de caméras IP à Kinshasa. Solutions pour entreprises, résidences et sites sensibles, garantie incluse.',
      en: 'Survey, installation and maintenance of IP camera systems in Kinshasa. Solutions for businesses, residences and sensitive sites, warranty included.',
    },
    intro: {
      fr: 'Concevoir un système caméra commence par marcher le site. Choix d\'angles, gestion de la lumière, câblage discret. Puis matériel professionnel, mise en service, formation des opérateurs.',
      en: 'Designing a camera system starts by walking the site. Angle choices, light management, discreet cabling. Then professional gear, commissioning, operator training.',
    },
    scope: {
      fr: [
        'Étude technique sur site',
        'Caméras IP haute définition (jour/nuit)',
        'NVR sécurisé, sauvegarde redondante',
        'Câblage et installation propre',
        'Formation opérateurs + maintenance annuelle',
      ],
      en: [
        'On-site technical survey',
        'High-definition IP cameras (day/night)',
        'Secured NVR, redundant backup',
        'Clean cabling and installation',
        'Operator training + annual maintenance',
      ],
    },
    audience: {
      fr: 'Industries · Commerces · Hôtels · Résidences haut de gamme',
      en: 'Industries · Retail · Hotels · High-end residences',
    },
    icon: 'Cctv',
    image: '/images/services/cameras.jpg',
  },
];

export function getServiceUrl(service: Service, locale: Locale): string {
  return `/${locale}/services/${service.slug[locale]}/`;
}

export const priorityServices = services.filter((s) => s.priority !== undefined);
