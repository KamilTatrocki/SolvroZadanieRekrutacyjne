import CocktailElement from "./CocktailElement";
import Cocktails from "./Cocktails"
import { useState, useEffect } from "react"
import Header from "./Header";


function App() {
  const [loadedCocktails, setLoadedCocktails] = useState([])
  const [favouriteCocktails, setFavouriteCocktails] = useState([]);
  const [displayedCoctails, setDisplayedCocktails] = useState([]);
  const [categories, setCategories] = useState([]);
  const [glasses, setGlasses] = useState([]);

  function displayAllCocktails(){
    setDisplayedCocktails(loadedCocktails);
  }
  function displayFavouriteCocktails(){
    setDisplayedCocktails(favouriteCocktails);
  }
  function addOrRemoveToFavourite(element, isFav)
  {
    
    if(isFav){
      setFavouriteCocktails((prev) => [...prev, element  ] );
    }
    else
    {
      setFavouriteCocktails((prev) =>
        prev.filter((item) => item.id !== element.id)
      );
    }    
  }
  function filterCocktails(category, glass)
  {
 
    
    if(category==='any' && glass==="any")
    {
      displayAllCocktails();
    }
    else if(category==='any'){
      setDisplayedCocktails(
        loadedCocktails.filter(drink => 
          drink.glass===glass
       )
       );
    }
    else if(glass==='any')
    {
      setDisplayedCocktails(
        loadedCocktails.filter(drink => 
         drink.category === category
       )
       );
    }
    else{
      setDisplayedCocktails(
       loadedCocktails.filter(drink => 
        drink.category === category && drink.glass===glass
      )
      );
    }
   
  }
  function search(name){
    setDisplayedCocktails(
      loadedCocktails.filter(
        (item) => item.name.includes(name)
      )
    );
  }



  useEffect(()=> {
      async function fetchCocktails(){
          const response = await fetch('https://cocktails.solvro.pl/api/v1/cocktails?page=1&perPage=220')
          const data = await response.json();
          setLoadedCocktails(data.data);
          setDisplayedCocktails(data.data);

          const responseGlasses = await fetch('https://cocktails.solvro.pl/api/v1/cocktails/glasses')
          const dataGlasses = await responseGlasses.json();
          setGlasses(dataGlasses.data);

          const responseCategories = await fetch('https://cocktails.solvro.pl/api/v1/cocktails/categories')
          const dataCategories = await responseCategories.json();
          setCategories(dataCategories.data);


      }
      fetchCocktails();
  
  }, []);





  return (
    <>
      <Header func={
        {
          all: displayAllCocktails,
          fav: displayFavouriteCocktails,
          fltr: filterCocktails,
          srch: search,
        }
        
      }
      dataFilter={{category: categories, glass: glasses,}}


      ></Header>
      <Cocktails cocktailsData={displayedCoctails} favFun={addOrRemoveToFavourite}></Cocktails> 
      
    </>
  )
}

export default App
