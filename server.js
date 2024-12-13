// server.js
import express from 'express';
import axios from 'axios';

const app = express();
const port = 9000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Reusable function to fetch cocktail by name
async function getCocktailByName(name) {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    return response.data;
}

// Reusable function to fetch a random cocktail
async function getRandomCocktail() {
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    return response.data;
}

// Routes
// -----------------------------------------
// Home route
app.get('/', async (req, res) => {
    const data = await getRandomCocktail();
    const cocktail = data.drinks[0];

    res.render('index', { cocktail });
});

// Random cocktail JSON response route
app.get('/cocktails/random', async (req, res) => {
    const data = await getRandomCocktail();
    res.json(data);
});

// Cocktail by name JSON response route
app.get('/cocktails/name/:cocktailName', async (req, res) => {
    const name = req.params.cocktailName;
    const data = await getCocktailByName(name);
    res.json(data);
});

// Server setup
app.listen(port, () => {
    console.log(`Cocktail app listening on port ${port} \nhttp://localhost:${port}`);
});
