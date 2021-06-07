var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
    mapOption = { 
        center: new kakao.maps.LatLng(37.561782, 126.936419), // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

var nowSrc = "REDSPOT.png"


if (navigator.geolocation) {
    
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function(position) {
        
        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
        
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

var positions = [{
    "place_name": "카카오프렌즈 코엑스점",
    "distance": "418",
    "place_url": "http://place.map.kakao.com/26338954",
    "category_name": "가정,생활 > 문구,사무용품 > 디자인문구 > 카카오프렌즈",
    "address_name": "서울 강남구 삼성동 159",
    "road_address_name": "서울 강남구 영동대로 513",
    "id": "26338954",
    "phone": "02-6002-1880",
    "category_group_code": "",
    "category_group_name": "",
    "x": "127.05902969025047",
    "y": "37.51207412593136"
  }]

var FoodimageSrc = "FOODMARKER.png";
var ECTimageSrc = "ECTMARKER.png";

  for(let i = 0; i < positions.length; i ++){
  var poscor = new kakao.maps.LatLng(positions[i].y, positions[i].x);

  var imageSize = new kakao.maps.Size(40, 40);

  var category = positions[i].category_name;

  var index = category.indexOf(" >");

  if(category.slice(0,index) == "음식점"){
  var src = FoodimgageSrc;
  }
  else {
      var src = ECTimageSrc;
  }

  var markerImage = new kakao.maps.MarkerImage(src, imageSize); 

  var marker = new kakao.maps.Marker({
    map: map, // 마커를 표시할 지도
    position: poscor, // 마커를 표시할 위치
    title : positions[i].place_name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    image : markerImage
  }); // 마커 이미지 



  //커스텀 오버레이 생성
  var content = '<div class="wrap">' + 
  '    <div class="info">' + 
  '        <div class="title">' + 
  positions[i].place_name + 
  '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
  '        </div>' + 
  '        <div class="body">'+
  '            <div class="desc">' + 
  '                <div class="ellipsis">'+
  '주소: ' +
  positions[i].road_address_name  +
  '                             </div>' +
  '                <div><a href="'+
  positions[i].place_url  +
  '" target="_blank" class="link">홈페이지</a></div>' + 
  '<div class = "navigation_button"><a href = "navigation.html">길찾기 안내 시작</a></div>' +//길찾기 버튼
  '            </div>' + 
  '        </div>' + 
  '    </div>' +    
  '</div>';



    var overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: map,
        position: marker.getPosition()       
    });

    kakao.maps.event.addListener(marker, 'click', function() {
        overlay.open(map);
    });

    function closeOverlay() {
        overlay.setMap(null);     
    }
}




//길찾기 버튼
//길찾기
function getDistanceFromLatLonInKm(lat1,lng1,lat2,lng2) { 
    function deg2rad(deg) { 
        return deg * (Math.PI/180) 
    } 
    var R = 6371; // Radius of the earth in km 
    var dLat = deg2rad(lat2-lat1); // deg2rad below 
    var dLon = deg2rad(lng2-lng1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km return d; 
}
