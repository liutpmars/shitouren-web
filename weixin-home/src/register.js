/**
 * star 2015.1.26
 */
//cc.SPRITE_DEBUG_DRAW = 1;
var canChangePage = true;
var curScene = null;
var MainScene = cc.Scene.extend({
    listener: null,
    accelListener: null,
    currentIndex: 0,
    sceneList: [],
    ctor: function () {
        this._super();
        cc.spriteFrameCache.addSpriteFrames(res.firstPage_plist);
    },
    onEnter: function () {
        this._super();
        this.initUI();
        this.addTouch();
        this.initHideEvent();
        curScene = this;
        initMusic();
        playMusic(true);
//        this.addAccel();
    },
    initUI: function () {
//        var bg = new cc.Sprite(res.background_png);
//        bg.anchorX = 0;
//        bg.anchorY = 0;
//        bg.scaleX = cc.winSize.width / bg.width;
//        bg.scaleY = cc.winSize.height / bg.height;
//        this.addChild(bg, 0);
        
//        this.bgLayer = new cc.LayerColor(cc.color(10, 10, 10, 255));
//        this.bgLayer.anchorX = 0;
//        this.bgLayer.anchorY = 0;
//        this.bgLayer.scaleX = 400;//cc.winSize.width / bg.width;
//        this.bgLayer.scaleY = 400;//cc.winSize.height / bg.height;
//        this.addChild(this.bgLayer, 0);

        this.arrow = new cc.Sprite("#arrow.png");
        this.arrow.setPosition(cc.visibleRect.bottom);
        var posY = this.arrow.y;
        var arrowAction = cc.repeatForever(cc.sequence(cc.spawn(cc.moveTo(0.8, cc.p(this.arrow.x, posY + 30)).easing(cc.easeIn(0.5)), cc.fadeOut(1)), cc.delayTime(0.8), cc.callFunc(function () {
            this.arrow.y = this.arrow.y - 30;
            this.arrow.opacity = 255;
        }, this)));
        this.arrow.runAction(arrowAction);
        
        if(cc.container.clientWidth < cc.container.clientHeight){
//        if (cc.size.width < cc.size.height){
        	this.arrow.setScale(0.6,0.4);
        }else{
        	this.arrow.setScale(0.8,0.3);
        }
        
//        this.arrow.setScale(0.5);
        this.addChild(this.arrow, 1);

        this.menuItemToggle = new cc.MenuItemToggle(new cc.MenuItemImage("#music.png"), new cc.MenuItemImage("#music_sel.png"), this.toggleMusicCallback, this);
        this.menuItemToggle.setPosition(cc.pAdd(cc.visibleRect.right, cc.p(-this.menuItemToggle.width / 2 - 30, 140)));
        var togglemenu = new cc.Menu(this.menuItemToggle);
        togglemenu.anchorX = 0;
        togglemenu.anchorY = 0;
        togglemenu.x = 0;
        togglemenu.y = 0;
//        this.addChild(togglemenu, 1);
        
        this.animLayer = new cc.Layer();
        this.addChild(this.animLayer);
        this.sceneList.push(new Layer1());
        this.sceneList.push(new Layer2());
        this.sceneList.push(new Layer3());
        this.sceneList.push(new Layer4());
        this.sceneList.push(new Layer5());
        this.sceneList.push(new Layer6());
        this.sceneList.push(new Layer7());
        this.sceneList.push(new Layer8());
        this.sceneList.push(new Layer9());
        this.sceneList.push(new Layer10());
        this.sceneList.push(new Layer11());
        this.sceneList.push(new Layer12());
        
        for (var i = 0; i < this.sceneList.length; i++) {
            var scene = this.sceneList[i];
            scene.anchorX = 0;
            scene.anchorY = 0;
            scene.x = 0;
            scene.y = -cc.visibleRect.height;
            if (this.currentIndex != i) {
                scene.setVisible(false);
            }
            this.animLayer.addChild(scene, this.sceneList.length - i);
        }
        var layerIn = cc.sequence(cc.moveTo(0.7, cc.p(0,0)), cc.callFunc(function () {
        	this.sceneList[0].appear(true);
        }, this));
        
//        var layerIn = cc.moveTo(1, cc.p(0,0));
        this.sceneList[0].visible = true;
        this.sceneList[0].runAction(layerIn);
//        this.sceneList[0].appear(true);
    },
    initHideEvent: function () {
        cc.eventManager.addCustomListener(cc.game.EVENT_SHOW, function () {
            playMusic(true);
        });
        cc.eventManager.addCustomListener(cc.game.EVENT_HIDE, function () {
            playMusic(false);
        });

    },
    toggleMusicCallback: function (sender) {
        if (sender.getSelectedIndex() == 0) {
            playMusic(true);
        } else {
            playMusic(false);
        }
    },
    togleArrow: function (status) {
        if (status) {
            this.arrow.visible = true;
        }
        else {
            this.arrow.visible = false;
        }
    },
    addTouch: function () {
        var self = this;
        self.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            startPosY: 0,
            onTouchBegan: function (touch, event) {
                this.startPosY = touch.getLocation().y;
                return true;
            },
            onTouchMoved: function (touch, event) {

            },
            onTouchEnded: function (touch, event) {
                if (musicPlayStatus) {
                    playMusic(true);
                }
                cc.log("touch end ", canChangePage);
                if (canChangePage) {
                    var delta = touch.getLocation().y - this.startPosY;
//                    if (self.currentIndex > 0 && self.currentIndex < self.sceneList.length - 1){
//                    	if (delta < -15){
//                    		self.changePage(--self.currentIndex, false);
//                    	}else if (delta > 0){
//                    		self.changePage(++self.currentIndex, true);
//                    	}
//                    }
                    if (delta >= 0 && self.currentIndex < self.sceneList.length - 1) {
                        self.changePage(++self.currentIndex, true);
                    } else if (delta < -15 && self.currentIndex > 0) {
                        self.changePage(--self.currentIndex, false);
                    }
                }
            },
            onTouchCancelled: function (touch, event) {

            }
        });
        cc.eventManager.addListener(self.listener, self);
    },
    addAccel: function () {
        var self = this;
        cc.inputManager.setAccelerometerInterval(1 / 30);
        cc.inputManager.setAccelerometerEnabled(true);
        this.accelListener = {
            event: cc.EventListener.ACCELERATION,
            callback: function (acc, event) {
                for (var i = 0; i < self.sceneList.length; ++i) {
                    self.sceneList[i].accelEvent(acc, event);
                }
            }
        }
        cc.eventManager.addListener(this.accelListener, self);
    },
    changePage: function (index, next) {
    	cc.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        canChangePage = false;
        var scene = next ? this.sceneList[index - 1] : this.sceneList[index + 1];
        if (index == this.sceneList.length-1) {
            this.togleArrow(false);
        } else {
            this.togleArrow(true);
        }
        var nextPage = function () {
            scene.visible = false;
//            this.sceneList[index].visible = true;
//            this.sceneList[index].appear(next);
        };
        if (scene) {
        	var h = next ? cc.visibleRect.height : -cc.visibleRect.height;
        	var layerOut = cc.sequence(cc.moveTo(0.7, cc.p(0, h)), cc.callFunc(function () {
//        			scene.disappear(nextPage, this, next);
    			this.sceneList[index].appear(next);
    		}, this));        		
        	
        	var layerIn = cc.sequence(cc.moveTo(0.7, cc.p(0,0)), cc.callFunc(function () {
        		scene.disappear(nextPage, this, next);
        	}, this));
        	
        	scene.runAction(layerOut);
        	this.sceneList[index].visible = true;
        	this.sceneList[index].runAction(layerIn);
        }
    }
});

