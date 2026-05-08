export const ALGORITHMS = [
  // --- BASES ABSOLUES ---
  {
    id: "bases-algorithmique", name: "Qu'est-ce qu'un algorithme ?", category: "Bases", timeO: "O(1)", spaceO: "O(1)", difficulty: "Débutant", color: "green",
    description: "Un algorithme est souvent perçu comme un concept mathématique complexe, mais c'est en réalité extrêmement familier : c'est l'équivalent numérique d'une recette de cuisine. Imaginez que vous vouliez préparer des pâtes. Vous devez suivre une liste stricte d'instructions : 1) Faire bouillir de l'eau, 2) Verser les pâtes, 3) Patienter 10 minutes, 4) Égoutter. Si vous inversez l'ordre des étapes, le résultat sera un désastre ! En programmation, vous êtes le Chef Étoilé, l'ordinateur est votre commis de cuisine (ultra-rapide mais totalement dépourvu de bon sens), et l'algorithme est la recette ultra-précise que vous lui confiez. Mais attention, toutes les recettes ne se valent pas. La 'Complexité Temporelle' mesure le temps de cuisson si le nombre d'invités augmente. Si vous devez cuire chaque pâte individuellement, le temps explose : c'est un algorithme inefficace. L' 'Espace Mémoire', quant à lui, représente le nombre de casseroles (la mémoire RAM) dont vous avez besoin simultanément. Un algorithme élégant est une recette rapide qui ne salit pas toute votre cuisine. Mini-vérification : avant de coder, assurez-vous toujours de pouvoir expliquer votre recette à voix haute.",
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
    description: "Le Tri à Bulles (Bubble Sort) est souvent le premier algorithme enseigné. Imaginez un instituteur qui doit ranger des élèves par taille. Il commence à gauche, compare les deux premiers élèves et les inverse si le premier est plus grand. Il avance d'un pas et répète. À la fin du premier passage, le plus grand élève est forcément tout à droite (il a fait des 'bulles' jusqu'à la surface). C'est très intuitif, mais très lent car on repasse de nombreuses fois sur la file complète. Mini-vérification : Que se passe-t-il si la liste est déjà triée ?",
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
    description: "Le Tri Rapide (Quick Sort) utilise une stratégie 'Diviser pour Régner'. Imaginez que vous devez trier une pile géante de copies d'examens. Vous prenez une copie au hasard (le 'Pivot'). Vous jetez toutes les copies avec une moins bonne note à gauche, et les meilleures à droite. Félicitations, votre Pivot est maintenant exactement à sa place définitive ! Il vous suffit ensuite de demander à deux assistants de faire la même chose pour le tas de gauche et le tas de droite, jusqu'à ce que chaque tas ne contienne qu'une copie.",
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
    description: "Le Tri Fusion (Merge Sort) est l'algorithme parfait pour trier des données massives. Imaginez que vous et un ami deviez trier 1000 cartes. Vous coupez le paquet en deux (500 chacun). C'est encore trop ? Vous coupez jusqu'à ce que chacun ait 1 seule carte (un paquet de 1 carte est toujours trié !). Ensuite, vient la 'Fusion' : vous reprenez vos cartes deux par deux en les classant, puis quatre par quatre, jusqu'à reformer le paquet de 1000 cartes. C'est plus complexe, mais le temps d'exécution est garanti.",
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
      "Dans merge(), comparez le premier élément de 'left' et 'right', en extrayant le plus petit avec shift()."
    ],
    starter: {
      python: `def merge_sort(arr):\n    # TODO: Implémenter le tri fusion\n    return arr`,
      js: `function mergeSort(arr) {\n  // TODO: Implémenter le tri fusion\n  return arr;\n}`
    },
    python: `def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    return _merge(merge_sort(arr[:mid]), merge_sort(arr[mid:]))\n\ndef _merge(left, right):\n    out, i, j = [], 0, 0\n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            out.append(left[i]); i += 1\n        else:\n            out.append(right[j]); j += 1\n    out.extend(left[i:]); out.extend(right[j:])\n    return out`,
    js: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr.slice();\n  const mid = Math.floor(arr.length / 2);\n  return merge(mergeSort(arr.slice(0, mid)), mergeSort(arr.slice(mid)));\n}\nfunction merge(left, right) {\n  const out = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] <= right[j]) out.push(left[i++]);\n    else out.push(right[j++]);\n  }\n  return out.concat(left.slice(i)).concat(right.slice(j));\n}`
  },
  
  // --- RECHERCHE ---
  {
    id: "binary-search", name: "Binary Search", category: "Recherche", timeO: "O(log n)", spaceO: "O(1)", difficulty: "Débutant", color: "green",
    description: "La Recherche Dichotomique (Binary Search) est un miracle d'optimisation. Imaginez chercher le mot 'Zèbre' dans un dictionnaire. Allez-vous lire la page 1, puis la page 2 ? Non ! Vous ouvrez le livre au milieu (lettre 'M'). 'Zèbre' est après 'M', donc vous déchirez toute la première moitié du dictionnaire et vous la jetez au feu. Vous répétez cette action (ouvrir au milieu, jeter une moitié) jusqu'à trouver la page exacte. C'est fulgurant ! Mini-vérification : Quelle est la condition absolue pour que cela fonctionne ? (Les données DOIVENT être triées).",
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
    description: "Le Parcours en Largeur (BFS) est comme l'onde de choc d'une goutte d'eau. Imaginez que vous cherchez la sortie d'un labyrinthe. Au lieu de courir au hasard, vous envoyez des clones explorer *toutes* les intersections à 1 mètre de vous (Profondeur 1). Puis, depuis ces points, ils explorent tout à 2 mètres (Profondeur 2). Le premier clone qui trouve la sortie a garanti mathématiquement d'avoir pris le chemin le plus court ! Le BFS utilise une structure de File d'attente (Premier Arrivé, Premier Servi) pour organiser les clones.",
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
  
  // --- DYNAMIQUE ---
  {
    id: "fibonacci-dp", name: "Fibonacci (DP)", category: "Dynamique", timeO: "O(n)", spaceO: "O(n)", difficulty: "Débutant", color: "green",
    description: "La suite de Fibonacci (0, 1, 1, 2, 3, 5, 8...) est célèbre, mais son implémentation récursive classique est une catastrophe écologique : elle recalcule les mêmes valeurs des milliers de fois. La Programmation Dynamique vient sauver la situation grâce à la 'Mémoïsation' (Mise en cache). Imaginez que vous demandiez à un mathématicien combien font 1345 * 890. Il va calculer et vous dire 1 197 050. Si vous lui reposez la question 1 minute plus tard, il ne va pas recalculer : il s'en souvient ! La mémoïsation, c'est ça : à chaque fois qu'on calcule un résultat, on l'écrit sur un post-it (un Dictionnaire). La fois suivante, on lit juste le post-it.",
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
    description: "Le Parcours en Profondeur (DFS) privilégie l'exploration téméraire : il s'enfonce le plus loin possible le long d'un chemin avant d'être forcé de faire demi-tour. Imaginez explorer un labyrinthe géant en posant votre main sur le mur droit. Vous avancez continuellement jusqu'à frapper un cul-de-sac. À ce moment-là seulement, vous revenez sur vos pas (Backtracking) jusqu'à la dernière intersection non explorée. Le DFS s'implémente très naturellement grâce à la Récursivité (les fonctions s'appellent elles-mêmes).",
    complexityDesc: "La Complexité Temporelle O(V+E) est identique au BFS. L'Espace Mémoire O(V) correspond à la profondeur maximale de l'arbre, stockée dans la 'Pile d'appels' (Call Stack).",
    steps: [
      "Comprendre le problème : Explorer toutes les branches d'un graphe ou d'un arbre en allant toujours au plus profond en premier.",
      "Décomposer en étapes simples : 1) Visiter le nœud actuel. 2) Le marquer pour ne pas tourner en rond. 3) Lancer le DFS sur le premier voisin disponible.",
      "Traduire en code : Écrivez une fonction récursive simple qui accepte un nœud et un registre 'visited' (Set).",
      "Tester le résultat : En testant sur un graphe cyclique (A -> B -> A), vérifiez que votre code ne tombe pas dans une boucle infinie."
    ],
    hints: [
      "Utilisez un set `visited` pour ne pas boucler sur les cycles.",
      "En récursif : pour chaque voisin v de `node`, si v pas dans visited, appelez dfs(v).",
      "En itératif : utilisez une pile (push/pop) comme pour BFS mais avec une pile au lieu d'une file."
    ],
    starter: {
      python: `def dfs(graph, start):\n    # TODO: parcours en profondeur depuis start (liste d'adjacence)\n    pass`,
      js: `function dfs(graph, start) {\n  // graph: Record<string, string[]>\n  // TODO: parcours en profondeur\n}`
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
    description: "L'Algorithme de Kadane résout le problème du 'Sous-tableau à somme maximale' en un seul passage magique. Imaginez que vous analysez les gains et pertes quotidiens d'une action en bourse. Vous cherchez la période continue la plus rentable. Kadane repose sur une question existentielle à chaque nouvelle journée : \\\"Est-ce que je gagne plus en ajoutant ce jour à mon historique, ou en jetant tout mon historique pour repartir de zéro aujourd'hui ?\\\". Si votre historique précédent est devenu négatif, il est un 'poids mort' : jetez-le !",
    complexityDesc: "La Complexité Temporelle O(n) est optimale : on ne regarde chaque élément qu'une seule fois. L'Espace O(1) signifie qu'on n'utilise que deux variables (pas de tableaux).",
    steps: [
      "Comprendre le problème : Trouver la suite contiguë de nombres qui donne la plus grande somme, sans tester toutes les combinaisons possibles.",
      "Décomposer en étapes simples : 1) Garder une trace de la somme actuelle et de la somme max globale. 2) À chaque nombre, décider de continuer ou de repartir de zéro. 3) Mettre à jour le max global.",
      "Traduire en code : Utilisez `Math.max(actuel, actuel + somme_precedente)` dans une seule boucle.",
      "Tester le résultat : Testez avec uniquement des nombres négatifs `[-3, -5, -2]`. La réponse doit être -2 (le 'moins pire')."
    ],
    hints: [
      "À l'index i, soit vous ajoutez nums[i] au segment précédent, soit vous recommencez à nums[i].",
      "Formule : current = max(nums[i], current + nums[i]).",
      "Gérez le cas où tous les nombres sont négatifs : le maximum est le plus grand élément seul."
    ],
    starter: {
      python: `def max_subarray(nums):\n    # TODO: retourner la somme max d'un sous-tableau contigu\n    return 0`,
      js: `function maxSubarray(nums) {\n  // TODO: somme max sous-tableau contigu\n  return 0;\n}`
    },
    python: `def max_subarray(nums):\n    cur = best = nums[0]\n    for x in nums[1:]:\n        cur = max(x, cur + x)\n        best = max(best, cur)\n    return best`,
    js: `function maxSubarray(nums) {\n  let cur = nums[0], best = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    cur = Math.max(nums[i], cur + nums[i]);\n    best = Math.max(best, cur);\n  }\n  return best;\n}`
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
  { in: "AlgoMaster", expected: "retsamoglA" },
  { in: "a", expected: "a" },
  { in: "", expected: "" }, // Edge case: vide
  { in: "racecar", expected: "racecar" }, // Palindrome
  { in: "12345!?", expected: "?!54321" } // Caractères spéciaux
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
if(allPassed) console.log('\\n🎉 SUCCESS: Tous les tests sont validés !');
else console.log('\\n⚠️ FAILURE: Certains tests ont échoué.');
      `,
      python: `
