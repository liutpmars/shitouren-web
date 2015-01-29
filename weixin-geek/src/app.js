
var mapLayerState = 0;
var canMouseHandle = false;
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        var self = this;
        
        self.bg = new cc.Sprite(res.MapBG_png);
        self.bg.attr({
        	x: size.width / 2,
        	y: size.height / 2,
        	anchorX: 0.5,
        	anchorY: 0.5
        });
        self.addChild(self.bg);
        
        self.mapTip = new cc.Sprite(res.MapTip_png);
        self.mapTip.attr({
        	x: size.width / 2 - 30,
        	y: size.height / 2 + 160,
        	anchorX: 0.5,
        	anchorY: 0.5,
        	scale:0.25
        });
        self.addChild(self.mapTip);
        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
//                self.bigMap.setScale(0);
                self.bigMap.setVisible(false);
                self.smallMap.setVisible(true);
                self.backButton.setVisible(false);
                self.mapTip.setVisible(true);
                mapLayerState = 0;
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
       
        // add "HelloWorld" splash screen"
        this.smallMap = new cc.Sprite(res.Map1_png);
        this.smallMap.attr({
            x: size.width / 2,
            y: size.height / 2,
            opacity:0,
            scale:0.3
        });
        this.addChild(this.smallMap, 0);

        this.smallMap.runAction( cc.sequence(cc.fadeIn(1.5), cc.callFunc(function(){
        	canMouseHandle = true;
        }, this))  );
        
        this.bigMap = new cc.Sprite(res.Map1_png);
        this.bigMap.attr({
        	anchorX: 0,
        	anchorY: 0,
        	scale:1
        });
//        this.bigMap.setScale(0);
        this.bigMap.setVisible(false);
        this.addChild(this.bigMap);
      
        this.addChild(menu, 1);
        this.backButton = menu;
        menu.setVisible(false);
        
//        var city = new cc.Sprite();
        
        //以下代码需要删除，仅供测试定位使用。。。。。
