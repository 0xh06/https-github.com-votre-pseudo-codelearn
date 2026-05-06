export const ALGORITHMS = [
  // --- TRI ---
  {
    id: "bubble-sort", name: "Bubble Sort", category: "Tri", timeO: "O(n²)", spaceO: "O(1)", difficulty: "Débutant", color: "green",
    description: "Algorithme de tri simple qui compare et échange les éléments adjacents répétitivement.",
    complexityDesc: "Temps O(n²) car on utilise deux boucles imbriquées. Espace O(1) car le tri se fait 'sur place' sans créer de nouveau tableau.",
    steps: ["Parcourir le tableau", "Comparer adjacents", "Échanger si désordonné", "Répéter jusqu'au tri"],
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
    java: `public static void bubbleSort(int[] arr) {\n    int n = arr.length;\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < n - i - 1; j++) {\n            if (arr[j] > arr[j + 1]) {\n                int temp = arr[j];\n                arr[j] = arr[j + 1];\n                arr[j + 1] = temp;\n            }\n        }\n    }\n}`
  },
  {
    id: "quick-sort", name: "Quick Sort", category: "Tri", timeO: "O(n log n)", spaceO: "O(log n)", difficulty: "Intermédiaire", color: "yellow",
    description: "Algorithme Diviser-pour-régner : utilise un pivot pour partitionner le tableau en deux sous-tableaux.",
    complexityDesc: "Temps O(n log n) en moyenne grâce à la division par 2 de l'espace de recherche à chaque niveau. O(n²) dans le pire des cas (déjà trié). Espace O(log n) lié à la pile d'appels récursifs.",
    steps: ["Choisir un pivot (ex: dernier élément)", "Placer les plus petits à gauche, les plus grands à droite", "Répéter récursivement sur les deux moitiés"],
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
    js: `function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[Math.floor(arr.length/2)];\n  return [...quickSort(arr.filter(x=>x<pivot)), ...arr.filter(x=>x===pivot), ...quickSort(arr.filter(x=>x>pivot))];\n}`
  },
  {
    id: "merge-sort", name: "Merge Sort", category: "Tri", timeO: "O(n log n)", spaceO: "O(n)", difficulty: "Intermédiaire", color: "yellow",
    description: "Tri stable qui divise continuellement le tableau en deux moitiés, les trie, puis les fusionne.",
    complexityDesc: "Temps O(n log n) garanti dans tous les cas. Espace O(n) car on doit créer de nouveaux tableaux pour la fusion.",
    steps: ["Diviser le tableau en deux", "Trier récursivement chaque moitié", "Fusionner les résultats triés"],
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
    description: "Recherche un élément dans un tableau trié en divisant l'intervalle de recherche par deux à chaque étape.",
    complexityDesc: "Temps O(log n) car on réduit la zone de recherche de moitié à chaque itération. Espace O(1) en utilisant deux pointeurs (left et right).",
    steps: ["Prendre l'index du milieu", "Comparer avec la cible", "Éliminer la moitié inutile", "Répéter tant que gauche <= droite"],
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
    js: `function binarySearch(arr, target) {\n  let l=0, r=arr.length-1;\n  while(l<=r){\n    let m=Math.floor((l+r)/2);\n    if(arr[m]===target) return m;\n    arr[m]<target ? l=m+1 : r=m-1;\n  }\n  return -1;\n}`
  },
  {
    id: "bfs", name: "BFS (Largeur)", category: "Graphes", timeO: "O(V+E)", spaceO: "O(V)", difficulty: "Intermédiaire", color: "yellow",
    description: "Parcours en largeur : Explore les nœuds voisins niveau par niveau en utilisant une file (Queue).",
    complexityDesc: "Temps O(V+E) où V=Sommets (Vertices) et E=Arêtes (Edges), car chaque nœud et arête est visité une fois. Espace O(V) pour la file et le set des nœuds visités.",
    steps: ["Ajouter le nœud source dans une file", "Le marquer comme visité", "Défiler, puis enfiler tous ses voisins non visités"],
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
    js: `function bfs(graph, start) {\n  const q = [start], visited = new Set([start]);\n  while(q.length){\n    const node = q.shift();\n    console.log(node);\n    (graph[node]||[]).forEach(n => {\n      if(!visited.has(n)){ visited.add(n); q.push(n); }\n    });\n  }\n}`
  },
  
  // --- DYNAMIQUE ---
  {
    id: "fibonacci-dp", name: "Fibonacci (DP)", category: "Dynamique", timeO: "O(n)", spaceO: "O(n)", difficulty: "Débutant", color: "green",
    description: "Calcul efficace de la suite de Fibonacci grâce à la mémoïsation (mise en cache des résultats).",
    complexityDesc: "Temps O(n) car chaque nombre jusqu'à n n'est calculé qu'une seule fois. Espace O(n) utilisé par l'objet de cache et la pile d'appels.",
    steps: ["Vérifier si le calcul est dans le cache", "Traiter les cas de base (n <= 1)", "Calculer, stocker dans le cache, puis retourner"],
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
    description: "Parcours en profondeur : on explore un chemin jusqu'au bout avant de revenir en arrière (pile ou récursion).",
    complexityDesc: "Comme pour le BFS, chaque sommet et arête est visité au plus une fois : O(V+E). La pile d'appels ou une pile explicite peut stocker jusqu'à O(V) sommets.",
    steps: ["Marquer le nœud courant comme visité", "Pour chaque voisin non visité, appeler DFS récursivement", "Revenir en arrière quand plus de voisins"],
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
    description: "Trouve la somme maximale d'un sous-tableau contigu en un seul passage, classique en entretien.",
    complexityDesc: "Un seul parcours : à chaque indice on décide d'étendre le segment courant ou de repartir de l'élément actuel. Temps O(n), espace O(1).",
    steps: ["Initialiser current = nums[0] et best = nums[0]", "Pour chaque élément suivant : current = max(x, current + x)", "Mettre à jour best = max(best, current)"],
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
    id: 1, title: 'Inverser une chaîne', level: 'Debutant', lang: 'Tous', desc: 'Écrivez une fonction qui inverse une chaîne de caractères. Attention: Votre algorithme doit être rapide O(N).',
    starter: { 
      js: 'function reverseString(str) {\n  // 💡 Indice 1 : Convertissez la chaîne en tableau avec split(\\'\\')\n  // 💡 Indice 2 : Utilisez la méthode interne de tableau pour l\\'inverser\n  // 💡 Indice 3 : Reformez la chaîne avec join(\\'\\')\n  \n}', 
      python: 'def reverse_string(s):\n    # 💡 Indice : En Python, on peut utiliser le slicing [::-1]\n    pass',
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