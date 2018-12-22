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
    
    getWordCount(limit) {
        var excludeWords = [ "i", "you", "me", "the", "she", "he", "a", "on", "to", "and", "is", "of", "<media", "omitted>\n" ];
        var dict = {};
        this.messages.forEach( function(d) {
           var wordSplit = d.content.split(' ');
            wordSplit.forEach( function (w) {
                w = w.toLowerCase();
                w = w.replace(/[^a-zA-Z0-9À-ž\s]/g, "");
                if(!excludeWords.includes(w)) {
                    if(w.length > limit) {
                    if(w in dict) {
                        dict[w] = dict[w]+1;
                    } else {
                        dict[w] = 1;
                    }
                    }
                }
            });
        });
        return dict;
    }
    
    getTopWordsOrderedArray(limit) {
        var dict = this.getWordCount(limit);
       var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
       });

        // Sort the array based on the second element
        items.sort(function(first, second) {
    return second[1] - first[1];
        });

        return items;    
    
    }
    
    getMessagesPerMonth() {
        var dict = {}
        // { "mm yy": count}
        this.messages.forEach( function (m) {
            var monthYear = m.date.getMonth().toString() + " " + m.date.getYear().toString();
            if (monthYear in dict) {
                dict[monthYear] = dict[monthYear]+1;
            } else {
                dict[monthYear] = 1;
            }
        });
        return dict;
    }
    
    getMessagesPerMonthSorted() {
        
        var dict = this.getMessagesPerMonth;
       var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
       });

        // Sort the array based on the second element
        items.sort(function(first, second) {
    return first[1] - second[1];
        });

        return items;    
    }
    
    getBusiestMonth() {
        var months = this.getMessagesPerMonth();
        var maxCount = 0;
        var maxMonth = 0;
        var maxYear = 0;
        Object.keys(months).forEach(function(key) {
            if(months[key] > maxCount) {
                var s = key.split(" ");
                maxCount = months[key];
                maxYear = s[1].slice(1,);
                maxMonth = s[0];
            }
        });
        return [ maxMonth, maxYear, maxCount ];
    }

        
    
}

class Message {
    constructor(date, content) {
        this.date = date;
        this.content = content;
    }
}


