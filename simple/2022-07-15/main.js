const COR = {};


function loadThreeScript ( url, onLoad ) {

	const script = document.head.appendChild( document.createElement( "script" ) );
	script.onload = onLoad;
	script.src = url;

}


function addDragControls () {

	const url = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r142/examples/js/controls/DragControls.js";

	const onLoad = () => {

		dragControls = new THREE.DragControls( [ mesh ], camera, renderer.domElement );

		dragControls.transformGroup = true;
		dragControls.addEventListener( 'dragstart', function ( event ) { controls.enabled = false; } );
		dragControls.addEventListener( 'dragend', function ( event ) { controls.enabled = true; } );

		divMessage.innerHTML = "You may now click on object in the scene and drag them to a new location";

	};

	loadThreeScript( url, onLoad );

}



COR.addLoader = function( obj, url ) {

	const existingScript = document.getElementById( obj );

	if ( existingScript ) {

		window[ obj ].init();

	} else {

		const scr = document.body.appendChild( document.createElement( "script" ) );
		scr.id = obj;
		scr.src = url;

	}

}