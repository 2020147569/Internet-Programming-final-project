var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        center: new kakao.maps.LatLng(37.561782, 126.936419), // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

var nowSrc = "REDSPOT.png"


var currentX;
var currentY;

if (navigator.geolocation) {
    
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function(position) {
        
        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
        
        currentX = lon;
        currentY = lat;

        var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        var imageSize = new kakao.maps.Size(20, 20);
        var nowimageSrc = new kakao.maps.MarkerImage(nowSrc, imageSize); 

        // 마커와 인포윈도우를 표시합니다
        var marker = new kakao.maps.Marker({  
            map: map, 
            position: locPosition,
            image : nowimageSrc,
            clickable : true
        });

        map.setCenter(locPosition); 
    });
    
} else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
    
    var locPosition = new kakao.maps.LatLng(37.561782, 126.936419);
}

var overlays = [];
var markers = [];
var positions = [];
var overlays = [];

var FoodimageSrc = "FOODMARKER.png";
var ECTimageSrc = "ECTMARKER.png";
var position_size;

function data_marker (data) {

    positions = data;

    if(positions.length < 20){
        position_size = positions.length;
    }
    else{
        position_size = 20;
    }

    for(let i = 0; i < position_size; i ++){
        var poscor = new kakao.maps.LatLng(positions[i].y, positions[i].x);

        var imageSize = new kakao.maps.Size(40, 40);

        var category = positions[i].category_name;

        var index = category.indexOf(" >");

        if(category.slice(0,index) == "음식점"){
            var src = FoodimageSrc;
        }
        else {
            var src = ECTimageSrc;
        }

        var markerImage = new kakao.maps.MarkerImage(src, imageSize); 

        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: poscor, // 마커를 표시할 위치
            title : positions[i].place_name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage,
            clickable : true
            }); // 마커 이미지 

        markers[i] = marker;
        marker.toString = function myfunc(){return i;}



        var content = document.createElement('div');
        content.setAttribute("class", "wrap");
        
        var content1 = document.createElement('div');
        content1.setAttribute("class", "info")
        
        content.appendChild(content1);

        var titleContent = document.createElement('div');
        titleContent.setAttribute("class", "title");
        titleContent.innerHTML = positions[i].place_name;

        content1.appendChild(titleContent);

        var overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition(),       
        });
        overlays[i] = overlay;

        var closeContent = document.createElement('div');
        closeContent.setAttribute("class", "close");
        closeContent.id = "close_" + i;
        closeContent.addEventListener('click', function(){
            overlays[this.id.slice(6)].setMap(null);
        });

        titleContent.appendChild(closeContent);

        var bodyContent = document.createElement('div');
        bodyContent.setAttribute("class", "body")

        content1.appendChild(bodyContent);

        var descContent = document.createElement('div');
        descContent.setAttribute("class", "desc");

        bodyContent.appendChild(descContent);

        var ellipsisContent = document.createElement('div');
        ellipsisContent.setAttribute("class", "ellipsis");

        var elli = "주소: " + positions[i].address_name;
        ellipsisContent.innerHTML = elli;

        descContent.appendChild(ellipsisContent);
        /////////url
        var urlContent = document.createElement('div');
        urlContent.setAttribute("class", "ellipsis");

        var urlPlace = document.createElement('a');
        urlPlace.setAttribute("href", positions[i].place_url);
        urlPlace.innerHTML = "장소 정보 url";


        urlContent.appendChild(urlPlace);
        //////////

        descContent.appendChild(urlContent);


        ////////navi
        var naviContent = document.createElement('div');
        naviContent.setAttribute("class", "navigation_button");
        var navipara = "navigate(" + positions[i].x + "," + positions[i].y +")";

        naviContent.setAttribute("onclick", navipara);
        naviContent.innerHTML = "길찾기 안내 시작";

        descContent.appendChild(naviContent);


        
        overlay.setVisible(false);  

        kakao.maps.event.addListener(marker, 'click', function() {
            overlays[this.toString()].setMap(map);
            overlays[this.toString()].setVisible(true);
        });

        

        overlays[i] = overlay;
    }
}



