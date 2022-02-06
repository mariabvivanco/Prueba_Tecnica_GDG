import React from "react";
import {useHistory} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import "../styles/Videoblog.css"

const VideoBlog=({videos}) =>{
    
    const history= useHistory()
    const existVideo=videos;
;
    return(
        <>                
                
            {existVideo && videos.map((video) => {
                 
                return (
                    <Card id="VideoBlog" style={{ width: '18rem' }}>
                        <iframe class="embed-responsive-item" src={video.data.Video} allowfullscreen></iframe>
                        <Card.Body>
                            <Card.Title>{video.data.Title}</Card.Title>
                            <Card.Text>
                                {video.data.Description}
                            </Card.Text>
                            <Button className="ButtonCard" id="ButtonCard" variant="primary"
                            onClick={()=>{
                                history.push('/videoonly/'+video.id)
                            }}>Ver Video</Button>
                        </Card.Body>
                    </Card>
                )

            })}
               
        </>
    )}
       
                
            
        
    


export default VideoBlog;