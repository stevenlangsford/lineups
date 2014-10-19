//display params
var canvasheight = 500;
var canvaswidth = 500;

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

var nextButtonFn; //needs to be at top level to be visible to a button, used in onclick. Function body set just-in-time by studyStim objects.

function studyStim(imgFile,targDiv,loadDelay,presentationTime){
    
    function drawPic(picfile){
      var canvas = document.getElementById('stimCanvas');
      var context = canvas.getContext('2d');
      var imageObj = new Image();
      imageObj.onload = function() {
          context.drawImage(imageObj,0,0);//drawImage(imageobject, x, y,width,height) width and height are optional, if ommited uses image width/height. 
      };
	imageObj.src = "stim/"+picfile; // assuming a file structure: index.html in with stim folder.
    }
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
    }

    this.init= function(){//init is only contact with outside world
	document.getElementById(targDiv).innerHTML="<button onclick=nextButtonFn()>Next</button>";
	nextButtonFn = function(){
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
    this.print = function(){
    //return a string to save
    }
}//end of studyStim displayer object
