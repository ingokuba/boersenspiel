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
<?php
$prefix = $givenName = $surname = $email = $email2 = $birthday = $postcode = "";
$error = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (! isset($_POST["prefix"])) {
        $error .= "Anrede fehlt! ";
    } else {
        $prefix = trim_input($_POST["prefix"]);
        if (! strcmp($prefix, "Herr") && ! strcmp($prefix, "Frau")) {
            $error .= "Anrede unbekannt. ";
        }
    }
    if (! isset($_POST["givenName"])) {
        $error .= "Vorname fehlt! ";
    } else {
        $givenName = trim_input($_POST["givenName"]);
        if (empty($givenName)) {
            $error .= "Vorname fehlt. ";
        } else if (! preg_match("/^[a-zA-Z ]*$/", $givenName)) {
            $error .= "Vorname: Nur Buchstaben und Leerzeichen erlaubt. ";
        }
    }
    if (! isset($_POST["surname"])) {
        $error .= "Nachname fehlt! ";
    } else {
        $surname = trim_input($_POST["surname"]);
        if (empty($surname)) {
            $error .= "Nachname fehlt. ";
        } else if (! preg_match("/^[a-zA-Z ]*$/", $surname)) {
            $error .= "Nachname: Nur Buchstaben und Leerzeichen erlaubt. ";
        }
    }
    if (! isset($_POST["email"])) {
        $error .= "E-Mail fehlt! ";
    } else {
        $email = trim_input($_POST["email"]);
        if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $error .= "E-Mail nicht valide. ";
        }
    }
    if (! isset($_POST["repeatEmail"])) {
        $error .= "E-Mail-Wiederholung fehlt! ";
    } else {
        $email2 = trim_input($_POST["repeatEmail"]);
        if ($email != $email2) {
            $error .= "E-Mails stimmen nicht überein. ";
        }
    }
    if (! isset($_POST["birthday"])) {
        $error .= "Geburtstag fehlt! ";
    } else {
        $birthday = trim_input($_POST["birthday"]);
        $age = get_age($birthday);
        if ($age < 18) {
            $error .= "Unter 18 Jahre. ";
        }
    }
    if (! isset($_POST["postcode"])) {
        $error .= "PLZ fehlt! ";
    } else {
        $postcode = trim_input($_POST["postcode"]);
        if (! preg_match("/^[0-9]{5}$/", $postcode)) {
            $error .= "PLZ muss aus 5 Zahlen bestehen. ";
        }
    }
    if (strlen($error) == 0) {
        header('Location: boersenspiel.html');
        exit();
    }
}

function get_age($birthday)
{
    $age = date_diff(date_create_from_format('Y-m-d', $birthday), date_create());
    return $age->format('%y');
}

function trim_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>
<body class="text-center">
	<form onsubmit="return checkInputs();" method="post"
		action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>"
		style="max-width: 330px; margin: auto;">
		<div class="container">
			<h3 class="mb-3 font-weight-normal form-text">Bitte anmelden</h3>
			<div class="form-group row">
				<select class="form-control col-sm-4" size="1" data-toggle="tooltip"
					title="Anrede" name="prefix">
					<option value="mr">Herr</option>
					<option value="ms">Frau</option>
				</select> <input id="inputGivenname" class="form-control col-sm-4"
					placeholder="Vorname" onblur="resetValidity(this)" name="givenName">
				<input id="inputSurname" class="form-control col-sm-4"
					placeholder="Nachname" onblur="resetValidity(this)" name="surname">
			</div>
			<div class="form-group row">
				<input id="inputEmail" class="form-control col-sm"
					placeholder="E-Mail" onblur="resetValidity(this)" name="email">
			</div>
			<div class="form-group row">
				<input id="repeatEmail" class="form-control col-sm"
					placeholder="Bitte E-Mail wiederholen" onblur="checkRepeatEmail()"
					name="repeatEmail">
			</div>
			<div class="form-group row">
				<input id="inputBirthday" class="form-control col-sm" type="date"
					onblur="checkBirthday()" data-toggle="tooltip" title="Geburtstag"
					name="birthday">
			</div>
			<div class="form-group row">
				<input id="inputPostcode" class="form-control col-sm"
					placeholder="PLZ des Wohnorts" maxlength="5"
					onkeyup="replaceInvalidPostcode()" onblur="checkPostcode()"
					name="postcode">
			</div>
			<button id="signinButton" class="btn btn-lg btn-primary btn-block"
				type="submit">Bestaetigen</button>
			<div class="row text-danger mt-2"><?php echo $error;?></div>
		</div>
	</form>
</body>
</html>