import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Futuristic3DBackground.css';

const lerp = (a, b, t) => a + (b - a) * t;
const sm   = (t) => t * t * (3 - 2 * t);
const clp  = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function makeSphere(n, r = 6) {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const phi = Math.acos(-1 + (2 * i) / n);
    const theta = Math.sqrt(n * Math.PI) * phi;
    p[i*3] = r*Math.cos(theta)*Math.sin(phi);
    p[i*3+1] = r*Math.sin(theta)*Math.sin(phi);
    p[i*3+2] = r*Math.cos(phi);
  }
  return p;
}

function makeText(n) {
  // Large canvas, dense sampling, NO random jitter so letters are sharp
  const W = 1024, H = 220;
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const cx = cv.getContext('2d');
  cx.fillStyle = '#000'; cx.fillRect(0, 0, W, H);
  // Draw extra-thick strokes: fill + stroke so thin spots fill in
  cx.font = 'bold 140px Arial, sans-serif';
  cx.fillStyle = '#fff';
  cx.strokeStyle = '#fff';
  cx.lineWidth = 8;
  cx.textAlign = 'center';
  cx.textBaseline = 'middle';
  cx.fillText('CODEXA', W / 2, H / 2);
  cx.strokeText('CODEXA', W / 2, H / 2);

  const data = cx.getImageData(0, 0, W, H).data;
  const pts = [];
  // Sample every 2px for dense coverage
  for (let y = 0; y < H; y += 2)
    for (let x = 0; x < W; x += 2)
      if (data[(y * W + x) * 4] > 80) pts.push([x, y]);

  // Camera fov=65, z=16 → half-width ≈ 10.2 world units. Keep text ±9.
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const [x, y] = pts[i % pts.length];
    p[i*3]   = (x / W - 0.5) * 19;   // fits screen width
    p[i*3+1] = -(y / H - 0.5) * 5.5; // letter height
    p[i*3+2] = 0;                      // all at z=0 → no depth blur
  }
  return p;
}

function makeChaos(n) {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    p[i*3]=(Math.random()-.5)*44; p[i*3+1]=(Math.random()-.5)*34; p[i*3+2]=(Math.random()-.5)*24;
  }
  return p;
}

function makeVortex(n) {
  const p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const t = (i/n)*Math.PI*16, r = 2+(i/n)*5;
    p[i*3]=Math.cos(t)*r; p[i*3+1]=(i/n-.5)*24; p[i*3+2]=Math.sin(t)*r;
  }
  return p;
}

