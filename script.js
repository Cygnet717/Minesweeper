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
  let bombCount = 5;
  $('.bombCounter').append(`Bombs Left: ${bombCount}`)

  //mouse controls
  $('.grid-item').on('click', event=> { 
    
    if($(event.target).attr('class') !== 'grid-item flagged'){//if not flagged 
      if(!exploreFunctionToggle){//if exploring
        if(event.target.value === 'b'){//if value is a bomb
          //end game
          $(event.target).css({'background-color': 'red'})
          $('.winLose').append('You Lose').css({
              'color': 'red', 
              'font-weight': 'bolder',
              'border': '2px solid red'
            })
          $('.grid-item').css({'pointer-events': 'none'})
        } else {
          $(event.target).css({//not a bomb explore space
              'background-color': 'black',
              'color': 'white'
            })
        }
        return false;
      } else {//not exploring => flag it
        bombCount = bombCount -1;
        $('.bombCounter').empty();
        $('.bombCounter').append(`Bombs Left: ${bombCount}`)
        $(event.target).addClass('flagged')
        $(event.target).css({'background-color': 'orange', 'color': 'orange'})
      }
    } else if($(event.target).attr('class') === 'grid-item flagged'){//already flagged => unflag it
      bombCount = bombCount +1;
      $('.bombCounter').empty();
      $('.bombCounter').append(`Bombs Left: ${bombCount}`)
      $(event.target).removeClass('flagged')
      $(event.target).css({'background-color': 'white', 'color': 'white'})
    }
  })

  $('.grid-item').on('contextmenu', e=>{
    e.preventDefault();
    bombCount = bombCount -1;
    $('.bombCounter').empty();
    $('.bombCounter').append(`Bombs Left: ${bombCount}`)
    $(event.target).addClass('flagged')
    $(e.target).css({'background-color': 'orange', 'color': 'orange'})
  })

  //touch screen controls
  let exploreFunctionToggle = false;

  $('input[type=checkbox]').on('click', event=> {
    exploreFunctionToggle = event.target.checked
  })

  $('.sliderBox').on('touchstart', event=> {
    $('#checkbox').prop('checked', function( i, val ) {
      return !val;
    });
    exploreFunctionToggle = !exploreFunctionToggle
  })


})


createMineField(20, 5);