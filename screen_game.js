const Imgs = {
    tree_1: "./art/arvore_1.png",
    tree_2: "./art/arvore_2.png",
    tree_3: "./art/arvore_3.png",
    tree_4: "./art/arvore_4.png",
    mountain: "./art/mountain.png",
    arquibancada: "./art/arquibancada.png",
    morro: "./art/morro.png",
    grass: "./art/grass.png",
    plant: "./art/plant.png",
    plant_1: "./art/planta_1.png",
    plant_2: "./art/planta_2.png",
    cloud: "./art/cloud.png",
    cercado_1: "./art/cercado_1.png",
    cercado_2: "./art/cercado_2.png",
    line: "./art/linha.png",
    finishline: "./art/chegada.png",
    cage: "./art/cage.png",
    gate: "./art/gate.png",
    // horse: "./art/horse.png",
    background: "./art/background.png",
    horse: "./imgs/cavalo_60_mini_2.png",
    
    horse_blue: "./imgs/horse_blue.png",
    horse_black: "./imgs/horse_black.png",
    horse_yellow: "./imgs/horse_yellow.png",
    horse_red: "./imgs/horse_red.png",
    horse_pink: "./imgs/horse_pink.png",
    horse_green: "./imgs/horse_green.png",
    horse_blue_white: "./imgs/horse_blue_white.png",
    horse_blue_gray: "./imgs/horse_blue_gray.png",
    horse_blue: "./imgs/horse_blue.png",
}

const audios = {
    shoot(){
        const aud = new Audio('./som/shoot.mp3')
        aud.play()
    }
}

const audio_horse = [
    new Audio('./som/c1.mp3'),
    new Audio('./som/c2.mp3'),
    new Audio('./som/c3.mp3'),
    new Audio('./som/c4.mp3'),
    new Audio('./som/c5.mp3'),
    new Audio('./som/c6.mp3'),
    new Audio('./som/c7.mp3'),
    new Audio('./som/c8.mp3'),
    new Audio('./som/c9.mp3'),
    new Audio('./som/c10.mp3')
]

class Horse{
    // width = 682
    // height = 384
    width = 682/3
    height = 384/3
    limitFrame = 120
    isRunning = true
    speed = 6
    frame = 0
    
    constructor(img_url){
        const div = document.createElement('div')
        // div.style.backgroundImage = `url(${Imgs.horse})`
        div.style.backgroundImage = `url(${img_url})`
        div.style.width = this.width+'px'
        div.style.height = this.height+'px'
        div.style.backgroundSize = (this.width*10)+'px';
        div.style.filter = 
        `drop-shadow( 1px  0px 0px black) 
        drop-shadow(-1px  0px 0px black)
        drop-shadow( 0px  1px 0px black) 
        drop-shadow( 0px -1px 0px black)`
        
        // div.style.top = '0px'
        // div.style.left = '0px'
        this.div = div
        this.valor = 0
        this.x = 0
        this.y = 0
        this.pos = 0
        screen_game.appendChild(this.div)
        this.velocity = 0


        // horses[0].div.style.left

        this.animation()
    }
    
    setY(y){
        this.y = y
    }

    setPosition(x, y){
        this.x = x
        this.y = y
        this.div.style.left = this.x+'%'
        this.div.style.bottom = this.y+'%'
    }

    setPositionPx(x, y){
        this.x = x
        this.y = y
        this.div.style.left = this.x+'px'
        this.div.style.bottom = this.y+'px'
    }

    setFrame(n){
        n = n%this.limitFrame
        this.frame = n
        this.sound(n)
        const x = n%10 * this.width
        const y = ((n/10)|0) * this.height
        this.div.style.backgroundPosition = `${-x}px ${-y}px`
    }

    setZ(n){
        this.div.style.zIndex = n
    }

    nextFrame(){
        this.setFrame(++this.frame)
    }
    bottom(n){
        this.div.style.bottom = n+"%"
    }
    bottompx(n){
        this.div.style.bottom = n+"px"
    }
    left(n){
        this.x = n
        this.div.style.left = n+"%"
    }
    leftpx(n){
        this.left = n
        this.div.style.left = n+"px"
    }
    right(n){
        this.div.style.right = n+"%"
    }
    rightpx(n){
        this.div.style.right = n+"px"
    }

