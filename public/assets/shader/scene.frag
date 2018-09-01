precision mediump float;
uniform sampler2D texture;   // フレームバッファに描画したレンダリング結果

varying vec2 vTexCoord; // 頂点シェーダから送られてきたテクスチャ座標

uniform float startTime;
uniform float time;
uniform float slideTimer;
uniform float scroll;
uniform vec2 mouse; // マウスカーソル正規化済み座標 @@@
uniform vec2 mousePrev; // マウスカーソル正規化済み座標 @@@
uniform vec2 resolution;
uniform vec2 imgSize;
uniform bool isSp;
uniform float hover;
uniform float dark;
uniform float wave;
uniform float waveFlag;

uniform vec2 deviceorientation;

#define MAX_ITER 3

const float PI = 3.1415926;
const int   oct  = 6;
const float per  = 0.8;

// 補間関数
float interpolate(float a, float b, float x){
    float f = (1.0 - cos(x * PI)) * 0.5;
    return a * (1.0 - f) + b * f;
}

// 乱数生成
float rnd(vec2 p){
    return fract(sin(dot(p ,vec2(12.9898,78.233))) * 43758.5453);
}

// 補間乱数
float irnd(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec4 v = vec4(rnd(vec2(i.x,       i.y      )),
                  rnd(vec2(i.x + 1.0, i.y      )),
                  rnd(vec2(i.x,       i.y + 1.0)),
                  rnd(vec2(i.x + 1.0, i.y + 1.0)));
    return interpolate(interpolate(v.x, v.y, f.x), interpolate(v.z, v.w, f.x), f.y);
}

// ノイズ生成
float noise(vec2 p){
    float t = 0.0;
    for(int i = 0; i < oct; i++){
        float freq = pow(2.0, float(i));
        float amp  = pow(per, float(oct - i));
        t += irnd(vec2(p.x / freq, p.y / freq)) * amp;
    }
    return t;
}

/**
** Easing
** t : 時間(進行度)
** b : 開始の値(開始時の座標やスケールなど)
** c : 開始と終了の値の差分
** d : Tween(トゥイーン)の合計時間
**/
float easeIn(float t, float b, float c, float d) {
    float t_ = t / d;
    return c*t_*t_*t_ + b;
}
float easeOut(float t, float b, float c, float d) {
    float t_ = t / d;
    t_ = t_ - 1.0;
    return -c*(t_*t_*t_ - 1.0) + b;
}

float easeInQuart(float t, float b, float c, float d) {
    float t_ = t / d;
    return c*t_ * t_ * t_ * t_ + b;
}

float easeOutQuart(float t, float b, float c, float d) {
    float t_ = t / d;
    t_ = t_ - 1.0;
    return -c * (t_ * t_ * t_ * t_ - 1.0) + b;
}

