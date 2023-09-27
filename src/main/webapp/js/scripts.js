
window.onload = function() {

	let token = sessionStorage.getItem('loginToken');

	if (token != null) {
		setVisibilityH(true);
		setVisibility("find-ride-container", false);
		hidenAsideElement();
	}
	else {
		setVisibility("find-ride-container", true);
		setVisibilityH(false);
		stundentPlanHiden();
	}

	initMap();


};
var arrayUser=[];
let myMap;
let latitude;
let longitude;

latitude = 49.250723;
longitude = 7.377122;

function initMap() {
	myMap = L.map('map-container').setView([latitude, longitude], 13);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>, <a href="https://www.flaticon.com/free-icons/address" title="address icons">Address icons created by DinosoftLabs - Flaticon</a>',
		maxZoom: 18, // max. possible 23
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
	}).addTo(myMap);


	userMarker(latitude,longitude);
}

/////////////////////////////////////////////Maker/////////////////////////////////

function userMarker(longitude,latitude){
	L.marker([latitude, longitude]).addTo(myMap);

}

/////////////////////////////////////////////////////////////////


function setVisibility(elementId, visible) {
	const element1 = document.querySelector("#stundenPlan");
	const element = document.getElementById(elementId);

	if(visible === true) {
		element.classList.remove("hidden");
	} else {
		element.classList.add("hidden")
		element1.classList.add("hidden");
		showMap();
	}
}


// get Element with function event
function getStundenPlanF(){

	document.querySelector("#asideElement").style.display="none";
	let token = sessionStorage.getItem('loginToken');
	const element1 = document.querySelector("#stundenPlan");
	const element2 = document.querySelector("#map-container");

	if(token != null){
		element1.classList.remove("hidden");
		element2.classList.add("hidden");
	}

}

//Alle Mitfahrer gelegenheit zugreifen
function getMitgelegenheitenF(){

	document.querySelector("#asideElement").style.display="block";
	let token = sessionStorage.getItem('loginToken');
	const element = document.querySelector("#find-ride-container");
	const element1 = document.querySelector("#stundenPlan");
	const element2 = document.querySelector("#map-container");

	if(token != null){
		element.classList.remove("hidden");
		element1.classList.add("hidden");
		element2.classList.remove("hidden");
	}
}

//Hidden asside Element
function hidenAsideElement(){
	const element = document.querySelector("#asideElement");
	element.classList.add("hidden");
}

//Hidden Stundenplan
function stundentPlanHiden(){
	const element1 = document.querySelector("#stundenPlan");
	element1.classList.add("hidden");
}

//Show map
function showMap(){
	const element3 = document.querySelector("#map-container");
	element3.classList.remove("hidden");
}

//Get Form neuer User Registrieren
function neurUserReg(){
	document.querySelector("#neuUserRegister").style.display = "block";
}

// Hidden Form neuer User register
function abbrechen(){
	document.querySelector("#neuUserRegister").style.display = "none";
}


//Set Visibility von Element in der Header Datei

function setVisibilityH(visible) {

	const elt = document.querySelector("#hiddenBeforLogin1");
	const elt1 = document.querySelector("#hiddenB");

	//Login and Register Button selected
	const elt2 = document.querySelector("#hiddenAfterLogin1");
	const elt3 = document.querySelector("#hiddenAfterLogin2");

	if(visible === true) {
		elt.classList.remove("hidden");
		elt1.classList.remove("hidden");

		//Login and Register Button Element Hidden
		elt2.classList.add("hidden");
		elt3.classList.add("hidden");
	} else {
		elt.classList.add("hidden")
		elt1.classList.add("hidden")

		//Login and Register Button Element Show
		elt2.classList.remove("hidden");
		elt3.classList.remove("hidden");
	}
}


