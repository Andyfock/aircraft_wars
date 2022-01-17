/*使用面向对象思想重铸的版本*/ 

// 1.让画布能够绘制图片
// 1.1找到画布
const canvas = document.querySelector("#canvas");
// 1.2利用画布初始化一个2D画笔
const context = canvas.getContext("2d");

//定义游戏状态
// 开始
const START = 0;
// 开始时
const STARTING = 1;
// 运行时
const RUNNING = 2;
// 暂停时
const PAUSE = 3;
// 结束时
const END = 4;

// 2.加载图片 图片加载/初始化这个过程是异步的，相当于加载图片的同时系统开启另一个线程继续运行下面的代码，
// 而绘制图片的速度肯定是要比加载图片快的，所以光这样写没法加载出来图片，要用onload事件
const bg = new Image();
bg.src = "/img/background.png";

//初始化一个开始图片Logo
const copyright = new Image();
copyright.src = "/img/shoot_copyright.png"

// 初始化暂停图片
const pause = new Image();
pause.src = "/img/game_pause.png"

//初始化四张飞机大战加载图片
const loading_frame = [];
loading_frame[0] = new Image();
loading_frame[0].src = "/img/game_loading1.png";
loading_frame[1] = new Image();
loading_frame[1].src = "/img/game_loading2.png";
loading_frame[2] = new Image();
loading_frame[2].src = "/img/game_loading3.png";
loading_frame[3] = new Image();
loading_frame[3].src = "/img/game_loading4.png";

const hero_frame = {live: [], death: []}
hero_frame.live[0] = new Image();
hero_frame.live[0].src = "/img/hero1.png";
hero_frame.live[1] = new Image();
hero_frame.live[1].src = "/img/hero2.png";
hero_frame.death[0] = new Image();
hero_frame.death[0].src = "/img/hero_blowup_n1.png";
hero_frame.death[1] = new Image();
hero_frame.death[1].src = "/img/hero_blowup_n2.png";
hero_frame.death[2] = new Image();
hero_frame.death[2].src = "/img/hero_blowup_n3.png";
hero_frame.death[3] = new Image();
hero_frame.death[3].src = "/img/hero_blowup_n4.png";

const bulletpic = new Image();
bulletpic.src = "/img/bullet1.png"
// 需要初始化两个坐标位置来绘制两次背景
const x1 = 0;
let y1 = 0;
const x2 = 0;
let y2 = -650;

const e1 = {
    live: [],
    death: [],
}
e1.live[0] = new Image();
e1.live[0].src = "/img/enemy1.png";
e1.death[0] = new Image();
e1.death[0].src = "/img/enemy1_down1.png";
e1.death[1] = new Image();
e1.death[1].src = "/img/enemy1_down2.png";
e1.death[2] = new Image();
e1.death[2].src = "/img/enemy1_down3.png";
e1.death[3] = new Image();
e1.death[3].src = "/img/enemy1_down4.png";

const e2 = {
    live: [],
    death: [],
}
e2.live[0] = new Image();
e2.live[0].src = "/img/enemy2.png";
e2.death[0] = new Image();
e2.death[0].src = "/img/enemy2_down1.png";
e2.death[1] = new Image();
e2.death[1].src = "/img/enemy2_down2.png";
e2.death[2] = new Image();
e2.death[2].src = "/img/enemy2_down3.png";
e2.death[3] = new Image();
e2.death[3].src = "/img/enemy2_down4.png";

const e3 = {
    live: [],
    death: [],
}
e3.live[0] = new Image();
e3.live[0].src = "/img/enemy3_n1.png";
e3.death[0] = new Image();
e3.death[0].src = "/img/enemy3_down1.png";
e3.death[1] = new Image();
e3.death[1].src = "/img/enemy3_down2.png";
e3.death[2] = new Image();
e3.death[2].src = "/img/enemy3_down3.png";
e3.death[3] = new Image();
e3.death[3].src = "/img/enemy3_down4.png";
e3.death[4] = new Image();
e3.death[4].src = "/img/enemy3_down5.png";
e3.death[5] = new Image();
e3.death[5].src = "/img/enemy3_down6.png";

