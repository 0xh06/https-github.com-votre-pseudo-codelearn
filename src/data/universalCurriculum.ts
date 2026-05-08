export type UniversalLesson = {
  id: string;
  title: string;
  concept: string;
  explanation: string;
  analogy: string;
  codeExamples: { lang: string; code: string }[];
  realWorld: string;
  traps: string;
  nextSteps: string;
};

export type UniversalLevel = {
  id: 'beginner' | 'intermediate' | 'expert';
  title: string;
  subtitle: string;
  reward: { id: string; name: string; icon: string };
  lessons: UniversalLesson[];
};

export const UNIVERSAL_CURRICULUM: UniversalLevel[] = [
  {
    id: 'beginner',
    title: 'Module 1 : Les Graines du Code',
    subtitle: 'Apprenez les fondamentaux absolus de la logique informatique.',
    reward: { id: 'beginner-badge', name: 'Badge Novice', icon: '🌱' },
    lessons: [
      {
        id: 'b1',
        title: 'La Boîte à Données (Variables)',
        concept: 'Une variable est un conteneur nommé pour stocker une valeur.',
        explanation: 'Alors, approchez-vous du tableau. J\'écris "let score = 10". Tu vois ce mot "let" ? C\'est ma façon de dire à l\'ordinateur : "Hé, prépare-moi une petite boîte vide !". Ensuite, j\'écris "score", c\'est l\'étiquette que je colle sur la boîte pour qu\'on puisse la retrouver plus tard sans chercher partout. Et le "= 10", c\'est le moment où je dépose physiquement le nombre 10 dans la boîte. Voilà, c\'est mémorisé !',
        analogy: 'Imaginez une boîte à chaussures sur laquelle vous écrivez "Prénom" et à l\'intérieur de laquelle vous glissez un papier "Alice".',
        codeExamples: [
          { lang: 'JavaScript', code: 'let age = 25;' },
          { lang: 'Python', code: 'age = 25' },
          { lang: 'C++', code: 'int age = 25;' }
        ],
        realWorld: 'Stocker le score d\'un joueur ou le nom d\'un utilisateur connecté.',
        traps: 'Attention à ne pas oublier de déclarer la variable avant de l\'utiliser !',
        nextSteps: 'Apprendre les types de données.'
      },
      {
        id: 'b1_types',
        title: 'L\'ADN des Données (Types)',
        concept: 'Les types définissent la nature des informations (texte, nombre, vrai/faux).',
        explanation: 'Regardez ce que j\'écris maintenant : "Bonjour" entre guillemets. Ces guillemets, c\'est moi qui dis au code : "Attention, ceci est du texte, ne cherche pas à faire des calculs avec !". Si j\'écris un nombre sans guillemets, là, l\'ordinateur sort sa calculatrice. On a donc les chaînes (String) pour les phrases, les nombres (Number) pour les calculs, et les booléens (true/false) qui sont comme des interrupteurs.',
        analogy: 'C\'est comme trier vos déchets : vous ne mettez pas du verre (texte) dans la poubelle à papier (nombres).',
        codeExamples: [
          { lang: 'JavaScript', code: 'let texte = "Bonjour"; // String\nlet score = 100; // Number\nlet estVrai = true; // Boolean' },
          { lang: 'Python', code: 'nom = "Zelda"\npv = 3\nvivant = True' }
        ],
        realWorld: 'Afficher un message de bienvenue personnalisé ou calculer des points de vie.',
        traps: 'Essayer d\'additionner un texte et un nombre ("10" + 5) peut donner des résultats bizarres.',
        nextSteps: 'Les opérateurs mathématiques.'
      },
      {
        id: 'b2',
        title: 'Le Chef d\'Orchestre (Opérateurs)',
        concept: 'Les opérateurs permettent de manipuler et comparer des variables.',
        explanation: 'Je reprends ma craie. J\'écris "total = prix + taxes". Ce petit signe "+", c\'est l\'opérateur. C\'est le moteur qui va prendre ce qu\'il y a dans la boîte "prix" et ce qu\'il y a dans la boîte "taxes" pour les fusionner. On a aussi les opérateurs de comparaison, comme "===". Si j\'écris "age === 18", je demande au code : "Est-ce que c\'est EXACTEMENT pareil ?". Il me répondra juste par oui ou par non.',
        analogy: 'C\'est comme les symboles +, -, x dans vos cours de maths, mais avec des super-pouvoirs de comparaison.',
        codeExamples: [
          { lang: 'JavaScript', code: 'let total = 10 + 5; // 15\nlet estEgal = (10 === 10); // true' },
          { lang: 'Python', code: 'total = 20 / 2 # 10\nest_egal = (5 == 5) # True' }
        ],
        realWorld: 'Calculer le prix total d\'un panier d\'achat avec les taxes.',
        traps: 'Confondre "=" (donner une valeur) et "==" (vérifier si c\'est égal).',
        nextSteps: 'Les structures de contrôle (If/Else).'
      },
      {
        id: 'b3_if',
        title: 'Le Carrefour Logique (Conditions)',
        concept: 'Les structures conditionnelles permettent au code de prendre des décisions.',
        explanation: 'Suivez ma main, je dessine un carrefour. J\'écris "if (estEnsoleille)". C\'est comme si je disais : "Hé l\'ordi, regarde par la fenêtre !". Si la réponse est vraie, on entre dans les premières accolades { ... } pour mettre des lunettes de soleil. Sinon, avec le "else", on va dans les autres accolades pour prendre un parapluie. C\'est le premier pas vers une intelligence qui réfléchit.',
        analogy: 'C\'est comme un thermostat : SI la température est inférieure à 19°C, ALORS allume le chauffage, SINON éteins-le.',
        codeExamples: [
          { lang: 'JavaScript', code: 'if (age >= 18) {\n  console.log("Majeur");\n} else {\n  console.log("Mineur");\n}' },
          { lang: 'Python', code: 'if score > 100:\n    print("Record !")\nelse:\n    print("Continue !")' }
        ],
        realWorld: 'Vérifier si un mot de passe est correct ou si un utilisateur a assez d\'argent pour un achat.',
        traps: 'Oublier le "else" peut laisser votre programme dans un état indéfini.',
        nextSteps: 'Les boucles (répétition).'
      },
      {
        id: 'b4_loops',
        title: 'Le Disque Rayé (Boucles)',
        concept: 'Les boucles permettent de répéter un bloc de code plusieurs fois.',
        explanation: 'Regardez, j\'écris une seule ligne de code mais elle va s\'afficher 100 fois ! J\'écris "for (let i = 0; i < 100; i++)". Ce "i = 0" c\'est mon compteur qui démarre. Le "i < 100" c\'est ma limite : "Continue tant qu\'on n\'est pas arrivé à 100". Et le "i++", c\'est le petit geste que je fais à chaque tour pour dire "Hop, un de plus !". C\'est la puissance brute de l\'ordinateur au bout de vos doigts.',
        analogy: 'C\'est comme faire des pompes : "Tant que je n\'ai pas fait 10 pompes, je continue à descendre et monter".',
        codeExamples: [
          { lang: 'JavaScript', code: 'for (let i = 0; i < 5; i++) {\n  console.log("Tour " + i);\n}' },
          { lang: 'Python', code: 'for i in range(5):\n    print(f"Tour {i}")' }
        ],
        realWorld: 'Afficher tous les messages d\'une boîte de réception ou traiter chaque pixel d\'une image.',
        traps: 'La boucle infinie ! Si la condition n\'est jamais fausse, votre ordinateur va chauffer.',
        nextSteps: 'Les fonctions (réutilisation).'
      }
    ]
  },
  {
    id: 'intermediate',
    title: 'Module 2 : Le Tronc de la Logique',
    subtitle: 'Structurez votre pensée et gérez la complexité.',
    reward: { id: 'scholar-hat', name: 'Chapeau d\'Étudiant', icon: '🎓' },
    lessons: [
      {
        id: 'i1',
        title: 'Les Usines à Code (Fonctions)',
        concept: 'Une fonction est un bloc de code réutilisable qui effectue une tâche précise.',
        explanation: 'Imaginez que je construise une machine magique. J\'écris "function preparerCafe()". À l\'intérieur, je mets toutes les étapes compliquées. Maintenant, à chaque fois que je veux un café, je n\'ai plus qu\'à écrire "preparerCafe()". Plus besoin de tout réexpliquer à chaque fois ! On peut même lui donner des ingrédients (des paramètres) pour changer le goût.',
        analogy: 'C\'est comme une recette de cuisine : vous définissez les étapes une fois, et vous pouvez refaire le plat autant de fois que vous voulez.',
        codeExamples: [
          { lang: 'JavaScript', code: 'function direBonjour(nom) { return "Salut " + nom; }' },
          { lang: 'Python', code: 'def dire_bonjour(nom):\n    return f"Salut {nom}"' }
        ],
        realWorld: 'Une fonction "calculerTVA()" utilisée sur toutes les factures d\'un site.',
        traps: 'Essayer d\'utiliser une variable créée à l\'intérieur d\'une fonction à l\'extérieur.',
        nextSteps: 'Les structures de données (Tableaux).'
      },
      {
        id: 'i2_arrays',
        title: 'Le Wagon de Marchandises (Tableaux)',
        concept: 'Un tableau est une liste ordonnée de plusieurs éléments.',
        explanation: 'Regardez ce long trait que je trace. J\'écris "[ ]". C\'est un train ! Chaque compartiment peut contenir une valeur. J\'y mets "Pomme", puis "Poire". Si je veux la pomme, j\'écris "fruits[0]". Pourquoi 0 ? Parce qu\'en informatique, on commence toujours à compter à partir de zéro, comme si le premier wagon était le wagon numéro zéro.',
        analogy: 'C\'est comme un train de marchandises : chaque wagon contient un colis, et ils sont numérotés de 0 à N.',
        codeExamples: [
          { lang: 'JavaScript', code: 'let fruits = ["Pomme", "Banane", "Fraise"];\nconsole.log(fruits[0]); // Pomme' },
          { lang: 'Python', code: 'inventaire = ["Épée", "Bouclier", "Potion"]' }
        ],
        realWorld: 'Gérer la liste des articles dans un panier ou les scores des 10 meilleurs joueurs.',
        traps: 'L\'index commence à 0, pas à 1 ! Le premier élément est à l\'index 0.',
        nextSteps: 'Les objets et dictionnaires.'
      },
      {
        id: 'i3_objects',
        title: 'Le Dossier Patient (Objets)',
        concept: 'Les objets groupent des données liées par des paires Clé-Valeur.',
        explanation: 'Et si on voulait décrire une personne entière ? J\'ouvre des accolades { }. À l\'intérieur, je crée des liens. J\'écris "nom: \'Link\'", puis "hp: 100". On ne se contente plus de stocker des valeurs en vrac, on crée une structure où chaque information a un sens bien précis. C\'est l\'outil ultime pour ranger des données complexes.',
        analogy: 'C\'est comme une fiche d\'identité : Nom = "Dupont", Prénom = "Jean", Âge = 30.',
        codeExamples: [
          { lang: 'JavaScript', code: 'let user = { nom: "Link", hp: 100, weapon: "Master Sword" };' },
          { lang: 'Python', code: 'boss = { "nom": "Ganon", "puissance": 999 }' }
        ],
        realWorld: 'Représenter un profil utilisateur complet avec photo, email et préférences.',
        traps: 'Confondre le point (user.nom) et les crochets (user["nom"]).',
        nextSteps: 'La récursivité.'
      }
    ]
  },
  {
    id: 'expert',
    title: 'Module 3 : La Couronne de l\'Architecture',
    subtitle: 'Optimisez, sécurisez et concevez des systèmes robustes.',
    reward: { id: 'expert-crown', name: 'Couronne d\'Expert', icon: '👑' },
    lessons: [
      {
        id: 'e1',
        title: 'L\'Art de l\'Optimisation (Complexité)',
        concept: 'Comprendre comment le code consomme du temps et de la mémoire.',
        explanation: 'Écoutez bien, car c\'est ici qu\'on sépare les amateurs des pros. J\'écris deux codes différents pour faire la même chose. L\'un met 1 seconde, l\'autre met 1 heure sur une grosse base de données. Le secret, c\'est de compter le nombre d\'opérations. Si vous avez une boucle dans une boucle, vous multipliez le travail ! On appelle ça la notation "Grand O". C\'est la science de l\'efficacité.',
        analogy: 'Si vous cherchez un livre dans une bibliothèque en les regardant un par un, c\'est lent. Si ils sont triés par ordre alphabétique, c\'est très rapide.',
        codeExamples: [
          { lang: 'Concept', code: 'O(n) vs O(log n)' }
        ],
        realWorld: 'Google Maps doit calculer un itinéraire en millisecondes parmi des milliards de routes possibles.',
        traps: 'Optimiser prématurément. Parfois le code simple est suffisant.',
        nextSteps: 'Structures de données avancées.'
      },
      {
        id: 'e2_linkedlists',
        title: 'Le Maillon Faible (Listes Chaînées)',
        concept: 'Une structure où chaque élément pointe vers le suivant.',
        explanation: 'Imaginez que je ne sache pas où sont tous mes élèves. J\'en vois un, et je lui dis : "Toi, tu connais l\'adresse du suivant ?". Et lui, il a un petit papier avec l\'adresse. J\'écris "node.next = nextNode". On ne force plus les données à être collées les unes aux autres. C\'est souple, on peut rajouter quelqu\'un au milieu de la chaîne sans tout bousculer.',
        analogy: 'C\'est comme une chasse au trésor : chaque indice vous donne l\'emplacement du prochain indice.',
        codeExamples: [
          { lang: 'JavaScript', code: 'class Node {\n  constructor(val) {\n    this.val = val;\n    this.next = null;\n  }\n}' }
        ],
        realWorld: 'Gérer l\'historique "Suivant / Précédent" d\'un navigateur web.',
        traps: 'Perdre le pointeur vers la tête de la liste : vous perdez toute la liste !',
        nextSteps: 'Les arbres et graphes.'
      },
      {
        id: 'e3_oop',
        title: 'Le Moule à Gâteaux (Classes/POO)',
        concept: 'Créer des modèles pour générer des objets similaires.',
        explanation: 'Je dessine maintenant un plan d\'architecte. J\'écris "class Personnage". Ce n\'est pas encore une personne, c\'est juste le plan ! Je lui donne des fonctions comme "marcher()". Ensuite, avec le mot magique "new", je peux créer 1000 personnages qui savent tous marcher. C\'est l\'industrialisation de votre code : on fabrique des usines à objets.',
        analogy: 'La classe est le plan de l\'architecte (le moule), et l\'objet est la maison construite (le gâteau).',
        codeExamples: [
          { lang: 'JavaScript', code: 'class Guerrier {\n  frapper() { console.log("BAM!"); }\n}' }
        ],
        realWorld: 'Définir un comportement commun pour tous les ennemis d\'un jeu vidéo.',
        traps: 'L\'héritage trop complexe : on finit par s\'y perdre.',
        nextSteps: 'Design Patterns.'
      }
    ]
  }
];
