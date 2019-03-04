$(function(){
	// 动态的响应式轮播图
	banner();
     // 初始化页签
     initTab();
     // 初始化提示工具
     $('[data-toggle="tooltip"]').tooltip();
});
var banner=function(){
	 // * 1.模拟数据（从后台获取数据）   [{},{}]
     // * 2.判断当前设备          768px
     // * 3.根据当前设备把数据转换成html  拼接字符串
     // * 3.1 点容器内容需要动态生成
     // * 3.2 图片容器内容需要动态生成
     // * 4.渲染到页面当中    html追加
     // *
     // * 5.测试能否响应 两种设备      监听页面尺寸改变重新渲染
     // *
     // * 6.移动端  手势切换功能     左滑 右滑


     // 获取需要操作的元素
     var $banner=$('.carousel');
     var $point=$banner.find('.carousel-indicators');
     var $image=$banner.find('.carousel-inner');
     var $window=$(window);

     // * 1.模拟数据（从后台获取数据）   [{},{}]
     var data=[
     	{
     		pcSrc:'images/slide_01_2000x410.jpg',
     		mSrc:'images/slide_01_640x340.jpg'
     	},
     	{
     		pcSrc:'images/slide_02_2000x410.jpg',
     		mSrc:'images/slide_02_640x340.jpg'
     	},
     	{
     		pcSrc:'images/slide_03_2000x410.jpg',
     		mSrc:'images/slide_03_640x340.jpg'
     	},
     	{
     		pcSrc:'images/slide_04_2000x410.jpg',
     		mSrc:'images/slide_04_640x340.jpg'
     	}
     ];
     // 渲染操作
     var render=function (){
          // * 2.判断当前设备          768px

          var isMobile=$window.width()<768?true:false;
          var pointHTML='';
          var imageHTML='';
          // 根据数据来拼接
          $.each(data,function(k,v){
               //点内容的拼接
               pointHTML+='<li data-target="#carousel-example-generic" data-slide-to="'+k+'" '+(k==0?'class="active"':'')+'></li>';
               imageHTML+='<div class="item '+(k==0?"active":"")+'">';
               if(isMobile){
                    imageHTML+='<a href="#" class="m_imagebox"><img src="'+v.mSrc+'"></a>';
                    
               }else{
                    imageHTML+='<a href="#" class="pc_imagebox" style="background-image: url('+v.pcSrc+');"></a>';
               }
               
               imageHTML+='</div>';
          });
          // console.log(pointHTML);
          // console.log(imageHTML);
          $point.html(pointHTML);
          $image.html(imageHTML);
          
     };
     // * 5.测试能否响应 两种设备      监听页面尺寸改变重新渲染
     $window.on('resize',function(){
          render()
     }).trigger('resize');
     //triger主动触发resize事件，执行render方法

     // * 6.移动端  手势切换功能     左滑 右滑
     // /*通过jquery可以绑定touch事件*/
    // 注意：在event对象当中没有触摸点集合*/
    // 注意：originalEvent当中才有触摸点集合*/
     var startX=0;
     var distanceX=0;
     var isMove=false;
     $banner.on('touchstart',function(e){
          startX=e.originalEvent.touches[0].clientX;
     }).on('touchmove',function(e){
          var moveX=e.originalEvent.touches[0].clientX;
          distanceX=moveX-startX;
          isMove=true;
     }).on('touchend',function(e){
          // /*手势的条件*/
        
         // * 1.滑动过的
         // * 2.移动的距离超过50px 认为是手势
         // * 
         if(isMove && Math.abs(distanceX)>=50){
               if(distanceX>0){
                    // 右滑 上一张
                    $banner.carousel('prev');
               }else{
                    //左滑 下一张
                    $banner.carousel('next');
               }
         }
         startX=0;
         distanceX=0;
         isMove=false;
     });

}

var initTab=function(){
     //1. 把所有的页签在一行显示  设置父容器的宽度是所有子容器之和
     // 父容器
     var tabs=$(".wjs_product .nav-tabs");
     // 子容器
     var liList=tabs.find('li');
     var width=0;
     $.each(liList,function(i,item){
          width+=$(item).outerWidth(true);
     })
     tabs.width(width);
     // 3.实现滑动功能：使用区域滚动插件iscroll
     new IScroll(".nav-tabs-parent",{
          scrollX:true,
          scrollY:false
     });
}
