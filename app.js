// Recipe data used to populate the recipe cards.
const recipes = [
    {
        id: 1,
        title: "Lemon Garlic Pasta",
        time: 20,
        difficulty: "easy",
        description: "A bright and flavorful pasta tossed with lemon, garlic, and parmesan.",
        category: "pasta"
    },
    {
        id: 2,
        title: "Mediterranean Chickpea Salad",
        time: 15,
        difficulty: "easy",
        description: "A fresh salad with chickpeas, cucumber, tomatoes, olives, and herbs.",
        category: "salad"
    },
    {
        id: 3,
        title: "Vegetable Thai Curry",
        time: 35,
        difficulty: "medium",
        description: "Tender vegetables simmered in a fragrant coconut and red curry sauce.",
        category: "curry"
    },
    {
        id: 4,
        title: "Mushroom Risotto",
        time: 45,
        difficulty: "medium",
        description: "Creamy arborio rice cooked slowly with mushrooms, stock, and parmesan.",
        category: "rice"
    },
    {
        id: 5,
        title: "Classic Beef Wellington",
        time: 90,
        difficulty: "hard",
        description: "Beef tenderloin wrapped in mushroom duxelles and golden puff pastry.",
        category: "beef"
    },
    {
        id: 6,
        title: "Homemade Chicken Tikka Masala",
        time: 75,
        difficulty: "hard",
        description: "Marinated chicken cooked in a rich, spiced tomato and cream sauce.",
        category: "curry"
    },
    {
        id: 7,
        title: "Herb-Roasted Salmon",
        time: 25,
        difficulty: "easy",
        description: "Oven-roasted salmon finished with fresh herbs, lemon, and olive oil.",
        category: "seafood"
    },
    {
        id: 8,
        title: "Spinach and Ricotta Lasagna",
        time: 80,
        difficulty: "medium",
        description: "Layered pasta filled with spinach, ricotta, tomato sauce, and mozzarella.",
        category: "pasta"
    }
];

const recipeContainer = document.querySelector("#recipe-container");

// Build the markup for one recipe card.
const createRecipeCard = (recipe) => `
    <div class="recipe-card" data-id="${recipe.id}">
        <h3>${recipe.title}</h3>
        <div class="recipe-meta">
            <span>⏱️ ${recipe.time} min</span>
            <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
        </div>
        <p>${recipe.description}</p>
    </div>
`;

// Render each recipe card into the page.
const renderRecipes = (recipesToRender) => {
    recipeContainer.innerHTML = recipesToRender
        .map((recipe) => createRecipeCard(recipe))
        .join("");
};

renderRecipes(recipes);