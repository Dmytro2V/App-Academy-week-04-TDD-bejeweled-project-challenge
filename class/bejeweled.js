const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {

  constructor() {

    this.playerTurn = "O";

    // Initialize this
    this.grid = Array(8).fill( Array(8).fill([' ']) );
    this.fruits = ['🥝', '🍋', '🍊', '🍓', '🥥', '🍇']
    this.grid[0] = this.randomLine()    
    //this.cursor = new Cursor(8, 8);

    //Screen.initialize(8, 8);
    //Screen.setGridlines(false);

    //this.cursor.setBackgroundColor();
    //Screen.render();
  }
  static quit() {
    Screen.quit()
  }
  checkForMatches(grid) {

    // Fill this in
    return true //test
  }
    
  randomLine = () => {    
    let arr =[];      
    for (let i = 0; i < this.fruits.length; i++) {          
      let rnd = Math.floor((Math.random() * this.fruits.length));
      arr.push(this.fruits[rnd]);
    }   
    return arr;
    
  }
  
  swap = (pos1, pos2) => {
//console.log(this.grid, pos1,pos2);
    if (!this.checkSwap(pos1, pos2)) return false;
    this.justSwap(pos1, pos2)
    return true;
  }
  justSwap = (pos1, pos2) => {
   // console.log(this.grid, pos1, pos2);
    [this.grid[pos1.row][pos1.col], this.grid[pos2.row][pos2.col]] =
      [this.grid[pos2.row][pos2.col], this.grid[pos1.row][pos1.col]]
  }
  
  checkSwap = (pos1, pos2) => {
    let ret = false
    this.justSwap(pos1, pos2) 
    if (this.checkForMatches(this.grid)) ret = true;
    this.justSwap(pos1, pos2) // restore
    return ret;    
  }

}

/*const bejeweled = new Bejeweled();
console.log(true, bejeweled.grid[0]);
s = bejeweled.swap({row:0, col:1}, {row:0, col:2});
console.log(s, bejeweled.grid[0]);
*/



/*********************************************************************
 * ********************************************************/
module.exports = Bejeweled;
