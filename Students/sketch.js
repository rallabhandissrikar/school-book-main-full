var mainDiv;
var in1, in2, clas, lang, type, submit;
var database;
var kks = false;
var lk = "";
var alldata;
var lgk = "";
function setup() {
  noCanvas();
  mainDiv = select(".main");
  in1 = select("#name");
  in2 = select("#sec");
  clas = select(".class");
  lang = select(".language");
  type = select(".type");
  submit = select("#submit");
  database = firebase.database();
  database.ref("/").on("value", (data) => {
    alldata = data.val();
  })
  submit.mousePressed(() => {
    //console.log("hello");
    attendTest();
  })
}

function draw() {
  hideAl();
}

function attendTest() {
  if (in1.value() && in2.value() && in2.value().length < 2) {
    atdt();

  } else {
    alert("wrong sec or name not filled")
  }
}
