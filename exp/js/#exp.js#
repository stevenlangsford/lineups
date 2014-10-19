//Instructions, demographics questions, thank you message, and the definition of saveData lives here
//Basically, everything that's not the task itself.

var instructionchapters = ["Instructions part one: this is a study","In this study you will do stuff"];
var instructioncounter = 0;

function instructions(){
if(instructioncounter>=instructionchapters.length){demographics(); return;}
document.getElementById("uberdiv").innerHTML=instructionchapters[instructioncounter]+"<br/><button onclick=instructions()>Next</button>";
instructioncounter++;
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

