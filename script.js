let mineField = [];

//populate minefield with mines and length

function createMineField (size, numMines){
  for(let i=0; i<size; i++){
    mineField = mineField.concat('_')
  }
  
  for(let j=0; j<numMines; j++){
    loadMineField(mineField);
    
  }
  return mineField;
}

function loadMineField(field){
  let randomLocation = Math.floor(Math.random()*Math.floor(field.length))

    if(field[randomLocation]=== '**'){
      loadMineField(field)
    }else{
      field[randomLocation]='**'
      return field
    }

}

function shuffle(randomArray) {
            var tmp, current, top = randomArray.length;
            if(top) while(--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = randomArray[current];
                randomArray[current] = randomArray[top];
                randomArray[top] = tmp;
            };
        return randomArray;
    }

console.log(createMineField(25, 3))