const container = document.getElementById("container");
const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        let mp3= new Audio('sounds/correct.mp3');
        mp3.play();

        if(matched == 10) { //solution!
            
            setTimeout(() => {
                container.style.backgroundColor = "#0ad600";
            },500);

            setTimeout(() => {
            let audio = new Audio("sounds/magkas.mp3");
            audio.play();
            document.body.style.backgroundImage = "url('images/solution.jpg')";
            
            container.style.visibility = "hidden";
            },1375);
            setTimeout(() => {  //delay for restart
                document.body.style.backgroundImage = "url('images/bgrnd.jpg')";
                container.style.visibility = "visible";
                return shuffleCard();
            }, 19000);
            //$("body").addClass("try"); /*εμφάνιση μαγκα*/
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
        let mp3= new Audio('sounds/buzzer.mp3');
        mp3.play();
        container.style.backgroundColor = "#e3242b"; //color red box
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
        container.style.backgroundColor = "whitesmoke"; //color red box!
    }, 1200);
}

function shuffleCard() {
    container.style.backgroundColor = "whitesmoke"; //color!
    matched = 0;  // zero found
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});