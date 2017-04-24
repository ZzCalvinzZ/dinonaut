import {soundPath, imagePath, renderStage, stage, textures, sounds} from 'main/utils';
import Loader from 'main/scenes/loader';
import KeyboardInput from 'main/controls';
import MainScene from 'main/scenes/main';
import MenuScene from 'main/scenes/menu';
import GameOverScene from 'main/scenes/gameover';
import BackgroundScene from 'main/scenes/background';
import ForegroundScene from 'main/scenes/foreground';
import { Howl } from 'howler';

class Game {

	images = [
		['speaker', 'speaker.png'],
		['speaker_off', 'speaker_off.png'],
		['dinonaut', 'dinonaut.png'],
		['planet', 'planet.png'],
		['meteorImg', 'meteor.png'],
		['meteor', 'meteor/meteor.json'],
		['background', 'background/background.json'],
		['dinonautshield', 'dinonautshield/dinonautshield.json'],
		['dinonautwalking', 'dinonautwalking/dinonautwalking.json'],
		['explosion1', 'explosion1/explosion1.json'],
	]

	sounds = [
		// [name, filename, loop, volume]
		['dinonauttheme', 'dinonauttheme.ogg', true],
		['explosionsound', 'explosionsound.mp3'],
		['point', 'point.mp3'],
		['shield', 'shield.mp3', false, 2],
	]

	constructor() {
		this.highScore = 0;
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
		for (let [sound, file, loop, volume] of this.sounds) {
			sounds[sound] = new Howl({
				src: [soundPath(file)],
				loop: loop || false,
				volume: volume || 0.75,
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
		if (this.score > this.highScore) {
			this.highScore = this.score;
		}

		this.currentScene = new GameOverScene({
			newGame: this.newGame.bind(this),
			score: this.score,
			highScore: this.highScore,
		});
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

		this.foreground = new ForegroundScene();
		this.background = new BackgroundScene();

		this.menuScreen();

		sounds.dinonauttheme.play();

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
