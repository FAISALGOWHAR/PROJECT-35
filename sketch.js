var ball;
var database;
var ballRef;
var position;
function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //connect to the databse

    database=firebase.database();
    console.log(database);

    ballRef=database.ref("ball/position");

    //read the values stored in the DB
    ballRef.on("value",readPosition,showError);

}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
 database.ref("ball/position").set({
'x': position.x+x,
'y':position.y+y

 });
}

function readPosition(data)
{
position=data.val();
console.log(position);
ball.x=position.x;
ball.y=position.y;

}

function showError()
{
    console.log("there is an error")
}
//.ref() : we give a reference to the databse or we point at the locaation 
//.on() : it is used to read the data from the database 
//.set() or .update() : it is used to write values in databse 
