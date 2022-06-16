let deckID = '';
let cardCount = 52;
let score1 = 0
let score2 = 0
alert('YOU ARE PLAYER 1, DEAL WITH IT!')
document.querySelector('#cardCount').innerText = cardCount;



fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        deckID = data.deck_id;
    })
    
    document.querySelector('button').addEventListener('click', drawCard)

    function drawCard() {
        document.querySelector('#war').style.display = 'none';
        const url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`

        fetch(url)
        .then(response => response.json())
        .then(data => {
        console.log(data)
        cardCount = data.remaining
        document.querySelector('#player1').src = data.cards[0].image
        document.querySelector('#player2').src = data.cards[1].image

        document.querySelector('#cardCount').innerText = cardCount;

        let p1Val = convertFaceCards(data.cards[0].value) 
        let p2Val = convertFaceCards(data.cards[1].value)
        if (p1Val > p2Val) {
            document.querySelector('#result').innerText = `Player 1 Wins! ${data.cards[0].value} beats ${data.cards[1].value}`
            score1 += 1
            document.querySelector('#score1').innerText = score1
        }
        else if (p1Val < p2Val) {
            document.querySelector('#result').innerText = `Player 2 Wins! ${data.cards[1].value} beats ${data.cards[0].value}`
            score2 += 1
            document.querySelector('#score2').innerText = score2
        }
        else document.querySelector('#result').innerText = 'War!!!'

        if (p1Val === p2Val) {
            document.querySelector('#war').style.display = 'block';
            document.querySelector('#deal').style.display = 'none';
        }

        let clearIMG = document.querySelectorAll('.clear');
        for (let i = 0; i<clearIMG.length; i++) {
            clearIMG[i].src = ''
        }
        if (Number(data.remaining) === 0) {
            document.querySelector('#result').style.fontSize = '10rem'
            document.querySelector('#doggies').style.display = 'block';
            if (score1 > score2) {
                document.querySelector('#result').innerText = 'Player 1 WON THE ENTIRE WAR!!!!!! Please enjoy a complimentary dog picture.'
            }
            else if (Number(score1 < score2)) {
                document.querySelector('#result').innerText = 'Player 2 WON THE ENTIRE WAR!!!!!! Please enjoy a complimentary dog picture.'
            }
        }
        
    });}

    function convertFaceCards(val) {
        if (val === 'KING') {
            return 13;
        }
        else if (val === 'ACE') {
            return 14;
        }
        else if (val === 'QUEEN') {
            return 12;
        }
        else if (val === 'JACK') {
            return 11;
        }
        else return Number(val)
    }

    document.querySelector('#war').addEventListener('click', startWar)

    function startWar() {
        fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=6`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.querySelector('#player101').src = data.cards[0].image
                document.querySelector('#player102').src = data.cards[1].image
                document.querySelector('#player103').src = data.cards[2].image
                document.querySelector('#player201').src = data.cards[3].image
                document.querySelector('#player202').src = data.cards[4].image
                document.querySelector('#player203').src = data.cards[5].image

                let p1Val = convertFaceCards(data.cards[2].value)
            let p2Val = convertFaceCards(data.cards[5].value)

            if (p1Val > p2Val) {
                document.querySelector('#result').innerText = `Player 1 Wins! ${data.cards[2].value} beats ${data.cards[5].value}`
                
                document.querySelector('#deal').style.display = 'block';
                document.querySelector('#war').style.display = 'none';
                score1 += 4
                document.querySelector('#score1').innerText = score1
            }
            else if (p1Val < p2Val) {
                document.querySelector('#result').innerText = `Player 2 Wins! ${data.cards[5].value} beats ${data.cards[2].value}`
                document.querySelector('#deal').style.display = 'block';
                document.querySelector('#war').style.display = 'none';
                score2 += 4
                document.querySelector('#score2').innerText = score2
            }
            else {
                document.querySelector('#result').innerText = 'WAR AGAIN!!!!!!!!!!!!!!'
                document.querySelector('#result').style.fontSize = '5em'
            } 
            
            if (Number(data.remaining) === 0) {
                document.querySelector('#result').style.fontSize = '10rem'
                document.querySelector('#doggies').style.display = 'block';
                if (score1 > score2) {
                    document.querySelector('#result').innerText = 'Player 1 WON THE ENTIRE WAR!!!!!!'
                }
                else if (Number(score1 < score2)) {
                    document.querySelector('#result').innerText = 'Player 2 WON THE ENTIRE WAR!!!!!!'
                }
            }
            })
         }

         fetch(`https://dog.ceo/api/breeds/image/random`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                document.querySelector('#doggies').src = data.message;
            })

    
        
    
