window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "61a93mGGcNCJ5cluiSIXhDq", "Game");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Game = function(_super) {
      __extends(Game, _super);
      function Game() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.starPrefab = null;
        _this.maxStarDuration = 0;
        _this.minStarDuration = 0;
        _this.ground = null;
        _this.player = null;
        _this.scoreDisplay = null;
        _this.scoreAudio = null;
        _this.groundY = 0;
        _this.score = 0;
        _this.timer = 0;
        _this.startDuration = 0;
        return _this;
      }
      Game.prototype.onLoad = function() {
        this.groundY = this.ground.y + this.ground.height / 2;
        this.timer = 0;
        this.spawnNewStar();
      };
      Game.prototype.start = function() {};
      Game.prototype.update = function(dt) {
        if (this.timer > this.startDuration) {
          this.gameOver();
          return;
        }
        this.timer += dt;
      };
      Game.prototype.spawnNewStar = function() {
        var newStar = cc.instantiate(this.starPrefab);
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent("Star").game = this;
        this.startDuration = this.minStarDuration + Math.random() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
      };
      Game.prototype.getNewStarPosition = function() {
        var randX = 0;
        var randY = this.groundY + Math.random() * this.player.getComponent("Player").jumpHeight + 50;
        var maxX = this.node.width / 2;
        randX = 2 * (Math.random() - .5) * maxX;
        return cc.v2(randX, randY);
      };
      Game.prototype.gainScore = function() {
        this.score += 1;
        this.scoreDisplay.string = "Score: " + this.score;
        cc.audioEngine.playEffect(this.scoreAudio, false);
      };
      Game.prototype.gameOver = function() {
        this.player.stopAllActions();
        cc.director.loadScene("game");
      };
      __decorate([ property(cc.Prefab) ], Game.prototype, "starPrefab", void 0);
      __decorate([ property ], Game.prototype, "maxStarDuration", void 0);
      __decorate([ property ], Game.prototype, "minStarDuration", void 0);
      __decorate([ property(cc.Node) ], Game.prototype, "ground", void 0);
      __decorate([ property(cc.Node) ], Game.prototype, "player", void 0);
      __decorate([ property(cc.Label) ], Game.prototype, "scoreDisplay", void 0);
      __decorate([ property(cc.AudioClip) ], Game.prototype, "scoreAudio", void 0);
      Game = __decorate([ ccclass ], Game);
      return Game;
    }(cc.Component);
    exports.default = Game;
    cc._RF.pop();
  }, {} ],
  Player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "21ca9/gsxRLFKqhj5ZZsmOe", "Player");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Player = function(_super) {
      __extends(Player, _super);
      function Player() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.jumpHeight = 0;
        _this.jumpDuration = 0;
        _this.squashDuration = .1;
        _this.maxMoveSpeed = 0;
        _this.accel = 0;
        _this.jumpAudio = null;
        _this.jumpAction = null;
        _this.accLeft = false;
        _this.accRight = false;
        _this.xSpeed = 0;
        _this.minPosX = 0;
        _this.maxPosX = 0;
        return _this;
      }
      Player.prototype.onLoad = function() {
        this.minPosX = -this.node.parent.width / 2;
        this.maxPosX = this.node.parent.width / 2;
        this.jumpAction = this.runJumpAction();
        cc.tween(this.node).then(this.jumpAction).start();
        this.setInputControl();
      };
      Player.prototype.start = function() {};
      Player.prototype.update = function(dt) {
        this.accLeft ? this.xSpeed -= this.accel * dt : this.accRight && (this.xSpeed += this.accel * dt);
        Math.abs(this.xSpeed) > this.maxMoveSpeed && (this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed));
        this.node.x += this.xSpeed * dt;
        if (this.node.x >= this.maxPosX) {
          this.node.x = this.maxPosX;
          this.xSpeed = 0;
        } else if (this.node.x < this.minPosX) {
          this.node.x = this.minPosX;
          this.xSpeed = 0;
        }
      };
      Player.prototype.onDestroy = function() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
      };
      Player.prototype.runJumpAction = function() {
        var jumpUp = cc.tween().by(this.jumpDuration, {
          y: this.jumpHeight
        }, {
          easing: "sineOut"
        });
        var jumpDown = cc.tween().by(this.jumpDuration, {
          y: -this.jumpHeight
        }, {
          easing: "sineIn"
        });
        var squash = cc.tween().to(this.squashDuration, {
          scaleX: 1,
          scaleY: .6
        });
        var stretch = cc.tween().to(this.squashDuration, {
          scaleX: 1,
          scaleY: 1.2
        });
        var scaleBack = cc.tween().to(this.squashDuration, {
          scaleX: 1,
          scaleY: 1
        });
        var tween = cc.tween().sequence(squash, stretch, jumpUp, scaleBack, jumpDown).call(this.playJumpSound, this);
        return cc.tween().repeatForever(tween);
      };
      Player.prototype.setInputControl = function() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchBegan, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnded, this);
      };
      Player.prototype.onKeyDown = function(event) {
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
        }
      };
      Player.prototype.onKeyUp = function(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.a:
         case cc.macro.KEY.left:
          this.accLeft = false;
          break;

         case cc.macro.KEY.d:
         case cc.macro.KEY.right:
          this.accRight = false;
        }
      };
      Player.prototype.onTouchBegan = function(event) {
        var touchLoc = event.getLocation();
        if (touchLoc.x >= cc.winSize.width / 2) {
          this.accLeft = false;
          this.accRight = true;
        } else {
          this.accLeft = true;
          this.accRight = false;
        }
        return true;
      };
      Player.prototype.onTouchEnded = function(event) {
        this.accLeft = false;
        this.accRight = false;
      };
      Player.prototype.playJumpSound = function() {
        cc.audioEngine.playEffect(this.jumpAudio, false);
      };
      __decorate([ property(cc.Label) ], Player.prototype, "label", void 0);
      __decorate([ property ], Player.prototype, "jumpHeight", void 0);
      __decorate([ property ], Player.prototype, "jumpDuration", void 0);
      __decorate([ property ], Player.prototype, "squashDuration", void 0);
      __decorate([ property ], Player.prototype, "maxMoveSpeed", void 0);
      __decorate([ property ], Player.prototype, "accel", void 0);
      __decorate([ property(cc.AudioClip) ], Player.prototype, "jumpAudio", void 0);
      Player = __decorate([ ccclass ], Player);
      return Player;
    }(cc.Component);
    exports.default = Player;
    cc._RF.pop();
  }, {} ],
  Star: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cd8988ZyedBlJYPSVN4txdK", "Star");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Star = function(_super) {
      __extends(Star, _super);
      function Star() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pickRadius = 0;
        _this.game = null;
        return _this;
      }
      Star.prototype.start = function() {};
      Star.prototype.update = function(dt) {
        if (this.getPlayerDistance() < this.pickRadius) {
          this.onPicked();
          return;
        }
        var opacityRatio = 1 - this.game.timer / this.game.startDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
      };
      Star.prototype.getPlayerDistance = function() {
        var playerPos = this.game.player.position;
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
      };
      Star.prototype.onPicked = function() {
        this.game.spawnNewStar();
        this.game.gainScore();
        this.node.destroy();
      };
      __decorate([ property ], Star.prototype, "pickRadius", void 0);
      Star = __decorate([ ccclass ], Star);
      return Star;
    }(cc.Component);
    exports.default = Star;
    cc._RF.pop();
  }, {} ]
}, {}, [ "Game", "Player", "Star" ]);