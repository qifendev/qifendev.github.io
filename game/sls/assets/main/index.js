System.register("chunks:///_virtual/linkItem.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './poolManager.ts', './resourceUtil.ts', './constants.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Enum, TweenSystem, tween, UITransform, Vec3, Animation, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, poolManager, resourceUtil, constants;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Enum = module.Enum;
      TweenSystem = module.TweenSystem;
      tween = module.tween;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      Animation = module.Animation;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      poolManager = module.poolManager;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "000eahOFsJC4YWx/wV0fJqQ", "linkItem", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var LINK_ITEM_STATUS = Enum({
        SHOW: "linkItemShow",
        HIDE: "linkItemHide",
        SELECT: "linkItemSelect",
        SHAKE: "linkItemShake",
        SKILL: "linkItemSkill"
      });
      var LinkItem = exports('LinkItem', (_dec = ccclass('LinkItem'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LinkItem, _Component);

        function LinkItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "spCake", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "aniCake", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "index", void 0);

          _defineProperty(_assertThisInitialized(_this), "cake", void 0);

          _defineProperty(_assertThisInitialized(_this), "linkParent", void 0);

          _defineProperty(_assertThisInitialized(_this), "isSpecial", void 0);

          _defineProperty(_assertThisInitialized(_this), "specialType", void 0);

          _defineProperty(_assertThisInitialized(_this), "effectType", void 0);

          _defineProperty(_assertThisInitialized(_this), "currentStatus", void 0);

          _defineProperty(_assertThisInitialized(_this), "effectNode", void 0);

          _defineProperty(_assertThisInitialized(_this), "specialEffect", void 0);

          return _this;
        }

        var _proto = LinkItem.prototype;

        _proto.show = function show(index, cake, isShowRightNow, parent) {
          this.index = index;
          this.cake = cake;
          this.linkParent = parent;
          this.isSpecial = false;
          this.specialType = null;
          this.effectType = null;
          this.node.setSiblingIndex(constants.ZORDER.LINK_ITEM_NORMAL);
          this.spCake.node.setScale(0, 0, 0);
          resourceUtil.setCakeIcon(this.cake, this.spCake, function () {});

          if (isShowRightNow) {
            this.playShowAction(0);
          }
        };

        _proto.playShowAction = function playShowAction(delayTime) {
          var _this2 = this;

          TweenSystem.instance.ActionManager.removeAllActionsFromTarget(this.node);
          tween(this.node).delay(delayTime).call(function () {
            _this2.aniCake.play(LINK_ITEM_STATUS.SHOW);

            _this2.currentStatus = LINK_ITEM_STATUS.SHOW;
          }).start();
        };

        _proto.playHideAction = function playHideAction(delayTime, isNeedShowEffect) {
          var _this3 = this;

          TweenSystem.instance.ActionManager.removeAllActionsFromTarget(this.node);
          tween(this.node).delay(delayTime).call(function () {
            _this3.aniCake.play(LINK_ITEM_STATUS.HIDE);

            _this3.currentStatus = LINK_ITEM_STATUS.HIDE;

            if (isNeedShowEffect) {
              _this3.linkParent._fightScene.effectGroup.showLinkItemDestroyEffect(_this3.node.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(0, 0, 0)), _this3.getScore());
            }

            _this3.aniCake.once(Animation.EventType.FINISHED, function () {
              poolManager.instance.putNode(_this3.node);

              if (_this3.effectNode) {
                _this3.effectNode.destroy();

                _this3.effectNode = null;
              }

              if (_this3.specialEffect) {
                poolManager.instance.putNode(_this3.specialEffect);
                _this3.specialEffect = null;
              }
            }, _this3);
          }).start();
        };

        _proto.getScore = function getScore() {
          var score = 0;

          if (this.isSpecial) {
            if (this.specialType === constants.SPECIAL_EFFECT.HORIZONTAL || this.specialType === constants.SPECIAL_EFFECT.VERTICAL) {
              score += 1000;
            } else if (this.specialType === constants.SPECIAL_EFFECT.PLUS) {
              score += 2000;
            } else if (this.specialType === constants.SPECIAL_EFFECT.CENTER) {
              score += 3000;
            }

            if (!this.effectType) {
              return score;
            }
          }

          if (this.effectType) {
            switch (this.effectType) {
              case constants.SPECIAL_EFFECT.HORIZONTAL:
              case constants.SPECIAL_EFFECT.VERTICAL:
                return score + 500;

              case constants.SPECIAL_EFFECT.PLUS:
                return score + 1000;

              case constants.SPECIAL_EFFECT.CENTER:
                return score + 1500;
            }
          }

          return 50;
        };

        _proto.showSelect = function showSelect(isShow) {
          var cakeStr = this.cake;

          if (isShow) {
            this.aniCake.play(LINK_ITEM_STATUS.SELECT);
            this.currentStatus = LINK_ITEM_STATUS.SELECT;
            cakeStr = this.cake + 'Light';
          } else {
            if (this.effectType) {
              this.aniCake.play(LINK_ITEM_STATUS.SKILL);
              this.currentStatus = LINK_ITEM_STATUS.SKILL;
            } else {
              // this.aniCake.setCurrentTime(0);
              this.aniCake.stop();
            }
          }

          resourceUtil.setCakeIcon(cakeStr, this.spCake, function () {});
        };

        _proto.showDestory = function showDestory() {
          this.playHideAction(0, true);
        };

        _proto.playMove2Index = function playMove2Index(index) {
          var _this4 = this;

          var screenPos = this.linkParent.getScreenPosByIndex(index);
          var distance = screenPos.clone().subtract(this.node.position).length();
          TweenSystem.instance.ActionManager.removeAllActionsFromTarget(this.node);
          tween(this.node).to(distance / 1000, {
            position: screenPos
          }, {
            easing: 'backIn'
          }).call(function () {
            _this4.aniCake.play(LINK_ITEM_STATUS.SHAKE);
          }).start();
        };

        _proto.showSpecial = function showSpecial(isShow) {
          var _this5 = this;

          this.isSpecial = isShow;

          if (isShow) {
            resourceUtil.getEffectPrefab('fight/linkStar/linkStar', function (err, prefab) {
              if (err) {
                return;
              }

              if (!_this5.isSpecial) {
                return;
              }

              _this5.specialEffect = poolManager.instance.getNode(prefab, _this5.node);
              _this5.specialEffect.position = new Vec3(0, 0, 0);

              _this5.specialEffect.getComponent(Animation).play('linkStarShow');
            });
          } else if (this.specialEffect) {
            poolManager.instance.putNode(this.specialEffect);
            this.specialEffect = null;
          }
        };

        _proto.setSpecialType = function setSpecialType(type) {
          this.specialType = type;
        };

        _proto.markEffect = function markEffect(type) {
          this.effectType = type;
        };

        _proto.showEffect = function showEffect(type) {
          var _this6 = this;

          if (this.effectNode) {
            this.effectNode.destroy();
          }

          this.node.setSiblingIndex(constants.ZORDER.LINK_ITEM_SKILL);
          this.effectType = type;
          this.aniCake.play(LINK_ITEM_STATUS.SKILL);
          this.currentStatus = LINK_ITEM_STATUS.SKILL;
          var rotation = 0;
          var effectStr = "fight/effectSkillTips/skillTipsLine";

          switch (type) {
            case constants.SPECIAL_EFFECT.HORIZONTAL:
              break;

            case constants.SPECIAL_EFFECT.VERTICAL:
              rotation = 90;
              break;

            case constants.SPECIAL_EFFECT.PLUS:
              effectStr = "fight/effectSkillTips/skillTipsPlus";
              break;

            case constants.SPECIAL_EFFECT.CENTER:
              effectStr = "fight/effectSkillTips/skillTipsRange";
              break;
          }

          resourceUtil.createEffect(effectStr, function (err, effectNode) {
            if (err) {
              return;
            }

            _this6.effectNode = effectNode;
            _this6.effectNode.eulerAngles = new Vec3(0, 0, rotation);
          }, this.node);
        };

        _proto.getEffect = function getEffect() {
          return this.effectType;
        };

        return LinkItem;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spCake", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "aniCake", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TestScene.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _inheritsLoose;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _inheritsLoose = module.inheritsLoose;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "001c9HCKB5IQLCzFswX9vSe", "TestScene", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * Predefined variables
       * Name = TestScene
       * DateTime = Sat Apr 29 2023 00:15:50 GMT+0800 (China Standard Time)
       * Author = wanglang3081
       * FileBasename = TestScene.ts
       * FileBasenameNoExtension = TestScene
       * URL = db://assets/test/TestScene.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
       *
       */

      var TestScene = exports('TestScene', (_dec = ccclass('TestScene'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TestScene, _Component);

        function TestScene() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = TestScene.prototype; // [1]
        // dummy = '';
        // [2]
        // @property
        // serializableDummy = 0;

        _proto.start = function start() {// [3]
        } // update (deltaTime: number) {
        //     // [4]
        // }
        ;

        return TestScene;
      }(Component)) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/fightPropsOperation.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './clientEvent.ts', './uiManager.ts', './fightProp.ts', './LanguageData.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Node, UITransform, Vec3, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil, clientEvent, uiManager, FightProp, t;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      FightProp = module.FightProp;
    }, function (module) {
      t = module.t;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

      cclegacy._RF.push({}, "01774upBQlPPZbPTE42gyAF", "fightPropsOperation", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var FightPropsOperation = exports('FightPropsOperation', (_dec = ccclass('FightPropsOperation'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FightPropsOperation, _Component);

        function FightPropsOperation() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeMask", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeTouch", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeBg", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeProp", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbTips", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbName", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spProp", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "arrSfTip", _descriptor8, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "propId", void 0);

          _defineProperty(_assertThisInitialized(_this), "closeCallback", void 0);

          _defineProperty(_assertThisInitialized(_this), "_fightScene", void 0);

          return _this;
        }

        var _proto = FightPropsOperation.prototype;

        _proto.onEnable = function onEnable() {
          this.nodeTouch.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.nodeTouch.on(Node.EventType.TOUCH_END, this.onTouchEnded, this);
          this.nodeTouch.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        };

        _proto.onDisable = function onDisable() {
          this.nodeTouch.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.nodeTouch.off(Node.EventType.TOUCH_END, this.onTouchEnded, this);
          this.nodeTouch.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        };

        _proto.show = function show(propInfo, propWorldPos, linkRect, fightScene, closeCallback) {
          var _this2 = this;

          this.propId = propInfo.ID;
          resourceUtil.setPropIcon(propInfo.icon, this.spProp, function () {});
          var propPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(propWorldPos);
          this.closeCallback = closeCallback;
          this.nodeProp.position = propPos;
          this.nodeProp.getComponent(FightProp).show(propInfo);
          this.lbTips.string = t('table_prop.' + propInfo.desc);
          this.lbName.string = t('table_prop.' + propInfo.name);
          this._fightScene = fightScene;
          this.nodeMask.position = new Vec3(linkRect.x + linkRect.width / 2, linkRect.y + linkRect.height / 2, 0);
          this.nodeTouch.position = this.nodeMask.position;
          var uiTraMask = this.nodeMask.getComponent(UITransform);
          uiTraMask.width = linkRect.width;
          uiTraMask.height = linkRect.height;
          var uiTraTouch = this.nodeTouch.getComponent(UITransform);
          uiTraTouch.width = linkRect.width;
          uiTraTouch.height = linkRect.height;
          this.scheduleOnce(function () {
            var uiTraSelf = _this2.node.getComponent(UITransform);

            var uiTraBg = _this2.nodeBg.getComponent(UITransform);

            uiTraBg.width = uiTraSelf.width;
            uiTraBg.height = uiTraSelf.height;
            _this2.nodeBg.position = new Vec3(-_this2.nodeMask.position.x, -_this2.nodeMask.position.y, 0);
          }, 0.1);
        };

        _proto.onTouchStart = function onTouchStart(touchEvent) {
          this._fightScene.linkContent.onPropTouchStart(touchEvent);
        };

        _proto.onTouchEnded = function onTouchEnded(touchEvent) {
          var idxTouch = this._fightScene.linkContent.onPropTouchEnd(touchEvent);

          if (idxTouch !== -1) {
            clientEvent.dispatchEvent('useProp', this.propId, idxTouch);
            this.close();
          }
        };

        _proto.onTouchCancel = function onTouchCancel(touchEvent) {
          this._fightScene.linkContent.onPropTouchCancel(touchEvent);
        };

        _proto.onBtnCloseClick = function onBtnCloseClick() {
          this.close();
        };

        _proto.close = function close() {
          uiManager.instance.hideDialog('fight/fightPropsOperation');

          if (this.closeCallback) {
            this.closeCallback();
          }
        };

        return FightPropsOperation;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nodeMask", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nodeTouch", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeBg", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nodeProp", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "lbTips", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "lbName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "spProp", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "arrSfTip", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/fightTarget.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './clientEvent.ts', './playerData.ts', './loadsh.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Vec3, Animation, UITransform, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil, clientEvent, playerData, loadsh;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      Animation = module.Animation;
      UITransform = module.UITransform;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      loadsh = module.loadsh;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp;

      cclegacy._RF.push({}, "01817VhYV5BoLEoEhl13On0", "fightTarget", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var FightTarget = exports('FightTarget', (_dec = ccclass('FightTarget'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FightTarget, _Component);

        function FightTarget() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "spCake", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbTargetValue", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeCustomer", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeNeed", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeCake", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeYes", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "aniCake", _descriptor7, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "cake", void 0);

          _defineProperty(_assertThisInitialized(_this), "customer", void 0);

          return _this;
        }

        var _proto = FightTarget.prototype;

        _proto.onEnable = function onEnable() {
          clientEvent.on('updateTargets', this.updateTarget, this);
          clientEvent.on('showTargetCake', this.showTargetCake, this);
        };

        _proto.onDisable = function onDisable() {
          clientEvent.off('updateTargets', this.updateTarget, this);
          clientEvent.off('showTargetCake', this.showTargetCake, this);
        };

        _proto.show = function show(cake, isShowCustomer) {
          var _this2 = this;

          this.cake = cake;
          resourceUtil.setCakeIcon(this.cake, this.spCake, function () {});
          this.updateTagetValue();

          if (isShowCustomer) {
            if (this.customer) {
              this.customer.active = true;
            } else {
              var rand = loadsh.random(0, 1);
              var roleStr = 'role/man01/man01';
              var posY = 0;

              if (rand) {
                roleStr = 'role/woman01/woman01';
                posY = 15;
              }

              resourceUtil.createEffect(roleStr, function (err, role) {
                if (!err) {
                  _this2.customer = role;
                  _this2.customer.position = new Vec3(0, posY, 0);
                }
              }, this.nodeCustomer);
            }
          } else if (this.customer) {
            this.customer.active = false;
          }

          this.nodeNeed.active = false;
          this.nodeCake.active = false;
        };

        _proto.showTargetCake = function showTargetCake(cake) {
          if (cake === 'all' || cake === this.cake) {
            this.nodeNeed.active = true;
            this.nodeCake.active = true;
            this.node.getComponent(Animation).play('linkItemShowTarget');
          }
        };

        _proto.updateTagetValue = function updateTagetValue() {
          var spareValue = playerData.instance.getTargetValue(this.cake);
          this.lbTargetValue.string = spareValue;
          this.nodeYes.active = spareValue <= 0;
        };

        _proto.updateTarget = function updateTarget(cake) {
          if (this.cake === cake) {
            this.updateTagetValue();
          }
        };

        _proto.playIdle = function playIdle() {
          if (this.customer) {
            this.customer.getComponent(Animation).play('idle');
          }
        };

        _proto.getCakeWorldPos = function getCakeWorldPos() {
          return this.spCake.node.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(0, 0, 0));
        };

        return FightTarget;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spCake", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbTargetValue", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeCustomer", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nodeNeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "nodeCake", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "nodeYes", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "aniCake", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/utils.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "04ef58UptZE3aEqQ2I+onJb", "utils", undefined);
      /*
       * Copyright (c) 2017 Xiamen Yaji Software Co.Ltd. All rights reserved.
       * 工具类
      **/


      var utils = exports('utils', {
        /**
        * 深度拷贝
        * @param {any} sObj 拷贝的对象
        * @returns 
        */
        clone: function clone(sObj) {
          if (sObj === null || typeof sObj !== "object") {
            return sObj;
          }

          var s = {};

          if (sObj.constructor === Array) {
            s = [];
          }

          for (var i in sObj) {
            if (sObj.hasOwnProperty(i)) {
              s[i] = this.clone(sObj[i]);
            }
          }

          return s;
        },

        /**
         * 将object转化为数组
         * @param { any} srcObj  
         * @returns 
         */
        objectToArray: function objectToArray(srcObj) {
          var resultArr = []; // to array

          for (var _key in srcObj) {
            if (!srcObj.hasOwnProperty(_key)) {
              continue;
            }

            resultArr.push(srcObj[_key]);
          }

          return resultArr;
        },

        /**
         * !#zh 将数组转化为object。
         */

        /**
         * 将数组转化为object。
         * @param { any} srcObj 
         * @param { string} objectKey 
         * @returns 
         */
        arrayToObject: function arrayToObject(srcObj, objectKey) {
          var resultObj = {}; // to object

          for (var key in srcObj) {
            if (!srcObj.hasOwnProperty(key) || !srcObj[key][objectKey]) {
              continue;
            }

            resultObj[srcObj[key][objectKey]] = srcObj[key];
          }

          return resultObj;
        },

        /**
         * 根据权重,计算随机内容
         * @param {arrany} weightArr 
         * @param {number} totalWeight 权重
         * @returns 
         */
        getWeightRandIndex: function getWeightRandIndex(weightArr, totalWeight) {
          var randWeight = Math.floor(Math.random() * totalWeight);
          var sum = 0;

          for (var weightIndex = 0; weightIndex < weightArr.length; weightIndex++) {
            sum += weightArr[weightIndex];

            if (randWeight < sum) {
              break;
            }
          }

          return weightIndex;
        },

        /**
         * 从n个数中获取m个随机数
         * @param {Number} n   总数
         * @param {Number} m    获取数
         * @returns {Array} array   获取数列
         */
        getRandomNFromM: function getRandomNFromM(n, m) {
          var array = [];
          var intRd = 0;
          var count = 0;

          while (count < m) {
            if (count >= n + 1) {
              break;
            }

            intRd = this.getRandomInt(0, n);
            var flag = 0;

            for (var i = 0; i < count; i++) {
              if (array[i] === intRd) {
                flag = 1;
                break;
              }
            }

            if (flag === 0) {
              array[count] = intRd;
              count++;
            }
          }

          return array;
        },

        /**
         * 获取随机整数
         * @param {Number} min 最小值
         * @param {Number} max 最大值
         * @returns 
         */
        getRandomInt: function getRandomInt(min, max) {
          var r = Math.random();
          var rr = r * (max - min + 1) + min;
          return Math.floor(rr);
        },

        /**
         * 获取字符串长度
         * @param {string} render 
         * @returns 
         */
        getStringLength: function getStringLength(render) {
          var strArr = render;
          var len = 0;

          for (var i = 0, n = strArr.length; i < n; i++) {
            var val = strArr.charCodeAt(i);

            if (val <= 255) {
              len = len + 1;
            } else {
              len = len + 2;
            }
          }

          return Math.ceil(len / 2);
        },

        /**
         * 判断传入的参数是否为空的Object。数组或undefined会返回false
         * @param obj
         */
        isEmptyObject: function isEmptyObject(obj) {
          var result = true;

          if (obj && obj.constructor === Object) {
            for (var key in obj) {
              if (obj.hasOwnProperty(key)) {
                result = false;
                break;
              }
            }
          } else {
            result = false;
          }

          return result;
        },

        /**
         * 判断是否是新的一天
         * @param {Object|Number} dateValue 时间对象 todo MessageCenter 与 pve 相关的时间存储建议改为 Date 类型
         * @returns {boolean}
         */
        isNewDay: function isNewDay(dateValue) {
          // todo：是否需要判断时区？
          var oldDate = new Date(dateValue);
          var curDate = new Date();
          var oldYear = oldDate.getYear();
          var oldMonth = oldDate.getMonth();
          var oldDay = oldDate.getDate();
          var curYear = curDate.getYear();
          var curMonth = curDate.getMonth();
          var curDay = curDate.getDate();

          if (curYear > oldYear) {
            return true;
          } else {
            if (curMonth > oldMonth) {
              return true;
            } else {
              if (curDay > oldDay) {
                return true;
              }
            }
          }

          return false;
        },

        /**
         * 获取对象属性数量
         * @param {object}o 对象
         * @returns 
         */
        getPropertyCount: function getPropertyCount(o) {
          var n,
              count = 0;

          for (n in o) {
            if (o.hasOwnProperty(n)) {
              count++;
            }
          }

          return count;
        },

        /**
         * 返回一个差异化数组（将array中diff里的值去掉）
         * @param array
         * @param diff
         */
        difference: function difference(array, diff) {
          var result = [];

          if (array.constructor !== Array || diff.constructor !== Array) {
            return result;
          }

          var length = array.length;

          for (var i = 0; i < length; i++) {
            if (diff.indexOf(array[i]) === -1) {
              result.push(array[i]);
            }
          }

          return result;
        },
        //public method for encoding
        base64encode: function base64encode(input) {
          var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          var output = "",
              chr1,
              chr2,
              chr3,
              enc1,
              enc2,
              enc3,
              enc4,
              i = 0;
          input = this.utf8Encode(input);

          while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = (chr1 & 3) << 4 | chr2 >> 4;
            enc3 = (chr2 & 15) << 2 | chr3 >> 6;
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
              enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
              enc4 = 64;
            }

            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
          }

          return output;
        },
        // private method for UTF-8 encoding
        utf8Encode: function utf8Encode(string) {
          string = string.replace(/\r\n/g, "\n");
          var utftext = "";

          for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);

            if (c < 128) {
              utftext += String.fromCharCode(c);
            } else if (c > 127 && c < 2048) {
              utftext += String.fromCharCode(c >> 6 | 192);
              utftext += String.fromCharCode(c & 63 | 128);
            } else {
              utftext += String.fromCharCode(c >> 12 | 224);
              utftext += String.fromCharCode(c >> 6 & 63 | 128);
              utftext += String.fromCharCode(c & 63 | 128);
            }
          }

          return utftext;
        },
        base64Decode: function base64Decode(input) {
          var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          var output = "";
          var chr1;
          var chr2;
          var chr3;
          var enc1;
          var enc2;
          var enc3;
          var enc4;
          var i = 0;
          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

          while (i < input.length) {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));
            chr1 = enc1 << 2 | enc2 >> 4;
            chr2 = (enc2 & 15) << 4 | enc3 >> 2;
            chr3 = (enc3 & 3) << 6 | enc4;
            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
            }

            if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
            }
          }

          output = this.utf8Decode(output);
          return output;
        },
        utf8Decode: function utf8Decode(utftext) {
          var string = "";
          var i = 0;
          var c = 0;
          var c2 = 0;
          var c3 = 0;

          while (i < utftext.length) {
            c = utftext.charCodeAt(i);

            if (c < 128) {
              string += String.fromCharCode(c);
              i++;
            } else if (c > 191 && c < 224) {
              c2 = utftext.charCodeAt(i + 1);
              string += String.fromCharCode((c & 31) << 6 | c2 & 63);
              i += 2;
            } else {
              c2 = utftext.charCodeAt(i + 1);
              c3 = utftext.charCodeAt(i + 2);
              string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
              i += 3;
            }
          }

          return string;
        },
        stringToArray: function stringToArray(string) {
          // 用于判断emoji的正则们
          var rsAstralRange = "\\ud800-\\udfff";
          var rsZWJ = "\\u200d";
          var rsVarRange = "\\ufe0e\\ufe0f";
          var rsComboMarksRange = "\\u0300-\\u036f";
          var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
          var rsComboSymbolsRange = "\\u20d0-\\u20ff";
          var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
          var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');
          var rsFitz = "\\ud83c[\\udffb-\\udfff]";
          var rsOptVar = '[' + rsVarRange + ']?';
          var rsCombo = '[' + rsComboRange + ']';
          var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
          var reOptMod = rsModifier + '?';
          var rsAstral = '[' + rsAstralRange + ']';
          var rsNonAstral = '[^' + rsAstralRange + ']';
          var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
          var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
          var rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
          var rsSeq = rsOptVar + reOptMod + rsOptJoin;
          var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
          var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

          var hasUnicode = function hasUnicode(val) {
            return reHasUnicode.test(val);
          };

          var unicodeToArray = function unicodeToArray(val) {
            return val.match(reUnicode) || [];
          };

          var asciiToArray = function asciiToArray(val) {
            return val.split('');
          };

          return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
        },
        // 模拟传msg的uuid
        simulationUUID: function simulationUUID() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
          }

          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        },
        trim: function trim(str) {
          return str.replace(/(^\s*)|(\s*$)/g, "");
        },

        /**
         * 判断当前时间是否在有效时间内
         * @param {String|Number} start 起始时间。带有时区信息
         * @param {String|Number} end 结束时间。带有时区信息
         */
        isNowValid: function isNowValid(start, end) {
          var startTime = new Date(start);
          var endTime = new Date(end);
          var result = false;

          if (startTime.getDate() + '' !== 'NaN' && endTime.getDate() + '' !== 'NaN') {
            var curDate = new Date();
            result = curDate < endTime && curDate > startTime;
          }

          return result;
        },
        getDeltaDays: function getDeltaDays(start, end) {
          start = new Date(start);
          end = new Date(end);
          var startYear = start.getFullYear();
          var startMonth = start.getMonth() + 1;
          var startDate = start.getDate();
          var endYear = end.getFullYear();
          var endMonth = end.getMonth() + 1;
          var endDate = end.getDate();
          start = new Date(startYear + '/' + startMonth + '/' + startDate + ' GMT+0800').getTime();
          end = new Date(endYear + '/' + endMonth + '/' + endDate + ' GMT+0800').getTime();
          var deltaTime = end - start;
          return Math.floor(deltaTime / (24 * 60 * 60 * 1000));
        },
        getMin: function getMin(array) {
          var result = null;

          if (array.constructor === Array) {
            var length = array.length;

            for (var i = 0; i < length; i++) {
              if (i === 0) {
                result = Number(array[0]);
              } else {
                result = result > Number(array[i]) ? Number(array[i]) : result;
              }
            }
          }

          return result;
        },

        /**
         * 格式化两位小数点
         * @param time 
         * @returns 
         */
        formatTwoDigits: function formatTwoDigits(time) {
          //@ts-ignore
          return (Array(2).join(0) + time).slice(-2);
        },

        /**
         * 获取格式化后的日期（不含小时分秒）
         */
        getDay: function getDay() {
          var date = new Date();
          return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        },
        formatName: function formatName(name, limit) {
          limit = limit || 6;
          var nameArray = this.stringToArray(name);
          var str = '';
          var length = nameArray.length;

          if (length > limit) {
            for (var i = 0; i < limit; i++) {
              str += nameArray[i];
            }

            str += '...';
          } else {
            str = name;
          }

          return str;
        },

        /**
         * 格式化钱数，超过10000 转换位 10K   10000K 转换为 10M
         */
        formatMoney: function formatMoney(money) {
          var arrUnit = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B', 'N', 'D'];
          var strValue = '';

          for (var idx = 0; idx < arrUnit.length; idx++) {
            if (money >= 10000) {
              money /= 1000;
            } else {
              strValue = Math.floor(money) + arrUnit[idx];
              break;
            }
          }

          if (strValue === '') {
            strValue = Math.floor(money) + 'U'; //超过最大值就加个U
          }

          return strValue;
        },

        /**
         * 根据剩余秒数格式化剩余时间 返回 HH:MM:SS
         * @param {Number} leftSec 
         */
        formatTimeForSecond: function formatTimeForSecond(leftSec) {
          var timeStr = '';
          var sec = leftSec % 60;
          var leftMin = Math.floor(leftSec / 60);
          leftMin = leftMin < 0 ? 0 : leftMin;
          var hour = Math.floor(leftMin / 60);
          var min = leftMin % 60;

          if (hour > 0) {
            timeStr += hour > 9 ? hour.toString() : '0' + hour;
            timeStr += ':';
          }

          timeStr += min > 9 ? min.toString() : '0' + min;
          timeStr += ':';
          timeStr += sec > 9 ? sec.toString() : '0' + sec;
          return timeStr;
        },

        /**
        *  根据剩余毫秒数格式化剩余时间 返回 HH:MM:SS
        *
        * @param {Number} ms
        */
        formatTimeForMillisecond: function formatTimeForMillisecond(ms) {
          var second = Math.floor(ms / 1000 % 60);
          var minute = Math.floor(ms / 1000 / 60 % 60);
          var hour = Math.floor(ms / 1000 / 60 / 60);
          return hour + ":" + minute + ":" + second;
        },
        // /**
        //  * TODO 需要将pako进行引入，目前已经去除了压缩算法的需要，如需要使用需引入库文件
        //  * 将字符串进行压缩
        //  * @param {String} str 
        //  */
        // zip(str: any) {
        //     var binaryString = pako.gzip(encodeURIComponent(str), { to: 'string' });
        //     return this.base64encode(binaryString);
        // },
        // /**
        //  * todo 目前已经去除了压缩算法的需要，如需要使用需引入库文件
        //  * 将数据进行解压
        //  * @param {String} b64Data 
        //  */
        // unZip(b64Data: any) {
        //     var strData = this.base64Decode(b64Data);
        //     // Convert binary string to character-number array
        //     var charData = strData.split('').map(function (x) { return x.charCodeAt(0); });
        //     // Turn number array into byte-array
        //     var binData = new Uint8Array(charData);
        //     // // unzip
        //     var data = pako.inflate(binData);
        //     // Convert gunzipped byteArray back to ascii string:
        //     strData = String.fromCharCode.apply(null, new Uint16Array(data));
        //     return decodeURIComponent(strData);
        // },

        /**
         * 数据加密
         * @param {String} str 
         */
        encrypt: function encrypt(str) {
          var b64Data = this.base64encode(str);
          var n = 6;

          if (b64Data.length % 2 === 0) {
            n = 7;
          }

          var encodeData = '';

          for (var idx = 0; idx < (b64Data.length - n + 1) / 2; idx++) {
            encodeData += b64Data[2 * idx + 1];
            encodeData += b64Data[2 * idx];
          }

          encodeData += b64Data.slice(b64Data.length - n + 1);
          return encodeData;
        },

        /**
         * 数据解密
         * @param {String} b64Data 
         */
        decrypt: function decrypt(b64Data) {
          var n = 6;

          if (b64Data.length % 2 === 0) {
            n = 7;
          }

          var decodeData = '';

          for (var idx = 0; idx < b64Data.length - n; idx += 2) {
            decodeData += b64Data[idx + 1];
            decodeData += b64Data[idx];
          }

          decodeData += b64Data.slice(b64Data.length - n + 1);
          decodeData = this.base64Decode(decodeData);
          return decodeData;
        }
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/levelUI.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './constants.ts', './sceneManager.ts', './playerData.ts', './uiManager.ts', './LanguageData.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Node, Label, Animation, Sprite, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil, constants, SceneManager, playerData, uiManager, t;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Label = module.Label;
      Animation = module.Animation;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      SceneManager = module.SceneManager;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      t = module.t;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

      cclegacy._RF.push({}, "09faeI+TthOKbk54kKEeYOU", "levelUI", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var LevelUI = exports('LevelUI', (_dec = ccclass('LevelUI'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Label), _dec7 = property(Animation), _dec8 = property(Sprite), _dec9 = property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LevelUI, _Component);

        function LevelUI() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "nStars", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nCurrentLevel", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nLevelNotPassed", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nLevelPassed", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbLevel", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "aniTips", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spAvatar", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "arrStarNode", _descriptor8, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "levelInfo", void 0);

          _defineProperty(_assertThisInitialized(_this), "updateInterval", void 0);

          _defineProperty(_assertThisInitialized(_this), "lastPositionY", void 0);

          _defineProperty(_assertThisInitialized(_this), "pool", void 0);

          _defineProperty(_assertThisInitialized(_this), "pool1", void 0);

          return _this;
        }

        var _proto = LevelUI.prototype;

        _proto.onLoad = function onLoad() {
          this.aniTips.once(Animation.EventType.FINISHED, this.onAniTipsFinished, this);
        };

        _proto.onDisable = function onDisable() {
          this.aniTips.once(Animation.EventType.FINISHED, this.onAniTipsFinished, this);
        };

        _proto.onAniTipsFinished = function onAniTipsFinished() {
          this.aniTips.play('pveLevelTipsIdle');
        };

        _proto.init = function init(levelInfo) {
          this.levelInfo = levelInfo;
          this.setLevelNum(levelInfo.name);
          this.setLevelStatus(levelInfo.status);
          this.setStars(levelInfo.star);

          if (playerData.instance.playerInfo.avatarUrl) {
            resourceUtil.setAvatar(playerData.instance.playerInfo.avatarUrl, this.spAvatar, function () {});
          }
        };

        _proto.setLevelNum = function setLevelNum(number) {
          this.lbLevel.string = number;
        };

        _proto.setLevelStatus = function setLevelStatus(status) {
          if (status === constants.PVE_LEVEL_STATUS.DONE) {
            this.nCurrentLevel.active = false;
            this.nLevelNotPassed.active = false;
            this.nLevelPassed.active = true;
          } else if (status === constants.PVE_LEVEL_STATUS.DOING) {
            this.nCurrentLevel.active = true;
            this.nLevelNotPassed.active = false;
            this.nLevelPassed.active = false;
          } else {
            this.nCurrentLevel.active = false;
            this.nLevelNotPassed.active = true;
            this.nLevelPassed.active = false;
          }
        };

        _proto.setStars = function setStars(stars) {
          if (!stars) {
            this.nStars.active = false;
            return;
          }

          this.nStars.active = true;

          for (var i = 0; i < constants.MAX_GRADE_OF_EACH_PVE_LEVEL; i++) {
            var acheived = false;

            if (i <= stars - 1) {
              acheived = true;
            }

            this.arrStarNode[i].active = acheived;
          }
        };

        _proto.onBtnLevelChallenge = function onBtnLevelChallenge() {
          if (this.levelInfo.status === constants.PVE_LEVEL_STATUS.UNDONE) {
            uiManager.instance.showTips(t('pve.cannotSkipLastLevel'));
            return;
          }

          uiManager.instance.showDialog('pve/levelPanel', [this.levelInfo, this.levelCallback]);
        };

        _proto.levelCallback = function levelCallback() {
          // let timeStamp = Date.now();
          try {
            playerData.instance.level = this.levelInfo.ID;
            SceneManager.instance.loadScene('fight', [function (cb) {
              cb();
            }], function (err, result) {
              if (err) {
                console.error(err.message || err);
                return;
              }
            });
          } catch (error) {
            console.log("levelCallback.error", error);
          }
        };

        return LevelUI;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nStars", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nCurrentLevel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nLevelNotPassed", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nLevelPassed", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "lbLevel", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "aniTips", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "spAvatar", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "arrStarNode", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/fightGuide.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './animationUI.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _inheritsLoose, _defineProperty, _assertThisInitialized, AnimationUI;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      AnimationUI = module.AnimationUI;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "0c335oC9Y9Fc5YWelPxejg7", "fightGuide", undefined);

      var ccclass = _decorator.ccclass;
      var FightGuide = exports('FightGuide', (_dec = ccclass('FightGuide'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FightGuide, _Component);

        function FightGuide() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "startTime", void 0);

          _defineProperty(_assertThisInitialized(_this), "closeCb", void 0);

          return _this;
        }

        var _proto = FightGuide.prototype;

        _proto.show = function show(callback) {
          this.startTime = Date.now();
          this.closeCb = callback;
        };

        _proto.onBtnCloseClick = function onBtnCloseClick() {
          var _this2 = this;

          var ani = this.node.getComponent(AnimationUI);

          if (ani) {
            ani.close(function () {
              _this2.node && _this2.node.destroy();
            });
          } else {
            this.node && this.node.destroy();
          }

          if (this.closeCb) {
            this.closeCb();
          }
        };

        return FightGuide;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/fightNum.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Animation, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "0e8531febFP+ojrUxtAih7t", "fightNum", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var FightNum = exports('FightNum', (_dec = ccclass('FightNum'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FightNum, _Component);

        function FightNum() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "lbNum", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ani", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "font1", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "font2", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = FightNum.prototype;

        _proto.show = function show(value, callback) {
          this.lbNum.string = value;
          var scale = 1;

          if (value <= 50) {
            this.lbNum.font = this.font1;
          } else {
            this.lbNum.font = this.font2;
            scale = 1.2;
          }

          this.node.setScale(scale, scale, scale);
          this.ani.once(Animation.EventType.FINISHED, callback);
          this.ani.play('fightNum');
        };

        return FightNum;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbNum", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ani", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "font1", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "font2", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/localConfig.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './csvManager.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, resources, _defineProperty, _createClass, resourceUtil, CSVManager;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      resources = module.resources;
    }, function (module) {
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      CSVManager = module.CSVManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "12facSZhFRGIYa7yxiLVDOp", "localConfig", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var localConfig = exports('localConfig', (_dec = ccclass("localConfig"), _dec(_class = (_temp = _class2 = /*#__PURE__*/function () {
        function localConfig() {
          _defineProperty(this, "_csvManager", new CSVManager());

          _defineProperty(this, "_callback", new Function());

          _defineProperty(this, "_currentLoad", 0);

          _defineProperty(this, "_cntLoad", 0);
        }

        var _proto = localConfig.prototype;
        /**
         * 加载配置文件
         * @param {Function}cb 回调函数 
         */

        _proto.loadConfig = function loadConfig(cb) {
          this._callback = cb;

          this._loadCSV();
        };

        _proto._loadCSV = function _loadCSV() {
          var _this = this; //新增数据表 请往该数组中添加....


          resources.loadDir("datas", function (err, assets) {
            if (err) {
              return;
            }

            var arrCsvFiles = assets.filter(function (item) {
              return item._native !== ".md";
            });
            _this._cntLoad = arrCsvFiles.length; //客户端加载

            if (arrCsvFiles.length) {
              arrCsvFiles.forEach(function (item, index, array) {
                resourceUtil.getTextData(item.name, function (err, content) {
                  _this._csvManager.addTable(item.name, content);

                  _this._tryToCallbackOnFinished();
                });
              });
            } else {
              _this._tryToCallbackOnFinished();
            }
          });
        }
        /**
         * 查询一条表内容
         * @param {string} tableName 表名
         * @param {string} key 列名
         * @param {any} value 值
         * @returns {Object} 一条表内容
         */
        ;

        _proto.queryOne = function queryOne(tableName, key, value) {
          return this._csvManager.queryOne(tableName, key, value);
        }
        /**
         * 根据ID查询一条表内容
         * @param {string}tableName 表名
         * @param {string}ID
         * @returns {Object} 一条表内容
         */
        ;

        _proto.queryByID = function queryByID(tableName, ID) {
          return this._csvManager.queryByID(tableName, ID);
        }
        /**
         * 根据表名获取表的所有内容
         * @param {string} tableName  表名
         * @returns {object} 表内容
         */
        ;

        _proto.getTable = function getTable(tableName) {
          return this._csvManager.getTable(tableName);
        }
        /**
         * 根据表名获取表的所有内容
         * @param {string} tableName  表名
         * @returns {object} 表内容
         */
        ;

        _proto.getTableArr = function getTableArr(tableName) {
          return this._csvManager.getTableArr(tableName);
        }
        /**
         * 查询key和value对应的所有行内容
         * @param {string} tableName 表名
         * @param {string} key 列名
         * @param {any} value 值
         * @returns {Object}
         */
        ;

        _proto.queryAll = function queryAll(tableName, key, value) {
          return this._csvManager.queryAll(tableName, key, value);
        } // 

        /**
         * 选出指定表里所有 key 的值在 values 数组中的数据，返回 Object，key 为 ID
         * @param {string} tableName 表名
         * @param {string} key  列名
         * @param {Array}values 数值
         * @returns 
         */
        ;

        _proto.queryIn = function queryIn(tableName, key, values) {
          return this._csvManager.queryIn(tableName, key, values);
        }
        /**
         * 选出符合条件的数据。condition key 为表格的key，value 为值的数组。返回的object，key 为数据在表格的ID，value为具体数据
         * @param {string} tableName 表名
         * @param {any} condition 筛选条件
         * @returns 
         */
        ;

        _proto.queryByCondition = function queryByCondition(tableName, condition) {
          return this._csvManager.queryByCondition(tableName, condition);
        };

        _proto._tryToCallbackOnFinished = function _tryToCallbackOnFinished() {
          if (this._callback) {
            this._currentLoad++;

            if (this._currentLoad >= this._cntLoad) {
              this._callback();
            }
          }
        };

        _createClass(localConfig, null, [{
          key: "instance",
          get: function get() {
            if (this._instance) {
              return this._instance;
            }

            this._instance = new localConfig();
            return this._instance;
          }
        }]);

        return localConfig;
      }(), _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/sceneManager.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './constants.ts', './clientEvent.ts', './loadingUI.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, director, game, find, instantiate, Component, _defineProperty, _inheritsLoose, _assertThisInitialized, _createClass, resourceUtil, constants, clientEvent, LoadingUI;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      director = module.director;
      game = module.game;
      find = module.find;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      _defineProperty = module.defineProperty;
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      LoadingUI = module.LoadingUI;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "1c9f2SaApBI24JPUfdbbqk8", "sceneManager", undefined);

      var ccclass = _decorator.ccclass;
      var SceneManager = exports('SceneManager', (_dec = ccclass('SceneManager'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SceneManager, _Component);

        function SceneManager() {
          var _this2;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this2 = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this2), "curLoadingScene", null);

          _defineProperty(_assertThisInitialized(_this2), "callback", null);

          _defineProperty(_assertThisInitialized(_this2), "loading", null);

          _defineProperty(_assertThisInitialized(_this2), "tasks", null);

          _defineProperty(_assertThisInitialized(_this2), "isStop", false);

          return _this2;
        }

        var _proto = SceneManager.prototype;

        _proto.loadScene = function loadScene(sceneName, tasks, callback) {
          this.curLoadingScene = sceneName;
          this.callback = callback;
          var type = constants.SCENE_MANAGER_TYPE.LOAD_SCENE;

          var _this = this;

          tasks.push(this.preloadScene.bind(this));
          var parent = director.getScene();
          this.initLoadingUI(parent, 'loading', function () {
            _this.loading.getComponent(LoadingUI).startLoading(type, tasks, function (err, result) {
              if (err) {
                console.error(err.message || err);

                _this.callback.apply(null, [err].concat(result));

                return;
              }

              try {
                director.loadScene(_this.curLoadingScene, function () {
                  _this.callback.apply(null, [null].concat(null));

                  game.removePersistRootNode(_this.loading);

                  _this.loading.removeFromParent();

                  clientEvent.dispatchEvent("onSceneChanged");
                });
              } catch (error) {
                console.log("loadScene", sceneName, error);
              }
            });
          });
        };

        _proto.preloadScene = function preloadScene() {
          var arg = arguments;

          var onSceneLoaded = function onSceneLoaded() {
            arg[arg.length - 1].apply(null, Array.prototype.slice.call(arg, 1));
          };

          director.preloadScene(this.curLoadingScene, onSceneLoaded);
        };

        _proto.load = function load(tasks, callback) {
          this.callback = callback;
          this.tasks = tasks;

          var _this = this;

          var type = constants.SCENE_MANAGER_TYPE.LOAD;
          var canvas = find('Canvas');
          this.initLoadingUI(canvas, 'loading', function () {
            _this.loading.setPosition(0, 0);

            _this.loading.getComponent(LoadingUI).startLoading(type, _this.tasks, function (err, result) {
              if (err) {
                console.error(err.message || err);

                _this.callback.apply(null, [err].concat(result));

                return;
              }

              _this.callback.apply(null, [null].concat(null));
            });
          });
        };

        _proto.initLoadingUI = function initLoadingUI(parent, name, cb) {
          var _this = this;

          resourceUtil.getUIPrefabRes('loading/' + name, function (error, prefab) {
            if (!_this.loading || _this.loading.name !== 'loading') {
              delete _this.loading;
              _this.loading = instantiate(prefab);
              _this.loading.active = false;

              if (!_this.loading) {
                console.error("1getUIPrefabRes Error ", name, parent.name);
              } else if (!parent) {
                console.error("2getUIPrefabRes Error ", name, parent);
              } else {
                parent.addChild(_this.loading, 999);
              }
            }

            cb();
          });
        };

        _proto.enterSceneByAnimation = function enterSceneByAnimation(name, sceneName, tasks, callback) {
          this.curLoadingScene = sceneName;
          this.callback = callback;

          var _this = this;

          tasks.push(this.preloadScene.bind(this));
          var parent = director.getScene();
          this.initLoadingUI(parent, name, function () {
            _this.loading.getComponent('loadingCloudUI').startLoading(false, tasks, function (err, result) {
              if (err) {
                console.error(err.message || err);

                _this.callback.apply(null, [err].concat(result));

                return;
              }

              director.preloadScene(_this.curLoadingScene, function () {
                director.loadScene(_this.curLoadingScene, function () {
                  _this.loading.getComponent('loadingCloudUI').endLoading(true);

                  _this.callback.apply(null, [null].concat(null));

                  clientEvent.dispatchEvent("onSceneChanged");
                });
              });
            });
          });
        };

        _proto.discontinue = function discontinue() {
          this.loading && this.loading.destroy();
        };

        _createClass(SceneManager, null, [{
          key: "instance",
          get: function get() {
            if (this._instance) {
              return this._instance;
            }

            this._instance = new SceneManager();
            return this._instance;
          }
        }]);

        return SceneManager;
      }(Component), _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/buy.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './constants.ts', './clientEvent.ts', './utils.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './LanguageData.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Color, Animation, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil, constants, clientEvent, utils, localConfig, playerData, uiManager, t, GameLogic;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Color = module.Color;
      Animation = module.Animation;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      utils = module.utils;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      t = module.t;
    }, function (module) {
      GameLogic = module.GameLogic;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _temp;

      cclegacy._RF.push({}, "1f6e9kNl7VAkLVmkwCJLBL2", "buy", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Buy = exports('Buy', (_dec = ccclass('Buy'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Buy, _Component);

        function Buy() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "lbTitle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbNum", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbDesc", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbGold", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbGoldNum", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbAd", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spProp", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spAdIcon", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "btnBuy", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeBtnBuy", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeBtnAd", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "imgShare", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "imgAd", _descriptor13, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "propId", void 0);

          _defineProperty(_assertThisInitialized(_this), "eventType", void 0);

          _defineProperty(_assertThisInitialized(_this), "countPerBuy", void 0);

          _defineProperty(_assertThisInitialized(_this), "propNum", void 0);

          _defineProperty(_assertThisInitialized(_this), "cost", void 0);

          _defineProperty(_assertThisInitialized(_this), "getPropType", void 0);

          return _this;
        }

        var _proto = Buy.prototype;

        _proto.onEnable = function onEnable() {
          clientEvent.on('updateGold', this.updateGold, this);
          clientEvent.on('updateInfiniteShareTimes', this.updateBuyBtn, this);
        };

        _proto.onDisable = function onDisable() {
          clientEvent.off('updateGold', this.updateGold, this);
          clientEvent.off('updateInfiniteShareTimes', this.updateBuyBtn, this);
        };

        _proto.showBuy = function showBuy(isShow) {
          this.nodeBtnBuy.active = isShow;
          this.nodeBtnAd.active = !isShow;
        };

        _proto.show = function show(propId, eventType) {
          this.propId = propId;
          this.eventType = eventType;
          var prop = localConfig.instance.queryByID('prop', propId);

          if (!prop) {
            console.error('prop was error!', propId);
            this.close();
            return;
          }

          this.countPerBuy = prop.countPerBuy;
          this.lbTitle.string = t('table_prop.' + prop.name);
          this.propNum = prop.countPerBuy;
          this.lbNum.string = 'X ' + this.propNum;
          this.lbDesc.string = t('table_prop.' + prop.desc);
          this.cost = prop.countPerBuy * prop.price;
          this.lbGold.string = this.cost;

          if (this.cost > playerData.instance.getGold()) {
            this.btnBuy.interactable = false;
            this.lbGold.color = Color.RED;
          } else {
            this.btnBuy.interactable = true;
            this.lbGold.color = Color.WHITE;
          }

          resourceUtil.setPropIcon(prop.icon, this.spProp, function () {});
          var ani = this.node.getComponent(Animation);
          ani.once(Animation.EventType.FINISHED, function () {
            ani.play('buy');
          });
          this.updateGold();
          this.updateBuyBtn();
        };

        _proto.updateBuyBtn = function updateBuyBtn() {
          var _this2 = this;

          if (this.propId === constants.PROP_ID.INFINITE) {
            this.showBuy(false);
            GameLogic.instance.getOpenRewardType(constants.SHARE_FUNCTION.BUY_INFINITE, function (err, type) {
              _this2.getPropType = type;

              switch (type) {
                case constants.OPEN_REWARD_TYPE.AD:
                  _this2.spAdIcon.spriteFrame = _this2.imgAd;
                  break;

                case constants.OPEN_REWARD_TYPE.SHARE:
                  _this2.spAdIcon.spriteFrame = _this2.imgShare;
                  break;

                case constants.OPEN_REWARD_TYPE.NULL:
                  _this2.showBuy(true);

                  break;
              }

              var infiniteShareTimes = playerData.instance.getInfiniteTimes();

              if (infiniteShareTimes >= constants.MAX_INFINITE_TIMES) {
                _this2.spAdIcon.node.active = false;
                _this2.lbAd.string = t('shop.receive');
              } else {
                _this2.spAdIcon.node.active = true;
                _this2.lbAd.string = infiniteShareTimes + '/' + constants.MAX_INFINITE_TIMES;
              }
            });
          } else {
            this.showBuy(true);
          }
        };

        _proto.onBtnCloseClick = function onBtnCloseClick() {
          this.close();
        };

        _proto.onBtnBuyClick = function onBtnBuyClick() {
          GameLogic.instance.addGold(-this.cost);
          clientEvent.dispatchEvent('updateInfiniteShareTimes');
          this.rewardProp();
          this.close();
        };

        _proto.rewardProp = function rewardProp() {
          var itemInfo = {};
          itemInfo['itemType'] = constants.REWARD_TYPE.PROP;
          itemInfo['itemSubType'] = this.propId;
          itemInfo['itemAmount'] = this.countPerBuy;
          uiManager.instance.showDialog('lottery/reward', [itemInfo, false, constants.SHARE_FUNCTION.BUY_INFINITE]);
        };

        _proto.onBtnReceiveClick = function onBtnReceiveClick() {
          var infiniteShareTimes = playerData.instance.getInfiniteTimes();

          if (infiniteShareTimes >= constants.MAX_INFINITE_TIMES) {
            playerData.instance.exchangeInfiniteProp(); //消耗次数

            this.rewardProp();
          }
        };

        _proto.close = function close() {
          uiManager.instance.hideDialog('props/buy');
        };

        _proto.updateGold = function updateGold() {
          this.lbGoldNum.string = utils.formatMoney(playerData.instance.getGold());
        };

        return Buy;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbTitle", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbNum", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbDesc", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbGold", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "lbGoldNum", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "lbAd", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "spProp", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "spAdIcon", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "btnBuy", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "nodeBtnBuy", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "nodeBtnAd", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "imgShare", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "imgAd", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/balance.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './constants.ts', './clientEvent.ts', './sceneManager.ts', './playerData.ts', './uiManager.ts', './audioManager.ts', './LanguageData.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Animation, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, constants, clientEvent, SceneManager, playerData, uiManager, AudioManager, t, GameLogic;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      SceneManager = module.SceneManager;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      t = module.t;
    }, function (module) {
      GameLogic = module.GameLogic;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _temp;

      cclegacy._RF.push({}, "22cecTzEh5L6o8yC7/SYP4X", "balance", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Balance = exports('Balance', (_dec = ccclass('Balance'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Balance, _Component);

        function Balance() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "lbLevel", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbScore", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbHighest", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbGold", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "arrStar", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "arrStarLight", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndBtnDouble", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spBtnDouble", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ani", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "aniGold", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfAd", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfShare", _descriptor12, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "isFirstInvite", void 0);

          _defineProperty(_assertThisInitialized(_this), "goldNum", void 0);

          _defineProperty(_assertThisInitialized(_this), "isOver", void 0);

          _defineProperty(_assertThisInitialized(_this), "soundStar", void 0);

          _defineProperty(_assertThisInitialized(_this), "openRewardType", void 0);

          return _this;
        }

        var _proto = Balance.prototype;

        _proto.show = function show() {
          var _this2 = this;

          this.aniGold.node.active = true;
          this.isFirstInvite = false;
          var ret = playerData.instance.finishLevel(playerData.instance.level, playerData.instance.score);
          var levelVal = playerData.instance.getCurrentLevel()['ID'] + '';
          this.goldNum = ret.gold;
          this.isOver = false;
          this.lbGold.string = ret.gold.toString();
          this.lbLevel.string = ret.levelId;
          this.lbScore.string = ret.score;
          this.lbHighest.string = t('fight.highest') + playerData.instance.getHighestScoreByLevel(ret.levelId);
          this.soundStar = 0;
          var stars = playerData.instance.arrStars;
          this.arrStar[0].active = ret.star > 0;
          this.arrStarLight[0].active = ret.star > 0;
          this.arrStar[1].active = ret.star > 1;
          this.arrStarLight[1].active = ret.star > 1;
          this.arrStar[2].active = ret.star > 2;
          this.arrStarLight[2].active = ret.star > 2;
          this.ani.play("balanceShow");
          this.ani.once(Animation.EventType.FINISHED, function () {
            _this2.ani.play('balanceIdle');
          }, this);

          if (this.goldNum > 0) {
            GameLogic.instance.getOpenRewardType(constants.SHARE_FUNCTION.FILL_SIGN, function (err, type) {
              if (!err) {
                _this2.openRewardType = type;

                switch (type) {
                  case constants.OPEN_REWARD_TYPE.AD:
                    _this2.ndBtnDouble.active = true;
                    _this2.spBtnDouble.spriteFrame = _this2.sfAd;

                    _this2.aniGold.play();

                    break;

                  case constants.OPEN_REWARD_TYPE.SHARE:
                    _this2.ndBtnDouble.active = true;

                    _this2.aniGold.play();

                    _this2.spBtnDouble.spriteFrame = _this2.sfShare;
                    break;

                  case constants.OPEN_REWARD_TYPE.NULL:
                    _this2.ndBtnDouble.active = false;
                    break;
                }
              } else {
                _this2.close();
              }
            });
          } else {
            this.ndBtnDouble.active = false;
          }
        };

        _proto.onShowStar = function onShowStar() {
          if (this.arrStar[this.soundStar].active) {
            AudioManager.instance.playSound(constants.AUDIO_SOUND.FINISH_STAR, false);
          }

          this.soundStar++;
        };

        _proto.onDisable = function onDisable() {};

        _proto.onBtnNextClick = function onBtnNextClick() {
          GameLogic.instance.customEventStatistics(constants.ANALYTICS_TYPE.BALANCE_NEXT);

          if (this.isOver) {
            return;
          }

          this.isOver = true;
          playerData.instance.nextLevel();
          this.close();
          clientEvent.dispatchEvent('newLevel');
        };

        _proto.onBtnRetryClick = function onBtnRetryClick() {
          this.close();
          GameLogic.instance.customEventStatistics(constants.ANALYTICS_TYPE.BALANCE_PLAY_AGAIN);
          GameLogic.instance.resetLevel();
        };

        _proto.onBtnCloseClick = function onBtnCloseClick() {
          GameLogic.instance.customEventStatistics(constants.ANALYTICS_TYPE.BALANCE_CLOSE);
          this.close();
          SceneManager.instance.loadScene('pve', [], function (err, result) {
            if (err) {
              console.error(err.message || err);
              return;
            }
          });
        };

        _proto.onBtnDoubleClick = function onBtnDoubleClick() {
          var _this3 = this;

          if (this.openRewardType === constants.OPEN_REWARD_TYPE.SHARE) {
            GameLogic.instance.share(constants.SHARE_FUNCTION.BALANCE, {}, function (err) {
              if (!err) {
                _this3.showReward();
              }
            });
            GameLogic.instance.customEventStatistics(constants.ANALYTICS_TYPE.BALANCE_SHARE);
          } else {
            GameLogic.instance.showRewardAd(function (err) {
              if (!err) {
                _this3.showReward();
              }
            });
          }
        };

        _proto.showReward = function showReward() {
          if (!this.isFirstInvite) {
            this.isFirstInvite = true;
            var itemInfo = {};
            itemInfo.itemType = constants.REWARD_TYPE.GOLD;
            itemInfo.itemSubType = 0;
            itemInfo.itemAmount = this.goldNum;
            this.aniGold.node.active = false;
            uiManager.instance.showDialog('lottery/reward', [itemInfo, false, constants.SHARE_FUNCTION.BALANCE]);
          }
        };

        _proto.close = function close() {
          uiManager.instance.hideDialog('fight/balance');
        };

        return Balance;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbLevel", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbScore", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbHighest", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbGold", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "arrStar", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "arrStarLight", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnDouble", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "spBtnDouble", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "ani", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "aniGold", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "sfAd", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "sfShare", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/linkLine.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Animation, Vec3, misc, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      Vec3 = module.Vec3;
      misc = module.misc;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "23fc7Zdwd5LN4VPatBdx7mq", "linkLine", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var LinkLine = exports('LinkLine', (_dec = ccclass('LinkLine'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LinkLine, _Component);

        function LinkLine() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "animation", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = LinkLine.prototype;

        _proto.show = function show() {
          var _this2 = this;

          this.animation.play('linkLineShow');
          this.animation.once(Animation.EventType.FINISHED, function () {
            _this2.animation.play('linkLineNormal');
          });
        };

        _proto.setLinePosition = function setLinePosition(posStart, posEnd) {
          var posOffset = posEnd.clone().subtract(posStart);
          var pos = new Vec3(posStart.x + posOffset.x / 2, posStart.y + posOffset.y / 2, 0);
          this.node.position = pos;
          var degree = 0;

          if (posOffset.x !== 0) {
            degree = misc.radiansToDegrees(Math.atan(posOffset.y / posOffset.x));
          } else {
            degree = 90;
          }

          this.node.eulerAngles = new Vec3(0, 0, degree);
        };

        return LinkLine;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "animation", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/showTarget.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './clientEvent.ts', './playerData.ts', './showTargetCake.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Animation, instantiate, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, clientEvent, playerData, ShowTargetCake;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      ShowTargetCake = module.ShowTargetCake;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "2c1036ANX5HcIKmghpPMpLE", "showTarget", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ShowTarget = exports('ShowTarget', (_dec = ccclass('ShowTarget'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ShowTarget, _Component);

        function ShowTarget() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "pfCake", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeTargetGroup", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "aniTarget", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_parent", void 0);

          return _this;
        }

        var _proto = ShowTarget.prototype;

        _proto.show = function show(parent, callback) {
          var _this2 = this;

          this._parent = parent;
          this.aniTarget.play('showTarget');
          this.aniTarget.once(Animation.EventType.FINISHED, function () {
            _this2.node && _this2.node.destroy();

            if (callback) {
              callback();
            }
          }, this);

          for (var target in playerData.instance.dictTargets) {
            var nodeTarget = instantiate(this.pfCake);
            nodeTarget.parent = this.nodeTargetGroup;
            nodeTarget.getComponent(ShowTargetCake).show(target, this);
          }
        };

        _proto.showFlyEffect = function showFlyEffect(cake, srcWorldPos) {
          var targetWorldPos = this._parent.getTargetWorldPos(cake);

          if (targetWorldPos) {
            this._parent._fightScene.effectGroup.playTargetCakeFlyEffect(cake, srcWorldPos, targetWorldPos, function () {
              clientEvent.dispatchEvent('showTargetCake', cake);
            });
          } else {
            clientEvent.dispatchEvent('showTargetCake', cake);
          }
        };

        return ShowTarget;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pfCake", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nodeTargetGroup", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "aniTarget", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/signinReward.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './constants.ts', './clientEvent.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './LanguageData.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, SpriteFrame, Sprite, Label, Animation, UITransform, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil, constants, clientEvent, localConfig, playerData, uiManager, t, GameLogic;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      Sprite = module.Sprite;
      Label = module.Label;
      Animation = module.Animation;
      UITransform = module.UITransform;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      t = module.t;
    }, function (module) {
      GameLogic = module.GameLogic;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "332caaRRoVO04/rOFgXW9L6", "signinReward", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var signInReward = exports('signInReward', (_dec = ccclass('signInReward'), _dec2 = property(SpriteFrame), _dec3 = property(SpriteFrame), _dec4 = property(Sprite), _dec5 = property(Label), _dec6 = property(Animation), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(signInReward, _Component);

        function signInReward() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "sfDiamond", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfGold", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spIcon", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbRewardValue", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "aniGetItem", _descriptor5, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "itemInfo", void 0);

          _defineProperty(_assertThisInitialized(_this), "currentDay", void 0);

          _defineProperty(_assertThisInitialized(_this), "callback", void 0);

          _defineProperty(_assertThisInitialized(_this), "isLast", void 0);

          _defineProperty(_assertThisInitialized(_this), "itemType", void 0);

          _defineProperty(_assertThisInitialized(_this), "itemAmount", void 0);

          _defineProperty(_assertThisInitialized(_this), "itemSubType", void 0);

          return _this;
        }

        var _proto = signInReward.prototype;

        _proto.show = function show(itemInfo, callback, isLast) {
          var _this2 = this;

          this.itemInfo = itemInfo;
          this.currentDay = itemInfo['ID'];
          this.callback = callback;
          this.isLast = isLast;
          this.itemType = itemInfo["itemType"];
          this.itemAmount = itemInfo["itemAmount"];
          this.itemSubType = itemInfo["itemSubType"];
          this.aniGetItem.play('getItemShow');
          this.aniGetItem.once(Animation.EventType.FINISHED, function () {
            _this2.aniGetItem.play('getItemIdle');
          }, this);
          this.setRewardPage();
        };

        _proto.setRewardPage = function setRewardPage() {
          var uiTraSpIcon = this.spIcon.getComponent(UITransform);

          switch (this.itemType) {
            case constants.REWARD_TYPE.DIAMOND:
              this.spIcon.spriteFrame = this.sfDiamond;
              this.lbRewardValue.string = this.itemAmount;
              break;

            case constants.REWARD_TYPE.GOLD:
              this.spIcon.spriteFrame = this.sfGold;
              this.lbRewardValue.string = this.itemAmount;
              uiTraSpIcon.width = 257;
              uiTraSpIcon.height = 166;
              break;

            case constants.REWARD_TYPE.PROP:
              var propId = this.itemSubType;
              var propData = localConfig.instance.queryByID('prop', propId + '');
              resourceUtil.setPropIcon("00" + propId, this.spIcon, function () {});
              uiTraSpIcon.width = 168;
              uiTraSpIcon.height = 168;
              var txt = t('table_prop.' + propData.name);
              this.lbRewardValue.string = txt + t('') + ' x ' + this.itemAmount;
              break;
          }
        };

        _proto.onBtnReceiveClick = function onBtnReceiveClick() {
          this.addReward();

          if (this.isLast) {
            //当前的isLast
            var isReceive = null;
            GameLogic.instance.getOpenRewardType(constants.SHARE_FUNCTION.FILL_SIGN, function (err, type) {
              if (!err) {
                switch (type) {
                  case constants.OPEN_REWARD_TYPE.AD:
                    isReceive = playerData.instance.getSignInReceivedInfo()['isAllReceived'];
                    break;

                  case constants.OPEN_REWARD_TYPE.SHARE:
                    isReceive = playerData.instance.getSignInReceivedInfo()['isAllReceived'];
                    break;

                  case constants.OPEN_REWARD_TYPE.NULL:
                    isReceive = playerData.instance.getSignInReceivedInfo()['isTodayReceived'];
                    break;
                }
              } else {
                isReceive = playerData.instance.getSignInReceivedInfo()['isAllReceived'];
              }
            });

            if (!isReceive) {
              //null：是今天否领取完，分享广告：是否全部领取完，如果没有则接着显示signIn界面
              uiManager.instance.showDialog('signIn/signIn');
            } else {
              //直接隐藏自己
              uiManager.instance.hideDialog("signIn/signInReward");
            }
          }

          uiManager.instance.shiftFromPopupSeq('signIn/signInReward'); //关闭当前奖励界面，显示下一个
        };

        _proto.addReward = function addReward() {
          switch (this.itemType) {
            case constants.REWARD_TYPE.DIAMOND:
              GameLogic.instance.addDiamond(this.itemAmount);
              break;

            case constants.REWARD_TYPE.GOLD:
              GameLogic.instance.addGold(this.itemAmount);
              break;

            case constants.REWARD_TYPE.PROP:
              GameLogic.instance.addProp(this.itemSubType, this.itemAmount);
              break;
          }

          if (this.currentDay) {
            playerData.instance.updateSignInReceivedDays(this.currentDay);
            clientEvent.dispatchEvent('updateSignIn');
          }

          if (this.callback) {
            this.callback();
          }
        };

        return signInReward;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sfDiamond", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sfGold", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbRewardValue", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "aniGetItem", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LocalizedMaterial.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './LanguageData.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Material, MeshRenderer, Component, _applyDecoratedDescriptor, _initializerDefineProperty, _inheritsLoose, _defineProperty, _assertThisInitialized, ready, _init, _language;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Material = module.Material;
      MeshRenderer = module.MeshRenderer;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      ready = module.ready;
      _init = module.init;
      _language = module._language;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp, _dec3, _dec4, _class4, _class5, _descriptor3, _temp2;

      cclegacy._RF.push({}, "35069qDXPFL47Ep1p+WLvRd", "LocalizedMaterial", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode;
      var LocalizedMaterialItem = (_dec = ccclass('LocalizedMaterialItem'), _dec2 = property({
        type: Material
      }), _dec(_class = (_class2 = (_temp = function LocalizedMaterialItem() {
        _initializerDefineProperty(this, "language", _descriptor, this);

        _initializerDefineProperty(this, "material", _descriptor2, this);
      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "language", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'en';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "material", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class);
      var LocalizedMaterial = exports('LocalizedMaterial', (_dec3 = ccclass('LocalizedMaterial'), _dec4 = property({
        type: LocalizedMaterialItem
      }), _dec3(_class4 = executeInEditMode(_class4 = (_class5 = (_temp2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LocalizedMaterial, _Component);

        function LocalizedMaterial() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "mesh", null);

          _initializerDefineProperty(_assertThisInitialized(_this), "materialsList", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = LocalizedMaterial.prototype;

        _proto.onLoad = function onLoad() {
          if (!ready) {
            _init('zh');
          }

          this.fetchRender();
        };

        _proto.fetchRender = function fetchRender() {
          var mesh = this.getComponent(MeshRenderer);

          if (mesh) {
            this.mesh = mesh;
            this.updateMat();
            return;
          }
        };

        _proto.updateMat = function updateMat() {
          for (var i = 0; i < this.materialsList.length; i++) {
            var item = this.materialsList[i]; // @ts-ignore

            if (item.language === _language) {
              // @ts-ignore
              this.mesh && this.mesh.setMaterial(item.material, 0);
            }
          }
        };

        return LocalizedMaterial;
      }(Component), _temp2), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "materialsList", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class5)) || _class4) || _class4));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/multiScrollView.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './utils.ts', './localConfig.ts', './playerData.ts', './loadsh.ts', './pveSlotUI.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, NodePool, instantiate, UITransform, Size, Vec3, Vec2, view, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, utils, localConfig, playerData, loadsh, PveSlotUI;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      NodePool = module.NodePool;
      instantiate = module.instantiate;
      UITransform = module.UITransform;
      Size = module.Size;
      Vec3 = module.Vec3;
      Vec2 = module.Vec2;
      view = module.view;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      utils = module.utils;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      loadsh = module.loadsh;
    }, function (module) {
      PveSlotUI = module.PveSlotUI;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "3e6b57QbUBJ9rTvcQwwnAgL", "multiScrollView", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MultiScrollView = exports('MultiScrollView', (_dec = ccclass('MultiScrollView'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(MultiScrollView, _Component);

        function MultiScrollView() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "scrollView", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "pve1Prefab", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "pve2Prefab", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "updateTimer", void 0);

          _defineProperty(_assertThisInitialized(_this), "updateInterval", void 0);

          _defineProperty(_assertThisInitialized(_this), "lastPositionY", void 0);

          _defineProperty(_assertThisInitialized(_this), "pool", void 0);

          _defineProperty(_assertThisInitialized(_this), "pool1", void 0);

          _defineProperty(_assertThisInitialized(_this), "pool2", void 0);

          _defineProperty(_assertThisInitialized(_this), "contentNode", void 0);

          _defineProperty(_assertThisInitialized(_this), "pve1Node", void 0);

          _defineProperty(_assertThisInitialized(_this), "parent", void 0);

          _defineProperty(_assertThisInitialized(_this), "isChange", void 0);

          _defineProperty(_assertThisInitialized(_this), "arrayPrefab", void 0);

          _defineProperty(_assertThisInitialized(_this), "positions", void 0);

          _defineProperty(_assertThisInitialized(_this), "isNeedScroll", void 0);

          _defineProperty(_assertThisInitialized(_this), "currentPosition", void 0);

          _defineProperty(_assertThisInitialized(_this), "cloudPrefab", void 0);

          _defineProperty(_assertThisInitialized(_this), "positionCloud1", void 0);

          _defineProperty(_assertThisInitialized(_this), "positionCloud2", void 0);

          return _this;
        }

        var _proto = MultiScrollView.prototype;

        _proto.onLoad = function onLoad() {
          this.updateTimer = 0; //更新时间

          this.updateInterval = 0.2; //更新间隔

          this.lastPositionY = 0;
          this.pool = new NodePool(); //关卡对象池

          this.pool1 = new NodePool(); //云层1对象池

          this.pool2 = new NodePool(); //云层2对象池

          this.contentNode = this.scrollView.content;
          this.pve1Node = instantiate(this.pve1Prefab);
          this.contentNode.addChild(this.pve1Node, 999); //显示在最底层
        };

        _proto.start = function start() {
          this.show();
        };

        _proto.onEnable = function onEnable() {
          this.contentNode.on('size-changed', this.sizeChange, this);
        };

        _proto.onDisable = function onDisable() {
          this.contentNode.off('size-changed', this.sizeChange, this);
        };

        _proto.init = function init(parent) {
          this.parent = parent;
        };

        _proto.show = function show() {
          this.isChange = true;
          this.isNeedScroll = true;
          this.positions = [];
          var pve = utils.objectToArray(localConfig.instance.getTable('level'));
          var y;
          var height = -100; // 回弹范围

          var pve1Data = pve.slice(0, 1); //第一层包含1个关卡

          this.pve1Node.setPosition(0, height); //

          var uiTraContent = this.contentNode.getComponent(UITransform);
          var size = uiTraContent.contentSize;
          uiTraContent.setContentSize(new Size(size.width, this.pve1Node.getComponent(UITransform).height + height));
          this.pve1Node.getComponent(PveSlotUI).show(this, pve1Data, -1);
          this.arrayPrefab = loadsh.chunk(loadsh.drop(pve, 1), 22); //除第一层外包含22个关卡

          var length = this.arrayPrefab.length;
          var heightPve2 = this.pve2Prefab.data.getComponent(UITransform).height;

          for (var i = 0; i < length; i++) {
            y = size.height; //关卡无重合部分

            this.positions.push(new Vec3(0, y, 0));
            uiTraContent.setContentSize(new Size(size.width, y + heightPve2));
          }

          uiTraContent.setContentSize(new Size(size.width, size.height - heightPve2 / 3));
          this.addNode();
          var currentLevel = playerData.instance.getCurrentLevel();
          var index = loadsh.findIndex(pve, function (n) {
            return n.ID === currentLevel.ID;
          });
          var idxPage = index / 22;
          this.currentPosition = idxPage >= 0 ? this.positions[Math.floor(idxPage)] : new Vec2(0, 0);
          this.currentPosition = new Vec3(this.currentPosition.x, this.currentPosition.y, 0);
          var idxLevel = index % 22 + 1;
          this.currentPosition.y = this.currentPosition.y + this.pve2Prefab.data.getChildByName('level' + idxLevel).y;
          this.currentPosition.y -= view.getVisibleSize().height / 2;
          this.scrollToNode();
        };

        _proto.update = function update(dt) {
          this.scrolling();
          this.updateTimer += dt;

          if (this.updateTimer < this.updateInterval) {
            return; // we don't need to do the math every frame
          }

          this.updateTimer = 0;
          this.addNode();
        };

        _proto.addNode = function addNode() {
          if (!this.arrayPrefab) return;
          var itemHeight;

          for (var i = 0; i < this.arrayPrefab.length; i++) {
            itemHeight = this.pve2Prefab.data.getComponent(UITransform).height;
            this.updateNode(i, itemHeight, this.contentNode, this.pool, this.positions, this.pve2Prefab, this.arrayPrefab);
          }

          this.isChange = false;
        };

        _proto.updateNode = function updateNode(index, itemHeight, node, pool, positions, prefab, contents) {
          var child;
          var viewPos = this.getPositionInView(node, positions[index]);

          if (this.isOverBorder(viewPos, itemHeight)) {
            child = node.getChildByName(String(index));

            if (child) {
              this.remove(child, node, pool);
            }
          } else {
            child = node.getChildByName(String(index));

            if (!child) {
              this.create(child, index, node, pool, positions, prefab, contents);
            } else if (this.isChange) {
              var pveSlotUI = child.getComponent(PveSlotUI);
              if (pveSlotUI) pveSlotUI.show(this, contents[index], index);
              child.setPosition(positions[index]);
              child.tag = index;
            }
          }
        };

        _proto.create = function create(child, index, node, pool, positions, prefab, contents) {
          if (pool.size() > 0) {
            // 通过 size 接口判断对象池中是否有空闲的对象
            child = pool.get();
          } else {
            // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            child = instantiate(prefab);
          }

          child.setPosition(positions[index]);
          node.addChild(child);
          child.setSiblingIndex(0);
          child.name = String(index);
          var pveSlotUI = child.getComponent(PveSlotUI);
          if (pveSlotUI) pveSlotUI.show(this, contents[index], index);
        };

        _proto.remove = function remove(child, node, pool) {
          pool.put(child);
          node.removeChild(child, false);
        };

        _proto.getPositionInView = function getPositionInView(node, position) {
          var worldPos = node.getComponent(UITransform).convertToWorldSpaceAR(position);
          var viewPos = this.scrollView.node.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
          return viewPos;
        };

        _proto.isOverBorder = function isOverBorder(viewPos, itemHeight) {
          var height = this.scrollView.node.getComponent(UITransform).height;
          var borderHeight = height + height / 2 + itemHeight / 2;
          return viewPos.y > borderHeight || viewPos.y < -borderHeight;
        };

        _proto.onDestory = function onDestory() {
          this.pool.clear();
          this.pool1.clear();
          this.pool2.clear();
        };

        _proto.sizeChange = function sizeChange() {
          var size = this.contentNode.getComponent(UITransform);
          this.node.getComponent(UITransform).setContentSize(size);
        };

        _proto.scrollToNode = function scrollToNode() {
          if (this.isNeedScroll) {
            this.scrollView.scrollTo(new Vec2(0, this.currentPosition.y / (this.scrollView.node.getComponent(UITransform).height - view.getCanvasSize().height)), 0.1);
          }
        };

        _proto.scrolling = function scrolling() {
          var position = this.contentNode.getPosition();
          this.lastPositionY = position.y;
        };

        _proto.createCloud = function createCloud() {
          this.positionCloud1 = [];
          this.positionCloud2 = [];
          var winHeight = view.getCanvasSize().height;
          var totalHeight = this.contentNode.getComponent(UITransform).height;
          var n = Math.ceil(totalHeight / winHeight);
          var i;

          for (i = 0; i < n; i++) {
            this.positionCloud1.push(this.randomPosition());
          }

          for (i = 0; i < n; i++) {
            this.positionCloud2.push(this.randomPosition());
          }
        };

        _proto.randomPosition = function randomPosition() {
          var winHeight = view.getCanvasSize().height;
          var totalHeight = this.scrollView.getMaxScrollOffset().y;
          var x = utils.getRandomInt(300, 400);
          var y = utils.getRandomInt(winHeight / 2, totalHeight);
          var symbol = utils.getRandomInt(0, 1);

          if (symbol) {
            return new Vec2(x, y);
          } else {
            return new Vec2(-x, y);
          }
        };

        _proto.getCloudPrefabMaxHeight = function getCloudPrefabMaxHeight() {
          var max = 0;
          loadsh.forEach(this.cloudPrefab, function (n) {
            if (max < n.data.height) {
              max = n.data.height;
            }
          });
          return max;
        };

        return MultiScrollView;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "scrollView", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pve1Prefab", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "pve2Prefab", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/unLockProp.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './constants.ts', './clientEvent.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil, constants, clientEvent, localConfig, playerData, uiManager, GameLogic;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      GameLogic = module.GameLogic;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

      cclegacy._RF.push({}, "44716UPwaNDPLwthoATscTT", "unLockProp", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var UnLockProp = exports('UnLockProp', (_dec = ccclass('UnLockProp'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(UnLockProp, _Component);

        function UnLockProp() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "lbNum", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbName", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spIcon", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spBtnReceive", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfReceive", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfAd", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfShare", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndBtnGoStart", _descriptor8, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "_fightUI", void 0);

          _defineProperty(_assertThisInitialized(_this), "callback", void 0);

          _defineProperty(_assertThisInitialized(_this), "level", void 0);

          _defineProperty(_assertThisInitialized(_this), "unLoclProp", void 0);

          _defineProperty(_assertThisInitialized(_this), "propItem", void 0);

          _defineProperty(_assertThisInitialized(_this), "openRewardType", void 0);

          return _this;
        }

        var _proto = UnLockProp.prototype;

        _proto.show = function show(callback, fightUI) {
          var _this2 = this;

          this._fightUI = fightUI;
          this.callback = callback;
          this.level = playerData.instance.getCurrentLevelInfo().ID;
          this.unLoclProp = constants.UNLOCK_PROP_ID[this.level - 2];
          this.propItem = localConfig.instance.queryByID('prop', this.unLoclProp);
          GameLogic.instance.getOpenRewardType(constants.SHARE_FUNCTION.FIGHT, function (err, type) {
            if (!err) {
              _this2.openRewardType = type;

              switch (type) {
                case constants.OPEN_REWARD_TYPE.AD:
                  _this2.spBtnReceive.spriteFrame = _this2.sfAd;
                  break;

                case constants.OPEN_REWARD_TYPE.SHARE:
                  _this2.spBtnReceive.spriteFrame = _this2.sfShare;
                  break;

                case constants.OPEN_REWARD_TYPE.NULL:
                  _this2.spBtnReceive.spriteFrame = _this2.sfReceive;
                  break;
              }
            } else {
              _this2.close();
            }
          });
          this.ndBtnGoStart.active = false;
          this.scheduleOnce(function () {
            _this2.ndBtnGoStart.active = true;
          }, constants.NORMAL_SHOW_TIME);
          this.init();
        };

        _proto.init = function init() {
          this.lbNum.string = 1 .toString();
          this.lbName.string = this.propItem.name;
          resourceUtil.setPropIcon(this.propItem.icon, this.spIcon, function () {});
        };

        _proto.onBtnReceiveClick = function onBtnReceiveClick() {
          var _this3 = this;

          switch (this.openRewardType) {
            case constants.OPEN_REWARD_TYPE.AD:
              GameLogic.instance.showRewardAd(function (err) {
                if (!err) {
                  _this3.showUnlockProp();

                  GameLogic.instance.addProp(_this3.propItem.ID, 1);
                }
              });
              break;

            case constants.OPEN_REWARD_TYPE.SHARE:
              GameLogic.instance.share(constants.SHARE_FUNCTION.FIGHT, {}, function (err) {
                if (!err) {
                  _this3.showUnlockProp();

                  GameLogic.instance.addProp(_this3.propItem.ID, 1);
                }
              });
              break;

            case constants.OPEN_REWARD_TYPE.NULL:
              this.showUnlockProp();
              GameLogic.instance.addProp(this.propItem.ID, 1);
              break;
          }
        };

        _proto.showUnlockProp = function showUnlockProp() {
          var _this4 = this;

          this.close();

          this._fightUI.showUnlockProp(this.propItem.ID, function () {
            playerData.instance.updateUnLockInfo(_this4.propItem.ID);
            clientEvent.dispatchEvent('updateUnlockProp');

            _this4.callback();
          });
        };

        _proto.onBtnCloseClick = function onBtnCloseClick() {
          this.close();
          if (this.openRewardType == constants.OPEN_REWARD_TYPE.NULL) this.showUnlockProp();else this.callback();
        };

        _proto.close = function close() {
          uiManager.instance.hideDialog('fight/unLockProp');
        };

        return UnLockProp;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbNum", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "spBtnReceive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sfReceive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "sfAd", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "sfShare", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnGoStart", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AdmobHelper.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, game, director, Director, sys, Component, _defineProperty, _inheritsLoose, _assertThisInitialized, _createClass;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      game = module.game;
      director = module.director;
      Director = module.Director;
      sys = module.sys;
      Component = module.Component;
    }, function (module) {
      _defineProperty = module.defineProperty;
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "45c10c/c09NcoCyfYctFpgk", "AdmobHelper", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;

      window.onAdInterstitialShow = function () {
        console.log("onAdInterstitialShow call back...");
      };

      window.onAdRewardsCallBack = function (rewardAmount, rewardType) {
        console.log("onAdRewardsCallBack ", rewardAmount, rewardType);
      };

      var admobConfig = {
        bannerId: "ca-app-pub-9981907143439102/5464453126",
        interstitialId: "ca-app-pub-9981907143439102/5272881433",
        rewardsId: "ca-app-pub-9981907143439102/1333636427"
      };
      var AdmobHelper = exports('AdmobHelper', (_dec = ccclass('AdmobHelper'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AdmobHelper, _Component);

        function AdmobHelper() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "channel", void 0);

          _defineProperty(_assertThisInitialized(_this), "timer", void 0);

          return _this;
        }

        var _proto = AdmobHelper.prototype;

        _proto.onLoad = function onLoad() {
          game.addPersistRootNode(this.node);
          this.initAdbmo();
          this.initScreenShotTool();
          AdmobHelper._instance = this;
          director.on(Director.EVENT_AFTER_SCENE_LAUNCH, this.onSceneLaunch, this);
        };

        _proto.initScreenShotTool = function initScreenShotTool() {
          window.take_screen_shot = function () {
            director.once(Director.EVENT_AFTER_DRAW, function () {
              var canvas = game.canvas;
              var dataURL = canvas === null || canvas === void 0 ? void 0 : canvas.toDataURL("image/png"); // 创建一个链接元素

              var link = document.createElement("a");
              link.href = dataURL || '';
              link.download = "screenshot.png"; // 指定下载的文件名
              // 模拟点击链接以下载截图

              link.click();
            });
          };
        } //onLoad -- >>  onSceneLaunch 
        ;

        _proto.onSceneLaunch = function onSceneLaunch(scene) {
          // const currentScene = director.getScene()?.name
          var scene_name = scene.name;
          console.log("onSceneLaunch", scene_name);
          if (scene_name == "login") ;else if (scene_name == "pve") {
            this.showAdBanner();

            if (Math.random() >= 0.6) {
              this.showAdInterstitial();
            }
          } else if (scene_name == "fight") {
            if (Math.random() >= 0.75) {
              this.showAdInterstitial();
            }
          }
        };

        _proto.initAdbmo = function initAdbmo() {
          console.log("initAdbmo ");

          if (sys.platform == sys.Platform.ANDROID) {
            jsb.reflection.callStaticMethod("com/cocos/game/AdmobHelper", "initAdmob", "()V");
          }

          console.log("initAdbmo");
        };

        _proto.showAdBanner = function showAdBanner() {
          console.log("showAdBanner ");

          if (sys.platform == sys.Platform.ANDROID) {
            jsb.reflection.callStaticMethod("com/cocos/game/AdmobHelper", "showAdBanner", "(Ljava/lang/String;)V", admobConfig.bannerId);
          }

          console.log("showAdBanner ");
        };

        _proto.hideAdBanner = function hideAdBanner() {
          console.log("hideAdBanner ");

          if (sys.platform == sys.Platform.ANDROID) {
            jsb.reflection.callStaticMethod("com/cocos/game/AdmobHelper", "hideAdBanner", "()V");
          }

          console.log("hideAdBanner ");
        };

        _proto.showAdInterstitial = function showAdInterstitial() {
          console.log("showAdInterstitial ");

          if (sys.platform == sys.Platform.ANDROID) {
            jsb.reflection.callStaticMethod("com/cocos/game/AdmobHelper", "showAdInterstitial", "(Ljava/lang/String;)V", admobConfig.interstitialId);
          }
        };

        _proto.showAdReards = function showAdReards(callback) {
          //showAdReards
          console.log("showAdReards ");

          if (sys.platform == sys.Platform.ANDROID) {
            jsb.reflection.callStaticMethod("com/cocos/game/AdmobHelper", "showAdReards", "(Ljava/lang/String;)V", admobConfig.rewardsId);

            window.onAdRewardsCallBack = function (rewardAmount, rewardType) {
              console.log("onAdRewardsCallBack ", rewardAmount, rewardType);
              callback && callback(null);
            };
          } else if (sys.platform == sys.Platform.DESKTOP_BROWSER) //for testing...
            {
              console.log("For web testing AdRewards callback");
              callback && callback(null);
            }

          console.log("showAdReards ");
        };

        _createClass(AdmobHelper, null, [{
          key: "instance",
          get: function get() {
            return this._instance;
          }
        }]);

        return AdmobHelper;
      }(Component), _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/shopPropsOperation.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './localConfig.ts', './LanguageData.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, localConfig, t;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      t = module.t;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "4a0f7h1SXdPto0QRIGkEQAJ", "shopPropsOperation", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ShopPropsOperation = exports('ShopPropsOperation', (_dec = ccclass('ShopPropsOperation'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ShopPropsOperation, _Component);

        function ShopPropsOperation() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "lbTitle", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbDesc", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spTip", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "arrSftip", _descriptor4, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "type", void 0);

          return _this;
        }

        var _proto = ShopPropsOperation.prototype;

        _proto.show = function show(type) {
          this.node.active = true;
          this.type = type;
          this.refreshUI();
        };

        _proto.hide = function hide() {
          this.node.active = false;
        };

        _proto.refreshUI = function refreshUI() {
          var prop = localConfig.instance.queryByID('prop', this.type);
          this.lbTitle.string = t('table_prop.' + prop.name);
          this.lbDesc.string = t('table_prop.' + prop.desc);
          this.spTip.spriteFrame = this.arrSftip[this.type - 1];
        };

        return ShopPropsOperation;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbTitle", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbDesc", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spTip", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "arrSftip", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/animationUI.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './clientEvent.ts', './loadsh.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Animation, AnimationClip, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, clientEvent, loadsh;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      AnimationClip = module.AnimationClip;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      loadsh = module.loadsh;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

      cclegacy._RF.push({}, "4deb69dGUBOpb+oc1zl98nw", "animationUI", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AnimationUI = exports('AnimationUI', (_dec = ccclass('AnimationUI'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AnimationUI, _Component);

        function AnimationUI() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "isPlayEnableAnimation", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "enableAnimationName", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "isPlayDisableAnimation", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "disableAnimationName", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "disableAnimationReverse", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "disableAnimationSpeed", _descriptor6, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "animation", void 0);

          _defineProperty(_assertThisInitialized(_this), "clips", void 0);

          _defineProperty(_assertThisInitialized(_this), "disableAnimationWrapMode", void 0);

          _defineProperty(_assertThisInitialized(_this), "disableAnimationDefaultSpeed", void 0);

          _defineProperty(_assertThisInitialized(_this), "closeCallback", void 0);

          return _this;
        }

        var _proto = AnimationUI.prototype;

        _proto.onLoad = function onLoad() {
          this.animation = this.node.getComponent(Animation);

          if (!this.animation) {
            return;
          }

          this.clips = this.animation.clips;
          var clip = this.isAnimationExist(this.disableAnimationName);

          if (clip) {
            this.disableAnimationWrapMode = AnimationClip.WrapMode.Default;
            this.disableAnimationDefaultSpeed = clip.speed;
          }
        };

        _proto.onEnable = function onEnable() {
          if (!this.animation) return;

          if (this.isPlayEnableAnimation && this.isAnimationExist(this.enableAnimationName)) {
            this.animation.getState(this.enableAnimationName).wrapMode = AnimationClip.WrapMode.Default;
            this.animation.play(this.enableAnimationName);
          }
        };

        _proto.close = function close(callback) {
          this.closeCallback = callback;

          if (!this.animation) {
            this.closeFinish();
            return;
          }

          var clip = this.isAnimationExist(this.disableAnimationName);

          if (this.isPlayDisableAnimation && clip) {
            this.animation.once(Animation.EventType.FINISHED, this.closeFinish, this);
            this.animation.play(this.disableAnimationName);

            if (this.disableAnimationReverse) {
              this.animation.getState(this.disableAnimationName).wrapMode = AnimationClip.WrapMode.Reverse;
            }
          } else {
            this.closeFinish();
          }
        };

        _proto.closeFinish = function closeFinish() {
          if (this.closeCallback) {
            this.closeCallback();
          } else {
            this.node.active = false;
          }
        };

        _proto.isAnimationExist = function isAnimationExist(animationName) {
          return loadsh.find(this.clips, function (clip) {
            return clip.name === animationName;
          });
        };

        _proto.clickFinish = function clickFinish(param) {
          clientEvent.dispatchEvent('finishClickAnimation', param);
        };

        return AnimationUI;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isPlayEnableAnimation", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "enableAnimationName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isPlayDisableAnimation", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "disableAnimationName", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "disableAnimationReverse", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "disableAnimationSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/linkContent.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './poolManager.ts', './resourceUtil.ts', './constants.ts', './linkItem.ts', './clientEvent.ts', './playerData.ts', './loadsh.ts', './audioManager.ts', './gameLogic.ts', './linkLine.ts', './fightHandGuide.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, UITransform, Node, Vec3, Animation, Prefab, instantiate, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, poolManager, resourceUtil, constants, LinkItem, clientEvent, playerData, loadsh, AudioManager, GameLogic, LinkLine, FightHandGuide;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UITransform = module.UITransform;
      Node = module.Node;
      Vec3 = module.Vec3;
      Animation = module.Animation;
      Prefab = module.Prefab;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      poolManager = module.poolManager;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      LinkItem = module.LinkItem;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      loadsh = module.loadsh;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      GameLogic = module.GameLogic;
    }, function (module) {
      LinkLine = module.LinkLine;
    }, function (module) {
      FightHandGuide = module.FightHandGuide;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "4f6b3WtEbBAH4oYBaofOW/U", "linkContent", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var CELL_WIDTH = 80;
      var CELL_HEIGHT = 80;
      var ITEM_WIDTH = 60;
      var ITEM_HEIGHT = 60;
      var LinkContent = exports('LinkContent', (_dec = ccclass('LinkContent'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LinkContent, _Component);

        function LinkContent() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "pfCake", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "pfLine", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeLineGroup", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeLinkOverEffect", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeLinkGroup", _descriptor5, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "lastOperationTime", void 0);

          _defineProperty(_assertThisInitialized(_this), "isShowHandGuide", void 0);

          _defineProperty(_assertThisInitialized(_this), "_fightScene", void 0);

          _defineProperty(_assertThisInitialized(_this), "dictCakes", void 0);

          _defineProperty(_assertThisInitialized(_this), "arrLinks", void 0);

          _defineProperty(_assertThisInitialized(_this), "arrLines", void 0);

          _defineProperty(_assertThisInitialized(_this), "levelInfo", void 0);

          _defineProperty(_assertThisInitialized(_this), "currentCake", void 0);

          _defineProperty(_assertThisInitialized(_this), "currentNode", void 0);

          _defineProperty(_assertThisInitialized(_this), "preNode", void 0);

          _defineProperty(_assertThisInitialized(_this), "clearScore", void 0);

          _defineProperty(_assertThisInitialized(_this), "clearCake", void 0);

          _defineProperty(_assertThisInitialized(_this), "cntTrigger", void 0);

          _defineProperty(_assertThisInitialized(_this), "allTriggerOverCb", void 0);

          _defineProperty(_assertThisInitialized(_this), "currentPropTouchNode", void 0);

          _defineProperty(_assertThisInitialized(_this), "isRefreshing", void 0);

          _defineProperty(_assertThisInitialized(_this), "arrConnected", void 0);

          _defineProperty(_assertThisInitialized(_this), "nodeHand", void 0);

          return _this;
        }

        var _proto = LinkContent.prototype;

        _proto.show = function show(fightScene) {
          var uiTran = this.node.getComponent(UITransform);
          CELL_WIDTH = uiTran.width / 8;
          CELL_HEIGHT = uiTran.height / 8;
          ITEM_WIDTH = CELL_WIDTH - 25;
          ITEM_HEIGHT = CELL_HEIGHT - 25;
          this.lastOperationTime = 0;
          this.isShowHandGuide = false;
          this._fightScene = fightScene;
          this.dictCakes = {};
          this.arrLinks = [];
          this.arrLines = [];
          this.levelInfo = playerData.instance.getCurrentLevelInfo();
          this.initCake();
        };

        _proto.createCake = function createCake(index, cake, isShowRightNow) {
          var nodeCake = poolManager.instance.getNode(this.pfCake, this.nodeLinkGroup);
          nodeCake.position = this.getScreenPosByIndex(index);
          nodeCake.opacity = 255;
          var linkItem = nodeCake.getComponent(LinkItem);
          linkItem.show(index, cake, isShowRightNow, this);
          this.dictCakes[index] = nodeCake;
          return nodeCake;
        };

        _proto.initCake = function initCake(callback) {
          var _this2 = this;

          var arrRandom = this.levelInfo.cakes.split('|');

          for (var idxRow = 0; idxRow < constants.LINK_ROWS_COUNT; idxRow++) {
            for (var idxCol = 0; idxCol < constants.LINK_COLS_COUNT; idxCol++) {
              var key = idxCol + idxRow * constants.LINK_COLS_COUNT;
              var randomCake = arrRandom[loadsh.random(0, arrRandom.length - 1)];
              this.createCake(key, randomCake, false);
            }
          }

          this.showAllLinkItem(true, function () {
            if (callback) {
              callback();
            }

            _this2.lastOperationTime = 0;
          });
        };

        _proto.showAllLinkItem = function showAllLinkItem(isShow, callback) {
          var times = constants.LINK_ROWS_COUNT + constants.LINK_ROWS_COUNT;

          for (var idx = 0; idx < times; idx++) {
            for (var idxCol = 0; idxCol < constants.LINK_COLS_COUNT; idxCol++) {
              if (idxCol > idx) {
                break;
              }

              for (var idxRow = 0; idxRow < constants.LINK_ROWS_COUNT; idxRow++) {
                if (idxRow > idx) {
                  break;
                }

                if (idxRow + idxCol === idx) {
                  var idxItem = this.getIndexByPos(idxCol, idxRow);

                  if (this.dictCakes.hasOwnProperty(idxItem)) {
                    if (isShow) {
                      this.dictCakes[idxItem].getComponent(LinkItem).playShowAction(0.05 * idx);
                    } else {
                      this.dictCakes[idxItem].getComponent(LinkItem).playHideAction(0.05 * idx, false);
                    }
                  }
                }
              }
            }
          }

          if (callback) {
            this.scheduleOnce(callback, times * 0.05 + 0.5);
          }
        };

        _proto.onEnable = function onEnable() {
          this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.on(Node.EventType.TOUCH_END, this.onTouchEnded, this);
          this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        };

        _proto.onDisable = function onDisable() {
          this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.node.off(Node.EventType.TOUCH_END, this.onTouchEnded, this);
          this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        };

        _proto.getCakeNodeByTouchPos = function getCakeNodeByTouchPos(pos) {
          var startPos = this.nodeLinkGroup.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(0, 0, 0));
          var offsetPos = pos.clone().subtract(startPos);
          var col = Math.floor(offsetPos.x / CELL_WIDTH);
          var row = Math.floor(offsetPos.y / CELL_HEIGHT);
          var key = col + row * constants.LINK_COLS_COUNT;
          var ret = this.dictCakes[key];

          if (ret) {
            if (Math.abs(offsetPos.x - ret.x) > ITEM_WIDTH / 2 || Math.abs(offsetPos.y - ret.y) > ITEM_HEIGHT / 2) {
              ret = null; //已经点超出区域了
            }
          }

          return ret;
        };

        _proto.drawLine = function drawLine() {
          var idxLine = 0;

          if (this.arrLinks.length > 1) {
            var nodeStart = this.arrLinks[0];
            var linkItemStart = nodeStart.getComponent(LinkItem);
            var posLinkStart = this.getPosByIndex(linkItemStart.index);
            var posChildStart = new Vec3((posLinkStart.x + 1 / 2) * CELL_WIDTH, (posLinkStart.y + 1 / 2) * CELL_HEIGHT, 0);
            var arrLinesPoint = [];

            for (var idx = 1; idx < this.arrLinks.length; idx++) {
              var nodeEnd = this.arrLinks[idx];
              var linkItemEnd = nodeEnd.getComponent(LinkItem);
              var posLinkEnd = this.getPosByIndex(linkItemEnd.index);
              var posChildEnd = new Vec3((posLinkEnd.x + 1 / 2) * CELL_WIDTH, (posLinkEnd.y + 1 / 2) * CELL_HEIGHT, 0);
              arrLinesPoint.push({
                'start': posChildStart.clone(),
                'end': posChildEnd.clone()
              });
              posChildStart = posChildEnd;
            }

            for (; idxLine < arrLinesPoint.length; idxLine++) {
              var objLine = arrLinesPoint[idxLine];
              var linkLine = null;
              var lineNode = null;

              if (idxLine < this.arrLines.length) {
                lineNode = this.arrLines[idxLine];
                linkLine = lineNode.getComponent(LinkLine);
              } else {
                lineNode = poolManager.instance.getNode(this.pfLine, this.nodeLineGroup);
                this.arrLines.push(lineNode);
                linkLine = lineNode.getComponent(LinkLine);
                linkLine.show();
              }

              lineNode.getComponent(LinkLine).setLinePosition(objLine.start, objLine.end);
            }
          }

          if (idxLine < this.arrLines.length) {
            for (var idxRemove = idxLine; idxRemove < this.arrLines.length; idxRemove++) {
              poolManager.instance.putNode(this.arrLines[idxRemove]);
            }

            this.arrLines.splice(idxLine, this.arrLines.length);
          }
        };

        _proto.clearLine = function clearLine() {
          for (var idx = 0; idx < this.arrLines.length; idx++) {
            poolManager.instance.putNode(this.arrLines[idx]);
          }

          this.arrLines = [];
        };

        _proto.hideDiffCake = function hideDiffCake() {
          for (var index in this.dictCakes) {
            var node = this.dictCakes[index];

            if (node.getComponent(LinkItem).cake !== this.currentCake) {
              node.opacity = 50; //半透明？
            }
          }
        };

        _proto.showAllCake = function showAllCake() {
          for (var index in this.dictCakes) {
            var node = this.dictCakes[index];
            node.opacity = 255;
          }
        };

        _proto.checkStep = function checkStep() {};

        _proto.onTouchStart = function onTouchStart(touchEvent) {
          if (!this._fightScene || this._fightScene.isLevelOver || !this._fightScene.isLevelStart) {
            this.currentNode = null;
            this.arrLinks = [];
            return;
          }

          var node = this.getCakeNodeByTouchPos(touchEvent.getUILocation());

          if (node) {
            this.stopGuideHand();
            this.arrLinks = [node];
            this.currentNode = node;
            var linkItem = this.currentNode.getComponent(LinkItem);
            this.currentCake = linkItem.cake;
            this.preNode = null;
            linkItem.showSelect(true);
            AudioManager.instance.playSound(constants.AUDIO_SOUND.CLICK_CAKE, false);
            this.drawLine();
            this.hideDiffCake();
          }
        };

        _proto.onTouchMove = function onTouchMove(touchEvent) {
          if (!this.currentNode) {
            return;
          }

          var node = this.getCakeNodeByTouchPos(touchEvent.getUILocation());

          if (node && node !== this.currentNode) {
            var linkItem = node.getComponent(LinkItem);

            if (this.currentCake === linkItem.cake) {
              if (this.preNode === node) {
                var oldLinkItem = this.currentNode.getComponent(LinkItem);
                oldLinkItem.showSelect(false);

                if (oldLinkItem.isSpecial) {
                  oldLinkItem.showSpecial(false);
                }

                this.currentNode = this.preNode;
                this.arrLinks.pop();
                this.preNode = this.arrLinks[this.arrLinks.length - 2];
                this.drawLine();
                return;
              }

              if (this.arrLinks.indexOf(node) !== -1) {
                return;
              }

              var posNode = this.getPosByIndex(linkItem.index);
              var currentItem = this.currentNode.getComponent(LinkItem);
              var posCurrent = this.getPosByIndex(currentItem.index);

              if (Math.abs(posNode.x - posCurrent.x) <= 1 && Math.abs(posNode.y - posCurrent.y) <= 1) {
                this.preNode = this.currentNode;
                this.currentNode = node;
                this.arrLinks.push(node);
                linkItem.showSelect(true);
                AudioManager.instance.playSound(constants.AUDIO_SOUND.CLICK_CAKE, false);
                var cntCurrent = this.arrLinks.length;

                if (cntCurrent >= 6 && (cntCurrent === 6 || (cntCurrent - 6) % 4 === 0)) {
                  linkItem.showSpecial(true);
                }

                this.drawLine();
              }
            }
          }
        };

        _proto.onTouchEnded = function onTouchEnded(touchEvent) {
          this.touchOver();
        };

        _proto.onTouchCancel = function onTouchCancel(touchEvent) {
          this.touchOver();
        };

        _proto.getScreenPosByIndex = function getScreenPosByIndex(index) {
          var pos = this.getPosByIndex(index);
          return new Vec3((pos.x + 1 / 2) * CELL_WIDTH, (pos.y + 1 / 2) * CELL_HEIGHT, 0);
        };

        _proto.getPosByIndex = function getPosByIndex(index) {
          return new Vec3(index % constants.LINK_COLS_COUNT, Math.floor(index / constants.LINK_COLS_COUNT), 0);
        };

        _proto.getIndexByPos = function getIndexByPos(col, row) {
          return row * constants.LINK_COLS_COUNT + col;
        };

        _proto.touchOver = function touchOver() {
          if (!this.isShowHandGuide) {
            if (this.arrLinks.length >= 3) {
              AudioManager.instance.playSound(constants.AUDIO_SOUND.FINISH_LINK, false);
              this.clearLinks();
            } else {
              for (var idx = 0; idx < this.arrLinks.length; idx++) {
                this.arrLinks[idx].getComponent(LinkItem).showSelect(false);
              }

              this.arrLinks = [];
              this.preNode = null;
            }

            this.currentNode = null;
            this.clearLine();
            this.showAllCake();
            this.checkStep();
          }
        };

        _proto.clearItemByEffect = function clearItemByEffect(trigger, effectType, isIncludeSelf, isPlus) {
          var pos = this.getPosByIndex(trigger);

          switch (effectType) {
            case constants.SPECIAL_EFFECT.HORIZONTAL:
              this.clearScore += 500;

              if (!isPlus) {
                AudioManager.instance.playSound(constants.AUDIO_SOUND.LINE_BOMB, false);
              }

              this._fightScene.effectGroup.showSkillLineEffect(this.getItemWorldPosByIndex(trigger), true);

              for (var idx = 0; idx < constants.LINK_COLS_COUNT; idx++) {
                if (idx !== pos.x || isIncludeSelf) {
                  var index = this.getIndexByPos(idx, pos.y);

                  if (this.dictCakes.hasOwnProperty(index)) {
                    var linkItem = this.dictCakes[index].getComponent(LinkItem);

                    if (this.clearCake.hasOwnProperty(linkItem.cake)) {
                      this.clearCake[linkItem.cake] += 1;
                    } else {
                      this.clearCake[linkItem.cake] = 1;
                    }

                    linkItem.showDestory();
                    delete this.dictCakes[index];

                    if (linkItem.index !== trigger) {
                      if (linkItem.getEffect()) {
                        this.clearItemByEffect(linkItem.index, linkItem.getEffect(), isIncludeSelf);
                      } else {
                        this.clearScore += 50;
                      }
                    }
                  }
                }
              }

              break;

            case constants.SPECIAL_EFFECT.VERTICAL:
              this.clearScore += 500;

              if (!isPlus) {
                AudioManager.instance.playSound(constants.AUDIO_SOUND.LINE_BOMB, false);
              }

              this._fightScene.effectGroup.showSkillLineEffect(this.getItemWorldPosByIndex(trigger), false);

              for (var _idx = 0; _idx < constants.LINK_ROWS_COUNT; _idx++) {
                if (_idx !== pos.y || isIncludeSelf) {
                  var _index = this.getIndexByPos(pos.x, _idx);

                  if (this.dictCakes.hasOwnProperty(_index)) {
                    var _linkItem = this.dictCakes[_index].getComponent(LinkItem);

                    if (this.clearCake.hasOwnProperty(_linkItem.cake)) {
                      this.clearCake[_linkItem.cake] += 1;
                    } else {
                      this.clearCake[_linkItem.cake] = 1;
                    }

                    _linkItem.showDestory();

                    delete this.dictCakes[_index];

                    if (_linkItem.index !== trigger) {
                      if (_linkItem.getEffect()) {
                        this.clearItemByEffect(_linkItem.index, _linkItem.getEffect(), isIncludeSelf);
                      } else {
                        this.clearScore += 50;
                      }
                    }
                  }
                }
              }

              break;

            case constants.SPECIAL_EFFECT.PLUS:
              AudioManager.instance.playSound(constants.AUDIO_SOUND.PLUS_BOMB, false);
              this.clearItemByEffect(trigger, constants.SPECIAL_EFFECT.HORIZONTAL, isIncludeSelf, true);
              this.clearItemByEffect(trigger, constants.SPECIAL_EFFECT.VERTICAL, isIncludeSelf, true);
              break;

            case constants.SPECIAL_EFFECT.CENTER:
              this.clearScore += 1500;

              this._fightScene.effectGroup.showSkillRangeEffect(this.getItemWorldPosByIndex(trigger));

              for (var idxOffsetRow = -2; idxOffsetRow <= 2; idxOffsetRow++) {
                for (var idxOffsetCol = -2; idxOffsetCol <= 2; idxOffsetCol++) {
                  if (idxOffsetRow === 0 && idxOffsetCol === 0 && !isIncludeSelf) {
                    continue;
                  }

                  var posNew = new Vec3(pos.x + idxOffsetRow, pos.y + idxOffsetCol, 0);

                  if (posNew.x < 0 || posNew.x > constants.LINK_COLS_COUNT || posNew.y < 0 || posNew.y > constants.LINK_ROWS_COUNT) {
                    continue;
                  }

                  if (Math.abs(posNew.x - pos.x) + Math.abs(posNew.y - pos.y) <= 2) {
                    var _index2 = this.getIndexByPos(posNew.x, posNew.y);

                    if (this.dictCakes.hasOwnProperty(_index2)) {
                      var _linkItem2 = this.dictCakes[_index2].getComponent(LinkItem);

                      if (this.clearCake.hasOwnProperty(_linkItem2.cake)) {
                        this.clearCake[_linkItem2.cake] += 1;
                      } else {
                        this.clearCake[_linkItem2.cake] = 1;
                      }

                      _linkItem2.showDestory();

                      delete this.dictCakes[_index2];

                      if (_linkItem2.index !== trigger) {
                        if (_linkItem2.getEffect()) {
                          this.clearItemByEffect(_linkItem2.index, _linkItem2.getEffect(), isIncludeSelf);
                        } else {
                          this.clearScore += 50;
                        }
                      }
                    }
                  }
                }
              }

              break;
          }
        };

        _proto.clearLinks = function clearLinks() {
          var _this3 = this;

          var dictGenerator = {};
          var dictEffect = {};
          this.clearScore = 0;

          for (var idx = 0; idx < this.arrLinks.length; idx++) {
            var linkItem = this.arrLinks[idx].getComponent(LinkItem);
            var effect = linkItem.getEffect();

            if (effect) {
              dictEffect[linkItem.index] = effect;
            }

            if (linkItem.isSpecial) {
              var _effect = null;

              if (idx === 5) {
                var random = loadsh.random(0, 1);
                _effect = random ? constants.SPECIAL_EFFECT.HORIZONTAL : constants.SPECIAL_EFFECT.VERTICAL;
                this.clearScore += 1000;
              } else {
                var offset = idx - 5;
                var offsetSpare = offset / 4 % 2;
                _effect = offsetSpare ? constants.SPECIAL_EFFECT.PLUS : constants.SPECIAL_EFFECT.CENTER;

                if (_effect === constants.SPECIAL_EFFECT.PLUS) {
                  this.clearScore += 2000;
                } else {
                  this.clearScore += 3000;
                }
              }

              linkItem.setSpecialType(_effect);
              dictGenerator[linkItem.index] = _effect;
            } else if (!effect) {
              this.clearScore += 50;
            }

            linkItem.showDestory();
            delete this.dictCakes[linkItem.index];
          }

          this.clearCake = {};

          for (var trigger in dictEffect) {
            this.clearItemByEffect(trigger, dictEffect[trigger], false);
          }

          playerData.instance.addScore(this.clearScore);
          var cntLink = this.arrLinks.length;
          GameLogic.instance.finishLink(this.currentCake, cntLink);
          var sound = null;

          if (cntLink >= 22) {
            sound = constants.AUDIO_SOUND.UNBELIEVABLE;
          } else if (cntLink >= 18) {
            sound = constants.AUDIO_SOUND.AMAZING;
          } else if (cntLink >= 14) {
            sound = constants.AUDIO_SOUND.EXCELLENT;
          } else if (cntLink >= 10) {
            sound = constants.AUDIO_SOUND.GREAT;
          } else if (cntLink >= 6) {
            sound = constants.AUDIO_SOUND.GOOD;
          }

          if (sound) {
            AudioManager.instance.playSound(sound, false);
          }

          this.finishTargetsBatch();
          this.arrLinks = [];

          if (Object.keys(dictGenerator).length > 0) {
            this.scheduleOnce(function () {
              _this3._fightScene.showFlyEffect(dictGenerator, function () {
                GameLogic.instance.checkGame();
              });
            }, 0.1);
          } else {
            GameLogic.instance.checkGame();
          }

          this.scheduleOnce(this.fillEmptyCell, 0.3);
        }
        /**
         * 填补空缺的位置
         */
        ;

        _proto.fillEmptyCell = function fillEmptyCell() {
          var _this4 = this;

          for (var idxCol = 0; idxCol < constants.LINK_COLS_COUNT; idxCol++) {
            var emptyRow = -1;

            for (var idxRow = 0; idxRow < constants.LINK_ROWS_COUNT; idxRow++) {
              var index = idxRow * constants.LINK_COLS_COUNT + idxCol;

              if (!this.dictCakes.hasOwnProperty(index)) {
                if (emptyRow === -1) {
                  emptyRow = idxRow;
                }
              } else if (emptyRow !== -1) {
                var emptyIndex = emptyRow * constants.LINK_COLS_COUNT + idxCol;
                this.dictCakes[emptyIndex] = this.dictCakes[index];
                var linkItem = this.dictCakes[emptyIndex].getComponent(LinkItem);
                linkItem.index = emptyIndex;
                linkItem.playMove2Index(emptyIndex);
                delete this.dictCakes[index];
                emptyRow = emptyRow + 1; //往上移动一层
              }
            }

            if (emptyRow !== -1) {
              var arrRandom = this.levelInfo.cakes.split('|');

              for (var _idxRow = emptyRow; _idxRow < constants.LINK_ROWS_COUNT; _idxRow++) {
                var _index3 = _idxRow * constants.LINK_COLS_COUNT + idxCol;

                var showIndex = (constants.LINK_ROWS_COUNT + _idxRow - emptyRow) * constants.LINK_COLS_COUNT + idxCol;
                var randomCake = arrRandom[loadsh.random(0, arrRandom.length - 1)];
                this.createCakeForFill(_index3, randomCake, showIndex);
              }
            }
          }

          this.scheduleOnce(function () {
            _this4.checkIsBlocked();
          }, 0.2);
        };

        _proto.createCakeForFill = function createCakeForFill(index, cake, showIndex) {
          var nodeCake = poolManager.instance.getNode(this.pfCake, this.nodeLinkGroup);
          nodeCake.position = this.getScreenPosByIndex(showIndex);
          nodeCake.opacity = 255;
          var linkItem = nodeCake.getComponent(LinkItem);
          linkItem.show(index, cake, true, this);
          linkItem.playMove2Index(index);
          this.dictCakes[index] = nodeCake;
          return nodeCake;
        };

        _proto.getItemWorldPosByIndex = function getItemWorldPosByIndex(index) {
          var screenPos = this.getScreenPosByIndex(index);
          return this.nodeLinkGroup.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(screenPos.x, screenPos.y, 0));
        };

        _proto.getNoEffectLinkItemIndex = function getNoEffectLinkItemIndex() {
          var idx = 0;

          while (1) {
            var random = loadsh.random(0, constants.LINK_ROWS_COUNT * constants.LINK_COLS_COUNT - 1);

            if (this.dictCakes.hasOwnProperty(random)) {
              var node = this.dictCakes[random];
              var linkItem = node.getComponent(LinkItem);

              if (!linkItem.isSpecial && !linkItem.getEffect()) {
                return linkItem.index;
              }
            }

            idx++;

            if (idx > 30) {
              //避免无限循环出现卡住的问题
              return null;
            }
          }
        };

        _proto.markLinkItemEffect = function markLinkItemEffect(index, effect) {
          if (this.dictCakes.hasOwnProperty(index)) {
            this.dictCakes[index].getComponent(LinkItem).markEffect(effect);
          }
        };

        _proto.addEffect = function addEffect(index, effect) {
          if (this.dictCakes.hasOwnProperty(index)) {
            this.dictCakes[index].getComponent(LinkItem).showEffect(effect);
          }
        };

        _proto.delayClearItem = function delayClearItem(delayIdx, index, effect) {
          var _this5 = this;

          this.scheduleOnce(function () {
            _this5.cntTrigger--;

            if (_this5.dictCakes.hasOwnProperty(index)) {
              _this5.clearScore = 0;
              _this5.clearCake = {};

              _this5.clearItemByEffect(index, effect, true);

              playerData.instance.addScore(_this5.clearScore);

              _this5.finishTargetsBatch();
            }

            if (_this5.cntTrigger <= 0 && _this5.allTriggerOverCb) {
              _this5.allTriggerOverCb();
            }
          }, delayIdx * 0.2);
        };

        _proto.triggerAllSpecialEffect = function triggerAllSpecialEffect(callback) {
          var idx = 0;

          for (var idxRow = 0; idxRow < constants.LINK_ROWS_COUNT; idxRow++) {
            for (var idxCol = 0; idxCol < constants.LINK_COLS_COUNT; idxCol++) {
              var index = this.getIndexByPos(idxCol, idxRow);

              if (this.dictCakes.hasOwnProperty(index)) {
                var linkItem = this.dictCakes[index].getComponent(LinkItem);

                if (linkItem && linkItem.getEffect()) {
                  this.delayClearItem(idx, index, linkItem.getEffect());
                  idx++;
                }
              }
            }
          }

          this.cntTrigger = idx;
          this.allTriggerOverCb = callback;

          if (this.cntTrigger <= 0 && this.allTriggerOverCb) {
            this.allTriggerOverCb();
          }
        };

        _proto.finishTargetsBatch = function finishTargetsBatch() {
          for (var cake in this.clearCake) {
            playerData.instance.finishTarget(cake, this.clearCake[cake]);
            clientEvent.dispatchEvent('updateTargets', cake);
          }

          clientEvent.dispatchEvent('updateStep');
        };

        _proto.showLinkFinishEffect = function showLinkFinishEffect(callback) {
          var _this6 = this;

          resourceUtil.createEffect('fight/frame/frame', function (err, effect) {
            if (err) {
              if (callback) {
                callback(err);
              }

              return;
            }

            var ani = effect.getComponent(Animation);
            ani.play('frame');
            ani.once(Animation.EventType.FINISHED, function () {
              effect && effect.destroy();

              if (callback) {
                callback(null);
              }
            }, _this6);
          }, this.nodeLinkOverEffect);
        };

        _proto.checkIsBlocked = function checkIsBlocked() {
          for (var idxRow = 0; idxRow < constants.LINK_ROWS_COUNT; idxRow++) {
            for (var idxCol = 0; idxCol < constants.LINK_COLS_COUNT; idxCol++) {
              var index = this.getIndexByPos(idxCol, idxRow);

              if (this.dictCakes.hasOwnProperty(index)) {
                var linkItem = this.dictCakes[index].getComponent(LinkItem);

                if (linkItem) {
                  var ret = this.checkItemChannelIsClear(index, linkItem.cake);

                  if (ret) {
                    return;
                  }
                }
              }
            }
          }

          this.refreshLinkItems();
        };

        _proto.checkItemChannelIsClear = function checkItemChannelIsClear(index, cake, posOld) {
          var pos = this.getPosByIndex(index);
          var idxClear = 0;

          for (var row = pos.y - 1; row <= pos.y + 1; row++) {
            for (var col = pos.x - 1; col <= pos.x + 1; col++) {
              if (row < 0 || col < 0 || row >= constants.LINK_ROWS_COUNT || col >= constants.LINK_COLS_COUNT) {
                continue;
              }

              if (row !== pos.y || col !== pos.x) {
                if (posOld && posOld.x === col && posOld.y === row) {
                  continue;
                }

                var idxItem = this.getIndexByPos(col, row);

                if (this.dictCakes.hasOwnProperty(idxItem)) {
                  var linkItem = this.dictCakes[idxItem].getComponent(LinkItem);

                  if (linkItem && linkItem.cake === cake) {
                    if (posOld) {
                      return true;
                    } else {
                      var isClear = this.checkItemChannelIsClear(idxItem, cake, pos);

                      if (isClear) {
                        return true;
                      }

                      idxClear++;

                      if (idxClear >= 2) {
                        return true;
                      }
                    }
                  }
                }
              }
            }
          }

          return false;
        };

        _proto.onPropTouchStart = function onPropTouchStart(touchEvent) {
          var node = this.getCakeNodeByTouchPos(touchEvent.getUILocation());

          if (node) {
            node.setScale(0.9, 0.9, 0.9);
          }

          this.currentPropTouchNode = node;
        };

        _proto.onPropTouchEnd = function onPropTouchEnd(touchEvent) {
          if (!this.currentPropTouchNode) {
            return -1;
          }

          this.currentPropTouchNode.setScale(1, 1, 1);
          var node = this.getCakeNodeByTouchPos(touchEvent.getUILocation());

          if (node === this.currentPropTouchNode) {
            var linkItem = node.getComponent(LinkItem);
            return linkItem.index;
          }

          this.currentPropTouchNode = null;
          return -1;
        };

        _proto.onPropTouchCancel = function onPropTouchCancel(touchEvent) {
          if (this.currentPropTouchNode) {
            this.currentPropTouchNode.setScale(1, 1, 1);
            this.currentPropTouchNode = null;
          }

          return -1;
        };

        _proto.refreshLinkItems = function refreshLinkItems() {
          var _this7 = this;

          if (this.isRefreshing) {
            return false;
          }

          this.isRefreshing = true;
          this.showAllLinkItem(false, function () {
            _this7.initCake(function () {
              _this7.isRefreshing = false;
            });
          });
          return true;
        };

        _proto.destoryCake = function destoryCake(targetId) {
          if (this.dictCakes.hasOwnProperty(targetId)) {
            var nodeItem = this.dictCakes[targetId];
            var linkItem = nodeItem.getComponent(LinkItem);
            linkItem.showDestory();
            delete this.dictCakes[targetId];
            this.clearScore = 0;
            this.clearCake = {};
            this.clearCake[linkItem.cake] = 1;

            if (linkItem.getEffect()) {
              this.clearItemByEffect(targetId, linkItem.getEffect(), false);
            } else {
              this.clearScore = 50;
            }

            playerData.instance.addScore(this.clearScore); //默认加50

            this.finishTargetsBatch();
            GameLogic.instance.checkGame();
            this.scheduleOnce(this.fillEmptyCell, 0.3);
          }
        };

        _proto.getConnectCake = function getConnectCake(index, cake, posOld) {
          var pos = this.getPosByIndex(index);

          for (var row = pos.y - 1; row <= pos.y + 1; row++) {
            for (var col = pos.x - 1; col <= pos.x + 1; col++) {
              if (row < 0 || col < 0 || row >= constants.LINK_ROWS_COUNT || col >= constants.LINK_COLS_COUNT) {
                continue;
              }

              if (row !== pos.y || col !== pos.x) {
                if (posOld && posOld.x === col && posOld.y === row) {
                  continue;
                }

                var idxItem = this.getIndexByPos(col, row);

                if (this.dictCakes.hasOwnProperty(idxItem)) {
                  var linkItem = this.dictCakes[idxItem].getComponent(LinkItem);

                  if (linkItem && linkItem.cake === cake) {
                    if (posOld) {
                      this.arrConnected.push(idxItem);
                      return true;
                    } else {
                      var len = this.arrConnected.length;
                      var isClear = this.getConnectCake(idxItem, cake, pos);

                      if (isClear) {
                        this.arrConnected.splice(len, 0, idxItem);
                        return true;
                      }
                    }
                  }
                }
              }
            }
          }

          return false;
        };

        _proto.getConnectCakeByIndex = function getConnectCakeByIndex(idx, arrTarget) {
          this.arrConnected = [];

          if (this.dictCakes.hasOwnProperty(idx)) {
            this.arrConnected.push(idx);
            var linkItem = this.dictCakes[idx].getComponent(LinkItem);

            if (linkItem) {
              if (arrTarget) {
                if (arrTarget.indexOf(linkItem.cake) !== -1) {
                  this.getConnectCake(idx, linkItem.cake);

                  if (this.arrConnected.length >= 3) {
                    return true;
                  }
                }
              } else {
                this.getConnectCake(idx, linkItem.cake);

                if (this.arrConnected.length >= 3) {
                  return true;
                }
              }
            }
          }

          return false;
        };

        _proto.findConnectPathForGuide = function findConnectPathForGuide(isFindTarget) {
          var arrTarget = null;

          if (isFindTarget) {
            arrTarget = [];

            for (var target in playerData.instance.dictTargets) {
              if (playerData.instance.dictTargets[target]) {
                arrTarget.push(target);
              }
            }
          }

          var max = constants.LINK_ROWS_COUNT * constants.LINK_COLS_COUNT;
          var half = max / 2 + constants.LINK_COLS_COUNT / 2;
          var halfLeft = half - 1;
          var halfRight = half;
          var isFind = false;

          while (!isFind && (halfRight < max || halfLeft >= 0)) {
            this.arrConnected = [];

            if (halfRight < max) {
              var _isFind = this.getConnectCakeByIndex(halfRight, arrTarget);

              if (_isFind) {
                return true;
              }
            }

            if (halfLeft > 0) {
              isFind = this.getConnectCakeByIndex(halfLeft, arrTarget);

              if (isFind) {
                return true;
              }
            }

            halfRight++;
            halfLeft--;
          }

          return false;
        };

        _proto.showGuideLine = function showGuideLine(index) {
          this.arrLinks = [];

          for (var idx = 0; idx <= index; idx++) {
            var cake = this.dictCakes[this.arrConnected[idx]];

            if (cake) {
              this.arrLinks.push(cake);
            }
          }

          this.drawLine();
        };

        _proto.showGuideHand = function showGuideHand() {
          var _this8 = this;

          this.isShowHandGuide = true;
          var isFind = this.findConnectPathForGuide(true);

          if (!isFind) {
            isFind = this.findConnectPathForGuide(false);
          }

          if (isFind) {
            var arrPath = [];

            for (var idx = 0; idx < this.arrConnected.length; idx++) {
              arrPath.push(this.getScreenPosByIndex(this.arrConnected[idx]));
              var linkItem = this.dictCakes[this.arrConnected[idx]].getComponent(LinkItem);
              linkItem.showSelect(true);
            }

            if (!this.nodeHand) {
              resourceUtil.loadRes('prefab/fight/fightHandGuide', Prefab, function (err, prefab) {
                var node = instantiate(prefab);
                node.parent = _this8.node;
                _this8.nodeHand = node;

                _this8.nodeHand.getComponent(FightHandGuide).showGuide(arrPath, function (index) {
                  _this8.showGuideLine(index);
                });
              });
            } else {
              this.nodeHand.active = true;
              this.nodeHand.getComponent(FightHandGuide).showGuide(arrPath, function (index) {
                _this8.showGuideLine(index);
              });
            }
          }
        };

        _proto.stopGuideHand = function stopGuideHand() {
          this.isShowHandGuide = false;
          this.lastOperationTime = 0;

          if (this.arrConnected && this.dictCakes) {
            for (var idx = 0; idx < this.arrConnected.length; idx++) {
              var nodeItem = this.dictCakes[this.arrConnected[idx]];

              if (nodeItem) {
                var linkItem = nodeItem.getComponent(LinkItem);
                linkItem.showSelect(false);
              }
            }
          }

          if (this.nodeHand) {
            this.nodeHand.destroy();
            this.nodeHand = null;
          }

          this.arrLinks = [];
          this.drawLine();
        };

        _proto.update = function update(dt) {
          if (this._fightScene.isLevelOver || !this._fightScene.isLevelStart || this.isShowHandGuide || this.currentNode || this._fightScene.isShowOperationUI) {
            return;
          }

          this.lastOperationTime += dt;

          if (this.lastOperationTime > 5) {
            this.showGuideHand();
            this.lastOperationTime = 0;
          }
        };

        return LinkContent;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "pfCake", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pfLine", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeLineGroup", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nodeLinkOverEffect", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "nodeLinkGroup", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/reward.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './constants.ts', './localConfig.ts', './uiManager.ts', './LanguageData.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Animation, UITransform, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil, constants, localConfig, uiManager, t, GameLogic;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      UITransform = module.UITransform;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      t = module.t;
    }, function (module) {
      GameLogic = module.GameLogic;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

      cclegacy._RF.push({}, "511b6KMY/hH0J3ytfJAXF3B", "reward", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Reward = exports('Reward', (_dec = ccclass('Reward'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Reward, _Component);

        function Reward() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "sfDiamond", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfGold", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spIcon", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbRewardValue", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "aniGetItem", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndBtnNormalReceive", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndBtnDoubleReceive", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndBtnReceive", _descriptor8, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "itemType", void 0);

          _defineProperty(_assertThisInitialized(_this), "itemAmount", void 0);

          _defineProperty(_assertThisInitialized(_this), "itemSubType", void 0);

          _defineProperty(_assertThisInitialized(_this), "shareFunction", void 0);

          _defineProperty(_assertThisInitialized(_this), "openRewardType", void 0);

          return _this;
        }

        var _proto = Reward.prototype;

        _proto.show = function show(itemInfo, isDoubleReceive, shareFunction) {
          var _this2 = this;

          this.itemType = itemInfo["itemType"];
          this.itemAmount = itemInfo["itemAmount"];
          this.itemSubType = itemInfo["itemSubType"];
          this.shareFunction = shareFunction;
          this.aniGetItem.play('getItemShow');
          this.aniGetItem.once(Animation.EventType.FINISHED, function () {
            _this2.aniGetItem.play('getItemIdle');
          }, this);
          this.setRewardPage();

          if (isDoubleReceive) {
            this.ndBtnReceive.active = false;
            GameLogic.instance.getOpenRewardType(this.shareFunction, function (err, type) {
              if (!err) {
                _this2.openRewardType = type;

                switch (type) {
                  case constants.OPEN_REWARD_TYPE.AD:
                    _this2.ndBtnDoubleReceive.active = true;
                    break;

                  case constants.OPEN_REWARD_TYPE.SHARE:
                    _this2.ndBtnDoubleReceive.active = true;
                    break;

                  case constants.OPEN_REWARD_TYPE.NULL:
                    _this2.ndBtnDoubleReceive.active = false;
                    break;
                }
              } else {
                _this2.close();
              }
            });
            this.ndBtnNormalReceive.active = false;
            this.scheduleOnce(this.normalBtnCallback, constants.NORMAL_SHOW_TIME);
          } else {
            this.ndBtnNormalReceive.active = false;
            this.ndBtnDoubleReceive.active = false;
            this.ndBtnReceive.active = true;
          }
        };

        _proto.normalBtnCallback = function normalBtnCallback() {
          this.ndBtnNormalReceive.active = true;
        };

        _proto.setRewardPage = function setRewardPage() {
          var uiTraSpIcon = this.spIcon.getComponent(UITransform);

          switch (this.itemType) {
            case constants.REWARD_TYPE.DIAMOND:
              this.spIcon.spriteFrame = this.sfDiamond;
              this.lbRewardValue.string = 'x' + this.itemAmount;
              break;

            case constants.REWARD_TYPE.GOLD:
              this.spIcon.spriteFrame = this.sfGold;
              this.lbRewardValue.string = 'x' + this.itemAmount;
              uiTraSpIcon.width = 257;
              uiTraSpIcon.height = 166;
              break;

            case constants.REWARD_TYPE.PROP:
              var propData = localConfig.instance.queryByID('prop', this.itemSubType);
              uiTraSpIcon.width = 168;
              uiTraSpIcon.height = 168;
              resourceUtil.setPropIcon(propData.icon, this.spIcon, function () {});
              var txt = t('table_prop.' + propData.name);
              this.lbRewardValue.string = txt + t('') + ' x ' + this.itemAmount;
              break;
          }
        };

        _proto.onBtnNormalReceiveClick = function onBtnNormalReceiveClick() {
          this.addReward();
          this.close();
        };

        _proto.onBtnDoubleReceiveClick = function onBtnDoubleReceiveClick() {
          var _this3 = this;

          switch (this.openRewardType) {
            case constants.OPEN_REWARD_TYPE.AD:
              GameLogic.instance.showRewardAd(function (err) {
                if (!err) {
                  _this3.itemAmount *= 2;

                  _this3.showDoubleReward();
                }
              });
              break;

            case constants.OPEN_REWARD_TYPE.SHARE:
              GameLogic.instance.share(this.shareFunction, {}, function (err) {
                if (!err) {
                  _this3.itemAmount *= 2;

                  _this3.showDoubleReward();
                }
              });
              break;
          }
        };

        _proto.addReward = function addReward() {
          switch (this.itemType) {
            case constants.REWARD_TYPE.DIAMOND:
              GameLogic.instance.addDiamond(this.itemAmount);
              break;

            case constants.REWARD_TYPE.GOLD:
              GameLogic.instance.addGold(this.itemAmount);
              break;

            case constants.REWARD_TYPE.PROP:
              GameLogic.instance.addProp(this.itemSubType, this.itemAmount);
              break;
          }
        };

        _proto.showDoubleReward = function showDoubleReward() {
          this.unschedule(this.normalBtnCallback);
          var itemInfo = {};
          itemInfo['itemType'] = this.itemType;
          itemInfo['itemSubType'] = this.itemSubType;
          itemInfo['itemAmount'] = this.itemAmount;
          uiManager.instance.showDialog('lottery/reward', [itemInfo, false, this.shareFunction]);
          this.close();
        };

        _proto.close = function close() {
          uiManager.instance.shiftFromPopupSeq('lottery/reward');
        };

        return Reward;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sfDiamond", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sfGold", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbRewardValue", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "aniGetItem", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnNormalReceive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnDoubleReceive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnReceive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/util.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "51238kLGAFBiLoz3gxcwxtH", "util", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var util = exports('util', (_dec = ccclass("util"), _dec(_class = /*#__PURE__*/function () {
        function util() {}
        /**
         * !#zh 拷贝object。
         */

        /**
         * 深度拷贝
         * @param {any} sObj 拷贝的对象
         * @returns 
         */


        util.clone = function clone(sObj) {
          if (sObj === null || typeof sObj !== "object") {
            return sObj;
          }

          var s = {};

          if (sObj.constructor === Array) {
            s = [];
          }

          for (var i in sObj) {
            if (sObj.hasOwnProperty(i)) {
              s[i] = this.clone(sObj[i]);
            }
          }

          return s;
        }
        /**
         * 将object转化为数组
         * @param { any} srcObj  
         * @returns 
         */
        ;

        util.objectToArray = function objectToArray(srcObj) {
          var resultArr = []; // to array

          for (var _key in srcObj) {
            if (!srcObj.hasOwnProperty(_key)) {
              continue;
            }

            resultArr.push(srcObj[_key]);
          }

          return resultArr;
        }
        /**
         * !#zh 将数组转化为object。
         */

        /**
         * 将数组转化为object。
         * @param { any} srcObj 
         * @param { string} objectKey 
         * @returns 
         */
        ;

        util.arrayToObject = function arrayToObject(srcObj, objectKey) {
          var resultObj = {}; // to object

          for (var key in srcObj) {
            if (!srcObj.hasOwnProperty(key) || !srcObj[key][objectKey]) {
              continue;
            }

            resultObj[srcObj[key][objectKey]] = srcObj[key];
          }

          return resultObj;
        }
        /**
         * 根据权重,计算随机内容
         * @param {arrany} weightArr 
         * @param {number} totalWeight 权重
         * @returns 
         */
        ;

        util.getWeightRandIndex = function getWeightRandIndex(weightArr, totalWeight) {
          var randWeight = Math.floor(Math.random() * totalWeight);
          var sum = 0;

          for (var weightIndex = 0; weightIndex < weightArr.length; weightIndex++) {
            sum += weightArr[weightIndex];

            if (randWeight < sum) {
              break;
            }
          }

          return weightIndex;
        }
        /**
         * 从n个数中获取m个随机数
         * @param {Number} n   总数
         * @param {Number} m    获取数
         * @returns {Array} array   获取数列
         */
        ;

        util.getRandomNFromM = function getRandomNFromM(n, m) {
          var array = [];
          var intRd = 0;
          var count = 0;

          while (count < m) {
            if (count >= n + 1) {
              break;
            }

            intRd = this.getRandomInt(0, n);
            var flag = 0;

            for (var i = 0; i < count; i++) {
              if (array[i] === intRd) {
                flag = 1;
                break;
              }
            }

            if (flag === 0) {
              array[count] = intRd;
              count++;
            }
          }

          return array;
        }
        /**
         * 获取随机整数
         * @param {Number} min 最小值
         * @param {Number} max 最大值
         * @returns 
         */
        ;

        util.getRandomInt = function getRandomInt(min, max) {
          var r = Math.random();
          var rr = r * (max - min + 1) + min;
          return Math.floor(rr);
        }
        /**
         * 获取字符串长度
         * @param {string} render 
         * @returns 
         */
        ;

        util.getStringLength = function getStringLength(render) {
          var strArr = render;
          var len = 0;

          for (var i = 0, n = strArr.length; i < n; i++) {
            var val = strArr.charCodeAt(i);

            if (val <= 255) {
              len = len + 1;
            } else {
              len = len + 2;
            }
          }

          return Math.ceil(len / 2);
        }
        /**
         * 判断传入的参数是否为空的Object。数组或undefined会返回false
         * @param obj
         */
        ;

        util.isEmptyObject = function isEmptyObject(obj) {
          var result = true;

          if (obj && obj.constructor === Object) {
            for (var key in obj) {
              if (obj.hasOwnProperty(key)) {
                result = false;
                break;
              }
            }
          } else {
            result = false;
          }

          return result;
        }
        /**
         * 判断是否是新的一天
         * @param {Object|Number} dateValue 时间对象 todo MessageCenter 与 pve 相关的时间存储建议改为 Date 类型
         * @returns {boolean}
         */
        ;

        util.isNewDay = function isNewDay(dateValue) {
          // todo：是否需要判断时区？
          var oldDate = new Date(dateValue);
          var curDate = new Date();
          var oldYear = oldDate.getYear();
          var oldMonth = oldDate.getMonth();
          var oldDay = oldDate.getDate();
          var curYear = curDate.getYear();
          var curMonth = curDate.getMonth();
          var curDay = curDate.getDate();

          if (curYear > oldYear) {
            return true;
          } else {
            if (curMonth > oldMonth) {
              return true;
            } else {
              if (curDay > oldDay) {
                return true;
              }
            }
          }

          return false;
        }
        /**
         * 获取对象属性数量
         * @param {object}o 对象
         * @returns 
         */
        ;

        util.getPropertyCount = function getPropertyCount(o) {
          var n,
              count = 0;

          for (n in o) {
            if (o.hasOwnProperty(n)) {
              count++;
            }
          }

          return count;
        }
        /**
         * 返回一个差异化数组（将array中diff里的值去掉）
         * @param array
         * @param diff
         */
        ;

        util.difference = function difference(array, diff) {
          var result = [];

          if (array.constructor !== Array || diff.constructor !== Array) {
            return result;
          }

          var length = array.length;

          for (var i = 0; i < length; i++) {
            if (diff.indexOf(array[i]) === -1) {
              result.push(array[i]);
            }
          }

          return result;
        };

        util._stringToArray = function _stringToArray(string) {
          // 用于判断emoji的正则们
          var rsAstralRange = "\\ud800-\\udfff";
          var rsZWJ = "\\u200d";
          var rsVarRange = "\\ufe0e\\ufe0f";
          var rsComboMarksRange = "\\u0300-\\u036f";
          var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
          var rsComboSymbolsRange = "\\u20d0-\\u20ff";
          var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
          var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');
          var rsFitz = "\\ud83c[\\udffb-\\udfff]";
          var rsOptVar = '[' + rsVarRange + ']?';
          var rsCombo = '[' + rsComboRange + ']';
          var rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')';
          var reOptMod = rsModifier + '?';
          var rsAstral = '[' + rsAstralRange + ']';
          var rsNonAstral = '[^' + rsAstralRange + ']';
          var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
          var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
          var rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*';
          var rsSeq = rsOptVar + reOptMod + rsOptJoin;
          var rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
          var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

          var hasUnicode = function hasUnicode(val) {
            return reHasUnicode.test(val);
          };

          var unicodeToArray = function unicodeToArray(val) {
            return val.match(reUnicode) || [];
          };

          var asciiToArray = function asciiToArray(val) {
            return val.split('');
          };

          return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
        } // 模拟传msg的uuid
        ;

        util.simulationUUID = function simulationUUID() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
          }

          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        };

        util.trim = function trim(str) {
          return str.replace(/(^\s*)|(\s*$)/g, "");
        }
        /**
         * 判断当前时间是否在有效时间内
         * @param {String|Number} start 起始时间。带有时区信息
         * @param {String|Number} end 结束时间。带有时区信息
         */
        ;

        util.isNowValid = function isNowValid(start, end) {
          var startTime = new Date(start);
          var endTime = new Date(end);
          var result = false;

          if (startTime.getDate() + '' !== 'NaN' && endTime.getDate() + '' !== 'NaN') {
            var curDate = new Date();
            result = curDate < endTime && curDate > startTime;
          }

          return result;
        }
        /**
         * 返回相隔天数
         * @param start 
         * @param end 
         * @returns 
         */
        ;

        util.getDeltaDays = function getDeltaDays(start, end) {
          start = new Date(start);
          end = new Date(end);
          var startYear = start.getFullYear();
          var startMonth = start.getMonth() + 1;
          var startDate = start.getDate();
          var endYear = end.getFullYear();
          var endMonth = end.getMonth() + 1;
          var endDate = end.getDate();
          start = new Date(startYear + '/' + startMonth + '/' + startDate + ' GMT+0800').getTime();
          end = new Date(endYear + '/' + endMonth + '/' + endDate + ' GMT+0800').getTime();
          var deltaTime = end - start;
          return Math.floor(deltaTime / (24 * 60 * 60 * 1000));
        }
        /**
         * 获取数组最小值
         * @param array 数组
         * @returns 
         */
        ;

        util.getMin = function getMin(array) {
          var result = null;

          if (array.constructor === Array) {
            var length = array.length;

            for (var i = 0; i < length; i++) {
              if (i === 0) {
                result = Number(array[0]);
              } else {
                result = result > Number(array[i]) ? Number(array[i]) : result;
              }
            }
          }

          return result;
        }
        /**
         * 格式化两位小数点
         * @param time 
         * @returns 
         */
        ;

        util.formatTwoDigits = function formatTwoDigits(time) {
          //@ts-ignore
          return (Array(2).join(0) + time).slice(-2);
        }
        /**
         * 根据格式返回时间
         * @param date  时间
         * @param fmt 格式
         * @returns 
         */
        ;

        util.formatDate = function formatDate(date, fmt) {
          var o = {
            "M+": date.getMonth() + 1,
            //月份
            "d+": date.getDate(),
            //日
            "h+": date.getHours(),
            //小时
            "m+": date.getMinutes(),
            //分
            "s+": date.getSeconds(),
            //秒
            "q+": Math.floor((date.getMonth() + 3) / 3),
            //季度
            "S": date.getMilliseconds() //毫秒

          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

          for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
          }

          return fmt;
        }
        /**
         * 获取格式化后的日期（不含小时分秒）
         */
        ;

        util.getDay = function getDay() {
          var date = new Date();
          return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        }
        /**
         * 格式化名字，XXX...
         * @param {string} name 需要格式化的字符串 
         * @param {number}limit 
         * @returns {string} 返回格式化后的字符串XXX...
         */
        ;

        util.formatName = function formatName(name, limit) {
          limit = limit || 6;

          var nameArray = this._stringToArray(name);

          var str = '';
          var length = nameArray.length;

          if (length > limit) {
            for (var i = 0; i < limit; i++) {
              str += nameArray[i];
            }

            str += '...';
          } else {
            str = name;
          }

          return str;
        }
        /**
         * 格式化钱数，超过10000 转换位 10K   10000K 转换为 10M
         * @param {number}money 需要被格式化的数值
         * @returns {string}返回 被格式化的数值
         */
        ;

        util.formatMoney = function formatMoney(money) {
          var arrUnit = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'B', 'N', 'D'];
          var strValue = '';

          for (var idx = 0; idx < arrUnit.length; idx++) {
            if (money >= 10000) {
              money /= 1000;
            } else {
              strValue = Math.floor(money) + arrUnit[idx];
              break;
            }
          }

          if (strValue === '') {
            strValue = Math.floor(money) + 'U'; //超过最大值就加个U
          }

          return strValue;
        }
        /**
         * 格式化数值
         * @param {number}value 需要被格式化的数值
         * @returns {string}返回 被格式化的数值
         */
        ;

        util.formatValue = function formatValue(value) {
          var arrUnit = [];
          var strValue = '';

          for (var i = 0; i < 26; i++) {
            arrUnit.push(String.fromCharCode(97 + i));
          }

          for (var idx = 0; idx < arrUnit.length; idx++) {
            if (value >= 10000) {
              value /= 1000;
            } else {
              strValue = Math.floor(value) + arrUnit[idx];
              break;
            }
          }

          return strValue;
        }
        /**
         * 根据剩余秒数格式化剩余时间 返回 HH:MM:SS
         * @param {Number} leftSec 
         */
        ;

        util.formatTimeForSecond = function formatTimeForSecond(leftSec, withoutSeconds) {
          if (withoutSeconds === void 0) {
            withoutSeconds = false;
          }

          var timeStr = '';
          var sec = leftSec % 60;
          var leftMin = Math.floor(leftSec / 60);
          leftMin = leftMin < 0 ? 0 : leftMin;
          var hour = Math.floor(leftMin / 60);
          var min = leftMin % 60;

          if (hour > 0) {
            timeStr += hour > 9 ? hour.toString() : '0' + hour;
            timeStr += ':';
          } else {
            timeStr += '00:';
          }

          timeStr += min > 9 ? min.toString() : '0' + min;

          if (!withoutSeconds) {
            timeStr += ':';
            timeStr += sec > 9 ? sec.toString() : '0' + sec;
          }

          return timeStr;
        }
        /**
         *  根据剩余毫秒数格式化剩余时间 返回 HH:MM:SS
         *
         * @param {Number} ms
         */
        ;

        util.formatTimeForMillisecond = function formatTimeForMillisecond(ms) {
          var second = Math.floor(ms / 1000 % 60);
          var minute = Math.floor(ms / 1000 / 60 % 60);
          var hour = Math.floor(ms / 1000 / 60 / 60);
          return {
            'hour': hour,
            'minute': minute,
            'second': second
          };
        }
        /**
         * 将数组内容进行随机排列
         * @param {Array}arr 需要被随机的数组 
         * @returns 
         */
        ;

        util.rand = function rand(arr) {
          var arrClone = this.clone(arr); // 首先从最大的数开始遍历，之后递减

          for (var i = arrClone.length - 1; i >= 0; i--) {
            // 随机索引值randomIndex是从0-arrClone.length中随机抽取的
            var randomIndex = Math.floor(Math.random() * (i + 1)); // 下面三句相当于把从数组中随机抽取到的值与当前遍历的值互换位置

            var itemIndex = arrClone[randomIndex];
            arrClone[randomIndex] = arrClone[i];
            arrClone[i] = itemIndex;
          } // 每一次的遍历都相当于把从数组中随机抽取（不重复）的一个元素放到数组的最后面（索引顺序为：len-1,len-2,len-3......0）


          return arrClone;
        }
        /**
         * 获得开始和结束两者之间相隔分钟数
         *
         * @static
         * @param {number} start
         * @param {number} end
         * @memberof Util
         */
        ;

        util.getOffsetMimutes = function getOffsetMimutes(start, end) {
          var offSetTime = end - start;
          var minute = Math.floor(offSetTime % (1000 * 60 * 60) / (1000 * 60));
          return minute;
        }
        /**
         * 返回指定小数位的数值
         * @param {number} num 
         * @param {number} idx 
         */
        ;

        util.formatNumToFixed = function formatNumToFixed(num, idx) {
          if (idx === void 0) {
            idx = 0;
          }

          return Number(num.toFixed(idx));
        }
        /**
         * 用于数值到达另外一个目标数值之间进行平滑过渡运动效果
         * @param {number} targetValue 目标数值 
         * @param {number} curValue 当前数值
         * @param {number} ratio    过渡比率
         * @returns 
         */
        ;

        util.lerp = function lerp(targetValue, curValue, ratio) {
          if (ratio === void 0) {
            ratio = 0.25;
          }

          var v = curValue;

          if (targetValue > curValue) {
            v = curValue + (targetValue - curValue) * ratio;
          } else if (targetValue < curValue) {
            v = curValue - (curValue - targetValue) * ratio;
          }

          return v;
        }
        /**
         * 数据解密
         * @param {String} str 
         */
        ;

        util.decrypt = function decrypt(b64Data) {
          var n = 6;

          if (b64Data.length % 2 === 0) {
            n = 7;
          }

          var decodeData = '';

          for (var idx = 0; idx < b64Data.length - n; idx += 2) {
            decodeData += b64Data[idx + 1];
            decodeData += b64Data[idx];
          }

          decodeData += b64Data.slice(b64Data.length - n + 1);
          decodeData = this._base64Decode(decodeData);
          return decodeData;
        }
        /**
        * 数据加密
        * @param {String} str 
        */
        ;

        util.encrypt = function encrypt(str) {
          var b64Data = this._base64encode(str);

          var n = 6;

          if (b64Data.length % 2 === 0) {
            n = 7;
          }

          var encodeData = '';

          for (var idx = 0; idx < (b64Data.length - n + 1) / 2; idx++) {
            encodeData += b64Data[2 * idx + 1];
            encodeData += b64Data[2 * idx];
          }

          encodeData += b64Data.slice(b64Data.length - n + 1);
          return encodeData;
        } //public method for encoding

        /**
         * base64加密
         * @param {string}input 
         * @returns 
         */
        ;

        util._base64encode = function _base64encode(input) {
          var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          var output = "",
              chr1,
              chr2,
              chr3,
              enc1,
              enc2,
              enc3,
              enc4,
              i = 0;
          input = this._utf8Encode(input);

          while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = (chr1 & 3) << 4 | chr2 >> 4;
            enc3 = (chr2 & 15) << 2 | chr3 >> 6;
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
              enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
              enc4 = 64;
            }

            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
          }

          return output;
        }
        /**
         * utf-8 加密
         * @param string 
         * @returns 
         */
        ;

        util._utf8Encode = function _utf8Encode(string) {
          string = string.replace(/\r\n/g, "\n");
          var utftext = "";

          for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);

            if (c < 128) {
              utftext += String.fromCharCode(c);
            } else if (c > 127 && c < 2048) {
              utftext += String.fromCharCode(c >> 6 | 192);
              utftext += String.fromCharCode(c & 63 | 128);
            } else {
              utftext += String.fromCharCode(c >> 12 | 224);
              utftext += String.fromCharCode(c >> 6 & 63 | 128);
              utftext += String.fromCharCode(c & 63 | 128);
            }
          }

          return utftext;
        }
        /**
         * utf-8解密
         * @param utftext 
         * @returns 
         */
        ;

        util._utf8Decode = function _utf8Decode(utftext) {
          var string = "";
          var i = 0;
          var c = 0;
          var c2 = 0;
          var c3 = 0;

          while (i < utftext.length) {
            c = utftext.charCodeAt(i);

            if (c < 128) {
              string += String.fromCharCode(c);
              i++;
            } else if (c > 191 && c < 224) {
              c2 = utftext.charCodeAt(i + 1);
              string += String.fromCharCode((c & 31) << 6 | c2 & 63);
              i += 2;
            } else {
              c2 = utftext.charCodeAt(i + 1);
              c3 = utftext.charCodeAt(i + 2);
              string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
              i += 3;
            }
          }

          return string;
        }
        /**
         * base64解密
         * @param {string}input 解密字符串
         * @returns 
         */
        ;

        util._base64Decode = function _base64Decode(input) {
          var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          var output = "";
          var chr1;
          var chr2;
          var chr3;
          var enc1;
          var enc2;
          var enc3;
          var enc4;
          var i = 0;
          input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

          while (i < input.length) {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));
            chr1 = enc1 << 2 | enc2 >> 4;
            chr2 = (enc2 & 15) << 4 | enc3 >> 2;
            chr3 = (enc3 & 3) << 6 | enc4;
            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
            }

            if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
            }
          }

          output = this._utf8Decode(output);
          return output;
        }
        /**
         * 获取当前机型性能是否为低端机
         */
        ;

        util.checkIsLowPhone = function checkIsLowPhone() {
          if (window.wx) {
            //微信性能数值参考:https://developers.weixin.qq.com/minigame/dev/guide/performance/perf-benchmarkLevel.html
            var nowBenchmarkLevel = -1; //nowBenchmarkLevel = -1性能未知

            var sys = window.wx.getSystemInfoSync();
            var isIOS = sys.system.indexOf('iOS') >= 0;

            if (isIOS) {
              //微信不支持IO性能等级
              var model = sys.model; // iPhone 5s 及以下 设定为超低端机

              var ultraLowPhoneType = ['iPhone1,1', 'iPhone1,2', 'iPhone2,1', 'iPhone3,1', 'iPhone3,3', 'iPhone4,1', 'iPhone5,1', 'iPhone5,2', 'iPhone5,3', 'iPhone5,4', 'iPhone6,1', 'iPhone6,2']; // iPhone 6 ~ iPhone SE 设定为超低端机

              var lowPhoneType = ['iPhone6,2', 'iPhone7,1', 'iPhone7,2', 'iPhone8,1', 'iPhone8,2', 'iPhone8,4']; // iPhone 7 ~ iPhone X 设定为中端机

              var middlePhoneType = ['iPhone9,1', 'iPhone9,2', 'iPhone9,3', 'iPhone9,4', 'iPhone10,1', 'iPhone10,2', 'iPhone10,3', 'iPhone10,4', 'iPhone10,5', 'iPhone10,6']; // iPhone XS 及以上 设定为高端机

              var highPhoneType = ['iPhone11,2', 'iPhone11,4', 'iPhone11,6', 'iPhone11,8', 'iPhone12,1', 'iPhone12,3', 'iPhone12,5', 'iPhone12,8'];

              for (var i = 0; i < ultraLowPhoneType.length; i++) {
                if (model.indexOf(ultraLowPhoneType[i]) >= 0) nowBenchmarkLevel = 5;
              }

              for (var _i = 0; _i < lowPhoneType.length; _i++) {
                if (model.indexOf(lowPhoneType[_i]) >= 0) nowBenchmarkLevel = 10;
              }

              for (var _i2 = 0; _i2 < middlePhoneType.length; _i2++) {
                if (model.indexOf(middlePhoneType[_i2]) >= 0) nowBenchmarkLevel = 20;
              }

              for (var _i3 = 0; _i3 < highPhoneType.length; _i3++) {
                if (model.indexOf(highPhoneType[_i3]) >= 0) nowBenchmarkLevel = 30;
              }
            } else {
              nowBenchmarkLevel = sys.benchmarkLevel;
            }

            if (nowBenchmarkLevel < 22) {
              //22的具体参数可参考微信官方
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        };

        return util;
      }()) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/effectManager.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './poolManager.ts', './resourceUtil.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Vec3, AnimationComponent, ParticleSystemComponent, Component, AnimationClip, find, _defineProperty, _inheritsLoose, _assertThisInitialized, _createClass, poolManager, resourceUtil;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      AnimationComponent = module.AnimationComponent;
      ParticleSystemComponent = module.ParticleSystemComponent;
      Component = module.Component;
      AnimationClip = module.AnimationClip;
      find = module.find;
    }, function (module) {
      _defineProperty = module.defineProperty;
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      poolManager = module.poolManager;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "554baRvdXVCaZZeXFSvvApe", "effectManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var EffectManager = exports('EffectManager', (_dec = ccclass('EffectManager'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EffectManager, _Component);

        function EffectManager() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_ndParent", null);

          return _this;
        }

        var _proto = EffectManager.prototype;
        /**
         * 播放动画
         * @param {string} path 动画节点路径
         * @param {string} aniName 
         * @param {vec3} worPos 世界坐标
         * @param {boolean} isLoop 是否循环
         * @param {boolean} isRecycle 是否回收
         * @param {number} [scale=1] 缩放倍数 
         * @param {Function} [callback=()=>{}] 回调函数 
         */

        _proto.playAni = function playAni(path, aniName, worPos, isLoop, isRecycle, scale, callback) {
          var _this2 = this;

          if (worPos === void 0) {
            worPos = new Vec3();
          }

          if (isLoop === void 0) {
            isLoop = false;
          }

          if (isRecycle === void 0) {
            isRecycle = false;
          }

          if (scale === void 0) {
            scale = 1;
          }

          if (callback === void 0) {
            callback = function callback() {};
          }

          var childName = path.split("/")[1];
          var ndEffect = this.ndParent.getChildByName(childName);

          var cb = function cb() {
            var _ndEffect, _ndEffect2, _ndEffect3;

            (_ndEffect = ndEffect) === null || _ndEffect === void 0 ? void 0 : _ndEffect.setScale(new Vec3(scale, scale, scale));
            (_ndEffect2 = ndEffect) === null || _ndEffect2 === void 0 ? void 0 : _ndEffect2.setWorldPosition(worPos);
            var ani = (_ndEffect3 = ndEffect) === null || _ndEffect3 === void 0 ? void 0 : _ndEffect3.getComponent(AnimationComponent);
            ani.play(aniName);
            var aniState = ani.getState(aniName);

            if (aniState) {
              if (isLoop) {
                aniState.wrapMode = AnimationClip.WrapMode.Loop;
              } else {
                aniState.wrapMode = AnimationClip.WrapMode.Normal;
              }
            }

            ani.once(AnimationComponent.EventType.FINISHED, function () {
              callback && callback();

              if (isRecycle && ndEffect) {
                poolManager.instance.putNode(ndEffect);
              }
            });
          };

          if (!ndEffect) {
            resourceUtil.loadModelRes(path).then(function (prefab) {
              ndEffect = poolManager.instance.getNode(prefab, _this2.ndParent);
              ndEffect.setScale(new Vec3(scale, scale, scale));
              ndEffect.setWorldPosition(worPos);
              cb();
            });
          } else {
            cb();
          }
        }
        /**
         * 移除特效
         * @param {string} name  特效名称
         * @param {Node}} ndParent 特效父节点
         */
        ;

        _proto.removeEffect = function removeEffect(name, ndParent) {
          if (ndParent === void 0) {
            ndParent = this.ndParent;
          }

          var ndEffect = ndParent.getChildByName(name);

          if (ndEffect) {
            var arrAni = ndEffect.getComponentsInChildren(AnimationComponent);
            arrAni.forEach(function (element) {
              element.stop();
            });
            var arrParticle = ndEffect === null || ndEffect === void 0 ? void 0 : ndEffect.getComponentsInChildren(ParticleSystemComponent);
            arrParticle.forEach(function (element) {
              element === null || element === void 0 ? void 0 : element.clear();
              element === null || element === void 0 ? void 0 : element.stop();
            });
            poolManager.instance.putNode(ndEffect);
          }
        }
        /**
         * 播放粒子特效
         * @param {string} path 特效路径
         * @param {vec3}worPos 特效世界坐标 
         * @param {number} [recycleTime=0] 特效节点回收时间，如果为0，则使用默认duration
         * @param  {number} [scale=1] 缩放倍数
         * @param {vec3} eulerAngles 特效角度
         * @param {Function} [callback=()=>{}] 回调函数
         */
        ;

        _proto.playParticle = function playParticle(path, worPos, recycleTime, scale, eulerAngles, callback) {
          var _this3 = this;

          if (recycleTime === void 0) {
            recycleTime = 0;
          }

          if (scale === void 0) {
            scale = 1;
          }

          resourceUtil.loadEffectRes(path).then(function (prefab) {
            var ndEffect = poolManager.instance.getNode(prefab, _this3.ndParent);
            ndEffect.setScale(new Vec3(scale, scale, scale));
            ndEffect.setWorldPosition(worPos);

            if (eulerAngles) {
              ndEffect.eulerAngles = eulerAngles;
            }

            var maxDuration = 0;
            var arrParticle = ndEffect.getComponentsInChildren(ParticleSystemComponent);
            arrParticle.forEach(function (item) {
              item.simulationSpeed = 1;
              item === null || item === void 0 ? void 0 : item.clear();
              item === null || item === void 0 ? void 0 : item.stop();
              item === null || item === void 0 ? void 0 : item.play();
              var duration = item.duration;
              maxDuration = duration > maxDuration ? duration : maxDuration;
            });
            var seconds = recycleTime && recycleTime > 0 ? recycleTime : maxDuration;
            setTimeout(function () {
              if (ndEffect.parent) {
                callback && callback();
                poolManager.instance.putNode(ndEffect);
              }
            }, seconds * 1000);
          });
        }
        /**
         * 播放节点下面的动画和粒子
         *
         * @param {Node} targetNode 特效挂载节点
         * @param {string} effectPath 特效路径
         * @param {boolean} [isPlayAni=true] 是否播放动画
         * @param {boolean} [isPlayParticle=true] 是否播放特效
         * @param {number} [recycleTime=0] 特效节点回收时间，如果为0，则使用默认duration
         * @param {number} [scale=1] 缩放倍数
         * @param {Vec3} [pos=new Vec3()] 位移
         * @param {Function} [callback=()=>{}] 回调函数
         * @returns
         * @memberof EffectManager
         */
        ;

        _proto.playEffect = function playEffect(targetNode, effectPath, isPlayAni, isPlayParticle, recycleTime, scale, pos, eulerAngles, callback) {
          if (isPlayAni === void 0) {
            isPlayAni = true;
          }

          if (isPlayParticle === void 0) {
            isPlayParticle = true;
          }

          if (recycleTime === void 0) {
            recycleTime = 0;
          }

          if (scale === void 0) {
            scale = 1;
          }

          if (pos === void 0) {
            pos = new Vec3();
          }

          if (!targetNode.parent) {
            //父节点被回收的时候不播放
            return;
          }

          resourceUtil.loadEffectRes(effectPath).then(function (prefab) {
            var ndEffect = poolManager.instance.getNode(prefab, targetNode);
            ndEffect.setScale(new Vec3(scale, scale, scale));
            ndEffect.setPosition(pos);

            if (eulerAngles) {
              ndEffect.eulerAngles = eulerAngles;
            }

            var maxDuration = 0;

            if (isPlayAni) {
              var arrAni = ndEffect.getComponentsInChildren(AnimationComponent);
              arrAni.forEach(function (element, idx) {
                var _element$defaultClip;

                element === null || element === void 0 ? void 0 : element.play();
                var aniName = element === null || element === void 0 ? void 0 : (_element$defaultClip = element.defaultClip) === null || _element$defaultClip === void 0 ? void 0 : _element$defaultClip.name;

                if (aniName) {
                  var aniState = element.getState(aniName);

                  if (aniState) {
                    var duration = aniState.duration;
                    maxDuration = duration > maxDuration ? duration : maxDuration;
                    aniState.speed = 1;
                  }
                }
              });
            }

            if (isPlayParticle) {
              var arrParticle = ndEffect.getComponentsInChildren(ParticleSystemComponent);
              arrParticle.forEach(function (element) {
                element.simulationSpeed = 1;
                element === null || element === void 0 ? void 0 : element.clear();
                element === null || element === void 0 ? void 0 : element.stop();
                element === null || element === void 0 ? void 0 : element.play();
                var duration = element.duration;
                maxDuration = duration > maxDuration ? duration : maxDuration;
              });
            }

            var seconds = recycleTime && recycleTime > 0 ? recycleTime : maxDuration;
            setTimeout(function () {
              if (ndEffect.parent) {
                callback && callback();
                poolManager.instance.putNode(ndEffect);
              }
            }, seconds * 1000);
          });
        };

        _createClass(EffectManager, [{
          key: "ndParent",
          get: function get() {
            if (!this._ndParent) {
              this._ndParent = find("effectManager");
            }

            return this._ndParent;
          }
        }], [{
          key: "instance",
          get: function get() {
            if (this._instance) {
              return this._instance;
            }

            this._instance = new EffectManager();
            return this._instance;
          }
        }]);

        return EffectManager;
      }(Component), _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/storageManager.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './util.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, sys, log, _defineProperty, _createClass, util;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sys = module.sys;
      log = module.log;
    }, function (module) {
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
    }, function (module) {
      util = module.util;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "5689348bSJGyYo12WGa6eeJ", "storageManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var StorageManager = exports('StorageManager', (_dec = ccclass("StorageManager"), _dec(_class = (_temp = _class2 = /*#__PURE__*/function () {
        function StorageManager() {
          _defineProperty(this, "_jsonData", {});

          _defineProperty(this, "_path", null);

          _defineProperty(this, "KEY_CONFIG", 'mini_game_002');

          _defineProperty(this, "_markSave", false);

          _defineProperty(this, "_saveTimer", -1);
        }

        var _proto = StorageManager.prototype;

        _proto.start = function start() {
          var _this = this;

          this._jsonData = {
            "userId": ""
          };
          this._path = this._getConfigPath();
          var content;

          if (sys.isNative) {
            var valueObject = jsb.fileUtils.getValueMapFromFile(this._path);
            content = valueObject[this.KEY_CONFIG];
          } else {
            content = sys.localStorage.getItem(this.KEY_CONFIG);
          } // // 解密代码
          // if (cc.game.config["encript"]) {
          //     var newContent = new Xxtea("upgradeHeroAbility").xxteaDecrypt(content);
          //     if (newContent && newContent.length > 0) {
          //         content = newContent;
          //     }
          // }


          if (content && content.length) {
            if (content.startsWith('@')) {
              content = content.substring(1);
              content = util.decrypt(content);
            }

            try {
              //初始化操作
              var jsonData = JSON.parse(content);
              this._jsonData = jsonData;
              console.log("this._jsonData ", jsonData);
            } catch (excepaiton) {}
          } //启动无限定时器，每1秒保存一次数据，而不是无限保存数据
          // this._saveTimer = setInterval(() =>{
          //     this.scheduleSave();
          // }, 500);
          //每隔5秒保存一次数据，主要是为了保存最新在线时间，方便离线奖励时间判定


          this._saveTimer = setInterval(function () {
            _this.scheduleSave();
          }, 5000);
        }
        /**
         * 存储配置文件，不保存到本地
         * @param {string}key  关键字
         * @param {any}value  存储值
         */
        ;

        _proto.setConfigDataWithoutSave = function setConfigDataWithoutSave(key, value) {
          var account = this._jsonData.userId;

          if (this._jsonData[account]) {
            this._jsonData[account][key] = value;
          } else {
            console.error("no account can not save");
          }
        }
        /**
           * 存储配置文件，保存到本地
           * @param {string}key  关键字
           * @param {any}value  存储值
           */
        ;

        _proto.setConfigData = function setConfigData(key, value) {
          this.setConfigDataWithoutSave(key, value);
          this._markSave = true; //标记为需要存储，避免一直在写入，而是每隔一段时间进行写入
        }
        /**
         * 根据关键字获取数值
         * @param {string} key 关键字
         * @returns 
         */
        ;

        _proto.getConfigData = function getConfigData(key) {
          var account = this._jsonData.userId;

          if (this._jsonData[account]) {
            var value = this._jsonData[account][key];
            return value ? value : "";
          } else {
            log("no account can not load");
            return "";
          }
        }
        /**
         * 设置全局数据
         * @param {string} key 关键字
         * @param {any}value  存储值
         * @returns 
         */
        ;

        _proto.setGlobalData = function setGlobalData(key, value) {
          this._jsonData[key] = value;
          this.save();
        }
        /**
         * 获取全局数据
         * @param {string} key 关键字
         * @returns 
         */
        ;

        _proto.getGlobalData = function getGlobalData(key) {
          return this._jsonData[key];
        }
        /**
         * 设置用户唯一标示符
         * @param {string} userId 用户唯一标示符
         * @param {any}value  存储值
         * @returns 
         */
        ;

        _proto.setUserId = function setUserId(userId) {
          this._jsonData.userId = userId;

          if (!this._jsonData[userId]) {
            this._jsonData[userId] = {};
          }

          this.save();
        }
        /**
         * 获取用户唯一标示符
         * @returns {string}
         */
        ;

        _proto.getUserId = function getUserId() {
          return this._jsonData.userId;
        }
        /**
         * 定时存储
         * @returns 
         */
        ;

        _proto.scheduleSave = function scheduleSave() {
          if (!this._markSave) {
            return;
          }

          this.save();
        }
        /**
         * 标记为已修改
         */
        ;

        _proto.markModified = function markModified() {
          this._markSave = true;
        }
        /**
         * 保存配置文件
         * @returns 
         */
        ;

        _proto.save = function save() {
          // 写入文件
          var str = JSON.stringify(this._jsonData); // // 加密代码
          // if (cc.game.config["encript"]) {
          //     str = new Xxtea("upgradeHeroAbility").xxteaEncrypt(str);
          // }

          var zipStr = '@' + util.encrypt(str); // let zipStr = str;

          this._markSave = false;

          if (!sys.isNative) {
            var ls = sys.localStorage;
            ls.setItem(this.KEY_CONFIG, zipStr);
            return;
          }

          var valueObj = {};
          valueObj[this.KEY_CONFIG] = zipStr;
          jsb.fileUtils.writeToFile(valueObj, this._getConfigPath()); // jsb.fileUtils.writeToFile(valueObj);
        }
        /**
         * 获取配置文件路径
         * @returns 获取配置文件路径
         */
        ;

        _proto._getConfigPath = function _getConfigPath() {
          var platform = sys.platform;
          var path = "";

          if (platform === sys.OS.WINDOWS) {
            path = "src/conf";
          } else if (platform === sys.OS.LINUX) {
            path = "./conf";
          } else {
            if (sys.isNative) {
              path = jsb.fileUtils.getWritablePath();
              path = path + "conf";
            } else {
              path = "src/conf";
            }
          }

          return path;
        };

        _createClass(StorageManager, null, [{
          key: "instance",
          get: function get() {
            if (this._instance) {
              return this._instance;
            }

            this._instance = new StorageManager();

            this._instance.start();

            return this._instance;
          }
        }]);

        return StorageManager;
      }(), _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/shopItem.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './constants.ts', './clientEvent.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './gameLogic.ts', './LocalizedSprite.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil, constants, clientEvent, localConfig, playerData, uiManager, GameLogic, LocalizedSprite;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      GameLogic = module.GameLogic;
    }, function (module) {
      LocalizedSprite = module.LocalizedSprite;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _temp;

      cclegacy._RF.push({}, "583beWcByBAYIU3DaI3EGJj", "shopItem", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ShopItem = exports('ShopItem', (_dec = ccclass('ShopItem'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ShopItem, _Component);

        function ShopItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "spIcon", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbPrise", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndGold", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbNum", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbProcess", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "aniLight", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "exBtnBuy", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndNumber", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spBtnBuy", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfBuy", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfShare", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfAd", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfReceive", _descriptor13, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "info", void 0);

          _defineProperty(_assertThisInitialized(_this), "parent", void 0);

          _defineProperty(_assertThisInitialized(_this), "id", void 0);

          _defineProperty(_assertThisInitialized(_this), "price", void 0);

          _defineProperty(_assertThisInitialized(_this), "countPerBuy", void 0);

          _defineProperty(_assertThisInitialized(_this), "icon", void 0);

          _defineProperty(_assertThisInitialized(_this), "animState", void 0);

          _defineProperty(_assertThisInitialized(_this), "totalPrice", void 0);

          _defineProperty(_assertThisInitialized(_this), "times", void 0);

          _defineProperty(_assertThisInitialized(_this), "maxTimes", void 0);

          _defineProperty(_assertThisInitialized(_this), "rewardType", void 0);

          return _this;
        }

        var _proto = ShopItem.prototype;

        _proto.onEnable = function onEnable() {
          clientEvent.on('updateGold', this.refreshBtn, this);
          clientEvent.on('updateInfiniteShareTimes', this.updateInfiniteShareTimes, this);
        };

        _proto.onDisable = function onDisable() {
          clientEvent.off('updateGold', this.refreshBtn, this);
          clientEvent.off('updateInfiniteShareTimes', this.updateInfiniteShareTimes, this);
        };

        _proto.setInfo = function setInfo(info, parent) {
          this.info = info;
          this.parent = parent;
          this.id = info.ID;
          this.price = info.price;
          this.countPerBuy = info.countPerBuy;
          this.icon = info.icon;
          this.refreshUI();
          this.refreshBtn();
        };

        _proto.refreshUI = function refreshUI() {
          var _this2 = this;

          this.animState = 'shopPropertyIdle';
          this.aniLight.play(this.animState);
          resourceUtil.setPropIcon(this.icon, this.spIcon, function () {});
          var propItem = localConfig.instance.queryByID('prop', this.id);
          this.totalPrice = this.countPerBuy * this.price;
          this.lbNum.string = propItem.countPerBuy;
          this.times = playerData.instance.getInfiniteTimes();
          this.maxTimes = constants.MAX_INFINITE_TIMES;

          if (this.info.ID !== constants.PROP_ID.INFINITE) {
            this.lbPrise.string = this.totalPrice;
            this.lbProcess.node.active = false;
          } else {
            GameLogic.instance.getOpenRewardType(constants.SHARE_FUNCTION.BUY_INFINITE, function (err, type) {
              var _this2$spBtnBuy$getCo;

              if (!err) {
                _this2.rewardType = type;

                switch (type) {
                  case constants.OPEN_REWARD_TYPE.AD:
                    _this2.spBtnBuy.spriteFrame = _this2.sfAd;
                    _this2.ndGold.active = false;

                    _this2.updateInfiniteShareTimes();

                    break;

                  case constants.OPEN_REWARD_TYPE.SHARE:
                    _this2.spBtnBuy.spriteFrame = _this2.sfShare;
                    _this2.ndGold.active = false;

                    _this2.updateInfiniteShareTimes();

                    break;

                  case constants.OPEN_REWARD_TYPE.NULL:
                    // this.spBtnBuy.spriteFrame = this.sfBuy;
                    (_this2$spBtnBuy$getCo = _this2.spBtnBuy.getComponent(LocalizedSprite)) === null || _this2$spBtnBuy$getCo === void 0 ? void 0 : _this2$spBtnBuy$getCo.fetchRender();
                    _this2.lbProcess.node.active = false;
                    _this2.lbPrise.string = _this2.totalPrice;
                    break;
                }

                _this2.refreshBtn();
              }
            });
          }
        };

        _proto.refreshBtn = function refreshBtn() {
          if (typeof this.rewardType === 'number' && this.rewardType !== constants.OPEN_REWARD_TYPE.NULL) {
            this.exBtnBuy.interactable = true;
          } else {
            this.exBtnBuy.interactable = playerData.instance.getGold() >= this.totalPrice;
          }
        };

        _proto.onBtnBuyClick = function onBtnBuyClick() {
          uiManager.instance.showDialog('props/buy', [this.id, constants.ANALYTICS_TYPE.SHOP_PROP_PER_BUY]);
          this.parent.showAllItemUnSelect();
          this.showSelect();
        };

        _proto.onItemClick = function onItemClick() {
          this.parent.showAllItemUnSelect();
          this.parent.hideRandPropSelect();
          this.showSelect();
        };

        _proto.showSelect = function showSelect() {
          this.animState = 'shopPropertySelect';
          this.aniLight.play(this.animState);
          this.parent.shopPropsOperationScript.show(this.id);
        };

        _proto.showUnSelect = function showUnSelect() {
          if (this.animState === 'shopPropertyIdle') return;
          this.animState = 'shopPropertyIdle';
          this.aniLight.play(this.animState);
        };

        _proto.updateInfiniteShareTimes = function updateInfiniteShareTimes() {
          this.spBtnBuy.node.setScale(1, 1, 1);

          if (this.id === constants.PROP_ID.INFINITE) {
            this.spBtnBuy.spriteFrame = this.sfReceive;
            this.spBtnBuy.node.setScale(1.3, 1.3, 1.3);
          }
        };

        return ShopItem;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbPrise", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ndGold", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbNum", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "lbProcess", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "aniLight", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "exBtnBuy", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ndNumber", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "spBtnBuy", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "sfBuy", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "sfShare", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "sfAd", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "sfReceive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/audioManager.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './storageManager.ts', './loadsh.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Node, director, game, AudioSource, AudioClip, _defineProperty, _createClass, resourceUtil, StorageManager, loadsh;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      director = module.director;
      game = module.game;
      AudioSource = module.AudioSource;
      AudioClip = module.AudioClip;
    }, function (module) {
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      StorageManager = module.StorageManager;
    }, function (module) {
      loadsh = module.loadsh;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "5e2ecZFEJFEHoCgx6lXVYHB", "audioManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AudioManager = exports('AudioManager', (_dec = ccclass("AudioManager"), _dec(_class = (_temp = _class2 = /*#__PURE__*/function () {
        function AudioManager() {
          _defineProperty(this, "_persistRootNode", null);

          _defineProperty(this, "_audioSources", []);

          _defineProperty(this, "dictWeaponSoundIndex", {});

          _defineProperty(this, "musicVolume", 0.8);

          _defineProperty(this, "soundVolume", 1);

          _defineProperty(this, "audios", {});

          _defineProperty(this, "arrSound", []);
        }

        var _proto = AudioManager.prototype;

        _proto.init = function init() {
          if (this._persistRootNode) return; //避免切换场景初始化报错

          this._persistRootNode = new Node('audio');
          director.getScene().addChild(this._persistRootNode);
          game.addPersistRootNode(this._persistRootNode);
          this.musicVolume = this.getAudioSetting(true) ? 0.8 : 0;
          this.soundVolume = this.getAudioSetting(false) ? 1 : 0;
        };

        _proto._getAudioSource = function _getAudioSource(clip) {
          var result;

          for (var i = 0; i < this._audioSources.length; ++i) {
            var audioSource = this._audioSources[i];

            if (!audioSource.playing) {
              result = audioSource;
              break;
            }
          }

          if (!result) {
            result = this._persistRootNode.addComponent(AudioSource);

            this._audioSources.push(result);
          }

          result.node.off(AudioSource.EventType.ENDED);
          result.clip = clip;
          result.currentTime = 0;
          return result;
        };

        _proto.getAudioSetting = function getAudioSetting(isMusic) {
          var state;

          if (isMusic) {
            state = StorageManager.instance.getGlobalData('music');
          } else {
            state = StorageManager.instance.getGlobalData('sound');
          } // console.log('Config for [' + (isMusic ? 'Music' : 'Sound') + '] is ' + state);


          return !state || state === 'true' ? true : false;
        }
        /**
         * 播放音乐
         * @param {String} name 音乐名称可通过constants.AUDIO_MUSIC 获取
         * @param {Boolean} loop 是否循环播放
         */
        ;

        _proto.playMusic = function playMusic(name, loop) {
          var _this = this;

          var path = 'audio/music/' + name; //微信特殊处理，除一开场的音乐，其余的放在子包里头
          // if (name !== 'click') {
          //     path =  path; //微信特殊处理，除一开场的音乐，其余的放在子包里头
          // }

          resourceUtil.loadRes(path, AudioClip, function (err, clip) {
            var source = _this._getAudioSource(clip);

            var tmp = {
              source: source,
              isMusic: true
            };
            _this.audios[name] = tmp;
            source.volume = _this.musicVolume;
            source.loop = loop;
            source.play();
          });
        }
        /**
         * 播放音效
         * @param {String} name 音效名称可通过constants.AUDIO_SOUND 获取
         * @param {Boolean} loop 是否循环播放
         */
        ;

        _proto.playSound = function playSound(name, loop) {
          var _this2 = this;

          if (loop === void 0) {
            loop = false;
          }

          if (!this.soundVolume) {
            return;
          } //音效一般是多个的，不会只有一个


          var path = 'audio/sound/'; // if (name !== 'click') {
          //     path = path; //微信特殊处理，除一开场的音乐，其余的放在子包里头
          // }

          resourceUtil.loadRes(path + name, AudioClip, function (err, clip) {
            var source = _this2._getAudioSource(clip);

            var tmp = {
              source: source,
              isMusic: false
            };

            _this2.arrSound.push(tmp);

            if (loop) {
              _this2.audios[name] = tmp;
            }

            source.volume = _this2.soundVolume;
            source.loop = loop;
            source.play();
            source.node.on(AudioSource.EventType.ENDED, function () {
              loadsh.remove(_this2.arrSound, function (obj) {
                return obj.source === tmp.source;
              });
            });
          });
        };

        _proto.stop = function stop(name) {
          if (this.audios.hasOwnProperty(name)) {
            var audio = this.audios[name];
            audio.source.stop();
          }
        };

        _proto.stopAll = function stopAll() {
          for (var i in this.audios) {
            if (this.audios.hasOwnProperty(i)) {
              var audio = this.audios[i];
              audio.source.stop();
            }
          }
        };

        _proto.getMusicVolume = function getMusicVolume() {
          return this.musicVolume;
        };

        _proto.setMusic = function setMusic(flag) {
          this.musicVolume = flag;

          for (var item in this.audios) {
            if (this.audios.hasOwnProperty(item) && this.audios[item].isMusic) {
              // this.changeState(item, flag);
              var audio = this.audios[item];
              audio.source.volume = this.musicVolume;
            }
          }
        } //看广告时先将音乐暂停
        ;

        _proto.pauseAll = function pauseAll() {
          console.log("pause all music!!!");

          for (var item in this.audios) {
            if (this.audios.hasOwnProperty(item)) {
              var audio = this.audios[item];
              audio.source.pause();
            }
          }
        };

        _proto.resumeAll = function resumeAll() {
          for (var item in this.audios) {
            if (this.audios.hasOwnProperty(item)) {
              var audio = this.audios[item];
              audio.source.play();
            }
          }
        };

        _proto.openMusic = function openMusic() {
          this.setMusic(0.8);
          StorageManager.instance.setGlobalData('music', 'true');
        };

        _proto.closeMusic = function closeMusic() {
          this.setMusic(0);
          StorageManager.instance.setGlobalData('music', 'false');
        };

        _proto.openSound = function openSound() {
          this.setSound(1);
          StorageManager.instance.setGlobalData('sound', 'true');
        };

        _proto.closeSound = function closeSound() {
          this.setSound(0);
          StorageManager.instance.setGlobalData('sound', 'false');
        };

        _proto.setSound = function setSound(flag) {
          this.soundVolume = flag;

          for (var item in this.audios) {
            if (this.audios.hasOwnProperty(item) && !this.audios[item].isMusic) {
              // this.changeState(item, flag);
              var audio = this.audios[item];
              audio.source.volume = this.soundVolume;
            }
          }

          for (var idx = 0; idx < this.arrSound.length; idx++) {
            var _audio = this.arrSound[idx];
            _audio.source.volume = this.soundVolume;
          }
        };

        _proto.stopSingleSound = function stopSingleSound(name) {
          if (this.audios.hasOwnProperty(name) && !this.audios[name].isMusic) {
            var audio = this.audios[name];
            audio.source.stop();
          }
        };

        _createClass(AudioManager, null, [{
          key: "instance",
          get: function get() {
            if (this._instance) {
              return this._instance;
            }

            this._instance = new AudioManager();
            return this._instance;
          }
        }]);

        return AudioManager;
      }(), _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/pveSlotUI.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './constants.ts', './playerData.ts', './levelUI.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, instantiate, UITransform, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, constants, playerData, LevelUI;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      instantiate = module.instantiate;
      UITransform = module.UITransform;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      LevelUI = module.LevelUI;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "61998EPL8lJqYcj54CvjY6+", "pveSlotUI", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PveSlotUI = exports('PveSlotUI', (_dec = ccclass('PveSlotUI'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PveSlotUI, _Component);

        function PveSlotUI() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "levelNodes", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "prefabLevel", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "prefabCloud", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "index", void 0);

          _defineProperty(_assertThisInitialized(_this), "_parent", void 0);

          _defineProperty(_assertThisInitialized(_this), "levelArray", void 0);

          return _this;
        }

        var _proto = PveSlotUI.prototype;

        _proto.show = function show(parent, pveData, index) {
          this.index = index;
          this._parent = parent;
          this.levelArray = pveData;
          this.addLevelNodes();
        };

        _proto.addLevelNodes = function addLevelNodes() {
          var curLevel = playerData.instance.getCurrentLevel();
          var curLevenName = parseInt(curLevel.name);
          var total = this.levelArray.length;
          var lastHeight = 0;

          for (var i = 0; i < total; i++) {
            this.levelNodes[i].active = true;
            var levelUI = this.levelNodes[i].getComponentInChildren(LevelUI);

            if (!levelUI) {
              var child = instantiate(this.prefabLevel);
              child.active = true;
              child.setPosition(0, 0);
              this.levelNodes[i].addChild(child);
            }

            var name = this.levelArray[i].name;

            if (parseInt(name) < curLevenName) {
              // 已完成
              this.levelArray[i].status = constants.PVE_LEVEL_STATUS.DONE;
            } else if (parseInt(name) === curLevenName) {
              // 当前等级
              this.levelArray[i].status = constants.PVE_LEVEL_STATUS.DOING;
            } else {
              //  未完成
              this.levelArray[i].status = constants.PVE_LEVEL_STATUS.UNDONE;
            }

            var ID = this.levelArray[i].ID;

            if (playerData.instance.history.hasOwnProperty(ID)) {
              this.levelArray[i].star = playerData.instance.history[ID].star;
            }

            levelUI = this.levelNodes[i].getComponentInChildren(LevelUI);
            levelUI.init(this.levelArray[i]);
            lastHeight = this.levelNodes[i].position.y;
          }

          console.log("lastHeight ", lastHeight, this.index);
          this.showCloudsUponLevels(lastHeight);
          var cnt = this.levelNodes.length;

          for (var idx = this.levelArray.length; idx < cnt; idx++) {
            this.levelNodes[idx].removeAllChildren();
            this.levelNodes[idx].active = false;
          }
        };

        _proto.showCloudsUponLevels = function showCloudsUponLevels(lastHeight) {
          var isNode = this.node.getChildByName('cloud');

          if (isNode) {
            this.node.removeChild(isNode);
          }

          var multi = 0;
          var height = lastHeight;

          if (this.index < 0) {
            multi = 0;
          } else {
            multi = this.index;
            height = height + 430; // prefab1的高度530减去回弹范围100
          }

          var nodeHeight = this.node.getComponent(UITransform).height;
          height = height + nodeHeight * multi; // 最后一个level节点的高度

          var topY = nodeHeight + this.node.position.y;

          var contentY = this._parent.contentNode.getComponent(UITransform).height; // content的总高度


          var nodeCloud = instantiate(this.prefabCloud);
          var nodeCloudHeight = nodeCloud.getComponent(UITransform).height;

          if (Math.abs(topY - height) > nodeCloudHeight) {
            // nodeCloud.setPosition(0, lastHeight + nodeCloudHeight / 2);
            nodeCloud.setPosition(0, lastHeight + 50); //nodeCloud 有Widget 自动对齐,需要移除

            nodeCloud.active = true;
            this.node.addChild(nodeCloud); // nodeCloud.on(Node.EventType.TRANSFORM_CHANGED,(arg:any)=>{
            //     console.log("position change  ",arg)
            // },this)
          }
        };

        return PveSlotUI;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "levelNodes", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefabLevel", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "prefabCloud", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/pveUI.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './constants.ts', './clientEvent.ts', './utils.ts', './playerData.ts', './uiManager.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Animation, Sprite, Vec3, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, constants, clientEvent, utils, playerData, uiManager, GameLogic;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      Sprite = module.Sprite;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      utils = module.utils;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      GameLogic = module.GameLogic;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _temp;

      cclegacy._RF.push({}, "61b9axYpi9De7EZBUlEuYVP", "pveUI", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PveUI = exports('PveUI', (_dec = ccclass('PveUI'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PveUI, _Component);

        function PveUI() {
          var _this2;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this2 = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this2), "multiScrollView", _descriptor, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "settingNode", _descriptor2, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "introductionNode", _descriptor3, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "ndLotteryBtn", _descriptor4, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "ndLotteryTips", _descriptor5, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "lbLotterySpareTimes", _descriptor6, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "sfBlueDot", _descriptor7, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "sfRedDot", _descriptor8, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "lbGold", _descriptor9, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "ndSignRedDot", _descriptor10, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "ndShopRedDot", _descriptor11, _assertThisInitialized(_this2));

          _defineProperty(_assertThisInitialized(_this2), "rewardType", void 0);

          _defineProperty(_assertThisInitialized(_this2), "debugIdx", void 0);

          _defineProperty(_assertThisInitialized(_this2), "debugTimer", void 0);

          return _this2;
        }

        var _proto = PveUI.prototype;

        _proto.onEnable = function onEnable() {
          clientEvent.on('updateSignIn', this.checkSignInRedDot, this);
          clientEvent.on('updateLotterySpareTimes', this.updateLotterySpareTimes, this);
          clientEvent.on('updateGold', this.updateGold, this);
          clientEvent.on('updateShopPropInfo', this.checkShopRedDot, this);
        };

        _proto.onDisable = function onDisable() {
          clientEvent.off('updateSignIn', this.checkSignInRedDot, this);
          clientEvent.off('updateLotterySpareTimes', this.updateLotterySpareTimes, this);
          clientEvent.off('updateGold', this.updateGold, this);
          clientEvent.off('updateShopPropInfo', this.checkShopRedDot, this);
        };

        _proto.start = function start() {
          if (playerData.instance.playerInfo.isNew) {
            this.introductionNode.active = true;
          } else {
            this.introductionNode.active = false;
          }

          this.refreshUI();
          this.checkSignInRedDot();
          this.checkShopRedDot();
          this.updateLotterySpareTimes();
        };

        _proto.refreshUI = function refreshUI() {
          this.updateGold();
        };

        _proto.onBtnBack = function onBtnBack() {};

        _proto.onBtnSettingClick = function onBtnSettingClick() {
          GameLogic.instance.showInterStitialAd(function () {
            uiManager.instance.showDialog('dialog/setting');
          });
        };

        _proto.onBtnSignClick = function onBtnSignClick() {
          uiManager.instance.showDialog('signIn/signIn');
        };

        _proto.onBtnLotteryClick = function onBtnLotteryClick() {
          uiManager.instance.showDialog('lottery/lottery');
        };

        _proto.onBtnIntrodutionClick = function onBtnIntrodutionClick() {
          this.introductionNode.active = false; // playerData.instance.updateIsNew();
        };

        _proto.updateLotterySpareTimes = function updateLotterySpareTimes() {
          var _this3 = this;

          GameLogic.instance.getOpenRewardType(constants.SHARE_FUNCTION.LOTTERY, function (err, type) {
            if (!err) {
              _this3.rewardType = type;
            }
          });
          var spareTimes = playerData.instance.getLotterySpareTimes(false);
          var spareMoreTimes = playerData.instance.getLotterySpareTimes(true); //更多抽奖剩余次数

          this.ndLotteryTips.active = spareTimes > 0 || spareMoreTimes > 0;
          this.lbLotterySpareTimes.string = spareTimes.toString();
          var ani = this.ndLotteryBtn.getComponent(Animation);

          if (spareTimes > 0 || spareMoreTimes > 0) {
            if (!spareTimes) {
              //如果三次抽取完了
              if (this.rewardType !== constants.OPEN_REWARD_TYPE.NULL) {
                this.lbLotterySpareTimes.string = spareMoreTimes.toString();
                this.ndLotteryTips.getComponent(Sprite).spriteFrame = this.sfBlueDot;
                ani.play();
              } else {
                this.ndLotteryTips.active = false;
                ani.stop();
                this.ndLotteryBtn.getChildByName('pveIconLotterya').eulerAngles = new Vec3(0, 0, 0);
              }
            } else {
              ani.play();
            }
          } else {
            ani.stop();
            this.ndLotteryBtn.getChildByName('pveIconLotterya').eulerAngles = new Vec3(0, 0, 0);
          }
        };

        _proto.updateGold = function updateGold() {
          this.lbGold.string = utils.formatMoney(playerData.instance.getGold());
        };

        _proto.onBtnShopClick = function onBtnShopClick() {
          uiManager.instance.showDialog('shop/shop');
        };

        _proto.checkSignInRedDot = function checkSignInRedDot() {
          var _this4 = this;

          playerData.instance.updateSignInCurrentDay(); //更新最新的可领取日期

          GameLogic.instance.getOpenRewardType(constants.SHARE_FUNCTION.FILL_SIGN, function (err, type) {
            if (!err) {
              switch (type) {
                case constants.OPEN_REWARD_TYPE.AD:
                  _this4.ndSignRedDot.active = !playerData.instance.getSignInReceivedInfo().isAllReceived;
                  break;

                case constants.OPEN_REWARD_TYPE.SHARE:
                  _this4.ndSignRedDot.active = !playerData.instance.getSignInReceivedInfo().isAllReceived;
                  break;

                case constants.OPEN_REWARD_TYPE.NULL:
                  _this4.ndSignRedDot.active = !playerData.instance.getSignInReceivedInfo().isTodayReceived;
                  break;
              }
            }
          });
        };

        _proto.checkShopRedDot = function checkShopRedDot() {
          if (!playerData.instance.playerInfo.hasOwnProperty('shopPropInfo')) {
            playerData.instance.resetShopPropInfo();
            playerData.instance.updateShopPropInfo(false); //第一次设置为可以领取
          }

          this.ndShopRedDot.active = playerData.instance.playerInfo.shopPropInfo['receiveStatus'] === constants.REWARD_STATUS.RECEIVABLE;
        };

        _proto.onBtnDebugClick = function onBtnDebugClick() {
          if (!this.debugIdx) {
            this.debugIdx = 0;
          }

          var MAX_TIMES = 8;
          this.debugIdx++;

          if (this.debugIdx > MAX_TIMES) {
            uiManager.instance.showDialog('debug/password', []);
          } else if (!this.debugTimer) {
            var _this = this;

            this.debugTimer = setTimeout(function () {
              _this.debugTimer = null;

              if (_this.debugIdx < MAX_TIMES) {
                _this.debugIdx = 0;
              }
            }, 3000);
          }
        };

        return PveUI;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "multiScrollView", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "settingNode", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "introductionNode", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ndLotteryBtn", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "ndLotteryTips", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "lbLotterySpareTimes", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "sfBlueDot", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "sfRedDot", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "lbGold", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "ndSignRedDot", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "ndShopRedDot", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/stopPropagation.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _inheritsLoose;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _inheritsLoose = module.inheritsLoose;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "628d0zbx11LV4NaSW232uP9", "stopPropagation", undefined);

      var ccclass = _decorator.ccclass;
      var StopPropagation = exports('StopPropagation', (_dec = ccclass('StopPropagation'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(StopPropagation, _Component);

        function StopPropagation() {
          return _Component.apply(this, arguments) || this;
        }

        var _proto = StopPropagation.prototype;

        _proto.onLoad = function onLoad() {};

        _proto.onEnable = function onEnable() {
          this.node.on('touchstart', function (event) {
            event.stopPropagation();
          });
          this.node.on('touchend', function (event) {
            event.stopPropagation();
          });
          this.node.on('touchmove', function (event) {
            event.stopPropagation();
          });
          this.node.on('touchcancel', function (event) {
            event.stopPropagation();
          });
          this.node.on('mousedown', function (event) {
            event.stopPropagation();
          });
          this.node.on('mouseenter', function (event) {
            event.stopPropagation();
          });
          this.node.on('mousemove', function (event) {
            event.stopPropagation();
          });
          this.node.on('mouseleave', function (event) {
            event.stopPropagation();
          });
          this.node.on('mouseup', function (event) {
            event.stopPropagation();
          });
          this.node.on('mousewheel', function (event) {
            event.stopPropagation();
          });
        };

        _proto.onDisable = function onDisable() {
          this.node.off('touchstart', function (event) {
            event.stopPropagation();
          });
          this.node.off('touchend', function (event) {
            event.stopPropagation();
          });
          this.node.off('touchmove', function (event) {
            event.stopPropagation();
          });
          this.node.off('touchcancel', function (event) {
            event.stopPropagation();
          });
          this.node.off('mousedown', function (event) {
            event.stopPropagation();
          });
          this.node.off('mouseenter', function (event) {
            event.stopPropagation();
          });
          this.node.off('mousemove', function (event) {
            event.stopPropagation();
          });
          this.node.off('mouseleave', function (event) {
            event.stopPropagation();
          });
          this.node.off('mouseup', function (event) {
            event.stopPropagation();
          });
          this.node.off('mousewheel', function (event) {
            event.stopPropagation();
          });
        };

        return StopPropagation;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/gameLogic.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './constants.ts', './clientEvent.ts', './sceneManager.ts', './playerData.ts', './uiManager.ts', './AdmobHelper.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, _defineProperty, _applyDecoratedDescriptor, _createClass, _initializerDefineProperty, constants, clientEvent, SceneManager, playerData, uiManager, AdmobHelper;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      _defineProperty = module.defineProperty;
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _createClass = module.createClass;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      SceneManager = module.SceneManager;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      AdmobHelper = module.AdmobHelper;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _class3, _temp;

      cclegacy._RF.push({}, "72a86eT/GZB8K0okUbOBKut", "gameLogic", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var GameLogic = exports('GameLogic', (_dec = ccclass('GameLogic'), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function () {
        function GameLogic() {
          _initializerDefineProperty(this, "isConnect", _descriptor, this);

          _defineProperty(this, "channel", void 0);

          _defineProperty(this, "timer", void 0);
        }

        var _proto = GameLogic.prototype;

        _proto.onAppShow = function onAppShow(res) {
          console.log('onAppShow', res);

          if (res.scene === 1037 && res.query) {
            var paramStr = 'game_id';

            if (res.query.hasOwnProperty(paramStr)) {
              var gameId = res.query[paramStr];
              this.channel = gameId;

              if (gameId) {
                this.customEventStatistics(constants.ANALYTICS_TYPE.CHANNEL, {
                  channel: gameId
                });
              }
            }
          } else if (res.scene === 1044) {
            this.channel = 'share';
          } else if (res.scene) {
            this.channel = res.scene + '';
          }
        };

        _proto.afterLogin = function afterLogin() {
          var _this = this;

          this.startTick();
          setTimeout(function () {
            if (playerData.instance.isOpenOffLineReward(constants.OFFLINE_REWARD * 60 * 1000)) {
              uiManager.instance.showDialog('pve/offLineReward', [{
                itemType: constants.REWARD_TYPE.GOLD,
                itemAmount: 500,
                itemSubType: 0
              }]);
            }

            _this.convertSignInDataFormat();

            if (!playerData.instance.isNewBee) {
              _this.checkSignIn();
            }
          }, 1000);
        };

        _proto.startTick = function startTick() {
          if (this.timer) {
            clearInterval(this.timer);
          }

          this.timer = setInterval(this.onTick.bind(this), 1000);
        };

        _proto.onTick = function onTick() {
          if (SceneManager.instance.isStop) {
            return;
          }

          var onlineRewardInfo = playerData.instance.getOnlineRewardInfo();

          if (onlineRewardInfo['value'].receiveStatus === constants.REWARD_STATUS.UNRECEIVABLE) {
            this.addUsedTime();
          }

          this.checkShopPropInfo();
        };

        _proto.checkShopPropInfo = function checkShopPropInfo() {
          if (!playerData.instance.playerInfo.hasOwnProperty('shopPropInfo')) {
            playerData.instance.resetShopPropInfo();
            playerData.instance.updateShopPropInfo(false); //第一次设置为可以领取
          } else {
            var shopPropInfo = playerData.instance.playerInfo.shopPropInfo;
            var shopCreateDate = shopPropInfo['createDate'];
            var shopReceiveStatus = shopPropInfo['receiveStatus'];
            var isReceived = shopPropInfo['isReceived'];
            var isTimeOut = Date.now() - shopCreateDate >= constants.SHOP_COUNTDOWN_HOURS * 3600000;

            if (isTimeOut && shopReceiveStatus !== constants.REWARD_STATUS.RECEIVABLE) {
              playerData.instance.updateShopPropInfo(false);
              clientEvent.dispatchEvent('updateShopPropInfo');
            }
          }
        };

        _proto.checkSignIn = function checkSignIn() {
          playerData.instance.updateSignInCurrentDay();

          if (!playerData.instance.getSignInReceivedInfo().isTodayReceived) {
            //如果今天还没签到则弹出
            uiManager.instance.showDialog('signIn/signIn');
          }
        };

        _proto.addUsedTime = function addUsedTime() {
          var usedTime = playerData.instance.getOnlineRewardInfo()['usedTime'];
          var spareTime = playerData.instance.getCountdownTime() * 60 * 1000 - usedTime * 1000;

          if (spareTime <= 0) {
            playerData.instance.updateOnlineRewardInfo(false); //显示可领取按钮
          }

          playerData.instance.addUsedTime();
        };

        _proto.convertSignInDataFormat = function convertSignInDataFormat() {
          if (playerData.instance.playerInfo.hasOwnProperty('signInInfo') && playerData.instance.playerInfo['signInInfo'].hasOwnProperty('value')) {
            playerData.instance.convertSignInDataFormat(playerData.instance.playerInfo['signInInfo']);
          }
        };

        _proto.finishLink = function finishLink(cake, value) {
          playerData.instance.finishLink(cake, value);
          clientEvent.dispatchEvent('updateTargets', cake);
          clientEvent.dispatchEvent('updateStep');
        };

        _proto.checkGame = function checkGame() {
          if (playerData.instance.isLevelFinish()) {
            clientEvent.dispatchEvent('levelFinished');
            return;
          }

          if (playerData.instance.isGameOver()) {
            clientEvent.dispatchEvent('gameOver');
            return;
          }
        };

        _proto.resetLevel = function resetLevel() {
          playerData.instance.startNewLevel();
          clientEvent.dispatchEvent('newLevel');
        };

        _proto.showRewardAd = function showRewardAd(callback) {
          AdmobHelper.instance.showAdReards(callback); // callback && callback(null);
        };

        _proto.showInterStitialAd = function showInterStitialAd(callback) {
          callback(null);
        };

        _proto.share = function share(funStr, objQuery, callback, isShowConfirmAfterFailed) {
          callback();
        };

        _proto.addDiamond = function addDiamond(num) {
          playerData.instance.addDiamond(num);
          clientEvent.dispatchEvent('updateDiamond');
        };

        _proto.addGold = function addGold(num) {
          playerData.instance.addGold(num);
          clientEvent.dispatchEvent('updateGold');
        };

        _proto.addProp = function addProp(propId, num) {
          playerData.instance.addProp(propId, num);
          clientEvent.dispatchEvent('updateProp', propId);
        };

        _proto.getOpenRewardType = function getOpenRewardType(funStr, callback) {
          // callback(null, constants.OPEN_REWARD_TYPE.NULL);
          callback(null, constants.OPEN_REWARD_TYPE.AD);
        };

        _proto.customEventStatistics = function customEventStatistics(eventType, objParams) {};

        _proto.requestWithPost = function requestWithPost(url, data, callback) {
          var xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              if (xhr.status >= 200 && xhr.status < 400) {
                var dataObj = xhr.responseText;

                try {
                  dataObj = JSON.parse(xhr.responseText);
                } catch (exception) {
                  console.error(xhr.responseText);
                }

                callback(null, dataObj);
              } else {
                callback('failed', xhr.status);
              }
            }
          };

          xhr.open("POST", url, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(data));
        };

        _createClass(GameLogic, null, [{
          key: "instance",
          get: function get() {
            if (this._instance) {
              return this._instance;
            }

            this._instance = new GameLogic();
            return this._instance;
          }
        }]);

        return GameLogic;
      }(), _defineProperty(_class3, "_instance", void 0), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "isConnect", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/resourceUtil.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, _decorator, resources, error, Prefab, SpriteFrame, Texture2D, instantiate, find, isValid, Sprite;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      resources = module.resources;
      error = module.error;
      Prefab = module.Prefab;
      SpriteFrame = module.SpriteFrame;
      Texture2D = module.Texture2D;
      instantiate = module.instantiate;
      find = module.find;
      isValid = module.isValid;
      Sprite = module.Sprite;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "7844e1bOwZK+7JMYjENQU5v", "resourceUtil", undefined);

      var ccclass = _decorator.ccclass;
      var resourceUtil = exports('resourceUtil', (_dec = ccclass("resourceUtil"), _dec(_class = /*#__PURE__*/function () {
        function resourceUtil() {}
        /**
        * 加载资源
        * @param url   资源路径
        * @param type  资源类型
        * @param cb    回调
        * @method loadRes
        */


        resourceUtil.loadRes = function loadRes(url, type, cb) {
          if (cb === void 0) {
            cb = function cb() {};
          }

          resources.load(url, function (err, res) {
            if (err) {
              error(err.message || err);
              cb(err, res);
              return;
            }

            cb && cb(null, res);
          });
        }
        /**
         * 获取特效prefab
         * @param modulePath 路径
         * @returns 
         */
        ;

        resourceUtil.loadEffectRes = function loadEffectRes(modulePath) {
          var _this = this;

          return new Promise(function (resolve, reject) {
            _this.loadRes("prefab/effect/" + modulePath, Prefab, function (err, prefab) {
              if (err) {
                console.error('effect load failed', modulePath);
                reject && reject();
                return;
              }

              resolve && resolve(prefab);
            });
          });
        }
        /**
         * 获取模型数据
         * @param modulePath 模型路径
         * @returns 
         */
        ;

        resourceUtil.loadModelRes = function loadModelRes(modulePath) {
          var _this2 = this;

          return new Promise(function (resolve, reject) {
            _this2.loadRes("prefab/model/" + modulePath, Prefab, function (err, prefab) {
              if (err) {
                console.error("model load failed", modulePath);
                reject && reject();
                return;
              }

              resolve && resolve(prefab);
            });
          });
        }
        /**
         * 获取多模型数据
         * @param path 资源路径
         * @param arrName 资源名称
         * @param progressCb 过程回调函数
         * @param completeCb 完成回调函数
         */
        ;

        resourceUtil.loadModelResArr = function loadModelResArr(path, arrName, progressCb, completeCb) {
          var arrUrls = arrName.map(function (item) {
            return path + "/" + item;
          });
          resources.load(arrUrls, Prefab, progressCb, completeCb);
        }
        /**
         * 获取贴图资源
         * @param path 贴图路径
         * @returns 
         */
        ;

        resourceUtil.loadSpriteFrameRes = function loadSpriteFrameRes(path) {
          var _this3 = this;

          return new Promise(function (resolve, reject) {
            _this3.loadRes(path, SpriteFrame, function (err, img) {
              if (err) {
                console.error('spriteFrame load failed!', path, err);
                reject && reject();
                return;
              }

              var texture = new Texture2D();
              texture.image = img;
              var sf = new SpriteFrame();
              sf.texture = texture;
              resolve && resolve(sf);
            });
          });
        }
        /**
         * 获取关卡数据
         * @param level 关卡
         * @param cb 回调函数
         */
        ;

        resourceUtil.getMap = function getMap(level, cb) {
          var levelStr = 'map'; //前面补0

          if (level >= 100) {
            levelStr += level;
          } else if (level >= 10) {
            levelStr += '0' + level;
          } else {
            levelStr += '00' + level;
          }

          this.loadRes("map/config/" + levelStr, null, function (err, txtAsset) {
            if (err) {
              cb(err, txtAsset);
              return;
            }

            var content = '';

            if (txtAsset._file) {
              //@ts-ignore
              if (window['LZString']) {
                //@ts-ignore
                content = window['LZString'].decompressFromEncodedURIComponent(txtAsset._file);
              }

              var objJson = JSON.parse(content);
              cb(null, objJson);
            } else if (txtAsset.text) {
              //@ts-ignore
              if (window['LZString']) {
                //@ts-ignore
                content = window['LZString'].decompressFromEncodedURIComponent(txtAsset.text);
              }

              var objJson = JSON.parse(content);
              cb(null, objJson);
            } else if (txtAsset.json) {
              cb(null, txtAsset.json);
            } else {
              cb('failed');
            }
          });
        }
        /**
         * 获取关卡数据
         * @param type 关卡类型
         * @param arrName 资源名称
         * @param progressCb 过程回调函数
         * @param completeCb 完成回调函数
         */
        ;

        resourceUtil.getMapObj = function getMapObj(type, arrName, progressCb, completeCb) {
          var arrUrls = [];

          for (var idx = 0; idx < arrName.length; idx++) {
            arrUrls.push("map/" + type + "/" + arrName[idx]);
          }

          resources.load(arrUrls, Prefab, progressCb, completeCb);
        }
        /**
         * 获取UI prefab
         * @param prefabPath prefab路径 
         * @param cb 回调函数
         */
        ;

        resourceUtil.getUIPrefabRes = function getUIPrefabRes(prefabPath, cb) {
          this.loadRes("prefab/ui/" + prefabPath, Prefab, cb);
        }
        /**
         * 创建ui界面
         * @param path ui路径
         * @param cb 回调函数
         * @param parent 父节点
         */
        ;

        resourceUtil.createUI = function createUI(path, cb, parent) {
          this.getUIPrefabRes(path, function (err, prefab) {
            if (err) return;
            var node = instantiate(prefab);
            node.setPosition(0, 0, 0);

            if (!parent) {
              parent = find("Canvas");
            }

            parent.addChild(node);
            cb && cb(null, node);
          });
        }
        /**
         * 获取json数据
         * @param fileName 文件名
         * @param cb 回调函数 
         */
        ;

        resourceUtil.getJsonData = function getJsonData(fileName, cb) {
          this.loadRes("datas/" + fileName, null, function (err, content) {
            if (err) {
              error(err.message || err);
              return;
            }

            if (content.json) {
              cb(err, content.json);
            } else {
              cb('failed!!!');
            }
          });
        }
        /**
         * 获取文本数据
         * @param fileName 文件名
         * @param cb  回调函数
         */
        ;

        resourceUtil.getTextData = function getTextData(fileName, cb) {
          this.loadRes("datas/" + fileName, null, function (err, content) {
            if (err) {
              error(err.message || err);
              return;
            }

            var text = content.text;
            cb(err, text);
          });
        }
        /**
         * 设置精灵贴图
         * @param path 资源路径
         * @param sprite 精灵
         * @param cb 回调函数
         */
        ;

        resourceUtil.setSpriteFrame = function setSpriteFrame(path, sprite, cb) {
          this.loadRes(path + '/spriteFrame', SpriteFrame, function (err, spriteFrame) {
            if (err) {
              console.error('set sprite frame failed! err:', path, err);
              cb(err);
              return;
            }

            if (sprite && isValid(sprite)) {
              sprite.spriteFrame = spriteFrame;
              cb(null);
            }
          });
        }
        /**
         * 设置道具图标
         *
         * @param {number} prop
         * @param {cc.Sprite} sprite
         * @param {fn} cb
         */
        ;

        resourceUtil.setPropIcon = function setPropIcon(prop, sprite, cb) {
          this.setSpriteFrame('gamePackages/textures/icons/props/' + prop, sprite, cb);
        }
        /**
         * sprite置灰或者复原
         *
         * @param {object} node
         * @param {boolean} flag
         */
        ;

        resourceUtil.setGray = function setGray(node, flag) {
          var sprites = node.getComponentsInChildren(Sprite);

          for (var i = 0; i < sprites.length; ++i) {
            var sprite = sprites[i];

            if (flag) {
              sprite.grayscale = true; // sprite.state(Sprite.BlendState.//GRAY);
            } else {
              sprite.grayscale = false; // sprite.setState(Sprite.BlendState.);
            }
          }
        }
        /**
         * 根据英雄的文件名获取头像
         */
        ;

        resourceUtil.setAvatar = function setAvatar(avatarUrl, sprite, cb) {
          return; // if (!avatarUrl || !avatarUrl.startsWith('http')) {
          //     return;
          // }
          // var suffix = "png";
          // loader.load({ url: avatarUrl, type: suffix }, function (err: any, tex: any) {
          //     if (err) {
          //         console.error('set avatar failed! err:', avatarUrl, err);
          //         cb(err);
          //         return;
          //     }
          //     var spriteFrame = new SpriteFrame(tex, Rect(0, 0, tex.width, tex.height));
          //     if (sprite && isValid(sprite)) {
          //         sprite.spriteFrame = spriteFrame;
          //         cb(null);
          //     }
          // });
        }
        /**
         * 设置蛋糕图片
         * @param {string} cake 蛋糕图片名称
         * @param {cc.Sprite} sprite  
         * @param {function} cb 回调函数
         */
        ;

        resourceUtil.setCakeIcon = function setCakeIcon(cake, sprite, cb) {
          this.setSpriteFrame('gamePackages/textures/icons/cakes/' + cake, sprite, cb);
        };

        resourceUtil.createEffect = function createEffect(path, cb, parent) {
          this.loadRes("/gamePackages/effects/" + path, Prefab, function (err, prefab) {
            if (err) {
              cb('err', null);
              return;
            }

            var node = instantiate(prefab);

            if (!parent) {
              parent = find("Canvas");
            }

            parent.addChild(node);
            cb(null, node);
          });
        };

        resourceUtil.getEffectPrefab = function getEffectPrefab(path, callback) {
          this.loadRes("gamePackages/effects/" + path, Prefab, callback);
        };

        return resourceUtil;
      }()) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/loginScene.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './constants.ts', './clientEvent.ts', './storageManager.ts', './localConfig.ts', './sceneManager.ts', './playerData.ts', './uiManager.ts', './audioManager.ts', './LanguageData.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, profiler, game, Game, director, Component, _inheritsLoose, _defineProperty, _assertThisInitialized, constants, clientEvent, StorageManager, localConfig, SceneManager, playerData, uiManager, AudioManager, _init, t, GameLogic;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      profiler = module.profiler;
      game = module.game;
      Game = module.Game;
      director = module.director;
      Component = module.Component;
    }, function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      StorageManager = module.StorageManager;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      SceneManager = module.SceneManager;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      _init = module.init;
      t = module.t;
    }, function (module) {
      GameLogic = module.GameLogic;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "78951xH1B5FbIWkKgRGXo5v", "loginScene", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var LoginScene = exports('LoginScene', (_dec = ccclass('LoginScene'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LoginScene, _Component);

        function LoginScene() {
          var _this2;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this2 = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this2), "currentStep", null);

          _defineProperty(_assertThisInitialized(_this2), "isLoadCsvFinishd", false);

          return _this2;
        }

        var _proto = LoginScene.prototype;

        _proto.onLoad = function onLoad() {
          var _this3 = this; // i18n.init('zh');


          _init('en');

          profiler.hideStats(); //初始化音频

          AudioManager.instance.init();
          AudioManager.instance.playMusic(constants.AUDIO_MUSIC.BACKGROUND, true); //初始化玩家数据

          playerData.instance.loadGlobalCache();

          if (!playerData.instance.userId) {
            playerData.instance.generateRandomAccount();
            console.log("$$$==>> Generate Random userId", playerData.instance.userId);
          }

          playerData.instance.loadFromCache();

          if (!playerData.instance.playerInfo || !playerData.instance.playerInfo.createDate) {
            playerData.instance.createPlayerInfo();
          } //记录离线时间


          game.on(Game.EVENT_HIDE, function () {
            if (!playerData.instance.settings) {
              playerData.instance.settings = {};
            }

            playerData.instance.settings.hideTime = Date.now();
            playerData.instance.saveAll();
            StorageManager.instance.save();
          }); //加载CSV相关配置

          localConfig.instance.loadConfig(function () {
            _this3.isLoadCsvFinishd = true;
          });
        };

        _proto.showLoadingUI = function showLoadingUI() {
          var _this = this;

          this.currentStep = 0;

          var loginTimeOut = function loginTimeOut() {
            uiManager.instance.showTips(t("login/timeout"), function () {
              _this.showLoadingUI();
            });
          };

          this.scheduleOnce(loginTimeOut, 30);
          uiManager.instance.showDialog('common/loading');
          SceneManager.instance.load([function (cb) {
            _this.currentStep = 1;

            _this.loadSubPackage(cb);
          }, function (cb) {
            _this.currentStep = 2;

            _this.loadGameSubPackage(cb);
          }, function (cb) {
            _this.currentStep = 3;

            _this.unschedule(loginTimeOut);

            _this.enterMainScene(cb);
          }], function (err, result) {
            if (err) {
              console.error(err.message || err);
              return;
            }
          });
        };

        _proto.loadSubPackage = function loadSubPackage(cb) {
          cb();
        };

        _proto.loadGameSubPackage = function loadGameSubPackage(cb) {
          cb();
        };

        _proto.enterMainScene = function enterMainScene(cb) {
          var _this = this;

          var targetScene = playerData.instance.isNewBee ? 'fight' : 'pve';

          var onSceneLoaded = function onSceneLoaded() {
            _this.currentStep = 4;
            cb();
            director.preloadScene(targetScene, function () {
              director.loadScene(targetScene, function () {
                _this.currentStep = 5;
                clientEvent.dispatchEvent("onSceneChanged");
                GameLogic.instance.afterLogin();
              });
            });
          };

          director.preloadScene(targetScene, onSceneLoaded);
        };

        _proto.onBtnVisitorLoginClick = function onBtnVisitorLoginClick() {
          if (!this.isLoadCsvFinishd) return;
          this.showLoadingUI();
        };

        return LoginScene;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/adStepItem.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "7bc1e52TulKuq/projnBb/o", "adStepItem", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AdStepItem = exports('AdStepItem', (_dec = ccclass('AdStepItem'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AdStepItem, _Component);

        function AdStepItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "spPropIcon", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbPropNum", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndFinishedIcon", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "cakeInfo", void 0);

          return _this;
        }

        var _proto = AdStepItem.prototype;

        _proto.setInfo = function setInfo(cakeInfo) {
          this.cakeInfo = cakeInfo;
          resourceUtil.setCakeIcon(cakeInfo.name, this.spPropIcon, function () {});
          this.lbPropNum.string = cakeInfo.num ? cakeInfo.num : '';
          this.ndFinishedIcon.active = !cakeInfo.num;

          if (cakeInfo.num > 0) {
            this.spPropIcon.grayscale = false;
          } else {
            this.spPropIcon.grayscale = true;
          }
        };

        return AdStepItem;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spPropIcon", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbPropNum", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ndFinishedIcon", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/offLineReward.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './constants.ts', './localConfig.ts', './uiManager.ts', './LanguageData.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Animation, UITransform, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil, constants, localConfig, uiManager, t, GameLogic;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      UITransform = module.UITransform;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      t = module.t;
    }, function (module) {
      GameLogic = module.GameLogic;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _temp;

      cclegacy._RF.push({}, "7bf14l0xJZIx6dTAV7YPTWD", "offLineReward", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var OffLineReward = exports('OffLineReward', (_dec = ccclass('OffLineReward'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(OffLineReward, _Component);

        function OffLineReward() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "sfDiamond", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfGold", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spIcon", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbRewardValue", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "aniGetItem", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndThreeReceive", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndNormalReceive", _descriptor7, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "itemInfo", void 0);

          _defineProperty(_assertThisInitialized(_this), "rewardType", void 0);

          _defineProperty(_assertThisInitialized(_this), "itemType", void 0);

          _defineProperty(_assertThisInitialized(_this), "itemAmount", void 0);

          _defineProperty(_assertThisInitialized(_this), "itemSubType", void 0);

          return _this;
        }

        var _proto = OffLineReward.prototype;

        _proto.show = function show(itemInfo) {
          var _this2 = this;

          this.itemInfo = itemInfo;
          this.itemType = itemInfo["itemType"];
          this.itemAmount = itemInfo["itemAmount"];
          this.itemSubType = itemInfo["itemSubType"];
          this.aniGetItem.play('getItemShow');
          this.aniGetItem.once(Animation.EventType.FINISHED, function () {
            _this2.aniGetItem.play('getItemIdle');
          }, this);
          this.showUI();
          this.ndNormalReceive.active = false;
          this.scheduleOnce(function () {
            _this2.ndNormalReceive.active = true;
          }, constants.NORMAL_SHOW_TIME);
        };

        _proto.showUI = function showUI() {
          var _this3 = this;

          var uiTraSpIcon = this.spIcon.getComponent(UITransform);

          switch (this.itemType) {
            case constants.REWARD_TYPE.DIAMOND:
              this.spIcon.spriteFrame = this.sfDiamond;
              this.lbRewardValue.string = 'x' + this.itemAmount;
              break;

            case constants.REWARD_TYPE.GOLD:
              this.spIcon.spriteFrame = this.sfGold;
              this.lbRewardValue.string = 'x' + this.itemAmount;
              uiTraSpIcon.width = 257;
              uiTraSpIcon.height = 166;
              break;

            case constants.REWARD_TYPE.PROP:
              var propId = "00" + this.itemSubType;
              var propData = localConfig.instance.queryByID('prop', propId + '');
              uiTraSpIcon.width = 168;
              uiTraSpIcon.height = 168;
              resourceUtil.setPropIcon(propId, this.spIcon, function () {});
              var txt = t('table_prop.' + propData.name);
              this.lbRewardValue.string = txt + t('') + ' x ' + this.itemAmount;
              break;
          }

          GameLogic.instance.getOpenRewardType(constants.SHARE_FUNCTION.OFFLINE, function (err, type) {
            _this3.rewardType = type;

            if (!err) {
              _this3.ndThreeReceive.active = type !== constants.OPEN_REWARD_TYPE.NULL;
            } else {
              _this3.close();
            }
          });
        };

        _proto.showAd = function showAd() {
          var _this4 = this;

          GameLogic.instance.showRewardAd(function (err) {
            if (!err) {
              _this4.showReward();
            }
          });
        };

        _proto.showShare = function showShare() {
          var _this5 = this;

          GameLogic.instance.share(constants.SHARE_FUNCTION.OFFLINE, {}, function (err) {
            if (!err) {
              _this5.showReward();
            }
          });
        };

        _proto.onBtnThreeReceiveClick = function onBtnThreeReceiveClick() {
          if (this.rewardType === constants.OPEN_REWARD_TYPE.AD) {
            this.showAd();
          } else if (this.rewardType === constants.OPEN_REWARD_TYPE.SHARE) {
            this.showShare();
          }
        };

        _proto.showReward = function showReward() {
          uiManager.instance.showDialog('lottery/reward', [{
            itemType: constants.REWARD_TYPE.GOLD,
            itemAmount: this.itemAmount * 3,
            itemSubType: 0
          }, false, constants.SHARE_FUNCTION.OFFLINE]);
          this.close();
        };

        _proto.onBtnNormalClick = function onBtnNormalClick() {
          GameLogic.instance.addGold(this.itemAmount);
          this.close();
        };

        _proto.close = function close() {
          uiManager.instance.shiftFromPopupSeq('pve/offLineReward');
        };

        return OffLineReward;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sfDiamond", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sfGold", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbRewardValue", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "aniGetItem", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "ndThreeReceive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "ndNormalReceive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/loading.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "7c72f8OVs9Jgr00M87vUcnZ", "loading", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Loading = exports('Loading', (_dec = ccclass('Loading'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Loading, _Component);

        function Loading() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "txtTips", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "aniLoading", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Loading.prototype;

        _proto.show = function show(tips) {
          if (tips) {
            this.txtTips.string = tips;
          } else {
            this.txtTips.string = "";
          }
        };

        _proto.onEnable = function onEnable() {
          this.aniLoading.play();
        };

        _proto.onDisable = function onDisable() {
          this.aniLoading.stop();
        };

        return Loading;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "txtTips", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "aniLoading", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/adStep.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './constants.ts', './playerData.ts', './uiManager.ts', './gameLogic.ts', './adStepItem.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, instantiate, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, constants, playerData, uiManager, GameLogic, AdStepItem;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      GameLogic = module.GameLogic;
    }, function (module) {
      AdStepItem = module.AdStepItem;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

      cclegacy._RF.push({}, "85a6dBiKRxKkILjS8dfOBYF", "adStep", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AdStep = exports('AdStep', (_dec = ccclass('AdStep'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AdStep, _Component);

        function AdStep() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "ndContent", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "pbAdStepItem", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "imgAd", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "imgShare", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spBtn", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndBtnPlayAgain", _descriptor6, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "callback", void 0);

          _defineProperty(_assertThisInitialized(_this), "rewardType", void 0);

          return _this;
        }

        var _proto = AdStep.prototype;

        _proto.show = function show(callback) {
          var _this2 = this;

          this.callback = callback;
          GameLogic.instance.getOpenRewardType(constants.SHARE_FUNCTION.LACK_STEP, function (err, type) {
            if (!err) {
              _this2.rewardType = type;

              switch (type) {
                case constants.OPEN_REWARD_TYPE.AD:
                  _this2.spBtn.spriteFrame = _this2.imgAd;
                  break;

                case constants.OPEN_REWARD_TYPE.SHARE:
                  _this2.spBtn.spriteFrame = _this2.imgShare;
                  break;

                case constants.OPEN_REWARD_TYPE.NULL:
                  _this2.onBtnCloseClick(); //不支持奖励


                  break;
              }
            }
          });
          var dictTargets = playerData.instance.dictTargets;
          this.ndContent.removeAllChildren();

          for (var key in dictTargets) {
            var cakeInfo = {
              name: key,
              num: dictTargets[key]
            };
            var node = instantiate(this.pbAdStepItem);
            node.parent = this.ndContent;
            var adStepItemScript = node.getComponent(AdStepItem);
            adStepItemScript.setInfo(cakeInfo);
          }

          this.ndBtnPlayAgain.active = false;
          this.scheduleOnce(function () {
            _this2.ndBtnPlayAgain.active = true;
          }, constants.NORMAL_SHOW_TIME);
        };

        _proto.onBtnCloseClick = function onBtnCloseClick() {
          if (this.callback) {
            this.callback('close');
          }

          this.close();
        };

        _proto.onBtnPlayClick = function onBtnPlayClick() {
          var _this3 = this;

          if (this.rewardType === constants.OPEN_REWARD_TYPE.AD) {
            GameLogic.instance.showRewardAd(function (err) {
              if (!err) {
                _this3.close();

                if (_this3.callback) {
                  _this3.callback(null);
                }
              }
            });
          } else {
            GameLogic.instance.share(constants.SHARE_FUNCTION.START_REWARD, {}, function (err) {
              if (!err) {
                _this3.close();

                if (_this3.callback) {
                  _this3.callback(err);
                }
              }
            });
          }
        };

        _proto.close = function close() {
          uiManager.instance.hideDialog('fight/adStep');
        };

        _proto.onBtnPlayAgain = function onBtnPlayAgain() {
          this.close();
          GameLogic.instance.resetLevel();
        };

        return AdStep;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ndContent", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pbAdStepItem", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "imgAd", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "imgShare", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "spBtn", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnPlayAgain", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/levelPanel.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './constants.ts', './utils.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './LanguageData.ts', './propItem.ts', './targetCake.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, instantiate, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, constants, utils, localConfig, playerData, uiManager, t, PropItem, TargetCake;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      utils = module.utils;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      t = module.t;
    }, function (module) {
      PropItem = module.PropItem;
    }, function (module) {
      TargetCake = module.TargetCake;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

      cclegacy._RF.push({}, "8622524wZFNZK4SKvWm789R", "levelPanel", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var LevelPanel = exports('LevelPanel', (_dec = ccclass('LevelPanel'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LevelPanel, _Component);

        function LevelPanel() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "arrStarList", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbHighScore", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbLevelNum", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "pbPropItem", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "pbTargetCake", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndStartList", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndPropList", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndCakeList", _descriptor8, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "levelInfo", void 0);

          _defineProperty(_assertThisInitialized(_this), "callback", void 0);

          return _this;
        }

        var _proto = LevelPanel.prototype;

        _proto.show = function show(levelInfo, callback) {
          this.levelInfo = levelInfo;
          this.callback = callback;
          this.lbLevelNum.string = levelInfo.name;
          this.lbHighScore.string = t('pve.highest') + " " + playerData.instance.getHighestScoreByLevel(levelInfo.name);
          var arrCake = levelInfo.targets.split("|");
          var arrCakeList = this.ndCakeList.children;

          if (this.ndCakeList.children.length > arrCake.length) {
            for (var j = arrCake.length; j < this.ndCakeList.children.length; j++) {
              this.ndCakeList.children[j].active = false;
            }
          }

          for (var i = 0; i < arrCake.length; i++) {
            var cakeInfo = arrCake[i];
            var node = null;

            if (i < arrCakeList.length) {
              node = arrCakeList[i];
            } else {
              node = instantiate(this.pbTargetCake);
              node.parent = this.ndCakeList;
            }

            node.active = true;
            var targetCakeScript = node.getComponent(TargetCake);
            targetCakeScript.setInfo(cakeInfo);
          }

          var dictProp = localConfig.instance.getTable('prop');
          var arrProp = utils.objectToArray(dictProp);
          var arrPropList = this.ndPropList.children;

          for (var _j = 0; _j < arrProp.length; _j++) {
            var ndProp = null;
            var propInfo = arrProp[_j];

            if (_j < arrPropList.length) {
              ndProp = arrPropList[_j];
            } else {
              ndProp = instantiate(this.pbPropItem);
              ndProp.parent = this.ndPropList;
            }

            var propItemScript = ndProp.getComponent(PropItem);
            propItemScript.setInfo(propInfo);
          }

          var history = playerData.instance.history;

          if (history[this.levelInfo.ID]) {
            var starNum = history[this.levelInfo.ID].star;

            for (var k = 0; k < constants.MAX_GRADE_OF_EACH_PVE_LEVEL; k++) {
              if (k < starNum) {
                this.arrStarList[k].active = true;
              } else {
                this.arrStarList[k].active = false;
              }
            }
          } else {
            this.arrStarList.forEach(function (element) {
              element.active = false;
            });
          }
        };

        _proto.onBtnStartClick = function onBtnStartClick() {
          this.callback();
        };

        _proto.onBtnCloseClick = function onBtnCloseClick() {
          uiManager.instance.hideDialog('pve/levelPanel');
        };

        return LevelPanel;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "arrStarList", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbHighScore", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbLevelNum", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "pbPropItem", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "pbTargetCake", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "ndStartList", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "ndPropList", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ndCakeList", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/signIn.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './constants.ts', './clientEvent.ts', './localConfig.ts', './playerData.ts', './animationUI.ts', './uiManager.ts', './buttonEx.ts', './LanguageData.ts', './gameLogic.ts', './signInItem.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Widget, instantiate, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, constants, clientEvent, localConfig, playerData, AnimationUI, uiManager, ButtonEx, t, GameLogic, SignInItem;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Widget = module.Widget;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      AnimationUI = module.AnimationUI;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      ButtonEx = module.ButtonEx;
    }, function (module) {
      t = module.t;
    }, function (module) {
      GameLogic = module.GameLogic;
    }, function (module) {
      SignInItem = module.SignInItem;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

      cclegacy._RF.push({}, "8885akyBoFF94Jx+V7yERfJ", "signIn", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var MIN_CHILD_COUNT = 1;
      var SignIn = exports('SignIn', (_dec = ccclass('SignIn'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SignIn, _Component);

        function SignIn() {
          var _this2;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this2 = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this2), "prefabItem", _descriptor, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "iconList", _descriptor2, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "ndSeventhItem", _descriptor3, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "ndBtnDoubleReceive", _descriptor4, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "arrDay", _descriptor5, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "ndBtnNormalReceive", _descriptor6, _assertThisInitialized(_this2));

          _defineProperty(_assertThisInitialized(_this2), "currentDay", void 0);

          _defineProperty(_assertThisInitialized(_this2), "arrReceived", void 0);

          _defineProperty(_assertThisInitialized(_this2), "arrAfterFillSignIn", void 0);

          _defineProperty(_assertThisInitialized(_this2), "isTodayReceived", void 0);

          _defineProperty(_assertThisInitialized(_this2), "arrSignInItemScript", void 0);

          _defineProperty(_assertThisInitialized(_this2), "signInItemScript", void 0);

          _defineProperty(_assertThisInitialized(_this2), "openRewardType", void 0);

          return _this2;
        }

        var _proto = SignIn.prototype;

        _proto.onEnable = function onEnable() {
          clientEvent.on('updateSignIn', this.updateSignIn, this);
        };

        _proto.onDisable = function onDisable() {
          clientEvent.off('updateSignIn', this.updateSignIn, this);
        };

        _proto.show = function show() {
          playerData.instance.updateSignInCurrentDay();
          var signInInfo = playerData.instance.playerInfo['signInInfo'];
          console.log('###signInfo', signInInfo);
          this.currentDay = signInInfo['currentDay']; //当前日期

          this.arrReceived = signInInfo['receivedDays']; //已经领取的日期数组

          this.arrAfterFillSignIn = signInInfo['afterFillSignInDays']; //已经补签后可领取的日期数组

          this.showSignInInfo();
          this.ndSeventhItem.setSiblingIndex(constants.ZORDER.TIPS);
          this.updateSignIn();
          this.isTodayReceived = playerData.instance.getSignInReceivedInfo()['isTodayReceived'];
          this.ndBtnNormalReceive.active = false;

          if (this.isTodayReceived) {
            this.scheduleOnce(this.showNormalBtnCallback, 1);
          } else {
            this.scheduleOnce(this.showNormalBtnCallback, constants.NORMAL_SHOW_TIME);
          }
        };

        _proto.updateSignIn = function updateSignIn() {
          this.ndBtnDoubleReceive.getComponent(ButtonEx).interactable = !playerData.instance.getSignInReceivedInfo()['isTodayReceived'];
          console.log('###getSignInReceivedInfo', playerData.instance.getSignInReceivedInfo());
        };

        _proto.showNormalBtnCallback = function showNormalBtnCallback() {
          this.ndBtnNormalReceive.active = true;
          this.node.getComponent(Widget).enabled = true;
          this.ndBtnNormalReceive.getComponent(Widget).enabled = true;
          this.ndBtnNormalReceive.getComponent(Widget).bottom = 205;
          console.log('bottom', this.ndBtnNormalReceive.getComponent(Widget).bottom);
          console.log('enable', this.ndBtnNormalReceive.getComponent(Widget).enabled);
        };

        _proto.showSignInInfo = function showSignInInfo() {
          var tbSignIn = localConfig.instance.getTable("signIn");

          var _this = this;

          this.arrSignInItemScript = [];

          for (var idx in tbSignIn) {
            var day = tbSignIn[idx].ID;
            var isReceived = this.arrReceived.includes(Number(day)) ? true : false; //从签到数组中判断是否已经领取

            if (day <= this.currentDay) {
              tbSignIn[idx].status = isReceived ? constants.SIGN_REWARD_STATUS.RECEIVED : constants.SIGN_REWARD_STATUS.RECEIVABLE; //状态设置为已领取或者可领取

              if (tbSignIn[idx].status === constants.SIGN_REWARD_STATUS.RECEIVABLE && day < this.currentDay) {
                tbSignIn[idx].status = constants.SIGN_REWARD_STATUS.FILLSIGNIN;

                if (this.arrAfterFillSignIn.includes(day)) {
                  tbSignIn[idx].status = constants.SIGN_REWARD_STATUS.AFTER_FILLSIGNIN;
                }
              }
            } else {
              //不可领取
              tbSignIn[idx].status = constants.SIGN_REWARD_STATUS.UNRECEIVABLE;
            }

            var node = _this.iconList[Number(idx) - 1]; //idx从1开始


            var signInItemNode = null;

            if (node.children.length <= MIN_CHILD_COUNT) {
              signInItemNode = instantiate(_this.prefabItem);
              node.addChild(signInItemNode);
              signInItemNode.setPosition(0, 0);
            } else {
              signInItemNode = node.getChildByName('signInItem');
            }

            this.signInItemScript = signInItemNode.getComponent(SignInItem);
            this.signInItemScript.init(tbSignIn[idx], _this);

            if (!this.arrSignInItemScript.includes(this.signInItemScript)) {
              this.arrSignInItemScript.push(this.signInItemScript);
            }

            var DayLabel = this.arrDay[Number(idx) - 1];
            DayLabel.string = t('sign.day%{value}', {
              value: idx
            });
          }
        };

        _proto.receiveReward = function receiveReward(itemInfo, isDouble, callback) {
          var day = itemInfo["ID"];

          if (this.currentDay < day) {
            //大于可领奖天数点击图标不能领取
            return;
          }

          var isLast = false; //某一天的签到奖励的最后一个弹窗(礼包弹出3个),判断是否需要再次显示签到界面

          var type = itemInfo.rewardType;

          if (type === constants.REWARD_TYPE.GIFT) {
            //如果奖励等于礼包
            var arrGift = playerData.instance.parseGift(itemInfo.subType);

            for (var i = 0; i < arrGift.length; i++) {
              var giftItemInfo = {}; //每个弹窗的数据

              giftItemInfo['ID'] = itemInfo['ID'];
              giftItemInfo['itemType'] = arrGift[i]['type'];
              giftItemInfo['itemSubType'] = arrGift[i]['subType'];
              giftItemInfo['itemAmount'] = isDouble ? Number(arrGift[i]['amount']) * 2 : arrGift[i]['amount'];
              isLast = i === arrGift.length - 1 ? true : false;
              uiManager.instance.pushToPopupSeq('signIn/signInReward', 'signinReward', [giftItemInfo, callback, isLast]);
            }
          } else {
            var normalItemInfo = {};
            normalItemInfo['ID'] = itemInfo['ID'];
            normalItemInfo['itemType'] = itemInfo['rewardType'];
            normalItemInfo['itemSubType'] = itemInfo['subType'];
            normalItemInfo['itemAmount'] = isDouble ? Number(itemInfo['amount']) * 2 : itemInfo['amount'];
            isLast = true;
            uiManager.instance.pushToPopupSeq('signIn/signInReward', 'signinReward', [normalItemInfo, callback, isLast]);
          }

          uiManager.instance.hideDialog('signIn/signIn');
          this.unschedule(this.showNormalBtnCallback);
        };

        _proto.receiveClick = function receiveClick(isDouble) {
          var _this3 = this;

          var _loop = function _loop(j) {
            var element = _this3.arrSignInItemScript[j];

            if (element.itemInfo["status"] === constants.SIGN_REWARD_STATUS.RECEIVABLE) {
              element._parent.receiveReward(element.itemInfo, isDouble, function () {
                element.markReceived();
              });

              return "break";
            }
          };

          for (var j = 0; j < this.arrSignInItemScript.length; j++) {
            var _ret = _loop(j);

            if (_ret === "break") break;
          }
        };

        _proto.onBtnDoubleReceiveClick = function onBtnDoubleReceiveClick() {
          var _this4 = this;

          GameLogic.instance.getOpenRewardType(constants.SHARE_FUNCTION.SIGN, function (err, type) {
            if (!err) {
              _this4.openRewardType = type;

              switch (type) {
                case constants.OPEN_REWARD_TYPE.AD:
                  _this4.showAd();

                  break;

                case constants.OPEN_REWARD_TYPE.SHARE:
                  _this4.showShare();

                  break;

                case constants.OPEN_REWARD_TYPE.NULL:
                  _this4.receiveClick(false);

                  break;
              }
            } else {
              _this4.node.getComponent(AnimationUI).close();
            }
          });
        };

        _proto.showAd = function showAd() {
          var _this5 = this;

          GameLogic.instance.showRewardAd(function (err) {
            if (!err) {
              _this5.receiveClick(true);
            }
          });
        };

        _proto.showShare = function showShare() {
          var _this6 = this;

          GameLogic.instance.share(constants.SHARE_FUNCTION.SIGN, {}, function (err) {
            if (!err) {
              _this6.receiveClick(true);
            }
          });
        };

        _proto.onBtnNormalReceiveClick = function onBtnNormalReceiveClick() {
          this.onBtnCloseClick();
        };

        _proto.onBtnCloseClick = function onBtnCloseClick() {
          uiManager.instance.hideDialog('signIn/signIn');
          uiManager.instance.hideDialog('signIn/signInReward');
          this.unschedule(this.showNormalBtnCallback);
        };

        return SignIn;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefabItem", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "iconList", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ndSeventhItem", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnDoubleReceive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "arrDay", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnNormalReceive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/effectGroup.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './poolManager.ts', './resourceUtil.ts', './constants.ts', './clientEvent.ts', './audioManager.ts', './fightNum.ts', './showTargetCake.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, UITransform, Animation, TweenSystem, tween, Vec3, Prefab, Label, instantiate, Sprite, Component, _inheritsLoose, _defineProperty, _assertThisInitialized, poolManager, resourceUtil, constants, clientEvent, AudioManager, FightNum, ShowTargetCake;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UITransform = module.UITransform;
      Animation = module.Animation;
      TweenSystem = module.TweenSystem;
      tween = module.tween;
      Vec3 = module.Vec3;
      Prefab = module.Prefab;
      Label = module.Label;
      instantiate = module.instantiate;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      poolManager = module.poolManager;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      FightNum = module.FightNum;
    }, function (module) {
      ShowTargetCake = module.ShowTargetCake;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "97452hq2+JOY4wRZ0jvZvzu", "effectGroup", undefined);

      var ccclass = _decorator.ccclass;
      var EffectGroup = exports('EffectGroup', (_dec = ccclass('EffectGroup'), _dec(_class = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(EffectGroup, _Component);

        function EffectGroup() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "_fightScene", void 0);

          return _this;
        }

        var _proto = EffectGroup.prototype;

        _proto.show = function show(fightScene) {
          this._fightScene = fightScene;
        };

        _proto.showStarFlyEffect = function showStarFlyEffect(srcWorldPos, effectType, callback, target) {
          var _this2 = this;

          var uiTra = this.node.getComponent(UITransform);
          var srcPos = uiTra.convertToNodeSpaceAR(srcWorldPos);
          resourceUtil.getEffectPrefab('fight/linkStar/linkStar', function (err, prefab) {
            if (err) {
              callback.apply(target, [err]);
              return;
            }

            var effectNode = poolManager.instance.getNode(prefab, _this2.node);
            effectNode.position = srcPos;
            var ani = effectNode.getComponent(Animation);
            ani.once(Animation.EventType.FINISHED, function () {
              var targetIndex = _this2._fightScene.linkContent.getNoEffectLinkItemIndex();

              if (targetIndex) {
                _this2._fightScene.linkContent.markLinkItemEffect(targetIndex, effectType);

                var targetWorldPos = _this2._fightScene.linkContent.getItemWorldPosByIndex(targetIndex);

                var targetPos = uiTra.convertToNodeSpaceAR(targetWorldPos);
                AudioManager.instance.playSound(constants.AUDIO_SOUND.FLY_STAR, false); // effectNode.stopActionByTag(TAG_STAR_MOVE_ACTION);

                TweenSystem.instance.ActionManager.removeAllActionsFromTarget(effectNode);
                var duration = targetPos.clone().subtract(srcPos).length() / 1200;
                tween(effectNode).to(duration, {
                  position: targetPos
                }, {
                  easing: 'backIn'
                }).call(function () {
                  var ani = effectNode.getComponent(Animation);
                  ani.once(Animation.EventType.FINISHED, function () {
                    poolManager.instance.putNode(effectNode);
                  });
                  ani.play('linkStarOver');
                  callback.apply(target, [null, targetIndex, effectType]);
                }).start(); // let moveAction = cc.moveTo(duration, targetPos).easing(cc.easeIn(1.0));
                // let seqAction = cc.sequence(moveAction, cc.callFunc((node) => {
                //     let ani = node.getComponent(Animation);
                //     ani.once(Animation.EventType.FINISHED, () => {
                //         poolManager.instance.putNode(node);
                //     });
                //     ani.play('linkStarOver');
                //     callback.apply(target, [null, targetIndex, effectType]);
                // }, this));
                // seqAction.setTag(TAG_STAR_MOVE_ACTION);
                // effectNode.runAction(seqAction);
              } else {
                poolManager.instance.putNode(effectNode);
                callback.apply(target, ['error']);
                return;
              }
            });
            ani.play('linkStarFly');
          });
        };

        _proto.showStarAfterLevelFinished = function showStarAfterLevelFinished(srcWorldPos, effectType, callback, target, targetIndex) {
          var _this3 = this;

          var uiTra = this.node.getComponent(UITransform);
          var srcPos = uiTra.convertToNodeSpaceAR(srcWorldPos);
          resourceUtil.getEffectPrefab('fight/linkStar/linkStar', function (err, prefab) {
            if (err) {
              callback.apply(target, [err]);
              return;
            }

            var effectNode = poolManager.instance.getNode(prefab, _this3.node);
            effectNode.position = srcPos;
            var ani = effectNode.getComponent(Animation);
            ani.play('linkStarScale');

            if (!targetIndex) {
              targetIndex = _this3._fightScene.linkContent.getNoEffectLinkItemIndex();
            }

            if (targetIndex) {
              _this3._fightScene.linkContent.markLinkItemEffect(targetIndex, effectType);

              var targetWorldPos = _this3._fightScene.linkContent.getItemWorldPosByIndex(targetIndex);

              var targetPos = uiTra.convertToNodeSpaceAR(targetWorldPos);
              AudioManager.instance.playSound(constants.AUDIO_SOUND.SPARE_STEP, false);
              TweenSystem.instance.ActionManager.removeAllActionsFromTarget(effectNode); // let bezier = [srcPos, new Vec3((targetPos.x - srcPos.x) / 2 + srcPos.x, srcPos.y + 500, 0), targetPos];

              tween(effectNode).to(0.33, {
                position: srcPos
              }).to(0.33, {
                position: new Vec3((targetPos.x - srcPos.x) / 2 + srcPos.x, srcPos.y + 500, 0)
              }).to(0.33, {
                position: targetPos
              }).call(function () {
                var ani = effectNode.getComponent(Animation);
                ani.once(Animation.EventType.FINISHED, function () {
                  poolManager.instance.putNode(effectNode);
                });
                ani.play('linkStarOver');
                callback.apply(target, [null, targetIndex, effectType]);
              }).start(); // let bezierForward = cc.bezierTo(1, bezier);
              // let seqAction = cc.sequence(bezierForward, cc.callFunc(, this));
              // seqAction.setTag(TAG_STAR_MOVE_ACTION);
              // effectNode.runAction(seqAction);
            } else {
              poolManager.instance.putNode(effectNode);
              callback.apply(target, ['error']);
              return;
            }
          });
        };

        _proto.showLinkItemDestroyEffect = function showLinkItemDestroyEffect(srcWorldPos, score) {
          var _this4 = this;

          var srcPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(srcWorldPos);
          resourceUtil.getEffectPrefab("fight/effectHide/effectHide", function (err, prefab) {
            if (err) {
              return;
            }

            var effect = poolManager.instance.getNode(prefab, _this4.node);
            effect.position = srcPos;
            var ani = effect.getComponent(Animation);
            ani.once(Animation.EventType.FINISHED, function () {
              poolManager.instance.putNode(effect);

              _this4.showAfterDestroyEffect(srcPos);
            }, _this4);
            ani.play('effectHide');

            _this4.showLinkItemScore(srcPos, score);
          });
        };

        _proto.showLinkItemScore = function showLinkItemScore(srcPos, score) {
          var _this5 = this;

          resourceUtil.loadRes('prefab/fight/fightNum', Prefab, function (err, prefab) {
            if (err) {
              return;
            }

            var effect = poolManager.instance.getNode(prefab, _this5.node);
            effect.position = new Vec3(srcPos.x, srcPos.y + 40);
            effect.zIndex = constants.ZORDER.FIGHT_NUM; //数字统一堆前面

            var fightNum = effect.getComponent(FightNum);
            fightNum.show(score, function () {
              poolManager.instance.putNode(effect);
            });
          });
        };

        _proto.showAfterDestroyEffect = function showAfterDestroyEffect(srcPos) {
          var _this6 = this;

          var targetWorldPos = this._fightScene.fightUI.getProgressBarWorldPos();

          var targetPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(targetWorldPos);

          if (!targetPos) {
            return;
          }

          resourceUtil.getEffectPrefab("fight/eliminate/eliminate", function (err, prefab) {
            if (err) {
              return;
            }

            var effect = poolManager.instance.getNode(prefab, _this6.node);
            effect.position = srcPos;
            var duration = targetPos.clone().subtract(srcPos).length() / 1000;
            tween(effect).to(duration, {
              position: targetPos
            }).call(function () {
              poolManager.instance.putNode(effect);
              clientEvent.dispatchEvent('updateScore');
            }).start(); // let moveAction = cc.moveTo(duration, targetPos);
            // let seqAction = cc.sequence(moveAction, cc.callFunc((node) => {
            //     poolManager.instance.putNode(node);
            //     clientEvent.dispatchEvent('updateScore');
            // }, this));
            // effect.runAction(seqAction);
          });
        };

        _proto.showSkillLineEffect = function showSkillLineEffect(targetWorldPos, isHorizontal) {
          var _this7 = this;

          var targetPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(targetWorldPos);
          resourceUtil.getEffectPrefab("fight/effectSkillLine/effectSkillLine", function (err, prefab) {
            if (err) {
              return;
            }

            var effect = poolManager.instance.getNode(prefab, _this7.node);
            effect.position = targetPos;
            effect.setRotationFromEuler(0, 0, 0);

            if (!isHorizontal) {
              effect.setRotationFromEuler(0, 0, 90);
            }

            var ani = effect.getComponent(Animation);
            ani.play('effectSkillLine');
            ani.once(Animation.EventType.FINISHED, function () {
              poolManager.instance.putNode(effect);
            }, _this7);
          });
        };

        _proto.showSkillRangeEffect = function showSkillRangeEffect(targetWorldPos) {
          var _this8 = this;

          var targetPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(targetWorldPos);
          resourceUtil.getEffectPrefab("fight/effectSkillRange/effectSkillRange", function (err, prefab) {
            if (err) {
              return;
            }

            var effect = poolManager.instance.getNode(prefab, _this8.node);
            effect.position = targetPos;
            AudioManager.instance.playSound(constants.AUDIO_SOUND.RANGE_BOMB, false);
            var ani = effect.getComponent(Animation);
            ani.play('effectSkillRange');
            ani.once(Animation.EventType.FINISHED, function () {
              poolManager.instance.putNode(effect);
            }, _this8);
          });
        };

        _proto.playTargetCakeFlyEffect = function playTargetCakeFlyEffect(cake, srcWorldPos, targetWorldPos, callback) {
          var _this9 = this;

          resourceUtil.createUI('fight/showTargetCake', function (err, node) {
            if (err) {
              callback(err, node);
              return;
            }

            var uiTra = _this9.node.getComponent(UITransform);

            var srcPos = uiTra.convertToNodeSpaceAR(srcWorldPos);
            var targetPos = uiTra.convertToNodeSpaceAR(targetWorldPos);
            node.position = srcPos;
            node.getComponent(ShowTargetCake).onlyShowCake(cake);
            var duration = targetPos.clone().subtract(srcPos).length() / 1000;
            tween(node).to(duration, {
              position: targetPos
            }).call(function (node) {
              node && node.destroy();
              callback();
            }).start(); // let moveAction = cc.moveTo(duration, targetPos);
            // let seqAction = cc.sequence(moveAction, cc.callFunc((node) => {
            //     node && node.destroy();
            //     callback();
            // }, this));
            // node.runAction(seqAction);
          }, this.node);
        };

        _proto.showBonusTime = function showBonusTime(callback) {
          var _this10 = this;

          resourceUtil.createEffect('fight/bonusTime/bonusTime', function (err, node) {
            if (err) {
              callback(err, node);
              return;
            }

            var ani = node.getComponent(Animation);
            ani.play('bonusTime');
            ani.once(Animation.EventType.FINISHED, function () {
              node && node.destroy();
              callback(null);
            }, _this10);
          }, this.node);
        };

        _proto.useInfiniteProp = function useInfiniteProp(propWorldPos, infiniteWorldPos) {
          var _this11 = this;

          var srcPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(propWorldPos);
          resourceUtil.createEffect('fight/propUse/propUse', function (err, node) {
            if (err) {
              return;
            }

            node.position = srcPos;
            var ani = node.getComponent(Animation);
            ani.play('propUse');
            ani.on(Animation.EventType.FINISHED, function () {
              node && node.destroy();

              _this11.showUnlimitedOrNumber(infiniteWorldPos, true, null);
            });
          }, this.node);
        };

        _proto.showUnlimitedOrNumber = function showUnlimitedOrNumber(srcWorldPos, isInfinite, number) {
          var srcPos = this.node.getComponent(UITransform).convertToNodeSpaceAR(srcWorldPos);
          resourceUtil.createEffect('fight/unlimited/unlimited', function (err, node) {
            if (err) {
              return;
            }

            node.position = srcPos;
            var ani = node.getComponent(Animation);
            var homeIconNode = node.getChildByName('homeIcon');
            var infiniteNode = homeIconNode.getChildByName('homeIconUnlimited');
            var txtNode = homeIconNode.getChildByName('txt');
            infiniteNode.active = isInfinite;
            txtNode.active = !isInfinite;

            if (!isInfinite && number > 0) {
              txtNode.getComponent(Label).string = number;
            }

            ani.play('unlimitedStart');
            ani.on(Animation.EventType.FINISHED, function () {
              if (isInfinite) {
                ani.play('unlimitedIdle');
              } else {
                node && node.destroy();
                clientEvent.dispatchEvent('updateStep');
              }
            });
          }, this.node);
        };

        _proto.removeLastEffect = function removeLastEffect() {
          var arrLast = [];
          var unlimitedNode = this.node.getChildByName('unlimited');
          if (unlimitedNode) arrLast.push(unlimitedNode);

          if (arrLast.length !== 0) {
            arrLast.forEach(function (element) {
              element.removeFromParent();
            });
          }
        };

        _proto.showUnlockProp = function showUnlockProp(targetWorldPos, propId, callback) {
          var _this12 = this;

          resourceUtil.getEffectPrefab("fight/propGet/propGet", function (err, prefab) {
            if (err) {
              return;
            }

            var node = instantiate(prefab);
            node.setScale(2, 2, 2);
            node.parent = _this12.node;

            var targetNodePos = _this12.node.getComponent(UITransform).convertToNodeSpaceAR(targetWorldPos);

            var id = '00' + propId;
            var propIcon = node.getChildByName('prop');
            resourceUtil.setPropIcon(id, propIcon.getComponent(Sprite), function () {});
            var ani = node.getComponent(Animation);
            ani.play('propGetStart'); // let moveAction = cc.moveTo(duration, targetNodePos).easing(cc.easeCubicActionOut());
            // let seq = cc.sequence(moveAction, cc.callFunc(() => {
            //     ani.play('propGetOver');
            //     ani.on(Animation.EventType.FINISHED, () => {
            //         node && node.destroy();
            //     }, this);
            //     if (callback) {
            //         callback();
            //     }
            // }))

            ani.on(Animation.EventType.FINISHED, function () {
              var duration = targetNodePos.clone().subtract(node.position).length() / 500;
              tween(node).to(duration, {
                position: targetNodePos,
                scale: new Vec3(1, 1, 1)
              }, {
                easing: 'cubicInOut'
              }).call(function () {
                ani.play('propGetOver');
                ani.on(Animation.EventType.FINISHED, function () {
                  node && node.destroy();
                }, _this12);

                if (callback) {
                  callback();
                }
              }).start();
            }, _this12);
          });
        };

        return EffectGroup;
      }(Component), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/showTargetCake.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './playerData.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Animation, UITransform, Vec3, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil, playerData;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      playerData = module.playerData;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "9c9c8xtNVNNdaML8iBVjy6C", "showTargetCake", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ShowTargetCake = exports('ShowTargetCake', (_dec = ccclass('ShowTargetCake'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ShowTargetCake, _Component);

        function ShowTargetCake() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "spCake", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbCake", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "aniCake", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeValue", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodePanel", _descriptor5, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "cake", void 0);

          return _this;
        }

        var _proto = ShowTargetCake.prototype;

        _proto.show = function show(cake, parent) {
          var _this2 = this;

          this.cake = cake;
          resourceUtil.setCakeIcon(this.cake, this.spCake, function () {});
          this.lbCake.string = playerData.instance.getTargetValue(cake);
          this.aniCake.play('showTargetCakeShow');
          this.aniCake.once(Animation.EventType.FINISHED, function () {
            _this2.aniCake.play('showTargetCakeOver');

            parent.showFlyEffect(_this2.cake, _this2.spCake.node.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(0, 0, 0)));
          }, this);
        };

        _proto.onlyShowCake = function onlyShowCake(cake) {
          resourceUtil.setCakeIcon(cake, this.spCake, function () {});
          this.nodeValue.active = false;
          this.nodePanel.active = false;
        };

        return ShowTargetCake;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spCake", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbCake", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "aniCake", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "nodeValue", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "nodePanel", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/signInItem.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './constants.ts', './playerData.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Vec3, UITransform, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, constants, playerData, GameLogic;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Vec3 = module.Vec3;
      UITransform = module.UITransform;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      GameLogic = module.GameLogic;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _temp;

      cclegacy._RF.push({}, "9ed24FbGtFK/r/yqUqxT4pv", "signInItem", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SignInItem = exports('SignInItem', (_dec = ccclass('SignInItem'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(SignInItem, _Component);

        function SignInItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "lbAmount", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spIcon", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spPan", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfDiamond", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfGold", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfGift", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndLight", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndTick", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndBtnFillSignIn", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndBtnReceive", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndMenu", _descriptor11, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "isReceived", void 0);

          _defineProperty(_assertThisInitialized(_this), "_parent", void 0);

          _defineProperty(_assertThisInitialized(_this), "itemInfo", void 0);

          _defineProperty(_assertThisInitialized(_this), "openRewardType", void 0);

          return _this;
        }

        var _proto = SignInItem.prototype;

        _proto.start = function start() {
          this.isReceived = false;
        };

        _proto.init = function init(itemInfo, parent) {
          var _this2 = this;

          this._parent = parent;
          this.itemInfo = itemInfo;
          this.setIcon(itemInfo["rewardType"]);
          this.setStatus(itemInfo["status"]);
          GameLogic.instance.getOpenRewardType(constants.SHARE_FUNCTION.FILL_SIGN, function (err, type) {
            if (!err) {
              _this2.openRewardType = type;

              switch (type) {
                case constants.OPEN_REWARD_TYPE.AD:
                  break;

                case constants.OPEN_REWARD_TYPE.SHARE:
                  break;

                case constants.OPEN_REWARD_TYPE.NULL:
                  _this2.ndBtnFillSignIn.active = false;
                  break;
              }
            } // else {
            //     this.close();
            // }

          });
        };

        _proto.setIcon = function setIcon(type) {
          var v3_init = new Vec3();
          var uiTraSpIcon = this.spIcon.getComponent(UITransform);

          switch (type) {
            case constants.REWARD_TYPE.DIAMOND:
              this.spIcon.spriteFrame = this.sfDiamond;
              uiTraSpIcon.width = 165;
              uiTraSpIcon.height = 126;
              v3_init.set(this.spIcon.node.position);
              v3_init.y = 56;
              this.spIcon.node.setPosition(v3_init);
              break;

            case constants.REWARD_TYPE.GOLD:
              this.spIcon.spriteFrame = this.sfGold;
              uiTraSpIcon.width = 165;
              uiTraSpIcon.height = 126;
              v3_init.set(this.spIcon.node.position);
              v3_init.y = 56;
              this.spIcon.node.setPosition(v3_init);
              break;

            case constants.REWARD_TYPE.GIFT:
              this.spIcon.spriteFrame = this.sfGift;
              break;
          }

          if (this.itemInfo['ID'] <= 6) {
            v3_init.set(0.6, 0.6, 0.6);
            this.spPan.node.setScale(v3_init);
          } else {
            v3_init.set(this.ndTick.position);
            v3_init.y = 50;
            this.ndTick.setPosition(v3_init);
          }

          v3_init.set(this.ndMenu.position);
          v3_init.y = -50;
          this.ndMenu.setPosition(v3_init);
        };

        _proto.setStatus = function setStatus(status) {
          switch (status) {
            case constants.SIGN_REWARD_STATUS.RECEIVED:
              this.showItemUI(false, true, false, false);
              break;

            case constants.SIGN_REWARD_STATUS.RECEIVABLE:
              this.showItemUI(true, false, false, false);
              break;

            case constants.SIGN_REWARD_STATUS.UNRECEIVABLE:
              this.showItemUI(false, false, false, false);
              break;

            case constants.SIGN_REWARD_STATUS.FILLSIGNIN:
              this.showItemUI(false, false, true, false);
              break;

            case constants.SIGN_REWARD_STATUS.AFTER_FILLSIGNIN:
              this.showItemUI(true, false, false, true);
              break;
          }
        };

        _proto.showItemUI = function showItemUI(isShowLight, isShowTick, isShowBtnFillSignIn, isShowBtnReceive) {
          this.ndLight.active = isShowLight;
          this.ndTick.active = isShowTick;
          this.ndBtnFillSignIn.active = isShowBtnFillSignIn;
          this.ndBtnReceive.active = isShowBtnReceive;
        };

        _proto.onBtnReceiveClick = function onBtnReceiveClick() {
          if (this.itemInfo["status"] === constants.SIGN_REWARD_STATUS.AFTER_FILLSIGNIN || this.itemInfo["status"] === constants.SIGN_REWARD_STATUS.RECEIVABLE) {
            this._parent.receiveReward(this.itemInfo, false, this.markReceived.bind(this));
          }
        };

        _proto.markReceived = function markReceived() {
          this.itemInfo["status"] = constants.SIGN_REWARD_STATUS.RECEIVED;
          this.setStatus(this.itemInfo["status"]);
        };

        _proto.markAfterFillSignIn = function markAfterFillSignIn() {
          this.itemInfo["status"] = constants.SIGN_REWARD_STATUS.AFTER_FILLSIGNIN;
          this.setStatus(this.itemInfo["status"]);
          playerData.instance.updateSignInFillSignInDays(this.itemInfo['ID'], false);
        };

        _proto.onBtnFillSignInClick = function onBtnFillSignInClick() {
          var _this3 = this;

          switch (this.openRewardType) {
            case constants.OPEN_REWARD_TYPE.AD:
              GameLogic.instance.showRewardAd(function (err) {
                if (!err) {
                  _this3.markAfterFillSignIn();
                }
              });
              break;

            case constants.OPEN_REWARD_TYPE.SHARE:
              GameLogic.instance.share(constants.SHARE_FUNCTION.FILL_SIGN, {}, function (err) {
                if (!err) {
                  _this3.markAfterFillSignIn();
                }
              });
              break;

            case constants.OPEN_REWARD_TYPE.NULL:
              break;
          }
        };

        return SignInItem;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbAmount", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spPan", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sfDiamond", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sfGold", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "sfGift", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "ndLight", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ndTick", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnFillSignIn", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnReceive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "ndMenu", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/loadsh.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "a40a4pGR6lCqo0coR1W4kAl", "loadsh", undefined);

      var ccclass = _decorator.ccclass;
      var loadsh = exports('loadsh', (_dec = ccclass("loadsh"), _dec(_class = (_temp = _class2 = /*#__PURE__*/function () {
        function loadsh() {}
        /* class member could be defined like this */
        // dummy = '';

        /**
         * 遍历 collection（集合）元素，返回 predicate（断言函数）第一个返回真值的第一个元素
         * @param  {any} collection 一个用来迭代的集合
         * @param {Function} predicate 每次迭代调用的函数。
         * @returns 返回匹配元素，否则返回 undefined。
         */


        loadsh.find = function find(collection, predicate) {
          var result;

          if (!Array.isArray(collection)) {
            collection = loadsh._toArray(collection);
          }

          result = collection.filter(predicate);

          if (result.length) {
            return result[0];
          }

          return undefined;
        }
        /**
         * 调用 iteratee 遍历 collection(集合) 中的每个元素
         * @param  {any} collection 一个用来迭代的集合
         * @param {Function} iteratee 每次迭代调用的函数。
         */
        ;

        loadsh.forEach = function forEach(collection, iteratee) {
          if (!Array.isArray(collection)) {
            var array = loadsh._toArrayKey(collection);

            array.forEach(function (value, index, arr) {
              var key1 = value['key'];
              var value1 = value['value'];
              iteratee(value1, key1, collection);
            });
          } else {
            collection.forEach(iteratee);
          }
        }
        /**
         * 深度拷贝
         * @param {any} sObj 拷贝的对象
         * @returns 
         */
        ;

        loadsh.cloneDeep = function cloneDeep(sObj) {
          if (sObj === null || typeof sObj !== "object") {
            return sObj;
          }

          var s = {};

          if (sObj.constructor === Array) {
            s = [];
          }

          for (var i in sObj) {
            if (sObj.hasOwnProperty(i)) {
              s[i] = loadsh.cloneDeep(sObj[i]);
            }
          }

          return s;
        }
        /**
         * 创建一个数组， value（值） 是 iteratee（迭代函数）遍历 collection（集合）中的每个元素后返回的结果。
         * @param {Array|Object} collection  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数，用来转换key（键
         * @returns {Array} 返回一个组成集合数组
         */
        ;

        loadsh.map = function map(collection, iteratee) {
          if (!Array.isArray(collection)) {
            collection = loadsh._toArray(collection);
          }

          var arr = [];
          collection.forEach(function (value, index, array) {
            arr.push(iteratee(value, index, array));
          });
          return arr;
        }
        /**
         * 
         * @param srcObj 
         * @returns 
         */
        ;

        loadsh._toArrayKey = function _toArrayKey(srcObj) {
          var resultArr = []; // to array

          for (var key in srcObj) {
            if (!srcObj.hasOwnProperty(key)) {
              continue;
            }

            resultArr.push({
              key: key,
              value: srcObj[key]
            });
          }

          return resultArr;
        };

        loadsh._toArray = function _toArray(srcObj) {
          var resultArr = []; // to array

          for (var key in srcObj) {
            if (!srcObj.hasOwnProperty(key)) {
              continue;
            }

            resultArr.push(srcObj[key]);
          }

          return resultArr;
        }
        /**
         * 遍历 collection（集合）元素，返回 predicate（断言函数）返回真值 的所有元素的数组。
         * @param {Array|Object} collection  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数，用来转换key（键
         * @returns 返回一个新的过滤后的数组。
         */
        ;

        loadsh.filter = function filter(collection, iteratees) {
          if (!Array.isArray(collection)) {
            collection = loadsh._toArray(collection);
          }

          return collection.filter(iteratees);
        }
        /**
         * 执行深比较来确定两者的值是否相等。
         * @param {any}x 
         * @param {any}y 
         * @returns {boolean} 如果 两个值完全相同，那么返回 true，否则返回 false。
         */
        ;

        loadsh.isEqual = function isEqual(x, y) {
          var in1 = x instanceof Object;
          var in2 = y instanceof Object;

          if (!in1 || !in2) {
            return x === y;
          }

          if (Object.keys(x).length !== Object.keys(y).length) {
            return false;
          }

          for (var p in x) {
            var a = x[p] instanceof Object;
            var b = y[p] instanceof Object;

            if (a && b) {
              return loadsh.isEqual(x[p], y[p]);
            } else if (x[p] !== y[p]) {
              return false;
            }
          }

          return true;
        }
        /**
         * 接收一个要移除值的数组。
         * @param {Array} array 修改的数组
         * @param {Array} value 移除值的数组
         * @param  {Function} comparator comparator（比较器）调用每个元素。
         * @returns 
         */
        ;

        loadsh.pullAllWith = function pullAllWith(array, value, comparator) {
          value.forEach(function (item) {
            var res = array.filter(function (n) {
              return comparator(n, item);
            });
            res.forEach(function (item) {
              var index = array.indexOf(item);

              if (array.indexOf(item) !== -1) {
                array.splice(index, 1);
              }
            });
          });
          return array;
        }
        /**
         * 返回当前时间戳
         * @returns 
         */
        ;

        loadsh.now = function now() {
          return Date.now();
        }
        /**
         * 接收一个要移除值的数组。
         * @param {Array} array 修改的数组
         * @param {Array} value 移除值的数组
         * @returns 
         */
        ;

        loadsh.pullAll = function pullAll(array, value) {
          value.forEach(function (item) {
            var index = array.indexOf(item);

            if (array.indexOf(item) !== -1) {
              array.splice(index, 1);
            }
          });
          return array;
        }
        /**
         * 从右到左遍历集合中每一个元素的。
         * @param {Array|Object} collection  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数
         */
        ;

        loadsh.forEachRight = function forEachRight(collection, iteratee) {
          if (!Array.isArray(collection)) {
            collection = loadsh._toArray(collection);
          } //@ts-ignore


          for (var i = collection.length - 1; i >= 0; i--) {
            //@ts-ignore
            var ret = iteratee(collection[i]);
            if (!ret) break;
          }
        }
        /**
         * 检查字符串string是否以 target 开头。
         * @param {string} str 要检索的字符串。
         * @param {string}target  要检查的字符串。
         * @param {number}position 检索的位置。
         * @returns 
         */
        ;

        loadsh.startsWith = function startsWith(str, target, position) {
          str = str.substr(position);
          return str.startsWith(target);
        }
        /**
         * 检查字符串string是否以 target 结束。
         * @param {string} str 要检索的字符串。
         * @param {string}target  要检查的字符串。
         * @param {number}position 检索的位置。
         * @returns 
         */
        ;

        loadsh.endsWith = function endsWith(str, target, position) {
          str = str.substr(position);
          return str.endsWith(target);
        }
        /**
         * 移除数组中predicate（断言）返回为真值的所有元素
         * @param {Array} array  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数
         * @returns 
         */
        ;

        loadsh.remove = function remove(array, predicate) {
          var result = [];
          var indexes = [];
          array.forEach(function (item, index) {
            if (predicate(item)) {
              result.push(item);
              indexes.push(index);
            }
          });

          loadsh._basePullAt(array, indexes);

          return result;
        };

        loadsh._basePullAt = function _basePullAt(array, indexes) {
          var length = array ? indexes.length : 0;
          var lastIndex = length - 1;
          var previous;

          while (length--) {
            var index = indexes[length];

            if (length === lastIndex || index !== previous) {
              previous = index;
              Array.prototype.splice.call(array, index, 1);
            }
          }

          return array;
        }
        /**
         * 返回第一个通过 predicate 判断为真值的元素的索引值
         * @param {Array} array  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数
         * @param {number} fromIndex 开始查找索引值
         * @returns 
         */
        ;

        loadsh.findIndex = function findIndex(array, predicate, fromIndex) {
          array = array.slice(fromIndex);
          var i;

          if (typeof predicate === "function") {
            for (i = 0; i < array.length; i++) {
              if (predicate(array[i])) {
                return i;
              }
            }
          } else if (Array.isArray(predicate)) {
            for (i = 0; i < array.length; i++) {
              var key = predicate[0];
              var vaule = true; //@ts-ignore

              if (predicate.length > 1) {
                vaule = predicate[1];
              }

              if (array[i][key] === vaule) {
                return i;
              }
            }
          } else {
            for (i = 0; i < array.length; i++) {
              if (array[i] === predicate) {
                return i;
              }
            }
          }

          return -1;
        }
        /**
         * 创建一个新数组，将array与任何数组 或 值连接在一起。
         * @returns 
         */
        ;

        loadsh.concat = function concat() {
          var length = arguments.length;

          if (!length) {
            return [];
          }

          var array = arguments[0];
          var index = 1;

          while (index < length) {
            array = array.concat(arguments[index]);
            index++;
          }

          return array;
        }
        /**
         * 检查 value 是否是原始Number数值型 或者 对象。
         * @param {any }value 
         * @returns 
         */
        ;

        loadsh.isNumber = function isNumber(value) {
          return typeof value === 'number';
        }
        /**
         * 返回首次 value 在数组array中被找到的 索引值
         * @param {Array}array 
         * @param {any}value 
         * @param {number} fromIndex 
         * @returns 
         */
        ;

        loadsh.indexOf = function indexOf(array, value, fromIndex) {
          array = array.slice(fromIndex);
          return array.indexOf(value);
        }
        /**
         * 将 array 中的所有元素转换为由 separator 分隔的字符串。
         * @param {any} array 要转换的数组
         * @param {string} separator 分隔元素。
         * @returns 
         */
        ;

        loadsh.join = function join(array, separator) {
          if (array === null) return '';
          var result = '';
          array.forEach(function (item) {
            result += item + separator;
          });
          return result.substr(0, result.length - 1);
        }
        /**
         * 根据separator 拆分字符串string。
         * @param {string} str 要转换的数组
         * @param {RegExp|string} separator 分隔元素。
         * @param {number} limit 限制结果的数量。
         * @returns 
         */
        ;

        loadsh.split = function split(str, separator, limit) {
          return str.split(separator, limit);
        }
        /**
         * 计算 array 中的最大值。 如果 array 是 空的或者假值将会返回 undefined。
         * @param {Array}array 
         * @returns 
         */
        ;

        loadsh.max = function max(array) {
          if (array && array.length) {
            var result;

            for (var i = 0; i < array.length; i++) {
              if (i === 0) {
                result = array[0];
              } else if (result < array[i]) {
                result = array[i];
              }
            }

            return result;
          }

          return undefined;
        }
        /**
         * 创建一个切片数组，去除array前面的n个元素。（n默认值为1。）
         * @param {Array}array : 要查询的数组。
         * @param {number}n 要去除的元素个数。
         * @returns 
         */
        ;

        loadsh.drop = function drop(array, n) {
          var length = array === null ? 0 : array.length;

          if (!length) {
            return [];
          }

          return array.slice(n);
        }
        /**
         * 将array递归为一维数组。
         * @param {Array} arr 
         * @returns 
         */
        ;

        loadsh.flattenDeep = function flattenDeep(arr) {
          return arr.reduce(function (prev, cur) {
            return prev.concat(Array.isArray(cur) ? loadsh.flattenDeep(cur) : cur);
          }, []);
        }
        /**
         * 创建一个去重后的array数组副本。使用了SameValueZero 做等值比较。只有第一次出现的元素才会被保留。
         * @param {Array} array 
         * @returns 
         */
        ;

        loadsh.uniq = function uniq(array) {
          var result = [];
          array.forEach(function (item) {
            if (result.indexOf(item) === -1) {
              result.push(item);
            }
          });
          return result;
        }
        /**
         * 检查 value 是否是 NaN。
         * @param {any}value 
         * @returns 
         */
        ;

        loadsh.isNaN = function isNaN(value) {
          // An `NaN` primitive is the only value that is not equal to itself.
          // Perform the `toStringTag` check first to avoid errors with some
          // ActiveX objects in IE.
          return loadsh.isNumber(value) && value !== +value;
        }
        /**
         * 将数组（array）拆分成多个 size 长度的区块，并将这些区块组成一个新数组
         * @param {Array}array 
         * @param {number}size 
         * @returns 
         */
        ;

        loadsh.chunk = function chunk(array, size) {
          var length = array === null ? 0 : array.length;

          if (!length || size < 1) {
            return [];
          }

          var result = [];

          while (array.length > size) {
            result.push(array.slice(0, size));
            array = array.slice(size);
          }

          result.push(array);
          return result;
        }
        /**
         * 转换 value 为一个有限数字
         * @param {any} value 
         * @returns 
         */
        ;

        loadsh.toFinite = function toFinite(value) {
          var INFINITY = 1 / 0;
          var MAX_INTEGER = 1.7976931348623157e+308;

          if (!value) {
            return value === 0 ? value : 0;
          }

          value = Number(value);

          if (value === INFINITY || value === -INFINITY) {
            var sign = value < 0 ? -1 : 1;
            return sign * MAX_INTEGER;
          }

          return value === value ? value : 0;
        }
        /**
         * 判断是否为对象
         * @param {any}value  
         * @returns {boolean}
         */
        ;

        loadsh.isObject = function isObject(value) {
          var type = typeof value;
          return value !== null && (type === 'object' || type === 'function');
        };
        /**
         * 
         * @param value 
         * @returns 
         */


        loadsh.isLength = function isLength(value) {
          return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= loadsh.MAX_SAFE_INTEGER;
        };

        loadsh._isArrayLike = function _isArrayLike(value) {
          return value !== null && loadsh.isLength(value.length)
          /*&& !isFunction(value)*/
          ;
        }
        /**
         * 返回数组总符合条件的最大值
         * @param {Array} array  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数
         * @returns {Object} 返回最大值
         */
        ;

        loadsh.maxBy = function maxBy(array, predicate) {
          if (array && array.length) {
            var result;
            var objResult;

            for (var i = 0; i < array.length; i++) {
              if (i === 0) {
                result = predicate(array[0]);
                objResult = array[0];
              } else if (result < array[i]) {
                result = array[i];
                objResult = array[i];
              }
            }

            return objResult;
          }

          return undefined;
        }
        /**
         * 返回数组总符合条件的最小值
         * @param {Array} array  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数
         * @returns {Object} 返回最小值
         */
        ;

        loadsh.minBy = function minBy(array, predicate) {
          if (array && array.length) {
            var result;
            var objResult;

            for (var i = 0; i < array.length; i++) {
              if (i === 0) {
                result = predicate(array[0]);
                objResult = array[0];
              } else if (result > array[i]) {
                result = predicate(array[i]);
                objResult = array[i];
              }
            }

            return objResult;
          }

          return undefined;
        }
        /**
         * 返回复合迭代函数的总和
         * @param {Array|Object} collection  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数
         * @returns {Object} 返回总和
         */
        ;

        loadsh.sumBy = function sumBy(collection, predicate) {
          var sum = 0;

          for (var _key in collection) {
            //@ts-ignore
            sum += predicate(collection[_key]);
          }

          return sum;
        }
        /**
         * 返回复合迭代函数的次数
         * @param {Array|Object} collection  一个用来迭代的集合.
         * @param {Function} predicate  一个迭代函数，用来转换key（键
         * @returns {Object} 返回一个组成集合对象
         */
        ;

        loadsh.countBy = function countBy(collection, predicate) {
          var objRet = {};

          for (var _key2 in collection) {
            var value = predicate(_key2);

            if (objRet.hasOwnProperty(value)) {
              objRet[value] += 1;
            } else {
              objRet[value] = 1;
            }
          }

          return objRet;
        }
        /**
         * 取随机数
         * @param min 
         * @param max 
         * @returns 
         */
        ;

        loadsh.random = function random(min, max) {
          var r = Math.random();
          var rr = r * (max - min + 1) + min;
          return Math.floor(rr);
        };

        return loadsh;
      }(), _defineProperty(_class2, "MAX_SAFE_INTEGER", 9007199254740991), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/fightScene.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './constants.ts', './clientEvent.ts', './localConfig.ts', './playerData.ts', './loadsh.ts', './uiManager.ts', './audioManager.ts', './gameLogic.ts', './linkContent.ts', './effectGroup.ts', './fightUI.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, profiler, UITransform, Rect, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, constants, clientEvent, localConfig, playerData, loadsh, uiManager, AudioManager, GameLogic, LinkContent, EffectGroup, FightUI;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      profiler = module.profiler;
      UITransform = module.UITransform;
      Rect = module.Rect;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      loadsh = module.loadsh;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      GameLogic = module.GameLogic;
    }, function (module) {
      LinkContent = module.LinkContent;
    }, function (module) {
      EffectGroup = module.EffectGroup;
    }, function (module) {
      FightUI = module.FightUI;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "aa4e3RbxGxHyqBA31aqKi9Q", "fightScene", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var FightScene = exports('FightScene', (_dec = ccclass('FightScene'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FightScene, _Component);

        function FightScene() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeLinkContent", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeFightUI", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeEffectGroup", _descriptor3, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "linkContent", void 0);

          _defineProperty(_assertThisInitialized(_this), "fightUI", void 0);

          _defineProperty(_assertThisInitialized(_this), "effectGroup", void 0);

          _defineProperty(_assertThisInitialized(_this), "isLevelOver", void 0);

          _defineProperty(_assertThisInitialized(_this), "spareStar", void 0);

          _defineProperty(_assertThisInitialized(_this), "allFlyFinishCb", void 0);

          _defineProperty(_assertThisInitialized(_this), "reliveByAd", void 0);

          _defineProperty(_assertThisInitialized(_this), "isLevelStart", void 0);

          _defineProperty(_assertThisInitialized(_this), "dictPropsUseTimes", void 0);

          _defineProperty(_assertThisInitialized(_this), "isShowOperationUI", void 0);

          return _this;
        }

        var _proto = FightScene.prototype;

        _proto.start = function start() {
          profiler.hideStats();
          playerData.instance.startNewLevel();
          this.linkContent = this.nodeLinkContent.getComponent(LinkContent);
          this.fightUI = this.nodeFightUI.getComponent(FightUI);
          this.effectGroup = this.nodeEffectGroup.getComponent(EffectGroup);
          this.effectGroup.show(this);
          this.onNewLevel();
          AudioManager.instance.stop(constants.AUDIO_MUSIC.BACKGROUND);
          AudioManager.instance.playMusic(constants.AUDIO_MUSIC.FIGHT, true);
        };

        _proto.onEnable = function onEnable() {
          clientEvent.on('levelFinished', this.onLevelFinished, this);
          clientEvent.on('gameOver', this.onGameOver, this);
          clientEvent.on('newLevel', this.onNewLevel, this);
          clientEvent.on('useProp', this.useProp, this);
        };

        _proto.onDisable = function onDisable() {
          clientEvent.off('levelFinished', this.onLevelFinished, this);
          clientEvent.off('gameOver', this.onGameOver, this);
          clientEvent.off('newLevel', this.onNewLevel, this);
          clientEvent.off('useProp', this.useProp, this);
          AudioManager.instance.stop(constants.AUDIO_MUSIC.FIGHT); // AudioManager.instance.playMusic(constants.AUDIO_MUSIC.BACKGROUND, true);
        };

        _proto.onLevelFinished = function onLevelFinished() {
          var _this2 = this;

          this.isLevelOver = true;

          if (playerData.instance.spareStep > 0 && !playerData.instance.curLevelInfo.infinite) {
            this.showBonusTime(function () {
              var step = playerData.instance.spareStep;
              _this2.spareStar = step;

              if (step > 0) {
                _this2.allFlyFinishCb = _this2.triggerAllSpecialEffect;

                for (var idx = 0; idx < step; idx++) {
                  _this2.scheduleOnce(function () {
                    playerData.instance.reduceStep();
                    clientEvent.dispatchEvent('updateStep');

                    var srcWorldPos = _this2.fightUI.getStepWorldPos();

                    var rand = loadsh.random(0, 1);
                    var effect = rand ? constants.SPECIAL_EFFECT.HORIZONTAL : constants.SPECIAL_EFFECT.VERTICAL;

                    _this2.effectGroup.showStarAfterLevelFinished(srcWorldPos, effect, _this2.showFlyEffectOver, _this2);
                  }, idx * 0.2);
                }
              } else {
                _this2.triggerAllSpecialEffect();
              }
            });
          } else {
            this.triggerAllSpecialEffect();
          }
        };

        _proto.showBonusTime = function showBonusTime(callback) {
          var _this3 = this;

          AudioManager.instance.playSound(constants.AUDIO_SOUND.BONUS_TIME, false);
          this.scheduleOnce(function () {
            _this3.effectGroup.showBonusTime(function () {
              _this3.linkContent.showLinkFinishEffect(callback);
            });
          }, 0.2);
        };

        _proto.onGameOver = function onGameOver() {
          var _this4 = this;

          if (this.isLevelOver) {
            return;
          }

          this.isLevelOver = true;

          if (this.reliveByAd) {
            this.showGameOverUI();
          } else {
            this.reliveByAd = true;
            uiManager.instance.showDialog('fight/adStep', [function (err) {
              if (!err) {
                playerData.instance.addStep(5);
                _this4.isLevelOver = false;
                clientEvent.dispatchEvent('updateStep', false);
              } else {
                _this4.showGameOverUI();
              }
            }]);
          }
        };

        _proto.showGameOverUI = function showGameOverUI() {
          uiManager.instance.showDialog("fight/balanceFailed");
        };

        _proto.onNewLevel = function onNewLevel() {
          var _this5 = this;

          this.isLevelStart = false; //等弹窗结束后在确定是否开始

          this.isLevelOver = false;
          this.reliveByAd = false; //步数用完时可通过让玩家选择是否要通过广告增加步数，仅能使用一次

          this.dictPropsUseTimes = {}; //道具使用次数

          this.effectGroup.removeLastEffect(); //删除上一关卡特效

          if (this.linkContent.dictCakes) {
            this.linkContent.showAllLinkItem(false, function () {
              _this5.linkContent.show(_this5);

              _this5.fightUI.show(_this5);

              if (playerData.instance.isNeedOpenUnlockPanel()) {
                uiManager.instance.showDialog('fight/unLockProp', [_this5.showTargets.bind(_this5), _this5.fightUI]);
              } else {
                _this5.showTargets();
              }
            });
          } else {
            this.linkContent.show(this);
            this.fightUI.show(this);

            if (playerData.instance.hasSeenGuide()) {
              if (playerData.instance.isNeedOpenUnlockPanel()) {
                uiManager.instance.showDialog('fight/unLockProp', [this.showTargets.bind(this), this.fightUI]);
              } else {
                this.showTargets();
              }
            } else {
              uiManager.instance.showDialog('fight/fightGuide', [function () {
                playerData.instance.finishSeenGuide();

                if (playerData.instance.isNeedOpenUnlockPanel()) {
                  uiManager.instance.showDialog('fight/unLockProp', [_this5.showTargets.bind(_this5) // this.fightUI
                  ]);
                } else {
                  _this5.showTargets();
                }
              }]);
            }
          }

          this.linkContent.stopGuideHand();
        };

        _proto.showTargets = function showTargets() {
          var _this6 = this;

          this.fightUI.showTargetsAni(function () {
            _this6.showAdRewardAsk();

            _this6.isLevelStart = true;
          });
        };

        _proto.showAdRewardAsk = function showAdRewardAsk() {
          var _this7 = this;

          if (playerData.instance.level > 3) {
            uiManager.instance.showDialog('fight/adProp', [function (err) {
              if (!err) {
                _this7.showAdRewardOver(true);
              } else {
                _this7.showAdRewardOver(false);
              }
            }]);
          } else {
            this.showAdRewardOver(false);
          }
        };

        _proto.showAdRewardOver = function showAdRewardOver(isReward) {
          var _this8 = this;

          if (isReward) {
            this.spareStar = 2;
            this.allFlyFinishCb = null;

            for (var idx = 0; idx < 2; idx++) {
              this.scheduleOnce(function () {
                var srcWorldPos = _this8.fightUI.getStepWorldPos();

                var rand = loadsh.random(0, 1);
                var effect = rand ? constants.SPECIAL_EFFECT.HORIZONTAL : constants.SPECIAL_EFFECT.VERTICAL;

                _this8.effectGroup.showStarAfterLevelFinished(srcWorldPos, effect, _this8.showFlyEffectOver, _this8);
              }, idx * 0.2);
            }
          }
        };

        _proto.showFlyEffect = function showFlyEffect(dictGenerator, callback) {
          this.allFlyFinishCb = callback;
          this.spareStar = 0;

          for (var index in dictGenerator) {
            var srcWorldPos = this.linkContent.getItemWorldPosByIndex(index);
            this.spareStar++;
            this.effectGroup.showStarFlyEffect(srcWorldPos, dictGenerator[index], this.showFlyEffectOver, this);
          }
        };

        _proto.showFlyEffectOver = function showFlyEffectOver(error, idxTarget, effectType) {
          this.spareStar--;

          if (error) {
            return;
          }

          this.spareStar = this.spareStar < 0 ? 0 : this.spareStar;
          this.linkContent.addEffect(idxTarget, effectType);

          if (this.spareStar === 0) {
            if (this.allFlyFinishCb) {
              this.allFlyFinishCb();
            }
          }
        };

        _proto.triggerAllSpecialEffect = function triggerAllSpecialEffect() {
          var _this9 = this;

          this.linkContent.triggerAllSpecialEffect(function () {
            _this9.scheduleOnce(function () {
              _this9.linkContent.fillEmptyCell();
            }, 0.3);

            _this9.scheduleOnce(function () {
              if (!playerData.instance.balanceOverAdTimes) {
                playerData.instance.balanceOverAdTimes = 1;
              }

              playerData.instance.balanceOverAdTimes++;

              if (playerData.instance.balanceOverAdTimes > 2) {
                GameLogic.instance.showInterStitialAd(function (dataObj) {
                  uiManager.instance.showDialog("fight/balance");
                });
                playerData.instance.balanceOverAdTimes = 1;
              } else {
                uiManager.instance.showDialog("fight/balance");
              }
            }, 2);
          });
        };

        _proto.getLinkContentRect = function getLinkContentRect() {
          var pos = this.nodeLinkContent.position;
          var uiTra = this.nodeLinkContent.getComponent(UITransform);
          return new Rect(pos.x, pos.y, uiTra.width, uiTra.height);
        };

        _proto.isPropCanUse = function isPropCanUse(propId) {
          var prop = localConfig.instance.queryByID('prop', propId);

          if (prop) {
            if (this.dictPropsUseTimes.hasOwnProperty(propId)) {
              var times = this.dictPropsUseTimes[propId];

              if (times >= prop.limit) {
                return false;
              }
            }

            return true;
          }

          return true;
        };

        _proto.showPropOperationUI = function showPropOperationUI(prop, posWorld) {
          var _this10 = this;

          this.linkContent.stopGuideHand();
          this.isShowOperationUI = true;
          uiManager.instance.showDialog('fight/fightPropsOperation', [prop, posWorld, this.getLinkContentRect(), this, function () {
            _this10.isShowOperationUI = false;
          }]);
        };

        _proto.useProp = function useProp(propId, triggerIndex) {
          switch (propId) {
            case constants.PROP_ID.HAMMER:
              if (!triggerIndex || triggerIndex < 0) {
                return;
              }

              this.linkContent.destoryCake(triggerIndex);
              break;

            case constants.PROP_ID.MAGIC:
              if (!triggerIndex || triggerIndex < 0) {
                return;
              }

              var srcWorldPos = this.fightUI.getStepWorldPos();
              this.spareStar = 1;
              var rand = loadsh.random(0, 1);
              var effect = rand ? constants.SPECIAL_EFFECT.HORIZONTAL : constants.SPECIAL_EFFECT.VERTICAL;
              this.allFlyFinishCb = null;
              this.effectGroup.showStarAfterLevelFinished(srcWorldPos, effect, this.showFlyEffectOver, this, triggerIndex);
              break;

            case constants.PROP_ID.REFRESH:
              this.linkContent.stopGuideHand();

              if (!this.linkContent.refreshLinkItems()) {
                return;
              }

              break;

            case constants.PROP_ID.INFINITE:
              playerData.instance.curLevelInfo.infinite = true;
              this.fightUI.showInfinite();
              break;
          }

          if (this.dictPropsUseTimes.hasOwnProperty(propId)) {
            this.dictPropsUseTimes[propId]++;
          } else {
            this.dictPropsUseTimes[propId] = 1;
          }

          playerData.instance.costProp(propId);
          clientEvent.dispatchEvent('updateProp', propId);
        };

        return FightScene;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nodeLinkContent", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "nodeFightUI", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "nodeEffectGroup", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/TestLocal.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Sprite, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "adf11d7SIpFbKGa4sersnu2", "TestLocal", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      /**
       * Predefined variables
       * Name = TestLocal
       * DateTime = Mon Nov 06 2023 20:12:59 GMT+0800 (China Standard Time)
       * Author = wanglang3081
       * FileBasename = TestLocal.ts
       * FileBasenameNoExtension = TestLocal
       * URL = db://assets/test/TestLocal.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
       *
       */

      var TestLocal = exports('TestLocal', (_dec = ccclass('TestLocal'), _dec2 = property(Sprite), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TestLocal, _Component);

        function TestLocal() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "testlocal", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = TestLocal.prototype;

        _proto.start = function start() {
          var _this$testlocal$sprit; // [3]


          console.log("testlocal ", (_this$testlocal$sprit = this.testlocal.spriteFrame) === null || _this$testlocal$sprit === void 0 ? void 0 : _this$testlocal$sprit._uuid);
        };

        return TestLocal;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "testlocal", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/constant.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }, function (module) {
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      cclegacy._RF.push({}, "b08f08kiOlEA7e6qUWa7AnA", "constant", undefined);

      var constant = exports('constant', function constant() {});

      _defineProperty(constant, "GAME_NAME", 'template');

      _defineProperty(constant, "GAME_VERSION", '1.0.1');

      _defineProperty(constant, "GAME_FRAME", 60);

      _defineProperty(constant, "GAME_INIT_FRAME", 60);

      _defineProperty(constant, "LOCAL_CACHE", {
        PLAYER: 'player',
        //玩家基础数据缓存，如金币砖石等信息，暂时由客户端存储，后续改由服务端管理
        SETTINGS: 'settings',
        //设置相关，所有杂项都丢里面进去
        DATA_VERSION: 'dataVersion',
        //数据版本
        ACCOUNT: 'account',
        //玩家账号
        // TMP_DATA: 'tmpData',             //临时数据，不会存储到云盘
        HISTORY: "history",
        //关卡通关数据
        BAG: "bag" //玩家背包，即道具列表，字典类型

      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LanguageData.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, director;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      director = module.director;
    }],
    execute: function () {
      exports({
        init: _init,
        t: t,
        updateSceneRenderers: _updateSceneRenderers
      });

      cclegacy._RF.push({}, "b3f01X4Ik5LEbIPKXZr3JWD", "LanguageData", undefined);

      var _language = exports('_language', 'en');

      var ready = exports('ready', false);
      /**
       * 初始化
       * @param language 
       */

      function _init(language) {
        ready = exports('ready', true);
        _language = exports('_language', language); // console.log("init Language ",sys.language)
      }

      function t(key, changeData) {
        var win = window;

        if (!win.languages) {
          return key;
        }

        var searcher = key.split('.');
        var data = win.languages[_language];

        for (var i = 0; i < searcher.length; i++) {
          data = data[searcher[i]];

          if (!data) {
            return '';
          }
        }

        if (changeData) {
          for (var j in changeData) {
            data = data.replace('%{' + j + '}', changeData[j]);
          }
        }

        return data || '';
      }

      function _updateSceneRenderers() {
        // very costly iterations
        console.log("updateSceneRenderers===>>");
        var rootNodes = director.getScene().children; // walk all nodes with localize label and update

        var allLocalizedLabels = [];
        var allLocalizedSprites = [];
        var allLocalizedMaterial = [];

        for (var i = 0; i < rootNodes.length; ++i) {
          var labels = rootNodes[i].getComponentsInChildren('LocalizedLabel');
          Array.prototype.push.apply(allLocalizedLabels, labels);
          var sprites = rootNodes[i].getComponentsInChildren('LocalizedSprite');
          Array.prototype.push.apply(allLocalizedSprites, sprites);
          var meshs = rootNodes[i].getComponentsInChildren('LocalizedMaterial');
          Array.prototype.push.apply(allLocalizedMaterial, meshs);
        }

        for (var _i = 0; _i < allLocalizedLabels.length; ++_i) {
          var label = allLocalizedLabels[_i];
          if (!label.node.active) continue;
          label.updateLabel();
        } // walk all nodes with localize sprite and update


        for (var _i2 = 0; _i2 < allLocalizedSprites.length; ++_i2) {
          var sprite = allLocalizedSprites[_i2];
          if (!sprite.node.active) continue;
          sprite.updateSprite();
        }

        for (var _i3 = 0; _i3 < allLocalizedMaterial.length; ++_i3) {
          var mesh = allLocalizedMaterial[_i3];
          if (!mesh.node.active) continue;
          mesh.updateMat();
        }
      } // 供插件查询当前语言使用


      var win = window;
      win._languageData = {
        get language() {
          return _language;
        },

        init: function init(lang) {
          _init(lang);
        },
        updateSceneRenderers: function updateSceneRenderers() {
          console.log("updateSceneRenderers==>>>");

          _updateSceneRenderers();
        }
      };

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LocalizedRichText.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './LanguageData.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, RichText, Component, _applyDecoratedDescriptor, _inheritsLoose, _defineProperty, _assertThisInitialized, _initializerDefineProperty, ready, _init, t;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      RichText = module.RichText;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      ready = module.ready;
      _init = module.init;
      t = module.t;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "b4f8fGNVqdOXrbTz14+7pGb", "LocalizedRichText", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode;
      var LocalizedRichText = exports('LocalizedRichText', (_dec = ccclass('LocalizedRichText'), _dec(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LocalizedRichText, _Component);

        function LocalizedRichText() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "label", null);

          _initializerDefineProperty(_assertThisInitialized(_this), "key", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = LocalizedRichText.prototype;

        _proto.onLoad = function onLoad() {
          if (!ready) {
            _init('en');
          }

          this.fetchRender();
        };

        _proto.fetchRender = function fetchRender() {
          var label = this.getComponent(RichText);

          if (label) {
            this.label = label;
            this.updateLabel();
            return;
          }
        };

        _proto.updateLabel = function updateLabel() {
          this.label && (this.label.string = t(this.key));
        };

        return LocalizedRichText;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "key", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/fightHandGuide.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, TweenSystem, tween, Animation, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      TweenSystem = module.TweenSystem;
      tween = module.tween;
      Animation = module.Animation;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "b57f2U4+lFHWYmyeEfh9N8U", "fightHandGuide", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var FightHandGuide = exports('FightHandGuide', (_dec = ccclass('FightHandGuide'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FightHandGuide, _Component);

        function FightHandGuide() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "ani", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = FightHandGuide.prototype;

        _proto.moveOverCallback = function moveOverCallback(idx, callback) {
          if (callback) {
            callback(idx);
          }
        };

        _proto.showGuide = function showGuide(arrPath, callback) {
          var _this2 = this;

          this.node.setPosition(arrPath[0]);
          TweenSystem.instance.ActionManager.removeAllActionsFromTarget(this.node);

          if (callback) {
            callback(0);
          }

          this.ani.play('handDown');
          var action = tween(this.node);
          this.ani.once(Animation.EventType.FINISHED, function () {
            var _loop = function _loop(idx) {
              var posTarget = arrPath[idx];
              var posOrigin = arrPath[idx - 1];
              var dis = posTarget.clone().subtract(posOrigin).length();
              action.then(tween().to(dis / 150, {
                position: posTarget
              }).call(function () {
                _this2.moveOverCallback(idx, callback);
              }));
            };

            for (var idx = 1; idx < arrPath.length; idx++) {
              _loop(idx);
            }

            action.call(function () {
              _this2.ani.play('handUp');

              _this2.ani.once(Animation.EventType.FINISHED, function () {
                _this2.scheduleOnce(function () {
                  _this2.showGuide(arrPath, callback);
                }, 0.5);
              }, _this2);
            });
            action.start();
          }, this);
        };

        return FightHandGuide;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "ani", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/fightUI.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './constants.ts', './clientEvent.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './audioManager.ts', './fightProp.ts', './LanguageData.ts', './fightTarget.ts', './showTarget.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, UITransform, Vec3, instantiate, Animation, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil, constants, clientEvent, localConfig, playerData, uiManager, AudioManager, FightProp, t, FightTarget, ShowTarget;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      instantiate = module.instantiate;
      Animation = module.Animation;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      FightProp = module.FightProp;
    }, function (module) {
      t = module.t;
    }, function (module) {
      FightTarget = module.FightTarget;
    }, function (module) {
      ShowTarget = module.ShowTarget;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _temp;

      cclegacy._RF.push({}, "b70bahPE9BEa6kDxgxn3iLv", "fightUI", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var FightUI = exports('FightUI', (_dec = ccclass('FightUI'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FightUI, _Component);

        function FightUI() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeTargets", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "pfTarget", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbStep", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbLevel", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbScore", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "progress", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeProBar", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "arrStars", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "arrStarsBg", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodePropGroup", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "pfFightProp", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "nodeInfinite", _descriptor12, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "targetProgress", void 0);

          _defineProperty(_assertThisInitialized(_this), "_fightScene", void 0);

          _defineProperty(_assertThisInitialized(_this), "arrTargetNode", void 0);

          return _this;
        }

        var _proto = FightUI.prototype;

        _proto.start = function start() {
          this.startCustomerRandAction();
        };

        _proto.onEnable = function onEnable() {
          clientEvent.on('updateStep', this.updateStepInfo, this);
          clientEvent.on('updateScore', this.updateScore, this);
        };

        _proto.onDisable = function onDisable() {
          clientEvent.off('updateStep', this.updateStepInfo, this);
          clientEvent.off('updateScore', this.updateScore, this);
        };

        _proto.show = function show(fightScene) {
          this.targetProgress = null;
          this._fightScene = fightScene;
          this.initTargets();
          this.updateLevelInfo();
          this.updateStepInfo();
          this.updateScore();
          this.initProps();
          this.showInfinite();

          if (playerData.instance.score === 0 && this.progress.progress > 0) {
            this.progress.progress = 0;
            this.arrStars[0].active = false;
            this.arrStars[1].active = false;
            this.arrStars[2].active = false;
          }
        };

        _proto.updateLevelInfo = function updateLevelInfo() {
          this.lbLevel.string = playerData.instance.level;
        };

        _proto.updateStepInfo = function updateStepInfo(isInfinite) {
          if (isInfinite === false) {
            this.lbStep.node.active = false;

            this._fightScene.effectGroup.showUnlimitedOrNumber(this.nodeInfinite.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(0, 0, 0)), false, playerData.instance.spareStep);
          } else if (!playerData.instance.curLevelInfo.infinite && typeof isInfinite === 'undefined') {
            this.lbStep.node.active = true;
            this.lbStep.string = playerData.instance.spareStep;
          }
        };

        _proto.updateScore = function updateScore() {
          var score = playerData.instance.score;
          this.lbScore.string = score;
          var pro = 0;
          var stars = playerData.instance.arrStars;

          if (score < stars[0]) {
            pro = score / stars[0] * 0.33;
          } else if (score < stars[1]) {
            pro = 0.33 + (score - stars[0]) / (stars[1] - stars[0]) * 0.33;
          } else {
            pro = 0.67 + (score - stars[1]) / (stars[2] - stars[1]) * 0.33;

            if (pro >= 1) {
              pro = 1;
            }
          }

          this.targetProgress = pro;
        };

        _proto.initTargets = function initTargets() {
          this.nodeTargets.removeAllChildren();
          this.arrTargetNode = [];

          for (var target in playerData.instance.dictTargets) {
            var nodeTarget = instantiate(this.pfTarget);
            nodeTarget.parent = this.nodeTargets;
            nodeTarget.getComponent(FightTarget).show(target, true);
            this.arrTargetNode.push(nodeTarget);
          }
        };

        _proto.getTargetWorldPos = function getTargetWorldPos(cake) {
          for (var idx = 0; idx < this.arrTargetNode.length; idx++) {
            var nodeTarget = this.arrTargetNode[idx];
            var target = nodeTarget.getComponent(FightTarget);

            if (target.cake === cake) {
              return target.getCakeWorldPos();
            }
          }

          return null;
        };

        _proto.showTargetsAni = function showTargetsAni(callback) {
          var _this2 = this;

          resourceUtil.createUI('fight/showTarget', function (err, tagetNode) {
            if (err) {
              clientEvent.dispatchEvent('showTargetCake', 'all');
              return;
            }

            tagetNode.getComponent(ShowTarget).show(_this2, callback);
          }, this.node);
        };

        _proto.getStepWorldPos = function getStepWorldPos() {
          return this.lbStep.node.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(0, 0, 0));
        };

        _proto.getProgressBarWorldPos = function getProgressBarWorldPos() {
          var uiTra = this.nodeProBar.getComponent(UITransform);
          return uiTra.convertToWorldSpaceAR(new Vec3(uiTra.width, 0, 0));
        };

        _proto.onBtnSettingClick = function onBtnSettingClick() {
          uiManager.instance.showDialog('dialog/gameSetting');
        };

        _proto.onBtnQuestionClick = function onBtnQuestionClick() {
          uiManager.instance.showDialog('fight/fightGuide');
        };

        _proto.startCustomerRandAction = function startCustomerRandAction() {
          var _this3 = this;

          var time = 3 + Math.random() * 3;
          this.scheduleOnce(function () {
            if (_this3.arrTargetNode.length <= 0) {
              _this3.startCustomerRandAction();

              return;
            }

            var rand = Math.floor(Math.random() * _this3.arrTargetNode.length);
            var node = _this3.arrTargetNode[rand];
            node.getComponent(FightTarget).playIdle();

            _this3.startCustomerRandAction();
          }, time);
        };

        _proto.update = function update(dt) {
          if (this.targetProgress !== null) {
            var curPro = this.progress.progress;

            if (this.targetProgress !== curPro) {
              var prePro = curPro;

              if (this.targetProgress > curPro) {
                curPro += dt;
              } else {
                curPro -= dt;
              }

              if (this.targetProgress > 0) {
                curPro = curPro > this.targetProgress ? this.targetProgress : curPro;
              } else {
                curPro = curPro < 0 ? 0 : curPro;
              }

              this.progress.progress = curPro;

              if (curPro >= 1 && prePro < 1) {
                this.showStar(2);
              } else if (prePro >= 1 && curPro < 1) {
                this.arrStars[2].active = false;
              } else if (curPro >= 0.66 && (prePro < 0.66 || prePro >= 1)) {
                this.arrStars[0].active = true;

                if (prePro < 0.66) {
                  this.showStar(1);
                }
              } else if (curPro >= 0.33 && curPro < 0.66 && (prePro < 0.33 || prePro >= 0.66)) {
                this.arrStars[1].active = false;

                if (prePro < 0.33) {
                  this.showStar(0);
                }
              } else if (curPro < 0.33 && prePro >= 0.33) {
                this.arrStars[0].active = false;
                this.arrStars[1].active = false;
                this.arrStars[2].active = false;
              }
            }
          }
        };

        _proto.showStar = function showStar(idx) {
          var _this4 = this;

          if (this.arrStars[idx].active) {
            return; //已经展示过了
          }

          resourceUtil.createEffect('fight/homeStar/homeStar', function (err, node) {
            if (err) {
              _this4.arrStars[idx].active = true;
              return;
            }

            AudioManager.instance.playSound(constants.AUDIO_SOUND.FINISH_STAR, false);
            var ani = node.getComponent(Animation);
            ani.play('homeStarShow');
            ani.once(Animation.EventType.FINISHED, function () {
              node && node.destroy();
              _this4.arrStars[idx].active = true;
            });
          }, this.arrStarsBg[idx]);
        };

        _proto.initProps = function initProps() {
          this.nodePropGroup.removeAllChildren();
          this.onItemClick = this.onItemClick.bind(this);
          var tbProps = localConfig.instance.getTable('prop');

          for (var prop in tbProps) {
            var nodeProp = instantiate(this.pfFightProp);
            nodeProp.parent = this.nodePropGroup;
            var fightProp = nodeProp.getComponent(FightProp);
            fightProp.show(tbProps[prop]);
            fightProp.setClickListener(this.onItemClick);
          }
        };

        _proto.onItemClick = function onItemClick(prop, posWorld) {
          var amount = playerData.instance.getPropAmount(prop.ID);

          if (amount <= 0) {
            uiManager.instance.showTips(t('fight.propNoEnough'));
            return;
          }

          if (!this._fightScene.isPropCanUse(prop.ID)) {
            uiManager.instance.showTips(t('fight.propExceedMaxTimes'));
            return;
          }

          if (prop.ID === constants.PROP_ID.INFINITE) {
            this._fightScene.effectGroup.useInfiniteProp(posWorld, this.nodeInfinite.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(0, 0, 0)));
          }

          if (prop.ID === constants.PROP_ID.HAMMER || prop.ID === constants.PROP_ID.MAGIC) {
            this._fightScene.showPropOperationUI(prop, posWorld);
          } else {
            clientEvent.dispatchEvent('useProp', prop.ID);
          }
        };

        _proto.showInfinite = function showInfinite() {
          if (playerData.instance.curLevelInfo) {
            if (playerData.instance.curLevelInfo.infinite) {
              this.lbStep.node.active = false;
              this.nodeInfinite.active = true;
              return;
            }
          }

          this.lbStep.node.active = true;
          this.nodeInfinite.active = false;
        };

        _proto.showUnlockProp = function showUnlockProp(propId, callback) {
          var arrProp = this.nodePropGroup.children;
          var targetProp = arrProp[propId - 1];
          var targetWorldPos = targetProp.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(0, 0, 0));

          this._fightScene.effectGroup.showUnlockProp(targetWorldPos, propId, callback);
        };

        return FightUI;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "nodeTargets", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pfTarget", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbStep", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbLevel", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "lbScore", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "progress", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "nodeProBar", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "arrStars", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "arrStarsBg", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "nodePropGroup", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "pfFightProp", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "nodeInfinite", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/adProp.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './constants.ts', './uiManager.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, constants, uiManager, GameLogic;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      GameLogic = module.GameLogic;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "b82eaehqfxOHIyJ+LFuGZ1c", "adProp", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var AdProp = exports('AdProp', (_dec = ccclass('AdProp'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(AdProp, _Component);

        function AdProp() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "imgAd", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "imgShare", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndBtnGoStart", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spBtn", _descriptor4, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "callback", void 0);

          _defineProperty(_assertThisInitialized(_this), "rewardType", void 0);

          return _this;
        }

        var _proto = AdProp.prototype;

        _proto.show = function show(callback) {
          var _this2 = this;

          this.callback = callback;
          this.rewardType = constants.OPEN_REWARD_TYPE.AD;
          GameLogic.instance.getOpenRewardType(constants.SHARE_FUNCTION.START_REWARD, function (err, type) {
            if (!err) {
              _this2.rewardType = type;

              switch (type) {
                case constants.OPEN_REWARD_TYPE.AD:
                  _this2.spBtn.spriteFrame = _this2.imgAd;
                  break;

                case constants.OPEN_REWARD_TYPE.SHARE:
                  _this2.spBtn.spriteFrame = _this2.imgShare;
                  break;

                case constants.OPEN_REWARD_TYPE.NULL:
                  _this2.onBtnCloseClick(); //不支持奖励


                  break;
              }
            }
          });
          this.ndBtnGoStart.active = false;
          this.scheduleOnce(function () {
            _this2.ndBtnGoStart.active = true;
          }, constants.NORMAL_SHOW_TIME);
        };

        _proto.onBtnCloseClick = function onBtnCloseClick() {
          if (this.callback) {
            this.callback('close');
          }

          this.close();
        };

        _proto.onBtnPlayClick = function onBtnPlayClick() {
          var _this3 = this;

          if (this.rewardType === constants.OPEN_REWARD_TYPE.AD) {
            GameLogic.instance.showRewardAd(function (err) {
              if (!err) {
                _this3.close();

                if (_this3.callback) {
                  _this3.callback(null);
                }
              } else {
                if (_this3.callback) {
                  _this3.callback('failed', err);
                }
              }
            });
          } else {
            GameLogic.instance.share(constants.SHARE_FUNCTION.START_REWARD, {}, function (err) {
              if (!err) {
                _this3.close();
              }

              if (_this3.callback) {
                _this3.callback(err);
              }
            });
          }
        };

        _proto.close = function close() {
          uiManager.instance.hideDialog('fight/adProp');
        };

        return AdProp;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "imgAd", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "imgShare", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnGoStart", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "spBtn", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/setting.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './uiManager.ts', './audioManager.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, uiManager, AudioManager;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _temp;

      cclegacy._RF.push({}, "ba66atexAVHHJdMxg2byzWt", "setting", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Setting = exports('Setting', (_dec = ccclass('Setting'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Setting, _Component);

        function Setting() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "versionLabel", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndMusicOpen", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndMusicClose", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndSoundOpen", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndSoundClose", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spMusicIcon", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spSoundIcon", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfMusicOn", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfMusicOff", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfSoundOn", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfSoundOff", _descriptor11, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Setting.prototype;

        _proto.show = function show() {
          this.node.active = true;
          var isMusicOpen = AudioManager.instance.getAudioSetting(true);
          var isSoundOpen = AudioManager.instance.getAudioSetting(false);
          this.ndMusicOpen.active = !isMusicOpen;
          this.ndMusicClose.active = isMusicOpen;
          this.ndSoundOpen.active = !isSoundOpen;
          this.ndSoundClose.active = isSoundOpen; // this.versionLabel.string = 'Ver: ' + localConfig.instance.getVersion();

          this.spMusicIcon.spriteFrame = this.ndMusicOpen.active === true ? this.sfMusicOff : this.sfMusicOn;
          this.spSoundIcon.spriteFrame = this.ndSoundOpen.active === true ? this.sfSoundOff : this.sfSoundOn;
        };

        _proto.onBtnMusicOpenClick = function onBtnMusicOpenClick() {
          AudioManager.instance.openMusic();
          this.show();
        };

        _proto.onBtnMusicCloseClick = function onBtnMusicCloseClick() {
          AudioManager.instance.closeMusic();
          this.show();
        };

        _proto.onBtnSoundOpenClick = function onBtnSoundOpenClick() {
          AudioManager.instance.openSound();
          this.show();
        };

        _proto.onBtnSoundCloseClick = function onBtnSoundCloseClick() {
          AudioManager.instance.closeSound();
          this.show();
        };

        _proto.onBtnCloseClick = function onBtnCloseClick() {
          uiManager.instance.hideDialog('dialog/setting');
        };

        return Setting;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "versionLabel", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ndMusicOpen", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ndMusicClose", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ndSoundOpen", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "ndSoundClose", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "spMusicIcon", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "spSoundIcon", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "sfMusicOn", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "sfMusicOff", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "sfSoundOn", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "sfSoundOff", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/targetCake.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, resourceUtil;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "bd95fbKL6dI6r423PTMarGm", "targetCake", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var TargetCake = exports('TargetCake', (_dec = ccclass('TargetCake'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(TargetCake, _Component);

        function TargetCake() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "spCakeIcon", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbCakeNum", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = TargetCake.prototype;

        _proto.setInfo = function setInfo(cakeInfo) {
          var arrCakeInfo = cakeInfo.split('-');
          resourceUtil.setCakeIcon(arrCakeInfo[0], this.spCakeIcon, function () {});
          this.lbCakeNum.string = arrCakeInfo[1];
        };

        return TargetCake;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spCakeIcon", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbCakeNum", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LocalizedSprite.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './LanguageData.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, SpriteFrame, Component, _applyDecoratedDescriptor, _initializerDefineProperty, _inheritsLoose, _defineProperty, _assertThisInitialized, ready, _init, _language;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      SpriteFrame = module.SpriteFrame;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      ready = module.ready;
      _init = module.init;
      _language = module._language;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp, _dec3, _dec4, _class4, _class5, _descriptor3, _temp2;

      cclegacy._RF.push({}, "c05c25C4xNAupWYMB93tIzp", "LocalizedSprite", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode;
      var LocalizedSpriteItem = (_dec = ccclass('LocalizedSpriteItem'), _dec2 = property({
        type: SpriteFrame
      }), _dec(_class = (_class2 = (_temp = function LocalizedSpriteItem() {
        _initializerDefineProperty(this, "language", _descriptor, this);

        _initializerDefineProperty(this, "spriteFrame", _descriptor2, this);
      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "language", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 'en';
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spriteFrame", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class);
      var LocalizedSprite = exports('LocalizedSprite', (_dec3 = ccclass('LocalizedSprite'), _dec4 = property({
        type: [LocalizedSpriteItem]
      }), _dec3(_class4 = executeInEditMode(_class4 = (_class5 = (_temp2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LocalizedSprite, _Component);

        function LocalizedSprite() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "sprite", null);

          _initializerDefineProperty(_assertThisInitialized(_this), "spriteList", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = LocalizedSprite.prototype;

        _proto.onLoad = function onLoad() {
          if (!ready) {
            _init('zh');
          }

          this.fetchRender();
        };

        _proto.fetchRender = function fetchRender() {
          console.log("fetchRender===>>>");
          var sprite = this.getComponent('cc.Sprite');

          if (sprite) {
            this.sprite = sprite;
            this.updateSprite();
            return;
          }
        };

        _proto.updateSprite = function updateSprite() {
          for (var i = 0; i < this.spriteList.length; i++) {
            var item = this.spriteList[i];

            if (item.language === _language) {
              this.sprite.spriteFrame = item.spriteFrame;
              break;
            }
          }
        };

        return LocalizedSprite;
      }(Component), _temp2), _descriptor3 = _applyDecoratedDescriptor(_class5.prototype, "spriteList", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _class5)) || _class4) || _class4));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/gameSetting.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './sceneManager.ts', './uiManager.ts', './audioManager.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, SceneManager, uiManager, AudioManager, GameLogic;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      SceneManager = module.SceneManager;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      AudioManager = module.AudioManager;
    }, function (module) {
      GameLogic = module.GameLogic;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "c0ebf+rxRpMory9l2TqXwQ/", "gameSetting", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var gameSetting = exports('gameSetting', (_dec = ccclass('gameSetting'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(gameSetting, _Component);

        function gameSetting() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "ndMusicOpen", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndMusicClose", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndSoundOpen", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndSoundClose", _descriptor4, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = gameSetting.prototype;

        _proto.show = function show() {
          var isMusicOpen = AudioManager.instance.getAudioSetting(true);
          var isSoundOpen = AudioManager.instance.getAudioSetting(false);
          this.ndMusicOpen.active = !isMusicOpen;
          this.ndMusicClose.active = isMusicOpen;
          this.ndSoundOpen.active = !isSoundOpen;
          this.ndSoundClose.active = isSoundOpen;
        };

        _proto.onBtnHomeClick = function onBtnHomeClick() {
          SceneManager.instance.loadScene('pve', [], function (err, result) {
            if (err) {
              console.error(err.message || err);
              return;
            }
          });
        };

        _proto.onBtnPlayAgainBtn = function onBtnPlayAgainBtn() {
          this.onBtnCloseClick();
          GameLogic.instance.resetLevel();
        };

        _proto.onBtnMusicOpenClick = function onBtnMusicOpenClick() {
          AudioManager.instance.openMusic();
          this.show();
        };

        _proto.onBtnMusicCloseClick = function onBtnMusicCloseClick() {
          AudioManager.instance.closeMusic();
          this.show();
        };

        _proto.onBtnSoundOpenClick = function onBtnSoundOpenClick() {
          AudioManager.instance.openSound();
          this.show();
        };

        _proto.onBtnSoundCloseClick = function onBtnSoundCloseClick() {
          AudioManager.instance.closeSound();
          this.show();
        };

        _proto.onBtnCloseClick = function onBtnCloseClick() {
          uiManager.instance.hideDialog('dialog/gameSetting');
        };

        return gameSetting;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ndMusicOpen", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "ndMusicClose", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "ndSoundOpen", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "ndSoundClose", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/tips.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './poolManager.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Label, UIOpacity, UITransform, isValid, tween, Vec3, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, poolManager;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Label = module.Label;
      UIOpacity = module.UIOpacity;
      UITransform = module.UITransform;
      isValid = module.isValid;
      tween = module.tween;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      poolManager = module.poolManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "c93c6JdRlZBq6pCuKII6jKN", "tips", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var tips = exports('tips', (_dec = ccclass('tips'), _dec2 = property(Label), _dec3 = property(UIOpacity), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(tips, _Component);

        function tips() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "lbTips", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "UIOpacityBg", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = tips.prototype;

        _proto.show = function show(content, callback) {
          var _this$lbTips,
              _this$lbTips$node,
              _this$lbTips$node$get,
              _this2 = this;

          var size = (_this$lbTips = this.lbTips) === null || _this$lbTips === void 0 ? void 0 : (_this$lbTips$node = _this$lbTips.node) === null || _this$lbTips$node === void 0 ? void 0 : (_this$lbTips$node$get = _this$lbTips$node.getComponent(UITransform)) === null || _this$lbTips$node$get === void 0 ? void 0 : _this$lbTips$node$get.contentSize;

          if (!isValid(size)) {
            //size不存在，自我销毁
            poolManager.instance.putNode(this.node);
            return;
          }

          this.lbTips.string = content;
          this.UIOpacityBg.opacity = 255;
          this.node.setPosition(0, 220, 0);
          this.scheduleOnce(function () {
            tween(_this2.node).to(0.9, {
              position: new Vec3(0, 450, 0)
            }, {
              easing: 'smooth'
            }).call(function () {
              callback && callback();
              poolManager.instance.putNode(_this2.node);
            }).start();
            tween(_this2.UIOpacityBg).to(0.6, {
              opacity: 220
            }, {
              easing: 'smooth'
            }).to(0.3, {
              opacity: 0
            }, {
              easing: 'smooth'
            }).start();
          }, 0.8);
        };

        return tips;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbTips", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "UIOpacityBg", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/elasticLimit.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Node, EventTouch, Vec3, UITransform, ScrollView, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      EventTouch = module.EventTouch;
      Vec3 = module.Vec3;
      UITransform = module.UITransform;
      ScrollView = module.ScrollView;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "cad33aLu5lGpY9kxRqQAXUn", "elasticLimit", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ElasticLimit = exports('ElasticLimit', (_dec = ccclass('ElasticLimit'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_ScrollView) {
        _inheritsLoose(ElasticLimit, _ScrollView);

        function ElasticLimit() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _ScrollView.call.apply(_ScrollView, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "elasticValueX", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "elasticValueY", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ElasticLimit.prototype;

        _proto.onLoad = function onLoad() {
          this.node.on(Node.EventType.TOUCH_MOVE, this._onTouchMoved, this, true);
        };

        _proto._onTouchMoved = function _onTouchMoved(event, captureListeners) {
          if (!this.enabledInHierarchy) return;
          if (this._hasNestedViewGroup(event, captureListeners)) return;
          var touch = event.touch;

          if (this.content) {
            this._handleMoveLogic(touch);
          }

          if (!this.cancelInnerEvents) {
            return;
          }

          var deltaMove = touch.getLocation().subtract(touch.getStartLocation());

          if (deltaMove.length > 7) {
            if (!this._touchMoved && event.target !== this.node) {
              var cancelEvent = new EventTouch(event.getTouches(), event.bubbles, Node.EventType.TOUCH_CANCEL);
              cancelEvent.type = Node.EventType.TOUCH_CANCEL;
              cancelEvent.touch = event.touch;
              cancelEvent.simulate = true;
              event.target.dispatchEvent(cancelEvent);
              this._touchMoved = true;
            }
          }

          this._stopPropagationIfTargetIsMe(event);
        };

        _proto._handleMoveLogic = function _handleMoveLogic(touch) {
          //touch.getDelta() 获得的是Vec2 ,但在后面的逻辑中需要用用vec3.z ，web 或者小程序中 可以做为NaN来处理，但在ios mac 等平台会报错
          var del = touch.getDelta();
          var deltaMove = new Vec3(del.x, del.y, 0);

          this._processDeltaMove(deltaMove);
        };

        _proto._processDeltaMove = function _processDeltaMove(deltaMove) {
          this._scrollChildren(deltaMove);

          this._gatherTouchMove(deltaMove);
        };

        _proto._scrollChildren = function _scrollChildren(deltaMove) {
          this._clampDelta(deltaMove);

          var realMove = deltaMove;
          var outOfBoundary;

          if (this.elastic) {
            outOfBoundary = this._getHowMuchOutOfBoundary();
            realMove.x *= outOfBoundary.x === 0 ? 1 : this.elasticValueX;
            realMove.y *= outOfBoundary.y === 0 ? 1 : this.elasticValueY;
          }

          if (!this.elastic) {
            outOfBoundary = this._getHowMuchOutOfBoundary(realMove);
            realMove.add(outOfBoundary);
          }

          var scrollEventType = -1;
          var uiTraContent = this.content.getComponent(UITransform);
          var posContent = this.content.position;

          if (realMove.y > 0) {
            //up
            var icBottomPos = posContent.y - uiTraContent.anchorY * uiTraContent.height;

            if (icBottomPos + realMove.y > this._bottomBoundary) {
              scrollEventType = 'scroll-to-bottom';
            }
          } else if (realMove.y < 0) {
            //down
            var icTopPos = posContent.y - uiTraContent.anchorY * uiTraContent.height + uiTraContent.height;

            if (icTopPos + realMove.y <= this._topBoundary) {
              scrollEventType = 'scroll-to-top';
            }
          } else if (realMove.x < 0) {
            //left
            var icRightPos = posContent.x - uiTraContent.anchorX * uiTraContent.width + uiTraContent.width;

            if (icRightPos + realMove.x <= this._rightBoundary) {
              scrollEventType = 'scroll-to-right';
            }
          } else if (realMove.x > 0) {
            //right
            var icLeftPos = posContent.x - uiTraContent.anchorX * uiTraContent.width;

            if (icLeftPos + realMove.x >= this._leftBoundary) {
              scrollEventType = 'scroll-to-left';
            }
          }

          this._moveContent(realMove, false);

          if (realMove.x !== 0 || realMove.y !== 0) {
            if (!this._scrolling) {
              this._scrolling = true;

              this._dispatchEvent('scroll-began');
            }

            this._dispatchEvent('scrolling');
          }

          if (scrollEventType !== -1) {
            this._dispatchEvent(scrollEventType);
          }
        };

        return ElasticLimit;
      }(ScrollView), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "elasticValueX", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "elasticValueY", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.5;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/csvManager.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, _defineProperty, _createClass;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "d7554BuqnJLAKibwVUWte5P", "csvManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var CELL_DELIMITERS = [",", ";", "\t", "|", "^"];
      var LINE_DELIMITERS = ["\r\n", "\r", "\n"];

      var getterCast = function getterCast(value, index, cast, d) {
        if (cast instanceof Array) {
          if (cast[index] === "number") {
            return Number(d[index]);
          } else if (cast[index] === "boolean") {
            return d[index] === "true" || d[index] === "t" || d[index] === "1";
          } else {
            return d[index];
          }
        } else {
          if (!isNaN(Number(value))) {
            return Number(d[index]);
          } else if (value == "false" || value == "true" || value == "t" || value == "f") {
            return d[index] === "true" || d[index] === "t" || d[index] === "1";
          } else {
            return d[index];
          }
        }
      };

      var CSV = {
        //

        /* =========================================
            * Constants ===============================
            * ========================================= */
        STANDARD_DECODE_OPTS: {
          skip: 0,
          limit: false,
          header: false,
          cast: false,
          comment: ""
        },
        STANDARD_ENCODE_OPTS: {
          delimiter: CELL_DELIMITERS[0],
          newline: LINE_DELIMITERS[0],
          skip: 0,
          limit: false,
          header: false
        },
        quoteMark: '"',
        doubleQuoteMark: '""',
        quoteRegex: /"/g,

        /* =========================================
            * Utility Functions =======================
            * ========================================= */
        assign: function assign() {
          var args = Array.prototype.slice.call(arguments);
          var base = args[0];
          var rest = args.slice(1);

          for (var i = 0, len = rest.length; i < len; i++) {
            for (var attr in rest[i]) {
              base[attr] = rest[i][attr];
            }
          }

          return base;
        },
        map: function map(collection, fn) {
          var results = [];

          for (var i = 0, len = collection.length; i < len; i++) {
            results[i] = fn(collection[i], i);
          }

          return results;
        },
        getType: function getType(obj) {
          return Object.prototype.toString.call(obj).slice(8, -1);
        },
        getLimit: function getLimit(limit, len) {
          return limit === false ? len : limit;
        },
        buildObjectConstructor: function buildObjectConstructor(fields, sample, cast) {
          return function (d) {
            var object = new Object();

            var setter = function setter(attr, value) {
              return object[attr] = value;
            };

            if (cast) {
              fields.forEach(function (attr, idx) {
                setter(attr, getterCast(sample[idx], idx, cast, d));
              });
            } else {
              fields.forEach(function (attr, idx) {
                setter(attr, getterCast(sample[idx], idx, null, d));
              });
            } // body.push("return object;");
            // body.join(";\n");


            return object;
          };
        },
        buildArrayConstructor: function buildArrayConstructor(fields, sample, cast) {
          return function (d) {
            var row = new Array(sample.length);

            var setter = function setter(idx, value) {
              return row[idx] = value;
            };

            if (cast) {
              fields.forEach(function (attr, idx) {
                setter(attr, getterCast(sample[idx], idx, cast, d));
              });
            } else {
              fields.forEach(function (attr, idx) {
                setter(attr, getterCast(sample[idx], idx, null, d));
              });
            }

            return row;
          };
        },
        frequency: function frequency(coll, needle, limit) {
          if (limit === void 0) limit = false;
          var count = 0;
          var lastIndex = 0;
          var maxIndex = this.getLimit(limit, coll.length);

          while (lastIndex < maxIndex) {
            lastIndex = coll.indexOf(needle, lastIndex);
            if (lastIndex === -1) break;
            lastIndex += 1;
            count++;
          }

          return count;
        },
        mostFrequent: function mostFrequent(coll, needles, limit) {
          var max = 0;
          var detected;

          for (var cur = needles.length - 1; cur >= 0; cur--) {
            if (this.frequency(coll, needles[cur], limit) > max) {
              detected = needles[cur];
            }
          }

          return detected || needles[0];
        },
        unsafeParse: function unsafeParse(text, opts, fn) {
          var lines = text.split(opts.newline);

          if (opts.skip > 0) {
            lines.splice(opts.skip);
          }

          var fields;
          var constructor;

          function cells(lines) {
            var line = lines.shift();

            if (line.indexOf('"') >= 0) {
              // 含引号
              // 找到这行完整的数据, 找到对称的双引号
              var lastIndex = 0;
              var findIndex = 0;
              var count = 0;

              while (lines.length > 0) {
                lastIndex = line.indexOf('"', findIndex);
                if (lastIndex === -1 && count % 2 === 0) break;

                if (lastIndex !== -1) {
                  findIndex = lastIndex + 1;
                  count++;
                } else {
                  line = line + opts.newline + lines.shift();
                }
              }

              var list = [];
              var item;
              var quoteCount = 0;
              var start = 0;
              var end = 0;
              var length = line.length;

              for (var key in line) {
                if (!line.hasOwnProperty(key)) {
                  continue;
                }

                var numKey = parseInt(key);
                var value = line[key];

                if (numKey === 0 && value === '"') {
                  quoteCount++;
                  start = 1;
                }

                if (value === '"') {
                  quoteCount++;

                  if (line[numKey - 1] === opts.delimiter && start === numKey) {
                    start++;
                  }
                }

                if (value === '"' && quoteCount % 2 === 0) {
                  if (line[numKey + 1] === opts.delimiter || numKey + 1 === length) {
                    end = numKey;
                    item = line.substring(start, end);
                    list.push(item);
                    start = end + 2;
                    end = start;
                  }
                }

                if (value === opts.delimiter && quoteCount % 2 === 0) {
                  end = numKey;

                  if (end > start) {
                    item = line.substring(start, end);
                    list.push(item);
                    start = end + 1;
                    end = start;
                  } else if (end === start) {
                    list.push("");
                    start = end + 1;
                    end = start;
                  }
                }
              }

              end = length;

              if (end >= start) {
                item = line.substring(start, end);
                list.push(item);
              }

              return list;
            } else {
              return line.split(opts.delimiter);
            }
          }

          if (opts.header) {
            if (opts.header === true) {
              opts.comment = cells(lines); // 第一行是注释

              opts.cast = cells(lines); // 第二行是数据类型

              fields = cells(lines);
            } else if (this.getType(opts.header) === "Array") {
              fields = opts.header;
            }

            constructor = this.buildObjectConstructor(fields, lines[0].split(opts.delimiter), opts.cast);
          } else {
            constructor = this.buildArrayConstructor(fields, lines[0].split(opts.delimiter), opts.cast);
          }

          while (lines.length > 0) {
            var row = cells(lines);

            if (row.length > 1) {
              fn(constructor(row), fields[0]);
            }
          }

          return true;
        },
        safeParse: function safeParse(text, opts, fn) {
          var delimiter = opts.delimiter;
          var newline = opts.newline;
          var lines = text.split(newline);

          if (opts.skip > 0) {
            lines.splice(opts.skip);
          }

          return true;
        },
        encodeCells: function encodeCells(line, delimiter, newline) {
          var row = line.slice(0);

          for (var i = 0, len = row.length; i < len; i++) {
            if (row[i].indexOf(this.quoteMark) !== -1) {
              row[i] = row[i].replace(this.quoteRegex, this.doubleQuoteMark);
            }

            if (row[i].indexOf(delimiter) !== -1 || row[i].indexOf(newline) !== -1) {
              row[i] = this.quoteMark + row[i] + this.quoteMark;
            }
          }

          return row.join(delimiter);
        },
        encodeArrays: function encodeArrays(coll, opts, fn) {
          var delimiter = opts.delimiter;
          var newline = opts.newline;

          if (opts.header && this.getType(opts.header) === "Array") {
            fn(this.encodeCells(opts.header, delimiter, newline));
          }

          for (var cur = 0, lim = this.getLimit(opts.limit, coll.length); cur < lim; cur++) {
            fn(this.encodeCells(coll[cur], delimiter, newline));
          }

          return true;
        },
        encodeObjects: function encodeObjects(coll, opts, fn) {
          var delimiter = opts.delimiter;
          var newline = opts.newline;
          var header;
          var row;
          header = [];
          row = [];

          for (var key in coll[0]) {
            header.push(key);
            row.push(coll[0][key]);
          }

          if (opts.header === true) {
            fn(this.encodeCells(header, delimiter, newline));
          } else if (this.getType(opts.header) === "Array") {
            fn(this.encodeCells(opts.header, delimiter, newline));
          } //@ts-ignore


          fn(this.encodeCells(row, delimiter));

          for (var cur = 1, lim = this.getLimit(opts.limit, coll.length); cur < lim; cur++) {
            row = [];

            for (var key$1 = 0, len = header.length; key$1 < len; key$1++) {
              row.push(coll[cur][header[key$1]]);
            }

            fn(this.encodeCells(row, delimiter, newline));
          }

          return true;
        },
        parse: function parse(text, opts, fn) {
          var rows;

          if (this.getType(opts) === "Function") {
            fn = opts;
            opts = {};
          } else if (this.getType(fn) !== "Function") {
            rows = [];
            fn = rows.push.bind(rows);
          } else {
            rows = [];
          } //@ts-ignore


          opts = this.assign({}, this.STANDARD_DECODE_OPTS, opts); //@ts-ignore

          this.opts = opts;

          if (!opts.delimiter || !opts.newline) {
            var limit = Math.min(48, Math.floor(text.length / 20), text.length);
            opts.delimiter = opts.delimiter || this.mostFrequent(text, CELL_DELIMITERS, limit);
            opts.newline = opts.newline || this.mostFrequent(text, LINE_DELIMITERS, limit);
          } // modify by jl 由表自行控制不要含有双引号.提高解析效率


          return this.unsafeParse(text, opts, fn) && (rows.length > 0 ? rows : true);
        },
        encode: function encode(coll, opts, fn) {
          var lines;

          if (this.getType(opts) === "Function") {
            fn = opts;
            opts = {};
          } else if (this.getType(fn) !== "Function") {
            lines = [];
            fn = lines.push.bind(lines);
          } //@ts-ignore


          opts = this.assign({}, this.STANDARD_ENCODE_OPTS, opts);

          if (opts.skip > 0) {
            coll = coll.slice(opts.skip);
          }

          return (this.getType(coll[0]) === "Array" ? this.encodeArrays : this.encodeObjects)(coll, opts, fn) && (lines.length > 0 ? lines.join(opts.newline) : true);
        }
      };
      var CSVManager = exports('CSVManager', (_dec = ccclass("CSVManager"), _dec(_class = (_temp = _class2 = /*#__PURE__*/function () {
        function CSVManager() {
          _defineProperty(this, "_csvTables", {});

          _defineProperty(this, "_csvTableForArr", {});

          _defineProperty(this, "_tableCast", {});

          _defineProperty(this, "_tableComment", {});
        }

        var _proto = CSVManager.prototype;

        _proto.addTable = function addTable(tableName, tableContent, force) {
          if (this._csvTables[tableName] && !force) {
            return;
          }

          var tableData = {};
          var tableArr = [];
          var opts = {
            header: true
          };
          CSV.parse(tableContent, opts, function (row, keyName) {
            tableData[row[keyName]] = row;
            tableArr.push(row);
          });
          this._tableCast[tableName] = CSV.opts.cast;
          this._tableComment[tableName] = CSV.opts.comment;
          this._csvTables[tableName] = tableData;
          this._csvTableForArr[tableName] = tableArr; //this.csvTables[tableName].initFromText(tableContent);
        }
        /**
        * 根据表名获取表的所有内容
        * @param {string} tableName  表名
        * @returns {object} 表内容
        */
        ;

        _proto.getTableArr = function getTableArr(tableName) {
          return this._csvTableForArr[tableName];
        }
        /**
         * 根据表名获取表的所有内容
         * @param {string} tableName  表名
         * @returns {object} 表内容
         */
        ;

        _proto.getTable = function getTable(tableName) {
          return this._csvTables[tableName];
        }
        /**
         * 查询一条表内容
         * @param {string} tableName 表名
         * @param {string} key 列名
         * @param {any} value 值
         * @returns {Object} 一条表内容
         */
        ;

        _proto.queryOne = function queryOne(tableName, key, value) {
          var table = this.getTable(tableName);

          if (!table) {
            return null;
          }

          if (key) {
            for (var tbItem in table) {
              if (!table.hasOwnProperty(tbItem)) {
                continue;
              }

              if (table[tbItem][key] === value) {
                return table[tbItem];
              }
            }
          } else {
            return table[value];
          }
        }
        /**
         * 根据ID查询一条表内容
         * @param {string}tableName 表名
         * @param {string}ID
         * @returns {Object} 一条表内容
         */
        ;

        _proto.queryByID = function queryByID(tableName, ID) {
          //@ts-ignore
          return this.queryOne(tableName, null, ID);
        }
        /**
         * 查询key和value对应的所有行内容
         * @param {string} tableName 表名
         * @param {string} key 列名
         * @param {any} value 值
         * @returns {Object}
         */
        ;

        _proto.queryAll = function queryAll(tableName, key, value) {
          var table = this.getTable(tableName);

          if (!table || !key) {
            return null;
          }

          var ret = {};

          for (var tbItem in table) {
            if (!table.hasOwnProperty(tbItem)) {
              continue;
            }

            if (table[tbItem][key] === value) {
              ret[tbItem] = table[tbItem];
            }
          }

          return ret;
        }
        /**
         * 选出指定表里所有 key 的值在 values 数组中的数据，返回 Object，key 为 ID
         * @param {string} tableName 表名
         * @param {string} key  列名
         * @param {Array}values 数值
         * @returns 
         */
        ;

        _proto.queryIn = function queryIn(tableName, key, values) {
          var table = this.getTable(tableName);

          if (!table || !key) {
            return null;
          }

          var ret = {};
          var keys = Object.keys(table);
          var length = keys.length;

          for (var i = 0; i < length; i++) {
            var item = table[keys[i]];

            if (values.indexOf(item[key]) > -1) {
              ret[keys[i]] = item;
            }
          }

          return ret;
        }
        /**
         * 选出符合条件的数据。condition key 为表格的key，value 为值的数组。返回的object，key 为数据在表格的ID，value为具体数据
         * @param {string} tableName 表名
         * @param {any} condition 筛选条件
         * @returns 
         */
        ;

        _proto.queryByCondition = function queryByCondition(tableName, condition) {
          if (condition.constructor !== Object) {
            return null;
          }

          var table = this.getTable(tableName);

          if (!table) {
            return null;
          }

          var ret = {};
          var tableKeys = Object.keys(table);
          var tableKeysLength = tableKeys.length;
          var keys = Object.keys(condition);
          var keysLength = keys.length;

          for (var i = 0; i < tableKeysLength; i++) {
            var item = table[tableKeys[i]];
            var fit = true;

            for (var j = 0; j < keysLength; j++) {
              var key = keys[j];
              fit = fit && condition[key] === item[key] && !ret[tableKeys[i]];
            }

            if (fit) {
              ret[tableKeys[i]] = item;
            }
          }

          return ret;
        };

        _proto.queryOneByCondition = function queryOneByCondition(tableName, condition) {
          if (condition.constructor !== Object) {
            return null;
          }

          var table = this.getTable(tableName);

          if (!table) {
            return null;
          }

          var keys = Object.keys(condition);
          var keysLength = keys.length;

          for (var keyName in table) {
            var item = table[keyName];
            var fit = true;

            for (var j = 0; j < keysLength; j++) {
              var key = keys[j];
              fit = fit && condition[key] === item[key];
            }

            if (fit) {
              return item;
            }
          }

          return null;
        };

        _createClass(CSVManager, null, [{
          key: "instance",
          get: function get() {
            if (this._instance) {
              return this._instance;
            }

            this._instance = new CSVManager();
            return this._instance;
          }
        }]);

        return CSVManager;
      }(), _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/lottery.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './constants.ts', './clientEvent.ts', './utils.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './buttonEx.ts', './LanguageData.ts', './gameLogic.ts', './lotteryItem.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Node, Animation, Prefab, Label, Vec3, instantiate, tween, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil, constants, clientEvent, utils, localConfig, playerData, uiManager, ButtonEx, t, GameLogic, LotteryItem;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      Animation = module.Animation;
      Prefab = module.Prefab;
      Label = module.Label;
      Vec3 = module.Vec3;
      instantiate = module.instantiate;
      tween = module.tween;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      utils = module.utils;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      ButtonEx = module.ButtonEx;
    }, function (module) {
      t = module.t;
    }, function (module) {
      GameLogic = module.GameLogic;
    }, function (module) {
      LotteryItem = module.LotteryItem;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _temp;

      cclegacy._RF.push({}, "da336DqBNdPOLmRdGzIoRW8", "lottery", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Lottery = exports('Lottery', (_dec = ccclass('Lottery'), _dec2 = property(Node), _dec3 = property(Animation), _dec4 = property(Prefab), _dec5 = property(Label), _dec6 = property(Label), _dec7 = property(Label), _dec8 = property(Label), _dec9 = property(Node), _dec10 = property(Node), _dec11 = property(Node), _dec12 = property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Lottery, _Component);

        function Lottery() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "arrRewardNode", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "aniLightGroup", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "pfRewardItem", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbSpareTimes", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbAdSpareTimes", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbShareSpareTimes", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbGold", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndBtnStart", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndBtnAd", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndBtnShare", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndTurnable", _descriptor11, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "dictReward", {});

          _defineProperty(_assertThisInitialized(_this), "arrRewardData", []);

          _defineProperty(_assertThisInitialized(_this), "arrProbability", void 0);

          _defineProperty(_assertThisInitialized(_this), "times", void 0);

          _defineProperty(_assertThisInitialized(_this), "moreTimes", void 0);

          _defineProperty(_assertThisInitialized(_this), "isBtnStartShow", void 0);

          _defineProperty(_assertThisInitialized(_this), "randValue", void 0);

          _defineProperty(_assertThisInitialized(_this), "itemNode", void 0);

          return _this;
        }

        var _proto = Lottery.prototype;

        _proto.ctor = function ctor() {
          this.dictReward = {}; //存在预制件的字典

          this.arrRewardData = []; //存放lottery表数据的数组
        };

        _proto.show = function show() {
          var arrRewardInfo = [{
            x: 0,
            y: 53,
            angle: new Vec3(0, 0, -0)
          }, {
            x: 32,
            y: 44,
            angle: new Vec3(0, 0, -36)
          }, {
            x: 51,
            y: 15,
            angle: new Vec3(0, 0, -72)
          }, {
            x: 51,
            y: -18,
            angle: new Vec3(0, 0, -108)
          }, {
            x: 32,
            y: -46,
            angle: new Vec3(0, 0, -144)
          }, {
            x: 0,
            y: -56,
            angle: new Vec3(0, 0, 180)
          }, {
            x: -32.6,
            y: -45.7,
            angle: new Vec3(0, 0, 144)
          }, {
            x: -51,
            y: -18,
            angle: new Vec3(0, 0, 108)
          }, {
            x: -51,
            y: 15,
            angle: new Vec3(0, 0, 72)
          }, {
            x: -32,
            y: 42,
            angle: new Vec3(0, 0, 36)
          }];
          this.ndTurnable.children.forEach(function (item, idx) {
            var itemInfo = arrRewardInfo[idx];
            item.setPosition(itemInfo.x, itemInfo.y);
            item.eulerAngles = itemInfo.angle;
          });
          this.initReward();
          this.initInfo();
          this.updateGold();
        };

        _proto.onEnable = function onEnable() {
          clientEvent.on('updateGold', this.updateGold, this);
        };

        _proto.onDisable = function onDisable() {
          clientEvent.off('updateGold', this.updateGold, this);
        };

        _proto.initReward = function initReward() {
          var _this2 = this;

          if (this.arrRewardData.length <= 0) {
            var tbLottery = localConfig.instance.getTable('lottery');
            this.arrRewardData = utils.objectToArray(tbLottery);
          }

          this.arrProbability = [];
          var start = 0;
          this.arrRewardData.forEach(function (val, idx, arr) {
            var parentNode = _this2.arrRewardNode[idx];
            var rewardItem = _this2.dictReward[idx];

            if (!_this2.dictReward.hasOwnProperty(idx)) {
              rewardItem = instantiate(_this2.pfRewardItem);
              rewardItem.setPosition(0, -42, 0);
              rewardItem.parent = parentNode;
              _this2.dictReward[idx] = rewardItem;
            }

            if (_this2.arrRewardData.length > idx) {
              var info = _this2.arrRewardData[idx];
              var script = rewardItem.getComponent(LotteryItem);
              script.setInfo(info);
              var min = start;
              var max = start + info.probability;

              _this2.arrProbability.push({
                min: min,
                max: max,
                idx: idx
              }); //区间


              start = max;
            }
          });
        };

        _proto.initInfo = function initInfo() {
          this.times = playerData.instance.getLotterySpareTimes(false);
          this.moreTimes = playerData.instance.getLotterySpareTimes(true);
          this.lbSpareTimes.string = this.times + "/" + constants.LOTTERY_MAX_TIMES;
          this.lbAdSpareTimes.string = this.moreTimes + "/" + constants.LOTTERY_AD_MAX_TIMES;
          this.lbShareSpareTimes.string = this.moreTimes + "/" + constants.LOTTERY_AD_MAX_TIMES;
          this.checkBtnStatus();
        };

        _proto.checkBtnStatus = function checkBtnStatus() {
          if (this.times <= 0) {
            this.showBtnShareOrAd(); //显示分享或者广告按钮

            if (this.moreTimes <= 0) {
              this.ndBtnAd.getComponent(ButtonEx).interactable = false;
              this.ndBtnShare.getComponent(ButtonEx).interactable = false;
              this.lbAdSpareTimes.node.active = false;
              this.lbShareSpareTimes.node.active = false;
              resourceUtil.setGray(this.ndBtnAd, true);
              resourceUtil.setGray(this.ndBtnShare, true);
            }
          } else {
            this.ndBtnStart.active = true;
            this.ndBtnStart.getComponent(ButtonEx).interactable = true;
          }
        };

        _proto.updateGold = function updateGold() {
          this.lbGold.string = utils.formatMoney(playerData.instance.getGold());
        };

        _proto.onBtnStartClick = function onBtnStartClick() {
          this.showSelectUI(this.ndBtnStart, this.lbSpareTimes, false);
        };

        _proto.showSelectUI = function showSelectUI(node, label, isMore) {
          this.isBtnStartShow = true;
          node.getComponent(ButtonEx).interactable = false;

          for (var i in this.dictReward) {
            this.dictReward[i].getComponent(LotteryItem).setSelect(false);
          }

          playerData.instance.addLotteryTimes(isMore);

          if (isMore) {
            this.moreTimes = playerData.instance.getLotterySpareTimes(isMore);
            label.string = this.moreTimes + "/" + constants.LOTTERY_AD_MAX_TIMES;
          } else {
            this.times = playerData.instance.getLotterySpareTimes(isMore);
            label.string = this.times + "/" + constants.LOTTERY_MAX_TIMES;
          }

          clientEvent.dispatchEvent('updateLotterySpareTimes');
          this.randValue = this.getRandValue();
          this.aniLightGroup.play();
          this.startRun();
        };

        _proto.startRun = function startRun() {
          var _this3 = this;

          var targetAngle = 360;
          var eulZ = this.ndTurnable.eulerAngles.z;
          eulZ = eulZ % 360;
          this.ndTurnable.setRotationFromEuler(0, 0, eulZ);
          var offset = 360 - eulZ;
          var randTimes = 3 + Math.floor(Math.random() * 4); //旋转的随机次数

          tween(this.ndTurnable).to(offset / 360 + randTimes * 0.5, {
            eulerAngles: new Vec3(0, 0, targetAngle + randTimes * 360 + this.randValue * 36)
          }, {
            easing: 'circInOut'
          }).call(function () {
            _this3.showReward();
          }).start();
        };

        _proto.getRandValue = function getRandValue() {
          var randIdx = -1;
          var rand = Math.floor(Math.random() * 100);

          for (var i = 0; i < this.arrProbability.length; i++) {
            var probability = this.arrProbability[i];

            if (rand >= probability.min && rand < probability.max) {
              randIdx = probability.idx;
              break;
            }
          }

          if (randIdx !== -1) {
            return randIdx;
          }

          return this.getRandValue();
        };

        _proto.showReward = function showReward() {
          this.aniLightGroup.stop();
          this.itemNode = this.dictReward[this.randValue];
          var lotteryItemScript = this.itemNode.getComponent(LotteryItem);
          lotteryItemScript.setSelect(true);

          if (this.isBtnStartShow) {
            this.checkBtnStatus();
            this.isBtnStartShow = false;
          }
        };

        _proto.onBtnAddDiamondClick = function onBtnAddDiamondClick() {
          uiManager.instance.showTips(t('lottery.noChargePleaseWait'));
        };

        _proto.onBtnAdClick = function onBtnAdClick() {
          var _this4 = this;

          GameLogic.instance.showRewardAd(function (err) {
            if (!err) {
              _this4.showSelectUI(_this4.ndBtnAd, _this4.lbAdSpareTimes, true);
            }
          });
        };

        _proto.onBtnShareClick = function onBtnShareClick() {
          var _this5 = this;

          GameLogic.instance.share(constants.SHARE_FUNCTION.LOTTERY, {}, function (err) {
            if (!err) {
              _this5.showSelectUI(_this5.ndBtnShare, _this5.lbShareSpareTimes, true);
            }
          });
        };

        _proto.showBtnShareOrAd = function showBtnShareOrAd() {
          var _this6 = this;

          GameLogic.instance.getOpenRewardType(constants.SHARE_FUNCTION.LOTTERY, function (err, type) {
            if (!err) {
              switch (type) {
                case constants.OPEN_REWARD_TYPE.AD:
                  _this6.ndBtnStart.active = false;
                  _this6.ndBtnShare.active = false;
                  _this6.ndBtnAd.active = true;
                  _this6.ndBtnAd.getComponent(ButtonEx).interactable = true;
                  break;

                case constants.OPEN_REWARD_TYPE.SHARE:
                  _this6.ndBtnStart.active = false;
                  _this6.ndBtnAd.active = false;
                  _this6.ndBtnShare.active = true;
                  _this6.ndBtnShare.getComponent(ButtonEx).interactable = true;
                  break;

                case constants.OPEN_REWARD_TYPE.NULL:
                  _this6.ndBtnStart.active = true;
                  _this6.ndBtnStart.getComponent(ButtonEx).interactable = false;
                  resourceUtil.setGray(_this6.ndBtnStart, true); //这句话放在interactable后才生效

                  _this6.ndBtnAd.active = false;
                  _this6.ndBtnShare.active = false;
                  break;
              }
            }
          });
        };

        _proto.onBtnCloseClick = function onBtnCloseClick() {
          uiManager.instance.hideDialog('lottery/lottery');
        };

        return Lottery;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "arrRewardNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "aniLightGroup", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "pfRewardItem", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "lbSpareTimes", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "lbAdSpareTimes", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "lbShareSpareTimes", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "lbGold", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnStart", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnAd", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnShare", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "ndTurnable", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/buttonEx.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './constants.ts', './audioManager.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Button, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, constants, AudioManager;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Button = module.Button;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      AudioManager = module.AudioManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "e122fG1ssFILIO3WiAvp7JK", "buttonEx", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ButtonEx = exports('ButtonEx', (_dec = ccclass('ButtonEx'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Button) {
        _inheritsLoose(ButtonEx, _Button);

        function ButtonEx() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Button.call.apply(_Button, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "isPreventSecondClick", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "preventTime", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "isPlaySound", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = ButtonEx.prototype;

        _proto.start = function start() {
          var _this2 = this;

          var button = this.node.getComponent(Button);
          this.node.on('click', function (event) {
            if (_this2.isPreventSecondClick) {
              button.interactable = false;

              _this2.scheduleOnce(function () {
                if (button.node) button.interactable = true;
              }, _this2.preventTime);
            }

            if (_this2.isPlaySound) {
              AudioManager.instance.playSound(constants.AUDIO_SOUND.CLICK, false);
            }
          }, this);
        };

        return ButtonEx;
      }(Button), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "isPreventSecondClick", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return false;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "preventTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "isPlaySound", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/balanceFailed.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './sceneManager.ts', './playerData.ts', './uiManager.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, SceneManager, playerData, uiManager, GameLogic;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      SceneManager = module.SceneManager;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      GameLogic = module.GameLogic;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "e4928/nKARPlqGf+IiCXcgK", "balanceFailed", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var BalanceFailed = exports('BalanceFailed', (_dec = ccclass('BalanceFailed'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(BalanceFailed, _Component);

        function BalanceFailed() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "lbLevel", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = BalanceFailed.prototype;

        _proto.show = function show() {
          this.lbLevel.string = playerData.instance.level;
        };

        _proto.onBtnRetryClick = function onBtnRetryClick() {
          uiManager.instance.hideDialog('fight/balanceFailed');
          GameLogic.instance.resetLevel();
        };

        _proto.onBtnCloseClick = function onBtnCloseClick() {
          uiManager.instance.hideDialog('fight/balanceFailed');
          SceneManager.instance.loadScene('pve', [], function (err, result) {
            if (err) {
              console.error(err.message || err);
              return;
            }
          });
        };

        return BalanceFailed;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbLevel", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/poolManager.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, instantiate, NodePool, _defineProperty, _createClass;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      instantiate = module.instantiate;
      NodePool = module.NodePool;
    }, function (module) {
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "e4ab6T5/1VCqK/Vn+UcADNM", "poolManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var poolManager = exports('poolManager', (_dec = ccclass("poolManager"), _dec(_class = (_temp = _class2 = /*#__PURE__*/function () {
        function poolManager() {
          _defineProperty(this, "_dictPool", {});

          _defineProperty(this, "_dictPrefab", {});
        }

        var _proto = poolManager.prototype;
        /**
         * 根据预设从对象池中获取对应节点
         */

        _proto.getNode = function getNode(prefab, parent) {
          var name = prefab.name; //@ts-ignore

          if (!prefab.position) {
            //@ts-ignore
            name = prefab.data.name;
          }

          this._dictPrefab[name] = prefab;
          var node = null;

          if (this._dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            var pool = this._dictPool[name];

            if (pool.size() > 0) {
              node = pool.get();
            } else {
              node = instantiate(prefab);
            }
          } else {
            //没有对应对象池，创建他！
            var _pool = new NodePool();

            this._dictPool[name] = _pool;
            node = instantiate(prefab);
          }

          node.parent = parent;
          node.active = true;
          return node;
        }
        /**
         * 将对应节点放回对象池中
         */
        ;

        _proto.putNode = function putNode(node) {
          if (!node) {
            return;
          }

          var name = node.name;
          var pool = null;

          if (this._dictPool.hasOwnProperty(name)) {
            //已有对应的对象池
            pool = this._dictPool[name];
          } else {
            //没有对应对象池，创建他！
            pool = new NodePool();
            this._dictPool[name] = pool;
          }

          pool.put(node);
        }
        /**
         * 根据名称，清除对应对象池
         */
        ;

        _proto.clearPool = function clearPool(name) {
          if (this._dictPool.hasOwnProperty(name)) {
            var pool = this._dictPool[name];
            pool.clear();
          }
        }
        /**
        * 预生成对象池
        * @param prefab 
        * @param nodeNum 
        * 使用——poolManager.instance.prePool(prefab, 40);
        */
        ;

        _proto.prePool = function prePool(prefab, nodeNum) {
          var name = prefab.name;
          var pool = new NodePool();
          this._dictPool[name] = pool;

          for (var i = 0; i < nodeNum; i++) {
            var node = instantiate(prefab);
            pool.put(node);
          }
        };

        _createClass(poolManager, null, [{
          key: "instance",
          get:
          /* class member could be defined like this */
          // dummy = '';

          /* use `property` decorator if your want the member to be serializable */
          // @property
          // serializableDummy = 0;
          function get() {
            if (this._instance) {
              return this._instance;
            }

            this._instance = new poolManager();
            return this._instance;
          }
        }]);

        return poolManager;
      }(), _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/clientEvent.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, _defineProperty;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
    }, function (module) {
      _defineProperty = module.defineProperty;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "e55dbzBNn1NUrh8r5zusvCZ", "clientEvent", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var clientEvent = exports('clientEvent', (_dec = ccclass("clientEvent"), _dec(_class = (_temp = _class2 = /*#__PURE__*/function () {
        function clientEvent() {}
        /**
         * 监听事件
         * @param {string} eventName 事件名称
         * @param {function} handler 监听函数
         * @param {object} target 监听目标
         */


        clientEvent.on = function on(eventName, handler, target) {
          var objHandler = {
            handler: handler,
            target: target
          };
          var handlerList = clientEvent._handlers[eventName];

          if (!handlerList) {
            handlerList = [];
            clientEvent._handlers[eventName] = handlerList;
          }

          for (var i = 0; i < handlerList.length; i++) {
            if (!handlerList[i]) {
              handlerList[i] = objHandler;
              return i;
            }
          }

          handlerList.push(objHandler);
          return handlerList.length;
        };
        /**
         * 取消监听
         * @param {string} eventName 监听事件
         * @param {function} handler 监听函数
         * @param {object} target 监听目标
         */


        clientEvent.off = function off(eventName, handler, target) {
          var handlerList = clientEvent._handlers[eventName];

          if (!handlerList) {
            return;
          }

          for (var i = 0; i < handlerList.length; i++) {
            var oldObj = handlerList[i];

            if (oldObj.handler === handler && (!target || target === oldObj.target)) {
              handlerList.splice(i, 1);
              break;
            }
          }
        };
        /**
         * 分发事件
         * @param {string} eventName 分发事件名
         * @param  {...any} params 分发事件参数
         */


        clientEvent.dispatchEvent = function dispatchEvent(eventName) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          var handlerList = clientEvent._handlers[eventName];
          var args1 = [];
          var i;

          for (i = 1; i < arguments.length; i++) {
            args1.push(arguments[i]);
          }

          if (!handlerList) {
            return;
          }

          for (i = 0; i < handlerList.length; i++) {
            var objHandler = handlerList[i];

            if (objHandler.handler) {
              objHandler.handler.apply(objHandler.target, args1);
            }
          }
        };

        return clientEvent;
      }(), _defineProperty(_class2, "_handlers", {}), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/playerData.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './constants.ts', './clientEvent.ts', './constant.ts', './storageManager.ts', './utils.ts', './localConfig.ts', './sceneManager.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _defineProperty, _inheritsLoose, _assertThisInitialized, _createClass, constants, clientEvent, constant, StorageManager, utils, localConfig, SceneManager;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _defineProperty = module.defineProperty;
      _inheritsLoose = module.inheritsLoose;
      _assertThisInitialized = module.assertThisInitialized;
      _createClass = module.createClass;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      constant = module.constant;
    }, function (module) {
      StorageManager = module.StorageManager;
    }, function (module) {
      utils = module.utils;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      SceneManager = module.SceneManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "e5927B2lO9C6o5eLg2NmcKB", "playerData", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var playerData = exports('playerData', (_dec = ccclass("playerData"), _dec(_class = (_temp = _class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(playerData, _Component);

        function playerData() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "serverTime", 0);

          _defineProperty(_assertThisInitialized(_this), "localTime", 0);

          _defineProperty(_assertThisInitialized(_this), "spareStep", void 0);

          _defineProperty(_assertThisInitialized(_this), "curLevelInfo", void 0);

          _defineProperty(_assertThisInitialized(_this), "dictTargets", void 0);

          _defineProperty(_assertThisInitialized(_this), "score", void 0);

          _defineProperty(_assertThisInitialized(_this), "arrStars", void 0);

          _defineProperty(_assertThisInitialized(_this), "level", 1);

          _defineProperty(_assertThisInitialized(_this), "dataVersion", void 0);

          _defineProperty(_assertThisInitialized(_this), "isFirst", void 0);

          _defineProperty(_assertThisInitialized(_this), "balanceOverAdTimes", void 0);

          _defineProperty(_assertThisInitialized(_this), "_bag", null);

          _defineProperty(_assertThisInitialized(_this), "_userId", '');

          _defineProperty(_assertThisInitialized(_this), "_playerInfo", null);

          _defineProperty(_assertThisInitialized(_this), "_history", null);

          _defineProperty(_assertThisInitialized(_this), "_settings", null);

          _defineProperty(_assertThisInitialized(_this), "_isNewBee", false);

          _defineProperty(_assertThisInitialized(_this), "_dataVersion", '');

          return _this;
        }

        var _proto = playerData.prototype;
        /**
         * 加上用户数据
         */

        _proto.loadGlobalCache = function loadGlobalCache() {
          var userId = StorageManager.instance.getUserId();

          if (userId) {
            this._userId = userId;
          }
        }
        /**
         * 加载本地存储数据
         */
        ;

        _proto.loadFromCache = function loadFromCache() {
          //读取玩家基础数据
          this._playerInfo = this._loadDataByKey(constant.LOCAL_CACHE.PLAYER);
          this._history = this._loadDataByKey(constant.LOCAL_CACHE.HISTORY);
          this._settings = this._loadDataByKey(constant.LOCAL_CACHE.SETTINGS);
          this._bag = this._loadDataByKey(constant.LOCAL_CACHE.BAG);
        }
        /**
         * 获取本地存储数据
         * @param {string}keyName 
         * @returns 
         */
        ;

        _proto._loadDataByKey = function _loadDataByKey(keyName) {
          var ret = {};
          var str = StorageManager.instance.getConfigData(keyName);

          if (str) {
            try {
              ret = JSON.parse(str);
            } catch (e) {
              ret = {};
            }
          }

          return ret;
        }
        /**
         * 创建角色数据
         * @param loginData 
         */
        ;

        _proto.createPlayerInfo = function createPlayerInfo(loginData) {
          this._playerInfo = {
            diamond: 0,
            //钻石总数
            key: 0,
            //钥匙数量
            level: 1,
            //当前关卡
            createDate: new Date() //记录创建时间

          };
          this._isNewBee = true; //区分新老玩家

          if (loginData) {
            for (var key in loginData) {
              this._playerInfo[key] = loginData[key];
            }
          }

          this.savePlayerInfoToLocalCache();
        }
        /**
         * 生成随机账户
         * @returns
         */
        ;

        _proto.generateRandomAccount = function generateRandomAccount() {
          this.userId = "" + Date.now() + utils.getRandomInt(0, 1000);
          StorageManager.instance.setUserId(this._userId);
        }
        /**
         * 存用户数据
         * @param userId 
         */
        ;

        _proto.saveAccount = function saveAccount(userId) {
          this._userId = userId;
          StorageManager.instance.setUserId(userId);
        }
        /**
         * 保存玩家数据
         */
        ;

        _proto.savePlayerInfoToLocalCache = function savePlayerInfoToLocalCache() {
          StorageManager.instance.setConfigData(constant.LOCAL_CACHE.PLAYER, JSON.stringify(this._playerInfo));
        }
        /**
         * 保存玩家设置相关信息
         */
        ;

        _proto.saveSettingsToLocalCache = function saveSettingsToLocalCache() {
          StorageManager.instance.setConfigData(constant.LOCAL_CACHE.SETTINGS, JSON.stringify(this._settings));
        }
        /**
         * 当数据同步完毕，即被覆盖的情况下，需要将数据写入到本地缓存，以免数据丢失
         */
        ;

        _proto.saveAll = function saveAll() {
          StorageManager.instance.setConfigDataWithoutSave(constant.LOCAL_CACHE.PLAYER, JSON.stringify(this._playerInfo));
          StorageManager.instance.setConfigDataWithoutSave(constant.LOCAL_CACHE.HISTORY, JSON.stringify(this._history));
          StorageManager.instance.setConfigDataWithoutSave(constant.LOCAL_CACHE.SETTINGS, JSON.stringify(this._settings));
          StorageManager.instance.setConfigDataWithoutSave(constant.LOCAL_CACHE.BAG, JSON.stringify(this.bag));
          StorageManager.instance.setConfigData(constant.LOCAL_CACHE.DATA_VERSION, this._dataVersion);
        }
        /**
         * 更新用户信息
         * 例如钻石、金币、道具
         * @param {String} key
         * @param {Number} value
         */
        ;

        _proto.updatePlayerInfo = function updatePlayerInfo(key, value) {
          var isChanged = false;

          if (this._playerInfo.hasOwnProperty(key)) {
            if (typeof value === 'number') {
              isChanged = true;
              this._playerInfo[key] += value;

              if (this._playerInfo[key] < 0) {
                this._playerInfo[key] = 0;
              } //return;

            } else if (typeof value === 'boolean' || typeof value === 'string') {
              isChanged = true;
              this._playerInfo[key] = value;
            }
          } else {
            this._playerInfo[key] = value;
          }

          if (isChanged) {
            //有修改就保存到localcache
            StorageManager.instance.setConfigData(constant.LOCAL_CACHE.PLAYER, JSON.stringify(this._playerInfo));
          }
        }
        /**
         * 获取玩家杂项值
         * @param {string} key 
         */
        ;

        _proto.getSetting = function getSetting(key) {
          if (!this._settings) {
            return null;
          }

          if (!this._settings.hasOwnProperty(key)) {
            return null;
          }

          return this._settings[key];
        }
        /**
         * 设置玩家杂项值
         * @param {string} key 
         * @param {*} value 
         */
        ;

        _proto.setSetting = function setSetting(key, value) {
          if (!this._settings) {
            this._settings = {};
          }

          this._settings[key] = value;
          this.saveSettingsToLocalCache();
        }
        /**
         * 清除用户信息
         */
        ;

        _proto.clear = function clear() {
          this._playerInfo = {};
          this._settings = {};
          this.saveAll();
        }
        /**
         * 与上次登录时间超过一定分钟，就可以再次领取离线奖励。
         * @param checkRewardTime 
         * @returns 
         */
        ;

        _proto.isOpenOffLineReward = function isOpenOffLineReward(checkRewardTime) {
          var now = Date.now();
          var isOpen = false;

          if (!this.playerInfo.loginDate) {
            this.playerInfo.loginDate = Date.now();
          } else {
            isOpen = now - this.playerInfo.loginDate >= checkRewardTime;

            if (isOpen) {
              this.playerInfo.loginDate = now;
            }
          }

          this.savePlayerInfoToLocalCache();
          return isOpen;
        }
        /**
        * 获取在线奖励信息 
        */
        ;

        _proto.getOnlineRewardInfo = function getOnlineRewardInfo() {
          if (!this.playerInfo.hasOwnProperty('onlineRewardInfo')) {
            this.resetOnlineRewardInfo();
          } else {
            var isNeedRefreshReward = utils.getDeltaDays(this.playerInfo.onlineRewardInfo['loginTime'], Date.now()); //新的一天            

            if (isNeedRefreshReward > 0) {
              this.resetOnlineRewardInfo();
            }
          }

          return this.playerInfo.onlineRewardInfo;
        }
        /**
         * 重置在线奖励信息
         * value:{times: 当前已领取到了第几次奖励, receiveStatus: 领取状态(0不可领取1可领取)}
         * loginTime: 在线开始时间
         * used: 倒计时消耗时间
         */
        ;

        _proto.resetOnlineRewardInfo = function resetOnlineRewardInfo() {
          this.playerInfo.onlineRewardInfo = {};
          this.playerInfo.onlineRewardInfo['value'] = {
            times: 0,
            receiveStatus: constants.REWARD_STATUS.UNRECEIVABLE
          };
          this.playerInfo.onlineRewardInfo['loginTime'] = Date.now();
          this.playerInfo.onlineRewardInfo['usedTime'] = 0;
          this.savePlayerInfoToLocalCache();
        }
        /**
        * 刷新商城随机道具的信息
        */
        ;

        _proto.resetShopPropInfo = function resetShopPropInfo() {
          this.playerInfo.shopPropInfo = {};
          var dictProp = localConfig.instance.getTable('prop');

          if (!dictProp) {
            return false;
          }

          var arrPropKey = Object.keys(dictProp);
          var arrRandom = arrPropKey.filter(function (element) {
            return Number(element) !== constants.PROP_ID.INFINITE;
          });
          var randomVal = arrRandom[Math.floor(Math.random() * arrRandom.length)];
          this.playerInfo.shopPropInfo['createDate'] = Date.now();
          this.playerInfo.shopPropInfo['prop'] = randomVal;
          this.playerInfo.shopPropInfo['receiveStatus'] = constants.REWARD_STATUS.UNRECEIVABLE; //可领取或不可领取，用来切换状态

          this.savePlayerInfoToLocalCache();
        }
        /**
        * 更新商城随机道具的状态
        */
        ;

        _proto.updateShopPropInfo = function updateShopPropInfo(isReceived) {
          if (!this.playerInfo.shopPropInfo) {
            return;
          }

          if (isReceived) {
            this.resetShopPropInfo();
          } else {
            //时间到设置为可领取
            this.playerInfo.shopPropInfo['receiveStatus'] = constants.REWARD_STATUS.RECEIVABLE;
          }

          this.savePlayerInfoToLocalCache();
        }
        /**
        * 签到：更新签到领取日期，补签状态，如果超过7天则轮回
        */
        ;

        _proto.updateSignInCurrentDay = function updateSignInCurrentDay() {
          if (!this.playerInfo['signInInfo'] || this.isNeedRecycleSignInInfo()) {
            this.createNewSignInInfo();
          } else {
            var offectDays = utils.getDeltaDays(this.playerInfo['signInInfo']['signInDate'], Date.now()); //比较两个时间，为0则今天更新过

            if (offectDays === 0) {
              return;
            } //将昨天“补签后”但是没领取奖励重置为“补签”状态


            this.updateSignInFillSignInDays(0, true); //更新领取今日签到信息

            this.playerInfo['signInInfo'].currentDay += offectDays; //当测试时间差异的时候将当前的时间设置为第一天

            if (this.playerInfo['signInInfo'].currentDay <= 0) {
              this.createNewSignInInfo();
            }

            this.playerInfo['signInInfo'].currentDay > constants.MAX_SIGN_IN_REWARDS_DAY ? constants.MAX_SIGN_IN_REWARDS_DAY : this.playerInfo['signInInfo'].currentDay;
            this.playerInfo['signInInfo'].signInDate = Date.now();
          }

          this.savePlayerInfoToLocalCache();
        }
        /**
        * 签到：是否需要重新开始一个新的签到周期
        */
        ;

        _proto.isNeedRecycleSignInInfo = function isNeedRecycleSignInInfo() {
          if (!this.playerInfo['signInInfo']) {
            this.createNewSignInInfo();
          }

          var isNeedRecycled = false;
          var diffTime = utils.getDeltaDays(this.playerInfo['signInInfo'].createDate, Date.now());

          if (diffTime >= constants.MAX_SIGN_IN_REWARDS_DAY) {
            //当前日期与创建日期超过七天，1号7号相差6天，第8天进行更新
            isNeedRecycled = true;
          }

          return isNeedRecycled;
        }
        /**
         * 签到：创建新的签到信息
         * signInInfo: {
         *  createDate： 签到创建时间, 
         *  signInDate: 记录当前打开签到界面是第几天，用于更新今日签到日期
         *  currentDay： 当前日期，
         *  receivedDays： 已经领取的日期数组,
         *  afterFillSignInDays： 补签完了之后可领取的日期数组
         * } 
         */
        ;

        _proto.createNewSignInInfo = function createNewSignInInfo() {
          if (!this.playerInfo['signInInfo']) {
            this.playerInfo['signInInfo'] = {};
          }

          this.playerInfo['signInInfo'].createDate = Date.now();
          this.playerInfo['signInInfo'].signInDate = Date.now();
          this.playerInfo['signInInfo'].currentDay = 1;
          this.playerInfo['signInInfo'].receivedDays = [];
          this.playerInfo['signInInfo'].afterFillSignInDays = [];
          this.savePlayerInfoToLocalCache();
        }
        /**
         * 签到：更新补签后变为可领取的日期数组
         * @param {number} day 
         * @param {boolean} isClear 是否清空昨天补签完后还未领取的数组
         */
        ;

        _proto.updateSignInFillSignInDays = function updateSignInFillSignInDays(day, isClear) {
          var afterFillSignInDays = this.playerInfo['signInInfo']['afterFillSignInDays'];

          if (!isClear) {
            if (Array.isArray(afterFillSignInDays) && afterFillSignInDays.includes(day)) {
              return;
            } //记录领取天数


            afterFillSignInDays.push(Number(day));
          } else {
            afterFillSignInDays.length = 0;
          }

          this.savePlayerInfoToLocalCache();
        }
        /**
         * 签到：返回“当天”还有“全部”的签到奖励领取情况
         * 用来判断“领取按钮显示”，“登陆自动显示签到界面”和“红点提示”
         * @returns {boolean, boolean} isAllReceived是否全部领取， isTodayReceived是否当天已领取
         */
        ;

        _proto.getSignInReceivedInfo = function getSignInReceivedInfo() {
          if (!this.playerInfo['signInInfo']) {
            this.createNewSignInInfo();
          }

          var signInInfo = this.playerInfo['signInInfo'];
          var isAllReceived = false;
          var isTodayReceived = false;

          if (signInInfo.receivedDays.length < signInInfo.currentDay) {
            isAllReceived = false;
          } else {
            isAllReceived = true;
          }

          if (signInInfo.receivedDays.includes(signInInfo.currentDay)) {
            isTodayReceived = true;
          } else {
            isTodayReceived = false;
          }

          return {
            isAllReceived: isAllReceived,
            isTodayReceived: isTodayReceived
          };
        }
        /**
         * 获取当前在线奖励时间间隔
         */
        ;

        _proto.getCountdownTime = function getCountdownTime() {
          var onlineCurrentTimes = this.playerInfo['onlineRewardInfo'].value.times;
          var arrInterval = constants.ONLINE_REWARD_INTERVAL;
          var maxInterval = arrInterval.length - 1;
          onlineCurrentTimes = onlineCurrentTimes > maxInterval ? maxInterval : onlineCurrentTimes; //限制最大时间间隔

          var curInterval = arrInterval[onlineCurrentTimes];
          return curInterval;
        }
        /**
         * 更新在线奖励次数,状态,时间信息
         * 时间到了和点击领取时候调用
         */
        ;

        _proto.updateOnlineRewardInfo = function updateOnlineRewardInfo(isReceive) {
          if (!this.playerInfo.onlineRewardInfo) {
            return;
          }

          var onlineRewardValue = this.playerInfo.onlineRewardInfo['value'];

          if (isReceive) {
            //如果是点击领取则更新新的在线奖励内容
            onlineRewardValue.times += 1;
            onlineRewardValue.receiveStatus = constants.REWARD_STATUS.UNRECEIVABLE;
          } else {
            //倒计时结束，设置为可领取，并将倒计时消耗置为0
            onlineRewardValue.receiveStatus = constants.REWARD_STATUS.RECEIVABLE;
            this.playerInfo.onlineRewardInfo['usedTime'] = 0;
          }

          this.savePlayerInfoToLocalCache();
        }
        /**
         * 设置已经消耗过的时间
         */
        ;

        _proto.addUsedTime = function addUsedTime() {
          if (!this.playerInfo.onlineRewardInfo || SceneManager.instance.isStop) {
            return;
          }

          this.playerInfo.onlineRewardInfo['usedTime'] += 1; //秒

          this.savePlayerInfoToLocalCache();
        }
        /**
         * 签到：转化签到数据格式,新版本数据结构不一样
         */
        ;

        _proto.convertSignInDataFormat = function convertSignInDataFormat(info) {
          var arrValue = info.value.split('#');
          var arrReceivedDays = arrValue[1].split('|');
          arrReceivedDays.splice(arrReceivedDays.length - 1, 1);
          this.playerInfo['signInInfo'].createDate = info.signInDate - 24 * 60 * 60 * 1000 * Number(arrValue[0] - 1);
          this.playerInfo['signInInfo'].signInDate = info.signInDate;
          this.playerInfo['signInInfo'].currentDay = Number(arrValue[0]);
          this.playerInfo['signInInfo'].receivedDays = arrReceivedDays.map(Number);
          this.playerInfo['signInInfo'].afterFillSignInDays = [];
          delete info.value;
          this.savePlayerInfoToLocalCache();
        }
        /**
         * 完成连接
         * @param {String} cake 
         * @param {Number} finishValue 
         */
        ;

        _proto.finishLink = function finishLink(cake, finishValue) {
          this.reduceStep();
          this.finishTarget(cake, finishValue);
        };

        _proto.reduceStep = function reduceStep() {
          if (this.curLevelInfo.infinite) {
            return;
          }

          this.spareStep--;

          if (this.spareStep < 0) {
            this.spareStep = 0;
          }
        };

        _proto.finishTarget = function finishTarget(cake, finishValue) {
          if (this.dictTargets.hasOwnProperty(cake)) {
            this.dictTargets[cake] -= finishValue;

            if (this.dictTargets[cake] < 0) {
              this.dictTargets[cake] = 0;
            }
          }
        }
        /**
         * 检查关卡是否已经完成
         */
        ;

        _proto.isLevelFinish = function isLevelFinish() {
          var isFinish = true;

          for (var target in this.dictTargets) {
            if (this.dictTargets.hasOwnProperty(target)) {
              if (this.dictTargets[target] > 0) {
                isFinish = false;
                break;
              }
            }
          }

          return isFinish;
        }
        /**
         * 是否游戏结束
         */
        ;

        _proto.isGameOver = function isGameOver() {
          return this.spareStep <= 0;
        };

        _proto.startNewLevel = function startNewLevel() {
          var levelInfo = this.getCurrentLevelInfo();
          this.score = 0;
          this.spareStep = 0;
          this.curLevelInfo = {};
          this.curLevelInfo.startTime = Date.now();
          this.curLevelInfo.infinite = false;

          if (levelInfo) {
            this.spareStep = levelInfo.limit;
          }

          this.dictTargets = {};
          var arrTargets = levelInfo.targets.split('|');

          for (var idx = 0; idx < arrTargets.length; idx++) {
            var arrTargetObj = arrTargets[idx].split('-');
            this.dictTargets[arrTargetObj[0]] = Number(arrTargetObj[1]);
          }

          this.arrStars = levelInfo.stars.split('|');
        };

        _proto.getCurrentLevelInfo = function getCurrentLevelInfo() {
          var level = localConfig.instance.queryByID('level', this.level);

          if (level) {
            level.level = this.level;
          }

          return level;
        }
        /**
         * 增加钻石数量
         *
         * @param {Number} num
         */
        ;

        _proto.addDiamond = function addDiamond(num) {
          this.updatePlayerInfo('diamond', num);
        }
        /**
         * 增加金币数量
         *
         * @param {Number} num
         */
        ;

        _proto.addGold = function addGold(num) {
          this.updatePlayerInfo('gold', Number(num));
        }
        /**
         * 获得道具
         *
         * @param {number} propId
         * @param {number} num
         */
        ;

        _proto.addProp = function addProp(propId, num) {
          if (this._bag.hasOwnProperty(propId)) {
            var prop = this._bag[propId];
            prop.amount += num;
          } else {
            var _prop = {
              amount: num
            };
            this._bag[propId] = _prop;
          }

          this.addDataVersion();
          StorageManager.instance.setConfigData(constant.LOCAL_CACHE.BAG, JSON.stringify(this._bag));
          return true;
        }
        /**
         * 新增数据版本
         */
        ;

        _proto.addDataVersion = function addDataVersion() {
          var today = new Date().toLocaleDateString();
          var isAdd = false;

          if (this.dataVersion && typeof this.dataVersion === 'string') {
            var arrVersion = this.dataVersion.split('@');

            if (arrVersion.length >= 2) {
              if (arrVersion[0] === today) {
                this.dataVersion = today + '@' + (Number(arrVersion[1]) + 1);
                isAdd = true;
              }
            }
          }

          if (!isAdd) {
            this.dataVersion = today + '@1';
          }

          StorageManager.instance.setConfigDataWithoutSave(constants.LOCAL_CACHE.DATA_VERSION, this.dataVersion);
        }
        /**
         * 是否第一次点击更多游戏按钮
         * @param {boolean} isFirstClick 
         */
        ;

        _proto.isFirstClickMoreGame = function isFirstClickMoreGame(isFirstClick) {
          if (isFirstClick) {
            this.isFirst = isFirstClick;
          }

          return this.isFirst;
        }
        /**
         * 获得抽奖次数
         *
         * @param {Boolean} isMore
         */
        ;

        _proto.getLotterySpareTimes = function getLotterySpareTimes(isMore) {
          var maxTimes = constants.LOTTERY_MAX_TIMES;

          if (isMore) {
            maxTimes = constants.LOTTERY_AD_MAX_TIMES;
          }

          var now = utils.getDay();
          var lottery = this.getSetting(constants.SETTINGS_KEY.LOTTERY);

          if (!lottery) {
            lottery = {};
          }

          if (!lottery.today || lottery.today !== now) {
            lottery = {};
            lottery.today = {};
            this.setSetting(constants.SETTINGS_KEY.LOTTERY, lottery);
            return maxTimes;
          }

          var currentTimes = lottery.times;

          if (isMore) {
            currentTimes = lottery.moreTimes;
          }

          if (!currentTimes) {
            currentTimes = 0;
          }

          var spareTimes = maxTimes - currentTimes;
          return spareTimes > 0 ? spareTimes : 0;
        }
        /**
         * 是否有完成任务但是还未领取奖励，用于红点切换
         */
        ;

        _proto.isFinishTaskAndNoReceive = function isFinishTaskAndNoReceive() {
          if (!this.playerInfo || !this.playerInfo.dictTask) {
            return false;
          }

          for (var key in this.playerInfo.dictTask) {
            var task = this.playerInfo.dictTask[key];
            var taskInfo = localConfig.instance.queryByID('task', key);
            var taskStatus = this.getTaskStatusById(key);

            if (taskStatus.taskFinishCount >= taskInfo.count && taskStatus.taskState === constants.TASK_STATE.RECEIVABLE) {
              return true;
            }
          }

          return false;
        }
        /**
         * 获取当前每个任务的情况
         *
         * @param {String} id
         * @returns
         */
        ;

        _proto.getTaskStatusById = function getTaskStatusById(id) {
          if (!this.playerInfo || !this.playerInfo.hasOwnProperty('taskDate')) {
            return null;
          }

          var taskStatus = this.playerInfo.dictTask[id];
          return taskStatus = !taskStatus ? null : taskStatus;
        };

        _proto.getGold = function getGold() {
          if (!this.playerInfo.hasOwnProperty('gold')) {
            return 0;
          }

          return this.playerInfo.gold;
        }
        /**
         * 解析礼包结构，返回礼包内容
         *
         * @param {number} 礼包奖励子类型id
         */
        ;

        _proto.parseGift = function parseGift(giftId) {
          var objGift = localConfig.instance.queryByID('gift', giftId);

          if (!objGift) {
            return null;
          }

          var arrType = objGift.type.split('|').map(Number); //奖励类型

          var arrSubType = objGift.subType.split('|').map(Number); //奖励子类型

          var arrAmount = objGift.amount.split('|').map(Number); //类型对应数量

          var arrGift = [];
          arrType.forEach(function (val, idx, arr) {
            arrGift.push({
              type: val,
              subType: arrSubType[idx],
              amount: arrAmount[idx]
            });
          });
          return arrGift;
        }
        /**
         * 签到：更新领取奖励后已领取日期数组
         * @param {Number} day
         */
        ;

        _proto.updateSignInReceivedDays = function updateSignInReceivedDays(day) {
          var receivedDays = this.playerInfo['signInInfo']['receivedDays'];

          if (Array.isArray(receivedDays) && receivedDays.includes(day)) {
            return;
          } //记录领取天数


          receivedDays.push(Number(day));
          this.savePlayerInfoToLocalCache();
        }
        /**
         * 增加抽奖次数
         *
         * @param {Boolean} isMore
         * @param {Number} Times
         */
        ;

        _proto.addLotteryTimes = function addLotteryTimes(isMore, times) {
          if (!times) {
            times = 1;
          }

          var now = utils.getDay();
          var lottery = this.getSetting(constants.SETTINGS_KEY.LOTTERY);

          if (!lottery) {
            lottery = {};
          }

          if (!lottery.today || lottery.today !== now) {
            lottery = {};
            lottery.today = now;
          }

          if (!isMore) {
            if (lottery.times) {
              lottery.times += times; //普通领奖次数累加
            } else {
              lottery.times = times;
            }
          } else {
            if (lottery.moreTimes) {
              lottery.moreTimes += times; //看广告领奖次数累加
            } else {
              lottery.moreTimes = times;
            }
          }

          this.setSetting(constants.SETTINGS_KEY.LOTTERY, lottery);
        } //获得无限道具的分享/广告次数
        ;

        _proto.getInfiniteTimes = function getInfiniteTimes() {
          if (this.playerInfo.infiniteShareTimes) {
            return this.playerInfo.infiniteShareTimes;
          }

          return 0;
        };

        _proto.exchangeInfiniteProp = function exchangeInfiniteProp() {
          if (this.playerInfo.infiniteShareTimes >= constants.MAX_INFINITE_TIMES) {
            this.playerInfo.infiniteShareTimes -= constants.MAX_INFINITE_TIMES;
          } else {
            this.playerInfo.infiniteShareTimes = 0;
          }

          clientEvent.dispatchEvent('updateInfiniteShareTimes');
          this.savePlayerInfoToLocalCache();
        }
        /**
         * 获取玩家当前玩到的关卡
         */
        ;

        _proto.getCurrentLevel = function getCurrentLevel() {
          var history = utils.objectToArray(this.history);
          var length = history.length;

          if (length === 0) {
            return localConfig.instance.queryOne('level', 'name', '1');
          }

          history.sort(function (a, b) {
            return Number(a.levelId) - Number(b.levelId);
          });
          var last = history[length - 1];
          var curLevel = localConfig.instance.queryByID('level', parseInt(last.levelId).toString());
          var nextLevel = localConfig.instance.queryOne('level', 'name', String(parseInt(curLevel.name) + 1));

          if (!nextLevel || last.star === 0) {
            // 关卡必须前一关获得至少1星才可以挑战下一关
            return curLevel;
          }

          return nextLevel;
        }
        /**
         * 获得关卡最高分
         *
         * @param {Number} level
         * @returns
         */
        ;

        _proto.getHighestScoreByLevel = function getHighestScoreByLevel(level) {
          if (this.history.hasOwnProperty(level)) {
            return this.history[level].score;
          }

          return 0;
        }
        /**
         * 获取道具剩余数量
         * 
         * @param {Number} propId 道具id
         */
        ;

        _proto.getPropAmount = function getPropAmount(propId) {
          if (this.bag.hasOwnProperty(propId)) {
            return this.bag[propId].amount || 0; //考虑undefined所以加或0
          }

          return 0;
        }
        /**
         * 道具是否解锁 (控制道具的显示隐藏)
         * @param {number} propId 
         */
        ;

        _proto.isPropUnlock = function isPropUnlock(propId) {
          var higestLevel = this.getCurrentLevel().ID;

          if (!this.playerInfo.hasOwnProperty('unLockInfo')) {
            this.getUnLockInfo();
          }

          return higestLevel > 1 && this.playerInfo.unLockInfo.includes(propId);
        } //获得解锁道具信息
        ;

        _proto.getUnLockInfo = function getUnLockInfo() {
          if (!this.playerInfo.hasOwnProperty('unLockInfo')) {
            var higestLevel = this.getCurrentLevel().ID;
            var arrUnlockProp = constants.UNLOCK_PROP_ID;
            var start = 0,
                end = higestLevel - 1;
            this.playerInfo.unLockInfo = arrUnlockProp.slice(start, end);
            this.savePlayerInfoToLocalCache();
          }

          return this.playerInfo.unLockInfo;
        };

        _proto.addStep = function addStep(addValue) {
          this.spareStep += addValue;
        }
        /**
         * 是否需要打开解锁界面
         */
        ;

        _proto.isNeedOpenUnlockPanel = function isNeedOpenUnlockPanel() {
          //当前关卡的等级,不一定是最高的那一关
          var curLevel = this.getCurrentLevelInfo().ID;

          if (curLevel > 1 && curLevel <= constants.UNLOCK_HIGEST_LEVEl) {
            //关卡对应的道具
            var curProp = constants.UNLOCK_PROP_ID[curLevel - 2];

            if (!this.playerInfo.hasOwnProperty('unLockInfo')) {
              this.getUnLockInfo();
            }

            var isPropUnlock = this.isPropUnlock(curProp);

            if (!isPropUnlock) {
              return true;
            }
          }

          return false;
        };

        _proto.hasSeenGuide = function hasSeenGuide() {
          return this.playerInfo.hasSeenGuide;
        };

        _proto.finishSeenGuide = function finishSeenGuide() {
          this.playerInfo.hasSeenGuide = true;
          this.updatePlayerInfo('hasSeenGuide', true);
        }
        /**
         * 消耗道具
         *
         * @param {number} propId
         */
        ;

        _proto.costProp = function costProp(propId) {
          if (!this.bag.hasOwnProperty(propId)) {
            return false;
          }

          var prop = this.bag[propId];

          if (prop <= 0) {
            return false; //数量不足
          }

          prop.amount--;
          this.addDataVersion();
          StorageManager.instance.setConfigData(constant.LOCAL_CACHE.BAG, JSON.stringify(this.bag));
          return true;
        }
        /**
         * 增加分数
         * @param {Number} score 
         */
        ;

        _proto.addScore = function addScore(score) {
          this.score += score;
        }
        /**
         * 通过目标类型获得目标值
         * @param {String} cake 
         */
        ;

        _proto.getTargetValue = function getTargetValue(cake) {
          if (this.dictTargets.hasOwnProperty(cake)) {
            return this.dictTargets[cake];
          }

          return 0;
        }
        /**
         * 更新已解锁道具
         */
        ;

        _proto.updateUnLockInfo = function updateUnLockInfo(propId) {
          var arrUnLockProp = this.playerInfo.unLockInfo;

          if (!arrUnLockProp.includes(propId)) {
            arrUnLockProp.push(propId);
            this.savePlayerInfoToLocalCache();
          } else {
            return;
          }
        };

        _proto.finishLevel = function finishLevel(level, score) {
          var star = 0;
          var levelInfo = localConfig.instance.queryByID('level', level);
          var costTime = (Date.now() - this.curLevelInfo.startTime) / 1000;

          if (levelInfo) {
            var arrStars = levelInfo.stars.split('|');

            if (score >= arrStars[2]) {
              star = 3;
            } else if (score >= arrStars[1]) {
              star = 2;
            } else if (score >= arrStars[0]) {
              star = 1;
            }
          }

          var preStar = 0;

          if (this.history.hasOwnProperty(level)) {
            preStar = this.history[level].star;

            if (this.history[level].score < score) {
              this.history[level].score = score;
              this.history[level].star = star;
              this.history[level].costTime = costTime;
            }
          } else {
            this.history[level] = {
              levelId: level,
              score: score,
              star: star,
              costTime: costTime
            };
          }

          StorageManager.instance.setConfigData(constant.LOCAL_CACHE.HISTORY, JSON.stringify(this.history)); //加金币

          var arrGolds = levelInfo.golds.split('|');
          var gold = 0;

          for (var idxStar = preStar; idxStar < star; idxStar++) {
            gold += Number(arrGolds[idxStar]);
          }

          if (gold > 0) {
            this.addGold(gold);
            clientEvent.dispatchEvent('updateGold');
          }

          return {
            levelId: level,
            score: score,
            star: star,
            gold: gold,
            costTime: costTime,
            spareStep: this.spareStep
          };
        };

        _proto.nextLevel = function nextLevel() {
          this.level++;
          this.startNewLevel();
        };

        _createClass(playerData, [{
          key: "bag",
          get: function get() {
            return this._bag;
          }
        }, {
          key: "userId",
          get: function get() {
            return this._userId;
          },
          set: function set(v) {
            this._userId = v;
          }
        }, {
          key: "settings",
          get: function get() {
            return this._settings;
          },
          set: function set(v) {
            this._settings = v;
          }
        }, {
          key: "playerInfo",
          get: function get() {
            return this._playerInfo;
          }
        }, {
          key: "history",
          get: function get() {
            return this._history;
          }
        }, {
          key: "isNewBee",
          get: function get() {
            return this._isNewBee;
          },
          set: function set(v) {
            this._isNewBee = v;
          }
        }], [{
          key: "instance",
          get: function get() {
            if (this._instance) {
              return this._instance;
            }

            this._instance = new playerData();
            return this._instance;
          }
        }]);

        return playerData;
      }(Component), _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/propItem.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './constants.ts', './clientEvent.ts', './playerData.ts', './uiManager.ts', './buttonEx.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil, constants, clientEvent, playerData, uiManager, ButtonEx;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      ButtonEx = module.ButtonEx;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "e7ad36HvgtJMJhvgKYrltrK", "propItem", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var PropItem = exports('PropItem', (_dec = ccclass('PropItem'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(PropItem, _Component);

        function PropItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "lbPropNum", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spPropIcon", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "propInfo", void 0);

          _defineProperty(_assertThisInitialized(_this), "propPrice", void 0);

          return _this;
        }

        var _proto = PropItem.prototype;

        _proto.start = function start() {
          this.updateUnlockProp();
        };

        _proto.onEnable = function onEnable() {
          clientEvent.on('updateProp', this.updateProp, this);
          clientEvent.on('updateUnlockProp', this.updateUnlockProp, this);
        };

        _proto.onDisable = function onDisable() {
          clientEvent.off('updateProp', this.updateProp, this);
          clientEvent.off('updateUnlockProp', this.updateUnlockProp, this);
        };

        _proto.setInfo = function setInfo(propInfo) {
          this.propInfo = propInfo;
          var propNum = playerData.instance.getPropAmount(propInfo.ID);

          if (propNum <= 0) {
            propNum = '+';
          }

          this.lbPropNum.string = propNum;
          resourceUtil.setPropIcon(propInfo.icon, this.spPropIcon, function () {});
          this.propPrice = propInfo.price;
        };

        _proto.onPropItemClick = function onPropItemClick() {
          uiManager.instance.showDialog('props/buy', [this.propInfo.ID, constants.ANALYTICS_TYPE.CHECKPOINT_PROP_BUY_NUM]);
        };

        _proto.updateProp = function updateProp(propId) {
          if (propId === this.propInfo.ID) {
            this.setInfo(this.propInfo);
          }
        };

        _proto.updateUnlockProp = function updateUnlockProp() {
          var isPropUnlock = playerData.instance.isPropUnlock(this.propInfo.ID);
          this.node.getComponent(ButtonEx).interactable = isPropUnlock;
          resourceUtil.setGray(this.node, !isPropUnlock);
        };

        return PropItem;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "lbPropNum", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "spPropIcon", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/shop.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './constants.ts', './clientEvent.ts', './utils.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './buttonEx.ts', './shopPropsOperation.ts', './shopItem.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, instantiate, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil, constants, clientEvent, utils, localConfig, playerData, uiManager, ButtonEx, ShopPropsOperation, ShopItem;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      instantiate = module.instantiate;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      utils = module.utils;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      ButtonEx = module.ButtonEx;
    }, function (module) {
      ShopPropsOperation = module.ShopPropsOperation;
    }, function (module) {
      ShopItem = module.ShopItem;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _temp;

      cclegacy._RF.push({}, "ece87xczkNChrPYtwiev9Te", "shop", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Shop = exports('Shop', (_dec = ccclass('Shop'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Shop, _Component);

        function Shop() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "arrMenu", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "pbShopItem", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbGold", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "aniLight", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndShopPropsOperation", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spRandPropIcon", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbRandPropNumber", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndBtnReceive", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spReceive", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfReceive", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfShare", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfAd", _descriptor12, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "arrShopItemScript", void 0);

          _defineProperty(_assertThisInitialized(_this), "animState", void 0);

          _defineProperty(_assertThisInitialized(_this), "randomItem", void 0);

          _defineProperty(_assertThisInitialized(_this), "shopPropsOperationScript", void 0);

          return _this;
        }

        var _proto = Shop.prototype;

        _proto.ctor = function ctor() {
          this.arrShopItemScript = [];
        };

        _proto.onEnable = function onEnable() {
          clientEvent.on('updateGold', this.updateGold, this);
          clientEvent.on('updateShopPropInfo', this.showShopProp, this);
        };

        _proto.onDisable = function onDisable() {
          clientEvent.off('updateGold', this.updateGold, this);
          clientEvent.off('updateShopPropInfo', this.showShopProp, this);
        };

        _proto.show = function show() {
          this.updateGold();
          this.init();
          this.animState = 'shopPropertyIdle';
          this.aniLight.play(this.animState);
          this.showShopProp(); // this.spReceive.spriteFrame = this.sfReceive;
        };

        _proto.showShopProp = function showShopProp() {
          var shopPropInfo = playerData.instance.playerInfo.shopPropInfo;
          var dictProp = localConfig.instance.getTable('prop');
          this.randomItem = dictProp[shopPropInfo.prop];
          resourceUtil.setPropIcon(this.randomItem.icon, this.spRandPropIcon, function () {});
          this.lbRandPropNumber.string = '1';

          switch (shopPropInfo.receiveStatus) {
            case constants.REWARD_STATUS.UNRECEIVABLE:
              this.ndBtnReceive.getComponent(ButtonEx).interactable = false;
              break;

            case constants.REWARD_STATUS.RECEIVABLE:
              this.ndBtnReceive.getComponent(ButtonEx).interactable = true;
              break;
          }
        };

        _proto.init = function init() {
          var _this2 = this;

          this.shopPropsOperationScript = this.ndShopPropsOperation.getComponent(ShopPropsOperation);

          if (!this.arrShopItemScript) {
            this.arrShopItemScript = [];
          }

          var dictShop = localConfig.instance.getTable('prop');
          var arrShop = utils.objectToArray(dictShop);
          arrShop.forEach(function (item, idx, arr) {
            var _node;

            var node = null;

            if (_this2.arrMenu[idx].getChildByName('shopItem')) {
              node = _this2.arrMenu[idx].getChildByName('shopItem');
            } else {
              node = instantiate(_this2.pbShopItem);
              node.parent = _this2.arrMenu[idx];
            }

            var shopItemScript = (_node = node) === null || _node === void 0 ? void 0 : _node.getComponent(ShopItem);
            shopItemScript === null || shopItemScript === void 0 ? void 0 : shopItemScript.setInfo(item, _this2);

            if (idx === 0) {
              shopItemScript === null || shopItemScript === void 0 ? void 0 : shopItemScript.showSelect();
            }

            if (!_this2.arrShopItemScript.includes(shopItemScript)) {
              _this2.arrShopItemScript.push(shopItemScript);
            }
          });
        };

        _proto.updateGold = function updateGold() {
          this.lbGold.string = utils.formatMoney(playerData.instance.getGold());
        };

        _proto.onBtnCloseClick = function onBtnCloseClick() {
          uiManager.instance.hideDialog('shop/shop');
        };

        _proto.showAllItemUnSelect = function showAllItemUnSelect() {
          this.arrShopItemScript.forEach(function (element) {
            element.showUnSelect();
          });
        };

        _proto.onBtnReceiveClick = function onBtnReceiveClick() {
          this.showRandPropSecelt();
          this.shopPropsOperationScript.show(this.randomItem['ID']);
          this.showReward();
        };

        _proto.onRandPropClick = function onRandPropClick() {
          this.showRandPropSecelt();
          this.shopPropsOperationScript.show(this.randomItem['ID']);
        };

        _proto.showRandPropSecelt = function showRandPropSecelt() {
          this.showAllItemUnSelect();
          this.animState = 'shopPropertySelect';
          this.aniLight.play(this.animState);
        };

        _proto.hideRandPropSelect = function hideRandPropSelect() {
          if (this.animState === 'shopPropertyIdle') return;
          this.animState = 'shopPropertyIdle';
          this.aniLight.play(this.animState);
        };

        _proto.showReward = function showReward() {
          var itemInfo = {};
          itemInfo['itemType'] = constants.REWARD_TYPE.PROP;
          itemInfo['itemSubType'] = this.randomItem.ID;
          itemInfo['itemAmount'] = 1;
          uiManager.instance.showDialog('lottery/reward', [itemInfo, false, constants.SHARE_FUNCTION.SHOP_PROP]);
          playerData.instance.updateShopPropInfo(true);
          this.showShopProp();
          clientEvent.dispatchEvent('updateShopPropInfo');
          this.showRandPropSecelt();
          this.shopPropsOperationScript.show(this.randomItem['ID']);
        };

        return Shop;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "arrMenu", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pbShopItem", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "lbGold", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "aniLight", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "ndShopPropsOperation", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "spRandPropIcon", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "lbRandPropNumber", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ndBtnReceive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "spReceive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "sfReceive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "sfShare", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "sfAd", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/LocalizedLabel.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './LanguageData.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Component, _applyDecoratedDescriptor, _inheritsLoose, _defineProperty, _assertThisInitialized, _initializerDefineProperty, ready, _init, t;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _defineProperty = module.defineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      ready = module.ready;
      _init = module.init;
      t = module.t;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "edf98QH2D1AUoCrtQlbxFrU", "LocalizedLabel", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property,
          executeInEditMode = _decorator.executeInEditMode;
      var LocalizedLabel = exports('LocalizedLabel', (_dec = ccclass('LocalizedLabel'), _dec(_class = executeInEditMode(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LocalizedLabel, _Component);

        function LocalizedLabel() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _defineProperty(_assertThisInitialized(_this), "label", null);

          _initializerDefineProperty(_assertThisInitialized(_this), "key", _descriptor, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = LocalizedLabel.prototype;

        _proto.onLoad = function onLoad() {
          if (!ready) {
            _init('en');
          }

          this.fetchRender();
        };

        _proto.fetchRender = function fetchRender() {
          var label = this.getComponent('cc.Label');

          if (label) {
            this.label = label;
            this.updateLabel();
            return;
          }
        };

        _proto.updateLabel = function updateLabel() {
          this.label && (this.label.string = t(this.key));
        };

        return LocalizedLabel;
      }(Component), _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "key", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return '';
        }
      }), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/configuration.ts", ['cc', './_rollupPluginModLoBabelHelpers.js'], function (exports) {
  'use strict';

  var cclegacy, _decorator, sys, _defineProperty, _createClass;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      sys = module.sys;
    }, function (module) {
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "eec23YA39dCLqNg6zDnqLhV", "configuration", undefined);

      var ccclass = _decorator.ccclass;
      var KEY_CONFIG = "LinkConfig";
      var Configuration = exports('Configuration', (_dec = ccclass('Configuration'), _dec(_class = (_temp = _class2 = /*#__PURE__*/function () {
        function Configuration() {
          _defineProperty(this, "jsonData", void 0);

          _defineProperty(this, "path", void 0);

          _defineProperty(this, "markSave", void 0);

          _defineProperty(this, "saveTimer", void 0);
        }

        var _proto = Configuration.prototype;

        _proto.init = function init() {
          var _this = this;

          this.jsonData = {
            "userId": ""
          };
          this.path = this.getConfigPath();
          var content;

          if (sys.isNative) {
            var valueObject = jsb.fileUtils.getValueMapFromFile(this.path);
            content = valueObject[KEY_CONFIG];
          } else {
            content = sys.localStorage.getItem(KEY_CONFIG);
          }

          if (content && content.length) {
            if (content.startsWith('@')) {
              content = content.substring(1);
            }

            try {
              var jsonData = JSON.parse(content);
              this.jsonData = jsonData;
            } catch (excepaiton) {}
          }

          this.markSave = false;
          this.saveTimer = setInterval(function () {
            _this.scheduleSave();
          }, 500);
        };

        _proto.setConfigDataWithoutSave = function setConfigDataWithoutSave(key, value) {
          var account = this.jsonData.userId;

          if (this.jsonData[account]) {
            this.jsonData[account][key] = value;
          } else {
            console.error("no account can not save");
          }
        };

        _proto.setConfigData = function setConfigData(key, value) {
          this.setConfigDataWithoutSave(key, value);
          this.markSave = true; //标记为需要存储，避免一直在写入，而是每隔一段时间进行写入
        };

        _proto.getConfigData = function getConfigData(key) {
          var account = this.jsonData.userId;

          if (this.jsonData[account]) {
            var value = this.jsonData[account][key];
            return value ? value : "";
          } else {
            console.log("no account can not load");
            return "";
          }
        };

        _proto.setGlobalData = function setGlobalData(key, value) {
          this.jsonData[key] = value;
          this.save();
        };

        _proto.getGlobalData = function getGlobalData(key) {
          return this.jsonData[key];
        };

        _proto.setUserId = function setUserId(userId) {
          this.jsonData.userId = userId;

          if (!this.jsonData[userId]) {
            this.jsonData[userId] = {};
          }

          this.save();
        };

        _proto.getUserId = function getUserId() {
          return this.jsonData.userId;
        };

        _proto.scheduleSave = function scheduleSave() {
          if (!this.markSave) {
            return;
          }

          this.save();
        };

        _proto.markModified = function markModified() {
          this.markSave = true;
        };

        _proto.save = function save() {
          var str = JSON.stringify(this.jsonData);
          var zipStr = str;
          this.markSave = false;

          if (!sys.isNative) {
            var ls = sys.localStorage;
            ls.setItem(KEY_CONFIG, zipStr);
            return;
          }

          var valueObj = {};
          valueObj[KEY_CONFIG] = zipStr;
          jsb.fileUtils.writeToFile(valueObj, configuration.path);
        };

        _proto.getConfigPath = function getConfigPath() {
          var platform = sys.platform;
          var path = "";

          if (platform === sys.Platform.WIN32) {
            path = "src/conf";
          } else if (platform === sys.Platform.IOS) {
            path = "./conf";
          } else {
            if (sys.isNative) {
              path = jsb.fileUtils.getWritablePath();
              path = path + "conf";
            } else {
              path = "src/conf";
            }
          }

          return path;
        };

        _proto.parseUrl = function parseUrl(paramStr) {
          if (!paramStr || typeof paramStr === 'string' && paramStr.length <= 0) {
            return;
          }

          var dictParam = {};

          if (typeof paramStr === 'string') {
            paramStr = paramStr.split('?')[1]; // 去除掉 ？号

            var arrParam = paramStr.split("&");
            arrParam.forEach(function (paramValue) {
              var idxEqual = paramValue.indexOf("=");

              if (idxEqual !== -1) {
                var key = paramValue.substring(0, idxEqual);
                dictParam[key] = paramValue.substring(idxEqual + 1);
              }
            });
          } else {
            dictParam = paramStr;
          }

          if (dictParam.action) {
            this.setGlobalData('urlParams', dictParam);
          }

          if (dictParam.source) {
            this.setGlobalData('source', dictParam.source);
          }

          if (dictParam.adchannelid) {
            this.setGlobalData('adchannelid', dictParam.adchannelid);
          }
        };

        _proto.generateGuestAccount = function generateGuestAccount() {
          return "" + Date.now() + (0 | 10);
        };

        _createClass(Configuration, null, [{
          key: "instance",
          get: function get() {
            if (this._instance) {
              return this._instance;
            }

            this._instance = new Configuration();

            this._instance.init();

            return this._instance;
          }
        }]);

        return Configuration;
      }(), _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/lotteryItem.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './constants.ts', './utils.ts', './uiManager.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Sprite, Label, SpriteFrame, Color, Node, UITransform, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil, constants, utils, uiManager;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Label = module.Label;
      SpriteFrame = module.SpriteFrame;
      Color = module.Color;
      Node = module.Node;
      UITransform = module.UITransform;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      utils = module.utils;
    }, function (module) {
      uiManager = module.uiManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

      cclegacy._RF.push({}, "f1db2PMDSdEoolhZOaw5gvA", "lotteryItem", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var LotteryItem = exports('LotteryItem', (_dec = ccclass('LotteryItem'), _dec2 = property(Sprite), _dec3 = property(Label), _dec4 = property(Sprite), _dec5 = property(SpriteFrame), _dec6 = property(SpriteFrame), _dec7 = property(Color), _dec8 = property(Color), _dec9 = property(Node), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LotteryItem, _Component);

        function LotteryItem() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "spSelect", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbValue", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "spIcon", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfGold", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "sfDiamond", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "colorNormal", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "colorSelect", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "ndPropAddIcon", _descriptor8, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "info", void 0);

          _defineProperty(_assertThisInitialized(_this), "rewardType", void 0);

          _defineProperty(_assertThisInitialized(_this), "rewardValue", void 0);

          _defineProperty(_assertThisInitialized(_this), "propId", void 0);

          return _this;
        }

        var _proto = LotteryItem.prototype;

        _proto.setInfo = function setInfo(info) {
          this.info = info;
          this.rewardType = info.type;
          var uiTraSpIcon = this.spIcon.getComponent(UITransform);

          switch (this.rewardType) {
            case constants.REWARD_TYPE.DIAMOND:
              this.rewardValue = info.amount;
              this.spIcon.spriteFrame = this.sfDiamond;
              this.ndPropAddIcon.active = false;
              this.lbValue.string = this.rewardValue;
              uiTraSpIcon.width = 88.8;
              uiTraSpIcon.height = 50.4;
              break;

            case constants.REWARD_TYPE.GOLD:
              this.rewardValue = info.amount;
              this.spIcon.spriteFrame = this.sfGold;
              this.lbValue.string = utils.formatMoney(this.rewardValue);
              this.ndPropAddIcon.active = false;
              uiTraSpIcon.width = 93;
              uiTraSpIcon.height = 92;
              break;

            case constants.REWARD_TYPE.PROP:
              this.rewardValue = info.amount;
              this.lbValue.string = this.rewardValue;
              this.propId = "00" + info.subType;
              resourceUtil.setPropIcon(this.propId, this.spIcon, function () {});
              this.ndPropAddIcon.active = true;
              uiTraSpIcon.width = 77;
              uiTraSpIcon.height = 77;
              break;
          }
        };

        _proto.setSelect = function setSelect(isSelect) {
          this.spSelect.enabled = isSelect;
          this.lbValue.getComponent(Label).color = isSelect ? this.colorSelect : this.colorNormal;

          if (isSelect) {
            this.setReceivedUI();
          }
        };

        _proto.setReceivedUI = function setReceivedUI() {
          var itemInfo = {};
          itemInfo['itemType'] = this.info['type'];
          itemInfo['itemSubType'] = this.info['subType'];
          itemInfo['itemAmount'] = this.info['amount'];
          uiManager.instance.showDialog('lottery/reward', [itemInfo, true, constants.SHARE_FUNCTION.LOTTERY_REWARD]);
        };

        return LotteryItem;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spSelect", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbValue", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "spIcon", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "sfGold", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "sfDiamond", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "colorNormal", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color();
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "colorSelect", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Color();
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "ndPropAddIcon", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/loadingUI.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './constants.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Sprite, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, constants;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Sprite = module.Sprite;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      constants = module.constants;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

      cclegacy._RF.push({}, "f33bfL32OJOUqxJ3VWLer3l", "loadingUI", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var LoadingUI = exports('LoadingUI', (_dec = ccclass('LoadingUI'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(LoadingUI, _Component);

        function LoadingUI() {
          var _this2;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this2 = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this2), "progressBar", _descriptor, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "percentLabel", _descriptor2, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "versionLabel", _descriptor3, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "tipsNode", _descriptor4, _assertThisInitialized(_this2));

          _initializerDefineProperty(_assertThisInitialized(_this2), "spriteArr", _descriptor5, _assertThisInitialized(_this2));

          _defineProperty(_assertThisInitialized(_this2), "updateTimer", null);

          _defineProperty(_assertThisInitialized(_this2), "updateInterval", null);

          _defineProperty(_assertThisInitialized(_this2), "totalLength", null);

          _defineProperty(_assertThisInitialized(_this2), "lengthInterval", null);

          _defineProperty(_assertThisInitialized(_this2), "type", null);

          _defineProperty(_assertThisInitialized(_this2), "callback", null);

          _defineProperty(_assertThisInitialized(_this2), "tasks", null);

          _defineProperty(_assertThisInitialized(_this2), "currentMaxLength", null);

          _defineProperty(_assertThisInitialized(_this2), "currentLength", null);

          _defineProperty(_assertThisInitialized(_this2), "taskIndex", null);

          _defineProperty(_assertThisInitialized(_this2), "running", null);

          return _this2;
        }

        var _proto = LoadingUI.prototype;

        _proto.onLoad = function onLoad() {
          this.updateTimer = 0;
          this.updateInterval = 0.01;
          this.totalLength = this.progressBar.totalLength;
          this.lengthInterval = 30; // this.versionLabel.string = 'Ver:' + localConfig.getVersion();
        };

        _proto.onEnable = function onEnable() {
          var num = Math.floor(Math.random() * 3);
          num = num >= 3 ? 2 : num;
          this.tipsNode.getComponent(Sprite).spriteFrame = this.spriteArr[num];
        };

        _proto.startLoading = function startLoading(type, tasks, callback) {
          // game.addPersistRootNode(this.node);
          this.node.active = true;
          this.type = type;
          this.callback = callback;
          this.tasks = tasks;
          this.currentMaxLength = 0;
          this.currentLength = 0;
          this.progressBar.progress = 0;
          this.percentLabel.string = '0%';
          this.taskIndex = 0;
          this.running = true;
          this.nextTask([]);
        };

        _proto.nextTask = function nextTask(args) {
          if (!this.tasks) return;

          if (this.taskIndex === this.tasks.length) {
            this.currentMaxLength = this.totalLength;

            if (this.type === constants.SCENE_MANAGER_TYPE.LOAD) {
              this.currentLength = this.currentMaxLength;
              this.setProgress();
            }

            return;
          }

          if (this.type === constants.SCENE_MANAGER_TYPE.LOAD) {
            this.currentLength = this.currentMaxLength;
            this.setProgress();
          }

          var _this = this;

          var taskCallback = function taskCallback(err, args) {
            if (err) {
              return _this.callback.apply(null, [err].concat(args));
            }

            _this.nextTask(Array.prototype.slice.call(arguments).slice(1));
          };

          args.push(taskCallback);
          var task = this.tasks[this.taskIndex++];
          this.currentMaxLength = this.totalLength / (this.tasks.length + 1) * this.taskIndex;
          task.apply(null, args);
        };

        _proto.update = function update(dt) {
          this.updateTimer += dt;

          if (this.updateTimer < this.updateInterval) {
            return; // we don't need to do the math every frame
          }

          if (!this.running) return;
          this.updateTimer = 0;
          this.currentLength += this.lengthInterval;
          this.currentLength = this.currentLength > this.currentMaxLength ? this.currentMaxLength : this.currentLength;
          this.setProgress();
        };

        _proto.setProgress = function setProgress() {
          var radio = this.currentLength / this.totalLength;
          radio = radio > 1 ? 1 : radio;
          this.percentLabel.string = Math.floor(radio * 100) + '%';
          this.progressBar.progress = radio;

          if (radio === 1) {
            this.running = false;
            this.callback.apply(null, [null].concat(null));
          }
        };

        return LoadingUI;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "progressBar", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "percentLabel", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "versionLabel", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "tipsNode", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "spriteArr", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/constants.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "f4f59qgd1lA2aWdYY7JPEm/", "constants", undefined);

      var constants = exports('constants', {
        VERSION: '1.4.7',
        //本地缓存KEY值
        LOCAL_CACHE: {
          PLAYER: 'player',
          //玩家基础数据缓存，如金币砖石等信息，暂时由客户端存储，后续改由服务端管理
          SETTINGS: 'settings',
          //设置相关，所有杂项都丢里面进去
          DATA_VERSION: 'dataVersion',
          //数据版本
          ACCOUNT: 'account',
          //玩家账号
          PASSWORD: 'password',
          //玩家账号
          PRIVATE_KEY: 'privateKey',
          //privateKey
          // TMP_DATA: 'tmpData',             //临时数据，不会存储到云盘
          HISTORY: "history",
          //关卡通关数据
          BAG: "bag" //玩家背包，即道具列表，字典类型

        },
        //settings的本地缓存key
        SETTINGS_KEY: {
          LOTTERY: 'lottery',
          //抽奖
          MOREGAME_FIRSTCLICK: 'moreGameFirstClick' //更多游戏是否头一次点击

        },
        TMP_DATA_KEY: {
          AD_TIMES: 'adTimes' //已经观看广告的次数

        },
        //道具ID列表
        PROP_ID: {
          HAMMER: 1,
          //锤子
          MAGIC: 2,
          //魔法棒
          REFRESH: 3,
          //刷新
          INFINITE: 4 //无限

        },
        GUIDE_TYPE: {
          //新手引导类型
          SPACE: 0,
          //空，不做任何操作，用来判定触发
          GUIDE_ANI: 1,
          //引导动画
          TRIGGER_EVENT: 2,
          //触发事件
          WAIT_EVENT: 3,
          //等待事件触发
          GUIDE: 4 //界面性引导

        },
        //顺时针
        GUIDE_TIPS_DIRECTION: {
          //tips展示方向
          TOP: 0,
          RIGHT: 1,
          BOTTOM: 2,
          LEFT: 3
        },
        SHARE_TYPE: {
          //分享文案
          SHARE_GAME: 0,
          //游戏分享
          GROUP_RANK: 1 //群排行

        },
        SHARE_FUNCTION: {
          BALANCE: 'balance',
          //结算分享
          PVE: 'pve',
          //PVE界面分享
          START_REWARD: 'startReward',
          //开局奖励
          LACK_STEP: 'lackStep',
          //步数不足
          FILL_SIGN: 'fillSign',
          //补签分享
          OFFLINE: 'offline',
          //离线奖励
          RANK: 'rank',
          //排行榜
          BUY_INFINITE: 'buyInfinite',
          //购买无限道具需要分享
          LOTTERY: 'lottery',
          //抽奖
          LOTTERY_REWARD: 'lotteryReward',
          //抽奖奖励，用于双倍分享
          ONLINE: 'online',
          //在线奖励
          SHOP_PROP: 'shopprop',
          //商店随机道具
          FIGHT: 'fight',
          //战斗界面分享
          SIGN: 'sign' //签到分享

        },
        //观看广告的最大次数
        WATCH_AD_MAX_TIMES: {
          LOTTERY: 10 //抽奖
          // CHOICE: 5,          //三选一  
          // PICK_GAME: 5,       //捡蛋糕游戏

        },
        ZORDER: {
          LINK_ITEM_NORMAL: 0,
          LINK_ITEM_SKILL: 1,
          FIGHT_NUM: 20,
          //战斗数字特效
          DIALOG: 100,
          //弹窗的Z序
          REWARD: 900,
          //奖励的弹窗
          WAITING: 998,
          //等待界面弹窗
          TIPS: 999 //提示框

        },
        //统计事件类型
        STAT_EVENT_TYPE: {// BALANCE_SHOW: 'balanceShow',                            //结算界面展现
          // BALANCE_SHARE_SHOW: 'balanceShareShow',                 //结算界面分享按钮展现
          // BALANCE_SHARE_SUCCESS: 'balanceShareSuccess',           //结算界面分享成功
          // BALANCE_AD_SHOW: 'balanceAdShow',                       //结算界面分享按钮展现
          // BALANCE_AD_SUCCESS: 'balanceAdSuccess',                 //结算界面分享成功
          // CROSS_BTN_CLICK: 'crossBtnClick',                       //交叉营销组件点击
        },
        LINK_ROWS_COUNT: 8,
        //总共有多少行
        LINK_COLS_COUNT: 8,
        //总共有多少列
        SPECIAL_EFFECT: {
          HORIZONTAL: 1,
          VERTICAL: 2,
          PLUS: 3,
          CENTER: 4
        },
        //签到奖励状态
        SIGN_REWARD_STATUS: {
          RECEIVED: 0,
          //已领取的
          RECEIVABLE: 1,
          //可领取的
          UNRECEIVABLE: 2,
          //不可领取的
          FILLSIGNIN: 3,
          //补签的
          AFTER_FILLSIGNIN: 4 //补签后

        },
        MAX_SIGN_IN_REWARDS_DAY: 7,
        //最多签到获取奖励天数
        MAX_INFINITE_TIMES: 10,
        //获得无限道具所需分享次数
        AUDIO_MUSIC: {
          BACKGROUND: "bgm",
          //背景音乐
          FIGHT: "fight" //游戏音乐

        },
        AUDIO_SOUND: {
          CLICK: "click",
          //点击音效
          BONUS_TIME: "bonusTime",
          FINISH_LINK: "finishLink",
          //连接完后触发
          CLICK_CAKE: "clickCake",
          //点击蛋糕
          FINISH_STAR: "finishStar",
          //星星达成
          FLY_STAR: "flyStar",
          //特殊效果获得
          LINE_BOMB: "lineBomb",
          //横竖爆炸触发
          PLUS_BOMB: "plusBomb",
          //十字爆炸触发
          RANGE_BOMB: "rangeBomb",
          //范围爆炸触发
          SPARE_STEP: "spareStep",
          //剩余步数飞入
          GOOD: "good",
          GREAT: "great",
          EXCELLENT: "excellent",
          AMAZING: 'amazing',
          UNBELIEVABLE: 'unbelievable'
        },
        MAX_GRADE_OF_EACH_PVE_LEVEL: 3,
        // pve每个关卡最高等级
        PVE_LEVEL_STATUS: {
          DONE: 0,
          UNDONE: 1,
          DOING: 2
        },
        //加载场景类型
        SCENE_MANAGER_TYPE: {
          LOAD: 0,
          //加载
          LOAD_SCENE: 1 //加载场景

        },
        //奖励类型
        REWARD_TYPE: {
          DIAMOND: 1,
          //钻石
          GOLD: 2,
          //金币
          PROP: 3,
          //道具
          GIFT: 4 //礼包

        },
        LOTTERY_MAX_TIMES: 3,
        //最大抽奖次数
        LOTTERY_AD_MAX_TIMES: 10,
        //看广告获得奖券的总次数
        TASK_RESET_TIME: 4,
        //任务倒计时时间
        TASK_MAX_NUM: 4,
        //显示最大任务数量
        MOREGAME_MAIN: '1001',
        //任务完成状态
        TASK_STATE: {
          UNRECEIVABLE: 0,
          //不可领取的，任务未完成
          RECEIVABLE: 1,
          //可领取的，任务完成
          RECEIVED: 2 //已领取，任务完成

        },
        ANALYTICS_TYPE: {
          ON_LOGIN: 'onLogin',
          // 登录
          START_LEVEL: 'levelStart',
          //关卡开始
          END_LEVEL: 'levelOver',
          //关卡结束
          ASK_WATCH_ADS_GET_EFFECT: 'askWatchAdForEffect',
          //询问看广告的有几次
          WATCH_ADS_GET_EFFECT: 'watchAdForEffect',
          // 观看激励广告获得特效
          ASK_WATCH_ADS_ADD_STEP: 'askWatchAdForAddStep',
          //询问看广告的有几次
          WATCH_ADS_ADD_STEP: 'watchAdForAddStep',
          // 观看激励广告增加步数
          SCORE_OF_LEVEL: 'scoreOfLevel',
          // 每关的玩家得分
          ASK_LOTTERY: 'askWatchAdForLottery',
          LOTTERY: 'watchAdForLottery',
          SHARE: 'share',
          ASK_GET_INFINITE: 'askWatchAdForInfinite',
          GET_INFINITE: 'watchAdForInfinite',
          //1.新手进游戏后的正常路线，每个节点都要统计到；
          //七天登陆
          SIGNIN_RECEIVE: 'signinReceive',
          //签到按钮点击次数
          SIGNIN_FILL: 'signinFill',
          //签到按钮点击次数
          SIGNIN_CLOSE: 'signinClose',
          //签到关闭按钮点击次数
          //离线奖励
          OFFLINE_REWARD_SHARE: "offlineRewardShare",
          //分享按钮点击数
          OFFLINE_REWARD_SHARE_SUCCESS: 'offlineRewardShareSuccess',
          //成功分享数
          OFFLINE_REWARD_CLOSE: 'offlineRewardClose',
          //关闭按钮点击数
          //第一关
          OPEN_PANEL: 'openPanel',
          //点击打开关卡界面
          START_GAME: 'startGame',
          //开始游戏按钮
          START_GAME_SUCCESS: 'startGameSuccess',
          //成功进入游戏
          //游戏说明框
          PLAYER_STAY_TIME: 'playerStayTime',
          //玩家停留时间
          //结算界面
          BALANCE_USED_STEP: 'balanceUsedStep',
          //使用步数
          BALANCE_GAIN_SCORE: 'balanceGainScore',
          //获得分数
          //以上每一步的留存率，包括之后5关的留存
          //2.界面所有功能的统计；（统计单人平均数据）
          //签到
          SIGNIN_ENTRANCE: 'signinEntrance',
          //入口点击数
          //大转盘
          LOTTERY_ENTRANCE: 'lotteryEntrance',
          //入口点击数
          LOTTERY_TOTAL_TIMES: 'lotteryTotalTimes',
          //抽奖总次数
          LOTTERY_WATCH_AD: 'lotteryWatchAd',
          //广告观看次数
          LOTTERY_SHARE: 'lotteryShare',
          //分享次数
          LOTTERY_WATCH_AD_SUCCESS: 'lotteryWatchAdSuccess',
          //成功观看广告次数
          LOTTERY_SHARE_SUCCESS: 'lotteryShareSuccess',
          //成功分享次数
          //在线奖励
          ONLINE_REWARD_ENTRANCE: 'onlineRewardEntrance',
          //入口点击数
          ONLINE_REWARD_SUCCESS: 'onlineRewardSuccess',
          //成功领取次数
          //商店
          SHOP_ENTRANCE: 'shopEntrance',
          //入口点击数
          SHOP_PROP_PER_BUY: 'shopPropPerBuy',
          //每种道具购买次数
          SHOP_RAND_PROP_SHARE: 'shopRandPropShare',
          //随机道具分享次数
          SHOP_PLAYER_GOLD: 'shopPlayerGold',
          //玩家拥有金币数量  
          //设置
          SETTING_MUSIC_ON: 'settingMusicOn',
          //音乐开启        
          SETTING_MUSIC_OFF: 'settingMusicOff',
          //音乐开启  
          SETTING_SOUND_ON: 'settingSoundOn',
          //音乐开启  
          SETTING_SOUND_OFF: 'settingSoundOff',
          //音乐开启  
          //排行榜
          RANK_ENTRANCE: 'rankEntrance',
          //入口点击数
          RANK_SHARE: 'rankShare',
          //排行榜分享
          //分享
          SHARE_CLICK: 'shareClick',
          //点击数
          SHARE_SUCCESS: 'shareSuccess',
          //成功分享数
          //更多游戏
          MOREGAME_ENTRANCE: 'moregameEntrance',
          //入口点击数
          MOREGAME_SINGLE: '互推墙-卖量',
          //单个游戏点击数
          //主推游戏
          MAIN_PUSH_GAME: '主界面-卖量',
          //点击数
          //关卡说明界面
          CHECKPOINT_PROP_BUY_NUM: 'checkpointPropBuyNum',
          //每种道具购买数量
          //游戏中
          GAME_PROP_SUCCESS_NUM: 'gamePropSuccessNum',
          //每种道具成功使用数量
          GAME_PROP_BUY_NUM: 'gamePropSuccessNum',
          //游戏中购买的每种道具的数量
          //关卡结算
          BALANCE_NEXT: 'balanceNext',
          //下一关数
          BALANCE_PLAY_AGAIN: 'balancePlayAgain',
          //重玩次数
          BALANCE_SHARE: 'balanceShare',
          //分享次数
          BALANCE_CLOSE: 'balanceClose',
          //关闭界面次数
          GAME_BAR_CLICK: '导流条-卖量',
          //导流条点击
          CHANNEL: 'channel',
          WATCH_AD_BTN_SHOW_TIMES: '视频按钮展示次数',
          WATCH_AD_BTN_CLICK_TIMES: '视频按钮点击次数',
          WATCH_AD_BTN_SUCCESS_TIMES: '视频按钮成功点击次数'
        },
        //在线奖励时间间隔(分钟)
        ONLINE_REWARD_INTERVAL: [0, 3, 5, 10, 30],
        //奖励领取状态
        REWARD_STATUS: {
          UNRECEIVABLE: 0,
          //不可领取的
          RECEIVABLE: 1,
          //可领取的  
          RECEIVED: 2 //已领取的

        },
        //打开奖励的方法
        OPEN_REWARD_TYPE: {
          AD: 0,
          SHARE: 1,
          NULL: 2
        },
        //商场随机道具倒计时的小时数
        SHOP_COUNTDOWN_HOURS: 4,
        //解锁道具最高的得到第几关
        UNLOCK_HIGEST_LEVEl: 5,
        //2，3，4, 5级对应的解锁道具
        UNLOCK_PROP_ID: [1, 2, 3, 4],
        //离线奖励，与上次登录时间超过10分钟
        OFFLINE_REWARD: 10,
        // 微信banner广告
        WX_BANNER_ADS: {
          BALANCE: 0,
          PVE_PAGE: 1,
          GAME: 2
        },
        // 微信视频广告
        WX_REWARD_ADS: {
          VIDEO: 0
        },
        // 微信广告类型
        WX_ADS_TYPE: {
          BANNER: 0,
          VIDEO: 4
        },
        // 广告返回code
        WX_ADS_RESP_CODE: {
          kAdsReceived: 0,
          kAdsShown: 1,
          kAdsDismissed: 2,
          kUnknownError: 6
        },
        //次按钮在主界面显示后3秒再显示
        NORMAL_SHOW_TIME: 0.2
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/onlineReward.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './constants.ts', './utils.ts', './localConfig.ts', './playerData.ts', './uiManager.ts', './LanguageData.ts', './gameLogic.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, Animation, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, constants, utils, localConfig, playerData, uiManager, t, GameLogic;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Animation = module.Animation;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      utils = module.utils;
    }, function (module) {
      localConfig = module.localConfig;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      t = module.t;
    }, function (module) {
      GameLogic = module.GameLogic;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

      cclegacy._RF.push({}, "f6263VSRTFBzIruWaj84Ky6", "onlineReward", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var OnlineReward = exports('OnlineReward', (_dec = ccclass('OnlineReward'), _dec2 = property(Animation), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(OnlineReward, _Component);

        function OnlineReward() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "ndTimer", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbTime", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "aniFreeReward", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "btnReceive", _descriptor4, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "oldTime", void 0);

          return _this;
        }

        var _proto = OnlineReward.prototype;

        _proto.start = function start() {
          this.checkOnlineReward(); //检查在线奖励
        };

        _proto.checkOnlineReward = function checkOnlineReward() {
          var onlineRewardInfo = playerData.instance.getOnlineRewardInfo();

          switch (onlineRewardInfo['value'].receiveStatus) {
            case constants.REWARD_STATUS.UNRECEIVABLE:
              if (this.btnReceive.node) {
                this.btnReceive.node.active = false;
              }

              this.aniFreeReward.play('freeGiftIdle');
              this.schedule(this.countDownCallback, 0.5);
              break;

            case constants.REWARD_STATUS.RECEIVABLE:
              if (this.btnReceive.node) {
                this.btnReceive.node.active = true;
              }

              this.aniFreeReward.play('freeGiftActivation');
              this.lbTime.string = t('onlineReward.receive');
              this.unschedule(this.countDownCallback);
              break;
          }
        };

        _proto.onBtnReceiveClick = function onBtnReceiveClick() {
          var _this2 = this;

          var dictProp = localConfig.instance.getTable('prop');

          if (!dictProp) {
            return false;
          }

          var arrPropKey = Object.keys(dictProp);
          var arrRandom = arrPropKey.filter(function (element) {
            return Number(element) !== constants.PROP_ID.INFINITE;
          });
          var randomVal = arrRandom[Math.floor(Math.random() * arrRandom.length)] + '';
          GameLogic.instance.getOpenRewardType(constants.SHARE_FUNCTION.ONLINE, function (err, type) {
            if (!err) {
              switch (type) {
                case constants.OPEN_REWARD_TYPE.AD:
                  GameLogic.instance.showRewardAd(function (err) {
                    if (!err) {
                      _this2.showReward(randomVal);
                    }
                  });
                  break;

                case constants.OPEN_REWARD_TYPE.SHARE:
                  GameLogic.instance.share(constants.SHARE_FUNCTION.ONLINE, {}, function (err) {
                    if (!err) {
                      _this2.showReward(randomVal);
                    }
                  });
                  break;

                case constants.OPEN_REWARD_TYPE.NULL:
                  _this2.showReward(randomVal);

                  break;
              }
            }
          });
        };

        _proto.countDownCallback = function countDownCallback() {
          var nowTime = Date.now();

          if (!this.oldTime) {
            this.oldTime = nowTime;
          }

          if (nowTime - this.oldTime > 1000) {
            var usedTime = playerData.instance.getOnlineRewardInfo()['usedTime'];
            var spareTime = playerData.instance.getCountdownTime() * 60 * 1000 - usedTime * 1000;

            if (spareTime <= 0) {
              this.unschedule(this.countDownCallback);
              playerData.instance.updateOnlineRewardInfo(false); //设置为可领取

              this.checkOnlineReward();
              this.lbTime.string = t('onlineReward.receive');
            } else {
              this.lbTime.string = utils.formatTimeForMillisecond(spareTime).toString();
              this.oldTime = nowTime;
            }
          }
        };

        _proto.showReward = function showReward(randomVal) {
          var itemInfo = {};
          itemInfo['itemType'] = constants.REWARD_TYPE.PROP;
          itemInfo['itemSubType'] = randomVal;
          itemInfo['itemAmount'] = 1;
          uiManager.instance.showDialog('lottery/reward', [itemInfo, false, constants.SHARE_FUNCTION.ONLINE]);
          playerData.instance.updateOnlineRewardInfo(true);
          this.checkOnlineReward();
        };

        return OnlineReward;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ndTimer", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "aniFreeReward", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "btnReceive", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/uiManager.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './poolManager.ts', './resourceUtil.ts', './animationUI.ts', './tips.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, isValid, find, _defineProperty, _createClass, poolManager, resourceUtil, AnimationUI, tips;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      isValid = module.isValid;
      find = module.find;
    }, function (module) {
      _defineProperty = module.defineProperty;
      _createClass = module.createClass;
    }, function (module) {
      poolManager = module.poolManager;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      AnimationUI = module.AnimationUI;
    }, function (module) {
      tips = module.tips;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "f9384FYDp5GqoW+CtrCla3U", "uiManager", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var SHOW_STR_INTERVAL_TIME = 800;
      var uiManager = exports('uiManager', (_dec = ccclass("uiManager"), _dec(_class = (_temp = _class2 = /*#__PURE__*/function () {
        function uiManager() {
          _defineProperty(this, "_dictSharedPanel", {});

          _defineProperty(this, "_dictLoading", {});

          _defineProperty(this, "_arrPopupDialog", []);

          _defineProperty(this, "_showTipsTime", 0);
        }

        var _proto = uiManager.prototype;
        /**
         * 检查当前界面是否正在展示
         * @param panelPath 
         */

        _proto.isDialogVisible = function isDialogVisible(panelPath) {
          if (!this._dictSharedPanel.hasOwnProperty(panelPath)) {
            return false;
          }

          var panel = this._dictSharedPanel[panelPath];
          return isValid(panel) && panel.active && panel.parent;
        }
        /**
         * 显示单例界面
         * @param {String} panelPath 
         * @param {Array} args 
         * @param {Function} cb 回调函数，创建完毕后回调
         */
        ;

        _proto.showDialog = function showDialog(panelPath, args, cb) {
          var _this = this;

          if (this._dictLoading[panelPath]) {
            return;
          }

          var idxSplit = panelPath.lastIndexOf('/');
          var scriptName = panelPath.slice(idxSplit + 1);

          if (!args) {
            args = [];
          }

          if (this._dictSharedPanel.hasOwnProperty(panelPath)) {
            var panel = this._dictSharedPanel[panelPath];

            if (isValid(panel)) {
              panel.parent = find("Canvas");
              panel.active = true;
              var script = panel.getComponent(scriptName);
              var script2 = panel.getComponent(scriptName.charAt(0).toUpperCase() + scriptName.slice(1));

              if (script && script.show) {
                script.show.apply(script, args);
                cb && cb(script);
              } else if (script2 && script2.show) {
                script2.show.apply(script2, args);
                cb && cb(script2);
              } else {
                throw "\u67E5\u627E\u4E0D\u5230\u811A\u672C\u6587\u4EF6" + scriptName;
              }

              return;
            }
          }

          this._dictLoading[panelPath] = true;
          resourceUtil.createUI(panelPath, function (err, node) {
            //判断是否有可能在显示前已经被关掉了？
            var isCloseBeforeShow = false;

            if (!_this._dictLoading[panelPath]) {
              //已经被关掉
              isCloseBeforeShow = true;
            }

            _this._dictLoading[panelPath] = false;

            if (err) {
              console.error(err);
              return;
            }

            _this._dictSharedPanel[panelPath] = node;
            var script = node.getComponent(scriptName);
            var script2 = node.getComponent(scriptName.charAt(0).toUpperCase() + scriptName.slice(1));

            if (script && script.show) {
              script.show.apply(script, args);
              cb && cb(script);
            } else if (script2 && script2.show) {
              script2.show.apply(script2, args);
              cb && cb(script2);
            } else {
              throw "\u67E5\u627E\u4E0D\u5230\u811A\u672C\u6587\u4EF6" + scriptName;
            }

            if (isCloseBeforeShow) {
              //如果在显示前又被关闭，则直接触发关闭掉
              _this.hideDialog(panelPath);
            }
          });
        }
        /**
         * 隐藏单例界面
         * @param {String} panelPath 
         * @param {fn} callback
         */
        ;

        _proto.hideDialog = function hideDialog(panelPath, callback) {
          if (this._dictSharedPanel.hasOwnProperty(panelPath)) {
            var panel = this._dictSharedPanel[panelPath];

            if (panel && isValid(panel)) {
              var ani = panel.getComponent(AnimationUI);

              if (ani) {
                ani.close(function () {
                  panel.parent = null;

                  if (callback && typeof callback === 'function') {
                    callback();
                  }
                });
              } else {
                panel.parent = null;

                if (callback && typeof callback === 'function') {
                  callback();
                }
              }
            } else if (callback && typeof callback === 'function') {
              callback();
            }
          }

          this._dictLoading[panelPath] = false;
        }
        /**
         * 将弹窗加入弹出窗队列
         * @param {string} panelPath 
         * @param {string} scriptName 
         * @param {*} param 
         */
        ;

        _proto.pushToPopupSeq = function pushToPopupSeq(panelPath, scriptName, param) {
          var popupDialog = {
            panelPath: panelPath,
            scriptName: scriptName,
            param: param,
            isShow: false
          };

          this._arrPopupDialog.push(popupDialog);

          this._checkPopupSeq();
        }
        /**
         * 将弹窗加入弹出窗队列
         * @param {number} index 
         * @param {string} panelPath 
         * @param {string} scriptName 
         * @param {*} param 
         */
        ;

        _proto.insertToPopupSeq = function insertToPopupSeq(index, panelPath, param) {
          var popupDialog = {
            panelPath: panelPath,
            param: param,
            isShow: false
          };

          this._arrPopupDialog.splice(index, 0, popupDialog); //this._checkPopupSeq();

        }
        /**
         * 将弹窗从弹出窗队列中移除
         * @param {string} panelPath 
         */
        ;

        _proto.shiftFromPopupSeq = function shiftFromPopupSeq(panelPath) {
          var _this2 = this;

          this.hideDialog(panelPath, function () {
            if (_this2._arrPopupDialog[0] && _this2._arrPopupDialog[0].panelPath === panelPath) {
              _this2._arrPopupDialog.shift();

              _this2._checkPopupSeq();
            }
          });
        }
        /**
         * 检查当前是否需要弹窗
         */
        ;

        _proto._checkPopupSeq = function _checkPopupSeq() {
          if (this._arrPopupDialog.length > 0) {
            var first = this._arrPopupDialog[0];

            if (!first.isShow) {
              this.showDialog(first.panelPath, first.param);
              this._arrPopupDialog[0].isShow = true;
            }
          }
        }
        /**
         * 显示提示
         * @param {String} content 
         * @param {Function} cb 
         */
        ;

        _proto.showTips = function showTips(content, callback) {
          var _this3 = this;

          var str = String(content);

          var next = function next() {
            _this3._showTipsAni(str, callback);
          };

          var now = Date.now();

          if (now - this._showTipsTime < SHOW_STR_INTERVAL_TIME) {
            var spareTime = SHOW_STR_INTERVAL_TIME - (now - this._showTipsTime);
            setTimeout(function () {
              next();
            }, spareTime);
            this._showTipsTime = now + spareTime;
          } else {
            next();
            this._showTipsTime = now;
          }
        }
        /**
         * 内部函数
         * @param {String} content 
         * @param {Function} cb 
         */
        ;

        _proto._showTipsAni = function _showTipsAni(content, callback) {
          resourceUtil.getUIPrefabRes('common/tips', function (err, prefab) {
            if (err) {
              return;
            }

            var tipsNode = poolManager.instance.getNode(prefab, find("Canvas"));
            var tipScript = tipsNode.getComponent(tips);
            tipScript.show(content, callback);
          });
        };

        _createClass(uiManager, null, [{
          key: "instance",
          get: function get() {
            if (this._instance) {
              return this._instance;
            }

            this._instance = new uiManager();
            return this._instance;
          }
        }]);

        return uiManager;
      }(), _defineProperty(_class2, "_instance", void 0), _temp)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/fightProp.ts", ['cc', './_rollupPluginModLoBabelHelpers.js', './resourceUtil.ts', './constants.ts', './clientEvent.ts', './playerData.ts', './uiManager.ts', './buttonEx.ts'], function (exports) {
  'use strict';

  var cclegacy, _decorator, UITransform, Vec3, Component, _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _defineProperty, resourceUtil, constants, clientEvent, playerData, uiManager, ButtonEx;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      UITransform = module.UITransform;
      Vec3 = module.Vec3;
      Component = module.Component;
    }, function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _defineProperty = module.defineProperty;
    }, function (module) {
      resourceUtil = module.resourceUtil;
    }, function (module) {
      constants = module.constants;
    }, function (module) {
      clientEvent = module.clientEvent;
    }, function (module) {
      playerData = module.playerData;
    }, function (module) {
      uiManager = module.uiManager;
    }, function (module) {
      ButtonEx = module.ButtonEx;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "fe8afmT+lpEBr/zkz0jwl9D", "fightProp", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var FightProp = exports('FightProp', (_dec = ccclass('FightProp'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Component) {
        _inheritsLoose(FightProp, _Component);

        function FightProp() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_assertThisInitialized(_this), "spProp", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_assertThisInitialized(_this), "lbNum", _descriptor2, _assertThisInitialized(_this));

          _defineProperty(_assertThisInitialized(_this), "prop", void 0);

          _defineProperty(_assertThisInitialized(_this), "clickCallback", void 0);

          return _this;
        }

        var _proto = FightProp.prototype;

        _proto.start = function start() {
          this.updateUnlockProp();
        };

        _proto.onEnable = function onEnable() {
          clientEvent.on('updateProp', this.updateProp, this);
          clientEvent.on('updateUnlockProp', this.updateUnlockProp, this);
        };

        _proto.onDisable = function onDisable() {
          clientEvent.off('updateProp', this.updateProp, this);
          clientEvent.off('updateUnlockProp', this.updateUnlockProp, this);
        };

        _proto.show = function show(prop) {
          this.prop = prop;
          resourceUtil.setPropIcon(prop.icon, this.spProp, function () {});
          var num = playerData.instance.getPropAmount(prop.ID);

          if (num <= 0) {
            num = '+';
          }

          this.lbNum.string = num;
        };

        _proto.updateProp = function updateProp(propId) {
          if (propId === this.prop.ID) {
            this.show(this.prop);
          }
        };

        _proto.setClickListener = function setClickListener(callback) {
          this.clickCallback = callback;
        };

        _proto.onItemClick = function onItemClick() {
          var num = playerData.instance.getPropAmount(this.prop.ID);

          if (num <= 0) {
            uiManager.instance.showDialog('props/buy', [this.prop.ID, constants.ANALYTICS_TYPE.GAME_PROP_BUY_NUM]);
            return;
          }

          if (this.clickCallback) {
            this.clickCallback(this.prop, this.node.getComponent(UITransform).convertToWorldSpaceAR(new Vec3(0, 0, 0)));
          }
        };

        _proto.updateUnlockProp = function updateUnlockProp() {
          var isPropUnlock = playerData.instance.isPropUnlock(this.prop.ID);
          this.node.getComponent(ButtonEx).interactable = isPropUnlock;
          resourceUtil.setGray(this.node, !isPropUnlock);
        };

        return FightProp;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "spProp", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lbNum", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./poolManager.ts', './resourceUtil.ts', './constants.ts', './linkItem.ts', './TestScene.ts', './clientEvent.ts', './constant.ts', './util.ts', './storageManager.ts', './utils.ts', './csvManager.ts', './localConfig.ts', './loadingUI.ts', './sceneManager.ts', './playerData.ts', './loadsh.ts', './animationUI.ts', './tips.ts', './uiManager.ts', './audioManager.ts', './buttonEx.ts', './fightProp.ts', './LanguageData.ts', './fightPropsOperation.ts', './fightTarget.ts', './levelUI.ts', './fightGuide.ts', './fightNum.ts', './AdmobHelper.ts', './gameLogic.ts', './buy.ts', './balance.ts', './linkLine.ts', './showTargetCake.ts', './showTarget.ts', './signinReward.ts', './LocalizedMaterial.ts', './pveSlotUI.ts', './multiScrollView.ts', './unLockProp.ts', './shopPropsOperation.ts', './fightHandGuide.ts', './linkContent.ts', './reward.ts', './effectManager.ts', './LocalizedSprite.ts', './shopItem.ts', './pveUI.ts', './stopPropagation.ts', './loginScene.ts', './adStepItem.ts', './offLineReward.ts', './loading.ts', './adStep.ts', './propItem.ts', './targetCake.ts', './levelPanel.ts', './signInItem.ts', './signIn.ts', './effectGroup.ts', './fightUI.ts', './fightScene.ts', './TestLocal.ts', './LocalizedRichText.ts', './adProp.ts', './setting.ts', './gameSetting.ts', './elasticLimit.ts', './lotteryItem.ts', './lottery.ts', './balanceFailed.ts', './shop.ts', './LocalizedLabel.ts', './configuration.ts', './onlineReward.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});
//# sourceMappingURL=index.js.map