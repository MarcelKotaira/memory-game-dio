const emojis = [
	"😺",
	"😺",
	"🦝",
	"🦝",
	"🦊",
	"🦊",
	"🐶",
	"🐶",
	"🐵",
	"🐵",
	"🦁",
	"🦁",
	"🐯",
	"🐯",
	"🐮",
	"🐮",
];
let openCards = [];
let gameOverFlag = false;
let attempts = 0;
const multiplier = 100;
let score = 0;

let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < emojis.length; i++) {
	let box = document.createElement("div");
	box.className = "item";
	box.innerHTML = shuffleEmojis[i];
	box.onclick = handleClick;
	document.querySelector(".game").appendChild(box);
}

function handleClick() {
	if (gameOverFlag) return;

	if (openCards.length < 2 && !this.classList.contains("boxOpen")) {
		this.classList.add("boxOpen");
		openCards.push(this);
	}

	if (openCards.length == 2) {
		setTimeout(checkMatch, 500);
	}
}

function checkMatch() {
	if (openCards[0].innerHTML === openCards[1].innerHTML) {
		openCards[0].classList.add("boxMatch");
		openCards[1].classList.add("boxMatch");
		score += multiplier - attempts;
		document.querySelector("#score").textContent = "SCORE: " + score;
	} else {
		openCards[0].classList.remove("boxOpen");
		openCards[1].classList.remove("boxOpen");
		if (attempts < multiplier - 5) {
			attempts += 5;
		}
	}

	openCards = [];

	if (document.querySelectorAll(".boxMatch").length === emojis.length) {
		setTimeout(setGameOver, 100);
	}
}

function setGameOver() {
	alert("Você Venceu!!!\nSeu Score é de " + score);
	gameOverFlag = true;
}
