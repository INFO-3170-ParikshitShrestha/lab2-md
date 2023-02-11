import Matter, { Sleeping } from 'matter-js';
import Boundary from './components/Boundary';

const Physics = (entities, { touches, dispatch, events, time }) => {
  const generateRandomColor = () => {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      const random = Math.random();
      const bit = (random * 16) | 0;
      color += bit.toString(16);
    }
    return color;
  };

  let engine = entities.physics.engine;

  /*************TOUCH CONTROLS WITH ARROW KEY ****************/
  if (events.length) {
   
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === 'move-up') {
        Matter.Body.setVelocity(entities.RedSquare.body, { x: 0, y: -3 });
      }
      if (events[i].type === 'move-down') {
        Matter.Body.setVelocity(entities.RedSquare.body, { x: 0, y: 3 });
      }
      if (events[i].type === 'move-left') {
        Matter.Body.setVelocity(entities.RedSquare.body, { x: -3, y: 0 });
      }
      if (events[i].type === 'move-right') {
        Matter.Body.setVelocity(entities.RedSquare.body, { x: 3, y: 0 });
      }
    }
  }

  /*************TOUCH CONTROLS DRAGGING IN THE SCREEN ****************/
  let x = entities.Square.body.position.x;
  let y = entities.Square.body.position.y;
  touches
    .filter((t) => t.type === 'move')
    .forEach((t) => {
      x += t.delta.pageX;
      y += t.delta.pageY;
      Matter.Body.setPosition(entities.Square.body, {
        x: x,
        y: y,
      });
    });

  Matter.Events.on(engine, 'collisionStart', (event) => {
    var pairs = event.pairs;
    var objALabel = pairs[0].bodyA.label;
    var objBLabel = pairs[0].bodyB.label;

    //Color Change after Colision between Player and Boundary
    if (
      (objALabel === 'Boundary' && objBLabel === 'Player') ||
      (objALabel === 'Player' && objBLabel === 'Boundary')
    ) {
      let randomColor = generateRandomColor();
      entities.RedSquare.color = randomColor;
    }
    //Stop Player after hit Boundary
    Sleeping.set(entities.RedSquare.body, true);

    //Enemy Randomly Relocate
    if (
      (objALabel === 'Enemy' && objBLabel === 'Player') ||
      (objALabel === 'Player' && objBLabel === 'Enemy')
    ) {
      Matter.Body.setPosition(entities.Square.body, {
        x: Math.floor(Math.random() * (300 - 0 + 1)) + 40,
        y: Math.floor(Math.random() * (300 - 0 + 1)) + 40,
      });
      Sleeping.set(entities.RedSquare.body, true);
    }
    //Continue Playing after Player stopped
    Sleeping.set(entities.RedSquare.body, false);
  });
  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;

