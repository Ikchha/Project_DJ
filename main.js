song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;

status = "";

function preload() {
    song1 = loadSound("DieForYou.mp3");
    song2 = loadSound("yes_and.mp3");
}
function setup() {
    canvas =  createCanvas(600, 500);
    canvas = canvas.center();

    video = creatCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("Model is initialized!")
}
function gotPoses(results) {
    if(results.length>0) {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
       
    }

}

function draw() {
    image(video, 0, 0, 600, 500);
    status = song1.play();
    fill("#cc1b14");
    stroke("#faf3f2");
    
    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(status != song1.isPlaying()){
            song1.play();
            document.getElementById("heading1").innerHTML = song1;

        }


    }
}