    placing(pos){
        // this.x = pos
        // let a = this.x
        // let x = pos
        // const go = () =>{
        //     this.translate(a)
        //     if(a<x){
        //         a+=0.5
        //         setTimeout(()=>{
        //             window.requestAnimationFrame(go);
        //         }, 0)
        //     }
        //     if(a>x){
        //         a-=0.5
        //         setTimeout(()=>{
        //             window.requestAnimationFrame(go);
        //         }, 0)
        //     }

        // }
        // window.requestAnimationFrame(go);
    }

    animation(){
        const step = () =>{

            if(this.isRunning){
                for(let i=0;i<this.speed;i++){
                    this.nextFrame()
                }
            }

            // if(this.x > 10){
            //     this.velocity -= 2
            // }

            // if(this.x > -10){
            //     this.x -= 0.1
            // }
            
            //abaixo ok
            // if(this.velocity > 0){
            //     this.velocity -= 0.1
            //     this.x += 1 *  this.velocity/200
            //     this.left(this.x)
            // }

            // ok - kick
            // if(this.velocity <= 0 && this.x < 70){
            //     this.velocity = Math.random() * 70
            // }
            

            // if(this.x > 70){
            //     this.velocity -= 0.7
            //     this.left(this.x)
            // }


            if(this.velocity > 0) this.velocity -= 0.1
            if(this.velocity < 0) this.velocity += 0.1
            // if(this.velocity == 0) this.velocity += 50
            
            this.x += 1 *  this.velocity/300
            
            this.left(this.x)

            if(this.velocity.toFixed(0) == 0 && this.velocity > 0){
                this.velocity = Math.random() * 50
            }

            // ok limite - direita
            if(this.x > 50){
                const r = (Math.random()*5)|0
                this.velocity -= r
                // this.x *= this.velocity
                this.end = true
            }

            // limite esquerda
            if(this.x < 5 && this.end){
                const r = (Math.random()*5)|0
                this.velocity += r
            }
            


            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    }

    sound(n){
        
        if(n == 117 ){ let r = (Math.random()*10)|0 ; audio_horse[r].play();}
        if(n == 108 ){ let r = (Math.random()*10)|0 ; audio_horse[r].play();}
        if(n == 36  ){ let r = (Math.random()*10)|0 ; audio_horse[r].play(); }
        if(n == 58  ){ let r = (Math.random()*10)|0 ; audio_horse[r].play(); }
    }

    translateXpx(x){
        this.x = x
        this.div.style.translate = this.x+"px "+this.y+"px"
    }
    translateYpx(y){
        this.y = y
        this.div.style.translate = this.x+"px "+this.y+"px"
    }
    translate(x){
        this.x = x
        this.div.style.translate = x+"% "+this.y+"%"
    }
}

class Obj{
    constructor(img_url){
        const img = new Image()
        this.img = img
        img.src = img_url
        this.x = 0
        this.y = 0
        // img.style.left = '0px'
        // img.style.left = '0px'
        img.onload=function(){
            // document.body.clientWidth
            this.setAttribute('h', this.height)
            this.setAttribute('w', this.width)
            // this.style.width = this.width
            // this.style.height = this.height
        }
        screen_game.appendChild(img)
    }
    setX(val){
        this.img.style.left = val+'px'
    }
    setY(val){
        this.img.style.top = val+'px'
    }
    setH(val){
        this.img.style.height = val+"%"
    }
    setWpx(val){
        this.img.style.width = val+"px"
    }
    setHpx(val){
        this.img.style.height = val+"px"
    }
    setPosition(x, y){
        this.setX(x)
        this.setY(y)
    }
    setZ(n){
        this.div.style.zIndex = n
    }
    opacity(n){
        this.img.style.opacity = n
    }

