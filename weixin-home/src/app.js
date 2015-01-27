
//require('src/LayerManager.js');
//require('src/twoLayer.js');

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
        
//        new ccui.ScrollView();
//        var tv = new cc.TableView();
        
        
//        cc.log(arguments[0]);
//        cc.log(arguments[1]);
//        cc.log(arguments[2]);
        var curIndex = arguments[0];
        this.curIndex = curIndex;
        
        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem1 = new cc.MenuItemImage(
            res.CloseNormal_png, res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
                var mainScene = cc.director.getRunningScene();
//                var tlayer = new TwoLayer();
//                this.addChild(tlayer);
                mainScene.showNextLayer(curIndex, 4);
            }, this);
        closeItem1.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });
        
        var closeItem2 = new cc.MenuItemImage(
        		res.CloseNormal_png, res.CloseSelected_png,
        		function () {
        			cc.log("Menu is clicked!");
        			var mainScene = cc.director.getRunningScene();
//      			var tlayer = new TwoLayer();
//      			this.addChild(tlayer);
        			mainScene.showNextLayer(curIndex,3);
        		}, this);
        closeItem2.attr({
        	x: size.width - 20,
        	y: 45,
        	anchorX: 0.5,
        	anchorY: 0.5
        });
        
        var closeItem3 = new cc.MenuItemImage(
        		res.CloseNormal_png, res.CloseSelected_png,
        		function () {
        			cc.log("Menu is clicked!");
        			var mainScene = cc.director.getRunningScene();
//      			var tlayer = new TwoLayer();
//      			this.addChild(tlayer);
        			mainScene.showNextLayer(curIndex,2);
        		}, this);
        closeItem3.attr({
        	x: size.width - 20,
        	y: 70,
        	anchorX: 0.5,
        	anchorY: 0.5
        });
        
        var closeItem4 = new cc.MenuItemImage(
        		res.CloseNormal_png, res.CloseSelected_png,
        		function () {
        			cc.log("Menu is clicked!");
        			var mainScene = cc.director.getRunningScene();
//      			var tlayer = new TwoLayer();
//      			this.addChild(tlayer);
        			mainScene.showNextLayer(curIndex,1);
        		}, this);
        closeItem4.attr({
        	x: size.width - 20,
        	y: 95,
        	anchorX: 0.5,
        	anchorY: 0.5
        });
        
        var closeItem5 = new cc.MenuItemImage(
        		res.CloseNormal_png, res.CloseSelected_png,
        		function () {
        			cc.log("Menu is clicked!");
        			var mainScene = cc.director.getRunningScene();
//      			var tlayer = new TwoLayer();
//      			this.addChild(tlayer);
        			mainScene.showNextLayer(curIndex,0);
        		}, this);
        closeItem5.attr({
        	x: size.width - 20,
        	y: 120,
        	anchorX: 0.5,
        	anchorY: 0.5
        });

        var menu = new cc.Menu(closeItem1,closeItem2,closeItem3,closeItem4,closeItem5);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF(arguments[2], "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(arguments[1]);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 0
        });
        this.addChild(this.sprite, 0);

        this.sprite.runAction(
            cc.sequence(
//                cc.rotateTo(2, 0),
                cc.scaleTo(2, 1, 1)
            )
        );
        helloLabel.runAction(
            cc.spawn(
                cc.moveBy(2.5, cc.p(0, size.height - 40)),
                cc.tintTo(2.5,255,125,0)
            )
        );
        this.helloLabel = helloLabel;
        this.actBegan = actBegan;
        this.actFinsh = actFinsh;
        return true;
    },
    act1:function() {
		
	}
});

