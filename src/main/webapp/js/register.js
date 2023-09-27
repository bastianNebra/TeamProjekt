
function register(){
	let file = document.getElementById("profilbild").files[0];
	var reader = new FileReader();
			
	if (file) {
		
		reader.readAsDataURL(file);
				var username = document.getElementById("firstname").value;
				var firstname = document.getElementById("firstname").value;
				var lastname = document.getElementById("lastname").value;
				var street= document.getElementById("street").value;
				var streetNumber= document.getElementById("streetNumber").value;
				var zip= document.getElementById("plz").value;
				var city= document.getElementById("ort").value;
				var email= document.getElementById("email").value;
				var benutzerId= document.getElementById("benutzerId").value;
				var password= document.getElementById("password1").value;
				var profilbild= reader.result;

				let neuUser = sessionStorage.setItem("neuUser", username);

			let data = {username,password,firstname,lastname,email,street,streetNumber,zip,city};
			registerUser(data);
		
		reader.onerror = function(error) {
			console.log('Error: ', error);
		}
		
	}
	else {
		let data = {
				username: document.querySelector("#firstname").value,
				password: document.querySelector("#password1").value,
				vorname: document.querySelector("#firstname").value,
				nachname: document.querySelector("#lastname").value,
				email: document.querySelector("#email").value,
				strasse: document.querySelector("#street").value,
				nr: document.querySelector("#streetNumber").value,
				plz: document.querySelector("#plz").value,
				ort: document.querySelector("#ort").value,
				benutzerId: document.querySelector("#benutzerId").value,
				profilbild: reader.result //New angabe


				 
		};

		let neuUser = sessionStorage.setItem("neuUser", data.username);
		registerUser(data);
	}

}

