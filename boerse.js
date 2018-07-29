$(function() {
	$('[data-toggle="tooltip"]').tooltip();
});

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// globale Startwerte:
var currentValue = 0;
var kapital = 1000.00;
var aktienAnzahl = 0;
var endProgram = 1;
var countWin = 0;
var countLoss = 0;

function startGame(value) {
	if (endProgram != 1) {
		return;
	}
	endProgram = 0;
	var counter = 0;
	var a = 0;
	var c = 0;

	var interval = setInterval(
			function stockPrice() {
				counter += 1;

				var b = value;

				var randomPercent = randomNumber(1, 100);

				// Handlung bei Programmende durch "Beenden Button" oder nach 5
				// Minuten
				if (counter > 300 || endProgram == 1) {
					clearInterval(interval);
					// Aktien werden automatisch verkauft
					if (aktienAnzahl > 0) {
						kapital += aktienAnzahl * value;
						aktienAnzahl = 0;
						var gewinnVerlust = kapital - 1000;
					} else {
						var gewinnVerlust = kapital - 1000;
					}

					if (gewinnVerlust < 0) {
						var verlust = Math.round(-1 * gewinnVerlust * 100) / 100;
						alert("Sie haben "
								+ verlust
								+ " Euro verloren. Sie haben leider kein Talent, um an der richtigen Börse zu handeln")
					} else {
						var gewinn = Math.round(gewinnVerlust * 100) / 100;
						alert("Ihr Gewinn beträgt " + gewinn + " Euro!");
					}

					// Globale Startwerte und Anzeigewerte nach beenden des
					// Programms:
					currentValue = 0;
					kapital = 1000.00;
					aktienAnzahl = 0;
					endProgram;
					countWin = 0;
					countLoss = 0;
					counter = 0;
					value = 100.00;
					var deleteGraph = 1;

					$("#kontostandField").html(Math.round(kapital * 100) / 100);
					$("#aktienField").html(aktienAnzahl);
					// Bärenmarkt(reset, wenn 25% Chance eintritt)
				} else if (randomPercent <= 75 && countLoss >= 3) {
					value -= randomNumber(10, 90) / 100;
				} else if (randomPercent > 75 && countLoss >= 3) {
					value += randomNumber(10, 90) / 100;
					countLoss = 0;
					countWin += 1;

					// Bullenmarkt(reset, wenn 25% Chance eintritt)
				} else if (randomPercent <= 75 && countWin >= 3) {
					value += randomNumber(10, 90) / 100;
				} else if (randomPercent > 75 && countWin >= 3) {
					value -= randomNumber(10, 90) / 100;
					countWin = 0;
					countLoss += 1;

					// Standardmarkt
				} else if (randomPercent <= 50) {
					value -= randomNumber(10, 90) / 100;
					countLoss += 1;
					countWin = 0;
				} else if (randomPercent > 50) {
					value += randomNumber(10, 90) / 100;
					countWin += 1;
					countLoss = 0;
				}

				// Aktienwert kann nicht unter 0 fallen
				if (value < 0) {
					value += randomNumber(10, 90) / 100;
				}

				a = c;
				c = c + 2;
				grafik(a, 300 - b, c, 300 - value, deleteGraph);

				deleteGraph = 0;

				currentValue = value;

				// Werte aktualisieren
				$("#kursField").html(Math.round(value * 100) / 100);
				$("#timeField").html(300 - counter);
			}, 1000);
}

function buy() {
	kapital -= currentValue;
	if (kapital >= 0) {
		aktienAnzahl += 1;
		$("#kontostandField").html(Math.round(kapital * 100) / 100);
		$("#aktienField").html(aktienAnzahl);
	} else {
		showTooltip("#kontostandField",
				"Sie benötigen Geld, um Aktien zu kaufen!");
		kapital += currentValue;
	}
}

function sell() {
	aktienAnzahl -= 1;
	if (aktienAnzahl < 0) {
		showTooltip("#kontostandField",
				"Sie haben keine Aktien, die Sie verkaufen könnten!");
		aktienAnzahl = 0;
	} else {
		kapital += currentValue;
		$("#kontostandField").html(Math.round(kapital * 100) / 100);
		$("#aktienField").html(aktienAnzahl);
	}
}

function showTooltip(id, title) {
	let field = $(id);
	field.attr("data-original-title", title);
	field.tooltip("show");
	setTimeout(function() {
		field.tooltip("hide");
	}, 1500);
}

function grafik(a, b, c, d, deleteGraph) {
	var canvas = document.getElementById("gameCanvas");
	var ctx = canvas.getContext("2d");
	ctx.moveTo(a, b);
	ctx.lineTo(c, d);
	ctx.stroke();
	// Graph resetten, wenn Programm beendet wird:
	if (deleteGraph == 1) {
		canvas.width = canvas.width;
	}
}

function end() {
	endProgram = 1;
}