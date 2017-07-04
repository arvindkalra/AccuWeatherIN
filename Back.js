/**
 * Created by arvind on 3/7/17.
 */
var initialised = false;
initialising();
function initialising() {
    if(!initialised) {
        startLoader();
        search("New Delhi");
        initialised = true;
    }
}

window.onload = function (){

    $(".flip").flip({
        trigger: 'hover'
    });

    $("#sbtn").click(function () {
        var input = $('#input').val();
        startLoader();
        search(input);
    })
}

function search(input) {
    var url = "http://api.worldweatheronline.com/premium/v1/weather.ashx?key=56e3159a16df4273aff81748170307&q="+input+"&format=json&num_of_days=5&fx=yes";
    $.ajax({url:url, success: function(result){
        console.log(result);
        // $("#div1").html(result);
        var obj = result;
        var curr = obj.data.current_condition[0];
        $('#cityName').text(getCityName(obj.data.request[0].query));
        $('#curtempval').text(curr.FeelsLikeC);
        $('#tmin').text(obj.data.weather[0].mintempC);
        $('#tmax').text(obj.data.weather[0].maxtempC);
        $('#thumidity').text(curr.humidity);
        $('#tclouds').text(curr.cloudcover);
        $('#twind').text(curr.windspeedKmph);
        $('#twindir').text(curr.winddirDegree);
        $('#tdescription').text(getCityName(curr.weatherDesc[0].value));
        $('.currimg').attr('src',getPicture(obj.data.weather[0].hourly));

        // Make days
        // card-1;
        curobj = obj.data.weather[1];
        var date = getDate(curobj.date);
        $('#dt2').text(date);
        $('#img2').attr('src',getPicture(curobj.hourly));
        $('#uv2').text(curobj.uvIndex);
        $('#min2').text(curobj.mintempC);
        $('#max2').text(curobj.maxtempC);

        // card-2;
        curobj = obj.data.weather[2];
        var date = getDate(curobj.date);
        $('#dt3').text(date);
        $('#img3').attr('src',getPicture(curobj.hourly));
        $('#uv3').text(curobj.uvIndex);
        $('#min3').text(curobj.mintempC);
        $('#max3').text(curobj.maxtempC);

        // card-3;
        curobj = obj.data.weather[3];
        var date = getDate(curobj.date);
        $('#dt4').text(date);
        $('#img4').attr('src',getPicture(curobj.hourly));
        $('#uv4').text(curobj.uvIndex);
        $('#min4').text(curobj.mintempC);
        $('#max4').text(curobj.maxtempC);

        // card-4;
        curobj = obj.data.weather[4];
        var date = getDate(curobj.date);
        $('#dt5').text(date);
        $('#img5').attr('src',getPicture(curobj.hourly));
        $('#uv5').text(curobj.uvIndex);
        $('#min5').text(curobj.mintempC);
        $('#max5').text(curobj.maxtempC);

        endLoader();

    }})
}

function startLoader() {
    $('#body').css({'display':'none'});
    $(".loader").css({'display':'block'});
}
function endLoader() {
    $('#body').css({'display':'block'});
    $(".loader").css({'display':'none'});
};

function getPicture(hourly) {
    var rain = 0;
    var cloud = 0;
    var thunder = 0;
    var snow = 0;
    var sunshine = 0;
    var haze = 0;
    for(var i = 0; i < 8; i++){
        var currobj = hourly[i];
        rain = rain + parseInt(currobj.chanceofrain);
        cloud = cloud + parseInt(currobj.cloudcover);
        thunder = thunder + parseInt(currobj.chanceofthunder);
        snow = snow + parseInt(currobj.chanceofsnow);
        sunshine = sunshine + parseInt(currobj.chanceofsunshine);
        haze = haze + parseInt(currobj.chanceofwindy);
    }
    var max = Math.max(rain,cloud,thunder,snow,sunshine,haze);
    if(max === rain){
        return "Rain.png";
    }else if(max === cloud){
        return "SunnyNCloudy.png";
    }else if(max === thunder){
        return "ThunderStorm.png";
    }else if(max === snow){
        return "Snow.png";
    }else if(max === sunshine){
        return "Sunny.png";
    }else if(max === haze){
        return "Haze.png";
    }
}

function getCityName(string) {
    var str = "";
    for(var i = 0; i < string.length; i++){
        var cc = string[i];
        if(cc === ','){
            return str;
        }else{
            str += cc;
        }
    }
}

function getDate(string) {
    var monthnums = string[5] + "" +string[6];
    var monthnum = parseInt(monthnums);
    var monthname = getMonth(monthnum);
    var daydates = string[8] + "" +string[9];
    var daydate = parseInt(daydates);

    return daydate + " " + monthname;
}

function getMonth(num) {
    switch(num){
        case 1:
            return "JAN";
        case 2:
            return "FEB";
        case 3:
            return "MARCH";
        case 4:
            return "APRIL";
        case 5:
            return "MAY";
        case 6:
            return "JUNE";
        case 7:
            return "JULY";
        case 8:
            return "AUG";
        case 9:
            return "SEPT";
        case 10:
            return "OCT";
        case 11:
            return "NOV";
        case 12:
            return "DEC";
    }
}