//        var testmark = new cc.Sprite("res/CloseNormal.png");
//        testmark.setScale(0.4);
//        testmark.setPosition(cc.p(size.width / 2, size.height / 2));
//        this.addChild(testmark);
//        
//        var testmark1 = new cc.Sprite("res/CloseNormal.png");
//        testmark1.setScale(0.4);
//        testmark1.setPosition(cc.p(0, 0));
//        this.addChild(testmark1);
//        
//        var testmark2 = new cc.Sprite("res/CloseNormal.png");
//        testmark2.setScale(0.4);
//        testmark2.setPosition(cc.p(size.width , size.height ));
//        this.addChild(testmark2);
//        
//        
//        var s = self.bigMap.getContentSize();
//        var testmapmark1 = new cc.Sprite("res/CloseNormal.png");
//        testmapmark1.setScale(0.5);
//        testmapmark1.setPosition(cc.p(0 , 0 ));
//        this.bigMap.addChild(testmapmark1);
//        var testmapmark2 = new cc.Sprite("res/CloseNormal.png");
//        testmapmark2.setScale(0.5);
//        testmapmark2.setPosition(cc.p(s.width , s.height ));
//        this.bigMap.addChild(testmapmark2);
//        var testmapmark3 = new cc.Sprite("res/CloseNormal.png");
//        testmapmark3.setScale(0.5);
//        testmapmark3.setPosition(cc.p(s.width , 0 ));
//        this.bigMap.addChild(testmapmark3);
//        var testmapmark4 = new cc.Sprite("res/CloseNormal.png");
//        testmapmark4.setScale(0.5);
//        testmapmark4.setPosition(cc.p(0 , s.height ));
//        this.bigMap.addChild(testmapmark4);
        //----------------------------------------------
        
        return true;
    },
    
    onEnter:function(){
    	this._super();
    	this.initMap();
    	this.addTouch();
    },
    
    initMap:function(){
    	var md = mapData.map1;
    	this.bigCityList = [];
    	this.smallCityList = [];
    	for (var i = 0; i < md.length; i++) {
			var mpItem = md[i];
			cc.log("init map is ", mpItem.id, mpItem.name);
			var pos = mpItem.pos;
			
			var bigcity = new cc.Sprite(mpItem.pic);
			bigcity.setPosition(pos);
//			bigcity.setScale(0.5);
			this.bigMap.addChild(bigcity);
			this.bigCityList.push(bigcity);
			
			var city = new cc.Sprite(mpItem.pic);
			city.setPosition(pos);
			this.smallMap.addChild(city);
			this.smallCityList.push(city);
			
		}
    	
    },
    
    isInRect:function (pt, r) {
//    	cc.log(pt.x, r.x , r.x + r.width , pt.y , r.y , r.y + r.height);
    	if (pt.x > r.x && pt.x < r.x + r.width && pt.y > r.y && pt.y < r.y + r.height){
    		return true;
    	}
    	return false;
    },
    
    addTouch: function () {
    	var self = this;
    	self.listener = cc.EventListener.create({
    		event: cc.EventListener.TOUCH_ONE_BY_ONE,
    		swallowTouches: true,
    		startPosY: 0,
    		moveX:0,
    		moveY:0,
    		onTouchBegan: function (touch, event) {
    			this.startPosY = touch.getLocation().y;
    			
    			this.moveX = touch.getLocation().x;
    			this.moveY = touch.getLocation().y;
    			return true;
    		},
    		onTouchMoved: function (touch, event) {
    			if (!canMouseHandle){return;}
    			if (mapLayerState == 1){
    				var mX = touch.getLocation().x;
    				var mY = touch.getLocation().y;
    				var dX = mX - this.moveX;
    				var dY = mY - this.moveY;
    				self.bigMap.setPosition(cc.pAdd( self.bigMap.getPosition(), cc.p(dX, dY)));
    				this.moveX = mX;
    				this.moveY = mY;
    				
//    				var p = self.bigMap.getPosition();
//    				cc.log("ditu map..", p.x, p.y);
    			}
    		},
    		onTouchEnded: function (touch, event) {
    			if (!canMouseHandle){return;}
    			var pt = touch.getLocation();
    			if (pt.y - this.startPosY > 5 || pt.y - this.startPosY < -5 ) {return ;}
    			
    			var md = mapData.map1;
    			if (mapLayerState == 0){
    				
    				pt = self.smallMap.convertToNodeSpace(pt);
    				cc.log("当前点击的位置是。。", pt.x, pt.y);
   					
					for (var j = 0; j < self.smallCityList.length; j++) {
						var city = self.smallCityList[j];
						var r = city.getBoundingBox();
						if (self.isInRect(pt, r)){
//							if (r.containsPoint(pt)){
							var mpItem = md[j];
							cc.log("当前选中了。。。", mpItem.name);
							
							self.backButton.setVisible(true);
							mapLayerState = 1;
							
							var mapSize = self.bigMap.getContentSize();
							
							self.bigMap.setAnchorPoint(mpItem.pos.x/mapSize.width, mpItem.pos.y/mapSize.height);
							self.bigMap.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
							
//							var mapAction = cc.spawn(cc.moveTo(1, cc.p(cc.winSize.width/2, cc.winSize.height/2)), cc.scaleTo(1, 1));
//							self.bigMap.runAction(mapAction);
							
							self.bigMap.setVisible(true);
							self.smallMap.setVisible(false);
							self.mapTip.setVisible(false);
							break;
						}

    				}
    			}else if (mapLayerState == 1){
    				
    				pt = self.bigMap.convertToNodeSpace(pt);
    				cc.log("当前点击的位置是。。", pt.x, pt.y);

    				for (var j = 0; j < self.bigCityList.length; j++) {
    					var city = self.bigCityList[j];
    					var r = city.getBoundingBox();
    					if (self.isInRect(pt, r)){
    						var mpItem = md[j];
    						self.backButton.setVisible(false);
    						cc.log("mpItem.id = ", mpItem.id);
    						var isHavData = Tesks[mpItem.id];
    						if (curPro == "food"){
    							isHavData = Foods[mpItem.id];
    						}
    						if (isHavData){
    							var param = {"teskID":mpItem.id, "cityInfo":mpItem};
    							var tesklayer = new TeskLayer(param);
//  							tesklayer.setPosition(cc.winSize.width/2, cc.winSize.height/2);
    							self.addChild(tesklayer);
    							mapLayerState = 2;
    							self.smallMap.setVisible(false);
    							self.bigMap.setVisible(false);
    							break;
    						}
    						
    					}
    				}
    			}
    			
    		},
    		onTouchCancelled: function (touch, event) {
    		}
    	});
    	cc.eventManager.addListener(self.listener, self);
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});




