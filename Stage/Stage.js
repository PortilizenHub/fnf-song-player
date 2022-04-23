/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x: 240,
        y: 180
      }),
      new Costume("menuBG", "./Stage/costumes/menuBG.svg", {
        x: 327.3529411764707,
        y: 185.50000000000006
      })
    ];

    this.sounds = [];

    this.triggers = [];

    this.vars.songSongname = "bopeebo";
    this.vars.songSelection = 1;
    this.vars.songId = 2;
    this.vars.songSonglist = ["bopeebo"];
  }
}
