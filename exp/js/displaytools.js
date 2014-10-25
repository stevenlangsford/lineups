//display params
var canvasheight = Math.round(500*.5); //sizes are expressed in this way because 500x400 seems to get the proportions right, then .5 is a scaling factor, tinker at will.
var canvaswidth = Math.round(400*.5);


var nextButtonFn; //needs to be at top level to be visible to a button, used in onclick. Function body set just-in-time by studyStim objects.

function studyStim(imgFile,targDiv,loadDelay,presentationTime){

    //tools/helper functions
    function functionChain(fns, times){
	//functionChain calls each function in an array fns, in order with delays specified by times.
	if(fns.length-1!=times.length)console.error("Mismatching fns and times passed to functionChain");
	function fncaller(callindex){
	    if(callindex>=fns.length)return;
	    fns[callindex]();
	    setTimeout(function(){fncaller(callindex+1)},times[callindex])
	}
	fncaller(0);
    }
    
    function drawPic(picfile){
	var canvas = document.getElementById('stimCanvas');
	var context = canvas.getContext('2d');
	var imageObj = new Image();
	imageObj.onload = function() {
            context.drawImage(imageObj,0,0,canvaswidth,canvasheight);//drawImage(imageobject, x, y,width,height) width and height are optional, if ommited uses image width/height. 
	};
	imageObj.src = "stim/"+picfile; // assuming a file structure: index.html in with stim folder.
    }
    //events that happen in sequence in the presentation of a study stim, wrapped up as functions just so they can be passed to functionChain in a nice human-readable way.
    function placeCanvas(){
	document.getElementById(targDiv).innerHTML="<canvas id='stimCanvas' height='"+canvasheight+"' width='"+canvaswidth+"'></canvas>";
    }
    function fixation(){
	drawPic("fixationdot.jpg");
    }
    function showStim(){
	drawPic(imgFile);
    }
    function clearStim(){
	var canvas = document.getElementById("stimCanvas");
	var context = canvas.getContext('2d');
	context.clearRect(0,0,canvas.width,canvas.height);
	nextTrial();//defined in training_task.js
    }

    this.init= function(){//init is only contact with outside world
	document.getElementById(targDiv).innerHTML="<button onclick=nextButtonFn()>Next Face</button></br>";
	nextButtonFn = function(){
	    interstim_intervals.push(new Date().getTime()-lastClick);
	    lastClick=new Date().getTime();
	    functionChain([
		function(){placeCanvas()},
		function(){fixation()},
		function(){showStim()},
		function(){clearStim()}
	    ],
			  [0,loadDelay,presentationTime]
			 );
	}
	// onclick is functionChain([placeCanvas,fixation,showstim, clearstim],[10,loadDelay,presentationTime])
    }
}//end of studyStim displayer object

var testResponseFn; //At this level to be visible to buttons, function body set just-in-time by testStim objects

function confratingFn(){
    if($('input[name="conf"]:checked').val()==undefined){
	alert("Please give a confidence rating to continue.");
	return;
    }
    else{
	confRatings.push($('input[name="conf"]:checked').val());
	nextTest();
    }
}

