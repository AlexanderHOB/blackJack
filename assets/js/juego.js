/*
* 2C = two of club (tr'eboles)
* 2D = two of Diaminds
* 2H = two of Hearts
* 2S = two of Spades
*/
const myModule = (()=>{
    'use strict'
    
    let  deck = [];
    const   types = ['C','D','H','S'],
        specials = ['A','J','Q','K'];
    let pointsPlayers=[];
    //References del HTML
    const $btnCard = document.querySelector('#btn-card'),
        $btnNew = document.querySelector('#btn-new'),
        $btnStop = document.querySelector('#btn-stop');

    const $divCardPlayers = document.querySelectorAll('.divCartas'),
        $pointPlayer = document.querySelectorAll('span');

    //function to initialization a game
    const initializeGame = (numPlayer = 2)=>{
        console.clear();
        deck = builtDeck();
        pointsPlayers=[];
        for(let i = 0;i<numPlayer;i++){
            pointsPlayers.push(0);
        }

        $pointPlayer.forEach(elem => elem.innerText = 0);
        $divCardPlayers.forEach(elem => elem.innerHTML = '');
        $btnCard.disabled = false;
        $btnStop.disabled = false;
    }

    //Built a new deck of cards
    const builtDeck = ()=>{
        deck=[];
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
        return  _.shuffle( deck );
    }
    const askCard = ()=>{
        if(deck.length  === 0 ){
            throw 'No hay cartas en la baraja'
        }
        return deck.pop()
    }
    //function to get value card
    const valueCard = (card) =>{
        const value = card.substring(0,card.length-1)
        return (isNaN(value)) ? (value ==='A') ? 11:10 : value*1  
    }

    //turno:0 = first player and the last is the computer
    const accumulatePoints = (carta, turno)=>{
        pointsPlayers[turno] = pointsPlayers[turno] + valueCard(carta);
        $pointPlayer[turno].innerHTML=pointsPlayers[turno];
        return pointsPlayers[turno];
    }
    const createCard = (carta, turno)=>{

        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${carta}.png`;
        imgCard.classList.add('players-cards-image');
        $divCardPlayers[turno].append(imgCard);

    }
    const determinateWinner=()=>{
        const [pointsMin,pointsComputer] = pointsPlayers;
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
    //turn computer
    const turnoComputadora =(pointsMin)=>{
        let pointsComputer = 0;
        do{
            const carta = askCard();
            pointsComputer = accumulatePoints(carta,pointsPlayers.length-1);
            createCard(carta,pointsPlayers.length-1);
        } while(pointsComputer<=pointsMin && pointsMin<=21);
        
        determinateWinner();
        
    }

    //Eventos
    $btnCard.addEventListener('click',()=>{
        const carta = askCard();
        const pointsPlayer =accumulatePoints(carta,0);
        createCard(carta,0);
        if(pointsPlayer>21){
            $btnCard.disabled=true;
            $btnStop.disabled=true;

            turnoComputadora(pointsPlayer);
        }else if(pointsPlayer ==21){
            $btnCard.disabled=true;
            $btnStop.disabled=true;
            turnoComputadora(pointsPlayer);

        }
    })
    $btnStop.addEventListener('click',()=>{
        $btnCard.disabled=true;
        $btnStop.disabled=true;
        turnoComputadora(pointsPlayers[0]);
    })
    //
    $btnNew.addEventListener('click',()=>{
        initializeGame();
    });

    return {
        init : initializeGame
    };
})();
