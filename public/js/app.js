(function() {
  var canvas = $('#canvas'); //my placement area, the paper to your drawing
  var updateGridButton = $('#update-grid-button');
  var resetGridButton = $("#reset-grid-button");
  var numberOfRowsInput = $('#number-of-rows');
  var numberOfColsInput = $('#number-of-cols');

  makeGrid(15, 15); //tells js to run the function
  $('.cell').on('click', changeColor);
  updateGridButton.on('click', updateGridSize);
  resetGridButton.on('click', resetGrid);


  function updateGridSize(){
    clearGrid();

    var newColNumber = parseInt(numberOfColsInput.val()); //nothing in parenteses means "go get it from user"
    var newRowNumber = parseInt(numberOfRowsInput.val());
    makeGrid(newColNumber, newRowNumber);
    $('.cell').on('click', changeColor);
  }

function clearGrid(){
  canvas.empty();
}

function resetGrid(){
  canvas.empty();
  makeGrid(15,15);
  $('.cell').on('click', changeColor);
}

//my add on
$('#number-of-rows').change(maxInputRow);

  function maxInputRow(){
    var max = parseInt($(this).attr('max'));
    if ($(this).val() > max){
      $(this).val(max);
    }
  }

  $('#number-of-cols').change(maxInputCol);

    function maxInputCol(){
      var max = parseInt($(this).attr('max'));
      if ($(this).val() > max){
        $(this).val(max);
      }
    }

  function changeColor(event){
    $(this).toggleClass('red');
  }

  function makeGrid(numberOfRows, numberOfCols){ //my addition: making a function allows us to determine when a function runs
  //make rows and put in body
  for(var rowCount = 0; rowCount < numberOfRows; rowCount += 1){ //continue to count while count is less than 15
    console.log(rowCount);
    var row = $('<tr></tr>');
    for(var colCount =0; colCount < numberOfCols; colCount += 1){
      var column = $('<td></td>');
      column.addClass('cell');
      row.append(column);

    }
    canvas.append(row);
  }
}
}());
