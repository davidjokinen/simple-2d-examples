import regeneratorRuntime from "regenerator-runtime";

import { TextureMap, Sprite }  from 'simple2d';
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
const roguelikeCharTextureMap = new TextureMap(roguelikeCharTexture, TextureMap.OrginalUVScalerPadding(roguelikeCharTexture, 16, 16, 1));
roguelikeCharTextureMap.countX = 54;
roguelikeCharTextureMap.countY = 12;

const texture = roguelikeCharTextureMap.getTexture(324);
const sprite = rootLayer.createSprite(texture, 0, 0, 4, 4);
sprite.tint = 0xFF0000;
const sprite2 = rootLayer.createSprite(texture, 4, 0, 4, 4);


let tick = 0;

gameLoop(() => {
  tick += 1;

  const alpha = Math.sin(tick/20)/2+.5;
  sprite.alpha = alpha;
  
  sprite2.tint = (~~((Math.sin(tick/45)/2+.5)*255) << 16) + 0xFFFF;
});