const Futuristic3DBackground = ({ isDark = true }) => {
  const containerRef = useRef(null);
  const mouseRef     = useRef({ x:0, y:0, tx:0, ty:0 });
  const ripples      = useRef([]);
  const scrollPc     = useRef(0);
  const themeRef     = useRef({ prog: 1, target: 1 }); // 1=dark, 0=light

  useEffect(() => {
    themeRef.current.target = isDark ? 1 : 0;
  }, [isDark]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let W = window.innerWidth, H = window.innerHeight;
    const mob = W < 768;
    const N = mob ? 600 : 1400;

    const scene  = new THREE.Scene();
    scene.fog    = new THREE.FogExp2(0x050505, 0.018);
    const camera = new THREE.PerspectiveCamera(65, W/H, 0.1, 200);
    camera.position.z = mob ? 22 : 16;

    const renderer = new THREE.WebGLRenderer({ antialias: !mob, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mob ? 1 : 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // ── Background shader ──────────────────────────────────
    const bgGeo = new THREE.PlaneGeometry(80, 55);
    const bgMat = new THREE.ShaderMaterial({
      uniforms:{
        u_time:  {value:0},
        u_mouse: {value:new THREE.Vector2(.5,.5)},
        u_ripple:{value:0},
        u_theme: {value:1.0}, // 1=dark, 0=light
      },
      vertexShader:`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader:`
        uniform float u_time;uniform vec2 u_mouse;uniform float u_ripple;
        uniform float u_theme; // 1=dark 0=light
        varying vec2 vUv;
        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
        void main(){
          vec2 st=vUv;float t=u_time;
          vec2 c1=vec2(.5+cos(t*.28)*.28,.5+sin(t*.22)*.22);
          vec2 c2=vec2(.5+sin(t*.18)*.32,.5+cos(t*.32)*.18);
          float d1=length(st-c1),d2=length(st-c2);
          float mD=length(st-u_mouse);
          float mG=exp(-mD*5.5)*.22;
          float rp=sin(mD*30.-t*8.)*exp(-mD*8.)*u_ripple*.06;
          // Dark world: deep purple-black cinematic atmosphere
          vec3 dkBg=vec3(.020,.010,.038);     // #05020a deep void purple
          vec3 dkBlob1=vec3(.070,.030,.130);  // subtle violet cloud
          vec3 dkBlob2=vec3(.045,.018,.090);  // deeper purple shadow
          vec3 dkGlow=vec3(.200,.080,.320);   // purple mouse glow
          // Light world: crisp white
          vec3 ltBg=vec3(.96,.97,.98);
          vec3 ltBlob1=vec3(.88,.90,.94);
          vec3 ltBlob2=vec3(.92,.93,.96);
          vec3 ltGlow=vec3(.70,.75,.85);
          // Interpolate based on u_theme (1=dark, 0=light)
          vec3 bg=mix(ltBg,dkBg,u_theme);
          vec3 b1=mix(ltBlob1,dkBlob1,u_theme);
          vec3 b2=mix(ltBlob2,dkBlob2,u_theme);
          vec3 gw=mix(ltGlow,dkGlow,u_theme);
          vec3 col=bg;
          col=mix(col,b1,smoothstep(.9,.0,d1)*.5);
          col=mix(col,b2,smoothstep(.8,.0,d2)*.35);
          col+=gw*mG;
          col+=mix(vec3(.06,.08,.12),vec3(.12,.12,.14),u_theme)*rp;
          col+=vec3((hash(st*450.+t)-.5)*.005);
          gl_FragColor=vec4(col,1.);
        }
      `,
      depthWrite: false,
    });
    const bgMesh = new THREE.Mesh(bgGeo, bgMat);
    bgMesh.position.z = -20;
    scene.add(bgMesh);

    // ── Neural network nodes ───────────────────────────────
    const nCount = mob ? 35 : 70;
    const nodes = Array.from({length:nCount}, ()=>{
      const bx=(Math.random()-.5)*30, by=(Math.random()-.5)*20, bz=(Math.random()-.5)*8-2;
      return {bx,by,bz,x:bx,y:by,z:bz,
        spX:.18+Math.random()*.2,spY:.14+Math.random()*.18,
        aX:.8+Math.random()*1.4,aY:.6+Math.random()*1.,
        phX:Math.random()*Math.PI*2,phY:Math.random()*Math.PI*2};
    });
    const nGeo=new THREE.BufferGeometry();
    const nArr=new Float32Array(nCount*3);
    nodes.forEach((n,i)=>{nArr[i*3]=n.bx;nArr[i*3+1]=n.by;nArr[i*3+2]=n.bz;});
    nGeo.setAttribute('position',new THREE.BufferAttribute(nArr,3));
    scene.add(new THREE.Points(nGeo,new THREE.PointsMaterial({size:.1,color:0xffffff,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:.35})));

    const maxL=mob?200:450;
    const lGeo=new THREE.BufferGeometry();
    const lPos=new Float32Array(maxL*6),lCol=new Float32Array(maxL*8);
    lGeo.setAttribute('position',new THREE.BufferAttribute(lPos,3));
    lGeo.setAttribute('color',new THREE.BufferAttribute(lCol,4));
    scene.add(new THREE.LineSegments(lGeo,new THREE.LineBasicMaterial({vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})));

    // ── Morph targets ──────────────────────────────────────
    const spherePos = makeSphere(N);
    const chaosPos  = makeChaos(N);
    const vortexPos = makeVortex(N);
    let textPos = chaosPos; // fallback until font ready
    // Build text after fonts guaranteed loaded
    const buildText = () => { textPos = makeText(N); };
    if (document.fonts) document.fonts.ready.then(buildText); else setTimeout(buildText, 500);

    // InstancedMesh — white wireframe cubes, additive blending = bright glow on black
    const iGeo = new THREE.BoxGeometry(.14,.14,.14);
    const iMat = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xffffff,                   // pure white
      blending: THREE.AdditiveBlending,  // additive = glows bright on dark
      depthWrite: false,
    });
    const mesh  = new THREE.InstancedMesh(iGeo, iMat, N);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    scene.add(mesh);

    // Pre-compute unique rotation speeds and phases per particle
    const rSpd = new Float32Array(N * 3); // rx, ry, rz speed
    const rPh  = new Float32Array(N * 3); // phase offsets
    const sPh  = new Float32Array(N);     // scale pulse phase
    for (let i = 0; i < N; i++) {
      rSpd[i*3]   = 0.08 + Math.random() * 0.22;  // rx speed
      rSpd[i*3+1] = 0.06 + Math.random() * 0.18;  // ry speed
      rSpd[i*3+2] = 0.04 + Math.random() * 0.14;  // rz speed
      rPh[i*3]    = Math.random() * Math.PI * 2;
      rPh[i*3+1]  = Math.random() * Math.PI * 2;
      rPh[i*3+2]  = Math.random() * Math.PI * 2;
      sPh[i]      = Math.random() * Math.PI * 2;
    }

    const cur = spherePos.slice(); // current interpolated positions
    const dummy = new THREE.Object3D();

    // ── Events ─────────────────────────────────────────────
    const onMove=e=>{mouseRef.current.tx=(e.clientX/W)*2-1;mouseRef.current.ty=-((e.clientY/H)*2-1);};
    const onClick=e=>{ripples.current.push({t:0});if(ripples.current.length>6)ripples.current.shift();};
    const onScroll=()=>{const max=document.body.scrollHeight-window.innerHeight;scrollPc.current=max>0?window.scrollY/max:0;};
    const onResize=()=>{W=window.innerWidth;H=window.innerHeight;camera.aspect=W/H;camera.updateProjectionMatrix();renderer.setSize(W,H);};
    window.addEventListener('mousemove',onMove);
    window.addEventListener('click',onClick);
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onResize);

    // ── Render loop ────────────────────────────────────────
    const clock=new THREE.Clock();
    let rafId;

    const animate=()=>{
      rafId=requestAnimationFrame(animate);
      const t=clock.getElapsedTime();
      const m=mouseRef.current;
      m.x+=(m.tx-m.x)*.06; m.y+=(m.ty-m.y)*.06;
      const sc=scrollPc.current;

      // Background
      bgMat.uniforms.u_time.value=t;
      bgMat.uniforms.u_mouse.value.set(m.x*.5+.5,m.y*.5+.5);
      let rStr=0;
      ripples.current=ripples.current.filter(r=>r.t<2.5);
      ripples.current.forEach(r=>{rStr+=Math.max(0,1-r.t/2.5);r.t+=.016;});
      bgMat.uniforms.u_ripple.value=rStr;

      // ── Cinematic theme transition (lerp at 60fps) ────────
      const th = themeRef.current;
      th.prog += (th.target - th.prog) * 0.035; // ~1.2s transition
      bgMat.uniforms.u_theme.value = th.prog;
      // Mesh color: white in dark mode, dark-gray in light mode
      const meshL = 0.08 + th.prog * 0.92; // 0.08 (dark-gray) → 1.0 (white)
      iMat.color.setRGB(meshL, meshL, meshL + th.prog * 0.04);
      // Neural line brightness
      const lineL = th.prog > 0.5 ? 0.85 : 0.25 + th.prog * 1.2;
      // Fog: light gray in light mode, near-black in dark mode
      const fogC = Math.round(lerp(0xf4f5f7, 0x050505, th.prog));
      scene.fog.color.setHex(fogC < 0 ? 0x050505 : fogC);
      scene.fog.density = lerp(0.010, 0.018, th.prog);
      // Camera exposure adapts
      renderer.toneMappingExposure = lerp(1.4, 1.1, th.prog);

      // Neural nodes + lines
      const np=nGeo.attributes.position.array;
      const mx3=m.x*14,my3=m.y*9;
      for(let i=0;i<nCount;i++){
        const n=nodes[i];
        let tx=n.bx+Math.sin(t*n.spX+n.phX)*n.aX, ty=n.by+Math.cos(t*n.spY+n.phY)*n.aY;
        const dx=tx-mx3,dy=ty-my3,d=Math.sqrt(dx*dx+dy*dy);
        if(d<7){const f=(7-d)*.09;tx+=dx/d*f;ty+=dy/d*f;}
        n.x=tx;n.y=ty;np[i*3]=tx;np[i*3+1]=ty;np[i*3+2]=n.bz;
      }
      nGeo.attributes.position.needsUpdate=true;
      let li=0;
      for(let i=0;i<nCount&&li<maxL;i++)for(let j=i+1;j<nCount&&li<maxL;j++){
        const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,dz=nodes[i].z-nodes[j].z;
        const d=Math.sqrt(dx*dx+dy*dy+dz*dz);
        if(d<4.5){
          lPos[li*6]=nodes[i].x;lPos[li*6+1]=nodes[i].y;lPos[li*6+2]=nodes[i].z;
          lPos[li*6+3]=nodes[j].x;lPos[li*6+4]=nodes[j].y;lPos[li*6+5]=nodes[j].z;
          const a=(1-d/4.5)*.3;
      // White/silver lines
      lCol[li*8]=.85;lCol[li*8+1]=.88;lCol[li*8+2]=.92;lCol[li*8+3]=a;
      lCol[li*8+4]=.85;lCol[li*8+5]=.88;lCol[li*8+6]=.92;lCol[li*8+7]=a*.4;
          li++;
        }
      }
      for(let i=li;i<maxL;i++){lCol[i*8+3]=0;lCol[i*8+7]=0;}
      lGeo.attributes.position.needsUpdate=true;
      lGeo.attributes.color.needsUpdate=true;

      // Morph state based on scroll
      let pA,pB,mt;
      if(sc<.22)      {pA=spherePos;pB=textPos;  mt=0;}
      else if(sc<.40) {pA=spherePos;pB=textPos;  mt=(sc-.22)/.18;}
      else if(sc<.58) {pA=textPos;  pB=textPos;  mt=0;}
      else if(sc<.76) {pA=textPos;  pB=chaosPos; mt=(sc-.58)/.18;}
      else            {pA=chaosPos; pB=vortexPos; mt=(sc-.76)/.24;}
      const sf=sm(clp(mt,0,1));
      const inText=sc>.32&&sc<.66;
      // Zero noise in text mode so particles lock sharply to letter positions
      const noiseAmp=inText?0:.16;

      for(let i=0;i<N;i++){
        const ix=i*3;
        const tx=lerp(pA[ix],  pB[ix],  sf);
        const ty=lerp(pA[ix+1],pB[ix+1],sf);
        const tz=lerp(pA[ix+2],pB[ix+2],sf);
        cur[ix]  +=(tx-cur[ix])  *.05;
        cur[ix+1]+=(ty-cur[ix+1])*.05;
        cur[ix+2]+=(tz-cur[ix+2])*.05;
        let px=cur[ix]+Math.sin(cur[ix+1]*.4+t*.9+i*.01)*noiseAmp;
        let py=cur[ix+1], pz=cur[ix+2];
        // Mouse attraction
        const dx=mx3-px,dy=my3-py,d2=dx*dx+dy*dy;
        let sc2=1;
        if(d2<28){const d=Math.sqrt(d2),f=sm((1-d/5.3));px+=dx*f*.6;py+=dy*f*.6;sc2=1+f*2;}
        dummy.position.set(px, py, pz);

        // Full 3-axis tumble — each box has its own speed & phase
        const rx = t * rSpd[i*3]   + rPh[i*3];
        const ry = t * rSpd[i*3+1] + rPh[i*3+1];
        const rz = t * rSpd[i*3+2] + rPh[i*3+2];
        dummy.rotation.set(rx, ry, rz);

        // Per-particle breathing scale + boost when mouse is near
        const pulse = 1 + 0.28 * Math.sin(t * 1.8 + sPh[i]);
        // Extra spin + scale burst from mouse proximity
        if (d2 < 28) {
          const d  = Math.sqrt(d2);
          const f  = sm(1 - d / 5.3);
          px += dx * f * 0.6; py += dy * f * 0.6;
          sc2 = pulse * (1 + f * 2.5);
          // Spin faster near cursor
          dummy.rotation.x += f * Math.PI * 1.2;
          dummy.rotation.y += f * Math.PI * 0.9;
          dummy.rotation.z += f * Math.PI * 0.7;
        } else {
          sc2 = pulse;
        }
        dummy.position.set(px, py, pz);
        dummy.scale.setScalar(sc2);
        dummy.updateMatrix();
        mesh.setMatrixAt(i,dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate=true;
      mesh.rotation.y=inText?0:t*.05;
      mesh.rotation.x=m.y*.07;

      // Camera drift
      camera.position.x+=(m.x*1.5-camera.position.x)*.025;
      camera.position.y+=(m.y*1.-camera.position.y)*.025;
      camera.lookAt(scene.position);

      renderer.render(scene,camera);
    };
    animate();

    return ()=>{
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove',onMove);
      window.removeEventListener('click',onClick);
      window.removeEventListener('scroll',onScroll);
      window.removeEventListener('resize',onResize);
      bgGeo.dispose();bgMat.dispose();
      nGeo.dispose();lGeo.dispose();
      iGeo.dispose();iMat.dispose();
      if(container.contains(renderer.domElement))container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  },[]);

  return (
    <div className="futuristic-background-container">
      <div className="three-canvas-wrapper" ref={containerRef} />
      <div className="futuristic-grid-overlay" />
      <div className="futuristic-vignette" />
    </div>
  );
};

export default Futuristic3DBackground;
