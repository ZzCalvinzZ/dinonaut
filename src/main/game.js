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

import speaker from "../img/speaker.png";
import speaker_off from "../img/speaker_off.png";
import dinonaut from "../img/dinonaut.png";
import planet from "../img/planet.png";
import meteorImg from "../img/meteor.png";
import meteor from "../img/meteor/meteor";
import background from "../img/background/background";
import dinonautshield from "../img/dinonautshield/dinonautshield";
import dinonautwalking from "../img/dinonautwalking/dinonautwalking";
// eslint-disable-next-line import/no-webpack-loader-syntax
import explosion1 from "file-loader!../img/explosion1/explosion1.json";

import dinonauttheme from "../sound/dinonauttheme.ogg";
import explosionsound from "../sound/explosionsound.mp3";
import point from "../sound/point.mp3";
import shield from "../sound/shield.mp3";

console.log('hi',explosion1);
export default class Game {
  images = [
    ["speaker", speaker],
    ["speaker_off", speaker_off],
    ["dinonaut", dinonaut],
    ["planet", planet],
    ["meteorImg", meteorImg],
    ["meteor", meteor],
    ["background", background],
    ["dinonautshield", dinonautshield],
    ["dinonautwalking", dinonautwalking],
    ["explosion1", explosion1],
  ];

  sounds = [
    // [name, filename, loop, volume]
    ["dinonauttheme", dinonauttheme, true, null, this.setupGame.bind(this)],
    ["explosionsound", explosionsound],
    ["point", point],
    ["shield", shield, false, 1],
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
      loader.add(img, imagePath(file));
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

    console.log("hi");
    stage.removeChild(this.loadScreen.scene);

    this.foreground = new ForegroundScene();
    this.background = new BackgroundScene();

    console.log("hi");
    this.menuScreen();
    console.log("now");

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
