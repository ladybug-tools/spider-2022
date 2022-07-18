const TEL = {}; // Three Elements


TEL.init = function () {

	TEL.startRotate();


}

TEL.startRotate = function () {

	THR.controls.autoRotate = true;

	window.addEventListener( 'keyup', function () { THR.controls.autoRotate = false; }, false );
	THR.renderer.domElement.addEventListener( 'click', function () { THR.controls.autoRotate = false; }, false );

};


function addDragControls () {

	const url = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r142/examples/js/controls/DragControls.js";

	const onLoad = () => {

		dragControls = new THREE.DragControls( [ mesh ], THR.camera, THR.renderer.domElement );

		dragControls.transformGroup = true;
		dragControls.addEventListener( 'dragstart', function ( event ) { THR.controls.enabled = false; } );
		dragControls.addEventListener( 'dragend', function ( event ) { THR.controls.enabled = true; } );

		divMessage.innerHTML = "You may now click on object in the scene and drag them to a new location";

	};

	loadThreeScript( url, onLoad );

}

TEL.init();