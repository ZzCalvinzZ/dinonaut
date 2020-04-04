import { CircleBase } from "./base";
import { getTexture, toRadians } from "../utils";

export default class Player extends CircleBase {
  name = "dinonaut";

  setControls() {
    this.left = this.getInput({
      key: "left",
      onPress: this.walkLeft.bind(this),
      onRelease: this.unwalk.bind(this),
    });
    this.right = this.getInput({
      key: "right",
      onPress: this.walkRight.bind(this),
      onRelease: this.unwalk.bind(this),
    });
    this.space = this.getInput({
      key: "space",
      onPress: this.activateShield.bind(this),
      onRelease: this.deactivateShield.bind(this),
    });
  }

  constructor({ x = 0, y = 0, scene = null, angle = null, rotation = 0 }) {
    super(scene);

    this.texture = getTexture(this.name);
    this.radius = this.texture.height / 2;

    //pivot based on bottom middle of feet
    this.pivot = {
      x: this.texture.width / 2,
      y: this.texture.height,
    };

    this.angle = angle;
    this.rotation = rotation;
    this.setControls();

    this.createSprite();
    this.setPosition(x, y);
  }

  setPosition(x, y) {
    this.sprite.rotation = toRadians(this.rotation);
    super.setPosition(x, y);
    this.sprite.radius = 40;
  }

  setSprite() {
    this.texture = getTexture(this.name);
    this.createSprite();
    this.setPosition(this.x, this.y);
  }

  moveLeft(i) {
    this.angle -= i;
    this.rotation -= i;
  }

  moveRight(i) {
    this.angle += i;
    this.rotation += i;
  }

  canWalk() {
    return !this.shielding;
  }

  walkLeft() {
    this.leftFacing = true;
    this.walk();
  }

  walkRight() {
    this.leftFacing = false;
    this.walk();
  }

  walk() {
    if (this.canWalk()) {
      this.walking = true;
      this.createAnimatedSprite({
        numOfSheets: 2,
        speed: 0.1,
        name: "dinonautwalking",
      });
      this.setPosition(this.x, this.y);
    }
  }

  unwalk() {
    if (this.canWalk()) {
      this.setSprite();
    }
  }

  activateShield(e) {
    this.createAnimatedSprite({
      numOfSheets: 3,
      speed: 0.25,
      loop: false,
      name: "dinonautshield",
    });
    this.setPosition(this.x, this.y);
    this.shielding = true;
  }

  deactivateShield(e) {
    this.setSprite();
    this.shielding = false;

    // this needs to be here if you are trying to walk during shielding
    if (this.walking) {
      this.walk();
    }
  }
}
