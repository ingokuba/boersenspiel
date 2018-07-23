<!DOCTYPE html>
<html>
<head lang="de">
<title>Registrierung</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="registrierung.js"></script>
</head>
<body class="text-center">
	<form onsubmit="return checkInputs();"
		style="max-width: 330px; margin: auto;">
		<div class="container">
			<h3 class="mb-3 font-weight-normal form-text">Bitte anmelden</h3>
			<div class="form-group row">
				<select class="form-control col-sm-4" size="1" data-toggle="tooltip"
					title="Anrede">
					<option value="mr">Herr</option>
					<option value="ms">Frau</option>
				</select> <input id="inputGivenname" class="form-control col-sm-4"
					placeholder="Vorname" onblur="resetValidity(this)"> <input
					id="inputSurname" class="form-control col-sm-4"
					placeholder="Nachname" onblur="resetValidity(this)">
			</div>
			<div class="form-group row">
				<input id="inputEmail" class="form-control col-sm"
					placeholder="E-Mail" onblur="resetValidity(this)">
			</div>
			<div class="form-group row">
				<input id="repeatEmail" class="form-control col-sm"
					placeholder="Bitte E-Mail wiederholen" onblur="checkRepeatEmail()">
			</div>
			<div class="form-group row">
				<input id="inputBirthday" class="form-control col-sm" type="date"
					onblur="checkBirthday()" data-toggle="tooltip" title="Geburtstag">
			</div>
			<div class="form-group row">
				<input id="inputPostcode" class="form-control col-sm"
					placeholder="PLZ des Wohnorts" maxlength="5"
					onkeyup="replaceInvalidPostcode()" onblur="checkPostcode()">
			</div>
			<button id="signinButton" class="btn btn-lg btn-primary btn-block"
				type="submit">Bestaetigen</button>
		</div>
	</form>
</body>
</html>