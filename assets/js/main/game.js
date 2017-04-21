import {getImage, getSound, renderStage, stage} from 'main/utils';
import Loader from 'main/loader';
import KeyboardInput from 'main/controls';
import audio from 'pixi-audio';

class Game {

	constructor() {
		renderStage();
		this.loadScreen = new Loader();
		this.loadAssets();
	}

	loadAssets() {
		PIXI.loader
			.add('farsa', getImage('farsa.png'))
			.add('track', getSound('ludumdaretrack.mp3'))
			.on("progress", this.loadScreen.loadProgress.bind(this.loadScreen))
			.load(this.setupGame.bind(this));
	}

	setupGame() {
		this.sprite = new PIXI.Sprite(
			PIXI.loader.resources.farsa.texture
		);

		this.track = PIXI.audioManager.getAudio('track');
		this.track.play();

		stage.removeChild(this.loadScreen.scene);
		stage.addChild(this.sprite);
		renderStage();
		this.gameLoop();
	}

	gameLoop(){
		requestAnimationFrame(this.gameLoop.bind(this))
		renderStage()
	}
}

module.exports = Game;
