
//GLOBAL VARRIABLE
let size = 8;
var global_counter=0;
let PlayersCount = 2;
var winPonints = 3; //has to be less than size
let PLAYERS="";
let initDefined=false;
/////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

askInput();

function initGame() {

    if (initDefined===false) {
        PLAYERS = createPlayer(PlayersCount);
    }
        size = prompt("Select table size (2-9) - !dopracowac szerokosc!");
        size = parseInt(size, 0);

        setScreen(size);
        generateTable(size);
        addENDbutton();

        DivsID = getDivsColumn(size);
        console.log('Created game board:\n', DivsID);
        gameStats();
        initDefined=true;
}
/////////////////////////////////////////////////////////

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
    const EndButtons = document.createElement('div');
    EndButtons.id = 'EndButtons';
    main_div.appendChild(EndButtons)

    //1. Create the button RESTART
    const button = document.createElement("button");
    button.innerHTML = "RESTART";
    //2. Append into DOM
    EndButtons.appendChild(button);
    //3. Add event handle
    button.addEventListener("click", function () {
        window.location.reload(true);
        });
    //1. Create the button PLAY AGAIN
    const button2 = document.createElement("button");
    button2.innerHTML = "PLAY AGAIN";
    //2. Append into DOM
    EndButtons.appendChild(button2);
    //3. Add event handle
    button2.addEventListener("click", function () {
        const NewRound = document.getElementById("main");
        NewRound.innerHTML = ''; //clear div 'main' before restart the game
        global_counter=0;
        initGame();
        });
}


function gameStats() {
        mainDIV = document.getElementById('main');
        // 1. Create the button
        let DIVstats = document.createElement("div");
        DIVstats.innerHTML = "CURRENT Player: ";
        DIVstats.id = "stats";
        const newLineHR = document.createElement('hr');
        var playerName = document.createElement('div');
        playerName.id="playerNameCURRENT";
        playerName.innerHTML = PLAYERS[0].FirstName;
        // 2. Append somewhere
        mainDIV.appendChild(newLineHR);
        mainDIV.appendChild(DIVstats);
        DIVstats.appendChild(playerName);

        //DIV player list
        let DIVlist = document.createElement("div");
        DIVlist.id = "DIVplayersList";
        DIVstats.appendChild(DIVlist);
        for (let i=0;i<PLAYERS.length;i++) {
            let DIVplayer = document.createElement("div");
            DIVplayer.id = "DIVplayer"+i;
            DIVplayer.innerHTML = PLAYERS[i].FirstName;
            DIVplayer.style.border = '1px solid black';
            DIVlist.appendChild(DIVplayer);
        }

        //NEXT PLAYER
        // 1. Create the button
        let DIVstatsNEXT = document.createElement("div");
        DIVstatsNEXT.innerHTML = "NEXT Player: ";
        DIVstatsNEXT.id = "statsNEXT";
        var playerNameNEXT = document.createElement('div');
        playerNameNEXT.id="playerNameNEXT";
        playerNameNEXT.innerHTML = PLAYERS[1].FirstName;
        // 2. Append somewhere
        mainDIV.appendChild(DIVstatsNEXT);
        DIVstatsNEXT.appendChild(playerNameNEXT);

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
        //JavaScript variables data type is not defined, +'X' to convert both to string (to be comparable)
        /*console.log("DEBUG_line168| Line length:",typeof (tmp_row.length),"SIZE",typeof (size));*/
        if (tmp_row.length+'X' === size+'X') {
            GameTable.push(tmp_row);
            tmp_row = [];
        }
    }
    //console.log("Game table:",GameTable);
    //console.log("[1][1]",GameTable[1][1])
    return GameTable;
}


function getRandomColor(Players) {
    let colorList = ['red','blue','orange','magenta','lime'];
    min=0;
    max=colorList.length;
      min = Math.ceil(min);
      max = Math.floor(max);
      num =  Math.floor(Math.random() * (max - min)) + min;
     /* console.log("Random",num);*/

      for (let i=0;i<Players.length;i++) {
          num =  Math.floor(Math.random() * (max - min)) + min;
          max--;
          Players[i].Color = colorList[num];
          //console.log(colorList.length);
          colorList.splice(num, 1);
      }
    return Players;
}

