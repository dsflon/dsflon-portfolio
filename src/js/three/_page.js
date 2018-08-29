import * as THREE from 'three';
import TWEEN from 'tween.js'

let INIT_THREEE,
	SCENE,
	POST,
	TARGET_ELM;

let clock = new THREE.Clock();
// let TARGET_ELM = document.getElementById('bg');
// let btn = TARGET_ELM.getElementsByClassName('a-btn');

let mouse, mousePrev;

let mouseTimer, mouseoverTimer, mouseoutTimer;
let hoverFlag = false;

let images = [
	"/assets/images/sample.jpg"
]

function Play() {

	//Meshを生成
	SCENE.init();

	INIT_THREEE.sceneOR.add(SCENE.obj);
	INIT_THREEE.scene.add(POST.obj);
	INIT_THREEE.run = true;
	INIT_THREEE.renderLoop();

	INIT_THREEE.renderCallback = () => {
		SCENE.timer( clock.getElapsedTime() );
		TWEEN.update();
	};

	window.onresize = () => {
		INIT_THREEE.onWindowResize( () => {
			SCENE.resize();
			POST.resize();
		})
	};

	TweenMouseMove(mouse,mousePrev);

	TARGET_ELM.onmousemove = (e) => {
		mouse = { x: e.clientX, y: e.clientY };
		clearTimeout(mouseTimer);
		mouseTimer = setTimeout( () => {
			if(!hoverFlag) TweenMouseMove(mouse,mousePrev)
		},10 )
	}
	TARGET_ELM.ontouchmove = (e) => {
		mouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
		clearTimeout(mouseTimer);
		mouseTimer = setTimeout( () => {
			if(!hoverFlag) TweenMouseMove(mouse,mousePrev)
		},10 )
	}
	TARGET_ELM.onmouseleave = (e) => {
		mouse = { x: TARGET_ELM.scrollWidth/2, y: 100 };
		TweenMouseMove(mouse,mousePrev)
	}

	// for (var i = 0; i < btn.length; i++) {
	// 	btn[i].onmouseover = (e) => {
	// 		clearTimeout(mouseoutTimer);
	// 		mouseoverTimer = setTimeout( () => {
	// 			if(!hoverFlag) TweenMouseOver({x:0},{x:100});
	// 			hoverFlag = true;
	// 		},200 )
	// 	}
	// 	btn[i].onmouseout = (e) => {
	// 		clearTimeout(mouseoverTimer);
	// 		mouseoutTimer = setTimeout( () => {
	// 			if(hoverFlag) TweenMouseOver({x:100},{x:0})
	// 			hoverFlag = false;
	// 		},300 )
	// 	}
	// }

}

function TweenMouseMove( mouse, mousePrev ) {

	new TWEEN.Tween(mousePrev)
	.to(mouse, 10000)
	.easing(TWEEN.Easing.Quintic.Out)
	.onUpdate(function() {
		let width = TARGET_ELM.scrollWidth;
		let heiht = TARGET_ELM.scrollHeight;
		let x = mousePrev.x / width * 2.0 - 1.0;
		let y = mousePrev.y / heiht * 2.0 - 1.0;
		SCENE.mouseMove({ x: x, y: -y });
	}).start();

}

function TweenMouseOver( hoverBefore, hoverAfter ) {

	new TWEEN.Tween(hoverBefore)
	.to(hoverAfter, 10000)
	.easing(TWEEN.Easing.Quintic.Out)
	.onUpdate(function() {
		SCENE.uniforms.hover.value = hoverBefore.x / 100;
		// console.log(SCENE.uniforms.hover.value);
	}).start();

}


function PageFunction( three, sceneObj, postObj, targetElm ) {

	INIT_THREEE = three;
	SCENE = sceneObj;
	POST = postObj;
	TARGET_ELM = targetElm;

	mouse = {x: targetElm.scrollWidth/2, y: targetElm.scrollHeight/2};
	mousePrev = {x: 0, y: 0};

	SCENE.initImageObj(images, () => {
		Play();
	},(i) => {
	});

}

export default PageFunction;
