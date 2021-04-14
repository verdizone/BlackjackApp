

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

//función que crea un nuevo deck
const crearDeck = () => {

    for (let i = 2 ; i <= 10 ; i++){
        for (let tipo of tipos){
            deck.push (i + tipo);
            
        }
    }

    for (let tipo of tipos){
        for (let esp of especiales){
            deck.push(esp + tipo);
        }
    }
        
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}


//Mandar llamar al deck
crearDeck();


//Esta función me permite pedir una carta

const pedirCarta = () => {

    if(deck.length <= 0){
        throw ' No hay más cartas el el deck.';
    }
    
    const carta = deck.shift();

    console.log(deck);
    console.log(carta);
    return carta;
}

//pedirCarta();

// for (let i = 0 ; i <= 100 ; i ++){
//     pedirCarta();
// }


const valorCarta = ( carta ) =>{

    const valor = carta.substring( 0, carta.length - 1 );
    return(isNaN (valor))?
        (valor ==='A')? 11 : 10
        :(valor * 1 );
   
}
const valor = valorCarta( pedirCarta() );
console.log({valor});