(function() {
  var canvas = $('#canvas'); //my placement area, the paper to your drawing
  var updateGridButton = $('#update-grid-button');
  var resetGridButton = $("#reset-grid-button");
  var numberOfRowsInput = $('#number-of-rows');
  var numberOfColsInput = $('#number-of-cols');

  $(document).ready(function(){

    var player = SC.Widget($('iframe.sc-widget')[0]);
    var pOffset = $('.player').offset();
    var pWidth = $('.player').width();
    var scrub;

    player.bind(SC.Widget.Events.READY, function() {
      setInfo();
      player.play();
    }); //Set info on load

    player.bind(SC.Widget.Events.PLAY_PROGRESS, function(e) {
      if( e.relativePosition < 0.003 ) { setInfo(); }
      //Event listener when track is playing
      $('.position').css('width', ( e.relativePosition*100)+"%");
    });

     $('.player').mousemove(function(e){ //Get position of mouse for scrubbing
      scrub = (e.pageX-pOffset.left);
    });

    $(document).on('keydown', function(e){
      switch(e.keyCode){
        case 32:
          player.toggle();
        break;
        case 39:
          player.next();
        break;
        case 37:
          player.prev();
        break;
      }
    });

    $('.player').click(function(){ //Use the position to seek when clicked
      $('.position').css('width',scrub+"px");
      var seek = player.duration*(scrub/pWidth);

      //Seeking to the start would be a previous?
      if ( seek < player.duration * .05 ) {
        player.prev();
      } else if ( seek > player.duration * .99 ) {
        player.next();
      } else {
        player.seekTo(seek);
      }

    });

     function setInfo() {
      player.getCurrentSound(function(song) {

          // Soundcloud just borked this api endpoint, hence this hack :/
          var waveformPng =
              song.waveform_url
                  .replace('json', 'png')
                  .replace('wis', 'w1');

          var artworkUrl = song.artwork_url || '';

         console.log(song);

        $('.waveform').css('background-image', "url('" + waveformPng + "')");
        $('.player').css('background-image', "url('" + artworkUrl.replace('-large', '-t500x500') + "')");

        var info = song.title;
        $('.info').html(info);

        player.current = song;
      });

      player.getDuration(function(value){
        player.duration = value;
      });

      player.isPaused(function(bool){
        player.getPaused = bool;
      });
    }

  });

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
