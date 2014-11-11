//Instructions, demographics questions, thank you message, and the definition of saveData lives here
//Basically, everything that's not the task itself.
//(start here entry point is at end of file, (needs everything defined first))

var loadTime = new Date().getTime(); //this loadTime is the start time for startendtimes recorded with demographics info. It's re-used with new load times at the beginning of training and the beginning of test.
function beginExp(){
    loadTime = new Date().getTime();
    lastClick=new Date().getTime();
    nextTrial();//defined in 'task.js'
}

var instructionchapters = ["<p class=\"instructions\">Thank you for your interest in this study! Please read these instructions carefully, they will be followed by a short quiz</p>","<p class=\"instructions\">The study has two parts. In the first part, you'll be shown a collection of faces to remember. You'll be able to go through the faces at your own speed, but each face will only be shown for a limited amount of time.</p>","<p class=\"instructions\">Each time you click the 'next' button, a new face will be shown briefly. There are 40 faces to remember.</p>","<p class=\"instructions\">After the training there is a test of visual processing.</p>","<p class=\"instructions\">Two similar images will be flashed up on the screen separated by a white mask.<br/> Your task will be to find the element that is different between the two images and click on it. <br/> This task is placed here rather than at the beginning to introduce a gap between training and test.</p>","<p class=\"instructions\">In the second part of the study, you'll be given a series of lineup tasks to test your memory of the faces. You'll get feedback about your accuracy at the end.</p>","<p class=\"instructions\">On the next page, you'll be asked some questions about these instructions.</p><p class=\"instructions\">There are also a couple of demographics questions for our records.</p><p class=\"instructions\">The whole task is expected to take around 30~40 minutes.</p><p class=\"instructions\">This is part of a study being run by the University of Adelaide. By clicking 'Next', you are agreeing to take part in it. You should know that you're free to withdraw at any time (although you'll only be paid on completion), and that although data gained from this study may be published, you will not be identified and your personal details will not be divulged</p>.<p class=\"instructions\" style=\"font-size:.8em\">Please direct any questions about this study to the principle investigator, Dr. John Dunn (john.dunn@adelaide.edu.au). For any questions regarding the ethics of the study, please contact the convenor of the Subcommittee for Human Research in the School of Psychology at the University of Adelaide, Dr. Paul Delfabbro (+61)08 8313 4936.</p>"];

var instructioncounter = 0;

