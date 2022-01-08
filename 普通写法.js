// 1.让画布能够绘制图片
// 1.1找到画布
const canvas = document.querySelector("#canvas");
// 1.2利用画布初始化一个2D画笔
const context = canvas.getContext("2d");
// 2.加载图片 图片加载/初始化这个过程是异步的，相当于加载图片的同时系统开启另一个线程继续运行下面的代码，
// 而绘制图片的速度肯定是要比加载图片快的，所以光这样写没法加载出来图片，要用onload事件
const bg = new Image();
bg.src = "/img/background.png";
// 需要初始化两个坐标位置来绘制两次背景
const x1 = 0;
let y1 = 0;
const x2 = 0;
let y2 = -650;
// 参数解释：image:加载的图片对象; dx:图片开始绘制的左上角的横坐标
// dy:图片开始绘制的左上角的纵坐标; dWidth:图片在canvas绘制的宽度(缺省值表示绘制到整张canvas)
// dHeight:图片在canvas绘制的宽度(缺省值表示绘制到整张canvas)
// 当图片加载完毕后再去绘制背景
// eventName 事件的名称
bg.addEventListener("load", () => {
    // setinterval: 第一个参数为回调函数，第二个参数为时间，意思每隔这个时间就调用这个回调函数
    setInterval(() => {
        context.drawImage(bg, x1, y1++, 480, 650);
        context.drawImage(bg, x2, y2++, 480, 650);
        // 使用if语句判断临界点，在临界点的时候把最下面的图放到上面去重新滚动
        if(y2 == 0) {
            y1=0;
            y2=-650
        }
    }, 10);
})
// context.drawImage(bg, 0, 0, 480, 650);
