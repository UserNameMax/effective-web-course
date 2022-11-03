let count = localStorage.getItem("count") ?? 0;
let timer = setInterval(nextImage, 5000);
document.getElementById("img").src = "images//img" + count + ".jpg";

document.getElementById("d1").onclick = lastImage;

function lastImage() {
  count = (count + 2) % 3;
  document.getElementById("img").src = "images//img" + count + ".jpg";
  clearInterval(timer);
  timer = setInterval(nextImage, 5000);
}

document.getElementById("d2").onclick = nextImage;

function nextImage() {
  count = (count + 1) % 3;
  document.getElementById("img").src = "images//img" + count + ".jpg";
  clearInterval(timer);
  timer = setInterval(nextImage, 5000);
}

document.addEventListener("keydown", function (event) {
  switch (event.code) {
    case "Space":
    case "ArrowRight":
      nextImage();
      break;
    case "ArrowLeft":
      lastImage();
      break;
  }
});

window.onunload = function (event) {
  localStorage.setItem("count", count);
};
