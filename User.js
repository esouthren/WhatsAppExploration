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
    
    getBusiestHour() {
        var messagesByHour = this.getMessagesByHour();
        var max = 0;
        for(var i = 0; i < messagesByHour.length; ++i) {
            if (messagesByHour[i] > max) {
                max = i;
            }
        }
        return max;
    }
    
    getQuantityOfCharacter(chr) {
        var count = 0;
        this.messages.forEach( function(y) {
            for (var i = 0; i < y.content.length; ++i) {
                if(y.content.charAt(i)===chr) {
                    count++;
                }
            }
            
        });
        return count;
    }
}

class Message {
    constructor(date, content) {
        this.date = date;
        this.content = content;
    }
}


