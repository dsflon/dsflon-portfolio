import * as THREE from 'three';
import TWEEN from 'tween.js'
import mgnUa from 'mgn-ua';

import LoadShaderSource from './three/_loadShaderSource';
import InitThree from './three/_initThree';
import CreateSceneImage from './three/_createSceneObject';
import CreatePostEffect from './three/_createPostEffect';

// import PageFunction from './three';

function shaderInit(sceneCode,postCode,three) {

	let scene = new CreateSceneImage(
		sceneCode.vs,
		sceneCode.fs,
		{
			startTime: {
				type: 'f',
				value: 0
			},
			dark: {
				type: 'f',
				value: 1.0
			},
			hover: {
				type: 'f',
				value: 0.1
			},
			scroll: {
				type: 'f',
				value: 0.0
			},
            deviceorientation: {
                type: 'v2',
                value: new THREE.Vector2(0.0, 0.0),
            },
			isSp: {
				type: 'f',
				value: window.ua.isSp
			}
		},
		three.targetElm
	);
	let post = new CreatePostEffect(
		three.init.rendererOR.texture,
		postCode.vs,
		postCode.fs
	);

    three["scene"] = scene;
    three["post"] = post;

    // PageFunction(three);
    return(three);

}

////

function LoadShader( targetElm, imageList, callback ) {

    let three = {
        "init": new InitThree( targetElm ),
        "targetElm": targetElm,
        "imageList": imageList
    }

	three.init.run = false;

	let sceneCode = null,
        postCode = null;

	new LoadShaderSource(
		"/assets/shader/scene.vert",
		"/assets/shader/scene.frag",
		(shader) => {
			sceneCode = shader;
			loadCheck();
		}
	);
	new LoadShaderSource(
		"/assets/shader/post.vert",
		"/assets/shader/post.frag",
		(shader) => {
			postCode = shader;
			loadCheck();
		}
	);

	function loadCheck() {
        if( sceneCode != null && postCode != null ) {
            let threeObj = shaderInit(sceneCode, postCode, three);
            if(callback) callback(threeObj);
        }
    }

}

export default LoadShader;
