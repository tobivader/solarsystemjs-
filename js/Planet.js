import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

//Class to create planet object
export class Planet{
	
	//Constructor to set planets gloabl variables
    constructor(name, planetSize, texture, details){
		this.name = name;
        this.planetSize = planetSize; 		//Planets radius
		this.texture = texture;
		this.planet = null;
		this.orbit = 0;
		this.sphere;
		this.details = details;
		//Set up the planet
		this.CreatePlanet();
		this.orbitRadius;
    }
	//Returns this.plaet
	get Planet(){
		return this.planet;
	}
	get Name(){
		return this.name;
	}
	//Get the orbit
	get Orbit(){
		return this.orbit;
	}
	//Return the planets details
	get Details(){
		return this.details;
	}
	//set the planets orbit
	getOrbit(i){
		this.orbit+=i;
	}
	//Creates a planet
	CreatePlanet(){
		//Load material 
		let text = new THREE.TextureLoader().load( `${this.texture}`);
		const material = new THREE.MeshBasicMaterial({ map: text,});
		//planet
		this.sphere = new THREE.SphereGeometry( this.planetSize, 34, 32 );
		this.planet = new THREE.Mesh(this.sphere, material);
	}
	GetLocation(x, y, z){
		//Set the planets location in the space
		this.planet.position.x = x;
		this.planet.position.y = y;
		this.planet.position.z = z;
	}
	ChangeMesh(){
		let material = new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } )
		return material;
	}
	RevertMesh(){
		//Load material 
		let text = new THREE.TextureLoader().load( `${this.texture}`);
		console.log(this.texture)
		const material = new THREE.MeshBasicMaterial({ map: text,});
		return material;
	}
}