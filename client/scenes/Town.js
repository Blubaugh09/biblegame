import io from 'socket.io-client';
import BaseScene from '../utilities/base-scene';
import { DOWN } from '../../shared/constants/directions';
import { HOUSE_1, HOUSE_2, TOWN, HOUSE_3, MARK_1 } from '../../shared/constants/scenes';
import { MAP_TOWN, IMAGE_TOWN, MAP_STAR } from '../constants/assets';



var stars;
//var map2;
var Bullet;
var mark1Btns;
var bullet;
var bullets;
var speed;
var lastFired = 0;
var enemy;
var enemies;
var dots;
var dots2;
//var coinLayer;
 var dotConfig = [
		
        {x:300, y:60},{x:780, y:60},{x:1260, y:60},{x:420, y:360},{x:1020, y:360},{x:1500, y:360},{x:180, y:600},{x:1380, y:660},{x:420, y:1140},{x:1380, y:1440},{x:0, y:1620}																																																														
								 ];
 
//mark1 scripture
var dot2Config = [
		
        {x:1020, y:360},																							
								 ];


class Town extends BaseScene {
    constructor() {
        super(TOWN);
            
    }

    init(data) {
        super.init(this.getPosition(data));
  
    
    }

    create() {
        super.create(MAP_TOWN, IMAGE_TOWN, MAP_STAR, false);
       
  /*       map2 = this.make.tilemap({key: 'map2'});
        // blue light image used as tileset
    var coinTiles = map2.addTilesetImage('blueLight');
    // add coins as tiles
    coinLayer = map2.createDynamicLayer('Coins', coinTiles, 0, 0);
        */
        
        
        
        enemies = this.physics.add.group({
            
            key: 'enemy',
			frameQuantity: 2,
           
            
        });
        enemies.children.iterate(function (enemy) {
				//lightOrb.anims.play('power', true);
				enemy.setScale(0.1);
            
			});
      
        
        //Create dots
		dots = this.physics.add.staticGroup();		
		for(var i = 0; i < dotConfig.length; i++) {
			var settings = dotConfig[i];
			var scale = (settings.scale) ? settings.scale : 0.5;
			dots.create(settings.x + 15, settings.y + 15, 'dot').setScale(0.1).setOrigin(0).refreshBody();
		}
        //Create button for mark 1
		dots2 = this.physics.add.staticGroup();		
		for(var i = 0; i < dot2Config.length; i++) {
			var settings = dot2Config[i];
			var scale = (settings.scale) ? settings.scale : 0.5;
			dots2.create(settings.x + 15, settings.y + 15, 'dot2').setScale(0.5).setOrigin(0).refreshBody();
		}
        
         stars = this.physics.add.group({
				key: 'star',
				repeat: 4,
				setXY: { x: 125, y: 300, stepX: 60 },
             frameQuantity: 1,
			});

//AUDIO PLAYBACK
   var music = this.sound.add('theme');

    music.play();
        
        
this.anims.create({
    key: 'ORB',
    frames: this.anims.generateFrameNumbers('bullet', { start: 0, end: 3 }),
    
    frameRate: 10,
   
    repeat: -1
});        
     var Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
            
            this.speed = Phaser.Math.GetSpeed(700, 1);
             
        },

