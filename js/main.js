document.querySelector('button').addEventListener('click', getDrink)

function getDrink(){
  let drink = document.querySelector('input').value

  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ drink )
      .then(res => res.json()) // parse response as JSON
      .then(data => {
      const drinks = data.drinks;
      if (!drinks) {
        document.querySelector('h2').innerText = 'No drinks found.';
        document.querySelector('img').src = '';
        document.querySelector('h3').innerText = '';
        return;
      }

      let current = 0;                          // index of the drink we are showing
      let timer;                                // will hold the setInterval id

      // helper: put one drink’s info in the page
      function showDrink(i) {
        const d = drinks[i];
        document.querySelector('h2').innerText = d.strDrink;
        document.querySelector('img').src       = d.strDrinkThumb;
        document.querySelector('h3').innerText = d.strInstructions;
      }

      // show the first drink immediately
      showDrink(current);

      // stop a previous interval if the user searches again
      if (timer) clearInterval(timer);

      // every 3 seconds, advance to the next drink
      timer = setInterval(function () {
        current = (current + 1) % drinks.length; // loop back to 0 at the end
        showDrink(current);
      }, 3000);
    });

    }




