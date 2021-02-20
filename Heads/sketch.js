var namer, pass;
var button;
var database;
var alldata;
var headsLogged = false;
var date;
var divTaskbar;
var loginTaskbar;
var loggerer = false;
var b1, b2, b3, b4;
var mainIndex;
var loginst = false;
var bref;
var logshower;
var m1, m2, m3;
var tlqst;
var testName;
var hrefman;
var url;
var loginster;
function setup() {
  noCanvas();
  //spk = new p5.Speech()

  loginTaskbar = select(".main");
  date = new Date();
  // divTaskbar = select(".sideb");
  b1 = select(".home");
  b2 = select(".CT");
  b3 = select(".SO");
  b4 = select(".LS");
  b1.hide();
  b2.hide();
  b3.hide();
  b4.hide();
  logshower = createElement("h1");
  logshower.html("heads had logged ");
  logshower.hide();
  namer = select(".id");
  pass = select(".pass");
  select = select(".button");
  database = firebase.database();
  //divTaskbar.hide();
  database.ref("/").on("value", (data) => {
    alldata = data.val();
  });
  hrefman = window.location
  url = new URL(hrefman)
  loginster = url.searchParams.get('loginstate')

  console.log(loginster);

  if (str(loginster) !== "1234111") {
    window.location = '../index.html';
  }
  select.mousePressed(() => {
    console.log("hello");
    var OSName = "mobileuser";
    if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1)
      OSName = "Windows 10";
    if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1)
      OSName = "Windows 8";
    if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1)
      OSName = "Windows 7";
    if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1)
      OSName = "Windows Vista";
    if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1)
      OSName = "Windows XP";
    if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1)
      OSName = "Windows 2000";
    if (window.navigator.userAgent.indexOf("Mac") != -1) OSName = "Mac/iOS";
    if (window.navigator.userAgent.indexOf("X11") != -1) OSName = "UNIX";
    if (window.navigator.userAgent.indexOf("Linux") != -1) OSName = "Linux";

    //----------------------------------------------------------------------
    if (
      namer.value() === alldata.heads.id &&
      pass.value() === alldata.heads.password
    ) {
      headsLogged = true;
      database.ref("/heads/").update({
        logindex: alldata.heads.logindex + 1,
      });
      database.ref("heads/logged/person" + alldata.heads.logindex).update({
        logged: true,
        date: String(date),
        OS: OSName,
      });
    } else {
      if (namer.value() && pass.value()) {
        alert("id or password wrong");
      }
    }
  });

  b4.mousePressed(loginStatus);
  b3.mousePressed(changePassword);
  b2.mousePressed(createTests);
  b1.mousePressed(changeMessage)
}

function draw() {
  if (headsLogged === true) {
    namer.hide();
    pass.hide();
    select.hide();
    buttonsShow();
  }

  
}