    off(){
        this.img.style.transition = "0.1s"
        this.translateYpx(-100)
        // this.img.style.opacity = 0
        // this.img.style.translate = "0px -100px"
        // this.img.translateYpx(50)

        // this.img.style.rotate = "90deg"
        // this.img.style.transformOrigin = "left top"
        // setTimeout(e=>{ this.img.style.transition = "0s" }, 500)
    }
    on(){
        this.img.style.transition = "0.1s"
        this.translateYpx(0)
        // this.img.style.opacity = 1
        // this.img.style.translate = "0px 0px"
        // setTimeout(e=>{ this.img.style.transition = "0s" }, 500)
    }

    bottom(n){
        this.img.style.bottom = n+"%"
    }
    bottompx(n){
        this.img.style.bottom = n+"px   "
    }
    left(n){
        this.img.style.left = n+"%"
    }
 
    leftpx(n){
        this.img.style.left = n+"px"
    }
    right(n){
        this.img.style.right = n+"%"
    }
    top(n){
        this.img.style.top = n+"%"
    }
    translateXpx(x){
        this.x = x
        this.img.style.translate = x+"px"
    }
    translateX(x){
        this.x = x
        this.img.style.translate = x+"%"
    }
    translateXpx(x){
        this.x = x
        this.img.style.translate = this.x+"px "+this.y+"px"
    }
    translateYpx(y){
        this.y = y
        this.img.style.translate = this.x+"px "+this.y+"px"
    }
}

let frame = 0
let isPaused = true

//functions
function camera_image(cam, arr_img, quant=2){
    //cam = 0
    if(cam>quant) cam %= quant;
    // if(cam>3) cam %= 3;

    arr_img.map((e, i)=>{
        v = e.img.width * i + e.img.width * cam*-1
        e.leftpx(v)
    })
}

const cloud = new Obj(Imgs.cloud)
cloud.setH(20)
cloud.left(50)
cloud.top(-5)

const mountains = []
for(let i=0;i<4;i++){
    mountains.push(new Obj(Imgs.mountain))
    mountains[i].setHpx(400)
    mountains[i].leftpx(i*1208)
}

const grasses = []
for(let i=0;i<6;i++){
    grasses.push(new Obj(Imgs.grass))
    // grasses[i].bottompx(0)
    // grasses[i].leftpx(200)
    grasses[i].left(0)
    grasses[i].bottom(0)
    grasses[i].leftpx(i*400)
    // grasses[i].setHpx(400)
    grasses[i].setWpx(400)
}

const trees = []
for(let i=0;i<10;i++){
    if(i%4==0) trees.push(new Obj(Imgs.tree_1));
    if(i%4==1) trees.push(new Obj(Imgs.tree_2));
    if(i%4==2) trees.push(new Obj(Imgs.tree_3));
    if(i%4==3) trees.push(new Obj(Imgs.tree_4));
    
    trees[i].left(100+i*400)
    trees[i].bottom(62)
    trees[i].setHpx(200)
    trees[i].opacity(11)
}


const hills = []
for(let i=0;i<20;i++){
    hills.push(new Obj(Imgs.morro))
    hills[i].leftpx(i*840)
    hills[i].bottom(54)
    hills[i].setHpx(105)
}


const grandStands = []
for(let i=0;i<8;i++){
    grandStands.push(new Obj(Imgs.arquibancada))
    grandStands[i].setHpx(150)
    grandStands[i].leftpx(i*650)
    grandStands[i].bottom(54)
}

const plantsTop = []
for(let i=0;i<7;i++){
    plantsTop.push(new Obj(Imgs.plant))
    plantsTop[i].bottom(48.5)
    plantsTop[i].leftpx(i*360)
    plantsTop[i].setHpx(60)
}

const fencesTop = []
for(let i=0;i<12;i++){
    fencesTop.push(new Obj(Imgs.cercado_1))
    fencesTop[i].bottom(48)
    fencesTop[i].leftpx(i*110)
    fencesTop[i].setHpx(45)
}

// const cercado_1 = new Obj(Imgs.cercado_1)

const linesTop = []
for(let i=0;i<10;i++){
    linesTop.push(new Obj(Imgs.line))
    linesTop[i].bottom(44)
    linesTop[i].leftpx(i*110)
    linesTop[i].setHpx(10)
}

const linesBottom = []
for(let i=0;i<10;i++){
    linesBottom.push(new Obj(Imgs.line))
    linesBottom[i].bottom(11)
    linesBottom[i].leftpx(i*110)
    linesBottom[i].setHpx(10)
}


const horses = []
const cages = []
const gates = []

// horse_black
// horse_yellow
// horse_red
// horse_pink
// horse_green
// horse_blue_white
// horse_blue_gray
// horse_blue_black
const horses_colors = [
    Imgs.horse_black,
    Imgs.horse_yellow,
    Imgs.horse_red,
    Imgs.horse_pink,
    Imgs.horse_green,
    Imgs.horse_blue,
]

for(let i=0;i<6;i++){
    let r = (Math.random() * 6)|0
    // horses.push(new Horse(Imgs.horse_pink))
    horses.push(new Horse(horses_colors[i]))
    // horses[i].setPosition(0, 38 - 5.5*i )
    // horses[i].setPosition(-5 + i*1, 38 - 5.5*i )
    // horses[i].setPosition(-5 + i*1, 38 - 5.5*i )
    // horses[i].setPositionPx(-20, 200 - i*30 )
    horses[i].setFrame(r*r*i)
    horses[i].bottom(38 - 5.5 * i)
    // horses[i].left(-5 + i*1)
    // horses[i].leftpx(-80 + i * 10)
    horses[i].left(-5+i/2)
    // horses[i].pos = -20
    
    gates.push(new Obj(Imgs.gate))
    gates[i].bottom(35 - i * 6)
    gates[i].leftpx(160 + i * 9)
    gates[i].setHpx(150)

    cages.push(new Obj(Imgs.cage))
    cages[i].bottom(40 - i * 5.57)
    // cages[i].left(-10 + i * 1.5)
    cages[i].leftpx(-40 + i * 7)
    // cages[i].left(-10 + i * 1.2)
    cages[i].setHpx(100)
    
    // gates[i].leftpx(-100 + i * 9)
    // cages[i].setZ(i)
}

horses.map(e=>e.isRunning = false)

// const finishline = new Obj(Imgs.finishline)
// finishline.bottom(12.51)
// finishline.top(0)
// finishline.setHpx(300)
// finishline.setH(300)
// finishline.setWpx(120)
// finishline.setHpx(300)
// finishline.setHpx(500)

const fencesBottom = []
for(let i=0;i<10;i++){
    fencesBottom.push(new Obj(Imgs.cercado_1))
    fencesBottom[i].bottom(0)
    fencesBottom[i].leftpx(i*165)
    fencesBottom[i].setHpx(70)
}

const plantsBottom = []
for(let i=0;i<5;i++){
    plantsBottom.push(new Obj(Imgs.plant))
    plantsBottom[i].bottompx(-10)
    plantsBottom[i].leftpx(i*450)
    plantsBottom[i].setHpx(65)
}

// horses
// for(let i=0;i<6;i++){
// const horse = new Obj(Imgs.horse)
// horse.bottom(10)
// horse.setHpx(180)
//     horses.push(horse)
// }

// const horses = []
// for(let i=0;i<6;i++){
//     horses.push(new Obj(Imgs.horse))
//     horses[i].bottom(35 - 5 * i)
//     horses[i].leftpx(i*20)
//     horses[i].setHpx(180)
// }







// gates
// const gates = []
// for(let i=0;i<6;i++){
//     gates.push(new Obj(Imgs.gate))
//     gates[i].leftpx(150 + 10*i)
//     gates[i].bottom(36 - 4.5 * i)
//     gates[i].setHpx(100)
// }



const Mechanic = { 
    gatesOff(){
        gates.map((e,i) => {
            setTimeout(()=>{e.off()}, i*50)
        })
    },
    gatesOn(){
        gates.map((e,i) => {
            setTimeout(()=>{e.on()}, i*50)
        })
    },
    startRun(){
        audios.shoot()
        this.gatesOff()
        setTimeout(()=>{
            Mechanic.horseDesorder()
            horses.map(e=>e.isRunning = true)
            horses_unsort()
            isPaused = false
        }, 150)
    },
    horseDesorder(){
        horses.map((e,i)=>{
            const r = 10+Math.random()*50|0
            // const r = Math.random()* (30 - 50 ) - 30|0
            // e.pos = -10
            e.velocity = r
        })
        // horses[3].velocity = 30
    }
}

window.onkeyup=function(e){
    if(e.key == '1'){
        // isPaused = false
        Mechanic.gatesOff()
        horses.map(e=>e.isRunning = true)
        // horses.map(e=>e.animation())
        // gates.map(e=>e.translateYpx(50))
    }

    if(e.key == '2'){
        horses.map(e=>e.isRunning = false)
        Mechanic.gatesOn()
    }
    
    if(e.key == '3'){
        Mechanic.startRun()
    }
}

setTimeout(()=>{Mechanic.startRun()}, 2000)
// setTimeout(Mechanic.startRun, 2000)

function horses_unsort(){
    horses.map((horse,i)=>{
        function go(){
            r = Math.random() * 100
            horse.pos = r
        }
        setTimeout(go, i*100)
    })
}

// Mechanic.startRun()


let x=0
// camera(0)
function loop(){
    if(!isPaused) 
        camera(x+=0.01)

    window.requestAnimationFrame(loop)
}

window.addEventListener('DOMContentLoaded',e=>{
    
    

    // setTimeout(e=>{
        // setInterval(()=>{
        //     loop()
        // }, 1000 / 60)
        window.requestAnimationFrame(loop)
    // }, 500)
})

// window.requestAnimationFrame(loop)

window.onmousemove=function(e){
    // x = e.clientX
    // camera(x)
}

setTimeout(()=>camera(0), 500)

const velocidade = 3
function camera(x){
    camera_image(velocidade*x*0.435, plantsTop)
    camera_image(velocidade*x*1.45, fencesTop)
    camera_image(velocidade*x, fencesBottom)
    camera_image(velocidade*x*0.435, plantsBottom)
    camera_image(velocidade*x*0.55, grasses)
    camera_image(velocidade*x*0.4, grandStands)
    camera_image(velocidade*x*0.05, hills)
    camera_image(velocidade*x*0.1, trees, 4)
    
    // camera_image(velocidade*x*0.1, cages)
    // x = e.clientX
    // y = e.clientY
    // w = document.body.offsetWidth
    // h = document.body.offsetWidth
    // mid_x = (x - w/2)|0
    // mid_x = x
    // mid_y = (y - h/2)|0

    // grandStands[0].setX(mid_x * 0.6 + 500 * 0)
    // grandStands[1].setX(mid_x * 0.6 + 500 * 1)
    // grandStands[2].setX(mid_x * 0.6 + 500 * 2)
    // grandStands[3].setX(mid_x * 0.6 + 500 * 2)
    // grandStands[4].setX(mid_x * 0.6 + 500 * 2)

    // grandStands.map((e, i)=> e.setX(mid_x * 0.6 + 500 * i) )
    // mountains[0].translateXpx(mid_x/5 - 500 * 2)
    // mountains[1].translateXpx(mid_x/5 - 500 * 2)
    // fencesTop.map((e,i) => e.translateXpx(mid_x * 2 - 2000))
    // plantsTop.map((e,i) => e.translateXpx(mid_x * 2 - 2000))
    // plantsBottom.map((e,i) => e.translateXpx(mid_x * 2 - 2000))
    // fencesBottom.map((e,i) => e.translateXpx(mid_x * 2 - 2000))
    // cloud.translateXpx(mid_x/30)
    // trees.map((e,i) => e.translateXpx(mid_x/10 + 500 * 2 - 1000))
    // hills.map((e,i) => e.translateXpx(mid_x / 4 - 500))
    // finishline.translateX(mid_x * 1.295)
    // grasses.map((e,i) => e.translateXpx(mid_x * 2 - 2000))
    // grasses.map((e,i) => e.translateXpx(mid_x * 2 - 2000))
    // gates.map((e,i) => e.translateXpx(x))
    cages.map((e,i) => e.translateXpx(-x*200*velocidade))
    gates.map((e,i) => e.translateXpx(-x*200*velocidade))
    cloud.translateXpx(-x*90)

    
    
    // horses.map((e,i) => e.translateXpx(-mid_x / i))
}
