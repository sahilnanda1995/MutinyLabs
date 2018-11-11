// Let's create our own strategy
var strat = {};

// Prepare everything our strat needs
strat.init = function() {
  // your code!
}

let x="00";// Created a global variable to reset the value of total trades each day. 
let sum = 0;//Created a global variable to calculate the total trades per day.
strat.check = function(candle) {

  //I have taken the average of open and close value to calculate the value of shares traded per minute.
  //if we want i can also take average of high and low share price or can only take open/close value to calculate the total shares value traded per minute.
  if(x!=candle.start.format('DD')){
  	x=candle.start.format('DD');
  	totalTrades= candle.trades; 
  	sum = (candle.open + candle.close)/2 * candle.trades;
  }else{
  	totalTrades += candle.trades; 
  	sum += (candle.open + candle.close)/2 * candle.trades;
  }
  let VWAP= sum/totalTrades;
  //console.log(candle); //Uncomment for more details on trades per minute
  console.log("VWAP: "+ VWAP);

// I was given to indicate buy when current price > VWAP.
  if (candle.open < VWAP) {
  	this.advice('long');
  }else{         //if we want the selling indicator too we can uncomment this else element.
  	this.advice('short');
  }
}

module.exports = strat;