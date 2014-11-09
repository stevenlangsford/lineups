//display params
var canvasheight = Math.round(500*.5); //sizes are expressed in this way because 500x400 seems to get the proportions right, then .5 is a scaling factor, tinker at will.
var canvaswidth = Math.round(400*.5);

while(canvasheight>screen.height*.65/2){//hacky mcHackHack? Proper way to scale these?
    canvasheight--;
    canvaswidth=canvasheight*4/5;
}
canvasheight=Math.round(canvasheight)
canvaswidth=Math.round(canvaswidth)

console.log(canvaswidth+":"+canvasheight);

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
		    var canvas = document.getElementById('stimCanvas');
		    var context = canvas.getContext('2d');
		    context.drawImage(imageObjs[ani],0,0,canvaswidth,canvasheight);
		}

	    }
	    imageDrawerFns.push(ifixer(i)); //if you don't use a function creating function to fix i, i continues to refer to the loop index (which keeps incrementing and will probably be at the end-value by the time the function runs.)
	}
	
    }
    function clearStim(){
	var canvas = document.getElementById("stimCanvas");
	var context = canvas.getContext('2d');
	context.clearRect(0,0,canvas.width,canvas.height);
	nextTrial();//defined in task.js
    }

    this.init= function(){//init is only contact with outside world
	document.getElementById(targDiv).innerHTML="<div style=\"width:"+canvaswidth+"px; height:"+canvasheight+"px;clear:both; display:block;\"></div><br/><button onclick=nextButtonFn()>Next Face</button></br>";
	
	nextButtonFn = function(){
	    interstim_intervals.push(new Date().getTime()-lastClick);
	    lastClick=new Date().getTime();
	    document.getElementById(targDiv).innerHTML="<canvas id='stimCanvas' height='"+canvasheight+"' width='"+canvaswidth+"'></canvas>";
	    drawPicChain(["fixationdot.jpg",imgFile],[500]);
	}
    }
}//end of studyStim-display object

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

    function getConfratingHTML(responsetype){
	//responsetype comes in as 'yes' or 'no' in presentabsent condition, or a number 0-6 in the other conditions (where 0 is no-match)
	var retHTML=""+
	    "<table class='centered'>"+
	    "<tr><td colspan=5>";
	
	if(responsetype!="no"&&responsetype!=0)retHTML+="How confident are you that the target <strong> is </strong> in the lineup?";
	else retHTML+="How confident are you that the target <strong> is not </strong> in the lineup?";
	
	retHTML+="</td></tr>"+
	    "<tr><td>Not confident at all, it's a guess</td><td>Somewhat confident</td><td>Very confident</td><td>As certain as I can be</td></tr>"+
	    "<tr>"+
	    "<td><input type=\"radio\" name=\"conf\" id=\"conf0\" value=\"0\"/></td>"+
	    "<td><input type=\"radio\" name=\"conf\" id=\"conf1\" value=\"1\"/></td>"+
	    "<td><input type=\"radio\" name=\"conf\" id=\"conf2\" value=\"2\"/></td>"+
	    "<td><input type=\"radio\" name=\"conf\" id=\"conf3\" value=\"3\"/></td>"+
	    "</tr>"+
	    "<tr><td colspan=5 style='text-align:center'><button onclick='confratingFn()'>Next</button></tr>"+
	    "</table>";
	return(retHTML);
    }
    
    var lineupTable = "<table class='testTable'>";
    
    var lineuplength = lineupImgs.length;
    //if(condition=="nominate")lineuplength=lineuplength+1;//leave space for 'not present' response.

    //set question by condition
    lineupTable+="<tr>";
    lineupTable+="<td colspan="+(lineupImgs.length/2)+">";
    if(condition=="presentabsent") lineupTable+="<h3>Does this lineup contain a face you were shown in the study phase?</h3>";
    if(condition=="mostlikely") lineupTable+="<h3>Which of these faces is most likely to be one you were shown in the study phase?</h3>";
    if(condition=="nominate") lineupTable+="<h3>Please indicate which of these faces you saw in the study phase,<br/> or 'No match' if none of them were shown.</h3>";
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
	    document.getElementById('uberdiv').innerHTML=getConfratingHTML(response);
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
	    document.getElementById('uberdiv').innerHTML=getConfratingHTML($('input[name="response"]:checked').val());
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
	    if(flag==lineupImgs.length){
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
	    var canvas = document.getElementById(canvasID);
	    var context = canvas.getContext('2d');
	    context.drawImage(picObj,0,0,canvaswidth,canvasheight);
	}

    }//end init
}//end testStim

