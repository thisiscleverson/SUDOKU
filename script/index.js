
const sudokuGame = {

    board: [],
    
    generateTable: function(height, width){

        let amountOfSquare = (height*width)/9; // define the amount of squares that must be generated

        function checkSquare(board, row){

            // Check if there are numbers recessed on the same line and column
            for(let i=0; i<board.length;i++){
                for(r=0; r<9; r++){
                    if(row[r] == board[i][r] && row[r] > 0){
                        return;
                    }
                }
            }

            //verificar se em um quadrado tem elementos repetidos
            if(board.length >= 2){

                for(let i=0; i<3; i++){

                    console.log(board[0].some(el => {
                        if(board[1].slice(0,3).includes(el) && row.slice(0,3).includes(el) && el != '') {
                            console.log('elemento: '+el)
                            console.log('board 1: '+board[0])
                            console.log('board 2: '+board[1])
                            console.log('row: '+row)
                            return;
                          }
                    }))
                }
            }

            board.push(row)
        }


        function generateNumbers(){
            let row = ['','','','','','','','','']
            let i = 0;
            let limit = Math.floor(Math.random() * (9 - 2) + 2) 
    
            while(i < limit){
                let position = Math.floor(Math.random() * (10 - 1) + 1) // generate the position where the element will be placed
                let element  = Math.floor(Math.random() * (10 - 1) + 1) // numbers
    
                // Verify that the generated number is not in the table
                // check also if the position where the generated number is free to be placed
                if(!row.includes(`${element}`) && row[position] == ''){
                    row[position] = `${element}`
                    i++
                }
            }
            return row;
        }


        while(this.board.length < amountOfSquare){
            const row = generateNumbers()
            
            if(this.board.length === 0){
                this.board.push(row)
            }else{
                checkSquare(this.board, row)
            }
        }

    },


    startGame: function(){
        this.generateTable(9,9)
        
        let content = '';

        for(let i=0; i<this.board.length; i++){
            content += '<tr class="row">'
            for(let r=0; r<9; r++){
                content += '<td class="cell">'+this.board[i][r]+'</td>'
            }
            content += '</tr>'
        }
        
        document.querySelector('.board').innerHTML = content;
    }

}

sudokuGame.generateTable(6,6)
//console.log(sudokuGame.board)






