
var TwoLayer = cc.Layer.extend({
	sprite:null,
	ctor:function () {
		//////////////////////////////
		// 1. super init first
		this._super();
		
		var size = cc.winSize;
		
		var helloLabel = new cc.LabelTTF("极佳的视觉体验", "Arial", 38);
		// position the label on the center of the screen
		helloLabel.x = size.width / 2;
		helloLabel.y = 0;
		// add the label as a child to this layer
		this.addChild(helloLabel, 5);
		
		helloLabel.runAction(
			cc.spawn(
				cc.moveBy(2.5, cc.p(0, size.height - 40)),
				cc.tintTo(2.5,255,125,0)
			)
		);
	}
})