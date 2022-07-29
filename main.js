quick_draw_data_set=["airplane","alarmclock","ambulance","angle","animal_migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant","envelope","eraser","eye","eyeglasses","face","fan","feather","fence","finger","fire hydrant","fireplace"];
random_number=Math.floor((Math.random()*quick_draw_data_set.length)+1);
console.log(quick_draw_data_set[random_number]);
sketck=quick_draw_data_set[random_number];
document.getElementById("Sketch").innerHTML="Sketch to be drawn : "+sketck;
timer_conter=0;
timer_check="";
draw_sketch="";
answer_holder=""
score=0;
function update_canvas(){
    background("white");
    random_number=Math.floor((Math.random()*quick_draw_data_set.length)+1);
    sketck=quick_draw_data_set[random_number];
    document.getElementById("Sketch").innerHTML="Sketch to be drawn : "+sketck;
}
function preload(){
    classifier=ml5.imageClassifier('DoodleNet');
    }
    function setup(){
    canvas= createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
   
    }
    function draw(){
        syth=window.speechSynthesis;
    strokeWeight(8);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    check_sketch();
    if(draw_sketch==sketck){
        answer_holder="set";
        score++;
        document.getElementById("score").innerHTML="score : "+score;

    }
    }
    function clearCanva(){
        background("white");
    }
    function check_sketch(){
        timer_conter+=1;
        document.getElementById("timer").innerHTML="Timer : "+timer_conter;
        if(timer_conter>600){
            timer_conter=0;
            timer_check="completed";
        }
        if(timer_check=="completed" || answer_holder=="set"){
            timer_check="";
            answer_holder="";
            update_canvas();
        }
    }
    function classifyCanvas(){
        classifier.classify(canvas, gotResults);
    }
    function gotResults(error, results){
        if(error){
            console.log(error);
        }
        else{
            console.log(results);
            draw_sketch=results[0].label;
            document.getElementById("label").innerHTML="Label : "+draw_sketch;
            document.getElementById("confidence").innerHTML="Confidence : "+Math.round(results[0].confidence*100)+"%";
            
        }
    }