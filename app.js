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
const filterButtons = document.querySelectorAll(".filter-btn");
const sortButtons = document.querySelectorAll(".sort-btn");

let currentFilter = "all";
let currentSort = "none";

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

// Return recipes matching the selected difficulty or time filter.
const filterRecipes = (recipesToFilter, filterType) => {
    switch (filterType) {
        case "easy":
        case "medium":
        case "hard":
            return recipesToFilter.filter((recipe) => recipe.difficulty === filterType);
        case "quick":
            return recipesToFilter.filter((recipe) => recipe.time < 30);
        case "all":
        default:
            return [...recipesToFilter];
    }
};

const filterByDifficulty = (recipesToFilter, difficulty) =>
    recipesToFilter.filter((recipe) => recipe.difficulty === difficulty);

const filterByTime = (recipesToFilter, maxMinutes) =>
    recipesToFilter.filter((recipe) => recipe.time < maxMinutes);

const applyFilter = (recipesToFilter, filterType) =>
    filterRecipes(recipesToFilter, filterType);

// Sort a copied array so the original recipe order is never mutated.
const sortRecipes = (recipesToSort, sortType) => {
    if (sortType === "name") {
        return [...recipesToSort].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortType === "time") {
        return [...recipesToSort].sort((a, b) => a.time - b.time);
    }

    return [...recipesToSort];
};

const sortByName = (recipesToSort) =>
    [...recipesToSort].sort((a, b) => a.title.localeCompare(b.title));

const sortByTime = (recipesToSort) =>
    [...recipesToSort].sort((a, b) => a.time - b.time);

const applySort = (recipesToSort, sortType) =>
    sortRecipes(recipesToSort, sortType);

const updateActiveButtons = () => {
    filterButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.filter === currentFilter);
    });

    sortButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.sort === currentSort);
    });
};

const updateDisplay = () => {
    const filteredRecipes = applyFilter(recipes, currentFilter);
    const recipesToDisplay = applySort(filteredRecipes, currentSort);

    renderRecipes(recipesToDisplay);
    updateActiveButtons();
    console.log(
        `Displaying ${recipesToDisplay.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`
    );
};

const setupEventListeners = () => {
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            currentFilter = button.dataset.filter;
            updateDisplay();
        });
    });

    sortButtons.forEach((button) => {
        button.addEventListener("click", () => {
            currentSort = button.dataset.sort;
            updateDisplay();
        });
    });
};

setupEventListeners();
updateDisplay();