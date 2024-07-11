const resultElement = document.querySelector('.header');
const pokemonImage = document.getElementById("pokemon-img")
// const button = document.querySelector('.btn')
const optioncontainer = document.querySelector(".option")
const pointElement = document.getElementById('pointvalue')
const totalCount = document.getElementById("totalcount")
const container = document.getElementsByClassName("main")
const loding = document.querySelector(".lodingcontainer")
// initialize variables
let usepokemonId = [];
let count = 0
let point = 0
let showloding = false

async function fetchPokemon(id){
  showloding = true;
  const response =await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = response.json()
  return data
}

// async function datatest(){
//   const pokemon =  await fetchPokemon(randomPokemonId());
//   console.log(pokemon);
// }
// datatest()
// function for random pokemon id


async function loadquesction() {

  if(showloding){
    showlodingwindow()
    hidepuzelwindow()
  }
  // fetch correct answer
  let pokemonid = randomPokemonId();
  while(usepokemonId.includes(pokemonid)){
  pokemonid = randomPokemonId()
 }
 usepokemonId.push(pokemonid);
  const pokemon = await fetchPokemon(pokemonid)
  const option = [pokemon.name];
  const optionId = [pokemon.id];

  while(option.length < 4){
    let randompokemon = randomPokemonId();
    
    while(optionId.includes(randompokemon)){
      randompokemon = randomPokemonId();
    }
    optionId.push(randompokemon);
    // fetching a random pokemon with the newly made id, and adding it to the options arry
    const randompokemondata = await fetchPokemon(randompokemon);
    const randomoption = randompokemondata.name;
    option.push(randomoption);
console.log(option);
console.log(optionId);



if(option.length === 4){
  showloding =false;
}
  }
  suffelArry(option);

  // clear any previous result and update pokemon image to fetche img url form the sprites
  resultElement.textContent = "Who's that Pokemon";
  pokemonImage.src = pokemon.sprites.other.dream_world.front_default

  // create option html element

  optioncontainer.innerHTML = "";
  option.forEach((option,index) =>{
    const button = document.createElement('button')
    button.textContent = option
    button.onclick = (event) => checkans(option === pokemon.name,event);
    optioncontainer.appendChild(button)
  })
  if(!showloding){
    hidelodingwindow()
    showpuzzelwindow()
  }
}

function checkans(iscorrect, event){
  const selectedbutton = document.querySelector('.selected')

  if(selectedbutton ){
    return ;
  }
  event.target.classList.add("selected")
  count++;
  totalCount.textContent = count;
  if(iscorrect){
    displayResult("correct Answer!");
    // if correct increase the point
    point++
    pointElement.textContent = point
    event.target.classList.add("correct")
  }else{
   displayResult("wrong answer!")
    event.target.classList.add("wrong")
  }

  setTimeout(()=>{
    showloding = true;
    loadquesction()

  },1000)
}

loadquesction()

function randomPokemonId(){
  return Math.floor(Math.random() * 151)+ 1;
  
 }

 function suffelArry(arry){
  return arry.sort(()=> Math.random()-0.5);
 }
 
//  update result text and class name

function displayResult(result){
  resultElement.textContent = result;
}

function showlodingwindow(){
  container[0].classList.remove('show')
  loding.classList.remove('hide')
  loding.classList.add('show')
}
function hidelodingwindow(){
  loding.classList.add('hide')
}

function showpuzzelwindow(){
  loding.classList.remove('show')
  container[0].classList.remove('hide')
  container[0].classList.add('show')
}

function hidepuzelwindow(){
  container[0].classList.add('hide')
}