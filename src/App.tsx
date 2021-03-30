import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import styles from "./App.module.css";
import {
  Button,
  Card,
  CardContent,
  Input,
  Paper,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import { Animated } from "react-animated-css";

function App() {
  const [press, setPress] = useState(false);
  const [valueHook, setValueHook] = useState(20);

  useEffect(() => {
    function drawImageScaled(img:HTMLImageElement, ctx: CanvasRenderingContext2D) {
      var canvas = ctx.canvas ;
      var hRatio = canvas.width  / img.width    ;
      var vRatio =  canvas.height / img.height  ;
      var ratio  = Math.min ( hRatio, vRatio );
      var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
      var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
      ctx.clearRect(0,0,canvas.width, canvas.height);
      ctx.drawImage(img, 0,0, img.width, img.height,
                         centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  
   
      console.log(img)
   }
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    let img = new Image();
    let filename = "";

    const uploadBtn = document.getElementById("uploadfile") as HTMLInputElement;

    const menuDiv = document.getElementById("menu") as HTMLDivElement;

    uploadBtn.addEventListener("change", (e) => {
      const uploadFile = document.getElementById(
        "uploadfile"
      ) as HTMLInputElement;

      const imageFiles = uploadFile.files as FileList;

      const file = imageFiles[0] as File;

      const reader = new FileReader();

      if (file) {
        filename = file.name;

        reader.readAsDataURL(file);
      }

      reader.addEventListener(
        "load",
        () => {
          //create image
          img = new Image();
          img.src = reader.result as string;

          img.onload = function () {
            // let height = canvas!.parentElement!.clientHeight;
            // let width = canvas!.parentElement!.clientWidth;

            // let ratio = img.width / img.height;

            // if (img.width > img.height) {
            //   if (img.width > canvas!.parentElement!.clientWidth) {
            //     width = canvas!.parentElement!.clientWidth - 10;
            //     height = width / ratio;
            //   }
            // } else if (img.height > canvas!.parentElement!.clientHeight) {
            //   height = canvas!.parentElement!.clientHeight - 10;
            //   width = height * ratio;
            // }

            canvas.width = canvas!.parentElement!.clientWidth*0.95;

            canvas.height = canvas!.parentElement!.clientHeight*0.95;

            // ctx.drawImage(
            //   img,
            //   0,
            //   0,
            //   img.width,
            //   img.height,
            //   0,
            //   0,
            //   width,
            //   height
            // );
              drawImageScaled(img,ctx);
            canvas.removeAttribute("data-caman-id");
          };
        },
        false
      );
    });

    // window.addEventListener("resize", () => {
    //   if (canvas.width < menuDiv.offsetWidth) {
    //     canvas.width = menuDiv.offsetWidth;
    //   }

    //   if (canvas.height < menuDiv.offsetHeight) {
    //     canvas.height = menuDiv.offsetHeight;
    //   }

    //   ctx.drawImage(img,0,0,img.width,img.height,0,0, menuDiv.offsetWidth, menuDiv.offsetHeight)
    // });
  });

  return (
    <div className={styles.app}>
      <label className={`${styles.uploadlabel}`}>
        <Button>
          <input
            type="file"
            id="uploadfile"
            className={`${styles.uploadbtn}`}
          ></input>
        </Button>
      </label>

      <Paper elevation={4} id="menu" className={`${styles.menu} ${styles.box}`}>
        <canvas className={styles.canva} id="canvas"></canvas>
      </Paper>

      <Paper
        elevation={4}
        className={`${styles.menu} ${styles.toolbar}`}
      ></Paper>
    </div>
  );
}

export default App;
