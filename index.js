const fortuneWheel = document.querySelector(".fortuneWheel");
const twoChoice = document.querySelector(".twoChoice");
const playPoker = document.querySelector(".playPoker");

const wheelBody = document.querySelector('.wheelBody');
const twoBody = document.querySelector('.twoBody');
const pokerBody = document.querySelector('.pokerBody');
const promptBox = document.querySelector(".prompt")
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



const canvas = document.getElementById('tutorial');
const btn = document.getElementById('btn');
const customBox = document.querySelector(".customBox");

const inputTitle = document.querySelector(".inputTitle");
const saveTitle = document.querySelector(".saveTitle");
const unsaveTitle = document.querySelector(".unsaveTitle");
const titleAlert = document.querySelector(".titleAlert")
const shadow = document.querySelector(".shadow")
const inputWheel = document.querySelector(".inputWheel")
const optionBox = document.querySelector(".optionBox")
const btnShowOption = document.querySelector(".btnShowOption")
var rotateTimes = 1;
var saveRandom = 0;
var flag = false;
var dataBackup = [];
var customTitleName = '';
var dbData = {};
var delBtn = []
var wheelTexts, optionNum
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

    }
}
)
var btnsHtml = '<li class="textBtn"><span class="iconfont icon-check_circled"></span>确&nbsp;&nbsp;定</li><li class="textDeleteBtn" > <span class="iconfont icon-quxiao"></span>清&nbsp;&nbsp;除</li ><li class="saveCustom">保&nbsp;存&nbsp;自&nbsp;定&nbsp;义</li>'
// 点击确定出现一堆输入框，输入选项内容
btnShowOption.addEventListener('click', function () {

    optionNum = inputWheel.value;
    if (optionNum <= 18 && optionNum >= 2) { addOptionItem() }
    

})
// 添加选项，并添加事件
function addOptionItem(){
    
        optionBox.innerHTML = btnsHtml
        for (let i = 0; i < optionNum; i++) {
            optionBox.innerHTML = '<li><span class="iconfont icon-daohangquanzi"></span><input type="text" class="wheelText" placeholder = "写点什么.." ></li >' + optionBox.innerHTML
        };
        wheelTexts = document.querySelectorAll('.wheelText');
        //生成画布
        var textBtn = document.querySelector('.textBtn');
        textBtn.addEventListener('click', function () {
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            filterContent(wheelTexts.length)
            draw(dataBackup);
        })
        //清除内容
        var textDeleteBtn = document.querySelector('.textDeleteBtn');
        textDeleteBtn.addEventListener('click', function () {
            for (let i = 0; i < optionNum; i++)
                wheelTexts[i].value = ''
        })
        var saveCustom = document.querySelector(".saveCustom");
        // 点击出现输入框，输入主题名字 
        saveCustom.addEventListener("click", function () {
            titleAlert.style.display = "flex";
            shadow.style.display = "block";
        })


   
}
// 筛选传入的文字
function filterContent(num) {
    var moreLength = 0
    var data = []
    var spaceItem = 0
    dataBackup = [];
    wheelTexts.forEach((item) => {
        data.push(item.value)
    })
    data.forEach((item) => {
        if (item.trim() === '') {
            spaceItem++;

        } else {
            dataBackup.push(item)
            moreLength = data.length - dataBackup.length

        }
    })
    // 如果全部都没写
    if (spaceItem===num) {
        for (let i = 0; i < optionNum; i++) { dataBackup.push(' ') }
    }
    // 当有部分内容未填写时，随机填写
    else if (moreLength > 0) {
        let arr = [...dataBackup]
        for (let addIndex = moreLength - 1; addIndex >= 0; addIndex--) {
            dataBackup.push(arr[Math.floor(Math.random() * arr.length)])
        }
    }
}

