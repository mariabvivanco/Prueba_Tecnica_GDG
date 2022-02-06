import React, { useEffect, useContext ,useState, useRef} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import VideoBlog from "./Videoblog";
import { getStorage, uploadBytes } from "firebase/storage";
import { ref as refStorage, getDownloadURL } from "firebase/storage";
import { getFirestore, setDoc, addDoc,collection, getDocs, query, where } from "firebase/firestore";
import "../styles/Dashboard.css"
import {appContext} from "../App"
import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { FcVideoFile } from "@react-icons/all-files/fc/FcVideoFile";



const Dashboard=({tryLogin}) =>{
    //const { Content, Footer } = Layout;
    //const { usuario } = useContext(Auth);
    //const [nombre, setnombre] = useState(null)
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [videoSelect, setVideoSelect] = useState(false);
    

    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true)
                                initModal()};

    const {isLogged} = useContext(appContext);
    const [loggin, setLoggin] = useState(isLogged);

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
    const findCountryRef = useRef();
    const findCategoryRef = useRef();

    async function changeVideo(video, e){
       
        const storage = getStorage();
        const storageRef = refStorage(storage, 'videos/'+video.name);
        const response = await uploadBytes(storageRef, video);
        const url = await getDownloadURL(storageRef);
        console.log(url)
        const tempVideo = newVideo;
        tempVideo.videoUrl = url;
        setNewVideo(tempVideo);
        setVideoSelect(true);
        setLoading(false);
                
        }

   

     async function writeUserData(id, title, description, category, country, videoUrl) {
        const db = getFirestore();
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
            const tempvideo = {};
            tempvideo.data=doc.data();
            tempvideo.id=doc.id;
            tempVideos.push(tempvideo)
        });
        setVideos(tempVideos);

    }

    function initModal() {
        
        titleRef.current.value="";
        descriptionRef.current.value ='';
        categoryRef.current.value='';
        countryRef.current.value='';
        videoRef.current.value='';
        setNewVideo(initVideo);

    }

    async function findCountry(country) {
        const db = getFirestore();
        const q = query(collection(db, "Videos"), where("Country", "==", country));

        const videosLoad = await getDocs(q);
        const tempVideos = [];
        videosLoad.forEach((doc) => {
            const tempvideo = {};
            tempvideo.data=doc.data();
            tempvideo.id=doc.id;
            tempVideos.push(tempvideo)
        });
        setVideos(tempVideos);
        
    }

    async function findCategory(category) {
        const db = getFirestore();
        const q = query(collection(db, "Videos"), where("Category", "==", category));

        const videosLoad = await getDocs(q);
        const tempVideos = [];
        videosLoad.forEach((doc) => {
            const tempvideo = {};
            tempvideo.data=doc.data();
            tempvideo.id=doc.id;
            tempVideos.push(tempvideo)
        });
        setVideos(tempVideos);
        
    }
    

    useEffect(() => {
        
        read();
                      
       
    }, [videos]);

    
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
                    <div class='col-2'>
                        
                    </div>
                    <div class='col-2'>
                        {!loggin ? 
                            !loggin&&<button id="init" onClick={
                                ()=>{tryLogin()
                                    setLoggin(true)}}><FcGoogle></FcGoogle>  Inicia Sesión en Google</button>
                            :loggin&&<>
                                <label id="initName" >{nameUser}</label>
                                <button id="init" onClick={
                                    ()=>{localStorage.setItem("login_data", '')
                                    setLoggin(false)}}><FcGoogle></FcGoogle>Cierre Sesión en Google</button>
                            </>}
                    </div>
                    <div class='col-1'>
                    {loggin&&<Button id="add" variant="primary" onClick={()=>{handleShow()
                    }}>+
                    </Button>}
                    </div>
                    

                </div>
                <div class ='row'>
                    <div class='col-auto'>
                        <label classname="label" ></label><br></br>
                                <select className="entry" id="findcountry"  ref={findCountryRef}
                                        onChange={()=>{
                                            findCountry(findCountryRef.current.value);
                                                                
                                        }}>
                                        <option value="" disabled selected hidden>Busque recetas de un país</option>
                                                            {countryoption}
                                </select><br></br>

                    </div>
                    <div class='col-auto'>
                        <label classname="label" ></label><br></br>
                                <select className="entry" id="findcategory"  ref={findCategoryRef}
                                        onChange={()=>{
                                            findCategory(findCategoryRef.current.value);
                                                            
                                        }}>
                                        <option value="" disabled selected hidden>Busque recetas de una categoría</option>
                                {categoryoption}
                                </select><br></br>

                    </div>
                    
                        
                
                    
                    

                </div>
                <div class='row'>
                    <VideoBlog videos={videos}></VideoBlog>
                </div>
                    <Modal id="AddVideo" show={show} onHide={handleClose}>
                        <Modal.Header  closeButton>
                            <Modal.Title>Añade tu video</Modal.Title>
                        </Modal.Header>
                    <Modal.Body>
                        <div class="row">
                            <div class='col-6'>
                                <label className="label" >Título</label>
                                                <input name="title" id="entry" type="text" ref={titleRef}  placeholder="Ej: Receta de Cerdo Asado"
                                                onChange={(event)=>{
                                                    const tempVideo = newVideo;
                                                    tempVideo.title = event.target.value;
                                                    setNewVideo(tempVideo);
                                                  }}
                                                />
                                 <label className="label" >Descripción</label>
                                                <input name="title" id="entry" type="text" ref={descriptionRef}  placeholder="Resuma de que trata su video"
                                                onChange={(event)=>{
                                                    const tempVideo = newVideo;
                                                    tempVideo.description = event.target.value;
                                                    setNewVideo(tempVideo);
                                                  }}
                                                />
                                <label className="label" >Categoría</label><br></br>
                                <select className="entry" id="countryname"  ref={categoryRef}
                                                        onChange={()=>{
                                                            const tempVideo = newVideo;
                                                            tempVideo.category = categoryRef.current.value;
                                                            setNewVideo(tempVideo);
                                                        }}>
                                                        <option value="" disabled selected hidden>Elige una categoría</option>
                                                        {categoryoption}
                                </select><br></br>

                                <label classname="label" >País</label><br></br>
                                <select className="entry" id="countryname"  ref={countryRef}
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
                                                                <label class="custom-video-upload" id="buttonvideo">
                                                                    <input name="video" id="buttonvideo" class="entry" ref={videoRef} type="file" 
                                                                        onChange={(e)=>{
                                                                            let video = e.target.files[0];
                                                                            setLoading(true);
                                                                            changeVideo(video, e);
                                                                            setVideoSelect(true)}} />
                                                                    <FcVideoFile></FcVideoFile>   Subir Video
                                                                </label>
                                                            {loading&&<label>Cargando Video</label>}
                                                            </div>
                                                            
                                                    </div>
                                                    :<iframe class="embed-responsive-item" src={newVideo.videoUrl} allowfullscreen></iframe>}
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