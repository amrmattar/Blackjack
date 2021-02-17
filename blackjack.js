let blackjack = { 
    'you':{'scorespan':'#your-result','div':'#your-box','score':0},
    'dealer':{'scorespan':'#dealer-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsmap':{'2': 2,'3': 3,'4': 4,'5': 5,'6': 6,'7': 7,'8': 8,'9': 9,'10': 10,'K': 10,'J': 10,'Q': 10,'A': 1},
    'wins':0,
    'losses':0,
    'draws':0,
    'isstand':false,
    'turnsover':false,
};

const you = blackjack['you']
const dealer = blackjack['dealer']
const hitsound = new Audio ('sounds/swish.m4a');
const winsound = new Audio ('sounds/cash.mp3');
const losssound = new Audio ('sounds/aww.mp3');
document.querySelector('#hit').addEventListener('click', blackjackHit);
document.querySelector('#stand').addEventListener('click', dealerlogic);
document.querySelector('#deal').addEventListener('click', blackjackdeal);

function blackjackHit() {
    if(blackjack['isstand'] === false){
    let card = randomcard();
    showcard(card,you);
    updatescore(card,you);
    showscore(you);
}
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function dealerlogic(){
    blackjack['isstand'] = true;
    while(dealer['score'] < 16 && blackjack['isstand'] === true){
    let card = randomcard();
    showcard(card,dealer);
    updatescore(card,dealer);
    showscore(dealer);
    await sleep(500);
    }
        blackjack['turnsover'] = true;
        let winner = computewinner();
        showresult(winner);
    }
function randomcard(){
    let randomindex = Math.floor(Math.random() * 13);
    return blackjack['cards'][randomindex];
}
function showcard(card,activeplayer) {
    if(activeplayer['score']<= 21){
    let cardImage = document.createElement('img');
    cardImage.src =  `images/${card}.png` ;
    document.querySelector(activeplayer['div']).appendChild(cardImage);
    hitsound.play();
    }
}
function blackjackdeal() {
    //if you want to play multi
    //showresult(computewinner());
    if(blackjack['turnsover'] === true){
        blackjack['isstand'] = false;
    let yourimage = document.querySelector('#your-box').querySelectorAll('img');
    let dealerimage = document.querySelector('#dealer-box').querySelectorAll('img');
    for(let i=0; i< yourimage.length; i++){
    yourimage[i].remove();
    }
    for(let i=0; i< dealerimage.length; i++){
    dealerimage[i].remove();
    }
    you['score']=0;
    dealer['score']=0;
    
    document.querySelector('#your-result').textContent=0;
    document.querySelector('#dealer-result').textContent=0;
    document.querySelector('#result').textContent='play again';
    
    document.querySelector('#your-result').style.color='white';
    document.querySelector('#dealer-result').style.color='white';
    document.querySelector('#result').style.color='white';
    blackjack['turnsover'] === true;
}
}
function updatescore(card, activeplayer){
    activeplayer['score'] += blackjack['cardsmap'][card];
}
function showscore(activeplayer){
        if(activeplayer['score'] > 21){
                document.querySelector(activeplayer['scorespan']).textContent = 'BUST';
                document.querySelector(activeplayer['scorespan']).style.color = 'red';
        }else{
                document.querySelector(activeplayer['scorespan']).textContent = activeplayer['score'];
        }
}
function computewinner(){
    let winner;
    if(you['score'] <= 21){
        if(you['score'] > dealer['score'] || (dealer['score'] > 21)){
            blackjack['wins']++;
            winner = you;
        }else if(you['score'] < dealer['score']){
            blackjack['losses']++;
            winner = dealer;
        }else if(you['score'] === dealer['score']){
            blackjack['draws']++;
        }
    }else if(you['score'] > 21 && dealer['score'] <= 21){
        blackjack['losses']++;
        winner = dealer;
    }else if(you['score'] > 21 && dealer['score'] > 21){
        blackjack['draws']++;
    }
    return winner;
}

function showresult(winner){
    let message, messagecolor;
    if(blackjack['turnsover'] === true){
    if(winner === you){
        document.querySelector('#wins').textContent = blackjack['wins'];
        message = 'you won';
        messagecolor = 'green';
        winsound.play();
    }else if(winner === dealer){
        document.querySelector('#losses').textContent = blackjack['losses'];
        message = 'dealer won';
        messagecolor = 'red';
        losssound.play();
} else {
    document.querySelector('#draws').textContent = blackjack['draws'];
    message = 'drew';
    messagecolor = 'white';
}
    document.querySelector('#result').textContent = message;
    document.querySelector('#result').style.color = messagecolor;
}
}