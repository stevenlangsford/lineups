//display params
var canvasheight = Math.round(500*.5); //sizes are expressed in this way because 500x400 seems to get the proportions right, then .5 is a scaling factor, tinker at will.
var canvaswidth = Math.round(400*.5);


var nextButtonFn; //needs to be at top level to be visible to a button, used in onclick. Function body set just-in-time by studyStim objects.

function studyStim(imgFile,targDiv,loadDelay,presentationTime){

    //tools/helper functions
    function functionChain(fns, times){
	//functionChain calls each function in an array fns, in order with post-call delays specified by times.
	if(fns.length-1!=times.length)console.error("Mismatching fns and times passed to functionChain");
	function fncaller(callindex){
	    if(callindex>=fns.length)return;
	    fns[callindex]();
	    setTimeout(function(){fncaller(callindex+1)},times[callindex])
	}
	fncaller(0);
    }

    function drawPicChain(picfiles,displaytimes){
	var imageObjs = [];
	var imageDrawerFns = [];

	var flag = 0;//counts how many images have run their onload function. Only show the sequence of images after they've all loaded.
	function startflag(){
	    if(flag==picfiles.length-1){
		imageDrawerFns.push(function(){clearStim()});
		displaytimes.push(presentationTime);
		functionChain(imageDrawerFns,displaytimes);
	    }
	    else{
		console.log(flag);
		flag++;
	    }
	}
	for(var i=0;i<picfiles.length;i++){
	    imageObjs[i]= new Image();
	    imageObjs[i].src="stim/"+picfiles[i];
	    imageObjs[i].onload = function(){
		startflag();
	    }
	    ifixer = function(ani){
		return function(){
		    console.log(ani+"::"+imageObjs[ani]);
		    var canvas = document.getElementById('stimCanvas');
		    var context = canvas.getContext('2d');
		    context.drawImage(imageObjs[ani],0,0,canvaswidth,canvasheight);
		    console.log("drawing image "+ani);
		}

	    }
	    imageDrawerFns.push(ifixer(i)); //if you don't use a function creating function to fix i, i continues to refer to the loop index (which keeps incrementing and will probably be at the end-value by the time the function runs.)
	}
	
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
	    document.getElementById(targDiv).innerHTML="<canvas id='stimCanvas' height='"+canvasheight+"' width='"+canvaswidth+"'></canvas>";
	    drawPicChain(["fixationdot.jpg",imgFile],[500]);
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

    document.getElementById('uberdiv').style.top="0%";//Hmm, bad place to do this? :-(

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
    
	var lineupTable = "<table class='testTable'>";
	
	var lineuplength = lineupImgs.length;
	//if(condition=="nominate")lineuplength=lineuplength+1;//leave space for 'not present' response.

	//set question by condition
	lineupTable+="<tr>";
	lineupTable+="<td colspan="+(lineupImgs.length/2)+">";
	if(condition=="presentabsent") lineupTable+="<h3>Does this lineup contain a face you were shown in the study phase?</h3>";
	if(condition=="mostlikely") lineupTable+="<h3>Which of these faces is most likely to be one you were shown in the study phase?</h3>";
	if(condition=="nominate") lineupTable+="<h3>Please indicate which of these faces you saw in the study phase, or 'No match' if none of them were shown.</h3>";
	lineupTable+="</td>";
	lineupTable+="</tr><tr>";

	
	for(var i = 0;i<lineuplength;i++){
	    lineupTable+="<td>"+
		"<canvas id='"+targDiv+"canvas"+i+"' height='"+canvasheight+"' width='"+canvaswidth+"'></canvas></br>";
	    if(condition=="mostlikely"||condition=="nominate"){
		lineupTable+="Face "+(i+1)+"</br>";
		lineupTable+="<input type='radio' name='response' id='response"+i+"' value='"+(i+1)+"'></td>"; //value 1-6, 0=absent
	    }
	    lineupTable+="</td>";

	    if(i==lineuplength/2-1)lineupTable+="</tr><tr><td colspan='"+(lineuplength/2)+"'>&nbsp</td></tr><tr>";//3x2 presentation
	}
	lineupTable+="</tr>";

	//Set response option by condition
	if(condition=="presentabsent") {
	    lineupTable+="<tr>";
	    lineupTable+="<td colspan="+(lineupImgs.length/2)+">";
	    lineupTable+="<button onclick='testResponseFn(\"yes\")'>Yes</br>There is a face that was shown before in this lineup</button></h3>";
	    lineupTable+="<button onclick='testResponseFn(\"no\")'>No</br>There is no face that was shown before in this lineup</button></h3>";
	    
	    testResponseFn=function(response){
		inspection_intervals.push(new Date().getTime()-testStimLoadTime);
		responses.push(response);
		document.getElementById('uberdiv').innerHTML=confratingHTML;
	    }
	    lineupTable+="</td></tr>"
	}//end if condition=presentabsent

	 if(condition=="mostlikely"||condition=="nominate"){
	if(condition=="nominate"){
	    lineupTable+="<tr><td colspan='"+(lineuplength/2)+"'>No match</br><input type='radio' name='response' id='response0' value='0'></td></tr>";	    
	}
	     
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
	}//end if condition==mostlikely||condition==nominate
	lineupTable+="</tr>";
	lineupTable+="</table>";

	document.getElementById(targDiv).innerHTML=lineupTable;
//	for(var i=0;i<lineupImgs.length;i++)drawPic(lineupImgs[i],targDiv+"canvas"+i);
    
    this.init=function(){
	testStimLoadTime = new Date().getTime();
	var flag = 0; //counts how many onloads have run
	var imageObjs = []; //holds images corresponding to lineupImgs
	function startflag(){//called by onload: last one to load draws all images to a canvas.
	    flag++;
	    console.log(flag);//diag
	    if(flag==lineupImgs.length){
		console.log("DRAWIN");
		for(var i=0;i<lineupImgs.length;i++){
		    drawPic(imageObjs[i],targDiv+"canvas"+i);
		}
	    }
	}
	
	for(var i=0;i<lineupImgs.length;i++){
	    imageObjs.push(new Image());
	    imageObjs[i].onload = function(){startflag();}
	    imageObjs[i].src="stim/"+lineupImgs[i];
	}
	
	function drawPic(picObj, canvasID){//canvas id's are 'canvas0' through 'canvas5'
	    console.log("TRYN "+canvasID+":"+picObj+"::"+document.getElementById(canvasID));
	    var canvas = document.getElementById(canvasID);
	    var context = canvas.getContext('2d');
	    context.drawImage(picObj,0,0,canvaswidth,canvasheight);
	}

    }//end init


}//end testStim
