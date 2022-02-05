import React, { useEffect, useContext ,useState, useRef} from "react";
import { Layout } from "antd";
import { withRouter } from "react-router";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import AddVideo from '../components/AddVideo'
import VideoBlog from "./Videoblog";
import { getStorage, uploadBytes } from "firebase/storage";
import { ref as refStorage, getDownloadURL } from "firebase/storage";
import { doc, getFirestore, setDoc, addDoc,collection, getDocs } from "firebase/firestore";
import "../styles/Dashboard.css"
import {appContext} from "../App"
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";

const Dashboard=({tryLogin}) =>{
    const { Content, Footer } = Layout;
    //const { usuario } = useContext(Auth);
    const [nombre, setnombre] = useState(null)
    const [show, setShow] = useState(false);
    const [videoSelect, setVideoSelect] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {isLogged} = useContext(appContext);
    const {nameUser} = useContext(appContext);

    const countrylist =  ['Estados Unidos', 'Rusia', 'China', 'Alemania', 'Reino Unido', 'Francia','Canadá', 'Suiza', 
    'Australia', 'Turquía', 'Italia', 'España', 'Suiza','Bélgica', 'Brasil', 'Chile', 'Venezuela', 'Cuba', 'Argentina',
    'México', 'Uruguay', 'Paraguay']
    const countrysort=countrylist.sort()
    const countryoption = new Array(countrysort.map((option,key) =>  <option key={key} value={option}>{option}</option>))

    const categorylist =  ['Ensaladas', 'Postres', 'Carnes', 'Frutas', 'Entrantes']
    const categorysort=categorylist.sort()
    const categoryoption = new Array(categorysort.map((option,key) =>  <option key={key} value={option}>{option}</option>))
    
    const initVideo={
        title:'',
        description:'',
        category:'',
        country:'',
        videoUrl:''
    }

    const [newVideo,setNewVideo]=useState(initVideo)
    const [videos,setVideos]=useState([])

    const titleRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();
    const countryRef = useRef();
    const videoRef = useRef();

    async function changeVideo(video, e){
       
        const storage = getStorage();

        const storageRef = refStorage(storage, 'videos/'+video.name);
        
        
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, video).then((snapshot) => {
            
        });
        const url = await getDownloadURL(storageRef);
        console.log(url)
        const tempVideo = newVideo;
        tempVideo.videoUrl = url;
        setNewVideo(tempVideo);
      
        setVideoSelect(true)
        
                
        }

   

     async function writeUserData(id, title, description, category, country, videoUrl) {
        const db = getFirestore();
        //const reference = ref(db, 'Videos/' + id)
        try {
            const docRef = await addDoc(collection(db, "Videos"), {
            Id : id, 
            Title: title, 
            Description: description, 
            Category: category, 
            Country: country,
            Video: videoUrl
        })
    }catch (e) {
        console.error("Error adding document: ", e);
}}
    

   
    async function read(){
        const db = getFirestore();
        const videosLoad = await getDocs(collection(db, "Videos"));
        const tempVideos = [];
        videosLoad.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          tempVideos.push(doc.id, doc.data())
        });
        setVideos(tempVideos);

    }

    useEffect(() => {
        //writeUserData(2,"titulo4","descripcion4","categoria4","cuba4","");
        read();
        
        /*titleRef.current.value='';
        descriptionRef.current.value ='';
        categoryRef.current.value='';
        countryRef.current.value='';
        videoRef.current.value='';
        setVideoSelect(false);*/
      
       
    }, []);

    
        return (
            <div className="Container">
            <div className="Dashboard">
            
            <div class='row'>
                <div class ='row'>
                    <div class='col-7'>
                        <div id="title">
                                <h2 id="title">VideoBlog<span id="student">|Cocina</span></h2>
                                                                                          
                        </div>

                    </div>
                    <div class='col-3'>
                        
                    </div>
                    <div class='col-2'>
                        {!isLogged ? 
                            <button id="init" onClick={()=>tryLogin()}><FcGoogle></FcGoogle>  Inicia Sesión en Google</button>
                            :<label id="initname" >{nameUser}</label>}
                    </div>
                    

                </div>
                <div class ='row'>
                    <div class='col-4'>

                    </div>
                    <div class='col-7'>
                        
                    </div>
                    <div class='col-1'>
                    <Button id="add" variant="primary" onClick={()=>{handleShow()
                    }}>
                    
                        +
                    </Button>
                    </div>
                    

                </div>
                <div class='row'>
                    <VideoBlog videos={videos}></VideoBlog>
                </div>
                    <Modal className="AddVideo" show={show} onHide={handleClose}>
                        <Modal.Header  closeButton>
                            <Modal.Title>Añade tu video</Modal.Title>
                        </Modal.Header>
                    <Modal.Body>
                        <div class="row">
                            <div class='col-6'>
                                <label class="label" >Título</label>
                                                <input name="title" id="entry" type="text" ref={titleRef}  placeholder="Ej: Receta de Cerdo Asado"
                                                onChange={(event)=>{
                                                    const tempVideo = newVideo;
                                                    tempVideo.title = event.target.value;
                                                    setNewVideo(tempVideo);
                                                  }}
                                                />
                                 <label class="label" >Descripción</label>
                                                <input name="title" id="entry" type="text" ref={descriptionRef}  placeholder="Resuma de que trata su video"
                                                onChange={(event)=>{
                                                    const tempVideo = newVideo;
                                                    tempVideo.description = event.target.value;
                                                    setNewVideo(tempVideo);
                                                  }}
                                                />
                                <label class="label" >Categoría</label><br></br>
                                <select class="entry" id="countryname"  ref={categoryRef}
                                                        onChange={()=>{
                                                            const tempVideo = newVideo;
                                                            tempVideo.category = categoryRef.current.value;
                                                            setNewVideo(tempVideo);
                                                        }}>
                                                        <option value="" disabled selected hidden>Elige una categoría</option>
                                                        {categoryoption}
                                </select><br></br>

                                <label class="label" >País</label><br></br>
                                <select class="entry" id="countryname"  ref={countryRef}
                                                        onChange={()=>{
                                                            const tempVideo = newVideo;
                                                            tempVideo.country = countryRef.current.value;
                                                            setNewVideo(tempVideo);
                                                        }}>
                                                        <option value="" disabled selected hidden>Elige un país</option>
                                                        {countryoption}
                                </select><br></br>


                            </div>
                            <div class='col-6'>
                            <label>Video</label>
                                            {<div>
                                                {!videoSelect ? 
                                                    <div class='row'>
                                                            <div class="col-auto" >
                                                                <label class="custom-video-upload">
                                                                    <input name="video" id="video" class="entry" ref={videoRef} type="file" placeholder="&#xF0ee;Subir Imagen" 
                                                                        onChange={(e)=>{
                                                                            let video = e.target.files[0];
                                                                            changeVideo(video, e);}} />
                                                                    &#xF0ee;Subir Video
                                                                </label>
                                                            </div>
                                                            
                                                        </div>
                                                    :<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>}
                                            </div>}

                            </div>

                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button id="AddClose" variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button id="AddSave" variant="primary" 
                        onClick={()=>{
                            writeUserData(1, newVideo.title, newVideo.description, newVideo.category, 
                                newVideo.country, newVideo.videoUrl)}
                               }>
                        Salvar Cambios
                    </Button>
                    </Modal.Footer>
                    </Modal>
                   
            </div>
            </div>
            </div>

            
                
           
        );
    
}
export default Dashboard;