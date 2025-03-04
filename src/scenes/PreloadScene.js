import CustomScene from './CustomScene.js';

import Room from '/sprites/room.png';
import Warehouse from '/sprites/warehouse.png';

import { SOUNDS } from '../constants/sounds/sounds.js'

export default class PreloadScene extends CustomScene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        this.load.image('room', Room);
        this.load.image('warehouse', Warehouse);

        this.load.multiatlas('figures', './assets/sprites/figures.json', 'sprites');

        this.load.audio('drag-01', '/5S_Work_Flow/assets/sounds/drag-01.mp3');

        this.load.audio('drop-01', '/5S_Work_Flow/assets/sounds/drop-01.mp3');
        this.load.audio('drop-02', '/5S_Work_Flow/assets/sounds/drop-02.mp3');
        this.load.audio('drop-03', '/5S_Work_Flow/assets/sounds/drop-03.mp3');

        this.load.audio('paper-01', '/5S_Work_Flow/assets/sounds/paper-01.mp3');
        this.load.audio('paper-02', '/5S_Work_Flow/assets/sounds/paper-02.mp3');
        this.load.audio('paper-03', '/5S_Work_Flow/assets/sounds/paper-03.mp3');

        this.load.audio('pencil-01', '/5S_Work_Flow/assets/sounds/pencil-01.mp3');
        this.load.audio('pencil-02', '/5S_Work_Flow/assets/sounds/pencil-02.mp3');
        this.load.audio('pencil-03', '/5S_Work_Flow/assets/sounds/pencil-03.mp3');

        this.load.audio('camera-shutter', '/5S_Work_Flow/assets/sounds/camera-shutter.mp3');
        this.load.audio('swoosh-modal', '/5S_Work_Flow/assets/sounds/swoosh-modal.mp3');

        this.load.audio('background-music', '/5S_Work_Flow/assets/sounds/background-music.mp3');

        this.load.audio('success', '/5S_Work_Flow/assets/sounds/success.mp3');

        this.load.audio('mouse-click-sound', '/5S_Work_Flow/assets/sounds/mouse-click-sound.mp3');
    }

    create() {
        const allSounds = Object.values(SOUNDS).flatMap(sounds => sounds);
        allSounds.forEach(sound => this.createSounds(sound));

        let music;
        if (!music) {
            const soundtrack = SOUNDS.backgroundMusic;
            music = PreloadScene.sounds[soundtrack];

            music.play({
                loop: true,
                volume: 0.2,
            });
        }

        this.scene.start('MenuScene', { isRestart: true })
    }
}