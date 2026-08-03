/**
 * GSS Congo — News (Actualités) catalogue.
 * Single source of truth for inauguration articles. Consumed by:
 *   - /fr/actualites/, /en/news/ — hub pages
 *   - /fr/actualites/[slug]/, /en/news/[slug]/ — detail pages
 *
 * Premium offer commits 3 launch articles (EXECUTION_PLAN.md §7 Phase 5).
 * Bodies are stored as locale-keyed HTML strings — authored in-house, no
 * untrusted input, so set:html is safe.
 */

export type Locale = 'fr' | 'en';
export type LocalisedString = Record<Locale, string>;

export interface Article {
  /** URL-safe slug per locale. */
  slug: LocalisedString;
  /** Display title — one short editorial sentence. */
  title: LocalisedString;
  /** One-sentence excerpt for hub cards + meta description. ≤ 200 chars. */
  excerpt: LocalisedString;
  /** Cover image (relative to /public). */
  image: string;
  /** ISO YYYY-MM-DD. Rendered verbatim in <time datetime>. */
  publishedAt: string;
  /** "5 min de lecture" / "5 min read" — author-set. */
  readingTime: LocalisedString;
  /** Full body as HTML string per locale (h2/p/ul). */
  body: LocalisedString;
}

export const articles: Article[] = [
  {
    slug: {
      fr: 'onze-ans-securite-privee-kinshasa',
      en: 'eleven-years-private-security-kinshasa',
    },
    title: {
      fr: 'Pourquoi 11 ans changent tout en sécurité privée à Kinshasa',
      en: 'Why 11 years change everything in private security in Kinshasa',
    },
    excerpt: {
      fr: 'L’expérience ne se résume pas à un compteur d’années. Elle se voit dans la lecture du terrain, la calibration des effectifs, la chaîne de commandement.',
      en: 'Experience is not a counter of years. It shows in reading the ground, calibrating headcount, and the chain of command.',
    },
    image: '/images/banner1.jpg',
    publishedAt: '2026-05-06',
    readingTime: { fr: '6 min de lecture', en: '6 min read' },
    body: {
      fr: `
<p>11 ans de présence à Kinshasa, sans interruption. Le chiffre se cite vite, mais ce qu’il recouvre est moins évident à expliquer. Nous proposons ici une lecture honnête de ce que l’expérience produit dans notre métier.</p>

<h2>Lire le terrain avant de le sécuriser</h2>
<p>Une concession industrielle à Limete ne se sécurise pas comme une résidence à Gombe. Le rythme des camions, la densité des riverains, la nature des accès, la qualité de l’éclairage public, la pluviométrie — tout cela module le dispositif. Il faut avoir vu plusieurs centaines de sites pour distinguer rapidement ce qui est essentiel et ce qui ne l’est pas.</p>
<p>L’expérience n’est pas un argument commercial. C’est ce qui permet de calibrer un effectif sans gaspiller, et de placer les agents là où ils sont vraiment utiles.</p>

<h2>La chaîne de commandement, à l’épreuve</h2>
<p>11 ans d’opérations, c’est aussi 11 ans d’incidents. Aucun incident grave ne se résout par l’improvisation : il se gère par une chaîne de commandement éprouvée. Qui appelle qui, dans quel ordre, avec quels relais, sous quel délai — ces réflexes se construisent dans la durée.</p>
<p>Notre coordination centrale fonctionne 24/7 et a vu beaucoup de scénarios. Le client n’a pas besoin de savoir ce qui se passe en interne. Il a besoin de savoir que ça se passe.</p>

<h2>La formation, comme exigence permanente</h2>
<p>Un agent qui n’est pas formé n’est pas un agent. Notre centre de formation tourne en continu — théorie, pratique, mises en situation, évaluation. C’est une école interne, et c’est aussi pour les meilleurs profils une voie d’évolution vers chef de poste, instructeur, ou opérateur supervision.</p>
<p>La formation n’est pas un coût qu’on optimise. C’est ce qui distingue, sur la durée, une ressource d’un risque.</p>

<h2>La confiance institutionnelle, qui se gagne lentement</h2>
<p>Nos clients industriels, ambassades, hôtels, résidences VIP ne nous ont pas choisis sur la promesse. Ils nous ont choisis sur la durée. 11 ans, c’est suffisamment long pour qu’un cadre dirigeant ait pu nous voir à l’œuvre, demander des références, et croiser nos rapports d’activité.</p>
<p>Cette confiance ne se transfère pas. Elle se reconstruit avec chaque nouveau client, mais elle s’appuie sur un socle réel : l’opérationnel régulier, la rigueur administrative, la lisibilité des comptes-rendus.</p>

<h2>Ce que 11 ans n’expliquent pas seuls</h2>
<p>Beaucoup d’entreprises affichent un nombre d’années. Très peu peuvent dire ce qu’elles en ont fait. La différence, à notre échelle, se lit dans :</p>
<ul>
  <li>Le ratio d’agents formés en interne (proche de 100% chez nous).</li>
  <li>La rotation des équipes encadrantes (faible, par construction).</li>
  <li>La qualité du reporting client (mensuel, lisible, exploitable).</li>
  <li>La capacité à dire non — quand un dispositif demandé serait disproportionné, ou inversement, quand il serait insuffisant.</li>
</ul>

<h2>Ce que cela signifie pour vous, concrètement</h2>
<p>Si vous nous consultez aujourd’hui, voici ce que vous achetez en pratique :</p>
<ul>
  <li>Une visite de site par un opérationnel, pas par un commercial.</li>
  <li>Un dispositif sur mesure, validé avec vous.</li>
  <li>Une équipe formée par notre propre école.</li>
  <li>Une chaîne de commandement qui répond, jour et nuit.</li>
  <li>Des comptes rendus qui se lisent.</li>
</ul>
<p>11 ans, ce ne sont pas 11 diplômes. C’est une discipline qui s’est laissée corriger longtemps. C’est ce qui change tout.</p>
`.trim(),
      en: `
<p>11 years on the ground in Kinshasa, without interruption. The number is easy to quote, but what it actually covers is less obvious. Here is an honest read of what experience produces in our craft.</p>

<h2>Read the ground before you secure it</h2>
<p>An industrial site in Limete is not secured the way a residence in Gombe is. Truck rhythm, neighbour density, access type, street-light quality, rainfall — all of it modulates the posture. You have to have walked several hundred sites to quickly tell what matters from what does not.</p>
<p>Experience is not a sales argument. It is what lets us size headcount without waste, and place agents where they are actually useful.</p>

<h2>Chain of command, under stress</h2>
<p>11 years of operations is also 11 years of incidents. No serious incident is resolved by improvisation: it is handled by a tested chain of command. Who calls whom, in what order, with what relays, within what deadline — those reflexes are built over time.</p>
<p>Our central coordination runs 24/7 and has seen many scenarios. The client does not need to know what is happening internally. The client needs to know that it is happening.</p>

<h2>Training as a permanent requirement</h2>
<p>An untrained agent is not an agent. Our training centre runs continuously — theory, practice, drills, assessment. It is an internal school, and for the strongest profiles it is also a path toward post chief, instructor, or supervision operator.</p>
<p>Training is not a cost to optimise. Over time, it is the line between a resource and a risk.</p>

<h2>Institutional trust, slowly earned</h2>
<p>Our industrial clients, embassies, hotels, and VIP residences did not choose us on a promise. They chose us on a track record. 11 years is long enough for a senior executive to have seen us work, asked for references, and read our activity reports.</p>
<p>That trust does not transfer. It rebuilds with every new client, but it stands on a real foundation: steady operations, administrative rigour, legible reporting.</p>

<h2>What 11 years alone do not explain</h2>
<p>Many firms quote a number of years. Very few can say what they did with them. At our scale, the difference shows in:</p>
<ul>
  <li>The ratio of internally trained agents (close to 100% with us).</li>
  <li>The rotation of supervisory teams (low, by design).</li>
  <li>Reporting quality (monthly, legible, actionable).</li>
  <li>The ability to say no — when a requested posture would be excessive, or, conversely, insufficient.</li>
</ul>

<h2>What this means for you, concretely</h2>
<p>If you consult us today, here is what you actually buy:</p>
<ul>
  <li>A site visit by an operator, not a salesperson.</li>
  <li>A bespoke posture, validated with you.</li>
  <li>A team trained by our own school.</li>
  <li>A chain of command that answers, day and night.</li>
  <li>Reports that are actually read.</li>
</ul>
<p>11 years are not 11 diplomas. They are a discipline that allowed itself to be corrected for a long time. That is what changes everything.</p>
`.trim(),
    },
  },

  {
    slug: {
      fr: 'securiser-ambassade-protocole-exigences',
      en: 'securing-embassy-protocol-requirements',
    },
    title: {
      fr: 'Sécuriser une ambassade : protocole et exigences',
      en: 'Securing an embassy: protocol and requirements',
    },
    excerpt: {
      fr: 'Une mission diplomatique n’est pas un site comme un autre. Audit, vérifications, coordination interne, confidentialité — voici ce que le métier demande.',
      en: 'A diplomatic mission is not a site like any other. Audit, vetting, internal coordination, confidentiality — here is what the craft demands.',
    },
    image: '/images/services/elite.jpg',
    publishedAt: '2026-05-06',
    readingTime: { fr: '7 min de lecture', en: '7 min read' },
    body: {
      fr: `
<p>Sécuriser une ambassade ou une mission diplomatique impose une posture différente. Non pas plus tendue, mais plus disciplinée. Voici les exigences que nous appliquons systématiquement.</p>

<h2>Le brief diplomatique</h2>
<p>Avant tout dispositif, nous demandons un brief en présence du chef de poste de sécurité. Pas un cahier des charges générique : une lecture des sensibilités spécifiques au pays représenté, des manifestations possibles, du calendrier diplomatique des prochains mois.</p>
<p>Ce brief reste confidentiel. Il oriente directement le choix des effectifs, leur tenue, leur posture, et les protocoles d’escalade.</p>

<h2>L’audit de site</h2>
<p>L’audit physique se fait en plusieurs passages — de jour, de nuit, en heures de bureau, en heures creuses. Nous cartographions :</p>
<ul>
  <li>Les angles morts du périmètre.</li>
  <li>Les flux de visiteurs (chancellerie, consulat, événements).</li>
  <li>Les points d’accès véhiculaires et leurs temps d’ouverture.</li>
  <li>Les abords (terrasses, immeubles voisins en surplomb, axes de circulation).</li>
  <li>L’éclairage et la couverture caméras existante.</li>
</ul>
<p>Le rapport d’audit est un document interne qui sert de référence pendant toute la durée du contrat.</p>

<h2>Les exigences de vérification</h2>
<p>Aucun agent n’entre sur une mission diplomatique sans une vérification renforcée :</p>
<ul>
  <li>Vérification d’identité officielle.</li>
  <li>Casier judiciaire à jour.</li>
  <li>Contrôle des références antérieures.</li>
  <li>Validation par notre direction des opérations.</li>
  <li>Validation par le chef de poste client.</li>
</ul>
<p>Cette procédure est non négociable. Elle s’applique aussi aux remplaçants temporaires et aux relèves de week-end.</p>

<h2>La coordination avec les services internes</h2>
<p>Une mission a presque toujours une équipe de sécurité interne propre. Notre rôle n’est pas de la remplacer, mais de l’épauler. Nous opérons en surface (filtrage, périmètre, accueil) pendant que la sécurité interne se concentre sur l’intérieur protocolaire.</p>
<p>La coordination passe par :</p>
<ul>
  <li>Un canal radio dédié, étanche aux autres clients.</li>
  <li>Des points de relève quotidiens, écrits et signés.</li>
  <li>Des exercices conjoints réguliers (évacuation, intrusion, incident sanitaire).</li>
  <li>Un référent unique côté GSS, joignable 24/7.</li>
</ul>

<h2>La confidentialité, comme premier livrable</h2>
<p>Sur une mission diplomatique, la première livraison n’est pas un agent — c’est la confidentialité. Nous formons explicitement nos agents à ne rien dire, à ne rien transporter, à ne rien photographier. Les téléphones personnels restent en consigne pendant les vacations.</p>
<p>Les rapports d’activité quotidiens sont remis en main propre au chef de poste, jamais transmis par messagerie non sécurisée.</p>

<h2>Ce que nous ne faisons pas</h2>
<p>Une partie du métier consiste à dire ce qui n’est pas de notre ressort :</p>
<ul>
  <li>Nous ne sommes pas des agents armés. Nous travaillons en posture de prévention et de dissuasion.</li>
  <li>Nous ne pratiquons pas la protection rapprochée hors site sans cadre contractuel spécifique.</li>
  <li>Nous ne nous substituons pas aux forces de l’ordre. En cas d’incident grave, le protocole prévoit toujours une remontée vers les autorités compétentes.</li>
</ul>

<h2>Ce que nous garantissons</h2>
<p>Au final, ce qu’une mission diplomatique nous demande, et ce que nous délivrons, tient en trois points :</p>
<ul>
  <li>Une présence calibrée, formée, et stable dans le temps.</li>
  <li>Une discrétion irréprochable, vérifiée à chaque relève.</li>
  <li>Une chaîne de commandement qui répond — pas un standard téléphonique générique.</li>
</ul>
<p>Le reste, c’est de la rigueur quotidienne. Et c’est ce qui fait la différence entre une mission tranquille et une mission qui doute.</p>
`.trim(),
      en: `
<p>Securing an embassy or diplomatic mission demands a different posture. Not more tense, but more disciplined. Here are the requirements we apply systematically.</p>

<h2>The diplomatic brief</h2>
<p>Before any deployment, we request a brief with the security desk lead. Not a generic spec sheet: a read on the sensitivities specific to the country represented, the manifestations that may arise, and the diplomatic calendar over the coming months.</p>
<p>That brief stays confidential. It directly shapes headcount, dress, posture, and escalation protocols.</p>

<h2>The site audit</h2>
<p>The physical audit is conducted in several passes — daytime, night, business hours, off-hours. We map:</p>
<ul>
  <li>Perimeter blind spots.</li>
  <li>Visitor flows (chancellery, consulate, events).</li>
  <li>Vehicle access points and their opening windows.</li>
  <li>Surroundings (terraces, overlooking neighbouring buildings, traffic axes).</li>
  <li>Lighting and existing camera coverage.</li>
</ul>
<p>The audit report is an internal document that serves as the reference for the whole contract duration.</p>

<h2>Vetting requirements</h2>
<p>No agent enters a diplomatic mission without a reinforced vetting:</p>
<ul>
  <li>Official identity verification.</li>
  <li>Up-to-date criminal record.</li>
  <li>Reference checks on prior employment.</li>
  <li>Validation by our operations director.</li>
  <li>Validation by the client security desk.</li>
</ul>
<p>This procedure is non-negotiable. It also applies to temporary replacements and weekend relievers.</p>

<h2>Coordinating with internal services</h2>
<p>A mission almost always has its own internal security team. Our role is not to replace it but to support it. We operate at the surface (filtering, perimeter, reception) while internal security focuses on the protocol interior.</p>
<p>Coordination flows through:</p>
<ul>
  <li>A dedicated radio channel, walled off from other clients.</li>
  <li>Daily relief points, written and signed.</li>
  <li>Regular joint drills (evacuation, intrusion, health incident).</li>
  <li>A single GSS point of contact, reachable 24/7.</li>
</ul>

<h2>Confidentiality, as the first deliverable</h2>
<p>On a diplomatic mission, the first deliverable is not an agent — it is confidentiality. We explicitly train agents to say nothing, carry nothing, photograph nothing. Personal phones remain in storage during shifts.</p>
<p>Daily activity reports are handed in person to the security desk, never sent by unsecured messaging.</p>

<h2>What we do not do</h2>
<p>Part of the craft is stating what is not within our remit:</p>
<ul>
  <li>We are not armed agents. We operate in a prevention and deterrence posture.</li>
  <li>We do not perform off-site close protection without a specific contractual frame.</li>
  <li>We do not substitute for law enforcement. In a serious incident, the protocol always escalates to the competent authorities.</li>
</ul>

<h2>What we guarantee</h2>
<p>In the end, what a diplomatic mission asks of us, and what we deliver, comes down to three points:</p>
<ul>
  <li>A calibrated, trained, and stable presence over time.</li>
  <li>Spotless discretion, verified at every relief.</li>
  <li>A chain of command that answers — not a generic call centre.</li>
</ul>
<p>The rest is daily rigour. And that is what separates a quiet mission from a mission that doubts.</p>
`.trim(),
    },
  },

  {
    slug: {
      fr: 'devenir-agent-gss-parcours-formation',
      en: 'becoming-gss-agent-training-path',
    },
    title: {
      fr: 'Devenir agent GSS : le parcours de formation',
      en: 'Becoming a GSS agent: the training path',
    },
    excerpt: {
      fr: 'Du premier entretien à la première mission, voici les étapes que traverse une promotion d’agents avant d’être déployée.',
      en: 'From the first interview to the first mission, here are the steps a cohort of agents goes through before deployment.',
    },
    image: '/images/formation-hero.jpg',
    publishedAt: '2026-05-06',
    readingTime: { fr: '5 min de lecture', en: '5 min read' },
    body: {
      fr: `
<p>Beaucoup pensent qu’un agent de sécurité s’improvise. Chez nous, c’est l’inverse : la formation précède le terrain, et c’est ce qui fait la différence sur les sites les plus exigeants. Voici concrètement ce que traverse une promotion.</p>

<h2>La sélection</h2>
<p>Tout commence par un dossier — CV, lettre de motivation, disponibilité, zone de Kinshasa souhaitée. Nous recevons les profils retenus en entretien au siège. C’est l’occasion de :</p>
<ul>
  <li>Vérifier l’identité et les antécédents déclarés.</li>
  <li>Comprendre la motivation réelle (pas seulement le besoin économique).</li>
  <li>Évaluer la posture, la diction, le sang-froid en entretien.</li>
  <li>Mesurer la condition physique de base.</li>
</ul>
<p>Aucune embauche n’est validée sans un second avis interne. Les candidatures qui ne sont pas retenues immédiatement rejoignent un vivier consulté à chaque ouverture de cohorte.</p>

<h2>La théorie</h2>
<p>La phase théorique dure plusieurs semaines. Elle couvre :</p>
<ul>
  <li>Le cadre légal de la sécurité privée en RDC.</li>
  <li>La déontologie : intégrité, discrétion, non-discrimination.</li>
  <li>Les procédures d’intervention et de levée de doute.</li>
  <li>Les premiers secours et la lutte incendie.</li>
  <li>La communication radio standardisée.</li>
</ul>
<p>Chaque module se valide par un contrôle écrit. Pas de passage automatique. Les modules ratés se reprennent sur la cohorte suivante, ou en rattrapage si le profil le justifie.</p>

<h2>La pratique</h2>
<p>La pratique se fait sur notre plateau d’entraînement. Mises en situation contrôlées, sous le regard d’instructeurs opérationnels qui ont eux-mêmes été agents de terrain :</p>
<ul>
  <li>Contrôle d’accès véhiculaire et piétonnier.</li>
  <li>Fouille respectueuse mais rigoureuse.</li>
  <li>Gestion d’un visiteur agressif.</li>
  <li>Réponse à une intrusion ou tentative d’intrusion.</li>
  <li>Évacuation et ralliement des points de regroupement.</li>
</ul>
<p>L’objectif n’est pas de produire des réflexes mécaniques, mais de donner aux agents un cadre de décision dans lequel ils peuvent garder la tête froide.</p>

<h2>L’évaluation</h2>
<p>L’évaluation finale combine :</p>
<ul>
  <li>Une épreuve écrite reprenant les fondamentaux du cadre légal et déontologique.</li>
  <li>Une épreuve pratique en mises en situation surprise.</li>
  <li>Une vérification physique (résistance, posture, mobilité).</li>
  <li>Un entretien individuel avec un cadre opérationnel.</li>
</ul>
<p>L’attestation n’est délivrée qu’en cas de réussite à l’ensemble. Un agent qui échoue à une épreuve peut se présenter à nouveau lors de la session suivante. Aucune promotion ne sort “par dérogation”.</p>

<h2>L’affectation</h2>
<p>L’affectation se fait selon trois critères :</p>
<ul>
  <li>Le profil de l’agent (résultats, posture, langues parlées).</li>
  <li>La nature du site et le niveau d’exposition.</li>
  <li>La géographie — un agent qui habite proche du site reste opérationnel plus longtemps.</li>
</ul>
<p>La première mission est toujours encadrée : un référent terrain accompagne le nouvel agent durant la première semaine, fait des points quotidiens, et signe une évaluation à 30 jours. Si tout se passe bien, le contrat est consolidé. Sinon, on corrige — formation complémentaire, changement d’affectation, ou retour en évaluation.</p>

<h2>Et après ?</h2>
<p>L’affectation n’est pas une fin. Les meilleurs agents accèdent en deux à trois ans à des fonctions de chef de poste, d’instructeur formation, ou d’opérateur centre de supervision. Les missions VIP et escorte s’ouvrent aux profils qui ont prouvé leur stabilité dans la durée.</p>
<p>La formation, chez nous, n’est pas une étape — c’est une discipline qui ne s’arrête jamais.</p>
`.trim(),
      en: `
<p>Many think a security agent is improvised. With us, the opposite is true: training precedes the field, and that is what makes the difference on the most demanding sites. Here, concretely, is what a cohort goes through.</p>

<h2>Selection</h2>
<p>It all starts with an application — CV, cover letter, availability, preferred Kinshasa zone. We invite shortlisted candidates to the headquarters for an interview. This is the moment to:</p>
<ul>
  <li>Verify identity and declared background.</li>
  <li>Understand real motivation (not just economic need).</li>
  <li>Assess posture, diction, composure in conversation.</li>
  <li>Measure baseline physical condition.</li>
</ul>
<p>No hiring decision is validated without a second internal opinion. Candidates not retained immediately join a pool consulted at every new cohort opening.</p>

<h2>Theory</h2>
<p>The theoretical phase runs for several weeks. It covers:</p>
<ul>
  <li>The DRC legal framework for private security.</li>
  <li>Code of conduct: integrity, discretion, non-discrimination.</li>
  <li>Response and doubt-verification procedures.</li>
  <li>First aid and fire safety.</li>
  <li>Standardised radio communication.</li>
</ul>
<p>Every module is validated by a written assessment. No automatic passes. Failed modules are retaken with the next cohort, or in a make-up session when the profile warrants it.</p>

<h2>Practice</h2>
<p>Practice happens on our training ground. Controlled drills, supervised by operational instructors who themselves served as field agents:</p>
<ul>
  <li>Vehicle and pedestrian access control.</li>
  <li>Respectful but rigorous searches.</li>
  <li>Handling an aggressive visitor.</li>
  <li>Responding to intrusion or attempted intrusion.</li>
  <li>Evacuation and assembly point coordination.</li>
</ul>
<p>The goal is not to produce mechanical reflexes, but to give agents a decision frame in which they can stay clear-headed.</p>

<h2>Assessment</h2>
<p>Final assessment combines:</p>
<ul>
  <li>A written test on legal and code-of-conduct fundamentals.</li>
  <li>A practical test with surprise drills.</li>
  <li>A physical check (endurance, posture, mobility).</li>
  <li>An individual interview with an operations lead.</li>
</ul>
<p>Certification is granted only on full success. An agent who fails a test may sit it again at the next session. No cohort graduates "by exception".</p>

<h2>Assignment</h2>
<p>Assignment follows three criteria:</p>
<ul>
  <li>The agent's profile (results, posture, languages spoken).</li>
  <li>The site's nature and exposure level.</li>
  <li>Geography — an agent living close to the site stays operational longer.</li>
</ul>
<p>The first mission is always supervised: a field mentor accompanies the new agent through the first week, holds daily check-ins, and signs a 30-day review. If all goes well, the contract is confirmed. Otherwise, we correct — additional training, reassignment, or back to assessment.</p>

<h2>And after?</h2>
<p>Assignment is not the end. The strongest agents move into post chief, training instructor, or supervision-centre operator roles within two to three years. VIP and escort missions open to profiles who have proven their stability over time.</p>
<p>Training, with us, is not a phase — it is a discipline that never stops.</p>
`.trim(),
    },
  },
];

/** Build a public URL for an article in a given locale. */
export function getArticleUrl(article: Article, locale: Locale): string {
  const seg = locale === 'fr' ? 'actualites' : 'news';
  return `/${locale}/${seg}/${article.slug[locale]}/`;
}

/** UI labels used by news hub + detail pages. */
export const newsLabels = {
  hub: { fr: 'Actualités', en: 'News' },
  hubEyebrow: { fr: 'Actualités', en: 'News' },
  hubHeading: {
    fr: 'Trois lectures pour comprendre la maison.',
    en: 'Three reads to understand the house.',
  },
  hubSub: {
    fr: 'Notes éditoriales sur le métier, la formation, et la posture diplomatique. Plus de textes à venir au fil des promotions.',
    en: 'Editorial notes on the craft, the training, and the diplomatic posture. More to come, cohort after cohort.',
  },
  publishedOn: { fr: 'Publié le', en: 'Published' },
  backToHub: { fr: 'Toutes les actualités', en: 'All news' },
  readMore: { fr: 'Lire l’article', en: 'Read article' },
};
