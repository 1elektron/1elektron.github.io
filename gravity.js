// working fine better than gravity.js
import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

// Create a scene
function createScene(){
    const scene = new THREE.Scene();
    return scene;
}

const cwidth = 600;
const cheight = 600;


function createCamera(){

    // Create a camera
    const camera = new THREE.OrthographicCamera(0, 600, 600, 0 , -1,1);
    camera.zoom = 1;
    return camera;

}
function createRenderer(){
    // create renderer
    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(cwidth, cheight);
    renderer.setClearColor("#000000")
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.physicallyCorrectLights = true;
    document.body.appendChild( renderer.domElement );
    return renderer;

}


const radius = 10;
function createBall(){
    const geometry = new THREE.CircleGeometry(radius, 60 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
    const ball = new THREE.Mesh( geometry, material );
    return ball;
}



const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();


window.addEventListener( 'resize',() =>{
    renderer.setSize( cwidth, cheight ) 
    camera.aspect = cwidth / cheight 
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.updateProjectionMatrix()
})

const ball =  createBall();

scene.add( ball );

// ball.translateX(cwidth/2);
// ball.translateY(cheight/2);

// initial conditions
let x = cwidth/2;
let y = cheight/2;
ball.position.x = x;
ball.position.y = y;
let vx = 1.0;
let vy = 0.0;
let ax = 0.0;
let ay = -0.1;

// update balls coordinates
function update_ball(){
    vx = vx + ax;
    vy = vy + ay;
    ball.position.x += vx;
    ball.position.y += vy;
    console.log(x,y, vx,vy);
}

function checkBoundary(){
    let x = ball.position.x;
    let y = ball.position.y;

    if((x-radius)<=0 || (x+radius)>=cwidth){
        vx = (-1)*vx;
    }
    if((y-radius)<=0 || (y+radius)>=cheight){
        vy = (-1)*vy;
    }
    
}


function animate() {
    
    requestAnimationFrame( animate )
    renderer.render( scene, camera )
    checkBoundary();
    update_ball();
    // console.log(ball.position.x);
}

animate()