void main(){

    vec2 ratio = vec2(
        min((resolution.x / resolution.y) / (imgSize.x / imgSize.y), 1.0),
        min((resolution.y / resolution.x) / (imgSize.y / imgSize.x), 1.0)
    );
    vec2 uv = vec2(
        vTexCoord.x * ratio.x + (1.0 - ratio.x) * 0.5,
        vTexCoord.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec2 p_ = uv;
    vec2 ajustCenter = p_ / 1.1;

    float len = length(p_ - mouse);
    if( isSp ) len = length(p_ - deviceorientation) * 4.0;

    float destTex = 1.0;
    float destTex2 = 1.0;
    float destTex3 = 1.0;

    vec2 p  = p_ * 8.0 - vec2(20.0);
    vec2 i = p;
    float c = 1.0;
    float inten = .02;

    float speed = 0.003;    // larger -> slower
    float speed2 = 0.005;   // larger -> slower
    float freq = 1.2;     // ripples
    float xflow = 1.5;    // flow speed in x direction
    float yflow = 1.0;    // flow speed in y direction

    // フェードイン・アウト機能

    float timer = 0.5;

    float nextTime = mod(time - startTime + 0.05, timer + 0.05);
    float opacity = 0.0;
    float noiseNum = noise(vec2(2.0) + sin(time));

    float darkNum = dark;
    float freqNum = freq;

    if( hover == 0.0 ) {
        opacity = easeOutQuart( nextTime, 0.0, 1.0, timer );
    }
    else if( hover == 1.0 ) {
        opacity = 1.0;
    }
    else if( hover == 2.0 ) {
        opacity = easeInQuart( timer - nextTime, 0.0, 1.0, timer );
    }
    else if( hover == 3.0 ) {
        opacity = 0.0;
    }
    else if( hover == 4.0 ) {
        darkNum = 1.0 - easeOutQuart( time - startTime, 0.0, 1.0-dark, 1.0 );
        opacity = 1.0;
    }
    else if( hover == 5.0 ) {
        darkNum = dark;
        opacity = 1.0;
    }

    // if( waveFlag == 1.0 ) {
    //     freqNum = easeInQuart( time - startTime, freq, wave-freq, 1.0 );
    // }
    // else if( waveFlag == 2.0 ) {
    //     freqNum = wave;
    // }
    // フェードイン・アウト機能

    // 光のゆらぎ
    for (int n = 1; n < MAX_ITER; n++) {
        float t = (time * 0.2) * (2.0 - (3.0 / float(n))) + len + scroll;
        float t2 = (time * 0.05) + len + scroll;

        if( isSp ) {
            t = len*0.5 + scroll;
            t2 = len*0.5 + scroll;
        }

        i = p + vec2( cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
        c += 1.0 / length( vec2(p.x / (sin(i.x+t)/inten), p.y / (cos(i.y+t)/inten)) );

        i = p + vec2(cos(t - i.x * freqNum) + sin(t + i.y * freqNum) + (t * xflow), sin(t - i.y * freqNum) + cos(t + i.x * freqNum) + (t * yflow));
        c += 1.0 / length(vec2(p.x / (sin(i.x + t * speed2) / inten), p.y / (cos(i.y + t * speed2) / inten)));

        destTex += (len*2.0) * length( vec2( (sin(i.x+t2)/inten), (cos(i.y+t2)/inten) ) ) * 0.0005;
        destTex2 += (len*2.0) * length( vec2( (sin(i.x+t2*1.5)/inten), (cos(i.y+t2*1.5)/inten) ) ) * 0.001;
        destTex3 += (len*10.0) * length( vec2( (sin(i.x+t2*0.5)/inten), (cos(i.y+t2*0.5)/inten) ) ) * 0.0005;
    }

    c /= float(MAX_ITER);
    c = 1.5 - sqrt(c);

    vec4 texColor = vec4(
        0.2*opacity + 0.4*(1.0-opacity),
        0.2*opacity + 0.4*(1.0-opacity),
        0.2*opacity + 0.4*(1.0-opacity),
        1.);
    float ajustNum = 0.3 + (opacity * darkNum);
    if( !isSp ) {
        texColor.rgb *= (0.5+pow(noiseNum,3.0)) * ajustNum / (1.0 - c) - (0.1*(1.0-opacity)) + (0.5*opacity * darkNum);
    } else {
        texColor.rgb *= ( 0.3 / (1.0 - c) + noise(p_) ) - (0.1*(1.0-opacity)) + (0.3*opacity);
    }
    // 光のゆらぎ

    vec4 samplerColor = texture2D(texture, ajustCenter * destTex);
    vec4 samplerColor2 = texture2D(texture, ajustCenter * destTex2);
    vec4 samplerColor3 = texture2D(texture, ajustCenter * destTex3);

        samplerColor2 = vec4( samplerColor2.r, samplerColor2.g, samplerColor2.b, 1.0 );

    gl_FragColor = samplerColor2 * samplerColor * texColor * opacity * 1.5;
    gl_FragColor += texColor * (1. - opacity);

}