// 参数解释：image:加载的图片对象; dx:图片开始绘制的左上角的横坐标
// dy:图片开始绘制的左上角的纵坐标; dWidth:图片在canvas绘制的宽度(缺省值表示绘制到整张canvas)
// dHeight:图片在canvas绘制的宽度(缺省值表示绘制到整张canvas)
// 当图片加载完毕后再去绘制背景
// eventName 事件的名称

// context.drawImage(bg, 0, 0, 480, 650);
/*class是ES6新增的写法，实际上和ES5的构造函数function sky() {}没有差别
有静态属性以及动态方法两个部分
静态属性提供到一个constructor函数中，也就是每当new一个class实例时都会先运行constructor函数
*/




//天空类的配置项
const skyconfig = {
    bg: bg,
    width: 480,
    height: 650,
    speed: 10,
};

//飞机界面加载类配置项
const loadingconfig = {
    frame: loading_frame,
    width: 186,
    height: 38,
    x: 0,
    y: 650-38,
    speed: 1000,
};

//英雄配置项
const heroconfig = {
    frame: hero_frame,
    width: 99,
    height: 124,
    x: 0,
    y: 0,
    speed: 10,

}

//子弹配置项
const bulletconfig = {
    img: bulletpic,
    width: 9,
    height: 21
}

const Enemy1 = {
    type: 1,
    width: 57,
    height: 51,
    life: 1,
    score: 1,
    frame: e1,
    minSpeed: 20,
    maxSpeed: 10,
}

const Enemy2 = {
    type: 2,
    width: 69,
    height: 95,
    life: 5,
    score: 5,
    frame: e2,
    minSpeed: 50,
    maxSpeed: 20,
}

const Enemy3 = {
    type: 3,
    width: 169,
    height: 258,
    life: 20,
    score: 20,
    frame: e3,
    minSpeed: 100,
    maxSpeed: 100,
}
//初始化天空类
class Sky{
    constructor(config) {
        //静态属性
        this.bg = config.bg;
        this.width = config.width;
        this.height = config.height;
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = -this.height;
        this.speed = config.speed;
        //初始化实例的时间
        this.time = new Date().getTime();
    }
    //动态方法
    //判断方法，判断这个时间段天空是否需要移动来觉得y1y2是否++
    //拿到当前时间节点 有一个速度节点 拿到一个历史时间
    // 当前时间-速度时间 如果大于历史时间 那么就需要移动 否则就不需移动
    judge() {
        let currentTime = new Date().getTime();
        if(currentTime - this.time > this.speed) {
            this.y1++;
            this.y2++;
            //要注意更新历史时间，不能一直是初始化的那个时间
            this.time = currentTime;

        }
        // 使用if语句判断临界点，在临界点的时候把最下面的图放到上面去重新滚动
        if(this.y2 == 0) {
            this.y1=0;
            this.y2=-this.height
        }
    }
    //绘图方法
    paint(context) {
        context.drawImage(this.bg, this.x1, this.y1, this.width, this.height);
        context.drawImage(this.bg, this.x2, this.y2, this.width, this.height);
        
    }
}

//初始化一个飞机界面加载类
class Loading {
    constructor(loadingconfig) {
        this.frame = loadingconfig.frame;
        this.frameIndex = 0;
        this.width = loadingconfig.width;
        this.height = loadingconfig.height;
        this.x = loadingconfig.x;
        this.y = loadingconfig.y;
        this.speed = loadingconfig.speed;
        this.lastTime = new Date().getTime();
    }
    judge() {
        //获取之前那个时间LastTime，speed，当前时间
        //如果当前时间-lasttime>speed，则通过frameindex奇幻frame
        //直到切换到frame[3]
        const currentTime = new Date().getTime();
        if(currentTime - this.lastTime > this.speed) {
            this.frameIndex++;
            if(this.frameIndex === 4) {
                //更新状态
                state = RUNNING;
            }
            //更新历史时间
            this.lastTime = currentTime;
        }
    }
    paint(context) {
        context.drawImage(this.frame[this.frameIndex], this.x, this.y, this.width, this.height)
    }
}

