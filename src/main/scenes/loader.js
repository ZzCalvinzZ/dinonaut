import * as PIXI from "pixi.js";
import { renderStage, stage, CANVAS } from "../utils";

export default class Loader {
  scene = new PIXI.Container();
  progressText(progress) {
    return `${progress}% loaded`;
  }

  constructor() {
    this.setScene();
  }

  setScene() {
    this.text = new PIXI.Text(`Score: ${this.score}`, {
      fontFamily: "Arial",
      fontSize: 24,
      fill: 0xffffff,
      align: "center",
    });

    this.text.anchor.x = 0.5;
    this.text.anchor.y = 0.5;
    this.text.x = CANVAS.x / 2;
    this.text.y = CANVAS.y / 2;

    this.scene.addChild(this.text);
    stage.addChild(this.scene);
  }

  loadProgress(loader, resource) {
    this.text.text = this.progressText(parseInt(loader.progress) - 1);
    renderStage();
  }
}