//扇形
function draw(text) {
    const length = 400
    const radius = length / 2
    const PI2 = Math.PI * 2
    const num = text.length;
    var canvas = document.getElementById('tutorial');
    //防止文字溢出
    function getTextList(ctx, text, maxLineWidth) {
        // words是把文字分开
        var words = text.split('');
        var tempLine = '';
        var list = [];
        // 一个字一个字的进行循环
        for (let i = 0; i < words.length; i++) {
            // 第一步：测量空字符串的宽度，如果大于你传入的最大字符串宽度的话，当然不可能，去看第二步
            // 第三步：加到xxx时，长度大于你传入的长度了，进入if
            if (ctx.measureText(tempLine).width >= maxLineWidth) {
                // 第四步：在空数组中，追加tempLine（此时是一串字符串）
                list.push(tempLine);
                // 第五步：重新设定传入的maxLineWidth，它减去最原始的第一个字符的宽度
                maxLineWidth -= ctx.measureText(text[0]).width;
                tempLine = ''
            }
            // 第二步：templine字符串加入第一个字，去看第三步
            // 第六步：一直到最后一个字符，全部结束后，跳出if，此时得到了一个数组（list）和一个字符串（tempLine）
            tempLine += words[i]
        }
        // 在数组中追加字符串tempLine，得到了一个数组，里面存放着分完行的字符串
        list.push(tempLine);
        return list
    }
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        //计算每个奖项所占角度数
        var baseAngle = PI2 / num;
        // 一行文字的最大长度
        var textMaxWidth = 0;
        // 文字的位置（半径）
        var textRadius = 150;
        var colorBox = ['#0078fc', '#e3f1fe', '#a2c5ea']
        ctx.save();
        for (var index = 0; index < num; index++) {
            var angle = index * baseAngle;
            if (num % 2 === 1) {
                if ((index + 1) % 2 != 0) {
                    ctx.fillStyle = colorBox[0];//设置每个扇形区域的颜色

                } else {
                    ctx.fillStyle = colorBox[1];//设置每个扇形区域的颜色

                }
                if (num === index + 1) {

                    ctx.fillStyle = colorBox[2];//设置每个扇形区域的颜色
                }
            } else {
                if ((index + 1) % 2 === 0) {

                    ctx.fillStyle = colorBox[0];//设置每个扇形区域的颜色
                } else {
                    ctx.fillStyle = colorBox[1];//设置每个扇形区域的颜色

                }
            }
            ctx.beginPath();//开始绘制

            ctx.moveTo(radius, radius)
            ctx.arc(radius, radius, 157, angle, angle + baseAngle);
            ctx.fill();//填充颜色
            ctx.save();//保存当前环境的状态
            ctx.beginPath();
            ctx.fillStyle = '#000';
            ctx.font = '18px Microsoft YaHei';
            // 文字换行长度
            if (num < 5) {
                textMaxWidth = 120
                textRadius = 135
            } else if (num >= 5 && num < 8) {
                textMaxWidth = 90
            } else if (num >= 8 && num < 12) {
                textMaxWidth = 65
            } else {
                ctx.font = '16px Microsoft YaHei';
                textMaxWidth = 50
            }
            // 改变原点
            ctx.translate(
                radius + Math.cos(angle + baseAngle / 2) * textRadius,
                radius + Math.sin(angle + baseAngle / 2) * textRadius
            );
            // 旋转角度
            ctx.rotate(angle + baseAngle / 2 + Math.PI / 2);
            // 文字
            getTextList(ctx, text[index], textMaxWidth).forEach((line, i) => {
                ctx.fillText(line, -ctx.measureText(line).width / 2, ++i * 25)
            });
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
//预设选项
//点击切换大转盘内容
function changeContent(content) {
    draw(content);
    optionNum = content.length
    addOptionItem()
    for(let i =0 ;i<optionNum;i++){
        wheelTexts[i].value = content[i]

    }

}

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
// 点击取消
unsaveTitle.addEventListener("click", function () {
    titleAlert.style.display = "none";
    shadow.style.display = "none";
    inputTitle.value = ""
})
//点击保存预设名字
saveTitle.addEventListener("click", function () {
    customTitleName = inputTitle.value;
    let objLengths = 0;
    for (i of dbData) {
        objLengths++
    }
    if (objLengths > 7) {
        promptMessage("已经有八个预设了，如需新增，请删除不需要的。");
        return
    }
    else if (utools.dbStorage.getItem(customTitleName) || customTitleName === '') {
        promptMessage("名字不可重复，也不可为空。");
        return
    }
    else {
        customBox.innerHTML = ''
        filterContent(wheelTexts.length)
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
// 提示
var promotFlag = 0;
function promptMessage(message) {
    if (promotFlag === 0) {
        promptBox.style.display = "inline-block"
        promptBox.innerHTML = message
        promotFlag = 1

        setTimeout(() => {
            promptBox.style.display = "none"
            promotFlag = 0
        }, 2000)
    }
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

