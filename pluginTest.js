(function(){
 console.log("##################PLUGIN-TEST########################");
 
 var PluginTest;
 
 PluginTest=function(event,param){//构造器
	 var self=this;
	  self.$event=$(event);
	  self.init(param);
 }
 PluginTest.prototype={//方法栈
	 
	 init:function(param){
		 console.log("PluginTest init<");
		 var self=this;
		 $.each(param,function(key,value){//遍历并设置属性
			 switch(key){
				 default: self[key]=value;break; 
				 case "xxx":break;//
			 }
		 });
		 self.selfAction();
	 },
	 raise:function(option,param){
		 var self=this,e;
		 e=$.Event(option);
		 self.$event.trigger(e,param);		 
	 },
	 getExtraParams:function(){
		 console.log("getExtraParams<");
		 var self=this,data= self.extraParams;
		 return data({retval:{type:'zzz',id:001},id:'123321'});
	 },
	 clear:function(){
		var self=this;
		console.log(self);
		self.$event.val('');	
	 },
	 upload:function(){
		 console.log("begin upload<");
		 var self=this,data; 
		 data=self.getExtraParams();
		 console.log("before upload plugin get extraParams:");
		 console.log(data);
	 },
	 selfAction:function(){//自身方法 注意作用域
		 var self=this;
		 self.$event.click(function(){
			 console.log("点击了");
			 self.raise("select",true);
			 self.raise("PTclick",self.$event.val());
		 })
		 
	 } 
 }
 //still useless
 PluginTest.default={
	 extraParams:{}
	 //...
 }
 
 
 $.fn.pluginTest=function(option){//调度中心
	 var self=$(this)//jquery化 
	 ,data,retvals=[];
	 var options = typeof option === 'object' && option;//
	 if(option){
			data=self.data('PluginTestObj');
				if(!data){
					var opt=$.extend(true,{},$.fn.pluginTest.default,options,data);
					data=new PluginTest(self,opt);
					self.data('PluginTestObj',data);
				}else{
					if(typeof option==='string'){
						retvals.push(data[option].apply(data));//注意作用域,作用域:默认window  参数:
					}
				}
				switch(retvals.length){
					default: return retvals;break;
					case 0 :return self;break;
					case 1 :return retvals[0];break;
				}
		 }
		 
	 }
	 
	 $.fn.pluginTest.default={
	 extraParams:{}
	 //...
 }
 
 $.fn.pluginTest.Constructor = PluginTest;
 
 })();