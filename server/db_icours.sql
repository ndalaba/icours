-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 30, 2024 at 09:04 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_icours`
--

-- --------------------------------------------------------

--
-- Table structure for table `chapters`
--

CREATE TABLE `chapters` (
  `id` int NOT NULL,
  `uid` varchar(100) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `views` int NOT NULL DEFAULT '0',
  `courseId` int DEFAULT NULL,
  `published` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `chapters`
--

INSERT INTO `chapters` (`id`, `uid`, `createdAt`, `updatedAt`, `title`, `slug`, `content`, `views`, `courseId`, `published`) VALUES
(2, '57cd641c-b94c-4d08-81ea-14882216b79f', '2023-02-03 19:00:55.063637', '2023-02-05 20:27:12.000000', 'D\'un point de vue génétique,', 'dun-point-de-vue-genetique', '<div>La génétique est l\'étude de l\'héritage et de l\'expression des gènes. La synthèse des protéines est la production des protéines à partir de l\'information codée dans le génome. La génétique est essentielle à la compréhension et l\'analyse des protéines à la source. La génétique peut fournir des informations utiles sur la façon dont les gènes sont conçus, codés et exprimés. Ces informations peuvent être utilisées pour comprendre le rôle des protéines dans les processus biologiques vitaux.</div><div><br></div><div>D\'un point de vue génétique, les protéines sont produites à partir de transcriptions de l\'ADN, contenu dans les cellules. Une fois le gène est transcrit, les protéines sont produites par traduction. La traduction est le processus qui détermine la structure et la fonction des protéines. Une fois que la synthèse des protéines est terminée, ces molécules peuvent remplir différentes fonctions dans le corps, potentiellement à la cellule, à l\'organisme ou à la population.</div><div><br></div><div>La recherche en génétique et la synthèse des protéines sont intimement liées et ont contribué à des avancées importantes dans les sciences de la vie. Les avancées effectuées dans ces domaines ont permis une meilleure compréhension des processus uniques liés à chaque protéine et comment vivent les organismes. De plus, l\'utilisation d\'outils génétiques pour cibler les protéines peut aider à la découverte et le développement de nouveaux médicaments qui se lient spécifiquement aux protéines individuelles et qui peut réduire ou guérir des maladies.</div>', 0, 1, 1),
(3, '9725dcf7-c23b-4432-b001-5a46bc2c6a86', '2023-02-03 19:07:12.789141', '2023-02-03 19:07:12.789141', 'Voluptas voluptate a', 'voluptas-voluptate-a', 'Sit dolores reprehen', 0, 1, 0),
(4, '9d05cb4d-52d4-4f52-87c4-fe168f532624', '2023-02-03 19:44:58.087326', '2023-02-03 20:00:53.000000', 'Un chapitre', 'un-chapitre', 'Le chapitre de test', 0, 2, 1),
(13, '274ba3bc-0846-43b7-a070-c40d1207e688', '2023-02-05 19:48:55.111845', '2023-02-05 19:52:00.000000', 'Un chapitre que je ne connais pas, mais que je compte écrire quant memem', 'un-chapitre-que-je-ne-connais-pas-mais-que-je-compte-ecrire-quant-memem', 'uk fsdjfmsdffjsdf sdlfjs dfsflksdmfslkdj', 0, 2, 1),
(14, '45ef5893-ff7c-493c-90d7-a40ba923022a', '2023-02-05 19:51:01.238381', '2023-02-06 18:06:04.000000', 'Un chapitre que je ne connais pas, mais que je compte écrire quant memem', 'un-chapitre-que-je-ne-connais-pas-mais-que-je-compte-ecrire-quant-memem', '<p>INTRODUCTION</p><p><br></p><p>L\'image de l\'Afrique noire émerge dans la conscience à partir du 1750 grâce aux témoignages de nombreux écrivains philosophes et voyageurs .Néanmoins, la connaissance du monde noir reste rudimentaire, superficielle, fictive voire fragmentaire et cela pour deux raisons. D\'une part peu d\'explorateurs ont pénétré l\'intérieur du continent; d\'autre part l\'africain lui me reste absent parce que le privilège de prendre la parole lui était refusé. Ainsi la littérature coloniale dégage à la fois une image ambiguë et stéréotypée. Pour les uns, c\'est un continent maudit un repère de démons de sorciers et d\'animaux féroces. C\'est l\'exemple de PIRRE LOTI dans l\'ouvrage LE ROMAN D\'UN SPAHI qui est le cliché de la représentation médiévale .Pour les autres, l\'Afrique est un lieu parasidiaque. Mais de nombreux intellectuels africains vont contribuer à modifier cette perception fallacieuse et négative que l\'occident avait du continent africain. Ainsi s\'impose petit à petit l\'idée selon laquelle chaque peuple chaque civilisation chaque culture possède son originalité sa spécialité ses richesses propres.</p><p><br></p><p>I naissance de la littérature négro- africaine</p><p><br></p><p>La prise de conscience de la spécificité, la lutte contre l\'injustice qui pèse sur le nègre, la réhabilitation de la personnalité nègre, l\'appel à l\'unité à la solidarité de les peuples opprimés vont se faire sentir par la publication et le couronnement de BATOUALA véritable roman négre qui eut le prix concours 1921.L\'auteur est le guyannais René Maran. Il dénonce sans crainte les abus de l\'exploitation coloniale et le traitement inhumain des Noirs en Oubangui Chari. Ce roman qui fait scandale dans le milieu colonial donne le signal du début de la littérature négro-africain d\'expression française qui était engagée politiquement ou contre la colonisation.</p><p>&nbsp;</p><p><br></p><p>I. DEFINITION DE LA NEGRITUDE ET DE LA NEGRO- RENAISSANCE</p><p><br></p><p>&nbsp;</p><p><br></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; La Négritude a des origines Négro- Renaissance dont les objectifs sont :</p><p><br></p><p>1- Affirmer la dignité de l’homme noir en tant que Nègre.</p><p><br></p><p>2-&nbsp; Affirmer la liberté pour le nègre de s’exprimer tel qu’il est, tel qu’il a toujours été.</p><p><br></p><p>3- Défendre son droit au travail, à l’amour, à l’égalité et au respect</p><p><br></p><p>4- Assurer sa culture, son passé de souffrance, son origine&nbsp; africaine.</p><p><br></p><p>&nbsp;</p><p><br></p><p>La Négritude se définit comme étant l’expression d’une race opprimée. Elle est la manifestation d’une manière d’être origine. Elle est un instrument de lutte et un outil esthétique. Jean – Paul SARTRE lui, défini la Négritude comme attitude à l’égard du monde noir ; c’est «l’être dans le monde nègre qui se définit par rapport à la culture blanche et cela débouche sur un racisme anti- raciste&nbsp; ». Quant à Frantz FANON, il écrit que «c’est le blanc qui crée le Nègre ». Pour SENGOR, la Négritude s’entend de deux&nbsp; manière : «Objectivement, dit- il, la Négritude, c’est l’ensemble&nbsp; des valeurs des civilisations propres au monde noir d’Afrique, mais encore d’Asie et d’Océanie sans oublier les Noirs de la diaspora&nbsp; américaine. Sens de la communion, sens de la communauté, sens de l’image symbolique et du rythme. Subjectivement, la Négritude c’est la manière dont chaque Nègre vit les valeurs que voilà selon son continent, sa nation ».</p><p><br></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;SENGHOR pense ainsi que la Négritude n’est ni racisme, ni micro- nationalisme. Si elle est enracinement dans la terre africaine, elle n’en est pas moins ouverture aux autres continents, aux autres races, aux autres nations, aux autres cultures. C’est donc une négritude qui est la négation de Négritude raciste.</p><p><br></p><p>&nbsp;</p><p><br></p><p>&nbsp;II-&nbsp; ORIGINE DE LA NEGRITUDE</p><p><br></p><p>&nbsp;</p><p><br></p><p>&nbsp; &nbsp; &nbsp; &nbsp; La littérature négro- africaine est née d’abord aux Etats- Unis. Ce sont les intellectuels&nbsp; noirs de la diaspora américains qui ont été les premiers à prendre conscience&nbsp; de leurs conditions et à affirmer la dignité de la personnalité noire jusque-là bafoué par l’esclavage et colonisation. Cet engagement des intellectuels noirs américains a suscité le même engouement et la même détermination chez les jeunes intellectuels africains en étude chez les colons. Dès lors, le combat littéraire était devenu le cheval de batail de tous ceux qui avaient fait de la plume leur compagne de dénonciation.</p><p><br></p><p>&nbsp;</p><p><br></p><p>A) LA NEGRO- RENAISSANCE(NEW NEGRO)</p><p><br></p><p>&nbsp;</p><p><br></p><p>&nbsp; &nbsp; La Négro renaissance est le germe du mouvement de la Négritude avec William Edward Burghard du Bois (WEB Du Bois, 1868 : année de sa naissance). Il est également l’un des premiers intellectuels noirs américains à faire des études universitaire et à décrocher un doctorat en philosophie dans la, célèbre université de Harvard. Il est également l’un des premiers noirs&nbsp; à franchir l’une les barrières imposées aux Noirs par la siccité blanche. Il écrivit Ames noirsdont le titre en anglais est Souls of black Folk en 1903 où il dénonça la situation des noirs aux USA et estima nécessaire d’effacer de l’esprit des Blancs et des Noirs, l’image du Nègre sous- homme, inconscient et taré. Cet essai sociologique sur la condition des anciens esclaves africains en Amérique constitue un véritable document pour les noirs enquête de liberté. Considéré comme le père du mouvement de la Négritude, WEB Du Bois a combattu les bourgeois nègres qui tentaient vainement de s’intégrer à la société blancs et, la ségrégation raciale et l’exploitation des Noirs par les Blancs. Son mouvement qui est un cri lancé aux USA sera entendu dans le monde entier et en 1905, il déclare à partir du mouvement NIAGARA (c’est le regroupement de tous les intellectuels noirs américains : «je suis nègre et me glorifie de ce nom ; je suis fier du sang noir qui coule dans mes veines», devenant ainsi le premier Noir à reconnaître sa race et à l’aimer.</p><p><br></p><p>&nbsp; &nbsp;Du Bois, reconnaissant ses origines africaines, fonda l’Association pour la défense des personnes de couleur (1919- 1945). Il prend la tête du mouvement panafricain qui protestait contre l’impérialiste en Afrique. A la même époque, Marcus GARVEY avait lancé le mouvement «Come back Africa ». Il prônait le retour massif des Noirs Américains en Amérique en tant qu’Américains et incitait les Africains à se libérer sur leur propre sol.</p><p><br></p><p>&nbsp;</p><p><br></p><p>B) LEMOUVEMENT DE LA NEGRO- RENAISSACE</p><p><br></p><p>&nbsp; &nbsp; &nbsp; Autour des années 1920 à Harlem se cristallisa le mouvement qui devait s’appeler plus tard «Renaissance nègre ». C’est un mouvement social et littéraire qui dénonçait&nbsp; la situation de mendiant culturel du nègre américain. Le mouvement&nbsp; manifeste sa volonté aussi de réhabiliter un long passé déformé par l’idéologie esclavagiste : c’est une quête spirituel. Mais la contre- attaque blanc fut cinglante et le mouvement échoua. Alors, beaucoup de jeune Noir s’exilèrent en Europe, surtout en France parmi&nbsp; lesquels Jean Cooper, Country Cullen, Claude Mac Kay. Ils se sont installés à Paris.</p><p><br></p><p>&nbsp;</p><p><br></p><p>C) L’ECOLE DE HAITI : UN PARADOXE- UNE DYNAMIQUE</p><p><br></p><p>&nbsp;</p><p><br></p><p>&nbsp;Il est important de dire d’abord que Haiti a accédé à son indépendance en 1804 sous l’impulsion de Toussaint LOUVETURE, ancien esclave qui dirigea une révolution. Il aura pour successeur de renom Dessaline&nbsp; et le roi Christophe qui voulurent continuer son œuvre. Malheureusement, le pouvoir glissa et tomba entre les mains des bourgeois mulâtres qui collaboraient des intellectuels. C’est ainsi que sur le plan culturel, on assista à une assimilation des intellectuels. Par exemple, dans le domaine littéraire, les Antillais avaient une littérature calquée sur le modèle de la littérature française. On tente d’imiter le plus possible. Baudelaire, Hugo, Verlaine et les poètes parnassiens par le service. Ils faisaient donc de la littérature pastiche, c’est- à- dire la description des paysages exotiques, des évanescences crépusculaires et des idylles mélancoliques. Et tout cela traduisait les aspirations de la bourgeoisie antillaise qui&nbsp; avait honte de sa couleur noir et voulait effacer son passé nègre en imitant le Blanc, c’est- à- dire se franciser, s’assimiler à la race blanche, c’est- à- dire blanchir. Cela est le phénomène de l’assimilation culturelle.</p><p><br></p><p>&nbsp; &nbsp; &nbsp;Mais le cours de l’histoire a changé avec l’occupation américaine du territoire haïtien suite à des troubles politiques en 1915. Alors on assiste à l’insurrection des jeunes poètes antillais contre l’assimilation culturelle. Etienne Leroux,lui, qualifie ses prédécesseurs de&nbsp; « poète de caricature ». Par un retour au patriotisme authentique, les intellectuels s’intéressent du coup à leur folklore et aux traditions indigènes. Ils se mirent à étudier les mœurs, les croyances, les contes haïtiens détenus par les pauvres paysans analphabètes. Ils connurent cette culture populaire et se mirent à son école. C’est ainsi que contre la littérature bourgeoise, Suzanne CESAIRE écrit dans la revu Tropiques en 1941 : «De la littérature. Oui. Littérature de Hamac. Littérature de sucre et de vanille. Tourisme littéraire… Allons, la vraie poésie est ailleurs. Loin des rimes, des complaintes, des alizés, des perroquets et bambou. Nous décrétons la mort de la littérature doudou et zut à l’hibiscus, à la frangipane, au bougainvillier. La poésie martiniquaise sera cannibale ou ne sera pas ».Et Léon Gontran Damas d’ajouter que ce sont des poètes de la décalcomanie.</p><p><br></p><p>&nbsp; &nbsp; &nbsp; Les jeunes poètes martiniquais fondèrent pour cela la Reyue des griots sous l’égide du docteur Price Mars.</p><p><br></p><p>&nbsp;</p><p><br></p><p>III- LES TRIBUNES D’EXPRESSION DES ADAEPTES DE LA NEGRITUDE&nbsp;</p><p><br></p><p>&nbsp;</p><p><br></p><p>&nbsp; &nbsp; Si la Négritude a pu s’imposer à la critique en tant que courant et esthétique littéraires, cela est dû en partie à sa large diffusion. A cet effet, des revenues, des journaux et d’autres moyens de publication ont été utilisés.</p><p><br></p><p>A) LEGITIME DEFENSE. (Revue fondé en 1932 à Paris)</p><p><br></p><p>Légitime défense est un titre emprunté é André Breton, et se montre volontairement provocant ; il s’agit d’une revue publiée en France par des étudiants matiniqais dont Etienne Leroux, Réné Menil, Jules marcel, Monnerot. Ces étudiants entendaient défendre la personnalité antillaise méprisée pendant des siècles d’esclavage et de colonisation. Elle avait pour orientation :</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; La satire de la bourgeoisie antillaise ;</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Une analyse de la misère du peuple ;</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Une critique du mimétisme culturel et du psittacime littéraire.</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Légitime défense apparaît alors comme une réalisation contre la littérature d’imitation de style, la liberté d’imagination et du tempérament maigre. Voila ce que fut légitime défense qui fut suspendue. Ses animateurs perdirent leur bourse et leurs parents qui faisaient partie de la bourgeoisie de couleur que la revue stigmatisait si brutalement leur supprimèrent les subsides. Malgré tout, leur persévérance conduisit ces étudiants à continmeur à diffuser leurs idées à travers des conférences et des réunions.</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; B) L’ ETUDIANT NOIR (1934 – 1940)</p><p><br></p><p>&nbsp;</p><p><br></p><p>Légitime défense&nbsp; a véritablement fait des émules et c’est ainsi qu’après son interdiction, le groupe «&nbsp; L’Etudiant noir «&nbsp; lui succéda en 1940. C’est un groupe qui se proposait de mettre fin au système en vigueur au Quartier latin et de rattacher les Noirs à leurs tradition, à leur histoire et à la leurs langues. Selon Léon Gontran DAMAS , on cessait d’être étudiant martiniquais guadeloupéen, guyanais, africain ou malgache pour n’être plus qu’un seul et même étudiant noir. Le journal corporatiste de combat qu’était L’Etudiant noir eut ainsi le mérite de réunir tous les les étudiants noirs de Paris. Il opéra- aussi la prise de conscience des intérêts à travers leur origine. Il revendique par ailleurs la liberté créatrice du Nègre par le retour aux sources africaines. Une des figures de proue de ce groupe, Léopold Sedar Senghor soutient que l’histoire des Nègres&nbsp; est un drame en trois épisodes :</p><p><br></p><p>&nbsp; 1- Les Nègre furent d’abord asservis parce que, disait- on, c’étaient des brutes, des idiots, bref une animalité, un anachronisme.</p><p><br></p><p>2- Puis, on tourna vers eux un regard plus indulgent. On s’est dit qu’ils valent quand même mieux que leur réputations (ils ne sont pas méchants).</p><p><br></p><p>3- Et on a essayé de les former : c’est le stade du paternalisme qui, faisant du Nègre un grand enfant, prépare l’assimilation.</p><p><br></p><p>Mais les jeunes Nègres d’aujourd’hui ne veulent ni asservissement, ni assimilation. Ils veulent l’émancipation ; ils donc être des hommes. Alors, plus de passivité.</p><p><br></p><p>La Négritude est la remise en cause du principe de la mission civilisatrice de l’Occident vis- à- vis des pays réputés «sauvages ». C’est pourquoi L. DIAKHATE écrit : « La négritude est fille de l’histoire ». Et Théodore MONOD d’ajouter que «le Noir n’est pas un homme sans passé, il n’est pas tombé d’un arbre avant-hier. L’Afrique est littéralement pourrie de vestiges et il est donc absurde de continuer à la regarder comme une table rase à la surface de laquelle on peut bâtir ab nihilo (sans aucun résistance) n’importe quoi ».&nbsp;</p><p><br></p><p>Le groupe «l’Etudiant noir», contrairement à Légitime Défense resta à l’écran du communisme car ses adeptes divergeaient sur bien des points bien qu’ils reconnussent au socialisme son incontestable valeur en tant que méthode de recherche et technique de révolution politique. Il opta donc pour un départ sur des bases nouvelles et non sur les doctrines qui, à tout prendre, étaient des créations européennes. Les tenants du journal ont donc exprimé la prise de conscience de leur appartenance à une race qui a son histoire et ses valeurs. Car, comme la race noir était sous la dépendance étrangère, le Noir pour se réaliser devait être politiquement et culturellement libre. C’est dans ce sens que Senghor disait : «Pour asseoir une révolution efficace, il nous débarrasser de nos vêtements d’emprunt, ceux de l’assimilation et affirme notre être, c’est- à- dire notre négritude».</p><p><br></p><p>Au plan littéraire, malgré les liens étroits qui unissaient le groupe «L’Etudiant noir et des surréalistes comme Philippe SOUPAULT ET Robert DESNOS, il est préconisé que le surréalisme ne soit qu’un instrument, c’est- à- dire un moyen passager pour retrouver l’origine du Nègre. Il faut donc une réconciliation des Noirs avec eux- mêmes. Le Nègre acteur ne vit pas, il joue un rôle. Il faut l’affirmation de la singularité ethnique, la reprise en main de son destin de Noir. On peut retenir que ce groupe a eu une grande influence sur les intellectuels africains et antillais qui venaient en France et cela grâce au trio CESAIRE,SENGHOR , DAMAS entourés de Léonard BAINVILLE, Aristide NAUGEE, Birago DIOP, Ousmane SOCE et autres.</p><p><br></p><p>C. PRESENCE AFRICAINE (1947)</p><p><br></p><p>Si la seconde Guerre mondiale interrompit la parution de L’Etudiant noir, elle n’a pas pu interrompre l’activité des étudiants. L’&amp;quipe fut un instant disloquée : Senghor est appelé au front comme tirailleur, Césaire partit pour la Martinique où il rayonne sur toutes les Antilles françaises jusqu’à Haiti et fonda la revue Tropiques. Quant à Damas, après avoir connu des ennuis politiques, il vécut dans le silance et la retraite. Mais bientôt le groupe se reforma autour du Sénégalais Alioune DIOP et connut l’adhésion d’autre personnalités comme Paul NIGAR et Guy TIROLIER (Gudeloupéens), Bernad B. DADIE, Apithy Béhanzin et Rabemanjara. C’est ce noyau qui allait donner naissance à la revue Présence africaine à Paris. Le premier numéro de cette revue qui allait rapidement devenir l’organe du monde noir en France tend encore aujourd’hui à l’être dans l’Afrique toute entière. Elle était parrainée par par de grands écrivains et intellectuels français dont BALANDIER. Il y avait naturellement des écrivains noirs d’une grande renommée que sont&nbsp; Sengor et&nbsp; Césaire et l’Américain Richard&nbsp; WRIGHT et le Dahonéen Paul&nbsp; HAZOUME.</p><p><br></p><p>&nbsp; &nbsp; &nbsp;Présence africaine s’ent montrée très ouverte à tous. C’était une tribune où tous les penseurs et les écrivains, les politiciens et les sociologues, les sages traditionnels et les jeunes universitaires tentaient de définir l’originalité africaine et hâter son insertion dans le monde moderne. La revue va tourner toutes ses préoccupations vers l’Afrique noir. En dehors de l’objectif culturel qu’elle s’était fixé, elle va poser en outre le problème de la colonisation dans toute son ampleur. La démarche est que pour réaliser la véritable reconnaissance culturelle, il faut au préalable une libération politique et c’est pour quoi Alioune DIOP a soutenu que les hommes de culture en Afrique ne peuvent pas se désintéresser de la politique qui est une condition nécessaire de la reconnaissance culturelle. Ce dernier ne va d’ailleurs pas se limiter à l’animation de Présence africaine. Il va co- fonder «La société de la culture »présidée par le docteur Jean PRICE MARS. C’est une association qui organisera des cycles de conférences destinées à faire connaître l’homme noir et ses préoccupations.</p><p><br></p><p>Aujourd’hui, Présence africaine existe sous la forme de maison d’édition qui publie régulière les œuvres littéraires des écrivains africains qui leur sollicitent le service.&nbsp;&nbsp;</p><p><br></p><p>IV – QUEQUES TENANTS DE LA NEGRITUDE EN ZOOM</p><p><br></p><p>Il connaît une influence maladive dans une famille bourgeoise et reçoit une éducation française. Cependant il prend contacte avec les Noirs esclave de la guerre française. Il côtie&nbsp; Césaire et Senghor en France et c’est à travers son œuvre qu’on découvre sa haine pour la culture occidentale et son attachement à la culture africaine.</p><p><br></p><p>&nbsp; En 1937, il publie pigments, un recueil de poème qui lui valut un prestige incontesté dans le milieu des étudiants noirs à Paris. Cette opposition est caractérisée d’un côté par les vices du monde occidental à savoir «l’écrasement de l’individu », la «prostitution», «l’hypocrisie »,«la cruauté »,etc. De l’autre côté, il s’agit de l’intégrité, de la pureté du monde noir. C’est pour Damas le rejet total du monde occidental. Sa révolte contre l’Europe a imposée au peuple noir se présente dans son recueil en trois mouvements/</p><p><br></p><p>&nbsp; &nbsp; &nbsp; &nbsp;a) Le poète prend conscience de la destruction de son monde. Le premier poète du recueil marque l’arrivée de l’homme blanc. Celui- là apporte la mort, la dépersonnalisation en rejetant toues les valeurs de l’homme noir.</p><p><br></p><p>&nbsp; &nbsp; &nbsp; b) Le poète découvre son assimilation illusoire. L’homme noir appartiens à une race spécifique et ne peut s’intégrer à la race blanche.</p><p><br></p><p>&nbsp; &nbsp; &nbsp;c) Le poète doit se libérer et libérer toue la race. Il tentera alors de faire naitre en eux un sentiment de haine et de révolte.</p><p><br></p><p>On peut retenir quelques unes de ses œuvres que sont :</p><p><br></p><p>&nbsp; Pigments (1937)</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Retour de Guyane (1938)</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Veillées noires (contes de son pays : 1943)</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Grouffiti (1956)</p><p><br></p><p>2- AIME CESAIRE (1913 à la Martinique)</p><p><br></p><p>&nbsp; &nbsp; &nbsp; &nbsp;Il a fait une licence en lettre à l’école normale supérieure. Il s’installe à Paris où il fréquent, le selon littéraire de René MARAM, participe à la rédaction de différente revues des Noirs. Il rencontre Senghor et Damas avec lesquels ils vont donner vie au journal L’Etudiant noir. Son premier grand poète est Cahier d’un retour au pays natal publié en 1939 où il retrace l’ensemble de son aventure spirituel à l’encontre des clichés en cours. Il voit les Antilles malheureusement et sinistrées, rongées par la peur et la famine. C’est qu’il cherche à assumer le malheur de son peuple : « Je suis un homme juif</p><p><br></p><p>Un homme- cafre</p><p><br></p><p>Un homme de Harlem- qui- ne vote pas</p><p><br></p><p>L’homme- famine, l’homme insulte, l’homme torture».</p><p><br></p><p>Mais le geste lui parait insuffisant. Il reconnaît la nécessiter du combat pour ruiner la raison occidentale responsable de ce malheur pour retrouver sous l’incapacité nègre :</p><p><br></p><p>«Ceux qui n’ont inventé ni la, poudre ni la boussole :</p><p><br></p><p>&nbsp; Ceux qui n’ont jamais su dompter ni la vapeur ni l’électricité ;</p><p><br></p><p>&nbsp; &nbsp;Ceux qui n’ont imploré ni mer ni ciel»,</p><p><br></p><p>Comme lacunes de sa race et ce qu’elle a&nbsp; de propre. Il recrée alors une Afrique de liberté, de bonheur simple et immédiat, une Afrique qui sera capable d’apporter « au monde blanc horriblement las de son effort immense», le sens de l’humain qui le déserte.</p><p><br></p><p>Comme œuvres de sa bibliographie, il ya entre autres :</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; cahier d’un retour au pays natal (1939)</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Les Armes miraculeuses (1946)</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Soleil coupé (1948)</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Discours sur le colonialisme (Essai 1954)</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Et les chiens taisaient (1956)</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Une saison au Congo 1968)</p><p><br></p><p>&nbsp;</p><p><br></p><p>3 – LEOPOLD SEDAR SENGHOR(1906 au Sénégal)</p><p><br></p><p>Il est né d’une famille riche mais est entièrement élevé par les religieux européens. Parti pour la France après son baccalauréat, il participe intensément aux différentes activités des Noirs à Paris. Sa fonction de président de l’Association des étudiants nègres le le familiarise avec certains problèmes politiques. Licencié ès lettres, professeur de lycée en France et enfin agrégé de grammaire en 1939, Senghor avait été entièrement instruit, modelé dans un système de pensée étranger à l’Afrique, il est accueilli avec les honneurs nationaux. C’est ce qui explique l’ambiguïté de sa personnalité. Il est ainsi un métis culture mais quoi qu’il en soit, Senghor affirme lui aussi sa solidarité avec les opprimés et est constructeur&nbsp; d’une Afrique qui prendra place parmi les nations dans la liberté et la dignité. Il dira :&nbsp; «J’y ai vécu jadis, vu de mes yeux, de mes oreilles entendu les être fabuleux par là et les choses. Il m’a suffi de nommer les choses, les éléments de mon univers enfantin, pour prophétiser la cité de demain qui mettra des&nbsp; cendres de l’ancienne » Senghor fait montre de ses qualités littéraires et de métissage culturel. Dans son deuxième recueil Hostie noires (1948), il met l’accent sur la contribution des Noirs plutôt que sur le sacrifice des Africains pendant la Seconde Guerre mondiale. Dans Ethiopiques, c’est la femme africaine comme symbole de l’Afrique mère (épouse) qui est magnifiée. Il faut toutefois retenir que Senghor, pionnier de la Négritude, milite en faveur d’une civilisation de l’universel, qui serait le « rendez- vous du donner et du recevoir entre les civilisations&nbsp; africaines et occidentales ».</p><p><br></p><p>&nbsp;</p><p><br></p><p>V- BILAN DE NECRITUDE.</p><p><br></p><p>Si la Négritude a reçu le soutien ouvert de certains écrivains et intellectuels européens comme Jean Paul SARTRE et les autres, il faut aussi que d’autres ont jeté des pierres dans le Jardin des tenants du concept. Il y a en effet de nombreux détracteurs dont un groupe rejette totalement la Négritude tandis que l’autre la critique de façon nuancée puisque leurs flèches profèrent sur un aspect on sur un autre.</p><p><br></p><p>On a d’abord les spécialistes des questions africaines ( les ethnologues et les anthropologues) qui estiment que l’unité culturelles que la Négritude supposée serait un mythe parce que&nbsp; le continent africain renferme de nombreuses civilisation avec les systèmes de valeurs différents, des modes de vie et des idéologies hétérogènes qui se côtoient sans se mêler.</p><p><br></p><p>Par ailleurs, il faut citer les marxistes qui voient dans la Négritude une mystification. ils estiment que lorsqu’ on mettra en place des structures sociales ( marxistes) et que l’un aura posé le problème des Nègres en termes de classe et non de race, les phénomènes psychologiques et sociaux engendrés par le retard technologique et la situation coloniale disparaîtront et à ce moment – là, la Négritude n’aura été qu’un point de vue de ce phénomènes psychologiques et sociaux&nbsp; engendrés par le retard technologique et la situation coloniale disparaîtront et à ce moment la, la Négritude n’aura été qu’un point de vue de ce phénomène. Mais s’il y’a eu des diatribes acerbes contre la Négritudes, elles viennent surtout de l’Afrique même. Le point de vue des intellectuels noirs anglophones à ce propos est sans équivoque. Ils contestent la Négritude d’une manière âpre. Leur porte parole est Wolé SOYINKA, auteur de la célère boutade&nbsp; «&nbsp; le tigre ne proclame pas sa trigritude. Il saute, tue sa proie et la mange. »</p><p><br></p><p>C’est un groupe qui rassemble la jeune génération des écrivants noirs analophones. Ils promet la personnalité africaine ( l’African personnality) Il s’agit des Nigérians Chinua Achebe,Wole SOYINKA, Jean Pierre CLARK et le Sud –fricain Ezechiel MPHALFLE Réunis au sein du MBARI CLUB&nbsp; dans le cadre de l’université d’Ibadan, ils sont éditeurs de la revue BLACK ORPHEUS. Ces écrivains entendent prendre leurs distances vis-à-vis de la Négritude qu’ils trouvent dangereuse à plus d’un titre. Pour eux, la Négritudes a un caractère d’abstration manichéiste. Elle proclame la Négritude sans agir ni dire comment changer les choses. Il attribuent la Négritude un caractère romatique. C’est , selon eux, une autocontemplation narcissique et une subjectié telle, qu’elle a tendance à faire de l’Afrique traditionnelle de symbole utopique d’innocence et de pureté figé pour toujours dans la dimension de mythe.</p><p><br></p><p>En effet, ce sont le plus souvent des Francophones qui sont les Champions de la Négritude. Ils ont donc été marqué par la pensée philosophique du XVIIIè siècle avec leur Humanisme idéaliste, unitaire et centralisateur. En face d’eux, les Anglophones sont fortement influencés&nbsp; par la pensée pragmatique anglo- saxonne.</p><p><br></p><p>Il est à souligner qu’en déhors de tous les groupes mentionnées, la dynmique interne va produire plus tard une autocritique qui poussera des auteurs africains francophones à réviser leur conception de la Négritude. Cela a donné naissance à la seconde génération de la Négritude. Ce sont surtout des penseurs comme les Zairois Mabika KALANDA, V.Y MUDIMBE, les Camerounais Martien TOWA, Njoh MOULLE, le Béninois&nbsp; Stanislas&nbsp; ADOTEVI qui dénoncent le caractère passéiste de la Négritude. Le groupe des Ousmane SEMBEN, Mongo BETI et autres soutiennent que l’Afrique n’a pas qu’une culture saine et idyllique. Ils dénoncent d’ailleurs à l’occasion ses laideurs. Ils rejoignent ainsi sur certains points les intellectuels noirs anglophones.</p><p><br></p><p>Lors du colloque organisé par le centre d’études littéraires francophones de l’université Paris Nord en janvier 1973, les travaux ont porté sur une confrontation entre Négritude africaine et Négritude des Caraïbes où plusieurs intervenants se sont livré à un procès véritable de la Négritude. Certains ont pensé qu’on ne peut pas chanter éternellement. L’esclavage et les souffrances du Noir à travers des siècles. D’autre&nbsp; ont plutôt dénoncé les manipulation dont la Négritude est l’objet de la d’un certain nombre de leaders du monde noir en particulier en Haïti où, au&nbsp; nom de la Négritude, DUVALIER a laissé pour tout héritage à ses concitoyens rien que trois mots cauchemars : tyrannie, Tonton macoute et arriération. Mais la tendance générale était l’acquittement, du moins des circonstances atténuantes pour Aimé CESAIRE qui s’intéressait plus à la condition du Noir dans le monde, à la misère, à l’exploitation dont il est victime en Europe, en Amérique, aux Antilles ou en Afrique qu’au problème de sa culture particulière jugée secondaire. Quand à Senghor, ils lui ont beaucoup reproché son penchant fort pour l’aspect culturel de la Négritude.</p><p>CONCLUSION</p><p>&nbsp; &nbsp; Considérée comme concept miracle au départ par de nombreux partisans de l’émancipation du monde noir par la culture et la littérature, la Négritude a connu une évolution émaillée de controverses. On peut retenir néanmoins qu’avec ce concept, les intellectuels noir avaient déjà trouvé le cadre approprié pour l’engagement. En effet, la Négritude constituait un motif et servait de propagande d’une idéologie de libération des peuples noirs.&nbsp;</p><p><br></p><p>&nbsp; Dans&nbsp; &nbsp;tous le cas, aucun mouvement si justifié et si important ne peut se développer sans critique et contestation. On ne s’étonnera donc par de voir la Négritude remise en cause à certains égards. Dans un chapitre de ces Damnés de la terre, consacré à la culture nationale, Frantz FANON s’interroge sur l’efficacité du&nbsp; mouvement et aboutit à la conclusion qu’elle ne peut que conduire à une impasse. Rejetant cette conception de la culture qu’il estime folklorique, il engage donc ses amis à méfier du mythe et de l’amitié&nbsp; terre /mer et accorder la priorité au combat pour l’indépendance politique. Les attaques contre la Négritude et plus spécifiquement contre Senghor,&nbsp; champion du mouvement devaient être reprises et amplifiées lors du festival d’Alger en 1968 (Festival mondial des arts nègres). Elles ont donné naissance à plusieurs pamphlets parmi lesquels «Négritude ou servitude» (1971) de Martien TOWA « Négritude et Négrologues » (1972) de Stanislas ADOTEVI.</p><p><br></p><p>Il faut toutefois reconnaître après tout que la création et l’animation du mouvement n’ont pas été un coup d’épée dans l’eau. Car on peut dire que faisant suite à la Négritude, l’Institut des peuples noirs (IPN) n’est pas moins une idée lumineuse destinée à réhabiliter l’homme noir et même lui refaire une place au soleil.&nbsp;&nbsp;</p>', 0, 2, 1);
INSERT INTO `chapters` (`id`, `uid`, `createdAt`, `updatedAt`, `title`, `slug`, `content`, `views`, `courseId`, `published`) VALUES
(17, '4499f109-64b7-465d-a3eb-79d9b6c334d1', '2023-02-06 15:33:10.841662', '2023-02-06 15:33:10.841662', 'L\'Afrique des indépendances', 'lafrique-des-independances', '<p>INTRODUCTION</p><p>L\'image de l\'Afrique noire émerge dans la conscience à partir du 1750 grâce aux témoignages de nombreux écrivains philosophes et voyageurs .Néanmoins, la connaissance du monde noir reste rudimentaire, superficielle, fictive voire fragmentaire et cela pour deux raisons. D\'une part peu d\'explorateurs ont pénétré l\'intérieur du continent; d\'autre part l\'africain lui me reste absent parce que le privilège de prendre la parole lui était refusé. Ainsi la littérature coloniale dégage à la fois une image ambiguë et stéréotypée. Pour les uns, c\'est un continent maudit un repère de démons de sorciers et d\'animaux féroces. C\'est l\'exemple de PIRRE LOTI dans l\'ouvrage LE ROMAN D\'UN SPAHI qui est le cliché de la représentation médiévale .Pour les autres, l\'Afrique est un lieu parasidiaque. Mais de nombreux intellectuels africains vont contribuer à modifier cette perception fallacieuse et négative que l\'occident avait du continent africain. Ainsi s\'impose petit à petit l\'idée selon laquelle chaque peuple chaque civilisation chaque culture possède son originalité sa spécialité ses richesses propres.</p><p><span style=\"color: var(--tblr-offcanvas-color); font-size: 1.1rem; font-weight: var(--tblr-body-font-weight); letter-spacing: 0px; text-align: var(--tblr-body-text-align);\">I naissance de la littérature négro- africaine</span></p><p>La prise de conscience de la spécificité, la lutte contre l\'injustice qui pèse sur le nègre, la réhabilitation de la personnalité nègre, l\'appel à l\'unité à la solidarité de les peuples opprimés vont se faire sentir par la publication et le couronnement de BATOUALA véritable roman négre qui eut le prix concours 1921.L\'auteur est le guyannais René Maran. Il dénonce sans crainte les abus de l\'exploitation coloniale et le traitement inhumain des Noirs en Oubangui Chari. Ce roman qui fait scandale dans le milieu colonial donne le signal du début de la littérature négro-africain d\'expression française qui était engagée politiquement ou contre la colonisation.</p><p>I. DEFINITION DE LA NEGRITUDE ET DE LA NEGRO- RENAISSANCE</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; La Négritude a des origines Négro- Renaissance dont les objectifs sont :</p><p>1- Affirmer la dignité de l’homme noir en tant que Nègre.</p><p>2-&nbsp; Affirmer la liberté pour le nègre de s’exprimer tel qu’il est, tel qu’il a toujours été.</p><p>3- Défendre son droit au travail, à l’amour, à l’égalité et au respect</p><p>4- Assurer sa culture, son passé de souffrance, son origine&nbsp; africaine.</p><p>La Négritude se définit comme étant l’expression d’une race opprimée. Elle est la manifestation d’une manière d’être origine. Elle est un instrument de lutte et un outil esthétique. Jean – Paul SARTRE lui, défini la Négritude comme attitude à l’égard du monde noir ; c’est «l’être dans le monde nègre qui se définit par rapport à la culture blanche et cela débouche sur un racisme anti- raciste&nbsp; ». Quant à Frantz FANON, il écrit que «c’est le blanc qui crée le Nègre ». Pour SENGOR, la Négritude s’entend de deux&nbsp; manière : «Objectivement, dit- il, la Négritude, c’est l’ensemble&nbsp; des valeurs des civilisations propres au monde noir d’Afrique, mais encore d’Asie et d’Océanie sans oublier les Noirs de la diaspora&nbsp; américaine. Sens de la communion, sens de la communauté, sens de l’image symbolique et du rythme. Subjectivement, la Négritude c’est la manière dont chaque Nègre vit les valeurs que voilà selon son continent, sa nation ».</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;SENGHOR pense ainsi que la Négritude n’est ni racisme, ni micro- nationalisme. Si elle est enracinement dans la terre africaine, elle n’en est pas moins ouverture aux autres continents, aux autres races, aux autres nations, aux autres cultures. C’est donc une négritude qui est la négation de Négritude raciste.</p><p>&nbsp;II-&nbsp; ORIGINE DE LA NEGRITUDE</p><p><span style=\"color: var(--tblr-offcanvas-color); font-size: 1.1rem; font-weight: var(--tblr-body-font-weight); letter-spacing: 0px; text-align: var(--tblr-body-text-align);\">&nbsp; &nbsp; &nbsp; &nbsp; La littérature négro- africaine est née d’abord aux Etats- Unis. Ce sont les intellectuels&nbsp; noirs de la diaspora américains qui ont été les premiers à prendre conscience&nbsp; de leurs conditions et à affirmer la dignité de la personnalité noire jusque-là bafoué par l’esclavage et colonisation. Cet engagement des intellectuels noirs américains a suscité le même engouement et la même détermination chez les jeunes intellectuels africains en étude chez les colons. Dès lors, le combat littéraire était devenu le cheval de batail de tous ceux qui avaient fait de la plume leur compagne de dénonciation.</span></p><p>A) LA NEGRO- RENAISSANCE(NEW NEGRO)</p><p>&nbsp; &nbsp; La Négro renaissance est le germe du mouvement de la Négritude avec William Edward Burghard du Bois (WEB Du Bois, 1868 : année de sa naissance). Il est également l’un des premiers intellectuels noirs américains à faire des études universitaire et à décrocher un doctorat en philosophie dans la, célèbre université de Harvard. Il est également l’un des premiers noirs&nbsp; à franchir l’une les barrières imposées aux Noirs par la siccité blanche. Il écrivit Ames noirsdont le titre en anglais est Souls of black Folk en 1903 où il dénonça la situation des noirs aux USA et estima nécessaire d’effacer de l’esprit des Blancs et des Noirs, l’image du Nègre sous- homme, inconscient et taré. Cet essai sociologique sur la condition des anciens esclaves africains en Amérique constitue un véritable document pour les noirs enquête de liberté. Considéré comme le père du mouvement de la Négritude, WEB Du Bois a combattu les bourgeois nègres qui tentaient vainement de s’intégrer à la société blancs et, la ségrégation raciale et l’exploitation des Noirs par les Blancs. Son mouvement qui est un cri lancé aux USA sera entendu dans le monde entier et en 1905, il déclare à partir du mouvement NIAGARA (c’est le regroupement de tous les intellectuels noirs américains : «je suis nègre et me glorifie de ce nom ; je suis fier du sang noir qui coule dans mes veines», devenant ainsi le premier Noir à reconnaître sa race et à l’aimer.</p><p>&nbsp; &nbsp;Du Bois, reconnaissant ses origines africaines, fonda l’Association pour la défense des personnes de couleur (1919- 1945). Il prend la tête du mouvement panafricain qui protestait contre l’impérialiste en Afrique. A la même époque, Marcus GARVEY avait lancé le mouvement «Come back Africa ». Il prônait le retour massif des Noirs Américains en Amérique en tant qu’Américains et incitait les Africains à se libérer sur leur propre sol.</p><p>B) LEMOUVEMENT DE LA NEGRO- RENAISSACE</p><p><span style=\"background-color: var(--tblr-offcanvas-bg); color: var(--tblr-offcanvas-color); font-size: 1.1rem; font-weight: var(--tblr-body-font-weight); letter-spacing: 0px; text-align: var(--tblr-body-text-align);\">&nbsp; &nbsp; &nbsp; Autour des années 1920 à Harlem se cristallisa le mouvement qui devait s’appeler plus tard «Renaissance nègre ». C’est un mouvement social et littéraire qui dénonçait&nbsp; la situation de mendiant culturel du nègre américain. Le mouvement&nbsp; manifeste sa volonté aussi de réhabiliter un long passé déformé par l’idéologie esclavagiste : c’est une quête spirituel. Mais la contre- attaque blanc fut cinglante et le mouvement échoua. Alors, beaucoup de jeune Noir s’exilèrent en Europe, surtout en France parmi&nbsp; lesquels Jean Cooper, Country Cullen, Claude Mac Kay. Ils se sont installés à Paris.</span><br></p><p><span style=\"background-color: var(--tblr-offcanvas-bg); color: var(--tblr-offcanvas-color); font-size: 1.1rem; font-weight: var(--tblr-body-font-weight); letter-spacing: 0px; text-align: var(--tblr-body-text-align);\">C) L’ECOLE DE HAITI : UN PARADOXE- UNE DYNAMIQUE</span></p><p>&nbsp;Il est important de dire d’abord que Haiti a accédé à son indépendance en 1804 sous l’impulsion de Toussaint LOUVETURE, ancien esclave qui dirigea une révolution. Il aura pour successeur de renom Dessaline&nbsp; et le roi Christophe qui voulurent continuer son œuvre. Malheureusement, le pouvoir glissa et tomba entre les mains des bourgeois mulâtres qui collaboraient des intellectuels. C’est ainsi que sur le plan culturel, on assista à une assimilation des intellectuels. Par exemple, dans le domaine littéraire, les Antillais avaient une littérature calquée sur le modèle de la littérature française. On tente d’imiter le plus possible. Baudelaire, Hugo, Verlaine et les poètes parnassiens par le service. Ils faisaient donc de la littérature pastiche, c’est- à- dire la description des paysages exotiques, des évanescences crépusculaires et des idylles mélancoliques. Et tout cela traduisait les aspirations de la bourgeoisie antillaise qui&nbsp; avait honte de sa couleur noir et voulait effacer son passé nègre en imitant le Blanc, c’est- à- dire se franciser, s’assimiler à la race blanche, c’est- à- dire blanchir. Cela est le phénomène de l’assimilation culturelle.</p><p>&nbsp; &nbsp; &nbsp;Mais le cours de l’histoire a changé avec l’occupation américaine du territoire haïtien suite à des troubles politiques en 1915. Alors on assiste à l’insurrection des jeunes poètes antillais contre l’assimilation culturelle. Etienne Leroux,lui, qualifie ses prédécesseurs de&nbsp; « poète de caricature ». Par un retour au patriotisme authentique, les intellectuels s’intéressent du coup à leur folklore et aux traditions indigènes. Ils se mirent à étudier les mœurs, les croyances, les contes haïtiens détenus par les pauvres paysans analphabètes. Ils connurent cette culture populaire et se mirent à son école. C’est ainsi que contre la littérature bourgeoise, Suzanne CESAIRE écrit dans la revu Tropiques en 1941 : «De la littérature. Oui. Littérature de Hamac. Littérature de sucre et de vanille. Tourisme littéraire… Allons, la vraie poésie est ailleurs. Loin des rimes, des complaintes, des alizés, des perroquets et bambou. Nous décrétons la mort de la littérature doudou et zut à l’hibiscus, à la frangipane, au bougainvillier. La poésie martiniquaise sera cannibale ou ne sera pas ».Et Léon Gontran Damas d’ajouter que ce sont des poètes de la décalcomanie.</p><p><br></p><p>&nbsp; &nbsp; &nbsp; Les jeunes poètes martiniquais fondèrent pour cela la Reyue des griots sous l’égide du docteur Price Mars.</p><p><br></p><p>&nbsp;</p><p><br></p><p>III- LES TRIBUNES D’EXPRESSION DES ADAEPTES DE LA NEGRITUDE&nbsp;</p><p><br></p><p>&nbsp;</p><p><br></p><p>&nbsp; &nbsp; Si la Négritude a pu s’imposer à la critique en tant que courant et esthétique littéraires, cela est dû en partie à sa large diffusion. A cet effet, des revenues, des journaux et d’autres moyens de publication ont été utilisés.</p><p><br></p><p>A) LEGITIME DEFENSE. (Revue fondé en 1932 à Paris)</p><p><span style=\"background-color: var(--tblr-offcanvas-bg); color: var(--tblr-offcanvas-color); font-size: 1.1rem; font-weight: var(--tblr-body-font-weight); letter-spacing: 0px; text-align: var(--tblr-body-text-align);\">Légitime défense est un titre emprunté é André Breton, et se montre volontairement provocant ; il s’agit d’une revue publiée en France par des étudiants matiniqais dont Etienne Leroux, Réné Menil, Jules marcel, Monnerot. Ces étudiants entendaient défendre la personnalité antillaise méprisée pendant des siècles d’esclavage et de colonisation. Elle avait pour orientation :</span><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; La satire de la bourgeoisie antillaise ;</p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Une analyse de la misère du peuple ;</p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Une critique du mimétisme culturel et du psittacime littéraire.</p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Légitime défense apparaît alors comme une réalisation contre la littérature d’imitation de style, la liberté d’imagination et du tempérament maigre. Voila ce que fut légitime défense qui fut suspendue. Ses animateurs perdirent leur bourse et leurs parents qui faisaient partie de la bourgeoisie de couleur que la revue stigmatisait si brutalement leur supprimèrent les subsides. Malgré tout, leur persévérance conduisit ces étudiants à continmeur à diffuser leurs idées à travers des conférences et des réunions.</p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; B) L’ ETUDIANT NOIR (1934 – 1940)</p><p>Légitime défense&nbsp; a véritablement fait des émules et c’est ainsi qu’après son interdiction, le groupe «&nbsp; L’Etudiant noir «&nbsp; lui succéda en 1940. C’est un groupe qui se proposait de mettre fin au système en vigueur au Quartier latin et de rattacher les Noirs à leurs tradition, à leur histoire et à la leurs langues. Selon Léon Gontran DAMAS , on cessait d’être étudiant martiniquais guadeloupéen, guyanais, africain ou malgache pour n’être plus qu’un seul et même étudiant noir. Le journal corporatiste de combat qu’était L’Etudiant noir eut ainsi le mérite de réunir tous les les étudiants noirs de Paris. Il opéra- aussi la prise de conscience des intérêts à travers leur origine. Il revendique par ailleurs la liberté créatrice du Nègre par le retour aux sources africaines. Une des figures de proue de ce groupe, Léopold Sedar Senghor soutient que l’histoire des Nègres&nbsp; est un drame en trois épisodes :</p><p>&nbsp; 1- Les Nègre furent d’abord asservis parce que, disait- on, c’étaient des brutes, des idiots, bref une animalité, un anachronisme.</p><p>2- Puis, on tourna vers eux un regard plus indulgent. On s’est dit qu’ils valent quand même mieux que leur réputations (ils ne sont pas méchants).</p><p>3- Et on a essayé de les former : c’est le stade du paternalisme qui, faisant du Nègre un grand enfant, prépare l’assimilation.</p><p>Mais les jeunes Nègres d’aujourd’hui ne veulent ni asservissement, ni assimilation. Ils veulent l’émancipation ; ils donc être des hommes. Alors, plus de passivité.</p><p><br></p><p>La Négritude est la remise en cause du principe de la mission civilisatrice de l’Occident vis- à- vis des pays réputés «sauvages ». C’est pourquoi L. DIAKHATE écrit : « La négritude est fille de l’histoire ». Et Théodore MONOD d’ajouter que «le Noir n’est pas un homme sans passé, il n’est pas tombé d’un arbre avant-hier. L’Afrique est littéralement pourrie de vestiges et il est donc absurde de continuer à la regarder comme une table rase à la surface de laquelle on peut bâtir ab nihilo (sans aucun résistance) n’importe quoi ».&nbsp;</p><p><span style=\"background-color: var(--tblr-offcanvas-bg); color: var(--tblr-offcanvas-color); font-size: 1.1rem; font-weight: var(--tblr-body-font-weight); letter-spacing: 0px; text-align: var(--tblr-body-text-align);\">Le groupe «l’Etudiant noir», contrairement à Légitime Défense resta à l’écran du communisme car ses adeptes divergeaient sur bien des points bien qu’ils reconnussent au socialisme son incontestable valeur en tant que méthode de recherche et technique de révolution politique. Il opta donc pour un départ sur des bases nouvelles et non sur les doctrines qui, à tout prendre, étaient des créations européennes. Les tenants du journal ont donc exprimé la prise de conscience de leur appartenance à une race qui a son histoire et ses valeurs. Car, comme la race noir était sous la dépendance étrangère, le Noir pour se réaliser devait être politiquement et culturellement libre. C’est dans ce sens que Senghor disait : «Pour asseoir une révolution efficace, il nous débarrasser de nos vêtements d’emprunt, ceux de l’assimilation et affirme notre être, c’est- à- dire notre négritude».</span></p><p>Au plan littéraire, malgré les liens étroits qui unissaient le groupe «L’Etudiant noir et des surréalistes comme Philippe SOUPAULT ET Robert DESNOS, il est préconisé que le surréalisme ne soit qu’un instrument, c’est- à- dire un moyen passager pour retrouver l’origine du Nègre. Il faut donc une réconciliation des Noirs avec eux- mêmes. Le Nègre acteur ne vit pas, il joue un rôle. Il faut l’affirmation de la singularité ethnique, la reprise en main de son destin de Noir. On peut retenir que ce groupe a eu une grande influence sur les intellectuels africains et antillais qui venaient en France et cela grâce au trio CESAIRE,SENGHOR , DAMAS entourés de Léonard BAINVILLE, Aristide NAUGEE, Birago DIOP, Ousmane SOCE et autres.</p><p><br></p><p>C. PRESENCE AFRICAINE (1947)</p><p><br></p><p>Si la seconde Guerre mondiale interrompit la parution de L’Etudiant noir, elle n’a pas pu interrompre l’activité des étudiants. L’&amp;quipe fut un instant disloquée : Senghor est appelé au front comme tirailleur, Césaire partit pour la Martinique où il rayonne sur toutes les Antilles françaises jusqu’à Haiti et fonda la revue Tropiques. Quant à Damas, après avoir connu des ennuis politiques, il vécut dans le silance et la retraite. Mais bientôt le groupe se reforma autour du Sénégalais Alioune DIOP et connut l’adhésion d’autre personnalités comme Paul NIGAR et Guy TIROLIER (Gudeloupéens), Bernad B. DADIE, Apithy Béhanzin et Rabemanjara. C’est ce noyau qui allait donner naissance à la revue Présence africaine à Paris. Le premier numéro de cette revue qui allait rapidement devenir l’organe du monde noir en France tend encore aujourd’hui à l’être dans l’Afrique toute entière. Elle était parrainée par par de grands écrivains et intellectuels français dont BALANDIER. Il y avait naturellement des écrivains noirs d’une grande renommée que sont&nbsp; Sengor et&nbsp; Césaire et l’Américain Richard&nbsp; WRIGHT et le Dahonéen Paul&nbsp; HAZOUME.</p><p><br></p><p>&nbsp; &nbsp; &nbsp;Présence africaine s’ent montrée très ouverte à tous. C’était une tribune où tous les penseurs et les écrivains, les politiciens et les sociologues, les sages traditionnels et les jeunes universitaires tentaient de définir l’originalité africaine et hâter son insertion dans le monde moderne. La revue va tourner toutes ses préoccupations vers l’Afrique noir. En dehors de l’objectif culturel qu’elle s’était fixé, elle va poser en outre le problème de la colonisation dans toute son ampleur. La démarche est que pour réaliser la véritable reconnaissance culturelle, il faut au préalable une libération politique et c’est pour quoi Alioune DIOP a soutenu que les hommes de culture en Afrique ne peuvent pas se désintéresser de la politique qui est une condition nécessaire de la reconnaissance culturelle. Ce dernier ne va d’ailleurs pas se limiter à l’animation de Présence africaine. Il va co- fonder «La société de la culture »présidée par le docteur Jean PRICE MARS. C’est une association qui organisera des cycles de conférences destinées à faire connaître l’homme noir et ses préoccupations.</p><p><br></p><p>Aujourd’hui, Présence africaine existe sous la forme de maison d’édition qui publie régulière les œuvres littéraires des écrivains africains qui leur sollicitent le service.&nbsp;&nbsp;</p><p><br></p><p>IV – QUEQUES TENANTS DE LA NEGRITUDE EN ZOOM</p><p><br></p><p>Il connaît une influence maladive dans une famille bourgeoise et reçoit une éducation française. Cependant il prend contacte avec les Noirs esclave de la guerre française. Il côtie&nbsp; Césaire et Senghor en France et c’est à travers son œuvre qu’on découvre sa haine pour la culture occidentale et son attachement à la culture africaine.</p><p><br></p><p>&nbsp; En 1937, il publie pigments, un recueil de poème qui lui valut un prestige incontesté dans le milieu des étudiants noirs à Paris. Cette opposition est caractérisée d’un côté par les vices du monde occidental à savoir «l’écrasement de l’individu », la «prostitution», «l’hypocrisie »,«la cruauté »,etc. De l’autre côté, il s’agit de l’intégrité, de la pureté du monde noir. C’est pour Damas le rejet total du monde occidental. Sa révolte contre l’Europe a imposée au peuple noir se présente dans son recueil en trois mouvements/</p><p><br></p><p>&nbsp; &nbsp; &nbsp; &nbsp;a) Le poète prend conscience de la destruction de son monde. Le premier poète du recueil marque l’arrivée de l’homme blanc. Celui- là apporte la mort, la dépersonnalisation en rejetant toues les valeurs de l’homme noir.</p><p><br></p><p>&nbsp; &nbsp; &nbsp; b) Le poète découvre son assimilation illusoire. L’homme noir appartiens à une race spécifique et ne peut s’intégrer à la race blanche.</p><p><br></p><p>&nbsp; &nbsp; &nbsp;c) Le poète doit se libérer et libérer toue la race. Il tentera alors de faire naitre en eux un sentiment de haine et de révolte.</p><p><br></p><p>On peut retenir quelques unes de ses œuvres que sont :</p><p><br></p><p>&nbsp; Pigments (1937)</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Retour de Guyane (1938)</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Veillées noires (contes de son pays : 1943)</p><p><br></p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Grouffiti (1956)</p><p><br></p><p>2- AIME CESAIRE (1913 à la Martinique)</p><p><br></p><p>&nbsp; &nbsp; &nbsp; &nbsp;Il a fait une licence en lettre à l’école normale supérieure. Il s’installe à Paris où il fréquent, le selon littéraire de René MARAM, participe à la rédaction de différente revues des Noirs. Il rencontre Senghor et Damas avec lesquels ils vont donner vie au journal L’Etudiant noir. Son premier grand poète est Cahier d’un retour au pays natal publié en 1939 où il retrace l’ensemble de son aventure spirituel à l’encontre des clichés en cours. Il voit les Antilles malheureusement et sinistrées, rongées par la peur et la famine. C’est qu’il cherche à assumer le malheur de son peuple : « Je suis un homme juif</p><p><br></p><p>Un homme- cafre</p><p><br></p><p>Un homme de Harlem- qui- ne vote pas</p><p><br></p><p>L’homme- famine, l’homme insulte, l’homme torture».</p><p><br></p><p>Mais le geste lui parait insuffisant. Il reconnaît la nécessiter du combat pour ruiner la raison occidentale responsable de ce malheur pour retrouver sous l’incapacité nègre :</p><p><br></p><p>«Ceux qui n’ont inventé ni la, poudre ni la boussole :</p><p>&nbsp; Ceux qui n’ont jamais su dompter ni la vapeur ni l’électricité ;</p><p>&nbsp; &nbsp;Ceux qui n’ont imploré ni mer ni ciel»,</p><p>Comme lacunes de sa race et ce qu’elle a&nbsp; de propre. Il recrée alors une Afrique de liberté, de bonheur simple et immédiat, une Afrique qui sera capable d’apporter « au monde blanc horriblement las de son effort immense», le sens de l’humain qui le déserte.</p><p>Comme œuvres de sa bibliographie, il ya entre autres :</p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; cahier d’un retour au pays natal (1939)</p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Les Armes miraculeuses (1946)</p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Soleil coupé (1948)</p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Discours sur le colonialisme (Essai 1954)</p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Et les chiens taisaient (1956)</p><p>-&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Une saison au Congo 1968)</p><p>3 – LEOPOLD SEDAR SENGHOR(1906 au Sénégal)</p><p>Il est né d’une famille riche mais est entièrement élevé par les religieux européens. Parti pour la France après son baccalauréat, il participe intensément aux différentes activités des Noirs à Paris. Sa fonction de président de l’Association des étudiants nègres le le familiarise avec certains problèmes politiques. Licencié ès lettres, professeur de lycée en France et enfin agrégé de grammaire en 1939, Senghor avait été entièrement instruit, modelé dans un système de pensée étranger à l’Afrique, il est accueilli avec les honneurs nationaux. C’est ce qui explique l’ambiguïté de sa personnalité. Il est ainsi un métis culture mais quoi qu’il en soit, Senghor affirme lui aussi sa solidarité avec les opprimés et est constructeur&nbsp; d’une Afrique qui prendra place parmi les nations dans la liberté et la dignité. Il dira :&nbsp; «J’y ai vécu jadis, vu de mes yeux, de mes oreilles entendu les être fabuleux par là et les choses. Il m’a suffi de nommer les choses, les éléments de mon univers enfantin, pour prophétiser la cité de demain qui mettra des&nbsp; cendres de l’ancienne » Senghor fait montre de ses qualités littéraires et de métissage culturel. Dans son deuxième recueil Hostie noires (1948), il met l’accent sur la contribution des Noirs plutôt que sur le sacrifice des Africains pendant la Seconde Guerre mondiale. Dans Ethiopiques, c’est la femme africaine comme symbole de l’Afrique mère (épouse) qui est magnifiée. Il faut toutefois retenir que Senghor, pionnier de la Négritude, milite en faveur d’une civilisation de l’universel, qui serait le « rendez- vous du donner et du recevoir entre les civilisations&nbsp; africaines et occidentales ».</p><p>V- BILAN DE NECRITUDE.</p><p>Si la Négritude a reçu le soutien ouvert de certains écrivains et intellectuels européens comme Jean Paul SARTRE et les autres, il faut aussi que d’autres ont jeté des pierres dans le Jardin des tenants du concept. Il y a en effet de nombreux détracteurs dont un groupe rejette totalement la Négritude tandis que l’autre la critique de façon nuancée puisque leurs flèches profèrent sur un aspect on sur un autre.</p><p>On a d’abord les spécialistes des questions africaines ( les ethnologues et les anthropologues) qui estiment que l’unité culturelles que la Négritude supposée serait un mythe parce que&nbsp; le continent africain renferme de nombreuses civilisation avec les systèmes de valeurs différents, des modes de vie et des idéologies hétérogènes qui se côtoient sans se mêler.</p><p>Par ailleurs, il faut citer les marxistes qui voient dans la Négritude une mystification. ils estiment que lorsqu’ on mettra en place des structures sociales ( marxistes) et que l’un aura posé le problème des Nègres en termes de classe et non de race, les phénomènes psychologiques et sociaux engendrés par le retard technologique et la situation coloniale disparaîtront et à ce moment – là, la Négritude n’aura été qu’un point de vue de ce phénomènes psychologiques et sociaux&nbsp; engendrés par le retard technologique et la situation coloniale disparaîtront et à ce moment la, la Négritude n’aura été qu’un point de vue de ce phénomène. Mais s’il y’a eu des diatribes acerbes contre la Négritudes, elles viennent surtout de l’Afrique même. Le point de vue des intellectuels noirs anglophones à ce propos est sans équivoque. Ils contestent la Négritude d’une manière âpre. Leur porte parole est Wolé SOYINKA, auteur de la célère boutade&nbsp; «&nbsp; le tigre ne proclame pas sa trigritude. Il saute, tue sa proie et la mange. »</p><p>C’est un groupe qui rassemble la jeune génération des écrivants noirs analophones. Ils promet la personnalité africaine ( l’African personnality) Il s’agit des Nigérians Chinua Achebe,Wole SOYINKA, Jean Pierre CLARK et le Sud –fricain Ezechiel MPHALFLE Réunis au sein du MBARI CLUB&nbsp; dans le cadre de l’université d’Ibadan, ils sont éditeurs de la revue BLACK ORPHEUS. Ces écrivains entendent prendre leurs distances vis-à-vis de la Négritude qu’ils trouvent dangereuse à plus d’un titre. Pour eux, la Négritudes a un caractère d’abstration manichéiste. Elle proclame la Négritude sans agir ni dire comment changer les choses. Il attribuent la Négritude un caractère romatique. C’est , selon eux, une autocontemplation narcissique et une subjectié telle, qu’elle a tendance à faire de l’Afrique traditionnelle de symbole utopique d’innocence et de pureté figé pour toujours dans la dimension de mythe.</p><p>En effet, ce sont le plus souvent des Francophones qui sont les Champions de la Négritude. Ils ont donc été marqué par la pensée philosophique du XVIIIè siècle avec leur Humanisme idéaliste, unitaire et centralisateur. En face d’eux, les Anglophones sont fortement influencés&nbsp; par la pensée pragmatique anglo- saxonne.</p><p>Il est à souligner qu’en déhors de tous les groupes mentionnées, la dynmique interne va produire plus tard une autocritique qui poussera des auteurs africains francophones à réviser leur conception de la Négritude. Cela a donné naissance à la seconde génération de la Négritude. Ce sont surtout des penseurs comme les Zairois Mabika KALANDA, V.Y MUDIMBE, les Camerounais Martien TOWA, Njoh MOULLE, le Béninois&nbsp; Stanislas&nbsp; ADOTEVI qui dénoncent le caractère passéiste de la Négritude. Le groupe des Ousmane SEMBEN, Mongo BETI et autres soutiennent que l’Afrique n’a pas qu’une culture saine et idyllique. Ils dénoncent d’ailleurs à l’occasion ses laideurs. Ils rejoignent ainsi sur certains points les intellectuels noirs anglophones.</p><p>Lors du colloque organisé par le centre d’études littéraires francophones de l’université Paris Nord en janvier 1973, les travaux ont porté sur une confrontation entre Négritude africaine et Négritude des Caraïbes où plusieurs intervenants se sont livré à un procès véritable de la Négritude. Certains ont pensé qu’on ne peut pas chanter éternellement. L’esclavage et les souffrances du Noir à travers des siècles. D’autre&nbsp; ont plutôt dénoncé les manipulation dont la Négritude est l’objet de la d’un certain nombre de leaders du monde noir en particulier en Haïti où, au&nbsp; nom de la Négritude, DUVALIER a laissé pour tout héritage à ses concitoyens rien que trois mots cauchemars : tyrannie, Tonton macoute et arriération. Mais la tendance générale était l’acquittement, du moins des circonstances atténuantes pour Aimé CESAIRE qui s’intéressait plus à la condition du Noir dans le monde, à la misère, à l’exploitation dont il est victime en Europe, en Amérique, aux Antilles ou en Afrique qu’au problème de sa culture particulière jugée secondaire. Quand à Senghor, ils lui ont beaucoup reproché son penchant fort pour l’aspect culturel de la Négritude.</p><p><span style=\"color: var(--tblr-offcanvas-color); font-size: 1.1rem; font-weight: var(--tblr-body-font-weight); letter-spacing: 0px; text-align: var(--tblr-body-text-align);\">CONCLUSION</span><br></p><p>&nbsp; &nbsp; Considérée comme concept miracle au départ par de nombreux partisans de l’émancipation du monde noir par la culture et la littérature, la Négritude a connu une évolution émaillée de controverses. On peut retenir néanmoins qu’avec ce concept, les intellectuels noir avaient déjà trouvé le cadre approprié pour l’engagement. En effet, la Négritude constituait un motif et servait de propagande d’une idéologie de libération des peuples noirs.&nbsp;</p><p>&nbsp; Dans&nbsp; &nbsp;tous le cas, aucun mouvement si justifié et si important ne peut se développer sans critique et contestation. On ne s’étonnera donc par de voir la Négritude remise en cause à certains égards. Dans un chapitre de ces Damnés de la terre, consacré à la culture nationale, Frantz FANON s’interroge sur l’efficacité du&nbsp; mouvement et aboutit à la conclusion qu’elle ne peut que conduire à une impasse. Rejetant cette conception de la culture qu’il estime folklorique, il engage donc ses amis à méfier du mythe et de l’amitié&nbsp; terre /mer et accorder la priorité au combat pour l’indépendance politique. Les attaques contre la Négritude et plus spécifiquement contre Senghor,&nbsp; champion du mouvement devaient être reprises et amplifiées lors du festival d’Alger en 1968 (Festival mondial des arts nègres). Elles ont donné naissance à plusieurs pamphlets parmi lesquels «Négritude ou servitude» (1971) de Martien TOWA « Négritude et Négrologues » (1972) de Stanislas ADOTEVI.</p><p><span style=\"background-color: var(--tblr-offcanvas-bg); color: var(--tblr-offcanvas-color); font-size: 1.1rem; font-weight: var(--tblr-body-font-weight); letter-spacing: 0px; text-align: var(--tblr-body-text-align);\">Il faut toutefois reconnaître après tout que la création et l’animation du mouvement n’ont pas été un coup d’épée dans l’eau. Car on peut dire que faisant suite à la Négritude, l’Institut des peuples noirs (IPN) n’est pas moins une idée lumineuse destinée à réhabiliter l’homme noir et même lui refaire une place au soleil.&nbsp;&nbsp;</span><br></p>', 0, 28, 1),
(22, 'c05ccedf-5751-42e3-9b82-3bcca57c85da', '2023-02-20 20:31:27.380539', '2023-02-20 20:31:27.380539', 'At qui cumque amet', 'at-qui-cumque-amet', 'Pariatur? Quibusdam .', 0, 2, 0),
(23, '52464f28-8ef5-415c-8899-546bee12818f', '2023-02-20 20:31:36.174078', '2023-02-20 20:31:36.174078', 'Ab eum similique qui', 'ab-eum-similique-qui', 'In asperiores facili.', 0, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int NOT NULL,
  `uid` varchar(100) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` int DEFAULT NULL,
  `title` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`id`, `uid`, `createdAt`, `updatedAt`, `userId`, `title`) VALUES
