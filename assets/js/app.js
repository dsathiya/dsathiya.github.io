// DOM Elements
const homeLink = document.getElementById('home-link');
const recipesLink = document.getElementById('recipes-link');
const addRecipeLink = document.getElementById('add-recipe-link');
const loginLink = document.getElementById('login-link');
const authOnlyElements = document.querySelectorAll('.auth-only');

// Mobile Navigation Elements
const mobileHomeLink = document.getElementById('mobile-home-link');
const mobileRecipesLink = document.getElementById('mobile-recipes-link');
const mobileAddRecipeLink = document.getElementById('mobile-add-recipe-link');
const mobileLoginLink = document.getElementById('mobile-login-link');

const homeSection = document.getElementById('home-section');
const recipesSection = document.getElementById('recipes-section');
const addRecipeSection = document.getElementById('add-recipe-section');
const recipeDetailSection = document.getElementById('recipe-detail-section');
const loginSection = document.getElementById('login-section');

const featuredRecipesContainer = document.getElementById('featured-recipes-container');
const allRecipesContainer = document.getElementById('all-recipes-container');
const recipeDetailContainer = document.getElementById('recipe-detail-container');

const recipeForm = document.getElementById('recipe-form');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const filterOccasion = document.getElementById('filter-occasion');
const filterContinent = document.getElementById('filter-continent');

const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const closeModal = document.querySelector('.close');

const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

// Sample data for initial load (will be replaced by localStorage)
const sampleRecipes = [
    {
        id: 1,
        title: 'Spaghetti Carbonara',
        // image: 'https://source.unsplash.com/random/300x200/?pasta',
        image: 'https://picsum.photos/id/292/300/200',
        ingredients: [
            '400g spaghetti',
            '200g pancetta or guanciale, diced',
            '4 large eggs',
            '50g pecorino cheese, grated',
            '50g parmesan, grated',
            'Freshly ground black pepper',
            '1 garlic clove (optional)'
        ],
        steps: [
            'Bring a large pot of salted water to boil and cook spaghetti according to package instructions.',
            'While pasta cooks, fry pancetta in a large pan until crispy.',
            'In a bowl, whisk eggs and mix in the grated cheeses and black pepper.',
            'Drain pasta, reserving a cup of pasta water.',
            'Working quickly, add hot pasta to the pan with pancetta, remove from heat.',
            'Add the egg and cheese mixture, stirring quickly to create a creamy sauce.',
            'Add a splash of pasta water if needed to loosen the sauce.',
            'Serve immediately with extra grated cheese and black pepper.'
        ],
        time: 25,
        occasion: 'dinner',
        continent: 'european',
        remarks: 'Authentic carbonara does not include cream. The creaminess comes from the eggs and cheese.',
        tasty: 15,
        user: 'ItalianChef',
        date: '2024-04-01'
    },
    {
        id: 2,
        title: 'Chicken Tikka Masala',
        image: 'https://picsum.photos/id/103/300/200',
        ingredients: [
            '800g boneless chicken thighs, cut into bite-sized pieces',
            '2 cups plain yogurt',
            '3 tbsp lemon juice',
            '4 tsp ground cumin',
            '4 tsp ground coriander',
            '4 tsp paprika',
            '2 tsp turmeric',
            '2 tsp garam masala',
            '2 tsp salt',
            '2 tbsp ginger paste',
            '2 tbsp garlic paste',
            '2 tbsp vegetable oil',
            '1 large onion, finely chopped',
            '400g tomato sauce',
            '1 cup heavy cream'
        ],
        steps: [
            'In a large bowl, combine yogurt, lemon juice, cumin, coriander, paprika, turmeric, garam masala, salt, ginger paste, and garlic paste.',
            'Add chicken pieces and marinate for at least 2 hours, preferably overnight.',
            'Preheat oven to 400°F (200°C). Place marinated chicken on a baking sheet and bake for 15 minutes.',
            'Heat oil in a large pan over medium heat. Add onion and cook until soft.',
            'Add tomato sauce and simmer for 15 minutes.',
            'Add the baked chicken pieces and simmer for another 10 minutes.',
            'Stir in heavy cream and simmer for 5 more minutes.',
            'Garnish with fresh cilantro and serve with rice or naan bread.'
        ],
        time: 180,
        occasion: 'dinner',
        continent: 'asian',
        remarks: 'For a more authentic flavor, use Kashmiri chili powder instead of paprika.',
        tasty: 23,
        user: 'SpiceExpert',
        date: '2024-03-28'
    },
    {
        id: 3,
        title: 'Avocado Toast',
        image: 'https://picsum.photos/id/63/300/200',
        ingredients: [
            '2 slices of whole grain bread',
            '1 ripe avocado',
            '1/2 lemon, juiced',
            'Salt and pepper to taste',
            'Red pepper flakes (optional)',
            '2 eggs (optional)'
        ],
        steps: [
            'Toast the bread slices until golden and crisp.',
            'Cut the avocado in half, remove the pit, and scoop the flesh into a bowl.',
            'Add lemon juice, salt, and pepper to the avocado and mash with a fork to desired consistency.',
            'Spread the mashed avocado on the toast.',
            'If desired, top with a poached or fried egg.',
            'Sprinkle with red pepper flakes and additional salt and pepper if needed.'
        ],
        time: 10,
        occasion: 'breakfast',
        continent: 'north-american',
        remarks: 'For extra flavor, add crumbled feta cheese, cherry tomatoes, or microgreens on top.',
        tasty: 8,
        user: 'HealthyEater',
        date: '2024-04-05'
    }
];

