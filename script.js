
//GLOBAL VARRIABLE
//const size = prompt("Select table size (2-9) - !dopracowac szerokosc!");
const size = 7;
const players_count = 2; //nie dopracowane dla wiecej
var global_counter=0;
const winPonints = 3; //has to be less than size
/////////////////////////////////////////////////////////

//initGame()

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//function initGame() {

    var PLAYERS = createPlayer(players_count);
    generateTable(size);
    addENDbutton();
    DivsID = getDivsColumn(size);
    console.log('Created game board:\n', DivsID);
    gameStats();
//}

////////////////////////////////////////////////////////EXTEND HTML
function generateTable(size) {
    const main_div = document.getElementById("main");

    addButtons(size);

    const GameBoard = document.createElement("div");
    GameBoard.id = "GameBoard";
    main_div.appendChild(GameBoard);

    let counter =0;
    for (let i=1;i<=(size*size);i++) {
        counter++;
        newDiv = document.createElement("div");
        newDiv.className = "line";
        newDiv.id = "DIVid"+counter;
        newDiv.innerText = counter;
        //main_div.appendChild(newDiv)
        GameBoard.appendChild(newDiv);
        //console.log(counter);

        //add enter after each line
        if (counter%size===0) {
            const newLine = document.createElement('br');
            GameBoard.appendChild(newLine);
        }
        }
}


function addButtons(size) {

    const main_div = document.getElementById("main");

    for (let i=1;i<=size;i++) {
        // 1. Create the button
        let button = document.createElement("button");
        button.innerHTML = "Select column"+i;
        button.className ='button';
        button.id = i;

        // 2. Append somewhere
        main_div.appendChild(button);

        // 3. Add event handler
        button.addEventListener("click", function () {
            //alert("Selected column: "+i);
           SelectDiv(i,size);
        });
        button.addEventListener("mouseover", function () {
           backlight(i);
        });
        button.addEventListener("mouseout", function () {
           backlightOFF(i);
        });
    }
        //Put ENTER after buttons
        const putEnter = document.querySelector('div');
        const newLine = document.createElement('br');
        putEnter.appendChild(newLine);
}


function addENDbutton() {
    const main_div = document.getElementById("main");

    //1. Create the button
    const button = document.createElement("button");
    button.innerHTML = "RESTART";
    //2. Append into DOM
    main_div.appendChild(button);
    //3. Add event handle
    button.addEventListener("click", function () {
        window.location.reload(true);
        });
}


function gameStats() {
        // 1. Create the button
        let DIVstats = document.createElement("div");
        DIVstats.innerHTML = "Player move: ";
        DIVstats.id = "stats";
        const newLine = document.createElement('br');
        const newLineHR = document.createElement('hr');
        // 2. Append somewhere
        document.body.appendChild(newLine);
        document.body.appendChild(newLineHR);
        document.body.appendChild(DIVstats);
}



////////////////////////////////////////////////////////READ INFO FROM HTML
function getDivsColumn(size) {
    DIVidPrefix = 'DIVid';

    const container = document.getElementById("GameBoard");
    insideDivs = container.getElementsByTagName('div');

    //const insideDivs = document.getElementsByClassName('line'); //not work after select (class changed)
    //console.log("Ilosc DIV insice =",insideDivs.length);
    //console.log("DIVS INSIDE:",insideDivs);

    columnID = [];
    columnID.push(["LineNum = ColumnNum","[Divs ID]"]); //add line to index 0

    let counter = 0;
    for (oneDiv of insideDivs) {
        counter++;

        currentDivID = oneDiv.id.slice(5); //get ID

        var variableName = 'line';
       if (counter<=size) {
            newLine = eval(variableName + (counter) +'=[];'); //create dynamic variable "lineX" x= number of column
            columnID.push(newLine);
        }

        rest = (counter%size);
        //console.log(currentDivID,"R=",rest);

        //add column ID to relevant row in table (coresponding to column number)
        if (rest !== 0) {
            (eval(variableName + rest)).push(DIVidPrefix+currentDivID);
        } else {
            rest = size;
            (eval(variableName + rest)).push(DIVidPrefix+currentDivID);
        }
    }
    //console.log(columnID);
    return columnID;
}


