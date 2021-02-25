var carry,carry_1,carry_2,carry_3,carry_4;
var sky,sky_1;
var Ig;
var youtubeGroup,tsGroup;
var yObs,tObs,y1;
var yalgaar1,yalgaar2,yalgaar3;
var cK,start,start_1,cK_1;
var kH;
var bT;
var salam;
START=-1;
PLAY=0;
END=1;
ENDCITY=2;
var time=120;
var gs="START";
function preload(){
  carry_1=loadAnimation("c1.png","c2.png","c3.png","c4.png");
  carry_2=loadAnimation("c5.png");
  carry_3=loadAnimation("c6.png");
  carry_4=loadAnimation("c7.png");
  sky_1=loadImage("sky2.jpg");
  yObs=loadImage("S2.png");
  tObs=loadImage("tiktok.png");
  y1=loadImage("y2.png");
  cK_1=loadImage("X.png");
  start_1=loadImage("Start.png")
  yalgaar1=loadSound("Yalgaar2.mp3");
yalgaar2=loadSound("Yalgaar4.mp3");
yalgaar3=loadSound("Yalgaar5.mp3");
kH=loadSound("kaiseHo.mp3")
bT=loadSound("bahutTej.mp3");
salam=loadSound("salam.mp3")
}

function setup() {
  createCanvas(displayWidth-70,displayHeight-70);
  sky=createSprite(displayWidth/2,displayHeight/2,400,10);
  sky.addImage(sky_1);
  sky.scale=12;
  sky.velocityX=0;
  cK=createSprite((displayWidth-70)/2,(displayHeight-70)/2);
  cK.addImage(cK_1);
  cK.scale=1;
  start=createSprite((displayWidth-50)/2,(displayHeight-70)/4);
  start.addImage(start_1);
  start.scale=1;
  
  Ig=createSprite(200,250,400,20);
  Ig.visible=false;
  
  carry=createSprite(50,200);
  carry.addAnimation("carry",carry_1);
  carry.addAnimation("jump",carry_2);
  carry.addAnimation("angry",carry_3);
  carry.addAnimation("happy",carry_4)
  carry.visible=false;
  //carry.debug=true;
  carry.setCollider("circle",0,0,100)
  carry.scale=0.6;

  youtubeGroup=new Group();
  tsGroup=new Group();
}


function draw(){
 background(0); 
 if(gs==="START"){

if(mousePressedOver(start)){
  yalgaar2.stop();
  start.visible=false;
  cK.visible=false;
  kH.play();
  
  gs="PLAY";
}
 }
 if(gs==="PLAY"){
  //yalgaar2.play();
  
  carry.visible=true;
  sky.velocityX=-(20-4*time/80);
  if(sky.x<=30){
    sky.x=sky.width/2;
  }
  if(keyWentDown("space")&& carry.y>200){
    carry.changeAnimation("jump",carry_2);
    carry.velocityY=-10;
  }
  if(keyWentUp("space")){
    carry.changeAnimation("carry",carry_1);
    
  }
  carry.velocityY=carry.velocityY+0.5;
  if(frameCount%80===0){
    SpawnTiktok();
    
      }
      if(frameCount%200===0){
        SpawnYoutube();
          }
          if(frameCount%30===0){
            time-=1;
          }
          if(carry.isTouching(youtubeGroup)){
            time-=5;
            youtubeGroup.destroyEach();
            bT.play();
          }
          if(time<0){
            time=0;
           
          }
          
         
          if(carry.isTouching(tsGroup)){
            bT.stop();
            var rand=Math.round(random(1,2));
            switch(rand){
              case 1:yalgaar1.play();
              break;
              case 2:yalgaar3.play();
              break;
              default:break;
            }
gs="END";
          }
          
                    
         // yalgaar2.play();
}
youtubeGroup.setLifetimeEach(-1);
tsGroup.setLifetimeEach(-1);
  carry.collide(Ig);
  
  
  
  console.log(mouseY);
  if(time===0){
    gs="ENDCITY";
            }
            if(gs==="ENDCITY"){
 
            carry.changeAnimation("happy",carry_4)
            carry.scale=0.7;
              sky.velocityX=0;
              carry.velocityY=0;
              tsGroup.destroyEach();
              youtubeGroup.destroyEach();
            }
camera.position.y=carry.y;
  drawSprites();
  if(gs==="ENDCITY"){
 
    fill(0);
    textSize(50);
 
    text("You Win",100,200);
    
  }
  fill(0);
  textSize(50);
  text("Survival Time:"+time,displayWidth-500,-25);
  if(gs==="END"){
    
    carry.velocityY=0;

     sky.velocityX=0;
    tsGroup.setVelocityXEach(0);
    youtubeGroup.destroyEach();
  carry.changeAnimation("angry",carry_3);
     carry.scale=1;
  }
  
 
}
function keyPressed(){
  if(gs==="PLAY"){
  if((keyCode===32)&&carry.y>169){
    carry.velocityY=-12;
    
  }
}
}
function SpawnTiktok(){
  var tiktok=createSprite(displayWidth,200,20,20);
  tiktok.addImage(tObs);
 
  tiktok.setCollider("rectangle",0,0,230,150);
  tiktok.velocityX=-(10+4*time/80);
  tiktok.scale=0.2;
  tsGroup.add(tiktok);
  tiktok.lifetime=100;
}
function SpawnYoutube(){
var youtube=createSprite(random(700,displayWidth),random(50,100),10,10);
youtube.addImage(y1);
youtube.setCollider("rectangle",0,0,230,150);
youtube.velocityX=-10;
youtube.scale=0.2;
  youtubeGroup.add(youtube);
  youtube.lifetime=100;
}