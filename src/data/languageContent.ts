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
    lessons: {
      title: string;
      explanation: string;
      code: string;
      output?: string;
    }[];
  }[];
  resources: { title: string; url: string; type: 'doc' | 'video' | 'practice' }[];
  algoExamples: { name: string; id: string }[];
}

export const LANGUAGE_COURSES: Record<string, LangCourse> = {
  js: {
    id: 'js', name: 'JavaScript', icon: '🟨', color: '#f59e0b',
    tagline: 'Le langage du Web',
    desc: 'Incontournable pour le développement front-end. Avec Node.js, il couvre aussi le back-end.',
    difficulty: 2, popularity: 95, perf: 60,
    typing: 'Dynamique', paradigm: 'Multi-paradigme', compiled: 'Interprété', level: 'Débutant',
    sections: [
      {
        title: 'Variables & Types', icon: '📦',
        lessons: [
          {
            title: 'Déclarer des variables',
            explanation: 'En JavaScript, on utilise `let` pour les variables modifiables, `const` pour les constantes, et `var` (ancien, éviter). Le typage est dynamique : une variable peut changer de type.',
            code: `let age = 25;          // nombre entier
const name = "Alice"; // chaîne constante
let price = 19.99;    // nombre décimal
let isActive = true;  // booléen

console.log(typeof age);    // "number"
console.log(typeof name);   // "string"`,
            output: 'number\nstring'
          },
          {
            title: 'Tableaux et Objets',
            explanation: 'Les tableaux stockent des listes ordonnées. Les objets stockent des paires clé-valeur. Ce sont les structures fondamentales en JS.',
            code: `const arr = [3, 1, 4, 1, 5, 9];
console.log(arr[0]);        // 3
console.log(arr.length);    // 6

const user = { name: "Bob", age: 30 };
console.log(user.name);     // "Bob"
console.log(user["age"]);   // 30`,
            output: '3\n6\nBob\n30'
          }
        ]
      },
      {
        title: 'Fonctions', icon: '⚙️',
        lessons: [
          {
            title: 'Fonctions classiques et arrow functions',
            explanation: 'JS propose plusieurs syntaxes. Les arrow functions sont plus concises et courantes dans le code moderne.',
            code: `// Fonction classique
function add(a, b) {
  return a + b;
}

// Arrow function
const multiply = (a, b) => a * b;

// Avec paramètres par défaut
const greet = (name = "World") => \`Hello, \${name}!\`;

console.log(add(3, 4));       // 7
console.log(multiply(3, 4));  // 12
console.log(greet("Alice"));  // Hello, Alice!`,
            output: '7\n12\nHello, Alice!'
          },
          {
            title: 'Récursivité',
            explanation: 'Une fonction récursive s\'appelle elle-même. Essentielle pour comprendre de nombreux algorithmes comme QuickSort ou DFS.',
            code: `function factorial(n) {
  if (n <= 1) return 1;        // cas de base
  return n * factorial(n - 1); // appel récursif
}

console.log(factorial(5)); // 120
console.log(factorial(0)); // 1`,
            output: '120\n1'
          }
        ]
      },
      {
        title: 'Boucles & Conditions', icon: '🔁',
        lessons: [
          {
            title: 'for, while, for...of',
            explanation: 'Les boucles permettent de répéter des opérations. `for...of` est idéal pour parcourir des tableaux.',
            code: `const arr = [10, 20, 30, 40];

// Boucle classique
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// For...of (moderne)
for (const val of arr) {
  process.stdout.write(val + " ");
}`,
            output: '10\n20\n30\n40\n10 20 30 40'
          }
        ]
      },
      {
        title: 'Algorithmes Clés', icon: '🧠',
        lessons: [
          {
            title: 'Bubble Sort en JavaScript',
            explanation: 'Implémentation du tri à bulles. Compare des éléments adjacents et échange s\'ils sont dans le mauvais ordre.',
            code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

console.log(bubbleSort([64, 34, 25, 12, 22]));`,
            output: '[12, 22, 25, 34, 64]'
          },
          {
            title: 'Binary Search en JavaScript',
            explanation: 'Recherche dichotomique sur tableau trié. Complexité O(log n).',
            code: `function binarySearch(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (arr[mid] === target) return mid;
    arr[mid] < target ? l = mid + 1 : r = mid - 1;
  }
  return -1;
}

const sorted = [2, 5, 8, 12, 16, 23, 38, 56];
console.log(binarySearch(sorted, 23)); // 5
console.log(binarySearch(sorted, 10)); // -1`,
            output: '5\n-1'
          }
        ]
      }
    ],
    resources: [
      { title: 'MDN JavaScript', url: 'https://developer.mozilla.org/fr/docs/Web/JavaScript', type: 'doc' },
      { title: 'javascript.info', url: 'https://javascript.info', type: 'doc' },
      { title: 'Exercices JS sur AlgoMaster', url: '/exercises', type: 'practice' }
    ],
    algoExamples: [
      { name: 'Bubble Sort', id: 'bubble-sort' },
      { name: 'Quick Sort', id: 'quick-sort' },
      { name: 'Binary Search', id: 'binary-search' }
    ]
  },

  python: {
    id: 'python', name: 'Python', icon: '🐍', color: '#3b82f6',
    tagline: 'La puissance de la simplicité',
    desc: 'Syntaxe proche de l\'anglais, roi de l\'IA et de la Data Science.',
    difficulty: 1, popularity: 90, perf: 45,
    typing: 'Dynamique', paradigm: 'Multi-paradigme', compiled: 'Interprété', level: 'Débutant',
    sections: [
      {
        title: 'Variables & Types', icon: '📦',
        lessons: [
          {
            title: 'Déclarer des variables',
            explanation: 'Python n\'a pas de mot-clé de déclaration. Le type est inféré automatiquement. Indentation obligatoire à la place des accolades.',
            code: `age = 25
name = "Alice"
price = 19.99
is_active = True

print(type(age))    # <class 'int'>
print(type(name))   # <class 'str'>`,
            output: "<class 'int'>\n<class 'str'>"
          },
          {
            title: 'Listes et Dictionnaires',
            explanation: 'Les listes Python sont dynamiques. Les dictionnaires (dict) sont équivalents aux objets JS.',
            code: `arr = [3, 1, 4, 1, 5, 9]
print(arr[0])       # 3
print(len(arr))     # 6

user = {"name": "Bob", "age": 30}
print(user["name"]) # Bob`,
            output: '3\n6\nBob'
          }
        ]
      },
      {
        title: 'Fonctions', icon: '⚙️',
        lessons: [
          {
            title: 'def et lambda',
            explanation: 'Python utilise `def` pour les fonctions et `lambda` pour les fonctions anonymes courtes.',
            code: `def add(a, b):
    return a + b

multiply = lambda a, b: a * b

def greet(name="World"):
    return f"Hello, {name}!"

print(add(3, 4))      # 7
print(multiply(3, 4)) # 12
print(greet("Alice")) # Hello, Alice!`,
            output: '7\n12\nHello, Alice!'
          },
          {
            title: 'Récursivité',
            explanation: 'Python supporte pleinement la récursivité. Limite par défaut : 1000 appels (modifiable).',
            code: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120
print(factorial(0))  # 1`,
            output: '120\n1'
          }
        ]
      },
      {
        title: 'Boucles & Conditions', icon: '🔁',
        lessons: [
          {
            title: 'for, while, list comprehension',
            explanation: 'La list comprehension est unique à Python : elle permet de créer des listes en une ligne.',
            code: `arr = [10, 20, 30, 40]

for val in arr:
    print(val)

# List comprehension
doubles = [x * 2 for x in arr]
print(doubles)`,
            output: '10\n20\n30\n40\n[20, 40, 60, 80]'
          }
        ]
      },
      {
        title: 'Algorithmes Clés', icon: '🧠',
        lessons: [
          {
            title: 'Bubble Sort en Python',
            explanation: 'Python permet des échanges élégants en une ligne grâce au tuple unpacking.',
            code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

print(bubble_sort([64, 34, 25, 12, 22]))`,
            output: '[12, 22, 25, 34, 64]'
          },
          {
            title: 'Binary Search en Python',
            explanation: 'Utilise la division entière `//` pour calculer le milieu.',
            code: `def binary_search(arr, target):
    l, r = 0, len(arr) - 1
    while l <= r:
        mid = (l + r) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            l = mid + 1
        else:
            r = mid - 1
    return -1

sorted_arr = [2, 5, 8, 12, 16, 23, 38, 56]
print(binary_search(sorted_arr, 23))  # 5
print(binary_search(sorted_arr, 10))  # -1`,
            output: '5\n-1'
          }
        ]
      }
    ],
    resources: [
      { title: 'Docs Python Officielle', url: 'https://docs.python.org/fr/3/', type: 'doc' },
      { title: 'Real Python', url: 'https://realpython.com', type: 'doc' },
      { title: 'Exercices Python sur AlgoMaster', url: '/exercises', type: 'practice' }
    ],
    algoExamples: [
      { name: 'Bubble Sort', id: 'bubble-sort' },
      { name: 'Quick Sort', id: 'quick-sort' },
      { name: 'Binary Search', id: 'binary-search' }
    ]
  },

  java: {
    id: 'java', name: 'Java', icon: '☕', color: '#ef4444',
    tagline: 'Écrire une fois, exécuter partout',
    desc: 'Langage orienté objet robuste, pilier des grandes entreprises et du développement Android.',
    difficulty: 3, popularity: 75, perf: 80,
    typing: 'Statique fort', paradigm: 'Orienté Objet', compiled: 'Compilé (JVM)', level: 'Intermédiaire',
    sections: [
      {
        title: 'Variables & Types', icon: '📦',
        lessons: [
          {
            title: 'Types primitifs et déclaration',
            explanation: 'Java est statiquement typé : chaque variable doit avoir un type déclaré. Les types primitifs (int, double, boolean) sont différents des objets (String, Integer).',
            code: `int age = 25;
String name = "Alice";
double price = 19.99;
boolean isActive = true;

System.out.println(age);      // 25
System.out.println(name);     // Alice
System.out.println(isActive); // true`,
            output: '25\nAlice\ntrue'
          },
          {
            title: 'Tableaux',
            explanation: 'Les tableaux Java ont une taille fixe à la déclaration. Pour des tableaux dynamiques, utiliser ArrayList.',
            code: `int[] arr = {3, 1, 4, 1, 5, 9};
System.out.println(arr[0]);      // 3
System.out.println(arr.length);  // 6

// ArrayList dynamique
import java.util.ArrayList;
ArrayList<Integer> list = new ArrayList<>();
list.add(10); list.add(20);
System.out.println(list.get(0)); // 10`,
            output: '3\n6\n10'
          }
        ]
      },
      {
        title: 'Méthodes', icon: '⚙️',
        lessons: [
          {
            title: 'Définir et appeler des méthodes',
            explanation: 'En Java, tout est dans une classe. Les méthodes statiques peuvent être appelées sans instance.',
            code: `public class Main {
    static int add(int a, int b) {
        return a + b;
    }

    static String greet(String name) {
        return "Hello, " + name + "!";
    }

    public static void main(String[] args) {
        System.out.println(add(3, 4));     // 7
        System.out.println(greet("Alice")); // Hello, Alice!
    }
}`,
            output: '7\nHello, Alice!'
          }
        ]
      },
      {
        title: 'Algorithmes Clés', icon: '🧠',
        lessons: [
          {
            title: 'Bubble Sort en Java',
            explanation: 'Java nécessite un swap explicite via une variable temporaire (pas de destructuring comme JS/Python).',
            code: `public static int[] bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}`,
            output: '[12, 22, 25, 34, 64]'
          },
          {
            title: 'Binary Search en Java',
            explanation: 'Utilise la division entière. Attention à l\'overflow : préférer `l + (r - l) / 2` à `(l + r) / 2`.',
            code: `public static int binarySearch(int[] arr, int target) {
    int l = 0, r = arr.length - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2; // évite l'overflow
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`,
            output: '5\n-1'
          }
        ]
      }
    ],
    resources: [
      { title: 'Oracle Java Docs', url: 'https://docs.oracle.com/javase/', type: 'doc' },
      { title: 'Baeldung Java', url: 'https://www.baeldung.com', type: 'doc' },
      { title: 'Exercices Java sur AlgoMaster', url: '/exercises', type: 'practice' }
    ],
    algoExamples: [
      { name: 'Bubble Sort', id: 'bubble-sort' },
      { name: 'Binary Search', id: 'binary-search' }
    ]
  },

  cpp: {
    id: 'cpp', name: 'C++', icon: '⚡', color: '#8b5cf6',
    tagline: 'Performance brute et contrôle absolu',
    desc: 'Le choix ultime quand chaque nanoseconde compte. Offre un contrôle total sur le matériel.',
    difficulty: 5, popularity: 65, perf: 100,
    typing: 'Statique fort', paradigm: 'Multi-paradigme', compiled: 'Compilé natif', level: 'Avancé',
    sections: [
      {
        title: 'Variables & Types', icon: '📦',
        lessons: [
          {
            title: 'Types et déclarations',
            explanation: 'C++ est statiquement typé avec des types fondamentaux précis. `auto` permet l\'inférence de type (C++11+).',
            code: `#include <iostream>
#include <string>
using namespace std;

int age = 25;
string name = "Alice";
double price = 19.99;
bool isActive = true;
auto inferred = 42; // int déduit

cout << age << endl;    // 25
cout << name << endl;   // Alice`,
            output: '25\nAlice'
          },
          {
            title: 'Tableaux et vectors',
            explanation: '`vector` est l\'équivalent C++ des tableaux dynamiques. Préférer vector aux tableaux C bruts.',
            code: `#include <vector>
#include <iostream>
using namespace std;

vector<int> arr = {3, 1, 4, 1, 5, 9};
cout << arr[0] << endl;      // 3
cout << arr.size() << endl;  // 6

arr.push_back(2);            // ajoute en fin
cout << arr.size() << endl;  // 7`,
            output: '3\n6\n7'
          }
        ]
      },
      {
        title: 'Fonctions', icon: '⚙️',
        lessons: [
          {
            title: 'Fonctions et surcharge',
            explanation: 'C++ supporte la surcharge de fonctions (même nom, types différents) et les templates.',
            code: `#include <iostream>
using namespace std;

int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }

int main() {
    cout << add(3, 4) << endl;      // 7
    cout << add(3.5, 4.2) << endl;  // 7.7
    return 0;
}`,
            output: '7\n7.7'
          }
        ]
      },
      {
        title: 'Algorithmes Clés', icon: '🧠',
        lessons: [
          {
            title: 'Bubble Sort en C++',
            explanation: 'Passage par référence (`&`) pour modifier le tableau en place sans copier.',
            code: `#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
            output: '[12, 22, 25, 34, 64]'
          },
          {
            title: 'Binary Search en C++',
            explanation: 'La STL propose `std::binary_search` et `std::lower_bound`. Voici l\'implémentation manuelle.',
            code: `int binarySearch(vector<int>& arr, int target) {
    int l = 0, r = arr.size() - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`,
            output: '5\n-1'
          }
        ]
      }
    ],
    resources: [
      { title: 'cppreference.com', url: 'https://en.cppreference.com', type: 'doc' },
      { title: 'LearnCpp.com', url: 'https://www.learncpp.com', type: 'doc' },
      { title: 'Exercices C++ sur AlgoMaster', url: '/exercises', type: 'practice' }
    ],
    algoExamples: [
      { name: 'Bubble Sort', id: 'bubble-sort' },
      { name: 'Binary Search', id: 'binary-search' }
    ]
  },

  csharp: {
    id: 'csharp', name: 'C#', icon: '💜', color: '#a855f7',
    tagline: 'Le Java moderne de Microsoft',
    desc: 'Langage élégant de Microsoft, idéal pour Unity, les apps Windows et Azure.',
    difficulty: 3, popularity: 68, perf: 82,
    typing: 'Statique fort', paradigm: 'Orienté Objet', compiled: 'Compilé (CLR)', level: 'Intermédiaire',
    sections: [
      {
        title: 'Variables & Types', icon: '📦',
        lessons: [
          {
            title: 'Déclaration et var',
            explanation: 'C# est statiquement typé mais `var` permet l\'inférence de type. Similaire à Java mais avec plus de sucre syntaxique.',
            code: `int age = 25;
string name = "Alice";
var inferred = 3.14;  // double inféré
bool active = true;

Console.WriteLine(age);    // 25
Console.WriteLine(name);   // Alice
Console.WriteLine(inferred.GetType()); // Double`,
            output: '25\nAlice\nDouble'
          }
        ]
      },
      {
        title: 'Algorithmes Clés', icon: '🧠',
        lessons: [
          {
            title: 'Bubble Sort en C#',
            explanation: 'C# a la syntaxe la plus proche de Java. On passe le tableau par référence implicitement.',
            code: `public static void BubbleSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
            output: '[12, 22, 25, 34, 64]'
          },
          {
            title: 'Binary Search en C#',
            explanation: 'La BCL propose `Array.BinarySearch()`. Voici l\'implémentation manuelle.',
            code: `public static int BinarySearch(int[] arr, int target) {
    int l = 0, r = arr.Length - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`,
            output: '5\n-1'
          }
        ]
      }
    ],
    resources: [
      { title: 'Microsoft C# Docs', url: 'https://docs.microsoft.com/fr-fr/dotnet/csharp/', type: 'doc' },
      { title: 'Exercices C# sur AlgoMaster', url: '/exercises', type: 'practice' }
    ],
    algoExamples: [
      { name: 'Bubble Sort', id: 'bubble-sort' },
      { name: 'Binary Search', id: 'binary-search' }
    ]
  },

  c: {
    id: 'c', name: 'C', icon: '🔧', color: '#06b6d4',
    tagline: 'Le fondement de l\'informatique moderne',
    desc: 'Le langage le plus influent. Comprendre C, c\'est comprendre comment fonctionne un ordinateur.',
    difficulty: 4, popularity: 55, perf: 98,
    typing: 'Statique', paradigm: 'Procédural', compiled: 'Compilé natif', level: 'Avancé',
    sections: [
      {
        title: 'Variables & Types', icon: '📦',
        lessons: [
          {
            title: 'Types de base',
            explanation: 'En C, tout doit être déclaré avec son type. Pas de chaînes natives : on utilise des tableaux de `char`.',
            code: `#include <stdio.h>

int age = 25;
float price = 19.99f;
char name[] = "Alice";
int isActive = 1; // pas de bool natif en C89

printf("%d\\n", age);    // 25
printf("%s\\n", name);   // Alice`,
            output: '25\nAlice'
          }
        ]
      },
      {
        title: 'Algorithmes Clés', icon: '🧠',
        lessons: [
          {
            title: 'Bubble Sort en C',
            explanation: 'C passe les tableaux par pointeur. `n` doit être passé séparément car C n\'a pas de `.length`.',
            code: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
            output: '[12, 22, 25, 34, 64]'
          },
          {
            title: 'Binary Search en C',
            explanation: 'La stdlib C propose `bsearch()`. Implémentation manuelle avec pointeurs.',
            code: `int binarySearch(int arr[], int n, int target) {
    int l = 0, r = n - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`,
            output: '5\n-1'
          }
        ]
      }
    ],
    resources: [
      { title: 'The C Programming Language (K&R)', url: 'https://en.wikipedia.org/wiki/The_C_Programming_Language', type: 'doc' },
      { title: 'cppreference — C', url: 'https://en.cppreference.com/w/c', type: 'doc' },
      { title: 'Exercices C sur AlgoMaster', url: '/exercises', type: 'practice' }
    ],
    algoExamples: [
      { name: 'Bubble Sort', id: 'bubble-sort' },
      { name: 'Binary Search', id: 'binary-search' }
    ]
  }
};
