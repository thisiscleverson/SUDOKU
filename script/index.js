
const sudokuGame = {

    board: [],
    
    generateTable: function(height, width){

        let amountOfSquare = (height*width)/9; // define the amount of squares that must be generated

        function checkSquare(board, square){
            for(let i=0; i<board.length;i++){
                for(r=0; r<9; r++){
                    if(square[r] == board[i][r] && square[r] > 0){
                        return;
                    }
                }
            }

            board.push(square)
        }


        function generateNumbers(){
            let square = ['0','0','0','0','0','0','0','0','0']
            let i = 0;
            let limit = Math.floor(Math.random() * (9 - 2) + 2) 
    
            while(i < limit){
                let position = Math.floor(Math.random() * (10 - 1) + 1) // generate the position where the element will be placed
                let element  = Math.floor(Math.random() * (10 - 1) + 1) // numbers
    
                // Verify that the generated number is not in the table
                // check also if the position where the generated number is free to be placed
                if(!square.includes(`${element}`) && square[position] == '0'){
                    square[position] = `${element}`
                    i++
                }
            }
    
            return square;
        }
    

        while(this.board.length < amountOfSquare){
            const square = generateNumbers()
            
            if(this.board.length === 0){
                this.board.push(square)
            }else{
                checkSquare(this.board, square)
            }
        }

    },


    startGame: function(){
        this.generateTable(6,6)
        
        let content = '';

        for(let i=0; i<this.board.length; i++){
            content += '<div class="squared">'
            for(let r=0; r<9; r++){
                content += '<div>'+this.board[i][r]+'</div>'
            }
            content += '</div>'
        }
        
        document.querySelector('.board').innerHTML = content;
    }

}

sudokuGame.generateTable(6,6)
console.log(sudokuGame.board)






