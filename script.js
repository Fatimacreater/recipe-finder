let inp = document.querySelector("#inp");
let search = document.querySelector("#btn");
let recipes = document.querySelector("#recipes");
let clearBtn = document.querySelector("#clear-history");

let history = JSON.parse(localStorage.getItem("history")) || [];

 async function getrecipe() {
             let value = inp.value.trim();
          
            const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
           try{
              spinner.classList.remove("hidden"); 

             const recipe = await fetch(url);
            if(!recipe.ok){throw new Error("Request Failed");}
            let data = await recipe.json();
            
            if(data.meals){                
                data.meals.forEach(element => {
                    let card = document.createElement("div");                    
                    let img = document.createElement("img");
                    let name = document.createElement("h2");
                    let category = document.createElement("p");
                    let cuisine = document.createElement("p");
                    let detail_btn = document.createElement("button");
                    let detail = document.createElement("div");
                    let instruction = document.createElement("p");
                    let ing = document.createElement("h2");
                    ing.textContent = "Ingredients : "
                    detail.appendChild(ing);                   

                    detail.classList.add("hidden");
                    
                    img.src = element.strMealThumb;
                    name.textContent = element.strMeal ; 
                    category.textContent = element.strCategory ; 
                    cuisine.textContent = `Cuisine : ${element.strArea}`; 
                    detail_btn.textContent = "View Recipe";
                    instruction.textContent =`Instruction :  ${element.strInstructions}`;

                    
                     for(let i = 1; i <= 20; i++){
                    
                    if(element["strIngredient" + i]){
                        let ingredient = document.createElement("p");

                        ingredient.textContent =  "•"+" " + element["strMeasure" + i] +" "+ element["strIngredient" + i];
                        detail.appendChild(ingredient);
                    }

                }

                    detail_btn.addEventListener("click" , function(){
                    detail.classList.toggle("hidden"); 
                    if(detail.classList.contains("hidden")){
                        detail_btn.textContent = "View Recipe";

                }  
                    else{
                        detail_btn.textContent = "Hide Recipe";
                    }
                                        
            });
                    
                    card.appendChild(img);
                    card.appendChild(name);
                    card.appendChild(category);
                    card.appendChild(cuisine);
                    card.appendChild(detail_btn);
                    card.appendChild(detail);                    
                    detail.appendChild(instruction);                 
                    recipes.appendChild(card);  
                    
                    spinner.classList.add("hidden"); 
                })            
            }
            else{
                spinner.classList.add("hidden"); 
                let nothing = document.createElement("h2");                    
                nothing.textContent = "No recipes found";
                recipes.appendChild(nothing);
            }
           
        }
            
            catch(err){
            spinner.classList.add("hidden");
            recipes.innerHTML = "";
            console.log(err);
            let error = document.createElement("h2");
            error.textContent = "Failed to fetch recipes. Please try again.";
            recipes.appendChild(error);

           }
           finally{
            spinner.classList.add("hidden");
   search.disabled = false;
           }
           
              }

search.addEventListener("click" , function(){
    if(inp.value.trim() === ""){alert("write something"); return};


let searchTerm = inp.value.trim();

if(!history.includes(searchTerm)){
    history.push(searchTerm);
}

localStorage.setItem("history", JSON.stringify(history));    

displayHistory();

recipes.innerHTML = "";
    search.disabled = true;
    getrecipe();
    inp.value = "";
})

inp.addEventListener("keydown" , (e) =>{
    if(e.key === "Enter"){
        search.click();
    }
})

function displayHistory(){

    let historyBox = document.querySelector("#history");
 
    historyBox.innerHTML = "";

    let history = JSON.parse(localStorage.getItem("history")) || [];

    history = history.slice(-5).reverse();

    history.forEach(item => {

        let btn = document.createElement("button");

        btn.textContent = item;

        btn.addEventListener("click", () => {
            inp.value = item;
            search.click();
        });

        historyBox.appendChild(btn);

    });
}
displayHistory();

clearBtn.addEventListener("click", () => {

    if(confirm("Clear search history?")){

      localStorage.removeItem("history");
        displayHistory();

    }

});