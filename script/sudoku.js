/*
    SUDOKU GAME

    A GAME MAKE WITH JAVASCRIPT, HTML AND CSS.

    repositories: https://github.com/thisiscleverson/SUDOKU
    GITHUB-PAGES: https://thisiscleverson.github.io/SUDOKU/
    TWITTER: @cl3verson3_
    E-MAIL: 
*/

const getTable  = document.querySelector('.board')
const numpad    = document.querySelector('.numpad')

const minutes_span  = document.querySelector('.minutes')
const seconds_span  = document.querySelector('.seconds')


let hight = 9
let width = 9
let setIndex         = false  // mostrar o index dos elementos no tabuleiro
let tagClicked       = '' 
let tagClickedNumPad = ''
let chosenNumber     = ''
let secondsAmount    = 0
let onTimer          = true      
let tagIndex


// Objetos
const SUDOKU = {

    board: [ // tabuleiro
        '','','','','','','','','',
        '','','','','','','','','',
        '','','','','','','','','',
        '','','','','','','','','',
        '','','','','','','','','',
        '','','','','','','','','',
        '','','','','','','','','',
        '','','','','','','','','',
        '','','','','','','','','',
    ], 


    difficulty: {
        Easy:   36,
        Medium: 46,
        Hard:   56
    },


    Start(){ // funcção inicial do jogo

        //this.DrawNumber()
        this.BuildTheBoard()
        this.PutElementsInHTML()
        this.startTimer()
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
            // [row, column]
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

            //verificar em qual sequência da área (quadrados do sudoku) está
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
                            let index = column + (width * row)
                            loadColumnValues.push(this.board[index])
                        }
                    }
                break;

                case 2:
                    for(let column=3; column<6; column++){
                        for(let row=0; row<3; row++){
                            let index = column + (width * row)
                            loadColumnValues.push(this.board[index])
                        }
                    }
                break;
                
                case 3:
                    for(let column=6; column<9; column++){
                        for(let row=0; row<3; row++){
                            let index = column + (width * row)
                            loadColumnValues.push(this.board[index])
                        }
                    }
                break;

                case 4:
                    for(let column=0; column<3; column++){
                        for(let row=3; row<6; row++){
                            let index = column + (width * row)
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
                            let index = column + (width * row)
                            loadColumnValues.push(this.board[index])
                        }
                    }
                break;

                case 7:
                    for(let column=0; column<3; column++){
                        for(let row=6; row<9; row++){
                            let index = column + (width * row)
                            loadColumnValues.push(this.board[index])
                        }
                    }
                break;

                case 8:
                    for(let column=3; column<6; column++){
                        for(let row=6; row<9; row++){
                            let index = column + (width * row)
                            loadColumnValues.push(this.board[index])
                        }
                    }
                break;

                case 9:
                    for(let column=6; column<9; column++){
                        for(let row=6; row<9; row++){
                            let index = column + (width * row)
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
            

            if(i >= (81 - this.difficulty['Easy'])) break // terminar de gerar os números
        }
    },


    PutElementsInHTML: function(){

        const sizeBoard = this.board.length
        let content = '';

        for(let i=0; i<sizeBoard;){
            content += '<tr>'
            for(let n=0; n<9; n++){
                if(setIndex){ // mostrar o index dos elemento no front-end
                    this.board[i] != ''?content += `<td id='cell' data-index='${i}'> <div class='index'> ${i}</div> ${this.board[i]}</td>`:content += `<td data-index='${i}'> <div class='index'> ${i} </div> ${this.board[i]}</td>`
               
                }else{ // não mostrar o index dos elementos no front-end
                    this.board[i] != ''?content += `<td id='cell' data-index='${i}'> ${this.board[i]}</td>`:content += `<td data-index='${i}'> ${this.board[i]}</td>`
                }
                
                i++
            }
            content += '</tr>'
        }

        getTable.innerHTML = content
    },


    GameControls: {

        selectedNumbers(number){
            console.log(getTable.target.innerHTML)
        },


        ClickAction:{
            firstSelected(event){

                SUDOKU.GameControls.selectedNumbers(0)
                tagClicked = event
                tagIndex   = event.getAttribute('data-index') // pegar o index da tag [td]

                if(chosenNumber != 'x'){
                    event.innerHTML        = `${chosenNumber}`
                    SUDOKU.board[tagIndex] = `${chosenNumber}`
                }else{
                    event.innerHTML        = ''
                    SUDOKU.board[tagIndex] = ''
                }
                event.classList.add('colorSelected')
            },


            secondSelected(event){
                tagClicked.classList.remove('colorSelected')
                tagClicked = event
                tagIndex   = event.getAttribute('data-index') // pegar o index da tag [td]
                 if(chosenNumber != 'x'){
                    event.innerHTML        = `${chosenNumber}`
                    SUDOKU.board[tagIndex] = `${chosenNumber}`
                }else{
                    event.innerHTML        = ''
                    SUDOKU.board[tagIndex] = ''
                }
                event.classList.add('colorSelected')
            },


            removeSelected(event){
                tagClicked.classList.remove('colorSelected')
                tagIndex   = null
                tagClicked = ''
            },


            // ações para o botões do numpad
            firstSelected_Numpad(event){
                chosenNumber     = event.getAttribute('data-values')
                tagClickedNumPad = event
                event.style.backgroundColor = 'rgba(99, 227, 236, 0.678)' // adicionar a cor azul na área selecionada

                if(tagClicked != ''){
                    if(chosenNumber != 'x'){
                        tagClicked.innerHTML   = `${chosenNumber}`
                        SUDOKU.board[tagIndex] = `${chosenNumber}`
                    }else{
                        tagClicked.innerHTML   = ''
                        SUDOKU.board[tagIndex] = ''
                    }
                }
            },


            secondSelected_Numpad(event){
                chosenNumber = event.getAttribute('data-values')
                tagClickedNumPad.style.backgroundColor = 'rgba(180, 180, 180, 0.623)' // remover a cor azul na área selecionada
                tagClickedNumPad = event
                event.style.backgroundColor = 'rgba(99, 227, 236, 0.678)' // adicionar a cor azul na área selecionada
                
                if(tagClicked != ''){
                    if(chosenNumber != 'x'){
                        tagClicked.innerHTML   = `${chosenNumber}`
                        SUDOKU.board[tagIndex] = `${chosenNumber}`
                    }else{
                        tagClicked.innerHTML   = ''
                        SUDOKU.board[tagIndex] = ''
                    }
                }
            },


            removeSelected_Numpad(event){
                event.style.backgroundColor = 'rgba(180, 180, 180, 0.623)'
                tagClickedNumPad = ''
                if(tagClicked != ''){
                    SUDOKU.GameControls.ClickAction.removeSelected(event)
                    chosenNumber = ''
                }
            },
        },
        

        onClick(){ // selecionar as celulas do tabuleiro
       
            getTable.addEventListener('click', ({target}) =>{
                
                if(tagClicked == '' && target.tagName === 'TD' && target.id === ''){
                    this.ClickAction.firstSelected(target)

                }else if(target.tagName === 'TD' && target != tagClicked && target.id === ''){
                    this.ClickAction.secondSelected(target)

                }else if(target == tagClicked && target.id === ''){
                    this.ClickAction.removeSelected(target)
                }
            })
        },


        KeyBoardActions(){
            
            const actions = (event) => {

                //verificar se o event.key (tecla pressionada) é um número
                if([1,2,3,4,5,6,7,8,9].includes(Number(event.key))){ 
                    SUDOKU.board[tagIndex] = `${event.key}`
                    tagClicked.innerHTML   = `${event.key}`

                }else if(event.key === 'Delete' || event.key === 'Backspace'){ 
                    SUDOKU.board[tagIndex] = ''
                    tagClicked.innerHTML   = ''
                }
            }
            
            document.onkeydown = actions

        },


        onClickNumPad(){ // selecionar as celulas do tabuleiro
            
            numpad.addEventListener('click', ({target}) =>{
                
                if(tagClickedNumPad == '' && target.className === 'numpad-item'){
                    this.ClickAction.firstSelected_Numpad(target)
    
                }else if(target.className === 'numpad-item' && target != tagClickedNumPad){
                    this.ClickAction.secondSelected_Numpad(target)

                }else if(target.className === 'numpad-item'){
                    this.ClickAction.removeSelected_Numpad(target)
                }
            })
        },

    },


    checkGain(){
        
    },


    startTimer(){
        setInterval(() => {
            
            const timer = secondsAmount++

            const minutes = Math.floor(timer / 60)
            const seconds = timer % 60

            minutes_span.innerHTML = String(minutes).padStart(2, '0') + 'M'
            seconds_span.innerHTML = String(seconds).padStart(2, '0') + 'S'
        },1000)
    }


}
