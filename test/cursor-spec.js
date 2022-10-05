const { expect } = require('chai');

const Cursor = require("../class/cursor.js");
const Screen = require("../class/screen.js");

describe ('Cursor', function () {

  let cursor;

  beforeEach(function() {
    cursor = new Cursor(3, 3);
  });


  it('initializes for a 3x3 grid', function () {
    expect(cursor.row).to.equal(0);
    expect(cursor.col).to.equal(0);
  });

  it('correctly processes down inputs', function () {

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);
    
    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([2, 0]);

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([2, 0]);
  });

  it('correctly processes up inputs', function () {

    cursor.up();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

    cursor.down();
    expect([cursor.row, cursor.col]).to.deep.equal([1, 0]);

    cursor.up();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
  });

  it('processes right inputs', function () {

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 2]);

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 2]);
  });

  it('processes left inputs', function () {

    cursor.left();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);

    cursor.right();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 1]);

    cursor.left();
    expect([cursor.row, cursor.col]).to.deep.equal([0, 0]);
  });

  it('processes selection', function () {
    expect (cursor.selected).to.eql(0)
    cursor.select();
    //expect set bg color this point and bej.selected = col. row. ([cursor.row, cursor.col]).to.deep.equal([0, 0]);
    expect (cursor.selected).to.eql(1)
    cursor.select();
    expect (cursor.selected).to.eql(0)
    cursor.select();
    expect (cursor.selected).to.eql(1)
    cursor.right();
    expect(cursor.selected).to.eql(2);
    cursor.right();
    expect(cursor.selected).to.eql(2);  
  });
  
  it('processes swapping', function () {
    cursor.swap()
    expect (cursor.selected).to.eql(0)
    cursor.select();
    cursor.swap()
    expect (cursor.selected).to.eql(1)
    cursor.select();
    cursor.swap()
    expect (cursor.selected).to.eql(0)  
  });

});

