// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
// 对于需要重复生成的节点，我们可以将它保存成 Prefab（预制） 资源，作为我们动态生成节点时使用的模板。

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    // Cocos Creator 规定一个节点具有的属性都需要写在 properties 代码块中，
    // 这些属性将规定主角的移动方式，在代码中我们不需要关心这些数值是多少，因为我们之后会直接在 属性检查器 中设置这些数值

    @property(cc.Label) // 使用 property 装饰器声明属性，括号里是属性类型，装饰器里的类型声明主要用于编辑器展示
    label: cc.Label = null; // 这里是 TypeScript 用来声明变量类型的写法，冒号后面是属性类型，等号后面是默认值

    @property
    jumpHeight: number = 0; // 主角跳跃高度

    @property
    jumpDuration: number = 0; // 主角跳跃持续时间

    @property
    squashDuration: number = 0.1; // 辅助形变动作时间

    @property
    maxMoveSpeed: number = 0; // 最大移动速度

    @property
    accel: number = 0; // 加速度

    @property(cc.AudioClip)
    jumpAudio: cc.AudioClip = null; // 跳跃音效资源

    jumpAction: cc.Tween = null;

    // 加速度方向开关
    accLeft: boolean = false;
    accRight: boolean = false;
    xSpeed: number = 0; // 主角当前水平方向速度

    // screen boundaries
    minPosX: number = 0;
    maxPosX: number = 0;


    // LIFE-CYCLE CALLBACKS:

    // 在场景加载后立刻执行，所以初始化相关的操作和逻辑都会放在这里面
    onLoad () {
        this.minPosX = -this.node.parent.width / 2;
        this.maxPosX = this.node.parent.width / 2;

        this.jumpAction = this.runJumpAction();
        cc.tween(this.node).then(this.jumpAction).start();

        this.setInputControl();
    }

    start () {

    }

    // update 会在场景加载后每帧调用一次，我们一般把需要经常计算或及时更新的逻辑内容放在 update 中
    update (dt: number) {
        // 根据当前加速度方向，每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
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
        } else if (this.node.x < this.minPosX) {
            this.node.x = this.minPosX;
            this.xSpeed = 0;
        }
    }

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    runJumpAction () {
        // 这里涉及到了 缓动（cc.tween）系统，在 Cocos Creator 中，cc.tween 可以对任何对象进行操作，并且可以对对象的 任意属性 进行缓动
        // 跳跃上升
        const jumpUp = cc.tween().by(this.jumpDuration, { y: this.jumpHeight }, { easing: 'sineOut' });
        // 下落
        const jumpDown = cc.tween().by(this.jumpDuration, { y: -this.jumpHeight }, { easing: 'sineIn' });

        // 形变
        const squash = cc.tween().to(this.squashDuration, { scaleX: 1, scaleY: 0.6 });
        const stretch = cc.tween().to(this.squashDuration, { scaleX: 1, scaleY: 1.2 });
        const scaleBack = cc.tween().to(this.squashDuration, { scaleX: 1, scaleY: 1 });

        // 创建一个缓动，按 jumpUp、jumpDown 的顺序执行动作
        const tween = cc.tween()
            .sequence(squash,stretch, jumpUp, scaleBack, jumpDown)
            .call(this.playJumpSound, this); // 添加一个回调函数，在前面的动作都结束时调用我们定义的 playJumpSound() 方法
        // 重复
        return cc.tween().repeatForever(tween);
    }

    setInputControl () {
        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // touch input
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnded, this);
    }

    onKeyDown (event: cc.Event.EventKeyboard) {
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
    }

    onKeyUp (event: cc.Event.EventKeyboard) {
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
    }

    onTouchBegan (event: cc.Event.EventTouch) {
        const touchLoc = event.getLocation();
        if (touchLoc.x >= cc.winSize.width / 2) {
            this.accLeft = false;
            this.accRight = true;
        } else {
            this.accLeft = true;
            this.accRight = false;
        }
        // do not capture the event
        return true;
    }

    onTouchEnded (event: cc.Event.EventTouch) {
        this.accLeft = false;
        this.accRight = false;
    }

    playJumpSound () {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.jumpAudio, false);
    }

}
