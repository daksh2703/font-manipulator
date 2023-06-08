NoseX = 0;
NoseY = 0;
LeftWristX = 0;
RightWristX = 0;
difference = 0;
display_text;
text_colour = "white";

function setup(){
canvas = createCanvas(500,400);
canvas.position(900,250);
video = createCapture(VIDEO);
video.position(90,250);
video.size(500,400);
posenet = ml5.poseNet(video,modelReady);
posenet.on('pose',gotPoses);
}

function modelReady(){
    console.log("Model is working");
}

function gotPoses(result){
    if (result.length > 0){
        console.log(result);
        NoseX = result[0].pose.nose.x;
        NoseY = result[0].pose.nose.y;
        LeftWristX = result[0].pose.leftWrist.x;
        RightWristX = result[0].pose.rightWrist.x;
        difference = Math.floor(LeftWristX - RightWristX);
        display_text = document.getElementById("display_text").value;
        document.getElementById("font_size").innerHTML = "The size of font is " + difference + "px";
        console.log(NoseX,NoseY);
        if(NoseX >= 100){
            text_colour = "yellow";
        }
        if(NoseX >= 200){
            text_colour = "red";
        }
        if(NoseX >= 300){
            text_colour = "green";
        }
        if(NoseX >= 400){
            text_colour = "blue";
        } 
    }
}

function draw(){
    background("khaki");
    text(display_text,30,300);
    textSize(difference);
    fill(text_colour); 
}