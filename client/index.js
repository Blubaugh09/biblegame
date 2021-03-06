import Phaser, { Game } from 'phaser';
import { WIDTH, HEIGHT } from './constants/config';
import Init from './scenes/Init';
import Town from './scenes/Town';
import House_1 from './scenes/House-1';
import House_2 from './scenes/House-2';
import House_3 from './scenes/House-3';
import Mark_1 from './scenes/Mark-1';

const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: [Init, Town, House_1, House_2, House_3, Mark_1],
};

const game = new Game(config);
