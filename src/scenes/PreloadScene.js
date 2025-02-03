import { Scene } from 'phaser';

import Room from '../assets/images/Room1.png'
import Chair from '../assets/images/Chair.png'


export default class PreloadScene extends Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.load.image('room', Room);
        this.load.image('chair', Chair);
    }
    
    create() {
        this.scene.start('GameScene', { isRestart: true })
    }
}