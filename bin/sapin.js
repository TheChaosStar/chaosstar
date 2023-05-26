// fonction pour creer un spain
// char = feuille du sapin
// char1 = les guirlande
// n =le nombre de ligne
// p = pour un sapin pair ou impair

function drawSapin(char, char1, n, p = true) {
    let o = 0;
    // l'espacement de depart
    let t = Math.pow(n, 2); // n^2
    let center = t;

    for (let i = 1; i < n; i++) {
        // ecrire les espaces
        for (let k = 0; k < t; k++) {
            process.stdout.write(' ');
        }

        // ecrire les charactaires
        for (let j = (p ? 0 : 1); j < o; j++) {
            /* 
                placer les guirlande aleatoirement 
                uniquement si se n'est pas la premiaire ligne
            */
            if (Math.floor(Math.random() * n) == 1 && i != 2) {
                if (char1 == '*')
                    process.stdout.write('\x1b[31m' + char1); // * en rouge
                else
                    process.stdout.write('\x1b[34m' + char1); // le reste en bleu
            }
            else {
                if (i == 2 && p == 0)
                    process.stdout.write('\x1b[33m' + '✩'); // l'etoile en jaune
                else
                    process.stdout.write('\x1b[32m' + char); // les feuille en vert
            }
        }
        o += 2;
        t--;
        process.stdout.write('\n');
    }

    // ecrire le tronc
    for (let i = 0; i < (p ? 2 : 3); i++) {
        // ecrire les espaces
        for (let k = 0; k < center - (p ? 1 : 2); k++) {
            process.stdout.write(' ');
        }
        // ecrire les charactaires
        for (let j = 0; j < (p ? 2 : 3); j++) {
            process.stdout.write('\x1b[90m' + '|'); // le tronc en gris
        }
        // retoure a la ligne
        process.stdout.write('\n');
    }
}

// taille du spain
let n = 10;

/**
 * une fonction pour faire une pause dans le programme
 * un nombre de temps noté 'delay'
 * @param {number} delay Est le nombre de temps en milliseconde qui stop le programme
 */
 function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

// faire un interval de 500ms
// equivalent au while(true)  (^^ pour Mathis)

function startLoop() {

    
    setInterval(() => {
        /*
        desiner le 1 sapin avec les guirlande en rouge
        et avec le charactaire '*'
        */
       drawSapin('-', '*', n, false);
       
       // faire une pause de 500ms
       sleep(500);
       
       // effacer le terminal
       console.clear();
       
       /*
       desiner le 2 sapin avec les guirlande en bleu
       et avec le charactaire 'o'
       */
      drawSapin('-', 'o', n, false);
      
      // faire une pause de 500ms
      sleep(500);
      
      // effacer le terminal
      console.clear();
    }, 500);
    
}

module.exports = { startLoop }