var Layer1 = cc.LayerColor.extend({
//var Layer1 = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.initUI();
        
    },
    onEnter: function () {
    	this._super();
//        this.appear();
    },
    initUI: function () {
        canChangePage = false;
        this.setColor(cc.color(241, 145, 73, 0));
        this.setContentSize(cc.winSize);
        cc.log("winSize = ", cc.winSize.width, cc.winSize.height);
        cc.log("visibleRect center = ", cc.visibleRect.center.x, cc.visibleRect.center.y);

        this.accLayer = new cc.Layer();
        this.accLayer.anchorX = 0;
        this.accLayer.anchorY = 0;
        this.accLayer.x = 0;
        this.accLayer.y = 0;
        this.addChild(this.accLayer);
        cc.log("st width.....",cc.winSize.width, st.height, cc.size.width < st.height);
        if(cc.container.clientWidth < cc.container.clientHeight){
//        if (cc.winSize.width < st.height){
        	cc.log("..this is h.......")
//        if (cc.size.width < cc.size.height){
	        this.mainPic = new cc.Sprite("res/hpic/p1.png");
	        var mainPicSize = this.mainPic.getContentSize();
	        var dx = cc.winSize.width/mainPicSize.width;
	        var dy = cc.winSize.height/mainPicSize.height;
	        cc.log("dx = ", dx, "dy = ", dy);
	        this.mainPic.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2 ));
	        this.mainPic.setScale(dx, dy);
	        this.accLayer.addChild(this.mainPic);
	        
	        this.sp1 = new cc.Sprite("res/hpic/pw1.png");
	        this.sp1.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2 + 10));
	        this.sp1.opacity = 0;
	        this.sp1.setScale(dx, dy);
	        this.accLayer.addChild(this.sp1);
	    }else{
	    	this.mainPic = new cc.Sprite("res/wpic/p1.png");
	    	var mainPicSize = this.mainPic.getContentSize();
	    	var dx = cc.winSize.height/mainPicSize.height;
	    	cc.log("dx = ", dx);
	    	this.mainPic.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
	    	this.mainPic.setScale(0.83, dx);
	    	this.accLayer.addChild(this.mainPic);

	    	this.sp1 = new cc.Sprite("res/wpic/pw1.png");
	    	this.sp1.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2 + 10));
	    	this.sp1.opacity = 0;
	    	this.sp1.setScale(0.9, dx);
	    	this.accLayer.addChild(this.sp1);
	    }
    },
    accelEvent: function (acc, event) {
        if (this.visible) {
            movArea(acc, this.accLayer);
        }
    },
    appear: function (next) {
        canChangePage = true;
        this.sp1.sp1Action = cc.sequence(cc.fadeIn(1));
        this.sp1.runAction(this.sp1.sp1Action);

    },
    disappear: function (callback, target, next) {
    	var action; 
    	if (next){
    		action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

    		}, this), cc.delayTime(0.9), cc.callFunc(function () {

    			if (target && callback) {
    				callback.call(target);
    			}
    		}, this));
    	}else{
    		action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

    		}, this), cc.delayTime(0.9), cc.callFunc(function () {

    			if (target && callback) {
    				callback.call(target);
    			}
    		}, this));
    	}
    	this.sp1.opacity = 0;