function getGameTable () { //return array2D with index corresponding to position on board
    const container = document.getElementById("GameBoard");
    insideDivs = container.getElementsByTagName('div');

    const GameTable = []
    let tmp_row = [];

    for (oneDiv of insideDivs) {
        tmp_row.push(oneDiv);
        if (tmp_row.length === size) {
            GameTable.push(tmp_row);
            tmp_row = [];
        }
    }
    //console.log("Game table:",GameTable);
    //console.log("[1][1]",GameTable[1][1])
    return GameTable;
}


function createPlayer(count) {
    players = []
    for (i=1;i<=count;i++) {
        //const name = prompt("Give your name");
        name = "Player"+i;
        var Player = {
            FirstName: name,
            ID: i,
            Color:null,
            Selected: []
        };
        if (i===1) {Player.Color='blue'} else {Player.Color='lime'};
        players.push(Player);
    }
    console.log("Created players:",players);
    //alert("Hello 1st, "+players[0].FirstName);
    return players;
}



///////////////////////////////////////////////////////IN GAME FUNCTION
function SelectPlayer() {

    if (global_counter%2===0) {
        currentPlayer = PLAYERS[0];
    } else {
        currentPlayer = PLAYERS[1];
    }

    console.log(currentPlayer.FirstName);

    const playerMove = document.getElementById('stats'); //display name moving player
    playerMove.innerHTML = currentPlayer.FirstName;

    return currentPlayer;
}


function SelectDiv(column,size) {

    currentPlayer = SelectPlayer();
   // alert("MOve: "+currentPlayer.FirstName);

    defaultClass = 'line';
    selectedClass = 'selectedLine';
    //alert("Puts into column"+column+"active!");

    const allDiv = document.getElementsByClassName('line'); //get all DIVs(game board)

    const DivsID = getDivsColumn(size); //get ID of all DIVs (game board positions)
    const selectedColumn = DivsID[column]; //list of DIVs in selected column

    //console.log("Divs ID in selected column :", selectedColumn); //list with DIVs id from selected column

    //check DIVs class in selected column, from down to up - if default chenge to 'selected' and return = change only one
    for (let i=selectedColumn.length-1;i>=0;i--) {
        //console.log("\tChecking element..",selectedColumn[i]);
        const currentDIV = document.getElementById(selectedColumn[i]);
        if (currentDIV.className === defaultClass) {
            //alert("Zmiana koloru");
            currentDIV.className = selectedClass;
            currentDIV.style.backgroundColor = currentPlayer.Color;
            checkWin(currentPlayer);
            return global_counter++;
        }
    }
}



////////////////////////////////// CHECK GAME
function checkWin(currentPlayer) {

    // HORIZONTAL
    checkHorizontal(currentPlayer);

    //VERTICAL
    checkVertical(currentPlayer);

    //DIAGONAL\\
    checkDiagonal(currentPlayer);

    //console.log(global_counter+1,"|",size*size);
    if (global_counter+1 === (size*size)) { alert("END of GAME - draw!");};
}


function checkHorizontal(currentPlayer) {
    let suma = 0;
    let counter =0;
    WINpositions = [];
    const container = document.getElementById("GameBoard");
    insideDivs = container.getElementsByTagName('div');

    for (oneDiv of insideDivs){
        counter ++;
        if (oneDiv.style.backgroundColor === currentPlayer.Color) {
                suma++;
                WINpositions.push(oneDiv);
            } else {
                suma = 0;
                WINpositions = []; //reset when break winning line
            }
        //console.log("IDe=",oneDiv.id,"|SUMA",suma);
            if (suma === winPonints) {
                console.log(WINpositions);
                //return alert("WINNER(by poziom xD) is "+ currentPlayer.FirstName);
                return gameWIN(currentPlayer,WINpositions);
            }
        //suma = 0 after each line
        if (counter % size === 0 ) {
            //alert("Zerowanie"+oneDiv.id);
            suma = 0};
    }
}


function checkVertical(currentPlayer) {
    WINpositions = []; //list to collect winner position
    let sumaV = 0;
    const GameTable = getGameTable();

    for (let i=0;i<GameTable.length;i++) {
        for (let j=0;j<GameTable.length;j++) {
            //console.log("Tu",GameTable[i][j].id);
            if (GameTable[j][i].style.backgroundColor === currentPlayer.Color) {
                sumaV++;
                WINpositions.push(GameTable[j][i]);
                //if (sumaV === winPonints ) {return alert("WINNER(by pion xD) is "+ currentPlayer.FirstName);}
                if (sumaV === winPonints ) {return gameWIN(currentPlayer,WINpositions);}
            } else {
                sumaV = 0;
                WINpositions = []; //reset when break winning line
            }
            //console.log("Iteracja",cou,GameTable[j][i],"SUma",sumaV);
        }
        sumaV = 0; //clear after each column
    }
}


