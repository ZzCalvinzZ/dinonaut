import { BaseObject } from "./base";
import { getTexture, CANVAS, sounds } from "../utils";

export default class Speaker extends BaseObject {
  constructor({ x = 0, y = 0, scene = null }) {
    super(scene);
    this.name = "speaker";
    this.makeSprite();
  }

  makeSprite() {
    this.texture = getTexture(this.name);
    this.createSprite();
    this.sprite.interactive = true;
    this.setPosition(CANVAS.x - 40, 20);

    this.sprite.on("click", () => {
      if (this.name === "speaker") {
        this.name = "speaker_off";
        this.muteSounds(true);
      } else {
        this.name = "speaker";
        this.muteSounds(false);
      }
      this.makeSprite();
    });

    this.sprite.on("mouseover", () => {
      document.body.style.cursor = "pointer";
    });

    this.sprite.on("mouseout", () => {
      document.body.style.cursor = "initial";
    });
  }

  muteSounds(action) {
    Object.keys(sounds).forEach(function(key) {
      sounds[key].mute(action);
    });
  }
}
