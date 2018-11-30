// Let's create our own strategy
var strat = {};

// Prepare everything our strat needs
strat.init = function() {
  // your code!
  this.addTulipIndicator('mymacd', 'macd',{
    optInFastPeriod: 10,
    optInSlowPeriod: 26,
    optInSignalPeriod: 9
  });
  this.addTulipIndicator('adx', 'adx',{
    optInTimePeriod:14
  });
  this.addTulipIndicator('dema60', 'dema',{
    optInTimePeriod:40
  });
}


var up = false;
var canBuy = false;
//var  = false;
var boughtAt = 0;
var csp = 0; //csp :current selling price.
var cnt=1;
var green = false;
//var count = 0;

strat.check = function(candle) {
  //console.log(candle.start.format('DD, HH:mm'));
  //console.log('######## tulipIndicators #############')
  //console.log(candle.start.format("DD-MM-YYYY HH:mm"));
  //console.log(this.tulipIndicators);

  //const ema21= this.tulipIndicators.ema21.result.result;
  const macHistogram = this.tulipIndicators.mymacd.result.macdHistogram;
  const mac = this.tulipIndicators.mymacd.result.macd;
  const macS = this.tulipIndicators.mymacd.result.macdSignal;
  const adx = this.tulipIndicators.adx.result.result;
  const dema60 = this.tulipIndicators.dema60.result.result;

  if (macHistogram > 0) {
    up = true;
  }else if (macHistogram < 0){
    up = false;
  }

  if(canBuy == false && boughtAt>0) {
    if(candle.close > candle.open){
      csp = candle.close - candle.close* .015;
      green = true;
    }else if (candle.close < candle.open) {
      green = false;
    }
  }

  if (up == true && canBuy == true && mac < 0 && macS < 0 && dema60 < candle.high && dema60 < candle.low) {
    
      this.advice('long');
      canBuy =false;
      boughtAt = candle.close;
      csp = candle.close - candle.close *.015;
      console.log('################################################')
      // console.log(this.tulipIndicators);
      console.log(candle.start.utcOffset(0).format("DD-MM-YYYY HH:mm"));
      console.log("bought: "+ boughtAt);
      console.log('open:'+candle.open+' | close:'+candle.close);
      console.log('dema60: ' + dema60);
      console.log('mac, macS, adx: ' + mac+ ', '+ macS+ ', ' + adx);
    //  count = 0;
    
  }else if (boughtAt > 0 && candle.close < csp && green == false) {
    console.log('## Sell ############**************************')
    console.log(candle.start.utcOffset(0).format("DD-MM-YYYY HH:mm"));
    console.log('open:'+candle.open+' | close:'+candle.close);
    //console.log((boughtAt - candle.close)/boughtAt);
    this.advice('short');
    boughtAt=0;
    canBuy=true;
    csp = 0;
  }else if (up == false && canBuy==false && cnt<2) {
    canBuy = true;
    cnt++;
    //this.advice('short');
    console.log('## Sell false ##');
    console.log(candle.start.utcOffset(0).format("DD-MM-YYYY HH:mm"));
    console.log('open:'+candle.open+' | close:'+candle.close);
    console.log('boughtAt: '+boughtAt);
  }
}
module.exports = strat;