function instructions(){
//document.getElementById('uberdiv').style.width="70%";
//document.getElementById('uberdiv').style.margin="auto";
//document.getElementById('uberdiv').style.textalign="center";

if(instructioncounter>=instructionchapters.length){
  //  document.getElementById('uberdiv').style.width="100%";
    instructionquiz(); 
    return;
}

document.getElementById("uberdiv").innerHTML=instructionchapters[instructioncounter]+"<br/><button onclick=instructions()>Next</button>";//+
//"</br><button onclick=beginExp()>Skip intro</button>";//dev only
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
	"<p><strong>What is the spacer task separating the training and test phases?</strong></br>"+
	"<input type=\"radio\" name=\"howsparse\" id=\"fifteenpc\" value=\"10\"/>&nbsp Sudoku<br/>"+
	"<input type=\"radio\" name=\"howsparse\" id=\"howmanycats\" value=\"30\"/>&nbsp A reaction time task asking you to match different coloured shapes.<br/>"+
	"<input type=\"radio\" name=\"howsparse\" id=\"tomorrow\" value=\"50\"/>&nbsp A visual-processing challenge where you click on the element that changes between two similar pictures.<br/>"+
	"<input type=\"radio\" name=\"howsparse\" id=\"seventyfivepc\" value=\"70\"/>&nbsp A five minute break to get up and stretch your legs.<br/>"+
	"<input type=\"radio\" name=\"howsparse\" id=\"ninetypc\" value=\"90\"/>&nbsp Trick question, the test phase immediately follows the training.<br/>"+
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

function finishTraining(){
//prepare and save data:
var dataObj = {
training:[],
startendtimes:[loadTime,new Date().getTime()]
}
for(var i=0;i<hm_trainingfaces;i++){
//Training data format: ID, trialnumber, lineupID, faceID, display time, trial initiation time
//note lineupID and faceID are 0-indexed in the javascript, 1 indexed in excel file/docs, conversion happens here (so raw data matches docs)
var datrow = ""+ppantID+","+i+","+(lineupID[i]+1)+","+(faceID[i]+1)+","+displaytime[i]+","+interstim_intervals[i];
dataObj.training.push(datrow);
}

saveData(dataObj);
console.log("training data saved");
//message:
document.getElementById("uberdiv").innerHTML="<p>That's all the faces!</p><p>The next stage is the visual processing task.</p><p>Two different images will be presented, separated by a white mask.</p><p>When you find the part of the image that changes between the two, click on it to move to the next image.</p><p>The differences can be quite subtle and hard to find, but they are there.</p><p>This part of the task should take about three minutes.</p><br/><button id=\"gotospacer\" onclick='goToSpacer()'>Continue</button>"; //three minutes of change-blindness is enough to drive anyone crazy
}

function goToSpacer(){//just because button onclick needs to refer to a toplevel named function apparently?
new spacerGame('uberdiv',3*60*1000).init();
}

function finishTest(){
var dataObj = {
test:[],
startendtimes:[loadTime,new Date().getTime()]
}
var correctCount = 0;
for(var i=0;i<lineupID.length;i++){
//ID, trialnumber, whichlineup (which can then be matched to training lineup to get which face&presentation time), response time, confidence

var isCorrect;
if(shown.indexOf(lineupID[i])>=0&&((responses[i]-1)==faceID[i]||responses[i]=="yes"))isCorrect=true;
else if(shown.indexOf(lineupID[i])==-1&&((responses[i]-1)==0||responses[i]=="no"))isCorrect=true;
else isCorrect= false;
if(isCorrect)correctCount++;

var correctAns;
if(shown.indexOf(lineupID[i])>=0)correctAns=(faceID[i]+1);
else correctAns=0;

var datline = ""+ppantID+","+i+","+(lineupID[i]+1)+","+condition+","+responses[i]+","+inspection_intervals[i]+","+confRatings[i]+","+correctAns;
dataObj.test.push(datline);
}
saveData(dataObj);

document.getElementById("uberdiv").innerHTML="You're done!</br> <h3>You got "+correctCount+" out of 80 correct, or "+Math.round(correctCount/80*100)+"%</h3><br/>Thank you for participating!";
}

function saveData(data) {
  (function (d) {
    $.post('submit',  {"content": JSON.stringify(d)});
  })(data);
}

function demographics(){
    document.getElementById("uberdiv").innerHTML= "<table class='centered' style='text-align:left'><tr><td>Please fill out these demographic details. This is just for our records, and it is all kept separate from the study data. As long as you finish the experiment you will get paid no matter what you put here, so please be honest.<br/></td></tr>"+
	"<tr><td>&nbsp</td></tr>"+
	"<tr><td>"+
	"Gender: <input type=\"radio\" name=\"gender\" id=\"male\" value=\"male\">&nbspMale&nbsp&nbsp"+
	"<input type=\"radio\" name=\"gender\" id=\"fem\" value=\"female\">&nbspFemale&nbsp&nbsp"+
	"<input type=\"radio\" name=\"gender\" id=\"other\" value=\"other\">&nbspDecline to answer"+
	"</td></tr>"+
	"<tr><td>"+
	"Do you have normal vision, or corrected-to-normal vision with a pair of glasses you are now wearing?<input type=\"radio\" name=\"colblind\" id=\"colblind\" value=\"normal\">&nbspYes&nbsp&nbsp"+
	"<input type=\"radio\" name=\"colblind\" id=\"notcolblind\" value=\"abnormal\">&nbspNo"+
	"</tr></td>"+
	"<tr><td>"+
	"Age:<input type=\"text\" id=\"age\">"+
	"</td></tr>"+
	"<tr><td>"+
	"Native Language(s):<input type=\"text\" id=\"language\">"+
	"</td></tr>"+
	"<tr><td>"+
	"Country you currently live in:"+countrypicker()+
	"</td></tr>"+
	"<tr><td>"+
	"Please enter your email address: <input type=\"text\" id=\"emailadd\"><br/>You email address will be used only to send you an Amazon gift voucher worth $20 on completion of the experiment, and to send a debriefing email explaining the study in a bit more detail."+
	"</td></tr>"+
	"<tr><td>"+
	"<button onclick=demographicsvalidate()>Continue</button>"+
	"</td></tr>"+
	"</table>";
}

function countrypicker(){
    return "<select data-placeholder=\"Choose a Country...\" id=\"countrypicker\">"+
	"  <option value=\"\"></option> "+
	"  <option value=\"United States\">United States</option> "+
	"  <option value=\"United Kingdom\">United Kingdom</option> "+
	"  <option value=\"Afghanistan\">Afghanistan</option> "+
	"  <option value=\"Albania\">Albania</option> "+
	"  <option value=\"Algeria\">Algeria</option> "+
	"  <option value=\"American Samoa\">American Samoa</option> "+
	"  <option value=\"Andorra\">Andorra</option> "+
	"  <option value=\"Angola\">Angola</option> "+
	"  <option value=\"Anguilla\">Anguilla</option> "+
	"  <option value=\"Antarctica\">Antarctica</option> "+
	"  <option value=\"Antigua and Barbuda\">Antigua and Barbuda</option> "+
	"  <option value=\"Argentina\">Argentina</option> "+
	"  <option value=\"Armenia\">Armenia</option> "+
	"  <option value=\"Aruba\">Aruba</option> "+
	"  <option value=\"Australia\">Australia</option> "+
	"  <option value=\"Austria\">Austria</option> "+
	"  <option value=\"Azerbaijan\">Azerbaijan</option> "+
	"  <option value=\"Bahamas\">Bahamas</option> "+
	"  <option value=\"Bahrain\">Bahrain</option> "+
	"  <option value=\"Bangladesh\">Bangladesh</option> "+
	"  <option value=\"Barbados\">Barbados</option> "+
	"  <option value=\"Belarus\">Belarus</option> "+
	"  <option value=\"Belgium\">Belgium</option> "+
	"  <option value=\"Belize\">Belize</option> "+
	"  <option value=\"Benin\">Benin</option> "+
	"  <option value=\"Bermuda\">Bermuda</option> "+
	"  <option value=\"Bhutan\">Bhutan</option> "+
	"  <option value=\"Bolivia\">Bolivia</option> "+
	"  <option value=\"Bosnia and Herzegovina\">Bosnia and Herzegovina</option> "+
	"  <option value=\"Botswana\">Botswana</option> "+
	"  <option value=\"Bouvet Island\">Bouvet Island</option> "+
	"  <option value=\"Brazil\">Brazil</option> "+
	"  <option value=\"British Indian Ocean Territory\">British Indian Ocean Territory</option> "+
	"  <option value=\"Brunei Darussalam\">Brunei Darussalam</option> "+
	"  <option value=\"Bulgaria\">Bulgaria</option> "+
	"  <option value=\"Burkina Faso\">Burkina Faso</option> "+
	"  <option value=\"Burundi\">Burundi</option> "+
	"  <option value=\"Cambodia\">Cambodia</option> "+
	"  <option value=\"Cameroon\">Cameroon</option> "+
	"  <option value=\"Canada\">Canada</option> "+
	"  <option value=\"Cape Verde\">Cape Verde</option> "+
	"  <option value=\"Cayman Islands\">Cayman Islands</option> "+
	"  <option value=\"Central African Republic\">Central African Republic</option> "+
	"  <option value=\"Chad\">Chad</option> "+
	"  <option value=\"Chile\">Chile</option> "+
	"  <option value=\"China\">China</option> "+
	"  <option value=\"Christmas Island\">Christmas Island</option> "+
	"  <option value=\"Cocos (Keeling) Islands\">Cocos (Keeling) Islands</option> "+
	"  <option value=\"Colombia\">Colombia</option> "+
	"  <option value=\"Comoros\">Comoros</option> "+
	"  <option value=\"Congo\">Congo</option> "+
	"  <option value=\"Congo The Democratic Republic of The\">Congo, The Democratic Republic of The</option> "+
	"  <option value=\"Cook Islands\">Cook Islands</option> "+
	"  <option value=\"Costa Rica\">Costa Rica</option> "+
	"  <option value=\"Cote D'ivoire\">Cote D'ivoire</option> "+
	"  <option value=\"Croatia\">Croatia</option> "+
	"  <option value=\"Cuba\">Cuba</option> "+
	"  <option value=\"Cyprus\">Cyprus</option> "+
	"  <option value=\"Czech Republic\">Czech Republic</option> "+
	"  <option value=\"Denmark\">Denmark</option> "+
	"  <option value=\"Djibouti\">Djibouti</option> "+
	"  <option value=\"Dominica\">Dominica</option> "+
	"  <option value=\"Dominican Republic\">Dominican Republic</option> "+
	"  <option value=\"Ecuador\">Ecuador</option> "+
	"  <option value=\"Egypt\">Egypt</option> "+
	"  <option value=\"El Salvador\">El Salvador</option> "+
	"  <option value=\"Equatorial Guinea\">Equatorial Guinea</option> "+
	"  <option value=\"Eritrea\">Eritrea</option> "+
	"  <option value=\"Estonia\">Estonia</option> "+
	"  <option value=\"Ethiopia\">Ethiopia</option> "+
	"  <option value=\"Falkland Islands (Malvinas)\">Falkland Islands (Malvinas)</option> "+
	"  <option value=\"Faroe Islands\">Faroe Islands</option> "+
	"  <option value=\"Fiji\">Fiji</option> "+
	"  <option value=\"Finland\">Finland</option> "+
	"  <option value=\"France\">France</option> "+
	"  <option value=\"French Guiana\">French Guiana</option> "+
	"  <option value=\"French Polynesia\">French Polynesia</option> "+
	"  <option value=\"French Southern Territories\">French Southern Territories</option> "+
	"  <option value=\"Gabon\">Gabon</option> "+
	"  <option value=\"Gambia\">Gambia</option> "+
	"  <option value=\"Georgia\">Georgia</option> "+
	"  <option value=\"Germany\">Germany</option> "+
	"  <option value=\"Ghana\">Ghana</option> "+
	"  <option value=\"Gibraltar\">Gibraltar</option> "+
	"  <option value=\"Greece\">Greece</option> "+
	"  <option value=\"Greenland\">Greenland</option> "+
	"  <option value=\"Grenada\">Grenada</option> "+
	"  <option value=\"Guadeloupe\">Guadeloupe</option> "+
	"  <option value=\"Guam\">Guam</option> "+
	"  <option value=\"Guatemala\">Guatemala</option> "+
	"  <option value=\"Guinea\">Guinea</option> "+
	"  <option value=\"Guinea-bissau\">Guinea-bissau</option> "+
	"  <option value=\"Guyana\">Guyana</option> "+
	"  <option value=\"Haiti\">Haiti</option> "+
	"  <option value=\"Heard Island and Mcdonald Islands\">Heard Island and Mcdonald Islands</option> "+
	"  <option value=\"Holy See (Vatican City State)\">Holy See (Vatican City State)</option> "+
	"  <option value=\"Honduras\">Honduras</option> "+
	"  <option value=\"Hong Kong\">Hong Kong</option> "+
	"  <option value=\"Hungary\">Hungary</option> "+
	"  <option value=\"Iceland\">Iceland</option> "+
	"  <option value=\"India\">India</option> "+
	"  <option value=\"Indonesia\">Indonesia</option> "+
	"  <option value=\"Iran Islamic Republic of\">Iran, Islamic Republic of</option> "+
	"  <option value=\"Iraq\">Iraq</option> "+
	"  <option value=\"Ireland\">Ireland</option> "+
	"  <option value=\"Israel\">Israel</option> "+
	"  <option value=\"Italy\">Italy</option> "+
	"  <option value=\"Jamaica\">Jamaica</option> "+
	"  <option value=\"Japan\">Japan</option> "+
	"  <option value=\"Jordan\">Jordan</option> "+
	"  <option value=\"Kazakhstan\">Kazakhstan</option> "+
	"  <option value=\"Kenya\">Kenya</option> "+
	"  <option value=\"Kiribati\">Kiribati</option> "+
	"  <option value=\"Korea Democratic People's Republic of\">Korea, Democratic People's Republic of</option> "+
	"  <option value=\"Korea Republic of\">Korea, Republic of</option> "+
	"  <option value=\"Kuwait\">Kuwait</option> "+
	"  <option value=\"Kyrgyzstan\">Kyrgyzstan</option> "+
	"  <option value=\"Lao People's Democratic Republic\">Lao People's Democratic Republic</option> "+
	"  <option value=\"Latvia\">Latvia</option> "+
	"  <option value=\"Lebanon\">Lebanon</option> "+
	"  <option value=\"Lesotho\">Lesotho</option> "+
	"  <option value=\"Liberia\">Liberia</option> "+
	"  <option value=\"Libyan Arab Jamahiriya\">Libyan Arab Jamahiriya</option> "+
	"  <option value=\"Liechtenstein\">Liechtenstein</option> "+
	"  <option value=\"Lithuania\">Lithuania</option> "+
	"  <option value=\"Luxembourg\">Luxembourg</option> "+
	"  <option value=\"Macao\">Macao</option> "+
	"  <option value=\"Macedonia The Former Yugoslav Republic of\">Macedonia, The Former Yugoslav Republic of</option> "+
	"  <option value=\"Madagascar\">Madagascar</option> "+
	"  <option value=\"Malawi\">Malawi</option> "+
	"  <option value=\"Malaysia\">Malaysia</option> "+
	"  <option value=\"Maldives\">Maldives</option> "+
	"  <option value=\"Mali\">Mali</option> "+
	"  <option value=\"Malta\">Malta</option> "+
	"  <option value=\"Marshall Islands\">Marshall Islands</option> "+
	"  <option value=\"Martinique\">Martinique</option> "+
	"  <option value=\"Mauritania\">Mauritania</option> "+
	"  <option value=\"Mauritius\">Mauritius</option> "+
	"  <option value=\"Mayotte\">Mayotte</option> "+
	"  <option value=\"Mexico\">Mexico</option> "+
	"  <option value=\"Micronesia Federated States of\">Micronesia, Federated States of</option> "+
	"  <option value=\"Moldova Republic of\">Moldova, Republic of</option> "+
	"  <option value=\"Monaco\">Monaco</option> "+
	"  <option value=\"Mongolia\">Mongolia</option> "+
	"  <option value=\"Montenegro\">Montenegro</option>"+
	"  <option value=\"Montserrat\">Montserrat</option> "+
	"  <option value=\"Morocco\">Morocco</option> "+
	"  <option value=\"Mozambique\">Mozambique</option> "+
	"  <option value=\"Myanmar\">Myanmar</option> "+
	"  <option value=\"Namibia\">Namibia</option> "+
	"  <option value=\"Nauru\">Nauru</option> "+
	"  <option value=\"Nepal\">Nepal</option> "+
	"  <option value=\"Netherlands\">Netherlands</option> "+
	"  <option value=\"Netherlands Antilles\">Netherlands Antilles</option> "+
	"  <option value=\"New Caledonia\">New Caledonia</option> "+
	"  <option value=\"New Zealand\">New Zealand</option> "+
	"  <option value=\"Nicaragua\">Nicaragua</option> "+
	"  <option value=\"Niger\">Niger</option> "+
	"  <option value=\"Nigeria\">Nigeria</option> "+
	"  <option value=\"Niue\">Niue</option> "+
	"  <option value=\"Norfolk Island\">Norfolk Island</option> "+
	"  <option value=\"Northern Mariana Islands\">Northern Mariana Islands</option> "+
	"  <option value=\"Norway\">Norway</option> "+
	"  <option value=\"Oman\">Oman</option> "+
	"  <option value=\"Pakistan\">Pakistan</option> "+
	"  <option value=\"Palau\">Palau</option> "+
	"  <option value=\"Palestinian Territory Occupied\">Palestinian Territory, Occupied</option> "+
	"  <option value=\"Panama\">Panama</option> "+
	"  <option value=\"Papua New Guinea\">Papua New Guinea</option> "+
	"  <option value=\"Paraguay\">Paraguay</option> "+
	"  <option value=\"Peru\">Peru</option> "+
	"  <option value=\"Philippines\">Philippines</option> "+
	"  <option value=\"Pitcairn\">Pitcairn</option> "+
	"  <option value=\"Poland\">Poland</option> "+
	"  <option value=\"Portugal\">Portugal</option> "+
	"  <option value=\"Puerto Rico\">Puerto Rico</option> "+
	"  <option value=\"Qatar\">Qatar</option> "+
	"  <option value=\"Reunion\">Reunion</option> "+
	"  <option value=\"Romania\">Romania</option> "+
	"  <option value=\"Russian Federation\">Russian Federation</option> "+
	"  <option value=\"Rwanda\">Rwanda</option> "+
	"  <option value=\"Saint Helena\">Saint Helena</option> "+
	"  <option value=\"Saint Kitts and Nevis\">Saint Kitts and Nevis</option> "+
	"  <option value=\"Saint Lucia\">Saint Lucia</option> "+
	"  <option value=\"Saint Pierre and Miquelon\">Saint Pierre and Miquelon</option> "+
	"  <option value=\"Saint Vincent and The Grenadines\">Saint Vincent and The Grenadines</option> "+
	"  <option value=\"Samoa\">Samoa</option> "+
	"  <option value=\"San Marino\">San Marino</option> "+
	"  <option value=\"Sao Tome and Principe\">Sao Tome and Principe</option> "+
	"  <option value=\"Saudi Arabia\">Saudi Arabia</option> "+
	"  <option value=\"Senegal\">Senegal</option> "+
	"  <option value=\"Serbia\">Serbia</option> "+
	"  <option value=\"Seychelles\">Seychelles</option> "+
	"  <option value=\"Sierra Leone\">Sierra Leone</option> "+
	"  <option value=\"Singapore\">Singapore</option> "+
	"  <option value=\"Slovakia\">Slovakia</option> "+
	"  <option value=\"Slovenia\">Slovenia</option> "+
	"  <option value=\"Solomon Islands\">Solomon Islands</option> "+
	"  <option value=\"Somalia\">Somalia</option> "+
	"  <option value=\"South Africa\">South Africa</option> "+
	"  <option value=\"South Georgia and The South Sandwich Islands\">South Georgia and The South Sandwich Islands</option> "+
	"  <option value=\"South Sudan\">South Sudan</option> "+
	"  <option value=\"Spain\">Spain</option> "+
	"  <option value=\"Sri Lanka\">Sri Lanka</option> "+
	"  <option value=\"Sudan\">Sudan</option> "+
	"  <option value=\"Suriname\">Suriname</option> "+
	"  <option value=\"Svalbard and Jan Mayen\">Svalbard and Jan Mayen</option> "+
	"  <option value=\"Swaziland\">Swaziland</option> "+
	"  <option value=\"Sweden\">Sweden</option> "+
	"  <option value=\"Switzerland\">Switzerland</option> "+
	"  <option value=\"Syrian Arab Republic\">Syrian Arab Republic</option> "+
	"  <option value=\"Taiwan Republic of China\">Taiwan, Republic of China</option> "+
	"  <option value=\"Tajikistan\">Tajikistan</option> "+
	"  <option value=\"Tanzania United Republic of\">Tanzania, United Republic of</option> "+
	"  <option value=\"Thailand\">Thailand</option> "+
	"  <option value=\"Timorleste\">Timor-leste</option> "+
	"  <option value=\"Togo\">Togo</option> "+
	"  <option value=\"Tokelau\">Tokelau</option> "+
	"  <option value=\"Tonga\">Tonga</option> "+
	"  <option value=\"Trinidad and Tobago\">Trinidad and Tobago</option> "+
	"  <option value=\"Tunisia\">Tunisia</option> "+
	"  <option value=\"Turkey\">Turkey</option> "+
	"  <option value=\"Turkmenistan\">Turkmenistan</option> "+
	"  <option value=\"Turks and Caicos Islands\">Turks and Caicos Islands</option> "+
	"  <option value=\"Tuvalu\">Tuvalu</option> "+
	"  <option value=\"Uganda\">Uganda</option> "+
	"  <option value=\"Ukraine\">Ukraine</option> "+
	"  <option value=\"United Arab Emirates\">United Arab Emirates</option> "+
	"  <option value=\"United Kingdom\">United Kingdom</option> "+
	"  <option value=\"United States\">United States</option> "+
	"  <option value=\"Uruguay\">Uruguay</option> "+
	"  <option value=\"Uzbekistan\">Uzbekistan</option> "+
	"  <option value=\"Vanuatu\">Vanuatu</option> "+
	"  <option value=\"Venezuela\">Venezuela</option> "+
	"  <option value=\"Viet Nam\">Viet Nam</option> "+
	"  <option value=\"Virgin Islands British\">Virgin Islands, British</option> "+
	"  <option value=\"Virgin Islands U.S.\">Virgin Islands, U.S.</option> "+
	"  <option value=\"Wallis and Futuna\">Wallis and Futuna</option> "+
	"  <option value=\"Western Sahara\">Western Sahara</option> "+
	"  <option value=\"Yemen\">Yemen</option> "+
	"  <option value=\"Zambia\">Zambia</option> "+
	"  <option value=\"Zimbabwe\">Zimbabwe</option>"+
	"</select>";
}

function decomma(astring){
var ret = "";
for(var i=0;i<astring.length;i++){
if(astring.charAt(i)!=',')ret+=astring.charAt(i);
}
return ret.toLowerCase();
}

function demographicsvalidate(){
    var genderchoice=document.getElementsByName("gender");
    var genderflag = false;
    var demostring = "";
    for(var i=0;i<genderchoice.length;i++){
	if(genderchoice[i].checked){
	    demostring+=genderchoice[i].value+",";
	    genderflag=true;
	}
    }
    var colblind=document.getElementsByName("colblind");
    var colblindflag = false;
    for(var i=0;i<colblind.length;i++){
	if(colblind[i].checked){
	    demostring+=colblind[i].value+",";
	    colblindflag=true;
	}
    }
    var age = document.getElementById("age").value;
    var ageflag=age.length>0;
    demostring+=age+",";
    var languagechoice = document.getElementById("language").value;
    var langflag = languagechoice.length>0;
    demostring+=decomma(languagechoice)+",";
    var country = document.getElementById("countrypicker").value;
    var countryflag = country.length>0;
    demostring+=country+",";

    var emailadd = document.getElementById("emailadd").value;
    var emailflag = emailadd.length>0;
    demostring+=decomma(emailadd);

    
    if(genderflag&&langflag&&ageflag&&countryflag&&colblindflag&&emailflag){

	var ppntstring = ppantID+","+demostring+","+loadTime+","+screen.width+","+screen.height+","+canvaswidth+","+canvasheight;
	saveData({demographics:ppntstring});
//	console.log("ppntstring: "+ppntstring);//diag
	beginExp();
    }    
    else alert("Please fill out all the fields.");
}

function testIntro(){
    if(condition=="presentabsent"){
	document.getElementById('uberdiv').innerHTML="<p>The next stage of the study is the test stage.</p>"+
	    "<p>You'll be shown a lineup of six faces and asked if one of them is one you saw in training.</p>"+
	    "<p>Some of the lineups will have a face you've seen before, and some won't</p>"+
	    "<p>There are 80 lineups, so this part of the study is expected to take between 20 and 30 minutes</p>";
    }
    if(condition=="mostlikely"){
	document.getElementById('uberdiv').innerHTML="<p>The next stage of the study is the test stage.</p>"+
	    "<p>You'll be shown a lineup of six faces and asked which one of them is most like one you saw in training.</p>"+
	    "<p>Some of the lineups will have a face you've seen before, and some won't</p>"+
	    "<p>If you have seen one of the faces before, chose that one, otherwise choose the one that is most similar to a face you saw.</p>"+
	    "<p>There are 80 lineups, so this part of the study is expected to take between 20 and 30 minutes</p>";
    }
    if(condition=="nominate"){
		document.getElementById('uberdiv').innerHTML="<p>The next stage of the study is the test stage.</p>"+
	    "<p>You'll be shown a lineup of six faces and asked which one of them you saw in training.</p>"+
	    "<p>Some of the lineups will have a face you've seen before, and some won't</p>"+
	    "<p>If you have seen one of the faces before, chose that one, otherwise please select the 'no match' option.</p>"+
	    "<p>There are 80 lineups, so this part of the study is expected to take between 20 and 30 minutes</p>";
    }
    document.getElementById('uberdiv').innerHTML=document.getElementById('uberdiv').innerHTML+"<br/><button onclick='nextTest()'>Continue</button>";//go to test
}//end testIntro

//Start here!
var ppantID;

function gatekeeper(astring){
    //vanilla random allocation of conditions
    ppantID=Math.round(Math.random()*1000000);
    condition = shuffle(["presentabsent","mostlikely","nominate"])[0];
    instructions();

    //fancy ID-controlled entry and allocation to conditions

    // ppantID=astring;
    // if(astring.substring(0,3)=="ADL"){
    // 	condition = conditions[astring.substring(4,astring.length)%conditions.length];
    // 	console.log(condition);
    // 	instructions();
    // }
    // else if(astring=="TEST"){//testing/demo only, to delete along with skip intro button
    // 	nextTest();
    // }
    // else{
    // 	gatekeeper(prompt("ID key not found. Please re-enter your ID key."));
    // }
    
}

//gatekeeper(prompt("Please enter your ParticipantID key")); //fancy id validation version
gatekeeper("Noidrequired"); //random allocation to conditions
