#! /usr/bin/env node

const header = `
    ▄▀▀▄    ▄▀▀▄  ▄▀▀█▄▄▄▄  ▄▀▀▀▀▄     ▄▀▄▄▄▄   ▄▀▀▀▀▄   ▄▀▀▄ ▄▀▄  ▄▀▀█▄▄▄▄ 
    █   █    ▐  █ ▐  ▄▀   ▐ █    █     █ █    ▌ █      █ █  █ ▀  █ ▐  ▄▀   ▐ 
    ▐  █        █   █▄▄▄▄▄  ▐    █     ▐ █      █      █ ▐  █    █   █▄▄▄▄▄  
      █   ▄    █    █    ▌      █        █      ▀▄    ▄▀   █    █    █    ▌  
       ▀▄▀ ▀▄ ▄▀   ▄▀▄▄▄▄     ▄▀▄▄▄▄▄▄▀ ▄▀▄▄▄▄▀   ▀▀▀▀   ▄▀   ▄▀    ▄▀▄▄▄▄   
             ▀     █    ▐     █        █     ▐           █    █     █    ▐   
                   ▐          ▐        ▐                 ▐    ▐     ▐        
`;
console.log(header + "\n\n");

function tab(title, values) {

    let val = [...values];
    let height = [...values].length + 5;
    let width = 70;
    let mid = ((width / 2) - ([...title].length / 2)) | 0;
    let choisePos = (width / 5) | 0;

    let result = "";

    for (let i = 0; i <= height; i++) {
        for (let j = 0; j <= width; j++) {

            if (i == 0 && j == 0) result += "┌";
            else if (i == 0 && j == width) result += "┐";
            else if (i == height && j == 0) result += "└";
            else if (i == height && j == width) result += "┘";
            else if (i == 2 && j == 0) result += "├";
            else if (i == 2 && j == width) result += "┥";
            else if (j == 0 || j == width) result += "│";
            else if (i == 0 || i == 2 || i == height) result += "─";

            else if (i == 1 && j == mid) {
                result += title;
                j += [...title].length - 1;
            }

            else if (i >= 4 && i < 4 + val.length && j == choisePos) {
                result += val[i - 4];
                j += val[i - 4].length - 11;
            }

            else result += " ";
        }
        result += '\n'
    }

    console.log(result);

}

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

let choiseSelector = 0;
let choise = [
    "\033[34m> test 1\033[00m",
    "\033[00m  test 2\033[00m",
    "\033[00m  test 3\033[00m",
    "\033[00m  test 4\033[00m"
];
tab("choise :", choise);


stdin.on('data', function (key) {
    console.clear();

    let reloadChoise = [
        "\033[00m  test 1\033[00m",
        "\033[00m  test 2\033[00m",
        "\033[00m  test 3\033[00m",
        "\033[00m  test 4\033[00m"
    ];


    switch (key) {
        case '\u001B\u005B\u0041':
            if (choiseSelector == 0) choiseSelector = reloadChoise.length - 1;
            else choiseSelector--;
            break;

        case '\u001B\u005B\u0042':
            if (choiseSelector == reloadChoise.length - 1) choiseSelector = 0;
            else choiseSelector++;
            break;

        case '\u0003':
            process.exit();
            break;

        case "\n":
            process.exit();
            break;

        default:
            break;
    }

    /*
        if (key == '\u001B\u005B\u0041') { // up
            if (choiseSelector == 0) choiseSelector = reloadChoise.length - 1;
            else choiseSelector--;
        }
        if (key == '\u001B\u005B\u0042') { // down
            if (choiseSelector == reloadChoise.length - 1) choiseSelector = 0;
            else choiseSelector++;       
        }
    
        
        if (key == '\u0003') { process.exit(); }    // ctrl-c
      */

    reloadChoise[choiseSelector] = reloadChoise[choiseSelector].replace("\033[00m ", "\033[34m>");

    console.log(header + "\n\n");

    tab("choise :", reloadChoise);

});


