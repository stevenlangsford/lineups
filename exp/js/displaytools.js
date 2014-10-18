function functionChain(fns, times){
//functionChain calls each function in an array fns, in order with delays specified by times.
if(fns.length-1!=times.length)console.error("Mismatching fns and times passed to functionChain");
function fncaller(callindex){
    console.log("ran "+callindex);
    if(callindex>=fns.length)return;
    fns[callindex]();
    setTimeout(function(){fncaller(callindex+1)},times[callindex])
}
fncaller(0);
}
