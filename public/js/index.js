(function() {
  var claerResizeScroll, conf, getRandomInt, insertI, lol;
  var messageResponse="";

  conf = {
    cursorcolor: "#696c75",
    cursorwidth: "4px",
    cursorborder: "none"
  };

  lol = {
    cursorcolor: "#cdd2d6",
    cursorwidth: "4px",
    cursorborder: "none"
  };

  getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  claerResizeScroll = function() {
/*    $("#texxt").val("");
    $(".messages").getNiceScroll(0).resize();
    return $(".messages").getNiceScroll(0).doScrollTop(999999, 999);*/
  };


  setTimeout(function(){

     $('<li><div class="cos-tl-circ"></div><div class="cos-chatline-panel animated fadeInLeft"><div class="tl-body"><p>Welcome to Costrategix. How can we help you?</p></div><!-- <div class="tl-body-time"><p>Costrategix 13:6 AM, Today</p></div> --></div></li>').insertBefore("#controlbox");
     $('<li class="cos-loader txtr"><div class="cos-chatline-panel animated"><div class="tl-body"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></li>').insertBefore("#controlbox");
     $(".cos-loader").show();
     setTimeout(function(){
        $('<li><div class="cos-tl-circ"></div><div class="cos-chatline-panel animated fadeInLeft"><div class="tl-body"><p>How can we help you? You can chat with me by tapping the option below :)</p></div><!-- <div class="tl-body-time"><p>Costrategix 13:6 AM, Today</p></div> --></div></li>').insertBefore("#controlbox");
        $(".cos-loader").hide();
        $(".cos-loader").remove();
     },3000);
     
     $("#Button1").text(chatObject.flow1.start.Button1);
     $("#Button2").text(chatObject.flow1.start.Button2);
     $("#Button1, #Button2").show();
  },2000);

  insertI = function() {
    var innerText, otvet;
    innerText = $.trim($("#texxt").val());
    if (innerText !== "") {
      $(".messages").append("<li class=\"i\"><div class=\"head\"><span class=\"time\">" + (new Date().getHours()) + ":" + (new Date().getMinutes()) + " AM, Today</span><span class=\"name\"> Hari</span></div><div class=\"message\">" + innerText + "</div></li>");
      checkIntents();
      claerResizeScroll();
      
      if(messageResponse!=""){
      return otvet = setInterval(function() {
        $(".messages").append("<li class=\"friend-with-a-list\"><div class=\"head\"><span class=\"name\">Costrategix  </span><span class=\"time\">" + (new Date().getHours()) + ":" + (new Date().getMinutes()) + " AM, Today</span></div><div class=\"message\">" + messageResponse + "</div></li>");
        claerResizeScroll();
        return clearInterval(otvet);
      }, getRandomInt(2500, 500));
     }
    }
  };


$("#controlbox .button").on("click",function(){
      var buttonObject = $(this).attr("id");
      //adding selected button to chat bubble
      var buttonText = $(this).text();
      $('<li class="cos-chatline-inverted"><div class="cos-tl-circ"></div><div class="cos-chatline-panel animated fadeInRight"><div class="tl-body"><p>'+buttonText+'</p></div></div></li>').insertBefore("#controlbox");
      claerResizeScroll();

      //Fetching Response for the selection of chatbubble from chatstructure.js
      responseObject=chatObject.flow1[buttonObject];
      console.log(responseObject);
      //messageResponse=(responseObject.response==undefined)?"":responseObject.response;
      //Get List of Responses
      var responsesArray=Object.values(searchKeyValueFromSpecificString("response",responseObject));

      if(responsesArray.length!=0){
        var index=0;

        $('<li class="cos-loader txtr"><div class="cos-chatline-panel animated"><div class="tl-body"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></li>').insertBefore("#controlbox");
        $(".cos-loader").show();

        var otvet=setInterval(function() {
          if(index>=responsesArray.length){
            createButtons();
            return clearInterval(otvet);
          }
        setTimeout(function(){
              $('<li class="cos-loader txtr"><div class="cos-chatline-panel animated"><div class="tl-body"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></li>').insertBefore("#controlbox");
              $(".cos-loader").show();
              claerResizeScroll();
        });


          claerResizeScroll();


          $('<li><div class="cos-tl-circ"></div><div class="cos-chatline-panel animated fadeInLeft"><div class="tl-body"><p>'+responsesArray[index]+'<!-- <div class="tl-body-time"><p>Costrategix 13:6 AM, Today</p></div> --></div></li>').insertBefore("#controlbox");
        
          $(".cos-loader").hide();
          $(".cos-loader").remove();
          claerResizeScroll();

          index++;
        }, getRandomInt(2500, 1000));


    }
     
        createTextBox();
    

});


 $('#emailId').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            sendEmail($(this).val());//Trigger search button click event
            $("#emailId").hide();
        }
 });


function sendEmail(emailId){
          
        $.ajax({
     type: "GET",
     url: 'http://dev0.cosdevx.com:5000/sendEmail?emailId='+emailId,
     success: function(response){
                 $('<li class="cos-loader txtr"><div class="cos-chatline-panel animated"><div class="tl-body"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></li>').insertBefore("#controlbox");
        $(".cos-loader").show();
        setTimeout(function(){
            $('<li><div class="cos-tl-circ"></div><div class="cos-chatline-panel animated fadeInLeft"><div class="tl-body"><p>Your Email has been sent further communication. Thank you.<!-- <div class="tl-body-time"><p>Costrategix 13:6 AM, Today</p></div> --></div></li>').insertBefore("#controlbox");
            $(".cos-loader").hide();
            $("emailId").hide();
        },2000);
     }
     }); 

}


function createTextBox(){
    var keyArray=Object.keys(responseObject);

          console.log(keyArray);
          for(i=0;i<keyArray.length;i++){
              if(keyArray[i].includes("CustomAction")){  
                   $(".button").hide();
                   $("#emailId").show();
                   break;         
              }
          }
}

function createButtons(){
            var keyArray=Object.keys(responseObject);
          var buttonArray=[];
          var numberOfButtons=0;
          console.log(keyArray);
          for(i=0;i<keyArray.length;i++){
              if(keyArray[i].includes("Button")){  
                    buttonArray.push(keyArray[i]);
                    numberOfButtons++;
              }
          }

          if(numberOfButtons==0){
                $("#controlbox .button").css("display","none");
          }

               $("#controlbox .button").each(function(index,object){
                    console.log("button:"+index +" ",$(this));
                    object.id=buttonArray[index];
                    object.innerHTML=responseObject[buttonArray[index]];
               });
          
          $(".cos-loader").hide();
          $(".cos-loader").remove();

}


function searchKeyValueFromSpecificString(searchString, object){
  var z = Object.keys(object).filter(function(k) {
    return k.indexOf(searchString+"") == 0;
}).reduce(function(newData, k) {
    newData[k] = object[k];
    return newData;
}, {});

return z;
}

  $(document).ready(function() {
    $(".list-friends").niceScroll(conf);
    $(".messages").niceScroll(lol);
    $("#texxt").keypress(function(e) {
      if (e.keyCode === 13) {
        insertI();
        return false;
      }
    });
    return $(".send").click(function() {
      return insertI();
    });
  });

}).call(this);

