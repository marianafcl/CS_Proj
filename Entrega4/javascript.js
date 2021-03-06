var scene, camera, light, directionalLight, renderer, clock, game, boxArray = [];
var lives = 5;
var frustumSize = 60;
var update = true;

function init() {
	clock = new THREE.Clock;

	objects();
	scene();
	camera();
	directionalLight();
	pointLight();
	renderer();

	window.addEventListener('resize', onResize, false);
	window.addEventListener("keydown", onKeyDown);
	window.addEventListener("keyup", onKeyUp);
}

function scene() {
	scene = new THREE.Scene();
    scene.add(game);
}

function camera() {
	var aspect = window.innerWidth / window.innerHeight;
	camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -100, 1000 );
	camera.position.x = 0;//vermelho
	camera.position.y = 20;//verde
	camera.position.z = 0;//azul
	camera.lookAt(scene.position);
}

function directionalLight(){
	directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 2 );
	directionalLight.position.set(0, 15, 0);
	scene.add( directionalLight );			
}

function pointLight(){
	var light = new THREE.PointLight(0xffcc00, 1, 20, 1);
	light.position.set(10, 0, 10);
	scene.add( light );
	light = new THREE.PointLight(0xffcc00, 1, 20, 1);
	light.position.set(-20, 0, -20);
	scene.add( light );
	light = new THREE.PointLight(0xffcc00, 1, 20, 1);
	light.position.set(20, 0, 20);
	scene.add( light );
	light = new THREE.PointLight(0xffcc00, 1, 20, 1);
	light.position.set(-20, 0, 20);
	scene.add( light );
	light = new THREE.PointLight(0xffcc00, 1, 20, 1);
	light.position.set(20, 0, -20);
	scene.add( light );
	light = new THREE.PointLight(0xffcc00, 1, 20, 1);
	light.position.set(0, 0, -20);
	scene.add( light );
}

function renderer() {
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0xEEEEEE);
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild(renderer.domElement);
}
			
function render() {
	renderer.render(scene, camera);
}

function objects() {
	var road = new Road();
	makeRoad(road);
	var floor = new Floor(60, 60, 60, road);
	boxArray.push(floor);
	var car = new Car(0, 0, -12);
	boxArray.push(car);
	game = new GameZone(floor, car);
	//--------------------------Entrega4---------------------------------------
	var geometry = new THREE.PlaneGeometry(25,20);
	var texture = new THREE.TextureLoader().load("pausa.gif");
    var material = new THREE.MeshBasicMaterial({map:texture,wireframe:true, depthTest: false});
   	message = new THREE.Mesh(geometry, material);
    message.visible = false;
    //--------------------------------------------------------------------------
	var i = 0;
	var o;
	while(i < 3) {
		o = new Orange();
		game.addOrange(o);
		boxArray.push(o);
		i += 1;
	}
	var b = new Butter(-2, 1, 5);
	game.addButter(b);
	boxArray.push(b);
	b = new Butter(10, 1, 10);
	game.addButter(b);
	boxArray.push(b);
	b = new Butter(-5, 1, 15);
	game.addButter(b);
	boxArray.push(b);
	b = new Butter(-15, 1, -20);
	game.addButter(b);
	boxArray.push(b);
	b = new Butter(25, 1, -6);
	game.addButter(b);
    boxArray.push(b);
    //--------------------------Entrega4---------------------------------------
    game.add(message);
}

function makeRoad(road) {
	road.addCurve(14.5, 0.05, -15, 24, 0);
	road.addCurve(10.5, 0.05, -9, 10, 1);
	road.addLine(13, 0.05, -15, 13, 0);
	road.addLine(7, 0.05, -9, 10, 1);
	road.addLine(7, 0.05, 9, 10, 2);
	road.addLine(13, 0.05, 15, 13, 3);
	road.addCurve(-14.5, 0.05, 15, 24, 2);
	road.addCurve(-14.5, 0.05, 9, 10, 3);
}