function checkDiagonal(currentPlayer) {

    const GameTable = getGameTable(); //game table, index start 0,0

    //DIAGONAL - SKOS - Left-Right \
    for (let i=0;i<(GameTable.length-winPonints+1);i++) {
        for (let j = 0; j < (GameTable.length-winPonints+1); j++) {
            checkSKOS_LR(GameTable,i,j,currentPlayer);
        }
    }

    //DIAGONAL - SKOS - Right-Left /
    for (let i=0;i<=(GameTable.length-winPonints);i++) {
        for (let j=(GameTable.length-winPonints);j<GameTable.length;j++) {
            checkSKOS_RL(GameTable,i,j,currentPlayer);
        }
    }

}

function checkSKOS_LR(GameTable,i,j,currentPlayer) {
    WINpositions = []; //list to collect winner position

/*    console.log("log1",cou,"[",x,y,"]");
    console.log("log2",cou,"[",x+1,y+1,"]");
    console.log("log3",cou,"[",x+2,y+2,"]");*/

    let checkDiagonal = []
    let checkDiagonalDIV = []
    let suma = 0;

    for (let Pmove=0;Pmove<winPonints;Pmove++) {
            //console.log("GG",i+Pmove,"|",j+Pmove);
            x=i+Pmove;
            y=j+Pmove;
            checkDiagonal.push([x,y]); //push coordinate of div
            checkDiagonalDIV.push(GameTable[x][y]); //push DIV get by coordinates

            if (GameTable[x][y].style.backgroundColor === currentPlayer.Color) {
                suma++;
                WINpositions.push(GameTable[x][y]);
                if (suma===winPonints) {
                    //return alert(currentPlayer.FirstName+ "has won by SKOS LR");
                    return gameWIN(currentPlayer,WINpositions);
                }
            } else {
                suma=0;
                WINpositions = [];
            }
    }
}


function checkSKOS_RL(GameTable,i,j,currentPlayer) {
    WINpositions = []; //list to collect winner position

    let checkDiagonal = []
    let checkDiagonalDIV = []
    let suma = 0;

    for (let Pmove=0;Pmove<winPonints;Pmove++) {
            //console.log("GG",i+Pmove,"|",j+Pmove);
            x=i+Pmove;
            y=j-Pmove;
            checkDiagonal.push([x,y]); //push coordinate of div
            checkDiagonalDIV.push(GameTable[x][y]); //push DIV get by coordinates

            if (GameTable[x][y].style.backgroundColor === currentPlayer.Color) {
                suma++;
                WINpositions.push(GameTable[x][y]);
                if (suma===winPonints) {
                    //return alert(currentPlayer.FirstName+ "has won by SKOS RL");
                    return gameWIN(currentPlayer,WINpositions);
                }
            } else {
                suma=0;
                WINpositions = [];
            }
    }
}



/////////////////////////////////////DECORATION STYLE
function backlight(columnID) {
    const column = getDivsColumn(size);
    //console.log("LISTA", column);
    //console.log("Element", column[1])
    const DIVprefix = "DIVid";

    for (DIV of column[columnID]) {
        const currentID = DIV.slice(5); //separete id number from id name
        let currentDIV = document.getElementById(DIVprefix+currentID);
        //console.log(currentDIV);
        currentDIV.style.opacity = '0.3';
    }
}


function backlightOFF(columnID) {
    const column = getDivsColumn(size);
    const DIVprefix = "DIVid";

    for (DIV of column[columnID]) {
        const currentID = DIV.slice(5); //separete id number from id name
        let currentDIV = document.getElementById(DIVprefix+currentID);
        currentDIV.style.opacity = '1';
    }
}


function gameWIN(currentPlayer,WINpositions){
    alert(currentPlayer.FirstName+" has won the game!")
    console.log("Win positions:",WINpositions);
    let move = 0
    for (div of WINpositions) {
        move++;
        div.className = "winStyle";
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//see all vaariable in F12:
/*
for(var b in window) {
  if(window.hasOwnProperty(b)) console.log(b);
}*/



//okienko z aktualną sytuacja - kogo ruch, który tuch, itp
//rozbic to na fukncje
//currentPlayer wywoływane tlyko raz na ruch gracza
//endgame = draw