import * as THREE from 'three'

export default class CreateSceneImage {

    /**
     * XHR でシェーダのソースコードを外部ファイルから取得しコールバックを呼ぶ。
     * @param {string} vertexShader - 頂点シェーダのソースコード
     * @param {string} fragmentShader - フラグメントシェーダのソースコード
     */
    constructor(vertexShader,fragmentShader,addUniforms,container) {

        this.container = container;
        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

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
                // value: new THREE.Vector2(window.innerWidth, window.innerHeight),
                value: new THREE.Vector2(this.width, this.height),
            }
        };

        if(addUniforms) {
            for (let prop in addUniforms) {
                this.uniforms[prop] = addUniforms[prop];
            }
        }

        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;

        this.obj = null;
        this.textures = [];

        this.videos = [];
        this.videoTextures = [];
    }


    reset(vertexShader,fragmentShader) {

        this.vertexShader = vertexShader;
        this.fragmentShader = fragmentShader;
        this.obj = null;
        this.textures = [];

    }


    /**
     * 画像や動画を用いない場合に初期化
     * Meshを生成する
     */
    init() {
        this.obj = this.createObj();
    }


    /**
     * テクスチャロードを行い、オブジェクトを生成する
     * @param {array} src - 画像のパスが格納された配列
     * @param {function} callback - 画像ロード後に行う処理
     */
    initImageObj( src, callback, callback2 ) {

        let texture = new THREE.TextureLoader();

        //配列初期化
        for (var i = 0; i < src.length; i++) this.textures.push("");

        let count = 0;
        let loading = (i) => {
            texture.load( src[i], (tex) => {

                tex.magFilter = THREE.NearestFilter;
                tex.minFilter = THREE.NearestFilter;
                tex.needsUpdate = true;
                this.textures[i] = {
                    tex: tex,
                    width: tex.image.naturalWidth,
                    height: tex.image.naturalHeight
                };

                count++;
                if(callback2) callback2(count);

                if(count == src.length) {

                    this.uniforms["imgSize"] = {
                        type: 'v2',
                        value: new THREE.Vector2(
                            this.textures[0].width,
                            this.textures[0].height
                        )
                    };
                    this.uniforms["texture"] = {
                        type: 't',
                        value: this.textures[0].tex
                    };

                    setTimeout( () => {
                        this.obj = this.createObj();
                        callback();
                    }, 100 );
                }

            })
        }
        for (var i = 0; i < src.length; i++) loading(i);

    }

    /**
     * テクスチャロードを行い、オブジェクトを生成する
     * @param {array} src - 画像のパスが格納された配列
     * @param {function} callback - 画像ロード後に行う処理
     */
    initVideoObj( src, callback, callback2 ) {

        let reloadTimer;

        //配列初期化
        for (var i = 0; i < src.length; i++) {
            this.videoTextures.push("");

            let video = document.createElement( 'video' );
            video.src = src[i];
            video.volume = 0;
            video.muted = true;
            video.loop = true;
            video.setAttribute("playsinline", true);
            this.videos.push( video );

        }
        let count = 0;
        let loading = (i) => {

            this.videos[i].load();

            this.videos[i].onloadeddata = () => {
                console.log("loaded video");

                clearTimeout(reloadTimer);

                let tex = new THREE.VideoTexture( this.videos[i] );
                tex.minFilter = THREE.LinearFilter;
                tex.magFilter = THREE.LinearFilter;
                tex.format = THREE.RGBFormat;

                this.videoTextures[i] = {
                    tex: tex,
                    width: this.videos[i].videoWidth,
                    height: this.videos[i].videoHeight
                };

                count++;
                if(callback2) callback2(count);

                reloadTimer = setTimeout( () => {
                    alert("読み込みに時間がかかっています。もう一度開き直します。");
                    location.reload();
                }, 30000 );

                if(count == src.length) {
                    clearTimeout(reloadTimer);
                    this.uniforms["imgSize"] = {
                        type: 'v2',
                        value: new THREE.Vector2(
                            this.videoTextures[0].width,
                            this.videoTextures[0].height
                        )
                    };
                    this.uniforms["texture"] = {
                        type: 't',
                        value: this.videoTextures[0].tex
                    };
                    this.videos[0].play();

                    if( src.length > 1 ) {
                        this.uniforms["texturePrev"] = {
                            type: 't',
                            value: this.videoTextures[src.length - 1].tex
                        };
                        this.uniforms["textureNext"] = {
                            type: 't',
                            value: this.videoTextures[1].tex
                        };
                        this.videos[1].play();
                        this.videos[src.length - 1].play();
                    }

                    this.obj = this.createObj();
                    callback();
                }

            };

        }

        for (var i = 0; i < src.length; i++) loading(i);

    }

    createObj() {

        let material = new THREE.RawShaderMaterial({
        // new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader
        });

        material.side = THREE.DoubleSide;
        material.transparent = true;
        material.blending = THREE.NormalBlending;

        return new THREE.Mesh(
            new THREE.PlaneBufferGeometry(2, 2),
            material
        );

    }


    mouseMove(mouse) {
        this.uniforms.mouse.value.set(mouse.x,mouse.y);
    }

    resize() {

        this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        this.uniforms.resolution.value.set(this.width, this.height);
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

    updateTexture(i) {

        this.uniforms.imgSize.value = new THREE.Vector2(
            this.textures[i].width,
            this.textures[i].height
        )
        this.uniforms.texture.value = this.textures[i].tex;

    }

}
