import logoImg from './assets/logo_solvro_mono.png'
import Filters from './Filters';
import Modal from './Modal'
import { useRef, useState } from 'react';


export default function Header({func, dataFilter}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const inputRef = useRef();

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    function searchfun(){
      func.srch(inputRef.current.value);
    }


    return(
        <header id="header1">
             <div id="description" >
             <img src={logoImg} alt="SolvroLogo"/>
                    <h1>Solvro Cocktails</h1>

             </div>
             <nav>
              <input className='inputFilter' ref={inputRef}></input>
              <button className="buttonFilter" onClick={searchfun}> search</button>
              <button className="buttonFilter" onClick={func.fav}>{`<3`}</button>
              <button className="buttonFilter" onClick={func.all}>all</button>
                <button className="buttonFilter" onClick={openModal}> filters </button>
                
                <Filters open={isModalOpen} onClose={closeModal} onSelect={func.fltr} dataFilter={dataFilter}></Filters>
             </nav>
        </header>
    )
}