import React, { useEffect , useRef ,useState} from 'react'
import canvasImages from "./canvasimages"
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

function Canvas({details}) {
  const {startIndex , numImages,duration} = details;
    const [index, setIndex] = useState({value:startIndex});
    const canvasRef = useRef(null);
    useGSAP(() => {
        gsap.to(index, {
            value: details.startIndex + details.numImages -1,
            duration: details.duration,
            repeat: -1,
            ease: "linear",
            onUpdate:()=>{
                setIndex({value:Math.round(index.value)});
            },
    });
    });
 
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = canvasImages[index.value];
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            }
    }, [index]);


  return (
    <canvas ref ={canvasRef} 
    style={{
      width: `${size * 1.8}px`,
      height: `${size * 1.8}px`,
      top: `${top}%`,
      left: `${left}%`,
      zIndex: `${zIndex}`,
    }}

    id = "canvas">
    </canvas>
  );
}
export default Canvas
