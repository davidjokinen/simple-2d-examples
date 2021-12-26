import regeneratorRuntime from "regenerator-runtime";

import simple2d from 'simple2d';

import roguelikeChar from '../img/roguelikeChar_transparent.png';

const {
  scene,
  camera,
  renderer,
  rootLayer,
  gameLoop
} = simple2d.createApp({
  target: 'example',
  width: 800,
  height: 600
});

const roguelikeCharTexture = new simple2d.ImageTexture(roguelikeChar);
const roguelikeCharTexture = ;
// Scaling stuff.... 
const roguelikeCharTextureMap = new simple2d.TextureMap(roguelikeCharTexture, TextureMap.OrginalUVScalerPadding(roguelikeCharTexture, 16, 16, 1));

const roguelikeCharTextureMap = new simple2d.TextureMap(simple2d.Texture.from(roguelikeChar), simple2d.TextureMap.padding(16, 16, 1));
// TODO: Can this be removed? 
// roguelikeCharTextureMap.countX = 54;
// roguelikeCharTextureMap.countY = 12;

// Can this be x, y too? 
const texture = roguelikeCharTextureMap.getTexture(324);
// Update the name of the function?
const sprite = rootLayer.newSprite(texture, 0, 0, 4, 4);

const sprite = rootLayer.newSprite(roguelikeCharTextureMap.getTexture(324), 0, 0, 4, 4);

let tick = 0;

gameLoop(() => {
  sprite.updatePosition(Math.sin(tick++/20)*5, 0);
});
