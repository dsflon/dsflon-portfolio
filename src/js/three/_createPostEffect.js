import * as THREE from 'three'

export default class CreateSceneImage {

    /**
     * XHR でシェーダのソースコードを外部ファイルから取得しコールバックを呼ぶ。
     * @param {string} vertexShader - 頂点シェーダのソースコード
     * @param {string} fragmentShader - フラグメントシェーダのソースコード
     */
    constructor(texture,vertexShader,fragmentShader,uniforms) {

        this.uniforms = {
            time: {
                type: 'f',
                value: 0
            },
            mouse: {
                type: 'v2',
                value: new THREE.Vector2(0.0, 0.0),
            },
            resolution: {
                type: 'v2',
                value: new THREE.Vector2(window.innerWidth, window.innerHeight),
            },
            texture: {
                type: 't',
                value: texture,
            }
        };

        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;

        this.obj = this.createObj();

    }

    reset(vertexShader,fragmentShader) {

        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
        this.obj = this.createObj();

    }

    createObj() {

        return new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2, 2),
            new THREE.RawShaderMaterial({
                uniforms: this.uniforms,
                vertexShader: this.vertexShader,
                fragmentShader: this.fragmentShader
            })
        );

    }

    mouseMove(mouse) {
        this.uniforms.mouse.value.set(mouse.x,mouse.y);
    }

    resize() {
        this.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    }

    timer(time) {
        this.uniforms.time.value = time;
    }

    addUniform(obj) {

        for (let prop in obj) {
            this.uniforms[prop] = obj[prop];
        }

    }
    deleteUniform(property) {

        delete this.uniforms[property];

    }

}
