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
	"/assets/images/sample/03.png",
	"/assets/images/sample/04.png",
	"/assets/images/sample/05.jpg",
	"/assets/images/sample/06.jpg",
	"/assets/images/sample/07.jpg",
	"/assets/images/sample/08.png",
	"/assets/images/sample/09.jpg",
	"/assets/images/sample/10.jpg",
	"/assets/images/sample/11.png",
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

	window.addEventListener("deviceorientation", (e) => {
		let gamma = e.gamma / 90;
		let beta = e.beta / 90;
		SCENE.uniforms.deviceorientation.value = new THREE.Vector2(gamma, beta)
	}, false);

	let list = document.getElementsByClassName('j-list');
	let listItem = document.getElementsByClassName('j-list-link');

	for (var i = 0; i < listItem.length; i++) {

		listItem[i].onmouseover = (e) => {
			clearTimeout(mouseoutTimer);
			let target = e.currentTarget;
			let index = target.dataset.index;

			mouseoverTimer = setTimeout( () => {
				SCENE.uniforms.startTime.value = clock.getElapsedTime();
				SCENE.uniforms.hover.value = 0.0;
				updateTextureVideo(index)
				hoverFlag = true;

				for (var j = 0; j < listItem.length; j++) {
					listItem[j].classList.remove("is_hover");
				}
				for (var j = 0; j < list.length; j++) {
					list[j].classList.remove("is_hover");
					list[j].classList.add("is_hover");
				}
				target.classList.add("is_hover");

				setTimeout( () => {
					SCENE.uniforms.hover.value = 1.0;
				},600 )
			}, 300)
		}
		listItem[i].onmouseout = (e) => {
			clearTimeout(mouseoverTimer);
			let target = e.currentTarget;

			if( hoverFlag ) {
				mouseoutTimer = setTimeout( () => {
					SCENE.uniforms.startTime.value = clock.getElapsedTime();
					SCENE.uniforms.hover.value = 2.0;
					hoverFlag = false;

					for (var j = 0; j < listItem.length; j++) {
						listItem[j].classList.remove("is_hover");
					}
					for (var j = 0; j < list.length; j++) {
						list[j].classList.remove("is_hover");
					}

					setTimeout( () => {
						SCENE.uniforms.hover.value = 3.0;
					},600 )
				}, 300)
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
