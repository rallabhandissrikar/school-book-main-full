function hideAl() {
  if (kks === false) {
    in1.show();
    in2.show();
    clas.show();
    lang.show();
    type.show();
    submit.show();
  }else {
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
  i1.parent(div)
  var button = createButton("Go to test");
  button.parent(div);
  var backButton = createButton("Back")
  backButton.parent(div);
  backButton.mousePressed(() => {
    div.hide();
    mainDiv.show();
    kks = false;

  })
  button.mousePressed(() => {
    lk = i1.value();
    link = "tests/" + clas.value() + "/"  + type.value() + "/" + lang.value() + "/" + lk

    console.log(link);
    console.log(clas.value());
    var metadata;

    database.ref(link).on('value', (data) => {
      metadata = data.val()
    })

    setTimeout(() => {
      if (metadata) {
        div.hide();
        makeQuestions();
      }
    }, 1000);

  })
}

function makeQuestions() {
  console.log()
  var linke = "tests/" + clas.value() + "/"  + type.value() + "/" + lang.value() + "/" + lk

  var dat;

  database.ref(linke).on('value', (data) => {
    dat = data.val();
  })

  var keys = Object.keys(dat)

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
  }
}