//初始化英雄类
class Hero {
    constructor(config) {
        this.width = config.width;
        this.height = config.height;
        this.x = (480 - config.width)/2;
        this.y = 650 - config.height;
        this.frame = config.frame;
        this.lastTime = new Date().getTime();
        this.speed = config.speed;
        this.frameLiveindex = 0;
        this.frameDeathindex = 0;
        //当前展示的图片
        this.img = null;
        this.live = true;
        //子弹上次射击的时间
        this.lastShootTime = new Date().getTime();
        //子弹射击的间隔
        this.shootInterval = 200;
        this.bulletList = [];
        this.destory = false;
    }
    judge() {
        const currentTime = new Date().getTime();
        if(currentTime - this.lastTime > this.speed) {
            // live只有俩状态 防止下标
            if(this.live) {
                this.img = this.frame.live[this.frameLiveindex++ % this.frame.live.length];
            } else {
                this.img = this.frame.death[this.frameDeathindex++];
                // 到4英雄撕掉
                if(this.frameDeathindex === this.frame.death.length) {
                    this.destory = true;
                }
            }
            this.lastTime = currentTime;
        }
    }
    paint(context) {
        // this.img = this.frame.live[0];
        context.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    //英雄射击子弹
    shoot() {
        //获取当前时间
        const currentTime = new Date().getTime();
        if(currentTime - this.lastShootTime > this.shootInterval) {
            //在飞机头部初始化一个子弹对象
            let bullet = new Bullet(bulletconfig, this.x + this.width/2 - bulletconfig.width/2, this.y - bulletconfig.height);
            // 英雄飞机认领子弹
            this.bulletList.push(bullet);
            //在网页上绘制子弹对象
            bullet.paint(context);
            // 更新射击时间
            this.lastShootTime = currentTime;
        }
    }
    collide() {
        this.live = false;
    }
}

//初始化子弹类
class Bullet {
    constructor(config, x, y) {
        this.img = config.img;
        this.width = config.width;
        this.height = config.height;
        this.x = x;
        this.y = y;
        this.destory = false;
    }

