precision mediump float;
uniform sampler2D texture;   // フレームバッファに描画したレンダリング結果

varying vec2 vTexCoord; // 頂点シェーダから送られてきたテクスチャ座標

uniform float startTime;
uniform float time;
uniform float slideTimer;
uniform vec2 mouse; // マウスカーソル正規化済み座標 @@@
uniform vec2 mousePrev; // マウスカーソル正規化済み座標 @@@
uniform vec2 resolution;
uniform vec2 imgSize;
uniform bool isSp;
uniform float hover;

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
float easeInQuart(float t, float b, float c, float d) {
    float t_ = t / d;
    return c*t_ * t_ * t_ * t_ + b;
}

float easeOutQuart(float t, float b, float c, float d) {
    float t_ = t / d;
    t_ = t_ - 1.0;
    return -c * (t_ * t_ * t_ * t_ - 1.0) + b;
}

// vec2 fitPosition(vec2 tex, vec2 res, bool isSp) {
//
//     vec2 p = (tex * res * 2.0) - res;
//     float aspect = imgSize.y / imgSize.x;
//
//     if( !isSp ) {
//
//         if( res.x * aspect > res.y ) { // 上下左右フィット
//
//             p /= max(res.x * aspect, res.y * aspect);
//
//         } else {
//             if( res.x > res.y ) {
//                 p /= min(res.x, res.y);
//             } else {
//                 p /= max(res.x, res.y);
//             }
//         }
//     } else {
//
//         p /= max(res.x, res.y);
//         // p.x *= res.y / res.x * 0.95;
//
//     };
//
//     return p;
//
// }

void main(){

    // vec2 p_ = fitPosition(vTexCoord, resolution, isSp);
    // vec2 ajustCenter = (p_ / 2.0) + 0.5;

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

    vec2 destTex = vec2(1.0,1.0);
    // float destTex2 = 1.0;
    float destTex3 = 1.0;

    vec2 p  = p_ * 8.0 - vec2(20.0);
    vec2 i = p;
    float c = 1.0;
    float inten = .02;

    // フェードイン・アウト機能

    float nextTime = (time - startTime);
    float opacity = 0.0;
    float noiseNum = noise(vec2(2.0) + sin(time));

    if( hover == 0.0 ) {
        opacity = easeOutQuart( nextTime, 0.0, 1.0, 1.0 );
    }
    else if( hover == 1.0 ) {
        opacity = 1.0;
    }
    else if( hover == 2.0 ) {
        opacity = easeInQuart( 1.0 - nextTime, 0.0, 1.0, 1.0 );
    }
    else if( hover == 3.0 ) {
        opacity = 0.0;
    }
    // フェードイン・アウト機能


    // 光のゆらぎ
    for (int n = 1; n < MAX_ITER; n++) {
        float t = (time * 0.2) * (2.0 - (3.0 / float(n))) + len;
        float t2 = (time * 0.05) + len;

        if( isSp ) {
            t *= 0.1 * len;
        }

        i = p + vec2( cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));

        c += 1.0 / length( vec2(p.x / (sin(i.x+t)/inten), p.y / (cos(i.y+t)/inten)) );

        // destTex2 += (len*0.75) * length( vec2( (sin(i.x+t2)/inten), (cos(i.y+t2)/inten) ) ) * 0.0005;
        destTex3 += (len*2.0) * length( vec2( (sin(i.x+t2)/inten), (cos(i.y+t2)/inten) ) ) * 0.0005;
    }

    c /= float(MAX_ITER);
    c = 1.5 - sqrt(c);

    vec4 texColor = vec4(0.2, 0.2, 0.2, 1.);
    float ajustNum = 0.3;
    if( !isSp ) {
        texColor.rgb *= (0.5+pow(noiseNum,3.0)) * ajustNum / (1.0 - c) - (0.1*(1.0-opacity)) + (0.5*opacity);
    } else {
        texColor.rgb *= ( ajustNum / (1.0 - c) + noise(p_)  );
    }
    // 光のゆらぎ

    vec4 samplerColor = texture2D(texture, ajustCenter * destTex3);
    // vec4 samplerColor_ = texture2D(texture, ajustCenter * destTex2);
    // float r = samplerColor_.r;
    // float g = samplerColor_.g;
    // float b = samplerColor_.b;
    //
    // float mono = (r + g + b) / 1.2;
    //       // mono *= mono;

    float dest = 1.0;
    if( !isSp ) {
        // ホワイトノイズを生成 @@@
        // float noise = rnd(p + mod(time, 2.0));
        // dest *= noise * 0.2 + 0.9;// マイルド化

        gl_FragColor =  samplerColor * texColor * opacity;
        gl_FragColor += dest * texColor * (1. - opacity);
    } else {
        gl_FragColor = texColor;

    }

}
