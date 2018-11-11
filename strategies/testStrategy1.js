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
}


 var up = false;
 var canBuy = false;
 //var  = false;
 var boughtAt = 0;
 var cnt=1;
strat.check = function(candle) {
  //console.log(candle.start.format('DD, HH:mm'));
  // console.log('######## tulipIndicators #############')
  // console.log(candle.start.format("DD-MM-YYYY HH:mm"));
  // console.log(this.tulipIndicators);

 // const ema21= this.tulipIndicators.ema21.result.result;
  const macHistogram = this.tulipIndicators.mymacd.result.macdHistogram;
  const mac = this.tulipIndicators.mymacd.result.macd;
  const macS = this.tulipIndicators.mymacd.result.macdSignal;

//  console.log(ema21 +', '+ mac)

  if (macHistogram > 0) {
    up = true;
  }else if (macHistogram < 0){
    up = false;
  }

  if (up == true && canBuy == true && mac < 0 && macS < 0) {
    this.advice('long');
    canBuy =false;
    boughtAt = candle.close;
    console.log('################################################')
    // console.log(this.tulipIndicators);
    console.log(candle.start.utcOffset(0).format("DD-MM-YYYY HH:mm"));
    console.log("bought: "+ boughtAt);
    console.log('open:'+candle.open+' | close:'+candle.close);
  }else if (boughtAt > 0 &&((candle.close -boughtAt)/boughtAt)>0.01) {
    //.005 --> 9.63705187%
    // 0.01 --> 13.94210917%
    // 0.05 --> 12.68571695%

    console.log('## Sell ############**************************')
    console.log(candle.start.utcOffset(0).format("DD-MM-YYYY HH:mm"));
    console.log('open:'+candle.open+' | close:'+candle.close);
    console.log((boughtAt - candle.close)/boughtAt);
    this.advice('short');
    boughtAt=0;
    canBuy=true;
  }
  else if (up == false && canBuy==false && cnt<2) {
    canBuy = true;
    cnt++;
    this.advice('short');
    console.log('## Sell false ##')
    console.log(candle.start.utcOffset(0).format("DD-MM-YYYY HH:mm"));
    console.log('open:'+candle.open+' | close:'+candle.close);
    console.log('boughtAt: '+boughtAt);
  }

}


module.exports = strat;