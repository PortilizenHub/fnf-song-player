/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Songplayer extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("bopeebo", "./Songplayer/costumes/bopeebo.svg", {
        x: 51.75,
        y: 31
      }),
      new Costume("icon-face", "./Songplayer/costumes/icon-face.svg", {
        x: 44.5,
        y: 42
      }),
      new Costume("icon-dad", "./Songplayer/costumes/icon-dad.svg", {
        x: 55.5,
        y: 65
      }),
      new Costume("icon-bf", "./Songplayer/costumes/icon-bf.svg", {
        x: 75,
        y: 41
      })
    ];

    this.sounds = [
      new Sound("bopeebo_Voices", "./Songplayer/sounds/bopeebo_Voices.mp3"),
      new Sound("bopeebo_Inst", "./Songplayer/sounds/bopeebo_Inst.wav"),
      new Sound("scrollMenu", "./Songplayer/sounds/scrollMenu.mp3")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "clonedie" },
        this.whenIReceiveClonedie
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "songPlayer" },
        this.whenIReceiveSongplayer
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "space" },
        this.whenKeySpacePressed
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "play song" },
        this.whenIReceivePlaySong
      ),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "up arrow" },
        this.whenKeyUpArrowPressed
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(
        Trigger.KEY_PRESSED,
        { key: "down arrow" },
        this.whenKeyDownArrowPressed
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(-184, 146);
    this.stage.vars.songSelection = 1;
  }

  *whenIReceiveClonedie() {
    this.visible = false;
    this.deleteThisClone();
  }

  *whenIReceiveSongplayer() {
    this.stage.vars.songSelection = 1;
    this.goto(-184, 146);
    this.visible = true;
    this.stage.vars.songId = 1;
    for (let i = 0; i < this.stage.vars.songSonglist.length; i++) {
      this.costume = this.stage.vars.songSonglist[this.stage.vars.songId - 1];
      this.createClone();
      this.stage.vars.songId += 1;
      yield;
    }
    this.visible = false;
  }

  *whenKeySpacePressed() {
    if (this.stage.vars.songSelection == 1) {
      this.stage.vars.songSongname = "bopeebo";
      this.broadcast("play song");
    }
  }

  *whenIReceivePlaySong() {
    yield* this.startSound("" + this.stage.vars.songSongname + "_Inst");
    yield* this.playSoundUntilDone(
      "" + this.stage.vars.songSongname + "_Voices"
    );
  }

  *whenKeyUpArrowPressed() {
    while (!!this.keyPressed("up arrow")) {
      yield;
    }
    yield* this.startSound("scrollMenu");
    this.stage.vars.songSelection += 1;
    if (this.stage.vars.songSelection > 1) {
      this.stage.vars.songSelection = 1;
    }
  }

  *startAsClone() {
    this.size = 100;
    this.effects.brightness = 0;
    while (true) {
      if (this.stage.vars.songSelection == 1 && this.costumeNumber == 1) {
        this.effects.brightness = 10;
      } else {
        if (this.stage.vars.songSelection > 1 && this.costumeNumber == 1) {
          this.effects.brightness = 0;
        } else {
          null;
        }
      }
      yield;
    }
  }

  *whenKeyDownArrowPressed() {
    while (!!this.keyPressed("down arrow")) {
      yield;
    }
    yield* this.startSound("scrollMenu");
    this.stage.vars.songSelection += -1;
    if (this.stage.vars.songSelection < 1) {
      this.stage.vars.songSelection = 1;
    }
  }
}
