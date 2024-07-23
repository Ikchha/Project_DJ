song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1_status = "";
song2_status = "";

function preload() {
    song1 = loadSound("DieForYou.mp3");
    song2 = loadSound("yes_and.mp3");
}
function setup() {
    canvas =  createCanvas(400, 400);
    canvas = canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("Model is initialized!")
}
function draw() {
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    fill("#cc1b14");
    stroke("#faf3f2");
    
    if(scoreLeftWrist>0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();

        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML = " Playing - Die For You ";

        }
    }

    if(scoreRightWrist>0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if(song2_status==false){
            song2.play();
            document.getElementById("song").innerHTML = " Playing - Yes, and? "
        }

    }
}
function gotPoses(results) {
    if(results.length>0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Left Wrist = " + scoreLeftWrist + "Score Right Wrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
       
    }

}

