import React, { useEffect, useContext ,useState} from "react";
import { Layout } from "antd";
import { withRouter } from "react-router";
import Button from 'react-bootstrap/Button';
import AddVideo from '../components/AddVideo'

const Dashboard=({tryLogin}) =>{
    const { Content, Footer } = Layout;
    //const { usuario } = useContext(Auth);
    const [nombre, setnombre] = useState(null)

    useEffect(() => {
      
       
    }, []);

    
        return (
            
            <div class='row'>
                <div class ='row'>
                    <div class='col-3'>

                    </div>
                    <div class='col-6'>
                        
                    </div>
                    <div class='col-3'>
                        <button onClick={()=>tryLogin()}>Logueo con google</button>
                    </div>
                    

                </div>
                <div class ='row'>
                    <div class='col-4'>

                    </div>
                    <div class='col-7'>
                        
                    </div>
                    <div class='col-1'>
                    <Button variant="primary" onClick={()=>{<AddVideo></AddVideo>}}>
                        Launch demo modal
                    </Button>
                    </div>
                    

                </div>
                   
            </div>

            
                
           
        );
    
}
export default Dashboard;