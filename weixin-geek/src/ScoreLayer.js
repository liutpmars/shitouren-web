
var ScoreLayer  = cc.Layer.extend({
	ctor:function(param){
		this._super();
		
		var sp1 = new cc.Sprite(res.ScoreBack_png);
		sp1.attr({
			x: cc.winSize.width/2 ,
			y: cc.winSize.height/2,
			anchorX: 0.5,
			anchorY: 0.5,
			scale:0.5
		});
		this.addChild(sp1);
		
		var spScore = new cc.Sprite(res.Score_png);
		spScore.attr({
			x: cc.winSize.width/2 ,
			y: cc.winSize.height/2,
			anchorX: 0.5,
			anchorY: 0.5,
			scale:0.27
		});
		this.addChild(spScore);
		
		var useScore = param.score;
		var useInfo1 = "呵呵";
		var useInfo2 = "没有打败任何人";
		
		var txtScore = new cc.LabelTTF(useScore);
		txtScore.setFontSize(40);
		txtScore.setColor(cc.color(250, 0, 0, 0));
		txtScore.attr({
			x: cc.winSize.width/2 -60,
			y: cc.winSize.height/2+100,
			anchorX: 0.5,
			anchorY: 0.5,
			
		});
		txtScore.setRotation(36);
		this.addChild(txtScore);
		
		var txtUseInfo1 = new cc.LabelTTF(useInfo1);
//		txtUseInfo1.setFontSize(40);
//		txtUseInfo1.setColor(cc.color(250, 0, 0, 0));
		txtUseInfo1.attr({
			x: cc.winSize.width/2 +60,
			y: cc.winSize.height/2+ 90,
			anchorX: 0.5,
			anchorY: 0.5,

		});
		txtUseInfo1.setRotation(-36);
		this.addChild(txtUseInfo1);
		
		var txtUseInfo2 = new cc.LabelTTF(useInfo2);
//		txtUseInfo2.setFontSize(40);
//		txtUseInfo2.setColor(cc.color(250, 0, 0, 0));
		txtUseInfo2.attr({
			x: cc.winSize.width/2 +70,
			y: cc.winSize.height/2+70,
			anchorX: 0.5,
			anchorY: 0.5,

		});
		txtUseInfo2.setRotation(-36);
		this.addChild(txtUseInfo2);
	},
	
	onEnter:function(param){
		this._super();
	}
});