/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    // const gamesContainer = document.getElementById('games-container');
    
    for (let i = 0; i < games.length; i++) {
        const game = games[i];
        
        // create a new div element, which will become the game card
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        
        // Set the inner HTML of the game card
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img" />
            <h2>${game.name}</h2>
            <p>${game.description}</p>`
        ;
        // add the class game-card to the list


        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
        
}

// Add the real-time search bar functionality here
const searchBar = document.getElementById("search-bar"); // Assuming the search bar is in the HTML
searchBar.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase(); // Get the search query
    const filteredGames = GAMES_JSON.filter((game) =>
        game.name.toLowerCase().includes(query) // Match game names with the query
    );
    deleteChildElements(gamesContainer); // Clear current games displayed
    addGamesToPage(filteredGames); // Display the filtered games
});

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.length;

// set inner HTML using template literal
gamesCard.innerHTML = `${totalGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal

    // Get games that are unfunded
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Log the number of unfunded games
    console.log("Unfunded Games Count:", unfundedGames.length);

    // use the function we previously created to add the unfunded games to the DOM
    // Add unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Log the number of funded games
    console.log("Funded Games Count:", fundedGames.length);

    // use the function we previously created to add unfunded games to the DOM
    // Add funded games to the DOM
    addGamesToPage(fundedGames);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Calculate the total amount raised
const moneyRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0).toLocaleString();

// Get the total number of games
const gamesCount = GAMES_JSON.length;

// Create the message using a template string and ternary operator
const message = `A total of $${moneyRaised} has been raised for ${gamesCount} ${
  gamesCount === 1 ? "game" : "games"
}, and currently, ${unfundedGamesCount} ${
  unfundedGamesCount === 1 ? "game remains" : "games remain"
} unfunded. We need your help to fund these amazing games!`;


// Create a new paragraph element
const paragraph = document.createElement("p");

// Set the text content of the paragraph
paragraph.textContent = message;

// Append the paragraph to the description container
descriptionContainer.appendChild(paragraph);

// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("p");
firstGameElement.textContent = firstGame.name;
firstGameContainer.appendChild(firstGameElement);

// do the same for the runner up item
const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondGame.name;
secondGameContainer.appendChild(secondGameElement);
// /*****************************************************************************
//  * Challenge 2: Review the provided code. The provided code includes:
//  * -> Statements that import data from games.js
//  * -> A function that deletes all child elements from a parent element in the DOM
// */

// // import the JSON data about the crowd funded games from the games.js file
// import GAMES_DATA from './games.js';

// // create a list of objects to store the data about the games using JSON.parse
// const GAMES_JSON = JSON.parse(GAMES_DATA)

// // remove all child elements from a parent element in the DOM
// function deleteChildElements(parent) {
//     while (parent.firstChild) {
//         parent.removeChild(parent.firstChild);
//     }
// }

// /*****************************************************************************
//  * Challenge 3: Add data about each game as a card to the games-container
//  * Skills used: DOM manipulation, for loops, template literals, functions
// */

// // grab the element with the id games-container
// const gamesContainer = document.getElementById("games-container");

// // create a function that adds all data from the games array to the page
// function addGamesToPage(games) {

//     // loop over each item in the data
//     // const gamesContainer = document.getElementById('games-container');
    
//     for (let i = 0; i < games.length; i++) {
//         const game = games[i];
        
//         // create a new div element, which will become the game card
//         const gameCard = document.createElement('div');
//         gameCard.classList.add('game-card');
        
//         // Set the inner HTML of the game card
//         // set the inner HTML using a template literal to display some info 
//         // about each game
//         // TIP: if your images are not displaying, make sure there is space
//         // between the end of the src attribute and the end of the tag ("/>")
//         gameCard.innerHTML = `
//             <img src="${game.img}" alt="${game.name}" class="game-img" />
//             <h2>${game.name}</h2>
//             <p>${game.description}</p>
//         `;
//         // add the class game-card to the list


//         // append the game to the games-container
//         gamesContainer.appendChild(gameCard);
//     }
        
// }

// // Add the real-time search bar functionality here
// const searchBar = document.getElementById("search-bar"); // Assuming the search bar is in the HTML
// searchBar.addEventListener("input", (event) => {
//     const query = event.target.value.toLowerCase(); // Get the search query
//     const filteredGames = GAMES_JSON.filter((game) =>
//         game.name.toLowerCase().includes(query) // Match game names with the query
//     );
//     deleteChildElements(gamesContainer); // Clear current games displayed
//     addGamesToPage(filteredGames); // Display the filtered games
// });

// // call the function we just defined using the correct variable
// // later, we'll call this function using a different list of games
// addGamesToPage(GAMES_JSON);


// /*************************************************************************************
//  * Challenge 4: Create the summary statistics at the top of the page displaying the
//  * total number of contributions, amount donated, and number of games on the site.
//  * Skills used: arrow functions, reduce, template literals
// */

// // grab the contributions card element
// const contributionsCard = document.getElementById("num-contributions");

// // use reduce() to count the number of total contributions by summing the backers
// const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);


// // set the inner HTML using a template literal and toLocaleString to get a number with commas
// contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;

// // grab the amount raised card, then use reduce() to find the total amount raised
// const raisedCard = document.getElementById("total-raised");
// const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
// // set inner HTML using template literal
// raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// // grab number of games card and set its inner HTML
// const gamesCard = document.getElementById("num-games");
// const totalGames = GAMES_JSON.length;

// // set inner HTML using template literal
// gamesCard.innerHTML = `${totalGames}`;


// /*************************************************************************************
//  * Challenge 5: Add functions to filter the funded and unfunded games
//  * total number of contributions, amount donated, and number of games on the site.
//  * Skills used: functions, filter
// */

// // show only games that do not yet have enough funding
// function filterUnfundedOnly() {
//     deleteChildElements(gamesContainer);

//     // use filter() to get a list of games that have not yet met their goal

//     // Get games that are unfunded
//     const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

//     // Log the number of unfunded games
//     console.log("Unfunded Games Count:", unfundedGames.length);

//     // use the function we previously created to add the unfunded games to the DOM
//     // Add unfunded games to the DOM
//     addGamesToPage(unfundedGames);
// }

// // show only games that are fully funded
// function filterFundedOnly() {
//     deleteChildElements(gamesContainer);

//     // use filter() to get a list of games that have met or exceeded their goal
//     const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

//     // Log the number of funded games
//     console.log("Funded Games Count:", fundedGames.length);

//     // use the function we previously created to add unfunded games to the DOM
//     // Add funded games to the DOM
//     addGamesToPage(fundedGames);

// }

// // show all games
// function showAllGames() {
//     deleteChildElements(gamesContainer);

//     // add all games from the JSON data to the DOM
//     addGamesToPage(GAMES_JSON);

// }
// const buttonContainer = document.getElementById("button-container");

// // select each button in the "Our Games" section
// const filtersButton = document.getElementById("filters-btn");
// // buttonContainer.appendChild(filtersButton);
// const unfundedBtn = document.getElementById("unfunded-btn");
// const fundedBtn = document.getElementById("funded-btn");
// const allBtn = document.getElementById("all-btn");

// unfundedBtn.style.display = "none";
// fundedBtn.style.display = "none";
// allBtn.style.display = "none";

// document.addEventListener('DOMContentLoaded', () => {
//     const filtersIcon = document.getElementById('filters-icon');
//     const filtersDropdown = document.getElementById('filters-dropdown');

//     if (filtersIcon) {
//         filtersIcon.addEventListener('click', () => {
//             console.log('Filters icon clicked'); // Debugging check
//             // Toggle the visibility of the filters dropdown
//             if (filtersDropdown.style.display === 'none' || filtersDropdown.style.display === '') {
//                 filtersDropdown.style.display = 'block';
//             } else {
//                 filtersDropdown.style.display = 'none';
//             }
//         });
//     } else {
//         console.error('Filters icon not found!');
//     }

//     if (unfundedBtn) {
//         unfundedBtn.addEventListener('click', () => {
//             console.log('Show unfunded games');
//             // Add logic to filter unfunded games
//         });
//     }

//     if (fundedBtn) {
//         fundedBtn.addEventListener('click', () => {
//             console.log('Show funded games');
//             // Add logic to filter funded games
//         });
//     }

//     if (allBtn) {
//         allBtn.addEventListener('click', () => {
//             console.log('Show all games');
//             // Add logic to reset filters and show all games
//         });
//     }
// });


// // // Add event listener to the Filters button to toggle visibility
// // filtersButton.addEventListener("click", () => {
// //     console.log("Filters button clicked");
// //     // Toggle visibility of the filter buttons
// //     const isHidden = unfundedBtn.style.display === "none";
// //     console.log("Is Hidden:", isHidden);
// //     unfundedBtn.style.display = isHidden ? "inline-block" : "none";
// //     fundedBtn.style.display = isHidden ? "inline-block" : "none";
// //     allBtn.style.display = isHidden ? "inline-block" : "none";
// // });
// // unfundedBtn.addEventListener("click", filterUnfundedOnly);
// // fundedBtn.addEventListener("click", filterFundedOnly);
// // allBtn.addEventListener("click", showAllGames);

// /*************************************************************************************
//  * Challenge 6: Add more information at the top of the page about the company.
//  * Skills used: template literals, ternary operator
// */

// // grab the description container
// const descriptionContainer = document.getElementById("description-container");

// // use filter or reduce to count the number of unfunded games
// const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// // Calculate the total amount raised
// const moneyRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0).toLocaleString();

// // Get the total number of games
// const gamesCount = GAMES_JSON.length;

// // Create the message using a template string and ternary operator
// const message = `A total of $${moneyRaised} has been raised for ${gamesCount} ${
//   gamesCount === 1 ? "game" : "games"
// }, and currently, ${unfundedGamesCount} ${
//   unfundedGamesCount === 1 ? "game remains" : "games remain"
// } unfunded. We need your help to fund these amazing games!`;


// // Create a new paragraph element
// const paragraph = document.createElement("p");

// // Set the text content of the paragraph
// paragraph.textContent = message;

// // Append the paragraph to the description container
// descriptionContainer.appendChild(paragraph);

// // create a new DOM element containing the template string and append it to the description container

// /************************************************************************************
//  * Challenge 7: Select & display the top 2 games
//  * Skills used: spread operator, destructuring, template literals, sort 
//  */

// const firstGameContainer = document.getElementById("first-game");
// const secondGameContainer = document.getElementById("second-game");

// const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
//     return item2.pledged - item1.pledged;
// });

// // use destructuring and the spread operator to grab the first and second games
// const [firstGame, secondGame] = sortedGames;

// // create a new element to hold the name of the top pledge game, then append it to the correct element
// const firstGameElement = document.createElement("p");
// firstGameElement.textContent = firstGame.name;
// firstGameContainer.appendChild(firstGameElement);

// // do the same for the runner up item
// const secondGameElement = document.createElement("p");
// secondGameElement.textContent = secondGame.name;
// secondGameContainer.appendChild(secondGameElement);

