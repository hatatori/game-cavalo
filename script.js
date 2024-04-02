cavalo = {
    w: 682,
    h: 384,
    limitFrame: 120,
    velocidade: 1,
    frame: 0,
    setFrame(n){
        // horse_1.style.setProperty('--x', `${this.frame*this.w}px`)
        this.frame = n%this.limitFrame
        const x = ((this.frame%10)*this.w)
        const y = (this.frame/10|0)*this.h

        h1.innerHTML = n

        horse_1.scrollTo(x, y)
        horse_1.style.setProperty('--x', `${-x}px`)
        horse_1.style.setProperty('--y', `${-y}px`)

        // if(n == 3){ new Audio('./som/c1.mp3').play() }
        // if(n == 27){ new Audio('./som/c2.mp3').play() }
        // if(n == 36){ new Audio('./som/c3.mp3').play() }
        // if(n == 120){ new Audio('./som/c4.mp3').play() }
    },
    nextFrame(){
        ++this.frame
        this.setFrame(this.frame)
        // if(this.frame == 7){ new Audio('./som/c1.mp3').play() }
        // if(this.frame == 40){ new Audio('./som/c2.mp3').play() }
        // if(this.frame == 73){ new Audio('./som/c3.mp3').play() }
        // if(this.frame == 117){ new Audio('./som/c4.mp3').play() }
    },
    prevFrame(){
        --this.frame
        this.setFrame(this.frame)
    },
}

// range.setAttribute('max', cavalo.limitFrame)

range.onmousemove=function(){
    cavalo.setFrame(this.value)
    // cavalo.velocidade = this.value|0
}
range.onchange=function(){
    // cavalo.velocidade = this.value|0
}


n = 0
window.onkeyup=function(e){
    // if(e.key=="1") --cavalo.velocidade;
    // if(e.key=="2") ++cavalo.velocidade ;
    if(e.key=="1") cavalo.prevFrame()
    if(e.key=="2") cavalo.nextFrame();
    
}


// n = 1
setInterval(()=>{
    for(i=0;i<cavalo.velocidade;i++)
        cavalo.nextFrame()
}, 0)


    // for(i=0;i<cavalo.velocidade;i++){
    // cavalo.setFrame(n%cavalo.limitFrame)
    // n += cavalo.velocidade
    // n+=cavalo.velocidade
    // }
    // if(n>cavalo.limitFrame)
    //     n=1

// horse_1.style.setProperty('--y', `${frame*w}px`)