// User data
const users = [
    {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin'
    },
    {
        id: 2,
        name: 'Moderator User',
        email: 'mod@example.com',
        password: 'mod123',
        role: 'moderator'
    },
    {
        id: 3,
        name: 'Regular User',
        email: 'user@example.com',
        password: 'user123',
        role: 'user'
    }
];

// Initialize local storage
function initializeLocalStorage() {
    if (!localStorage.getItem('recipes')) {
        localStorage.setItem('recipes', JSON.stringify(sampleRecipes));
    }
    
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', null);
    }
}

// Get recipes from local storage
function getRecipes() {
    return JSON.parse(localStorage.getItem('recipes')) || [];
}

// Save recipes to local storage
function saveRecipes(recipes) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Get users from local storage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Save users to local storage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Get current user
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Set current user
function setCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateNavigation();
}

// Update navigation based on user login status
function updateNavigation() {
    const currentUser = getCurrentUser();
    const isMobile = window.innerWidth <= 768;
    
    if (currentUser) {
        // Add authenticated class to body
        document.body.classList.add('authenticated');
        
        // Update login link text
        loginLink.textContent = 'Logout';
        mobileLoginLink.querySelector('span').textContent = 'Logout';
        
        // Show auth-only elements
        authOnlyElements.forEach(el => {
            // On mobile, only show auth-only elements in the mobile nav
            if (isMobile && !el.closest('.mobile-nav')) {
                el.style.display = 'none';
            } else {
                el.style.display = 'inline-block';
            }
        });
        
        // If admin or moderator, show additional links
        if (currentUser.role === 'admin' || currentUser.role === 'moderator') {
            // Add admin/moderator specific links if needed
        }
    } else {
        // Remove authenticated class from body
        document.body.classList.remove('authenticated');
        
        // Update login link text
        loginLink.textContent = 'Login';
        mobileLoginLink.querySelector('span').textContent = 'Login';
        
        // Hide auth-only elements
        authOnlyElements.forEach(el => {
            el.style.display = 'none';
        });
        
        // Ensure nav-links are properly displayed for non-authenticated users on mobile
        if (isMobile) {
            navLinks.style.visibility = 'hidden';
            navLinks.style.opacity = '0';
            if (navLinks.classList.contains('active')) {
                navLinks.style.visibility = 'visible';
                navLinks.style.opacity = '1';
            }
        }
    }
}

