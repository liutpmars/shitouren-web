
var MyDialog = cc.Layer.extend({
	ctor:function(param){
		this._super();
		
		this.param = param;
		var size = cc.winSize;
		var background = new cc.Sprite(res.DialogBack_png);
		background.attr({
			x:size.width/2 - 100,
			y:size.height/2,
			anchorX: 0.5,
			anchorY: 0.5
		});
		
//		background.setContentSize(200, 100);
		
		this.addChild(background);
		
//		var txtTip = new cc.LabelTTF("确认提交？");
//		txtTip.attr({
//			x:size.width/2 ,
//			y:size.height/2,
//			anchorX: 0.5,
//			anchorY: 0.5
//		});
//		this.addChild(txtTip);
		
		var dlgBack = new cc.Sprite(res.dlgBack_png);
		dlgBack.attr({
			x:size.width/2 - 400,
			y:size.height/2 - 200,
			anchorX: 0.5,
			anchorY: 0.5,
			scale:0.3
		});
		this.addChild(dlgBack);
		
		var self = this;
		// add a "close" icon to exit the progress. it's an autorelease object
		var okItem = new cc.MenuItemImage(
				res.Yes_png,
				res.Yes_png,
				function () {
					cc.log("shi 。。。");
					self.param.btnOk();
				}, this);
		okItem.attr({
			x: size.width/2 -470,
			y: size.height/2-230,
			anchorX: 0.5,
			anchorY: 0.5,
			scale:0.25
		});
		
		var cancelItem = new cc.MenuItemImage(
			res.No_png,
			res.No_png,
			function () {
				cc.log("bushi 。。。");
				self.param.btnCancel();
			}, this);
		cancelItem.attr({
			x: size.width/2 -330,
			y: size.height/2 -230,
			anchorX: 0.5,
			anchorY: 0.5,
			scale:0.25
		});
		var menu = new cc.Menu(okItem, cancelItem);
		menu.x = 0;
		menu.y = 0;

		this.addChild(menu, 1);
	},
	
	onEnter:function(param){
		this._super();
	}
});