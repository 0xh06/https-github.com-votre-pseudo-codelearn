export const ALGORITHMS = [
  // --- BASES ABSOLUES ---
  {
    id: "bases-algorithmique", name: "Qu'est-ce qu'un algorithme ?", category: "Bases", timeO: "O(1)", spaceO: "O(1)", difficulty: "Débutant", color: "green",
    description: "Approchez-vous du tableau, les enfants. J'écris 'Algorithme'. Ne soyez pas effrayés par ce mot ! C'est juste une recette. Regardez, je trace une flèche : Entrée -> Traitement -> Sortie. Si je vous demande de faire des pâtes, vous suivez des étapes précises, non ? C'est ça l'algorithme. C'est la liste d'instructions ultra-précise que vous donnez à l'ordinateur, qui lui est très rapide mais n'a aucune imagination. On va apprendre à lui parler étape par étape !",
    complexityDesc: "La Complexité Temporelle O(1) signifie que le temps d'exécution reste toujours le même (constant) peu importe le nombre de fois où on répète l'action. Même si on dit bonjour 3 fois ou 1 million de fois, le temps par opération reste fixe.",
    steps: [
      "Comprendre le problème : Quel est l'objectif final ? (Ex: Préparer un repas pour 4 personnes). Identifiez vos ingrédients de départ (les données) et le résultat attendu.",
      "Décomposer en étapes simples : Listez les actions dans un ordre chronologique et strict. L'ordinateur ne devinera jamais rien par lui-même. La séquence est vitale.",
      "Traduire en code : C'est l'étape où vous transformez cette logique humaine en langage machine (JavaScript, Python) avec la bonne syntaxe.",
      "Tester le résultat : Exécutez ! Si les pâtes sont froides, c'est un 'Bug'. On lit l'erreur, on identifie l'étape défectueuse, et on ajuste l'algorithme."
    ],
    hints: [
      "Il n'y a aucun piège mathématique ! Utilisez simplement une instruction de répétition (une boucle).",
      "Une boucle permet d'exécuter la même ligne de code plusieurs fois sans avoir à l'écrire plusieurs fois.",
      "En Python, 'for i in range(3):' permet d'exécuter l'action qui suit 3 fois de suite."
    ],
    starter: {
      python: `def dire_bonjour():\n    # TODO: Afficher 'Bonjour' 3 fois\n    pass`,
      js: `function direBonjour() {\n  // TODO: Afficher 'Bonjour' 3 fois\n}`
    },
    python: `def dire_bonjour():\n    for i in range(3):\n        print("Bonjour")`,
    js: `function direBonjour() {\n  for (let i = 0; i < 3; i++) {\n    console.log("Bonjour");\n  }\n}`,
    challenges: [
      { title: 'Ma Première Boucle', desc: 'Affichez simplement "Bonjour" trois fois dans la console. Cet enchaînement d\'instructions est techniquement votre tout premier algorithme !', difficulty: 'Débutant' }
    ]
  },
  // --- TRI ---
  {
    id: "bubble-sort", name: "Bubble Sort", category: "Tri", timeO: "O(n²)", spaceO: "O(1)", difficulty: "Débutant", color: "green",
    description: "Imaginez que je demande à trois élèves de se ranger par taille. Je prends les deux premiers, je les compare, et hop ! Si le premier est plus grand, ils échangent leur place. Je continue avec le suivant. Vous voyez ce qui se passe ? Le plus grand finit par 'remonter' tout à droite comme une bulle dans un verre d'eau. C'est lent, on doit repasser plusieurs fois, mais c'est le tri le plus simple du monde à comprendre. Regardez bien mes mains quand je fais l'échange !",
    complexityDesc: "La Complexité Temporelle O(n²) signifie que si on double le nombre d'élèves, le temps de tri est multiplié par 4 (car on utilise deux boucles imbriquées).",
    steps: [
      "Comprendre le problème : Trier une liste de nombres en ordre croissant en n'utilisant que des échanges locaux.",
      "Décomposer en étapes simples : 1) Parcourir la liste. 2) Comparer les voisins. 3) Échanger si désordonnés. 4) Répéter jusqu'à tri complet.",
      "Traduire en code : Utilisez deux boucles imbriquées. La boucle externe gère le nombre de passages, l'interne compare.",
      "Tester le résultat : Testez avec [5,4,3,2]. Le 5 doit 'buller' à la fin dès le premier passage."
    ],
    hints: [
      "Pensez à utiliser deux boucles imbriquées.",
      "La boucle externe détermine le nombre de passages, l'interne compare les éléments adjacents.",
      "Si arr[j] > arr[j+1], échangez-les en utilisant une variable temporaire ou la destructuration."
    ],
    starter: {
      python: `def bubble_sort(arr):\n    # TODO: Implémenter le tri à bulles\n    return arr`,
      js: `function bubbleSort(arr) {\n  // TODO: Implémenter le tri à bulles\n  return arr;\n}`,
      c: `#include <stdio.h>\n\nvoid bubbleSort(int arr[], int n) {\n    // TODO\n}`,
      cpp: `#include <vector>\n#include <iostream>\n\nvoid bubbleSort(std::vector<int>& arr) {\n    // TODO\n}`,
      csharp: `using System;\n\npublic class Solution {\n    public static int[] BubbleSort(int[] arr) {\n        // TODO\n        return arr;\n    }\n}`,
      java: `public class Main {\n    public static void bubbleSort(int[] arr) {\n        // TODO\n    }\n}`
    },
    python: `def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr`,
    js: `function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]];\n    }\n  }\n  return arr;\n}`,
    c: `void bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                int temp = arr[j];\n                arr[j] = arr[j+1];\n                arr[j+1] = temp;\n            }\n        }\n    }\n}`,
    cpp: `void bubbleSort(std::vector<int>& arr) {\n    int n = arr.size();\n    for (int i = 0; i < n-1; i++) {\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) std::swap(arr[j], arr[j+1]);\n        }\n    }\n}`,
    csharp: `public static int[] BubbleSort(int[] arr) {\n    int n = arr.Length;\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n            }\n        }\n    }\n    return arr;\n}`,
    java: `public static void bubbleSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n            }\n        }\n    }\n}`,
    challenges: [
      { title: 'Implémentation de base', desc: 'Implémentez le Bubble Sort qui trie [64, 34, 25, 12, 22, 11, 90] dans l\'ordre croissant.', difficulty: 'Débutant' },
      { title: 'Arrêt précoce', desc: 'Optimisez votre implémentation avec un flag `swapped`. Si aucun échange n\'a eu lieu lors d\'une passe, le tableau est déjà trié !', difficulty: 'Débutant' },
      { title: 'Tri d\'objets', desc: 'Modifiez votre Bubble Sort pour trier un tableau d\'objets [{name, age}] par âge croissant.', difficulty: 'Intermédiaire' },
      { title: 'Tri décroissant', desc: 'Ajoutez un paramètre `ascending = true` à votre fonction pour supporter le tri dans les deux sens.', difficulty: 'Intermédiaire' },
    ]
  },
  {
    id: "quick-sort", name: "Quick Sort", category: "Tri", timeO: "O(n log n)", spaceO: "O(log n)", difficulty: "Intermédiaire", color: "yellow",
    description: "Le Tri Rapide, c'est comme si je vous donnais une pile de 50 feuilles mélangées. Vous choisissez une feuille au hasard, le 'pivot'. Vous séparez le reste en deux tas : les feuilles plus petites à gauche, les plus grandes à droite. Et vous répétez l'opération sur chaque tas ! C'est puissant parce qu'à chaque étape, vous placez au moins une feuille exactement là où elle doit être. C'est ça, diviser pour mieux régner !",
    complexityDesc: "La Complexité Temporelle O(n log n) indique un algorithme d'élite. En divisant la pile par deux à chaque étape (log n), on gagne un temps massif par rapport à O(n²).",
    steps: [
      "Comprendre le problème : Trier un tableau en plaçant un élément (le pivot) à sa position définitive, puis répéter sur les moitiés.",
      "Décomposer en étapes simples : 1) Choisir un pivot. 2) Filtrer les plus petits à gauche, les plus grands à droite. 3) Recommencer sur les deux tas.",
      "Traduire en code : Créez une fonction récursive qui s'appelle elle-même sur les sous-tableaux filtrés.",
      "Tester le résultat : Que se passe-t-il si le tableau est déjà trié ? (Le tri rapide devient lent si on choisit mal le pivot !)."
    ],
    hints: [
      "Si le tableau a 0 ou 1 élément, il est déjà trié.",
      "Prenez le dernier élément comme pivot. Créez des tableaux 'left' et 'right'.",
      "Combinez récursivement quickSort(left) + pivot + quickSort(right)."
    ],
    starter: {
      python: `def quick_sort(arr):\n    # TODO: Implémenter le tri rapide\n    return arr`,
      js: `function quickSort(arr) {\n  // TODO: Implémenter le tri rapide\n  return arr;\n}`
    },
    python: `def quick_sort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[len(arr) // 2]\n    return quick_sort([x for x in arr if x < pivot]) + [x for x in arr if x == pivot] + quick_sort([x for x in arr if x > pivot])`,
    js: `function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[Math.floor(arr.length/2)];\n  return [...quickSort(arr.filter(x=>x<pivot)), ...arr.filter(x=>x===pivot), ...quickSort(arr.filter(x=>x>pivot))];\n}`,
    challenges: [
      { title: 'Quick Sort basique', desc: 'Implémentez quickSort([10, 7, 8, 9, 1, 5]). Choisissez le dernier élément comme pivot.', difficulty: 'Intermédiaire' },
      { title: 'Partition in-place', desc: 'Implémentez la version in-place (sans créer de nouveaux tableaux) pour une complexité mémoire O(log n).', difficulty: 'Intermédiaire' },
      { title: 'Pire cas', desc: 'Que se passe-t-il si l\'entrée est déjà triée ? Pourquoi ? Comment y remédier avec le choix aléatoire du pivot ?', difficulty: 'Avancé' },
    ]
  },
  {
    id: "merge-sort", name: "Merge Sort", category: "Tri", timeO: "O(n log n)", spaceO: "O(n)", difficulty: "Intermédiaire", color: "yellow",
    description: "Le Tri Fusion, c'est l'algorithme parfait pour trier des données massives. Imaginez que vous et un ami deviez trier 1000 cartes. Vous coupez le paquet en deux (500 chacun). C'est encore trop ? Vous coupez jusqu'à ce que chacun ait 1 seule carte. Ensuite, vient la 'Fusion' : vous reprenez vos cartes deux par deux en les classant. C'est plus complexe, mais le temps est garanti !",
    complexityDesc: "La Complexité Temporelle O(n log n) est garantie à 100%. L'Espace Mémoire O(n) signifie par contre que vous avez besoin d'une table externe (RAM) pour poser les cartes fusionnées.",
    steps: [
      "Comprendre le problème : Trier de manière stable en divisant le problème jusqu'à sa forme la plus simple, puis en recombinant.",
      "Décomposer en étapes simples : 1) Diviser le tableau en deux. 2) Continuer jusqu'à avoir des tableaux de taille 1. 3) Fusionner les paires en triant.",
      "Traduire en code : Vous aurez besoin de deux fonctions : une pour diviser récursivement, et une pour 'fusionner' deux listes triées.",
      "Tester le résultat : Vérifiez la fonction de fusion isolément avec [1,3] et [2,4]. Elle doit retourner [1,2,3,4]."
    ],
    hints: [
      "Divisez le tableau tant que length > 1.",
      "Créez une fonction utilitaire 'merge(left, right)' qui assemble deux tableaux triés.",
      "Dans merge(), comparez le premier élément de 'left' et 'right'."
    ],
    starter: {
      python: `def merge_sort(arr):\n    # TODO: Implémenter le tri fusion\n    return arr`,
      js: `function mergeSort(arr) {\n  // TODO: Implémenter le tri fusion\n  return arr;\n}`
    },
    python: `def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    return _merge(merge_sort(arr[:mid]), merge_sort(arr[mid:]))\n\ndef _merge(left, right):\n    out, i, j = [], 0, 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            out.append(left[i]); i += 1\n        else:\n            out.append(right[j]); j += 1\n    out.extend(left[i:]); out.extend(right[j:])\n    return out`,
    js: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr.slice();\n  const mid = Math.floor(arr.length / 2);\n  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));\n}\nfunction merge(left, right) {\n  const out = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] <= right[j]) out.push(left[i++]);\n    else out.push(right[j++]);\n  }\n  return out.concat(left.slice(i)).concat(right.slice(j));\n}`
  },
  {
    id: "binary-search", name: "Binary Search", category: "Recherche", timeO: "O(log n)", spaceO: "O(1)", difficulty: "Débutant", color: "green",
    description: "Imaginez que je cherche votre nom dans un dictionnaire de 1000 pages. Je ne vais pas lire chaque page ! J'ouvre le livre pile au milieu. Si votre nom est après, je déchire toute la première moitié et je la jette. Puis je recommence avec ce qu'il me reste. En quelques gestes, je vous trouve ! C'est ça la recherche dichotomique. Mais attention, ça ne marche que si tout est bien trié au départ, sinon on est perdu !",
    complexityDesc: "La Complexité Temporelle O(log n) signifie qu'une liste de 1 milliard d'éléments ne prendra que 30 étapes (log2 de 1 milliard = 30). C'est de la téléportation.",
    steps: [
      "Comprendre le problème : Trouver la position d'un élément cible dans un tableau *déjà trié* le plus vite possible.",
      "Décomposer en étapes simples : 1) Cibler le milieu. 2) Si c'est la cible, bingo ! 3) Si cible > milieu, chercher à droite. 4) Sinon, chercher à gauche.",
      "Traduire en code : Utilisez deux pointeurs 'gauche' et 'droite' qui se rapprochent à l'aide d'une boucle 'while'.",
      "Tester le résultat : Testez avec une cible qui N'EXISTE PAS dans le tableau. Votre boucle doit se terminer et renvoyer -1 proprement."
    ],
    hints: [
      "Initialisez left = 0 et right = arr.length - 1.",
      "Utilisez une boucle while (left <= right).",
      "Calculez le milieu avec Math.floor((left + right) / 2) et ajustez left ou right selon la cible."
    ],
    starter: {
      python: `def binary_search(arr, target):\n    # TODO: Retourner l'index de target, ou -1\n    return -1`,
      js: `function binarySearch(arr, target) {\n  // TODO: Retourner l'index de target, ou -1\n  return -1;\n}`
    },
    python: `def binary_search(arr, target):\n    l, r = 0, len(arr)-1\n    while l <= r:\n        m = (l+r)//2\n        if arr[m] == target: return m\n        if arr[m] < target: l = m+1\n        else: r = m-1\n    return -1`,
    js: `function binarySearch(arr, target) {\n  let l=0, r=arr.length-1;\n  while(l<=r){\n    let m=Math.floor((l+r)/2);\n    if(arr[m]===target) return m;\n    arr[m]<target ? l=m+1 : r=m-1;\n  }\n  return -1;\n}`,
    challenges: [
      { title: 'Recherche de base', desc: 'Utilisez Binary Search pour trouver 27 dans [3, 9, 10, 27, 38, 43, 82]. Retournez l\'index.', difficulty: 'Débutant' },
      { title: 'Première occurrence', desc: 'Trouvez l\'index de la PREMIÈRE occurrence d\'un élément dans un tableau trié avec doublons.', difficulty: 'Intermédiaire' },
      { title: 'Borne inférieure', desc: 'Implémentez une fonction `lowerBound(arr, target)` qui retourne l\'index de la plus petite valeur >= target.', difficulty: 'Avancé' },
    ]
  },
  {
    id: "bfs", name: "BFS (Largeur)", category: "Graphes", timeO: "O(V+E)", spaceO: "O(V)", difficulty: "Intermédiaire", color: "yellow",
    description: "Le BFS, c'est comme une goutte d'eau qui tombe dans un lac. Regardez les ondes partir du centre : elles touchent d'abord tout ce qui est à 1 mètre, puis tout ce qui est à 2 mètres... On explore 'en largeur'. Pour faire ça proprement, on utilise une file d'attente : premier arrivé, premier servi. C'est parfait pour trouver le chemin le plus court !",
    complexityDesc: "La Complexité Temporelle O(V+E) indique qu'on visite chaque intersection (Sommet V) et chaque couloir (Arête E) une seule fois.",
    steps: [
      "Comprendre le problème : Explorer un réseau (Graphe) couche par couche pour trouver le chemin le plus court vers une destination.",
      "Décomposer en étapes simples : 1) Enfiler le départ. 2) Sortir le premier, visiter ses voisins non-visités. 3) Enfiler les voisins. 4) Répéter.",
      "Traduire en code : Utilisez un tableau simple comme une File (Queue) avec push() et shift(), et un Set() pour mémoriser les points déjà vus.",
      "Tester le résultat : Dessinez un arbre sur papier et suivez votre code manuellement. Les niveaux horizontaux doivent être imprimés dans l'ordre."
    ],
    hints: [
      "En JavaScript, un tableau simple avec push() et shift() agit comme une file.",
      "Utilisez un Set() pour stocker les nœuds visités (visited = new Set()).",
      "Bouclez tant que la file n'est pas vide."
    ],
    starter: {
      python: `def bfs(graph, start):\n    # TODO: Parcours en largeur\n    pass`,
      js: `function bfs(graph, start) {\n  // TODO: Parcours en largeur\n}`
    },
    python: `from collections import deque\ndef bfs(graph, start):\n    q, visited = deque([start]), {start}\n    while q:\n        node = q.popleft()\n        print(node)\n        for n in graph[node]:\n            if n not in visited:\n                visited.add(n)\n                q.append(n)`,
    js: `function bfs(graph, start) {\n  const q = [start], visited = new Set([start]);\n  while(q.length){\n    const node = q.shift();\n    console.log(node);\n    (graph[node]||[]).forEach(n => {\n      if(!visited.has(n)){ visited.add(n); q.push(n); }\n    });\n  }\n}`,
    challenges: [
      { title: 'Traversal simple', desc: 'Utilisez BFS pour afficher tous les n\u0153uds du graphe : {A:[B,C], B:[D], C:[D,E], D:[], E:[]}.', difficulty: 'Intermédiaire' },
      { title: 'Distance minimale', desc: 'Modifiez BFS pour retourner la distance (nombre de sauts) entre le n\u0153ud source et chaque autre n\u0153ud.', difficulty: 'Intermédiaire' },
      { title: 'Chemin le plus court', desc: 'Reconstituez le chemin exact (liste de n\u0153uds) entre la source et une cible en mémorisant les parents de chaque n\u0153ud visité.', difficulty: 'Avancé' },
    ]
  },
  {
    id: "fibonacci-dp", name: "Fibonacci (DP)", category: "Dynamique", timeO: "O(n)", spaceO: "O(n)", difficulty: "Débutant", color: "green",
    description: "La suite de Fibonacci, c'est l'histoire de la récursivité qui dérape. Si vous demandez à l'ordi 'Calcule-moi le 40ème nombre', il va refaire 1000 fois les mêmes calculs. C'est absurde ! Regardez ce que je fais : je prends un petit carnet de notes (le cache). Dès que j'ai un résultat, je l'écris dedans. Si j'ai besoin de la valeur plus tard, je regarde mon carnet au lieu de tout recalculer. On appelle ça la mémoïsation !",
    complexityDesc: "La Complexité Temporelle O(n) est une amélioration colossale par rapport au O(2^n) de base. Le temps de calcul chute de plusieurs années à quelques millisecondes.",
    steps: [
      "Comprendre le problème : Éviter les calculs redondants en stockant les résultats intermédiaires dans une mémoire cache.",
      "Décomposer en étapes simples : 1) Vérifier si le résultat est déjà dans le cache. 2) Si oui, le renvoyer. 3) Sinon, le calculer, le sauvegarder, puis le renvoyer.",
      "Traduire en code : Utilisez un objet (JavaScript) ou un dictionnaire (Python) passé en paramètre pour conserver les résultats entre les appels.",
      "Tester le résultat : Testez `fib(50)`. Sans mémoïsation, votre navigateur plantera. Avec, le résultat sera instantané."
    ],
    hints: [
      "Créez un objet/dictionnaire 'memo' en paramètre par défaut.",
      "Si n existe dans memo, retournez memo[n] immédiatement.",
      "Sinon, calculez fib(n-1) + fib(n-2), sauvegardez-le dans memo[n], et retournez-le."
    ],
    starter: {
      python: `def fib(n, memo={}):\n    # TODO: Implémenter Fibonacci optimisé\n    return n`,
      js: `const memo = {};\nfunction fib(n) {\n  // TODO: Implémenter Fibonacci optimisé\n  return n;\n}`
    },
    python: `def fib(n, memo=None):\n    if memo is None: memo = {}\n    if n in memo: return memo[n]\n    if n <= 1: return n\n    memo[n] = fib(n-1, memo) + fib(n-2, memo)\n    return memo[n]`,
    js: `const memo = {};\nfunction fib(n) {\n  if(n in memo) return memo[n];\n  if(n <= 1) return n;\n  return memo[n] = fib(n-1) + fib(n-2);\n}`
  },
  {
    id: "dfs",
    name: "DFS (Profondeur)",
    category: "Graphes",
    timeO: "O(V+E)",
    spaceO: "O(V)",
    difficulty: "Intermédiaire",
    color: "yellow",
    description: "Le DFS, c'est l'explorateur têtu. Si vous êtes dans un labyrinthe, vous choisissez un mur et vous ne le lâchez jamais, même si ça descend super profond, jusqu'à ce que vous frappiez un cul-de-sac. Là, vous revenez en arrière jusqu'à la dernière porte que vous n'avez pas ouverte. On explore 'en profondeur' d'abord. C'est super pour vérifier si deux points sont connectés !",
    complexityDesc: "La Complexité Temporelle O(V+E) est identique au BFS. L'Espace Mémoire O(V) correspond à la profondeur maximale de l'arbre.",
    steps: [
      "Comprendre le problème : Explorer toutes les branches d'un graphe ou d'un arbre en allant toujours au plus profond en premier.",
      "Décomposer en étapes simples : 1) Visiter le nœud actuel. 2) Le marquer pour ne pas tourner en rond. 3) Lancer le DFS sur le premier voisin disponible.",
      "Traduire en code : Écrivez une fonction récursive simple qui accepte un nœud et un registre 'visited' (Set).",
      "Tester le résultat : En testant sur un graphe cyclique (A -> B -> A), vérifiez que votre code ne tombe pas dans une boucle infinie."
    ],
    hints: [
      "Utilisez un set `visited` pour ne pas boucler sur les cycles.",
      "En récursif : pour chaque voisin v de `node`, si v pas dans visited, appelez dfs(v)."
    ],
    starter: {
      python: `def dfs(graph, start):\n    # TODO: parcours en profondeur\n    pass`,
      js: `function dfs(graph, start) {\n  // TODO: parcours en profondeur\n}`
    },
    python: `def dfs(graph, start):\n    seen, out = set(), []\n    def visit(u):\n        if u in seen: return\n        seen.add(u)\n        out.append(u)\n        for v in graph.get(u, []):\n            visit(v)\n    visit(start)\n    return out`,
    js: `function dfs(graph, start) {\n  const seen = new Set();\n  const out = [];\n  function visit(u) {\n    if (seen.has(u)) return;\n    seen.add(u);\n    out.push(u);\n    for (const v of graph[u] || []) visit(v);\n  }\n  visit(start);\n  return out;\n}`
  },
  {
    id: "kadane",
    name: "Kadane (sous-tableau max)",
    category: "Dynamique",
    timeO: "O(n)",
    spaceO: "O(1)",
    difficulty: "Intermédiaire",
    color: "yellow",
    description: "Kadane, c'est l'algorithme du trader optimiste. Imaginez que vous regardez vos gains et pertes chaque jour. À chaque nouvelle journée, vous vous posez une question : 'Est-ce que je gagne plus en gardant tout mon historique d'avant, ou est-ce que mon historique est tellement pourri que je ferais mieux de tout jeter et de repartir de zéro aujourd'hui ?'. Si votre passé est négatif, c'est un boulet : jetez-le ! C'est comme ça qu'on trouve la période la plus rentable en un seul passage.",
    complexityDesc: "La Complexité Temporelle O(n) est optimale : on ne regarde chaque élément qu'une seule fois.",
    steps: [
      "Comprendre le problème : Trouver la suite contiguë de nombres qui donne la plus grande somme.",
      "Décomposer en étapes simples : 1) Garder une trace de la somme actuelle et de la somme max. 2) Décider de continuer ou de repartir de zéro.",
      "Traduire en code : Utilisez `Math.max(actuel, actuel + somme_precedente)`."
    ],
    hints: [
      "À l'index i, soit vous ajoutez nums[i] au segment précédent, soit vous recommencez à nums[i].",
      "Gérez le cas où tous les nombres sont négatifs."
    ],
    starter: {
      python: `def max_subarray(nums):\n    # TODO\n    return 0`,
      js: `function maxSubarray(nums) {\n  // TODO\n  return 0;\n}`
    },
    python: `def max_subarray(nums):\n    cur = best = nums[0]\n    for x in nums[1:]:\n        cur = max(x, cur + x)\n        best = max(best, cur)\n    return best`,
    js: `function maxSubarray(nums) {\n  let cur = nums[0], best = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    cur = Math.max(nums[i], cur + nums[i]);\n    best = Math.max(best, cur);\n  }\n  return best;\n}`
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    category: "Tri",
    timeO: "O(n²)",
    spaceO: "O(1)",
    difficulty: "Débutant",
    color: "green",
    description: "C'est exactement ce que vous faites quand je vous donne une main de cartes. Vous prenez la première carte, puis la deuxième. Si la deuxième est plus petite, vous la glissez avant la première. Puis vous prenez la troisième et vous cherchez sa place parmi les deux premières déjà triées. Vous 'insérez' chaque nouvelle carte là où elle doit être.",
    complexityDesc: "En moyenne O(n²), mais O(n) si le tableau est déjà trié !",
    steps: [
      "Parcourir le tableau de gauche à droite.",
      "Comparer l'élément actuel avec ses prédécesseurs et le décaler.",
      "Répéter pour tous les éléments."
    ],
    hints: ["Utilisez une boucle while pour décaler les éléments."],
    starter: {
      python: `def insertion_sort(arr):\n    # TODO\n    return arr`,
      js: `function insertionSort(arr) {\n  // TODO\n  return arr;\n}`
    },
    python: `def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and key < arr[j]:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr`,
    js: `function insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    let key = arr[i];\n    let j = i - 1;\n    while (j >= 0 && arr[j] > key) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = key;\n  }\n  return arr;\n}`
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    category: "Tri",
    timeO: "O(n²)",
    spaceO: "O(1)",
    difficulty: "Débutant",
    color: "green",
    description: "Le Tri par Sélection, c'est le tri du 'chercheur de trésor'. Vous parcourez toute la liste pour trouver la plus petite valeur. Une fois trouvée, vous l'échangez avec la toute première place. Puis vous recommencez avec le reste de la liste pour trouver la deuxième plus petite.",
    complexityDesc: "Toujours O(n²), même si la liste est déjà triée.",
    steps: [
      "Trouver le minimum dans la partie non triée.",
      "L'échanger avec le premier élément.",
      "Avancer la frontière."
    ],
    hints: ["Utilisez une variable min_idx."],
    starter: {
      python: `def selection_sort(arr):\n    # TODO\n    return arr`,
      js: `function selectionSort(arr) {\n  // TODO\n  return arr;\n}`
    },
    python: `def selection_sort(arr):\n    for i in range(len(arr)):\n        min_idx = i\n        for j in range(i+1, len(arr)):\n            if arr[min_idx] > arr[j]: min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]\n    return arr`,
    js: `function selectionSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    let min = i;\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[j] < arr[min]) min = j;\n    }\n    if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];\n  }\n  return arr;\n}`
  },
  {
    id: "dijkstra",
    name: "Dijkstra",
    category: "Graphes",
    timeO: "O(E log V)",
    spaceO: "O(V)",
    difficulty: "Avancé",
    color: "purple",
    description: "Dijkstra, c'est le cerveau de votre GPS. J'écris 'Départ' au tableau. Pour chaque ville voisine, je note la distance. Je choisis toujours la ville la plus proche que je n'ai pas encore visitée. Une fois là-bas, je regarde si je peux trouver un chemin encore plus court.",
    complexityDesc: "L'utilisation d'une file de priorité permet d'atteindre O(E log V).",
    steps: [
      "Initialiser les distances à l'infini, départ à 0.",
      "Utiliser une file de priorité pour explorer le nœud le plus proche.",
      "Mettre à jour les voisins si un chemin plus court est trouvé."
    ],
    hints: ["Utilisez un dictionnaire de distances.", "Relâchez les arêtes."],
    starter: {
      python: `import heapq\ndef dijkstra(graph, start):\n    pass`,
      js: `function dijkstra(graph, start) {\n}`
    },
    python: `import heapq\ndef dijkstra(graph, start):\n    distances = {node: float('inf') for node in graph}\n    distances[start] = 0\n    pq = [(0, start)]\n    while pq:\n        dist, u = heapq.heappop(pq)\n        if dist > distances[u]: continue\n        for v, weight in graph[u].items():\n            if distances[u] + weight < distances[v]:\n                distances[v] = distances[u] + weight\n                heapq.heappush(pq, (distances[v], v))\n    return distances`,
    js: `function dijkstra(graph, start) {\n  const dists = {};\n  for (let node in graph) dists[node] = Infinity;\n  dists[start] = 0;\n  const visited = new Set();\n  while (true) {\n    let u = null;\n    for (let node in dists) {\n      if (!visited.has(node) && (u === null || dists[node] < dists[u])) u = node;\n    }\n    if (u === null || dists[u] === Infinity) break;\n    visited.add(u);\n    for (let v in graph[u]) {\n      let alt = dists[u] + graph[u][v];\n      if (alt < dists[v]) dists[v] = alt;\n    }\n  }\n  return dists;\n}`
  },
  {
    id: "sliding-window",
    name: "Sliding Window",
    category: "Tableaux",
    timeO: "O(n)",
    spaceO: "O(1)",
    difficulty: "Intermédiaire",
    color: "blue",
    description: "Imaginez que vous prenez une photo de groupe, mais votre appareil ne peut cadrer que 3 personnes à la fois. Pour photographier tout le monde, vous 'glissez' votre appareil vers la droite, une personne à la fois. Au lieu de recalculer qui est dans le cadre à chaque fois, vous remarquez juste qu'une personne sort à gauche et une nouvelle entre à droite. C'est ça la Fenêtre Glissante : optimiser les calculs sur des sous-ensembles contigus !",
    complexityDesc: "La Complexité Temporelle O(n) est magique car au lieu d'avoir deux boucles imbriquées (O(n²)) pour vérifier tous les sous-tableaux, on ne fait qu'un seul passage de gauche à droite.",
    steps: [
      "Initialiser deux pointeurs (début et fin de la fenêtre) et une variable pour l'état actuel.",
      "Étendre la fenêtre en déplaçant le pointeur de fin (ajouter le nouvel élément).",
      "Si la condition n'est plus respectée, rétrécir la fenêtre depuis la gauche jusqu'à la valider.",
      "Mémoriser le meilleur résultat trouvé à chaque étape."
    ],
    hints: [
      "Utilisez une boucle for pour le pointeur droit.",
      "Utilisez une boucle while à l'intérieur pour avancer le pointeur gauche quand la contrainte est violée.",
      "Cette technique est idéale pour les problèmes du type 'plus longue sous-chaîne' ou 'sous-tableau de taille k'."
    ],
    starter: {
      python: `def max_sum_subarray(arr, k):\n    # TODO: Trouver la somme maximale d'un sous-tableau de taille k\n    pass`,
      js: `function maxSumSubarray(arr, k) {\n  // TODO: Trouver la somme maximale d'un sous-tableau de taille k\n}`
    },
    python: `def max_sum_subarray(arr, k):\n    if len(arr) < k: return 0\n    window_sum = sum(arr[:k])\n    max_sum = window_sum\n    for i in range(k, len(arr)):\n        window_sum += arr[i] - arr[i-k]\n        max_sum = max(max_sum, window_sum)\n    return max_sum`,
    js: `function maxSumSubarray(arr, k) {\n  if(arr.length < k) return 0;\n  let windowSum = 0;\n  for(let i = 0; i < k; i++) windowSum += arr[i];\n  let maxSum = windowSum;\n  for(let i = k; i < arr.length; i++) {\n    windowSum += arr[i] - arr[i-k];\n    maxSum = Math.max(maxSum, windowSum);\n  }\n  return maxSum;\n}`
  }
];

