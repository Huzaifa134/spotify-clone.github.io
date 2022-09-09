console.log("Welcome to spotify");

//Initialize the variable
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myprogressBar = document.getElementById("myprogressbar");
let gif = document.getElementById("gif");
let mastersongName = document.getElementById("masterSongName");

let songItem = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Ramdom",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  { songName: "Beauty", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "My world", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "Birthday", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Random 2", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "Random 3", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "Random 4", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Random 5", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Random 6", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  {
    songName: "Random 7",
    filePath: "songs/10.mp3",
    coverPath: "covers/10.jpg",
  },
];
songItem.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//  audioElement.play();

//Handle play/pause click
masterPlay.addEventListener("click", (e) => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;

    
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});
audioElement.addEventListener("timeupdate", () => {
  // updateSeeker
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myprogressBar.value = progress;
});

myprogressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myprogressBar.value * audioElement.duration) / 100;
});
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
    
      mastersongName.innerText=songs[songIndex].songName;
      if (audioElement.paused || audioElement.currentTime <= 0) {
          audioElement.src = `songs/${songIndex+1}.mp3`;
          audioElement.play();
          e.target.classList.remove("fa-circle-play");
          e.target.classList.add("fa-circle-pause");
          gif.style.opacity = 1;
          masterPlay.classList.remove("fa-circle-play");
          masterPlay.classList.add("fa-circle-pause");
      } else {
        audioElement.pause();
        e.target.classList.remove("fa-circle-pause");
        e.target.classList.add("fa-circle-play");
        masterPlay.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        gif.style.opacity = 0;
      }
    

  
      
    });



}
);

document.getElementById("next").addEventListener('click', () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.currentTime = 0;
  mastersongName.innerText=songs[songIndex].songName;

  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener('click', () => {
  if (songIndex <= 0) {
    songIndex = 9;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  mastersongName.innerText=songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});
