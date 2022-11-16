/*
    SUDOKU GAME

    A GAME MAKE WITH JAVASCRIPT, HTML AND CSS.

    repositories: https://github.com/thisiscleverson/SUDOKU
    GITHUB-PAGES: https://thisiscleverson.github.io/SUDOKU/
    TWITTER: @cl3verson3_
    E-MAIL: 
*/



// tag para o jogo
const getTable      = document.querySelector('.board')
const numpad        = document.querySelector('.numpad')

//tag para o timer
const minutes_span  = document.querySelector('.minutes')
const seconds_span  = document.querySelector('.seconds')


// variavel para o tamanho do tabuleiro
let hight            = 9
let width            = 9

// variavel para o controle do jogo
let tagClicked       = '' 
let tagClickedNumPad = ''
let chosenNumber     = ''
let tagIndex

// timers
let secondsAmount    = 0



const shuffle = (array) => {
    let currentIndex = array.length, randomIndex

    while(currentIndex != 0){
        randomIndex = Math.floor(Math.random() * currentIndex)

        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
        
        return array
    }
}


const SUDOKU = {

    grid:       [], // tabuleiro já resolvido
    puzzleGrid: [], // quebra-cabeça


    Start(){ // função inicial do jogo
        this.createGridAndPuzzleGrid()
        this.generatorBoard.generatorGrid()
        this.generatorBoard.hideNumber()
        this.generatorBoard.buildBoardInFrontend()

       //this.hideNumber()
       //this.PutElementsInHTML()
       //this.startTimer()
    },


    createGridAndPuzzleGrid(){
        // criar o tabuleiro para geração do sudoku  
        for(let row=0; row<9; row++){
            this.grid.push([])
            for(let e=0; e<9; e++){
                this.grid[row].push(0)
            }
        }

        // criar o tabuleiro do quebra-cabeça
        for(let row=0; row<9; row++){
            this.puzzleGrid.push([])
            for(let e=0; e<9; e++){
                this.puzzleGrid[row].push('')
            }
        }
    },


    generatorBoard: {

        validLocation(row,col,number){

            //verificar se tem número parecido na coluna
            function checkColumn(){
                for(let r=0; r<9; r++){
                    if(SUDOKU.grid[r][col] == number) return true
                }
                return false
            }

            //verificar se existe número repetidos nos quadrados
            function checkSquare(){
                let square_row = Math.trunc(row/3) * 3
                let square_col = Math.trunc(col/3) * 3

                for(let r=square_row; r<(square_row+3); r++){
                    for(let c=square_col; c<(square_col+3); c++){
                        if(SUDOKU.grid == number) return true
                    }
                }
                return false
            }

            if(SUDOKU.grid[row].includes(number) || checkColumn() || checkSquare()){
                return false
            }
            return true
        },


        findEmptySquare(){
            for(let r=0; r<9; r++){
                for(let c=0; c<9; c++){
                    if(SUDOKU.grid[r][c] == 0) return [r,c]
                }
            }
            return []
        },


        generatorGrid(){
            const list_number = [1,2,3,4,5,6,7,8,9]
            let row
            let col

            for(let i=0; i<81; i++){
                row = Math.trunc(i/9)
                col = i%9

                //verificar se a celula é igual a zera para poder colocar um número
                if(SUDOKU.grid[row][col] == 0){
                    shuffle(list_number) // embaralhar a lista de número
                    for(let num=0; num<9; num++){
                        if(this.validLocation(row, col, list_number[num])){
                            SUDOKU.grid[row][col] = list_number[num]

                            if(this.findEmptySquare() == false){
                                return true
                            }else if(this.generatorGrid()){
                                return true
                            }
                        }
                    }
                    break
                }
            }
            SUDOKU.grid[row][col] = 0
            return false
        },


        hideNumber(){
            function getPosition(){
                let positionRow     = Math.floor(Math.random() * (9 - 1) + 1)
                let positionElement = Math.floor(Math.random() * (9 - 1) + 1)
                return [positionRow, positionElement]
            }
    
            let i = 0;
            while(i < 36){
                let [row, element] = getPosition()
    
                if(SUDOKU.puzzleGrid[row][element] == ''){
                    SUDOKU.puzzleGrid[row][element] = `${SUDOKU.grid[row][element]}`
                    i++
                }
            }
        },


        buildBoardInFrontend(){
            let content = '';
            for(let i=0; i<9; i++){
                content += '<tr>'
                for(let n=0; n<9; n++){
                    SUDOKU.puzzleGrid[i][n] != ''?content += `<td id='cell'> ${SUDOKU.puzzleGrid[i][n]}</td>`:content += `<td> ${SUDOKU.puzzleGrid[i][n]}</td>`
                }
                content += '</tr>'
            }
            getTable.innerHTML = content
        }

    },


    GameControls: {


        ClickAction:{
            firstSelected(event){

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
                console.log(getTable.getElementsByTagName('td'))
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


    startTimer(){
        setInterval(() => {
            
            const timer   = secondsAmount++
            const minutes = Math.floor(timer / 60)
            const seconds = timer % 60

            minutes_span.innerHTML = String(minutes).padStart(2, '0') + 'M'
            seconds_span.innerHTML = String(seconds).padStart(2, '0') + 'S'
        },1000)
    }
}

console.log(SUDOKU.grid)