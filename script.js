//alert("START")


/*//FIRST WAY
size = 5;
generate_board(5);
function generate_board(size) {
    var my_div = null;
/!*!//working
    //create new DIV and put into some content
    newDiv = document.createElement("div");
    newDiv.innerHTML = "<h1>Hi there and greetings!</h1>";

  // add the newly created element and it's content into the DOM
    const main_div = document.getElementById("main");
    //document.body.insertBefore(newDiv, main_div); //add before selected
    main_div.innerHTML = newDiv;*!/

    const main_div = document.getElementById("main");
    const newLine = document.createElement('br');
    let counter =0;
    for (let i=1;i<=size;i++) {
        counter+=1;
        for (let j=1;j<=size;j++) {
            newDiv = document.createElement("div");
            newDiv.className = "line";
            newDiv.innerText = i;
            main_div.appendChild(newDiv)
        }
        const testElement = document.querySelector('div');
        const lineBreak = document.createElement('br');
        testElement.appendChild(lineBreak);
    }
}*/

//////////////////////////////////////////
//SECOND WAY
/*
function generateLine(size) {
    const main_div = document.getElementById("main");
    const newLine = document.createElement('br');
    let counter =0;
    for (let i=1;i<=size;i++) {
        newDiv = document.createElement("div");
        newDiv.className = "line";
        newDiv.innerText = i;
        main_div.appendChild(newDiv)
        console.log(counter);
        }
}


function elo(size) {
    const inside_divs = document.getElementsByTagName('div');
    console.log("INS",inside_divs);
    const newLine = document.createElement('p');
    for (let i=1;i<=size;i++) {
        generateLine(5);

        //put ENTER after line
        const testElement = document.querySelector('div');
        const lineBreak = document.createElement('br');
        testElement.appendChild(lineBreak);
    }
}

elo(5);*/


////////////////
//third way

//GLOBAL VARRIABLE
//var size = prompt("Select table size (2-9) - !dopracowac szerokosc!");
const size = 5;
const players_count = 2; //nie dopracowane dla wiecej
var global_counter=0;
///////



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

        currentDivID = oneDiv.id.slice(5,8); //get ID in range 0-999

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



//////////////////////////////////
var PLAYERS = createPlayer(players_count);
//console.log("Gracze: ",PLAYERSx);
generateTable(size);
addENDbutton();
DivsID = getDivsColumn(size);
console.log('Created game board:\n', DivsID);



function createPlayer(count) {
    players = []
    for (i=1;i<=count;i++) {
        const name = prompt("Give your name");
        var Player = {
            FirstName: name,
            ID: i,
            Color:null,
            Selected: []
        };
        if (i===1) {Player.Color='red'} else {Player.Color='blue'};
        players.push(Player);
    }
    console.log("Created players:",players);
    //alert("Hello 1st, "+players[0].FirstName);
    return players;
}


function SelectPlayer() {
    if (global_counter%2===0) {
        currentPlayer = PLAYERS[0];
    } else {
        currentPlayer = PLAYERS[1];
    }

    return currentPlayer;
}


function SelectDiv(column,size) {

    currentPlayer = SelectPlayer();
    alert("MOve: "+currentPlayer.FirstName);

    defaultClass = 'line';
    selectedClass = 'selectedLine';
    //alert("Puts into column"+column+"active!");

    const allDiv = document.getElementsByClassName('line'); //get all DIVs(game board)

    const DivsID = getDivsColumn(size); //get ID of all DIVs (game board positions)
    const selectedColumn = DivsID[column]; //list of DIVs in selected column

    console.log("Divs ID in selected column :", selectedColumn); //list with DIVs id from selected column

    //check DIVs class in selected column, from down to up - if default chenge to selected and return = change only one
    for (let i=selectedColumn.length-1;i>=0;i--) {
        console.log("\tChecking element..",selectedColumn[i]);
        const currentDIV = document.getElementById(selectedColumn[i]);
        if (currentDIV.className === defaultClass) {
            //alert("Zmiana koloru");
            currentDIV.className = selectedClass;
            currentDIV.style.backgroundColor =currentPlayer.Color;
            return global_counter++;
        }
    }
}


//see all vaariable in F12:
/*
for(var b in window) {
  if(window.hasOwnProperty(b)) console.log(b);
}*/
