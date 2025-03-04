import CustomScene from './CustomScene.js';

import Room from '../../public/assets/sprites/room.png';
import Warehouse from '../../public/assets/sprites/warehouse.png';

import Figures from '../../public/assets/sprites/figures.json';

import Drag01 from '../../public/assets/sounds/drag-01.mp3'
import Drop01 from '../../public/assets/sounds/drop-01.mp3'
import Drop02 from '../../public/assets/sounds/drop-02.mp3'
import Drop03 from '../../public/assets/sounds/drop-03.mp3'
import Paper01 from '../../public/assets/sounds/paper-01.mp3'
import Paper02 from '../../public/assets/sounds/paper-02.mp3'
import Paper03 from '../../public/assets/sounds/paper-03.mp3'
import Pencil01 from '../../public/assets/sounds/pencil-01.mp3'
import Pencil02 from '../../public/assets/sounds/pencil-02.mp3'
import Pencil03 from '../../public/assets/sounds/pencil-03.mp3'
import CameraShutter from '../../public/assets/sounds/camera-shutter.mp3'
import SwooshModal from '../../public/assets/sounds/swoosh-modal.mp3'
// import BackgroundMusic from '../../public/assets/sounds/background-music.mp3'
import Success from '../../public/assets/sounds/success.mp3'
import MouseClickSound from '../../public/assets/sounds/mouse-click-sound.mp3'

import { SOUNDS } from '../constants/sounds/sounds.js'

export default class PreloadScene extends CustomScene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        const base = '/5S_Work_Flow';

        this.load.image('room', Room);
        this.load.image('warehouse', Warehouse);

        this.load.multiatlas('figures', Figures, `${base}/assets/sprites`);

        this.load.audio('drag-01', Drag01);

        this.load.audio('drop-01', Drop01);
        this.load.audio('drop-02', Drop02);
        this.load.audio('drop-03', Drop03);

        this.load.audio('paper-01', Paper01);
        this.load.audio('paper-02', Paper02);
        this.load.audio('paper-03', Paper03);

        this.load.audio('pencil-01', Pencil01);
        this.load.audio('pencil-02', Pencil02);
        this.load.audio('pencil-03', Pencil03);

        this.load.audio('camera-shutter', CameraShutter);
        this.load.audio('swoosh-modal', SwooshModal);

        // this.load.audio('background-music', BackgroundMusic);

        this.load.audio('success', Success);

        this.load.audio('mouse-click-sound', MouseClickSound);
    }

    create() {
        const allSounds = Object.values(SOUNDS).flatMap(sounds => sounds);
        allSounds.forEach(sound => this.createSounds(sound));

        // let music;
        // if (!music) {
        //     const soundtrack = SOUNDS.backgroundMusic;
        //     music = PreloadScene.sounds[soundtrack];

        //     music.play({
        //         loop: true,
        //         volume: 0.2,
        //     });
        // }

        // this.scene.start('MenuScene', { isRestart: true })
    }
}