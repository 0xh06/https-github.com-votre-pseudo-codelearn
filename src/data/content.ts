export const ALGORITHMS = [
  { id:"bubble-sort",name:"Bubble Sort",category:"Tri",timeO:"O(n²)",spaceO:"O(1)",difficulty:"Débutant",color:"green",
    description:"Algorithme de tri simple qui compare et échange les éléments adjacents répétitivement jusqu'à ce que le tableau soit trié.",
    steps:["Comparer chaque paire d'éléments adjacents","Échanger s'ils sont dans le mauvais ordre","Répéter pour chaque passe","Continuer jusqu'à aucun échange nécessaire"],
    python:`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr`,
    js:`function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1])
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
    }
  }
  return arr;
}`,
    pseudocode:`POUR i DE 0 À n-1\n  POUR j DE 0 À n-i-2\n    SI arr[j] > arr[j+1]\n      ECHANGER arr[j] et arr[j+1]`
  },
  { id:"quick-sort",name:"Quick Sort",category:"Tri",timeO:"O(n log n)",spaceO:"O(log n)",difficulty:"Intermédiaire",color:"yellow",
    description:"Algorithme de tri diviser-pour-régner qui choisit un pivot et partitionne le tableau autour de lui.",
    steps:["Choisir un élément pivot","Partitionner : éléments < pivot à gauche, > pivot à droite","Récursion sur chaque sous-tableau","Combiner les résultats"],
    python:`def quick_sort(arr):
    if len(arr) <= 1: return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    mid  = [x for x in arr if x == pivot]
    right= [x for x in arr if x > pivot]
    return quick_sort(left) + mid + quick_sort(right)`,
    js:`function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  return [...quickSort(arr.filter(x=>x<pivot)), ...arr.filter(x=>x===pivot), ...quickSort(arr.filter(x=>x>pivot))];
}`,
    pseudocode:`SI taille<=1: retourner arr\npivot = arr[milieu]\ngauche = éléments < pivot\ndroite = éléments > pivot\nretourner TRIER(gauche)+pivot+TRIER(droite)`
  },
  { id:"merge-sort",name:"Merge Sort",category:"Tri",timeO:"O(n log n)",spaceO:"O(n)",difficulty:"Intermédiaire",color:"yellow",
    description:"Algorithme de tri stable diviser-pour-régner qui divise récursivement le tableau puis fusionne les sous-tableaux triés.",
    steps:["Diviser le tableau en deux moitiés","Récursion sur chaque moitié","Fusionner les deux moitiés triées","Répéter jusqu'à un seul élément"],
    python:`def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left, right = merge_sort(arr[:mid]), merge_sort(arr[mid:])
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]: result.append(left[i]); i+=1
        else: result.append(right[j]); j+=1
    return result + left[i:] + right[j:]`,
    js:`function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length/2);
  const merge = (l,r) => {
    const res=[]; let i=0,j=0;
    while(i<l.length&&j<r.length) res.push(l[i]<=r[j]?l[i++]:r[j++]);
    return [...res,...l.slice(i),...r.slice(j)];
  };
  return merge(mergeSort(arr.slice(0,mid)),mergeSort(arr.slice(mid)));
}`,
    pseudocode:`SI taille<=1: retourner\nDIVISER en gauche et droite\nTRIER(gauche), TRIER(droite)\nFUSIONNER gauche et droite`
  },
  { id:"heap-sort",name:"Heap Sort",category:"Tri",timeO:"O(n log n)",spaceO:"O(1)",difficulty:"Avancé",color:"red",
    description:"Algorithme de tri utilisant une structure de tas binaire pour extraire les éléments en ordre.",
    steps:["Construire un max-heap depuis le tableau","Extraire le maximum (racine)","Placer à la fin du tableau","Reconstruire le heap et répéter"],
    python:`def heap_sort(arr):
    n = len(arr)
    for i in range(n//2-1, -1, -1): heapify(arr, n, i)
    for i in range(n-1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    return arr

def heapify(arr, n, i):
    largest = i; l, r = 2*i+1, 2*i+2
    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)`,
    js:`function heapSort(arr) {
  const n = arr.length;
  const heapify = (n,i) => {
    let max=i,l=2*i+1,r=2*i+2;
    if(l<n&&arr[l]>arr[max])max=l;
    if(r<n&&arr[r]>arr[max])max=r;
    if(max!==i){[arr[i],arr[max]]=[arr[max],arr[i]];heapify(n,max);}
  };
  for(let i=Math.floor(n/2)-1;i>=0;i--)heapify(n,i);
  for(let i=n-1;i>0;i--){[arr[0],arr[i]]=[arr[i],arr[0]];heapify(i,0);}
  return arr;
}`,
    pseudocode:`CONSTRUIRE max-heap\nPOUR i=n-1 À 1\n  ECHANGER arr[0] et arr[i]\n  HEAPIFIER(arr, i, 0)`
  },
  { id:"binary-search",name:"Binary Search",category:"Recherche",timeO:"O(log n)",spaceO:"O(1)",difficulty:"Débutant",color:"green",
    description:"Recherche efficace dans un tableau trié en divisant l'espace de recherche par deux à chaque étape.",
    steps:["Vérifier l'élément du milieu","Si trouvé : retourner l'index","Si cible < milieu : chercher à gauche","Si cible > milieu : chercher à droite"],
    python:`def binary_search(arr, target):
    left, right = 0, len(arr)-1
    while left <= right:
        mid = (left+right)//2
        if arr[mid] == target: return mid
        elif arr[mid] < target: left = mid+1
        else: right = mid-1
    return -1`,
    js:`function binarySearch(arr, target) {
  let l=0, r=arr.length-1;
  while(l<=r){
    const m=Math.floor((l+r)/2);
    if(arr[m]===target)return m;
    arr[m]<target?l=m+1:r=m-1;
  }
  return -1;
}`,
    pseudocode:`gauche=0, droite=n-1\nTANT QUE gauche<=droite\n  mid=(gauche+droite)/2\n  SI arr[mid]==cible: retourner mid\n  SINON SI arr[mid]<cible: gauche=mid+1\n  SINON: droite=mid-1`
  },
  { id:"bfs",name:"BFS",category:"Recherche",timeO:"O(V+E)",spaceO:"O(V)",difficulty:"Intermédiaire",color:"yellow",
    description:"Parcours en largeur d'un graphe, explorant tous les nœuds d'un niveau avant de passer au suivant.",
    steps:["Ajouter le nœud source à la file","Marquer le nœud comme visité","Traiter chaque nœud de la file","Ajouter les voisins non visités"],
    python:`from collections import deque
def bfs(graph, start):
    visited, queue, result = set([start]), deque([start]), []
    while queue:
        node = queue.popleft(); result.append(node)
        for n in graph[node]:
            if n not in visited: visited.add(n); queue.append(n)
    return result`,
    js:`function bfs(graph, start) {
  const visited=new Set([start]), queue=[start], result=[];
  while(queue.length){
    const node=queue.shift(); result.push(node);
    for(const n of graph[node]||[])
      if(!visited.has(n)){visited.add(n);queue.push(n);}
  }
  return result;
}`,
    pseudocode:`file=[source], visités={source}\nTANT QUE file non vide\n  nœud=file.défiler()\n  POUR chaque voisin\n    SI non visité: enfiler voisin`
  },
  { id:"dfs",name:"DFS",category:"Recherche",timeO:"O(V+E)",spaceO:"O(V)",difficulty:"Intermédiaire",color:"yellow",
    description:"Parcours en profondeur d'un graphe, explorant un chemin jusqu'au bout avant de revenir en arrière.",
    steps:["Marquer le nœud courant comme visité","Explorer récursivement chaque voisin non visité","Retour en arrière quand tous les voisins sont visités","Répéter pour tous les nœuds non visités"],
    python:`def dfs(graph, node, visited=None):
    if visited is None: visited = set()
    visited.add(node); result = [node]
    for n in graph[node]:
        if n not in visited: result.extend(dfs(graph,n,visited))
    return result`,
    js:`function dfs(graph,node,visited=new Set()){
  visited.add(node); const result=[node];
  for(const n of graph[node]||[])
    if(!visited.has(n)) result.push(...dfs(graph,n,visited));
  return result;
}`,
    pseudocode:`DFS(nœud):\n  marquer nœud visité\n  POUR chaque voisin\n    SI non visité: DFS(voisin)`
  },
  { id:"dijkstra",name:"Dijkstra",category:"Graphes",timeO:"O((V+E)log V)",spaceO:"O(V)",difficulty:"Avancé",color:"red",
    description:"Algorithme de plus court chemin dans un graphe pondéré avec des poids non négatifs.",
    steps:["Initialiser les distances à l'infini","Mettre la distance source = 0","Extraire le nœud à distance minimale","Mettre à jour les distances des voisins"],
    python:`import heapq
def dijkstra(graph, start):
    dist = {n: float('inf') for n in graph}; dist[start]=0
    pq = [(0, start)]
    while pq:
        d,u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v,w in graph[u]:
            if dist[u]+w < dist[v]:
                dist[v]=dist[u]+w; heapq.heappush(pq,(dist[v],v))
    return dist`,
    js:`function dijkstra(graph, start) {
  const dist={};
  for(const n in graph) dist[n]=Infinity; dist[start]=0;
  const pq=[[0,start]];
  while(pq.length){
    pq.sort((a,b)=>a[0]-b[0]);
    const [d,u]=pq.shift();
    if(d>dist[u])continue;
    for(const [v,w] of graph[u]||[])
      if(dist[u]+w<dist[v]){dist[v]=dist[u]+w;pq.push([dist[v],v]);}
  }
  return dist;
}`,
    pseudocode:`dist[src]=0, dist[autres]=∞\nTANT QUE file non vide\n  u=nœud dist min\n  POUR voisin v\n    SI dist[u]+w<dist[v]: màj`
  },
  { id:"fibonacci",name:"Fibonacci (DP)",category:"Dynamique",timeO:"O(n)",spaceO:"O(n)",difficulty:"Débutant",color:"green",
    description:"Calcul de la suite de Fibonacci avec mémoïsation pour éviter les recalculs exponentiels.",
    steps:["Initialiser un tableau de mémos","Cas de base : F(0)=0, F(1)=1","Pour chaque n, calculer F(n)=F(n-1)+F(n-2)","Stocker chaque résultat"],
    python:`def fib(n, memo={}):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib(n-1,memo)+fib(n-2,memo)
    return memo[n]

# Itératif O(1) espace
def fib_iter(n):
    a,b = 0,1
    for _ in range(n): a,b = b,a+b
    return a`,
    js:`const memo={};
function fib(n){
  if(n in memo)return memo[n];
  if(n<=1)return n;
  return memo[n]=fib(n-1)+fib(n-2);
}
const fibIter=n=>{let[a,b]=[0,1];for(let i=0;i<n;i++)[a,b]=[b,a+b];return a;}`,
    pseudocode:`mémo={}\nFIB(n):\n  SI n in mémo: retourner mémo[n]\n  SI n<=1: retourner n\n  mémo[n]=FIB(n-1)+FIB(n-2)\n  retourner mémo[n]`
  },
  { id:"knapsack",name:"Knapsack (0/1)",category:"Dynamique",timeO:"O(nW)",spaceO:"O(nW)",difficulty:"Avancé",color:"red",
    description:"Problème classique de programmation dynamique : maximiser la valeur des objets dans un sac de capacité limitée.",
    steps:["Créer une table dp[n+1][W+1]","Pour chaque objet i et capacité w","Choisir : inclure ou exclure l'objet","dp[i][w]=max(exclure,inclure)"],
    python:`def knapsack(weights, values, capacity):
    n=len(weights)
    dp=[[0]*(capacity+1) for _ in range(n+1)]
    for i in range(1,n+1):
        for w in range(capacity+1):
            dp[i][w]=dp[i-1][w]
            if weights[i-1]<=w:
                dp[i][w]=max(dp[i][w],values[i-1]+dp[i-1][w-weights[i-1]])
    return dp[n][capacity]`,
    js:`function knapsack(w,v,cap){
  const n=w.length,dp=Array(n+1).fill(0).map(()=>Array(cap+1).fill(0));
  for(let i=1;i<=n;i++)for(let c=0;c<=cap;c++){
    dp[i][c]=dp[i-1][c];
    if(w[i-1]<=c)dp[i][c]=Math.max(dp[i][c],v[i-1]+dp[i-1][c-w[i-1]]);
  }
  return dp[n][cap];
}`,
    pseudocode:`dp[0..n][0..W]=0\nPOUR i=1 À n\n  POUR w=0 À W\n    exclure=dp[i-1][w]\n    inclure=val[i]+dp[i-1][w-poids[i]]\n    dp[i][w]=MAX(exclure,inclure)`
  },
  { id:"hash-table",name:"Hash Table",category:"Structures",timeO:"O(1) moy.",spaceO:"O(n)",difficulty:"Intermédiaire",color:"yellow",
    description:"Structure de données qui mappe des clés à des valeurs via une fonction de hachage pour des accès en O(1).",
    steps:["Appliquer la fonction de hachage à la clé","Calculer l'index dans le tableau","Gérer les collisions (chaînage)","Stocker/récupérer la valeur"],
    python:`class HashTable:
    def __init__(self,size=10):
        self.table=[[] for _ in range(size)]
    def _hash(self,key): return hash(key)%len(self.table)
    def set(self,key,value):
        idx=self._hash(key)
        for p in self.table[idx]:
            if p[0]==key: p[1]=value; return
        self.table[idx].append([key,value])
    def get(self,key):
        for p in self.table[self._hash(key)]:
            if p[0]==key: return p[1]`,
    js:`class HashTable{
  constructor(size=10){this.t=Array(size).fill(null).map(()=>[]);}
  _h(k){return[...k].reduce((a,c)=>a+c.charCodeAt(0),0)%this.t.length;}
  set(k,v){const p=this.t[this._h(k)].find(x=>x[0]===k);p?p[1]=v:this.t[this._h(k)].push([k,v]);}
  get(k){return(this.t[this._h(k)].find(x=>x[0]===k)||[])[1];}
}`,
    pseudocode:`SET(clé,valeur):\n  idx=hash(clé)%taille\n  SI clé existe: màj\n  SINON: ajouter [clé,valeur]\n\nGET(clé):\n  idx=hash(clé)%taille\n  retourner table[idx][clé]`
  },
  { id:"linked-list",name:"Liste Chaînée",category:"Structures",timeO:"O(n) accès",spaceO:"O(n)",difficulty:"Débutant",color:"green",
    description:"Structure linéaire où chaque élément pointe vers le suivant, permettant insertions/suppressions O(1) en tête.",
    steps:["Chaque nœud contient une valeur et un pointeur","Insertion en tête : O(1)","Insertion en queue : O(n)","Recherche : O(n)"],
    python:`class Node:
    def __init__(self,val): self.val=val; self.next=None

class LinkedList:
    def __init__(self): self.head=None
    def prepend(self,val):
        node=Node(val); node.next=self.head; self.head=node
    def to_list(self):
        r,c=[],self.head
        while c: r.append(c.val); c=c.next
        return r`,
    js:`class Node{constructor(v){this.val=v;this.next=null;}}
class LinkedList{
  constructor(){this.head=null;}
  prepend(v){const n=new Node(v);n.next=this.head;this.head=n;}
  toArray(){const r=[];let c=this.head;while(c){r.push(c.val);c=c.next;}return r;}
}`,
    pseudocode:`PRÉPEND(val):\n  nœud=Nœud(val)\n  nœud.suivant=tête\n  tête=nœud\n\nPARCOURIR:\n  courant=tête\n  TANT QUE courant!=null\n    traiter courant.val\n    courant=courant.suivant`
  }
];

