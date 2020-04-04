import * as PIXI from "pixi.js";
import { CANVAS, renderStage, stage, toRadians } from "../utils";
import Background from "../objects/background";
import Speaker from "../objects/speaker";

export default class ForegroundScene {
  scene = new PIXI.Container();

  constructor() {
    this.setScene();
  }

  setScene() {
    this.speaker = new Speaker({
      scene: this.scene,
    });

    stage.addChild(this.scene);
  }
}
