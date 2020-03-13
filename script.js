let mineField = [];

//populate minefield with mines and length

function createMineField (size, numMines){
  for(let i=0; i<size; i++){
    mineField = mineField.concat(0)
  };
  
  for(let j=0; j<numMines; j++){
    loadMineField(mineField);
  };
  return cutMineFieldIntoRows(mineField);
};

function loadMineField(field){
  let randomLocation = Math.floor(Math.random()*Math.floor(field.length))

  if(field[randomLocation]=== 'b'){
    loadMineField(field)
  }else{
    field[randomLocation]='b'
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
  }
  console.log(mineFieldRows)
  return addNumbersToMineField(mineFieldRows)
}



function addNumbersToMineField(rowed){
  for(let i=0; i<rowed.length; i++){
    let prev;
    let curr = rowed[i];
    let next;
    if(rowed[i-1]){
      prev = rowed[i-1]
    } else {
      prev = null
    }

    if(rowed[i+1]){
      next=rowed[i+1]
    } else {
      next = null
    }

    for(let j=0; j<curr.length; j++){
      if(curr[j] ===  'b'){
        if(next){
          
          if(next[j-1]){next[j-1]+=1}
          if(next[j+1]){next[j+1]+=1}//stop this from adding 1 to a string
          next[j] +=1
        }
        if(prev){

        }

        /*const doesPlaceExist = [, curr[j-1], curr[j+1], prev[j-1], prev[j], prev[j+1]]
        for(let k=0; k<doesPlaceExist.length; k++){
          if(typeof doesPlaceExist[k] === 'number'){
            console.log('adding')
            doesPlaceExist[k]++
          }
        }*/
      }

      
    }
    
  }

  return console.log(rowed)
};

//populate game borad with numbers and bombs
function fillGameBox(mineField){
  console.log(mineField)
  /*let gameBoxContents = '';
  for (let i=0; i<mineField.length; i++){
    gameBoxContents = gameBoxContents.concat(`<div class="grid-item">${mineField[i]}</div>`)
  }
  $('.gamebox').append(gameBoxContents)*/
}

createMineField(20, 5);

//fillGameBox(mineField);