function createPlayer(count) {
    players = []

    for (i=1;i<=count;i++) {
        const name = prompt("Give name for player"+i);
       /* name = "Player"+i;*/
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

    players = getRandomColor(players); //assign random color
    //alert("Hello 1st, "+players[0].FirstName);
    return players;
}



///////////////////////////////////////////////////////IN GAME FUNCTION
function SelectPlayer() {

/*    //TWO PLAYERS
    if (global_counter%2===0) {
        currentPlayer = PLAYERS[0];
    } else {
        currentPlayer = PLAYERS[1];
    }*/

    let PlayerIndex = global_counter;
    /*console.log("GC",global_counter)*/
    if (global_counter >= PlayersCount) {
        PlayerIndex = (global_counter%PlayersCount);
    }

    /*console.log("PI2",PlayerIndex)*/
    currentPlayer = PLAYERS[PlayerIndex];
    console.log("Current playerINDEXX:",PlayerIndex);

    if (PlayerIndex === PlayersCount-1) {nextPlayer = PLAYERS[0]} else {nextPlayer = PLAYERS[PlayerIndex+1]};


    ////////////////////////////////EDIT - the first version was one step back
    if (PlayerIndex === PlayersCount-2) {nextPlayer2 = PLAYERS[0]} else {nextPlayer2 = PLAYERS[PlayerIndex+2]};
    if (PlayerIndex === PlayersCount-1) {nextPlayer2 = PLAYERS[1]};

/*    console.log("Current player:",currentPlayer.FirstName);
    console.log("Next player:",nextPlayer.FirstName);
    currentPlayer = nextPlayer;
    nextPlayer = nextPlayer2;*/
    ///////////////////////////////////////////

    console.log("Current player:",currentPlayer.FirstName);
    console.log("Next player:",nextPlayer.FirstName);
    console.log("Next player2:",nextPlayer2.FirstName);
    console.log("____________________________________________");

    ////!!! REAGSIGNED currentPlayer => nextPlayer, nextPlayer=>nextPlayer2;

    //FORMATING DIV id='stats'
    const CURRENTplayerMove = document.getElementById('playerNameCURRENT'); //display name next moving player
    CURRENTplayerMove.innerHTML = nextPlayer.FirstName;
    CURRENTplayerMove.style.backgroundColor = nextPlayer.Color;

    const NEXTplayerMove = document.getElementById('playerNameNEXT'); //display name next moving player
    NEXTplayerMove.innerHTML = nextPlayer2.FirstName;
    NEXTplayerMove.style.backgroundColor = nextPlayer2.Color;

    //formating DIV id='DIVplayersList'
    for (let i=0;i<PLAYERS.length;i++){
        let statsCurrentPlayer = document.getElementById('DIVplayer'+i);
        statsCurrentPlayer.style.border=('1px solid black');
        statsCurrentPlayer.style.color='black';
        statsCurrentPlayer.style.backgroundColor = PLAYERS[i].Color;
            if (parseInt(statsCurrentPlayer.id.slice(9))===nextPlayer.ID-1) {
                statsCurrentPlayer.style.border=('3px solid red');
                statsCurrentPlayer.style.color='white';}
            if (parseInt(statsCurrentPlayer.id.slice(9))===nextPlayer2.ID-1) {
                statsCurrentPlayer.style.border = ('3px dashed hotpink');}
    }

    return currentPlayer;
}


function SelectDiv(column,size) {

    defaultClass = 'line';
    selectedClass = 'selectedLine';
    //alert("Puts into column"+column+"active!");

    const allDiv = document.getElementsByClassName('line'); //get all DIVs(game board)

    const DivsID = getDivsColumn(size); //get ID of all DIVs (game board positions)
    const selectedColumn = DivsID[column]; //list of DIVs in selected column

    //console.log("Divs ID in selected column :", selectedColumn); //list with DIVs id from selected column

    //check DIVs class in selected column, from down to up - if default chenge to 'selected' and return = change only one
    for (let i=selectedColumn.length-1;i>=0;i--) {
/*        console.log("\tChecking element..",selectedColumn[i]);*/
        const currentDIV = document.getElementById(selectedColumn[i]);
        if (currentDIV.className === defaultClass) {
            currentPlayer = SelectPlayer();
            currentDIV.className = selectedClass;
            currentDIV.style.backgroundColor = currentPlayer.Color;
            checkWin(currentPlayer);
            return global_counter++;
        }
    }
}



////////////////////////////////// CHECK GAME
function checkWin(currentPlayer) {

    const GameTable = getGameTable();

    // HORIZONTAL
    checkHorizontal(currentPlayer);

    //VERTICAL
    checkVertical(GameTable,currentPlayer);

    //DIAGONAL\\
    checkDiagonal(GameTable,currentPlayer);

    //console.log(global_counter+1,"|",size*size);
    if (global_counter+1 === (size*size)) {
        alert("END of GAME - draw!");
        EndGame();
    };
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


function checkVertical(GameTable,currentPlayer) {
    WINpositions = []; //list to collect winner position
    let sumaV = 0;

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


function checkDiagonal(GameTable,currentPlayer) {

    /*const GameTable = getGameTable(); //game table, index start 0,0*/

    //DIAGONAL - SKOS - Left-Right \
    for (let i=0;i<(GameTable.length-winPonints+1);i++) {
        for (let j = 0; j < (GameTable.length-winPonints+1); j++) {
            checkSKOS_LR(GameTable,i,j,currentPlayer);
        }
    }

    //DIAGONAL - SKOS - Right-Left /
    for (let i=0;i<=(GameTable.length-winPonints);i++) {
        for (let j=winPonints-1;j<GameTable.length;j++) {
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
    EndGame();
}



//////////////////////////////////////////WINDOW PROPERTY
//adjust site to user screen
function setScreen(size) {
    //get resolution of user screen
    ScreenWidth = window.screen.width
    ScreenHeight = window.screen.height
    console.log("Screen:",ScreenWidth, "x", ScreenHeight);
    //set minimum dimension
    if (ScreenWidth > ScreenHeight) {
        minScreen = ScreenHeight
    } else {
        minScreen = ScreenWidth
    };
    //set one dive size to be adjusted to game area (-350px due to buttons)
    oneDivSize = (minScreen - 350) / size;
    oneDivSize = oneDivSize + 'px';
    /*console.log(oneDivSize);*/

    //GET current value of variable from CSS file
    /*x = getComputedStyle(document.documentElement)
        .getPropertyValue('--singleDIVwidth');
    y = getComputedStyle(document.documentElement)
        .getPropertyValue('--singleDIVheight');
    console.log(x,y);*/

    //SET value of variable to CSS file
    document.documentElement.style
        .setProperty('--singleDIVwidth', oneDivSize);
    document.documentElement.style
        .setProperty('--singleDIVheight', oneDivSize);
/*    document.documentElement.style
        .setProperty('--GameBoardSize', (size*oneDivSize+10)+'px');*/
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//see all vaariable in F12:
/*
for(var b in window) {
  if(window.hasOwnProperty(b)) console.log(b);
}*/



//okienko z aktualną sytuacja - kogo ruch, który tuch, itp
//init form - ustaw inie,kolor


function askInput() {

    //1. Create HTML element
    const inputData = document.createElement("div");
    inputData.id = "inputData";
    const button = document.createElement("button");
    button.innerHTML = "StartGame!";
    //2. Append into DOM

    document.body.appendChild(inputData);
    inputData.appendChild(button);

    const newLine = document.createElement('br');
    document.body.appendChild(newLine);

    //3. Add event handle
    button.addEventListener("click", function () {
        readInput();
        //window.location.reload(true);
        });


    var option1 = document.createElement('p');
    option1.id = "players";
    option1.innerText = "SET Number of players:";
    inputData.appendChild(option1);

    for (i=2;i<=5;i++) {
        //create choose option
        var checkbox = document.createElement('input');
        checkbox.type = "radio";
        checkbox.name = "radioButton_players";
        checkbox.value = i;
        checkbox.id = "players"+i;

        var label = document.createElement('label');
        label.id = 'playersLabel';
        label.htmlFor = "id";
        label.appendChild(document.createTextNode(i+'players'));

        inputData.appendChild(checkbox);
        inputData.appendChild(label);
    }

        //Put ENTER after buttons

        var option2 = document.createElement('p');
        option2.id = "points";
        option2.innerText = "SET Number of points to win:";
        inputData.appendChild(option2);

        for (i=2;i<=10;i++) {
        //create choose option
        var checkbox = document.createElement('input');
        checkbox.type = "radio";
        checkbox.name = "radioButton_points";
        checkbox.value = i;
        checkbox.id = "points"+i;

        var label = document.createElement('label');
        label.id = 'pointsLabel';
        label.htmlFor = "id";
        label.appendChild(document.createTextNode(i+'pkt.'));

        inputData.appendChild(checkbox);
        inputData.appendChild(label);
    }
    return true;
}


function readInput() {

    let points;
    let players;
    let PlayerOptions = document.getElementsByName('radioButton_players');

    for (i=0;i<PlayerOptions.length;i++) {
        if (PlayerOptions[i].checked) {
/*            alert("Ile gra:"+ PlayerOptions[i].value);*/
            players=PlayerOptions[i].value;
        };

    }


    let PointsOptions = document.getElementsByName('radioButton_points');

    for (i=0;i<PointsOptions.length;i++) {
        if (PointsOptions[i].checked) {
/*            alert("Ile punktow:"+ PointsOptions[i].value);*/
            points=PointsOptions[i].value;
        };
    }

    alert("Game configuration: \n  \tPlayers: "+players+"\n  \tPoints: "+points);

    let HideOptions = document.getElementById('inputData');
    HideOptions.style.display = "none";

    PlayersCount=parseInt(players,0);
    winPonints=parseInt(points,0);

    return PlayersCount,winPonints,initGame();
}


function EndGame() {
    let EndButtons = document.getElementById("EndButtons");
    EndButtons.style.backgroundColor="black";
    EndButtons.style.opacity='1';
    EndButtons.style.fontSize='20px';
    EndButtons.style.padding='5px';
}