import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Menu from "./Menu/Menu.js";
import Songplayer from "./Songplayer/Songplayer.js";

const stage = new Stage({ costumeNumber: 2 });

const sprites = {
  Menu: new Menu({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 3,
    size: 100,
    visible: true
  }),
  Songplayer: new Songplayer({
    x: -184,
    y: 146,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  })
};

const project = new Project(stage, sprites);
export default project;