import json, time
tests = [
    ("hello", "olleh"), ("AlgoMaster", "retsamoglA"), ("a", "a"),
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
all_passed = all(r["passed"] for r in results)
print("__TEST_RESULTS__:" + json.dumps(results))
if all_passed: print("\\n🎉 SUCCESS: Tous les tests sont validés !")
else: print("\\n⚠️ FAILURE: Certains tests ont échoué.")
      `,
      c: `
#include <string.h>
#include <stdio.h>
int main() {
    char s1[] = "hello"; reverseString(s1);
    if (strcmp(s1, "olleh") == 0) printf("__TEST_RESULTS__:[{\\"id\\":1,\\"input\\":\\"hello\\",\\"expected\\":\\"olleh\\",\\"actual\\":\\"%s\\",\\"passed\\":true}]", s1);
    else printf("__TEST_RESULTS__:[{\\"id\\":1,\\"input\\":\\"hello\\",\\"expected\\":\\"olleh\\",\\"actual\\":\\"%s\\",\\"passed\\":false}]", s1);
    return 0;
}
      `,
      cpp: `
#include <iostream>
#include <string>
int main() {
    std::string s = "hello";
    std::string res = reverseString(s);
    if (res == "olleh") std::cout << "__TEST_RESULTS__:[{\\"id\\":1,\\"input\\":\\"hello\\",\\"expected\\":\\"olleh\\",\\"actual\\":\\"" << res << "\\",\\"passed\\":true}]";
    else std::cout << "__TEST_RESULTS__:[{\\"id\\":1,\\"input\\":\\"hello\\",\\"expected\\":\\"olleh\\",\\"actual\\":\\"" << res << "\\",\\"passed\\":false}]";
    return 0;
}
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
    starter: { js: 'function twoSum(nums, target) {\n  // 💡 Indice 1 : Créez une nouvelle Map() pour stocker les nombres vus\n  // 💡 Indice 2 : Parcourez le tableau. Calculez le "complément" (target - nums[i])\n  // 💡 Indice 3 : Si le complément est dans la Map, retournez [map.get(complement), i]\n  \n}', python: 'def two_sum(nums, target):\n    # 💡 Indice : Utilisez un dictionnaire pour stocker les nombres vus\n    pass' },
    tests: {
      js: `
const largeArr = Array.from({length: 10000}, (_, i) => i);
const tests = [
  { in: "[[2,7,11,15], 9]", expected: "[0,1]", args: [[2,7,11,15], 9] },
  { in: "[[3,2,4], 6]", expected: "[1,2]", args: [[3,2,4], 6] },
  { in: "[[3,3], 6]", expected: "[0,1]", args: [[3,3], 6] },
  { in: "[[...10000 éléments], 19997]", expected: "[9998,9999]", args: [largeArr, 19997] } // Stress test
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
  if (passed && (t1 - t0) > 10) { // O(N^2) takes ~100ms+ for 10000 elements, O(N) takes <2ms
    passed = false;
    error = "O(N) Requis: Boucles imbriquées détectées (Trop lent).";
  }
  return { id: i+1, input: t.in, expected: t.expected, actual: JSON.stringify(res), passed, error };
});
const allPassed = results.every(r => r.passed);
console.log('__TEST_RESULTS__:' + JSON.stringify(results));
      `,
      python: `
import json, time
tests = [
    ([2,7,11,15], 9, [0,1]),
    ([3,2,4], 6, [1,2]),
    ([3,3], 6, [0,1]),
]
results = []
for i, (nums, target, exp) in enumerate(tests):
    passed, err, res = False, None, None
    t0 = time.time()
    try:
        res = two_sum(nums, target)
        passed = (res == exp or res == exp[::-1])
    except Exception as e:
        err = str(e)
    t1 = time.time()
    if passed and (t1 - t0) > 0.05:
        passed, err = False, "O(N) Requis: Exécution trop lente."
    results.append({"id": i+1, "input": f"nums={nums}, target={target}", "expected": str(exp), "actual": str(res) if res is not None else None, "passed": passed, "error": err})
print("__TEST_RESULTS__:" + json.dumps(results))
      `
    }
  },
  {
    id: 4, title: 'Somme d\'un tableau', level: 'Debutant', lang: 'Tous', desc: 'Calculez la somme de tous les nombres d\'un tableau.',
    starter: {
      js: 'function sumArray(arr) {\n  return 0;\n}',
      python: 'def sum_array(arr):\n    return 0',
      c: 'int sumArray(int arr[], int n) {\n    return 0;\n}',
      cpp: 'int sumArray(std::vector<int>& arr) {\n    return 0;\n}',
      csharp: 'public static int SumArray(int[] arr) {\n    return 0;\n}',
      java: 'public static int sumArray(int[] arr) {\n    return 0;\n}'
    },
    tests: {
      js: `const tests = [{in: "[1,2,3]", expected: 6, args: [[1,2,3]]}];\nconst res = sumArray([1,2,3]);\nconsole.log('__TEST_RESULTS__:[{"id":1,"input":"[1,2,3]","expected":6,"actual":' + res + ',"passed":' + (res===6) + '}]');`,
      python: `import json\nres = sum_array([1,2,3])\nprint('__TEST_RESULTS__:' + json.dumps([{"id":1,"input":"[1,2,3]","expected":6,"actual":res,"passed":res==6}]))`
    }
  }
];

export const RESOURCES = [
  { id: 1, type: 'Livre', title: 'Grokking Algorithms', author: 'Aditya Bhargava', desc: 'Excellent livre illustré pour débuter.' },
  { id: 2, type: 'Livre', title: 'Clean Code', author: 'Robert C. Martin', desc: 'La bible pour écrire du code maintenable.' },
  { id: 3, type: 'Plateforme', title: 'LeetCode', author: 'leetcode.com', desc: 'Pratique indispensable pour les entretiens.' },
  { id: 4, type: 'Chaine YT', title: 'Fireship', author: 'YouTube', desc: 'Concepts tech expliqués en 100 secondes.' }
];