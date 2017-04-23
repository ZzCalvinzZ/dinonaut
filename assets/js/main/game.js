import {soundPath, imagePath, renderStage, stage, textures, sounds} from 'main/utils';
import Loader from 'main/scenes/loader';
import KeyboardInput from 'main/controls';
import MainScene from 'main/scenes/main';
import { Howl } from 'howler';

class Game {

	images = [
		['dinonaut', 'dinonaut.png'],
		['planet', 'planet.png'],
		['meteor', 'meteor.png'],
		['background', 'background/background.json'],
		['dinonautshield', 'dinonautshield/dinonautshield.json'],
	]

	sounds = [
		['dinonauttheme', 'dinonauttheme.ogg'],
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
			sounds[sound] = new Howl({
				src: [soundPath(file)]
			});;
		}
	}

	setupGame() {

		this.setTextures();
		this.setSounds();

		stage.removeChild(this.loadScreen.scene);

		this.currentScene = new MainScene();
		
		renderStage();

		sounds.dinonauttheme.loop = true;
		sounds.dinonauttheme.play();

		this.gameLoop();
	}

	gameLoop(){
		requestAnimationFrame(this.gameLoop.bind(this))
		this.currentScene.gameLoop();
		renderStage()
	}
}

module.exports = Game;
