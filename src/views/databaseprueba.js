import React from 'react';
import { collection, addDoc } from "firebase/firestore";



const Databaseprueba = () => {

    useEffect(() => {
       const d1 = () => { try {
            const docRef = await addDoc(collection(db, "users"), {
              first: "Ada",
              last: "Lovelace",
              born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
        return () => {
            cleanup
        };
    }, [input]);
    return (
        <div>
            
        </div>
    );
}

export default Databaseprueba;
