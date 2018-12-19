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
    var avg = this.getTotalWordCount() / this.messages.length;
    return Math.round( avg * 10 ) / 10;
                                                            
    }
    
    getTotalWordCount() {
        var count = 0;
            this.messages.forEach( function(x) {
                    var wordSplit = x.content.split(' ');
                   count += wordSplit.length;   
            });
        return count;
    }
    
    getMessagesByHour() {
        var messagesByHour = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.messages.forEach( function(y) {
            var hour = y.date.getHours();
            messagesByHour[hour]+=1;            
        });
        return messagesByHour;
    }
}

class Message {
    constructor(date, content) {
        this.date = date;
        this.content = content;
    }
}


