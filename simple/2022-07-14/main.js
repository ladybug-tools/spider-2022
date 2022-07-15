function loadScript ( url, onLoad ) {

	const script = document.head.appendChild( document.createElement( "script" ) );
	script.onload = onLoad;
	script.src = url;

}


function addDragControls () {

	const url = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r142/examples/js/controls/DragControls.js";

	onLoad = () => {

		dragControls = new THREE.DragControls( [ mesh ], camera, renderer.domElement );

		dragControls.transformGroup = true;
		dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; } );
		dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );

	};

	loadScript( url, onLoad );

}

function addObjLoader () {

	const url = "obt-obj-test.js";

	// onLoad = () => {

	// 	OBT.init();

	// };

	loadScript( url);

}