function testStim(lineupImgs,targDiv,condition){
    //lineup should be an array of images (here, 6 long). Condition should be one of 'presentabsent','mostlikely','nominate'
    //Should record lineupID, targID (0 if not present), confidence rating, inspection time
    //displayme function is called 'init' for consistency with studyStim

    var confratingHTML = ""+
	"<table class='centered'>"+
	"<tr><td colspan=5>Please rate your confidence in this response:</td></tr>"+
	"<tr><td>Guess</td><td>Possible</td><td>Probable</td><td>Almost certain</td><td>Certain</td></tr>"+
	"<tr>"+
	"<td><input type=\"radio\" name=\"conf\" id=\"conf0\" value=\"0\"/></td>"+
	"<td><input type=\"radio\" name=\"conf\" id=\"conf1\" value=\"1\"/></td>"+
	"<td><input type=\"radio\" name=\"conf\" id=\"conf2\" value=\"2\"/></td>"+
	"<td><input type=\"radio\" name=\"conf\" id=\"conf3\" value=\"3\"/></td>"+
	"<td><input type=\"radio\" name=\"conf\" id=\"conf4\" value=\"4\"/></td>"+
	"</tr>"+
	"<tr><td colspan=5 style='text-align:center'><button onclick='confratingFn()'>Next</button></tr>"+
	"</table>";
    
    this.init=function(){
	testStimLoadTime = new Date().getTime();
	function drawPic(picfile, canvasID){//canvas id's are 'canvas0' through 'canvas5'
	    var canvas = document.getElementById(canvasID);
	    var context = canvas.getContext('2d');
	    var imageObj = new Image();
	    imageObj.onload = function() {
		context.drawImage(imageObj,0,0,canvaswidth,canvasheight);//drawImage(imageobject, x, y,width,height) width and height are optional, if ommited uses image width/height. 
		
	    };
	    imageObj.src = "stim/"+picfile; // assuming a file structure: index.html in with stim folder.
	}
	
	var lineupTable = "<table class='testTable'>";
	
	var lineuplength = lineupImgs.length;
	if(condition=="nominate")lineuplength=lineuplength+1;//leave space for 'not present' response.

	//set question by condition
	lineupTable+="<tr>";
	lineupTable+="<td colspan="+lineupImgs.length+">";
	if(condition=="presentabsent") lineupTable+="<h3>Does this lineup contain a face you were shown in the study phase?</h3>";
	if(condition=="mostlikely") lineupTable+="<h3>Which of these faces is most likely to be one you were shown in the study phase?</h3>";
	if(condition=="nominate") lineupTable+="<h3>Please indicate which of these faces you saw in the study phase, or 'No match' if none of them were shown.</h3>";
	lineupTable+="</td>";
	lineupTable+="</tr><tr>";

	
	for(var i = 0;i<lineuplength;i++){
	    lineupTable+="<td><canvas id='"+targDiv+"canvas"+i+"' height='"+canvasheight+"' width='"+canvaswidth+"'></canvas></td>";
	}
	lineupTable+="</tr>";

	//Set response option by condition
	if(condition=="presentabsent") {
	    lineupTable+="<tr>";
	    lineupTable+="<td colspan="+lineupImgs.length+">";
	    lineupTable+="<button onclick='testResponseFn(\"yes\")'>Yes</br>There is a face that was shown before in this lineup</button></h3>";
	    lineupTable+="<button onclick='testResponseFn(\"no\")'>No</br>There is no face that was shown before in this lineup</button></h3>";
	    testResponseFn=function(response){
		inspection_intervals.push(new Date().getTime()-testStimLoadTime);
		responses.push(response);
		document.getElementById('uberdiv').innerHTML=confratingHTML;
	    }
	    lineupTable+="</td></tr>"
	}
	if(condition=="mostlikely"||condition=="nominate"){
	    lineupTable+="<tr>";
	    for(var i = 0;i<lineuplength;i++){
		if(i==6)lineupTable+="<td>No match</td>";
		else lineupTable+="<td>Face "+(i+1)+"</td>";
	    }
	    lineupTable+="</tr>";
	    lineupTable+="<tr>";
	    for(var i = 0;i<lineuplength;i++){
		lineupTable+="<td><input type='radio' name='response' id='response"+i+"' value='"+(i+1)%lineuplength+"'></td>"; //value 1-6, 0=absent
	    }
	    lineupTable+="</tr>";
	    lineupTable+="<tr><td colspan='"+lineuplength+"'><button onclick='testResponseFn()'>Next</button></tr>";
	    
	    testResponseFn=function(){

		if($('input[name="response"]:checked').val()==undefined){
		    alert("Please make a selection before continuing");
		    return;
		}

		responses.push($('input[name="response"]:checked').val());
		inspection_intervals.push(new Date().getTime()-testStimLoadTime);
		document.getElementById('uberdiv').innerHTML=confratingHTML;
	    }	
	}
	lineupTable+="</tr>";
	lineupTable+="</table>";

	document.getElementById(targDiv).innerHTML=lineupTable;
	for(var i=0;i<lineupImgs.length;i++)drawPic(lineupImgs[i],targDiv+"canvas"+i);
    }//end init


}//end testStim
