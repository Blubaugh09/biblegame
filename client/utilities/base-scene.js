import { Scene } from 'phaser';
import Player from '../objects/player';
import Bullets from '../objects/Bullets';
import { FADE_DURATION } from '../constants/config';
import { STOP } from '../../shared/constants/actions/player';
import TilesetAnimation from './tileset-animation';



var score = 0;
var Bullet;
var bullet;
var bullets;
var speed;
var text;
var text2;

class BaseScene extends Scene {
    constructor(key) {
        super({ key });
        this.key = key;
    }

    init(position, data) {
        this.scene.setVisible(false, this.key);
        this.player = new Player(this, this.key, position);
        this.layers = {};
        this.prevSceneKey = this.key;
        this.nextSceneKey = null;
      
        this.transition = true;
        this.input.keyboard.removeAllListeners();
        
        
    }

    create(tilemap, tileset, withTSAnimation) {
        this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.withTSAnimation = withTSAnimation;
        this.map = this.add.tilemap(tilemap);
        this.tileset = this.map.addTilesetImage(tileset);

        for (let i = 0; i < this.map.layers.length; i++) {
            if (withTSAnimation)
                this.layers[i] = this.map.createDynamicLayer(this.map.layers[i].name, this.tileset, 0, 0);
            else
                this.layers[i] = this.map.createStaticLayer(this.map.layers[i].name, this.tileset, 0, 0);
        }

        this.player.create();

        this.cameras.main.on('camerafadeincomplete', () => {
            this.transition = false;

            this.input.keyboard.on('keyup', (event) => {
                if (event.keyCode >= 37 && event.keyCode <= 40) {
                    this.player.stop();
                }
            });
            
            
           
            
             
            
            this.registerCollision();
            this.registerController();
        });
          
        this.cameras.main.on('camerafadeoutcomplete', this.changeScene.bind(this));

      var scoreBox = new Phaser.Geom.Rectangle(45, 345, 180, 35);

    var graphics = this.add.graphics({ fillStyle: { color: 0x0000aa } });
    graphics.fillRectShape(scoreBox);
        
        graphics.setScrollFactor(0);
        
        // this text will show the score
    text = this.add.text(50, 350, 'Score: ' + score, {
        fontSize: '20px',
        fill: '#ffffff'
    });
    // fix the text to the camera
    text.setScrollFactor(0);
        text.setDepth(1);
     
   
    }

    
    
    
    
    
    
    update() {
     
        if (this.transition === false) {
            if (this.keyLeft.isDown) {
                this.player.left();
                 this.direction = 'left';
              
            } else if (this.keyRight.isDown) {
                this.player.right();
                 this.direction = 'right';
                this.isLeft=false; 
                this.isRight=true;
                this.isUp=false;
                this.isDown=false;
            } else if (this.keyUp.isDown) {
                this.player.up();
                 this.direction = 'upAnd';
                this.isLeft=false; 
                this.isRight=false;
                this.isUp=true;
                this.isDown=false;
            } else if (this.keyDown.isDown) {
                this.player.down();
                 this.direction = 'down';
                this.isLeft=false; 
                this.isRight=false;
                this.isUp=false;
                this.isDown=true;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.fireBullet(this.player.x, this.player.y, this.player.direction);
    }
    /* if (this.player.left != this.player.right) {
                console.log('DIRECTION LEFT')
                 //this.direction = 'left';
              
            }
        if (this.player.right != this.player.left) {
                console.log('DIRECTION RIGHT')
                 //this.direction = 'right';
    }*/
    }
    onChangeScene() {
        this.transition = true;
        this.player.stop();
        this.cameras.main.fade(FADE_DURATION);
    }
    

    
    updateScore() {
       score++; // add 1 points to the score
    
    text.setText('Score: ' + score); // set the text to show the current score
     text.setDepth(1);
    }
    
    updateScoreExtra (){
       score+= 100; // add 1 points to the score
    
    text.setText('Score: ' + score); // set the text to show the current score
     text.setDepth(1);
    }
    
    changeScene(data) {
        if (this.withTSAnimation)
            this.tilesetAnimation.destroy();

        this.player.socket.disconnect();
        this.scene.start(this.nextSceneKey, this.prevSceneKey );
    }

    registerCollision() {
       
        throw new Error('registerCollision() not implemented');
    }

    registerTilesetAnimation(layer) {
        this.tilesetAnimation = new TilesetAnimation();
        this.tilesetAnimation.register(layer, this.tileset.tileData);
        this.tilesetAnimation.start();
    }

    registerController() {
        this.hold(document.getElementById('up'), this.player.up.bind(this.player));
        this.hold(document.getElementById('down'), this.player.down.bind(this.player));
        this.hold(document.getElementById('left'), this.player.left.bind(this.player));
        this.hold(document.getElementById('right'), this.player.right.bind(this.player));
    }

    hold(btn, action) {
        let t;
        let repeat = () => { action(); t = setTimeout(repeat, this.timeout); }
        btn.onmousedown = (e) => { e.preventDefault(); if (this.transition === false) repeat(); }
        btn.onmouseup = (e) => { e.preventDefault(); clearTimeout(t); if (this.transition === false) this.player.stop(); }
        btn.ontouchstart = (e) => { e.preventDefault(); if (this.transition === false) repeat(); }
        btn.ontouchend = (e) => { e.preventDefault(); clearTimeout(t); if (this.transition === false) this.player.stop(); }
    }
}

export default BaseScene;
