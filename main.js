// import all the required modules

const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

//Instantiate variable
// You can edit or create new variables if needed

const hat = '^';            //Hat
const hole = 'O';
const fieldCharacter = '░';  //grass patch 1m by 1m, fill up 10 x 10 
const pathCharacter = '*';      //Me
const row = 10;
const col = 10;

//we can use functions
//For kick-starter we are using objects

//1) Build the whole Field out (10 row x 10 col)
// Create 2D Array
//Construct the layout of the field using empty Array

class Field{

    field = [];
    constructor() {
        //The current location of the character *
        //character * can be always at the defualt of postion (0,0)
        this.locationX= 0;
        this.locationY=0;

        for (let a =0; a< row; a++){
        this.field[a] = [];
        }
    

    this.generateField(); //put in the grass patches 
    }

    generateField(){
        for (let y=0; y<row; y++){
            for (let x = 0; x<col; x++){
                this.field[y][x] = fieldCharacter;
            }
        }
        
        //set the "hat" location 
        let y = Math.floor(Math.random() * row)
        let x =Math.floor(Math.random() * col)
        this.field[y][x]= hat;

        //set Character position as [0][0]
        this.field[this.locationY][this.locationX] = pathCharacter;
        
        //set holes
        
        for (let a=(Math.floor(Math.random()*col )); a<row; a++){
            for (let b =(Math.floor(Math.random()*row)); b<col; b++){
                this.field[a][b] = hole;
            }
        
    }
    
    }
    runGame() {
        //Implement your codes
        this.print();
        this.askQuestions();
        
    }
    print(){
        clear();
        const displayString = this.field.map(row =>{
            return row.join('');
        }).join('\n')
        console.log(displayString)
    }
    askQuestions(){
        const answer = prompt('which way? ').toUpperCase();
        
        if (this.answer ="u"){
            console.log("Moving Up")
            this.locationY -= 1
            
        }
        else if (this.answer="d"){
            console.log("Moving Down")
            this.locationY += 1
            
        }
        else if(this.answer="l"){
            console.log("moving Left")
            this.locationX -= 1
            
        }
        else if(this.answer="r"){
            console.log("Moving Right")
            this.locationX += 1
            
        }

        else{
            console.log("Please key in a U D L R for moving up, downn, left, or right only")
            
        }
    }








}// End of Field class

//Create an instance object for the field
const myfield = new Field();
myfield.runGame();