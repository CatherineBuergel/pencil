class Paper {
  paper = '';
  addText(text) {
    this.paper += text;
  }

  viewPaper() {
    return this.paper;
  }


  erase(text) {
    debugger;
    let newPaper = this.paper.split('');
    let start = this.paper.lastIndexOf(text);
    let end = start + text.length;
    for (let i = start; i <= end; i++) {
      newPaper[i] = ' ';
    }
    this.paper = newPaper.join('')
  }

  //to do edit

}

module.exports = { Paper };