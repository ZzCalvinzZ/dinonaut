import * as PIXI from "pixi.js";
import { CANVAS, renderStage, stage, toRadians } from "../utils";
import Background from "../objects/background";

export default class BackgroundScene {
  scene = new PIXI.Container();

  constructor() {
    this.setScene();
  }

  setScene() {
    this.background = new Background({
      scene: this.scene,
    });

    stage.addChildAt(this.scene, stage.children.length - 1);
  }

  gameLoop() {}
}
