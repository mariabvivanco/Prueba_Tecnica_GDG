import React, { useEffect, useContext ,useState } from "react";
import {useHistory} from 'react-router-dom'
import { Layout } from "antd";
import { withRouter } from "react-router";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import VideoOnly from "./VideoOnly";

const VideoBlog=({videos}) =>{
    const { Content, Footer } = Layout;
    //const { usuario } = useContext(Auth);
    const [nombre, setnombre] = useState(null)
    const history= useHistory()
;
    return(

   
        <>                
                {console.log(videos)}
               {videos && videos.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
        
                return (
                <Card style={{ width: '18rem' }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" />*/ }
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
                <Card.Body>
                <Card.Title>{doc.Title}</Card.Title>
                <Card.Text>
                    {doc.Description}
                </Card.Text>
                <Button variant="primary" onClick={()=>{
                    console.log(doc)
                    history.push('/videoonly/'+doc)
                    ///<VideoOnly video={doc}></VideoOnly>
                }}>Ver Video</Button>
                 </Card.Body>
                </Card>)

})}
               
        </>
    )}
       
                
            
        
    


export default VideoBlog;