import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

//  fragment shader =====================================
function fragmentShader(){
  return `

  precision highp float;
  uniform vec2 res;
  uniform float time;
  
  
  void main() {
   float ar =res.x/res.y;
   vec2 uv = gl_FragCoord.xy/res;
   uv.x = uv.x - 0.7 ;
   uv.y = uv.y - 0.5 ;
   uv.x *= 3.0 ;
   uv.y *= 3.0;
  
   uv.x *= ar;
  
   float rec = uv.x;
   float imc = uv.y;
   float rez = sin(0.1*time);
   float imz = 0.0;
   int n ;
   float modz;
  
   for(int i=0 ; i<100 ; ++i)
   {
  
    float rezn = rez*rez -imz*imz + rec;
    float imzn = 2.0*rez*imz + imc ;
    rez = rezn;
    imz = imzn;
    n = i;
  
    modz = sqrt(rez*rez + imz*imz);
    if(modz > 10.0) break;
   }
  
  
   //vec3 color = vec3(modz,0.0,0.0);
   vec3 color = vec3(float(n)/20.0);
   //if (modz<=1.0){ color = vec3(1.0,0.0,0.0);}
   gl_FragColor = vec4(color,1.0);
  
  }  
  `
}

var geometry, material, mesh;
var uniforms;

var aspect = window.innerWidth / window.innerHeight;


  // setup();  // call camera settings

const camera = new THREE.OrthographicCamera(-1,1,1,-1,-1,1);
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer( { antialias: false, precision:'highp' } );
renderer.setSize( window.innerWidth, window.innerHeight-2 );
document.body.appendChild( renderer.domElement );

window.addEventListener( 'resize',() =>{
  renderer.setSize( cwidth, cheight ) 
  camera.aspect = cwidth / cheight 
  renderer.setPixelRatio(window.devicePixelRatio);
  camera.updateProjectionMatrix()
})


uniforms = { // GLSL uniforms
  time: { type: "f", value: 1.0 },
  res: {type: 'vec2',value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
};
  
geometry = new THREE.PlaneBufferGeometry(2, 2);
material = new THREE.ShaderMaterial({
  fragmentShader: fragmentShader(), 
  uniforms: uniforms
});  
    
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);  animate();



// animtion loop--------------------------------------

function animate(){ 
  // keep looping
  
  uniforms.time.value += 0.05;
  renderer.render(scene, camera);
  requestAnimationFrame(animate); 
}


