var heads;
var teachers;
var students;
var database;
var message;
var mainmessage;
function setup() {
	noCanvas();
	heads = select('.heads');
	teachers = select('.teachers')
	students = select('.students')
	database = firebase.database();
	message = select('#messa')
	heads.mousePressed(() => {
		window.location = "./Heads/index.html?loginstate=1234111";
	})
	students.mousePressed(() => {
		window.location = "./Students";
	})

}

function draw() {
	database.ref('/message').on('value', (data) => {
		mainmessage = data.val()
	})
	message.html(mainmessage);
}
