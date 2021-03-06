
// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;
let object, object1, object2;
let meshs;
let guiControls;

let video;
let videotext;
let videoP;
let videotext2;
let OrbitControls;

//add material name here first
let newMaterial, Standard, newStandard, pointsMaterial;

let SkyboxTexture, SkyboxMaterial, refractorySkybox;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const mixers = [];
const clock = new THREE.Clock();

const the_button = document.querySelector(".js-btn")
const modal = document.querySelector(".modal")
const closeBtn = document.querySelector(".close")


function init() {

  container = document.querySelector( '#scene-container' );

  scene = new THREE.Scene();

  video = document.getElementById( 'video' );
  video.src="models/video.mp4";

  videoP = document.getElementById( 'videoP' );
  videoP.src="models/video.mp4";


  //raycaster = new THREE.Raycaster();
  //mouse = new THREE.Vector2();
 //scene.background = new THREE.Color( 0x8FBCD4 );
  guiControls = new function() {
    this.rotationX = 0.01;
    this.rotationY = 0.01;
    this.rotationZ = 0.01;
  };

  // var gui = new dat.GUI();
  // gui.add(guiControls, 'rotationX', 0, 1.0 );
  // gui.add(guiControls, 'rotationY', 0, 1.0 );
  // gui.add(guiControls, 'rotationZ', 0, 1.0 );


  //createSkybox();
  getWebcam();
  manualSkyBox();
  createCamera();
  createControls();
  createLights();
  createMaterials();

  loadModels();
  gettheObject();
  createRenderer();


  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

// function createSkybox(){
//
//
//   SkyboxTexture = new THREE.CubeTextureLoader()
//     					.setPath( 'models/MilkyWay/' )
//     					.load( [ 'dark-s_pz.jpg', 'dark-s_nx.jpg', 'dark-s_py.jpg', 'dark-s_ny.jpg', 'dark-s_pz.jpg', 'dark-s_nz.jpg' ] );
//
// //SkyboxTexture.encoding = THREE.sRGBEncoding;
// SkyboxTexture.mapping = THREE.CubeRefractionMapping;
// //other mappings to try:
// /*
// THREE.UVMapping
// THREE.CubeReflectionMapping
// THREE.CubeRefractionMapping
// THREE.EquirectangularReflectionMapping
// THREE.EquirectangularRefractionMapping
// THREE.CubeUVReflectionMapping
// THREE.CubeUVRefractionMapping
// */
//
//
// scene.background = SkyboxTexture;
//
// }



function createCamera() {

  camera = new THREE.PerspectiveCamera( 30, container.clientWidth / container.clientHeight, 50, 10000 );
  camera.position.set( 15, 5000, 6500);
  //camera.zoom = 100;

}

function createControls() {

  controls = new THREE.OrbitControls( camera, container );

}


function createLights() {

  const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 5 );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 5 );
  mainLight.position.set( 10, 10, 10 );

  const directionalLight = new THREE.DirectionalLight( 0xffffff );
				directionalLight.position.set( 1, - 0.5, - 1 );
				scene.add( directionalLight );


  scene.add( ambientLight, mainLight, directionalLight );

}

