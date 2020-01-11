function move(){
  if(document.getElementById("slide1")){
    var slide = document.getElementById("slide1");
    var circle1 = document.getElementById("circle1");
    var circle2 = document.getElementById("circle2");
    circle1.style.backgroundColor = "#cccccc"; 
    circle2.style.backgroundColor = "#0d0d0d";
    slide.src = "images/img2.png";
    slide.id = "slide2";
  } else if(document.getElementById("slide2")){
    var slide = document.getElementById("slide2");
    var circle1 = document.getElementById("circle2");
    var circle2 = document.getElementById("circle3");
    circle1.style.backgroundColor = "#cccccc"; 
    circle2.style.backgroundColor = "#0d0d0d";
    slide.src = "images/img3.png";
    slide.id = "slide3";
  } else if(document.getElementById("slide3")){
    var slide = document.getElementById("slide3");
    var circle1 = document.getElementById("circle3");
    var circle2 = document.getElementById("circle1");
    circle1.style.backgroundColor = "#cccccc"; 
    circle2.style.backgroundColor = "#0d0d0d";
    slide.src = "images/img1.png";
    slide.id = "slide1";
  }
}
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.body.style.backgroundColor = "white";
}

setInterval('move()', 3000);