(3, '26611f2e-6329-459c-ae1b-260ce22ea144', '2023-02-05 15:31:36.707395', '2023-02-05 15:31:36.707395', 30, ''),
(4, 'bc14fe42-769e-414c-8b8c-58a2da2675b9', '2023-02-05 15:33:45.265047', '2023-02-05 15:33:45.265047', 30, ''),
(5, '0bfbf266-abdd-44e7-9799-40feb2856165', '2023-02-05 15:38:40.181130', '2023-02-05 15:38:40.181130', 30, ''),
(6, '883954c3-8c3e-44cf-bcd1-c84474258730', '2023-02-05 16:02:37.953115', '2023-02-05 16:02:37.953115', 30, ''),
(7, '059c4331-0a8e-47a8-8f0b-6fd108c36feb', '2023-02-05 17:18:58.159419', '2023-02-05 17:18:58.159419', 30, ''),
(8, '054aeace-8f75-4d6f-b2a4-593b40c2b4fb', '2023-02-05 20:26:14.481206', '2023-02-05 20:26:14.481206', 30, ''),
(9, '758eae55-1aea-4876-afda-cc5a6fbaac78', '2023-02-07 17:39:19.886781', '2023-02-07 17:39:19.886781', 30, ''),
(10, '3d20f9cd-eab8-4cb4-ab1d-87979e9ae3fe', '2023-02-07 17:40:08.252027', '2023-02-07 17:40:08.252027', 30, '');

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int NOT NULL,
  `uid` varchar(100) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `uid`, `createdAt`, `updatedAt`, `name`, `slug`, `description`) VALUES
