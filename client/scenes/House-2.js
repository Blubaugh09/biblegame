

import BaseScene from '../utilities/base-scene';
import { UP } from '../../shared/constants/directions';
import { HOUSE_2, TOWN } from '../../shared/constants/scenes';
import { MAP_HOUSE_2, IMAGE_HOUSE } from '../constants/assets';

var textGenesis1;
var howTo;
var books; 

class House_2 extends BaseScene {
    constructor() {
        super(HOUSE_2);
    }

    init() {
        super.init({ x: 240, y: 397, direction: UP });
     console.log('INSIDE HOUSE 2');
    }


    create() {
        super.create(MAP_HOUSE_2, IMAGE_HOUSE, true);
        this.registerTilesetAnimation(this.layers[2]);
        
        

     
        
        books = this.physics.add.group({
				key: 'star',
				repeat: 0,
				setXY: { x: 100, y: 350, stepX: 60 }
			});
        
    var scoreBox = new Phaser.Geom.Rectangle(45, 345, 180, 35);

    var graphics = this.add.graphics({ fillStyle: { color: 0x0000aa } });
    graphics.fillRectShape(scoreBox);
        
        graphics.setScrollFactor(0);
        
    }

    registerCollision() {
        this.layers[1].setCollisionByExclusion([-1]);
        this.layers[2].setCollisionByExclusion([-1, 117, 118, 146, 147]);

        let player = this.player.players[this.player.socket.id];

        this.physics.add.collider(player, this.layers[2]);
        this.physics.add.collider(player, this.layers[1], (sprite, tile) => {
            if (tile.index === 20) {
                this.nextSceneKey = TOWN;
                this.onChangeScene();
            }
        });
        
            this.physics.add.collider(player, books, (sprite, star) => {
           console.log('book touched');
            star.disableBody(true, true);
          this.updateScore();
             let background = this.add.image (90,130, 'sky');
            background.setOrigin(0);
                
              howTo = this.add.text(100,140, 'Walk down and left to read Genesis 1. Read carefully because there are hints to unlock special powers throughout this area.' , {
        fontSize: '20px',
        fill: '#ffffff',
        wordWrap: { width: 200, useAdvancedWrap: true }
    });  
        
                        textGenesis1 = this.add.text(100, 550, 'In the beginning, God created the heavens and the earth. 2 The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters. 3 And God said, “Let there be light,” and there was light. 4 And God saw that the light was good. And God separated the light from the darkness. 5 God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day. 6 And God said, “Let there be an expanse in the midst of the waters, and let it separate the waters from the waters.” 7 And God made the expanse and separated the waters that were under the expanse from the waters that were above the expanse. And it was so. 8 And God called the expanse Heaven. And there was evening and there was morning, the second day. 9 And God said, “Let the waters under the heavens be gathered together into one place, and let the dry land appear.” And it was so. 10 God called the dry land Earth, and the waters that were gathered together he called Seas. And God saw that it was good. 11 And God said, “Let the earth sprout vegetation, plants yielding seed, and fruit trees bearing fruit in which is their seed, each according to its kind, on the earth.” And it was so. 12 The earth brought forth vegetation, plants yielding seed according to their own kinds, and trees bearing fruit in which is their seed, each according to its kind. And God saw that it was good. 13 And there was evening and there was morning, the third day. 14 And God said, “Let there be lights in the expanse of the heavens to separate the day from the night. And let them be for signs and for seasons, and for days and years, 15 and let them be lights in the expanse of the heavens to give light upon the earth.” And it was so. 16 And God made the two great lights—the greater light to rule the day and the lesser light to rule the night—and the stars. 17 And God set them in the expanse of the heavens to give light on the earth, 18 to rule over the day and over the night, and to separate the light from the darkness. And God saw that it was good. 19 And there was evening and there was morning, the fourth day. 20 And God said, “Let the waters swarm with swarms of living creatures, and let birds fly above the earth across the expanse of the heavens.” 21 So God created the great sea creatures and every living creature that moves, with which the waters swarm, according to their kinds, and every winged bird according to its kind. And God saw that it was good. 22 And God blessed them, saying, “Be fruitful and multiply and fill the waters in the seas, and let birds multiply on the earth.” 23 And there was evening and there was morning, the fifth day. 24 And God said, “Let the earth bring forth living creatures according to their kinds—livestock and creeping things and beasts of the earth according to their kinds.” And it was so. 25 And God made the beasts of the earth according to their kinds and the livestock according to their kinds, and everything that creeps on the ground according to its kind. And God saw that it was good. 26 Then God said, “Let us make man in our image, after our likeness. And let them have dominion over the fish of the sea and over the birds of the heavens and over the livestock and over all the earth and over every creeping thing that creeps on the earth.” So God created man in his own image, in the image of God he created him; male and female he created them. 28 And God blessed them. And God said to them, “Be fruitful and multiply and fill the earth and subdue it, and have dominion over the fish of the sea and over the birds of the heavens and over every living thing that moves on the earth.” 29 And God said, “Behold, I have given you every plant yielding seed that is on the face of all the earth, and every tree with seed in its fruit. You shall have them for food. 30 And to every beast of the earth and to every bird of the heavens and to everything that creeps on the earth, everything that has the breath of life, I have given every green plant for food.” And it was so. 31 And God saw everything that he had made, and behold, it was very good. And there was evening and there was morning, the sixth day.', {
        fontSize: '20px',
        fill: '#ffffff',
        wordWrap: { width: 550, useAdvancedWrap: true }
    });  
        player.setDepth(1);
                
        });
        
        
    }
}

export default House_2;
