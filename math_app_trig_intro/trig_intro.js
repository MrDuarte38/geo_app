let canvas = document.getElementById("my_canvas");
let context = canvas.getContext("2d");
canvas.width = 500;
canvas.height= 400;

let draw_color = "black";
let draw_width = "2";
let is_drawing = false;

let next_problem = false;
let button_next = document.getElementById("btn_next");
button_next.style.visibility = "hidden";


class Problem{
    constructor(file,answer,directions)
    {
        this.file = file;
        this.answer = answer;
        this.directions = directions;
    }

    get_file()
    {
        return this.file;
    }

    get_answer()
    {
        return this.answer;
    }

    get_directions()
    {
        return this.directions;
    }
}

let problem_count = 20;
let current_problem = 0;

let filenames =  ["./images/problem0.PNG","./images/problem1.PNG",
                  "./images/problem2.PNG","./images/problem3.PNG",
                  "./images/problem4.PNG","./images/problem5.PNG",
                  "./images/problem6.PNG","./images/problem7.PNG",
                  "./images/problem8.PNG","./images/problem9.PNG",
                  "./images/problem10.PNG","./images/problem11.PNG",
                  "./images/problem12.PNG","./images/problem13.PNG",
                  "./images/problem14.PNG","./images/problem15.PNG",
                  "./images/problem16.PNG","./images/problem17.PNG",
                  "./images/problem18.PNG","./images/problem19.PNG"];

let c = "cos";
let s = "sin";
let t = "tan";

let answers = [c,t,c,c,s,c,t,s,t,t,s,s,t,t,c,c,t,s,s,t];

let problem_directions = "Choose the trigonometic equation that could solve the problem. "
const problem_list = [];


for(let i=0;i<problem_count;i++)
{
    let problem = new Problem(filenames[i],answers[i],problem_directions);
    problem_list.push(problem);
}


let direction_element = document.getElementById("directions");
direction_element.textContent = problem_directions;

var img = new Image();
img.src = problem_list[0].get_file();
img.onload = function(){
    context.drawImage(img,0,0);
}

//canvas.addEventListener("touchstart",start,false);
//canvas.addEventListener("touchmove",draw,false);
canvas.addEventListener("mousedown",start,false);
canvas.addEventListener("mousemove",draw,false);

canvas.addEventListener("mouseup",stop,false);
canvas.addEventListener("mouseout",stop,false);



function start(event)
{
    is_drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft,
                    event.clientY - canvas.offsetTop-20);
    event.preventDefault();
}

function draw(event)
{
    if(is_drawing == true)
    {
        context.lineTo(event.clientX - canvas.offsetLeft,
            event.clientY - canvas.offsetTop-20);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();

    }
}

function stop(event){
    if(is_drawing){
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    event.preventDefault();
}

let green1 = document.getElementById("green");
let blue1 = document.getElementById("blue");
let red1 = document.getElementById("red");
let yellow1 = document.getElementById("yellow");
let orange1 = document.getElementById("orange");
let black1 = document.getElementById("black");
let white1 = document.getElementById('white');

green1.addEventListener("click",green_clicked);
blue1.addEventListener("click",blue_clicked);
red1.addEventListener("click",red_clicked);
yellow1.addEventListener("click",yellow_clicked);
orange1.addEventListener("click",orange_clicked);
black1.addEventListener("click",black_clicked);
white1.addEventListener("click",white_clicked);

function green_clicked()
{   draw_color = "green"; }

function blue_clicked()
{   draw_color = "blue";}

function red_clicked()
{   draw_color = "red";}

function yellow_clicked()
{   draw_color = "yellow"; }

function orange_clicked()
{   draw_color = "orange";}

function black_clicked()
{   draw_color = "black";}

function white_clicked()
{
    draw_color = "white";
}

let btn_clear = document.getElementById("btn_clear");
let btn_save = document.getElementById("btn_save");

btn_clear.addEventListener("click", erase);
btn_save.addEventListener("click",save);

function erase() {
    var m = confirm("Want to clear");
    if (m) {
        img.src = problem_list[current_problem].get_file();
        context.fillStyle = "white";
        context.clearRect(0,0,canvas.width,canvas.height);
        context.fillRect(0,0,canvas.width,canvas.height);
        context.drawImage(img,0,0);
        document.getElementById("canvasimg").style.display = "none";
    }
}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "flex";
}


let button_sin = document.getElementById("btn_sin");
button_sin.addEventListener("click",sin_clicked);
let button_cos = document.getElementById("btn_cos");
button_cos.addEventListener("click",cos_clicked);
let button_tan = document.getElementById("btn_tan");
button_tan.addEventListener("click",tan_clicked);


button_next.addEventListener("click",next_clicked);
let consecutive_correct = 0;
let textbox_correct = document.getElementById("num_correct");



function sin_clicked()
{
    if(button_sin.value == problem_list[current_problem].get_answer())
    {
        console.log("Correct");
        button_next.style.visibility = "visible";
        consecutive_correct++;
    }
    else
    {
        console.log("Incorrect");
        consecutive_correct = 0;
    }
    textbox_correct.textContent = "Consecutive Correct = " + consecutive_correct;
}

function cos_clicked()
{
    if(button_cos.value == problem_list[current_problem].get_answer())
    {
        console.log("Correct");
        button_next.style.visibility = "visible";
        consecutive_correct++;
    }
    else
    {
        console.log("Incorrect");
        consecutive_correct++;
    }

    textbox_correct.textContent = "Consecutive Correct = " + consecutive_correct;
}

function tan_clicked()
{
    if(button_tan.value == problem_list[current_problem].get_answer())
    {
        console.log("Correct");
        button_next.style.visibility = "visible";
        consecutive_correct++;
    }
    else
    {
        console.log("Incorrect");
        consecutive_correct=0;
    }
    textbox_correct.textContent = "Consecutive Correct = " + consecutive_correct;
}

function next_clicked()
{
    current_problem = current_problem + 1;
    erase();
    button_next.style.visibility = "hidden";
    input.value = "";
}
