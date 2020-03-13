let mineField = [];

//populate minefield with mines and length

function createMineField (size, numMines){
  for(let i=0; i<size; i++){
    mineField = mineField.concat('_')
  };
  
  for(let j=0; j<numMines; j++){
    loadMineField(mineField);
  };
  return cutMineFieldIntoRows(mineField);
};

function loadMineField(field){
  let randomLocation = Math.floor(Math.random()*Math.floor(field.length))

  if(field[randomLocation]=== '**'){
    loadMineField(field)
  }else{
    field[randomLocation]='**'
    return field
  }
};

function shuffle(randomArray) {
  var tmp, current, top = randomArray.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = randomArray[current];
    randomArray[current] = randomArray[top];
    randomArray[top] = tmp;
  };
  return randomArray;
};

//cut array for a 4 column gameboard with 5 rows
function cutMineFieldIntoRows(mineField){
  let mineFieldRows = [];
  let rowCount = 0;
  for(let i=0; rowCount<5; i+=4){
    let row= [];
    row = row.concat(mineField.slice(i, i+4))
    mineFieldRows[rowCount]=row
    rowCount++
    console.log(rowCount)
  }
 //mineField = mineFieldRows;
  
  return console.log(mineFieldRows)
}



/*function addNumbersToMineField(mineField){
  for(let i=0; i<mineField.length; i++){
    let count =0;
    if()
  }
};*/

//populate game borad with numbers and bombs
function fillGameBox(mineField){
  let gameBoxContents = '';
  for (let i=0; i<mineField.length; i++){
    gameBoxContents = gameBoxContents.concat(`<div class="grid-item">${mineField[i]}</div>`)
  }
  $('.gamebox').append(gameBoxContents)
}

createMineField(20, 5);

fillGameBox(mineField);