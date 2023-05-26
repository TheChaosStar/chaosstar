#! /usr/bin/env node

const sapin = require("./sapin");

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

const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

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

let choiseSelector = 0;
let choise = [
    "\033[34m> test 1\033[00m",
    "\033[00m  test 2\033[00m",
    "\033[00m  Show Sapin\033[00m",
    "\033[00m  Exit\033[00m"
];
tab("choise :", choise);

process.stdin.on("keypress", (str, key) => {
    console.clear();

    let reloadChoise = [
        "\033[00m  test 1\033[00m",
        "\033[00m  test 2\033[00m",
        "\033[00m  Show Sapin\033[00m",
        "\033[00m  Exit\033[00m"
    ];

    if (key.ctrl && key.name == "c") process.exit();
    if (key.name == "return") {action(choiseSelector); return;}
        if (key.name == "up") {
            if (choiseSelector == 0) choiseSelector = reloadChoise.length - 1;
            else choiseSelector--;
        }
    if (key.name == "down") {
        if (choiseSelector == reloadChoise.length - 1) choiseSelector = 0;
        else choiseSelector++;
    }


    reloadChoise[choiseSelector] = reloadChoise[choiseSelector].replace("\033[00m ", "\033[34m>");

    console.log(header + "\n\n");

    tab("choice :", reloadChoise);
});

function action(choice) {
    if (choice == 3) process.exit();
    if (choice == 2) sapin.startLoop();
    if (choice == 1) console.log("test 2");
    if (choice == 0) console.log("test 1");
    
}