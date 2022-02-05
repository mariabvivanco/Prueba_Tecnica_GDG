import React, { useEffect, useContext ,useState } from "react";
import {useHistory} from 'react-router-dom'
import { Layout } from "antd";
import { withRouter } from "react-router";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import VideoOnly from "./VideoOnly";
import "../styles/Videoblog.css"

const VideoBlog=({videos}) =>{
    const { Content, Footer } = Layout;
    //const { usuario } = useContext(Auth);
    const [nombre, setnombre] = useState(null)
    const history= useHistory()
    const existVideo=videos;
;
    return(

   
        <>                
                {console.log(videos)}
               {existVideo && videos.map((doc) => {
          // doc.data() is never undefined for query doc snapshots
          //console.log(doc.id, " => ", doc.data());
        
                return (
                
                <Card id="VideoBlog" style={{ width: '18rem' }}>
                
                    <iframe class="embed-responsive-item" src={doc.Video} allowfullscreen></iframe>
                    <Card.Body>
                    <Card.Title>{doc.Title}</Card.Title>
                    <Card.Text>
                        {doc.Description}
                    </Card.Text>
                    <Button className="ButtonCard" id="ButtonCard" variant="primary" onClick={()=>{
                        console.log(doc)
                        history.push('/videoonly/'+doc)
                    
                }}>Ver Video</Button>
                 </Card.Body>
                </Card>
                )

})}
               
        </>
    )}
       
                
            
        
    


export default VideoBlog;