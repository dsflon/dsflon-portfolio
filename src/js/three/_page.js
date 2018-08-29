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
	"/assets/images/sample/01.jpg",
	"/assets/images/sample/02.jpg",
	"/assets/images/sample/03.jpg",
	"/assets/images/sample/04.jpg",
	"/assets/images/sample/05.jpg",
	"/assets/images/sample/06.jpg",
	"/assets/images/sample/07.jpg",
	"/assets/images/sample/08.jpg",
	"/assets/images/sample/09.jpg",
	"/assets/images/sample/10.jpg",
	"/assets/images/sample/11.jpg",
	"/assets/images/sample/12.jpg",
	"/assets/images/sample/13.jpg",
	"/assets/images/sample/14.jpg"
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

	window.onmousemove = (e) => {
		mouse = { x: e.clientX, y: e.clientY };
		clearTimeout(mouseTimer);
		mouseTimer = setTimeout( () => {
			// if(!hoverFlag) TweenMouseMove(mouse,mousePrev)
			TweenMouseMove(mouse,mousePrev)
		},10 )
	}
	// TARGET_ELM.ontouchmove = (e) => {
	// 	mouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
	// 	clearTimeout(mouseTimer);
	// 	mouseTimer = setTimeout( () => {
	// 		if(!hoverFlag) TweenMouseMove(mouse,mousePrev)
	// 	},10 )
	// }
	window.onmouseleave = (e) => {
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

	let listItem = document.getElementsByClassName('list-item');

	for (var i = 0; i < listItem.length; i++) {

		listItem[i].onmouseover = (e) => {
			clearTimeout(mouseoutTimer);
			if( !hoverFlag ) {
				let index = e.currentTarget.dataset.index;
				mouseoverTimer = setTimeout( () => {
					SCENE.uniforms.startTime.value = clock.getElapsedTime();
					SCENE.uniforms.hover.value = 0.0;
					updateTextureVideo(index)
					hoverFlag = true;
					setTimeout( () => {
						SCENE.uniforms.hover.value = 1.0;
					},500 )
				},200 )
			}
		}
		listItem[i].onmouseout = (e) => {
			clearTimeout(mouseoverTimer);
			if( hoverFlag ) {
				hoverFlag = false;
				mouseoutTimer = setTimeout( () => {
					// console.log(2);
					SCENE.uniforms.startTime.value = clock.getElapsedTime();
					SCENE.uniforms.hover.value = 2.0;
					setTimeout( () => {
						SCENE.uniforms.hover.value = 3.0;
					},500 )
				},200 )
			}
		}
	}

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

function updateTextureVideo(index) {

    SCENE.uniforms.imgSize.value = new THREE.Vector2(
        SCENE.textures[index].width,
        SCENE.textures[index].height
    )
    SCENE.uniforms.texture.value = SCENE.textures[index].tex;

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