export const LANGUAGES = [
  { id:"python",name:"Python",level:"Débutant",icon:"🐍",color:"#3572A5",year:1991,creator:"Guido van Rossum",paradigm:"Multi-paradigme",
    useCases:["Data Science & IA","Automatisation","Développement web","Analyse de données"],
    description:"Python est un langage interprété, de haut niveau, connu pour sa lisibilité. C'est le langage #1 en IA et data science.",
    syntax:{
      variables:`# Python — typage dynamique\nnom = "Alice"\nage = 25\npi = 3.14\nactif = True`,
      loops:`# Boucle for\nfor i in range(5):\n    print(i)\n\n# Boucle while\nn = 0\nwhile n < 5:\n    n += 1`,
      functions:`def saluer(nom, msg="Bonjour"):\n    return f"{msg}, {nom}!"\n\n# Lambda\ncarre = lambda x: x ** 2`,
      classes:`class Animal:\n    def __init__(self, nom):\n        self.nom = nom\n    def parler(self):\n        return f"{self.nom} fait du bruit"\n\nclass Chien(Animal):\n    def parler(self):\n        return f"{self.nom} aboie"`
    },
    roadmap:["Syntaxe de base","POO","Fichiers & Exceptions","Bibliothèques standard","Flask/Django","NumPy/Pandas","Machine Learning"]
  },
  { id:"javascript",name:"JavaScript",level:"Débutant",icon:"⚡",color:"#F7DF1E",year:1995,creator:"Brendan Eich",paradigm:"Multi-paradigme",
    useCases:["Développement web front-end","Node.js (back-end)","Applications mobiles","APIs & microservices"],
    description:"JavaScript est le seul langage natif des navigateurs. Avec Node.js, incontournable pour le web moderne.",
    syntax:{
      variables:`// JS — let, const, var\nconst nom = "Alice";  // immuable\nlet age = 25;         // mutable\nvar legacy = "old";   // éviter`,
      loops:`// For classique\nfor (let i = 0; i < 5; i++) console.log(i);\n\n// For...of\nfor (const item of [1,2,3]) console.log(item);\n\n// forEach\n[1,2,3].forEach(n => console.log(n));`,
      functions:`function saluer(nom) { return \`Bonjour, \${nom}!\`; }\n\nconst carre = x => x ** 2;\n\nasync function getData() {\n  const res = await fetch('/api');\n  return res.json();\n}`,
      classes:`class Animal {\n  constructor(nom) { this.nom = nom; }\n  parler() { return \`\${this.nom} fait du bruit\`; }\n}\nclass Chien extends Animal {\n  parler() { return \`\${this.nom} aboie\`; }\n}`
    },
    roadmap:["Variables & Types","DOM & Événements","ES6+","Async/Await","React/Vue","Node.js","TypeScript"]
  },
  { id:"typescript",name:"TypeScript",level:"Intermédiaire",icon:"🔷",color:"#3178C6",year:2012,creator:"Microsoft",paradigm:"Orienté objet, typé statiquement",
    useCases:["Applications d'entreprise","Grands projets front-end","APIs Node.js typées","Frameworks modernes"],
    description:"Superset de JavaScript avec typage statique. Évite les erreurs à l'exécution et améliore la maintenabilité.",
    syntax:{
      variables:`const nom: string = "Alice";\nlet age: number = 25;\nconst actif: boolean = true;\nlet data: string | null = null;`,
      loops:`const nombres: number[] = [1, 2, 3];\nfor (const n of nombres) {\n  console.log(n.toFixed(2));\n}`,
      functions:`function saluer(nom: string, fois?: number): string {\n  return \`Bonjour \${nom}\`.repeat(fois ?? 1);\n}\nconst add = (a: number, b: number): number => a + b;`,
      classes:`interface IAnimal { nom: string; parler(): string; }\n\nclass Chien implements IAnimal {\n  constructor(public nom: string) {}\n  parler(): string { return \`\${this.nom} aboie\`; }\n}`
    },
    roadmap:["Types de base","Interfaces","Génériques","Décorateurs","Config TS","React + TS","Testing"]
  },
  { id:"java",name:"Java",level:"Intermédiaire",icon:"☕",color:"#B07219",year:1995,creator:"James Gosling (Sun)",paradigm:"Orienté objet (pure OO)",
    useCases:["Applications d'entreprise","Android","Systèmes distribués","Big Data"],
    description:"\"Écrire une fois, exécuter partout\". Java est robuste, portable et dominant en entreprise.",
    syntax:{
      variables:`String nom = "Alice";\nint age = 25;\ndouble pi = 3.14;\nboolean actif = true;`,
      loops:`for (int i = 0; i < 5; i++) System.out.println(i);\n\nint[] nums = {1,2,3};\nfor (int n : nums) System.out.println(n);`,
      functions:`public static String saluer(String nom) {\n    return "Bonjour, " + nom + "!";\n}\n// Lambda (Java 8+)\nFunction<Integer,Integer> carre = x -> x*x;`,
      classes:`public abstract class Animal {\n    protected String nom;\n    public Animal(String nom) { this.nom=nom; }\n    public abstract String parler();\n}\npublic class Chien extends Animal {\n    public Chien(String n){super(n);}\n    public String parler(){return nom+" aboie";}\n}`
    },
    roadmap:["Syntaxe OO","Collections","Exceptions","Streams Java 8","Spring Boot","Maven/Gradle","Tests JUnit"]
  },
  { id:"c",name:"C",level:"Avancé",icon:"⚙️",color:"#555555",year:1972,creator:"Dennis Ritchie (Bell Labs)",paradigm:"Procédural, bas niveau",
    useCases:["Systèmes d'exploitation","Firmware & embarqué","Compilateurs","Haute performance"],
    description:"Le père de la plupart des langages modernes. C offre un contrôle direct de la mémoire et une performance optimale.",
    syntax:{
      variables:`char nom[] = "Alice";\nint age = 25;\ndouble pi = 3.14159;\nint* ptr = &age;  /* pointeur */`,
      loops:`for (int i=0; i<5; i++) printf("%d\\n",i);\n\nint n=0;\nwhile (n<5) n++;`,
      functions:`#include <stdio.h>\nchar* saluer(const char* nom) {\n    static char buf[100];\n    snprintf(buf,sizeof(buf),"Bonjour, %s!",nom);\n    return buf;\n}`,
      classes:`/* C n'a pas de classes — structures */\ntypedef struct {\n    char nom[50];\n    int age;\n} Animal;\n\nvoid afficher(Animal a) {\n    printf("%s, %d\\n", a.nom, a.age);\n}`
    },
    roadmap:["Syntaxe & Types","Pointeurs","Allocation mémoire","Structures","Fichiers","Compilation & Make","Débogage"]
  },
  { id:"cpp",name:"C++",level:"Avancé",icon:"🔧",color:"#f34b7d",year:1985,creator:"Bjarne Stroustrup",paradigm:"Multi-paradigme (OO, générique, procédural)",
    useCases:["Jeux vidéo (Unreal Engine)","Systèmes haute performance","Moteurs de rendu","Finance quantitative"],
    description:"Extension de C avec POO, templates et STL. Performance maximale avec abstraction élevée.",
    syntax:{
      variables:`std::string nom = "Alice";\nint age = 25;\nauto pi = 3.14;  // déduction de type\nconst int MAX = 100;`,
      loops:`std::vector<int> nums = {1,2,3};\nfor (const auto& n : nums) std::cout << n;\n\nfor (int i=0; i<5; i++) std::cout << i;`,
      functions:`std::string saluer(const std::string& nom) {\n    return "Bonjour, " + nom + "!";\n}\ntemplate<typename T>\nT carre(T x) { return x*x; }`,
      classes:`class Animal {\npublic:\n    Animal(std::string n):nom(n){}\n    virtual std::string parler()=0;\nprotected:\n    std::string nom;\n};\nclass Chien:public Animal {\npublic:\n    Chien(std::string n):Animal(n){}\n    std::string parler() override{return nom+" aboie";}\n};`
    },
    roadmap:["Pointeurs & Références","POO","Templates","STL","Smart Pointers","Move Semantics","Design Patterns"]
  },
  { id:"rust",name:"Rust",level:"Avancé",icon:"🦀",color:"#dea584",year:2010,creator:"Graydon Hoare (Mozilla)",paradigm:"Systèmes, sécurité mémoire, fonctionnel",
    useCases:["Systèmes sécurisés","WebAssembly","Moteurs de jeux","Blockchain"],
    description:"Sécurité mémoire sans garbage collector grâce au système d'ownership. Performance C/C++ avec garanties à la compilation.",
    syntax:{
      variables:`let nom = String::from("Alice");\nlet mut age = 25;\nlet pi: f64 = 3.14;\nage += 1;`,
      loops:`loop { break; }\n\nlet mut n=0;\nwhile n<5 { n+=1; }\n\nfor i in 0..5 { println!("{}", i); }`,
      functions:`fn saluer(nom: &str) -> String {\n    format!("Bonjour, {}!", nom)\n}\nlet carre = |x: i32| -> i32 { x*x };`,
      classes:`struct Animal { nom: String }\n\nimpl Animal {\n    fn new(nom: &str) -> Self { Animal{nom:nom.to_string()} }\n    fn parler(&self) -> String { format!("{} fait du bruit",self.nom) }\n}`
    },
    roadmap:["Ownership & Borrowing","Types & Traits","Enums & Pattern Matching","Lifetimes","Async/Await","Crates & Cargo","Unsafe Rust"]
  },
  { id:"go",name:"Go",level:"Intermédiaire",icon:"🐹",color:"#00ADD8",year:2009,creator:"Google (Pike, Thompson, Griesemer)",paradigm:"Procédural, concurrent",
    useCases:["APIs & microservices","Infrastructure cloud","CLI tools","Traitement concurrent"],
    description:"Conçu chez Google pour simplifier la programmation système. Goroutines pour la concurrence légère.",
    syntax:{
      variables:`nom := "Alice"\nvar age int = 25\nconst PI = 3.14\nvar actif bool = true`,
      loops:`for i:=0;i<5;i++{fmt.Println(i)}\n\nn:=0\nfor n<5{n++}\n\nfor i,v:=range[]int{1,2,3}{}`,
      functions:`func saluer(nom string) string {\n    return fmt.Sprintf("Bonjour, %s!", nom)\n}\nfunc diviser(a,b int)(int,error){\n    if b==0{return 0,fmt.Errorf("div par zéro")}\n    return a/b,nil\n}`,
      classes:`type Animal struct { Nom string }\n\nfunc (a Animal) Parler() string {\n    return fmt.Sprintf("%s fait du bruit",a.Nom)\n}\n\ntype Parleur interface { Parler() string }`
    },
    roadmap:["Syntaxe & Types","Goroutines","Channels","Interfaces","Packages","Testing","APIs REST"]
  },
  { id:"sql",name:"SQL",level:"Débutant",icon:"🗃️",color:"#e38c00",year:1974,creator:"IBM (Chamberlin & Boyce)",paradigm:"Déclaratif, relationnel",
    useCases:["Bases de données relationnelles","Analyse de données","BI & Reporting","ETL"],
    description:"Langage de requêtes pour les bases de données relationnelles. Indispensable pour tout développeur.",
    syntax:{
      variables:`-- Types de colonnes :\n-- INTEGER, VARCHAR, TEXT\n-- BOOLEAN, TIMESTAMP\n-- DECIMAL, FLOAT, SERIAL`,
      loops:`-- SQL est déclaratif — pas de boucles\nSELECT id, nom\nFROM utilisateurs\nWHERE age > 18\nORDER BY nom\nLIMIT 10;`,
      functions:`SELECT\n  AVG(salaire) AS moyenne,\n  MAX(salaire) AS maximum,\n  COUNT(*) AS total\nFROM employes\nGROUP BY departement;`,
      classes:`CREATE TABLE utilisateurs (\n  id      SERIAL PRIMARY KEY,\n  email   VARCHAR(255) UNIQUE NOT NULL,\n  nom     VARCHAR(100),\n  cree_le TIMESTAMP DEFAULT NOW()\n);\n\nSELECT u.nom, c.titre\nFROM utilisateurs u\nJOIN commandes c ON u.id=c.user_id;`
    },
    roadmap:["SELECT & WHERE","JOIN","Agrégations","Sous-requêtes","Index & Performance","Transactions","PostgreSQL avancé"]
  },
  { id:"bash",name:"Bash",level:"Intermédiaire",icon:"💻",color:"#4EAA25",year:1989,creator:"Brian Fox (GNU)",paradigm:"Scripting shell, procédural",
    useCases:["Automatisation & DevOps","CI/CD pipelines","Administration système","Traitement de fichiers"],
    description:"Shell Unix standard, incontournable pour l'automatisation, les scripts DevOps et l'administration Linux/macOS.",
    syntax:{
      variables:`#!/bin/bash\nNOM="Alice"\nAGE=25\necho "Bonjour $NOM"\nreadonly PI=3.14`,
      loops:`for i in {1..5}; do echo $i; done\n\nn=0\nwhile [ $n -lt 5 ]; do\n  ((n++))\ndone\n\nfor f in *.txt; do echo "$f"; done`,
      functions:`saluer() {\n    local nom=$1\n    echo "Bonjour, $nom!"\n}\nsaluer "Alice"\n\ncarre() { echo $(($1*$1)); }\nresult=$(carre 5)`,
      classes:`# Pas de classes en Bash\n# Hash maps :\ndeclare -A user\nuser[nom]="Alice"\nuser[age]=25\necho \${user[nom]}`
    },
    roadmap:["Variables & Types","Conditions","Boucles","Fonctions","Fichiers & IO","Regex & Sed/Awk","Scripting DevOps"]
  }
];