(1, '6eed40c8-1f27-463a-8427-0e596b4b51c0', '2023-02-01 17:15:56.087878', '2023-02-02 15:03:40.000000', '7 ème', '7-eme', '7 ème'),
(2, '666a3840-5682-4186-9a5c-1903ddf6e7b0', '2023-02-01 17:16:09.681740', '2023-02-02 15:03:33.000000', '8 ème', '8-eme', '8 ème'),
(3, 'a48a5897-8956-4c06-9cbb-73dc179b7466', '2023-02-02 15:02:14.730223', '2023-02-02 15:03:26.000000', '9 ème', '9-eme', '9 ème'),
(4, '65962eb3-4db6-450f-b0fe-73e801bf782c', '2023-02-02 15:02:28.838475', '2023-02-02 15:04:08.000000', '10 ème', '10-eme', '10 ème'),
(5, 'ad36720d-d0a1-4603-8b64-d66b1a0d397c', '2023-02-02 15:02:48.011200', '2023-02-02 15:02:48.011200', '11 ème', '11-eme', '11 ème'),
(6, 'ff2cf828-b075-46cd-9097-43162fcc9b82', '2023-02-02 15:02:57.732728', '2023-02-02 15:02:57.732728', '12 ème', '12-eme', '12 ème'),
(7, 'e0641b07-663e-4d51-b728-8eb94311589e', '2023-02-02 15:03:13.726501', '2023-02-02 15:03:13.726501', 'Terminale', 'terminale', 'Terminale / 13 ème');

