# front
用jquery+js写的一个文字编辑组件
使用方法：
<script>
ready.ondocument(function(){
   new editor("ed").appendLa(['fontsize','section','link','img'])
})
</script>
加入这段代码就可以显示出编辑界面，在谷歌浏览器下会显示会特别正常。没有考虑兼容性
fontsize:字体大小，section:段落,link：链接，img:图片
组件只实现了字体大小的功能。可以对文字进行字体大小控制
设计思想：
将所有选中的文字和字体大小存入到一个数组里面，然后显示出来，我这样做也实现了。我这样做主要是想生成一个整洁的html,
<img src="http://imglf6.nosdn.127.net/img/VlhnVlhjOG54RWJGcFNqTHo3Y2pNZEFPN1VjenZVM1NBbVE0RDR3RWMvRzJJNUtYcmh0V2F3PT0.png?imageView&thumbnail=500x0&quality=96&stripmeta=0"/>