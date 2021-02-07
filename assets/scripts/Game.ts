// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
// 主逻辑脚本，之后还会添加计分、游戏失败和重新开始的相关逻辑

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Prefab)
    starPrefab: cc.Prefab = null; // 这个属性引用了星星预制资源

    // 星星产生后消失时间的随机范围
    @property
    maxStarDuration: number = 0;
    @property
    minStarDuration: number = 0;

    @property(cc.Node)
    ground: cc.Node = null; // 地面节点，用于确定星星生成的高度

    @property(cc.Node)
    player: cc.Node = null; // Player 节点，用于获取主角弹跳的高度，和控制主角行动开关

    @property(cc.Label)
    scoreDisplay: cc.Label = null; // score label 的引用

    @property(cc.AudioClip)
    scoreAudio: cc.AudioClip = null; // 得分音效资源

    groundY: number = 0;
    score: number = 0;
    timer: number = 0;
    startDuration: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 获取地平面的 y 轴坐标
        // 节点下的 y 属性对应的是锚点所在的 y 坐标，因为锚点默认在节点的中心，所以需要加上地面高度的一半才是地面的 y 坐标
        this.groundY = this.ground.y + this.ground.height / 2;

        // 初始化定时器
        this.timer = 0;
        // 生成一个新的星星
        this.spawnNewStar();
    }

    start () {

    }

    update (dt: number) {
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 判定游戏失败
        if (this.timer > this.startDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    }


    spawnNewStar () {
        // 使用给定的模版在场景中生成一个新节点
        // instantiate() 用于克隆指定的任意类型的对象，或者从 Prefab 实例化出新节点。返回值为 Node 或者 Object
        const newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        // 设置节点在父节点坐标系中的位置
        newStar.setPosition(this.getNewStarPosition());
        // 在星星脚本组件上保存 Game 对象的引用
        newStar.getComponent('Star').game = this;

        // 重置定时器，根据消失时间范围随机取一个值
        this.startDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    }

    getNewStarPosition (): cc.Vec2 {
        let randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        // 通过 Node 下的 getComponent() 可以得到该节点上挂载的组件引用
        const randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星的 x 坐标
        const maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;

        return cc.v2(randX, randY);
    }

    gainScore () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score;

        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    }

    gameOver () {
        // 停止 Player 节点的跳跃动作
        this.player.stopAllActions();

        // 重新加载场景 game
        // cc.director 是一个管理游戏逻辑流程的单例对象
        cc.director.loadScene('game');
    }
}
