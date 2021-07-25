class Pencil {

  constructor(durability = 50, length = 10, eraser = 100) {
    this.eraser = eraser;
    this.point = durability;
    this.maxPoint = durability;
    this.length = length;
    this.maxLength = length;
  }
  getPoint() {
    return this.point;
  }

  setPoint(point) {
    this.point = point;
  }
  getLength() {
    return this.length;
  }
  setLength(length) {
    this.length = length;
  }

  getEraser() {
    return this.eraser;
  }

  degradeEraser(val) {
    this.eraser -= val;
  }

  sharpen() {
    if (this.length > 0) {
      this.setPoint(this.maxPoint);
      this.setLength(this.length - 1);
    }
  }
}

module.exports = { Pencil };

//talk to sam about refactoring using decrement method instead of calling and passing in a val