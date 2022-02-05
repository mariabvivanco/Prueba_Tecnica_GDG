import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import { useHistory, useParams } from 'react-router-dom';
import { doc, getDoc, getFirestore } from "firebase/firestore";
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
        console.log("Document data:", docSnap.data());
        setVideo(docSnap.data());
        setExistVideo(true);
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }

    }

    useEffect(() => {
        uploadVideo(idvideo)
        
    },[]);

    return (
        existVideo&&<div>
            <div>
                           
                
                <Card  >
                <iframe className="embed-responsive-item VideoOnly" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
                <Card.Body>
                <Card.Title>{video.Title}</Card.Title>
                <Card.Text>
                    {video.Description}
                </Card.Text>
                <Button variant="primary" onClick={()=>{history.push('/dashboard')}}>Cerrar</Button>
                 </Card.Body>
                </Card>
                </div>
            
        </div>
    )}


export default VideoOnly;
