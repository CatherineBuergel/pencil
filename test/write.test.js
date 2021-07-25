const { Paper } = require('../classes/Paper');
const { Pencil } = require('../classes/Pencil');
const { Writer } = require('../classes/Writer');


let pencil;
let paper;
let writer;

beforeEach(() => {
  pencil = new Pencil(50);
  paper = new Paper();
  writer = new Writer(paper, pencil);

})

describe("Pencil Can Write", () => {
  // test.todo('Can create pencil')

  test('Pencil can write text to paper', () => {
    let testString = "this is test string";
    writer.write(testString);
    expect(paper.viewPaper()).toEqual(testString);
  });

  test('Text should be appended to what was already written', () => {
    let initial = "test";
    let addOn = ' One Two Three';
    writer.write(initial);
    writer.write(addOn);
    expect(paper.viewPaper()).toEqual(initial + addOn);
  })
})

describe("Point Degradation", () => {
  test('When a pencil is created it can be provided with a value for point durability', () => {
    let pencilTwo = new Pencil(30);
    expect(pencilTwo.getPoint()).toEqual(30);
  })
  test("A pencil point should reduce by one for each lower case letter", () => {
    let point = pencil.getPoint();
    let test = 'a';
    writer.write(test);
    expect(pencil.getPoint()).toEqual(point - test.length);
  });

  test("A pencil point should reduce by two for each upper case letter", () => {
    let point = pencil.getPoint();
    let test = 'A';
    writer.write(test);
    expect(pencil.getPoint()).toEqual(point - 2);
  });

  test("A pencil point should not degrade for white space characters", () => {
    let point = pencil.getPoint();
    let test = ' ';
    let testTwo = `
    `
    writer.write(test);
    writer.write(testTwo)
    expect(pencil.getPoint()).toEqual(point);
  });

  test('if a pencil point is out of characters, it should append a blank space', () => {
    let point = pencil.getPoint();
    let test = Array(point + 2).join('x');
    writer.write(test);
    let paperText = paper.viewPaper();
    let lastChar = paperText[paperText.length - 1];
    expect(lastChar).toEqual(' ')
  });
})

describe("A pencil can be sharpened", () => {
  test("A pencil can be sharpened which will restore it's point to initial durability", () => {
    let point = pencil.getPoint();
    let test = Array(point).join('x');
    writer.write(test);
    pencil.sharpen();
    expect(pencil.getPoint()).toEqual(point);
  })

  test("A pencil loses length when it is sharpened", () => {
    let initLength = pencil.getLength();
    pencil.sharpen();
    expect(pencil.getLength()).toEqual(initLength - 1);
  })

  test("once a pencil loses all length it can not be sharpened anymore", () => {
    let initLength = pencil.getLength();
    for (let i = 1; i <= initLength; i++) {
      pencil.sharpen()
    }
    let postLength = pencil.getLength();
    expect(postLength).toEqual(0);
    pencil.sharpen();
    let finalLength = pencil.getLength();
    expect(finalLength).toEqual(0);
  })
  test('Once a pencil cannot be sharpened, and it runs out of durability it will not write ever again', () => {
    let initLength = pencil.getLength();
    for (let i = 1; i <= initLength; i++) {
      pencil.sharpen()
    }
    let postLength = pencil.getLength();
    expect(postLength).toEqual(0);
    let point = pencil.getPoint();
    let test = Array(point + 2).join('x');
    writer.write(test);
    pencil.sharpen();
    let postPoint = pencil.getPoint();
    expect(postPoint).toEqual(0)
  })
})

describe('eraser should erase', () => {
  test('when a writer erases a word, the last instance of that word should be replaced with spaces', () => {
    let test = 'test this thing';
    let word = 'test';
    writer.write(test);
    writer.erase(word);
    let text = paper.viewPaper();
    expect(text).toEqual('     this thing');

  })
  test('if a writer tries to erase a word they did not write, nothing will happen', () => {
    let test = "tiger";
    let word = "bird";
    writer.write(test);
    writer.erase(word);
    let text = paper.viewPaper();
    expect(text).toEqual(test);
  });

})

describe('eraser should degrade', () => {
  test('when pencils are created you should be able to assign a value to the eraser', () => {
    let pencilTwo = new Pencil(50, 10, 100);
    expect(pencil.getEraser()).toEqual(100);
  })

  test('eraser should degrade 1 point for each character removed', () => {
    let test = 'a b c';
    let toRemove = 'c';
    let initEraser = pencil.getEraser();
    writer.write(test);
    writer.erase(toRemove);
    let postEraser = pencil.getEraser();
    expect(postEraser).toEqual(initEraser - toRemove.length);
  })

  test('white spaces should not cause degredation', () => {
    let test = 'a b c';
    let toRemove = ' ';
    let initEraser = pencil.getEraser();
    writer.write(test);
    writer.erase(toRemove);
    let postEraser = pencil.getEraser();
    expect(postEraser).toEqual(initEraser);
  });

  test('eraser should only erase within its budget', () => {
    let test = "willy wonka";
    let toRemove = 'wonka';
    pencil.degradeEraser(96);
    let currentE = pencil.getEraser();
    expect(currentE).toEqual(4);
    writer.write(test);
    writer.erase(toRemove);
    expect(paper.viewPaper()).toEqual('Willy w    ')
  })
})