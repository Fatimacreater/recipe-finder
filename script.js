let inp = document.querySelector("#inp");
let search = document.querySelector("#btn");
let recipes = document.querySelector("#recipes");


 async function getrecipe() {
             let value = inp.value.trim();
             let mesg = document.createElement("h2");
            mesg.textContent = "Loading...";
            recipes.appendChild(mesg);

            const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
           try{            
             const recipe = await fetch(url);
            if(!recipe.ok){throw new Error("Request Failed");}
            let data = await recipe.json();
            
            if(data.meals){
                recipes.removeChild(mesg);
                
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
                })            
            }
            else{
                let nothing = document.createElement("h2");                    
                nothing.textContent = "no recipe is found";
                recipes.removeChild(mesg);
                recipes.appendChild(nothing);
            }
           
        }
            
            catch(err){
            recipes.innerHTML = "";
            console.log(err);
            let error = document.createElement("h2");
            error.textContent = "Something went wrong";
            recipes.appendChild(error);

           }
           
              }


search.addEventListener("click" , function(){
   
    if(inp.value.trim() === ""){alert("write something"); return};

    recipes.innerHTML = "";

    getrecipe();
    inp.value = "";
})