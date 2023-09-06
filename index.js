'use strict';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { SolarCamera } from './js/Camera.js';
import {Planet} from './js/Planet.js'
import { Sun } from './js/Sun.js';

const raycaster = new THREE.Raycaster()
let intersects;


let MainCamera, xCamera, controls, scene, renderer;
let SCREEN_WIDTH = window.innerWidth;
let SCREEN_HEIGHT = window.innerHeight;
let pivot;
let cubes=[];
let planetObj =[];
let intersectedObject;
let sun, sunObject;
let numOfPlanets = 8;
let planetControl =[];

let orbitSpeed = [1, 5, 0.09, 11, 1, 0.05, 5, 10]	//Planets initial orbit speed
let Speed = [0.16, 0.1, 0.056, 0.04, 0.02, 0.01, 0.009, 0.008]	//the speed of the planets orbit
let orbit = [13, 20, 27, 32, 37, 43, 49, 54]	//The distance of each planet from the sun

let flag;
let toggleCamera = document.getElementById('toggleCam');

let names = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
let sunloc ={
	x: 0.1,
	y: 1.0,
	z: 0.1
}
let details ={
	Mercury: "<div>Length of Year: 88 earth days</div><div>Moons: 0</div><div class='info'>Our Moon is just slightly larger than Mercury, the smallest planet in our solar system and the nearest to the Sun. Mercury is the quickest planet, circling the Sun every 88 Earth days. </div>",
	Venus: "<div>Length of Year: 225 earth days</div><div>Moons: 0</div><div class='info'>Most planets rotate slowly in the opposite direction as Venus. Because of its thick atmosphere, which traps heat in a runaway greenhouse effect, it is the hottest planet in our solar system. </div>",
	Earth: "<div>Length of Year: 365 earth days</div><div>Moons: 1</div><div class='info'>Earth, our home planet, is the only place we know of where living beings may be found. It is also the only planet in our solar system with surface liquid water. </div>",
	Mars: "<div>Length of Year: 1.88 earth years</div><div>Moons: 2</div><div class='info'>Mars is a sandy, frigid desert planet with a very thin atmosphere. There is significant evidence that Mars was wetter and warmer billions of years ago, with a thicker atmosphere. </div>",
	Jupiter: "<div>Length of Year: 11.86 earth years</div><div>Moons: 79</div><div class='info'>Jupiter is more than twice as huge as our solar system's other planets combined. The Great Red Spot on Jupiter is a centuries-old storm larger than Earth. </div>",
	Saturn: "<div>Length of Year: 29.7 earth years</div><div>Moons: 62</div><div class='info'>Saturn is the only planet in our solar system with a stunning, complicated system of ice rings. The rings of the other large planets are stunning, but none are as spectacular as Saturn's. </div>",
	Uranus: "<div>Length of Year: 84 earth years</div><div>Moons: 27</div><div class='info'>Uranus, the seventh planet from the Sun, spins at approximately a 90-degree inclination from its orbital plane. Uranus seems to rotate on its side as a result of its unusual tilt. </div>",
	Neptune: "<div>Length of Year: 164.81 earth years</div><div>Moons: 14</div><div class='info'>Neptune, our Sun's eighth and most distant main planet, is dark, frigid, and buffeted by supersonic winds. It was the first planet discovered using mathematics rather than a telescope.</div>",
}

Init()
document.addEventListener('click', Picking, false)

function Init(){

	SetUpScene();
	const canvas = document.querySelector('#canvas');
	renderer = new THREE.WebGLRenderer({canvas});
	renderer.setClearColor(0xEEEEEE);
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	document.body.appendChild(renderer.domElement);

	//Set up our sun
	sun = new Sun(8.5, sunloc, './js/sun.jpg');
	sunObject = sun.Sun;
	scene.add(sunObject);

	//Create light and pass it for each planets
	const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	CreatePlanet(directionalLight);
	scene.add(directionalLight);
	//Set uo the camera
	xCamera= new SolarCamera(sunObject, scene);
	pivot = xCamera.Pivot;
	scene.add(pivot);
	
	MainCamera = xCamera.RotatingCamera;

	//Setup camera controls
   	OrbitControl();
	GUIControl();
	toggleCamera.addEventListener('click',()=>{
		xCamera.SetIsRotate()
	});

	//Camera
	window.addEventListener( 'resize', onWindowResize );
	render(flag)

}

//Function to setup scene
function SetUpScene()
{
	//Set up skybox texture
	const loader = new THREE.CubeTextureLoader();
	loader.setPath( 'js/bkg/blue/' );
	const textureCube = loader.load( [
		'bkg1_right.png', 'bkg1_left.png',
		'bkg1_top.png', 'bkg1_bot.png',
		'bkg1_front.png', 'bkg1_back.png'
	] );
	scene = new THREE.Scene();
	scene.background = textureCube;
}
//Functiont to create the planets
function CreatePlanet(directionalLight){
	//Create i number of planets
	for(let i = 0; i < numOfPlanets; i++){
		InitializePlanet(i, directionalLight);
	}
}
function OrbitControl(){
	//controls
	controls = new OrbitControls( MainCamera, renderer.domElement );
	controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.05;
	controls.screenSpacePanning = false;
	controls.minDistance = 10;
	controls.maxDistance = 100;
	controls.maxPolarAngle = Math.PI / 2;

}
function CubeLocation(){
	//USE TREE HERE MAYBE 
	let i =0;
	cubes.forEach(element => {
		orbitSpeed[i] +=(Speed[i]/10)
		element.position.set(Math.cos(orbitSpeed[i]) * orbit[i], 0, Math.sin(orbitSpeed[i]) * orbit[i]);
		i+=1;
	});
}
function onWindowResize() {

	MainCamera.aspect = window.innerWidth / window.innerHeight;
	MainCamera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}
