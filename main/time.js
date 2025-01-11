const d = new Date();
var hours = d.getHours();
if (hours <= 5 || hours >= 20) {
    document.getElementById("o1").style.backgroundImage = "url('main/starbg2.gif')";
} else if (hours == 6 || hours == 19) {

} else {

}