function createMaterials(){

     let diffuseColor = "#9E4300";
     newMaterial = new THREE.MeshBasicMaterial( { color: "#9E4300", skinning: true} );
     Standard = new THREE.MeshStandardMaterial( { color: "#9E4300", skinning: true} );

     // const loadTexture = new THREE.TextureLoader();
     // const RainbowTexture = loadTexture.load("textures/SupernumeraryRainbows_Entwistle_1362.jpg");

     // set the "color space" of the texture
     // RainbowTexture.encoding = THREE.sRGBEncoding;
     //
     //   // reduce blurring at glancing angles
     // RainbowTexture.anisotropy = 16;
     // RainbowTexture.wrapS = RainbowTexture.wrapT = THREE.RepeatWrapping;
     //
     // const imgTexture = new THREE.TextureLoader().load( "textures/water.JPG" );
     // 				imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
     // 				imgTexture.anisotropy = 16;


    videotext = new THREE.VideoTexture( video );
    //Extra Cube for testing Materials Intersection
    // const geometry1 = new THREE.BoxBufferGeometry( 10, 10, 10 );
    // const material1 = new THREE.MeshBasicMaterial( {map: videotext} );
    // const cube1 = new THREE.Mesh( geometry1, material1 );
    // scene.add( cube1 );
    video.loop = true;
    video.play();


   // SkyboxMaterial = new THREE.MeshBasicMaterial( {
   //                map: videotext,
   //                //envMap: scene.background,
   //                refractionRatio: 0.8 } );
   SkyboxMaterial = new THREE.MeshPhongMaterial( {
                  map: videotext,
                  //envMap: scene.background,
                  //refractionRatio: 0.8
                  //bumpMap: imgTexture,
                  //bumpScale: 1,
                  //color: diffuseColor,
                  //metalness: 0.5,
                  //roughness: 0.1,
                  envMap: SkyboxTexture,
                  //displacementMap: imgTexture,
                  //displacementScale: 1,
                  refractionRatio: 0.98,
                  reflectivity: 0.9,
                  //specular: 0x222222,
                  //shininess: 100,
                  skinning: true
                } );

    videotext2 = new THREE.VideoTexture( videoP );
    videoP.loop = true;
    videoP.play();

                newStandard = new THREE.MeshBasicMaterial( {
                                map: videotext2,
                                refractionRatio: 0.8
                                //bumpMap: imgTexture,
                                //bumpScale: 1,
                                //color: diffuseColor,
                                //metalness: 0.5,
                                //roughness: 0.1,
                                // envMap: SkyboxTexture,
                                // //displacementMap: imgTexture,
                                // //displacementScale: 1,
                                // refractionRatio: 0.98,
                                // reflectivity: 0.9,
                                // //specular: 0x222222,
                                // //shininess: 100,
                                // skinning: true
                              } );



                refractorySkybox = new THREE.MeshBasicMaterial( {
                                map: videotext2,
                                refractionRatio: 0.8
                                //bumpMap: imgTexture,
                                //bumpScale: 1,
                                //color: diffuseColor,
                                //metalness: 0.5,
                                //roughness: 0.1,
                                // envMap: SkyboxTexture,
                                // //displacementMap: imgTexture,
                                // //displacementScale: 1,
                                // refractionRatio: 0.98,
                                // reflectivity: 0.9,
                                // //specular: 0x222222,
                                // //shininess: 100,
                                // skinning: true
                              } );

   // newStandard = new THREE.MeshPhongMaterial( {
		// 								//map: RainbowTexture,
		// 								//bumpMap: imgTexture,
		// 								//bumpScale: 1,
		// 								//color: diffuseColor,
		// 								//metalness: 0.5,
		// 								//roughness: 0.1,
		// 								envMap: SkyboxTexture,
   //                  //displacementMap: imgTexture,
   //                  //displacementScale: 1,
   //                  refractionRatio: 0.98,
   //                  reflectivity: 0.9,
   //                  specular: 0x222222,
		// 			          //shininess: 100,
   //                  skinning: true
		// 							} );
   //
   //
   //
   // refractorySkybox = new THREE.MeshPhongMaterial( {
		// 								//map: imgTexture,
		// 								//bumpMap: imgTexture,
		// 								//bumpScale: 1,
		// 								//color: diffuseColor,
		// 								//metalness: 0.5,
		// 								//roughness: 0.1,
		// 								envMap: SkyboxTexture,
   //                  //displacementMap: imgTexture,
   //                  //displacementScale: 1,
   //                  refractionRatio: 0.98,
   //                  reflectivity: 0.9,
   //                  //specular: 0x222222,
		// 			          //shininess: 100,
   //                  skinning: true
		// 							} );





    pointsMaterial = new THREE.PointsMaterial( {
      color: diffuseColor,
      sizeAttenuation: true,
      size: 0.1
    } );



}

function manualSkyBox() {

  var textureLoader = new THREE.TextureLoader();

  var texture0 = textureLoader.load( 'models/pexels-markus-spiske-1089438.jpg' );
  var texture1 = textureLoader.load( 'models/pexels-markus-spiske-1089438.jpg' );
  var texture2 = textureLoader.load( 'models/pexels-markus-spiske-1089438.jpg' );
  var texture3 = textureLoader.load( 'models/pexels-markus-spiske-1089438.jpg' );
  var texture4 = textureLoader.load( 'models/pexels-markus-spiske-1089438.jpg' );
  var texture5 = textureLoader.load( 'models/pexels-markus-spiske-1089438.jpg' );





var materials = [
    new THREE.MeshBasicMaterial( { map: texture0 } ),
    new THREE.MeshBasicMaterial( { map: texture1 } ),
    new THREE.MeshBasicMaterial( { map: texture2 } ),
    new THREE.MeshBasicMaterial( { map: texture3 } ),
    new THREE.MeshBasicMaterial( { map: texture4 } ),
    new THREE.MeshBasicMaterial( { map: texture5 } )
];

scene.background = materials;

  var faceMaterial = new THREE.MeshFaceMaterial( materials );

  faceMaterial.side = THREE.DoubleSide;
  var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
  var ManualSkyBox = new THREE.Mesh( geometry, faceMaterial );
  ManualSkyBox.scale.set(1000, 1000, 1000);
  scene.add( ManualSkyBox );




}


function getWebcam(){

  if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {

					const constraints = { video: { width: 300, height: 600, facingMode: 'user' } };

					navigator.mediaDevices.getUserMedia( constraints ).then( function ( stream ) {

						// apply the stream to the video element used in the texture

						video.srcObject = stream;
						video.play();
            videoP.play();

					} ).catch( function ( error ) {

						console.error( 'Unable to access the camera/webcam.', error );

					} );

				} else {

					console.error( 'MediaDevices interface not available.' );

				}

			}



