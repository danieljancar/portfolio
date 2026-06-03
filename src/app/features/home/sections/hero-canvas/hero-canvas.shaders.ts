export const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2 u_res;

  const vec3 c1 = vec3(0.510, 0.663, 0.318); // brand-400 #82a951
  const vec3 c2 = vec3(0.357, 0.494, 0.235); // brand-500 #5b7e3c
  const vec3 c3 = vec3(0.710, 0.851, 0.541); // accent  #b5d98a

  void main() {
    vec2 uv = vUv;
    float ratio = u_res.x / max(u_res.y, 1.0);
    uv.x *= ratio;

    float t = u_time * 0.12;

    float w = sin(uv.x * 3.0 + t) * 0.5
            + sin(uv.y * 2.5 - t * 1.3) * 0.5
            + sin((uv.x + uv.y) * 2.0 + t * 0.7) * 0.5;
    w = w * 0.5 + 0.5;

    float v = sin(uv.y * 3.5 + w * 2.0 + t * 0.9) * 0.5 + 0.5;

    vec3 col = mix(c1, c2, smoothstep(0.2, 0.8, w));
    col = mix(col, c3, smoothstep(0.55, 1.0, v) * 0.5);

    float hx = smoothstep(1.15, 0.2, abs(vUv.x - 0.5) * 1.5);
    float vy = smoothstep(0.0, 0.5, vUv.y);
    float alpha = hx * vy * 0.6;

    gl_FragColor = vec4(col, alpha);
  }
`;
