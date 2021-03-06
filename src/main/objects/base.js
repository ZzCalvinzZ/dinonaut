import * as PIXI from "pixi.js";
import { renderStage, stage } from "../utils";
import KeyboardInput from "../controls";

export class BaseObject {
  constructor(scene) {
    this.scene = scene;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;

    if (this.sprite) {
      this.sprite.x = x;
      this.sprite.y = y;

      this.center = {
        x: x + this.width / 2,
        y: y + this.height / 2,
      };

      if (this.circular) {
        this.sprite.circular = true;
        this.sprite.centerX = this.x;
        this.sprite.centerY = this.y;
      }

      // for bump to work with pivot
      this.sprite.xAnchorOffset = this.sprite.width - this.sprite.pivot.x;
      this.sprite.yAnchorOffset = this.sprite.height - this.sprite.pivot.y;

      if (this.leftFacing) {
        this.sprite.scale.x = -1;
      } else {
        this.sprite.scale.x = 1;
      }
    }
  }

  createSprite() {
    if (this.sprite) {
      this.scene.removeChild(this.sprite);
    }

    this.width = this.texture.width;
    this.height = this.texture.height;

    this.sprite = new PIXI.Sprite(this.texture);

    this.setPivot(this.pivot, this.pivot);

    this.addSprite();
  }

  createAnimatedSprite({
    numOfSheets = 0,
    speed = 1,
    loop = true,
    name = null,
  }) {
    if (this.sprite) {
      this.scene.removeChild(this.sprite);
    }

    let frames = [];

    for (let i = 0; i < numOfSheets; i++) {
      frames.push(PIXI.Texture.fromFrame(`${name}${i}.png`));
    }

    this.width = frames[0].width;
    this.height = frames[0].height;

    this.sprite = new PIXI.extras.AnimatedSprite(frames);
    if (this.circular) this.sprite.circular = true;

    this.sprite.animationSpeed = speed;
    this.sprite.loop = loop;
    this.sprite.play();

    this.setPivot(this.pivot, this.pivot);
    this.addSprite();
  }

  setPivot(x, y) {
    if (this.pivot) {
      this.sprite.pivot.x = this.pivot.x;
      this.sprite.pivot.y = this.pivot.y;
    }
  }

  gameLoop() {
    return;
  }

  addSprite() {
    this.scene.addChild(this.sprite);
  }

  removeSprite() {
    this.scene.removeChild(this.sprite);
  }

  getInput(control) {
    return new KeyboardInput(control);
  }
}

export class CircleBase extends BaseObject {
  circular = true;
}
