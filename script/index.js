

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


        const checkSquareElements = (position, values) => {

            // sequência em que vai ser verificado se o index (posição aonde o n° vai ser colocado) 
            // em qual área (quadrado do sudoku) ele pertenci
            const areaSequence = [
                [2,2],
                [2,5],
                [2,8],
                [5,2],
                [5,5],
                [5,8],
                [8,2],
                [8,5],
                [8,8],
            ]

            //verificar a sequência da área (quadrado do sudoku)
            const checkSequence = () => {
                for(let i=0; i<areaSequence.length; i++){
                    if(rowIndex <= areaSequence[i][0] && columnIndex <= areaSequence[i][1]){
                        return i + 1
                    }
                }
            }

            let loadColumnValues = []                       // memoria que vai carregar os elementos para verificação
            let rowIndex    = parseInt(position / 9)        // calcular a posição da linha apartir do index
            let columnIndex = position - (width * rowIndex) // calcular a posição da coluna apartir do index


            switch(checkSequence()){
                case 1:
                    for(let column=0; column<3; column++){
                        for(let row=0; row<3; row++){
                            let index = column + (9 * row)
                            loadColumnValues.push(this.board[index])
                        }
                    }
                break;

                case 2:
                    for(let column=3; column<6; column++){
                        for(let row=0; row<3; row++){
                            let index = column + (9 * row)
                            loadColumnValues.push(this.board[index])
                        }
                    }
                break;
                
                case 3:
                    for(let column=6; column<9; column++){
                        for(let row=0; row<3; row++){
                            let index = column + (9 * row)
                            loadColumnValues.push(this.board[index])
                        }
                    }
                break;

                case 4:
                    for(let column=0; column<3; column++){
                        for(let row=3; row<6; row++){
                            let index = column + (9 * row)
                            loadColumnValues.push(this.board[index])
                        }
                    }
                break;

                case 5:
                    for(let column=3; column<6; column++){
                        for(let row=3; row<6; row++){
                            let index = column + (9 * row)
                            loadColumnValues.push(this.board[index])
                        }
                    }
                break;

                case 6:
                    for(let column=6; column<9; column++){
                        for(let row=3; row<6; row++){
                            let index = column + (9 * row)
                            loadColumnValues.push(this.board[index])
                        }
                    }
                break;

                case 7:
                    for(let column=0; column<3; column++){
                        for(let row=6; row<9; row++){
                            let index = column + (9 * row)
                            loadColumnValues.push(this.board[index])
                        }
                    }
                break;

                case 8:
                    for(let column=3; column<6; column++){
                        for(let row=6; row<9; row++){
                            let index = column + (9 * row)
                            loadColumnValues.push(this.board[index])
                        }
                    }
                break;

                case 9:
                    for(let column=6; column<9; column++){
                        for(let row=6; row<9; row++){
                            let index = column + (9 * row)
                            loadColumnValues.push(this.board[index])
                        }
                    }
                break;
            }   

            return loadColumnValues.includes(`${values}`) // verificar se tem número repetidos e retonar um [true] ou [false] como resposta

        }


        let i=0
        while (true){
            const [position, element] = this.DrawNumberAndPosition() // sotear os números e a posição


            //verificar se pode adicionar os números no tabuleiro
            if(!checkColumnValues(position,element) && !checkRowValues(position, element) && !checkSquareElements(position,element)){
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
                this.board[i] != ''?content += `<td class='cell'> <div class='index'> ${i}</div> ${this.board[i]}</td>`:content += `<td> <div class='index'> ${i} </div> ${this.board[i]}</td>`
                i++
            }
            content += '</tr>'
        }

        table.innerHTML = content
    },
}