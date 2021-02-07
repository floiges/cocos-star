"use strict";
cc._RF.push(module, '61a93mGGcNCJ5cluiSIXhDq', 'Game');
// scripts/Game.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
// 主逻辑脚本，之后还会添加计分、游戏失败和重新开始的相关逻辑
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.starPrefab = null; // 这个属性引用了星星预制资源
        // 星星产生后消失时间的随机范围
        _this.maxStarDuration = 0;
        _this.minStarDuration = 0;
        _this.ground = null; // 地面节点，用于确定星星生成的高度
        _this.player = null; // Player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        _this.scoreDisplay = null; // score label 的引用
        _this.scoreAudio = null; // 得分音效资源
        _this.groundY = 0;
        _this.score = 0;
        _this.timer = 0;
        _this.startDuration = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    Game.prototype.onLoad = function () {
        // 获取地平面的 y 轴坐标
        // 节点下的 y 属性对应的是锚点所在的 y 坐标，因为锚点默认在节点的中心，所以需要加上地面高度的一半才是地面的 y 坐标
        this.groundY = this.ground.y + this.ground.height / 2;
        // 初始化定时器
        this.timer = 0;
        // 生成一个新的星星
        this.spawnNewStar();
    };
    Game.prototype.start = function () {
    };
    Game.prototype.update = function (dt) {
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 判定游戏失败
        if (this.timer > this.startDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    };
    Game.prototype.spawnNewStar = function () {
        // 使用给定的模版在场景中生成一个新节点
        // instantiate() 用于克隆指定的任意类型的对象，或者从 Prefab 实例化出新节点。返回值为 Node 或者 Object
        var newStar = cc.instantiate(this.starPrefab);
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
    };
    Game.prototype.getNewStarPosition = function () {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        // 通过 Node 下的 getComponent() 可以得到该节点上挂载的组件引用
        var randY = this.groundY + Math.random() * this.player.getComponent('Player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星的 x 坐标
        var maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, randY);
    };
    Game.prototype.gainScore = function () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score;
        // 播放得分音效
        cc.audioEngine.playEffect(this.scoreAudio, false);
    };
    Game.prototype.gameOver = function () {
        // 停止 Player 节点的跳跃动作
        this.player.stopAllActions();
        // 重新加载场景 game
        // cc.director 是一个管理游戏逻辑流程的单例对象
        cc.director.loadScene('game');
    };
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "starPrefab", void 0);
    __decorate([
        property
    ], Game.prototype, "maxStarDuration", void 0);
    __decorate([
        property
    ], Game.prototype, "minStarDuration", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "ground", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "player", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "scoreDisplay", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Game.prototype, "scoreAudio", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();