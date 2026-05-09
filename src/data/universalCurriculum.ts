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
  challenges: string[];
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
        nextSteps: 'Apprendre les types de données.',
        challenges: [
          'Crée une variable "pseudo" et mets-y ton nom de codeur !',
          'Crée une variable "xp" avec la valeur 0.',
          'Affiche ton pseudo dans la console pour voir si ça marche.'
        ]
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
        nextSteps: 'Les opérateurs mathématiques.',
        challenges: [
          'Déclare une variable "estEnTrainDapprendre" et mets-y la valeur vrai (true).',
          'Crée une phrase (string) qui dit "J\'ai" et ajoute ton âge après.',
          'Vérifie le type de ta variable xp avec typeof.'
        ]
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
        nextSteps: 'Les structures de contrôle (If/Else).',
        challenges: [
          'Additionne deux nombres et stocke le résultat dans "somme".',
          'Vérifie si 10 est strictement égal à "10". Qu\'en dit ton code ?',
          'Calcule le reste de la division de 10 par 3 avec l\'opérateur modulo (%).'
        ]
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
        nextSteps: 'Les boucles (répétition).',
        challenges: [
          'Écris un "if" qui affiche "Bravo" si ton score est supérieur à 50.',
          'Ajoute un "else" pour afficher "Encore un effort !" sinon.',
          'Utilise "else if" pour gérer un cas où le score est pile égal à 50.'
        ]
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
        nextSteps: 'Les fonctions (réutilisation).',
        challenges: [
          'Fais une boucle qui affiche les nombres de 1 à 10.',
          'Modifie-la pour qu\'elle n\'affiche que les nombres pairs.',
          'Essaie de faire un décompte de 10 à 0.'
        ]
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
        nextSteps: 'Les structures de données (Tableaux).',
        challenges: [
          'Crée une fonction "saluer" qui prend un nom en paramètre.',
          'Fais une fonction qui calcule le carré d\'un nombre et le renvoie (return).',
          'Appelle ta fonction et stocke le résultat dans une variable.'
        ]
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
        nextSteps: 'Les objets et dictionnaires.',
        challenges: [
          'Crée un tableau "panier" avec 3 noms de fruits.',
          'Ajoute un fruit à la fin de ton tableau avec la méthode ".push()".',
          'Affiche la longueur de ton tableau (sa taille).'
        ]
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
        nextSteps: 'La récursivité.',
        challenges: [
          'Crée un objet "hero" avec un nom, une classe et un niveau.',
          'Augmente le niveau de ton hero de 1.',
          'Ajoute une nouvelle propriété "force" à ton hero.'
        ]
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
        nextSteps: 'Structures de données avancées.',
        challenges: [
          'Explique pourquoi une boucle imbriquée est plus lente qu\'une boucle simple.',
          'Quel est le Big O d\'une recherche dans un tableau non trié ?',
          'Pourquoi O(1) est-il le graal de l\'optimisation ?'
        ]
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
        nextSteps: 'Les arbres et graphes.',
        challenges: [
          'Crée manuellement trois nœuds (nodes) A, B et C.',
          'Relie A vers B, et B vers C.',
          'Écris une fonction qui parcourt la liste pour afficher toutes les valeurs.'
        ]
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
        nextSteps: 'Design Patterns.',
        challenges: [
          'Crée une classe "Vehicule" avec une méthode "demarrer()".',
          'Crée une instance (un objet) de ta classe avec "new".',
          'Ajoute un constructeur pour donner un nom à ton véhicule.'
        ]
      }
    ]
  },
    {
      id: 'advanced',
      title: 'Module 4 : Algorithmes Avancés',
      subtitle: 'Approfondissement des structures et algorithmes.',
      reward: { id: 'advanced-badge', name: 'Badge Avancé', icon: '🚀' },
      lessons: [
        {
          id: 'alg_iter',
          title: 'Itérations Simples',
          concept: 'Utiliser les boucles pour répéter des actions.',
          explanation: "La boucle `Pour` permet d'exécuter une séquence d'instructions un nombre fixe de fois. Chaque itération incrémente un compteur qui contrôle la durée de la boucle.",
          analogy: "C’est comme tourner les pages d’un livre jusqu'à la fin.",
          codeExamples: [
            { lang: 'JavaScript', code: 'for (let i = 0; i < 5; i++) { console.log(i); }' }
          ],
          realWorld: "Afficher les scores d'un tableau, répéter une animation.",
          traps: "Boucle infinie si la condition d'arrêt n'est jamais fausse.",
          nextSteps: 'Tableaux et structures de données.',
          challenges: [
            'Écris une boucle qui affiche les nombres de 1 à 10.',
            "Modifie‑la pour n'afficher que les nombres pairs.",
            "Ajoute un compteur qui compte le nombre d'itérations."
          ]
        },
        {
          id: 'alg_array_insert',
          title: 'Insertion dans un Tableau',
          concept: 'Déplacer les éléments pour créer un trou et insérer une valeur.',
          explanation: "On décale les éléments à droite à partir de la fin du tableau jusqu'à la position d'insertion, puis on place la nouvelle valeur dans le trou ainsi créé.",
          analogy: "C’est comme faire de la place sur une étagère avant de mettre un nouveau livre.",
          codeExamples: [
            { lang: 'JavaScript', code: 'function inserer(tab, val, pos) { for (let i = tab.length; i > pos; i--) { tab[i] = tab[i-1]; } tab[pos] = val; return tab; }' }
          ],
          realWorld: "Ajouter un élève dans une liste ordonnée.",
          traps: "Oublier de mettre à jour la taille du tableau après insertion.",
          nextSteps: "Suppression d'éléments.",
          challenges: [
            "Crée un tableau [1,2,4,5] et insère le nombre 3 à la position 2.",
            "Vérifie le tableau après insertion."
          ]
        },
        {
          id: 'alg_sum',
          title: "Somme d'un Tableau (Itératif)",
          concept: "Accumuler les valeurs d'un tableau avec un accumulateur.",
          explanation: "On initialise une variable `somme` à 0 puis on ajoute chaque élément du tableau.",
          analogy: "Comme remplir un seau en versant de petites quantités.",
          codeExamples: [
            { lang: 'JavaScript', code: 'function somme(tab) { let s = 0; for (let i = 0; i < tab.length; i++) { s += tab[i]; } return s; }' }
          ],
          realWorld: "Calculer le total des points d'un joueur.",
          traps: "Ne pas réinitialiser la variable somme avant chaque appel.",
          nextSteps: "Fonctions récursives.",
          challenges: [
            "Calcule la somme du tableau [3,5,2,8].",
            "Modifie la fonction pour retourner la moyenne."
          ]
        },
        {
          id: 'alg_factorial',
          title: 'Factorielle Récursive',
          concept: "Fonction qui s'appelle elle‑même jusqu'à un cas de base.",
          explanation: "Le cas de base est `n = 0` qui retourne 1. Sinon on multiplie `n` par la factorielle de `n‑1`.",
          analogy: "Comme une poupée russe : chaque appel ouvre une poupée plus petite.",
          codeExamples: [
            { lang: 'JavaScript', code: 'function fact(n) { return n === 0 ? 1 : n * fact(n-1); }' }
          ],
          realWorld: "Calculer le nombre de permutations possibles.",
          traps: "Oublier le cas de base entraîne une récursion infinie.",
          nextSteps: "Algorithmes de recherche.",
          challenges: [
            "Calcule 5! avec la fonction.",
            "Modifie‑la pour gérer les nombres négatifs en renvoyant `null`."
          ]
        },
        {
          id: 'alg_record',
          title: 'Enregistrement (Struct)',
          concept: 'Regrouper plusieurs champs sous un même nom.',
          explanation: "Un enregistrement `Eleve` contient un nom, un âge et une classe. Chaque champ est accessible via le point.",
          analogy: "Comme une fiche d'identité contenant plusieurs informations.",
          codeExamples: [
            { lang: 'JavaScript', code: 'let eleve = { nom: "Alice", age: 19, classe: "L2" };' }
          ],
          realWorld: "Stocker les informations d'un étudiant dans une base.",
          traps: "Accéder à un champ qui n'existe pas retourne `undefined`.",
          nextSteps: "Manipulation de fichiers.",
          challenges: [
            "Crée un enregistrement pour un véhicule avec marque, modèle et année.",
            "Affiche chaque champ."
          ]
        },
        {
          id: 'alg_file',
          title: 'Manipulation de Fichier Texte',
          concept: "Lire ligne par ligne avec un pointeur de fichier.",
          explanation: "On ouvre le fichier en lecture, puis on parcourt tant que `EOF` n'est pas atteint, en lisant chaque ligne.",
          analogy: "Comme tourner les pages d'un manuel jusqu'à la dernière.",
          codeExamples: [
            { lang: 'Pseudo', code: 'Ouvrir(f, "fic.txt", "r")\nTantQue NON EOF(f) Faire\n  Lire(f, ligne)\n  Ecrire(ligne)\nFinTantQue\nFermer(f)' }
          ],
          realWorld: "Afficher le contenu d'un journal d'événements.",
          traps: "Ne pas fermer le fichier entraîne des fuites de descripteurs.",
          nextSteps: "Recherche linéaire.",
          challenges: [
            "Écris le pseudocode pour lire un fichier et compter le nombre de lignes."
          ]
        },
        {
          id: 'alg_search',
          title: 'Recherche Linéaire',
          concept: "Parcourir un tableau pour trouver une valeur.",
          explanation: "On parcourt chaque élément et on compare à la valeur cible. Retourne l'indice dès qu'on trouve la correspondance.",
          analogy: "Comme chercher un mot dans une liste de mots en les lisant un à un.",
          codeExamples: [
            { lang: 'JavaScript', code: 'function recherche(tab, cible) { for (let i = 0; i < tab.length; i++) { if (tab[i] === cible) return i; } return -1; }' }
          ],
          realWorld: "Trouver un produit dans un inventaire non trié.",
          traps: "Oublier de retourner -1 si la valeur n'est pas trouvée.",
          nextSteps: "Tri par sélection.",
          challenges: [
            "Recherche la valeur 7 dans le tableau [3,7,2,9].",
            "Modifie la fonction pour retourner le nombre d'occurences."
          ]
        },
        {
          id: 'alg_selection_sort',
          title: 'Tri par Sélection',
          concept: "Sélectionner le minimum et le placer en position correcte.",
          explanation: "Pour chaque position i, on cherche le plus petit élément du suffixe et on l'échange avec i.",
          analogy: "Comme choisir le plus petit bout de papier et le placer en haut d'une pile.",
          codeExamples: [
            { lang: 'JavaScript', code: 'function selectionSort(tab) { for (let i = 0; i < tab.length-1; i++) { let min = i; for (let j = i+1; j < tab.length; j++) { if (tab[j] < tab[min]) min = j; } if (min !== i) { let tmp = tab[i]; tab[i] = tab[min]; tab[min] = tmp; } } return tab; }' }
          ],
          realWorld: "Organiser une pile de cartes du plus petit au plus grand.",
          traps: "Faire l'échange même si le minimum est déjà à la bonne place.",
          nextSteps: "Algorithmes de tri plus rapides (Merge, Quick).",
          challenges: [
            "Trie le tableau [29,10,14,37,13] avec le tri par sélection.",
            "Analyse la complexité temporelle."
          ]
        }
      ]
    }
];
