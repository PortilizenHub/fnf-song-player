/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Menu extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("title", "./Menu/costumes/title.svg", {
        x: 105.5,
        y: 33.314584999999994
      }),
      new Costume("player", "./Menu/costumes/player.svg", {
        x: 47.16666666666666,
        y: 20.981250000000017
      }),
      new Costume("thumbnail", "./Menu/costumes/thumbnail.svg", {
        x: 150.29492957957962,
        y: 115.58254750031718
      })
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.BROADCAST, { name: "Menu" }, this.whenIReceiveMenu),
      new Trigger(
        Trigger.BROADCAST,
        { name: "clonedie" },
        this.whenIReceiveClonedie
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(11, 73);
    this.visible = true;
    this.broadcast("Menu");
  }

  *whenIReceiveMenu() {
    this.broadcast("clonedie");
    this.costume = "title";
    this.goto(11, 73);
    this.visible = true;
    this.createClone();
    this.costume = "player";
    this.y = -57;
    this.createClone();
    this.visible = false;
  }

  *whenIReceiveClonedie() {
    this.visible = false;
    this.deleteThisClone();
  }

  *startAsClone() {
    if (this.costumeNumber == 1) {
      while (true) {
        this.size = 150;
        yield* this.wait(0.04);
        while (!(this.size == 160)) {
          this.size += 1;
          yield;
        }
        while (!(this.size == 150)) {
          this.size += -1;
          yield;
        }
        yield;
      }
    }
  }

  *whenthisspriteclicked() {
    if (this.costumeNumber == 2) {
      this.broadcast("songPlayer");
      yield* this.broadcastAndWait("clonedie");
    }
  }
}
