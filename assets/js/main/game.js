import {getImage, getSound, renderStage, stage} from 'main/utils';
import Loader from 'main/loader';
import KeyboardInput from 'main/controls';
import audio from 'pixi-audio';

class Game {

	images = [
		['farsa', 'farsa.png'],
	]

	sounds = [
		['track', 'ludumdaretrack.mp3'],
	]

	constructor() {
		renderStage();
		this.loadScreen = new Loader();
		this.loadAssets();
	}

	loadAssets() {
		let loader = PIXI.loader

		for (let [img, file] of this.images) {
			loader.add(img, getImage(file))
		}

		for (let [sound, file] of this.sounds) {
			loader.add(sound, getSound(file))
		}

		loader
			.on("progress", this.loadScreen.loadProgress.bind(this.loadScreen))
			.load(this.setupGame.bind(this));

	}

	setSprites() {
		for (let [img, file] of this.images) {
			this[img] = new PIXI.Sprite(PIXI.loader.resources[img].texture);
		}
	}

	setSounds() {
		for (let [sound, file] of this.sounds) {
			this[sound] = new PIXI.Sprite(PIXI.loader.resources[sound].texture);
		}
	}

	setupGame() {

		this.setSprites();
		this.track = PIXI.audioManager.getAudio('track');
		this.track.play();

		stage.removeChild(this.loadScreen.scene);
		stage.addChild(this.farsa);
		renderStage();
		this.gameLoop();
	}

	gameLoop(){
		requestAnimationFrame(this.gameLoop.bind(this))
		renderStage()
	}
}

module.exports = Game;
