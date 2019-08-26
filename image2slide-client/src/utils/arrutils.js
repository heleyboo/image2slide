export default class ArrUtils {
    static removeItemById = (id, arr) => {
        return arr.filter(function(ele){
            return ele.id != id;
        });
    }
}