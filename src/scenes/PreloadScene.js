import CustomScene from './CustomScene.js';

import { SOUNDS } from '../constants/sounds/sounds.js';

export default class PreloadScene extends CustomScene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Create loading bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
      
        // Loading text
        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Загрузка...', {
            font: '30px Arial',
            fill: '#ffffff',
        }).setOrigin(0.5);
      
        // Progress bar background
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0xB3B5E6, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2, 320, 50);
      
        // Loading bar
        const loadingBar = this.add.graphics();
      
        // Loading progress events
        this.load.on('progress', (value) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xffffff, 1);
            loadingBar.fillRect(width / 2 - 150, height / 2 + 10, 300 * value, 30);
        });
      
        this.load.on('complete', () => {
            loadingBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            progressBar.destroy();
        });

        this.load.image('room', '/sprites/room.png');
        this.load.image('warehouse', '/sprites/warehouse.png');

        this.load.multiatlas('figures', '/sprites/spritesheet.json', 'sprites');

        this.load.audio('drag-01', '/sounds/drag-01.mp3');

        this.load.audio('drop-01', '/sounds/drop-01.mp3');
        this.load.audio('drop-02', '/sounds/drop-02.mp3');
        this.load.audio('drop-03', '/sounds/drop-03.mp3');

        this.load.audio('paper-01', '/sounds/paper-01.mp3');
        this.load.audio('paper-02', '/sounds/paper-02.mp3');
        this.load.audio('paper-03', '/sounds/paper-03.mp3');

        this.load.audio('pencil-01', '/sounds/pencil-01.mp3');
        this.load.audio('pencil-02', '/sounds/pencil-02.mp3');
        this.load.audio('pencil-03', '/sounds/pencil-03.mp3');

        this.load.audio('camera-shutter', '/sounds/camera-shutter.mp3');
        this.load.audio('swoosh-modal', '/sounds/swoosh-modal.mp3');

        this.load.audio('background-music', '/sounds/background-music.mp3');

        this.load.audio('success', '/sounds/success.mp3');

        this.load.audio('mouse-click-sound', '/sounds/mouse-click-sound.mp3');
    }

    create() {
        const allSounds = Object.values(SOUNDS).flatMap((sounds) => sounds);
        allSounds.forEach((sound) => this.createSounds(sound));

        let music;
        if (!music) {
            const soundtrack = SOUNDS.backgroundMusic;
            music = PreloadScene.sounds[soundtrack];

            music.play({
                loop: true,
                volume: 0.2,
            });
        }

        this.scene.start('MenuScene', { isRestart: true });
    }
}
