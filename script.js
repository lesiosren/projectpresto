
const navbar = document.querySelector('.navbar')
const navLinks = document.querySelectorAll('.nav-link')
const buttonAggiungi = document.querySelector('.button-aggiungi')
const countingVisitatori = document.querySelector('#countingVisitatori')
const countingPokemon = document.querySelector('#countingPokemon')
const countingPalestre = document.querySelector('#countingPalestre')
const ultimiAnnunci = document.querySelector('#ultimiAnnunci')


let prodotti = [
    {"id": "#001",
        "name": "Bulbasaur",
        "type": ["Erba", "Veleno"],
        "price": "120.12",
        "url": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/132.png"
      },
      {
        "id": "#002",
        "name": "Ivysaur",
        "type": ["Erba", "Veleno"],
        "price": "150.50",
        "url": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/132.png"
      },
      {
        "id": "#003",
        "name": "Venusaur",
        "type": ["Erba", "Veleno"],
        "price": "200.25",
        "url": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/132.png"
      },
      {
        "id": "#004",
        "name": "Charmander",
        "type": ["Fuoco"],
        "price": "80.75",
        "url": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/132.png"
      },
      {
        "id": "#005",
        "name": "Charmeleon",
        "type": ["Fuoco"],
        "price": "120.00",
        "url": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/132.png"
      },
      {
        "id": "#006",
        "name": "Charizard",
        "type": ["Fuoco", "Volante"],
        "price": "250.50",
        "url": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/132.png"
},
]

//SCROLL NAVBAR
window.addEventListener('scroll',() => {
    if (window.scrollY > 120) {
        navbar.classList.add('navbar-transition')
        navbar.style.backgroundColor = 'var(--red)';
        navLinks.forEach((link) => {
            link.style.color = 'var(--lightcyan)'
        })
        buttonAggiungi.style.backgroundColor = 'var(--lightcyan)'
        buttonAggiungi.style.color = 'var(--red)'
    } else {
        navbar.style.backgroundColor = 'transparent';
        navLinks.forEach((link) => {
            link.style.color = 'var(--red)'
        })
        buttonAggiungi.style.backgroundColor = 'var(--red)'
        buttonAggiungi.style.color = 'var(--lightcyan)'
    }
});


//CREAZIONE CARD ULTIMI ANNUNCI
prodotti.forEach((singoloProdotto, index) => {
    if ( index >= prodotti.length - 3){

        let newDiv = document.createElement('div');
        newDiv.classList.add('col-12', 'col-md-4');
        newDiv.innerHTML = `
        <div class="carta-pokemon border card position-relative" data-aos="flip-up" data-aos-duration="1000">
        <div class="icon-container">
        <i class="fa-regular fa-heart position-absolute margin-heart fs-3"></i>
        </div>
        <img src='${singoloProdotto.url}' alt="" class="img-fluid mb-3 card-img">
        <div class="px-3 pt-3">
        <p><b>${singoloProdotto.id}</b></p>
        <p><h4>${singoloProdotto.name}</h4></p>
        <p><h5>${singoloProdotto.type}</h5></p>
        </div>
        <p class="ms-auto mt-auto px-3 fs-4"><i>¥${singoloProdotto.price}</i></p>
        </div>
        `
        ultimiAnnunci.appendChild(newDiv);
    }
});

//CLICK CUORICINI CARTE E IMMAGINI
const iconHearts = document.querySelectorAll('.fa-heart');
const cardImgs = document.querySelectorAll('.card-img');

iconHearts.forEach((icon) => {
    icon.addEventListener('click' , () => {
        icon.classList.toggle('fa-solid');
        icon.classList.toggle('text-danger');
    })
});

cardImgs.forEach((cardImg, i) => {
    cardImg.addEventListener('dblclick', () => {
        iconHearts[i].classList.add('fa-solid');
        iconHearts[i].classList.add('text-danger');
    })
    console.log(cardImg);
});

//COUNTER
function counting(maxN, element, f ) {
    let counter = 0
    let Interval = setInterval(() => {
        if(counter<maxN){
            counter++
            element.innerHTML = counter
        } else {
            clearInterval(Interval)
        }
    }, f)
}

counting(1800,countingVisitatori,13)
counting(3492,countingPokemon,0)
counting(25,countingPalestre,300)


//REVIEWS
const reviewsWrapper = document.querySelector('#reviewsWrapper');

let reviews = [
    {'name' : 'Rosso', 'review': 'Fantastico sito! Ottimo per i Pokéfanatici! ', 'rank': 5, 'url': 'media/Rosso.png'},
    {'name' : 'Blu', 'review': 'Scambiate con stile! Centro Pokemon top-notch. Servizio rapido e assistenza impeccabile', 'rank': 4.5, 'url': 'media/Blu.png'},
    {'name' : 'Viola', 'review': 'Centro scambi Pokemon all avanguardia. Efficiente e pieno di entusiasmo Pokémon. Finalmente ho potuto ottenere il Muk che ho sempre desiderato', 'rank': 5, 'url': 'media/Viola.png'},
    {'name' : 'Nero', 'review': 'Un rifugio per gli Allenatori! Scambi fluidi e tanta passione Pokémon in questo centro. Nel giro di pochi giorni arriva tutto a casa', 'rank': 4, 'url': 'media/Nero.png'},
]

reviews.forEach((review) => {
    let div = document.createElement('div');
    div.classList.add('swiper-slide')
    div.innerHTML = `
                <div class="review-card">
                 <h4 class="text-center fw-bolder">${review.name}</h4>
                 <div class="d-flex justify-content-center">
                     <img class="my-2" src="${review.url}" alt="">
                    </div>
                    <p class="my-2"><i>"${review.review}"</i></p>
                <div class="star-container d-flex justify-content-center mt-4">
                    ${generateStars(review.rank)}
                </div>
             </div>
    `

    reviewsWrapper.appendChild(div)
})

let starContainer = document.querySelectorAll('.star-container')

function generateStars(rank){
    let result = ''

    for (let i = 1; i <= 5; i++) {
        if(rank == 0.5){
            result += '<i class="fa-regular fa-star-half-stroke"></i>'
            rank = 0
        } else if(rank > 0){
            result += '<i class="fa-solid fa-star"></i>'
            rank--
        } else {
            result += '<i class="fa-regular fa-star"></i>'
        }
    }
    return result
}




//SWIPER
let swiper = new Swiper(".mySwiper", {
      effect: "cards",
      grabCursor: true,
    });


AOS.init();