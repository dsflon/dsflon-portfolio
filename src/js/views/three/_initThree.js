import * as THREE from 'three'

export default class InitThree {

    constructor(container) {

        this.container = container;
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer( {
            antialias:true,
            alpha: true
        } );

        // this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setSize(this.width, this.height);
        this.renderer.setClearColor(0xFFFFFF, 0.0);

        this.container.appendChild( this.renderer.domElement );

        this.run = false;

        this.initCamera();
        this.initThreeOR();
        this.initCameraOR();

        this.renderCallback = () => {};

    }

    initCamera() {

        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1); //平行投影カメラ
        // this.camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 10, 50 );
        // this.camera.position.z = 30;

    }

    initThreeOR() {
        this.sceneOR = new THREE.Scene();
        // this.rendererOR = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        this.rendererOR = new THREE.WebGLRenderTarget(this.width, this.height,);
    }
    initCameraOR() {
        // this.cameraOR = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.cameraOR = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
        // this.cameraOR.position.set(0, 0, 100);
    }

    onMouseMove(e,callback,area) {

        let width = window.innerWidth;
        let heiht = window.innerHeight;
        if( area ) {
            width = area.scrollWidth;
            heiht = area.scrollHeight;
        }

        let x = e.clientX / width * 2.0 - 1.0;
        let y = e.clientY / heiht * 2.0 - 1.0;

        if(callback) callback( { x: x, y: -y } );

    }

    onWindowResize(callback) {

        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        // this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        // this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setSize( this.width, this.height );
        if(callback) callback();

    }

    renderStart() {

        this.renderer.render(
            this.sceneOR,
            this.cameraOR,
            this.rendererOR
        );

        this.renderer.render(
            this.scene,
            this.camera
        );

        this.renderCallback();

    }

    renderLoop() {
        this.renderStart();
        if( this.run ) requestAnimationFrame( this.renderLoop.bind(this) );
    }


}
