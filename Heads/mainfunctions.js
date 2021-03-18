function buttonsShow() {
  if (loginst === false) {
    logshower.show();
    logshower.parent(loginTaskbar);
    b1.show();
    b2.show();
    b3.show();
    b4.show();
    b1.parent(loginTaskbar);
    b2.parent(loginTaskbar);
    b3.parent(loginTaskbar);
    b4.parent(loginTaskbar);
  }
}

function loginStatus() {
  loginst = true;
  b1.hide();
  b2.hide();
  b3.hide();
  b4.hide();
  logshower.hide();
  loginTaskbar.style("overflowX: auto;");
  loginTaskbar.style("paddin: 10px;");
  var logins;
  database.ref("/heads/logged").on("value", (data) => {
    logins = data.val();
  });
  var keys = Object.keys(logins);
  //console.log(keys);
  var l1;
  var lm;
  var l2;
  var hc;
  var acl = [];
  hc = createDiv();
  hc.class("nonhello");
  hc.parent(loginTaskbar);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    //console.log(str(key));
    var dat;
    database.ref("/heads/logged/" + str(key)).on("value", (data) => {
      dat = data.val();
      //console.log(dat);
    });

    lm = createDiv();
    lm.class("hello");
    lm.parent(hc);

    l1 = createElement("h2");
    l1.html("from : " + dat.OS);
    l1.parent(lm);

    l2 = createElement("h2");
    l2.html("date : " + dat.date);
    l2.parent(lm);
  }
  var back = createButton("BACK");
  back.parent(loginTaskbar);
  back.mousePressed(() => {
    hc.hide();
    b1.show();
    b2.show();
    b3.show();
    b4.show();
    back.hide();
    loginst = false;
  });
}

function changePassword() {
  //console.log("bruh");
  b1.hide();
  b2.hide();
  b3.hide();
  b4.hide();
  logshower.hide();
  loginst = true;
  //backbutton------------------------------------------------------------------
  var backbutton = createButton("BACK");
  //----------------------------------------------------------------------------
  //div creation ---------------------------------------------------------------
  var in1 = createDiv();
  in1.class("lop");
  var in2 = createDiv();
  in2.class("lop");
  var in3 = createDiv();
  in3.class("lop");
  in1.parent(loginTaskbar);
  in2.parent(loginTaskbar);
  in3.parent(loginTaskbar);
  //----------------------------------------------------------------------------
  //inpuut creation ------------------------------------------------------------
  var p1 = createP("change username:");
  var p2 = createP("change password:");
  var p3 = createP("retype password:");
  p1.parent(in1);
  p2.parent(in2);
  p3.parent(in3);

  var inp1 = createInput("", "text");
  var inp2 = createInput("", "password");
  var inp3 = createInput("", "password");
  inp1.parent(in1);
  inp2.parent(in2);
  inp3.parent(in3);

  //submitButton
  var submitButton = createButton("submit");
  submitButton.parent(loginTaskbar);

  submitButton.mousePressed(() => {
    if (
      inp1.value() !== "" &&
      inp2.value() !== "" &&
      inp1.value() !== inp2.value()
    ) {
      if (
        inp1.value() &&
        inp2.value() &&
        inp2.value() === inp3.value() &&
        inp3.value()
      ) {
        database.ref("/heads/").update({
          id: inp1.value(),
          password: inp2.value(),
        });
        loginst = false;
        backbutton.hide();
        in1.hide();
        in2.hide();
        in3.hide();
        submitButton.hide();
        //spk.speak("id and passwod changed");
      }
    }
  });

  backbutton.parent(loginTaskbar);
  backbutton.mousePressed(() => {
    loginst = false;
    backbutton.hide();
    in1.hide();
    in2.hide();
    in3.hide();
    submitButton.hide();
  });
}

