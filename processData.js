/* Functions that fill User classes with data (e.g. number of messages, dates, etc) */

function processData(rawData) { 
    
    let a = new User();
    let b = new User();
    let ab = new User();
    
   
    
    // loop through each message
    // extract user, date, time, content and add to User's Messages list
    
    // splits into array of "dd/mm/yyyy, hh:mm - user: message"
    // eg "25/04/2018, 10:01 - Marlowe: Bank details later X"
    var delimiterPattern = /(\d\d\/\d\d\/\d\d\d\d,\s\d\d:\d\d\s-\s.*: .*\n)/g;
    var messages = rawData.split(delimiterPattern);
    // remove empty strings
    var messages = messages.filter(Boolean);
    
    
    ab.numberOfMessages = messages.length;
    console.log("messages: " + messages.length);
        
    messages.forEach( function(m) {
  
        var parts = m.slice(0,10).split('/');
        var messageTime = m.slice(12,17).split(':');
        // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
        // January - 0, February - 1, etc.
        var messageDate = new Date(parts[2], parts[1] - 1, parts[0], messageTime[0], messageTime[1], 0,0);
        
        var senderAndMessage = m.slice(20,);
        senderAndMessage = senderAndMessage.split(': ');
        var messageSender = senderAndMessage[0];
        
        var messageContent = senderAndMessage[1];
        let message = new Message(messageDate, messageContent);
        
        if(messageSender===a.name) {
                a.addMessage(message);
            }
            if(messageSender===b.name) {
                b.addMessage(message);
            } else {
                if(a.name==null) { 
                    a.name = messageSender;
                    a.addMessage(message);
                } else if ((b.name==null) && (messageSender != a.name)) { 
                    b.name = messageSender; 
                    b.addMessage(message);
                } 
            }
        ab.addMessage(message);
    });
    
    
    userData = { a, b, ab };
    return userData;
}