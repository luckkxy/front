/**
 * Created by LENOVO on 2017/12/10.
 */
(function($,doc){
    function editor(elm){
       this.elm=elm;
        this.init();
    }
    editor.prototype={
        init:function(){
            var e= $("#" + this.elm)
            e.hide().after('<div class="editpanel"></div></div><iframe src="test.html" id="frame"></iframe>');
            e.next().css("width", e.width())
            e.next().next().addClass(e.attr("class"));
            this.selectText()
            return this;
        },
        appendLa:function(arr){
            var e=$("#" + this.elm).next();
            var str='';
            for(var i=0;i<arr.length;i++){
                if(arr[i]=='fontsize') {
                    str="字体大小"
                }else if(arr[i]=='section'){
                    str="段落"
                }else if(arr[i]=='link'){
                    str="链接"
                }else if(arr[i]=='img'){
                    str="图片"
                }
                if(str){
                    e.append("<div class='font'>"+str+"</div>");
                }
            }
            this.fireEvent(arr)
        },
        fireEvent:function(arr){
            var e=$("#"+this.elm).next();
            var that=this;
            var getobj;
            e.find(".font").each(function(i,v){
                $(v).on("click",function(){
                    if($(this).text() =='字体大小'){
                        getobj=that.drop(this,[{text:'1号字体',size:'6'},{text:'2号字体',size:'4'}]);
                        getobj.show();
                        that.dropli(getobj)
                    }else if($(this).text()=='段落'){
                        getobj=that.drop(this,[{text:'左对齐',size:'left'},{text:'右对齐',size:'right'},{text:'居中',size:'center'}])
                        getobj.show()
                        that.dropli(getobj)
                    }
                })
            })
        },
        drop:function(obj,arr){
            var e=$("#" + this.elm).next();
            var c;
            if(e.find(".menu").length>0){
                e.find(".menu").remove();
            }
            e.append("<ul class='menu'>")
            $(obj).text()=="字体大小" ? c="fontSize":c="textAlign"
            for(var i=0;i<arr.length;i++){
                $(".menu").append("<li size="+arr[i].size+">"+arr[i].text+"</li>")
                $(".menu li").eq(i).css(c,arr[i].size)
            }
            $(".menu").css({
                left:$(obj).offset().left,
                top:$(obj).offset().top+25
            })
            return $(".menu");
        },
        dropli:function(obj){
            var that=this
            var textarr=[]
            $(obj).find("li").each(function(j,k){
                var _thi=this;
                $(k).on("click",function(){
                    $(this).parent().hide()
                    var obj = document.getElementById("frame").contentWindow
                    var r=[]
                    //var c=obj.document.getElementById("con").childNodes
                   c=$("#frame").contents().find("#con").children()
                    var tt=0
                    var subparam=0
                    console.log(c.length,'num')
                    for(var i=0;i< c.length;i++){
                        textarr.push(c[i].innerText)
                        var topc=c.eq(i).offset().top
                        var topch= c.eq(i).height();
                        var temp=c[i].innerText
                        console.log(that.pagey1,topc,topch,i)
                        r[i]=new Array();
                                if(subparam<temp.length&&subparam!=0&&that.pagey<(topc+topch)){
                                    console.log("kxy1")
                                    for(var k=0;k<subparam;k++){
                                       if(that.res.gettext.indexOf(temp.substr(k,subparam))!=-1){
                                           console.log(temp.substr(k,subparam));
                                           r[i].push({ds:k,dn:temp.substr(k,subparam).length,num:i,fon:$(this).attr("size")})
                                           break;
                                       }
                                    }
                                }else if(that.pagey<(topc+topch)&&that.pagey1>(topc+topch)){
                                    console.log("kxy2")
                                    for(var j=0;j<temp.length;j++){
                                        //console.log(temp.substr(j,temp.length))
                                        var kk=temp.substr(j,temp.length)
                                        if(that.res.gettext.indexOf(kk)!=-1){
                                            var str=temp.substr(j,temp.length)
                                            tt+=str.length;
                                            subparam=that.res.gettext.length-tt
                                            r[i].push({ds:j,dn:temp.substr(j,temp.length).length,num:i,fon:$(this).attr("size")})
                                            console.log(temp.substr(j,temp.length),'test3')
                                            break;
                                        }

                                    }
                                }else{
                                    if(that.pagey1<(topc+topch)&&that.pagey>topc){
                                        console.log("kxy")
                                        for(var k=0;k<temp.length;k++){
                                            if(that.res.gettext.indexOf(temp.substr(k,that.res.gettext.length))!=-1){
                                                console.log(temp.substr(k,that.res.gettext.length));
                                                r[i].push({ds:k,dn:temp.substr(k,that.res.gettext.length).length,num:i,fon:$(this).attr("size")})
                                                break;
                                            }
                                        }
                                    }
                                }

                    }
                    that.getfontArray.push(r)
                    that.getf(that.getfontArray,$(this).attr("size"))
                })
            })
        },
        res:{},
        getfontArray:[],
        getf:function(data,fon){
            var arr=this.fontarray(data)
            var htm=""
            console.log(arr,'arr')
            $("#frame").contents().find(".con").children().each(function(k){
                var that=this;
                arr.map(function(o,j){
                    htm=""
                    console.log(o,'ooo')
                    o.map(function(obj,x){
                        //console.log(obj,'bbb')
                        if(obj.num==k){
                            if(x==0){
                                htm=that.innerText.substr(0,obj.ds);
                                var ss=that.innerText.substr(obj.ds,obj.dn)
                                var dd=ss.replace(ss,"<font size='"+obj.fon+"'>"+ss+"</font>")

                                htm+=dd;
                            }

                            if(x!=0){
                                var xx=that.innerText.substring((o[x-1].ds+o[x-1].dn), obj.ds)
                                var yy=that.innerText.substr(obj.ds,obj.dn)
                                console.log(yy,'yyyyyy')
                                htm+=xx+yy.replace(yy,"<font size='"+obj.fon+"'>"+yy+"</font>")

                            }
                            if(x== o.length-1){
                                htm+= that.innerText.substr((obj.ds+obj.dn), that.innerText.length)
                                $(that).html(htm)
                            }
                           // $(that).replaceWith(dd)

                        }
                    })
                })
            })
        },
        fontarray:function(stro){
            var r=[]
            for(var i=0;i<stro.length;i++){
                for(var j=0;j<stro[i].length;j++){
                    r.push(stro[i][j])
                }
            }
            var temp=[]
            for(var j=0;j< r.length;j++){
                if(r[j].length>0){
                    temp.push(r[j][0])
                }
            }
            temp.sort(function(a,b){
                if(a.num> b.num){
                    return true
                }
            })

            var getarr=[]
            $("#frame").contents().find(".con").children().each(function(i){
                    getarr[i]=new Array()
                temp.map(function(obj,j){
                    if(obj.num==i){
                        getarr[i].push(obj);
                    }
                })
            })
            for(var j=0;j<getarr.length;j++){
                getarr[j].sort(function(a,b){
                    if(a.ds> b.ds){
                        return true
                    }
                })
            }
            console.log(getarr,'kkkk')
            var ch={},lastarr=[]
            getarr.map(function(obj,k){
                lastarr[k]=new Array()
                obj.map(function(o,j){
                    if(j==0){
                        ch={ds: o.ds,dn:o.dn,num: o.num}
                        if(j==obj.length-1){
                            lastarr[k].push(ch)
                        }
                    }else{
                        if(ch.ds>= o.ds&&(ch.ds+ch.dn)<= (o.ds+ o.dn)){
                            ch={ds:ch.ds,dn: o.dn,num: o.num}
                            if(j==obj.length-1){
                                lastarr[k].push(ch)
                            }
                        }else if(ch.ds<= o.ds&&(ch.ds+ ch.dn)>= (o.ds+ o.dn)){
                            ch={ds:ch.ds,dn:ch.dn,num: o.num}
                            if(j==obj.length-1){
                                lastarr[k].push(ch)
                            }
                        }else if((ch.ds+ch.dn)< o.ds){
                            if(j==obj.length-1){
                                lastarr[k].push(o)
                            }
                            lastarr[k].push(ch)
                            ch=o;

                        }
                    }

                })
            })
            //console.log(lastarr,'ddddd')
            return getarr;
        },
        selectText:function(){
            var obj = document.getElementById("frame").contentWindow
            var that=this
            obj.onload=function(){
                var obj = document.getElementById("frame").contentWindow
                obj.document.getElementsByTagName("div")[0].onmouseup=function(e){
                    that.res={
                        gettext:obj.document.getSelection().getRangeAt(0).toString()
                    }
                    console.log(e.pageX, e.pageY,'ss')
                    that.pagey1= e.pageY;
                    return that.res
                }
                obj.document.getElementsByTagName("div")[0].onmousedown=function(e){
                    console.log(e.pageX, e.pageY,'ss')
                    that.pagey= e.pageY;
                }
                obj.document.getElementsByTagName("div")[0].onkeypress=function(){
                    var t=obj.document.getElementsByTagName("div")[0].childNodes[0]
                    console.log(t)
                    if(t.nodeType==3&&t){
                        var oDiv = document.createElement("div")
                        oDiv.appendChild(t)
                        var t1=obj.document.getElementsByTagName("div")[0].childNodes[0]
                        obj.document.getElementsByTagName("div")[0].insertBefore(oDiv,t1)
                    }
                }

            }

            //e.bind("click",function(){
                //console.log(1)
               // if (doc.body.createTextRange) {
                    //var range = doc.body.createTextRange();
                    //range.moveToElementText(text);
                   // range.select();
               // } else if (window.getSelection) {
                   // var selection = doc.getSelection();
                   // console.log(selection)
                    // var range = doc.createRange();
                    //  range.selectNodeContents(text);
                    // selection.removeAllRanges();
                    // selection.addRange(range);
               // }

               // })
        }
    }
    function ready(fn){

    }
    ready.ondocument=function(fn){
        window.onload=fn;
    }
    window.ready=ready;
    window.editor=editor;
})(jQuery,document)