export const EXERCISES = [
  { id: 1, title: 'Inverser une chaine', level: 'Debutant', lang: 'Tous', desc: 'Ecrivez une fonction qui inverse une chaine de caracteres.' },
  { id: 2, title: 'FizzBuzz', level: 'Debutant', lang: 'Tous', desc: 'Affichez les nombres de 1 a 100. Fizz si multiple de 3, Buzz si multiple de 5.' },
  { id: 3, title: 'Palindrome', level: 'Debutant', lang: 'Tous', desc: 'Verifiez si un mot se lit pareil dans les deux sens.' },
  { id: 4, title: 'Somme d\'un tableau', level: 'Debutant', lang: 'Tous', desc: 'Calculez la somme des elements d\'un tableau d\'entiers.' },
  { id: 5, title: 'Anagramme', level: 'Debutant', lang: 'Tous', desc: 'Verifiez si deux chaines sont des anagrammes.' },

  { id: 6, title: 'Tri Fusion (Merge Sort)', level: 'Intermediaire', lang: 'Tous', desc: 'Implementez l\'algorithme de tri fusion.' },
  { id: 7, title: 'Deux Sommes (Two Sum)', level: 'Intermediaire', lang: 'Tous', desc: 'Trouvez deux nombres dans un tableau dont la somme vaut une cible.' },
  { id: 8, title: 'Parentheses valides', level: 'Intermediaire', lang: 'Tous', desc: 'Verifiez qu\'une chaine de parentheses (), [], {} est bien formee.' },
  { id: 9, title: 'Recherche dans matrice 2D', level: 'Intermediaire', lang: 'Tous', desc: 'Cherchez une valeur dans une matrice triee.' },
  { id: 10, title: 'Suite de Syracuse', level: 'Intermediaire', lang: 'Tous', desc: 'Affichez la suite de Collatz pour un nombre donne.' },

  { id: 11, title: 'Plus longue sous-chaine sans repetition', level: 'Avance', lang: 'Tous', desc: 'Trouvez la longueur de la plus longue sous-chaine sans caracteres repetes.' },
  { id: 12, title: 'Probleme du sac a dos', level: 'Avance', lang: 'Tous', desc: 'Implementez l\'algorithme Knapsack (0/1) via prog dynamique.' },
  { id: 13, title: 'Plus court chemin (A*)', level: 'Avance', lang: 'Tous', desc: 'Trouvez le chemin le plus court dans une grille avec obstacles.' },
  { id: 14, title: 'Expressions regulieres simples', level: 'Avance', lang: 'Tous', desc: 'Implementez un parseur basique supportant . et *.' },
  { id: 15, title: 'Inverser liste chainee par groupe', level: 'Avance', lang: 'Tous', desc: 'Inversez les noeuds d\'une liste chainee par groupes de k.' }
];

export const RESOURCES = [
  { id: 1, type: 'Livre', title: 'Grokking Algorithms', author: 'Aditya Bhargava', desc: 'Excellent livre illustre pour debuter.' },
  { id: 2, type: 'Livre', title: 'Clean Code', author: 'Robert C. Martin', desc: 'La bible pour ecrire du code maintenable.' },
  { id: 3, type: 'Plateforme', title: 'LeetCode', author: 'leetcode.com', desc: 'Pratique indispensable pour les entretiens.' },
  { id: 4, type: 'Chaine YT', title: 'Fireship', author: 'YouTube', desc: 'Concepts tech expliques en 100 secondes.' },
  { id: 5, type: 'Livre', title: 'Cracking the Coding Interview', author: 'Gayle Laakmann', desc: 'Le guide ultime de preparation.' }
];