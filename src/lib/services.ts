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
  /** Display name. Short — fits in 1-2 words on a tile, used as H1 on the detail page. */
  name: LocalisedString;
  /** SEO `<title>` — keyword-led, location-anchored, ≤ 60 chars. Falls back to `name` if absent. */
  seoTitle?: LocalisedString;
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
  /** Optional wide banner for the service detail hero. Falls back to
     `image` when absent — lets a service show a square-ish tile on
     the hub mosaic but a wide banner on its own page. */
  heroImage?: string;
  /** CSS object-position for the detail hero crop. Use when the photo's
     subject sits off-centre (e.g. faces near the top edge). */
  heroPosition?: string;
  /** CSS object-position for the hub mosaic tile crop. */
  tilePosition?: string;
  /** SEO depth paragraphs rendered as the 'En pratique' section on the
     detail page. Facts only — everything here derives from the CDC. */
  detail?: { fr: string[]; en: string[] };
}

export const services: Service[] = [
  {
    slug: { fr: 'gardiennage-intervention', en: 'guarding-and-intervention' },
    name: { fr: 'Gardiennage & Intervention', en: 'Guarding & Intervention' },
    seoTitle: {
      fr: 'Gardiennage & Intervention à Kinshasa — RDC',
      en: 'Guarding & Intervention in Kinshasa, DR Congo',
    },
    blurb: {
      fr: 'Présence statique et mobile, équipes en intervention sous 20 minutes.',
      en: 'Static and mobile presence, response teams within 20 minutes.',
    },
    metaDescription: {
      fr: "Gardiennage statique et mobile à Kinshasa : équipes d'intervention sous 20 minutes, 24h/24, agents formés en interne, sur tous types de sites.",
      en: 'Guarding company in DR Congo: static and mobile guarding in Kinshasa, response teams within 20 minutes, 24/7, across all site types.',
    },
    intro: {
      fr: 'Société de gardiennage établie à Kinshasa depuis 2014, GSS analyse et étudie les risques et menaces de votre environnement, puis engage les moyens humains et techniques nécessaires pour un gardiennage efficace, sur mesure et selon vos besoins. Nous mettons en œuvre des moyens dédiés à la sécurisation de vos locaux pour prévenir tout risque d’intrusion, de dégradation et de vol.',
      en: 'A guarding company in DR Congo based in Kinshasa since 2014, GSS analyses and studies the risks and threats of your environment, then deploys the human and technical means required for effective bespoke guarding. We deploy dedicated resources to secure your premises against intrusion, damage, and theft.',
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
    detail: {
      fr: [
        'Notre société de gardiennage à Kinshasa ne place jamais un agent sans avoir visité votre site. Chaque dispositif est calibré après étude : nombre de postes, rotations jour et nuit, consignes écrites, équipements. Les agents de sécurité affectés sortent tous de notre centre de formation interne, et chaque site est encadré par un chef de poste relié à notre coordination centrale.',
        'En cas d\'incident, nos équipes mobiles interviennent en moins de 20 minutes en moyenne sur Kinshasa : levée de doute, sécurisation, escalade selon la procédure convenue avec vous, puis rapport d\'incident écrit. La supervision fonctionne 24 h/24, 7 j/7 — un dispositif de gardiennage GSS n\'est jamais laissé sans relais.',
        'Le prix d\'un service de gardiennage à Kinshasa dépend du nombre de postes, des horaires couverts (jour, nuit ou 24 h), du niveau de risque du site et des équipements demandés. L\'étude de site est gratuite et le devis revient sous 24 heures, sans surdimensionnement : nous chiffrons ce que le site exige, pas plus.',
      ],
      en: [
        'A guarding company in Kinshasa should never post an agent without visiting your site. Every deployment is calibrated after a study: number of posts, day and night rotations, written orders, equipment. The security agents assigned all come out of our in-house training centre, and every site is led by a post chief linked to our central coordination.',
        'When an incident occurs, our mobile teams respond in under 20 minutes on average across Kinshasa: verification, securing the site, escalation following the procedure agreed with you, then a written incident report. Supervision runs 24/7 — a GSS guarding deployment is never left without backup.',
        'The price of guarding services in Kinshasa depends on the number of posts, the hours covered (day, night or 24 h), the site\'s risk level and the equipment required. The site study is free and the quote comes back within 24 hours — we price what the site requires, nothing more.',
      ],
    },
    icon: 'Shield',
    image: '/images/services/gardiennage.jpg',
  },
  {
    slug: { fr: 'securite-residentielle', en: 'residential-security' },
    name: { fr: 'Sécurité Résidentielle', en: 'Residential Security' },
    seoTitle: {
      fr: 'Sécurité résidentielle à Kinshasa',
      en: 'Residential Security in Kinshasa',
    },
    blurb: {
      fr: 'Discrétion et constance pour résidences privées et VIP.',
      en: 'Discretion and consistency for private residences and VIPs.',
    },
    metaDescription: {
      fr: "Protection de résidences privées et VIP à Kinshasa. Gardiens dédiés, contrôle d'accès, levée de doute, discrétion et constance.",
      en: 'Protection of private and VIP residences in Kinshasa. Dedicated guards, access control, doubt verification, discretion and consistency.',
    },
    intro: {
      fr: 'Protéger un foyer ne se fait pas avec les mêmes gestes que protéger une usine. La sécurité résidentielle à Kinshasa exige un profil bas, une présence rassurante et des agents formés à la confidentialité. GSS affecte à chaque résidence des gardiens dédiés, un contrôle des accès rigoureux et des patrouilles discrètes du périmètre — 24h/24 ou aux heures convenues.',
      en: 'Protecting a home does not require the same posture as protecting a factory. Residential security in Kinshasa calls for a low profile, a reassuring presence and agents trained in discretion. GSS assigns each residence dedicated guards, rigorous access control and discreet perimeter patrols — around the clock or at agreed hours.',
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
    detail: {
      fr: [
        'Pour une résidence, la discrétion compte autant que la vigilance. Nos agents de sécurité résidentielle contrôlent les accès, filtrent les visiteurs et appliquent des consignes personnalisées définies avec la famille — sans transformer votre domicile en poste de garde. Le dispositif reste sobre, constant, professionnel.',
        'Les agents affectés aux résidences sont sélectionnés pour ce contexte précis et formés dans notre école interne, avec passage régulier d\'un superviseur et liaison permanente avec notre coordination 24/7. Familles, expatriés et cadres dirigeants à Kinshasa nous confient leur domicile dans toutes les communes de la ville.',
        'Le tarif d\'un gardien résidentiel à Kinshasa varie selon la couverture (jour, nuit ou 24 h), la configuration de la propriété et les dispositifs complémentaires souhaités — vidéosurveillance, contrôle d\'accès. Demandez une étude : elle est gratuite, confidentielle, et le devis arrive sous 24 heures.',
      ],
      en: [
        'In a home, discretion matters as much as vigilance. Our residential security agents control access, screen visitors and apply house rules defined with the family — without turning your home into a guard post. The presence stays low-key, constant, professional.',
        'Agents assigned to residences are selected for that specific context and trained in our in-house school, with regular supervisor rounds and a permanent link to our 24/7 coordination. Families, expatriates and executives across Kinshasa\'s communes trust us with their homes.',
        'The rate for a residential guard in Kinshasa varies with coverage (day, night or 24 h), the property\'s layout and any complementary systems — video surveillance, access control. Ask for a study: it is free, confidential, and the quote arrives within 24 hours.',
      ],
    },
    icon: 'Home',
    image: '/images/services/residentielle.jpg',
  },
  {
    slug: { fr: 'securite-industrielle', en: 'industrial-security' },
    name: { fr: 'Sécurité Industrielle', en: 'Industrial Security' },
    seoTitle: {
      fr: 'Sécurité industrielle à Kinshasa',
      en: 'Industrial Security in Kinshasa',
    },
    blurb: {
      fr: 'Sites industriels, chantiers, entrepôts. Posture proportionnée au risque.',
      en: 'Industrial sites, construction, warehouses. Posture sized to risk.',
    },
    metaDescription: {
      fr: "Sécurité industrielle pour sites, entrepôts et chantiers BTP à Kinshasa. Gardiennage, contrôle d'accès, supervision périmétrique 24/7.",
      en: 'Industrial security for sites, warehouses and construction sites in Kinshasa. Guarding, access control, 24/7 perimeter supervision.',
    },
    intro: {
      fr: 'Chaque site industriel a sa propre carte des risques. Nous l\'établissons avec vous, puis nous déployons un dispositif calibré : ni surdimensionné, ni insuffisant. C\'est ainsi que GSS aborde la sécurité industrielle en RDC : audit de risques préalable, gardiennage périmétrique, contrôle d\'accès et reporting en temps réel, pour les usines, entrepôts et chantiers.',
      en: 'Every industrial site has its own risk map. We draw it with you, then deploy a calibrated posture — neither oversized nor insufficient. This is how GSS approaches industrial security in the DRC: a prior risk audit, perimeter guarding, access control and real-time reporting, for factories, warehouses and construction sites.',
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
    detail: {
      fr: [
        'Sites industriels, entrepôts et usines demandent une sécurité structurée : périmétrie, contrôle des accès camions et personnel, registres d\'entrées-sorties, rondes tracées. Notre sécurité industrielle en RDC est dimensionnée au risque réel du site — jamais au forfait — après visite technique.',
        'Les agents affectés aux sites industriels suivent nos cursus internes, dont la sécurité incendie et les premiers secours, et travaillent en coordination avec vos équipes HSE. Chaque site produit un reporting régulier vers votre direction et vers notre supervision 24/7.',
        'Le coût d\'un dispositif industriel dépend de la superficie, du nombre d\'accès, des rotations et des exigences réglementaires de votre secteur. GSS est une entreprise de sécurité enregistrée (RCCM CD/KIN/RCCM/14-B-5645) : l\'étude de site est gratuite et le devis détaillé revient sous 24 heures.',
      ],
      en: [
        'Industrial sites, warehouses and factories need structured security: perimeter control, truck and personnel access management, entry registers, tracked patrols. Our industrial security in DR Congo is sized to the site\'s real risk — never a flat template — after a technical visit.',
        'Agents assigned to industrial sites go through our in-house programmes, including fire safety and first aid, and work in coordination with your HSE teams. Every site produces regular reporting to your management and to our 24/7 supervision.',
        'The cost of an industrial deployment depends on surface area, number of access points, rotations and your sector\'s regulatory requirements. GSS is a registered security company (RCCM CD/KIN/RCCM/14-B-5645): the site study is free and the detailed quote comes back within 24 hours.',
      ],
    },
    icon: 'Factory',
    image: '/images/services/industrielle.jpg',
  },
  {
    slug: { fr: 'securite-elite', en: 'elite-security' },
    name: { fr: 'Sécurité d\'Élite', en: 'Elite Security' },
    seoTitle: {
      fr: "Sécurité d'élite & VIP à Kinshasa",
      en: 'Elite & VIP Security in Kinshasa',
    },
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
    detail: {
      fr: [
        'Certains contextes n\'admettent pas l\'uniforme : réceptions diplomatiques, événements privés, accompagnement de personnalités. Nos agents d\'élite interviennent en tenue civile ou en costume, formés au protocole, avec une consigne simple — une présence qui rassure sans jamais intimider.',
        'Ces profils sont sélectionnés après plusieurs années de terrain chez GSS, puis formés au protocole VIP dans notre centre. Chaque mission fait l\'objet d\'un briefing précis : lieux, invités, sensibilités, coordination avec les équipes d\'escorte si le déplacement l\'exige.',
        'La sécurité rapprochée se chiffre par mission — événement ponctuel ou accompagnement récurrent — selon la durée, l\'effectif et le contexte. Les demandes sont traitées confidentiellement et la réponse revient sous 24 heures.',
      ],
      en: [
        'Some settings do not allow a uniform: diplomatic receptions, private events, accompanying public figures. Our elite agents operate in civilian dress or suits, trained in protocol, with one simple instruction — a presence that reassures without ever intimidating.',
        'These profiles are selected after several years in the field at GSS, then trained in VIP protocol at our centre. Every assignment gets a precise briefing: venues, guests, sensitivities, coordination with escort teams when movement is involved.',
        'Close protection is priced per assignment — one-off event or recurring accompaniment — according to duration, headcount and context. Requests are handled confidentially and answered within 24 hours.',
      ],
    },
    icon: 'UserCheck',
    image: '/images/services/elite.jpg',
    heroPosition: 'center top',
  },
  {
    slug: { fr: 'escorte-facilitation', en: 'escort-and-facilitation' },
    name: { fr: 'Escorte & Facilitation', en: 'Escort & Facilitation' },
    seoTitle: {
      fr: 'Escorte & facilitation à Kinshasa',
      en: 'Escort & Facilitation in Kinshasa',
    },
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
    detail: {
      fr: [
        'Un trajet sensible se prépare avant de se conduire : étude d\'itinéraire, horaires, points de vigilance, coordination du convoi. Nos chauffeurs d\'escorte sont certifiés en conduite défensive — un cursus de notre centre de formation — et restent en liaison radio avec la supervision pendant tout le déplacement.',
        'Nous assurons aussi les accueils protocolaires : arrivées à l\'aéroport de Kinshasa, transferts d\'équipes, déplacements de délégations. La facilitation logistique est intégrée au dispositif pour que vos invités ou collaborateurs n\'aient qu\'une chose à faire — arriver.',
        'Le tarif d\'une escorte dépend du trajet, de la durée, du nombre de véhicules et de l\'effectif engagé. Chaque mission est planifiée en amont avec votre équipe ; le devis revient sous 24 heures.',
      ],
      en: [
        'A sensitive journey is prepared before it is driven: route study, timing, vigilance points, convoy coordination. Our escort drivers are certified in defensive driving — a programme of our training centre — and stay on radio with supervision throughout the movement.',
        'We also handle protocol receptions: arrivals at Kinshasa airport, team transfers, delegation movements. Logistics facilitation is built into the deployment so your guests or staff have only one thing to do — arrive.',
        'Escort pricing depends on the route, duration, number of vehicles and headcount engaged. Every assignment is planned ahead with your team; the quote comes back within 24 hours.',
      ],
    },
    icon: 'Car',
    image: '/images/services/escorte-2.jpg',
    heroPosition: 'center top',
  },
  {
    slug: { fr: 'securite-parking', en: 'parking-security' },
    name: { fr: 'Sécurité Parking', en: 'Parking Security' },
    seoTitle: {
      fr: 'Sécurité parking à Kinshasa',
      en: 'Parking Security in Kinshasa',
    },
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
    detail: {
      fr: [
        'Un parking est le premier et le dernier contact avec votre site : il doit être sûr, fluide et lisible. Nos agents gèrent les accès véhicules et piétons, les places réservées et l\'assistance aux usagers, avec un reporting régulier des incidents et comportements suspects.',
        'Le dispositif s\'appuie sur la surveillance vidéo quand le site en est équipé, avec des agents formés à la levée de doute et des procédures claires d\'escalade. Centres commerciaux, hôtels, bureaux et résidences à Kinshasa nous confient leurs parkings.',
        'Le coût dépend de la capacité du parking, des horaires d\'ouverture et des pics de fréquentation. L\'étude est gratuite : nous dimensionnons le dispositif sur vos flux réels, pas sur une grille théorique.',
      ],
      en: [
        'A car park is the first and last contact with your site: it must be safe, fluid and legible. Our agents manage vehicle and pedestrian access, reserved spaces and user assistance, with regular reporting of incidents and suspicious behaviour.',
        'The deployment leans on video surveillance where the site is equipped, with agents trained in verification and clear escalation procedures. Shopping centres, hotels, offices and residences across Kinshasa trust us with their car parks.',
        'Cost depends on the car park\'s capacity, opening hours and traffic peaks. The study is free: we size the deployment on your real flows, not a theoretical grid.',
      ],
    },
    icon: 'ParkingCircle',
    image: '/images/services/parking-hero.jpg',
  },
  {
    slug: { fr: 'desinsectisation-fumigation', en: 'pest-control-and-fumigation' },
    name: { fr: 'Désinsectisation / Fumigation', en: 'Pest Control / Fumigation' },
    seoTitle: {
      fr: 'Désinsectisation & fumigation à Kinshasa',
      en: 'Pest Control & Fumigation in Kinshasa',
    },
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
    detail: {
      fr: [
        'La désinsectisation fait partie de la sécurité d\'un site : un local infesté est un local à risque, pour les personnes comme pour les stocks. Nous traitons bureaux, entrepôts et résidences à Kinshasa avec des produits conformes et un protocole d\'hygiène strict.',
        'Les interventions sont planifiées hors de vos horaires d\'activité quand c\'est possible, menées par une équipe équipée, et suivies de recommandations de prévention pour limiter les récidives.',
        'Le tarif dépend de la superficie et du type de traitement requis ; il est établi après visite. Beaucoup de nos clients couplent la fumigation avec leur dispositif de gardiennage GSS — un seul interlocuteur pour la sécurité du site.',
      ],
      en: [
        'Pest control is part of a site\'s security: infested premises are a risk to people and to stock alike. We treat offices, warehouses and residences across Kinshasa with compliant products and a strict hygiene protocol.',
        'Treatments are scheduled outside your operating hours where possible, carried out by an equipped team, and followed by prevention recommendations to limit recurrence.',
        'Pricing depends on surface area and the type of treatment required, and is set after a visit. Many clients pair fumigation with their GSS guarding deployment — one point of contact for site security.',
      ],
    },
    icon: 'SprayCan',
    image: '/images/services/fumigation.jpg',
  },
  {
    slug: { fr: 'video-surveillance', en: 'video-surveillance' },
    name: { fr: 'Vidéo Surveillance', en: 'Video Surveillance' },
    seoTitle: {
      fr: 'Vidéosurveillance 24/7 à Kinshasa',
      en: '24/7 Video Surveillance in Kinshasa',
    },
    blurb: {
      fr: 'Supervision continue, archivage sécurisé, levée de doute 24/7.',
      en: 'Continuous supervision, secure archiving, 24/7 verification.',
    },
    metaDescription: {
      fr: 'Supervision vidéo 24/7 à Kinshasa. Archivage sécurisé, levée de doute en temps réel, alerte intervention. Adapté entreprises et résidences.',
      en: '24/7 video supervision in Kinshasa. Secure archiving, real-time doubt verification, response dispatch. Adapted for businesses and residences.',
    },
    intro: {
      fr: 'Les caméras ne suffisent pas. Ce qu\'il faut, c\'est une équipe qui les regarde — et qui sait quoi faire quand quelque chose change. C\'est le principe de notre service de vidéosurveillance à Kinshasa : un centre de supervision qui tourne 24h/24, une levée de doute en temps réel et une coordination directe avec nos équipes d\'intervention.',
      en: 'Cameras alone are not enough. What you need is a team watching them — and knowing what to do when something changes. That is the principle behind our video surveillance in Kinshasa: a supervision centre running 24/7, real-time doubt verification and direct coordination with our response teams.',
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
    detail: {
      fr: [
        'La vidéosurveillance à Kinshasa n\'a de valeur que si quelqu\'un regarde : nos opérateurs supervisent vos caméras 24 h/24 depuis notre centre, avec levée de doute vidéo, déclenchement d\'intervention et archivage sécurisé des séquences.',
        'Les opérateurs sont formés dans notre école interne au poste de supervision : procédures d\'escalade, mains courantes, rapports quotidiens d\'activité. Couplée à un gardiennage physique allégé, la supervision vidéo réduit le coût global d\'un dispositif sans en réduire la vigilance.',
        'Le tarif dépend du nombre de caméras, de la plage de supervision (nuit seule ou 24 h) et des options d\'archivage. L\'étude de votre installation existante est gratuite — nous supervisons aussi des systèmes que nous n\'avons pas posés.',
      ],
      en: [
        'Video surveillance in Kinshasa only has value if someone is watching: our operators supervise your cameras 24/7 from our centre, with video verification, response dispatch and secure footage archiving.',
        'Operators are trained in our in-house school for the supervision desk: escalation procedures, logs, daily activity reports. Paired with a lighter physical guard presence, video supervision cuts a deployment\'s overall cost without cutting its vigilance.',
        'Pricing depends on the number of cameras, the supervision window (night only or 24 h) and archiving options. The study of your existing installation is free — we also supervise systems we did not install.',
      ],
    },
    icon: 'Video',
    image: '/images/services/video-surveillance.jpg',
    heroImage: '/images/services/video-surveillance-hero.jpg',
  },
  {
    slug: { fr: 'installation-cameras', en: 'camera-installation' },
    name: { fr: 'Installation Caméras', en: 'Camera Installation' },
    seoTitle: {
      fr: 'Installation de caméras IP à Kinshasa',
      en: 'IP Camera Installation in Kinshasa',
    },
    blurb: {
      fr: 'Étude, déploiement et maintenance de systèmes caméra IP.',
      en: 'Survey, deployment and maintenance of IP camera systems.',
    },
    metaDescription: {
      fr: 'Étude, installation et maintenance de systèmes de caméras IP à Kinshasa. Solutions pour entreprises, résidences et sites sensibles, garantie incluse.',
      en: 'Survey, installation and maintenance of IP camera systems in Kinshasa. Solutions for businesses, residences and sensitive sites, warranty included.',
    },
    intro: {
      fr: 'Une installation de caméras de surveillance à Kinshasa commence par marcher le site : choix d\'angles, gestion de la lumière, câblage discret. GSS mène l\'étude technique, déploie du matériel professionnel — caméras IP haute définition, enregistrement sécurisé — puis assure la mise en service, la formation de vos opérateurs et la maintenance dans la durée.',
      en: 'A CCTV installation in Kinshasa starts by walking the site: angle choices, light management, discreet cabling. GSS carries out the technical survey, deploys professional equipment — high-definition IP cameras, secured recording — then handles commissioning, operator training and long-term maintenance.',
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
    detail: {
      fr: [
        'Une installation de caméras réussie commence par l\'étude du site : points sensibles, angles morts, éclairage, alimentation. Nous déployons ensuite des caméras IP avec un câblage propre et une mise en service documentée, puis nous formons vos équipes à l\'exploitation.',
        'Nous assurons la maintenance et le SAV de ce que nous posons, et vos caméras peuvent être raccordées à notre centre de supervision 24/7 — l\'installation et la surveillance par le même prestataire, sans renvoi de responsabilité entre fournisseurs.',
        'Le prix d\'une installation de caméras à Kinshasa dépend du nombre de points, du type de caméras (intérieur, extérieur, vision nocturne) et du mode d\'enregistrement — local ou supervisé. Le devis détaillé est gratuit et revient sous 24 heures après la visite technique.',
      ],
      en: [
        'A successful camera installation starts with the site study: sensitive points, blind spots, lighting, power. We then deploy IP cameras with clean cabling and documented commissioning, and train your teams to operate the system.',
        'We maintain and service what we install, and your cameras can be connected to our 24/7 supervision centre — installation and monitoring by the same provider, with no finger-pointing between vendors.',
        'The price of a camera installation in Kinshasa depends on the number of points, the camera types (indoor, outdoor, night vision) and the recording mode — local or supervised. The detailed quote is free and comes back within 24 hours of the technical visit.',
      ],
    },
    icon: 'Cctv',
    image: '/images/services/cameras.jpg',
    tilePosition: 'center top',
  },
];

export function getServiceUrl(service: Service, locale: Locale): string {
  return `/${locale}/services/${service.slug[locale]}/`;
}

export const priorityServices = services.filter((s) => s.priority !== undefined);
