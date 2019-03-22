import BaseScene from '../utilities/base-scene';
import { UP } from '../../shared/constants/directions';
import { MARK_1, TOWN } from '../../shared/constants/scenes';
import { MAP_HOUSE_4, IMAGE_HOUSE } from '../constants/assets';


var stars;
var Bullet;
var bullet;
var bullets;
var speed;
var lastFired = 0;
var readMark1;
var whites;


class Mark_1 extends BaseScene {
    constructor() {
        super(MARK_1);
    }

        init(data2) {
        super.init({ x: 240, y: 365, direction: UP });
         console.log('INSIDE MARK 1');
            console.log('passed data from base-scene', data2)
   //console.log('init', data)
        
    }

        create() {
        super.create(MAP_HOUSE_4, IMAGE_HOUSE, true);
        this.registerTilesetAnimation(this.layers[2]);
       
            
            
           whites = this.physics.add.group({
key: 'white',
repeat: 0,
setXY: { x: 0, y: 0 }
}); 
        whites.children.iterate(function (white) {

				white.setOrigin(0, 0);
            white.displayWidth=8000; 
            white.displayHeight=10000; 
			});          
            
            stars = this.physics.add.group({
key: 'star',
repeat: 2,
setXY: { x: window.innerWidth/2, y: window.innerHeight/0.35 }
});
            var scoreBox = new Phaser.Geom.Rectangle(45, 345, 180, 35);

    var graphics = this.add.graphics({ fillStyle: { color: 0x0000aa } });
    graphics.fillRectShape(scoreBox);
        
        graphics.setScrollFactor(0);

 readMark1 = this.add.text(100,140, 'Mark 1 English Standard Version (ESV) The beginning of the gospel of Jesus Christ, the Son of God. 2 As it is written in Isaiah the prophet, “Behold, I send my messenger before your face, who will prepare your way, 3 the voice of one crying in the wilderness: ‘Prepare the way of the Lord, make his paths straight,’” 4 John appeared, baptizing in the wilderness and proclaiming a baptism of repentance for the forgiveness of sins. 5 And all the country of Judea and all Jerusalem were going out to him and were being baptized by him in the river Jordan, confessing their sins. 6 Now John was clothed with camels hair and wore a leather belt around his waist and ate locusts and wild honey. 7 And he preached, saying, “After me comes he who is mightier than I, the strap of whose sandals I am not worthy to stoop down and untie. 8 I have baptized you with water, but he will baptize you with the Holy Spirit.” 9 In those days Jesus came from Nazareth of Galilee and was baptized by John in the Jordan. 10 And when he came up out of the water, immediately he saw the heavens being torn open and the Spirit descending on him like a dove. 11 And a voice came from heaven, “You are my beloved Son; with you I am well pleased.” 12 The Spirit immediately drove him out into the wilderness. 13 And he was in the wilderness forty days, being tempted by Satan. And he was with the wild animals, and the angels were ministering to him. 14 Now after John was arrested, Jesus came into Galilee, proclaiming the gospel of God, 15 and saying, “The time is fulfilled, and the kingdom of God is at hand; repent and believe in the gospel.” 16 Passing alongside the Sea of Galilee, he saw Simon and Andrew the brother of Simon casting a net into the sea, for they were fishermen. 17 And Jesus said to them, “Follow me, and I will make you become fishers of men.” 18 And immediately they left their nets and followed him. 19 And going on a little farther, he saw James the son of Zebedee and John his brother, who were in their boat mending the nets. 20 And immediately he called them, and they left their father Zebedee in the boat with the hired servants and followed him. 21 And they went into Capernaum, and immediately on the Sabbath he entered the synagogue and was teaching. 22 And they were astonished at his teaching, for he taught them as one who had authority, and not as the scribes. 23 And immediately there was in their synagogue a man with an unclean spirit. And he cried out, 24 “What have you to do with us, Jesus of Nazareth? Have you come to destroy us? I know who you are—the Holy One of God.” 25 But Jesus rebuked him, saying, “Be silent, and come out of him!” 26 And the unclean spirit, convulsing him and crying out with a loud voice, came out of him. 27 And they were all amazed, so that they questioned among themselves, saying, “What is this? A new teaching with authority! He commands even the unclean spirits, and they obey him.” 28 And at once his fame spread everywhere throughout all the surrounding region of Galilee. 29 And immediately he left the synagogue and entered the house of Simon and Andrew, with James and John. 30 Now Simons mother-in-law lay ill with a fever, and immediately they told him about her. 31 And he came and took her by the hand and lifted her up, and the fever left her, and she began to serve them. 32 That evening at sundown they brought to him all who were sick or oppressed by demons. 33 And the whole city was gathered together at the door. 34 And he healed many who were sick with various diseases, and cast out many demons. And he would not permit the demons to speak, because they knew him. 35 And rising very early in the morning, while it was still dark, he departed and went out to a desolate place, and there he prayed. 36 And Simon and those who were with him searched for him, 37 and they found him and said to him, “Everyone is looking for you.” 38 And he said to them, “Let us go on to the next towns, that I may preach there also, for that is why I came out.” 39 And he went throughout all Galilee, preaching in their synagogues and casting out demons. 40 And a leper came to him, imploring him, and kneeling said to him, “If you will, you can make me clean.” 41 Moved with pity, he stretched out his hand and touched him and said to him, “I will; be clean.” 42 And immediately the leprosy left him, and he was made clean. 43 And Jesus sternly charged him and sent him away at once, 44 and said to him, “See that you say nothing to anyone, but go, show yourself to the priest and offer for your cleansing what Moses commanded, for a proof to them.” 45 But he went out and began to talk freely about it, and to spread the news, so that Jesus could no longer openly enter a town, but was out in desolate places, and people were coming to him from every quarter.' + ' ' + 'English Standard Version (ESV) The Holy Bible, English Standard Version. ESV® Text Edition: 2016. Copyright © 2001 by Crossway Bibles, a publishing ministry of Good News Publishers.' , {
        fontSize: '20px',
        fill: '#000000',
        wordWrap: { width: window.innerWidth/1.2, useAdvancedWrap: true }
    }); 
    
        
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
                console.log('Mark1 to Town');
                this.nextSceneKey = TOWN;
                this.onChangeScene();
            }
        });
        
        //Run Collisions with objects Jeff Add On
        this.physics.add.collider(player, stars, (sprite, star) => {
           console.log('star touched');
            star.disableBody(true, true);
            this.updateScoreExtra();
            this.nextSceneKey = TOWN;
                this.onChangeScene();
            
        });
        

        

    
   //END COLLISION 
    }
    // END COLLISION


    
//END OF SCENE   
}
//END OF SCENE
export default Mark_1;
