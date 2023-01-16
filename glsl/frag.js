const fragment = /* glsl */ `

#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform float u_hour;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// const float u_hour = 0.;

#define PI 3.1415926535

float noise (vec2 pq) {
    return fract(sin(dot(pq.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}
float noiseSmooth(vec2 pq){

	vec2 index = floor(pq);
	vec2 frag = fract(pq);
	frag = smoothstep(0., 1., frag);

	float topLeft = noise(index);
	float topRight = noise(index + vec2(1,0));
	float top = mix(topLeft, topRight, frag.x);

	float bottomLeft = noise(index + vec2(0,1));
	float bottomRight = noise(index + vec2(1,1));
	float bottom = mix(bottomLeft, bottomRight, frag.x);

	return  mix(top, bottom, frag.y);
}
// float map(float value, float min1, float max1, float min2, float max2) {
//   return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
// }

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
	vec2 uv = gl_FragCoord.xy/u_resolution;

	uv.x *= u_resolution.x / u_resolution.y;

	float sin_time = sin(u_hour * PI);

	float time_day = sin_time * 10.0;
	// float min_hour = 2.0;
	// float max_hour = 10.0;
	// float time_day = smoothstep(2., 10., u_hour);
	// float map(time_day, min_hour, max_hour, float min2, float max2);
	vec3 sky = vec3(0.5, 0.7, 0.9) * (time_day - uv.y) * .1	;

	uv.x -= u_time / 15.;

	vec2 uv2 = uv;
	uv2.x -= u_time / 25.;

	vec2 uv3 = uv;
	uv3.x -= u_time / 35.;

	float scale = 0.5 + (sin_time * 3.5);

	vec3 col = vec3(noiseSmooth(uv * 4. * scale) );
	col += vec3(noiseSmooth(uv * 8. * scale)) *0.5;
	col += vec3(noiseSmooth(uv * 16. * scale)) *0.25;
	col += vec3(noiseSmooth(uv2 * 32. * scale)) *0.125;
	col += vec3(noiseSmooth(uv2 * 64. * scale)) *0.0625;
	col += vec3(noiseSmooth(uv2 * 128. * scale)) *0.0312;
	col += vec3(noiseSmooth(uv3 * 256. * scale)) *0.0156;
	col += vec3(noiseSmooth(uv3 * 512. * scale)) *0.0078;
	col += vec3(noiseSmooth(uv3 * 1024. * scale)) *0.0039;

	col /= 1.7;

	col *= smoothstep(0.1, 0.15 + sin_time, col);

	// col = mix(vec3(1.), sky, col);
	col = mix(vec3(1.), sky, 1. - col);

	float filter_noise = (noise(st) - 0.5) * 0.075;

	col.x += filter_noise;
	col.y += filter_noise;
	col.z += filter_noise;

	gl_FragColor = vec4(col, 1.0);
}`;

// export default fragment;
