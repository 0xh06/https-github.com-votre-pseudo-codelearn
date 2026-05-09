export interface LangCourse {
  id: string;
  name: string;
  icon: string;
  color: string;
  tagline: string;
  desc: string;
  difficulty: number;
  popularity: number;
  perf: number;
  typing: string;
  paradigm: string;
  compiled: string;
  level: string;
  sections: {
    title: string;
    icon: string;
    level?: 'Débutant' | 'Intermédiaire' | 'Expert';
    lessons: {
      title: string;
      explanation: string;
      code: string;
      output?: string;
      realWorldUseCase?: string;
      commonErrors?: string;
      isBoss?: boolean;
      bossConstraints?: { timeLimit: string; spaceLimit: string; description: string };
    }[];
  }[];
  resources: { title: string; url: string; type: 'doc' | 'video' | 'practice' }[];
  algoExamples: { name: string; id: string }[];
}

export const LANGUAGE_COURSES: Record<string, LangCourse> = {
  js: {
    id: 'js', name: 'JavaScript', icon: '🟨', color: '#f59e0b',
    tagline: 'Le langage du Web',
    desc: 'Incontournable pour le développement front-end. Avec Node.js, il couvre aussi le back-end. C\'est le langage parfait pour créer des interfaces interactives et asynchrones.',
    difficulty: 2, popularity: 95, perf: 60,
    typing: 'Dynamique', paradigm: 'Multi-paradigme', compiled: 'Interprété (JIT)', level: 'Débutant',
    sections: [
      {
        title: 'Les Bases Absolues', icon: '🐣', level: 'Débutant',
        lessons: [
          {
            title: '1. Votre Premier Code : Hello World!',
            explanation: 'Étape 1 : Parler à l\'ordinateur.\nPour dire à l\'ordinateur d\'afficher quelque chose à l\'écran en JavaScript, on utilise la commande `console.log`.\n\nÉtape 2 : Les guillemets.\nL\'ordinateur est littéral. Si vous voulez afficher du texte, vous devez le mettre entre guillemets (" ") pour qu\'il comprenne que c\'est une phrase.',
            code: `// Appuyez sur Run pour afficher le message !\nconsole.log("Bonjour le monde !");\nconsole.log("Je suis prêt à coder en JavaScript.");`,
            output: 'Bonjour le monde !\nJe suis prêt à coder en JavaScript.',
            realWorldUseCase: '`console.log` est l\'outil principal des développeurs Web pour déboguer leurs applications et vérifier que les données sont correctes.'
          },
          {
            title: '2. Les Variables (Boîtes de mémoire)',
            explanation: 'Étape 1 : Stocker une information.\nImaginez une variable comme une boîte en carton sur laquelle vous écrivez un nom. À l\'intérieur, vous pouvez y mettre ce que vous voulez.\n\nÉtape 2 : L\'assignation avec let.\nEn JS, on crée la boîte en écrivant `let`, son nom, puis `=` pour la remplir. (ex: `let age = 25`).',
            code: `// Création de nos "boîtes" (variables)\nlet nomDuJoueur = "Arthur";\nlet viesRestantes = 3;\n\nconsole.log("Héros :");\nconsole.log(nomDuJoueur);\nconsole.log("Vies :");\nconsole.log(viesRestantes);`,
            output: 'Héros :\nArthur\nVies :\n3'
          }
        ]
      },
      {
        title: 'Structures de Base', icon: '🌱', level: 'Débutant',
        lessons: [
          {
            title: 'Variables & Types de données',
            explanation: 'Étape 1 : Le concept de boîte.\nUne variable est comme une "boîte" dans laquelle on range une information pour la réutiliser.\n\nÉtape 2 : Choisir le bon mot-clé.\nUtilisez `let` si le contenu va changer (ex: un score). Utilisez `const` si la valeur est définitive (ex: date de naissance). Évitez `var`.\n\nÉtape 3 : Le Typage dynamique.\nVous n\'avez pas besoin de préciser si la boîte contient du texte ou un nombre. JavaScript le devine et peut même changer d\'avis !',
            code: `// 1. Déclarer des variables
let score = 0;              // Un nombre entier (Number)
const playerName = "Alice"; // Du texte (String)
let isGameOver = false;     // Un booléen (vrai/faux)

// 2. Modifier une variable 'let'
score = 15;
console.log(playerName + " a " + score + " points.");

// 3. Typage dynamique (attention !)
let mystery = 42;
console.log(typeof mystery); // "number"
mystery = "Quarante-deux";
console.log(typeof mystery); // "string"`,
            output: 'Alice a 15 points.\nnumber\nstring',
            realWorldUseCase: 'Dans un jeu vidéo web, `let score = 0` permet de suivre les points, tandis que `const MAX_HEALTH = 100` garantit que la santé maximale n\'est pas accidentellement modifiée par une erreur de code.',
            commonErrors: '❌ Erreur classique : Essayer de modifier une constante.\n\n`const pi = 3.14;`\n`pi = 4; // TypeError: Assignment to constant variable.`\n\n✅ Solution : Pensez par défaut à tout mettre en `const`. Si vous réalisez que la valeur doit changer plus tard, passez-la en `let`.'
          },
          {
            title: 'Structures conditionnelles (if/else)',
            explanation: 'Étape 1 : Le principe de décision.\nLes conditions permettent à votre code de prendre des chemins différents selon la situation (Si... Alors... Sinon).\n\nÉtape 2 : La syntaxe if/else.\nJavaScript évalue la question entre parenthèses `()`. Si c\'est "vrai" (true), il exécute le premier bloc `{}`. Sinon, il passe au bloc `else`.\n\nÉtape 3 : Les conditions multiples.\nVous pouvez enchaîner les vérifications avec `else if` pour tester plusieurs scénarios à la suite.',
            code: `const age = 16;
const hasParentalConsent = true;

if (age >= 18) {
  console.log("Accès autorisé : Adulte");
} else if (age >= 16 && hasParentalConsent) {
  // Le symbole && signifie "ET"
  console.log("Accès autorisé avec consentement");
} else {
  console.log("Accès refusé");
}

// Opérateur ternaire (version courte du if/else)
const status = (age >= 18) ? "Majeur" : "Mineur";
console.log("Statut : " + status);`,
            output: 'Accès autorisé avec consentement\nStatut : Mineur',
            realWorldUseCase: 'Cacher ou afficher le bouton "Acheter" sur un site e-commerce selon si l\'utilisateur est connecté (`if (isLoggedIn)`) ou si le produit est en stock (`if (stock > 0)`).',
            commonErrors: '❌ Erreur classique : Utiliser `=` au lieu de `===` pour comparer.\n\n`if (age = 18)` ne vérifie pas si l\'âge est 18, cela *modifie* l\'âge à 18 et renvoie toujours "vrai" ! Toujours utiliser `===` pour comparer l\'égalité en JavaScript.'
          }
        ]
      },
      {
        title: 'Structures & Logique', icon: '🏗️', level: 'Intermédiaire',
        lessons: [
          {
            title: 'Tableaux et Boucles',
            explanation: 'Étape 1 : Créer un Tableau (Array).\nUn tableau est une liste ordonnée. C\'est comme un meuble à tiroirs numérotés : le premier tiroir porte le numéro 0, le deuxième le 1, etc.\n\nÉtape 2 : La Boucle classique.\nPour lire tous les tiroirs, on utilise une boucle `for` qui compte de 0 jusqu\'à la fin du tableau.\n\nÉtape 3 : La Boucle moderne (for...of).\nPlus simple à lire ! Elle dit littéralement "Pour chaque élément de mon tableau, fais ceci", sans avoir à gérer les numéros (index).',
            code: `// Un tableau contenant des chaînes de caractères
const inventory = ["Épée", "Bouclier", "Potion"];

// Ajouter un élément à la fin
inventory.push("Arc");

// Accéder au premier élément (index 0)
console.log("Arme principale : " + inventory[0]);

// Boucle classique (basée sur l'index)
console.log("--- Inventaire (for classique) ---");
for (let i = 0; i < inventory.length; i++) {
  console.log(i + ": " + inventory[i]);
}

// Boucle moderne (plus lisible)
console.log("--- Inventaire (for...of) ---");
for (const item of inventory) {
  console.log("- " + item);
}`,
            output: 'Arme principale : Épée\n--- Inventaire (for classique) ---\n0: Épée\n1: Bouclier\n2: Potion\n3: Arc\n--- Inventaire (for...of) ---\n- Épée\n- Bouclier\n- Potion\n- Arc',
            realWorldUseCase: 'Afficher la liste des tweets sur votre fil d\'actualité. Le code récupère un tableau `tweets` depuis le serveur et utilise une boucle pour générer le HTML de chaque tweet à l\'écran.',
            commonErrors: '❌ Erreur "Off-by-one" : Essayer d\'accéder à `inventory[inventory.length]`. Comme le tableau commence à 0, le dernier élément est à `length - 1`. Demander `length` renverra `undefined`.'
          },
          {
            title: 'Objets et Destructuration',
            explanation: 'Étape 1 : Le concept d\'Objet.\nContrairement aux tableaux (listes numérotées), les Objets sont des listes nommées (système "clé: valeur"). C\'est idéal pour représenter quelque chose de complexe, comme un Joueur.\n\nÉtape 2 : Accéder aux données.\nOn utilise le point `.` pour lire une valeur (ex: `player.username`).\n\nÉtape 3 : La Destructuration.\nC\'est une technique magique pour extraire directement les valeurs dans des variables séparées en une seule ligne de code : `const { username } = player`.',
            code: `// Création d'un objet "Joueur"
const player = {
  id: 1042,
  username: "DarkKnight",
  level: 42,
  stats: { hp: 100, mana: 50 }
};

// Accès classique
console.log(player.username + " est niveau " + player.level);

// Destructuration : extraction directe de variables
const { username, level } = player;
console.log(\`Destructuration : \${username} (Lvl \${level})\`);

// Extraction imbriquée
const { stats: { hp } } = player;
console.log(\`Points de vie : \${hp}\`);`,
            output: 'DarkKnight est niveau 42\nDestructuration : DarkKnight (Lvl 42)\nPoints de vie : 100',
            realWorldUseCase: 'Quand une API (comme Twitter ou MétéoFrance) vous renvoie des données en format JSON, ces données sont manipulées comme des objets JavaScript dans votre code.',
            commonErrors: '❌ Tenter d\'accéder à une propriété d\'une propriété qui n\'existe pas : `player.guild.name` causera un crash (`Cannot read properties of undefined`).\n\n✅ Solution moderne : Option Chaining `player.guild?.name` renverra `undefined` au lieu de crasher le site.'
          }
        ]
      },
      {
        title: 'Asynchrone & Avancé', icon: '⚡', level: 'Expert',
        lessons: [
          {
            title: 'Asynchrone : Promises & Async/Await',
            explanation: 'Étape 1 : Le problème du temps.\nJavaScript ne fait qu\'une chose à la fois. Si on demande des données à un serveur lent, l\'écran gèlerait.\n\nÉtape 2 : Les Promesses (Promises).\nAu lieu d\'attendre bêtement, JS donne une "Promesse" qu\'il fournira le résultat plus tard, et continue son travail.\n\nÉtape 3 : Async / Await.\nCe sont les mots magiques ! Ils permettent de mettre la fonction "en pause" (await) jusqu\'à ce que la promesse soit tenue, rendant le code très facile à lire.',
            code: `// Simule un appel serveur qui prend 1 seconde
function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ name: "Alice", role: "Admin" });
      // reject("Erreur serveur") si ça échoue
    }, 1000);
  });
}

// Fonction asynchrone moderne
async function loadDashboard() {
  console.log("1. Chargement...");
  try {
    // Le code "met en pause" l'exécution de cette fonction ici 
    // sans bloquer le reste de l'application
    const user = await fetchUserData();
    console.log("2. Données reçues : Bonjour " + user.name);
  } catch (error) {
    console.log("Erreur : " + error);
  }
}

loadDashboard();
console.log("3. Le code principal continue !");`,
            output: '1. Chargement...\n3. Le code principal continue !\n2. Données reçues : Bonjour Alice',
            realWorldUseCase: 'Essentiel pour n\'importe quelle application web moderne : récupérer les messages d\'un chat, envoyer un formulaire de paiement, ou télécharger une image sans geler l\'interface utilisateur.',
            commonErrors: '❌ Oublier le mot clé `await`. Si vous faites `const user = fetchUserData()`, `user` ne contiendra pas les données, mais l\'objet "Promise" lui-même. Vous ne pourrez pas lire `user.name`.'
          },
          {
            title: 'Fonctions d\'ordre supérieur (Map, Filter, Reduce)',
            explanation: 'Étape 1 : Finies les boucles manuelles.\nLes méthodes avancées permettent de manipuler des listes entières sans écrire de boucle `for` complexe.\n\nÉtape 2 : Filtrer (Filter).\n`.filter()` crée une nouvelle liste en ne gardant que les éléments qui réussissent un test.\n\nÉtape 3 : Transformer (Map).\n`.map()` prend chaque élément et le transforme en autre chose.\n\nÉtape 4 : Réduire (Reduce).\n`.reduce()` condense toute la liste en une seule valeur finale (comme calculer la somme totale des prix).',
            code: `const products = [
  { name: "Laptop", price: 1000, category: "Tech" },
  { name: "Mouse", price: 50, category: "Tech" },
  { name: "Coffee", price: 5, category: "Food" }
];

// 1. FILTER : Garder uniquement les produits Tech
const techProducts = products.filter(p => p.category === "Tech");

// 2. MAP : Extraire uniquement les noms
const techNames = techProducts.map(p => p.name);
console.log("Produits Tech :", techNames.join(", "));

// 3. REDUCE : Calculer le prix total (accumulateur)
const totalPrice = products.reduce((total, p) => total + p.price, 0);
console.log("Valeur totale du stock : " + totalPrice + "€");

// 4. Chaînage élégant (Pipeline)
const techTotal = products
  .filter(p => p.category === "Tech")
  .reduce((total, p) => total + p.price, 0);
console.log("Total Tech : " + techTotal + "€");`,
            output: 'Produits Tech : Laptop, Mouse\nValeur totale du stock : 1055€\nTotal Tech : 1050€',
            realWorldUseCase: 'Dans React ou Vue.js, `.map()` est constamment utilisé pour transformer un tableau de données (les résultats d\'une recherche) en une liste de composants HTML à afficher à l\'écran.',
            commonErrors: '❌ Muter (modifier) le tableau d\'origine. Map et Filter renvoient un *nouveau* tableau. C\'est une excellente pratique car cela évite des bugs imprévisibles liés à la modification inattendue de données partagées (Side-effects).'
          },
          {
            title: '🔥 BOSS: Le Gardien des Promesses',
            isBoss: true,
            bossConstraints: { timeLimit: 'O(N)', spaceLimit: 'O(1)', description: 'Tu dois réparer l\'API corrompue du vaisseau sans bloquer le système principal.' },
            explanation: 'Étape 1 : Alerte critique.\nLe système central est en train de s\'effondrer. L\'API renvoie des erreurs aléatoires. \n\nÉtape 2 : Ta Mission.\nTu dois écrire une fonction asynchrone robuste qui tente de contacter le serveur, et qui gère l\'erreur proprement (try/catch) sans faire crasher l\'interface.',
            code: `// --- ÉPREUVE DU BOSS ---
// Tu n'as pas d'aide. Modifie la fonction pour qu'elle intercepte l'erreur !

async function sauverVaisseau() {
  console.log("Démarrage des moteurs...");
  // Le système central va crasher ici si tu ne le gères pas :
  const data = await fetchSystemData(); 
  console.log("Données sécurisées.");
}

// Ne touche pas à cette fonction (simule le crash serveur)
function fetchSystemData() {
  return Promise.reject("CRASH SERVEUR CRITIQUE !");
}

sauverVaisseau().catch(() => console.log("Sauvetage échoué (Non géré en interne)"));`,
            output: 'Démarrage des moteurs...\nSauvetage échoué (Non géré en interne)'
          }
        ]
      }
    ],
    resources: [
      { title: 'MDN Web Docs (La bible absolue)', url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript', type: 'doc' },
      { title: 'JavaScript.info (Cours détaillé complet)', url: 'https://javascript.info', type: 'doc' },
      { title: 'Exercices Pratiques JS sur CodeLearn', url: '/exercises', type: 'practice' }
    ],
    algoExamples: [
      { name: 'Bubble Sort', id: 'bubble-sort' },
      { name: 'Quick Sort', id: 'quick-sort' },
      { name: 'Binary Search', id: 'binary-search' }
    ]
  },

  python: {
    id: 'python', name: 'Python', icon: '🐍', color: '#3b82f6',
    tagline: 'La puissance de la lisibilité',
    desc: 'Réputé pour sa syntaxe propre et proche de l\'anglais. Si vous apprenez la programmation pour la première fois, l\'IA, ou la Data Science, c\'est le langage absolu.',
    difficulty: 1, popularity: 90, perf: 45,
    typing: 'Dynamique (Fort)', paradigm: 'Multi-paradigme', compiled: 'Interprété', level: 'Débutant',
    sections: [
      {
        title: 'Les Bases Absolues', icon: '🐣', level: 'Débutant',
        lessons: [
          {
            title: '1. Votre Premier Code : Hello World!',
            explanation: 'Étape 1 : Parler à l\'ordinateur.\nPour dire à l\'ordinateur d\'afficher quelque chose à l\'écran, Python utilise un ordre très simple : `print`.\n\nÉtape 2 : Les guillemets.\nL\'ordinateur est littéral. Si vous voulez afficher du texte, vous devez le mettre entre guillemets (" ") pour qu\'il comprenne que c\'est une phrase et non pas une commande secrète.',
            code: `# Appuyez sur Run pour afficher le message !
print("Bonjour le monde !")
print("Je suis prêt à apprendre à coder.")`,
            output: 'Bonjour le monde !\nJe suis prêt à apprendre à coder.',
            realWorldUseCase: 'La fonction print est utilisée par les développeurs tous les jours pour afficher des messages de statut (ex: "Connexion réussie") ou pour chercher où se trouve une erreur dans leur programme (Débogage).'
          },
          {
            title: '2. Les Variables (Boîtes de mémoire)',
            explanation: 'Étape 1 : Stocker une information.\nImaginez une variable comme une boîte en carton sur laquelle vous écrivez un nom au marqueur. À l\'intérieur, vous pouvez y mettre ce que vous voulez.\n\nÉtape 2 : L\'assignation avec le signe =.\nEn Python, on crée la boîte en écrivant son nom, puis `=` pour la remplir. (ex: `age = 25`).\n\nÉtape 3 : Réutiliser la boîte.\nUne fois la boîte créée, on peut utiliser son nom dans un `print` pour afficher son contenu.',
            code: `# Création de nos "boîtes" (variables)
nom_du_joueur = "Arthur"
vies_restantes = 3

print("Héros :")
print(nom_du_joueur)
print("Vies :")
print(vies_restantes)`,
            output: 'Héros :\nArthur\nVies :\n3',
            commonErrors: '❌ Erreur classique : Oublier de mettre des guillemets autour du texte. `nom = Arthur` va faire crasher le code, car Python va chercher une variable qui s\'appelle Arthur au lieu de comprendre que c\'est juste le mot "Arthur".'
          },
          {
            title: '3. Les Opérations Mathématiques',
            explanation: 'Étape 1 : Python est une calculatrice géante.\nVous pouvez additionner `+`, soustraire `-`, multiplier `*`, et diviser `/`.\n\nÉtape 2 : Modifier une variable.\nSi votre personnage perd une vie, vous pouvez prendre la boîte `vies`, lui enlever 1, et remettre le nouveau résultat dans la boîte !',
            code: `pieces_or = 10
prix_epee = 7

# On calcule la monnaie restante
monnaie = pieces_or - prix_epee

print("J'ai acheté l'épée. Il me reste :")
print(monnaie)
print("pièces d'or.")`,
            output: 'J\'ai acheté l\'épée. Il me reste :\n3\npièces d\'or.',
            realWorldUseCase: 'Calculer le score d\'un utilisateur, le prix total d\'un panier d\'achat avec la TVA, ou les dégâts d\'un boss dans un jeu.'
          }
        ]
      },
      {
        title: 'Structures de Base', icon: '🌱', level: 'Débutant',
        lessons: [
          {
            title: 'Variables et l\'Indentation',
            explanation: 'Étape 1 : Le pouvoir de l\'Indentation.\nEn Python, pas besoin d\'accolades `{}` ! On utilise des espaces (indentation) pour regrouper le code. Cela force à écrire du code propre.\n\nÉtape 2 : Créer des variables.\nPas de mot-clé spécial. On écrit juste le nom de la variable, un `=`, et sa valeur.\n\nÉtape 3 : Poser des conditions.\nUtilisez `if`, `elif` (sinon si), et `else`. N\'oubliez pas les deux points `:` à la fin de la ligne de condition !',
            code: `# Déclaration simple
hero_name = "Aragorn"
level = 87
health = 100.0

# Condition avec indentation (4 espaces)
if level > 50:
    print(f"{hero_name} est un vétéran.") # F-string : injection de variable
    
    if health < 20:
        print("Attention, potion requise !")
else:
    print("Encore un novice.")

print("Fin de l'analyse.") # Hors de l'indentation = hors du if`,
            output: 'Aragorn est un vétéran.\nFin de l\'analyse.',
            realWorldUseCase: 'Les scripts d\'automatisation. En 5 lignes de Python bien indentées, vous pouvez écrire un script qui renomme des centaines de fichiers sur votre ordinateur en un clic.',
            commonErrors: '❌ Erreur `IndentationError`. Mélanger des tabulations et des espaces, ou oublier d\'indenter après les deux points `:` d\'un `if` ou `for` fera immédiatement crasher le programme Python.'
          },
          {
            title: 'Listes et Dictionnaires',
            explanation: 'Étape 1 : Les Listes (Crochets []).\nElles stockent plusieurs éléments dans un ordre précis. Vous pouvez ajouter des éléments avec `.append()` et lire à l\'envers avec des index négatifs (ex: `-1`).\n\nÉtape 2 : Les Dictionnaires (Accolades {}).\nIls stockent des paires Clé-Valeur (comme un dictionnaire mot-définition). C\'est parfait pour regrouper les propriétés d\'un personnage ou des données serveur.\n\nÉtape 3 : Manipulation directe.\nVous pouvez facilement modifier la valeur d\'un dictionnaire en appelant sa clé : `player["agility"] += 5`.',
            code: `# --- LISTES ---
inventory = ["Épée", "Arc", "Potion"]
inventory.append("Bouclier") # Ajoute à la fin
print("Dernier objet:", inventory[-1]) # Les index négatifs lisent à l'envers !

# --- DICTIONNAIRES ---
player = {
    "name": "Legolas",
    "class": "Archer",
    "agility": 95
}
player["agility"] += 5 # Modification
print(f"{player['name']} a {player['agility']} d'agilité.")`,
            output: 'Dernier objet: Bouclier\nLegolas a 100 d\'agilité.',
            realWorldUseCase: 'L\'entraînement d\'IA (Machine Learning). Une image est convertie en une "liste" de milliers de nombres (les pixels) avant d\'être donnée à un réseau de neurones en Python.',
            commonErrors: '❌ `KeyError` : Tenter de lire une clé qui n\'existe pas dans un dictionnaire `player["magic"]`. Préférez utiliser `player.get("magic", 0)` qui renvoie une valeur par défaut (0) sans crasher.'
          }
        ]
      },
      {
        title: 'Structures & Logique', icon: '🏗️', level: 'Intermédiaire',
        lessons: [
          {
            title: 'Boucles et Compréhension de listes',
            explanation: 'Étape 1 : La Boucle For-Each.\nEn Python, on ne compte pas de 0 à la fin. On dit simplement : `for num in numbers` (Pour chaque numéro dans la liste des numéros). C\'est clair et direct.\n\nÉtape 2 : La Compréhension de liste.\nC\'est LE super-pouvoir de Python. Cela permet de créer, filtrer et modifier une liste entière en une seule ligne très lisible.\n\nÉtape 3 : Syntaxe de la Compréhension.\n`[résultat for element in liste if condition]`. C\'est de l\'anglais mathématique !',
            code: `numbers = [1, 2, 3, 4, 5]

# Boucle classique
print("--- Boucle For ---")
for num in numbers:
    if num % 2 == 0:
        print(f"{num} est pair")

# LIST COMPREHENSION (La magie de Python)
# Créer une nouvelle liste avec les carrés des nombres pairs
squares = [x * x for x in numbers if x % 2 == 0]

print("--- List Comprehension ---")
print(f"Carrés des nombres pairs : {squares}")`,
            output: '--- Boucle For ---\n2 est pair\n4 est pair\n--- List Comprehension ---\nCarrés des nombres pairs : [4, 16]',
            realWorldUseCase: 'En Data Science, la compréhension de liste est utilisée pour nettoyer des datasets massifs (ex: `[clean(text) for text in emails if is_spam(text)]`) en une fraction de seconde et avec très peu de code.',
            commonErrors: '❌ Abuser des compréhensions de listes. Si votre ligne fait plus de 100 caractères avec des `if/else` imbriqués complexes, revenez à une boucle `for` classique pour que votre équipe puisse relire le code.'
          },
          {
            title: 'Fonctions et *args / **kwargs',
            explanation: 'Étape 1 : Définir une fonction.\nOn utilise le mot-clé `def` suivi du nom et des paramètres.\n\nÉtape 2 : Les arguments multiples (*args).\nEn ajoutant une étoile `*` devant un paramètre, la fonction peut accepter une infinité d\'arguments normaux.\n\nÉtape 3 : Les arguments nommés (**kwargs).\nEn ajoutant deux étoiles `**`, la fonction peut accepter une infinité d\'arguments nommés (clés-valeurs), offrant une flexibilité totale.',
            code: `def calculate_damage(base, *multipliers, **bonuses):
    """Calcule les dégâts finaux d'une attaque."""
    total = base
    
    # args est un tuple de valeurs non nommées
    for mult in multipliers:
        total *= mult
        
    # kwargs est un dictionnaire de valeurs nommées
    if "fire" in bonuses:
        total += bonuses["fire"]
        
    return total

# Appel avec multiples arguments dynamiques
dmg = calculate_damage(50, 1.5, 2.0, fire=15, poison=5)
print(f"Dégâts infligés : {dmg}")`,
            output: 'Dégâts infligés : 165.0',
            realWorldUseCase: 'Dans le framework web Django ou FastAPI, `**kwargs` est utilisé en permanence pour traiter les paramètres variables envoyés par les utilisateurs via des formulaires web ou des requêtes API sans avoir à déclarer chaque champ à l\'avance.',
            commonErrors: '❌ Oublier l\'ordre strict des paramètres : `def func(positionnels, *args, **kwargs)`.'
          }
        ]
      },
      {
        title: 'Python Avancé', icon: '⚡', level: 'Expert',
        lessons: [
          {
            title: 'Générateurs et le mot-clé Yield',
            explanation: 'Étape 1 : Le problème de la RAM.\nSi vous chargez un fichier de 50 Go dans une liste classique, votre ordinateur va planter car la mémoire RAM sera saturée.\n\nÉtape 2 : La magie du mot-clé Yield.\nUn Générateur (utilisant `yield` au lieu de `return`) calcule les valeurs **une par une**, seulement quand on les lui demande.\n\nÉtape 3 : La mise en pause.\nÀ chaque `yield`, la fonction s\'arrête, renvoie la valeur, et "gèle" son état. Elle reprendra exactement là où elle s\'était arrêtée au prochain appel.',
            code: `# Fonction classique : crée la liste en mémoire (LOURD)
def get_fibonacci_list(n):
    result = []
    a, b = 0, 1
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

# Générateur avec yield : génère à la demande (LÉGER)
def fibonacci_generator(n):
    a, b = 0, 1
    for _ in range(n):
        yield a   # Renvoie 'a' puis met en PAUSE la fonction
        a, b = b, a + b

print("Liste mémoire:", get_fibonacci_list(5))

print("Générateur:")
gen = fibonacci_generator(5)
print(next(gen)) # 0
print(next(gen)) # 1
print(next(gen)) # 1

# On peut itérer directement sur un générateur
for val in fibonacci_generator(3):
    print(f"Boucle: {val}")`,
            output: 'Liste mémoire: [0, 1, 1, 2, 3]\nGénérateur:\n0\n1\n1\nBoucle: 0\nBoucle: 1\nBoucle: 1',
            realWorldUseCase: 'Analyse de Big Data. Pour lire un dataset de millions de lignes sans faire exploser les serveurs cloud, les data scientists utilisent `yield` pour lire et analyser le fichier ligne par ligne.',
            commonErrors: '❌ Essayer d\'utiliser la fonction `len(gen)` sur un générateur, ou d\'y accéder par index `gen[2]`. Un générateur ne connaît pas le futur, il ne calcule que le présent de manière paresseuse ("lazy evaluation").'
          },
          {
            title: '🔥 BOSS: Le Dragon de Mémoire',
            isBoss: true,
            bossConstraints: { timeLimit: 'O(N)', spaceLimit: 'O(1) Espace', description: 'Générer 1 million de boucliers d\'énergie sans utiliser plus de 5 Mo de RAM.' },
            explanation: 'Étape 1 : Alerte critique.\nL\'essaim alien approche. Nous avons besoin d\'un million de champs de force, mais le vaisseau n\'a presque plus de RAM !\n\nÉtape 2 : Ta Mission.\nUtilise un Générateur (yield) pour créer les champs de force un par un, au lieu d\'utiliser une Liste classique qui ferait exploser la mémoire.',
            code: `# --- ÉPREUVE DU BOSS ---
# Tu n'as pas d'aide. Transforme cette fonction mortelle en générateur !

def generer_boucliers(quantite):
    # DANGER : Cette liste va détruire la RAM du vaisseau !
    boucliers = []
    for i in range(quantite):
        boucliers.append(f"Bouclier {i} actif")
    return boucliers

# Le test de survie
systeme = generer_boucliers(1000000)
print("Création terminée.")`,
            output: 'Création terminée.'
          }
        ]
      }
    ],
    resources: [
      { title: 'Documentation Officielle', url: 'https://docs.python.org/fr/3/tutorial/index.html', type: 'doc' },
      { title: 'RealPython (Superbes articles et visualisations)', url: 'https://realpython.com', type: 'doc' },
      { title: 'Pratique Algorithmique CodeLearn', url: '/algorithms', type: 'practice' }
    ],
    algoExamples: [
      { name: 'Bubble Sort', id: 'bubble-sort' },
      { name: 'Merge Sort', id: 'merge-sort' },
      { name: 'Binary Search', id: 'binary-search' }
    ]
  },

  java: {
    id: 'java', name: 'Java', icon: '☕', color: '#ef4444',
    tagline: 'L\'architecture Orientée Objet par excellence',
    desc: 'Le pilier du monde de l\'entreprise. Un langage typé statiquement qui force une architecture rigoureuse et produit des applications backend extrêmement scalables et sécurisées.',
    difficulty: 3, popularity: 75, perf: 80,
    typing: 'Statique fort', paradigm: 'Orienté Objet', compiled: 'Compilé (JVM)', level: 'Intermédiaire',
    sections: [
      {
        title: 'Les Bases Absolues', icon: '🐣', level: 'Débutant',
        lessons: [
          {
            title: '1. Votre Premier Code : Hello World!',
            explanation: 'Étape 1 : Tout dans une classe.\nJava est très strict. Tout votre code doit vivre dans une "Boîte Principale" appelée une Classe (`class Main`).\n\nÉtape 2 : Le point d\'entrée.\nEnsuite, il faut une porte d\'entrée : `public static void main`. C\'est là que l\'exécution commence.\n\nÉtape 3 : Afficher du texte.\nPour afficher du texte, l\'ordre est `System.out.println("Votre texte");`.',
            code: `// Classe principale obligatoire
public class Main {
    // Porte d'entrée obligatoire
    public static void main(String[] args) {
        System.out.println("Bonjour le monde !");
        System.out.println("Bienvenue dans le monde de Java.");
    }
}`,
            output: 'Bonjour le monde !\nBienvenue dans le monde de Java.',
            realWorldUseCase: 'C\'est la structure exacte utilisée par les applications bancaires pour démarrer leurs serveurs sécurisés.'
          }
        ]
      },
      {
        title: 'Structures de Base', icon: '🌱', level: 'Débutant',
        lessons: [
          {
            title: 'Syntaxe de base et Typage fort',
            explanation: 'Étape 1 : Le Typage Fort.\nEn Java, chaque variable doit avoir un type déclaré (int, double, boolean, String) dès le début et ne peut plus en changer. C\'est strict mais très sécurisé.\n\nÉtape 2 : Le concept de Classe.\nContrairement à d\'autres langages, TOUT le code en Java doit s\'inscrire à l\'intérieur d\'une "Class".\n\nÉtape 3 : Le Point d\'entrée.\nPour que votre programme s\'exécute, il doit toujours posséder une méthode spéciale appelée `public static void main`.',
            code: `public class Main {
    public static void main(String[] args) {
        int age = 25;
        double price = 19.99;
        boolean isValid = true;
        String name = "CodeLearn";

        System.out.println("Bonjour " + name);
        System.out.println("Âge : " + age);

        // Erreur de compilation si on essaie :
        // age = "vingt-cinq"; // Incompatible types!
    }
}`,
            output: 'Bonjour CodeLearn\nÂge : 25',
            realWorldUseCase: 'Création d\'applications d\'entreprise robustes. Le typage fort évite des bugs silencieux en production.',
            commonErrors: '❌ Oublier le point-virgule à la fin d\'une instruction. Contrairement à Python ou JS (souvent permissif), Java refusera de compiler sans `;`.'
          }
        ]
      },
      {
        title: 'Le Paradigme Objet', icon: '🏛️', level: 'Intermédiaire',
        lessons: [
          {
            title: 'Classes, Objets et Typage strict',
            explanation: 'Étape 1 : Le plan de construction (Classe).\nUne Classe agit comme le plan de construction de votre application. Elle définit les caractéristiques (attributs) et les actions (méthodes).\n\nÉtape 2 : L\'instance (Objet).\nL\'Objet est la création physique de ce plan (utiliser `new Car()`). C\'est comme construire une vraie maison à partir d\'un plan.\n\nÉtape 3 : La rigueur du compilateur.\nSi vous essayez de mettre du texte dans une variable numérique, le compilateur refusera de lancer le code. C\'est frustrant, mais cela sauve des millions de bugs en production.',
            code: `class Car {
    String brand;
    int speed;

    public Car(String brand) {
        this.brand = brand;
        this.speed = 0;
    }

    public void accelerate(int amount) {
        this.speed += amount;
        System.out.println(brand + " roule à " + speed + " km/h");
    }
}

public class Main {
    public static void main(String[] args) {
        Car myCar = new Car("Tesla");
        myCar.accelerate(50);
    }
}`,
            output: 'Tesla roule à 50 km/h',
            realWorldUseCase: 'Les systèmes bancaires utilisent Java car le typage strict garantit qu\'une variable contenant un "Solde" ne sera jamais transformée en texte accidentellement.',
            commonErrors: '❌ `NullPointerException` (Le fléau de Java). Essayer d\'appeler une méthode sur un objet non initialisé (`Car myCar = null; myCar.accelerate(10);`).'
          },
          {
            title: 'Encapsulation et Modificateurs d\'accès',
            explanation: 'Étape 1 : Protéger les données (Encapsulation).\nL\'idée est d\'empêcher le monde extérieur de modifier vos données n\'importe comment. C\'est crucial pour la sécurité.\n\nÉtape 2 : Le mot-clé Private.\nEn déclarant un attribut `private`, seule la classe elle-même y a accès.\n\nÉtape 3 : Les Getters et Setters.\nPour lire ou modifier ces données privées de façon contrôlée, on crée des fonctions publiques (ex: `getSolde()`, `deposer()`) qui vérifient que l\'action est valide.',
            code: `class BankAccount {
    private double balance; // Protégé de l'extérieur !

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    // Getter
    public double getBalance() {
        return this.balance;
    }

    // Setter avec validation
    public void deposit(double amount) {
        if (amount > 0) {
            this.balance += amount;
            System.out.println("Dépôt de " + amount + " effectué. Nouveau solde : " + this.balance);
        } else {
            System.out.println("Montant invalide.");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(100.0);
        
        // account.balance = 1000000; // ERREUR ! balance a un accès private
        account.deposit(50.0);
        System.out.println("Solde final : " + account.getBalance());
    }
}`,
            output: 'Dépôt de 50.0 effectué. Nouveau solde : 150.0\nSolde final : 150.0',
            realWorldUseCase: 'Créer des API backend où certaines données (comme un mot de passe ou un solde) ne peuvent pas être lues ou altérées par d\'autres parties du code sans passer par une validation stricte.',
            commonErrors: '❌ Déclarer tous ses attributs en `public` par flemme. Cela casse le principe de l\'Orienté Objet et expose votre application à des comportements imprévisibles.'
          }
        ]
      }
    ],
    resources: [
      { title: 'Baeldung (Meilleure ressource Java backend)', url: 'https://www.baeldung.com', type: 'doc' }
    ],
    algoExamples: [
      { name: 'Binary Search', id: 'binary-search' }
    ]
  },

  cpp: {
    id: 'cpp', name: 'C++', icon: '⚡', color: '#8b5cf6',
    tagline: 'Performance brute et contrôle mémoire',
    desc: 'Le pont entre le code humain et la machine. C++ vous donne les clés du processeur et de la mémoire RAM, au prix d\'une complexité d\'apprentissage très élevée.',
    difficulty: 5, popularity: 65, perf: 100,
    typing: 'Statique fort', paradigm: 'Multi-paradigme', compiled: 'Compilé natif', level: 'Expert',
    sections: [
      {
        title: 'Les Bases Absolues', icon: '🐣', level: 'Débutant',
        lessons: [
          {
            title: '1. Votre Premier Code : Hello World!',
            explanation: 'Étape 1 : Importer les outils.\nEn C++, par défaut vous n\'avez rien, pas même la capacité d\'afficher du texte. Il faut importer `iostream` (Input/Output Stream).\n\nÉtape 2 : std::cout.\nPour "pousser" du texte vers l\'écran, on utilise `std::cout` (Character OUTput) suivi de flèches `<<`.\n\nÉtape 3 : Le main().\nTout programme commence par la fonction `int main()` et se termine par `return 0;` (0 signifie "Zéro erreur").',
            code: `#include <iostream>

int main() {
    // On pousse le texte vers l'écran avec <<
    // endl signifie "End Line" (Passer à la ligne)
    std::cout << "Bonjour le monde !" << std::endl;
    std::cout << "Je deviens un hacker en C++" << std::endl;
    
    return 0; // Zéro erreur
}`,
            output: 'Bonjour le monde !\nJe deviens un hacker en C++',
            realWorldUseCase: 'Les jeux vidéo AAA (Unreal Engine) et les moteurs de fusées (SpaceX) utilisent cette structure C++ pour garantir des performances optimales.'
          }
        ]
      },
      {
        title: 'Structures de Base', icon: '⚡', level: 'Débutant',
        lessons: [
          {
            title: 'Introduction au C++',
            explanation: 'Étape 1 : Inclure des outils.\nEn C++, le fichier de base est vide. Vous devez inclure des bibliothèques (`#include <iostream>`) pour avoir accès aux fonctions basiques comme écrire du texte.\n\nÉtape 2 : L\'espace de noms (Namespace).\nPour éviter d\'écrire `std::cout` à chaque fois, on utilise `using namespace std;`.\n\nÉtape 3 : Le Point d\'entrée.\nComme en C et Java, l\'exécution commence obligatoirement à l\'intérieur de la fonction `main()` et retourne 0 si tout s\'est bien passé.',
            code: `#include <iostream>
#include <string>

// Utiliser l'espace de noms standard évite d'écrire std:: partout
using namespace std;

int main() {
    int age = 30;
    string name = "Développeur";

    // Affichage dans la console avec 'cout' et 'endl' (retour à la ligne)
    cout << "Bonjour " << name << "!" << endl;
    cout << "Votre age est " << age << endl;

    return 0; // Le programme s'est terminé avec succès
}`,
            output: 'Bonjour Développeur!\nVotre age est 30',
            realWorldUseCase: 'Création de systèmes temps réel ou moteurs de jeux vidéo (Unreal Engine) où la rapidité d\'exécution est primordiale.',
            commonErrors: '❌ Oublier `#include <iostream>` avant d\'utiliser `cout` ou `cin`.'
          }
        ]
      },
      {
        title: 'Mémoire & Performance', icon: '🧠', level: 'Expert',
        lessons: [
          {
            title: 'Pointeurs et Gestion Mémoire',
            explanation: 'Étape 1 : Pas de nettoyage automatique.\nContrairement à Java, le C++ n\'a pas de "Garbage Collector". Vous devez gérer vous-même ce qui est stocké dans la mémoire RAM de l\'ordinateur.\n\nÉtape 2 : L\'adresse mémoire (&).\nLe symbole `&` permet de demander à l\'ordinateur : "Où est stockée cette variable physiquement dans la puce de la RAM ?"\n\nÉtape 3 : Les Pointeurs (*).\nUn Pointeur est une variable spéciale qui stocke cette adresse physique. Il vous donne un accès direct et surpuissant au matériel.',
            code: `#include <iostream>
using namespace std;

int main() {
    int score = 100;
    
    // ptr stocke L'ADRESSE MÉMOIRE de score (symbole &)
    int* ptr = &score;
    
    cout << "Valeur : " << score << endl;
    cout << "Adresse en RAM : " << ptr << endl;
    
    // Modification directe via l'adresse RAM (déréférencement avec *)
    *ptr = 999;
    
    cout << "Nouveau score : " << score << endl;
    
    return 0;
}`,
            output: 'Valeur : 100\nAdresse en RAM : 0x7ffee6b5a8ac\nNouveau score : 999',
            realWorldUseCase: 'Jeux vidéo AAA à 60 FPS constants. C++ évite les micro-saccades causées par les Garbage Collectors.',
            commonErrors: '❌ `Segmentation Fault` (Segfault). Survient si vous essayez de lire/écrire via un pointeur vers une zone mémoire non allouée.'
          },
          {
            title: 'Références et Passage par Référence',
            explanation: 'Étape 1 : Le problème de la Copie.\nPar défaut, si vous donnez une liste à une fonction, le C++ va la photocopier intégralement (Pass by Value). C\'est très lent pour les grosses listes !\n\nÉtape 2 : Utiliser les Références (&).\nEn ajoutant un `&` dans les paramètres de la fonction, vous passez l\'objet original direct, sans copie (Pass by Reference).\n\nÉtape 3 : La Sécurité.\nLes références sont comme des pointeurs mais plus sûres : elles ne peuvent pas pointer vers "rien" (null).',
            code: `#include <iostream>
#include <vector>
using namespace std;

// Le '&' signifie qu'on passe le vrai vecteur, pas une copie !
void addElement(vector<int>& numbers) {
    numbers.push_back(42);
    cout << "Taille dans la fonction : " << numbers.size() << endl;
}

int main() {
    vector<int> myData;
    myData.push_back(10);
    
    cout << "Taille avant : " << myData.size() << endl;
    addElement(myData);
    cout << "Taille après : " << myData.size() << endl;
    
    return 0;
}`,
            output: 'Taille avant : 1\nTaille dans la fonction : 2\nTaille après : 2',
            realWorldUseCase: 'Passage de grosses structures 3D à travers de multiples fonctions sans engorger la mémoire RAM avec des copies redondantes.',
            commonErrors: '❌ Oublier le `&` dans les paramètres de la fonction, ce qui force une copie intégrale inutile et ralentit considérablement l\'exécution (Pass by Value vs Pass by Reference).'
          }
        ]
      }
    ],
    resources: [
      { title: 'LearnCpp', url: 'https://www.learncpp.com', type: 'doc' }
    ],
    algoExamples: [
      { name: 'Quick Sort', id: 'quick-sort' }
    ]
  },

  csharp: {
    id: 'csharp', name: 'C#', icon: '💜', color: '#a855f7',
    tagline: 'L\'élégance au service de la productivité',
    desc: 'Un langage moderne créé par Microsoft, combinant la puissance de C++ avec la sécurité et la productivité de Java. Standard pour le framework Unity (jeux vidéo).',
    difficulty: 3, popularity: 68, perf: 82,
    typing: 'Statique fort', paradigm: 'Orienté Objet', compiled: 'Compilé (CLR)', level: 'Intermédiaire',
    sections: [
      {
        title: 'Les Bases Absolues', icon: '🐣', level: 'Débutant',
        lessons: [
          {
            title: '1. Votre Premier Code : Hello World!',
            explanation: 'Étape 1 : Le namespace System.\nEn C#, de nombreux outils utiles (comme l\'écriture à l\'écran) sont stockés dans le dossier virtuel `System`. On l\'importe avec `using System;`.\n\nÉtape 2 : L\'organisation en classes.\nComme en Java, le code C# doit vivre dans une classe (`class Program`).\n\nÉtape 3 : Console.WriteLine.\nLa commande pour écrire du texte dans la console est `Console.WriteLine()`.',
            code: `using System;

public class Program {
    public static void Main() {
        Console.WriteLine("Bonjour le monde !");
        Console.WriteLine("Bienvenue en C#, le langage de Unity et Microsoft.");
    }
}`,
            output: 'Bonjour le monde !\nBienvenue en C#, le langage de Unity et Microsoft.',
            realWorldUseCase: 'C\'est la commande la plus utilisée pour déboguer des comportements imprévus dans le développement d\'un jeu sous Unity.'
          }
        ]
      },
      {
        title: 'Bases du Langage', icon: '🎯', level: 'Débutant',
        lessons: [
          {
            title: 'Syntaxe et Types',
            explanation: 'Étape 1 : L\'écosystème Microsoft.\nC# est le langage incontournable pour les applications Windows, le back-end d\'entreprise (.NET), et les jeux vidéo (Unity).\n\nÉtape 2 : Le typage strict mais intelligent.\nBien que le C# nécessite des types clairs, l\'utilisation de `var` permet de laisser l\'ordinateur deviner le type lors de la déclaration, allégeant l\'écriture.\n\nÉtape 3 : L\'interpolation de chaîne.\nTrès pratique : en mettant un `$` devant des guillemets, vous pouvez injecter des variables directement avec des accolades `{variable}`.',
            code: `using System;

public class Program {
    public static void Main() {
        // Typage explicite
        int count = 10;
        string message = "Bonjour C#";
        
        // Typage implicite avec 'var' (très courant en C#)
        var price = 99.99; 
        var isReady = true;
        
        // Interpolation de chaîne avec le symbole $
        Console.WriteLine($"{message} ! Le prix est {price}");
    }
}`,
            output: 'Bonjour C# ! Le prix est 99.99',
            realWorldUseCase: 'Développement de jeux vidéo sur Unity, où le typage fort de C# empêche de nombreux bugs tout en offrant une syntaxe moderne et lisible.',
            commonErrors: '❌ Oublier le `using System;` au début du fichier, causant l\'impossibilité d\'utiliser `Console.WriteLine`.'
          }
        ]
      },
      {
        title: 'Modernité', icon: '✨', level: 'Intermédiaire',
        lessons: [
          {
            title: 'LINQ : La data élégante',
            explanation: 'Étape 1 : Découvrir LINQ.\nLINQ (Language Integrated Query) est LE superpouvoir de C#. Il permet de filtrer, trier et manipuler des listes avec une facilité déconcertante.\n\nÉtape 2 : La syntaxe type "SQL".\nVous pouvez utiliser des mots clés directement dans le code comme `from`, `where` et `select` (très similaire aux bases de données).\n\nÉtape 3 : L\'exécution différée.\nAttention ! La requête LINQ n\'est pas exécutée au moment où vous l\'écrivez, mais seulement au moment où vous essayez de lire le résultat final (ex: dans un foreach).',
            code: `using System;
using System.Linq;
using System.Collections.Generic;

public class Program {
    public static void Main() {
        var scores = new List<int> { 97, 92, 81, 60, 55, 100 };
        
        // Magie LINQ : Syntaxe de type SQL directement en C# !
        var excellents = from s in scores
                         where s > 90
                         orderby s descending
                         select s;
                         
        Console.WriteLine("Meilleurs scores :");
        foreach (var score in excellents) {
            Console.WriteLine(score);
        }
    }
}`,
            output: 'Meilleurs scores :\n100\n97\n92',
            realWorldUseCase: 'Développement de Back-ends avec .NET Core. LINQ permet aux développeurs de filtrer des bases de données massives directement via le code C#, sans écrire de SQL textuel complexe.',
            commonErrors: '❌ Exécution différée : Les requêtes LINQ ne sont évaluées que lors d\'un appel à `.ToList()` ou dans un `foreach`. Si vous modifiez la liste d\'origine avant de lire la requête, le résultat va changer inopinément.'
          },
          {
            title: 'Programmation Asynchrone',
            explanation: 'Étape 1 : Ne pas bloquer l\'interface.\nSi votre application doit télécharger 5 Go sur internet, le système "Asynchrone" permet à l\'application de rester fluide pendant l\'attente au lieu de geler.\n\nÉtape 2 : Le mot-clé Async.\nOn l\'ajoute devant une fonction pour signaler au compilateur que cette tâche s\'exécutera en tâche de fond (Task).\n\nÉtape 3 : Le mot-clé Await.\nIl dit au code : "Mets cette partie en pause jusqu\'à ce qu\'on reçoive le résultat, pendant ce temps, l\'application continue de vivre".',
            code: `using System;
using System.Threading.Tasks;

public class Program {
    // La méthode Main peut être asynchrone !
    public static async Task Main() {
        Console.WriteLine("1. Lancement de la requête...");
        
        // On attend la tâche asynchrone sans bloquer le thread principal
        string result = await FetchDataAsync();
        
        Console.WriteLine("3. " + result);
    }
    
    static async Task<string> FetchDataAsync() {
        // Simulation d'une attente réseau (ex: appel API)
        await Task.Delay(1000); 
        return "Données téléchargées avec succès !";
    }
}`,
            output: '1. Lancement de la requête...\n3. Données téléchargées avec succès !',
            realWorldUseCase: 'Les applications web hautement concurrentes (Blazor, ASP.NET Core) utilisent massivement l\'asynchrone pour pouvoir gérer des milliers d\'utilisateurs simultanés sans consommer tous les processeurs du serveur.',
            commonErrors: '❌ Utiliser `.Result` ou `.Wait()` sur une Tâche (Task) au lieu de `await`. Cela cause un "Deadlock" (blocage mortel) qui gèlera votre application.'
          }
        ]
      }
    ],
    resources: [
      { title: 'Microsoft Docs C#', url: 'https://learn.microsoft.com/fr-fr/dotnet/csharp/', type: 'doc' }
    ],
    algoExamples: []
  },

  c: {
    id: 'c', name: 'C', icon: '🔧', color: '#06b6d4',
    tagline: 'Les fondations de l\'informatique',
    desc: 'La mère de (presque) tous les langages modernes (C++, Java, JS, Python ont tous été influencés ou même construits en C). Dénué de concepts modernes, il force à comprendre le matériel.',
    difficulty: 4, popularity: 55, perf: 98,
    typing: 'Statique', paradigm: 'Procédural', compiled: 'Compilé natif', level: 'Expert',
    sections: [
      {
        title: 'Les Bases Absolues', icon: '🐣', level: 'Débutant',
        lessons: [
          {
            title: '1. Votre Premier Code : Hello World!',
            explanation: 'Étape 1 : La librairie d\'entrée/sortie.\nLe langage C est nu par défaut. Pour écrire du texte, il faut d\'abord importer la librairie Standard Input/Output avec `#include <stdio.h>`.\n\nÉtape 2 : La fonction printf.\nLa fonction `printf` (Print Formatted) sert à écrire du texte. Attention, il faut indiquer à la fin `\\n` pour dire "passe à la ligne suivante" (Newline).\n\nÉtape 3 : Le retour de main.\nLa fonction `main` doit toujours se terminer par `return 0;` (0 signifie tout s\'est bien passé).',
            code: `#include <stdio.h>

int main() {
    printf("Bonjour le monde !\\n");
    printf("Bienvenue dans les fondations de l'informatique.\\n");
    
    return 0;
}`,
            output: 'Bonjour le monde !\nBienvenue dans les fondations de l\'informatique.',
            realWorldUseCase: 'Cette base structure absolument tous les programmes C, du plus simple script à l\'ordinateur de bord d\'une navette spatiale.'
          }
        ]
      },
      {
        title: 'Fondamentaux C', icon: '🏗️', level: 'Débutant',
        lessons: [
          {
            title: 'Les origines de la programmation',
            explanation: 'Étape 1 : Au plus proche du matériel.\nLe C est ce qui se rapproche le plus du langage que votre processeur comprend, tout en restant lisible par un humain. C\'est pourquoi c\'est si rapide.\n\nÉtape 2 : Le moteur du C (Les librairies).\nPour faire les choses les plus basiques comme écrire du texte, il faut inclure une librairie : `#include <stdio.h>`.\n\nÉtape 3 : Pas de Booléens natifs.\nHistoriquement, le C n\'a pas de concept "Vrai" (True) ou "Faux" (False). On utilise des nombres : 0 veut dire Faux, tout le reste (comme 1) veut dire Vrai.',
            code: `#include <stdio.h>

int main() {
    int year = 1972;
    // printf utilise des formateurs comme %d (entier), %s (chaine), %f (flottant)
    printf("Le langage C a été créé en %d.\\n", year);
    
    // Le C n'a pas de booléens natifs ! (Avant C99)
    // 0 signifie Faux, tout le reste signifie Vrai.
    int isAwesome = 1;
    if (isAwesome) {
        printf("Le C est vraiment bas niveau et rapide !\\n");
    }

    return 0;
}`,
            output: 'Le langage C a été créé en 1972.\nLe C est vraiment bas niveau et rapide !',
            realWorldUseCase: 'Développement de systèmes embarqués, comme le logiciel qui fait fonctionner votre réfrigérateur ou l\'ordinateur de bord d\'une voiture.',
            commonErrors: '❌ Oublier le `\\n` à la fin d\'un `printf`. Contrairement à d\'autres langages, C ne saute pas de ligne automatiquement à la fin d\'un affichage.'
          }
        ]
      },
      {
        title: 'Bas Niveau', icon: '⚙️', level: 'Expert',
        lessons: [
          {
            title: 'L\'absence de "vrais" Tableaux et Chaines',
            explanation: 'Étape 1 : Le mythe du Texte.\nIl n\'y a pas de "Texte" (String) en C ! Ce que vous appelez du texte est simplement une série de lettres individuelles placées l\'une à côté de l\'autre.\n\nÉtape 2 : Le Caractère de fin (\\0).\nComment l\'ordinateur sait-il que le mot est terminé ? Il faut toujours une case supplémentaire à la fin contenant un zéro spécial (`\\0`).\n\nÉtape 3 : L\'écriture aveugle en mémoire.\nLe C ne vérifie pas la taille des mots. Si vous mettez un mot de 10 lettres dans un espace prévu pour 5, le C acceptera et écrasera silencieusement la mémoire voisine (Dépassement de Buffer).',
            code: `#include <stdio.h>
#include <string.h>

int main() {
    // Pas de type 'String'. C'est un tableau de 6 cases mémoire
    // 'H', 'e', 'l', 'l', 'o', '\\0'
    char greeting[] = "Hello";
    
    printf("Mot : %s\\n", greeting);
    printf("Premiere lettre : %c\\n", greeting[0]);
    printf("Taille memoire (bytes) : %lu\\n", sizeof(greeting));
    
    // Pour modifier le mot, on doit utiliser une fonction mémoire
    strcpy(greeting, "World");
    printf("Nouveau mot : %s\\n", greeting);
    
    return 0;
}`,
            output: 'Mot : Hello\nPremiere lettre : H\nTaille memoire (bytes) : 6\nNouveau mot : World',
            realWorldUseCase: 'L\'écriture des noyaux de Systèmes d\'exploitation (Linux, Windows) où l\'on doit contrôler exactement la taille de chaque variable octet par octet.',
            commonErrors: '❌ Buffer Overflow. En C, si vous copiez un mot de 10 lettres dans un tableau de 5 lettres, C ne vous arrête pas ! Il écrase la mémoire voisine, ce qui constitue l\'une des pires failles de sécurité.'
          },
          {
            title: 'Allocation Dynamique de Mémoire (Malloc)',
            explanation: 'Étape 1 : La taille fixe.\nPar défaut, en C, si vous créez un tableau pour 10 éléments, il ne pourra jamais en contenir 11. C\'est gravé dans le marbre.\n\nÉtape 2 : Demander la permission à l\'OS (malloc).\nPour avoir un tableau flexible, vous devez utiliser la fonction `malloc()` pour "Réserver de l\'espace" directement à votre Système d\'Exploitation.\n\nÉtape 3 : Libérer la mémoire (free).\nSi vous ne rendez pas cet espace avec `free()`, la RAM de votre ordinateur restera occupée (Fuite de mémoire) jusqu\'au crash total.',
            code: `#include <stdio.h>
#include <stdlib.h> // Requis pour malloc et free

int main() {
    int numberOfElements = 3;
    
    // Demande au système la mémoire pour stocker 3 entiers
    int* dynamicArray = (int*)malloc(numberOfElements * sizeof(int));
    
    if (dynamicArray == NULL) {
        printf("Erreur : RAM pleine !\\n");
        return 1;
    }
    
    // Utilisation
    dynamicArray[0] = 10;
    dynamicArray[1] = 20;
    dynamicArray[2] = 30;
    
    printf("Tableau dynamique : %d, %d, %d\\n", dynamicArray[0], dynamicArray[1], dynamicArray[2]);
    
    // OBLIGATOIRE : Rendre la mémoire au système !
    free(dynamicArray);
    
    return 0;
}`,
            output: 'Tableau dynamique : 10, 20, 30',
            realWorldUseCase: 'Développement d\'algorithmes nécessitant des structures de données dont la taille n\'est connue qu\'à l\'exécution, typique des bases de données comme PostgreSQL.',
            commonErrors: '❌ Fuite de mémoire (Memory Leak). Si vous oubliez d\'appeler `free()`, la mémoire reste occupée jusqu\'à ce que l\'ordinateur s\'épuise et crashe.'
          }
        ]
      }
    ],
    resources: [
      { title: 'cppreference (C)', url: 'https://en.cppreference.com/w/c', type: 'doc' }
    ],
    algoExamples: []
  }
};

