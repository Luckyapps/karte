var ausgabe, i_city, i_city_ul, i_thing, ausgabe, citylist, bbox;

async function karte_init(){
    console.warn("Karte gestartet");
    ausgabe = document.getElementById("ausgabe");
    i_city = document.getElementById("i_city");
    ausgabe = document.getElementById("ausgabe");
    i_city_ul = document.getElementById("i_city_ul");
    i_thing = document.getElementById("i_thing");
}

async function search_city(){
    var url = "https://nominatim.openstreetmap.org/search?q="+ i_city.value +"&format=json";
    citylist = await get_data(url);
    console.log(citylist);
    var ausgabe_tmp = "";
    for(i=0;i<citylist.length;i++){
        ausgabe_tmp += "<li onclick='select_city("+ i +")'>"+ citylist[i].display_name +"</li>";
    }
    i_city_ul.innerHTML = ausgabe_tmp;
}

function select_city(i){
    info_show(citylist[i].display_name);
    i_city_ul.innerHTML = "";
    var bbox_inner = citylist[i].boundingbox[0]+","+citylist[i].boundingbox[2]+","+citylist[i].boundingbox[1]+","+citylist[i].boundingbox[3];
    bbox = "("+ bbox_inner +")";
    console.log(bbox);
    load_data(citylist[i]);
}

async function load_data(city){
    var url = 'https://www.overpass-api.de/api/interpreter?data=[out:json];(node[shop=supermarket]'+ bbox +';);out;%3E;out%20skel%20qt;'
    console.log(url);
    var data = await get_data(url);
    console.log(data);
    var result_list = data.elements;
    var ausgabe_tmp = "";
    for(j=0;j<result_list.length;j++){
        ausgabe_tmp += "<pre style='border-radius: 10px;background-color: white; padding:10px;margin:10px'>"+ JSON.stringify(result_list[j].tags,null,"\t") +"</pre>";
    }
    ausgabe.innerHTML = ausgabe_tmp;
}

async function get_data(url){
    info_hide();
    luckyapp_core.page_config.settings = {};
    luckyapp_core.page_config.settings.loading_info = false;
    if(luckyapp_core.page_config.settings.loading_info){
        info_show("Daten werden geladen...");
    }

    var data;

    if(!url.includes("https")){
        if(url.includes("http")){
            url = url.replace("http","https");
            console.log(url);
        }
    }else{
        console.log(url);
    }
    
    await fetch(url)
    
    .then((response) => response.text())

    .then((data_text) => {data = JSON.parse(data_text)});
    info_hide();

    if(luckyapp_core.page_config.settings.loading_info){
        info_show("Daten geladen", "success");
    }
    return data;
}