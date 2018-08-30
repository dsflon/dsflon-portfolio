import * as THREE from 'three';
import TWEEN from 'tween.js'

let INIT_THREEE,
	SCENE,
	POST,
	TARGET_ELM;

let mouse, mousePrev, mouseTimer;
let mouseoverTimer, mouseoutTimer,
	hoverFlag = false;

let clock = new THREE.Clock();

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

	TweenMouseMove(mouse,mousePrev)

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
	// window.onscroll = () => {
	// 	let val = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
	// 	SCENE.uniforms.scroll.value = val * 0.001;
	// }

	window.addEventListener("deviceorientation", (e) => {
		let gamma = e.gamma / 90;
		let beta = e.beta / 90;
		SCENE.uniforms.deviceorientation.value = new THREE.Vector2(gamma, beta)
	}, false);

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

function Hover(list,sections,callback,callback2) {

	for (var i = 0; i < list.length; i++) {

		list[i].onmouseover = (e) => {
			clearTimeout(mouseoutTimer);
			let target = e.currentTarget;
			let index = target.dataset.index;

			mouseoverTimer = setTimeout( () => {
				UpdateTextureImage(index)
				hoverFlag = true;

				for (var j = 0; j < list.length; j++) {
					if(list[j]) list[j].classList.remove("is_hover");
				}
				for (var j = 0; j < sections.length; j++) {
					if(sections[j]) {
						sections[j].classList.remove("is_hover");
						sections[j].classList.add("is_hover");
					}
				}
				target.classList.add("is_hover");

				FadeInImg(callback);
			}, 300)
		}
		list[i].onmouseout = (e) => {
			clearTimeout(mouseoverTimer);
			let target = e.currentTarget;

			if( hoverFlag ) {
				mouseoutTimer = setTimeout( () => {
					hoverFlag = false;

					for (var j = 0; j < list.length; j++) {
						if(list[j]) list[j].classList.remove("is_hover");
					}
					for (var j = 0; j < sections.length; j++) {
						if(sections[j]) sections[j].classList.remove("is_hover");
					}

					FadeOutImg(callback2);
				}, 300)
			}
		}

	}

}


function UpdateTextureImage(index) {

    SCENE.uniforms.imgSize.value = new THREE.Vector2(
        SCENE.textures[index].width,
        SCENE.textures[index].height
    )
    SCENE.uniforms.texture.value = SCENE.textures[index].tex;

}
function FadeInImg (callback) {
	SCENE.uniforms.startTime.value = clock.getElapsedTime();
	SCENE.uniforms.hover.value = 0.0;
	setTimeout( () => {
		SCENE.uniforms.hover.value = 1.0;
		if(callback) callback()
	},800 )
}
function FadeOutImg (callback) {
	SCENE.uniforms.startTime.value = clock.getElapsedTime();
	SCENE.uniforms.hover.value = 2.0;
	setTimeout( () => {
		SCENE.uniforms.hover.value = 3.0;
		if(callback) callback()
	},800 )
}
function ShowImg () {
	SCENE.uniforms.hover.value = 1.0;
}
function HideImg (callback) {
	SCENE.uniforms.hover.value = 3.0;
}

function StartThree(three) {

	INIT_THREEE = three.init;
	TARGET_ELM = three.targetElm;
	SCENE = three.scene;
	POST = three.post;

	mouse = {x: TARGET_ELM.scrollWidth/2, y: TARGET_ELM.scrollHeight/2};
	mousePrev = {x: 0, y: 0};

	SCENE.initImageObj(three.imageList, () => {
		Play();
	},(i) => {
	});

}
function Dark(num) {
	SCENE.uniforms.dark.value = num;
}

export {
	StartThree,
	Hover,
	UpdateTextureImage,
	FadeInImg,
	FadeOutImg,
	ShowImg,
	HideImg,
	Dark
};
