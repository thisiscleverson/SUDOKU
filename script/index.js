

const sudokuGame = {

    board: [],
    child_square: ['0','0','0','0','0','0','0','0','0'], // tabuleiro vazio

    generateTable: function(height, width){

        var amountOfSquare = (height*width)/9; // definir a quantidade de quadrados que deve ser gerado

        // colocar o novo quadrado na tabela
        for(var i=0; i < amountOfSquare; i++){ 
            this.board.push(this.child_square)
        }
    },


    generateNumbers: function(){
        var i = 0;
        var limit = Math.floor(Math.random() * (9 - 2) + 2) 

        while(i < limit){
            var position = Math.floor(Math.random() * (10 - 1) + 1) // generate the position where the element will be placed
            var element  = Math.floor(Math.random() * (10 - 1) + 1) // numbers

            // Verify that the generated number is not in the table
            // check also if the position where the generated number is free to be placed
            if(!this.board.includes(`${element}`) && this.board[position] == '0'){
                this.board[position] = `${element}`
                i++
            }
        }
    },


    initTest: function(){
        this.generateTable(6,6)
        //this.generateNumbers()
    
        console.log(this.board)
    }

}


sudokuGame.initTest()

