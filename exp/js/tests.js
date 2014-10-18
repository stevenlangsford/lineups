var peek=function(){
document.getElementById("uberdiv").innerHTML="peek";
}
var a =function(){
document.getElementById("uberdiv").innerHTML="-a-";
}
var boo =function(){
document.getElementById("uberdiv").innerHTML="boo";
}
var clear=function(){
document.getElementById("uberdiv").innerHTML="-done-";
}
functionChain([peek,a,boo,clear],[1500,1300,1700])
