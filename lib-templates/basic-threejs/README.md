# [![](https://pushme-pullyou.github.io/tootoo-2022/lib/assets/icons/mark-github.svg )](https://github.com/pushme-pullyou/tootoo-2022/ "Source code on GitHub" ) [TT 2022]( https://pushme-pullyou.github.io/tootoo-2022/ "Home page" ) / [Basic Three.js Read Me]( https://pushme-pullyou.github.io/tootoo-2022/#lib3d/0-basic-threejs/README.md)


<!--@@@
<div class=iframe-resize ><iframe src=https://pushme-pullyou.github.io/tootoo-2022/lib3d/0-basic-threejs/ height=100% width=100% ></iframe></div>
_Basic Three.js in a resizable window. One finger to rotate. Two to zoom._


### Full Screen: [Basic Three.js]( https://pushme-pullyou.github.io/tootoo-2022/lib3d/0-basic-threejs/ )
@@@-->



## JavaScript

``` js
	function requestFile( url, callback ) {

		const xhr = new XMLHttpRequest();
		xhr.open( 'GET', url, true );
		xhr.onerror = ( xhr ) => console.log( 'error:', xhr );
		//xhr.onprogress = ( xhr ) => console.log( 'bytes loaded:', xhr.loaded );
		xhr.onload = ( xhr ) => callback( xhr.target.response );
		xhr.send( null );

	}

	scene.add( new THREE.ArrowHelper( normalZ, scene.position, 5, 0x00ffff ) ); // aqua


	const pointsObj = new THREE.Points( geom, new THREE.PointsMaterial( {
		color: "red"
	} ) );
	scene.add( pointsObj );


	const line = new THREE.LineLoop( geom, new THREE.LineBasicMaterial( {
		color: "aqua"
	} ) );
	scene.add( line );

```

### Slider

``` html

<div>

	<label title="Slide me">
		X: <output id=outX>1</output><br>
		<input id=rngX type=range oninput=outX.value=this.value;updateModel(this); min=0 max=10 value=1
			step=0.1 class=full-width >
	</label>

</div>

```

### checkbox

```
<p>
	<label title="Uncheck to combine multiple models into one scene">
		<input type="checkbox" id="chkNewFile" onchange=COR.addDragControls(); checked> Open new file
	</label>
</p>
```

### Add Ground

``` js

function addGround() {

	const geometry = new THREE.PlaneBufferGeometry( 5000, 5000 );
	geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( position.x, position.y, position.z ) );
	const material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa, side: 0 } );
	ground = new THREE.Mesh( geometry, material );
	ground.name = "ground";
	scene.add( THR.ground );

};


```


## Geometry


```js
// CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded )
// SphereGeometry( radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength )
// TorusGeometry( radius, tube, radialSegments, tubularSegments, arc )

```
## Concept

The template I often use to get a minor project underway


## To Do / Wish List


## Issues


## Links of Interest

### Three.js

* https://threejs.org/
* https://threejs.org/docs/
* https://threejs.org/examples/
* https://github.com/mrdoob/three.js/
* https://discourse.threejs.org/
* https://en.wikipedia.org/wiki/Three.js << I wrote the original article
* https://twitter.com/threejs
* https://stackoverflow.com/tags/three.js/info
* https://www.reddit.com/r/threejs/
* https://developer.mozilla.org/en-US/docs/Glossary/Three_js
* https://threejsfundamentals.org/


## Change Log


### 2022-07-08

* First commit


***

<center title="Hello! Click me to go up to the top" ><a class=aDingbat href=javascript:window.scrollTo(0,0);> ❦ </a></center>
