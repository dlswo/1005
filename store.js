var dao = (function (map){

    var map = map;
    var arr = [
        {title:'고기팩토리', lat : 37.569820, lng : 126.986001},
        {title:'갓덴스시', lat : 37.569081, lng : 126.985591},
        {title:'코다차야', lat : 37.569949, lng : 126.985049},
        {title:'롯데리아', lat : 37.569857, lng : 126.984923},
        {title:'초밥의신부타', lat : 37.569440, lng : 126.987367},
        {title:'청진식당', lat : 37.570515, lng : 126.985710},
        {title:'에머이', lat : 37.570031, lng : 126.984601},
    ];

    function clearMarkers(){
        for(var store of arr){
            if(store.marker){
                store.marker.setMap(null);
            }
        }
    }

    function clone(origin){
        var result = [];
        for(var obj of origin){
            result.push(obj);
        }
        return result;
    }

    function findNNStore(current){
        function calcDistance(p1, p2){
            return Math.sqrt( Math.pow( p1.lat - p2.lat,2) +
                Math.pow( p1.lng - p2.lng,2)
            );
        }
        var target = clone(arr);
        target.sort(function (a, b) {
            var d1 = calcDistance(current, a) * 100000;
            var d2 = calcDistance(current, b) * 100000;
            return d1 - d2;
        })
        return target[0];
    }

    function getList(callback) {
        callback(arr);
    }
    function showMarker(idx) {

        clearMarkers();

        var store = arr[idx];
        if(!store.marker){
            store.marker = new daum.maps.Marker({
                position: new daum.maps.LatLng(store.lat, store.lng),
                map: map
            });
        }else{
            store.marker.setMap(map);
        }
        // if(!store.infoWin){
        //     store.infoWin = new daum.maps.InfoWindow({
        //         position: new daum.maps.LatLng(store.lat, store.lng),
        //         content: store.title // 인포윈도우에 표시할 내용
        //     });
        // }
    }

    return {
        getList: getList,
        showMarker: showMarker,
        findNNStore: findNNStore
    }

})(map);