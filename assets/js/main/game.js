import {soundPath, imagePath, renderStage, stage, textures, sounds} from 'main/utils';
import Loader from 'main/scenes/loader';
import KeyboardInput from 'main/controls';
import audio from 'pixi-audio';
import MainScene from 'main/scenes/main';

class Game {

	images = [
		['player', 'player.png'],
		['planet', 'planet.png'],
		['meteor', 'meteor.png'],
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
			loader.add(img, imagePath(file))
		}

		for (let [sound, file] of this.sounds) {
			loader.add(sound, soundPath(file))
		}

		loader
			.on("progress", this.loadScreen.loadProgress.bind(this.loadScreen))
			.load(this.setupGame.bind(this));

	}

	setTextures() {
		for (let [img, file] of this.images) {
			textures[img] = PIXI.loader.resources[img].texture;
		}
	}

	setSounds() {
		for (let [sound, file] of this.sounds) {
			sounds[sound] = new PIXI.Sprite(PIXI.loader.resources[sound].texture);
		}
	}

	setupGame() {

		this.setTextures();

		stage.removeChild(this.loadScreen.scene);

		this.currentScene = new MainScene();
		
		renderStage();
		this.gameLoop();
	}

	gameLoop(){
		requestAnimationFrame(this.gameLoop.bind(this))
		this.currentScene.gameLoop();
		renderStage()
	}
}

module.exports = Game;
