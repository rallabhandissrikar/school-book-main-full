function hideAl() {
  if (kks === false) {
    in1.show();
    in2.show();
    clas.show();
    lang.show();
    type.show();
    submit.show();
  } else {
    in1.hide();
    in2.hide();
    clas.hide();
    lang.hide();
    type.hide();
    submit.hide();
  }
}

function atdt() {
  mainDiv.hide();
  kks = true;
  var div = createDiv();
  div.class("main");
  var i1 = createInput("test name", "text");
  i1.parent(div);
  var button = createButton("Go to test");
  button.parent(div);
  var backButton = createButton("Back");
  backButton.parent(div);
  backButton.mousePressed(() => {
    div.hide();
    mainDiv.show();
    kks = false;
  });
  button.mousePressed(() => {
    lk = i1.value();
    link =
      "tests/" +
      clas.value() +
      "/" +
      type.value() +
      "/" +
      lang.value() +
      "/" +
      lk;

    console.log(link);
    console.log(clas.value());
    var metadata;

    database.ref(link).on("value", (data) => {
      metadata = data.val();
    });

    setTimeout(() => {
      if (metadata) {
        div.hide();
        makeQuestions();
      }
    }, 1000);
  });
}

function makeQuestions() {
  console.log();
  var linke =
    "tests/" +
    clas.value() +
    "/" +
    type.value() +
    "/" +
    lang.value() +
    "/" +
    lk;

  var questionsRight = 0;
  var totalQuestionsComplete = 0;
  var dat;
  var dat2;
  var questiontype;
  var totalq = 0;

  database.ref(linke).on("value", (data) => {
    dat = data.val();
  });
  var keys = Object.keys(dat);
  totalQuestionsComplete = keys.length;
  totalq = keys.length;
  console.log(totalQuestionsComplete);
  var dive = createDiv();
  dive.class("main23");

  var select = createSelect();
  select.parent(dive);
  for (var i = 0; i < keys.length; i++) {
    select.option(keys[i]);
  }
  database.ref(linke + "/" + select.value()).on("value", (data) => {
    dat2 = data.val();
  });
  var question = createElement("h1");
  question.parent(dive);
  question.html("question : " + dat2.question);
  questiontype = select.value();

  var o1 = createButton("");
  o1.parent(dive);

  var o2 = createButton("");
  o2.parent(dive);

  var o3 = createButton("");
  o3.parent(dive);

  var o4 = createButton("");
  o4.parent(dive);

  o1.html(dat2.o1);
  o2.html(dat2.o2);
  o3.html(dat2.o3);
  o4.html(dat2.o4);

  select.mouseReleased(() => {
    database.ref(linke + "/" + select.value()).on("value", (data) => {
      dat2 = data.val();
    });
    question.html("question : " + dat2.question);
    questiontype = select.value();
    console.log(questiontype);
    o1.html(dat2.o1);
    o2.html(dat2.o2);
    o3.html(dat2.o3);
    o4.html(dat2.o4);
  });

  o1.mousePressed(() => {
    lp = 1;
    if (str(lp) === str(dat2.correct)) {
      totalQuestionsComplete -= 1;
      lgk = totalQuestionsComplete;
      questionsRight += 1;
      console.log(totalQuestionsComplete);
      console.log(select.value())
      select.disable(select.value());

      database.ref("results/" + clas.value() + "/" + lk + "/" + in2.value() + "/" + in1.value() + "/" + select.value()).update({
        data: {
          question: dat2.question,
          correct: dat2.correct,
          given: lp,
          iscorrect: true,
          o1: o1.value(),
          o2: o2.value(),
          o3: o3.value(),
          o4: o4.value()
        },
      });


      if (totalQuestionsComplete === 0) {
        dive.hide();
        var elementa = createElement("h1");
        elementa.html("hurray! you completed the question sucsessfully!! here is your score:")
        var elem = createElement("h2");
        elem.html("score: " + questionsRight + "/" + totalq);
        database.ref("results/" + clas.value() + "/" + lk + "/" + in2.value() + "/" + in1.value()).update({
          totalScore : questionsRight
        })
      }
      database.ref(linke + "/" + select.value()).on("value", (data) => {
        dat2 = data.val();
      });
      setTimeout(() => {
        question.html("question : " + dat2.question);
        questiontype = select.value();
        console.log(questiontype);
        o1.html(dat2.o1);
        o2.html(dat2.o2);
        o3.html(dat2.o3);
        o4.html(dat2.o4);
      }, 200);



    } else {
      totalQuestionsComplete -= 1;
      lgk = totalQuestionsComplete;
      console.log(select.value())
      select.disable(select.value());
      if (totalQuestionsComplete === 0) {
        dive.hide();
        var elementa = createElement("h1");
        elementa.html("hurray! you completed the question sucsessfully!! here is your score:")
        var elem = createElement("h2");
        elem.html("score: " + questionsRight + "/" + totalq);
        database.ref("results/" + clas.value() + "/" + lk + "/" + in2.value() + "/" + in1.value()).update({
          totalScore : questionsRight
        })
      }
      database.ref("results/" + clas.value() + "/" + lk + "/" + in2.value() + "/" + in1.value() + "/" + select.value()).update({
        data: {
          question: dat2.question,
          correct: dat2.correct,
          given: lp,
          iscorrect: false,
          o1: o1.value(),
          o2: o2.value(),
          o3: o3.value(),
          o4: o4.value()
        },
      });

      database.ref(linke + "/" + select.value()).on("value", (data) => {
        dat2 = data.val();
      });

      setTimeout(() => {
        question.html("question : " + dat2.question);
        questiontype = select.value();
        console.log(questiontype);
        o1.html(dat2.o1);
        o2.html(dat2.o2);
        o3.html(dat2.o3);
        o4.html(dat2.o4);
      }, 200);


    }
  })

  o2.mousePressed(() => {
    lp = 2;
    if (str(lp) === str(dat2.correct)) {
      totalQuestionsComplete -= 1;
      lgk = totalQuestionsComplete;
      questionsRight += 1;
      console.log(totalQuestionsComplete);
      console.log(select.value())
      select.disable(select.value());

      database.ref("results/" + clas.value() + "/" + lk + "/" + in2.value() + "/" + in1.value() + "/" + select.value()).update({
        data: {
          question: dat2.question,
          correct: dat2.correct,
          given: lp,
          iscorrect: true,
          o1: o1.value(),
          o2: o2.value(),
          o3: o3.value(),
          o4: o4.value()
        },
      });
      if (totalQuestionsComplete === 0) {
        dive.hide();
        var elementa = createElement("h1");
        elementa.html("hurray! you completed the question sucsessfully!! here is your score:")
        var elem = createElement("h2");
        elem.html("score: " + questionsRight + "/" + totalq);
        database.ref("results/" + clas.value() + "/" + lk + "/" + in2.value() + "/" + in1.value()).update({
          totalScore : questionsRight
        })
      }
      database.ref(linke + "/" + select.value()).on("value", (data) => {
        dat2 = data.val();
      });

      setTimeout(() => {
        question.html("question : " + dat2.question);
        questiontype = select.value();
        console.log(questiontype);
        o1.html(dat2.o1);
        o2.html(dat2.o2);
        o3.html(dat2.o3);
        o4.html(dat2.o4);
      }, 200);
      


    } else {
      totalQuestionsComplete -= 1;
      lgk = totalQuestionsComplete;
      console.log(select.value())
      select.disable(select.value());

      database.ref("results/" + clas.value() + "/" + lk + "/" + in2.value() + "/" + in1.value() + "/" + select.value()).update({
        data: {
          question: dat2.question,
          correct: dat2.correct,
          given: lp,
          iscorrect: false,
          o1: o1.value(),
          o2: o2.value(),
          o3: o3.value(),
          o4: o4.value()
        },
      });
      if (totalQuestionsComplete === 0) {
        dive.hide();
        var elementa = createElement("h1");
        elementa.html("hurray! you completed the question sucsessfully!! here is your score:")
        var elem = createElement("h2");
        elem.html("score: " + questionsRight + "/" + totalq);
        database.ref("results/" + clas.value() + "/" + lk + "/" + in2.value() + "/" + in1.value()).update({
          totalScore : questionsRight
        })
      }
      database.ref(linke + "/" + select.value()).on("value", (data) => {
        dat2 = data.val();
      });
      setTimeout(() => {
        question.html("question : " + dat2.question);
        questiontype = select.value();
        console.log(questiontype);
        o1.html(dat2.o1);
        o2.html(dat2.o2);
        o3.html(dat2.o3);
        o4.html(dat2.o4);
      }, 200);

    }
  })

  o3.mousePressed(() => {
    lp = 3;
    if (str(lp) === str(dat2.correct)) {
      totalQuestionsComplete -= 1;
      lgk = totalQuestionsComplete;
      questionsRight += 1;
      console.log(totalQuestionsComplete);
      console.log(select.value())
      select.disable(select.value());

      database.ref("results/" + clas.value() + "/" + lk + "/" + in2.value() + "/" + in1.value() + "/" + select.value()).update({
        data: {
          question: dat2.question,
          correct: dat2.correct,
          given: lp,
          iscorrect: true,
          o1: o1.value(),
          o2: o2.value(),
          o3: o3.value(),
          o4: o4.value()
        },
      });
      if (totalQuestionsComplete === 0) {
        dive.hide();
        var elementa = createElement("h1");
        elementa.html("hurray! you completed the question sucsessfully!! here is your score:")
        var elem = createElement("h2");
        elem.html("score: " + questionsRight + "/" + totalq);
        database.ref("results/" + clas.value() + "/" + lk + "/" + in2.value() + "/" + in1.value()).update({
          totalScore : questionsRight
        })
      }
      database.ref(linke + "/" + select.value()).on("value", (data) => {
        dat2 = data.val();
      });
      setTimeout(() => {
        question.html("question : " + dat2.question);
        questiontype = select.value();
        console.log(questiontype);
        o1.html(dat2.o1);
        o2.html(dat2.o2);
        o3.html(dat2.o3);
        o4.html(dat2.o4);
      }, 200);


    } else {
      totalQuestionsComplete -= 1;
      lgk = totalQuestionsComplete;
      console.log(select.value())
      select.disable(select.value());

      database.ref("results/" + clas.value() + "/" + lk + "/" + in2.value() + "/" + in1.value() + "/" + select.value()).update({
        data: {
          question: dat2.question,
          correct: dat2.correct,
          given: lp,
          iscorrect: false,
          o1: o1.value(),
          o2: o2.value(),
          o3: o3.value(),
          o4: o4.value()
        },
      });
      if (totalQuestionsComplete === 0) {
        dive.hide();
        var elementa = createElement("h1");
        elementa.html("hurray! you completed the question sucsessfully!! here is your score:")
        var elem = createElement("h2");
        elem.html("score: " + questionsRight + "/" + totalq);
        database.ref("results/" + clas.value() + "/" + lk + "/" + in2.value() + "/" + in1.value()).update({
          totalScore : questionsRight
        })
      }
      database.ref(linke + "/" + select.value()).on("value", (data) => {
        dat2 = data.val();
      });
      setTimeout(() => {
        question.html("question : " + dat2.question);
        questiontype = select.value();
        console.log(questiontype);
        o1.html(dat2.o1);
        o2.html(dat2.o2);
        o3.html(dat2.o3);
        o4.html(dat2.o4);
      }, 200);

    }
  })

  o4.mousePressed(() => {
    lp = 4;
    if (str(lp) === str(dat2.correct)) {
      totalQuestionsComplete -= 1;
      lgk = totalQuestionsComplete;
      questionsRight += 1;
      console.log(totalQuestionsComplete);
      console.log(select.value())
      select.disable(select.value());

      database.ref("results/" + clas.value() + "/" + lk + "/" + in2.value() + "/" + in1.value() + "/" + select.value()).update({
        data: {
          question: dat2.question,
          correct: dat2.correct,
          given: lp,
          iscorrect: true,
          o1: o1.value(),
          o2: o2.value(),
          o3: o3.value(),
          o4: o4.value()
        },
      });
      if (totalQuestionsComplete === 0) {
        dive.hide();
        var elementa = createElement("h1");
        elementa.html("hurray! you completed the question sucsessfully!! here is your score:")
        var elem = createElement("h2");
        elem.html("score: " + questionsRight + "/" + totalq);
        database.ref("results/" + clas.value() + "/" + lk + "/" + in2.value() + "/" + in1.value()).update({
          totalScore : questionsRight
        })
      }
      database.ref(linke + "/" + select.value()).on("value", (data) => {
        dat2 = data.val();
      });
      setTimeout(() => {
        question.html("question : " + dat2.question);
        questiontype = select.value();
        console.log(questiontype);
        o1.html(dat2.o1);
        o2.html(dat2.o2);
        o3.html(dat2.o3);
        o4.html(dat2.o4);
      }, 200);


    } else {
      totalQuestionsComplete -= 1;
      lgk = totalQuestionsComplete;
      console.log(select.value())
      select.disable(select.value());

      database.ref("results/" + clas.value() + "/" + lk + "/" + in2.value() + "/" + in1.value() + "/" + select.value()).update({
        data: {
          question: dat2.question,
          correct: dat2.correct,
          given: lp,
          iscorrect: false,
          o1: o1.value(),
          o2: o2.value(),
          o3: o3.value(),
          o4: o4.value()
        },
      });
      if (totalQuestionsComplete === 0) {
        dive.hide();
        var elementa = createElement("h1");
        elementa.html("hurray! you completed the question sucsessfully!! here is your score:")
        var elem = createElement("h2");
        elem.html("score: " + questionsRight + "/" + totalq);
        database.ref("results/" + clas.value() + "/" + lk + "/" + in2.value() + "/" + in1.value()).update({
          totalScore : questionsRight
        })
        //makeShow()
      }
      database.ref(linke + "/" + select.value()).on("value", (data) => {
        dat2 = data.val();
      });
      setTimeout(() => {
        question.html("question : " + dat2.question);
        questiontype = select.value();
        console.log(questiontype);
        o1.html(dat2.o1);
        o2.html(dat2.o2);
        o3.html(dat2.o3);
        o4.html(dat2.o4);
      }, 200);

    }
  })
}

function makeShow(clas, section, testname, totalRight) {
  var test = testname;
  var classname = clas;
  var sec = section;
  var correctall = totalRight;


}