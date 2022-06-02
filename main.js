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
const probability = 0.3; 
// Random number from 0 to 1 
// If the random number is greater than 0.3, I will generate the patch of grass
//if random number is less than the 0.3, I will generate the hole

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
        this.locationX= 0; //col
        this.locationY=0; //row

        for (let a =0; a< row; a++){
        this.field[a] = [];
        }
    

    this.generateField(); //put in the grass patches 
    }

    generateField(){
        // Random number from 0 to 1 
        // If the random number is greater than 0.3, I will generate the patch of grass
        //if random number is less than the 0.3, I will generate the hole

        for (let y=0; y<row; y++){
            for (let x = 0; x<col; x++){
                //need to use the probability const to generate either a patch of grass or a hole

                //this.field[y][x] = fieldCharacter;
                let getProb = Math.random(); //return a number between 0 to 1 
                //e.g. 0.25, 0.86,0.91,0.12,0.83
                //(0.25 > 0.3)?
                this.field[x][y] = getProb >= probability ? fieldCharacter : hole;
            }
        }

        let hatX;
        let hatY;
        do{
        //set the "hat" location 
        //set the hat position as random (x,y)
        hatX =Math.floor(Math.random()*row);
        hatY = Math.floor(Math.random()*col);
         
        this.field[hatY][hatX]= hat; //array needs a whole number: 0 to 9 
        }while(hatX ==0 && hatY ==0);


        //set character position as [0][0]
        this.field[0][0] = pathCharacter;
    }

    runGame() {
       // keep asking user for input if the game have no ended:
       //1) Char hits boundaries
       //2) Chat gets the hat 
       //3) Char drips into a hole 
       let playing = true;
       while(playing){
        this.field[this.locationY][this.locationX] = pathCharacter;
        this.print();
        this.askQuestions();
        //The player will keep playing unless either of the above conditions are met
        //(1) Char hits boundaries
        if (!this.isInBoundary()){
            //not true ===== false
            console.log("Out of Boundary - Game End")
            playing = false;
        }
        else if (this.field[this.locationY][this.locationX] == hat){
            console.log("Congrats, you found your hat!")
            playing = false;
        }
        else if (this.field[this.locationY][this.locationX] == hole){
            console.log("Sorry, you fell into a hole");
            playing = false;
        }
        
       }
    }


    isInBoundary(){
        //the size of the boundary refer to the row and col that you set
        //0 to 9
        return (this.locationX >= 0 && this.locationY >=0 && this.locationX<col && this.locationY <row )

        
    }

    print(){
        clear();
        const displayString = this.field.map(row =>{
            return row.join('');
        }).join('\n')
        console.log(displayString)
    }
    
    askQuestions(){
        const answer = prompt('Which way? (u, d, l ,r)').toLowerCase();
        //how to check if user press u or d or l or r
        //if else or switch

        //Move my Char
        switch(answer) {
            case "u":
                //reset the field to the fieldCharacter
                this.field[this.locationY][this.locationX] = fieldCharacter;
                this.locationY -= 1;  //row
                break;
            case "d":
                this.field[this.locationY][this.locationX] = fieldCharacter;
                this.locationY += 1;  //row
                break;
            case "l":
                this.field[this.locationY][this.locationX] = fieldCharacter;
            //Mover my char to left (col)
                this.locationX -= 1; //col
                break;
            case "r":
                this.field[this.locationY][this.locationX] = fieldCharacter;
            //Move my Char to the right
                this.locationX += 1; //col
            //this.locationY = 0; //row
                break;
            default:
                console.log("Please enter u, d, l, r.")

        }

        
    }
        

        
    
    
}// End of Field class

//Create an instance object for the field
const myfield = new Field();
myfield.runGame();