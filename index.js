const fortuneWheel = document.querySelector(".fortuneWheel");
const twoChoice = document.querySelector(".twoChoice");
const playPoker = document.querySelector(".playPoker");

const wheelBody = document.querySelector('.wheelBody');
const twoBody = document.querySelector('.twoBody');
const pokerBody = document.querySelector('.pokerBody');

/* nav栏切换start */
fortuneWheel.addEventListener('click', function () {
    wheelBody.style.display = 'flex'
    twoBody.style.display = 'none'
    pokerBody.style.display = 'none'
})
twoChoice.addEventListener('click', function () {
    twoBody.style.display = 'block'
    wheelBody.style.display = 'none'
    pokerBody.style.display = 'none'
})
playPoker.addEventListener('click', function () {
    pokerBody.style.display = 'block'
    wheelBody.style.display = 'none'
    twoBody.style.display = 'none'
})
/* nav栏切换end */
// 大转盘区域
/* 大转盘start */
const wheelTexts = document.querySelectorAll('.wheelText');
const textBtn = document.querySelector('.textBtn');
const textDeleteBtn = document.querySelector('.textDeleteBtn');
const canvas = document.getElementById('tutorial');
const btn = document.getElementById('btn');
const customBox = document.querySelector(".customBox");
const saveCustom = document.querySelector(".saveCustom");
const inputTitle = document.querySelector(".inputTitle");
const saveTitle = document.querySelector(".saveTitle");
const unsaveTitle = document.querySelector(".unsaveTitle");
const titleAlert = document.querySelector(".titleAlert")
const shadow = document.querySelector(".shadow")
var rotateTimes = 1;
var saveRandom = 0;
var flag = false;
var dataBackup = [];
var customTitleName = '';
var dbData = {};
var delBtn = []
// 自定义转盘的每一项
var customContent = [];
const dataWheel = {
    "早餐": ['包子', '馒头', '鸡蛋', '油条', '煎饺', '煎饼'],
    "午/ 晚餐": ['🍜面条', '🍚米饭', '🥟饺子', '🍔快餐', '🍣寿司', '🍕小吃'],
    "水果": ['🍎苹果', '🍇葡萄', '🍉西瓜', '🍌香蕉', '🍒樱桃', '🍊橘子']
}
// 初始进入时查找db中的所有内容
utools.onPluginReady(() => {
    if (utools.db.allDocs() == "") {
        for (i in dataWheel) {
            utools.dbStorage.setItem(i, dataWheel[i])
        }
    }
    if (utools.db.allDocs()) {
        updateCustom()
        // deleteCustom()

    }
}
)
//扇形
function draw(text) {
    const length = 400
    const radius = length / 2
    const PI2 = Math.PI * 2
    const num = 6;
    var canvas = document.getElementById('tutorial');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        //计算每个奖项所占角度数
        var baseAngle = PI2 / num;
        ctx.clearRect(0, 0, length, length);//去掉背景默认的黑色
        // colors = ["#5db641", "#eddd97"];
        colors = ["#e3f1fe", "#0078fc"];
        for (var index = 0; index < num; index++) {
            var angle = index * baseAngle;
            if ((index + 1) % 2 !== 0) {

                ctx.fillStyle = colors[0];//设置每个扇形区域的颜色
            }
            else {
                ctx.fillStyle = colors[1];//设置每个扇形区域的颜色

            }
            ctx.beginPath();//开始绘制

            ctx.moveTo(radius, radius)
            ctx.arc(radius, radius, 157, angle, angle + baseAngle);
            ctx.fill();//填充颜色
            ctx.save();//保存当前环境的状态
            ctx.beginPath();
            // ctx.fillStyle = '#574e1a'
            ctx.font = '20px Microsoft YaHei';

            if (index === 0) {
                ctx.fillStyle = '#0078fc'
                ctx.translate(250, 238);
                ctx.rotate(PI2 / 12);
                ctx.fillText(text[index], 0, 0)


            }
            if (index === 1) {
                ctx.fillStyle = '#e3f1fe'
                ctx.translate(190, 266)
                ctx.rotate(PI2 / 4);
                ctx.fillText(text[index], 0, 0)

            }
            if (index === 2) {
                ctx.fillStyle = '#0078fc'
                ctx.translate(140, 230)
                ctx.rotate(PI2 / 2.4);
                ctx.fillText(text[index], 0, 0)

            }
            if (index === 3) {
                ctx.fillStyle = '#e3f1fe'
                ctx.translate(150, 154)
                ctx.rotate(PI2 / 1.7);
                ctx.fillText(text[index], 0, 0)
            }
            if (index === 4) {
                ctx.fillStyle = '#0078fc'
                ctx.translate(205, 130)
                ctx.rotate(PI2 * 3 / 4);
                ctx.fillText(text[index], 0, 0)
            }
            if (index === 5) {
                ctx.fillStyle = '#e3f1fe'
                ctx.translate(260, 170)
                ctx.rotate(PI2 * 12 / 13);
                ctx.fillText(text[index], 0, 0)
            }

            ctx.fill()
            ctx.restore();
        }
        baseContent(ctx, radius, PI2);
        ctx.save();

    }
    drawBtn();
}
//圆盘
function baseContent(ctx, radius, PI2) {
    //最外层橘色
    // ctx.strokeStyle = '#f0784f';
    ctx.strokeStyle = '#98c9ff';
    ctx.lineWidth = 23;
    ctx.beginPath();
    ctx.arc(radius, radius, 169, 0, PI2);
    ctx.stroke();
    //黑色
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#692c18';
    ctx.beginPath();
    ctx.arc(radius, radius, 180, 0, PI2);
    ctx.stroke();

    //内层白色
    ctx.strokeStyle = '#eee1cd';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(radius, radius, 154, 0, PI2);
    ctx.stroke();
    //黑色
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#692c18';
    ctx.beginPath();
    ctx.arc(radius, radius, 157, 0, PI2);
    ctx.stroke();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#692c18';
    ctx.beginPath();
    ctx.arc(radius, radius, 152, 0, PI2);
    ctx.stroke();


}
//按钮
function drawBtn() {
    const length = 200
    const radius = length / 2
    const PI2 = Math.PI * 2

    var ctx = btn.getContext('2d');
    //抽奖按钮
    //白色
    ctx.fillStyle = '#eee1cd'
    ctx.beginPath();
    ctx.arc(radius, radius, 42, 0, PI2);
    ctx.fill();
    //黑色
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#692c18';
    ctx.beginPath();
    ctx.arc(radius, radius, 42, 0, PI2);
    ctx.stroke();

    //三角
    ctx.beginPath();
    ctx.moveTo(radius - 9, radius - 40);
    ctx.lineTo(radius + 9, radius - 40);
    ctx.lineTo(radius, radius - 58);
    ctx.closePath();
    ctx.fill();
    //黑色
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#692c18';
    ctx.moveTo(radius - 9, radius - 40);
    ctx.lineTo(radius, radius - 58);
    ctx.lineTo(radius + 9, radius - 40);
    ctx.stroke();

    //按钮
    // ctx.fillStyle = '#f67d44';
    ctx.fillStyle = '#fd2a54';
    ctx.beginPath();
    ctx.arc(radius, radius, 36, 0, PI2);
    ctx.fill();
    //黑色
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#692c18';
    ctx.beginPath();
    ctx.arc(radius, radius, 35, 0, PI2);
    ctx.stroke();
    //文字
    ctx.fillStyle = '#fff';
    ctx.font = '24px Microsoft YaHei';
    ctx.fillText('开始', radius - 24, radius + 6);
}
btn.addEventListener('click', function () {

    if (!flag) {
        flag = true
        const timer = 3.5
        canvas.setAttribute("style", "transform:rotate(0);")
        var random = Math.random() * 360;
        var num = random + 540 * rotateTimes + saveRandom;
        canvas.setAttribute("style", "transform:rotate(" + num + "deg);transition:all  " + timer + "s ease-out")
        rotateTimes++;
        saveRandom = random + saveRandom;
        setTimeout(() => {
            flag = false
        }, timer * 1000 + 20)
    }
})
// 筛选传入的6项文字
function filterContent() {
    var moreLength = 0
    var data = []
    var surplus = 0;
    dataBackup = [];
    wheelTexts.forEach((item) => {
        data.push(item.value)
    })
    data.forEach((item) => {
        if (item.trim() === '') {
            surplus++

        } else {
            dataBackup.push(item)
            moreLength = data.length - dataBackup.length

        }
    })
    // 如果全部都没写
    if (surplus === 6) {
        dataBackup = ['', '', '', '', '', '']
    }
    // 当有部分内容未填写时，随机填写
    if (moreLength > 0) {
        let arr = [...dataBackup]
        for (let addIndex = moreLength - 1; addIndex >= 0; addIndex--) {
            dataBackup.push(arr[Math.floor(Math.random() * arr.length)])
        }
    }
}
//修改文字
textBtn.addEventListener('click', function () {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    filterContent()
    draw(dataBackup);
})
//清除内容
textDeleteBtn.addEventListener('click', function () {
    for (let i = 0; i < 6; i++)
        wheelTexts[i].value = ''
})
//预设选项
//点击切换大转盘内容
function changeContent(content) {
    draw(content);
    content.forEach((item, index) => {
        wheelTexts[index].value = item
    })

}
// 点击出现输入框，输入主题名字 
saveCustom.addEventListener("click", function () {
    titleAlert.style.display = "flex";
    shadow.style.display = "block";
})
// 点击取消
unsaveTitle.addEventListener("click", function () {
    titleAlert.style.display = "none";
    shadow.style.display = "none";
    inputTitle.value = ""
})
var customItem = []

