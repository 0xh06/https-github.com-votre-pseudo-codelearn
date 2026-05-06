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
        title: 'Fondamentaux', icon: '🌱', level: 'Débutant',
        lessons: [
          {
            title: 'Variables & Types de données',
            explanation: 'En programmation, une variable est comme une "boîte" dans laquelle on range une information (un nombre, du texte, etc.) pour la réutiliser plus tard.\n\nEn JavaScript, on utilise :\n- `let` pour une boîte dont le contenu peut changer (ex: le score d\'un joueur).\n- `const` pour une boîte scellée dont le contenu ne changera jamais (ex: la date de naissance).\n- `var` (ancien, à éviter car il a des problèmes de "fuite" hors des blocs de code).\n\nJavaScript est un langage à "typage dynamique" : vous n\'avez pas besoin de dire si la boîte contient un nombre ou du texte, le langage le devine tout seul et peut même changer d\'avis en cours de route.',
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
            explanation: 'Les conditions permettent à votre code de prendre des décisions. C\'est l\'équivalent d\'un "Si... Alors... Sinon...".\n\nJavaScript évalue une expression entre parenthèses `()`. Si elle est "vraie" (true), il exécute le premier bloc de code entre accolades `{}`. Sinon, il peut exécuter un bloc `else`.',
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
            explanation: 'Un tableau (Array) est une liste ordonnée d\'éléments. C\'est comme un casier numéroté : le premier tiroir porte le numéro 0, le deuxième le numéro 1, etc. (on appelle ça l\'index).\n\nPour lire tous les éléments d\'un tableau un par un, on utilise une boucle. La boucle `for...of` est la plus moderne et lisible en JavaScript pour parcourir des listes.',
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
            explanation: 'Si les tableaux sont des listes numérotées, les Objets (Objects) sont des listes nommées (paires "clé: valeur"). C\'est la façon principale de modéliser des données complexes en JavaScript.\n\nLa "destructuration" est une technique élégante pour extraire rapidement des variables à partir des clés d\'un objet.',
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
            explanation: 'JavaScript est "single-threaded", ce qui veut dire qu\'il ne peut faire qu\'une chose à la fois. Si vous demandez des données à un serveur distant, le programme "bloquerait" en l\'attendant.\n\nPour éviter cela, JS utilise le modèle Asynchrone. Vous lancez une requête, elle renvoie une "Promise" (Promesse de résultat futur), et le code continue. Quand la donnée arrive, le code la traite. La syntaxe `async / await` rend ce processus aussi lisible que du code synchrone classique.',
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
            explanation: 'Une fonction d\'ordre supérieur est une fonction qui prend une autre fonction en paramètre. C\'est le cœur de la programmation fonctionnelle en JavaScript.\n\nAu lieu d\'utiliser des boucles `for` fastidieuses, on utilise `.map()` pour transformer un tableau, `.filter()` pour le trier, et `.reduce()` pour le combiner.',
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
          }
        ]
      }
    ],
    resources: [
      { title: 'MDN Web Docs (La bible absolue)', url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript', type: 'doc' },
      { title: 'JavaScript.info (Cours détaillé complet)', url: 'https://javascript.info', type: 'doc' },
      { title: 'Exercices Pratiques JS sur AlgoMaster', url: '/exercises', type: 'practice' }
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
        title: 'Fondamentaux', icon: '🌱', level: 'Débutant',
        lessons: [
          {
            title: 'Variables et l\'Indentation',
            explanation: 'Contrairement à Java ou C++ qui utilisent des accolades `{}` pour grouper du code, Python utilise... les espaces (l\'indentation) ! Cela force les développeurs Python à écrire du code visuellement structuré.\n\nIl n\'y a pas de mot clé (`let`, `var`) pour déclarer une variable. On donne juste un nom et une valeur.',
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
            explanation: 'Les deux structures reines en Python. Les Listes (`[]`) stockent des éléments dans l\'ordre. Les Dictionnaires (`{}`) stockent des paires Clé-Valeur, parfaits pour l\'organisation de données.',
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
            explanation: 'Les boucles `for` en Python sont des boucles `for-each` par défaut. Elles itèrent directement sur les éléments, pas sur des nombres.\n\nLa fonctionnalité la plus appréciée de Python est la "List Comprehension" : créer et filtrer une liste en une seule phrase très lisible, qui s\'apparente à de l\'anglais mathématique.',
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
            explanation: 'Les fonctions structurent le code. Python permet une flexibilité immense grâce aux paramètres nommés, et aux opérateurs stellaires `*args` (arguments multiples) et `**kwargs` (arguments nommés multiples).',
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
            explanation: 'Imaginez que vous deviez traiter un fichier de 50 Go. Si vous chargez tout dans une liste (en mémoire RAM), votre ordinateur crashe.\n\nLes Générateurs (`yield`) résolvent cela : au lieu de calculer toutes les valeurs d\'un coup, la fonction génère les valeurs **une par une**, à la volée. Elle met son exécution en pause et se souvient de son état jusqu\'à ce qu\'on lui demande la valeur suivante.',
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
          }
        ]
      }
    ],
    resources: [
      { title: 'Documentation Officielle', url: 'https://docs.python.org/fr/3/tutorial/index.html', type: 'doc' },
      { title: 'RealPython (Superbes articles et visualisations)', url: 'https://realpython.com', type: 'doc' },
      { title: 'Pratique Algorithmique AlgoMaster', url: '/algorithms', type: 'practice' }
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
        title: 'Le Paradigme Objet', icon: '🏛️', level: 'Intermédiaire',
        lessons: [
          {
            title: 'Classes, Objets et Typage strict',
            explanation: 'En Java, **tout** doit appartenir à une Classe. Une classe est le plan de construction (le blueprint), et un objet est l\'instance (la maison construite). \n\nContrairement à JS/Python, Java exige de définir le "type" exact de chaque variable (int, String, double) dès la déclaration. Le compilateur refuse de lancer l\'application si un type est incorrect, ce qui élimine des milliers de bugs avant même l\'exécution.',
            code: `// 1. Définition du "Plan de construction" (Classe)
class Car {
    // Attributs typés
    String brand;
    int speed;

    // Constructeur
    public Car(String brand) {
        this.brand = brand;
        this.speed = 0;
    }

    // Méthode
    public void accelerate(int amount) {
        this.speed += amount;
        System.out.println(brand + " roule à " + speed + " km/h");
    }
}

// 2. Point d'entrée obligatoire en Java
public class Main {
    public static void main(String[] args) {
        // Instanciation de l'objet
        Car myCar = new Car("Tesla");
        myCar.accelerate(50);
        
        // Erreur interceptée par Java :
        // myCar.speed = "Très vite"; // TYPE ERROR !
    }
}`,
            output: 'Tesla roule à 50 km/h',
            realWorldUseCase: 'Les systèmes bancaires (JPMorgan, etc.) utilisent Java car le typage strict garantit qu\'une variable contenant le "Solde Bancaire" (double) ne sera jamais accidentellement transformée en texte ("1500") par un développeur inattentif, ce qui pourrait causer des erreurs de calcul dramatiques.',
            commonErrors: '❌ Oublier le Point-Virgule `;`. En Python c\'est optionnel, en Java chaque instruction DOIT se terminer par `;` sinon la compilation échoue.\n\n❌ `NullPointerException` (Le fléau de Java). Essayer d\'appeler une méthode sur un objet qui n\'a pas été initialisé (`Car myCar = null; myCar.accelerate(10);`).'
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
        title: 'Mémoire & Performance', icon: '🧠', level: 'Expert',
        lessons: [
          {
            title: 'Pointeurs et Gestion Mémoire',
            explanation: 'En Python/Java, un "Garbage Collector" (éboueur) nettoie automatiquement la mémoire quand vous n\'utilisez plus une variable. En C++, c\'est **vous** le patron.\n\nVous utilisez des "Pointeurs" (`*`), qui stockent directement l\'adresse physique (hexadécimale) d\'une variable dans la puce de RAM de l\'ordinateur. Cela offre des performances imbattables (0 délai), mais une petite erreur peut faire planter le système d\'exploitation tout entier (Segfault).',
            code: `#include <iostream>
using namespace std;

int main() {
    int score = 100;
    
    // ptr stocke L'ADRESSE MÉMOIRE de score (symbole &)
    int* ptr = &score;
    
    cout << "Valeur du score : " << score << endl;
    cout << "Adresse en RAM  : " << ptr << endl;
    
    // Modification directe via l'adresse RAM (déréférencement avec *)
    *ptr = 999;
    
    cout << "Nouveau score   : " << score << endl;
    
    return 0;
}`,
            output: 'Valeur du score : 100\nAdresse en RAM  : 0x7ffee6b5a8ac\nNouveau score   : 999',
            realWorldUseCase: 'Les Moteurs de Jeux Vidéo (Unreal Engine). Quand vous affichez 10 000 particules à l\'écran à 60 images par seconde, le Garbage Collector de Java créerait des micro-saccades (stutters). En C++, la gestion de la mémoire est prédictible et immédiate.',
            commonErrors: '❌ `Segmentation Fault` (Segfault). Le cauchemar du développeur C++. Survient si vous essayez de lire/écrire via un pointeur qui pointe vers une zone mémoire qui ne vous appartient pas (ex: un pointeur non initialisé ou libéré).'
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
        title: 'Modernité', icon: '✨', level: 'Intermédiaire',
        lessons: [
          {
            title: 'LINQ : La data élégante',
            explanation: 'C# possède une fonctionnalité unique appelée LINQ (Language Integrated Query). Cela permet d\'interroger des listes en C# exactement avec la même syntaxe fluide que si vous interrogiez une base de données SQL.',
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
            realWorldUseCase: 'Le développement de Back-ends complexes avec le framework .NET Core. LINQ permet aux développeurs de filtrer des tables de données massives sans écrire de requêtes SQL textuelles.',
            commonErrors: '❌ Exécution différée : Les requêtes LINQ ne sont évaluées que lors de la boucle `foreach` ou via un `.ToList()`. Muter la liste d\'origine entre la déclaration de la requête et son exécution produira des bugs.'
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
        title: 'Bas Niveau', icon: '⚙️', level: 'Expert',
        lessons: [
          {
            title: 'L\'absence de "vrais" Tableaux et Chaines',
            explanation: 'C ne vous cache rien. Par exemple, le concept de "Texte" (String) n\'existe pas nativement en C. Le texte est juste un tableau (Array) de caractères individuels (char) stockés de manière contiguë en mémoire, terminé par un caractère nul `\\0`.',
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
            realWorldUseCase: 'L\'écriture des noyaux de Systèmes d\'exploitation (Linux, Windows) ou de logiciels pour des micro-contrôleurs (voitures, fusées) où il y a très peu de RAM (quelques Kilo-Octets) et où l\'on doit contrôler exactement la taille de chaque variable octet par octet.',
            commonErrors: '❌ Buffer Overflow (Dépassement de tampon). En C, si vous copiez un mot de 10 lettres dans un tableau `char` de 5 lettres (`strcpy`), le C ne vous arrête pas ! Il va écraser la mémoire RAM voisine (où se trouvaient peut-être les mots de passe de l\'utilisateur). C\'est la faille de sécurité n°1 historique en informatique.'
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
