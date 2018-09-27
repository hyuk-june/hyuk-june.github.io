export default{
    get24HourStr(value){
        return value=='1' ? '24시간' : '';
    },

    getNoHolidayStr(value){
        return value=='1' ? '연중무휴' : '';
    }
}