import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';

//Class to create a sun object
export class Sun{
	
	//Constructor to set suns gloabl variables
    constructor(sunSize, location, texture){
        this.sunSize = sunSize; 		//suns radius
		this.location = location;	//plaents location in the space
		this.texture = texture;
		this.sun = null;
		//Set up the sun
		this.CreateSun();
		this.orbitRadius;
    }
	//Returns this.plaet
	get Sun(){
		return this.sun;
	}
	//Creates a sun
	CreateSun(){
		//Load material 
		let text = new THREE.TextureLoader().load( `${this.texture}`);
		const material = new THREE.MeshBasicMaterial( { map: text} );
		
		//sun
		var sphere = new THREE.SphereGeometry( this.sunSize, 34, 32 );
		this.sun = new THREE.Mesh(sphere, material);
		//Set the suns location in the space
		this.sun.position.x = this.location.x;
		this.sun.position.y = this.location.y
		this.sun.position.z = this.location.z;
	}
}