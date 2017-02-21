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
    $("#texxt").val("");
    $(".messages").getNiceScroll(0).resize();
    return $(".messages").getNiceScroll(0).doScrollTop(999999, 999);
  };


  setTimeout(function(){
     $(".messages").append("<li class=\"friend-with-a-list\"><div class=\"head\"><span class=\"name\">Costrategix  </span><span class=\"time\">" + (new Date().getHours()) + ":" + (new Date().getMinutes()) + " AM, Today</span></div><div class=\"message\">Welcome to Costrategix. How can we help you?</div></li>");
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
      $(".messages").append("<li class=\"friend-with-a-list\"><div class=\"head\"><span class=\"name\">You</span><span class=\"time\">" + (new Date().getHours()) + ":" + (new Date().getMinutes()) + " AM, Today</span></div><div class=\"message\" id=\"client-chat\">" + buttonText + "</div></li>");
      claerResizeScroll();

      //Fetching Response for the selection of chatbubble from chatstructure.js
      responseObject=chatObject.flow1[buttonObject];
      console.log(responseObject);
      //messageResponse=(responseObject.response==undefined)?"":responseObject.response;
      //Get List of Responses
      var responsesArray=Object.values(searchKeyValueFromSpecificString("response",responseObject));

      if(responsesArray.length!=0){
        var index=0;

        $(".messages").append("<li class='friend-with-a-list' id='typingmessage' style='display:none;'><div class='head'></div><img src='/chatbot/images/typing.gif'></li>");
        $("#typingmessage").show();

        var otvet=setInterval(function() {
          if(index>=responsesArray.length){
            createButtons();
            return clearInterval(otvet);
          }
        setTimeout(function(){
              $(".messages").append("<li class='friend-with-a-list' id='typingmessage' style='display:none;'><div class='head'></div><img src='/chatbot/images/typing.gif'></li>");
              $("#typingmessage").show();
              claerResizeScroll();
        });


          claerResizeScroll();

          
          $(".messages").append("<li class=\"friend-with-a-list\"><div class=\"head\"><span class=\"name\">Costrategix  </span><span class=\"time\">" + (new Date().getHours()) + ":" + (new Date().getMinutes()) + " AM, Today</span></div><div class=\"message\">" + responsesArray[index] + "</div></li>");
        
          $("#typingmessage").hide();
          $("#typingmessage").remove();
          claerResizeScroll();

          index++;
        }, getRandomInt(2500, 1000));


    }

});

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
          
          $("#typingmessage").hide();
          $("#typingmessage").remove();

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

