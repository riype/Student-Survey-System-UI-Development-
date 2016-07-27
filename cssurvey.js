/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {
	cookie();
});

function cookie(nullifyCookie) {
	var message;

	if(nullifyCookie) {
		document.cookie = null;
	}
	var current = new Date();
	var hour = current.getHours();
	var name1;
	if (hour < 12)
		message = "Good Morning, ";
	else {
		hour = hour - 12;
		if (hour < 6)
			message = "Good Afternoon, ";
		else
			message = "Good Evening, ";
	}

	if (document.cookie) {
		var userCookie = unescape(document.cookie);
		var cookieTokens = userCookie.split("=");
		name1 = cookieTokens[1];
	} else {
		name1 = window.prompt("Please enter your name", "John Doe");
		document.cookie = "name1=" + escape(name1);
	}
	message += name1 + ", welcome to Assignment#3";
	message += "<a href = 'javascript:wrongUser()'>" + "<br>"
			+ "Click here if you are not " + name1 + "</a>";
	document.getElementById("cookiedisplay").innerHTML = message;
}

function wrongUser() {
	document.cookie = "name1=null;" + "expires=Tue, 23-Jan-14 00:00:01 GMT";
	cookie(true);
}

function avgMax() {
	var inputString = document.getElementById("inputVal").value;
	var tokens = inputString.split(",");
	var sum = 0;
	var max = tokens[0];

	if (tokens.length >= 10) {
		for (var a = 0; a < tokens.length; a++) {
			if ((!isNaN(tokens[a])) && ((tokens[a] >= 1) && (tokens[a] <= 100))) {
				sum = sum + parseInt(tokens[a]);
				max = Math.max(max, tokens[a]);
			} else {
				document.getElementById('dataerror').innerHTML = "* Please enter integers ranging from 1 to 100 *";
				return false;
			}
		}
		var average = sum / tokens.length;
		document.getElementById('dataerror').innerHTML = "";
		document.getElementById("avg").innerHTML = average;
		document.getElementById("max").innerHTML = max;
	} else {
		document.getElementById('dataerror').innerHTML = "* You should enter atleast 10 ',' seperated integers ranging from 1 to 100 *";
		document.getElementById('email').value = "";
		document.getElementById('email').focus();
	}
}
function surveyformValidation() {
	var name = document.getElementById('name').value;
	var addressline = document.getElementById('addressline').value;
	var campuslike = document.getElementsByName('campuslike');
	var interest = document.getElementsByName('interest');
	var email = document.getElementById('email').value;

	var isNameVal = inputAlpha(name,
			"* Your name must contain only Alphabets *");
	var isAddrVal = textAlphanumeric(addressline,
			"* Please enter only numeric, alphabet or alphanumeric characters *");
	var isChkBxCheckd = boxChk(campuslike, "* Please check mulpiple boxes *");
	var isRadioSel = radioSelect(interest, "* Please make a selection *");
	var isEmalVal = emailValidation(email,
			"* Please enter a valid email address *");

	if (isNameVal && isAddrVal && isChkBxCheckd && isRadioSel && isEmalVal) {
		return true;
	} else {
		return false;
	}
}

function inputAlpha(inputtext, alertMsg) {
	var alpha = /^[a-zA-Z]+$/;
	if (inputtext.match(alpha)) {
		document.getElementById('nerror').innerHTML = "";
		return true;
	} else {
		document.getElementById('nerror').innerHTML = alertMsg;
		document.getElementById('name').value = "";
		document.getElementById('name').focus();
		return false;
	}
}

function textAlphanumeric(inputtext, alertMsg) {
	var alphanum = /^[0-9a-zA-Z ]+$/;
	if (inputtext.match(alphanum)) {
		document.getElementById('aerror').innerHTML = "";
		return true;
	} else {
		document.getElementById('aerror').innerHTML = alertMsg;
		document.getElementById('addressline').value = "";
		document.getElementById('addressline').focus();
		return false;
	}
}

function boxChk(campuslike, alertMsg) {

	var checked = 0;
	for (var i = 0; i < campuslike.length; i++) {
		if (campuslike[i].checked) {
			checked = checked + 1;
		}
	}
	if (checked >= 2) {
		document.getElementById('chkerror').innerHTML = "";
		return true;
	} else {
		document.getElementById('chkerror').innerHTML = alertMsg;
		return false;
	}
}

function radioSelect(interest, alertMsg) {
	var checked = 0;
	for (var i = 0; i < 4; i++) {
		if (interest[i].checked) {
			checked = i;
			document.getElementById('radioerror').innerHTML = "";
			return true;
		}
	}
	if (checked === 0) {
		document.getElementById('radioerror').innerHTML = alertMsg;
		return false;
	}
}

function emailValidation(inputtext, alertMsg) {
	var validexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (inputtext.match(validexp)) {
		document.getElementById('emailerror').innerHTML = "";
		return true;
	} else {
		document.getElementById('emailerror').innerHTML = alertMsg;
		document.getElementById('email').value = "";
		document.getElementById('email').focus();
		return false;
	}
}

// $(function () {
// $("#zip").blur(function () {
// var rec = $(this);
//
// if (rec.val().length === 5) {
// $.ajax({
// url: "../zip.json",
// cache: false,
// dataType: "json",
// type: "GET",
// data: "zip:" + rec.val(),
// success: function (result, success) {
// $("#city").val(result.city);
// $("#state").val(result.state);
// }
// });
// return true;
// }
// else
// document.getElementById('ziperror').innerHTML = "* Please enter a valid 5
// digit zip *";
// return false;
// });
// });
function getZip() {
	var zipVal = document.getElementById("zip").value;
	if (zipVal.toString().length === 5) {
		try {
			asyncRequest = new XMLHttpRequest();
			asyncRequest.onreadystatechange = findZip;
			asyncRequest.open("GET", "zip.json", true);
			asyncRequest.send();
		} catch (exception) {
			alert('Request failed.');
			return false;
		}
	}

}
function findZip() {
	if (asyncRequest.readyState === 4 && asyncRequest.status === 200) {
		var params = JSON.parse(asyncRequest.responseText);

		for (var i = 0; i < params.zipcodes.length; i++) {
			if (params.zipcodes[i].zip === zip.value) {
				index = i;
				document.getElementById("city").innerHTML = params.zipcodes[index].city;
				document.getElementById("state").innerHTML = params.zipcodes[index].state;

				return true;
			} else {
				document.getElementById("city").innerHTML = "";
				document.getElementById("state").innerHTML = "";
			}
		}
	}
}
function resetForm(){
	document.getElementById("myform").reset();
	document.getElementById("nerror").innerHTML="";
	document.getElementById("aerror").innerHTML="";
	document.getElementById("ziperror").innerHTML="";
	document.getElementById("emailerror").innerHTML="";
	document.getElementById("chkerror").innerHTML="";
	document.getElementById("radioerror").innerHTML="";
	document.getElementById("dataerror").innerHTML="";
}