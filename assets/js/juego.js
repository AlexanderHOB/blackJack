/*
* 2C = two of club (tr'eboles)
* 2D = two of Diaminds
* 2H = two of Hearts
* 2S = two of Spades
*/
let  deck = [];
const types = ['C','D','H','S'];
const specials = ['A','J','Q','K'];
let pointsPlayer= 0, pointsComputer = 0
//References del HTML
const $btnCard = document.querySelector('#btn-card');
const $btnNew = document.querySelector('#btn-new');
const $btnStop = document.querySelector('#btn-stop');
const $pointPlayer = document.querySelectorAll('span');
const $divCardJugador = document.querySelector('.players-cards');
const $divCardComputer = document.querySelector('.computer-cards');

//Built a new deck of cards
const builtDeck = ()=>{
    for(let i =2 ; i<=10 ;i++){
        for(let type of types){
            deck.push(i + type)
        }
    }
    for(let type of types){
        for(let esp of specials){
            deck.push(esp+type);
        }
    }
    deck = _.shuffle( deck );
}
builtDeck()
const askCard = ()=>{
    if(deck.length  === 0 ){
        throw 'No hay cartas en la baraja'
    }
    return deck.pop()
}

const valueCard = (card) =>{
    const value = card.substring(0,card.length-1)
    return (isNaN(value)) ? (value ==='A') ? 11:10 : value*1  
}
const getCardFront=(pointsPlayer,$pointPlayer,$divCardJugador)=>{
    const carta = askCard();
    pointsPlayer = pointsPlayer + valueCard(carta);
    $pointPlayer[0].innerHTML=pointsPlayer;
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${carta}.png`;
    imgCard.classList.add('players-cards-image');
    $divCardJugador.append(imgCard);

}
//turn computer
const turnoComputadora =(pointsMin)=>{
    do{
        const carta = askCard();
        pointsComputer = pointsComputer + valueCard(carta);
        $pointPlayer[1].innerHTML=pointsComputer;
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${carta}.png`;
        imgCard.classList.add('players-cards-image');
        $divCardComputer.append(imgCard);
    } while(pointsComputer<=pointsMin && pointsMin<=21);
    
    setTimeout(()=>{
        if(pointsComputer === pointsMin){
            alert('Nadie gana');
        }else if (pointsMin > 21 || (pointsComputer<22 && pointsComputer>pointsMin) ){
            alert('Computadora gana');
        }else if (pointsComputer > 21){
            alert('Jugador gana');
        }
    },100);
    
}

//Eventos
$btnCard.addEventListener('click',()=>{
    const carta = askCard();
    pointsPlayer = pointsPlayer + valueCard(carta);
    $pointPlayer[0].innerHTML=pointsPlayer;
    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${carta}.png`;
    imgCard.classList.add('players-cards-image');
    $divCardJugador.append(imgCard);
    if(pointsPlayer>21){
        $btnCard.disabled=true;
        $btnStop.disabled=true;

        turnoComputadora(pointsPlayer);
    }else if(pointsPlayer ==21){
        console.warn("gano");
        $btnCard.disabled=true;
        $btnStop.disabled=true;

    }
    console.log(pointsPlayer);
})
$btnStop.addEventListener('click',()=>{
    $btnCard.disabled=true;
    $btnStop.disabled=true;
    turnoComputadora(pointsPlayer)
})
//
$btnNew.addEventListener('click',()=>{
    console.clear();
    deck = [];
    builtDeck();
    pointsPlayer = 0;
    pointsComputer = 0;
    $pointPlayer[0].innerHTML=0;
    $pointPlayer[1].innerHTML=0;
    $divCardComputer.innerHTML = '';
    $divCardJugador.innerHTML = '';
    $btnCard.disabled = false;
    $btnStop.disabled = false;
    

});