function onResize(event) {
	var aspect = window.innerWidth / window.innerHeight;

	camera.left   = - frustumSize * aspect / 2;
	camera.right  =   frustumSize * aspect / 2;
	camera.top    =   frustumSize / 2;
	camera.bottom = - frustumSize / 2;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onKeyDown(e) {
	switch(e.keyCode){
		//----------------------------------Entrega4-----------------------------------------
		case 72://H
		case 68://h
				game.car.spotlightEsquerda.visible = !game.car.spotlightEsquerda.visible;
				game.car.spotlightDireita.visible = !game.car.spotlightDireita.visible;
			break;
		case 83://S
		case 115://s
			if(clock.running){
				
				if(camera.position.x == 4){
					message.scale.set(0.2,0.2,0.2);
					message.position.set(game.car.position.x -1, game.car.position.y-0.1, game.car.position.z);
					message.lookAt(game.car.position);
					message.visible = !message.visible;
				}
				else{
					message.scale.set(2,2,2);
					message.position.set(0,0,0);
					message.lookAt(camera.position);
                	message.visible = !message.visible;
            		}
                clock.stop();
			}
			else{
				message.visible = !message.visible;
                clock.start();
			}
			break;
		//-----------------------------------------------------------------------------------
		case 78://N
		case 110://n
			if(directionalLight.intensity == 2){
				directionalLight.intensity = 0.001;
			}
			else{
				directionalLight.intensity = 2;
			}
			break;
		case 71://G
		case 103://g
			if(game.lamb == false)
				game.lamb = true;
			else
				game.lamb = false;
			break;
		case 67://C
		case 99://c
			var i = 0;
			while(i < scene.children.length){
				if(scene.children[i] instanceof THREE.PointLight){
					scene.children[i].visible = !scene.children[i].visible;
				}
				i++;
			}
			break;
		case 76://L
		case 108://l
			if(game.l == false)
				game.l = true;
			else
				game.l = false;
			break;
		case 49://camera 1 - Orthographic
			var aspect = window.innerWidth / window.innerHeight;
			camera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -100, 1000 );
			camera.position.set(0, 20, 0);
			camera.lookAt(scene.position);
			break;
		case 50://camera 2 - Perspective
			camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 1, 1000 );
			camera.position.set(30, 20, 20);
			camera.lookAt(scene.position);
			break;
		case 51://camera 3 - Perspective chase
			camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, 1, 1000 );
			camera.position.set(4, 2, 0);
			camera.up.set( 0, 1, 0);
			game.car.add(camera);
			camera.lookAt( new THREE.Vector3( -2, 0, 0 ) );
			break;
		case 65://A
		case 97://a
			scene.traverse(	function(node){
								if(node instanceof THREE.Mesh){
									node.material.wireframe = !node.material.wireframe;
								}
							});
			game.wireframes = !game.wireframes;
			break;
		case 37://left
			game.car.userData.left = true;
			break;
		case 38://up
			game.car.userData.forward = true;
			game.car.userData.acceleration = -game.car.a;
			break;
		case 39://right
			game.car.userData.right = true;
			break;
		case 40://down
			game.car.userData.back = true;
			game.car.userData.aceleration = game.car.a;
			if(game.car.forwardfriction == true) { //se o carro estiver a andar para a frente, mas não tiver nenhuma tecla premida, atualiza a aceleraçao
				 game.car.userData.aceleration = game.car.handbreak;
			}
			break;
	}
}

function onKeyUp(e) {
	switch(e.keyCode){
		case 37:
		game.car.userData.left = false;
		break;
	case 38://up
		game.car.userData.forward = false;
		if (game.car.userData.velocity < 0) {
			game.car.forwardfriction = true;
			game.car.reversefriction = false;
			game.car.userData.aceleration = game.car.breaks;
		}
		else{
			game.car.reversefriction = true;
			game.car.forwardfriction = false;
			game.car.userData.aceleration = -game.car.breaks;
		}
		break;
	case 39:
		game.car.userData.right = false;
		break;
	case 40://down
		game.car.userData.back = false;
		if (game.car.userData.velocity > 0) { //esta linha de codigo é necessária porque o carro pode ainda estar a andar para a frente, 
			//e se não tivesse este if ele continuava andar para a frente em vez de travar
			game.car.userData.aceleration = -game.car.breaks;
			game.car.reversefriction = true;
			game.car.forwardfriction = false;
		}
		else if(game.car.userData.velocity < 0){
			game.car.userData.aceleration = game.car.breaks;
			game.car.forwardfriction = true; //o carro já não está a andar para a frente, logo desativa-se esta flag
			game.car.reversefriction = false;
		}
		break;
	}
}

