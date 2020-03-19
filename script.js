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
          if(typeof next[j-1] === 'number'){next[j-1] += 1}
          if(typeof next[j+1] === 'number'){next[j+1] += 1}
          if(typeof next[j] === 'number'){next[j] += 1}
        }
        if(prev){ 
          if(typeof prev[j-1] === 'number'){prev[j-1] += 1}
          if(typeof prev[j+1] === 'number'){prev[j+1] += 1}
          if(typeof prev[j] === 'number'){prev[j] += 1}
        }
        if(typeof curr[j-1] === 'number'){curr[j-1] += 1}
        if(typeof curr[j+1] === 'number'){curr[j+1] += 1}
      }
    }
  }
  return fillGameBox(rowed)
};

//populate game borad with numbers and bombs
function fillGameBox(mineField){
  let gameBoxContents = '';
  for(let i=0; i<mineField.length; i++){
    for(let j=0; j<mineField[i].length; j++){
      gameBoxContents = gameBoxContents.concat(`<button value='${mineField[i][j]}' class="grid-item">${mineField[i][j]}</button>`)
    }
  }

  $('.gamebox').append(gameBoxContents)
}

$(document).ready(function(){

  //mouse controls
  $('.grid-item').on('click', event=> {  
    if(exploreFunctionToggle){
      if(event.target.value === 'b'){
      $(event.target).css({'background-color': 'red'})
    } else {
      $(event.target).css({'background-color': 'black'})
    }
    return false;
    } else {
      $(event.target).css({'background-color': 'orange', 'color': 'orange'})
    }
    
  })

  $('.grid-item').on('contextmenu', e=>{
    e.preventDefault();
    $(e.target).css({'background-color': 'orange', 'color': 'orange'})
  })

  //touch screen controls
  let exploreFunctionToggle = true;

  $('input[type=checkbox]').on('click', event=> {
    exploreFunctionToggle = !exploreFunctionToggle
  })

  

})


createMineField(20, 5);