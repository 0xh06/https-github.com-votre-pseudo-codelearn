// ============================================================
//  CodeLearn — i18n translations
//  Only UI labels are translated. Code stays in English.
// ============================================================

export type Lang = 'fr' | 'en';

export const translations = {
  // ── Navbar ──────────────────────────────────────────────
  nav_algorithms: { fr: 'Algorithmes', en: 'Algorithms' },
  nav_exercises:  { fr: 'Exercices',   en: 'Exercises'  },
  nav_roadmap:    { fr: 'Le Parcours',  en: 'Roadmap'    },
  nav_languages:  { fr: 'Langages',    en: 'Languages'  },
  nav_pricing:    { fr: 'Tarifs',      en: 'Pricing'    },
  nav_login:      { fr: 'Connexion',   en: 'Log in'     },
  nav_signup:     { fr: "S'inscrire",  en: 'Sign up'    },
  nav_dashboard:  { fr: 'Mon Dashboard', en: 'My Dashboard' },
  nav_logout:     { fr: 'Déconnexion',   en: 'Log out'     },
  nav_connected:  { fr: 'Connecté en tant que', en: 'Logged in as' },

  // ── Algorithm Detail Tabs ────────────────────────────────
  tab_understand:  { fr: 'Comprendre',  en: 'Understand'   },
  tab_visualize:   { fr: 'Visualiser',  en: 'Visualize'    },
  tab_implement:   { fr: 'Implémenter', en: 'Implement'    },
  tab_challenges:  { fr: 'Défis',       en: 'Challenges'   },

  // ── Algorithm Detail — Theory ────────────────────────────
  algo_prerequisites:    { fr: 'Prérequis',              en: 'Prerequisites'        },
  algo_complexity:       { fr: 'Analyse de Complexité',  en: 'Complexity Analysis'  },
  algo_time:             { fr: 'Temps',                  en: 'Time'                 },
  algo_space:            { fr: 'Espace',                 en: 'Space'                },
  algo_how_it_works:     { fr: 'Comment ça marche ?',    en: 'How does it work?'    },
  algo_real_use_cases:   { fr: "Cas d'usage réels",      en: 'Real Use Cases'       },
  algo_hints:            { fr: 'Indices progressifs',    en: 'Progressive Hints'    },
  algo_unlock_hint:      { fr: 'Débloquer l\'indice',    en: 'Unlock hint'          },
  algo_hint_label:       { fr: 'Indice',                 en: 'Hint'                 },

  // ── Algorithm Detail — Editor ────────────────────────────
  editor_run:            { fr: 'Exécuter',              en: 'Run'              },
  editor_stop:           { fr: 'Stop',                  en: 'Stop'             },
  editor_see_solution:   { fr: 'Voir solution',         en: 'Show solution'    },
  editor_solution_shown: { fr: 'Solution affichée',     en: 'Solution shown'   },
  editor_fullscreen:     { fr: 'Mode plein écran',      en: 'Fullscreen'       },
  editor_terminal:       { fr: 'Terminal',              en: 'Terminal'         },
  editor_waiting:        { fr: 'En attente... Cliquez sur Exécuter pour tester votre code.', en: 'Waiting... Click Run to test your code.' },
  editor_running:        { fr: 'Exécution en cours...', en: 'Running...'       },
  editor_timeout:        { fr: 'Timeout > 5s. Boucle infinie ?', en: 'Timeout > 5s. Infinite loop?' },

  // ── Visualizer ───────────────────────────────────────────
  viz_title:       { fr: 'Visualiseur Interactif', en: 'Interactive Visualizer' },
  viz_step:        { fr: 'Étape',                  en: 'Step'                   },
  viz_of:          { fr: 'sur',                    en: 'of'                     },
  viz_play:        { fr: 'Jouer',                  en: 'Play'                   },
  viz_pause:       { fr: 'Pause',                  en: 'Pause'                  },
  viz_prev:        { fr: '← Préc',                 en: '← Prev'                 },
  viz_next:        { fr: 'Suiv →',                 en: 'Next →'                 },
  viz_searching:   { fr: 'Zone de recherche',      en: 'Search zone'            },
  viz_middle:      { fr: 'Milieu (mid)',            en: 'Middle (mid)'           },
  viz_found:       { fr: 'Trouvé !',               en: 'Found!'                 },
  viz_compared:    { fr: 'Comparé',                en: 'Compared'               },
  viz_swapped:     { fr: 'Échangé',                en: 'Swapped'                },
  viz_sorted:      { fr: 'Trié ✓',                 en: 'Sorted ✓'               },
  viz_pivot:       { fr: 'Pivot',                  en: 'Pivot'                  },
  viz_tip:         { fr: 'Utilisez les boutons pour naviguer étape par étape, ou appuyez sur Jouer pour voir l\'animation complète.', en: 'Use the buttons to navigate step by step, or press Play for the full animation.' },
  viz_unavailable: { fr: 'Visualiseur interactif à venir pour cet algorithme.', en: 'Interactive visualizer coming soon for this algorithm.' },

  // ── Challenges Tab ───────────────────────────────────────
  challenges_intro: { fr: '🎯 Testez votre compréhension avec ces défis progressifs. Revenez à l\'onglet Implémenter pour coder votre solution.', en: '🎯 Test your understanding with these progressive challenges. Go back to Implement to code your solution.' },
  challenge_go:     { fr: '→ Aller coder',          en: '→ Go code it'       },

  // ── Exercises ────────────────────────────────────────────
  exo_run:          { fr: 'Vérifier la solution',  en: 'Check solution'      },
  exo_running:      { fr: 'Exécution...',          en: 'Running...'          },
  exo_results:      { fr: "Résultats d'exécution", en: 'Run Results'         },
  exo_all_passed:   { fr: 'ALL TESTS PASSED',      en: 'ALL TESTS PASSED'    },
  exo_waiting:      { fr: '> Cliquez sur "Vérifier la solution" pour exécuter le code.', en: '> Click "Check solution" to run the code.' },
  exo_test_case:    { fr: 'Test Case',             en: 'Test Case'           },
  exo_input:        { fr: 'Entrée :',              en: 'Input:'              },
  exo_expected:     { fr: 'Attendu :',             en: 'Expected:'           },
  exo_received:     { fr: 'Reçu :',               en: 'Received:'           },
  exo_error:        { fr: 'Erreur :',              en: 'Error:'              },
  exo_focus_mode:   { fr: 'Mode Focus',            en: 'Focus Mode'          },
  exo_back:         { fr: '← Exercices',           en: '← Exercises'         },

  // ── General ──────────────────────────────────────────────
  back_to_algos:     { fr: '← Retour aux algorithmes', en: '← Back to algorithms' },
  course_and_hints:  { fr: 'Cours & Indices',           en: 'Course & Hints'       },
  level:             { fr: 'Niv.',                      en: 'Lvl.'                 },
  difficulty_beginner:     { fr: 'Débutant',      en: 'Beginner'      },
  difficulty_intermediate: { fr: 'Intermédiaire', en: 'Intermediate'  },
  difficulty_advanced:     { fr: 'Avancé',        en: 'Advanced'      },
} as const;

export type TKey = keyof typeof translations;

// The core translation function
export function t(key: TKey, lang: Lang): string {
  return translations[key]?.[lang] ?? translations[key]?.['fr'] ?? key;
}