// 更新
function updateCustom() {
    customBox.innerHTML = ""
    dbData = utools.db.allDocs()
    for (i of dbData) {
        customBox.innerHTML += "<div class='customItem'>" + i._id + "<i class='delBtn iconfont icon-quxiao'></i></div>"
    }
    delBtn = document.querySelectorAll(".delBtn")
    customItem = document.querySelectorAll(".customItem");
    customItem.forEach((item, index) => {
        item.addEventListener('click', function () {
            changeContent(dbData[index].value)
        })
    })
    deleteCustom()
}
//点击保存预设名字
saveTitle.addEventListener("click", function () {
    customTitleName = inputTitle.value;
    let objLengths = 0;
    for (i of dbData) {
        objLengths++
    }
    if (utools.dbStorage.getItem(customTitleName) || customTitleName === '') {
        return
    }
    else if (objLengths > 7) {
        return
    }
    else {
        customBox.innerHTML = ''
        filterContent()
        utools.dbStorage.setItem(customTitleName, dataBackup)
        // 保存完毕后，将此标题放到预设框中显示出来
        updateCustom()
    }
    titleAlert.style.display = "none";
    shadow.style.display = "none";
    inputTitle.value = ""
})


// 删除
function deleteCustom() {
    delBtn.forEach((item, index) => {
        item.addEventListener("click", function () {
            utools.dbStorage.removeItem(customItem[index].innerText)
            updateCustom()
        })
    })



}
/* 大转盘end */




