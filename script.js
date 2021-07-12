$(document).ready(function(){
  let mineField = [];

  //build minefiled of variable size and variable number of mines
  function createMineField (size, numMines){
    for(let i=0; i<size; i++){
      mineField = mineField.concat(0);
    };
    
    for(let j=0; j<numMines; j++){
      loadMineField(mineField);
    };

    return cutMineFieldIntoRows(mineField);
  };
  
  //place a mine in a random location
  function loadMineField(field){
    let randomLocation = Math.floor(Math.random()*Math.floor(field.length));
  
    if(field[randomLocation]=== 'b'){//if there is a mine ther already run function again
      loadMineField(field);
    }else{
      field[randomLocation]='b';
      return field;
    }
  };
  
  //cut array for a 4 column gameboard with 5 rows
  function cutMineFieldIntoRows(mineField){
    let mineFieldRows = [];
    let rowCount = 0;

    for(let i=0; rowCount<5; i+=4){
      let row= [];
      row = row.concat(mineField.slice(i, i+4));
      mineFieldRows[rowCount]=row;
      rowCount++;
    }

    return addNumbersToMineField(mineFieldRows);
  }
  
  //build clues to mine locations
  function addNumbersToMineField(rowed){
    for(let i=0; i<rowed.length; i++){
      let prev;
      let curr = rowed[i];
      let next;
      if(rowed[i-1]){
        prev = rowed[i-1];
      } else {
        prev = null;
      }
  
      if(rowed[i+1]){
        next=rowed[i+1];
      } else {
        next = null;
      }
  
      for(let j=0; j<curr.length; j++){
        if(curr[j] ===  'b'){
          if(next){
            if(typeof next[j-1] === 'number'){next[j-1] += 1};
            if(typeof next[j+1] === 'number'){next[j+1] += 1};
            if(typeof next[j] === 'number'){next[j] += 1};
          }
          if(prev){ 
            if(typeof prev[j-1] === 'number'){prev[j-1] += 1};
            if(typeof prev[j+1] === 'number'){prev[j+1] += 1};
            if(typeof prev[j] === 'number'){prev[j] += 1};
          }
          if(typeof curr[j-1] === 'number'){curr[j-1] += 1};
          if(typeof curr[j+1] === 'number'){curr[j+1] += 1};
        }
      }
    }
    return fillGameBox(rowed);
  };
  
  //render game borad with numbers and bombs
  function fillGameBox(mineField){
    let gameBoxContents = '';

    for(let i=0; i<mineField.length; i++){
      for(let j=0; j<mineField[i].length; j++){

        if(mineField[i][j] === 'b'){ //place mine at that location
          gameBoxContents = gameBoxContents.concat(`<button value='${mineField[i][j]}' class="grid-item detonate"></button>`);
        }else{ //place number clue at that location
          gameBoxContents = gameBoxContents.concat(`<button value='${mineField[i][j]}'  class="grid-item">${mineField[i][j]}</button>`);
        }
      }
    }
    $('.gamebox').empty(); //clear previous gameboard
    $('.gamebox').append(gameBoxContents); //input new gameboard
  }

  //set bomb counter
  let bombCount = 5;
  $('.bombCounter').append(`Bombs Left: ${bombCount}`);
  let winCoundDown = 15; //counts non-bomb spaces explored. When 0 player wins

  /*  game controls  */
  //mouse controls
  $('.gamebox').on('click', '.grid-item', event=> { 

    if(!exploreFunctionToggle){//if exploring mode...

      if($(event.target).attr('class') === 'grid-item flagged'){//location has been flagged
        return; //do nothing

      } else {//location has not been flagged
        if(event.target.value === 'b'){  //if the location is a bomb => end game
          $(event.target).css({'background-color': '#FF0000', 'color': 'black'});
          $('i').remove('.flag');
          $('.detonate').empty().append("<i class='fa fa-bomb boom' aria-hidden='true'></i>");
          $('.winLose').append('You Lose').css({
              'display': 'inherit',
              'background': '#FF0000', 
              'border': '4px solid rgb(75, 70, 110)'
            });
          $('.grid-item').css({'pointer-events': 'none'});
        } else { //if the location is not a bomb => explore space
          winCoundDown = winCoundDown - 1;
          $(event.target).css({
              'font-size': '30px',
              'background-color': 'black',
              'color': 'white',
              'pointer-events': 'none'
            });
        }
        //win condition
        if(winCoundDown === 0){ //if all non-bomb spaces are explored player wins
          $('.grid-item').css({'pointer-events': 'none'});
          $('.winLose').append('YOU WIN!').css({
            'display': 'inherit',
            'background-color': 'rgb(233, 233, 20)',
            'border': '4px solid rgb(75, 70, 110)',
          });
        }
      }
    } else if(exploreFunctionToggle){//if in flagging mode...
          //if it is flagged => unflag it
      if($(event.target).hasClass('flagged')){ //for clicks on grid item
        updateBombCounter(+1);
        $(event.target).removeClass('flagged');
        $(event.target).children('.flag').remove();

      } else if($(event.target).hasClass('flag')){ //for clicks on image in grid item
        updateBombCounter(+1);
        $(event.target).parent().removeClass('flagged');
        $(event.target).remove();

      } else if(!$(event.target).hasClass('flagged')){//it is not flagged => flag it
        console.log('not flagged')
        updateBombCounter(-1);
        $(event.target).addClass('flagged').append('<i class="fa fa-flag flag"></i>');
      }
    }
  })

  //update bomb counter based on number of flags on the gameboard
  function updateBombCounter(count){
    bombCount= bombCount + count;
    $('.bombCounter').empty();
    $('.bombCounter').append(`Bombs Left: ${bombCount}`);
  }


  $('.gamebox').on("mousedown", ".grid-item", function (e){
    if (e.which === 3){ //on right click
      e.preventDefault();

      if($(e.target).hasClass('flagged')){//it is flagged => unflag it
        updateBombCounter(+1);
        $(e.target).removeClass('flagged');
        $(e.target).children('.flag').remove()

      } else if($(e.target).hasClass('flag')){
        updateBombCounter(+1);
        $(e.target).parent().removeClass('flagged');
        $(e.target).remove();

      } else {//it is not flagged => flag it
        updateBombCounter(-1);
        $(e.target).addClass('flagged').append('<i class="fa fa-flag flag" aria-hidden="true"></i>');
      }
    }
  });


  let exploreFunctionToggle = false;

  $('input[type=checkbox]').on('click', event=> {
    exploreFunctionToggle = event.target.checked;
  })

  $('.sliderBox').on('touchstart', event=> {
    $('#checkbox').prop('checked', function( i, val ) {
      return !val;
    });
    exploreFunctionToggle = !exploreFunctionToggle;
  })

  createMineField(20, 5);
})