function navigate(x, y){

    for(let i = 0; i < position_size; i ++){
        markers[i].setMap(null);
        overlays[i].setMap(null);
    }
    
    //이전 맵 삭제
    while (mapContainer.firstChild) {
        mapContainer.removeChild(mapContainer.firstChild);
    }
    var totalMarkerArr = [];
	  var drawInfoArr = [];
	  var resultdrawArr = [];

    // 1. 지도 띄우기
    map = new Tmapv2.Map("map", {
        center : new Tmapv2.LatLng(currentY, currentX),
        width : "100%",
        height : "100%",
        zoom : 15,
        zoomControl : true,
        scrollwheel : true
    });
  
    // 2. 시작, 도착 심볼찍기
    // 시작
    var marker_s = new Tmapv2.Marker(
    {
        position : new Tmapv2.LatLng(currentY, currentX),
        icon : nowSrc,
        iconSize : new Tmapv2.Size(20, 20),
        map : map
    });
  
    // 도착
    var marker_e = new Tmapv2.Marker(
    {
        position : new Tmapv2.LatLng(y, x),
        icon : ECTimageSrc,
        iconSize : new Tmapv2.Size(30, 30),
        map : map
    });
  
    // 3. 경로탐색 API 사용요청
    $.ajax({
        method : "POST",
        url : "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
        async : false,
        data : {
            "appKey" : "l7xxd3c74c79747e43f4adad47fabd4e0d65",
            "startX" : currentX,
            "startY" : currentY,
            "endX" : x,
            "endY" : y,
            "reqCoordType" : "WGS84GEO",
            "resCoordType" : "EPSG3857",
            "startName" : "출발지",
            "endName" : "도착지"
        },
        success : function(response) {
            var resultData = response.features;
  
            //결과 출력
            var tDistance = "총 거리 : "
                + ((resultData[0].properties.totalDistance) / 1000)
                    .toFixed(1) + "km,";
            var tTime = " 총 시간 : "
                + ((resultData[0].properties.totalTime) / 60)
                    .toFixed(0) + "분";
  
            $("#result").text(tDistance + tTime);
              
            //기존 그려진 라인 & 마커가 있다면 초기화
            if (resultdrawArr.length > 0) {
                for ( var i in resultdrawArr) {
                    resultdrawArr[i]
                        .setMap(null);
                }
                resultdrawArr = [];
            }
              
            drawInfoArr = [];
  
            for ( var i in resultData) { //for문 [S]
                var geometry = resultData[i].geometry;
                var properties = resultData[i].properties;
                var polyline_;
  
  
                if (geometry.type == "LineString") {
                    for ( var j in geometry.coordinates) {
                        // 경로들의 결과값(구간)들을 포인트 객체로 변환 
                        var latlng = new Tmapv2.Point(
                            geometry.coordinates[j][0],
                            geometry.coordinates[j][1]);
                        // 포인트 객체를 받아 좌표값으로 변환
                        var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                        // 포인트객체의 정보로 좌표값 변환 객체로 저장
                        var convertChange = new Tmapv2.LatLng(
                            convertPoint._lat,
                            convertPoint._lng);
                        // 배열에 담기
                        drawInfoArr.push(convertChange);
                    }
                } else {
                    var markerImg = "";
                    var pType = "";
                    var size;
  
                    if (properties.pointType == "S") { //출발지 마커
                        markerImg = nowSrc;
                        pType = "S";
                        size = new Tmapv2.Size(24, 38);
                    } else if (properties.pointType == "E") { //도착지 마커
                        markerImg = ECTimageSrc;
                        pType = "E";
                        size = new Tmapv2.Size(24, 38);
                    } else { //각 포인트 마커
                        markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                        pType = "P";
                        size = new Tmapv2.Size(8, 8);
                    }
  
                    // 경로들의 결과값들을 포인트 객체로 변환 
                    var latlon = new Tmapv2.Point(
                        geometry.coordinates[0],
                        geometry.coordinates[1]);
  
                    // 포인트 객체를 받아 좌표값으로 다시 변환
                    var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
                        latlon);
  
                    var routeInfoObj = {
                        markerImage : markerImg,
                        lng : convertPoint._lng,
                        lat : convertPoint._lat,
                        pointType : pType
                    };
  
                    // Marker 추가
                    var marker_p = new Tmapv2.Marker(
                    {
                        position : new Tmapv2.LatLng(
                            routeInfoObj.lat,
                            routeInfoObj.lng),
                        icon : routeInfoObj.markerImage,
                        iconSize : size,
                        map : map
                    });
                }
            } //for문 [E]
            drawLine(drawInfoArr);
        },
        error : function(request, status, error) {
            console.log("code:" + request.status + "\n"
                + "message:" + request.responseText + "\n"
                + "error:" + error);
        }
    });
  
}
    
function drawLine(arrPoint) {
    var polyline_;
  
    polyline_ = new Tmapv2.Polyline({
        path : arrPoint,
        strokeColor : "#DD0000",
        strokeWeight : 6,
        map : map
    });
    resultdrawArr.push(polyline_);
}