// Show section
function showSection(section) {
    // Hide all sections
    homeSection.classList.remove('active');
    recipesSection.classList.remove('active');
    addRecipeSection.classList.remove('active');
    recipeDetailSection.classList.remove('active');
    loginSection.classList.remove('active');
    
    // Show selected section
    section.classList.add('active');
    
    // Remove active class from all nav links (desktop)
    homeLink.classList.remove('active');
    recipesLink.classList.remove('active');
    addRecipeLink.classList.remove('active');
    loginLink.classList.remove('active');
    
    // Remove active class from all mobile nav links
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to corresponding nav links
    if (section === homeSection) {
        homeLink.classList.add('active');
        mobileHomeLink.classList.add('active');
    } else if (section === recipesSection) {
        recipesLink.classList.add('active');
        mobileRecipesLink.classList.add('active');
    } else if (section === addRecipeSection) {
        addRecipeLink.classList.add('active');
        mobileAddRecipeLink.classList.add('active');
    } else if (section === loginSection) {
        loginLink.classList.add('active');
        mobileLoginLink.classList.add('active');
    }
    
    // Close mobile menu if open
    navLinks.classList.remove('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Create recipe card
function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    
    card.innerHTML = `
        <div class="recipe-image">
            <img src="${recipe.image}" alt="${recipe.title}">
        </div>
        <div class="recipe-content">
            <h3 class="recipe-title">${recipe.title}</h3>
            <div class="recipe-info">
                <span><i class="far fa-clock"></i> ${recipe.time} mins</span>
                <span><i class="fas fa-user"></i> ${recipe.user}</span>
            </div>
            <div class="recipe-tags">
                <span class="recipe-tag">${recipe.occasion}</span>
                <span class="recipe-tag">${recipe.continent}</span>
            </div>
            <div class="recipe-actions">
                <button class="tasty-btn" data-id="${recipe.id}">
                    <i class="fas fa-heart"></i> ${recipe.tasty || 0}
                </button>
                <button class="view-recipe-btn" data-id="${recipe.id}">View Recipe</button>
            </div>
        </div>
    `;
    
    // Add event listener to view recipe button
    card.querySelector('.view-recipe-btn').addEventListener('click', function() {
        const recipeId = this.getAttribute('data-id');
        showRecipeDetail(recipeId);
    });
    
    // Add event listener to tasty button
    card.querySelector('.tasty-btn').addEventListener('click', function() {
        const recipeId = this.getAttribute('data-id');
        markAsTasty(recipeId);
    });
    
    return card;
}

// Load featured recipes
function loadFeaturedRecipes() {
    const recipes = getRecipes();
    // Sort by tasty count and get top 3
    const featuredRecipes = [...recipes].sort((a, b) => (b.tasty || 0) - (a.tasty || 0)).slice(0, 3);
    
    featuredRecipesContainer.innerHTML = '';
    
    featuredRecipes.forEach(recipe => {
        featuredRecipesContainer.appendChild(createRecipeCard(recipe));
    });
}

// Load all recipes
function loadAllRecipes(filters = {}) {
    let recipes = getRecipes();
    
    // Apply filters
    if (filters.occasion) {
        recipes = recipes.filter(recipe => recipe.occasion === filters.occasion);
    }
    
    if (filters.continent) {
        recipes = recipes.filter(recipe => recipe.continent === filters.continent);
    }
    
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        recipes = recipes.filter(recipe => 
            recipe.title.toLowerCase().includes(searchTerm) ||
            recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm)) ||
            recipe.continent.toLowerCase().includes(searchTerm) ||
            recipe.occasion.toLowerCase().includes(searchTerm)
        );
    }
    
    allRecipesContainer.innerHTML = '';
    
    if (recipes.length === 0) {
        allRecipesContainer.innerHTML = '<p>No recipes found matching your criteria.</p>';
        return;
    }
    
    recipes.forEach(recipe => {
        allRecipesContainer.appendChild(createRecipeCard(recipe));
    });
}

