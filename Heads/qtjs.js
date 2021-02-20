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