    move() {
        this.y -= 2;
    }
    paint() {
        context.drawImage(this.img, this.x, this.y);
    }
    outofBounds() {
        // 如果为真，则应该销毁子弹
        return this.y < 0 - this.height;
    }
    collide() {
        // 让子弹变成可销毁状态
        this.destory = true;
    }
}

// 初始化敌机类
class Enemy {
    constructor(config) {
        // 敌机类型
        this.type = config.type;
        // 敌机宽高
        this.width = config.width;
        this.height = config.height;
        // 敌机初始化位置
        this.x = Math.floor(Math.random() * (480 - config.width));
        this.y = -config.height;
        // 敌机生命
        this.life = config.life;
        // 分数
        this.score = config.score;
        // 敌机图片
        this.frame = config.frame;
        // 此时的图片
        this.img = this.frame.live[0];
        // 活着的标识
        this.live = true;
        this.minSpeed = config.minSpeed;
        this.maxSpeed = config.maxSpeed;
        this.speed = Math.floor(Math.random() * (config.minSpeed - config.maxSpeed + 1)) + config.maxSpeed;
        // 最后时间标识 在这个时间段它不变化，但是过了这个时间段就要变化
        this.lastTime = new Date().getTime();
        // 死亡下标
        this.deathIndex = 0;
        // 确认销毁
        this.destory = false;
    }
    // 判定是否需要渲染/怎么渲染/是否移动
    move() {
        const currentTime = new Date().getTime();
        if(currentTime - this.lastTime >= this.speed) {
            if(this.live) {
                this.img = this.frame.live[0];
                this.y++;
            } else {
                // 死的时候播放死亡动画
                // 飞机三个阶段：活着 爆炸中 死亡
                this.img = this.frame.death[this.deathIndex++];
                // 死亡动画播放完毕销毁敌机
                if(this.deathIndex === this.frame.death.length) {
                    this.destory = true;
                }
            }
            // 修正上一次时间
            this.lastTime = currentTime;
        }
    }
    paint(context) {
        context.drawImage(this.img, this.x, this.y);
    }
    outofBounds() {
        if(this.y > 650) {
            return true;
        }
    }
    // 检测敌机是否撞到其他物体
    // 敌机e 子弹o
    hit(o) {
        // 其他物体的左边
        let ol = o.x;
        // 其他物体的右边
        let or = o.x + o.width;
        // 其他物体的顶边
        let ot = o.y;
        // 其他物体的底边
        let ob = o.y + o.height;
        // 敌机的左边
        let el = this.x;
        // 敌机的右边
        let er = this.x + this.width;
        // 敌机的顶边
        let et = this.y;
        // 敌机的底边
        let eb = this.y + this.height;
        // 判断是否碰到
        if(ol > er || or < el || ot > eb || ob < et) {
            //满足条件则表示没碰到
            return false;
        } else {
            return true;
        }
    }
    collide() {
        // 中弹生命减少
        this.life--;
        // 生命降低为0时需要调用其他方法
        if(this.life === 0) {
            // 1 将live标记为死亡
            // 2 播放死亡动画
            // 3 放完动画才真正销毁
            this.live = false;
            // 收获到敌机分数
            score += this.score;
        }
    }
}

//初始化天空实例
const sky = new Sky(skyconfig);
//初始化飞机界面加载实例
const loading = new Loading(loadingconfig)
//初始化英雄实例
let hero = new Hero(heroconfig)


// 游戏状态
let state = START;
// score 分数变量 life变量
let score = 0;
let life = 3;
// 为canvas绑定一个点击事件，且他如果是START状态时需修改成STARTING状态
canvas.addEventListener("click", () => {
    if(state === START) {
        state = STARTING;
    }
});
// 为canvas绑定一个鼠标移动事件 鼠标在飞机图片的中心
canvas.addEventListener("mousemove", (e) => {
    // console.log(e.offsetX, e.offsetY);
    hero.x = e.offsetX - hero.width/2;
    hero.y = e.offsetY - hero.height/2;
})

// 为canvas绑定一个鼠标离开事件 running -> pause
canvas.addEventListener("mouseleave", () => {
    if(state === RUNNING) {
        state = PAUSE;
    }
})
// 进入事件 pause -> running
canvas.addEventListener("mouseenter", () => {
    if(state === PAUSE) {
        state = RUNNING;
    }    
})

// 碰撞检测函数
function checkHit() {
    // 遍历所有的敌机
    for(let i = 0; i < enemies.length; i++) {
        if(enemies[i].hit(hero)) {
            //英雄和敌机碰撞
            enemies[i].collide();
            hero.collide();
        }
        // 遍历所有的子弹
        for(let j = 0; j < hero.bulletList.length; j++) {
            // 用第i的敌机和第j个子弹进行碰撞检测 返回布尔类型
            // enemies[i].hit(hero.bulletList[j]);
            // 如果碰到了 做某些事情
            if(enemies[i].hit(hero.bulletList[j])) {
                // 清除敌机和子弹
                enemies[i].collide();
                hero.bulletList[j].collide();
            }
        }
    }
}
// 变量中所有的敌机实例
const enemies = [];
// 敌机产生的速率
let enemy_create_interval = 800; 
let enemy_lastTime = new Date().getTime();
// 全局函数 隔一段时间初始化敌机
function createComponent() {
    const currentTime = new Date().getTime();
    if(currentTime - enemy_lastTime >= enemy_create_interval) {
        // 当时间满足 实例化一架飞机 放入敌机数组
        // 小飞机概率60% 中飞机30% 大飞机10%
        let ran = Math.floor(Math.random() * 100);
        if(ran < 60) {
            enemies.push(new Enemy(Enemy1));
        } else if(ran < 90 && ran > 60) {
            enemies.push(new Enemy(Enemy2));
        } else {
            enemies.push(new Enemy(Enemy3));
        }
        // 更新时间
        enemy_lastTime = currentTime;
    }
}
// 全局函数判断所有的子弹组件
function judegeComponent() {
    for(let i = 0; i < hero.bulletList.length; i++) {
        hero.bulletList[i].move();
    }
    for(let i = 0; i < enemies.length; i++) {
        enemies[i].move();
    }
}
// 全局函数绘制所有子弹组件 score life
function paintComponent() {
    for(let i = 0; i < hero.bulletList.length; i++) {
        hero.bulletList[i].paint(context);
    }
    for(let i = 0; i < enemies.length; i++) {
        enemies[i].paint(context);
    }   
    // 绘制score和Life
    context.font = "20px 微软雅黑"; 
    context.fillStyle = "red"
    context.textAlign = "left";
    context.fillText("score: " + score, 10, 20);
    context.textAlign = "right";
    context.fillText("life: " + life, 480 -10, 20);

    // 重置代码 重置画笔
    context.fillStyle = "black"
    context.textAlign = "left";
}
// 全局函数销毁所有的子弹/敌人组件/英雄
function deleteComponent() {
    if(hero.destory) {
        // destory则生命--
        life--;
        hero.destory = false;
        // 生命值为0才进入游戏结束状态
        // 否则产生新的英雄飞机
        if(life === 0) {
            state = END;
        } else {
            hero = new Hero(heroconfig);
        }
    }
    for(let i = 0; i < hero.bulletList.length; i++) {
        // 判断有无飞出边界 或destroy状态
        if(hero.bulletList[i].outofBounds() || hero.bulletList[i].destory) {
            // splic：参数1：操作位 参数2：操作数
            hero.bulletList.splice(i, 1);
        }
    } 
    for(let i = 0; i < enemies.length; i++) {
        // 如果敌机待销毁，则销毁
        // enemies[i].outofBounds() || 
        if(enemies[i].destory) {
            enemies.splice(i, 1);
        }
    }   
}

//图片加载完毕后做事
bg.addEventListener("load", () => {
    // setinterval: 第一个参数为回调函数，第二个参数为时间，意思每隔这个时间就调用这个回调函数
    //这里的10只是保证页面的刷新率，但是实际移动位置的判断交给每个实例
    setInterval(() => {
        switch(state) {
            case START:
                //渲染移动天空
                sky.judge();
                sky.paint(context);
                // 渲染飞机大战Logo
                // 图片原始宽高属性获取：natualWidth&naturalHeight
                let logo_x = (480 - copyright.naturalWidth)/2;
                let logo_y = (650 - copyright.naturalHeight)/2;
                context.drawImage(copyright, logo_x, logo_y);
                break;
            case STARTING:
                sky.judge();
                sky.paint(context);
                // 飞机加载类
                loading.judge();
                loading.paint(context);
                break;
            case RUNNING:
                console.log("running");
                sky.judge();
                sky.paint(context);
                // 渲染我方飞机和敌方飞机
                hero.judge();
                hero.paint(context);
                hero.shoot();
                createComponent()
                judegeComponent();
                deleteComponent();
                paintComponent();
                checkHit();
                break;
            case PAUSE:
                // 暂停图标
                let pause_x = (480 - pause.naturalWidth)/2;
                let pause_y = (650 - pause.naturalHeight)/2;
                context.drawImage(pause, pause_x, pause_y);
                break;
            case END:
                // game over
                context.font = "bold 24px 微软雅黑";
                // 文本水平方式
                context.textAlign = "center";
                // 文本垂直对齐方式
                context.textBaseline = "middle";
                context.fillText("GAME OVER", 480/2, 650/2)
                break;

        }
    }, 10);
})
