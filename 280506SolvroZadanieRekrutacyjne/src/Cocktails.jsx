import CocktailElement from "./CocktailElement";


export default function Cocktails({cocktailsData, favFun}){
    

    return (
    
    <ul id="cocktails-list">
        {cocktailsData.map(item => <CocktailElement key={item.id} cocktail={item} fun={favFun}></CocktailElement>)}
    </ul>
    )
}