        fire: function (x, y)
        {
            this.setPosition(x, y);
					
            this.setActive(true);
            this.setVisible(true);
            this.setScale(0.1);

        },

    });

    bullets = this.physics.add.group({
        classType: Bullet,
        maxSize: -1,
        runChildUpdate: true,
        

    });
        
   bullets.children.iterate(function (bullet) {
				bullet.anims.play('ORB', true);
				
			});
        
     speed = Phaser.Math.GetSpeed(700, 1);      
 
        
 // move our enemy
    this.timeEvent = this.time.addEvent({
      delay: 2000,
      callback: this.move,
      loop: true,
      callbackScope: this
    });
        
        
      var rect = new Phaser.Geom.Rectangle(300, 200, 200, 300);
         //  Randomly position the enemies within the rectangle
    Phaser.Actions.RandomRectangle(enemies.getChildren(), rect);
        
       var rect2 = new Phaser.Geom.Rectangle(10, 200, 2000, 3000);
         //  Randomly position the enemies within the rectangle
    Phaser.Actions.RandomRectangle(stars.getChildren(), rect2);  
    }

    
    
    
    
    
    
     move () {
    const randNumber = Math.floor((Math.random() * 4) + 1);
    switch (randNumber) {
      case 1:
        enemies.setVelocityX(50);
        
        break;
      case 2:
        enemies.setVelocityX(-50);
           
        break;

      default:
        enemies.setVelocityX(0);
        
    }

    this.time.addEvent({
      delay: 500,
      callback: () => {
        if (this.active) this.setVelocity(0);
      },
      callbackScope: this
    });
  }
    
    
    
    registerCollision() {
         /* River */
         this.layers[6].setCollisionBetween(0, 1021);

         /* House 1 */
         this.layers[7].setCollisionBetween(105, 110);
         this.layers[7].setCollisionBetween(125, 130);
         this.layers[7].setCollisionBetween(145, 150);
         this.layers[7].setCollisionBetween(165, 170);
        this.layers[7].setCollisionBetween(487, 489);
        
        /* Water Bucket Collision */
        this.layers[7].setCollisionBetween(788, 791);
        
        /* Blue Pottery */
         this.layers[6].setCollisionBetween(0, 1021);
 
         /* House 2 */
        this.layers[7].setCollisionBetween(118, 122);
         this.layers[7].setCollisionBetween(207, 207);
         this.layers[7].setCollisionBetween(226, 228);
         this.layers[7].setCollisionBetween(245, 249);
         this.layers[7].setCollisionBetween(264, 270);
         this.layers[7].setCollisionBetween(284, 290);
         this.layers[7].setCollisionBetween(304, 310);
         this.layers[7].setCollisionBetween(324, 330);
         this.layers[7].setCollisionBetween(344, 350);
         this.layers[7].setCollisionBetween(1661, 1663);
        this.layers[7].setCollisionBetween(1600, 1735);

         /* Camps */
         this.layers[9].setCollisionBetween(5, 25);
        
        /* Star Layers */
         this.layers[8].setCollisionBetween(973, 977);
 
         /* Trees */
         this.layers[9].setCollisionBetween(213, 215);
         this.layers[9].setCollisionBetween(233, 256);
         this.layers[9].setCollisionBetween(273, 296);

        let player = this.player.players[this.player.socket.id];

        this.physics.add.collider(player, this.layers[6]);
        this.physics.add.collider(player, this.layers[8]);
      
        this.physics.add.collider(player, this.layers[9], (sprite, tile) => {
                                 
                       if (tile.index === 789 || tile.index === 790) {
                this.nextSceneKey = HOUSE_2;
                this.onChangeScene();
            }         
        });
        this.physics.add.collider(player, this.layers[7], (sprite, tile) => {
            //tile number in tiled 2 has to be 105-109, 124-129, 122-149, 164-169 tile number(has to be set to tile.index...106-110, 126-130, 146-150, 166-170 ) to send to new level. 
            if (tile.index === 1599 || tile.index === 1600 || tile.index === 1601 || tile.index === 1602 || tile.index === 1603 || tile.index === 1604 || tile.index === 1605) {
                
                console.log('still in Town.js');
                this.nextSceneKey = MARK_1;
               
                this.onChangeScene();
                
            }
            else if (tile.index === 118 || tile.index === 119 || tile.index === 120 || tile.index === 121 || tile.index === 122 || tile.index === 123 || tile.index === 124) {
                this.nextSceneKey = HOUSE_2;
                this.onChangeScene();
            }
             
        });
        
       
       this.physics.add.overlap(player, dots2, (sprite, dot2) => {
           console.log('dot2 touched');
            dot2.disableBody(true, true);
this.nextSceneKey = MARK_1;
                this.onChangeScene();
            this.updateScore();
        });
        
        this.physics.add.overlap(player, dots, (sprite, dot) => {
           console.log('dot touched');
            dot.disableBody(true, true);

            this.updateScore();
        });
        
        this.physics.add.collider(dots, bullets, (dot, bullet) => {
           console.log('star touched by bullet');
            dot.disableBody(true, true);
            bullet.setActive(false);
            bullet.setVisible(false);
             this.updateScore();
        });

 //Run Collisions with objects Jeff Add On
      
        this.physics.add.collider(player, stars, (sprite, star) => {
           console.log('star touched');
            star.disableBody(true, true);
               
           
            this.updateScore();
        });
        
        this.physics.add.collider(stars, bullets, (star, bullet) => {
           console.log('star touched by bullet');
            star.disableBody(true, true);
            bullet.setActive(false);
            bullet.setVisible(false);
             this.updateScore();
        });
        
        this.physics.add.collider(bullets, enemies, (enemy, bullet) => {
           console.log('bullet hits enemy');
           // enemy.setVisible(false);
            bullet.anims.play('ORB', true);
           // enemy.setActive(false);
           // enemies.setVelocityX(0);
            
          //  enemies.setVelocityY(0);
           // bullet.setVisible(false);
            this.updateScore();
        });
        
        this.physics.add.collider(player, enemies, (sprite, enemy) => {
           console.log('player got hit by enemy');
           // enemy.setVisible(false);
            //bullet.anims.play('ORB', true);
           // enemy.setActive(false);
            player.setTintFill(0xff0000);
           // enemies.setVelocityX(0);
          //  enemies.setVelocityY(0);
           // bullet.setVisible(false);
           this.time.addEvent({
        delay: 500,
        callback: () => {
         player.clearTint();
        }
      });
        });
    }

    
   
    
    //states where the player will end up at the beginning of the game and when he leaves each house. 
    getPosition(data) {
        if (data === HOUSE_1 || Object.getOwnPropertyNames(data).length === 0) {
            return { x: 600, y: 1000, direction: DOWN };
        }
        else if (data === HOUSE_2) {
            return { x: 655, y: 470, direction: DOWN };
        }
        else if (data === HOUSE_3) {
            return { x: 600, y: 1000, direction: DOWN };
        }
        else if (data === MARK_1) {
            return { x: 600, y: 1000, direction: DOWN };
        }
    }
    
   
    
      fireBullet (x, y, direction) {
   // console.log('fired bullet');
  //bullet.angle = player.angle;
      
 if (this.spaceKey ){
          var bullet = bullets.get();

        if (bullet)
        {
        
            bullet.fire(this.player.players[this.player.socket.id].x, this.player.players[this.player.socket.id].y);
            //bullet.angle = this.player.players[this.player.socket.id].angle;
            //bullet.body.velocity.y = 600 ;
            console.log("shoot straight");
            //bullet.anims.play('bulletAnim', true);
            //lastFired = 300;
          
                         switch (direction) {
        case 'up':
          bullet.body.velocity.y = -600 ;
                        console.log('upAnd')
                                 
          break;
        case 'down':
          bullet.body.velocity.y = 600 ;
                                 console.log('DOWN SHOT')
          break;
       case 'right':
          bullet.body.velocity.x = 600 ;
                        console.log('RIGHT')        
          break;
        case 'left':
          bullet.body.velocity.x = -600 ;
                                 console.log('LEFT')
          break;
        default:
          bullet.body.velocity.y = 600 ;
                                 console.log('DownShot')
      }
            this.time.addEvent({
        delay: 500,
        callback: () => {
         //bullet.destroy();
          bullet.active = false;
          bullet.visible = false;
          bullet.body.velocity.x = 0 ;
            bullet.body.velocity.y = 0 ;
        }
      });
            
        }
         
      }
  
  
  
  
  
  } 
    

     
      
  
    
}

export default Town;