-- --------------------------------------------------------

--
-- Table structure for table `classe_course`
--

CREATE TABLE `classe_course` (
  `classesId` int NOT NULL,
  `coursesId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `classe_course`
--

INSERT INTO `classe_course` (`classesId`, `coursesId`) VALUES
(1, 37),
(2, 36),
(2, 37),
(5, 28),
(6, 1),
(6, 2),
(6, 36),
(7, 1),
(7, 2),
(7, 28),
(7, 37);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int NOT NULL,
  `uid` varchar(100) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `views` int NOT NULL DEFAULT '0',
  `subjectId` int DEFAULT NULL,
  `published` tinyint NOT NULL DEFAULT '0',
  `userId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `uid`, `createdAt`, `updatedAt`, `title`, `slug`, `tag`, `content`, `views`, `subjectId`, `published`, `userId`) VALUES
(1, 'bd2f68de-64e9-4603-b6b2-4450d92eb75e', '2023-02-01 20:57:17.981878', '2023-02-21 17:49:29.000000', 'Information génétique et synthèse des protéines', 'information-genetique-et-synthese-des-proteines', 'génome, cellule', '<div>Le génotype est l’information portée par le génome d’un organisme, contenu dans chaque cellule sous forme d’acide désoxyribonucléique (ADN).</div><div><br></div><div>Porté par les chromosomes, il est localisé à l’intérieur du noyau chez les eucaryotes et dans le cytoplasme chez les procaryotes.</div><div><br></div><div>Dans la molécule d\'ADN, c\'est la séquence des nucléotides qui constitue l\'information génétique.</div><div><br></div><div>Chez l\'homme, on estime que le nombre de gènes est compris entre 25 000 et 30 000. Il existe pour une majorité de ces gènes plusieurs allèles dans la population. S\'il existe trois génotypes différents possibles pour un gène existant sous deux formes alléliques, il est facile d\'imaginer le nombre faramineux de génotypes possibles pour un individu. C\'est pour cela que l\'on dit que nous sommes tous différents : il est hautement improbable que deux individus aient, au hasard, hérité des mêmes allèles pour tous leurs gènes. Les vrais jumeaux font exception à cette règle, ils sont issus de la même cellule œuf (zygote), et donc de même composition allélique.</div><div><br></div><div>La biosynthèse des protéines est l\'ensemble des processus biochimiques permettant aux cellules de produire leurs protéinesà partir de leurs gènes afin de compenser les pertes en protéines par sécrétion ou par dégradation. Elle recouvre les étapes detranscription de l\'ADN en ARN messager, d\'aminoacylation des ARN de transfert, de traduction de l\'ARN messager en chaînes polypeptidiques, de modifications post-traductionnelles de ces dernières, et enfin de repliement des protéines ainsi produites. Elle est étroitement régulée à de multiples niveaux, principalement lors de la transcription et lors de la traduction.</div><div>Le génotype est l’information portée par le génome d’un organisme, contenu dans chaque cellule sous forme d’acide désoxyribonucléique (ADN).</div><div><br></div><div>Porté par les chromosomes, il est localisé à l’intérieur du noyau chez les eucaryotes et dans le cytoplasme chez les procaryotes.</div><div><br></div><div>Dans la molécule d\'ADN, c\'est la séquence des nucléotides qui constitue l\'information génétique.</div><div><br></div><div>Chez l\'homme, on estime que le nombre de gènes est compris entre 25 000 et 30 000. Il existe pour une majorité de ces gènes plusieurs allèles dans la population. S\'il existe trois génotypes différents possibles pour un gène existant sous deux formes alléliques, il est facile d\'imaginer le nombre faramineux de génotypes possibles pour un individu. C\'est pour cela que l\'on dit que nous sommes tous différents : il est hautement improbable que deux individus aient, au hasard, hérité des mêmes allèles pour tous leurs gènes. Les vrais jumeaux font exception à cette règle, ils sont issus de la même cellule œuf (zygote), et donc de même composition allélique.</div><div><br></div><div>La biosynthèse des protéines est l\'ensemble des processus biochimiques permettant aux cellules de produire leurs protéinesà partir de leurs gènes afin de compenser les pertes en protéines par sécrétion ou par dégradation. Elle recouvre les étapes detranscription de l\'ADN en ARN messager, d\'aminoacylation des ARN de transfert, de traduction de l\'ARN messager en chaînes polypeptidiques, de modifications post-traductionnelles de ces dernières, et enfin de repliement des protéines ainsi produites. Elle est étroitement régulée à de multiples niveaux, principalement lors de la transcription et lors de la traduction.</div><div>Le génotype est l’information portée par le génome d’un organisme, contenu dans chaque cellule sous forme d’acide désoxyribonucléique (ADN).</div><div><br></div><div>Porté par les chromosomes, il est localisé à l’intérieur du noyau chez les eucaryotes et dans le cytoplasme chez les procaryotes.</div><div><br></div><div>Dans la molécule d\'ADN, c\'est la séquence des nucléotides qui constitue l\'information génétique.</div><div><br></div><div>Chez l\'homme, on estime que le nombre de gènes est compris entre 25 000 et 30 000. Il existe pour une majorité de ces gènes plusieurs allèles dans la population. S\'il existe trois génotypes différents possibles pour un gène existant sous deux formes alléliques, il est facile d\'imaginer le nombre faramineux de génotypes possibles pour un individu. C\'est pour cela que l\'on dit que nous sommes tous différents : il est hautement improbable que deux individus aient, au hasard, hérité des mêmes allèles pour tous leurs gènes. Les vrais jumeaux font exception à cette règle, ils sont issus de la même cellule œuf (zygote), et donc de même composition allélique.</div><div><br></div><div>La biosynthèse des protéines est l\'ensemble des processus biochimiques permettant aux cellules de produire leurs protéinesà partir de leurs gènes afin de compenser les pertes en protéines par sécrétion ou par dégradation. Elle recouvre les étapes detranscription de l\'ADN en ARN messager, d\'aminoacylation des ARN de transfert, de traduction de l\'ARN messager en chaînes polypeptidiques, de modifications post-traductionnelles de ces dernières, et enfin de repliement des protéines ainsi produites. Elle est étroitement régulée à de multiples niveaux, principalement lors de la transcription et lors de la traduction</div>', 0, 47, 1, 30),
(2, 'f091edbe-6ac6-4380-95c1-52ce4090918c', '2023-02-01 20:58:35.932740', '2023-02-07 16:06:44.197641', 'Les participations africaines et malgaches à la seconde guerre mondiale', 'les-participations-africaines-et-malgaches-a-la-seconde-guerre-mondiale', 'esclavage, aliénation', '<p><span style=\"color: var(--tblr-card-color); background-color: var(--tblr-card-bg); font-size: 1.1rem; font-weight: var(--tblr-body-font-weight); letter-spacing: 0px; text-align: var(--tblr-body-text-align);\">En 1939, les troupes coloniales forment environ un quart du total des forces françaises.</span><br></p><p>Une bonne partie d\'entre elle restent basées dans les colonies. Lors de la Seconde Guerre mondiale de 1939 à 1945, la France fait appel à son Empire et à ses troupes coloniales, notamment aux régiments de Tirailleurs sénégalais, dont le corps fut créé en 1857 et supprimé dans les années 1960-1964.\n\nÀ la veille de la campagne de France qui commence le 10 mai 1940 avec l\'offensive allemande à l\'Ouest, le nombre total des Sénégalais mobilisés est estimé à 179 000 hommes, et celui des Sénégalais engagés dans les combats en métropole à 40 000 hommes. Les 1re et 6e DIC sont engagées en Argonne. Pendant les combats de la campagne de France, les pertes parmi les Tirailleurs sénégalais sont évaluées à près de 17 000 hommes. </p><p>Sur officiellement 58 839 morts de l\'armée française durant la campagne de France, ces chiffres semblent très surestimés.\n\nAprès la défaite de 1940, les coloniaux participeront à la reconquête, à partir d\'Angleterre mais surtout à partir de l\'Afrique avec le général Leclerc et sa 2e DB qui compte parmi ses unités le Régiment de marche du Tchad (RMT) et le 3e régiment d\'Artillerie Coloniale (3e RAC).\n\nLes campagnes d\'Érythrée, de Crète, de Tripolitaine et de Libye verront s\'ils peuvent fustrer les unités de la 1re DFL avec Le 1er régiment d\'artillerie coloniale (1er RA), le bataillon d\'infanterie de marine et du Pacifique et différents bataillons de marche.</p>', 0, 49, 1, 30),
(28, 'bf48ebca-58cd-42ff-97e4-09073602c27b', '2023-02-06 15:28:12.425997', '2023-02-07 16:06:51.366660', 'La littérature Africaine', 'la-litterature-africaine', 'Indépendance, Poème', '<p>Le concept de littérature négro-africaine sied mieux à une étude de la littérature nègre ou regard de la diversité culturelle et de particularités&nbsp; dues à l’origine des écrivains. Compte tenu de cette multiplicité, il y a une littérature propre aux&nbsp; Africains du continent une autre&nbsp; qui porte la marque de ceux déportés et soumis autrefois et qui à un moment de l’évolution&nbsp; du monde, se sont affranchi du joug de l’envahisseur. De ce postulat, il est à remarquer,&nbsp; sinon une différence, du moins une nuance dans le ton et les thèmes traités ça et là par les écrivains négro- africains. Néanmoins, l’on peut retenir que la littérature négro- africains est «une manifestation et une partie intégrante de la civilisation africain ».</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Toutefois la volonté d’unifier le combat des Noirs à travers la littérature pour l’égalité des races va conduire Aimé Césaire, l’homme dont le nom est un prénom à inventer le mot Négritude. Selon lui, «le propre du Zèbre est de porter&nbsp; ses Zébrures ». Il définit la Négritude comme étant «la simple reconnaissance du fait d’être Noir, l’acceptation de ce fait, de notre destin de Noir, de notre histoire, de notre culture ».</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Si Césaire a eu l’inspiration pour l’invention du concept en 1939, il est à rappeler que la Négritude a des origines et a même une définition fondée sur l’expérience et l’observation des uns et des autres.</p>', 0, 50, 1, 30),
(36, '88cd099c-edc0-48d1-b046-bf2821fb802f', '2023-06-17 07:38:19.189356', '2023-06-17 07:38:19.189356', 'un cours', 'un-cours', 'fjfdlkdfjkl, fdlkjf', 'Et animi commodi te', 0, 53, 0, 30),
(37, '6c8963d6-e6ff-4c3a-aff2-9f57f37412ad', '2023-06-17 07:38:41.531705', '2023-06-17 07:38:41.531705', 'Nulla officia dolor', 'nulla-officia-dolor', 'Iste soluta nulla ut', 'Est non ipsam delect.', 0, 52, 0, 30);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int NOT NULL,
  `uid` varchar(100) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `question` tinytext NOT NULL,
  `response` longtext NOT NULL,
  `chatId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int NOT NULL,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1674228203569, 'migrationTable1674228203569'),
(2, 1674228639695, 'migrationTable1674228639695'),
(3, 1675271267542, 'migrationTable1675271267542'),
(4, 1675272260594, 'migrationTable1675272260594'),
(5, 1675334822096, 'migrationTable1675334822096'),
(6, 1675336347293, 'migrationTable1675336347293'),
(7, 1675336628517, 'migrationTable1675336628517'),
(8, 1675350744622, 'migrationTable1675350744622'),
(9, 1675350986392, 'migrationTable1675350986392'),
(10, 1675607057289, 'migrationTable1675607057289'),
(11, 1675769094431, 'migrationTable1675769094431'),
(12, 1675785943531, 'migrationTable1675785943531'),
(13, 1676295280557, 'migrationTable1676295280557');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int NOT NULL,
  `uid` varchar(100) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `slug` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` text,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `uid`, `createdAt`, `updatedAt`, `slug`, `image`, `description`, `name`) VALUES