// User suchen
function suchen(){
	var ctr =0;

	var token = sessionStorage.getItem('loginToken');

	var fahrt = document.getElementById("fahrt").value;
	var hinfahrt = document.getElementById("ruckfahrt").value;
	var hinruckfahrt = document.getElementById("hinruckfahrt").value;
	var distance = document.getElementById("distance").value;
	var weeks = document.getElementById("weeks").value;
	var time = document.getElementById("time").value;


	if ((fahrt !== "" || hinfahrt !=="" || hinruckfahrt !== "" ) && distance !== "" && weeks !== "" && time !== "") {
		fetch('demo/user?distance=' + distance + "&token=" + token, {
			method: 'get',
			headers: {
				'Content-type': 'application/json'
			},
		})
			.then(response => response.json())
			.then(data => {

				for (let i = 0; i < data.length; i++) {


					if (data[i].position.latitude != sessionStorage.getItem("current_user_latitude") && data[i].position.longitude != sessionStorage.getItem("current_user_longide")) {
						var maker = L.marker([data[i].position.latitude, data[i].position.longitude], {
							icon: blueIcon
						}).addTo(myMap);
						arrayUser.push(maker);
						for (elt of arrayUser) {
							elt.on('click', event => changeIcon(event, data, maker))
						}

					}

					var mytable = document.getElementById("myTable");
					var userName = data[i].username + " " + data[i].lastname;
					var userEmail = data[i].email;
					var userAdresse = data[i].street + "" + data[i].streetNumber
						+ ", " + data[i].zip + " " + data[i].city;
					var pos = data[i].position.latitude;

					var row = `<div id="myId` + ctr + `"` + `  style="background-color:#395060;font-size:10px;margin-top: 2px;   display: grid;row-gap: 50px;grid-template-columns: auto auto auto;padding: 5px;">
                <div style="border: 1px solid rgba(0, 0, 0, 0);
							  padding: 10px;
							  font-size: 10px;
							  text-align: center;">
                    <img alt="" src="icon/profile-user.png" style="height:50px;width:50px;">
                </div>

                <div style="border: 1px solid rgba(0, 0, 0, 0);
					  padding: 10px;
					  font-size: 10px;
					  text-align: center;">
                    <table>
                    <tr>
                        <td>${userName}</td>
                        
                       
                    </tr>
                    <tr><td>${userEmail}</td></tr>
                    <tr><td>${userAdresse}</td></tr>
                    <tr><td id="newId` + ctr + `"` + `>${pos}</td></tr>
                    </table>
                </div>
            </div>`;
					mytable.innerHTML += row;
					ctr++;
				}

			})

			.catch((error) => {
				console.error('Error:', error);
				sessionStorage.removeItem('loginToken');
				document.querySelector("#loginError").innerHTML = "  ein Fehler ist aufgetreten , bitte probieren sie es noch mal!";
			});
	}else {

		sessionStorage.setItem('error',"Ein Fehler ist Aufgetreten")
		document.getElementById("error").style.color = "red";
		document.querySelector("#error").innerHTML = sessionStorage.getItem('error');
	}
}




//////////////////////////////////////////////////////ICON///////////////////////////////////////

//Icon
var redIcon = L.icon({
	iconUrl: "./icon/marker-icon-red.png",
	shadowUrl: "./icon/marker-shadow.png",
	iconSize: [25,41],
	iconAnchor: [12,41],
	popupAnchor: [1,-34],
	shadowSize: [41,41],
});

var blueIcon = L.icon({
	iconUrl: "./icon/marker-icon-blue.png",
	shadowUrl: "./icon/marker-shadow.png",
	iconSize: [25,41],
	iconAnchor: [12,41],
	popupAnchor: [1,-34],
	shadowSize: [41,41],
});


//User Icon Color Ander

function changeIcon(event,data,element) {

	let i=0;
	while( i<arrayUser.length){
		if(arrayUser[i].getLatLng() === event.latlng){

			var Div=document.getElementById("myId"+i);

			var userName = data[i].username + " "+ data[i].lastname;
			var userEmail = data[i].email;
			var userAdresse = data[i].street +""+data[i].streetNumber
				+", "+data[i].zip+ " "+data[i].city;
			var pos= data[i].position.latitude;


			Div.innerHTML= `<div style="background-color:#bdbbbb;font-size:10px;margin-top: 2px;   display: grid;row-gap: 50px;grid-template-columns: auto auto auto;padding: 5px;">
                <div style="border: 1px solid rgba(0, 0, 0, 0);
							  padding: 10px;
							  font-size: 10px;
							  text-align: center;">
                    <img alt="" src="icon/profile-user.png" style="height:50px;width:50px;">
                </div>

                <div style="border: 1px solid rgba(0, 0, 0, 0);
					  padding: 10px;
					  font-size: 10px;
					  text-align: center;">
                    <table>
                    <tr>
                        <td>${userName}</td>
                        
                       
                    </tr>
                    <tr><td>${userEmail}</td></tr>
                    <tr><td>${userAdresse}</td></tr>
                    <tr><td>${pos}</td></tr>
                    </table>
                </div>
            </div>`;


			L.marker([event.latlng.lat, event.latlng.lng],{
				icon: redIcon
			}).addTo(myMap);
		}
		i++;
	}
}




