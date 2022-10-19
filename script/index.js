const table = document.querySelector('.board')


let hight = 9
let width = 9

// Objetos
const SUDOKU = {

    board: [
        '','','','','','','','','',
        '','','','','','','','','',
        '','','','','','','','','',
        '','','','','','','','','',
        '','','','','','','','','',
        '','','','','','','','','',
        '','','','','','','','','',
        '','','','','','','','','',
        '','','','','','','','','',
    ], // tabuleiro


    difficulty: {
        Easy:   36,
        Medium: 46,
        Hard:   56
    },

    Start: function(){ // funcção inicial do jogo

        //this.DrawNumber()
        this.BuildTheBoard()
        this.PutElementsInHTML()
    },


    DrawNumberAndPosition: function(){ // sortear os números para o square
        let position = Math.floor(Math.random() * ((width * hight) - 1) + 1) // gerar a posição aonde o elemento vai ficar na lista
        let element  = Math.floor(Math.random() * (10 - 1) + 1) // sortear os números

        return [position, element]
    },


    BuildTheBoard: function(){

        // verificar se tem número repetido na mesma coluna
        const checkColumnValues = (position, values) => {

            let rowIndex    = parseInt(position / 9)           // calcular a linha apartir do index
            let columnIndex = position - (width * rowIndex) // calculo para determinar em qual coluna deve começar a peger os valores

            //pegar os valores da coluna e adicionar em um array de verificação
            for(let row=0; row<hight; row++){
                let index = columnIndex + (width * row)
                if(this.board[index] == values) return true
            }
            
            return false
        }


        //verifcar se tem número repetido na mesma linha
        const checkRowValues = (position, values) => {

            let rowIndex = parseInt(position / 9) // calcular o index da linha apartir da posição

            // pegar todos os valores da linha e colocar no array de verificação
            for(let column=0; column<width; column++){
                let index = column + (width * rowIndex)
                if(this.board[index] == values) return true
            }

            return false
        }


        const checkThreeRow = (position, values) => {

            let universeSet = []
            let rowIndex = parseInt(position / 9)           // calcular a posição da linha apartir do index
            let columnIndex = position - (width * rowIndex) // calcular a posição da coluna apartir do index

            
            if(rowIndex < 3){

            }else if(rowIndex > 3 && rowIndex < 6){

            }else if(rowIndex > 6 && rowIndex < 9){

            }

        }


        let i=0
        while (true){
            const [position, element] = this.DrawNumberAndPosition() // sotear os números e a posição

            //checkThreeRow(position,element)

            //verificar se pode adicionar os números no tabuleiro
            if(!checkColumnValues(position,element) && !checkRowValues(position, element)){
                this.board[position] = `${element}`
                i++
            }
            

            if(i >= this.difficulty['Easy'])break // terminar de gerar os números
        }
    },


    PutElementsInHTML: function(){

        const sizeBoard = this.board.length
        let content = '';

        for(let i=0; i<sizeBoard;){
            content += '<tr>'
            for(let n=0; n<9; n++){
                content += `<td>${this.board[i]}</td>`
                i++
            }
            content += '</tr>'
        }

        table.innerHTML = content
    },
}