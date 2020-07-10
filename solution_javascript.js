class EventSourcer {

  constructor() {
    this.value = 0;
    this.stack = [];
    this.undoStack = [];
  }

  add(num) {
    this.value += num;
    this.stack.push({type: "add", payload: num});
  }

  subtract(num) {
    this.value -= num;
    this.stack.push({type: "sub", payload: num});
  }

  undo() {
    if (this.stack.length >= 1) {
      let action = this.stack[this.stack.length - 1];
      this.stack.splice(this.stack.length-1,1);
      this.undoStack.push(action);
      if (action.type === "add") {
        this.value -= action.payload;
      } else {
        this.value += action.payload;
      }
    }
  }

  redo() {
    if (this.undoStack.length >= 1) {
      let action = this.undoStack[this.undoStack.length - 1];
      this.undoStack.splice(this.undoStack.length-1,1);
      if (action.type === "add") {
        this.value += action.payload;
      } else {
        this.value -= action.payload;
      }
    }
  }

  bulk_undo(num) {
    while (num > 0 && this.stack.length >=1) {
      this.undo();
      num--;
    }
  }

  bulk_redo(num) {
    while (num > 0 && this.undoStack.length >=1) {
      this.redo();
      num--;
    }
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
