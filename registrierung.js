/**
 * General Email Regex (RFC 5322 Official Standard)
 */
var emailRegex = '(?:[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])';

function checkInputs() {
	let res = checkRequiredField('#inputGivenname');

	if (!checkRequiredField('#inputSurname')) {
		res = false;
	}
	if (!checkRequiredField('#inputEmail')
			|| !checkFormat('#inputEmail', emailRegex,
					'Bitte geben Sie eine E-Mail-Addresse ein.')) {
		res = false;
	}
	if (!checkRepeatEmail()) {
		res = false;
	}
	if (!checkBirthday()) {
		res = false;
	}
	if (!checkPostcode()) {
		res = false;
	}
	return res;
}

function resetValidity(input) {
	input.setCustomValidity('');
	checkRequiredField('#' + input.id);
}

function checkRequiredField(id) {
	setValidityById(id, '');
	let value = $(id).val();
	if (value.length == 0) {
		setValidityById(id, 'Bitte füllen Sie dieses Feld aus.');
		return false;
	}
	return true;
}

function checkFormat(id, format, errorMsg) {
	setValidityById(id, '');
	let value = $(id).val();
	if (!RegExp(format).test(value)) {
		setValidityById(id, errorMsg);
		return false;
	}
	return true;
}

function checkRepeatEmail() {
	let email = $('#inputEmail').val();
	let repeatEmail = $('#repeatEmail').val();
	if (email != repeatEmail) {
		setValidityById('#repeatEmail',
				'Die E-Mail-Adressen müssen übereinstimmen.');
		return false;
	} else {
		setValidityById('#repeatEmail', '');
	}
	return true;
}

function checkBirthday() {
	let birthday = $('#inputBirthday').val();
	if (birthday.length == 0) {
		setValidityById('#inputBirthday', 'Bitte füllen Sie dieses Feld aus.');
		return false;
	} else if (getAge(birthday) < 18) {
		setValidityById('#inputBirthday',
				'Sie müssen mindestens 18 Jahre alt sein.');
		return false;
	} else {
		setValidityById('#inputBirthday', '');
	}
	return true;
}

function replaceInvalidPostcode() {
	let postcode = $('#inputPostcode').val();
	if (!RegExp('^[0-9]*$').test(postcode)) {
		let trunc = jQuery.trim(postcode).substring(0, postcode.length - 1);
		$('#inputPostcode').val(trunc);
	}
}

function checkPostcode() {
	let postcode = $('#inputPostcode').val();

	if (postcode.length != 5) {
		setValidityById('#inputPostcode', 'Postleitzahl muss 5-stellig sein.');
		return false;
	} else {
		setValidityById('#inputPostcode', '');
	}
	return true;
}

function setValidityById(id, msg) {
	$(id).get(0).setCustomValidity(msg);
}

function getAge(date) {
	let birthday = new Date(date);
	let today = new Date();
	let age = today.getFullYear() - birthday.getFullYear();
	if (today.getMonth() > birthday.getMonth()) {
		age--;
	} else if (today.getDate() > birthday.getDate()) {
		age--;
	}
	return age;
}