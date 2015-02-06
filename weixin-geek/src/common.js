
Stone = {};

Stone.CurScene = null;

Stone.LayerList = {};

Stone.registerLayer = function(name, func){
	Stone.LayerList[name] = func;
};
