mapData = {
		"map1" : [
		    {"index":"1","id":"changsha","name":"长沙", "desc":"涠洲岛", "pos":{"x":850, "y":400}, "pic":"res/city/changsha.png"},
		    {"id":"aomen", "name":"澳门", "desc":"广西北海市", "pos":{"x":50, "y":220}, "pic":"res/city/aomen.png"},
		    {"id":"tianjing","name":"天津", "desc":"三亚市", "pos":{"x":230, "y":100}, "pic":"res/city/tianjing.png"},
		    {"id":"yixing","name":"宜兴", "desc":"桂林市", "pos":{"x":250, "y":200}, "pic":"res/city/yixing.png"},
		    {"id":"beihai","name":"北海", "desc":"涠洲岛", "pos":{"x":300, "y":500}, "pic":"res/city/beihai.png"},
		    {"id":"haerbing", "name":"哈尔滨", "desc":"广西北海市", "pos":{"x":50, "y":220}, "pic":"res/city/haerbing.png"},
		    {"id":"dali","name":"大理", "desc":"三亚市", "pos":{"x":230, "y":100}, "pic":"res/city/dali.png"},
		    {"id":"zhouzhuang","name":"周庄", "desc":"桂林市", "pos":{"x":250, "y":200}, "pic":"res/city/zhouzhuang.png"},
		    {"id":"qingdao","name":"青岛", "desc":"涠洲岛", "pos":{"x":1000, "y":800}, "pic":"res/city/qingdao.png"},
		    {"id":"guiling", "name":"桂林", "desc":"广西北海市", "pos":{"x":50, "y":220}, "pic":"res/city/guiling.png"}
		]
		
}

Tesks = {
		"beihai":[  // 城市对应的任务列表
		        {"id":1, "name":"品鲜美的海鲜", "desc" :"中国的四大渔场之一的北部湾", "picName":"res/wumifan.png", "level":1 },
		        {"id":2, "name":"尝地道的米粉", "desc" :"要穿街走巷", "picName":"res/wumifan.png", "level":2},
		        {"id":3, "name":"海浪中穿行", "desc" :"银滩以滩长平，沙细白", "picName":"res/wumifan.png", "level":3},
		        {"id":4, "name":"沙滩上放空", "desc" :"旅游的方式有很多种", "picName":"res/wumifan.png", "level":4},
		        {"id":5, "name":"城市的最边缘看日落", "desc" :"罐头领是白海最西面的小山路", "picName":"res/wumifan.png", "level":5}
		],
		"yixing":[  // 城市对应的任务列表
	            {"id":1, "name":"品鲜美的海鲜", "desc" :"中国的四大渔场之一的北部湾", "picName":"res/wumifan.png", "level":1 },
	            {"id":2, "name":"尝地道的米粉", "desc" :"要穿街走巷", "picName":"res/wumifan.png", "level":2},
	            {"id":3, "name":"海浪中穿行", "desc" :"银滩以滩长平，沙细白", "picName":"res/wumifan.png", "level":3},
	            {"id":4, "name":"沙滩上放空", "desc" :"旅游的方式有很多种", "picName":"res/wumifan.png", "level":4},
	            {"id":5, "name":"城市的最边缘看日落", "desc" :"罐头领是白海最西面的小山路", "picName":"res/wumifan.png", "level":5}
		]
}

Foods = {
		"beihai":[
		          {"id":1, "name":"品鲜美的海鲜", "desc" :"中国的四大渔场之一的北部湾", "picName":"res/wumifan.png", "level":1 },
		          {"id":2, "name":"尝地道的米粉", "desc" :"要穿街走巷", "picName":"res/wumifan.png", "level":2},
		          {"id":3, "name":"海浪中穿行", "desc" :"银滩以滩长平，沙细白", "picName":"res/wumifan.png", "level":3},
		          {"id":4, "name":"沙滩上放空", "desc" :"旅游的方式有很多种", "picName":"res/wumifan.png", "level":4},
		          {"id":5, "name":"城市的最边缘看日落", "desc" :"罐头领是白海最西面的小山路", "picName":"res/wumifan.png", "level":5}
		]
}

//post 数据
postData = {
	"index":1,   //客户端发送指令序号，从1开始，自动递增
	"param":{
		"cityid":"1",
		"taskid":["1", "2", "3"]
	}
	
}


//返回数据
returnData = {
		"index":1,  //取请求中的index，推送时取0
		"ret":0,    //错误码。0为正确，大于0为错误码
		"message":"ok", //错误信息，”ok”为正确，其它为错误
		"results":{      //返回结果
			"score":"50",    //得分
			"compete":""     //评价信息
		}
}
