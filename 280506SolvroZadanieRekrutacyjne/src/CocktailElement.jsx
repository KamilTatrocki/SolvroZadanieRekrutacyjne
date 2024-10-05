import Modal from "./Modal";
import { useState } from "react";

export default function CocktailElement ({cocktail, fun}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [isFav, setIsFav] = useState(false);
    
    async function fetchMeals(){
        const response = await fetch(`https://cocktails.solvro.pl/api/v1/cocktails/${cocktail.id}`)
        const data = await response.json();
      
        setIngredients(data.data.ingredients);
    }

    const openModal = () => {
        fetchMeals();


        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

    return <li className="cocktail-item">
        <article>
            <img src={cocktail.imageUrl}></img>
            <div>
            <h3>{cocktail.name} {isFav&& '<3'}</h3>
            <p className="cocktail-item-alcohol">{cocktail.alcoholic? "contains alcohol": "does not contain alcohol"}</p>
            <p className="cocktail-item-description">{cocktail.category}<br></br>{cocktail.glass}</p>
            <p>
            <button className="instruction-button" onClick={openModal}>show instruction</button>
            <Modal open={isModalOpen} >
                <h2>{cocktail.name}</h2>
                <h3>ingredients:</h3>
                    
                
                <ul>
                    {ingredients.length >0 && ingredients.map(item => <li key={item.id}>{item.name} </li>)}
                </ul>
                <h3>instruction:</h3>
                <p>
                    {cocktail.instructions}
                </p>
                
                
                <button onClick={closeModal}>Close</button>
            </Modal>
            </p>

            <p>
            <button className="favourite-button" onClick={()=>
                {
                   
                    fun(cocktail, !isFav);
                     setIsFav(prev => !prev);
                }
            }>{isFav? 'remove from <3':'add do <3'}</button>
            </p>

        </div>
       
        </article>
    </li>
}