/* yes or no start */
const choicebtnTwo = document.querySelector('.choicebtnTwo');
const yesResult = document.querySelector('.yesResult');
const noResult = document.querySelector('.noResult');
choicebtnTwo.addEventListener('click', function () {
    var random = Math.floor(Math.random() * 2)
    if (random === 1) {
        yesResult.style.display = "block"
        noResult.style.display = "none"
    }
    else {
        yesResult.style.display = "none"
        noResult.style.display = "block"
    }
})
/* yes or no end */




/* 抽卡 start */
const toShowCardName = document.querySelector('.toShowCardName');
const cardNum = document.querySelector('.cardNum');
const cardInputBox = document.querySelector('.cardInputBox');
const toShowCardbtn = document.querySelector('.toShowCardbtn');
const cardBox = document.querySelector('.cardBox');
let anwserText = [], cardSun = [], card = [], anwser = [];
// 打乱数组工具
function shuffle(arr) {
    var l = arr.length
    var index, temp
    while (l > 0) {
        index = Math.floor(Math.random() * l)
        temp = arr[l - 1]
        arr[l - 1] = arr[index]
        arr[index] = temp
        l--
    }
    return arr
}
//点击后输入卡牌的内容
toShowCardName.addEventListener('click', function () {
    //当输入数字符合要求时：
    if (cardNum.value > 1 && cardNum.value < 21) {
        cardInputBox.innerHTML = '';
        //出现多个输入框
        for (let i = 0; i < cardNum.value; i++) {
            var str = "<input class='anwserText' placeholder='输入卡牌背面内容' maxlength='30'/>"
            cardInputBox.innerHTML += str
        }
        toShowCardbtn.style.display = "block"
        cardInputBox.style.display = "flex"
    }
})
// 点击后显示卡片
toShowCardbtn.addEventListener('click', function () {
    // 获取到输入框的内容，并打乱这个数组
    anwserText = [];
    cardBox.innerHTML = ''
    document.querySelectorAll('.anwserText').forEach(item => {
        anwserText.push(item.value);
    });
    anwserText = shuffle(anwserText)
    // 把内容放入卡牌的背面
    for (let i = 0; i < cardNum.value; i++) {
        var str = '<div class="card"><div class="cardSun" >&#127137;</div><div class="anwser">' + anwserText[i] + '</div></div >'
        cardBox.innerHTML += str
    }
    // 点击卡牌，显示背面内容
    cardSun = document.querySelectorAll('.cardSun');
    card = document.querySelectorAll('.card');
    anwser = document.querySelectorAll('.anwser');
    card.forEach((item, index) => {
        item.addEventListener('click', function () {
            cardSun[index].style.display = "none"
            anwser[index].style.display = "block"
        })
    });

})
/* 抽卡 end */
