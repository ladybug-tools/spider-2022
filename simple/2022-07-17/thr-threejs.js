var THR = {
	group: undefined,
	renderer: undefined,
	camera: undefined,
	controls: undefined,
	scene: undefined,
	release: "r142"
};



THR.init = function () {

	const script1 = document.body.appendChild( document.createElement( "script" ) );
	script1.onload = THR.loadOrbit;
	script1.src = `https://cdn.jsdelivr.net/gh/mrdoob/three.js@${ THR.release }/build/three.min.js`;

}



THR.loadOrbit = function () {

	const script2 = document.body.appendChild( document.createElement( "script" ) );
	script2.onload = THR.initScene;
	script2.src = `https://cdn.jsdelivr.net/gh/mrdoob/three.js@${ THR.release }/examples/js/controls/OrbitControls.js`;

}



THR.initScene = function () {

	THR.timeStart = performance.now();

	THR.camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	THR.camera.position.set( -100, -100, 100 );
	THR.camera.up.set( 0, 0, 1 );
	THR.camera.name = "THR.camera";

	THR.scene = new THREE.Scene();
	THR.scene.background = new THREE.Color( 0xcce0ff );
	//THR.scene.fog = new THREE.Fog( 0xcce0ff, 550, 800 );
	THR.scene.add( THR.camera );
	THR.scene.name = "THR.scene";

	THR.renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );

	THR.renderer.outputEncoding = THREE.sRGBEncoding;
	THR.renderer.domElement.style.cssText = "position: absolute;top:0;z-index:-1;"
	document.body.appendChild( THR.renderer.domElement );
	THR.renderer.setPixelRatio( window.devicePixelRatio );
	THR.renderer.setSize( window.innerWidth, window.innerHeight );

	THR.controls = new THREE.OrbitControls( THR.camera, THR.renderer.domElement );
	THR.controls.minDistance = 1;
	THR.controls.maxDistance = 500;
	//THR.controls.autoRotate = true;
	THR.controls.enableDamping = true;
	THR.controls.dampingFactor = 0.08;
	THR.controls.enablePan = true;
	THR.controls.autoRotateSpeed = 5;
	THR.controls.name = "THR.controls";

	window.addEventListener( "resize", THR.onWindowResize, false );
	window.addEventListener( "orientationchange", THR.onWindowResize, false );

	let event = new Event( "onloadthree", { bubbles: true, cancelable: false, detail: true } );

	window.addEventListener( "onloadthree", THR.onLoad, false );
	window.addEventListener( "onloadthree", COR.init, false );

	window.dispatchEvent( event );

	THR.animate();

};

THR.onLoad = function ( e ) {

	console.log( "Three loaded", e );

}

THR.onWindowResize = function () {

	THR.camera.aspect = window.innerWidth / window.innerHeight;
	THR.camera.updateProjectionMatrix();

	//THR.controls.reset();

	THR.renderer.setSize( window.innerWidth, window.innerHeight );

};



THR.animate = function () {

	requestAnimationFrame( THR.animate );
	THR.renderer.render( THR.scene, THR.camera );
	THR.controls.update();

};



THR.test = function () {

	const geometry = new THREE.BoxGeometry( 50, 50, 50 );
	const material = new THREE.MeshNormalMaterial();
	mesh = new THREE.Mesh( geometry, material );
	THR.scene.add( mesh );

};



THR.init();