import { Scene } from 'phaser';

import Room from '/sprites/room.png';
import Warehouse from '/sprites/warehouse.png';

export default class PreloadScene extends Scene {
    constructor() {
        super('PreloadScene');
    }
    
    preload() {
        this.load.image('room', Room);
        this.load.image('warehouse', Warehouse);

        this.load.multiatlas('figures', './assets/sprites/figures.json', 'sprites');
    }

    create() {
        this.scene.start('MenuScene', { isRestart: true })
    }
}