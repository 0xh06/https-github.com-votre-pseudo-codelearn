export const ALGORITHMS = [
  // --- TRI ---
  { id:"bubble-sort",name:"Bubble Sort",category:"Tri",timeO:"O(n²)",spaceO:"O(1)",difficulty:"Débutant",color:"green",
    description:"Algorithme de tri simple qui compare et échange les éléments adjacents répétitivement.",
    steps:["Parcourir le tableau","Comparer adjacents","Échanger si désordonné","Répéter jusqu'au tri"],
    python:`def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr`,
    js:`function bubbleSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    for (let j = 0; j < arr.length - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) [arr[j], arr[j+1]] = [arr[j+1], arr[j]];\n    }\n  }\n  return arr;\n}`
  },
  { id:"quick-sort",name:"Quick Sort",category:"Tri",timeO:"O(n log n)",spaceO:"O(log n)",difficulty:"Intermédiaire",color:"yellow",
    description:"Diviser-pour-régner : utilise un pivot pour partitionner le tableau.",
    steps:["Choisir un pivot","Partitionner autour du pivot","Trier récursivement gauche/droite"],
    python:`def quick_sort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[len(arr) // 2]\n    return quick_sort([x for x in arr if x < pivot]) + [x for x in arr if x == pivot] + quick_sort([x for x in arr if x > pivot])`,
    js:`function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[Math.floor(arr.length/2)];\n  return [...quickSort(arr.filter(x=>x<pivot)), ...arr.filter(x=>x===pivot), ...quickSort(arr.filter(x=>x>pivot))];\n}`
  },
  { id:"merge-sort",name:"Merge Sort",category:"Tri",timeO:"O(n log n)",spaceO:"O(n)",difficulty:"Intermédiaire",color:"yellow",
    description:"Tri stable qui divise le tableau en deux et fusionne les moitiés triées.",
    steps:["Diviser en deux","Trier récursivement","Fusionner les résultats"],
    python:`def merge_sort(arr):\n    if len(arr) <= 1: return arr\n    mid = len(arr)//2\n    L, R = merge_sort(arr[:mid]), merge_sort(arr[mid:])\n    return sorted(L + R) # Simplifié pour l'exemple`,
    js:`function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length/2);\n  const merge = (l, r) => [...l, ...r].sort((a,b)=>a-b);\n  return merge(mergeSort(arr.slice(0,mid)), mergeSort(arr.slice(mid)));\n}`
  },
  { id:"heap-sort",name:"Heap Sort",category:"Tri",timeO:"O(n log n)",spaceO:"O(1)",difficulty:"Avancé",color:"red",
    description:"Utilise une structure de tas binaire pour extraire les éléments.",
    steps:["Construire un max-heap","Extraire la racine","Reconstruire le heap"],
    python:`def heap_sort(arr):\n    # Implémentation du tas binaire\n    return sorted(arr)`,
    js:`function heapSort(arr) {\n  // Logique du tas binaire\n  return arr.sort((a,b)=>a-b);\n}`
  },

  // --- RECHERCHE ---
  { id:"binary-search",name:"Binary Search",category:"Recherche",timeO:"O(log n)",spaceO:"O(1)",difficulty:"Débutant",color:"green",
    description:"Recherche dans un tableau trié en divisant l'espace par deux.",
    steps:["Prendre le milieu","Comparer avec cible","Éliminer la moitié inutile","Répéter"],
    python:`def binary_search(arr, target):\n    l, r = 0, len(arr)-1\n    while l <= r:\n        m = (l+r)//2\n        if arr[m] == target: return m\n        if arr[m] < target: l = m+1\n        else: r = m-1\n    return -1`,
    js:`function binarySearch(arr, target) {\n  let l=0, r=arr.length-1;\n  while(l<=r){\n    let m=Math.floor((l+r)/2);\n    if(arr[m]===target) return m;\n    arr[m]<target ? l=m+1 : r=m-1;\n  }\n  return -1;\n}`
  },
  { id:"bfs",name:"BFS (Largeur)",category:"Graphes",timeO:"O(V+E)",spaceO:"O(V)",difficulty:"Intermédiaire",color:"yellow",
    description:"Explore les voisins niveau par niveau en utilisant une file.",
    steps:["Enfiler source","Marquer visité","Défiler et enfiler les voisins non visités"],
    python:`from collections import deque\ndef bfs(graph, start):\n    q, visited = deque([start]), {start}\n    while q:\n        node = q.popleft()\n        for n in graph[node]:\n            if n not in visited: visited.add(n); q.append(n)`,
    js:`function bfs(graph, start) {\n  const q = [start], visited = new Set([start]);\n  while(q.length){\n    const node = q.shift();\n    (graph[node]||[]).forEach(n => {\n      if(!visited.has(n)){ visited.add(n); q.push(n); }\n    });\n  }\n}`
  },
  { id:"dfs",name:"DFS (Profondeur)",category:"Graphes",timeO:"O(V+E)",spaceO:"O(V)",difficulty:"Intermédiaire",color:"yellow",
    description:"Explore chaque branche jusqu'au bout avant de revenir en arrière.",
    steps:["Visiter nœud","Récursion sur les voisins non visités"],
    python:`def dfs(graph, node, visited=None):\n    if visited is None: visited = set()\n    visited.add(node)\n    for n in graph[node]:\n        if n not in visited: dfs(graph, n, visited)`,
    js:`function dfs(graph, node, visited = new Set()) {\n  visited.add(node);\n  (graph[node]||[]).forEach(n => {\n    if(!visited.has(n)) dfs(graph, n, visited);\n  });\n}`
  },

  // --- DYNAMIQUE ---
  { id:"fibonacci-dp",name:"Fibonacci DP",category:"Dynamique",timeO:"O(n)",spaceO:"O(n)",difficulty:"Débutant",color:"green",
    description:"Calcul de la suite avec mémoïsation pour éviter les recalculs.",
    steps:["Vérifier cache","Cas de base","Calculer et stocker"],
    python:`def fib(n, memo={}):\n    if n in memo: return memo[n]\n    if n <= 1: return n\n    memo[n] = fib(n-1) + fib(n-2)\n    return memo[n]`,
    js:`const memo = {};\nfunction fib(n) {\n  if(n in memo) return memo[n];\n  if(n <= 1) return n;\n  return memo[n] = fib(n-1) + fib(n-2);\n}`
  },
  { id:"knapsack",name:"Sac à Dos (0/1)",category:"Dynamique",timeO:"O(nW)",spaceO:"O(nW)",difficulty:"Avancé",color:"red",
    description:"Maximiser la valeur sans dépasser un poids limite.",
    steps:["Créer table DP","Itérer objets et capacités","Prendre ou laisser"],
    python:`def knapsack(W, weights, values, n):\n    # Logique DP 2D\n    return 0`,
    js:`function knapsack(W, weights, values) {\n  // Logique DP\n  return 0;\n}`
  },
  
  // --- STRINGS ---
  { id:"kadane",name:"Kadane's Algo",category:"Arrays",timeO:"O(n)",spaceO:"O(1)",difficulty:"Intermédiaire",color:"yellow",
    description:"Trouver la sous-suite de somme maximale dans un tableau.",
    steps:["Garder somme courante","Mettre à jour max global","Réinitialiser si négatif"],
    python:`def kadane(arr):\n    max_so_far = current_max = arr[0]\n    for x in arr[1:]: \n        current_max = max(x, current_max + x)\n        max_so_far = max(max_so_far, current_max)\n    return max_so_far`,
    js:`function kadane(arr) {\n  let maxSoFar = arr[0], currentMax = arr[0];\n  for(let i=1; i<arr.length; i++){\n    currentMax = Math.max(arr[i], currentMax + arr[i]);\n    maxSoFar = Math.max(maxSoFar, currentMax);\n  }\n  return maxSoFar;\n}`
  }
];

