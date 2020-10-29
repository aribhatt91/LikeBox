export const readFromCookie = (name) => {
    try{
        let decodedCookie = decodeURIComponent(document.cookie),
        ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
    }catch(err){
        console.log('readFromCookie: error :', name, err);
    }
    return null;
}

export const writeToCookie = (cname, value, days) => {
    var d = new Date();
    d.setTime(d.getTime() + ((days || 30)*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + JSON.stringify(value) + ";" + expires + ";path=/";
}

export const numberWithCommas = (x) => {
    if(isNaN(Number(x))){return ""}
    let parts = x.toString().split(".");
    return Number(parts[0]).toLocaleString() + "." + ((parts[1] || "") + "00").slice(0,2);
}