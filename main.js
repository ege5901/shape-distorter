var dots = []

var step = 30
var distance1 = 20
var button
var clearButton


function setup() {    
  createCanvas(600, 600);
  generate = createButton('create');
  generate.mousePressed(()=>{
    createNewShapeAndDraw()
  })

  clearButton = createButton("clean")
  clearButton.mousePressed(()=>{
    background(220)
    dots=[]
  })
  
  stepCountSlider = createSlider(0, 100, 30);
  stepCountSlider.position(150,650)

  distanceSlider = createSlider(0, 200, 20);
  distanceSlider.position(150,700)

}

function draw() {
  background(220);


  for (let i = 0; i < dots.length-1; i++) {
    const dot = dots[i];
    const dotn = dots[i+1];
    stroke("black")
    strokeWeight(3)
    line(dot.x,dot.y,dotn.x,dotn.y)
  }

  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];

    strokeWeight(4)
    point(dot.x,dot.y)
  }
  noLoop()
}

function mousePressed() {
  if (
    mouseX > 0 &&
    mouseX < width &&
    mouseY > 0 &&
    mouseY < height
  ){
    dots.push(createVector(mouseX,mouseY))
    draw()
  }
}

function createNewShapeAndDraw() {
  background(220);

  step = 200 / ((stepCountSlider.value()/10)**2)
  distance1 = distanceSlider.value()
  var d = []

  for(var i=0;i<dots.length;i++){
    var n = (i+1)%dots.length
    d.push(dots[i])

    var sub = createVector(dots[n].x-dots[i].x,dots[n].y-dots[i].y)
    normal = p5.Vector.fromAngle(sub.heading()+PI/2).setMag(1)
    if(abs(normal.x) < 0.0001) normal.x = 0
    if(abs(normal.y) < 0.0001) normal.y = 0
	
    var subc = sub.copy()
    var normalc = normal.copy()

    for(var j=1;j*step<subc.mag();j++){
          
      sub.setMag(step*j)
      sub.add(dots[i])
        
      normal = normal.mult(random(-distance1,distance1))
      sub.add(normal)

      d.push(sub)

      normal = normalc.copy()
      sub= subc.copy()
    }
  }

  stroke("black")
  strokeWeight(3)
  for(var i=0;i<d.length;i++){
	var n = (i+1)%d.length
	
  	line(d[i].x,d[i].y,d[n].x,d[n].y)
  }
}
