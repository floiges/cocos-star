
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/scripts/Game');
require('./assets/scripts/Player');
require('./assets/scripts/Star');

                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Player.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '21ca9/gsxRLFKqhj5ZZsmOe', 'Player');
// scripts/Player.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
// 对于需要重复生成的节点，我们可以将它保存成 Prefab（预制） 资源，作为我们动态生成节点时使用的模板。
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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        // Cocos Creator 规定一个节点具有的属性都需要写在 properties 代码块中，
        // 这些属性将规定主角的移动方式，在代码中我们不需要关心这些数值是多少，因为我们之后会直接在 属性检查器 中设置这些数值
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null; // 这里是 TypeScript 用来声明变量类型的写法，冒号后面是属性类型，等号后面是默认值
        _this.jumpHeight = 0; // 主角跳跃高度
        _this.jumpDuration = 0; // 主角跳跃持续时间
        _this.squashDuration = 0.1; // 辅助形变动作时间
        _this.maxMoveSpeed = 0; // 最大移动速度
        _this.accel = 0; // 加速度
        _this.jumpAudio = null; // 跳跃音效资源
        _this.jumpAction = null;
        // 加速度方向开关
        _this.accLeft = false;
        _this.accRight = false;
        _this.xSpeed = 0; // 主角当前水平方向速度
        // screen boundaries
        _this.minPosX = 0;
        _this.maxPosX = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // 在场景加载后立刻执行，所以初始化相关的操作和逻辑都会放在这里面
    Player.prototype.onLoad = function () {
        this.minPosX = -this.node.parent.width / 2;
        this.maxPosX = this.node.parent.width / 2;
        this.jumpAction = this.runJumpAction();
        cc.tween(this.node).then(this.jumpAction).start();
        this.setInputControl();
    };
    Player.prototype.start = function () {
    };
    // update 会在场景加载后每帧调用一次，我们一般把需要经常计算或及时更新的逻辑内容放在 update 中
    Player.prototype.update = function (dt) {
        // 根据当前加速度方向，每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        }
        else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;
        // limit player position inside screen
        if (this.node.x >= this.maxPosX) {
            this.node.x = this.maxPosX;
            this.xSpeed = 0;
        }
        else if (this.node.x < this.minPosX) {
            this.node.x = this.minPosX;
            this.xSpeed = 0;
        }
    };
    Player.prototype.onDestroy = function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    Player.prototype.runJumpAction = function () {
        // 这里涉及到了 缓动（cc.tween）系统，在 Cocos Creator 中，cc.tween 可以对任何对象进行操作，并且可以对对象的 任意属性 进行缓动
        // 跳跃上升
        var jumpUp = cc.tween().by(this.jumpDuration, { y: this.jumpHeight }, { easing: 'sineOut' });
        // 下落
        var jumpDown = cc.tween().by(this.jumpDuration, { y: -this.jumpHeight }, { easing: 'sineIn' });
        // 形变
        var squash = cc.tween().to(this.squashDuration, { scaleX: 1, scaleY: 0.6 });
        var stretch = cc.tween().to(this.squashDuration, { scaleX: 1, scaleY: 1.2 });
        var scaleBack = cc.tween().to(this.squashDuration, { scaleX: 1, scaleY: 1 });
        // 创建一个缓动，按 jumpUp、jumpDown 的顺序执行动作
        var tween = cc.tween()
            .sequence(squash, stretch, jumpUp, scaleBack, jumpDown)
            .call(this.playJumpSound, this); // 添加一个回调函数，在前面的动作都结束时调用我们定义的 playJumpSound() 方法
        // 重复
        return cc.tween().repeatForever(tween);
    };
    Player.prototype.setInputControl = function () {
        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // touch input
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnded, this);
    };
    Player.prototype.onKeyDown = function (event) {
        // set a flag when key pressed
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.accLeft = true;
                this.accRight = false;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.accRight = true;
                this.accLeft = false;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.accRight = false;
                break;
        }
    };
    Player.prototype.onTouchBegan = function (event) {
        var touchLoc = event.getLocation();
        if (touchLoc.x >= cc.winSize.width / 2) {
            this.accLeft = false;
            this.accRight = true;
        }
        else {
            this.accLeft = true;
            this.accRight = false;
        }
        // do not capture the event
        return true;
    };
    Player.prototype.onTouchEnded = function (event) {
        this.accLeft = false;
        this.accRight = false;
    };
    Player.prototype.playJumpSound = function () {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.jumpAudio, false);
    };
    __decorate([
        property(cc.Label) // 使用 property 装饰器声明属性，括号里是属性类型，装饰器里的类型声明主要用于编辑器展示
    ], Player.prototype, "label", void 0);
    __decorate([
        property
    ], Player.prototype, "jumpHeight", void 0);
    __decorate([
        property
    ], Player.prototype, "jumpDuration", void 0);
    __decorate([
        property
    ], Player.prototype, "squashDuration", void 0);
    __decorate([
        property
    ], Player.prototype, "maxMoveSpeed", void 0);
    __decorate([
        property
    ], Player.prototype, "accel", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Player.prototype, "jumpAudio", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1BsYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7QUFDbEYsd0RBQXdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEQsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBb0MsMEJBQVk7SUFBaEQ7UUFFSSxrREFBa0Q7UUFDbEQsNkRBQTZEO1FBSGpFLHFFQXlLQztRQW5LRyxXQUFLLEdBQWEsSUFBSSxDQUFDLENBQUMsZ0RBQWdEO1FBR3hFLGdCQUFVLEdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUdqQyxrQkFBWSxHQUFXLENBQUMsQ0FBQyxDQUFDLFdBQVc7UUFHckMsb0JBQWMsR0FBVyxHQUFHLENBQUMsQ0FBQyxXQUFXO1FBR3pDLGtCQUFZLEdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUztRQUduQyxXQUFLLEdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTTtRQUd6QixlQUFTLEdBQWlCLElBQUksQ0FBQyxDQUFDLFNBQVM7UUFFekMsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFFNUIsVUFBVTtRQUNWLGFBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsY0FBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixZQUFNLEdBQVcsQ0FBQyxDQUFDLENBQUMsYUFBYTtRQUVqQyxvQkFBb0I7UUFDcEIsYUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixhQUFPLEdBQVcsQ0FBQyxDQUFDOztJQXNJeEIsQ0FBQztJQW5JRyx3QkFBd0I7SUFFeEIsa0NBQWtDO0lBQ2xDLHVCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdkMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVsRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELHNCQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQsd0RBQXdEO0lBQ3hELHVCQUFNLEdBQU4sVUFBUSxFQUFVO1FBQ2QsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDbEM7YUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDdEIsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNsQztRQUVELGlCQUFpQjtRQUNqQixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDM0MsNkRBQTZEO1lBQzdELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pFO1FBRUQsZ0JBQWdCO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBRWhDLHNDQUFzQztRQUN0QyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNuQjthQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ25CO0lBQ0wsQ0FBQztJQUVELDBCQUFTLEdBQVQ7UUFDSSxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RSxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsOEJBQWEsR0FBYjtRQUNJLGtGQUFrRjtRQUNsRixPQUFPO1FBQ1AsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQy9GLEtBQUs7UUFDTCxJQUFNLFFBQVEsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUVqRyxLQUFLO1FBQ0wsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM5RSxJQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQy9FLElBQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFL0UsbUNBQW1DO1FBQ25DLElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUU7YUFDbkIsUUFBUSxDQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUM7YUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxnREFBZ0Q7UUFDckYsS0FBSztRQUNMLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsZ0NBQWUsR0FBZjtRQUNJLFlBQVk7UUFDWixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RSxjQUFjO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsMEJBQVMsR0FBVCxVQUFXLEtBQTZCO1FBQ3BDLDhCQUE4QjtRQUM5QixRQUFRLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDbkIsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEIsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJO2dCQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLE1BQU07WUFDVixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNwQixLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUs7Z0JBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDckIsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQUVELHdCQUFPLEdBQVAsVUFBUyxLQUE2QjtRQUNsQyxRQUFRLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDbkIsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEIsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJO2dCQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDckIsTUFBTTtZQUNWLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSztnQkFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLE1BQU07U0FDYjtJQUNMLENBQUM7SUFFRCw2QkFBWSxHQUFaLFVBQWMsS0FBMEI7UUFDcEMsSUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLElBQUksUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7YUFBTTtZQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO1FBQ0QsMkJBQTJCO1FBQzNCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCw2QkFBWSxHQUFaLFVBQWMsS0FBMEI7UUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVELDhCQUFhLEdBQWI7UUFDSSxhQUFhO1FBQ2IsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBaktEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxrREFBa0Q7eUNBQy9DO0lBR3ZCO1FBREMsUUFBUTs4Q0FDYztJQUd2QjtRQURDLFFBQVE7Z0RBQ2dCO0lBR3pCO1FBREMsUUFBUTtrREFDb0I7SUFHN0I7UUFEQyxRQUFRO2dEQUNnQjtJQUd6QjtRQURDLFFBQVE7eUNBQ1M7SUFHbEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQzs2Q0FDUTtJQXhCZCxNQUFNO1FBRDFCLE9BQU87T0FDYSxNQUFNLENBeUsxQjtJQUFELGFBQUM7Q0F6S0QsQUF5S0MsQ0F6S21DLEVBQUUsQ0FBQyxTQUFTLEdBeUsvQztrQkF6S29CLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vIOWvueS6jumcgOimgemHjeWkjeeUn+aIkOeahOiKgueCue+8jOaIkeS7rOWPr+S7peWwhuWug+S/neWtmOaIkCBQcmVmYWLvvIjpooTliLbvvIkg6LWE5rqQ77yM5L2c5Li65oiR5Lus5Yqo5oCB55Sf5oiQ6IqC54K55pe25L2/55So55qE5qih5p2/44CCXG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxheWVyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIC8vIENvY29zIENyZWF0b3Ig6KeE5a6a5LiA5Liq6IqC54K55YW35pyJ55qE5bGe5oCn6YO96ZyA6KaB5YaZ5ZyoIHByb3BlcnRpZXMg5Luj56CB5Z2X5Lit77yMXG4gICAgLy8g6L+Z5Lqb5bGe5oCn5bCG6KeE5a6a5Li76KeS55qE56e75Yqo5pa55byP77yM5Zyo5Luj56CB5Lit5oiR5Lus5LiN6ZyA6KaB5YWz5b+D6L+Z5Lqb5pWw5YC85piv5aSa5bCR77yM5Zug5Li65oiR5Lus5LmL5ZCO5Lya55u05o6l5ZyoIOWxnuaAp+ajgOafpeWZqCDkuK3orr7nva7ov5nkupvmlbDlgLxcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbCkgLy8g5L2/55SoIHByb3BlcnR5IOijhemlsOWZqOWjsOaYjuWxnuaAp++8jOaLrOWPt+mHjOaYr+WxnuaAp+exu+Wei++8jOijhemlsOWZqOmHjOeahOexu+Wei+WjsOaYjuS4u+imgeeUqOS6jue8lui+keWZqOWxleekulxuICAgIGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7IC8vIOi/memHjOaYryBUeXBlU2NyaXB0IOeUqOadpeWjsOaYjuWPmOmHj+exu+Wei+eahOWGmeazle+8jOWGkuWPt+WQjumdouaYr+WxnuaAp+exu+Wei++8jOetieWPt+WQjumdouaYr+m7mOiupOWAvFxuXG4gICAgQHByb3BlcnR5XG4gICAganVtcEhlaWdodDogbnVtYmVyID0gMDsgLy8g5Li76KeS6Lez6LeD6auY5bqmXG5cbiAgICBAcHJvcGVydHlcbiAgICBqdW1wRHVyYXRpb246IG51bWJlciA9IDA7IC8vIOS4u+inkui3s+i3g+aMgee7reaXtumXtFxuXG4gICAgQHByb3BlcnR5XG4gICAgc3F1YXNoRHVyYXRpb246IG51bWJlciA9IDAuMTsgLy8g6L6F5Yqp5b2i5Y+Y5Yqo5L2c5pe26Ze0XG5cbiAgICBAcHJvcGVydHlcbiAgICBtYXhNb3ZlU3BlZWQ6IG51bWJlciA9IDA7IC8vIOacgOWkp+enu+WKqOmAn+W6plxuXG4gICAgQHByb3BlcnR5XG4gICAgYWNjZWw6IG51bWJlciA9IDA7IC8vIOWKoOmAn+W6plxuXG4gICAgQHByb3BlcnR5KGNjLkF1ZGlvQ2xpcClcbiAgICBqdW1wQXVkaW86IGNjLkF1ZGlvQ2xpcCA9IG51bGw7IC8vIOi3s+i3g+mfs+aViOi1hOa6kFxuXG4gICAganVtcEFjdGlvbjogY2MuVHdlZW4gPSBudWxsO1xuXG4gICAgLy8g5Yqg6YCf5bqm5pa55ZCR5byA5YWzXG4gICAgYWNjTGVmdDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGFjY1JpZ2h0OiBib29sZWFuID0gZmFsc2U7XG4gICAgeFNwZWVkOiBudW1iZXIgPSAwOyAvLyDkuLvop5LlvZPliY3msLTlubPmlrnlkJHpgJ/luqZcblxuICAgIC8vIHNjcmVlbiBib3VuZGFyaWVzXG4gICAgbWluUG9zWDogbnVtYmVyID0gMDtcbiAgICBtYXhQb3NYOiBudW1iZXIgPSAwO1xuXG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIOWcqOWcuuaZr+WKoOi9veWQjueri+WIu+aJp+ihjO+8jOaJgOS7peWIneWni+WMluebuOWFs+eahOaTjeS9nOWSjOmAu+i+kemDveS8muaUvuWcqOi/memHjOmdolxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMubWluUG9zWCA9IC10aGlzLm5vZGUucGFyZW50LndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy5tYXhQb3NYID0gdGhpcy5ub2RlLnBhcmVudC53aWR0aCAvIDI7XG5cbiAgICAgICAgdGhpcy5qdW1wQWN0aW9uID0gdGhpcy5ydW5KdW1wQWN0aW9uKCk7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudGhlbih0aGlzLmp1bXBBY3Rpb24pLnN0YXJ0KCk7XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dENvbnRyb2woKTtcbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9XG5cbiAgICAvLyB1cGRhdGUg5Lya5Zyo5Zy65pmv5Yqg6L295ZCO5q+P5bin6LCD55So5LiA5qyh77yM5oiR5Lus5LiA6Iis5oqK6ZyA6KaB57uP5bi46K6h566X5oiW5Y+K5pe25pu05paw55qE6YC76L6R5YaF5a655pS+5ZyoIHVwZGF0ZSDkuK1cbiAgICB1cGRhdGUgKGR0OiBudW1iZXIpIHtcbiAgICAgICAgLy8g5qC55o2u5b2T5YmN5Yqg6YCf5bqm5pa55ZCR77yM5q+P5bin5pu05paw6YCf5bqmXG4gICAgICAgIGlmICh0aGlzLmFjY0xlZnQpIHtcbiAgICAgICAgICAgIHRoaXMueFNwZWVkIC09IHRoaXMuYWNjZWwgKiBkdDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmFjY1JpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnhTcGVlZCArPSB0aGlzLmFjY2VsICogZHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDpmZDliLbkuLvop5LnmoTpgJ/luqbkuI3og73otoXov4fmnIDlpKflgLxcbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMueFNwZWVkKSA+IHRoaXMubWF4TW92ZVNwZWVkKSB7XG4gICAgICAgICAgICAvLyBpZiBzcGVlZCByZWFjaCBsaW1pdCwgdXNlIG1heCBzcGVlZCB3aXRoIGN1cnJlbnQgZGlyZWN0aW9uXG4gICAgICAgICAgICB0aGlzLnhTcGVlZCA9IHRoaXMubWF4TW92ZVNwZWVkICogdGhpcy54U3BlZWQgLyBNYXRoLmFicyh0aGlzLnhTcGVlZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyDmoLnmja7lvZPliY3pgJ/luqbmm7TmlrDkuLvop5LnmoTkvY3nva5cbiAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy54U3BlZWQgKiBkdDtcblxuICAgICAgICAvLyBsaW1pdCBwbGF5ZXIgcG9zaXRpb24gaW5zaWRlIHNjcmVlblxuICAgICAgICBpZiAodGhpcy5ub2RlLnggPj0gdGhpcy5tYXhQb3NYKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUueCA9IHRoaXMubWF4UG9zWDtcbiAgICAgICAgICAgIHRoaXMueFNwZWVkID0gMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm5vZGUueCA8IHRoaXMubWluUG9zWCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLnggPSB0aGlzLm1pblBvc1g7XG4gICAgICAgICAgICB0aGlzLnhTcGVlZCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRlc3Ryb3kgKCkge1xuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcyk7XG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuS0VZX1VQLCB0aGlzLm9uS2V5VXAsIHRoaXMpO1xuICAgIH1cblxuICAgIHJ1bkp1bXBBY3Rpb24gKCkge1xuICAgICAgICAvLyDov5nph4zmtonlj4rliLDkuoYg57yT5Yqo77yIY2MudHdlZW7vvInns7vnu5/vvIzlnKggQ29jb3MgQ3JlYXRvciDkuK3vvIxjYy50d2VlbiDlj6/ku6Xlr7nku7vkvZXlr7nosaHov5vooYzmk43kvZzvvIzlubbkuJTlj6/ku6Xlr7nlr7nosaHnmoQg5Lu75oSP5bGe5oCnIOi/m+ihjOe8k+WKqFxuICAgICAgICAvLyDot7Pot4PkuIrljYdcbiAgICAgICAgY29uc3QganVtcFVwID0gY2MudHdlZW4oKS5ieSh0aGlzLmp1bXBEdXJhdGlvbiwgeyB5OiB0aGlzLmp1bXBIZWlnaHQgfSwgeyBlYXNpbmc6ICdzaW5lT3V0JyB9KTtcbiAgICAgICAgLy8g5LiL6JC9XG4gICAgICAgIGNvbnN0IGp1bXBEb3duID0gY2MudHdlZW4oKS5ieSh0aGlzLmp1bXBEdXJhdGlvbiwgeyB5OiAtdGhpcy5qdW1wSGVpZ2h0IH0sIHsgZWFzaW5nOiAnc2luZUluJyB9KTtcblxuICAgICAgICAvLyDlvaLlj5hcbiAgICAgICAgY29uc3Qgc3F1YXNoID0gY2MudHdlZW4oKS50byh0aGlzLnNxdWFzaER1cmF0aW9uLCB7IHNjYWxlWDogMSwgc2NhbGVZOiAwLjYgfSk7XG4gICAgICAgIGNvbnN0IHN0cmV0Y2ggPSBjYy50d2VlbigpLnRvKHRoaXMuc3F1YXNoRHVyYXRpb24sIHsgc2NhbGVYOiAxLCBzY2FsZVk6IDEuMiB9KTtcbiAgICAgICAgY29uc3Qgc2NhbGVCYWNrID0gY2MudHdlZW4oKS50byh0aGlzLnNxdWFzaER1cmF0aW9uLCB7IHNjYWxlWDogMSwgc2NhbGVZOiAxIH0pO1xuXG4gICAgICAgIC8vIOWIm+W7uuS4gOS4que8k+WKqO+8jOaMiSBqdW1wVXDjgIFqdW1wRG93biDnmoTpobrluo/miafooYzliqjkvZxcbiAgICAgICAgY29uc3QgdHdlZW4gPSBjYy50d2VlbigpXG4gICAgICAgICAgICAuc2VxdWVuY2Uoc3F1YXNoLHN0cmV0Y2gsIGp1bXBVcCwgc2NhbGVCYWNrLCBqdW1wRG93bilcbiAgICAgICAgICAgIC5jYWxsKHRoaXMucGxheUp1bXBTb3VuZCwgdGhpcyk7IC8vIOa3u+WKoOS4gOS4quWbnuiwg+WHveaVsO+8jOWcqOWJjemdoueahOWKqOS9nOmDvee7k+adn+aXtuiwg+eUqOaIkeS7rOWumuS5ieeahCBwbGF5SnVtcFNvdW5kKCkg5pa55rOVXG4gICAgICAgIC8vIOmHjeWkjVxuICAgICAgICByZXR1cm4gY2MudHdlZW4oKS5yZXBlYXRGb3JldmVyKHR3ZWVuKTtcbiAgICB9XG5cbiAgICBzZXRJbnB1dENvbnRyb2wgKCkge1xuICAgICAgICAvLyDliJ3lp4vljJbplK7nm5jovpPlhaXnm5HlkKxcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLktFWV9ET1dOLCB0aGlzLm9uS2V5RG93biwgdGhpcyk7XG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5LRVlfVVAsIHRoaXMub25LZXlVcCwgdGhpcyk7XG4gICAgICAgIC8vIHRvdWNoIGlucHV0XG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnQub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaEJlZ2FuLCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudC5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZGVkLCB0aGlzKTtcbiAgICB9XG5cbiAgICBvbktleURvd24gKGV2ZW50OiBjYy5FdmVudC5FdmVudEtleWJvYXJkKSB7XG4gICAgICAgIC8vIHNldCBhIGZsYWcgd2hlbiBrZXkgcHJlc3NlZFxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmE6XG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5sZWZ0OlxuICAgICAgICAgICAgICAgIHRoaXMuYWNjTGVmdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5hY2NSaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkuZDpcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLnJpZ2h0OlxuICAgICAgICAgICAgICAgIHRoaXMuYWNjUmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYWNjTGVmdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlVcCAoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50S2V5Ym9hcmQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5hOlxuICAgICAgICAgICAgY2FzZSBjYy5tYWNyby5LRVkubGVmdDpcbiAgICAgICAgICAgICAgICB0aGlzLmFjY0xlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgY2MubWFjcm8uS0VZLmQ6XG4gICAgICAgICAgICBjYXNlIGNjLm1hY3JvLktFWS5yaWdodDpcbiAgICAgICAgICAgICAgICB0aGlzLmFjY1JpZ2h0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRvdWNoQmVnYW4gKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XG4gICAgICAgIGNvbnN0IHRvdWNoTG9jID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcbiAgICAgICAgaWYgKHRvdWNoTG9jLnggPj0gY2Mud2luU2l6ZS53aWR0aCAvIDIpIHtcbiAgICAgICAgICAgIHRoaXMuYWNjTGVmdCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5hY2NSaWdodCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFjY0xlZnQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5hY2NSaWdodCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRvIG5vdCBjYXB0dXJlIHRoZSBldmVudFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBvblRvdWNoRW5kZWQgKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSB7XG4gICAgICAgIHRoaXMuYWNjTGVmdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFjY1JpZ2h0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcGxheUp1bXBTb3VuZCAoKSB7XG4gICAgICAgIC8vIOiwg+eUqOWjsOmfs+W8leaTjuaSreaUvuWjsOmfs1xuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5RWZmZWN0KHRoaXMuanVtcEF1ZGlvLCBmYWxzZSk7XG4gICAgfVxuXG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Star.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cd8988ZyedBlJYPSVN4txdK', 'Star');
// scripts/Star.ts

"use strict";
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
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pickRadius = 0; // 星星和主角之间的距离小于这个数值时，就会完成收集
        _this.game = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Star.prototype.start = function () {
    };
    Star.prototype.update = function (dt) {
        // 每帧判断星星和主角之间的距离是否小于收集距离
        if (this.getPlayerDistance() < this.pickRadius) {
            // 收集星星
            this.onPicked();
            return;
        }
        // 根据 Game 脚本中的计时器更新星星的透明度
        var opacityRatio = 1 - this.game.timer / this.game.startDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    };
    Star.prototype.getPlayerDistance = function () {
        // 根据 Player 节点位置判断距离
        var playerPos = this.game.player.position;
        // 根据两点之间的位置计算距离
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    };
    Star.prototype.onPicked = function () {
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();
        // 调用 Game 脚本中的得分方法
        this.game.gainScore();
        // 销毁当前星星节点
        this.node.destroy();
    };
    __decorate([
        property
    ], Star.prototype, "pickRadius", void 0);
    Star = __decorate([
        ccclass
    ], Star);
    return Star;
}(cc.Component));
exports.default = Star;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1N0YXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7QUFFNUUsSUFBQSxLQUFzQixFQUFFLENBQUMsVUFBVSxFQUFsQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWlCLENBQUM7QUFHMUM7SUFBa0Msd0JBQVk7SUFBOUM7UUFBQSxxRUErQ0M7UUE1Q0csZ0JBQVUsR0FBVyxDQUFDLENBQUMsQ0FBQywyQkFBMkI7UUFFbkQsVUFBSSxHQUFTLElBQUksQ0FBQzs7SUEwQ3RCLENBQUM7SUF4Q0csd0JBQXdCO0lBRXhCLGVBQWU7SUFFZixvQkFBSyxHQUFMO0lBRUEsQ0FBQztJQUVELHFCQUFNLEdBQU4sVUFBUSxFQUFVO1FBQ2QseUJBQXlCO1FBQ3pCLElBQUksSUFBSSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUM1QyxPQUFPO1lBQ1AsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLE9BQU87U0FDVjtRQUVELDBCQUEwQjtRQUMxQixJQUFNLFlBQVksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDbkUsSUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxnQ0FBaUIsR0FBakI7UUFDSSxxQkFBcUI7UUFDckIsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQzVDLGdCQUFnQjtRQUNoQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELHVCQUFRLEdBQVI7UUFDSSxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV6QixtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUV0QixXQUFXO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBM0NEO1FBREMsUUFBUTs0Q0FDYztJQUhOLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0ErQ3hCO0lBQUQsV0FBQztDQS9DRCxBQStDQyxDQS9DaUMsRUFBRSxDQUFDLFNBQVMsR0ErQzdDO2tCQS9Db0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lIGZyb20gJy4vR2FtZSc7XG4vLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eVxuICAgIHBpY2tSYWRpdXM6IG51bWJlciA9IDA7IC8vIOaYn+aYn+WSjOS4u+inkuS5i+mXtOeahOi3neemu+Wwj+S6jui/meS4quaVsOWAvOaXtu+8jOWwseS8muWujOaIkOaUtumbhlxuXG4gICAgZ2FtZTogR2FtZSA9IG51bGw7XG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIC8vIG9uTG9hZCAoKSB7fVxuXG4gICAgc3RhcnQgKCkge1xuXG4gICAgfVxuXG4gICAgdXBkYXRlIChkdDogbnVtYmVyKSB7XG4gICAgICAgIC8vIOavj+W4p+WIpOaWreaYn+aYn+WSjOS4u+inkuS5i+mXtOeahOi3neemu+aYr+WQpuWwj+S6juaUtumbhui3neemu1xuICAgICAgICBpZiAodGhpcy5nZXRQbGF5ZXJEaXN0YW5jZSgpIDwgdGhpcy5waWNrUmFkaXVzKSB7XG4gICAgICAgICAgICAvLyDmlLbpm4bmmJ/mmJ9cbiAgICAgICAgICAgIHRoaXMub25QaWNrZWQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOagueaNriBHYW1lIOiEmuacrOS4reeahOiuoeaXtuWZqOabtOaWsOaYn+aYn+eahOmAj+aYjuW6plxuICAgICAgICBjb25zdCBvcGFjaXR5UmF0aW8gPSAxIC0gdGhpcy5nYW1lLnRpbWVyIC8gdGhpcy5nYW1lLnN0YXJ0RHVyYXRpb247XG4gICAgICAgIGNvbnN0IG1pbk9wYWNpdHkgPSA1MDtcbiAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSBtaW5PcGFjaXR5ICsgTWF0aC5mbG9vcihvcGFjaXR5UmF0aW8gKiAoMjU1IC0gbWluT3BhY2l0eSkpO1xuICAgIH1cblxuICAgIGdldFBsYXllckRpc3RhbmNlICgpOiBudW1iZXIge1xuICAgICAgICAvLyDmoLnmja4gUGxheWVyIOiKgueCueS9jee9ruWIpOaWrei3neemu1xuICAgICAgICBjb25zdCBwbGF5ZXJQb3MgPSB0aGlzLmdhbWUucGxheWVyLnBvc2l0aW9uO1xuICAgICAgICAvLyDmoLnmja7kuKTngrnkuYvpl7TnmoTkvY3nva7orqHnrpfot53nprtcbiAgICAgICAgY29uc3QgZGlzdCA9IHRoaXMubm9kZS5wb3NpdGlvbi5zdWIocGxheWVyUG9zKS5tYWcoKTtcbiAgICAgICAgcmV0dXJuIGRpc3Q7XG4gICAgfVxuXG4gICAgb25QaWNrZWQgKCkge1xuICAgICAgICAvLyDlvZPmmJ/mmJ/ooqvmlLbpm4bml7bvvIzosIPnlKggR2FtZSDohJrmnKzkuK3nmoTmjqXlj6PvvIznlJ/miJDkuIDkuKrmlrDnmoTmmJ/mmJ9cbiAgICAgICAgdGhpcy5nYW1lLnNwYXduTmV3U3RhcigpO1xuXG4gICAgICAgIC8vIOiwg+eUqCBHYW1lIOiEmuacrOS4reeahOW+l+WIhuaWueazlVxuICAgICAgICB0aGlzLmdhbWUuZ2FpblNjb3JlKCk7XG5cbiAgICAgICAgLy8g6ZSA5q+B5b2T5YmN5pif5pif6IqC54K5XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgfVxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGO0FBQ2xGLGdDQUFnQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTFCLElBQUEsS0FBc0IsRUFBRSxDQUFDLFVBQVUsRUFBbEMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFpQixDQUFDO0FBRzFDO0lBQWtDLHdCQUFZO0lBQTlDO1FBQUEscUVBc0dDO1FBbkdHLGdCQUFVLEdBQWMsSUFBSSxDQUFDLENBQUMsZ0JBQWdCO1FBRTlDLGlCQUFpQjtRQUVqQixxQkFBZSxHQUFXLENBQUMsQ0FBQztRQUU1QixxQkFBZSxHQUFXLENBQUMsQ0FBQztRQUc1QixZQUFNLEdBQVksSUFBSSxDQUFDLENBQUMsbUJBQW1CO1FBRzNDLFlBQU0sR0FBWSxJQUFJLENBQUMsQ0FBQyxrQ0FBa0M7UUFHMUQsa0JBQVksR0FBYSxJQUFJLENBQUMsQ0FBQyxrQkFBa0I7UUFHakQsZ0JBQVUsR0FBaUIsSUFBSSxDQUFDLENBQUMsU0FBUztRQUUxQyxhQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLFdBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsV0FBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixtQkFBYSxHQUFXLENBQUMsQ0FBQzs7SUE0RTlCLENBQUM7SUExRUcsd0JBQXdCO0lBRXhCLHFCQUFNLEdBQU47UUFDSSxlQUFlO1FBQ2YsK0RBQStEO1FBQy9ELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRXRELFNBQVM7UUFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLFdBQVc7UUFDWCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELG9CQUFLLEdBQUw7SUFFQSxDQUFDO0lBRUQscUJBQU0sR0FBTixVQUFRLEVBQVU7UUFDZCx3QkFBd0I7UUFDeEIsU0FBUztRQUNULElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBR0QsMkJBQVksR0FBWjtRQUNJLHFCQUFxQjtRQUNyQixzRUFBc0U7UUFDdEUsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEQsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVCLGNBQWM7UUFDZCxrQkFBa0I7UUFDbEIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLHdCQUF3QjtRQUN4QixPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFekMsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMxRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQsaUNBQWtCLEdBQWxCO1FBQ0ksSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsZ0NBQWdDO1FBQ2hDLDRDQUE0QztRQUM1QyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hHLHdCQUF3QjtRQUN4QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDakMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7UUFFekMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsd0JBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ2hCLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUVsRCxTQUFTO1FBQ1QsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsdUJBQVEsR0FBUjtRQUNJLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRTdCLGNBQWM7UUFDZCwrQkFBK0I7UUFDL0IsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQWxHRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzRDQUNTO0lBSTdCO1FBREMsUUFBUTtpREFDbUI7SUFFNUI7UUFEQyxRQUFRO2lEQUNtQjtJQUc1QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3dDQUNLO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7d0NBQ0s7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs4Q0FDVztJQUc5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDOzRDQUNTO0lBckJmLElBQUk7UUFEeEIsT0FBTztPQUNhLElBQUksQ0FzR3hCO0lBQUQsV0FBQztDQXRHRCxBQXNHQyxDQXRHaUMsRUFBRSxDQUFDLFNBQVMsR0FzRzdDO2tCQXRHb0IsSUFBSSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuLy8g5Li76YC76L6R6ISa5pys77yM5LmL5ZCO6L+Y5Lya5re75Yqg6K6h5YiG44CB5ri45oiP5aSx6LSl5ZKM6YeN5paw5byA5aeL55qE55u45YWz6YC76L6RXG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHN0YXJQcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7IC8vIOi/meS4quWxnuaAp+W8leeUqOS6huaYn+aYn+mihOWItui1hOa6kFxuXG4gICAgLy8g5pif5pif5Lqn55Sf5ZCO5raI5aSx5pe26Ze055qE6ZqP5py66IyD5Zu0XG4gICAgQHByb3BlcnR5XG4gICAgbWF4U3RhckR1cmF0aW9uOiBudW1iZXIgPSAwO1xuICAgIEBwcm9wZXJ0eVxuICAgIG1pblN0YXJEdXJhdGlvbjogbnVtYmVyID0gMDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGdyb3VuZDogY2MuTm9kZSA9IG51bGw7IC8vIOWcsOmdouiKgueCue+8jOeUqOS6juehruWumuaYn+aYn+eUn+aIkOeahOmrmOW6plxuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcGxheWVyOiBjYy5Ob2RlID0gbnVsbDsgLy8gUGxheWVyIOiKgueCue+8jOeUqOS6juiOt+WPluS4u+inkuW8uei3s+eahOmrmOW6pu+8jOWSjOaOp+WItuS4u+inkuihjOWKqOW8gOWFs1xuXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICAgIHNjb3JlRGlzcGxheTogY2MuTGFiZWwgPSBudWxsOyAvLyBzY29yZSBsYWJlbCDnmoTlvJXnlKhcblxuICAgIEBwcm9wZXJ0eShjYy5BdWRpb0NsaXApXG4gICAgc2NvcmVBdWRpbzogY2MuQXVkaW9DbGlwID0gbnVsbDsgLy8g5b6X5YiG6Z+z5pWI6LWE5rqQXG5cbiAgICBncm91bmRZOiBudW1iZXIgPSAwO1xuICAgIHNjb3JlOiBudW1iZXIgPSAwO1xuICAgIHRpbWVyOiBudW1iZXIgPSAwO1xuICAgIHN0YXJ0RHVyYXRpb246IG51bWJlciA9IDA7XG5cbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIC8vIOiOt+WPluWcsOW5s+mdoueahCB5IOi9tOWdkOagh1xuICAgICAgICAvLyDoioLngrnkuIvnmoQgeSDlsZ7mgKflr7nlupTnmoTmmK/plJrngrnmiYDlnKjnmoQgeSDlnZDmoIfvvIzlm6DkuLrplJrngrnpu5jorqTlnKjoioLngrnnmoTkuK3lv4PvvIzmiYDku6XpnIDopoHliqDkuIrlnLDpnaLpq5jluqbnmoTkuIDljYrmiY3mmK/lnLDpnaLnmoQgeSDlnZDmoIdcbiAgICAgICAgdGhpcy5ncm91bmRZID0gdGhpcy5ncm91bmQueSArIHRoaXMuZ3JvdW5kLmhlaWdodCAvIDI7XG5cbiAgICAgICAgLy8g5Yid5aeL5YyW5a6a5pe25ZmoXG4gICAgICAgIHRoaXMudGltZXIgPSAwO1xuICAgICAgICAvLyDnlJ/miJDkuIDkuKrmlrDnmoTmmJ/mmJ9cbiAgICAgICAgdGhpcy5zcGF3bk5ld1N0YXIoKTtcbiAgICB9XG5cbiAgICBzdGFydCAoKSB7XG5cbiAgICB9XG5cbiAgICB1cGRhdGUgKGR0OiBudW1iZXIpIHtcbiAgICAgICAgLy8g5q+P5bin5pu05paw6K6h5pe25Zmo77yM6LaF6L+H6ZmQ5bqm6L+Y5rKh5pyJ55Sf5oiQ5paw55qE5pif5pifXG4gICAgICAgIC8vIOWIpOWumua4uOaIj+Wksei0pVxuICAgICAgICBpZiAodGhpcy50aW1lciA+IHRoaXMuc3RhcnREdXJhdGlvbikge1xuICAgICAgICAgICAgdGhpcy5nYW1lT3ZlcigpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGltZXIgKz0gZHQ7XG4gICAgfVxuXG5cbiAgICBzcGF3bk5ld1N0YXIgKCkge1xuICAgICAgICAvLyDkvb/nlKjnu5nlrprnmoTmqKHniYjlnKjlnLrmma/kuK3nlJ/miJDkuIDkuKrmlrDoioLngrlcbiAgICAgICAgLy8gaW5zdGFudGlhdGUoKSDnlKjkuo7lhYvpmobmjIflrprnmoTku7vmhI/nsbvlnovnmoTlr7nosaHvvIzmiJbogIXku44gUHJlZmFiIOWunuS+i+WMluWHuuaWsOiKgueCueOAgui/lOWbnuWAvOS4uiBOb2RlIOaIluiAhSBPYmplY3RcbiAgICAgICAgY29uc3QgbmV3U3RhciA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhclByZWZhYik7XG4gICAgICAgIC8vIOWwhuaWsOWinueahOiKgueCuea3u+WKoOWIsCBDYW52YXMg6IqC54K55LiL6Z2iXG4gICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChuZXdTdGFyKTtcbiAgICAgICAgLy8g5Li65pif5pif6K6+572u5LiA5Liq6ZqP5py65L2N572uXG4gICAgICAgIC8vIOiuvue9ruiKgueCueWcqOeItuiKgueCueWdkOagh+ezu+S4reeahOS9jee9rlxuICAgICAgICBuZXdTdGFyLnNldFBvc2l0aW9uKHRoaXMuZ2V0TmV3U3RhclBvc2l0aW9uKCkpO1xuICAgICAgICAvLyDlnKjmmJ/mmJ/ohJrmnKznu4Tku7bkuIrkv53lrZggR2FtZSDlr7nosaHnmoTlvJXnlKhcbiAgICAgICAgbmV3U3Rhci5nZXRDb21wb25lbnQoJ1N0YXInKS5nYW1lID0gdGhpcztcblxuICAgICAgICAvLyDph43nva7lrprml7blmajvvIzmoLnmja7mtojlpLHml7bpl7TojIPlm7Tpmo/mnLrlj5bkuIDkuKrlgLxcbiAgICAgICAgdGhpcy5zdGFydER1cmF0aW9uID0gdGhpcy5taW5TdGFyRHVyYXRpb24gKyBNYXRoLnJhbmRvbSgpICogKHRoaXMubWF4U3RhckR1cmF0aW9uIC0gdGhpcy5taW5TdGFyRHVyYXRpb24pO1xuICAgICAgICB0aGlzLnRpbWVyID0gMDtcbiAgICB9XG5cbiAgICBnZXROZXdTdGFyUG9zaXRpb24gKCk6IGNjLlZlYzIge1xuICAgICAgICBsZXQgcmFuZFggPSAwO1xuICAgICAgICAvLyDmoLnmja7lnLDlubPpnaLkvY3nva7lkozkuLvop5Lot7Pot4Ppq5jluqbvvIzpmo/mnLrlvpfliLDkuIDkuKrmmJ/mmJ/nmoQgeSDlnZDmoIdcbiAgICAgICAgLy8g6YCa6L+HIE5vZGUg5LiL55qEIGdldENvbXBvbmVudCgpIOWPr+S7peW+l+WIsOivpeiKgueCueS4iuaMgui9veeahOe7hOS7tuW8leeUqFxuICAgICAgICBjb25zdCByYW5kWSA9IHRoaXMuZ3JvdW5kWSArIE1hdGgucmFuZG9tKCkgKiB0aGlzLnBsYXllci5nZXRDb21wb25lbnQoJ1BsYXllcicpLmp1bXBIZWlnaHQgKyA1MDtcbiAgICAgICAgLy8g5qC55o2u5bGP5bmV5a695bqm77yM6ZqP5py65b6X5Yiw5LiA5Liq5pif5pif55qEIHgg5Z2Q5qCHXG4gICAgICAgIGNvbnN0IG1heFggPSB0aGlzLm5vZGUud2lkdGggLyAyO1xuICAgICAgICByYW5kWCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDIgKiBtYXhYO1xuXG4gICAgICAgIHJldHVybiBjYy52MihyYW5kWCwgcmFuZFkpO1xuICAgIH1cblxuICAgIGdhaW5TY29yZSAoKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgKz0gMTtcbiAgICAgICAgLy8g5pu05pawIHNjb3JlRGlzcGxheSBMYWJlbCDnmoTmloflrZdcbiAgICAgICAgdGhpcy5zY29yZURpc3BsYXkuc3RyaW5nID0gJ1Njb3JlOiAnICsgdGhpcy5zY29yZTtcblxuICAgICAgICAvLyDmkq3mlL7lvpfliIbpn7PmlYhcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdCh0aGlzLnNjb3JlQXVkaW8sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBnYW1lT3ZlciAoKSB7XG4gICAgICAgIC8vIOWBnOatoiBQbGF5ZXIg6IqC54K555qE6Lez6LeD5Yqo5L2cXG4gICAgICAgIHRoaXMucGxheWVyLnN0b3BBbGxBY3Rpb25zKCk7XG5cbiAgICAgICAgLy8g6YeN5paw5Yqg6L295Zy65pmvIGdhbWVcbiAgICAgICAgLy8gY2MuZGlyZWN0b3Ig5piv5LiA5Liq566h55CG5ri45oiP6YC76L6R5rWB56iL55qE5Y2V5L6L5a+56LGhXG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnZ2FtZScpO1xuICAgIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------
