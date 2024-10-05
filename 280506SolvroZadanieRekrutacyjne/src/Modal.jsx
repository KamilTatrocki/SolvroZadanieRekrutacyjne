import { useEffect, useRef } from 'react';
import {createPortal} from 'react-dom';

export default function Modal({children, open, className=' '}){
    const dialog = useRef();
    useEffect(() => {
        const currentDialog = dialog.current;
    
        
        const preventClose = (event) => {
          event.preventDefault();
        };
    
        if (currentDialog) {
          currentDialog.addEventListener('cancel', preventClose); 
        }
    
        if (open) {
          currentDialog.showModal();
        } else {
          currentDialog.close();
        }
    
        
        return () => {
          if (currentDialog) {
            currentDialog.removeEventListener('cancel', preventClose); 
          }
        };
      }, [open]);
    return createPortal(<dialog ref={dialog} className={`modal ${className}`}>{children}</dialog>, document.getElementById("modal"))
}