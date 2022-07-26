document.addEventListener('DOMContentLoaded', function(event){
    
	var x= "x";
	var o= "o";
	var turns= 0;
    var gameEnd = false;
	//spot vars
    var board = new Array(
        document.getElementById('spot1'),
        document.getElementById('spot2'),
        document.getElementById('spot3'),
        document.getElementById('spot4'),
        document.getElementById('spot5'),
        document.getElementById('spot6'),
        document.getElementById('spot7'),
        document.getElementById('spot8'),
        document.getElementById('spot9')
    );
    var newBoard= ['','','','','','','','',''];
    

//field click
document.getElementById('spot1').onclick = function(){
    var spotId = 'spot1';
    startTurn( spotId ); 
}
document.getElementById('spot2').onclick = function(){
    var spotId = 'spot2';
    startTurn( spotId ); 
}
document.getElementById('spot3').onclick = function(){
    var spotId = 'spot3';
    startTurn( spotId ); 
}
document.getElementById('spot4').onclick = function(){
    var spotId = 'spot4';
    startTurn( spotId ); 
}
document.getElementById('spot5').onclick = function(){
    var spotId = 'spot5';
    startTurn( spotId ); 
}
document.getElementById('spot6').onclick = function(){
    var spotId = 'spot6';
    startTurn( spotId ); 
}
document.getElementById('spot7').onclick = function(){
    var spotId = 'spot7';
    startTurn( spotId ); 
}
document.getElementById('spot8').onclick = function(){
    var spotId = 'spot8';
    startTurn( spotId ); 
}
document.getElementById('spot9').onclick = function(){
    var spotId = 'spot9';
    startTurn( spotId ); 
}


function startTurn( spotId ){
    checkGameEnd();
    
    var currentSpot = document.getElementById(spotId);
    if( currentSpot.className ==  'disable o'){
        alert('This spot is already filled');
    }    
    else if (turns%2==0){
        turns++;
        currentSpot.innerHTML = 'o';
        currentSpot.className = 'disable o';
        checkGameEnd();
        if(gameEnd == false){
            //computerTurn();
            
            
            if( spotId == 'spot1' ){
                newBoard[0] = 'o';
            }
            else if( spotId == 'spot2' ){
                newBoard[1] = 'o';
            }
            else if( spotId == 'spot3' ){
                newBoard[2] = 'o';
            }
            else if( spotId == 'spot4' ){
                newBoard[3] = 'o';
            }
            else if( spotId == 'spot5' ){
                newBoard[4] = 'o';
            }
            else if( spotId == 'spot6' ){
                newBoard[5] = 'o';
            }
            else if( spotId == 'spot7' ){
                newBoard[6] = 'o';
            }
            else if( spotId == 'spot8' ){
                newBoard[7] = 'o';
            }
            else if( spotId == 'spot9' ){
                newBoard[8] = 'o';
            }
            
            computer(newBoard);
            
        }
        
    } 
}
//reset button click 
document.getElementById('reset').onclick = function(){
    reset();
}          
    
    /*------------------------------------- computer -----------------------------------------*/    
    function computer (board){
        //get move
        var move = getBestMove(board);
        
        //do the move
        doMove(board , move);
    }
    /*--------------------------------------- do move ----------------------------------------*/
    function doMove (oldBoard , move){
        var changedNodeIndex = getChangedNode(oldBoard , move);
        
        //do move
        turns++;
        newBoard[changedNodeIndex] = 'x';
        
        board[changedNodeIndex].innerHTML = 'x';
        board[changedNodeIndex].className = 'disable x';
        checkGameEnd();
    }
    /*------------------------------------ get Best Move  ------------------------------------*/
        function getBestMove(board){
            var moves = getPossibleMoves(board);
            
            //search if any move make x win 
            for(var n=0; n < moves.length; n++){
                if( xWin(moves[n])){
                    //return this move
                    return moves[n];
                }
            }
            
            //u  se minimax to know the score of each possible move
            var possMovScores=[];
            for(var t=0; t<moves.length; t++){
                possMovScores.push(minimax(moves[t]));
            }
            // get zeros array and max score with it's index
            var maxMoveAndZeros = max(possMovScores);
            var maxMove = maxMoveAndZeros.max;
            var zeros = maxMoveAndZeros.zeros;
            
            //if max score is zero then choose the best zero "corner"
            if(maxMove.score == 0){
                //corner
                for(var x=0; x<zeros.length; x++){
                    var changedNode = getChangedNode(board , moves[zeros[x]]);
                    if(changedNode == 0 || changedNode == 2 || changedNode == 6 || changedNode == 8){
                        return moves[zeros[x]];
                    }
                }
                //center
                for(var i=0; i<zeros.length; i++){
                    var changedNode = getChangedNode(board , moves[zeros[i]]);
                    if(changedNode == 4 ){
                        return moves[zeros[i]];
                    }
                }
                //side
                for(var n=0; n<zeros.length; n++){
                    var changedNode = getChangedNode(board , moves[zeros[n]]);
                    if(changedNode == 1 || changedNode == 3 || changedNode ==5 || changedNode == 7){
                        return moves[zeros[n]];
                    }
                }
              
            }
            
            //return the best move 
            return moves[maxMove.index];
            
            
        }
        /*-------------------------------- minimax ----------------------------------------------*/
        function minimax(board){
            if(isLastNode(board)){
                return lastNodeScore(board);
            }
            var boardScore ;
            var xn = getNamberOf(board ,'x');
            var on = getNamberOf(board ,'o');
            
            if( xn.length < on.length ){// x turn choose max
                var possibleMoves = getPossibleMoves(board);
                var scores=[];
                for(var n=0; n<possibleMoves.length; n++){
                    scores.push(minimax(possibleMoves[n]));
                }
                return norMax(scores);
            }
            else if ( xn.length == on.length ){// o turn choose min
                var possibleMoves = getPossibleMoves(board);
                var scores=[];
                for(var n=0; n<possibleMoves.length; n++){
                    scores.push(minimax(possibleMoves[n]));
                }
                return min(scores);
            }
        }
        /*---------------------------------- get changed node ------------------------------------*/
        function getChangedNode (oldBoard , move){
            var changedNodeIndex;
            for(var n=0; n<9 ; n++){
                if(oldBoard[n] != move[n]){
                    changedNodeIndex = n;
                }
            }

            return changedNodeIndex;
        }
        /*------------------------------------ x win --------------------------------------------*/
        function xWin(board){
            if(
                board[0]=='x'&&board[1]=='x'&&board[2]=='x'||
                board[3]=='x'&&board[4]=='x'&&board[5]=='x'||
                board[6]=='x'&&board[7]=='x'&&board[8]=='x'||
                board[0]=='x'&&board[3]=='x'&&board[6]=='x'||
                board[1]=='x'&&board[4]=='x'&&board[7]=='x'||
                board[2]=='x'&&board[5]=='x'&&board[8]=='x'||
                board[0]=='x'&&board[4]=='x'&&board[8]=='x'||
                board[2]=='x'&&board[4]=='x'&&board[6]=='x'
            )
            {
                return true;
            }
        }
        /*------------------------------------- max ---------------------------------------------*/
        function max (scores){
            //convert array of objects to string
            var allScores = scores.toString();
            //convert string to array of strings 
            var scoresArr = allScores.split(",");
            //convert array of strings to array of numbers 
            for(var i=0 ; i < scoresArr.length ; i++){
                scoresArr[i] = Number(scoresArr[i]);
            }
            
            //choose max score 
            var zerosIndex=[];
            var maxIndex ;
            var max = -100;
            for(var n=0 ; n < scoresArr.length ; n++){
                
                if(scoresArr[n] == 0){
                    zerosIndex.push(n);
                }
                
                if(scoresArr[n] > max){
                    max = scoresArr[n];
                    maxIndex = n;
                }
            }
            
            //the max index and value 
            maxMove = {index:maxIndex , score:max};
            
            //mix zeros indexs to return with result 
            var maxMoveAndZeros = { max: maxMove , zeros: zerosIndex }; 
            
            
            return maxMoveAndZeros;
        }
        /*------------------------------------- norMax ---------------------------------------------*/
        function norMax (scores){
            //convert array of objects to string
            var allScores = scores.toString();
            //convert string to array of strings 
            var scoresArr = allScores.split(",");
            //convert array of strings to array of numbers 
            for(var i=0 ; i < scoresArr.length ; i++){
                scoresArr[i] = Number(scoresArr[i]);
            }
            
            //choose max score 
            var max = -100;
            for(var n=0 ; n < scoresArr.length ; n++){
                if(scoresArr[n] > max){
                    max = scoresArr[n];
                    maxIndex = n;
                }
            }
            
            return max;
        }
        /*------------------------------------- min ---------------------------------------------*/
        function min (scores){
            //convert array of objects to string
            var allScores = scores.toString();
            //convert string to array of strings 
            var scoresArr = allScores.split(",");
            //convert array of strings to array of numbers 
            for(var i=0 ; i < scoresArr.length ; i++){
                scoresArr[i] = Number(scoresArr[i]);
            }
            
            //choose min score 
            var min = scoresArr[0];
            for(var n=0 ; n < scoresArr.length ; n++){
                if(scoresArr[n] < min){
                    min = scoresArr[n];
                }
            }

            //return min score
            return min;
        }
        /*--------------------------------- grt possible moves ----------------------------------*/
        function getPossibleMoves(board){
            var possibleMoves = [];

            var o = getNamberOf(board , 'o');
            var x = getNamberOf(board , 'x');
            var free = getNamberOf(board , '');
            var turn = '';
            if( o.length > x.length){ // x turn 
                turn = 'x';
            }else if( o.length == x.length){ // o turn
                turn = 'o';
            }

            var newBoard = board ;
            for(var n=0 ; n < free.length ; n++){
                newBoard[free[n]] = turn;
                possibleMoves.push(newBoard.slice()); // clone the possibleMoves Array
                newBoard[free[n]] = '';
            }
            return possibleMoves;
        }
        /*------------------------------------- GET NUMBER OF -----------------------------------*/
        function getNamberOf(board , char){
            var number = [];
            for (var i=0 ; i < board.length ; i++){
                if(board[i] == char){
                    number.push(i);
                }
            }
            return number;
        }
        /*------------------------------------ is last node -------------------------------------*/
        function isLastNode(board){
            if(
                board[0]=='o'&&board[1]=='o'&&board[2]=='o'||
                board[3]=='o'&&board[4]=='o'&&board[5]=='o'||
                board[6]=='o'&&board[7]=='o'&&board[8]=='o'||
                board[0]=='o'&&board[3]=='o'&&board[6]=='o'||
                board[1]=='o'&&board[4]=='o'&&board[7]=='o'||
                board[2]=='o'&&board[5]=='o'&&board[8]=='o'||
                board[0]=='o'&&board[4]=='o'&&board[8]=='o'||
                board[2]=='o'&&board[4]=='o'&&board[6]=='o'
            )
            {
                return true;
            }
            else if(
                board[0]=='x'&&board[1]=='x'&&board[2]=='x'||
                board[3]=='x'&&board[4]=='x'&&board[5]=='x'||
                board[6]=='x'&&board[7]=='x'&&board[8]=='x'||
                board[0]=='x'&&board[3]=='x'&&board[6]=='x'||
                board[1]=='x'&&board[4]=='x'&&board[7]=='x'||
                board[2]=='x'&&board[5]=='x'&&board[8]=='x'||
                board[0]=='x'&&board[4]=='x'&&board[8]=='x'||
                board[2]=='x'&&board[4]=='x'&&board[6]=='x'
            )
            {
                return true;
            }
            else if(board[0] != '' && board[1] != '' && board[2] != '' && board[3] != '' && board[4] != '' && board[5] != '' && board[6] != '' && board[7] != '' && board[8] != ''){
                return true;
            }
            else{
                return false;
            }
        }
        /*----------------------------------- last node score -----------------------------------*/
        function lastNodeScore(board){
            var score;
            if(
                board[0]=='o'&&board[1]=='o'&&board[2]=='o'||
                board[3]=='o'&&board[4]=='o'&&board[5]=='o'||
                board[6]=='o'&&board[7]=='o'&&board[8]=='o'||
                board[0]=='o'&&board[3]=='o'&&board[6]=='o'||
                board[1]=='o'&&board[4]=='o'&&board[7]=='o'||
                board[2]=='o'&&board[5]=='o'&&board[8]=='o'||
                board[0]=='o'&&board[4]=='o'&&board[8]=='o'||
                board[2]=='o'&&board[4]=='o'&&board[6]=='o'
            )
            {
                score = -10 ;
                return score;
            }
            else if(
                board[0]=='x'&&board[1]=='x'&&board[2]=='x'||
                board[3]=='x'&&board[4]=='x'&&board[5]=='x'||
                board[6]=='x'&&board[7]=='x'&&board[8]=='x'||
                board[0]=='x'&&board[3]=='x'&&board[6]=='x'||
                board[1]=='x'&&board[4]=='x'&&board[7]=='x'||
                board[2]=='x'&&board[5]=='x'&&board[8]=='x'||
                board[0]=='x'&&board[4]=='x'&&board[8]=='x'||
                board[2]=='x'&&board[4]=='x'&&board[6]=='x'
            )
            {
                score = 10 ;
                return score;
            }
            else{
                score = 0;
                return score;
            }
        }
    
    /*------------------------------ check Game End function --------------------------------*/
    function checkGameEnd(){
        if(
            board[0].className == 'disable o'&&board[1].className == 'disable o'&&board[2].className == 'disable o'||
            board[3].className == 'disable o'&&board[4].className == 'disable o'&&board[5].className == 'disable o'||
            board[6].className == 'disable o'&&board[7].className == 'disable o'&&board[8].className == 'disable o'||
            board[0].className == 'disable o'&&board[3].className == 'disable o'&&board[6].className == 'disable o'||
            board[1].className == 'disable o'&&board[4].className == 'disable o'&&board[7].className == 'disable o'||
            board[2].className == 'disable o'&&board[5].className == 'disable o'&&board[8].className == 'disable o'||
            board[0].className == 'disable o'&&board[4].className == 'disable o'&&board[8].className == 'disable o'||
            board[2].className == 'disable o'&&board[4].className == 'disable o'&&board[6].className == 'disable o'
        )
        {
            alert('winner: o');
            gameEnd = true;
        }
        else if(
            board[0].className == 'disable x'&&board[1].className == 'disable x'&&board[2].className == 'disable x'||
            board[3].className == 'disable x'&&board[4].className == 'disable x'&&board[5].className == 'disable x'||
            board[6].className == 'disable x'&&board[7].className == 'disable x'&&board[8].className == 'disable x'||
            board[0].className == 'disable x'&&board[3].className == 'disable x'&&board[6].className == 'disable x'||
            board[1].className == 'disable x'&&board[4].className == 'disable x'&&board[7].className == 'disable x'||
            board[2].className == 'disable x'&&board[5].className == 'disable x'&&board[8].className == 'disable x'||
            board[0].className == 'disable x'&&board[4].className == 'disable x'&&board[8].className == 'disable x'||
            board[2].className == 'disable x'&&board[4].className == 'disable x'&&board[6].className == 'disable x'
        )
        {
            alert('winner: x');
            gameEnd = true;
        }
        else if(turns==9){
            alert('Tie Game');
            gameEnd = true;
        }
    }
    /*---------------------------------- reset game function ---------------------------------*/
    function reset(){
        document.getElementById('spot1').innerHTML = '+';
        document.getElementById('spot1').className = '';
        document.getElementById('spot2').innerHTML = '+';
        document.getElementById('spot2').className = '';
        document.getElementById('spot3').innerHTML = '+';
        document.getElementById('spot3').className = '';
        document.getElementById('spot4').innerHTML = '+';
        document.getElementById('spot4').className = '';
        document.getElementById('spot5').innerHTML = '+';
        document.getElementById('spot5').className = '';
        document.getElementById('spot6').innerHTML = '+';
        document.getElementById('spot6').className = '';
        document.getElementById('spot7').innerHTML = '+';
        document.getElementById('spot7').className = '';
        document.getElementById('spot8').innerHTML = '+';
        document.getElementById('spot8').className = '';
        document.getElementById('spot9').innerHTML = '+';
        document.getElementById('spot9').className = '';
        newBoard = ['','','','','','','','',''];
        turns=0;
        gameEnd = false;
    }
    
});