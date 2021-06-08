import {API__URL, KEY} from './config.js';
import {fetchJSON, sendJSON} from './helper.js';

export const state = {
    recipe : {},
    search : {
        searchQuery : '',
        data : [],
        resultsPerPage : 10,
        page : 1,
    },
    bookmarked : [],
};

const createObj = function(recipe){
    return {
            id : recipe.id,
            title : recipe.title,
            publisher : recipe.publisher,
            imageUrl : recipe.image_url,
            sourceUrl : recipe.source_url,
            servings : recipe.servings,
            cookingTime : recipe.cooking_time,
            ingredients : recipe.ingredients,
            bookmark : false,
            ...(recipe.key && {key : recipe.key}), 
        }
}

export const generateRecipe = async function(id){
    try{
        const data =await fetchJSON(`${API__URL}${id}?key=${KEY}`);
        const {recipe} = data.data; 

        state.recipe = createObj(recipe);
        if(state.bookmarked.some(rec => rec.id === id))
            state.recipe.bookmark = true;

    }catch(err){
        throw err;
    }
}

export const generateSearchResults = async function(data){
    try{
        const searchedData = await fetchJSON(`${API__URL}?search=${data}&key=${KEY}`);
        // console.log(searchedData.data.recipes);
        state.search.data = searchedData.data.recipes.map(rec =>{
            return {
                id : rec.id,
                title : rec.title,
                publisher : rec.publisher,
                imageUrl : rec.image_url,
                ...(rec.key && {key : rec.key}),
            };
        });
    }catch(err){
        throw err;
    }
}

export const createResultsPerPage = function(page){
    state.search.page = page;
    const start = (page-1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.data.slice(start, end);
}

export const updateServingsData = function(newServings){
    state.recipe.ingredients.forEach(ing => {
        ing.quantity = ing.quantity * newServings / state.recipe.servings;
    })
    state.recipe.servings = newServings;
}

export const addBookMark = function(){
    state.recipe.bookmark = true;
    state.bookmarked.push(state.recipe);
    setLocalStorage();
}

export const deleteBookMark = function(){
    state.recipe.bookmark = false;
    const index = state.bookmarked.findIndex(bm => bm.id === state.recipe.id);
    state.bookmarked.splice(index,1);
    setLocalStorage();
}

const setLocalStorage = function(){
    localStorage.setItem('bookmarkData', JSON.stringify(state.bookmarked));
}

const getLocalStorage = function(){
    const storageData =  localStorage.getItem('bookmarkData');
    if(storageData)   state.bookmarked = JSON.parse(storageData);
};

const clearStorage = function(){
    localStorage.clear();
}

export const NewRecipe = async function(dataArr){
    try{
        const ingredients = dataArr.filter(data => data[0].startsWith('ingredient') && data[1] !=='')
        .map(data => {
            const ingData = data[1].trim().split(',').map(entry => entry.trim());
            
            if(ingData.length !== 3)    throw new Error();
            if(ingData[2] === '')   throw new Error(`Description cannot be blank`);
            
            const [quantity, unit, description] = ingData;
            return {quantity : quantity!=='' ? +quantity : null, unit, description};
        });
        const NewRecipe = {
            title : dataArr[0][1],
            publisher : dataArr[3][1],
            image_url : dataArr[2][1],
            source_url : dataArr[1][1],
            servings : +dataArr[5][1],
            cooking_time : +dataArr[4][1],
            ingredients : ingredients,
        };
        //sending data to API
        const data = await fetchJSON(`${API__URL}?key=${KEY}` , NewRecipe);
        state.recipe = createObj(data.data.recipe);
        addBookMark();
        // console.log(state.recipe);
    }catch(err){
        throw err;
    }
} 

getLocalStorage();
// clearStorage();