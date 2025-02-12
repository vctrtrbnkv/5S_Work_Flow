import { Scene } from 'phaser';

import Room from '../sprites/Room1.png';
import Chair from '../sprites/Chair.png';


export default class PreloadScene extends Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.load.image('room', Room);
        this.load.image('chair', Chair);
        this.load.multiatlas('spritesheet', 'sprites/spritesheet.json', 'sprites');
        
    }
    
    create() {
        this.scene.start('GameScene', { isRestart: true })
    }
}