import {soundPath, imagePath, renderStage, stage, textures, sounds} from 'main/utils';
import Loader from 'main/scenes/loader';
import KeyboardInput from 'main/controls';
import MainScene from 'main/scenes/main';
import MenuScene from 'main/scenes/menu';
import { Howl } from 'howler';

class Game {

	images = [
		['dinonaut', 'dinonaut.png'],
		['planet', 'planet.png'],
		['meteor', 'meteor.png'],
		['background', 'background/background.json'],
		['dinonautshield', 'dinonautshield/dinonautshield.json'],
		['dinonautwalking', 'dinonautwalking/dinonautwalking.json'],
	]

	sounds = [
		['dinonauttheme', 'dinonauttheme.ogg', true],
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
		for (let [sound, file, loop] of this.sounds) {
			sounds[sound] = new Howl({
				src: [soundPath(file)],
				loop: loop || false
			});;
		}
	}

	removeCurrentScene() {
		if (this.currentScene) {
			stage.removeChild(this.currentScene.scene)
		}
	}

	gameOver() {
		this.removeCurrentScene();
		this.score = this.currentScene.score;

		//this.currentScene = new GameOverScene({gameOver: this.gameOver.bind(this)});
		renderStage(); 
	}

	newGame() {
		this.removeCurrentScene();
		this.currentScene = new MainScene({gameOver: this.gameOver.bind(this)});
		renderStage();

	}

	menuScreen() {
		this.removeCurrentScene();
		this.currentScene = new MenuScene({newGame: this.newGame.bind(this)});
		renderStage();
	}

	setupGame() {

		this.setTextures();
		this.setSounds();

		stage.removeChild(this.loadScreen.scene);

		this.menuScreen();

		//sounds.dinonauttheme.play();

		this.gameLoop();
	}

	gameLoop(){
		requestAnimationFrame(this.gameLoop.bind(this))
		if (this.currentScene.gameLoop) {
			this.currentScene.gameLoop();
		}
		renderStage()
	}
}

module.exports = Game;
