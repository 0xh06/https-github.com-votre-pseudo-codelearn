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
        explanation: 'En programmation, on a besoin de retenir des informations. Une variable permet de donner un nom à une donnée pour la retrouver plus tard.',
        analogy: 'Imaginez une boîte à chaussures sur laquelle vous écrivez "Prénom" et à l\'intérieur de laquelle vous glissez un papier "Alice".',
        codeExamples: [
          { lang: 'JavaScript', code: 'let age = 25;' },
          { lang: 'Python', code: 'age = 25' },
          { lang: 'C++', code: 'int age = 25;' }
        ],
        realWorld: 'Stocker le score d\'un joueur ou le nom d\'un utilisateur connecté.',
        traps: 'Attention à ne pas oublier de déclarer la variable avant de l\'utiliser !',
        nextSteps: 'Apprendre les types de données (nombres vs texte).'
      },
      {
        id: 'b2',
        title: 'Le Chef d\'Orchestre (Opérateurs)',
        concept: 'Les opérateurs permettent de manipuler et comparer des variables.',
        explanation: 'Additionner, soustraire, ou vérifier si deux choses sont égales : ce sont les outils de calcul du code.',
        analogy: 'C\'est comme les symboles +, -, x dans vos cours de maths, mais avec des super-pouvoirs de comparaison.',
        codeExamples: [
          { lang: 'JavaScript', code: 'let total = 10 + 5; // 15' },
          { lang: 'Python', code: 'est_egal = (5 == 5) # True' }
        ],
        realWorld: 'Calculer le prix total d\'un panier d\'achat avec les taxes.',
        traps: 'Confondre "=" (donner une valeur) et "==" (vérifier si c\'est égal).',
        nextSteps: 'Les structures de contrôle (If/Else).'
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
        explanation: 'Au lieu d\'écrire 10 fois la même chose, on crée une fonction qu\'on appelle dès qu\'on en a besoin.',
        analogy: 'C\'est comme une recette de cuisine : vous définissez les étapes une fois, et vous pouvez refaire le plat autant de fois que vous voulez.',
        codeExamples: [
          { lang: 'JavaScript', code: 'function direBonjour(nom) { return "Salut " + nom; }' },
          { lang: 'Python', code: 'def dire_bonjour(nom):\n    return f"Salut {nom}"' }
        ],
        realWorld: 'Une fonction "calculerTVA()" utilisée sur toutes les factures d\'un site.',
        traps: 'Essayer d\'utiliser une variable créée à l\'intérieur d\'une fonction (variable locale) à l\'extérieur.',
        nextSteps: 'Les structures de données complexes (Tableaux, Objets).'
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
        explanation: 'Un code qui marche c\'est bien, un code qui marche vite sur des millions de données, c\'est mieux.',
        analogy: 'Si vous cherchez un livre dans une bibliothèque en les regardant un par un, c\'est lent. Si ils sont triés par ordre alphabétique, c\'est très rapide.',
        codeExamples: [
          { lang: 'Concept', code: 'O(n) vs O(log n)' }
        ],
        realWorld: 'Google Maps doit calculer un itinéraire en millisecondes parmi des milliards de routes possibles.',
        traps: 'Optimiser prématurément. Parfois le code simple est suffisant.',
        nextSteps: 'Les patterns d\'architecture logicielle.'
      }
    ]
  }
];
