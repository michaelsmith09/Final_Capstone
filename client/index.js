const cardSection = document.querySelector(".card-section");
const startBtn = document.querySelector("#start").addEventListener("click", startGame);
let cards = [];
let flipCards = [];
let firstCard = null;
let secondCard = null;
let score = 0;
let turn = 0;

document.querySelector(".score").textContent = score;
document.querySelector(".turns").textContent = turn;


async function startGame() {
    const res = await axios.get('http://localhost:4800/api/getCards');
    const data = await res.data;
    cards = data;
    turn = 0;
    score = 0;
    shuffleCards();
    resetTurns()
};

function shuffleCards() {
    const shuffledCards = [...cards, ...cards]
    .sort(() => Math.random() - 0.5)
    .map((card) => {
        return {
            ...card,
            id: Math.random(),
        };
    });
    document.querySelector(".score").textContent = score;
    cardSection.innerHTML = "";
    generateCards(shuffledCards);
};

function generateCards(arr) {
    for(let card of arr) {
        const cardElement =  document.createElement("div");
        cardElement.classList.add("card");
        cardElement.innerHTML = `
            <div data-name=${card.name} class="card-inner" onClick="flipCard(event)">
                <img class="front front-image" src=${card.image} />
                <img class="back" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxJJZIehOFPOtLnI2HAUTSiOurMXBtvUekxR-d4Op4-DQvLaZBxzZi4zGMPVCqt1qv3SA&usqp=CAU" />
            </div>
        `;
        cardSection.appendChild(cardElement);
    }
};

function addTurn() {
    axios
        .post('http://localhost:4800/api/addTurn', { turn })
        .then((res) => {
            turn = res.data.turn;

            document.querySelector('.turns').textContent = turn;
        })
        .catch((err) => console.log(err));
};

function resetTurns() {
    turn = 0;
    document.querySelector('.turns').textContent = turn;
}

function flipCard(e) {
    const cardElement = e.currentTarget;
    // addTurn();
    // turn++;
    // document.querySelector(".turns").textContent = turn;

    if (cardElement === firstCard || cardElement.classList.contains('flipped')) {
        return;
    }
    
    cardElement.classList.toggle("flipped");

    flipCards.push(cardElement)
    console.log(flipCards)
    if(flipCards.length === 2) {
        if(flipCards[0].dataset.name === flipCards[1].dataset.name){
            flipCards[0].removeEventListener("click", flipCard)
            flipCards[1].removeEventListener("click", flipCard)
            flipCards = [];
            addTurn();
            turn++;
            score++;
            document.querySelector(".score").textContent = score;
            document.querySelector(".turns").textContent = turn;
            
            if (cards.length === score) {
                setTimeout(() => {
                    alert('You Found them All!');
                    shuffleCards(cards);
                }, 1000);
            }
        } else {
            setTimeout(() => {
                flipCards[0].classList.remove('flipped')
                flipCards[1].classList.remove('flipped')
                flipCards = [];
                addTurn();
                turn++;
                document.querySelector(".turns").textContent = turn;
            }, 700);
        }
    } 
};

function restart() {
    resetBoard();
    shuffleCards();
    turn = 0;
    score = 0;
    document.querySelector(".score").textContent = score;
    cardSection.innerHTML = "";
    generateCards();
}