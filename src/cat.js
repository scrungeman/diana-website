function init() { 
  const catWrapper = document.querySelector('.cat_wrapper')
  const wrapper = document.querySelector('.wrapper')
  const cat = document.querySelector('.cat')
  const head = document.querySelector('.cat_head')
  const legs = document.querySelectorAll('.leg')
  const pos = {
    x: null,
    y: null
  }

  const walk = () =>{
    cat.classList.remove('first_pose')
    legs.forEach(leg=>leg.classList.add('walk'))
  }

  const handleMouseMotion = e =>{
    pos.x = e.clientX
    pos.y = e.clientY
    walk()
  }

  const handleTouchMotion = e =>{
    if (!e.targetTouches) return
    pos.x = e.targetTouches[0].offsetX
    pos.y = e.targetTouches[0].offsetY
    walk()
  }

  const turnRight = () =>{
    cat.style.left = `${pos.x - 90}px`
    cat.classList.remove('face_left')
    cat.classList.add('face_right')
  }

  const turnLeft = () =>{
    cat.style.left = `${pos.x + 10}px`
    cat.classList.remove('face_right')
    cat.classList.add('face_left')
  }

  const decideTurnDirection = () =>{
    cat.getBoundingClientRect().x < pos.x ?
      turnRight()
      :
      turnLeft()
  }

  const headMotion = () =>{
    pos.y > (wrapper.clientHeight - 100) ?
      head.style.top = '-15px'
      :
      head.style.top = '-30px'
  }

  const jump = () =>{
    catWrapper.classList.remove('jump')
    if (pos.y < (wrapper.clientHeight - 250)) {
      setTimeout(()=>{
        catWrapper.classList.add('jump')
      },100)
    } 
  }

  const decideStop = ()=>{
    if (cat.classList.contains('face_right') && pos.x - 90 === cat.offsetLeft ||
        cat.classList.contains('face_left') && pos.x + 10 === cat.offsetLeft) {
      legs.forEach(leg=>leg.classList.remove('walk'))    
    }
  }
  
  setInterval(()=>{
    if (!pos.x || !pos.y) return
    decideTurnDirection()
    headMotion()
    decideStop()
  },100)

  setInterval(()=>{
    if (!pos.x || !pos.y) return
    jump()
  },1000)

  document.addEventListener('mousemove', handleMouseMotion)
  document.addEventListener('mousemove', handleTouchMotion)
}

window.addEventListener('DOMContentLoaded', init)

var GRAVITY = {x:0,y:12};  
var FRICTION = {x:0.94,y:0.91};
var NUM_JOINTS = 12;    
var DISTANCE = 1.2;
var WEIGHT = 6;    
var target = {x:220,y:0}
//Arrays
var px = new Array();     
var py = new Array();      
var oldx = new Array();    
var oldy = new Array();    
var ax = new Array();      
var ay = new Array();  	


// rendering
var paper;
var path;
var rect;
var card;

window.onmousemove = function(event)
{
  target.x = event.clientX;  
  target.y = event.clientY;  
}
  
 window.ontouchmove = function(event)
 {
   target.x =  event.touches[0].pageX; 
   target.y =  event.touches[0].pageY; 
      event.preventDefault();

 }

window.onload = function()
 {
   createRope();
   
// Creates canvas 320 × 200 at 10, 50
paper = Raphael(0, 0, 1000, 800);


  var pathStr =  "M10 10";

   path = paper.path(pathStr);
   path.attr({stroke: "#000000", "stroke-width": 3, "stroke-linecap": "round"}),
   setInterval(render,1000/60)
    
    rect = paper.rect(5, 5, 40, 40, 3);
     rect.attr({fill:"#ffd614"});
    card = $("#card");
   
 }
  
 function collideRope()
{
			for (var i = 0; i < NUM_JOINTS; i++) 
			{
				if(py[i] > 250)					//set border limit
					py[i] = 250;
			}
}
  
function render()
{
   
  
  
  	updateRope();		//handels with both the gravity and weight force
	//	collideRope();	//handels collisions with the ground
			
			//attach first point to the mouse x and y position
		px[0] = target.x;
		py[0] = target.y;
  
  
   var pathStr =  "M" + target.x + " " + target.y;
   for(var j = 0; j <=NUM_JOINTS; j++)  
   {
     
      pathStr += "L" + px[j];
       pathStr += " " + py[j];
   }
  
  path.attr("path",pathStr);
  
}
  
  
  



  function updateRope()
		{
			
      // FORCE
			for (var i = 1; i <= NUM_JOINTS; i++) {
				py[i] += (GRAVITY.y * 1/36);
				px[i] += (GRAVITY.x * 1/36);
			}
      
      // FRICTION		
			for (var i = 0; i <= NUM_JOINTS; i++) {
				
				var previousx = px[i];			
				var previousy = py[i];		
				
				px[i] += (px[i] - oldx[i]) * FRICTION.x; 
				py[i] += (py[i] - oldy[i]) * FRICTION.y;	
				
				oldx[i] = previousx;	
				oldy[i] = previousy;
			}
			
			py[NUM_JOINTS] += (WEIGHT * 1/36);		
      
      
      
      // TENSION
      var jointDistance = DISTANCE / NUM_JOINTS;
			
			for (var i = 1; i <= NUM_JOINTS; i++) {
				var dx = (px[i] - px[i - 1]) / 100;	
				var dy = (py[i] - py[i - 1]) / 100;
				var d = Math.sqrt((dx * dx) + (dy * dy));
				var force = d - jointDistance;		
				
				ax[i] = (dx / d) * 0.5 * 100 * force;			
				ay[i] = (dy / d) * 0.5 * 100 * force;
				px[i] -= ax[i];								
				py[i] -= ay[i];
				px[i - 1] += ax[i];								
				py[i - 1] += ay[i];
			}
      
      var dx = px[NUM_JOINTS] - px[NUM_JOINTS-1];		
      var dy = py[NUM_JOINTS] - py[NUM_JOINTS-1];
      
      rect.attr({x:px[NUM_JOINTS] - 25,y:py[NUM_JOINTS],transform:"r" +-(Math.atan2(dx,dy)*(180/Math.PI))  }) 				//position equals last join
	    
        card.css({left:px[NUM_JOINTS] - 100,top:py[NUM_JOINTS]})


      
	}


function createRope()
{
			for (var i = 0; i <= NUM_JOINTS; i++) 
			{
				px[i] = 0;
				py[i] = 0;
				oldx[i] = 0;
				oldy[i] = 0;
				ax[i] = 0;
				ay[i] = 0;
			}
			
}
		  
  