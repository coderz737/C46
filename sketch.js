
var backgroundImg
var balloonImg
var obs_top1
var obs_top2
var obs_bottom1
var obs_bottom2
var obs_bottom3
var top_obsGroup
var bottom_obsGroup
var gameOverImg , restartImg
var gameState = PLAY
var PLAY = 1
var END = 0
var score = 0
  
function preload(){
  backgroundImg = loadImage("assets/bg.png")
  balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
  obs_top1 = loadImage("assets/obsTop1.png")
  obs_top2 = loadImage("assets/obsTop2.png")
  obs_bottom1 = loadImage("assets/obsBottom1.png")
  obs_bottom2 = loadImage("assets/obsBottom2.png")
  obs_bottom3 = loadImage("assets/obsBottom3.png")
  gameOverImg = loadImage("assets/gameOver.png")
  restartImg = loadImage("assets/restart.png")
}

function setup(){
  createCanvas(400,400)
  bg = createSprite(165,500,1,1)
  bg.addImage(backgroundImg)
  bg.scale = 1.4

  balloon = createSprite(100,200,20,50)
  balloon.addAnimation("ballon",balloonImg)
  balloon.scale = 0.2

  topGround = createSprite(200,10,800,20)
  topGround.visible = false

  bottomGround = createSprite(200,390,800,20)
  bottomGround.visible = false

  top_obsGroup = new Group()
  bottom_obsGroup = new Group()

  gameOver = createSprite(220,200)
  gameOver.addImage(gameOverImg)
  gameOver.scale = 0.5

  restart = createSprite(220,240)
  restart.addImage(restartImg)
  restart.scale = 0.5
}

function draw() {
  

  if(gameState === PLAY){

    //making the hot air balloon jump
    if(keyDown("space")) {
      balloon.velocityY = -6 ;
      
    }

    //adding gravity
     balloon.velocityY = balloon.velocityY + 2;

     
   

     //spawning top and bottom obstacles
     spawnTopObs();
     spawnBottomObs();

//condition for END state
if(top_obsGroup.isTouching(balloon) || balloon.isTouching(topGround)
|| balloon.isTouching(bottomGround) || bottom_obsGroup.isTouching(balloon)){

gameState = END;

}


//Adding AI for balloon when touching topObstaclesGroup and topGround

/*if(topObstaclesGroup.isTouching(balloon) || balloon.isTouching(topGround)){
  balloon.velocityY = 6 ;
  jumpSound.play();
}*/


//Adding AI for balloon when touching topObstaclesGroup and topGround

/*if(balloon.isTouching(bottomGround) || bottomObstaclesGroup.isTouching(balloon)){
  balloon.velocityY = -6 ;
  jumpSound.play();
}*/

  }

  if(gameState === END){
    gameOver.visible = true
    restart.visible = true

    balloon.velocityX = 0
    balloon.velocityY = 0
    top_obsGroup.setVelocityXEach(0)
    bottom_obsGroup.setVelocityXEach(0)

    top_obsGroup.setLifetimeEach(-1)
    bottom_obsGroup.setLifetimeEach(-1)

    if(mousePressedOver(restart)){
      reset()
    }
  }

  drawSprites() 
}

function spawnTopObs(){
  if(World.frameCount % 60 === 0){
    topObs = createSprite(400,50,40,50)
    topObs.scale = 0.1
    topObs.velocityX = -3
    topObs.y = Math.round(random(10,100))
    var rand = Math.round(random(1,2))
    switch(rand){
      case 1: topObs.addImage(obs_top1)
      break
      case 2: topObs.addImage(obs_top2)
      break
      default:break
    }
    topObs.lifetime = 100
    top_obsGroup.add(topObs)
  }
}

function spawnBottomObs(){
  if(World.frameCount % 60 === 0){
    bottomObs = createSprite(400,350,40,50)
    bottomObs.scale = 0.05
    bottomObs.velocityX = -4
    bottomObs.y = Math.round(random(10,400))
    var rand = Math.round(random(1,3))
    switch (rand){
      case 1: bottomObs.addImage(obs_bottom1)
      break
      case 2: bottomObs.addImage(obs_bottom2)
      break
      case 3: bottomObs.addImage(obs_bottom3)
      break
      default:break
    }
    bottomObs.lifetime = 100
    bottom_obsGroup.add(bottomObs)
  }
}

function reset(){
  gameState = PLAY
  
  gameOver.visible = false
  restart.visible = false
  
  score = 0

  top_obsGroup.destroyEach()
  bottom_obsGroup.destroyEach()
}

