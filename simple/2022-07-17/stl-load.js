var STL = {};

STL.url1 = "https://theo-armour.github.io/mouth-stl-2022/OrthoCAD_Export_76392642%20(4)/76392642_shell_occlusion_l.stl";
STL.url2 = "https://theo-armour.github.io/mouth-stl-2022/OrthoCAD_Export_76392642%20(4)/76392642_shell_occlusion_u.stl";


STL.init = function () {

	divMessage.innerHTML = `
<p>
	<label title="Uncheck to combine multiple models into one scene">
		<input type="checkbox" id="chkNewFile" checked> Open new file
	</label>
</p>
<p><button onclick=STL.loadSTL() >Load STL 1</button>
<button onclick=STL.loadSTL(STL.url2) >Load STL 2</button>
<p><input type=file id=inpObj  onchange=OBT.parseObj() multiple ></p>
<div id=divLog ></div>
`;

	const url = `https://cdn.jsdelivr.net/gh/mrdoob/three.js@${ THR.release }/examples/js/loaders/STLLoader.js`;

	loadThreeScript( url );

};

STL.loadSTL = function( url = STL.url1 ) {

	const loader = new THREE.STLLoader();

	loader.load(

		url,

		( geo ) => {

			geometry = geo;
			//geometry.rotateX( -0.5 * Math.PI );
			//geometry.computeFaceNormals();
			geometry.computeVertexNormals();
			//geometry.scale( 0.5, 0.5, 0.5 );
			//geometry.center();

			//let material;

			//console.log( "geom", geometry );

			if ( geometry.hasColors ) {

				material = new THREE.MeshPhongMaterial( { opacity: geometry.alpha, vertexColors: true } );

			} else {

				//material = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, specular: 0x111111, shininess: 200, side: 2 } );
				material = new THREE.MeshNormalMaterial( { side: 2 } );

			}

			if ( window.mesh && chkNewFile && chkNewFile.checked ) { THR.scene.remove( mesh ); }

			mesh = new THREE.Mesh( geometry, material );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			//mesh.name = txt;

			THR.scene.add( mesh );
			//divMessage.innerText = "Remove Theo's " + txt;

			obj = mesh;

			//console.log( "obj", obj );

		},

		( xhr ) => divLog.innerText = `${ ( xhr.loaded / xhr.total * 100 ).toFixed() }% loaded`,

		( error ) => console.log( 'An error happened', error )

	);

};

STL.init();
