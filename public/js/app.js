(function() {
  var numberOfRows = 15; //rows in grid
  var numberOfCols = 15; //col in grid
  var canvas = $("canvas"); //my placement area, the paper to your drawing

  makeGrid(); //tells js to run the function
  $('.cell').on('mouseover', changeColor);

  function changeColor(event){
    $(this).toggleClass('red');
  }

  function makeGrid(){ //my addition: making a function allows us to determine when a function runs
  //make rows and put in body
  for(var rowCount = 0; rowCount < nmberOfRows; rowCount +=1){ //continue to count while count is less than 15
    var row = $('<tr><tr>');
    for(var colCount =0; colCount < numberOfCols; colCount += 1){
      var column = $('<td></td>');
      column.addClass('cell');
      row.append(column);

    }
    canvas.append(row);
  }
}
}());
