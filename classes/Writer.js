class Writer {
  constructor(paper, pencil) {
    this.paper = paper;
    this.pencil = pencil;
  }

  getDegradation(char) {
    let upperRegex = new RegExp(/[A-Z]/)
    let whiteSpace = new RegExp(/\s/);
    if (upperRegex.test(char)) {
      return 2;
    }
    if (whiteSpace.test(char)) {
      return 0;
    }
    return 1;
  }
  write(text) {
    text.split('').forEach(char => {
      let point = this.pencil.getPoint();
      let cost = this.getDegradation(char);
      if (point - cost >= 0) {
        this.paper.addText(char);
        this.pencil.setPoint(point - cost);
      } else {
        this.paper.addText(' ');
      }

    })
  }

  erase(text) {
    debugger;
    let paperView = this.paper.viewPaper();
    let budget = this.pencil.getErasure();

    if (!paperView.includes(text) || budget === 0) return;

    let noWhiteSpace = text.replace(/\s/g, "")
    let cost = noWhiteSpace.length
    let total = budget - cost;
    // if () {

    // }

  }
}

module.exports = { Writer };