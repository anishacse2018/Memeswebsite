import React,{useState,useEffect,useRef} from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './Home.css';
import {Rnd} from 'react-rnd';
function Home(){
    const[memes,setMemes]=useState([]);
    const[click,setClick]=useState(null);
    const[url,setUrl]=useState("");
    const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const[summary,setSummary]=useState("");
 const[display,setDisplay]=useState(false);
 const[text,setText]=useState("");

    useEffect(()=>{
        axios.get('https://api.imgflip.com/get_memes').then(res=>{
         
          setMemes(res.data.data.memes)
        }).catch(err=>{
          console.log(err);
        }
    
        )
      })  
    return(
        <div >
            {click && !display && 
             (
                
                 <>
                 <img style={{ width: 400 }} src={url}></img>
                 <br></br>
                  <input type="text"
            placeholder="top text"
            value={topText}
            onChange={e => setTopText(e.target.value)}
          />
          <input type="text"
            placeholder="bottom text"
            value={bottomText}
            onChange={e => setBottomText(e.target.value)}
          />
         <br></br>
     
      
          <button className='btn' onClick={()=>{
             setDisplay(true);
        }}>Create meme</button>
                
                 </>


             )

            }
        <>
      {!click && (<div>
            <h1>Pick a  Template</h1>
            {
             memes.map(meme=>(
             <li key={meme.id}>
             <img  style={{ width: 200 }} src={meme.url} onClick={
                 ()=>{
                  setUrl(meme.url);
                 
                  setClick(true);
                 }
                 }></img> 
            
             
             </li>
           
             ))}
         
         
             </div>)}
             </>
    <>
    {display && 
    (
        <>
            <br></br>
           <div  id="print">
           <img style={{ width: 400 }} src={url}></img>
           <Rnd
      bounds="window"
    >
<div class="wordart">{topText}</div>

    </Rnd>
    <Rnd
      bounds="window"
    >
<div class="wordart">{bottomText}</div>

    </Rnd>
    </div>
   <button className='btn' onClick={async()=>{
     const element = document.getElementById('print'),
      canvas = await html2canvas(element,{
        allowTaint: true,
        useCORS: true
    }),
      data = canvas.toDataURL('image/jpg'),
      link = document.createElement('a');
      console.log(canvas);
      link.href = data;
      console.log(data);
      link.download = 'downloaded-image.jpg';
   
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
     
   }



   }>Download</button>
 
 <button className='btn'onClick={
   async()=>{
    const element = document.getElementById('print'),
    canvas = await html2canvas(element,{
      allowTaint: true,
      useCORS: true
  }),
    data = canvas.toDataURL('image/jpg')
    setText(data);
    console.log(data);
function debugBase64(base64URL){
  var win = window.open();
  win.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
}
debugBase64(data);

   }
 }>Preview</button>
 
  
 
  <>
 
 
  );
        
  </>        
</>


    )
    
    
    
    }
    
    </>
    
   </div>
    
    
    )
}
export default Home;