function render(flag) {
	CubeLocation()		//Uncomment to test
	ToogleRotation(flag)
	renderer.render(scene, MainCamera);
	requestAnimationFrame(render);
}
function InitializePlanet(i, directionalLight){
	let current;
	//Switch statement to set the objects position
	switch (i)
	{
		case 0:
			{
				current= new Planet(names[i], 1.2, './js/texture.jpg')
				planetObj[i] = current;
				current.GetLocation(1, 1.0, -13);
				cubes[i] = current.Planet;
				scene.add(cubes[i]);
    			
				cubes[i].lookAt(sunObject.position);
				cubes[i].add(directionalLight);
				break;
			}
		case 1:
			{
				current= new Planet(names[i], 1.6, './js/texture2.jpg')
				planetObj[i] = current;
				current.GetLocation(1, 1.0, -18);
				cubes[i] = current.Planet;
				scene.add(cubes[i]);
    			
				cubes[i].lookAt(sunObject.position);
				cubes[i].add(directionalLight);
				break;
			}
		case 2:
			{
				current= new Planet(names[i], 1.6, './js/texture3.jpg')
				planetObj[i] = current;
				current.GetLocation(1, 1.0, -22);
				cubes[i] = current.Planet;
				scene.add(cubes[i]);
    			
				cubes[i].lookAt(sunObject.position);
				cubes[i].add(directionalLight);
				break;
			}
		case 3:
			{
				current= new Planet(names[i], 1.6, './js/texture4.jpg')
				planetObj[i] = current;
				current.GetLocation(1, 1.0, -27);
				cubes[i] = current.Planet;
				scene.add(cubes[i]);
    			
				cubes[i].lookAt(sunObject.position);
				cubes[i].add(directionalLight);
				break;
			}
		case 4:
			{
				current= new Planet(names[i], 1.6, './js/texture5.jpg')
				planetObj[i] = current;
				current.GetLocation(1, 1.0, -32);
				cubes[i] = current.Planet;
				scene.add(cubes[i]);
    			
				cubes[i].lookAt(sunObject.position);
				cubes[i].add(directionalLight);
				break;
			}
		case 5:
			{
				current= new Planet(names[i], 1.6, './js/texture6.jpg')
				planetObj[i] = current;
				current.GetLocation(1, 1.0, -39);
				cubes[i] = current.Planet;
				scene.add(cubes[i]);
    			
				cubes[i].lookAt(sunObject.position);
				cubes[i].add(directionalLight);
				break;
			}
		case 6:
			{
				current= new Planet(names[i], 1.6, './js/texture7.jpg')
				planetObj[i] = current;
				current.GetLocation(1, 1.0, -47);
				cubes[i] = current.Planet;
				scene.add(cubes[i]);
    			
				cubes[i].lookAt(sunObject.position);
				cubes[i].add(directionalLight);
				break;
			}
		case 7:
			{
				current= new Planet(names[i], 1.6, './js/texture8.jpg')
				planetObj[i] = current;
				current.GetLocation(1, 1.0, -54);
				cubes[i] = current.Planet;
				scene.add(cubes[i]);
    			
				cubes[i].lookAt(sunObject.position);
				cubes[i].add(directionalLight);
				break;
			}
		default:
			{
				console.log('Inavlid Range');
				break;
			}
		
	}
}

function GUIControl(){
	for(let i = 0; i< numOfPlanets; i++){
		planetControl[i] = document.getElementById(`${names[i]}`);
	}
	for(let i=0; i<numOfPlanets; i++)
	{
		planetControl[i].addEventListener('input', (event)=>{
			let value = planetControl[i].value/100;
			Speed[i]=value;
		})
	}
}

function Picking(event){
    raycaster.setFromCamera(
        {
            x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
            y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1
        },
        MainCamera
    )
    intersects = raycaster.intersectObjects(cubes, false)

    if (intersects.length > 0) {
        intersectedObject = intersects[0].object
    } else {
        intersectedObject = null
    }
	let objName = document.getElementById('obj');
	let objInfo = document.getElementById('dts');
    cubes.forEach((o, i) => {
        if (intersectedObject === o) {
			objName.innerText =`${planetObj[i].Name}`;
			objInfo.innerHTML = `${details[planetObj[i].Name]}`
			cubes[i].material = planetObj[i].ChangeMesh();
			cubes[i].material.emissive.setHex( 0xff0000 );
		  }
		  else{
			cubes[i].material = planetObj[i].RevertMesh();
		  }
    })
}
function ToogleRotation(flag){

		if(xCamera.IsRotate){
			return xCamera.rotateCamera()
		}
		else{
			return xCamera.rotateCameraOff()
		}
}
