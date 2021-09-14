import regeneratorRuntime from "regenerator-runtime";

import * as THREE from 'three';;
import { TextureMap, GroupMeshHandler, Sprite }  from 'simple2d';
import simple2d from 'simple2d';

import roguelikeChar from '../img/roguelikeChar_transparent.png';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 60;

const handler = GroupMeshHandler.getRootHandler();
handler.scene = scene;
handler.setDefaultZ(0);

const renderer = new THREE.WebGLRenderer({
  alpha : true,
});
renderer.getPixelRatio(window.devicePixelRatio);
const exampleDom = document.getElementById('example');
exampleDom.appendChild( renderer.domElement );

const resizeCanvas = () => {
  // camera.aspect = window.innerWidth / window.innerHeight;
  camera.aspect = 800 / 600;
  camera.updateProjectionMatrix();
  renderer.setSize( 800, 600, false);
}

window.addEventListener('resize', () => {
  resizeCanvas();
}, false);
resizeCanvas();

const roguelikeCharTexture = new simple2d.ImageTexture(roguelikeChar);
const roguelikeCharTextureMap = new TextureMap(roguelikeCharTexture, TextureMap.OrginalUVScalerPadding(roguelikeCharTexture, 16, 16, 1));
roguelikeCharTextureMap.countX = 54;
roguelikeCharTextureMap.countY = 12;

const texture = roguelikeCharTextureMap.getTexture(324);
const sprite = handler.createSprite(texture, 0, 0, 4, 4);

let tick = 0;

const gameLoop = function () {
  requestAnimationFrame( gameLoop );

  sprite.updatePosition(Math.sin(tick++/20)*5, 0)

  handler.checkMeshes();
  renderer.render( scene, camera );
};


requestAnimationFrame( gameLoop );