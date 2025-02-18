import { Scene } from 'phaser';

import Room from '/sprites/room.png';

export default class PreloadScene extends Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // this.load.css(style, '../styles/style.css');

        this.load.image('room', Room);

        // this.load.multiatlas('spritesheet', './assets/sprites/spritesheet.json', 'sprites');
        this.load.multiatlas('figures', './assets/sprites/figures.json', 'sprites');
    }

    create() {
        this.scene.start('MenuScene', { isRestart: true })
    }
}