export const EXERCISES = [
  {
    id: 1, title: 'Inverser une chaîne', level: 'Debutant', lang: 'Tous', desc: 'Écrivez une fonction qui inverse une chaîne de caractères. Attention: Votre algorithme doit être rapide O(N).',
    starter: { 
      js: "function reverseString(str) {\n  // 💡 Indice 1 : Convertissez la chaîne en tableau avec split('')\n  // 💡 Indice 2 : Utilisez la méthode interne de tableau pour l'inverser\n  // 💡 Indice 3 : Reformez la chaîne avec join('')\n  \n}", 
      python: "def reverse_string(s):\n    # 💡 Indice : En Python, on peut utiliser le slicing [::-1]\n    pass",
      c: '#include <string.h>\n#include <stdio.h>\n\nvoid reverseString(char* s) {\n    // TODO: Inverser la chaîne en place\n}',
      cpp: '#include <string>\n#include <algorithm>\n\nstd::string reverseString(std::string s) {\n    // TODO: Retourner la chaîne inversée\n    return s;\n}',
      csharp: 'using System;\n\npublic class Solution {\n    public static string ReverseString(string s) {\n        // TODO\n        return s;\n    }\n}',
      java: 'public class Solution {\n    public static String reverseString(String s) {\n        // TODO\n        return s;\n    }\n}'
    },
    tests: {
      js: `
// --- Tests Injections ---
const tests = [
  { in: "hello", expected: "olleh" },
  { in: "CodeLearn", expected: "retsamoglA" },
  { in: "a", expected: "a" },
  { in: "", expected: "" },
  { in: "racecar", expected: "racecar" },
  { in: "12345!?", expected: "?!54321" }
];
let results = tests.map((t, i) => {
  let res, passed = false, error = null;
  const t0 = performance.now();
  try {
    res = reverseString(t.in);
    passed = (res === t.expected);
  } catch(e) {
    error = e.message;
  }
  const t1 = performance.now();
  if (passed && (t1 - t0) > 20) {
    passed = false;
    error = "O(N) Requis: Exécution trop lente (>20ms).";
  }
  return { id: i+1, input: t.in, expected: t.expected, actual: res, passed, error };
});
const allPassed = results.every(r => r.passed);
console.log('__TEST_RESULTS__:' + JSON.stringify(results));
      `,
      python: `
import json, time
tests = [
    ("hello", "olleh"), ("CodeLearn", "retsamoglA"), ("a", "a"),
    ("", ""), ("racecar", "racecar"), ("12345!?", "?!54321")
]
results = []
for i, (inp, exp) in enumerate(tests):
    passed, err, res = False, None, None
    t0 = time.time()
    try:
        res = reverse_string(inp)
        passed = (res == exp)
    except Exception as e:
        err = str(e)
    t1 = time.time()
    if passed and (t1 - t0) > 0.02:
        passed, err = False, "O(N) Requis: Exécution trop lente (>20ms)."
    results.append({"id": i+1, "input": f'"{inp}"', "expected": f'"{exp}"', "actual": f'"{res}"' if res is not None else None, "passed": passed, "error": err})
print("__TEST_RESULTS__:" + json.dumps(results))
      `
    }
  },
  { 
    id: 2, title: 'FizzBuzz', level: 'Debutant', lang: 'Tous', desc: 'Retournez un tableau de 1 à n. Fizz si multiple de 3, Buzz si multiple de 5, FizzBuzz si les deux.',
    starter: { js: 'function fizzBuzz(n) {\n  // Retournez le tableau\n  \n}', python: 'def fizz_buzz(n):\n    # Retournez la liste\n    pass' },
    tests: {
      js: `
const tests = [ { in: 5, expected: "[1,2,\\"Fizz\\",4,\\"Buzz\\"]" } ];
const res = fizzBuzz(5);
if(JSON.stringify(res) === tests[0].expected) console.log('✅ Test 1 passé\\n🎉 SUCCESS: Tous les tests sont validés !');
else console.log('❌ Échec. Reçu : ' + JSON.stringify(res));
      `,
      python: `print("Test désactivé en Python pour démo rapide")`
    }
  },
  { 
    id: 3, title: 'Deux Sommes (Two Sum)', level: 'Intermediaire', lang: 'Tous', desc: 'Trouvez les indices de deux nombres d\'un tableau dont la somme vaut une cible. Votre algorithme DOIT utiliser une Map pour une complexité O(N).',
    starter: { js: 'function twoSum(nums, target) {\n  // 💡 Indice : Utilisez une Map()\n  \n}', python: 'def two_sum(nums, target):\n    # 💡 Indice : Utilisez un dictionnaire\n    pass' },
    tests: {
      js: `
const largeArr = Array.from({length: 10000}, (_, i) => i);
const tests = [
  { in: "[[2,7,11,15], 9]", expected: "[0,1]", args: [[2,7,11,15], 9] },
  { in: "[[3,2,4], 6]", expected: "[1,2]", args: [[3,2,4], 6] },
  { in: "[[3,3], 6]", expected: "[0,1]", args: [[3,3], 6] },
  { in: "[[...10000 éléments], 19997]", expected: "[9998,9999]", args: [largeArr, 19997] }
];
let results = tests.map((t, i) => {
  let res, passed = false, error = null;
  const t0 = performance.now();
  try {
    res = twoSum(...t.args);
    const resStr = JSON.stringify(res);
    passed = (resStr === t.expected || resStr === JSON.stringify(JSON.parse(t.expected).reverse()));
  } catch(e) {
    error = e.message;
  }
  const t1 = performance.now();
  if (passed && (t1 - t0) > 10) {
    passed = false;
    error = "O(N) Requis: Boucles imbriquées détectées.";
  }
  return { id: i+1, input: t.in, expected: t.expected, actual: JSON.stringify(res), passed, error };
});
console.log('__TEST_RESULTS__:' + JSON.stringify(results));
      `,
      python: `print("Test désactivé en Python")`
    }
  },
  {
    id: 4, title: 'Somme d\'un tableau', level: 'Debutant', lang: 'Tous', desc: 'Calculez la somme de tous les nombres d\'un tableau.',
    starter: {
      js: 'function sumArray(arr) {\n  return 0;\n}',
      python: 'def sum_array(arr):\n    return 0'
    },
    tests: {
      js: `const tests = [{in: "[1,2,3]", expected: 6, args: [[1,2,3]]}];\nconst res = sumArray([1,2,3]);\nconsole.log('__TEST_RESULTS__:[{"id":1,"input":"[1,2,3]","expected":6,"actual":' + res + ',"passed":' + (res===6) + '}]');`,
      python: `import json\nres = sum_array([1,2,3])\nprint('__TEST_RESULTS__:' + json.dumps([{"id":1,"input":"[1,2,3]","expected":6,"actual":res,"passed":res==6}]))`
    }
  },
  {
    id: 5, title: 'Palindrome', level: 'Debutant', lang: 'Tous', desc: 'Vérifiez si une chaîne est un palindrome.',
    starter: { js: 'function isPalindrome(str) {\n  // TODO\n}', python: 'def is_palindrome(s):\n    # TODO\n    pass' },
    tests: {
      js: `const res1 = isPalindrome("radar"), res2 = isPalindrome("hello");\nconsole.log('__TEST_RESULTS__:[{"id":1,"input":"radar","expected":true,"actual":'+res1+',"passed":'+(res1===true)+'},{"id":2,"input":"hello","expected":false,"actual":'+res2+',"passed":'+(res2===false)+'}]');`
    }
  },
  {
    id: 6, title: 'Anagramme', level: 'Intermediaire', lang: 'Tous', desc: 'Vérifiez si deux chaînes sont des anagrammes.',
    starter: { js: 'function isAnagram(s1, s2) {\n  // TODO\n}', python: 'def is_anagram(s1, s2):\n    # TODO\n    pass' },
    tests: {
      js: `const res = isAnagram("listen", "silent");\nconsole.log('__TEST_RESULTS__:[{"id":1,"input":"listen, silent","expected":true,"actual":'+res+',"passed":'+(res===true)+'}]');`
    }
  },
  {
    id: 7, title: 'Parenthèses Valides', level: 'Intermediaire', lang: 'Tous', desc: 'Vérifiez si une chaîne contenant (), [], {} est bien parenthésée.',
    starter: { js: 'function isValid(s) {\n  // TODO\n}', python: 'def is_valid(s):\n    # TODO\n    pass' },
    tests: {
      js: `const res = isValid("()[]{}");\nconsole.log('__TEST_RESULTS__:[{"id":1,"input":"()[]{}","expected":true,"actual":'+res+',"passed":'+(res===true)+'}]');`
    }
  },
  {
    id: 8, title: 'Sliding Window (Max Sum)', level: 'Avancé', lang: 'Tous', desc: 'Trouvez la somme maximale d\'un sous-tableau de taille k. Vous devez utiliser une Fenêtre Glissante pour atteindre O(N).',
    starter: { 
      js: 'function maxSumSubarray(arr, k) {\n  // 💡 Indice: Calculez la somme des k premiers éléments.\n  // 💡 Ensuite, glissez la fenêtre en ajoutant arr[i] et retirant arr[i-k].\n  \n}', 
      python: 'def max_sum_subarray(arr, k):\n    # TODO\n    pass' 
    },
    tests: {
      js: `
const tests = [
  { in: "([2,1,5,1,3,2], 3)", expected: "9", args: [[2,1,5,1,3,2], 3] },
  { in: "([2,3,4,1,5], 2)", expected: "7", args: [[2,3,4,1,5], 2] },
  { in: "([1], 2)", expected: "0", args: [[1], 2] }
];
let results = tests.map((t, i) => {
  let res, passed = false;
  try {
    res = maxSumSubarray(...t.args);
    passed = (res.toString() === t.expected);
  } catch(e) {}
  return { id: i+1, input: t.in, expected: t.expected, actual: res, passed };
});
console.log('__TEST_RESULTS__:' + JSON.stringify(results));
      `,
      python: `print("Test désactivé")`
    }
  }
];

export const RESOURCES = [
  { id: 1, type: 'Livre', title: 'Grokking Algorithms', author: 'Aditya Bhargava', desc: 'Excellent livre illustré pour débuter.' },
  { id: 2, type: 'Livre', title: 'Clean Code', author: 'Robert C. Martin', desc: 'La bible pour écrire du code maintenable.' },
  { id: 3, type: 'Plateforme', title: 'LeetCode', author: 'leetcode.com', desc: 'Pratique indispensable pour les entretiens.' },
  { id: 4, type: 'Chaine YT', title: 'Fireship', author: 'YouTube', desc: 'Concepts tech expliqués en 100 secondes.' }
];