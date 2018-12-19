class User {

  constructor() {
    this.name = null;
    this.messages = [];
    
  }

    addMessage(message) {
        this.messages.push(message);
    }
  // methods

    
    getAverageMessageLength() {
        var numberOfWords = 0;
            this.messages.forEach( function(m) {
                var wordSplit = m.content.split(' ');
                numberOfWords += wordSplit.length;
            });
            var avg = numberOfWords / this.messages.length;
    return Math.round( avg * 10 ) / 10;
                                                            
}
}

class Message {
    constructor(date, content) {
        this.date = date;
        this.content = content;
    }
}