function animate() {
	game.update(clock.getDelta());
	var i, j;
	for(i = 0; i < boxArray.length; i++) {
		j = i + 1;
		for(; j < boxArray.length; j++) {
			if(boxArray[i].cTest(boxArray[j])) {
				if(boxArray[i] instanceof Car && boxArray[j] instanceof Orange) {
					
                    boxArray[i].carandorange();
                    lives -= 1;
                    if (lives == 0) {
                        window.location.href = "gameover.html";
                    }
				}
				else if(boxArray[j] instanceof Car && boxArray[i] instanceof Orange) {
					
                    boxArray[j].carandorange();
                    lives -= 1;
                    if (lives == 0) {
                        window.location.href = "gameover.html";
                    }
				}

				else if(boxArray[i] instanceof Car && boxArray[j] instanceof Butter) {
					
					boxArray[i].carandbutter();
				}
				else if(boxArray[j] instanceof Car && boxArray[i] instanceof Butter) {
					
					boxArray[j].carandbutter();
				}

				else if(boxArray[i] instanceof Car && boxArray[j] instanceof Cheerio) {
					
					boxArray[j].cheeriocol(boxArray[i]);
				}
				else if(boxArray[j] instanceof Car && boxArray[i] instanceof Cheerio) {
					
					boxArray[i].cheeriocol(boxArray[j]);
				}

				else if(boxArray[i] instanceof Cheerio && boxArray[j] instanceof Cheerio) {
					
					if(Math.abs(boxArray[i].userData.velocity) > Math.abs(boxArray[j].userData.velocity)) {
						boxArray[j].cheeriocol(boxArray[i]);
					}
					else {
						boxArray[i].cheeriocol(boxArray[j]);
					}
				}

				else if(boxArray[i] instanceof Butter && boxArray[j] instanceof Orange) {
					
				}
				else if(boxArray[j] instanceof Butter && boxArray[i] instanceof Orange) {
					
				}

				else if(boxArray[i] instanceof Cheerio && boxArray[j] instanceof Orange) {
					
				}
				else if(boxArray[j] instanceof Cheerio && boxArray[i] instanceof Orange) {
					
				}
			}
			else if(boxArray[i] instanceof Floor || boxArray[j] instanceof Floor) {
				if(boxArray[i] instanceof Floor && boxArray[j] instanceof Orange) {
					
					orangeoutofbounds(boxArray[j]);
				}
				else if(boxArray[j] instanceof Floor && boxArray[i] instanceof Orange) {
					
					orangeoutofbounds(boxArray[i]);
				}

				else if(boxArray[i] instanceof Floor && boxArray[j] instanceof Car) {
                    game.car.outofbounds();
                    lives -= 1;
                    if (lives == 0) {
                        window.location.href = "gameover.html";
                    }
				}
				else if(boxArray[j] instanceof Floor && boxArray[i] instanceof Car) {
                    game.car.outofbounds();
                    lives -= 1;
                    if (lives == 0) {
                        window.location.href = "gameover.html";
                    }
				}
			}
		}
	}
	render();
	requestAnimationFrame(animate);
}

function orangeoutofbounds(orange) {
	game.remove(orange);
	var x = Math.floor(Math.random() * (60)) - 30;
	var y = Math.floor(Math.random() * (60)) - 30;
	orange.position.set(x, 1.5, y);
	orange.setValues(x, y);
	orange.vel = (Math.random() * (3 - 0.1)) + 0.1;
	window.setTimeout(	function() {
							game.add(orange);
							orange.orange.material.wireframe = game.floor.floor.material.wireframe;
						}, 5000 * Math.random());
}