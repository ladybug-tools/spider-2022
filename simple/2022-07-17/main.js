
const script1 = document.body.appendChild( document.createElement( "script" ) );
//script1.onload = THR.init;
script1.src = "thr-threejs.js";

const COR = {};

window.addEventListener( "onloadthree", COR.init, false );


COR.init = function () {

	console.log( "", 23 );
	COR.addLoader( "TEL", "tel-three-element.js" );

};



function loadThreeScript ( url, onLoad ) {

	const script = document.head.appendChild( document.createElement( "script" ) );
	script.onload = onLoad;
	script.src = url;

}



COR.addLoader = function ( obj, url ) {

	const existingScript = document.getElementById( obj );

	if ( existingScript ) {

		window[ obj ].init();

	} else {
		console.log( "obj", obj );
		const scr = document.body.appendChild( document.createElement( "script" ) );
		scr.id = obj;
		scr.src = url;

	}

};

