import * as THREE from 'three';
import TWEEN from 'tween.js'

let INIT_THREEE,
	SCENE,
	POST,
	TARGET_ELM,
	LIST_ELM,
	SECTIONS_ELM;

let mouse, mousePrev, mouseTimer;
let mouseoverTimer, mouseoutTimer,
	hoverFlag = false;

function Play() {

	let clock = new THREE.Clock();

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

	window.onmousemove = (e) => {
		mouse = { x: e.clientX, y: e.clientY };
		clearTimeout(mouseTimer);
		mouseTimer = setTimeout( () => {
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

	for (var i = 0; i < LIST_ELM.length; i++) {

		LIST_ELM[i].onmouseover = (e) => {
			clearTimeout(mouseoutTimer);
			let target = e.currentTarget;
			let index = target.dataset.index;

			mouseoverTimer = setTimeout( () => {
				SCENE.uniforms.startTime.value = clock.getElapsedTime();
				SCENE.uniforms.hover.value = 0.0;
				updateTextureVideo(index)
				hoverFlag = true;

				for (var j = 0; j < LIST_ELM.length; j++) {
					LIST_ELM[j].classList.remove("is_hover");
				}
				for (var j = 0; j < SECTIONS_ELM.length; j++) {
					SECTIONS_ELM[j].classList.remove("is_hover");
					SECTIONS_ELM[j].classList.add("is_hover");
				}
				target.classList.add("is_hover");

				setTimeout( () => {
					SCENE.uniforms.hover.value = 1.0;
				},600 )
			}, 300)
		}
		LIST_ELM[i].onmouseout = (e) => {
			clearTimeout(mouseoverTimer);
			let target = e.currentTarget;

			if( hoverFlag ) {
				mouseoutTimer = setTimeout( () => {
					SCENE.uniforms.startTime.value = clock.getElapsedTime();
					SCENE.uniforms.hover.value = 2.0;
					hoverFlag = false;

					for (var j = 0; j < LIST_ELM.length; j++) {
						LIST_ELM[j].classList.remove("is_hover");
					}
					for (var j = 0; j < SECTIONS_ELM.length; j++) {
						SECTIONS_ELM[j].classList.remove("is_hover");
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
	}).start();

}

function updateTextureVideo(index) {

    SCENE.uniforms.imgSize.value = new THREE.Vector2(
        SCENE.textures[index].width,
        SCENE.textures[index].height
    )
    SCENE.uniforms.texture.value = SCENE.textures[index].tex;

}

function PageFunction(three) {

	INIT_THREEE = three.init;
	TARGET_ELM = three.targetElm;
	LIST_ELM = three.list;
	SECTIONS_ELM = three.sections;
	SCENE = three.scene;
	POST = three.post;

	mouse = {x: TARGET_ELM.scrollWidth/2, y: TARGET_ELM.scrollHeight/2};
	mousePrev = {x: 0, y: 0};

	SCENE.initImageObj(three.imageList, () => {
		Play();
	},(i) => {
	});

}

export default PageFunction;
