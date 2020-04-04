import * as PIXI from "pixi.js";
import { Howl } from "howler";
import {
  soundPath,
  imagePath,
  renderStage,
  stage,
  textures,
  sounds,
} from "./utils";
import Loader from "./scenes/loader";
import MainScene from "./scenes/main";
import MenuScene from "./scenes/menu";
import GameOverScene from "./scenes/gameover";
import BackgroundScene from "./scenes/background";
import ForegroundScene from "./scenes/foreground";

export default class Game {
  images = [
    ["speaker", "speaker.png"],
    ["speaker_off", "speaker_off.png"],
    ["dinonaut", "dinonaut.png"],
    ["planet", "planet.png"],
    ["meteorImg", "meteor.png"],
    ["meteor", "meteor/meteor.json"],
    ["background", "background/background.json"],
    ["dinonautshield", "dinonautshield/dinonautshield.json"],
    ["dinonautwalking", "dinonautwalking/dinonautwalking.json"],
    ["explosion1", "explosion1/explosion1.json"],
  ];

  sounds = [
    // [name, filename, loop, volume]
    [
      "dinonauttheme",
      "dinonauttheme.ogg",
      true,
      null,
      this.setupGame.bind(this),
    ],
    ["explosionsound", "explosionsound.mp3"],
    ["point", "point.mp3"],
    ["shield", "shield.mp3", false, 1],
  ];

  constructor() {
    this.highScore = 0;
    renderStage();
    this.loadScreen = new Loader();
    this.loadAssets();
  }
  loadAssets() {
    let loader = PIXI.loader;

    for (let [img, file] of this.images) {
      loader.add(img, file);
    }

    loader
      .on("progress", this.loadScreen.loadProgress.bind(this.loadScreen))
      .load(this.setSounds.bind(this));
  }

  setTextures() {
    for (let [img, file] of this.images) {
      textures[img] = PIXI.loader.resources[img].texture;
    }
  }

  setSounds() {
    for (let [sound, file, loop, volume, onload] of this.sounds) {
      sounds[sound] = new Howl({
        src: [file],
        loop: loop || false,
        volume: volume || 0.3,
        html5: true,
        onload: onload || function() {},
      });
    }
  }

  removeCurrentScene() {
    if (this.currentScene) {
      stage.removeChild(this.currentScene.scene);
    }
  }

  gameOver() {
    if (!this.gameIsOver) {
      this.gameIsOver = true;
      this.removeCurrentScene();
      this.score = this.currentScene.score;
      this.maxSpeed = this.currentScene.playerSpeed;
      if (this.score > this.highScore) {
        this.highScore = this.score;
      }

      this.currentScene = new GameOverScene({
        newGame: this.newGame.bind(this),
        score: this.score,
        highScore: this.highScore,
        maxSpeed: this.maxSpeed,
      });
      renderStage();
    }
  }

  newGame() {
    this.gameIsOver = false;
    this.removeCurrentScene();
    this.currentScene = new MainScene({ gameOver: this.gameOver.bind(this) });
    renderStage();
  }

  menuScreen() {
    this.removeCurrentScene();
    this.currentScene = new MenuScene({ newGame: this.newGame.bind(this) });
    renderStage();
  }

  setupGame() {
    this.setTextures();

    stage.removeChild(this.loadScreen.scene);

    this.foreground = new ForegroundScene();
    this.background = new BackgroundScene();

    this.menuScreen();

    sounds.dinonauttheme.play();

    this.gameLoop();
  }

  gameLoop() {
    requestAnimationFrame(this.gameLoop.bind(this));
    if (this.currentScene.gameLoop) {
      this.currentScene.gameLoop();
    }
    renderStage();
  }
}