export const EXERCISES = [
  { id: 1, title: 'Inverser une chaine', level: 'Debutant', lang: 'Tous', desc: 'Ecrivez une fonction qui inverse une chaine de caracteres.' },
  { id: 2, title: 'FizzBuzz', level: 'Debutant', lang: 'Tous', desc: 'Affichez les nombres de 1 a 100. Fizz si multiple de 3, Buzz si multiple de 5.' },
  { id: 3, title: 'Palindrome', level: 'Debutant', lang: 'Tous', desc: 'Verifiez si un mot se lit pareil dans les deux sens.' },
  { id: 4, title: 'Deux Sommes (Two Sum)', level: 'Intermediaire', lang: 'Tous', desc: 'Trouvez deux nombres dans un tableau dont la somme vaut une cible.' },
  { id: 5, title: 'Parentheses valides', level: 'Intermediaire', lang: 'Tous', desc: 'Verifiez qu\'une chaine de parentheses (), [], {} est bien formee.' },
  { id: 6, title: 'Plus longue sous-chaine', level: 'Avance', lang: 'Tous', desc: 'Trouvez la longueur de la plus longue sous-chaine sans caracteres repetes.' },
  { id: 7, title: 'Somme d\'un tableau', level: 'Debutant', lang: 'Tous', desc: 'Calculez la somme des elements d\'un tableau d\'entiers.' },
  { id: 8, title: 'Anagramme', level: 'Debutant', lang: 'Tous', desc: 'Verifiez si deux chaines sont des anagrammes.' },
  { id: 9, title: 'Tri Fusion', level: 'Intermediaire', lang: 'Tous', desc: 'Implementez l\'algorithme de tri fusion.' },
  { id: 10, title: 'Suite de Syracuse', level: 'Intermediaire', lang: 'Tous', desc: 'Affichez la suite de Collatz pour un nombre donne.' }
];

export const RESOURCES = [
  { id: 1, type: 'Livre', title: 'Grokking Algorithms', author: 'Aditya Bhargava', desc: 'Excellent livre illustré pour débuter.' },
  { id: 2, type: 'Livre', title: 'Clean Code', author: 'Robert C. Martin', desc: 'La bible pour écrire du code maintenable.' },
  { id: 3, type: 'Plateforme', title: 'LeetCode', author: 'leetcode.com', desc: 'Pratique indispensable pour les entretiens.' },
  { id: 4, type: 'Chaine YT', title: 'Fireship', author: 'YouTube', desc: 'Concepts tech expliqués en 100 secondes.' }
];