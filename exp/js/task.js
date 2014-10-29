//params
var short_displaytime = 500;//1/2 sec, length of time face seen at training
var long_displaytime = 1000;//1 sec, length of time face seen at training
var hm_trainingfaces = 40; //assume half are long and half are short displaytimes.
var loadDelay = 500; //interval between clicking 'next' and seeing the face.

//TRAINING TASK
//participant state info
var lineupID = [];
for(var i=0;i<lineups.length;i++){
if(i!=0&&i!=1&&i!=13)lineupID.push(i); //0,1,and 13 are bad lineups: some images don't display properly. Lucky only 80 lineups are needed!
}
shuffle(lineupID);

var faceID = [];
for(var i=0;i<hm_trainingfaces;i++)faceID.push(shuffle([0,1,2,3,4,5])[0]);

var displaytime= [];
while(displaytime.length<hm_trainingfaces){displaytime.push(short_displaytime); displaytime.push(long_displaytime);}
shuffle(displaytime);

var lastClick; //stores a time since 1970, used by studystim objects to calculate interstim_intervals
var interstim_intervals=[];//Records 'deliberation time', interval between clicks of the 'next' button

var trialcounter = 0;

function nextTrial(){
    if(trialcounter==hm_trainingfaces){
	finishTraining();//finishTraining() is defined in 'preamble.js', because it's an admin/wrapper sort of thing.
    //SAVE DATA HERE
    }
    else{
	// studyStim(imgFile,targDiv,loadDelay,presentationTime)
	new studyStim(lineups[lineupID[trialcounter]][faceID[trialcounter]],'uberdiv',loadDelay,displaytime[trialcounter]).init()
	trialcounter++;
    }
}

//TEST TASK
var condition = shuffle(["presentabsent","mostlikely","nominate"])[0];//TODO set from participantID key (in preamble.js)
var inspection_intervals=[]; //Records time between test item loading and the next button being hit.
var responses = []; //responses pushed here by teststim objects
var confRatings = [];
var testCounter = 0;

var testStimLoadTime; //set on init, inspection_interval is the difference between this and when 'next' is clicked.

function nextTest(){
console.log("test#"+testCounter);
if(testCounter==lineupID.length)finishTest(); //note since the page has been re-loaded, lineupID is not the same shuffle as in training. 
else{
    new testStim(lineups[lineupID[testCounter]],"uberdiv",condition).init();
};
testCounter++;
}

