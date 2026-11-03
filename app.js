const RecipeApp = (() => {
    // Recipe data includes ingredients and nested cooking steps.
    const recipes = [
        {
            id: 1,
            title: "Lemon Garlic Pasta",
            time: 20,
            difficulty: "easy",
            description: "A bright and flavorful pasta tossed with lemon, garlic, and parmesan.",
            category: "pasta",
            ingredients: ["Spaghetti", "Garlic", "Lemon", "Parmesan", "Olive oil"],
            steps: [
                "Boil salted water and cook the spaghetti until al dente.",
                { text: "Prepare the sauce", substeps: ["Warm olive oil.", "Saute minced garlic.", "Stir in lemon zest and juice."] },
                "Drain the pasta, reserving some cooking water.",
                "Toss pasta with the sauce and a splash of cooking water.",
                "Finish with parmesan and serve."
            ]
        },
        {
            id: 2,
            title: "Mediterranean Chickpea Salad",
            time: 15,
            difficulty: "easy",
            description: "A fresh salad with chickpeas, cucumber, tomatoes, olives, and herbs.",
            category: "salad",
            ingredients: ["Chickpeas", "Cucumber", "Cherry tomatoes", "Kalamata olives", "Parsley", "Feta"],
            steps: ["Rinse and drain the chickpeas.", "Dice the cucumber and tomatoes.", "Chop the parsley and olives.", "Combine all ingredients in a bowl.", "Add feta and toss with lemon dressing."]
        },
        {
            id: 3,
            title: "Vegetable Thai Curry",
            time: 35,
            difficulty: "medium",
            description: "Tender vegetables simmered in a fragrant coconut and red curry sauce.",
            category: "curry",
            ingredients: ["Coconut milk", "Red curry paste", "Bell pepper", "Broccoli", "Carrot", "Jasmine rice"],
            steps: ["Slice all vegetables into bite-sized pieces.", "Cook curry paste in a hot pan.", "Add coconut milk and bring it to a simmer.", "Add vegetables and cook until tender.", "Season with lime juice and serve over rice."]
        },
        {
            id: 4,
            title: "Mushroom Risotto",
            time: 45,
            difficulty: "medium",
            description: "Creamy arborio rice cooked slowly with mushrooms, stock, and parmesan.",
            category: "rice",
            ingredients: ["Arborio rice", "Mushrooms", "Vegetable stock", "Onion", "Butter", "Parmesan"],
            steps: ["Warm the stock in a separate saucepan.", "Saute onion and mushrooms in butter.", "Stir in rice until lightly toasted.", "Add stock one ladle at a time, stirring until absorbed.", "Fold in parmesan and rest before serving."]
        },
        {
            id: 5,
            title: "Classic Beef Wellington",
            time: 90,
            difficulty: "hard",
            description: "Beef tenderloin wrapped in mushroom duxelles and golden puff pastry.",
            category: "beef",
            ingredients: ["Beef tenderloin", "Mushrooms", "Puff pastry", "Egg", "Dijon mustard", "Prosciutto"],
            steps: [
                "Season and sear the beef on all sides.",
                { text: "Make the mushroom duxelles", substeps: ["Finely chop the mushrooms.", "Cook until their moisture evaporates.", { text: "Season the mixture", substeps: ["Add salt and pepper.", "Stir in fresh thyme."] }] },
                "Brush the beef with mustard and wrap it with prosciutto and duxelles.",
                "Encase the beef in puff pastry and chill it briefly.",
                "Brush the pastry with beaten egg.",
                "Bake until the pastry is golden and the beef reaches the desired doneness.",
                "Rest the Wellington before slicing."
            ]
        },
        {
            id: 6,
            title: "Homemade Chicken Tikka Masala",
            time: 75,
            difficulty: "hard",
            description: "Marinated chicken cooked in a rich, spiced tomato and cream sauce.",
            category: "curry",
            ingredients: ["Chicken thighs", "Yogurt", "Tomatoes", "Cream", "Garam masala", "Garlic", "Ginger"],
            steps: [
                "Marinate the chicken in yogurt, garlic, ginger, and spices.",
                "Chill the chicken for at least 30 minutes.",
                "Sear the chicken until browned.",
                { text: "Build the masala sauce", substeps: ["Saute onion and spices.", "Add tomatoes and simmer.", "Blend the sauce until smooth."] },
                "Return the chicken to the sauce and cook through.",
                "Stir in cream and adjust the seasoning.",
                "Garnish with cilantro and serve with rice."
            ]
        },
        {
            id: 7,
            title: "Herb-Roasted Salmon",
            time: 25,
            difficulty: "easy",
            description: "Oven-roasted salmon finished with fresh herbs, lemon, and olive oil.",
            category: "seafood",
            ingredients: ["Salmon fillets", "Lemon", "Dill", "Parsley", "Olive oil", "Black pepper"],
            steps: ["Preheat the oven.", "Place salmon on a lined baking tray.", "Brush with olive oil and season with herbs.", "Top with lemon slices.", "Roast until flaky and serve."]
        },
        {
            id: 8,
            title: "Spinach and Ricotta Lasagna",
            time: 80,
            difficulty: "medium",
            description: "Layered pasta filled with spinach, ricotta, tomato sauce, and mozzarella.",
            category: "pasta",
            ingredients: ["Lasagna sheets", "Spinach", "Ricotta", "Tomato sauce", "Mozzarella", "Parmesan"],
            steps: ["Cook the spinach and squeeze out excess moisture.", "Mix spinach with ricotta and parmesan.", "Spread tomato sauce in a baking dish.", "Layer pasta, ricotta filling, sauce, and mozzarella.", "Repeat the layers and cover with cheese.", "Bake until bubbling and golden.", "Rest before slicing."]
        }
    ];

    const recipeContainer = document.querySelector("#recipe-container");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const sortButtons = document.querySelectorAll(".sort-btn");
    let currentFilter = "all";
    let currentSort = "none";
    const expandedSections = new Set();

    const filterRecipes = (recipesToFilter, filterType) => {
        if (filterType === "quick") {
            return recipesToFilter.filter((recipe) => recipe.time < 30);
        }
        if (["easy", "medium", "hard"].includes(filterType)) {
            return recipesToFilter.filter((recipe) => recipe.difficulty === filterType);
        }
        return [...recipesToFilter];
    };

    const sortRecipes = (recipesToSort, sortType) => {
        if (sortType === "name") {
            return [...recipesToSort].sort((a, b) => a.title.localeCompare(b.title));
        }
        if (sortType === "time") {
            return [...recipesToSort].sort((a, b) => a.time - b.time);
        }
        return [...recipesToSort];
    };

    // Recursively render strings and nested step objects at any depth.
    const renderSteps = (steps, level = 0) => steps.map((step) => {
        if (typeof step === "string") {
            return `<li class="step-item level-${level}">${step}</li>`;
        }
        return `
            <li class="step-item level-${level}">
                ${step.text}
                <ol class="nested-steps">${renderSteps(step.substeps, level + 1)}</ol>
            </li>
        `;
    }).join("");

    const createStepsHTML = (recipe) => `
        <div class="steps-container ${expandedSections.has(`${recipe.id}:steps`) ? "visible" : ""}" data-content="steps">
            <ol class="steps-list">${renderSteps(recipe.steps)}</ol>
        </div>
    `;

    const createIngredientsHTML = (recipe) => `
        <div class="ingredients-container ${expandedSections.has(`${recipe.id}:ingredients`) ? "visible" : ""}" data-content="ingredients">
            <ul>${recipe.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}</ul>
        </div>
    `;

    const createRecipeCard = (recipe) => `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
            </div>
            <p>${recipe.description}</p>
            <div class="recipe-actions">
                <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="steps">${expandedSections.has(`${recipe.id}:steps`) ? "Hide" : "Show"} Steps</button>
                <button class="toggle-btn" data-recipe-id="${recipe.id}" data-toggle="ingredients">${expandedSections.has(`${recipe.id}:ingredients`) ? "Hide" : "Show"} Ingredients</button>
            </div>
            ${createStepsHTML(recipe)}
            ${createIngredientsHTML(recipe)}
        </div>
    `;

    const renderRecipes = (recipesToRender) => {
        recipeContainer.innerHTML = recipesToRender.map(createRecipeCard).join("");
    };

    const updateActiveButtons = () => {
        filterButtons.forEach((button) => {
            button.classList.toggle("active", button.dataset.filter === currentFilter);
        });
        sortButtons.forEach((button) => {
            button.classList.toggle("active", button.dataset.sort === currentSort);
        });
    };

    const updateDisplay = () => {
        const filteredRecipes = filterRecipes(recipes, currentFilter);
        renderRecipes(sortRecipes(filteredRecipes, currentSort));
        updateActiveButtons();
    };

    const handleToggleClick = (event) => {
        const button = event.target.closest(".toggle-btn");
        if (!button) {
            return;
        }
        const card = button.closest(".recipe-card");
        const sectionKey = `${button.dataset.recipeId}:${button.dataset.toggle}`;
        const container = card.querySelector(`[data-content="${button.dataset.toggle}"]`);
        const isVisible = container.classList.toggle("visible");
        if (isVisible) {
            expandedSections.add(sectionKey);
        } else {
            expandedSections.delete(sectionKey);
        }
        button.textContent = `${isVisible ? "Hide" : "Show"} ${button.dataset.toggle === "steps" ? "Steps" : "Ingredients"}`;
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
        recipeContainer.addEventListener("click", handleToggleClick);
    };

    const init = () => {
        console.log("RecipeApp initializing...");
        setupEventListeners();
        updateDisplay();
        console.log("RecipeApp ready!");
    };

    return { init, updateDisplay };
})();

RecipeApp.init();
