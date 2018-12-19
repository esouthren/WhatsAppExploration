class User {

  constructor() {
    this.name = null;
    this.numberOfMessages = null;
    this.messages = [];
    this.messagingDuration = null;
    
  }

    addMessage(date, time, context) {
        this.messages.push(new Message(date, time, context));
    }
  // methods

    getDurationOfMessaging() {
        var first = this.messages[0];
        var last = this.messages[messages.length-1];
        
        this.messagingDuration = last - first; 
    }
}

class Message {
    constructor(date, content) {
        this.date = date;
        this.content = content;
    }
}


