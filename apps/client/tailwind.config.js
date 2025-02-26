const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

/**
 * quand j'ai compris que mon projet chargait dans le vide pendant 3 h (ce message (base) punisher@MacBook-du-Punisher toast-project % npx nx serve client
(node:34812) ExperimentalWarning: CommonJS module /opt/homebrew/lib/node_modules/npm/node_modules/debug/src/node.js is loading ES Module /opt/homebrew/lib/node_modules/npm/node_modules/supports-color/index.js using require().
Support for loading ES Module in require() is an experimental feature and might change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
The CJS build of Vite's Node API is deprecated. See https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.
⠏ Creating project graph dependencies with 7 plugins) j'ai crée un nouveau projet nx et j'ai juste copié mon dossier
 * components et installé quelques bibliotheques et ensuite cela fonctionnait mon serveur affichait ma page
 * le probleme est que je veux que mon projet s'execute sur mon projet initial (exemple lien avec github..)
 * j'aimerais comprendre comment je peux faire cela
 * je me dis que c'est seulement une question de configuration et d'installations 
 * j'ai les 2 projets en face de moi
 * le client est le meme 
 * dans un projet il se lance et dans l'autre il m'affiche le message plus haut
 * 
 *  */ 
