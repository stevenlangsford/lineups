//Instructions, demographics questions, thank you message, and the definition of saveData lives here
//Basically, everything that's not the task itself.

var instructionchapters = ["Thank you for your interest in this study! Please read these instructions carefully, they will be followed by a short quiz","The study has two parts. In the first part, you'll be shown a collection of faces to remember. You'll be able to go through the faces at your own speed, but each face will only be shown for a limited amount of time.","Each time you click the 'next' button, a new face will be shown briefly. There are 40 faces to remember, so this part of the study should take around 15 minutes.","Please be prepared to log in again to do the second part of the study at about this time tomorrow.","In the second part of the study, you'll be given a lineup task to test your memory of the faces you're about to see. You'll get feedback about your accuracy at the end.","On the next page, you'll be asked some questions about these instructions. There are also a couple of demographics questions for our records. The whole task is expected to take around 15 minutes.</p>This is part of a study being run by the University of Adelaide. By clicking 'Next', you are agreeing to take part in it. You should know that you're free to withdraw at any time (although you'll only be paid on completion), and that although data gained from this study may be published, you will not be identified and your personal details will not be divulged.<p style=\"font-size:.8em\">Please direct any questions about this study to the principle investigator, Dr. John Dunn (john.dunn@adelaide.edu.au). For any questions regarding the ethics of the study, please contact the convenor of the Subcommittee for Human Research in the School of Psychology at the University of Adelaide, Dr. Paul Delfabbro (+61)08 8313 4936.</p>"];

var instructioncounter = 0;

function instructions(){
if(instructioncounter>=instructionchapters.length){instructionquiz(); return;}
document.getElementById("uberdiv").innerHTML=instructionchapters[instructioncounter]+"<br/><button onclick=instructions()>Next</button>";
instructioncounter++;
}


function instructionquiz(){
    scroll(0,0);
    //var plausible = [25,50,75,90];
    document.getElementById("uberdiv").innerHTML="<h3>Are you ready?</h3><br/>"+
	"<span style='text-align:left'><p>"+
	"<strong>What will you be asked to do in this first part of the study?</strong></br>"+
	"<input type=\"radio\" name=\"value\" id=\"allthefaces\" value=\"rich\"/>&nbsp Keep clicking 'next' until you've seen all the faces.<br/>"+
	"<input type=\"radio\" name=\"value\" id=\"bothsamegroup\" value=\"poor\"/>&nbsp Watch a short video of a mock crime scene.<br/>"+
	"<input type=\"radio\" name=\"value\" id=\"both\" value=\"both\"/>&nbsp Memorize nonsense words.<br/>"+
	"<input type=\"radio\" name=\"value\" id=\"neither\" value=\"neither\"/>&nbsp Report whether or not you recognize any of 40 faces presented.<br/></p>"+
	"</span>"+

    "<span style='text-align:left'>"+
	"<p><strong>When does the second part of the study happen?</strong></br>"+
	"<input type=\"radio\" name=\"howsparse\" id=\"fifteenpc\" value=\"10\"/>&nbsp Half an hour after the first part.<br/>"+
	"<input type=\"radio\" name=\"howsparse\" id=\"howmanycats\" value=\"30\"/>&nbsp About eight hours after the first part.<br/>"+
	"<input type=\"radio\" name=\"howsparse\" id=\"tomorrow\" value=\"50\"/>&nbsp Approximately this time tomorrow.<br/>"+
	"<input type=\"radio\" name=\"howsparse\" id=\"seventyfivepc\" value=\"70\"/>&nbsp Approximately this time next week.<br/>"+
	"<input type=\"radio\" name=\"howsparse\" id=\"ninetypc\" value=\"90\"/>&nbsp You'll be notified by email in a few weeks' time.<br/>"+
	"</p>"+
	"</span>"+

    "<span style='text-align:left'>"+
	"<p><strong>What will you be asked to do in the second part?</strong></br>"+
	"<input type=\"radio\" name=\"howsample\" id=\"timelimit\" value=\"time\"/>&nbsp Keep clicking 'next' until you've seen all the faces.<br/>"+
	"<input type=\"radio\" name=\"howsample\" id=\"limfifty\" value=\"fifty\"/>&nbsp Answer questions about the short video presented in the first part<br/>"+
	"<input type=\"radio\" name=\"howsample\" id=\"suibian\" value=\"suibian\"/>&nbsp List nonsense words memorized in the first part<br/>"+
	"<input type=\"radio\" name=\"howsample\" id=\"lineups\" value=\"score\"/>&nbsp A series of mock lineups to see how well you remember the faces from the first part.<br/></p>"+
	"</span>"+
	"<span style='text-align:left'>"+
	"<button onclick=\"quizvalidate()\">Begin!</button>";
}


function quizvalidate(){
    var valid=document.getElementById("allthefaces").checked && document.getElementById("tomorrow").checked && document.getElementById("lineups").checked;
    if(valid){
	demographics();
    }
    else {
	alert("You didn't answer all the questions correctly. Please read through the instructions and take the quiz again to continue.");
	instructioncounter=0;
	scroll(0,0);
	instructions();
    }
}

function demographics(){
document.getElementById("uberdiv").innerHTML="Some demographic questions<br/><button onclick=nextTrial()>Next</button>";
}

function finish(){
document.getElementById("uberdiv").innerHTML="You're done! Thank you for participating!";
}

function saveData(data) {
  (function (d) {
    $.post('submit',  {"content": JSON.stringify(d)});
  })(data);
}