var spacerGameFn;//Top level to be visible to buttons, body set just in time by spacerGame objects

function spacerGame(targDiv,runningTime){//runningTime is in millis. Current game is 'word/nonword'
    var path = "spacer_imgs/";
    var suffix = ".jpg";

    function imgdata(name,x1,y1,x2,y2){
	this.name=name;
	this.x=x1;
	this.y=y1;
	this.width=x2-x1;
	this.height=y2-y1;
    }
    var imglist = [new imgdata("Alley",91,93,125,254),new imgdata("Building",73,7,398,180),new imgdata("Canal",67,15,110,56),new imgdata("ChurchFront",170,90,267,172),new imgdata("Climber",113,227,176,316),new imgdata("Dorsay",178,43,229,145),new imgdata("Flowers",300,130,479,173),new imgdata("FlowerStairs",374,466,448,526),new imgdata("GrandCanal",127,251,216,334),new imgdata("Jardin",424,15,457,134),new imgdata("NotreDame",335,179,367,241),new imgdata("Plaza",255,137,318,166),new imgdata("Pope",306,334,398,471),new imgdata("Sailboat",0,0,76,251),new imgdata("Statue",154,340,194,373)];//all files are [name][1,2].jpg

    var imgcounter = 0;

    document.getElementById(targDiv)

    //HBD
    this.init=function(){
	var startTime = new Date().getTime();

	function nextScene(){
	    imgcounter = (imgcounter+1)%imglist.length;
	    listenerlayer=new Kinetic.Layer();
	    loadScene();
	}
	
	function go(){
	    if(new Date().getTime()-startTime>runningTime){
		testIntro();//defined in preamble.js
     		return;
            }

	    nextLayer();
	    setTimeout(function(){go()},1200);
	}
	function nextLayer(){
	    //	    layerlist[currentlayer].setZIndex(1);
	    layerlist[currentlayer].moveToTop();
	    listenerlayer.moveToTop();
	    
	    layerlist[currentlayer].draw();
	    currentlayer=(currentlayer+1)%layerlist.length;
	}

	    var layer1 = new Kinetic.Layer();
	    var masklayer = new Kinetic.Layer();
	    var layer2 = new Kinetic.Layer();
	    var listenerlayer = new Kinetic.Layer();

	    var layerlist = [masklayer,layer1,masklayer,layer2];
	    var currentlayer=0;

	function loadScene(){
	    var stage = new Kinetic.Stage({
		container: targDiv,
		width: 480,
		height: 550
	    });

	    stage.on('click',function(){
		pos = stage.getPointerPosition();
	    });

	    var imageObj1 = new Image();
	    var imageObj2 = new Image();
	    
	    var maskrect = new Kinetic.Rect({
		x: 0,
		y: 0,
		width: 480,
		height: 550,
		fill: 'white',
		stroke: 'black',
		strokeWidth: 4
	    });

	    
	    imageObj1.onload = function() {
		imageObj2.src = imgsrc2; //set in img1 onload to guarantee load order: when img1 load completes you're good to go.
	    };
	    
	    imageObj2.onload = function(){
		var img1 = new Kinetic.Image({
		    x: 0,
		    y: 0,
		    image: imageObj1,
		    width: 480,
		    height: 550
		});

		var img2 = new Kinetic.Image({
		    x: 0,
		    y: 0,
		    image: imageObj2,
		    width: 480,
		    height: 550
		});


		var listenerRect = new Kinetic.Rect({
		    x: imglist[imgcounter].x,
		    y: imglist[imgcounter].y,
		    width: imglist[imgcounter].width,
		    height: imglist[imgcounter].height,
		    fill: null,
		    stroke: null,//invisible box
		    strokeWidth: 4
		});
		listenerRect.on('click',function(){
		    nextScene();
		});
		masklayer.add(maskrect);
		listenerlayer.add(listenerRect);


		// add the shape to the layer
		layer1.add(img1);
		layer2.add(img2);

		// add the layer to the stage
		stage.add(layer1);
		stage.add(layer2);
		stage.add(masklayer);
		stage.add(listenerlayer);
	    }//end img2 onload: good to go
	    var imgsrc1 = path+imglist[imgcounter].name+"1.jpg";
	    var imgsrc2 = path+imglist[imgcounter].name+"2.jpg";
	    imageObj1.src = imgsrc1;
	}//end loadScene
	loadScene();//first load
	go();
    }//end init function

    //HBD

    // var displaytime = 1000;
    // var startTime;

    // function success(){
    // displaytime=Math.max(Math.round(displaytime*.7),10);//faster than that might not render properly.
    // }
    // function failure(){
    // displaytime=Math.max(Math.round(displaytime*1.5),displaytime+10)
    // }

    // var responseHTML= "<br/><br/><br/><br/><button onclick=spacerGameFn('yes')>Word</button><button onclick=spacerGameFn('no')>Non-Word</button>";
    // function trial(){

    //     if(new Date().getTime()-startTime>runningTime){
    // 	nextTest();//go to test
    // 	return;
    //     }
    //     var ans = shuffle(["yes","no"])[0];
    //     if(ans=="yes"){
    // 	document.getElementById(targDiv).innerHTML="<h2>"+getWord()+"</h2>";
    //     }
    //     else {
    // 	document.getElementById(targDiv).innerHTML="<h2>"+getNonword()+"</h2>";
    //     }
    //     spacerGameFn=function(response){
    // 	console.log("right"+(response==ans)+" "+displaytime);
    // 	if(response==ans)success();
    // 	else failure();
    // 	trial();
    //     }
    //     setTimeout(function(){
    // 	document.getElementById(targDiv).innerHTML=responseHTML;
    //     },displaytime);
    // }

    // function getWord(){
    // return(shuffle(
    // ["time","year","side","people","kind","way","head","day","house","man","service","thing","friend","woman","father","life","power","child","hour","world","game","school","line","state","end","family","member","student","law","group","car","country","city","problem","hand","name","part","president","place","team","case","minute","week","idea","company","kid","system","body","program","information","question","back","work","parent","government","face","number","others","night","level","office","point","home","health","water","person","art","mother","area","history","money","party","story","result","fact","change","month","morning","lot","reason","right","research","study","girl","shelf","guy","femur","sandwich","job","word","air","teacher","knife","glad","shine","glint","gleam","love","hate","mental","fortune"]
    // )[0]);
    // }

    // function getNonword(){
    //     var aword = getWord();
    //     var swapindex1 = Math.floor(Math.random()*aword.length);
    //     var swapindex2 = Math.floor(Math.random()*aword.length);
    //     while(swapindex2==swapindex1) swapindex2 = Math.floor(Math.random()*aword.length);
    //     var s1 = Math.min(swapindex1,swapindex2);
    //     var s2 = Math.max(swapindex1,swapindex2);
    //     var charAts1=aword.substring(s1,s1+1);
    //     var charAts2 = aword.substring(s2,s2+1);
    
    //     return (
    // 	    aword.substring(0,s1)+
    // 	    charAts2+
    // 	    aword.substring(s1+1,s2)+
    // 	    charAts1+
    // 	    aword.substring(s2+1,aword.length)
    //     );
    // } 

    // var instructionChapter=["This is a short task looking at visual processing speed","You'll be shown a short bit of text and asked to decide if it is a word or a non-word.","The text will only be displayed for a short period of time.","As you get more questions right, the display time will decrease, and if you make mistakes, the display time will increase.","Your goal is to get and hold the fastest display time you can."]

    // var instructioncounter = 0;
    // var instructions=function(){
    // if(instructioncounter==instructionChapter.length){
    // startTime = new Date().getTime();
    // trial();
    // return;
    // }
    // document.getElementById(targDiv).innerHTML=instructionChapter[instructioncounter]+"<br/><button onclick='spacerGameFn()'>Next</button>";
    // instructioncounter++;
    // }

    // this.init=function(){
    //     spacerGameFn=instructions;
    //     instructions();
    // }

}
