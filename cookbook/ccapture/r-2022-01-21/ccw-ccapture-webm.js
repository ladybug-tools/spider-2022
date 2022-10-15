
// Create a capturer that exports a WebM video
//var capturer = new CCapture( { format: 'webm' } );

const CCW = {};

CCW.frameRate = 60;
CCW.timeLimit = 8;
CCW.progress = 0;



CCW.init = function ( obj = {} ) {

	CCW.target = obj.target || divMessage;

	htm = `
<details>

	<summary>CCW CCapture WebM
		<span class="info">
			<img class=infoImg src="https://pushme-pullyou.github.io/tootoo-2022/assets/icons/noun_Information_585560.svg">
			<div class="infoTooltip gmd-5">
				<div id="ccw">
					<p>
					Thanks to Jaume Sanchez:<a href="https://github.com/spite/ccapture.js/" target="_blank">ccapture.js</a>
					& <a href="https://github.com/thenickdude/webm-writer-js" target="_blank">webm-writer-js</a>
					</p>
				</div>
			</div>
		</span>
	</summary>

	<div class="buttons">

	<p>
		<label title="Slide me">
			Camera distance: <output id=outDistance>170</output>
			<input id=rngDistance type=range class=full-width oninput=outDistance.value=this.value;CCW.zoom();
				min=1 max=400 value=170>
		</label>
	</p>
		<p>
		<label title="Slide me">
			Duration in seconds: <output id=outDuration>8</output>
			<input id=rngDuration type=range class=full-width oninput=outDuration.value=this.value;
				min=1 max=40 value=8 >
		</label>
	</p>
	<p>
	setup screen: <button id="butInstagram">512x512</button> <button id="butSmartFrame">267x475</button>
	</p>
	<p>
		<button id="butStart">Start recording to WebM</button>
	</p>
	<p>
		<button id="butStop">Stop (or wait for time limit)</button>
	</p>

	<a href="https://cloudconvert.com/webm-to-mp4" target="_blank">cloudconvert/webm-to-mp4</a>

	</div>

	<hr>

</detail>
`;

	CCW.target.innerHTML = htm;

	CSS.addScripts();

	CCW.setupButtons();

};



CSS.addScripts = function () {

	const scr1 = document.body.appendChild( document.createElement( "script" ) );
	scr1.src = "https://cdn.jsdelivr.net/gh/spite/ccapture.js@v1.0.9/build/CCapture.all.min.js";

	const scr2 = document.body.appendChild( document.createElement( "script" ) );
	scr2.src = "https://cdn.jsdelivr.net/gh/thenickdude/webm-writer-js@v0.3.0/src/WebMWriter.js";

};



CCW.zoom = function () {

	cameraDistance = camera.position.distanceTo( scene.position );
	//camera.position.setScalar( + rngDistance.value / cameraDistance )

	camera.position.multiplyScalar( parseFloat( rngDistance.value ) / cameraDistance );
};



CCW.setupButtons = function () {

	cameraDistance = camera.position.distanceTo( scene.position );

	outDistance.value = cameraDistance.toFixed();

	rngDistance.value = cameraDistance;

	// rngDuration.addEventListener( "input", e => {
	// 	e.preventDefault();
	// 	CCW.setupScreen();
	// }, false );

	butInstagram.addEventListener( "click", e => {
		e.preventDefault();
		CCW.setupScreen();
	}, false );

	butSmartFrame.addEventListener( "click", e => {
		e.preventDefault();
		CCW.setupScreen( 2 * 276, 2 * 475 );
	}, false );

	butStart.addEventListener( "click", e => {
		e.preventDefault();

		const distance = + rngDistance.value;

		camera.position.x = Math.sin( 0 ) * distance;
		camera.position.y = Math.cos( 0 ) * distance;
		camera.position.z = 0; //Math.cos( CCW.progress * 3 ) * distance;

		CCW.progress = 0;
		CCW.recorder.start();
		butStart.style.display = "none";
		butStop.style.display = "block";
	}, false );

	butStop.addEventListener( "click", e => {
		e.preventDefault();
		CCW.recorder.stop();
		butStop.style.display = "none";
		CCW.recorder.save();
	}, false );

};



CCW.setupScreen = function ( width = 512, height = 512 ) {

	CCW.timeLimit = + rngDuration.value;

	CCW.recorder = new CCapture( {
		verbose: false,
		display: true,
		frameRate: CCW.frameRate,
		quality: 100,
		format: "webm",
		timeLimit: CCW.timeLimit,
		frameLimit: 0,
		autoSaveTime: 0
	} );

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize( width, height );

	// const distance = + rngDistance.value;

	// camera.position.x = Math.sin( 0 ) * distance;
	// camera.position.y = Math.cos( 0 ) * distance;
	// camera.position.z = 0; //Math.cos( CCW.progress * 3 ) * distance;

	animate = CCW.render;
	animate();

};



CCW.render = function () {

	//progress goes from 0 to 1

	CCW.frames = CCW.frameRate * CCW.timeLimit;

	delta = Math.PI * 2 / CCW.frames;

	mesh.rotation.x += delta;
	mesh.rotation.y += delta;

	const distance = + rngDistance.value;
	const center = scene.position;

	// camera.position.x = center.x + Math.cos( CCW.progress * Math.PI * 3 ) * distance;
	// camera.position.y = center.y + Math.sin( CCW.progress * Math.PI * 4 ) * distance;
	// camera.position.z = center.z + Math.cos( CCW.progress * Math.PI * 7 ) * distance;

	// camera.position.x = Math.sin( CCW.progress * 7 ) * distance;
	// camera.position.y = Math.cos( CCW.progress * 5 ) * distance;
	// camera.position.z = Math.cos( CCW.progress * 3 ) * distance;

	// camera.position.x = Math.sin( CCW.progress * 7 ) * distance;
	// camera.position.y = Math.cos( CCW.progress * 5 ) * distance;
	// camera.position.z = Math.cos( CCW.progress * 3 ) * distance;

	// x = Math.sin( i * delta * 7 ) * distance;
	// y = Math.cos( i * delta * 5 ) * distance;
	// z = Math.cos( i * delta * 3 ) * distance;

	camera.lookAt( center );

	//CCW.progress += 1 / ( CCW.frames );
	CCW.progress += delta;

	renderer.render( scene, camera );
	CCW.recorder.capture( renderer.domElement );
	requestAnimationFrame( animate );

};