function loadModels() {

  const loader = new THREE.GLTFLoader();

  // A reusable function to set up the models. We're passing in a position parameter
  // so that they can be individually placed around the scene
  //function onLoad() {}

  const onLoad = ( gltf, position, material, name) => {

  let object = gltf.scene;
    //stand in material for now
    //var material = new THREE.MeshBasicMaterial( { color: "#9E4300", skinning: true} );

    object.traverse((child) => {
                       if (child.isMesh) {
                      child.material = material;
                      child.position.copy( position );
                      child.name = name;

                  }
                 });

                 scene.add(object);


  };

  // the loader will report the loading progress to this function
  const onProgress = () => {};

  // the loader will send any error messages to this function, and we'll log
  // them to to console
  const onError = ( errorMessage ) => { console.log( errorMessage ); };

  // load the first model. Each model is loaded asynchronously,
  // so don't make any assumption about which one will finish loading first
  // const Position2 = new THREE.Vector3( -40,0,0 );
  // loader.load( 'models/amethyst_crystal/scene.gltf', gltf => onLoad( gltf, Position2, newStandard, "MeshName"), onProgress, onError );

  const Position0 = new THREE.Vector3(30,-450, -550 );
  loader.load( 'models/female-person.glb', gltf => onLoad( gltf, Position0, newStandard, "MeshName0"), onProgress, onError );

  const Position2 = new THREE.Vector3(80,-500, -450 );
  loader.load( 'models/female-person.glb', gltf => onLoad( gltf, Position2, newStandard, "MeshName"), onProgress, onError );

  const Position3 = new THREE.Vector3( -20,-400, -350 );
  loader.load( 'models/female-person.glb', gltf => onLoad( gltf, Position3, SkyboxMaterial, "MeshName1"), onProgress, onError );

   const Position4 = new THREE.Vector3( -120,-500, -450 );
   loader.load( 'models/female-person.glb', gltf => onLoad( gltf, Position4, refractorySkybox, "MeshName2"), onProgress, onError );


    const Position5 = new THREE.Vector3( -70,-450, -550 );
    loader.load( 'models/female-person.glb', gltf => onLoad( gltf, Position5, refractorySkybox, "MeshName5"), onProgress, onError );


}

function createRenderer() {

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;



  container.appendChild( renderer.domElement );
  const scene = new THREE.Scene();

  // const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
  // camera.position.set( 15, 5000, 6500);


}

function update() {

  const delta = clock.getDelta();

  // /*for ( const mixer of mixers ) {
  //
  //   mixer.update( delta );
  // }
  // */

}

function gettheObject(){

   object = scene.getObjectByName("MeshName2"); // this is not the most efficient way
  // console.log(object);
   object1 = scene.getObjectByName("MeshName1");
  //console.log("name",object1);
   object2 = scene.getObjectByName("MeshName");
   object0 = scene.getObjectByName("MeshName0");
   object5 = scene.getObjectByName("MeshName5");


}


function render() {

  // update the picking ray with the camera and mouse position
 //  raycaster.setFromCamera( mouse, camera );



 camera.position.set+=10;

 object = scene.getObjectByName("MeshName2");
 object1 = scene.getObjectByName("MeshName1");
 object2 = scene.getObjectByName("MeshName");
 object0 = scene.getObjectByName("MeshName0");
 object5 = scene.getObjectByName("MeshName5");


 //console.log(object2);
 //object1.rotation.y += 0.01; //break
//console.log(object2);

if(object) { //to get past our "undefined error"
  if (object.isMesh){
     object.rotation.y += guiControls.rotationX;
    // object.rotation.x += guiControls.rotationY;

 }
}
 if(object0) { //to get past our "undefined error"
   if (object0.isMesh){
      object0.rotation.y += guiControls.rotationX;
     // object.rotation.x += guiControls.rotationY;

  }

}
 if(object2) { //to get past our "undefined error"
   if (object2.isMesh){
      object2.rotation.y -= guiControls.rotationX;
     // object.rotation.x += guiControls.rotationY;

  }
}

if(object5) { //to get past our "undefined error"
  if (object5.isMesh){
     object5.rotation.y -= guiControls.rotationX;
    // object.rotation.x += guiControls.rotationY;

 }
}
if(object1) { //to get past our "undefined error"
  if (object1.isMesh){
    //object1.rotation.y += guiControls.rotationX;
    //object1.rotation.x += guiControls.rotationY;
    object1.rotation.x = 75;
 }
}


  console.log(guiControls.rotationX);

  controls.update();
  requestAnimationFrame(render);


  renderer.render( scene, camera );

}

function onMouseMove( event ) {  
  // calculate mouse position in normalized device coordinates 
  // (-1 to +1) for both components  
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1; 
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  } 


function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  renderer.setSize( container.clientWidth, container.clientHeight );

}
document.addEventListener("DOMContentLoaded",() => {
  the_button.addEventListener("click", handleClick)
})

window.addEventListener( 'resize', onWindowResize );
window.addEventListener('mousemove', onMouseMove, false);

window.requestAnimationFrame(render);

function handleClick(event) {
  modal.style.display = "block";
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none"
  })
}

init();