// Show recipe detail
function showRecipeDetail(recipeId) {
    const recipes = getRecipes();
    const recipe = recipes.find(r => r.id == recipeId);
    
    if (!recipe) {
        showModal('Recipe not found');
        return;
    }
    
    recipeDetailContainer.innerHTML = `
        <div class="recipe-detail">
            <div class="recipe-detail-image">
                <img src="${recipe.image}" alt="${recipe.title}">
            </div>
            <div class="recipe-detail-content">
                <div class="recipe-detail-header">
                    <h2 class="recipe-detail-title">${recipe.title}</h2>
                    <div class="recipe-detail-info">
                        <span><i class="far fa-clock"></i> ${recipe.time} mins</span>
                        <span><i class="fas fa-user"></i> ${recipe.user}</span>
                        <span><i class="far fa-calendar"></i> ${recipe.date}</span>
                    </div>
                    <div class="recipe-detail-tags">
                        <span class="recipe-tag">${recipe.occasion}</span>
                        <span class="recipe-tag">${recipe.continent}</span>
                    </div>
                </div>
                
                <div class="recipe-detail-section">
                    <h3>Ingredients</h3>
                    <ul class="ingredients-list">
                        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="recipe-detail-section">
                    <h3>Instructions</h3>
                    <ol class="steps-list">
                        ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
                
                ${recipe.remarks ? `
                <div class="recipe-detail-section">
                    <h3>Remarks</h3>
                    <div class="recipe-remarks">
                        <p>${recipe.remarks}</p>
                    </div>
                </div>
                ` : ''}
                
                <div class="recipe-actions-detail">
                    <button class="btn-primary tasty-btn-detail" data-id="${recipe.id}">
                        <i class="fas fa-heart"></i> Mark as Tasty (${recipe.tasty || 0})
                    </button>
                    <button class="btn-primary report-btn" data-id="${recipe.id}">
                        <i class="fas fa-flag"></i> Report
                    </button>
                </div>
                
                <div class="comments-section">
                    <h3>Comments</h3>
                    <div class="comment-form">
                        <textarea id="comment-text" placeholder="Add a comment..."></textarea>
                        <button class="btn-primary add-comment-btn" data-id="${recipe.id}">Add Comment</button>
                    </div>
                    <div class="comment-list">
                        <p>No comments yet. Be the first to comment!</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners for the detail page buttons
    recipeDetailContainer.querySelector('.tasty-btn-detail').addEventListener('click', function() {
        const recipeId = this.getAttribute('data-id');
        markAsTasty(recipeId);
        // Update the tasty count in the UI
        this.innerHTML = `<i class="fas fa-heart"></i> Mark as Tasty (${recipe.tasty + 1 || 1})`;
    });
    
    recipeDetailContainer.querySelector('.report-btn').addEventListener('click', function() {
        const recipeId = this.getAttribute('data-id');
        reportRecipe(recipeId);
    });
    
    recipeDetailContainer.querySelector('.add-comment-btn').addEventListener('click', function() {
        const recipeId = this.getAttribute('data-id');
        const commentText = document.getElementById('comment-text').value;
        addComment(recipeId, commentText);
    });
    
    showSection(recipeDetailSection);
}

// Mark recipe as tasty
function markAsTasty(recipeId) {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        showModal('Please log in to mark recipes as tasty');
        showSection(loginSection);
        return;
    }
    
    const recipes = getRecipes();
    const recipeIndex = recipes.findIndex(r => r.id == recipeId);
    
    if (recipeIndex !== -1) {
        recipes[recipeIndex].tasty = (recipes[recipeIndex].tasty || 0) + 1;
        saveRecipes(recipes);
        
        // Refresh the UI
        if (homeSection.classList.contains('active')) {
            loadFeaturedRecipes();
        } else if (recipesSection.classList.contains('active')) {
            loadAllRecipes({
                occasion: filterOccasion.value,
                continent: filterContinent.value
            });
        }
    }
}

// Report recipe
function reportRecipe(recipeId) {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        showModal('Please log in to report recipes');
        showSection(loginSection);
        return;
    }
    
    showModal('Recipe reported. A moderator will review it soon.');
}

// Add comment to recipe
function addComment(recipeId, commentText) {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        showModal('Please log in to add comments');
        showSection(loginSection);
        return;
    }
    
    if (!commentText.trim()) {
        showModal('Please enter a comment');
        return;
    }
    
    // In a real app, we would save the comment to the database
    // For this prototype, we'll just show a success message
    showModal('Comment added successfully');
    document.getElementById('comment-text').value = '';
    
    // Add the comment to the UI
    const commentList = document.querySelector('.comment-list');
    commentList.innerHTML = `
        <div class="comment">
            <div class="comment-header">
                <span class="comment-author">${currentUser.name}</span>
                <span class="comment-date">Just now</span>
            </div>
            <div class="comment-content">
                <p>${commentText}</p>
            </div>
        </div>
    `;
}

// Add new recipe
function addNewRecipe(recipeData) {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
        showModal('Please log in to add recipes');
        showSection(loginSection);
        return;
    }
    
    const recipes = getRecipes();
    
    // Generate a new ID
    const newId = recipes.length > 0 ? Math.max(...recipes.map(r => r.id)) + 1 : 1;
    
    // Create new recipe object
    const newRecipe = {
        id: newId,
        title: recipeData.title,
        image: recipeData.image,
        ingredients: recipeData.ingredients,
        steps: recipeData.steps,
        time: parseInt(recipeData.time),
        occasion: recipeData.occasion,
        continent: recipeData.continent,
        remarks: recipeData.remarks,
        tasty: 0,
        user: currentUser.name,
        date: new Date().toISOString().split('T')[0]
    };
    
    // Add to recipes array
    recipes.push(newRecipe);
    saveRecipes(recipes);
    
    showModal('Recipe added successfully');
    recipeForm.reset();
    
    // Show the new recipe
    showRecipeDetail(newId);
}

// Login user
function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        setCurrentUser(user);
        showModal(`Welcome back, ${user.name}!`);
        showSection(homeSection);
        return true;
    } else {
        showModal('Invalid email or password');
        return false;
    }
}

// Logout user
function logoutUser() {
    setCurrentUser(null);
    showModal('You have been logged out');
    showSection(homeSection);
}

// Register new user
function registerUser(name, email, password) {
    const users = getUsers();
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        showModal('Email already registered');
        return false;
    }
    
    // Generate a new ID
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    
    // Create new user object
    const newUser = {
        id: newId,
        name: name,
        email: email,
        password: password,
        role: 'user' // Default role
    };
    
    // Add to users array
    users.push(newUser);
    saveUsers(users);
    
    // Log in the new user
    setCurrentUser(newUser);
    
    showModal('Registration successful! Welcome to Recipe App.');
    showSection(homeSection);
    return true;
}

// Show modal with message
function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = 'block';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize local storage
    initializeLocalStorage();
    
    // Load initial data
    loadFeaturedRecipes();
    loadAllRecipes();
    
    // Update navigation based on user login status
    updateNavigation();
    
    // Set initial authentication state
    const currentUser = getCurrentUser();
    if (currentUser) {
        document.body.classList.add('authenticated');
    } else {
        document.body.classList.remove('authenticated');
    }
    
    // Desktop Navigation links
    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection(homeSection);
        loadFeaturedRecipes();
    });
    
    recipesLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection(recipesSection);
        loadAllRecipes();
    });
    
    addRecipeLink.addEventListener('click', function(e) {
        e.preventDefault();
        const currentUser = getCurrentUser();
        if (currentUser) {
            showSection(addRecipeSection);
        } else {
            showModal('Please log in to add recipes');
            showSection(loginSection);
        }
    });
    
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        const currentUser = getCurrentUser();
        if (currentUser) {
            logoutUser();
        } else {
            showSection(loginSection);
        }
    });
    
    // Mobile navigation event listeners
    mobileHomeLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection(homeSection);
        loadFeaturedRecipes();
    });
    
    mobileRecipesLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection(recipesSection);
        loadAllRecipes();
    });
    
    mobileAddRecipeLink.addEventListener('click', function(e) {
        e.preventDefault();
        const currentUser = getCurrentUser();
        if (currentUser) {
            showSection(addRecipeSection);
        } else {
            showModal('Please log in to add recipes');
            showSection(loginSection);
        }
    });
    
    mobileLoginLink.addEventListener('click', function(e) {
        e.preventDefault();
        const currentUser = getCurrentUser();
        if (currentUser) {
            logoutUser();
        } else {
            showSection(loginSection);
        }
    });
    
    // Filter change events
    filterOccasion.addEventListener('change', function() {
        loadAllRecipes({
            occasion: this.value,
            continent: filterContinent.value
        });
    });
    
    filterContinent.addEventListener('change', function() {
        loadAllRecipes({
            occasion: filterOccasion.value,
            continent: this.value
        });
    });
    
    // Search functionality
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            showSection(recipesSection);
            loadAllRecipes({ search: searchTerm });
        }
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                showSection(recipesSection);
                loadAllRecipes({ search: searchTerm });
            }
        }
    });
    
    // Auth tabs
    loginTab.addEventListener('click', function() {
        this.classList.add('active');
        signupTab.classList.remove('active');
        document.getElementById('login-form').classList.add('active');
        document.getElementById('signup-form').classList.remove('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.burger') && !e.target.closest('.nav-links') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
    
    signupTab.addEventListener('click', function() {
        this.classList.add('active');
        loginTab.classList.remove('active');
        document.getElementById('signup-form').classList.add('active');
        document.getElementById('login-form').classList.remove('active');
    });
    
    // Form submissions
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        loginUser(email, password);
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        if (password !== confirmPassword) {
            showModal('Passwords do not match');
            return;
        }
        
        registerUser(name, email, password);
    });
    
    recipeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('recipe-title').value;
        const image = document.getElementById('recipe-image').value;
        const occasion = document.getElementById('recipe-occasion').value;
        const continent = document.getElementById('recipe-continent').value;
        const time = document.getElementById('recipe-time').value;
        const ingredients = document.getElementById('recipe-ingredients').value.split('\n').filter(i => i.trim());
        const steps = document.getElementById('recipe-steps').value.split('\n').filter(s => s.trim());
        const remarks = document.getElementById('recipe-remarks').value;
        
        addNewRecipe({
            title,
            image,
            occasion,
            continent,
            time,
            ingredients,
            steps,
            remarks
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Mobile menu toggle
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Toggle visibility for mobile
        if (window.innerWidth <= 768) {
            if (navLinks.classList.contains('active')) {
                navLinks.style.visibility = 'visible';
                navLinks.style.opacity = '1';
            } else {
                navLinks.style.visibility = 'hidden';
                navLinks.style.opacity = '0';
            }
        }
    });
    
    // Update navigation on window resize
    window.addEventListener('resize', function() {
        updateNavigation();
    });
});