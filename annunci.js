const navbar = document.querySelector('.navbar')
const navLinks = document.querySelectorAll('.nav-link')
const navBrand = document.querySelector('.navbar-brand');
const btnPrimary = document.querySelector('#btnPrimary');

//SCROLL NAVBAR
window.addEventListener('scroll',() => {
  if (window.scrollY > 0) {
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


// PROMISE
fetch('./listapokemon.json')
.then((response) => response.json())
.then((listaPokemon) => {
  console.log(listaPokemon);

  let categoriesWrapper = document.querySelector('#categoriesWrapper');
  let cardsWrapper = document.querySelector('#cardsWrapper');

  function showCards(array) {
    cardsWrapper.innerHTML = ''

    array.forEach((element) => {
      let div = document.createElement('div');
      div.classList.add('col-12', 'col-md-3');
      div.innerHTML = `
      <div class="product-card-custom carta-pokemon border card position-relative my-3">
      <div class="icon-container">
      <i class="fa-regular fa-heart position-absolute margin-heart fs-3"></i>
      </div>
      <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/132.png" alt="" class="img-fluid mb-3 card-img">
      <div class="d-flex justify-content-between align-items-start">
      <div>
      <p class="fw-bold mb-0 ms-2" title="${element.name}">${troncate(element.name)}</p>
      <p class="fst-italic ms-2">${element.type}</p>
      </div>
      <p class="price-tag me-2">¥ ${element.price}</p>
      </div>
      </div>

      `
      cardsWrapper.appendChild(div)
    })

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

  }


  showCards(listaPokemon)

  //Funzione per creare un input radio per ogni categoira
  function setCategoryRadios() {
    let categories = listaPokemon.map((el) => el.type)


    //Array categorie non ripetute
    let uniqueCategories = [];

    categories.forEach((type) => {
      if (!uniqueCategories.includes(type)) {
        uniqueCategories.push(type)
      }
    })

    let categoryArray = []
    listaPokemon.forEach((pokemon) => {

      pokemon.type.forEach(pokemonElement => {
        if (!categoryArray.find((elementCheck) => elementCheck == pokemonElement)) {
          categoryArray.push(pokemonElement)
        }
      })
    })

    categoryArray.forEach((type) => {
      let div = document.createElement('div');
      div.classList.add('form-check');
      div.innerHTML = `
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="${type}">
      <label class="form-check-label" for="${type}">
      ${type}
      </label>

      `
      categoriesWrapper.appendChild(div)

    })
  }

  setCategoryRadios()

  let radioInputs = document.querySelectorAll('.form-check-input');
  let radioBtns = Array.from(radioInputs)

  //Filtro per categoria
  function filterByCategory() {
    let checked = radioBtns.find((radio) => radio.checked)

    let filterType = checked.id
    let filteredPokemonArray = []

    if (filterType != 'All') {
      let filtered = listaPokemon.forEach((pokemon) => {
        pokemon.type.forEach(type => {
          if(type == filterType){
            filteredPokemonArray.push(pokemon)
          }
        })});
        showCards(filteredPokemonArray)
      } else {
        showCards(listaPokemon)
      }
    }

    let inputRange = document.querySelector('.form-range');
    console.dir(inputRange);
    let priceLabel = document.querySelector('#priceLabel');

    // FILTRO PER PREZZO

    //Funzione per trovare prezzo più alto
    function findMaxPrice() {
      let maxPrice = listaPokemon.map((el) => Number(el.price)).sort((a, b) => b - a)[0]

      inputRange.max = maxPrice;
      inputRange.value = maxPrice;
    }

    findMaxPrice()

    function filterByPrice() {
      let filtered = listaPokemon.filter((el) => +el.price <= +inputRange.value)
      showCards(filtered)
    }

    // FILTRO PER PAROLA
    let wordInput = document.querySelector('#wordInput');

    function filterByWord() {
      let value = wordInput.value;
      let filtered = listaPokemon.filter((el) => el.name.toLowerCase().includes(value.toLowerCase()))
      showCards(filtered)
    }

    //Eventi
    radioInputs.forEach((input) => {
      input.addEventListener('click', () => {
        filterByCategory()
      })
    })

    inputRange.addEventListener('input', () => {
      priceLabel.innerHTML = inputRange.value
      filterByPrice()
    })

    wordInput.addEventListener('input', () => {
      filterByWord()
    })


    //Funzione per tagliare titoli degli annunci troppo lunghi
    function troncate(string) {
      if (string.length > 15) {
        return string.split(' ')[0] + '...';
      } else {
        return string
      }
    }


  })