import React, {useEffect, useState} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import  '../styles/Videoonly.css'




const VideoOnly = () => {
    const {idvideo} = useParams();
    const [video, setVideo]= useState();
    const [existVideo, setExistVideo]=useState(false);
    const history= useHistory()

async function uploadVideo(idvideo){
    const db = getFirestore();
    const docRef = doc(db, "Videos", idvideo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        setVideo(docSnap.data());
        setExistVideo(true);
    }

}

    useEffect(() => {
        uploadVideo(idvideo)
        
    },[]);

    return (
        existVideo&&<div>
            <Card  >
                <iframe className="embed-responsive-item VideoOnly" src={video.Video} allowfullscreen></iframe>
                <Card.Body>
                    <Card.Title>{video.Title}</Card.Title>
                    <Card.Text>
                        {video.Description}
                    </Card.Text>
                    <Button id="ButtonCardOnly" variant="primary" 
                        onClick={()=>{
                            history.push('/dashboard')}}>
                        Cerrar
                    </Button>
                 </Card.Body>
            </Card>
        </div>
       
    )}


export default VideoOnly;
