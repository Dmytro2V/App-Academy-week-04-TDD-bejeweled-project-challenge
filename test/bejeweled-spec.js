const { expect } = require('chai');

const Bejeweled = require("../class/bejeweled.js");

describe ('Bejeweled', function () {
  let bejeweled;
  beforeEach (' ', function () {
    bejeweled = new Bejeweled();
  })
  // Add tests for setting up a basic board
 // afterEach (function() {
 //   Bejeweled.quit()
 // }  )

  it('should have grid size 8-8)', function() {
    expect(bejeweled.grid.length, bejeweled.grid[0].length).to.eql(8, 8)
  })
  it('should have 1d array of fruits)', function() {
    expect(bejeweled.fruits).to.eql(['🥝', '🍋', '🍊', '🍓', '🥥', '🍇'])
  }) 
  it('should have grid line filled with fruits)', function() {
    let line0 = bejeweled.grid[0];
    let result = true;
    for (let i = 0; i < line0.length; i++) {
      let el = line0[i];      
      if (!bejeweled.fruits.includes(el)) result = false;
    }
    expect(result).to.be.true
  })
  it('should have RANDOM grid line filled with fruits (can rarely fail test)', function() {
    let line0_1 = bejeweled.grid[0];
    let line0_2 = (new Bejeweled).grid[0]    
    expect(line0_1).to.not.equal(line0_2)
  })

  // Add tests for a valid swap that matches 3
  it('should make valid horisontal swap (always adjacent)', function() {
    bejeweled.grid[0] = ['🥝', '🍓', '🍊', '🍓', '🍓', '🍇']
    expect(bejeweled.swap({row:0, col:1}, {row:0, col:2})).to.be.true;
    expect(bejeweled.grid[0]).to.eql(['🥝', '🍊', '🍓', '🍓', '🍓', '🍇']);    
  })

  it('should make valid swap with vert 3 (always adjacent)', function() {
    bejeweled.grid[0] = ['🥝', '🍋', '🍊', '🍓', '🥥', '🍇']
    bejeweled.grid[1] = ['🍋', '🍊', '🍓', '🥥', '🍇', '🥝']
    bejeweled.grid[2] = ['🥝', '🍋', '🍊', '🍓', '🥥', '🍇']
    expect(bejeweled.swap({row:1, col:0}, {row:1, col:1})).to.be.true;
    expect(bejeweled.grid[1]).to.eql(['🍊', '🍋', '🍓', '🥥', '🍇', '🥝']);      

  })

  it('should not make invalid swap)', function() {
    bejeweled.grid[0] = ['🥝', '🍋', '🍊', '🍓', '🥥', '🍇']
    expect(bejeweled.swap(bejeweled.grid[0][0], bejeweled.grid[0][1])).to.be.false;
    expect(bejeweled.grid[0]).to.eql(['🥝', '🍋', '🍊', '🍓', '🥥', '🍇']);          
    
  })
  it ('should remove items that matches 3', function() {
    bejeweled.grid[0] = ['🥝', '🥝', '🥝', '🍓', '🥥', '🍇']
    bejeweled.remove()
    expect(bejeweled.grid[0]).to.eql(['🥝', '🥝', '🥝', '🍓', '🥥', '🍇']);
    
  })
  it ('should remove items that matches 4+', function() {
    bejeweled.grid[3] = ['🥝', '🥝', '🥝', '🥝', '🥥', '🍇']
    bejeweled.grid[2] = ['🥝', '🥝', '🥝', '🥝', '🥥', '🍇']
    bejeweled.grid[1] = ['🥝', '🥝', '🥝', '🥝', '🍇', '🥥']
    bejeweled.grid[0] = ['🥝', '🥝', '🥝', '🥝', '🥥', '🍇']
    bejeweled.remove()
    expect(bejeweled.grid[3]).to.eql([' ', ' ', ' ', ' ', '🥥', '🍇']);
    expect(bejeweled.grid[2]).to.eql([' ', ' ', ' ', ' ', '🥥', '🍇']);
    expect(bejeweled.grid[1]).to.eql([' ', ' ', ' ', ' ', '🍇', '🥥']);
    expect(bejeweled.grid[0]).to.eql([' ', ' ', ' ', ' ', '🥥', '🍇']);
  })

  it ('should fall board after removing 3', function() {
    bejeweled.grid[3] = ['🥝', '🍓', '🥝', '🥝', '🥥', '🍇']
    bejeweled.grid[2] = ['🍓', '🥝', '🍓', '🍓', '🥥', '🍇']
    bejeweled.grid[1] = ['🥝', '🥝', '🍇', '🥝', '🍇', '🥥']
    bejeweled.grid[0] = ['🥝', '🥝', '🍓', '🥝', '🥥', '🍇']
    bejeweled.remove()
    bejeweled.fall()
    expect(bejeweled.grid[3]).to.eql(['🥝', ' ', '🥝', '🥝', '🥥', '🍇']);
    expect(bejeweled.grid[2]).to.eql(['🍓', ' ', '🍓', '🍓', '🥥', '🍇']);
    expect(bejeweled.grid[1]).to.eql(['🥝', ' ', '🍇', '🥝', '🍇', '🥥']);
    expect(bejeweled.grid[0]).to.eql(['🥝', '🍓', '🍓', '🥝', '🥥', '🍇']);    
  })

  it ('should drop new line after removing 3', function() {
    // fragment from prev it
    bejeweled.grid[3] = ['🥝', '🍓', '🥝', '🥝', '🥥', '🍇']
    bejeweled.grid[2] = ['🍓', '🥝', '🍓', '🍓', '🥥', '🍇']
    bejeweled.grid[1] = ['🥝', '🥝', '🍇', '🥝', '🍇', '🥥']
    bejeweled.grid[0] = ['🥝', '🥝', '🍓', '🥝', '🥥', '🍇']
    bejeweled.remove()
    bejeweled.fall()
    expect(bejeweled.grid[3]).to.eql(['🥝', ' ', '🥝', '🥝', '🥥', '🍇']);
    expect(bejeweled.grid[2]).to.eql(['🍓', ' ', '🍓', '🍓', '🥥', '🍇']);
    expect(bejeweled.grid[1]).to.eql(['🥝', ' ', '🍇', '🥝', '🍇', '🥥']);
    expect(bejeweled.grid[0]).to.eql(['🥝', '🍓', '🍓', '🥝', '🥥', '🍇']);    

    bejeweled.drop()
    expect(bejeweled.grid[3]).to.eql(['🥝', ' ', '🥝', '🥝', '🥥', '🍇']);
    expect(bejeweled.grid[2]).to.eql(['🍓', ' ', '🍓', '🍓', '🥥', '🍇']);
    expect(bejeweled.fruits.includes(bejeweled.grid[1][1])).to.be.true;
    expect(bejeweled.grid[0]).to.eql(['🥝', '🍓', '🍓', '🥝', '🥥', '🍇']);    
    
    expect(bejeweled.grid[4][1].includes(' ')).to.be.true;
    expect(bejeweled.fruits.includes(bejeweled.grid[4][0])).to.be.true;
    expect(bejeweled.fruits.includes(bejeweled.grid[4][5])).to.be.true;
    
  })

  // Add tests for swaps that set up combos
  it ('should repeatedly update board when have combo from fall', function() {
    //after fall remove() until true
  })
  it ('should repeatedly update board when have combo from drop', function() {
    //after drop remove/fall until remove = true
  })
  it ('should not add lines more then 1 on combo', function() {
    // as is
  })

  // Add tests to check if there are no possible valid moves
  it ('should correctly check if there are no possible valid moves', function() {
    // ifMoves()
  })

});

