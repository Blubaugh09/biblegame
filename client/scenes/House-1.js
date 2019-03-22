import BaseScene from '../utilities/base-scene';
import { UP } from '../../shared/constants/directions';
import { HOUSE_1, TOWN } from '../../shared/constants/scenes';
import { MAP_HOUSE_1, IMAGE_HOUSE } from '../constants/assets';

var stars;

class House_1 extends BaseScene {
    constructor() {
        super(HOUSE_1);
    }

    init(data) {
        super.init({ x: 240, y: 365, direction: UP });
             console.log('inside HOUSE1');
 
    }

    create() {
        super.create(MAP_HOUSE_1, IMAGE_HOUSE, true);
        this.registerTilesetAnimation(this.layers[2]);
       stars = this.physics.add.group({
				key: 'star',
				repeat: 4,
				setXY: { x: 125, y: 175, stepX: 60 }
			});

        var scoreBox = new Phaser.Geom.Rectangle(45, 345, 180, 35);

    var graphics = this.add.graphics({ fillStyle: { color: 0x0000aa } });
    graphics.fillRectShape(scoreBox);
        
        graphics.setScrollFactor(0);
        
        
        
    }
    
    

    registerCollision() {
        this.layers[1].setCollisionBetween(0, 100);
        this.layers[2].setCollisionByExclusion([-1, 67, 68, 69]);

        let player = this.player.players[this.player.socket.id];

        this.physics.add.collider(player, this.layers[2]);
        this.physics.add.collider(player, this.layers[1], (sprite, tile) => {
            if (tile.index === 20) {
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
    }
    
  
}

export default House_1;
