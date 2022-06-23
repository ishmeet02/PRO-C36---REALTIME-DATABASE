var Ball, my_database;
var pos;


function setup(){


  my_database = firebase.database();
  console.log(my_database);
  createCanvas(500,500);

  Ball = createSprite(250,250,10,10); 
  Ball.shapeColor = "red";

  var Ball_Position = my_database.ref("ball/position");

  Ball_Position.on("value",readPosition, showError);

}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(new_x, new_y){
  my_database.ref("ball/position").set({
    'x' : pos.x + new_x,
    'y': pos.y + new_y

  });
 
}

function readPosition(data){

  pos = data.val();
  Ball.x = pos.x;
  Ball.y = pos.y;
 
}

function showError(){

  console.log("Error in getting value from the database");
}
