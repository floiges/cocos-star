import Game from './Game';
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Star extends cc.Component {

    @property
    pickRadius: number = 0; // 星星和主角之间的距离小于这个数值时，就会完成收集

    game: Game = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    update (dt: number) {
        // 每帧判断星星和主角之间的距离是否小于收集距离
        if (this.getPlayerDistance() < this.pickRadius) {
            // 收集星星
            this.onPicked();
            return;
        }

        // 根据 Game 脚本中的计时器更新星星的透明度
        const opacityRatio = 1 - this.game.timer / this.game.startDuration;
        const minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    }

    getPlayerDistance (): number {
        // 根据 Player 节点位置判断距离
        const playerPos = this.game.player.position;
        // 根据两点之间的位置计算距离
        const dist = this.node.position.sub(playerPos).mag();
        return dist;
    }

    onPicked () {
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.game.spawnNewStar();

        // 调用 Game 脚本中的得分方法
        this.game.gainScore();

        // 销毁当前星星节点
        this.node.destroy();
    }
}
