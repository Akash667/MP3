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
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    let img = new Image();
    let filename = "";

    const uploadBtn = document.getElementById("uploadfile") as HTMLInputElement;

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
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            canvas.removeAttribute("data-caman-id");
          };
        },
        false
      );
    });
  });

  return (
    <div className={styles.app}>
      <Paper elevation={4} className={`${styles.menu} ${styles.box}`}>
        <label className={`${styles.uploadlabel}`}>
          <Button>
            <input
              type="file"
              id="uploadfile"
              className={`${styles.uploadbtn}`}
            ></input>
          </Button>
        </label>

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
