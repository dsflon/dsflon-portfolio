import * as THREE from 'three';
import TWEEN from 'tween.js'

import LoadShaderSource from './three/_loadShaderSource';
import InitThree from './three/_initThree';
import CreateSceneImage from './three/_createSceneObject';
import CreatePostEffect from './three/_createPostEffect';

import PageFunction from './three/_page';

let sceneShaderCode, postShaderCode;

let elm = document.getElementById('bg');
let initThree = new InitThree( elm );

function init() {

	let sceneObj = new CreateSceneImage(
		sceneShaderCode.vs,
		sceneShaderCode.fs,
		{
			startTime: {
				type: 'f',
				value: 0
			},
			hover: {
				type: 'f',
				value: -1.0
			}
		},
		elm
	);
	let postObj = new CreatePostEffect(
		initThree.rendererOR.texture,
		postShaderCode.vs,
		postShaderCode.fs
	);

    PageFunction( initThree, sceneObj, postObj, elm );

	////

}

////

function LoadShader() {

	initThree.run = false;
	sceneShaderCode = null;
	postShaderCode = null;

	new LoadShaderSource(
		"/assets/shader/scene.vert",
		"/assets/shader/scene.frag",
		(shader) => {
			sceneShaderCode = shader;
			loadCheck();
		}
	);
	new LoadShaderSource(
		"/assets/shader/post.vert",
		"/assets/shader/post.frag",
		(shader) => {
			postShaderCode = shader;
			loadCheck();
		}
	);

}

function loadCheck(){
	if( sceneShaderCode != null && postShaderCode != null ){
		init()
	}
}

window.onload = () => {
	if(elm.classList) LoadShader();
}
