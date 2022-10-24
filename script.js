 
//const { createFFmpeg } = FFmpeg;
//import { createFFmpeg, fetchFile } from "./node_modules/@ffmpeg/ffmpeg";
 const ytdl = require('ytdl-core');
// const fs = require('fs');
const delay = ms => new Promise(res => setTimeout(res, ms));

// const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// const ffmpeg = require('fluent-ffmpeg');
const peg = require('ffmpeg')
// ffmpeg.setFfmpegPath(ffmpegPath);


let url  = 'https://www.youtube.com/watch?v=KBYDh2gIZ3Y'//document.querySelector("#domTextElement1").value;//https://www.youtube.com/watch?v=KBYDh2gIZ3Y
let btn = document.querySelector('#btnbtn')
btn.addEventListener("click",
 function(){ 
        alert("Hello World!"); 
        
        peg(url, {
        format: 'mp4'
        }).pipe(fs.createWriteStream('shane.mp4'));


});