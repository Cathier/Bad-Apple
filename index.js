
/**
 * @author Cathier
 * @name Bad Apple
 */

var rightHand=[31, 33, 34, 36, 38, 38, 31, 41, 38, 38, 31, 31, 38, 36, 34, 33, 31, 33, 34, 36, 38, 38, 36, 34, 33, 26, 33, 34, 33, 31, 30, 33,
              31, 33, 34, 36, 38, 38, 36, 41, 43, 43, 43, 43, 45, 45, 46, 46, 43, 45, 46, 48, 50, 50, 48, 46, 48, 48, 45, 45, 46, 46, 48, 48];
var leftHand=[7, 14, 7, 14, 7, 14, 7, 14, 7, 14, 7, 14, 7, 14, 7, 14, 3, 9, 3, 9, 3, 9, 3, 9, 5, 12, 5, 12, 6, 12, 6, 12,
              7, 14, 7, 14, 7, 14, 7, 14, 7, 14, 7, 14, 7, 14, 5, 12, 3, 10, 3, 10, 3, 10, 3, 10, 5, 12, 5, 12, 6, 12, 6, 12];
var bass=[1, 0, 0, 0, 1, 0, 0, 0];
var tom=[0, 0, 1, 0, 0, 0, 1, 1];
var bell=[0, 1];
var nps=4;
var transpose=24;

function mix(a, b)
{
  return a+b-a*b;
}

function note(n) {
  return 440*Math.pow(2, ((n-49)/12));
}

function rightNote(t) {
  return rightHand[Math.floor((nps*t)%rightHand.length)]+transpose;
}

function leftNote(t) {
  return leftHand[Math.floor((nps*t)%leftHand.length)]+transpose;
}

function squareWave(t, f, d) {
  if((f*t)%1<d)
    return 1;
  else
    return -1;
}

function sineWave(t, f) {
  return Math.sin(Math.PI*2*t*f);
}

function drumWave(t)
{
  return mix(mix(bass[Math.floor((nps*t)%bass.length)]*1*Math.sin(30*Math.PI*2*((t*nps)%1))/(20*((t*nps)%1)+0.5),
              tom[Math.floor((nps*t)%tom.length)]*1*Math.sin(120*Math.PI*2*((t*nps)%1))/(50*((t*nps)%1)+0.5)),
              bell[Math.floor((nps*t)%bell.length)]*0.1*Math.sin(8*200*Math.PI*2*((t*nps)%1))*Math.sin(200*Math.PI*2*((t*nps)%1))/(25*((t*nps)%1)+0.5));
}

export function dsp(t) {
  var main=(0.5*sineWave(t, note(rightNote(t)))+0.5*sineWave(t, note(leftNote(t))))*(1-(nps*t)%1)*((nps*t)%1)*4;
  var drums=drumWave(t);
  return mix(main, drums);
}


