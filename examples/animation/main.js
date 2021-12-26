import regeneratorRuntime from "regenerator-runtime";

import * as THREE from 'three';
import { TextureMap, Sprite }  from 'simple2d';
import simple2d from 'simple2d';

import roguelikeChar from '../img/roguelikeChar_transparent.png';


const _VS = `
uniform float pointMultiplier;
attribute float size;
attribute float angle;
attribute vec4 colour;
varying vec4 vColour;
varying vec2 vAngle;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  vColour = colour;
  gl_PointSize = size * pointMultiplier / gl_Position.w;
  vAngle = vec2(cos(angle), sin(angle));
  // vAngle = vec2(0, 0);
}`;

const _FS = `
uniform sampler2D diffuseTexture;
varying vec4 vColour;
varying vec2 vAngle;
void main() {
  vec2 dim = vec2(54.0, 12.0);
  vec2 sprite = vec2(0.0, 1.0);

  vec2 coords = (gl_PointCoord - 0.5) * mat2(vAngle.x, vAngle.y, -vAngle.y, vAngle.x) + 0.5;
  coords = (coords / dim) + sprite*(1.0/dim);// + sprite*gl_PointCoord;
  // vec2 coords = gl_PointCoord;

  gl_FragColor = texture2D(diffuseTexture, coords)* vColour;
  // gl_FragColor =  vColour;
}`;

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
const sprite = rootLayer.createSprite(texture, 10, 0, 1, 1);

let tick = 0;

console.log(new THREE.TextureLoader().load('./img/roguelikeChar_transparent.png'))
const textureTest = new THREE.TextureLoader().load('./img/roguelikeChar_transparent.png');
textureTest.magFilter = THREE.NearestFilter;
textureTest.minFilter = THREE.NearestMipmapNearestFilter;
// textureTest.needsUpdate = true;
const uniforms = {
  diffuseTexture: {
    value: textureTest
  },
  pointMultiplier: {
    value: window.innerHeight / (2.0 * Math.tan(0.5 * 60.0 * Math.PI / 180.0))
  }
};

const _material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  vertexShader: _VS,
  fragmentShader: _FS,
  // blending: THREE.AdditiveBlending,
  depthTest: true,
  depthWrite: false,
  transparent: true,
  vertexColors: true
});
// _material.map.minFilter = THREE.NearestFilter;

const _geometry = new THREE.BufferGeometry();
_geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));
_geometry.setAttribute('size', new THREE.Float32BufferAttribute([], 1));
// _geometry.setAttribute('uv', new THREE.Float32BufferAttribute([], 2));
_geometry.setAttribute('colour', new THREE.Float32BufferAttribute([], 4));
_geometry.setAttribute('angle', new THREE.Float32BufferAttribute([], 1));

const _points = new THREE.Points(_geometry, _material);
// const _points = new THREE.Mesh(_geometry, _material);


scene.add(_points);

texture.onUpdate(() => {
  // _material.uniforms.diffuseTexture.value = texture.texture._texture;
  const positions = [];
  // const positions = new Float32Array( 18 * 5 );
  const uv = new Float32Array( 12 * 5 );
  const sizes = [];

  const colours = [];
  const angles = [];

  const randomNum = (min, max) => {
    const delta = max - min;
    return (Math.random() * delta + min) * 1.0;
  }

  for (let i=0; i<1; i++) {
    // positions.push(randomNum(-2, 2), randomNum(-2, 2), randomNum(-2, 2));
    positions.push(randomNum(-2, 2), randomNum(-2, 2), randomNum(-2, 2));
    sprite.updatePosition(randomNum(-2, 2), randomNum(-2, 2))
    colours.push(1, 0, 0, .5);
    sizes.push(15);
    angles.push(Math.PI*1);
    // sprite.applyVertices(positions, i);
    sprite.applyUV(uv, i);
  }
  // console.log(uv)

  _geometry.setAttribute(
      'position', new THREE.Float32BufferAttribute(positions, 3));
  _geometry.setAttribute(
      'size', new THREE.Float32BufferAttribute(sizes, 1));
  // _geometry.setAttribute(
  //     'uv', new THREE.Float32BufferAttribute(uv, 4));
  _geometry.setAttribute(
      'colour', new THREE.Float32BufferAttribute(colours, 4));
  _geometry.setAttribute(
      'angle', new THREE.Float32BufferAttribute(angles, 1));

  _geometry.attributes.position.needsUpdate = true;
  _geometry.attributes.size.needsUpdate = true;
  // _geometry.attributes.uv.needsUpdate = true;
  _geometry.attributes.colour.needsUpdate = true;
  _geometry.attributes.angle.needsUpdate = true;

  _geometry.computeVertexNormals();

  sprite.updatePosition(10, 0);
})



gameLoop(() => {
  
});
