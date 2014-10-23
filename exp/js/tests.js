

//nextTrial(); //training stim. Displays ok, haven't run through to finish() yet.

//for(var i=0;i<lineups.length;i++){
//document.write("<div id='lup"+i+"'></div>");
//new testStim(lineups[i],"lup"+i,"presentabsent").init();
//}


// // testStim(lineupImgs,targDiv,condition){
var bill = new testStim(lineups[Math.round(Math.random()*lineups.length)],'uberdiv',"nominate");
bill.init();

console.log('done');
