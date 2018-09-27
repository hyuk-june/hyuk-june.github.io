export default{

    //TODO: 실제전화번호를 가져온다
    loadPhoneNumber(callback){
        callback('010-333-' + ((Math.random() * 9999) + 1000).toString());
    },

    //TODO: 디바이스로부터 위도 경도를 가져온다
    loadLatLng(callback){
        callback({
            lat: 35.11144523515915,
            lng: 129.108608844296
        });
    }
}