"use strict";

var dino = document.querySelector('.dino');
var background = document.querySelector('.background'); //---- Variables ----//

var isJumping = false;
var position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32 || event.keyCode === 38) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;
  var upInterval = setInterval(function () {
    if (position >= 150) {
      clearInterval(upInterval); //---- Descendo ----//

      var downInterval = setInterval(function () {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      //---- Subindo ----//
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  var cactus = document.createElement('div');
  var cactusPosition = 1000;
  var randomTime = Math.random() * 6000;
  console.log(randomTime);
  cactus.classList.add('cactus');
  cactus.style.left = 1000 + 'px';
  background.appendChild(cactus);
  var leftInterval = setInterval(function () {
    cactusPosition -= 7;
    cactus.style.left = cactusPosition + 'px';

    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      //---- Game Over ----//
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
      if (event.keyCode === 32) Start();
    } else {
      cactusPosition -= 7;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);
  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);