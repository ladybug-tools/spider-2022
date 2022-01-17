
// Create a capturer that exports a WebM video
//var capturer = new CCapture( { format: 'webm' } );

const CCW = {};

CCW.frameRate = 60;
CCW.timeLimit = 8;
CCW.progress = 0;



CCW.init = function ( obj = {} ) {

	CCW.target = obj.target || divMessage;

	htm = `
<details open>

<summary>CCW CCapture WebM</summary>

<p>
Thanks:<a href="https://github.com/spite/ccapture.js/" target="_blank">ccapture.js</a>
& <a href="https://github.com/thenickdude/webm-writer-js" target="_blank">webm-writer-js</a>
</p>

	<div class="buttons">
	<p>
		<label title="Slide me">
			Camera distance: <output id=out>170</output>
			<input id=rngDistance type=range class=full-width oninput=out.value=this.value;
				min=1 max=200 value=170>
		</label>
	</p>
		<p>
		<label title="Slide me">
			Duration in seconda: <output id=outDuration>8</output>
			<input id=rngDuration type=range class=full-width oninput=outDuration.value=this.value;
				min=1 max=20 value=8 >
		</label>
	</p>
	<p>
		<button id="butSetup">Setup screen</button>
	</p>
	<p>
		<button id="butStart">Start recording to WebM</button>
	</p>
	<p>
		<button id="butStop">Stop (or wait for time limit)</button>
	</p>
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



CCW.setupButtons = function () {

	butSetup.addEventListener( "click", e => {
		e.preventDefault();
		CCW.setupScreen();
	}, false );

	butStart.addEventListener( "click", e => {
		e.preventDefault();
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

	animate = CCW.render;
	animate();

};



CCW.render = function() {

	//progress goes from 0 to 1

	const frames = CCW.frameRate * CCW.timeLimit;

	const delta = Math.PI * 2 / frames;

	mesh.rotation.x += delta;
	mesh.rotation.y += delta;

	const distance = + rngDistance.value;
	const center = scene.position;

	camera.position.x = center.x + Math.cos( CCW.progress * Math.PI * 3 ) * distance;
	camera.position.y = center.y + Math.sin( CCW.progress * Math.PI * 4 ) * distance;
	camera.position.z = center.z + Math.cos( CCW.progress * Math.PI * 7 ) * distance;

	camera.lookAt( center );

	CCW.progress += 1 / frames;

	renderer.render( scene, camera );
	CCW.recorder.capture( renderer.domElement );
	requestAnimationFrame( animate );

}