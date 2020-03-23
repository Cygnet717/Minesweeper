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
      if(mineField[i][j] === 'b'){
        gameBoxContents = gameBoxContents.concat(`<button value='${mineField[i][j]}' style='font-size: 0' class="grid-item"><img class='boom' alt='bomb' src='002-danger.png'></img>${mineField[i][j]}</button>`)
      }else{
        gameBoxContents = gameBoxContents.concat(`<button value='${mineField[i][j]}' class="grid-item">${mineField[i][j]}</button>`)
      }
      
    }
  }
  $('.gamebox').append(gameBoxContents)
}

$(document).ready(function(){
  let bombCount = 5;
  $('.bombCounter').append(`Bombs Left: ${bombCount}`)
  let winCoundDown = 15;

  //game controls
  //mouse controls
  $('.grid-item').on('click', event=> { 
    if(!exploreFunctionToggle){//if exploring mode
      if($(event.target).attr('class') === 'grid-item flagged'){//has been flagged
        return;
      } else {//has not been flagged
        if(event.target.value === 'b'){//if value is a bomb => end game
          $(event.target).css({'background-color': 'rgb(184, 18, 27)', 'font-size': '0'})
          $('img').remove('.flag')
          $('.boom').css({'display': 'inline'})
          $('.winLose').append('You Lose').css({
              'background': 'rgb(184, 18, 27)', 
              'font-weight': 'bolder',
            })
          $('.grid-item').css({'pointer-events': 'none'})
        } else {
          winCoundDown = winCoundDown - 1;
          $(event.target).css({//not a bomb => explore space
              'background-color': 'black',
              'color': 'white',
              'pointer-events': 'none'
            })
        }
        //win condition
        if(winCoundDown === 0){
          $('.grid-item').css({'pointer-events': 'none'})
          $('.winLose').append('YOU WIN!').css({
            'border': '2px solid #B5ACF2', 
            'background-color': '#DDC8E1',
          })
        }
      }
    } else if(exploreFunctionToggle){//if flagging mode
      if($(event.target).attr('class') === 'grid-item flagged'){//it is flagged => unflag it
        updateBombCounter(+1);
        $(event.target).removeClass('flagged')
        $(event.target).children('.flag').remove()
      } else if($(event.target).attr('class') === 'flag'){
        updateBombCounter(+1);
        $(event.target).parent().removeClass('flagged')
        $(event.target).remove()
      } else {//it is not flagged => flag it
        updateBombCounter(-1);
        $(event.target).addClass('flagged').append('<img class="flag" alt="flag" src="003-problem.png"/>')
        
      }
    }
    
  })

  function updateBombCounter(count){
    bombCount= bombCount + count;
    $('.bombCounter').empty();
    $('.bombCounter').append(`Bombs Left: ${bombCount}`)
  }

  $('.grid-item').on('contextmenu', e=>{
    e.preventDefault();
    if($(event.target).attr('class') === 'grid-item flagged'){//it is flagged => unflag it
      updateBombCounter(+1);
        $(event.target).removeClass('flagged')
        $(event.target).children('.flag').remove()
      } else if($(event.target).attr('class') === 'flag'){
        updateBombCounter(+1);
        $(event.target).parent().removeClass('flagged')
        $(event.target).remove()
      } else {//it is not flagged => flag it
        updateBombCounter(-1);
        $(event.target).addClass('flagged').append('<img class="flag" alt="flag" src="003-problem.png"/>')
      }
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