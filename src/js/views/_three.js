import * as THREE from 'three';
import TWEEN from 'tween.js'
import mgnUa from 'mgn-ua';

import LoadShaderSource from './three/_loadShaderSource';
import InitThree from './three/_initThree';
import CreateSceneImage from './three/_createSceneObject';
import CreatePostEffect from './three/_createPostEffect';

import PageFunction from './three';

function shaderInit(sceneCode,postCode,three) {

    let ua = new mgnUa();

	let scene = new CreateSceneImage(
		sceneCode.vs,
		sceneCode.fs,
		{
			startTime: {
				type: 'f',
				value: 0
			},
			hover: {
				type: 'f',
				value: 0.1
			},
            deviceorientation: {
                type: 'v2',
                value: new THREE.Vector2(0.0, 0.0),
            },
			isSp: {
				type: 'f',
				value: ua.isSp
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

    PageFunction(three);

}

////

function LoadShader( elms, imageList ) {

    let three = {
        "init": new InitThree( elms.bg ),
        "targetElm": elms.bg,
        "list": elms.list,
        "sections": elms.sections,
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
            shaderInit(sceneCode, postCode, three);
        }
    }

}

export default LoadShader;
