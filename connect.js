var p1=prompt("You are player 1,your color is blue,your good name?")
var p1color="rgb(86, 151, 255)";
var p2=prompt("You are player 2,your color is red,your good name?")
var p2color="rgb(237, 45, 73)";
var gameon=true;
var table=$('table tr')
function reportWin(rownum,colnum){
  console.log("You won starting at this row,col");
  console.log(rownum);
  console.log(colnum);
}
function changecolor(rowindex,colindex,color){
  return table.eq(rowindex).find('td').eq(colindex).find('button').css('background-color',color);

}
function returncolor(rowindex,colindex){
  return table.eq(rowindex).find('td').eq(colindex).find('button').css('background-color');

}
function checkbottom(colindex){
  var colorreport=returncolor(5,colindex);
  for (var row = 5; row > -1; row--) {
    colorreport=returncolor(row,colindex);
    if (colorreport==='rgb(128, 128, 128)'){
      return row
    }
  }
}

function colormatchcheck(one,two,three,four){
  return (one===two && one===three && one===four && one !=='rgb(128, 128, 128)' && one !==undefined);

}
function horizontalWincheck(){
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 4; col++) {
      if(colormatchcheck(returncolor(row,col),returncolor(row,col+1),returncolor(row,col+2),returncolor(row,col+3))){
        console.log("horiz");
        reportWin(row,col);
        return true;
      }
    }
  }
}
function verticalwincheck(){
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 3; row++) {
      if (colormatchcheck(returncolor(row,col),returncolor(row+1,col),returncolor(row+2,col),returncolor(row+3,col))) {
        console.log('vertical');
        reportWin(row,col);
        return true;
      }

    }
  }
}
function diagonalwincheck(){
  for (var col = 0; col < 5; col++) {
    for (var row = 0; row < 7; row++) {
      if(colormatchcheck(returncolor(row,col),returncolor(row+1,col+1),returncolor(row+2,col+2),returncolor(row+3,col+3))){
        console.log(diagonal);
        reportWin(row,col);
        return true;
      }
      else if (colormatchcheck(returncolor(row,col),returncolor(row-1,col+1),returncolor(row-2,col+2),returncolor(row-3,col+3))) {
        console.log('diag');
        reportWin(row,col);
        return true
      }

    }
  }
}
function gameend(winningplayer){
  for(var col=0;col<7;col++){
    for (var row = 0; row<7; row++) {
      $('h3').fadeOut('fast')
      $('h2').fadeOut('fast')
      $('h1').text(winningplayer+"has won! Refresh your browser to play again!").css("fontSize","50px")

    }
  }
}
var currentplayer=1
var currentname=p1
var currentcolor=p1color
$('h3').text(p1+": It is your turn,please pick a column to drop your blue chip.");
$('.board button').on('click',function(){
  var col=$(this).closest('td').index();
  var bottomAvail=checkbottom(col)
  changecolor(bottomAvail,col,currentcolor);
  if (horizontalWincheck()||verticalwincheck()||diagonalwincheck()){
    gameend(currentname)
  }
  currentplayer=currentplayer*-1;
  if(currentplayer===1){
    currentname=p1;
    $('h3').text(currentname+": it is your turn,please pick a column to drop your blue chip.");
    currentcolor=p1color;
  }
  else{
    currentname=p2
    $('h3').text(currentname+": it is your turn,please pick a column to drop your red chip.");
    currentcolor=p2color
  }
})