///////////////////////////////////////LOGIN/////////////////////////////////////////
		function login() {
			let data = {
				username: document.querySelector("#username").value,
				password: document.querySelector("#password").value
			};

			fetch('demo/access', {
				method: 'post',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)
			})
				.then(response => response.json())
				.then(data => {
					document.getElementById("myusernam").innerHTML = "Willkommen "+ document.querySelector("#username").value;

					sessionStorage.setItem('loginToken', data.token);
					setVisibilityH(true);

					//Show User View
					let username = document.querySelector("#username").value;
					getUserData(username,data.token);

					//hidenAsideElement();
					setVisibility("find-ride-container", false);
				})
				.catch((error) => {
					location.reload();
					console.error('Error:', error);
					sessionStorage.removeItem('loginToken');

					document.querySelector("#loginError").innerHTML = "Es ist ein Fehler aufgetreten!";
				});
		}

		function getUserData(username,token){
			fetch('demo/user/get?userName='+username+"&token="+token, {
				method: 'get',
				headers: {
					'Content-type': 'application/json'
				}
			})
				.then(response => response.json())
				.then(data => {
					setTimeWeekday(data.user_id,token);
					sessionStorage.setItem("user_iD",data.user_id);

					//Set Maker
					setMarkerOn(data,true);
					sessionStorage.setItem('current_user_latitude',data.position.latitude);
					sessionStorage.setItem('current_user_longide',data.position.longitude);

					document.getElementById("useradresse").innerHTML =
						data.street+ " "+data.streetNumber+", "+
						data.zip+" "+data.city;
				})
				.catch((error) => {
					console.error('Error:', error);
					sessionStorage.removeItem('loginToken');
					document.querySelector("#loginError").innerHTML = "Es ist ein Fehler aufgetreten!";
				});
		}

		function setMarkerOn(data,valueTorF){
			if (valueTorF && data !=null){
				var meinIcon = L.icon({
					iconUrl:'/icon/marker-icon-home.png',
					iconSize:[50,55]
				});

				L.marker([data.position.latitude, data.position.longitude],{icon:meinIcon}).addTo(myMap);

			}
		}

		function setTimeWeekday(user_id,token){
			fetch('demo/weekday/get?id='+user_id+"&token="+token, {
				method: 'get',
				headers: {
					'Content-type': 'application/json'
				}
			})
				.then(response => response.json())
				.then(data => {
					if(data != null){

						for (let i=0;i<data.length;i++){
							if (data[i].weekday === 1){
								document.getElementById("montagB").value = data[i].startTime;
								document.getElementById("montagE").value = data[i].endTime;
							}
							if (data[i].weekday === 2){
								document.getElementById("dienstagB").value = data[i].startTime;
								document.getElementById("dienstagE").value = data[i].endTime;
							}
							if (data[i].weekday === 3){
								document.getElementById("mittwochB").value = data[i].startTime;
								document.getElementById("mittwochE").value = data[i].endTime;
							}
							if (data[i].weekday === 4){
								document.getElementById("donnerstagB").value = data[i].startTime;
								document.getElementById("donnerstagE").value = data[i].endTime;
							}
							if (data[i].weekday === 5){
								document.getElementById("freitagB").value = data[i].startTime;
								document.getElementById("freitagE").value = data[i].endTime;
							}
							if (data[i].weekday ===6){
								document.getElementById("samstagB").value = data[i].startTime;
								document.getElementById("samstagE").value = data[i].endTime;
							}
							if (data[i].weekday === 7){
								document.getElementById("sonntagB").value = data[i].startTime;
								document.getElementById("sonntagE").value = data[i].endTime;
							}
						}
					}


				})
				.catch((error) => {
					console.error('Error:', error);
					sessionStorage.removeItem('loginToken');
					document.querySelector("#loginError").innerHTML = "Es ist ein Fehler aufgetreten!";
				});
		}

		function speichernStund(){

			let user_id = sessionStorage.getItem("user_iD");
			let token = sessionStorage.getItem("loginToken");

			if (user_id != null && token != null){

				let data1 = {
					user_id:user_id,
					weekday: 1,
					start_time:document.getElementById("montagB").value,
					end_time:document.getElementById("montagE").value,

				}

				let data2 = {
					user_id:user_id,
					weekday:2,
					start_time:document.getElementById("dienstagB").value,
					end_time:document.getElementById("dienstagE").value,
				}

				let data3 = {
					user_id:user_id,
					weekday:3,
					start_time:document.getElementById("mittwochB").value,
					end_time:document.getElementById("mittwochE").value,
				}

				let data4 = {
					user_id:user_id,
					weekday:4,
					start_time:document.getElementById("donnerstagB").value,
					end_time:document.getElementById("donnerstagE").value,
				}

				let data5 = {
					user_id:user_id,
					weekday:5,
					start_time:document.getElementById("freitagB").value,
					end_time:document.getElementById("freitagE").value,
				}
				let data6 = {
					user_id:user_id,
					weekday:6,
					start_time:document.getElementById("samstagB").value,
					end_time:document.getElementById("samstagE").value,
				}

				let data7 = {
					user_id:user_id,
					weekday:7,
					start_time:document.getElementById("sonntagB").value,
					end_time:document.getElementById("sonntagE").value,
				}



				let big_data = [data1,data2,data3,data4,data5,data6,data7];

				for (let d1 of big_data){
					if (d1.start_time.length !== 0 && d1.end_time.length !== 0){
						registerstund(d1)
					}
				}

			}

		}


		function registerstund(data) {
			fetch('demo/weekday/save', {
				method: 'put',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)

			}).catch((error) => {
				sessionStorage.removeItem('loginToken');
				document.querySelector("#loginError").innerHTML = "Die Daten wurde nicht hinzugefügt!";
			});

		}

/////////////////////////////////////// END LOGIN/////////////////////////////////////////