//  	this.accLayer.runAction(action);
    }
});

var Layer2 = cc.LayerColor.extend({
	ctor: function () {
		this._super();
		this.initUI();
	},
	onEnter: function () {
		this._super();
//		this.appear();
	},
	initUI: function () {
		canChangePage = false;
		this.setColor(cc.color(254, 254, 254, 0));
		this.setContentSize(cc.winSize);
		this.accLayer = new cc.Layer();
		this.accLayer.anchorX = 0;
		this.accLayer.anchorY = 0;
		this.accLayer.x = 0;
		this.accLayer.y = 0;
		this.addChild(this.accLayer);

		if(cc.container.clientWidth < cc.container.clientHeight){
//		if (cc.size.width < cc.size.height){
			this.mainPic = new cc.Sprite("res/hpic/p2.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.width/mainPicSize.width;
			var dy = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(dx, dy);
			
			this.accLayer.addChild(this.mainPic);
	
			this.sp1 = new cc.Sprite("res/hpic/pw2.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2+10));
	//		this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(dx,dy);
			this.accLayer.addChild(this.sp1);
		}else{
			this.mainPic = new cc.Sprite("res/wpic/p2.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(0.83, dx);

			this.accLayer.addChild(this.mainPic);

			this.sp1 = new cc.Sprite("res/wpic/pw2.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2 + 10));
			//		this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(0.9,dx);
			this.accLayer.addChild(this.sp1);
		}
	},
	accelEvent: function (acc, event) {
		if (this.visible) {
			movArea(acc, this.accLayer);
		}
	},
	appear: function (next) {
		canChangePage = true;
		this.sp1.sp1Action = cc.sequence(cc.fadeIn(1));
		this.sp1.runAction(this.sp1.sp1Action);

	},
	disappear: function (callback, target, next) {
		var action; 
		if (next){
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}else{
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}
		this.sp1.opacity = 0;
//		this.accLayer.runAction(action);
	}
});

var Layer3 = cc.LayerColor.extend({
	ctor: function () {
		this._super();
		this.initUI();
	},
	onEnter: function () {
		this._super();
//		this.appear();
	},
	initUI: function () {
		canChangePage = false;
		this.setColor(cc.color(78, 193, 231, 0));
		this.setContentSize(cc.winSize);
		
		this.accLayer = new cc.Layer();
		this.accLayer.anchorX = 0;
		this.accLayer.anchorY = 0;
		this.accLayer.x = 0;
		this.accLayer.y = 0;
		this.addChild(this.accLayer);

		if(cc.container.clientWidth < cc.container.clientHeight){
//		if (cc.size.width < cc.size.height){
			this.mainPic = new cc.Sprite("res/hpic/p3.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.width/mainPicSize.width;
			var dy = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(dx, dy);
			this.accLayer.addChild(this.mainPic);
	
			this.sp1 = new cc.Sprite("res/hpic/pw3.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2+10));
	//		this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(dx, dy);
			this.accLayer.addChild(this.sp1);
		}else{
			this.mainPic = new cc.Sprite("res/wpic/p3.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(0.83, dx);
			this.accLayer.addChild(this.mainPic);
	
			this.sp1 = new cc.Sprite("res/wpic/pw3.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2 + 10));
	//		this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(0.9, dx);
			this.accLayer.addChild(this.sp1);
		}
	},
	accelEvent: function (acc, event) {
		if (this.visible) {
			movArea(acc, this.accLayer);
		}
	},
	appear: function (next) {
		canChangePage = true;
		this.sp1.sp1Action = cc.sequence(cc.fadeIn(1));
		this.sp1.runAction(this.sp1.sp1Action);

	},
	disappear: function (callback, target, next) {
		var action; 
		if (next){
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}else{
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}
		this.sp1.opacity = 0;
//		this.accLayer.runAction(action);
	}
});

var Layer4 = cc.LayerColor.extend({
	ctor: function () {
		this._super();
		this.initUI();
	},
	onEnter: function () {
		this._super();
//		this.appear();
	},
	initUI: function () {
		canChangePage = false;
		
		this.setColor(cc.color(212, 252, 254, 0));
		this.setContentSize(cc.winSize);
		
		this.accLayer = new cc.Layer();
		this.accLayer.anchorX = 0;
		this.accLayer.anchorY = 0;
		this.accLayer.x = 0;
		this.accLayer.y = 0;
		this.addChild(this.accLayer);

		if(cc.container.clientWidth < cc.container.clientHeight){
//		if (cc.size.width < cc.size.height){
			this.mainPic = new cc.Sprite("res/hpic/p4.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.width/mainPicSize.width;
			var dy = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(dx, dy);
			this.accLayer.addChild(this.mainPic);
	
			this.sp1 = new cc.Sprite("res/hpic/pw4.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2+10));
	//		this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(dx, dy);
			this.accLayer.addChild(this.sp1);
		}else{
			this.mainPic = new cc.Sprite("res/wpic/p4.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(0.83, dx);
			this.accLayer.addChild(this.mainPic);
	
			this.sp1 = new cc.Sprite("res/wpic/pw4.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2 + 10));
	//		this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(0.95, dx);
			this.accLayer.addChild(this.sp1);
		}
	},
	accelEvent: function (acc, event) {
		if (this.visible) {
			movArea(acc, this.accLayer);
		}
	},
	appear: function (next) {
		canChangePage = true;
		this.sp1.sp1Action = cc.sequence(cc.fadeIn(1));
		this.sp1.runAction(this.sp1.sp1Action);

	},
	disappear: function (callback, target, next) {
		var action; 
		if (next){
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}else{
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}
		this.sp1.opacity = 0;
//		this.accLayer.runAction(action);
	}
});

var Layer5 = cc.LayerColor.extend({
	ctor: function () {
		this._super();
		this.initUI();
	},
	onEnter: function () {
		this._super();
//		this.appear();
	},
	initUI: function () {
		canChangePage = false;
		this.setColor(cc.color(254, 254, 254, 0));
		this.setContentSize(cc.winSize);
		
		this.accLayer = new cc.Layer();
		this.accLayer.anchorX = 0;
		this.accLayer.anchorY = 0;
		this.accLayer.x = 0;
		this.accLayer.y = 0;
		this.addChild(this.accLayer);

		if(cc.container.clientWidth < cc.container.clientHeight){
//		if (cc.size.width < cc.size.height){
			this.mainPic = new cc.Sprite("res/hpic/p5.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.width/mainPicSize.width;
			var dy = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(dx, dy);
			this.accLayer.addChild(this.mainPic);
	
			this.sp1 = new cc.Sprite("res/hpic/pw5.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2+10));
	//		this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(dx, dy);
			this.accLayer.addChild(this.sp1);
		}else{
			this.mainPic = new cc.Sprite("res/wpic/p5.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(0.83, dx);
			this.accLayer.addChild(this.mainPic);

			this.sp1 = new cc.Sprite("res/wpic/pw5.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2 + 10));
			//		this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(0.9, dx);
			this.accLayer.addChild(this.sp1);
		}
	},
	accelEvent: function (acc, event) {
		if (this.visible) {
			movArea(acc, this.accLayer);
		}
	},
	appear: function (next) {
		canChangePage = true;
		this.sp1.sp1Action = cc.sequence(cc.fadeIn(1));
		this.sp1.runAction(this.sp1.sp1Action);

	},
	disappear: function (callback, target, next) {
		var action; 
		if (next){
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}else{
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}
		this.sp1.opacity = 0;
//		this.accLayer.runAction(action);
	}
});

var Layer6 = cc.LayerColor.extend({
	ctor: function () {
		this._super();
		this.initUI();
	},
	onEnter: function () {
		this._super();
//		this.appear();
	},
	initUI: function () {
		canChangePage = false;
		this.setColor(cc.color(94, 0, 23, 0));
		this.setContentSize(cc.winSize);
		
		this.accLayer = new cc.Layer();
		this.accLayer.anchorX = 0;
		this.accLayer.anchorY = 0;
		this.accLayer.x = 0;
		this.accLayer.y = 0;
		this.addChild(this.accLayer);

		if(cc.container.clientWidth < cc.container.clientHeight){
//		if (cc.size.width < cc.size.height){
			this.mainPic = new cc.Sprite("res/hpic/p6.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.width/mainPicSize.width;
			var dy = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(dx, dy);
			this.accLayer.addChild(this.mainPic);
	
			this.sp1 = new cc.Sprite("res/hpic/pw6.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2+10));
	//		this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(dx, dy);
			this.accLayer.addChild(this.sp1);
		}else{
			this.mainPic = new cc.Sprite("res/wpic/p6.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(0.83, dx);
			this.accLayer.addChild(this.mainPic);

			this.sp1 = new cc.Sprite("res/wpic/pw6.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2 + 10));
//			this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(0.9, dx);
			this.accLayer.addChild(this.sp1);
		}
	},
	accelEvent: function (acc, event) {
		if (this.visible) {
			movArea(acc, this.accLayer);
		}
	},
	appear: function (next) {
		canChangePage = true;
		this.sp1.sp1Action = cc.sequence(cc.fadeIn(1));
		this.sp1.runAction(this.sp1.sp1Action);

	},
	disappear: function (callback, target, next) {
		var action; 
		if (next){
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}else{
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}
		this.sp1.opacity = 0;
//		this.accLayer.runAction(action);
	}
});

var Layer7 = cc.LayerColor.extend({
	ctor: function () {
		this._super();
		this.initUI();
	},
	onEnter: function () {
		this._super();
//		this.appear();
	},
	initUI: function () {
		canChangePage = false;
		this.setColor(cc.color(173, 234, 123, 0));
		this.setContentSize(cc.winSize);
		
		this.accLayer = new cc.Layer();
		this.accLayer.anchorX = 0;
		this.accLayer.anchorY = 0;
		this.accLayer.x = 0;
		this.accLayer.y = 0;
		this.addChild(this.accLayer);

		if(cc.container.clientWidth < cc.container.clientHeight){
//		if (cc.size.width < cc.size.height){
			this.mainPic = new cc.Sprite("res/hpic/p7.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.width/mainPicSize.width;
			var dy = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(dx, dy);
			this.accLayer.addChild(this.mainPic);
	
			this.sp1 = new cc.Sprite("res/hpic/pw7.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
	//		this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(dx, dy);
			this.accLayer.addChild(this.sp1);
		}else{
			this.mainPic = new cc.Sprite("res/wpic/p7.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(0.83, dx);
			this.accLayer.addChild(this.mainPic);

			this.sp1 = new cc.Sprite("res/wpic/pw7.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2+10));
//			this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(0.9, dx);
			this.accLayer.addChild(this.sp1);
		}
	},
	accelEvent: function (acc, event) {
		if (this.visible) {
			movArea(acc, this.accLayer);
		}
	},
	appear: function (next) {
		canChangePage = true;
		this.sp1.sp1Action = cc.sequence(cc.fadeIn(1));
		this.sp1.runAction(this.sp1.sp1Action);

	},
	disappear: function (callback, target, next) {
		var action; 
		if (next){
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}else{
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}
		this.sp1.opacity = 0;
//		this.accLayer.runAction(action);
	}
});

var Layer8 = cc.LayerColor.extend({
	ctor: function () {
		this._super();
		this.initUI();
	},
	onEnter: function () {
		this._super();
//		this.appear();
	},
	initUI: function () {
		canChangePage = false;
		this.setColor(cc.color(0, 161, 233, 0));
		this.setContentSize(cc.winSize);
		
		this.accLayer = new cc.Layer();
		this.accLayer.anchorX = 0;
		this.accLayer.anchorY = 0;
		this.accLayer.x = 0;
		this.accLayer.y = 0;
		this.addChild(this.accLayer);

		if(cc.container.clientWidth < cc.container.clientHeight){
//		if (cc.size.width < cc.size.height){
			this.mainPic = new cc.Sprite("res/hpic/p8.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.width/mainPicSize.width;
			var dy = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(dx, dy);
			this.accLayer.addChild(this.mainPic);
	
			this.sp1 = new cc.Sprite("res/hpic/pw8.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
	//		this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(dx, dy);
			this.accLayer.addChild(this.sp1);
		}else{
			this.mainPic = new cc.Sprite("res/wpic/p8.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(0.83, dx);
			this.accLayer.addChild(this.mainPic);

			this.sp1 = new cc.Sprite("res/wpic/pw8.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2+10));
//			this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(0.9, dx);
			this.accLayer.addChild(this.sp1);
		}
	},
	accelEvent: function (acc, event) {
		if (this.visible) {
			movArea(acc, this.accLayer);
		}
	},
	appear: function (next) {
		canChangePage = true;
		this.sp1.sp1Action = cc.sequence(cc.fadeIn(1));
		this.sp1.runAction(this.sp1.sp1Action);

	},
	disappear: function (callback, target, next) {
		var action; 
		if (next){
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}else{
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}
		this.sp1.opacity = 0;
//		this.accLayer.runAction(action);
	}
});

var Layer9 = cc.LayerColor.extend({
	ctor: function () {
		this._super();
		this.initUI();
	},
	onEnter: function () {
		this._super();
//		this.appear();
	},
	initUI: function () {
		canChangePage = false;
		this.setColor(cc.color(255, 244, 92, 0));
		this.setContentSize(cc.winSize);
		
		this.accLayer = new cc.Layer();
		this.accLayer.anchorX = 0;
		this.accLayer.anchorY = 0;
		this.accLayer.x = 0;
		this.accLayer.y = 0;
		this.addChild(this.accLayer);

		if(cc.container.clientWidth < cc.container.clientHeight){
//		if (cc.size.width < cc.size.height){
			this.mainPic = new cc.Sprite("res/hpic/p9.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.width/mainPicSize.width;
			var dy = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(dx, dy);
			this.accLayer.addChild(this.mainPic);
	
			this.sp1 = new cc.Sprite("res/hpic/pw9.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
	//		this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(dx, dy);
			this.accLayer.addChild(this.sp1);
		}else{
			this.mainPic = new cc.Sprite("res/wpic/p9.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(0.83, dx);
			this.accLayer.addChild(this.mainPic);

			this.sp1 = new cc.Sprite("res/wpic/pw9.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2+10));
//			this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(0.9, dx);
			this.accLayer.addChild(this.sp1);
		}
	},
	accelEvent: function (acc, event) {
		if (this.visible) {
			movArea(acc, this.accLayer);
		}
	},
	appear: function (next) {
		canChangePage = true;
		this.sp1.sp1Action = cc.sequence(cc.fadeIn(1));
		this.sp1.runAction(this.sp1.sp1Action);

	},
	disappear: function (callback, target, next) {
		var action; 
		if (next){
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}else{
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}
		this.sp1.opacity = 0;
//		this.accLayer.runAction(action);
	}
});

var Layer10 = cc.LayerColor.extend({
	ctor: function () {
		this._super();
		this.initUI();
	},
	onEnter: function () {
		this._super();
//		this.appear();
	},
	initUI: function () {
		canChangePage = false;
		this.setColor(cc.color(255, 250, 185, 0));
		this.setContentSize(cc.winSize);
		
		this.accLayer = new cc.Layer();
		this.accLayer.anchorX = 0;
		this.accLayer.anchorY = 0;
		this.accLayer.x = 0;
		this.accLayer.y = 0;
		this.addChild(this.accLayer);

		if(cc.container.clientWidth < cc.container.clientHeight){
//		if (cc.size.width < cc.size.height){
			this.mainPic = new cc.Sprite("res/hpic/p10.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.width/mainPicSize.width;
			var dy = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(dx, dy);
			this.accLayer.addChild(this.mainPic);
	
			this.sp1 = new cc.Sprite("res/hpic/pw10.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
	//		this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(dx, dy);
			this.accLayer.addChild(this.sp1);
		}else{
			this.mainPic = new cc.Sprite("res/wpic/p10.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(0.83, dx);
			this.accLayer.addChild(this.mainPic);

			this.sp1 = new cc.Sprite("res/wpic/pw10.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2+10));
//			this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(0.9, dx);
			this.accLayer.addChild(this.sp1);
		}
	},
	accelEvent: function (acc, event) {
		if (this.visible) {
			movArea(acc, this.accLayer);
		}
	},
	appear: function (next) {
		canChangePage = true;
		this.sp1.sp1Action = cc.sequence(cc.fadeIn(1));
		this.sp1.runAction(this.sp1.sp1Action);

	},
	disappear: function (callback, target, next) {
		var action; 
		if (next){
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}else{
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}
		this.sp1.opacity = 0;
//		this.accLayer.runAction(action);
	}
});

var Layer11 = cc.LayerColor.extend({
	ctor: function () {
		this._super();
		this.initUI();
	},
	onEnter: function () {
		this._super();
//		this.appear();
	},
	initUI: function () {
		canChangePage = false;
		this.setColor(cc.color(255, 240, 0, 0));
		this.setContentSize(cc.winSize);
		
		this.accLayer = new cc.Layer();
		this.accLayer.anchorX = 0;
		this.accLayer.anchorY = 0;
		this.accLayer.x = 0;
		this.accLayer.y = 0;
		this.addChild(this.accLayer);

		if(cc.container.clientWidth < cc.container.clientHeight){
//		if (cc.size.width < cc.size.height){
			this.mainPic = new cc.Sprite("res/hpic/p11.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.width/mainPicSize.width;
			var dy = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(dx, dy);
			this.accLayer.addChild(this.mainPic);
	
			this.sp1 = new cc.Sprite("res/hpic/pw11.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
	//		this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(dx, dy);
			this.accLayer.addChild(this.sp1);
		}else{
			this.mainPic = new cc.Sprite("res/wpic/p11.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(0.83, dx);
			this.accLayer.addChild(this.mainPic);

			this.sp1 = new cc.Sprite("res/wpic/pw11.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2+10));
//			this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(0.9, dx);
			this.accLayer.addChild(this.sp1);
		}
	},
	accelEvent: function (acc, event) {
		if (this.visible) {
			movArea(acc, this.accLayer);
		}
	},
	appear: function (next) {
		canChangePage = true;
		this.sp1.sp1Action = cc.sequence(cc.fadeIn(1));
		this.sp1.runAction(this.sp1.sp1Action);

	},
	disappear: function (callback, target, next) {
		var action; 
		if (next){
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}else{
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}
		this.sp1.opacity = 0;
//		this.accLayer.runAction(action);
	}
});

var Layer12 = cc.LayerColor.extend({
	ctor: function () {
		this._super();
		this.initUI();
	},
	onEnter: function () {
		this._super();
//		this.appear();
	},
	initUI: function () {
		canChangePage = false;
		this.setColor(cc.color(78, 193, 231, 0));
		this.setContentSize(cc.winSize);
		this.accLayer = new cc.Layer();
		this.accLayer.anchorX = 0;
		this.accLayer.anchorY = 0;
		this.accLayer.x = 0;
		this.accLayer.y = 0;
		this.addChild(this.accLayer);

		if(cc.container.clientWidth < cc.container.clientHeight){
//		if (cc.size.width < cc.size.height){
			this.mainPic = new cc.Sprite("res/hpic/p12.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.width/mainPicSize.width;
			var dy = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(dx, dy);
			this.accLayer.addChild(this.mainPic);
	
			this.sp1 = new cc.Sprite("res/hpic/pw12.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
	//		this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(dx, dy);
			this.accLayer.addChild(this.sp1);
		}else{
			this.mainPic = new cc.Sprite("res/wpic/p12.png");
			var mainPicSize = this.mainPic.getContentSize();
			cc.log("PIC w,h", mainPicSize.width, mainPicSize.height);
			var dx = cc.winSize.height/mainPicSize.height;
			cc.log("dx = ", dx);
			this.mainPic.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2));
			this.mainPic.setScale(0.83, dx);
			this.accLayer.addChild(this.mainPic);

			this.sp1 = new cc.Sprite("res/wpic/pw12.png");
			this.sp1.setPosition(cc.p(cc.winSize.width/2,cc.winSize.height/2+10));
//			this.sp1.setVisible(false);
			this.sp1.opacity = 0;
			this.sp1.setScale(0.9, dx);
			this.accLayer.addChild(this.sp1);
		}
	},
	accelEvent: function (acc, event) {
		if (this.visible) {
			movArea(acc, this.accLayer);
		}
	},
	appear: function (next) {
		canChangePage = true;
		this.sp1.sp1Action = cc.sequence(cc.fadeIn(1));
		this.sp1.runAction(this.sp1.sp1Action);

	},
	disappear: function (callback, target, next) {
		var action; 
		if (next){
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}else{
			action = cc.sequence(cc.moveTo(0.5, cc.p(0, cc.visibleRect.height)), cc.callFunc(function () {

			}, this), cc.delayTime(0.9), cc.callFunc(function () {

				if (target && callback) {
					callback.call(target);
				}
			}, this));
		}
		this.sp1.opacity = 0;
//		this.accLayer.runAction(action);
	}
});

var movArea = function (acc, node) {
    var curx = node.x + 20 * acc.x;
    var cury = node.y + 20 * acc.y;
    node.x = Math.abs(curx) < 7 ? curx : node.x;
    node.y = Math.abs(cury) < 7 ? cury : node.y;

}
/************************************************************************************************************************************/
var reclick = true;
var isSuccess = false;
var musicPlayStatus = true;
var getById = function (id) {
    return "";//document.getElementById(id);
}
var moveIn = function () {
    var obj = getById();
}
function hasClass(ele, cls) {
    var result = ele && ele.className && (ele.className.search(new RegExp('(\\s|^)' + cls + '(\\s|$)')) != -1);
    return !!result;
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls) && ele)
        ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

window["onCloseClick"] = function () {
    removeClass(getById("regPage"), "anim");
    addClass(getById("regPage"), "animOut");
    var game = getById("Cocos2dGameContainer");
    removeClass(game,"hide");
    setTimeout(function () {
        addClass(getById("regPage"), "hide");
    }, 300);
}

window["onSubmitClick"] = function () {
    if (!reclick) {
        window["showAlert"]("申请发送中，请勿重复发送~");
        return false;
    }
    if (checkForm()) {
        reclick = false;
        post({
            "realname": getById("realname").value.trim(),
            "telephone": getById("telephone").value.trim(),
            "email": getById("email").value.trim(),
            "company": getById("company").value.trim(),
            "position": getById("position").value.trim(),
            "extra": getById("extra").value.trim(),
            "from": "mobile"
        }, function (result) {
            var message = "";
            if (result["status"] == 1) {
                isSuccess = true;
                message = "您的报名信息已经成功提交";
                window["showAlert"](message);
            } else {
                if (result["error"]) {
                    if (result["error"]["email_unique"]) {
                        message = result["error"]["email_unique"];
                    } else if (result["error"]["telephone_unique"]) {
                        message = result["error"]["telephone_unique"];
                    } else if (result["error"]["from"]) {
                        message = result["error"]["from"];
                    } else if (result["error"]["realname"]) {
                        message = result["error"]["realname"];
                    } else if (result["error"]["position"]) {
                        message = result["error"]["position"];
                    } else if (result["error"]["email"]) {
                        message = result["error"]["email"];
                    } else if (result["error"]["telephone"]) {
                        message = result["error"]["telephone"];
                    } else if (result["error"]["company"]) {
                        message = result["error"]["company"];
                    } else if (result["error"] && typeof result["error"] == "string") {
                        message = result["error"];
                    } else {
                        message = "未知错误";
                    }
                }
                window["showAlert"](message);
            }
        });
    }
}
window["onOkClick"] = function () {
    var alertItem = getById("alertItem");
    removeClass(alertItem, "alertAnimIn");
    addClass(alertItem, "alertAnimOut");
    setTimeout(function () {
        addClass(alertItem, "hide");
        if (isSuccess) {
            isSuccess = false;
            window["onCloseClick"]();
            if (curScene) {
                curScene.changePage(++curScene.currentIndex, true);
            }
        }
    }, 280);
}
window["showAlert"] = function (msg) {
    if (!msg) msg = "";
    var alertText = getById("alertText");
    var alertItem = getById("alertItem");
    alertText.innerHTML = msg;
    removeClass(alertItem, "alertAnimOut");
    addClass(alertItem, "alertAnimIn");
    removeClass(alertItem, "hide");
    setTimeout(function () {
        removeClass(alertItem, "alertAnimIn");
    }, 300);
}
var checkForm = function () {
    var checkStatus = true;
    var list = ["realname", "telephone", "email", "company", "position"];
    var data = [];
    for (var i = 0; i < list.length; i++) {
        data[i] = getById(list[i]).value.trim();
    }
    for (var i = 0; i < list.length; i++) {
        var item = getById(list[i]);
        if (data[i] == "") {
            removeClass(item, "inputItem_normal");
            addClass(item, "inputItem_error");
            item.placeholder = "此项不能为空";
            checkStatus = false;
        } else {
            removeClass(item, "inputItem_error");
            addClass(item, "inputItem_normal");
        }
    }
    var phoneReg = /^[0-9]*[1-9][0-9]*$/;
    if (data[1].length != 11 || !phoneReg.test(data[1])) {
        var item = getById(list[1]);
        data[1] = "";
        item.value = "";
        item.placeholder = "请输入正确的手机号码";
        removeClass(item, "inputItem_normal");
        addClass(item, "inputItem_error");
        checkStatus = false;
    } else {
        addClass(getById(list[2]), "inputItem_normal");
    }
    var emailReg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{1,4}$/gi;
    if (!emailReg.test(data[2])) {
        var item = getById(list[2]);
        data[2] = "";
        item.value = "";
        item.placeholder = "请输入正确的邮箱";
        removeClass(item, "inputItem_normal");
        addClass(item, "inputItem_error");
        checkStatus = false;
    } else {
        addClass(getById(list[2]), "inputItem_normal");
    }
    return checkStatus;
}
var post = function (data, callfunc) {
    var self = this;
    var xhr = cc.loader.getXMLHttpRequest();
    var oUrl = window.location.host;
    oUrl = encodeURIComponent(oUrl);
    xhr.open("POST", "YOUR URL", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
    xhr.timeout = 10000;
    xhr.ontimeout = function () {
        reclick = true;
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            reclick = true;
        }
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = JSON.parse(xhr.responseText);
            callfunc(result);
        }
    };
    var param = "";
    for (var key in data) {
        param = param + key + "=" + data[key] + "&";
    }
    param = encodeURI(param);
    xhr.send(param);
};
var initMusic = function () {
    var audio = getById("myAudio");
//    audio.src = "res/bg.mp3";
}
var playMusic = function (status) {
    var audio = getById("myAudio");
//    if (status) {
//        if (audio.paused) {
//            audio.play();
//            musicPlayStatus = true;
//        }
//    } else {
//        if (!audio.paused) {
//            audio.pause();
//            musicPlayStatus = false;
//        }
//    }
}