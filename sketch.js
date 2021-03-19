   
    var Player,PlayerShootAnim,PlayerIdleAnim;
    var bgImage,vImage,bgImage,bulletImage,bulletSound;
    var bulletGrp,VirusGrp,maskGrp;
    var gameState = "PLAY";
    var score = 500;
    var virusrm = 10000;
  
function preload()
{
    //Images
    PlayerIdleAnim = loadAnimation("Images/playerIdle/JK_P_Gun__Idle_000.png","Images/playerIdle/JK_P_Gun__Idle_001.png","Images/playerIdle/JK_P_Gun__Idle_002.png","Images/playerIdle/JK_P_Gun__Idle_003.png","Images/playerIdle/JK_P_Gun__Idle_004.png","Images/playerIdle/JK_P_Gun__Idle_005.png","Images/playerIdle/JK_P_Gun__Idle_006.png","Images/playerIdle/JK_P_Gun__Idle_007.png","Images/playerIdle/JK_P_Gun__Idle_008.png","Images/playerIdle/JK_P_Gun__Idle_009.png");
    PlayerShootAnim = loadAnimation("Images/playerShoot/JK_P_Gun__Attack_000.png","Images/playerShoot/JK_P_Gun__Attack_001.png","Images/playerShoot/JK_P_Gun__Attack_002.png","Images/playerShoot/JK_P_Gun__Attack_003.png","Images/playerShoot/JK_P_Gun__Attack_004.png","Images/playerShoot/JK_P_Gun__Attack_005.png","Images/playerShoot/JK_P_Gun__Attack_006.png","Images/playerShoot/JK_P_Gun__Attack_007.png","Images/playerShoot/JK_P_Gun__Attack_008.png","Images/playerShoot/JK_P_Gun__Attack_009.png");
    bgImage = loadImage("Images/road.png");
    vImage = loadImage("Images/virus.png");
    PlayerDieAnim = loadImage("Images/playerDie.png")
    maskImage= loadImage("Images/mask.png");
    bulletImage = loadImage("Images/bullet.png");
    HandSImage = loadImage("Images/sanitizer.png");
    gamovrImage = loadImage("Images/gameover.png");
    restartImage = loadImage("Images/restart.png");
    PlayerHurtImage = loadImage("Images/hurt.png")
    winImage = loadImage("Images/win.png");
   
    //Sounds
    bulletSound = loadSound("Sound/bulletsound.mp3");
    deathSound = loadSound("Sound/gameoversound.wav");
    PlayerHurtSound = loadSound("Sound/hurtsound.wav");
    glassbrking = loadSound("Sound/glassbrking.mp3");
    healSound = loadSound("Sound/healsound.mp3");
    relodSound = loadSound("Sound/reload.mp3");
    virusDie = loadSound("Sound/virusDie.mp3");
    winsound = loadSound("Sound/winSound.mp3");
}

function setup() 
{

    createCanvas(1500, 700);
   
    bulletGrp = new Group();
    VirusGrp  = new Group();
    maskGrp   = new Group();
    handGrp = new  Group()
    winGrp = new Group();

    win = createSprite(750,350,20,20);
    win.addImage(winImage);

    restart2 = createSprite(750,550,20,20);
    restart2.addImage(restartImage);
    restart2.scale = 0.5;

    Player = createSprite(100,350,50,50);
    Player.addAnimation("idle",PlayerIdleAnim);
    Player.addAnimation("Shooting",PlayerShootAnim);
    Player.addAnimation("Die",PlayerDieAnim)
    Player.addAnimation("Hurt",PlayerHurtImage);
    Player.scale = 0.3;

    
    gameover = createSprite(750,350,20,20);
    gameover.addImage(gamovrImage);
    gameover.scale = 1.5;

    restart = createSprite(750,450,20,20);
    restart.addImage(restartImage);
    restart.scale = 0.25;
   
    
}