(47, 'd4407f17-838a-407c-bb28-d0ffb43aa2f5', '2023-02-01 17:28:02.228558', '2023-02-01 17:28:28.000000', 'biologie', 'subjects/1675272508687-illustration-11.svg', 'Cours de biologie', 'Biologie'),
(48, 'd318fb31-3dc7-4126-bbb1-57157532507a', '2023-02-01 17:28:53.357644', '2023-02-01 17:28:53.357644', 'mathematiques', 'subjects/1675272533291-illustration-7.svg', 'Cours de mathématiques', 'Mathématiques'),
(49, 'dd3923ec-4a3c-46da-b2d3-463eb99ce0b3', '2023-02-02 10:51:43.258199', '2023-02-02 10:51:43.258199', 'histoire', 'subjects/1675335103206-post-11.png', 'Cours d\'histoire', 'Histoire'),
(50, '1c06e992-99e9-429d-8a5f-44eb0e907ac0', '2023-02-06 15:20:44.652071', '2023-02-06 15:20:44.652071', 'francais', NULL, 'Cours de Francais', 'Français'),
(52, 'c6c5c292-5b7d-4b60-bab6-0e9da143f9b9', '2023-02-07 18:04:12.118223', '2023-02-07 18:04:12.118223', 'chimie', NULL, 'Cours de chimie', 'Chimie'),
(53, '14e3dc76-1f08-46b5-911b-37413aee553b', '2023-02-07 18:04:42.554259', '2023-02-07 18:04:42.554259', 'philosophie', NULL, 'Cours de philosophie', 'Philosophie'),
(59, '2746558f-2a2f-4e1b-a524-147571406375', '2023-02-21 14:39:46.617357', '2023-02-21 14:39:46.617357', 'golang', NULL, 'klfmj dsklfmsjdf', 'golang');

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expire_date` datetime NOT NULL,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `token`, `expire_date`, `user_id`) VALUES
(30, 'c580d9bb-3f29-4bd1-8c67-6123dcef6c5a', '2023-01-29 11:28:39', 30),
(31, '483170d7-571f-4686-bcba-0918518a0f9a', '2023-01-30 19:01:53', 31);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `uid` varchar(100) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `role` smallint NOT NULL,
  `gender` tinyint DEFAULT NULL,
  `birth_day` datetime DEFAULT NULL,
  `address` text,
  `active` tinyint NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `photo` varchar(150) DEFAULT NULL,
  `coursesId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uid`, `createdAt`, `updatedAt`, `first_name`, `last_name`, `email`, `phone`, `role`, `gender`, `birth_day`, `address`, `active`, `last_login`, `password`, `photo`, `coursesId`) VALUES
(30, '23dca1d1-dfb1-40e4-a81e-694d68ebc966', '2023-01-28 10:28:38.499536', '2023-06-17 07:31:49.000000', 'Chaney', 'Cote', 'dmn@devkonect.com', '+1 (811) 494-2331', 100, NULL, NULL, NULL, 1, '2023-06-17 09:31:49', '$2b$06$V96gP0KRyhqzFADcqp1oJun3jI/1CCdReRfXC2cRtQDkwZTuafbhG', NULL, NULL),
(31, '6924bb27-5fb6-47b0-aa66-0a0b25f65e69', '2023-01-29 18:01:52.785986', '2023-01-29 18:01:52.785986', 'Xaviera', 'Mcintyre', 'wetyr@mailinator.com', '+1 (588) 525-5335', 10, NULL, NULL, NULL, 0, NULL, '$2b$06$W/7tWNGKZGM1FOnnZbXMoO5KGKq5TN8Sv4VFhdUFEroYmaa40tklS', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chapters`
--
ALTER TABLE `chapters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_60104a199b8a8010293542dc34` (`uid`),
  ADD KEY `FK_becd2c25ed5b601e7a4466271c8` (`courseId`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_5a493f6d32f38e2b225437a1fa` (`uid`),
  ADD KEY `FK_ae8951c0a763a060593606b7e2d` (`userId`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_5d90fb64c917e4a387987ed4cb` (`uid`);

--
-- Indexes for table `classe_course`
--
ALTER TABLE `classe_course`
  ADD PRIMARY KEY (`classesId`,`coursesId`),
  ADD KEY `IDX_793fdb12be0c0d6f4ae0ac2279` (`classesId`),
  ADD KEY `IDX_86e4db37f2d9383c7f8cdc64c4` (`coursesId`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_f444d60e410ad88079dc5d3024` (`uid`),
  ADD KEY `FK_4fc71ca03df7fa563050d553c39` (`subjectId`),
  ADD KEY `FK_8e0ef34f8d606c64586e698abc1` (`userId`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_a6a720d4dfa56cfa3f4d5db85b` (`uid`),
  ADD KEY `FK_36bc604c820bb9adc4c75cd4115` (`chatId`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_880061503ffd2ab3162a225da0` (`uid`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_8769073e38c365f315426554ca` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  ADD UNIQUE KEY `IDX_a000cca60bcf04454e72769949` (`phone`),
  ADD KEY `IDX_6e20ce1edf0678a09f1963f958` (`uid`),
  ADD KEY `FK_e693156b3c3ade01ae6c15c4960` (`coursesId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chapters`
--
ALTER TABLE `chapters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chapters`
--
ALTER TABLE `chapters`
  ADD CONSTRAINT `FK_becd2c25ed5b601e7a4466271c8` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`);

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `FK_ae8951c0a763a060593606b7e2d` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `classe_course`
--
ALTER TABLE `classe_course`
  ADD CONSTRAINT `FK_793fdb12be0c0d6f4ae0ac22791` FOREIGN KEY (`classesId`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_86e4db37f2d9383c7f8cdc64c41` FOREIGN KEY (`coursesId`) REFERENCES `courses` (`id`);

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `FK_4fc71ca03df7fa563050d553c39` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`id`),
  ADD CONSTRAINT `FK_8e0ef34f8d606c64586e698abc1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `FK_36bc604c820bb9adc4c75cd4115` FOREIGN KEY (`chatId`) REFERENCES `chats` (`id`);

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `FK_8769073e38c365f315426554ca5` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_e693156b3c3ade01ae6c15c4960` FOREIGN KEY (`coursesId`) REFERENCES `courses` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