actBegan = function(){
	var size = cc.winSize;
	this.helloLabel.x = size.width / 2;
	this.helloLabel.y = 0;
	this.helloLabel.setVisible(false);
};
actFinsh = function(){
//	alert("finsh.......");
	cc.log("dang qian xianshi de shi......");
	cc.log(this.curIndex);
	var size = cc.winSize;
	this.helloLabel.setVisible(true);
	this.helloLabel.runAction(
			cc.spawn(
					cc.moveBy(2.5, cc.p(0, size.height - 40)),
					cc.tintTo(2.5,255,125,0)
			)
	);
};

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
        var pages = [
             {path1:"res/HelloWorld.png", desc:"北海旅遊"},
             {path1:"res/myPic1.png", desc:"石頭人"},
             {path1:"res/myPic2.png", desc:"Q版流行地圖"},
             {path1:"res/myPic3.png", desc:"吃貨的天堂"},
             {path1:"res/myPic4.png", desc:"潿洲島"}
        ];
        var size = cc.winSize;
        for (var i = 0; i < 5; i++) {
        	cc.log(i, pages[i].path1);
        	
        	var layer = new HelloWorldLayer(i, pages[i]['path1'], pages[i].desc);
        	layer.setVisible(true);
        	layer.setPosition(0, (size.height*-1)*i);
        	this.addChild(layer);
        	layer.setTag(i);
			
		}
        
//        var layer = new HelloWorldLayer("1",res.HelloWorld_png, "北海   旅游");
//        layer.setVisible(true);
//        this.addChild(layer);
//        layer.setTag(1);
//        
//        var layer1 = new HelloWorldLayer("2",res.MYPicTest_png, "中国 涠洲岛");
//        layer1.setVisible(false);
//        this.addChild(layer1);
//        layer1.setTag(2);
//        
//        var tlayer = new TwoLayer();
//        tlayer.setVisible(false);
//        this.addChild(tlayer);
//        tlayer.setTag(3);
        
        
        this.showNextLayer = showNextLayer;
        this.showNextLayer(-1,0);
    }
    
});

showNextLayer = function (oldIndex, newIndex){
	
	if(oldIndex == -1){
		var layer = this.getChildByTag(newIndex);
		layer.setVisible(true);
		return;
	}
	var size = cc.winSize;
	
	if(oldIndex == newIndex){
		return;
	}
	var layerOld = this.getChildByTag(oldIndex);
	var layerNew = this.getChildByTag(newIndex);
	var dH = (newIndex - oldIndex)*size.height;
	for (var i = 0; i < 5; i++) {
		var layer = this.getChildByTag(i);
		if(newIndex == i){
			layer.runAction(
					cc.sequence(
					cc.callFunc(layer.actBegan, layer),
					cc.moveBy(2.5, cc.p(0, dH)),
					cc.callFunc(layer.actFinsh, layer)
				))
		}else{
			layer.runAction(
					cc.sequence(
							cc.moveBy(2.5, cc.p(0, dH))
					))
		}
		
	}
	
//	else if(oldIndex > newIndex){
//		var layerOld = this.getChildByTag(oldIndex);
//		var layerNew = this.getChildByTag(newIndex);
//		layerOld.runAction(
//			cc.spawn(
//				cc.moveTo(2.5, cc.p(0, size.height))
//			)
//		)
//		layerNew.runAction(
//				cc.spawn(
//						cc.moveTo(2.5, cc.p(0, size.height - 40))
//						))
//		
//	}else{
//		var layerOld = this.getChildByTag(oldIndex);
//		var layerNew = this.getChildByTag(newIndex);
//		layerNew.setPosition(cc.p());
//		layerOld.runAction(
//				cc.spawn(
//						cc.moveTo(2.5, cc.p(0, size.height))
//				))
//		layerNew.runAction(
//				cc.spawn(
//						cc.moveTo(2.5, cc.p(0, size.height - 40))
//				))
//
//	}
	
	
//	for (var i = 0; i < 5; i++) {
//		var layer = this.getChildByTag(i);
//		layer.setVisible(false);
//	}
//	
//	var layer = this.getChildByTag(index);
//	layer.setVisible(true);
	
	
}