function draw() {
    
    background(bgImage);
    virus();
    mask();
    hand();

    Player.velocityY = 0;

    if(gameState=="PLAY")
    {
    win.visible = false;
    restart2.visible = false;
    
    if (frameCount % 220 === 0){
    score = score - 10;
    }
 
    restart.visible = false;
    gameover.visible = false;

    if(keyWentDown("Space")){
    Player.changeAnimation("Shooting",PlayerShootAnim);
    bulletSound.play();
    
    ShootAnim();
    }else{
    Player.changeAnimation("idle",PlayerIdleAnim);
    }

    if(keyDown("UP_ARROW")){
    Player.velocityY = -10
    }

    if(keyDown("DOWN_ARROW")){
    Player.velocityY = 10
    }

    if(bulletGrp.isTouching(VirusGrp)){
    bulletGrp.destroyEach();
    virusrm = virusrm -1;
    VirusGrp.destroyEach();
    }

    if(bulletGrp.isTouching(maskGrp)){
        
    bulletGrp.destroyEach();
    virusDie.play();
    maskGrp.destroyEach();
    }
    if(bulletGrp.isTouching(handGrp)){
    glassbrking.play();
    bulletGrp.destroyEach();
    handGrp.destroyEach();
    }
 
    if(VirusGrp.isTouching(Player)){
    PlayerHurtSound.play();
    VirusGrp.destroyEach();
    Player.changeAnimation("Hurt",PlayerHurtImage);
    score = score-50;
    }
      
    if(maskGrp.isTouching(Player)){
    healSound.play();
    maskGrp.destroyEach();
    score = score+10;
    }
    

    if(handGrp.isTouching(Player)){
    healSound.play();
    
    handGrp.destroyEach();
    score = score+10;
    }
   

    if(score===0){
    deathSound.play();
    gameState = "End";
    }

    if(score <0){
    score = 0;
    }

    
    if(virusrm === 0){
    winsound.play();
    gameState = "WIN";
    } 


}

    if(gameState==="End"){
    
    Player.changeAnimation("Die",PlayerDieAnim);
    bulletGrp.destroyEach(); 
    VirusGrp.destroyEach();
    maskGrp.destroyEach();
    handGrp.destroyEach();
   

    restart.visible = true;
    gameover.visible = true;

    if(mousePressedOver(restart)){
    reset();
    }


}

if(gameState==="WIN"){

    win.visible = true;
    restart2.visible = true;
    bulletGrp.destroyEach(); 
    VirusGrp.destroyEach();
    maskGrp.destroyEach();
    handGrp.destroyEach();
    Player.velocityY = 0;
    Player.changeAnimation("idle",PlayerIdleAnim)
    if(mousePressedOver(restart2)){
    reset();
    }

}

    drawSprites();
    textSize(20);
    fill("red");
    textFont('Incised901 BdCn BT');    
    stroke("black")
    strokeWeight(5);
    text("Health :"+score,1300,120)

    
    textSize(20);
    fill("red");
    stroke("black")
    textFont('Incised901 BdCn BT');  
    strokeWeight(5);
    text("Remaing Virus :"+virusrm,100,120)


  

  
} 

function virus(){

    if (frameCount % 150 === 0){
    var virus = createSprite(1500,600,40,10);
    virus.y = Math.round(random(0,700));
    virus.addImage(vImage);
    VirusGrp.add(virus);
    virus.scale = 0.041;
    virus.velocityX = -15;
    
    }

}

function mask(){
    if (frameCount % 160 === 0) {
    var mask = createSprite(1500,600,40,10);
    mask.y = Math.round(random(0,700));
    mask.addImage(maskImage);
    maskGrp.add(mask);
    mask.scale = 0.025;
    mask.velocityX = -15;
    
    }
    
}

function ShootAnim(){
    bullet = createSprite(Player.x+80,Player.y+27);
    bullet.addImage(bulletImage);
    bullet.scale = 0.035;
    bullet.velocityX = 60;
    bulletGrp.add(bullet);
}


function hand(){
    if (frameCount % 180 === 0) {
    var HandS = createSprite(1550,600,40,10);
    HandS.y = Math.round(random(0,700));
    HandS.addImage(HandSImage);
    
    handGrp.add(HandS);
    HandS.scale = 0.1;
    HandS.velocityX = -15;
    }
    
}

function reset(){

    gameState = "PLAY";
    score = 500;
    virusrm = 10000;
    Player.changeAnimation("idle",PlayerIdleAnim)
   
}



