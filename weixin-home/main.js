/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */
  
st = {"isWideScreen": true};

cc.game.onStart = function(){
    cc.view.adjustViewPort(true);
    
    var policy = new cc.ResolutionPolicy(cc.ContainerStrategy.EQUAL_TO_FRAME, cc.ContentStrategy.EXACT_FIT);
//    cc.view.setDesignResolutionSize(320, 480, policy);
    
    var mode = cc.sys.isMobile && window.navigator.userAgent.indexOf("MicroMessenger") != -1 ? 
    		cc.ResolutionPolicy.FIXED_HEIGHT : cc.sys.isMobile ? cc.ResolutionPolicy.FIXED_WIDTH : cc.ResolutionPolicy.SHOW_ALL;
    
    mode = cc.ResolutionPolicy.EXACT_FIT;
//    var w = cc.container.clientWidth;// document.body.clientWidth;
//    var h = cc.container.clientHeight;//  document.body.clientHeight;
    
    var w =  document.body.clientWidth;
    var h =  document.body.clientHeight;
    
    
    cc.log("屏幕的w,h", w,h);
    cc.view.setDesignResolutionSize(w, h, mode);
    cc.log("容器大小。。",cc.container.clientWidth,cc.container.clientHeight);
    
    var gm = document.getElementById("gameCanvas");
    cc.log("cong html zhonglai d ",gm.width, gm.height);
    
//    cc.container.set
    
//    cc.view.setDesignResolutionSize(w, h, mode);
//    cc.view.setDesignResolutionSize(800, 450, cc.ResolutionPolicy.SHOW_ALL);
    cc.view.resizeWithBrowserSize(true);
//    cc.view.setResolutionPolicy(cc.ResolutionPolicy.NO_BORDER);
    //load resources
    cc.log("began to load data...........");
//    var preLoad = Loading.preload;            //浏览器
    var isNative = cc.sys.isNative;
    var preLoad = isNative ? cc.LoaderScene.preload : Loading.preload; 
//    var preLoad = cc.LoaderScene.preload    //jsb
//    cc.LoaderScene.preload(g_resources, function () {
    preLoad(g_resources, function () {
//        cc.director.runScene(new HelloWorldScene());
//    	cc.view.setDesignResolutionSize(w, h, mode);
//    	cc.log("wwwwwwww",cc.container.width,cc.container.height);
        cc.director.runScene(new MainScene());
    }, this);
};
cc.game.run();