function createTests() {
  logshower.hide();
  b1.hide();
  b2.hide();
  b3.hide();
  b4.hide();
  loginst = true;
  backing = true;
  //qs
  var qs = createDiv();
  qs.class("shower");
  qs.parent(loginTaskbar);

  //classes for inputs

  //class1 for class
  var classer = createSelect();
  classer.class("nopl");
  classer.option("class8");
  classer.option("class9");
  classer.option("class10");
  classer.parent(qs);

  //class2 for type
  var classe2 = createSelect();
  classe2.class("nopl");
  classe2.option("apple");
  classe2.option("regular");
  classe2.parent(qs);

  //class3 for lang
  var classe3 = createSelect();
  classe3.class("nopl");
  classe3.option("hindi");
  classe3.option("telugu");
  classe3.parent(qs);

  //class 4 for no of questions
  var classe4 = createInput("", "number");
  classe4.parent(qs);
  classe4.placeholder = "no of questions";

  //class5 for name of the test
  var testname = createInput("", "text");
  testname.placeholder = "test name";
  testname.parent(qs);

  var createTestButton = createButton("Create");
  createTestButton.parent(qs);
  var backbutton = createButton("BACK");
  backbutton.parent(loginTaskbar);
  backbutton.mousePressed(() => {
    if (backing === true) {
      backbutton.hide();
      qs.hide();
      loginst = false;
    }
  });

  createTestButton.mousePressed(() => {
    if (classe4.value() <= 20 && classe4.value() && testname.value()) {
      backing = false;
      m1 = classer.value();
      m2 = classe2.value();
      m3 = classe3.value();
      tlqst = classe4.value();
      testName = testname.value();
      var testr;
      database.ref("/tests/").update({
        totaltests: alldata.tests.totaltests + 1,
      });
      makeQuestions();
      backbutton.hide();
      qs.hide();
    } else {
      alert("fill no of questions and test name prperly");
    }
  });
}

function changeMessage() {
  loginst = true;
  b1.hide();
  b2.hide();
  b3.hide();
  b4.hide();
  logshower.hide();
  var div1 = createDiv();
  div1.class("message");
  div1.parent(loginTaskbar);

  var inputA = createInput("news to release", "text");
  inputA.parent(div1);

  var sendButton = createButton("Send");
  sendButton.parent(div1);

  sendButton.mousePressed(() => {
    if (inputA.value()) {
      database.ref("/").update({
        message: inputA.value(),
      });
      div1.hide();
      loginst = false;
    }
  });
}

function makeQuestions() {
  var reference = '/tests/' + m1 + '/' + m2 + '/' + m3 + '/' + testName
  for (var a = 0; a < tlqst; a++) {
      database.ref(reference + '/' + 'question' + str(int(a)+1)).update({
          correct : '',
          question : '',
          o1 : '',
          o2 : '',
          o3 : '',
          o4 : ''
      })
  }
  makeQuestionsValue();
}

function makeQuestionsValue() {
  var div1 = createDiv();
  div1.class('questionss');
  div1.parent(loginTaskbar);

  var div2 = createDiv();
  div2.class('questionss2');
  div2.parent(loginTaskbar);

  var selectsd = createSelect();
  for (var m = 0; m < tlqst; m++) {
      selectsd.option('question' + int(m + 1));
      selectsd.parent(div1);
      console.log(m);
  }
  var h1 =  createElement('p', 'question:');
  h1.parent(div2);
  var ic1 = createInput('', 'text');
  ic1.parent(div2);

  var h2 =  createElement('p', 'option1:');
  h2.parent(div2);
  var option1 = createInput('','text');
  option1.class('optionqr');
  option1.parent(div2);

  var h3 =  createElement('p', 'option2:');
  h3.parent(div2);
  var option2 = createInput('','text');
  option2.class('optionqr');
  option2.parent(div2);

  var h4 =  createElement('p', 'option3:');
  h4.parent(div2);
  var option3 = createInput('','text');
  option3.class('optionqr');
  option3.parent(div2);

  var h5 =  createElement('p', 'option4:');
  h5.parent(div2);
  var option4 = createInput('','text');
  option4.class('optionqr');
  option4.parent(div2);

  var h6 =  createElement('p', 'correct option');
  h6.parent(div2);
  var copt = createSelect();
  copt.option('1');
  copt.option('2');
  copt.option('3');
  copt.option('4');
  copt.parent(div2);

  var createQuestion = createButton('make question')
  createQuestion.parent(div2);

  var questionsdone = 0;
  createQuestion.mousePressed(() => {
      if (ic1.value() && 
      option1.value() && 
      option2.value && 
      option3.value() &&
      option4.value()) {
          database.ref('/tests/' + m1 + '/' + m2 + '/' + m3 + '/' + testName + '/' + str(selectsd.value())).update({
              correct : String(copt.value()),
              o1 : option1.value(),
              o2 : option2.value(),
              o3 : option3.value(),
              o4 : option4.value(),
              question : ic1.value()
          })
          selectsd.disable(selectsd.value());
          questionsdone = questionsdone + 1;
          ic1.value('') ;
          option1.value('');
          option2.value('');
          option3.value('');
          option4.value('');
          console.log(questionsdone)
          
      }
      if (questionsdone === int(tlqst)) {
          alert('test created');
          div1.hide();
          div2.hide();
          loginst = false;
          console.log('bruh')
      }
  })
}

