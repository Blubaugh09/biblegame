import BaseScene from '../utilities/base-scene';
import { UP } from '../../shared/constants/directions';
import { HOUSE_3, TOWN } from '../../shared/constants/scenes';
import { MAP_HOUSE_1, IMAGE_HOUSE } from '../constants/assets';

var stars;
var Bullet;
var bullet;
var bullets;
var speed;
var lastFired = 0;

class House_3 extends BaseScene {
    constructor() {
        super(HOUSE_3);
    }

        init(data2) {
        super.init({ x: 240, y: 365, direction: UP });
         console.log('INSIDE HOUSE 3');
            console.log('passed data from base-scene', data2)
   //console.log('init', data)
        
    }

    create() {
        super.create(MAP_HOUSE_1, IMAGE_HOUSE, true);
        this.registerTilesetAnimation(this.layers[2]);
       stars = this.physics.add.group({
				key: 'star',
				repeat: 4,
				setXY: { x: 125, y: 175, stepX: 60 }
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
        
        var scoreBox = new Phaser.Geom.Rectangle(45, 345, 180, 35);

    var graphics = this.add.graphics({ fillStyle: { color: 0x0000aa } });
    graphics.fillRectShape(scoreBox);
        
        graphics.setScrollFactor(0);
        
//END CREATE      
    }
  //END CREATE  
    
    

    registerCollision() {
        this.layers[1].setCollisionBetween(0, 100);
        this.layers[2].setCollisionByExclusion([-1, 67, 68, 69]);

        let player = this.player.players[this.player.socket.id];

        this.physics.add.collider(player, this.layers[2]);
        this.physics.add.collider(player, this.layers[1], (sprite, tile) => {
            if (tile.index === 20) {
                console.log('House3 to Town');
                this.nextSceneKey = TOWN;
                this.onChangeScene();
            }
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
        
       /* this.physics.add.collider(bullets, enemies, (enemy, bullet) => {
           console.log('bullet hits enemy');
           // enemy.setVisible(false);
            bullet.anims.play('ORB', true);
           // enemy.setActive(false);
           // enemies.setVelocityX(0);
          //  enemies.setVelocityY(0);
           // bullet.setVisible(false);
            this.updateScore();
        }); */
    
   //END COLLISION 
    }
    // END COLLISION
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

    
//END OF SCENE    
}
//END OF SCENE
export default House_3;
