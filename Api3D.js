const vn = 'http://eyecheck.vn/namdinhclient.apis/client/3d?lang=vn'
const en = 'http://eyecheck.vn/namdinhclient.apis/client/3d?lang=en'
async function View3D(url){
    $demoCont.classList.toggle("credits-active");
    $demoCont.style.zIndex = 10;
	document.querySelector(".list_image").style.display = "none";
    document.querySelector(".demo-cont__credits").style.opacity = 1;
       document.querySelector(".demo-cont__credits-close").addEventListener("click", function() {
        document.querySelector(".list_image").style.display = "block";
        setTimeout(function() {
          $demoCont.style.zIndex = 0;
        }, 900);
      });
    $('iframe').attr("src", url )
    
}

function HienVat3D(url, callback) {
    $.ajax({
        type: 'GET',
        url:  'http://eyecheck.vn/namdinhclient.apis/client/3d?lang=' + url,
        // data: {"type":"check"},
        success: function (data) {
            console.log("Danh sach hiện vật 3D: ",data);
            var htmlStr = "";
            var i = 0;
            for (i = 0; i <data.data.length; i++) {
                    htmlStr +=
                    '<div class="row margin-bottom-20">'+ 
					'<div class="col-sm-5 sm-margin-bottom-20">'+
						// '<img src="" alt="Ảnh 360">'+
                        "<img src="+"http://eyecheck.vn"+( data.data[i].thumb_url)+" style='width:100%;height: 45vh'>" +
					'</div>'+
					'<div class="col-sm-7 news-v3">'+
						'<div class="news-v3-in-sm no-padding">'+
							'<h2 class="content" style="color: #2196f3"> '+(data.data[i].image_name) +'<a href="/"></a></h2>'+
							'<p class="text-justify"> '+(data.data[i].image_desc) +'</p>'+
							'<a href="'+(data.data[i].image_url)+'" class="btn btn-warning" onclick="">Xem 3D</a>'
						'</div>'+
					'</div>'+
				'</div>'+
                '<div class="clearfix margin-bottom-20">'+
               '<hr>'+
                '</div>'
                
            }
            $(`p`).html(htmlStr);
            callback();
        },
        contentType: "application/json",
        dataType: 'json'
    });
};

$(document).ready(function () {
    var curLang = GetLang();
    HienVat3D(curLang, function() {
        if(curLang == "vn") {
            InitVN();
        } else {
            InitEN();
        }
    });
    $(".language .lang-en").on("click", function(e) {

        window.localStorage.setItem('lang', "en");
        //
        HienVat3D("en", function() {
            InitEN();
        });
    })

    $(".language .lang-vn").on("click", function(e) {

        window.localStorage.setItem('lang', "vn");
        //
        HienVat3D("vn", function() {
            InitVN();
        });
    })
})



function InitVN() {
    $(".m-nav .nav-ct ul li a").eq(0).text("TRANG CHỦ")
    $(".m-nav .nav-ct ul li a").eq(1).text("BẢN ĐỒ DI SẢN");
    $(".m-nav .nav-ct ul li a").eq(2).text("DANH MỤC DI SẢN");
    $(".m-nav .nav-ct ul li a").eq(3).text("THƯ VIỆN HIỆN VẬT");
    $(".m-nav .nav-ct ul li a").eq(4).text("THƯ VIỆN VIDEO");
    $(".m-nav .nav-ct ul li a").eq(5).text("LIÊN HỆ");
    
    $(".header .main-nav ul li a").eq(0).text("TRANG CHỦ");
    $(".header .main-nav ul li a").eq(1).text("BẢN ĐỒ DI SẢN");
    $(".header .main-nav ul li a").eq(2).text("DANH MỤC DI SẢN");
    $(".header .main-nav ul li a").eq(3).text("THƯ VIỆN HIỆN VẬT");
    $(".header .main-nav ul li a").eq(4).text("THƯ VIỆN VIDEO");
    $(".header .main-nav ul li a").eq(5).text("LIÊN HỆ");
    $("h2.page-header").text("Thư viện hiện vật");
}

function InitEN() {
    $(".m-nav .nav-ct ul li a").eq(0).text("HOME")
    $(".m-nav .nav-ct ul li a").eq(1).text("LOCATION MAP");
    $(".m-nav .nav-ct ul li a").eq(2).text("LIST OF RELICS");
    $(".m-nav .nav-ct ul li a").eq(3).text("LIBRARY OF ARTIFACTS");
    $(".m-nav .nav-ct ul li a").eq(4).text("VIDEOS");
    $(".m-nav .nav-ct ul li a").eq(5).text("CONTACT");

    $(".header .main-nav ul li a").eq(0).text("HOME");
    $(".header .main-nav ul li a").eq(1).text("LOCATION MAP");
    $(".header .main-nav ul li a").eq(2).text("LIST OF RELICS");
    $(".header .main-nav ul li a").eq(3).text("LIBRARY OF ARTIFACTS");
    $(".header .main-nav ul li a").eq(4).text("VIDEOS");
    $(".header .main-nav ul li a").eq(5).text("CONTACT");
    $("h2.page-header").text("Library of artifacts");
}

function GetLang() {
    var lang = window.localStorage.getItem('lang');
    if(lang == null) {
        window.localStorage.setItem('lang', "vn");
        return "vn";
    } else {
        return lang;
    }
}