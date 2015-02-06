
var TeskLayer = cc.Layer.extend({
	ctor:function(param){
		this._super();
		this.param = param;
		this.cityIndex = param.cityInfo.index;
		this.currentIndex = 0;
		this.SelCount = 0;
		var size = cc.winSize;
		this.canChangePage = true;
		
		var background = new cc.Sprite(res.backGray);
		background.attr({
			x: cc.winSize.width/2,
			y: cc.winSize.height/2,
			anchorX: 0.5,
			anchorY: 0.5
//			scale:7.4
		});
		background.setContentSize(cc.winSize.width, cc.winSize.height);
		this.addChild(background);
		
		this.teskItemLayer = new cc.Layer();
//		this.teskItemLayer = new cc.LayerColor(cc.color(250, 0, 0, 0));
		this.teskItemLayer.attr({
			x:0,y:0,
			anchorX:0, anchorY:0
		});
		this.teskItemLayer.setContentSize(cc.winSize);
		this.addChild(this.teskItemLayer); 
		
		var titlePath = "res/titletask.png";
		if (curPro == "food"){
			titlePath = "res/titlefood.png";
		}
		this.title = new cc.Sprite(titlePath);
		var s = this.title.getContentSize();
		
		this.captionLayer = new cc.Layer();
		var captionHeight = 120;
		var titleScale = 0.29;
		if (cc.winSize.width < cc.winSize.height){
			titleScale = cc.winSize.width/s.width;
			captionHeight = s.height * titleScale ;
		}
		
		cc.log(".....", titleScale, captionHeight);
		this.captionLayer.attr({
			x:0,y:cc.winSize.height-captionHeight,
			anchorX:0, anchorY:0
		});
		this.captionLayer.setContentSize(cc.size(cc.winSize.width, captionHeight));
				
		this.addChild(this.captionLayer);
				
		this.title.attr({
			x: cc.winSize.width/2,
			y: captionHeight/2,   //cc.winSize.height/2,  //-s.height*dx +50,
			anchorX: 0.5,
			anchorY: 0.5,
			scale:titleScale
		});
//		this.setContentSize(size, height)
//		this.title.setPosition(cc.winSize.width/2, cc.winSize.height/2);
		this.captionLayer.addChild(this.title);
		var box = this.title.getBoundingBox();
//		this.title.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height - box.height/2));
		
//		ccs.csLoader
//		var rNode = (new ccs.csLoader()).createNode(res.TeskCell_csb);
//		this.addChild(rNode);
		
		var self = this;
		// add a "close" icon to exit the progress. it's an autorelease object
		var okItem = new cc.MenuItemImage(
				res.btnOK,
				res.btnOK,
				function () {
					cc.log("确认提交。。。");
					self.canChangePage = false;						
					
					var dlgParam = {"father" :self};
					dlgParam.btnOk = function(){
						
//						cc.loader.getUrl(basePath, url)
						var req = cc.loader.getXMLHttpRequest();
						req.open("POST", "http://www.shitouren.com/api/geek/main/post");
						req.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
						
						req.onreadystatechange = function(){
							if (req.readyState == 4 && (req.status >= 200 && req.status <= 207)) {  
								var httpStatus = req.statusText;  
								var response = req.responseText;  
								cc.log("httpStatus = ", httpStatus);
								cc.log("response = ", response);
//							 
								var json1 = (new Function("return " + response))()
								
								self.removeChild(self.dialog, true);
								self.scoreLayer = new ScoreLayer({"score": json1.results.score, "compete":json1.results.compete});
								self.scoreLayer.attr({
									x:0,
									y:0,
									anchorX: 0,
									anchorY: 0
								});	
								self.setVisible(false);
								mainScene.addChild(self.scoreLayer);
							}  
						};
						
						var postIndex = 1;
						var postData = "postData={\"index\":" + postIndex + ",\"param\":{\"cityid\":" + self.cityIndex + ",\"taskids\":[";
						
						var taskID = []
						var isF = true;
						for (var k = 0; k < self.teskList.length; k++) {
							var taskL = self.teskList[k];
							var isSel = taskL.getMarkVisible();
							if (isSel){
								taskID.push(k);
								if (isF){
									postData = postData + k;
								}
								else{
									postData = postData + "," + k; 
								}
								isF = false;
							}
						}
//						postData = postData.substring(0, postData.length - 2);
						postData = postData + "]}}";
						
//						var postData =  {
//								"index":1,   //客户端发送指令序号，从1开始，自动递增
//								"param":{
//									"cityid":self.cityIndex,
//									"taskids":taskID
//								}
//
//						}
						cc.log(postData);
//						cc.log(postData.toString());
						req.send(postData);
//						req.
//						req.send("{index:1, param:{cityid:10,taskids:[1,3,6]}");
//						req.send("postData={\"index\":2,\"param\":{\"cityid\":10,\"taskids\":[1, 2, 3]}}");
//						req.
					};
					dlgParam.btnCancel = function(){
						self.removeChild(self.dialog, true);
						self.okItem.setEnabled(true);
						self.canChangePage = true;
						cc.log("canchanggePage...", self.canChangePage);
					};
					self.dialog = new MyDialog(dlgParam);
					self.dialog.attr({
						x:size.width/2,
						y:size.height/2,
						anchorX: 0.5,
						anchorY: 0.5
					});
					self.addChild(self.dialog);
					self.okItem.setEnabled(false);

				}, this);
		okItem.attr({
			x: size.width/2 + 150,
			y: 80,
			anchorX: 0.5,
			anchorY: 0.5,
			scale:0.25
		});
		self.okItem = okItem;

		var menu = new cc.Menu(okItem);
		menu.x = 0;
		menu.y = 0;
		
		this.captionLayer.addChild(menu, 1);
		this.btnOK = menu;
		
		var data;
		if (curPro == "food"){
			data = Foods[param.teskID];
		}else{
			data = Tesks[param.teskID];
		}
		var listCount = data.length;
		
//		var str = String.format(" {0} / {1} ", this.SelCount, listCount);
		this.txtSel = new cc.LabelTTF(" " + this.SelCount + " / " + listCount + " ");
//		this.txtSel.setColor(cc.color(0, 0, 0, 0));
		this.txtSel.attr({
			x:size.width/2+140,y:50,
			anchorX:0.5,anchorY:0.5
		});
		this.captionLayer.addChild(this.txtSel);
		
		this.teskList = [];
		for(var i = 0; i < listCount; i++){
			var dataItem = data[i];
			var tesk = new TeskList({teskIndex:i, "data":dataItem, "taskHeight":cc.winSize.height-captionHeight});
			this.teskItemLayer.addChild(tesk);
			tesk.setPosition(0, -cc.winSize.height);
			
			tesk.setContentSize(cc.size(cc.winSize.width, cc.winSize.height-captionHeight));
//			cc.
			this.teskList.push(tesk);
		}
		
		if (this.teskList.length > 0){
			this.teskList[0].runAction(cc.sequence(cc.moveTo(0.7, cc.p(0,0)), cc.callFunc(function(){
				this.teskList[0].appear();
			}, this)));
		}
		
	},
	
	onEnter:function(param){
		this._super();
		
		this.addTouch();
	},
	
	addTouch:function(){
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
//				if (musicPlayStatus) {
//					playMusic(true);
//				}
				cc.log("item layer  touch end....");
//				var canChangePage = true;
				if (self.canChangePage) {
					var delta = touch.getLocation().y - this.startPosY;
					cc.log("delta...", delta);
					if (delta > -3 && delta < 3){
						cc.log("dianji le zheli......");
						var cell = self.teskList[self.currentIndex];
						var pt = touch.getLocation();
						pt = cell.convertToNodeSpace(pt);
						cc.log(pt.x,pt.y);
						if (cell.isSelCtol(pt)){
							var isSel = cell.getMarkVisible();
							cell.setMarkVisible(!isSel);
							if (isSel){
								self.SelCount--;
							}else{
								self.SelCount++;
							}
							self.txtSel.setString(" " + self.SelCount + " / " + self.teskList.length + " ");
						}	
							
					}else if (delta > 15 && self.currentIndex < self.teskList.length - 1) {
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
	
	changePage:function(index, next){
//		canChangePage = false;
		var scene = next ? this.teskList[index - 1] : this.teskList[index + 1];

		cc.log("...........",index, next);
		var nextPage = function () {
			scene.visible = false;
			this.teskList[index].visible = true;
//			this.sceneList[index].appear();
		};
		if (scene) {
			var h = next ? cc.winSize.height : -cc.winSize.height
			scene.runAction(cc.sequence(cc.moveTo(0.7, cc.p(0,h)), cc.callFunc(function(){
				scene.disappear(nextPage, this);
			}, this)));
			this.teskList[index].runAction(cc.sequence(cc.moveTo(0.7, cc.p(0,0)), cc.callFunc(function(){
				this.teskList[index].appear();
			}, this)));
			
			
		}
	}
});

var TeskList = cc.Layer.extend({
	ctor:function(param){
		this._super();
		var size = cc.winSize;
		this.teskIndex = param.teskIndex;
		cc.log("teskIndex = ", this.teskIndex);
		this.isSel = false;
		var data = param.data;
		
		this.mainPic = new cc.Sprite(data.picName);
		this.mainPic.attr({
			x: size.width/2 ,
			y: param.taskHeight/2+20,
			anchorX: 0.5,
			anchorY: 0.5,
			scale:0.25
		});
		if (cc.winSize.width < cc.winSize.height){
			this.mainPic.setScale(0.5);
			this.mainPic.setPositionY(param.taskHeight/2+130);
		}
		
		this.addChild(this.mainPic);
		var name = new cc.LabelTTF(data.desc);
		name.setColor(cc.color(0, 0, 0, 0));
//		name.setd
//		;
		name.setDimensions(cc.size(300, 0));
		name.attr({
			x: size.width/2 ,
			y: size.height/2 -130,
			anchorX: 0.5,
			anchorY: 0.5
		});
		if (cc.winSize.width < cc.winSize.height){
			name.setScale(1.5);
			var mainPicRect = this.mainPic.getBoundingBox();
			var mainPicScale = this.mainPic.getScaleY();
			cc.log("zhutu......",mainPicScale, mainPicRect.width , mainPicRect.height);
			name.setPositionY(mainPicRect.y - 385*mainPicScale -10);
		}
		this.addChild(name);
		
		this.caption = new cc.LabelTTF(data.name);
		this.caption.setColor(cc.color(0, 0, 0, 0));
		var cH = param.taskHeight;
		this.caption.attr({
			x:size.width/2 ,
			y:cH-30,
			anchorX:0.5,
			anchorY:0.5
		});
		if (cc.winSize.width < cc.winSize.height){
			this.caption.setScale(1.5);
		}
		this.addChild(this.caption);
		
		var captionBox = this.caption.getBoundingBox();
//		captionSi
		this.sel = new cc.Sprite(res.Sel_png);
		this.sel.attr({
			x:captionBox.x - 20,
			y:captionBox.y + 10,
			anchorX:0.5,
			anchorY:0.5,
			scale:0.2
		});
		this.addChild(this.sel);
		
		var maxLevel = 5;
		cc.log("当前等级。。。", data.level);
		for(var i = 0; i < maxLevel; i++){
			var star;
			if (i < data.level){
				star = new cc.Sprite(res.Star_png);
			}else{
				star = new cc.Sprite(res.StarNull_png);	
			}
			star.attr({
				x:captionBox.x - 20 + i*25,
				y:captionBox.y - 20,
				anchorX: 0.5,
				anchorY: 0.5,
				scale:0.3
			});
			if (cc.winSize.width < cc.winSize.height){
				star.setScale(0.5);
				star.setPosition(captionBox.x - 20 + i*40, captionBox.y - 20);
			}
			this.addChild(star);
		}
		
		this.mark = new cc.Sprite(res.mark_png);
		this.mark.attr({
			x:captionBox.x - 10,
			y:captionBox.y,
			anchorX: 0.5,
			anchorY: 0.5,
			scale:0.2
		});
		this.mark.setVisible(false);
		this.addChild(this.mark);
		
	},
	
	onEnter:function(param){
		this._super();
	},
	
	appear:function(){
		if (this.isSel){
			this.mark.setVisible(true);
		}else{
			this.mark.setVisible(false);
		}
	},
	
	disappear:function(){
		
	},
	
	setMarkVisible:function(isShow){
		this.isSel = isShow;
		this.mark.setVisible(isShow);
	},
	
	getMarkVisible:function(){
		return this.isSel;
	},
	
	isSelCtol:function(pt){
		var rect = this.sel.getBoundingBox();
		if (this.isInRect(pt, rect)){
			return true;
		}
		return false;
	},
	
	isInRect:function (pt, r) {
//		cc.log(pt.x, r.x , r.x + r.width , pt.y , r.y , r.y + r.height);
		if (pt.x > r.x && pt.x < r.x + r.width && pt.y > r.y && pt.y < r.y + r.height){
			return true;
		}
		return false;
	},
});