function registerUser(data) {
	fetch("demo/access/save", {
		method: 'post',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(response => {
			if (!response.ok) {
				document.querySelector("#registerError").innerHTML = "Ein Fehler ist aufgetreten!";
				throw Error(response.statusText);
			}
			return response.json();
		})
		.then(data => {
			//console.log("1 "+sessionStorage.getItem("neuUser"));
			//console.log("2 "+document.querySelector("#firstname").value);

			document.querySelector("#neuUserRegister").style.display = "none";

			sessionStorage.setItem('loginToken', data.token);
			setVisibilityH(true);

			document.querySelector("#myusernam").innerHTML = "Willkommen "+ sessionStorage.getItem("neuUser");
			//document.querySelector("#myusernam").innerHTML = "Willkommen "+ document.querySelector("#firstname").value;

			username = sessionStorage.getItem("neuUser")
			let token = sessionStorage.getItem("loginToken");

			getUserData(username,token);

			console.log("user name " + username + "tOKEM "+ token )

			setVisibility("find-ride-container", false);
			hidenAsideElement();

			//
		})
		.catch(error => {
			sessionStorage.removeItem('loginToken');
			console.error('Error:', error);
		});
}


/**
 *  Überprüfung von mails, plz, nachname bzw vorname
 */


var canvas = document.querySelector("#pwdCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "white";
ctx.fillRect(0, 0, 80, 10);



function checkPassword() {

	var passwd = document.querySelector("#password1").value;

	var len = passwd.length;
	var regExHasTwoNumber = /\d\D+\d/;
	var regExHasSpecialSign = /[!§$&?]/;

	var hasMinLen = (len > 5);
	var hasTwoNumber = regExHasTwoNumber.test(passwd);
	var hasSpecialSign = regExHasSpecialSign.test(passwd);

	if( hasMinLen && hasTwoNumber && hasSpecialSign)
	{
		document.querySelector("#passwdMsg").innerHTML = "sehr sicher";
	}
	else if( hasMinLen && hasSpecialSign )
	{
		document.querySelector("#passwdMsg").innerHTML = "sicher";
	}
	else if( hasMinLen )
	{
		document.querySelector("#passwdMsg").innerHTML = "akzeptabel";
	}
	else
	{
		document.querySelector("#passwdMsg").innerHTML = "nicht sicher";
	}

	var size = 0;
	if (hasMinLen)
		size += 4;
	if (hasTwoNumber)
		size += 4;
	if (hasSpecialSign)
		size += 4;

	var c = document.querySelector("#pwdCanvas");
	var ctx = c.getContext("2d");

	ctx.fillStyle = "red";
	ctx.fillRect(0, 0, 80, 10);

	var grd = ctx.createLinearGradient(0, 0, size * 20, 0);
	grd.addColorStop(0, "green");
	grd.addColorStop(1, "red");

	ctx.fillStyle = grd;
	ctx.fillRect(0, 0, 80, 10);

}
var nameOk = false;
var plzOk = false;
var emailOk = false;
var vnameOk=false;

function checkIfAllOk()
{
	let allOk = nameOk && plzOk && emailOk && vnameOk;
	if( allOk )
	{
		document.querySelector("#btn").disabled=false;
	}
	else
	{
		document.querySelector("#btn").disabled=true;
	}
}

function checkNameOnFocus()
{
	document.querySelector("#errorName").innerHTML = "";
}

function checkNameOnBlur()
{
	if( document.querySelector("#lastname").value.length == 0 )
		return;

	if( nameOk == false )
	{
		document.querySelector("#errorName").innerHTML = "Format des Namens ist falsch";
	}
}

function checkName()
{
	let nameInput = document.querySelector("#lastname").value;
	if( nameInput.length === 0 )
		return;

	let nameRegEx = /^[A-ZÄÖÜ][a-zäöüß]+(-[A-ZÄÖÜ][a-zäöüß]+)*$/;
	if( nameRegEx.test( nameInput ) == false )
	{
		nameOk = false;
	}
	else
	{
		nameOk = true;
	}
	checkIfAllOk();
}
function checkVNameOnFocus()
{
	document.querySelector("#errorVName").innerHTML = "";
}

function checkvNameOnBlur()
{
	if( document.querySelector("#firstname").value.length == 0 )
		return;

	if( vnameOk == false )
	{
		document.querySelector("#errorVName").innerHTML = "Format des VorNamens ist falsch";
	}
}

function checkVName()
{
	let nameInput = document.querySelector("#firstname").value;
	if( nameInput.length === 0 )
		return;

	let nameRegEx = /^[A-ZÄÖÜ][a-zäöüß]+(-[A-ZÄÖÜ][a-zäöüß]+)*$/;
	if( nameRegEx.test( nameInput ) == false )
	{
		vnameOk = false;
	}
	else
	{
		vnameOk = true;
	}
	checkIfAllOk();
}


function checkPlzOnFocus()
{
	document.querySelector("#errorPlz").innerHTML = "";
}

function checkPlzOnBlur()
{
	if( document.querySelector("#plz").value.length == 0 )
		return;

	if( plzOk == false )
	{
		document.querySelector("#errorPlz").innerHTML = "Format der Plz ist falsch";
	}
}


function checkPlz()
{
	plzOk = false;

	let telInput = document.querySelector("#plz").value;
	if( telInput.length === 0 )
		return;

	let telRegEx = /\d{5}/;
	if( telRegEx.test( telInput ) == false )
	{
		plzOk = false;
	}
	else
	{
		plzOk = true;
	}
	checkIfAllOk();
}

function checkEmailOnFocus()
{
	document.querySelector("#errorEmail").innerHTML = "";
}

function checkEmailOnBlur()
{
	if( document.querySelector("#email").value.length == 0 )
		return;

	if( emailOk == false )
	{
		document.querySelector("#errorEmail").innerHTML = "Format der E-Mail-Adresse ist falsch";
	}
}

function checkEmail()
{
	emailOk = false;

	let emailInput = document.querySelector("#email").value;
	if( emailInput.length === 0 )
		return;

	let emailRegEx = /^\w{4}\d{4}@stud\.(hs-kl|fh-kl)\.de$/;
	if( emailRegEx.test( emailInput ) == false )
	{
		emailOk = false;
	}
	else
	{
		emailOk = true;
	}

	checkIfAllOk();
}

