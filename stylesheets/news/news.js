async function start_news_stylesheet(){
    if(luckyapp_core.modules.content.loaded){
        load_news_stylesheet();
    }else{
        await sleep(1);
        start_news_stylesheet();
    }
    luckyapp_core.modules.news.loaded = true;
}

async function load_news_stylesheet(){
    console.log(newslist);
    if(newslist){
        if(luckyapp_core.page_config.modules.news.list){
            var news_output = document.getElementById(luckyapp_core.page_config.modules.news.list);
            news_output.innerHTML = "";
            for(i=0; i<newslist.content.length;i++){
                news_output.classList.add("news_container");
                var container_parameter = "";
                var dataline = "";
                if(newslist.content[i].link){
                    console.log("link");
                    container_parameter += "onclick='window.location.assign(`"+ newslist.content[i].link +"`)'";
                }
                if(newslist.content[i].date){
                    dataline += "<div>"+ newslist.content[i].date +"</div>";
                }
                if(newslist.content[i].source){
                    dataline += "<div>"+ newslist.content[i].source +"</div>";
                }
                news_output.innerHTML += "<div "+ container_parameter +" class='news_card'>"
                +"<h4>"+ newslist.content[i].title +"</h4>"
                +"<p>"+ newslist.content[i].content +"</p>"
                +"<div class='news_dataline'>"+ dataline +"</div>"
                +"</div>"
            }
        }
    }else{
        console.warn("newslist forceload");
        await sleep(3);
        await script_loader("newslist.js");
        load_news_stylesheet();
    }
}