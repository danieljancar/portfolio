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

  const vec3 c1 = vec3(0.456, 0.501, 1.0);   // brand-400 #7480ff
  const vec3 c2 = vec3(0.333, 0.376, 0.961); // brand-500 #5560f5
  const vec3 c3 = vec3(0.941, 0.671, 0.988); // accent  #f0abfc

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

    float d = distance(vUv, vec2(0.5));
    float alpha = smoothstep(0.85, 0.15, d) * 0.55;

    gl_FragColor = vec4(col, alpha);
  }
`;
