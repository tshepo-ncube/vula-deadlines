var floating_button = document.getElementsByClassName("floating-button")[0];
floating_button.addEventListener("click", function(){ window.location.href = 'addTask.html'; });




const assessmentIsLate = function(str){
            
              
  if(str.includes('late')){
    return true;
  }
  return false;

}

const dateInPast = function (firstDate ) {


  var now = new Date( );
  var timeSec = firstDate.getTime()-now.getTime()
  if(timeSec<=0){
      //the date is in the future or present if its 0
      return true;
  }

  return false;
}; 

const firebaseConfig = {
  apiKey: "AIzaSyDkzG6vHhG0vfawRuS_rolAN-UtyKl6itg",
  authDomain: "vula-22409.firebaseapp.com",
  projectId: "vula-22409",
  storageBucket: "vula-22409.appspot.com",
  messagingSenderId: "792368134860",
  appId: "1:792368134860:web:31ef7ade2c92bb4bfaa069",
  measurementId: "G-Q79YRE0M02"
};


// firebase.initializeApp(firebaseConfig);




  chrome.storage.sync.get(['Assessments','STUDENT_NUMBER'], function(result) {
    console.log(result.Assessments);
    
    // if(!result.Assessments){

    //   document.getElementById('login').getElementsByTagName('h2')[0].innerHTML = "No assessments on vula...  &#10084;&#65039; "
    //   document.getElementsByClassName('cardxx')[0].remove()
    // }else{


            if(result.STUDENT_NUMBER ===undefined){
              console.log('student has not loggeed in ...')
              document.getElementsByClassName('cardxx')[0].remove()
              document.getElementsByClassName('floating-container')[0].remove()
              

          }else{
            console.log('student number exists...')
            chrome.runtime.sendMessage({ command:'analytics'});
            document.getElementById('login').remove();;

                    if(result.Assessments.length===0) {
                                document.getElementById('login').getElementsByTagName('h2')[0].innerHTML = "No assessments on vula...  &#10084;&#65039; "
                        document.getElementsByClassName('cardxx')[0].remove()
                    }else{
                                          document.getElementsByClassName('cardxx')[0].remove()
                                          var array = result.Assessments;
                                          array.sort(function(a,b){
                                            // Turn your strings into dates, and then subtract them
                                            // to get a value that is either negative, positive, or zero.
                                            try{
                                              
                                                return new Date(b.dueDate) - new Date(a.dueDate);//both assignment
                                              
                                            }catch(err){
                                                  
                                                          try{
                                                            return new Date(b.dueDate) - new Date(a.due_date);//assignment - test
                                                          }catch(err){

                                                                try{
                                                                  return new Date(b.due_date) - new Date(a.due_date);//test - test
                                                                }catch(err){
                                                                        try{
                                                                          return new Date(b.due_date) - new Date(a.dueDate);//test - assignment
                                                                        }catch(err){
              
                                                                        }
                                                                }
                                                          }

                                                   
                                            }
                                          });

                                          array.reverse();
                                          array.map( assessment => {
                                            

                                            try{
                                              if(assessment.self){
                                                console.log(assessment)
                                                  //the element is self created
                                                  selfAssessment(assessment);
                                                  return;
                                              } 
                                            }catch(err){
                                               console.log("assignments not self")
                                            }

                                            if(assessment.type=="Assignment") {
                                                          

                                                                var ass = '';

                                                              console.log(`Due Date for ${assessment.title} : ${assessment.dueDate} `)

                                                              var month = assessment.dueDate.split(',')[0].split(' ')[1]
                                                                                     
                                                                                          
                                                              var day = assessment.dueDate.split(',')[0].split(' ')[0]
                                                              //console.log(month.length)
                                                              if(month.length!==3){
                                                                month = "";
                                                                day = "";
                                                              }  
                                                              // if(month.trim().length!==3){
                                                              //     month = "Mon"
                                                              //     day = "00"
                                                              // }
                                    
                                                              if(dateInPast(new Date(assessment.dueDate))){
                                                                return;
                                                              }
                                    
                                                              if(assessmentIsLate(assessment.dueDate)){
                                                                return;
                                                              }
                                                              
                                                              
                                    
                                                              var countDownDate = new Date(assessment.dueDate).getTime();
                                    
                                                              // Update the count down every 1 second
                                                              // var x = setInterval(function() {
                                    
                                                                // Get today's date and time
                                                                var now = new Date().getTime();
                                    
                                                                // Find the distance between now and the count down date
                                                                var distance = countDownDate - now;
                                    
                                                                // Time calculations for days, hours, minutes and seconds
                                                                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                                                                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                                                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                                                                //var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                                    
                                                                if(days===0){
                                                                  var timeRemain =   hours + "h "
                                                                  + minutes + "m "// + seconds + "s ";
                                                                    
                                                                }else {
                                                                  var timeRemain = days + "d " + hours + "h "
                                                                  + minutes + "m "// + seconds + "s ";
                                                                      
                                                                }
                                    
                                    
                                                            
                                                                var timeHtml = '';
                                                                if(days===0){
                                                                    timeHtml = `<span class="widget-49-meeting-time"> <strong class='time_remain_less'>Time Remaining: ${timeRemain} </strong> </span>`
                                                                }else {
                                                                    timeHtml = `<span class="widget-49-meeting-time"> <strong class='time_remain_more'>Time Remaining: ${timeRemain} </strong> </span>`
                                                                }
                                                                
                                    
                                    
                                                              console.log(day)
                                                              console.log(month)
                                                                          ass +=  `<div class="col-lg-4" style='margin-top:20px;'>`
                                                                                        +`<div class="card card-margin">`
                                                                                        +    `<div class="card-header no-border">`
                                                                                        +        `<h6 class="card-title">${assessment.site}</h6>`
                                                                                        +    `</div>`
                                                                                        +    `<div class="card-body pt-0">`
                                                                                        +        `<div class="widget-49">`
                                                                                        +            `<div class="widget-49-title-wrapper">`
                                                                                        +                `<div class="widget-49-date-primary">`
                                                                                        +                    `<span class="widget-49-date-day">${day}</span>`
                                                                                        +                    `<span class="widget-49-date-month">${month}</span>`
                                                                                        +               `</div>`
                                                                                        +                `<div class="widget-49-meeting-info">`
                                                                                        +                    `<span class="widget-49-pro-title">${assessment.title}</span>`
                                                                                        +                    `<span class="widget-49-meeting-time">Assignments</span>`
                                                                                        +                    `<span class="widget-49-meeting-time">${assessment.dueDate}</span>`
                                                                                        +                    timeHtml
                                                                                        +                `</div>`                 
                                                                                        +            `</div>`  
                                                                                        +       ` </div>`
                                                                                        +    `</div>`
                                                                                        +`</div>`
                                                                                        +`</div>`
                                    
                                                                                        var domoo = string2dom(ass)
                                                                                      
                                                                                        document.getElementsByClassName('card-body')[0].innerHTML+=domoo.getElementsByClassName('col-lg-4')[0].outerHTML
                                                                                       // document.getElementsByClassName('cardxx')[0].remove()
                                                                                      // document.getElementsByClassName('cardxx')[0].remove();
                                                                                      
                                                                                      





                                              
                                            }else{


                                                            var ass = '';

                                                          console.log(`Due Date for ${assessment.title} : ${assessment.due_date} `)

                                                          var month = assessment.due_date.split(',')[0].split(' ')[1]
                                                                                              
                                                                                      
                                                          var day = assessment.due_date.split(',')[0].split(' ')[0]

                                                          if(month.length!==3){
                                                            month = "";
                                                            day = "";
                                                          }

                                                          if(dateInPast(new Date(assessment.due_date))){
                                                            return;
                                                          }
                                
                                                          if(assessmentIsLate(assessment.due_date)){
                                                            return;
                                                          }
                                                          
                                                          
                                
                                                          var countDownDate = new Date(assessment.due_date).getTime();
                                
                                                          // Update the count down every 1 second
                                                          // var x = setInterval(function() {
                                
                                                            // Get today's date and time
                                                            var now = new Date().getTime();
                                
                                                            // Find the distance between now and the count down date
                                                            var distance = countDownDate - now;
                                
                                                            // Time calculations for days, hours, minutes and seconds
                                                            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                                                            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                                                            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                                                            //var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                                
                                                            if(days===0){
                                                              var timeRemain =   hours + "h "
                                                              + minutes + "m "// + seconds + "s ";
                                                                
                                                            }else {
                                                              var timeRemain = days + "d " + hours + "h "
                                                              + minutes + "m "// + seconds + "s ";
                                                                  
                                                            }
                                
                                
                                                        
                                                            var timeHtml = '';
                                                            if(days===0){
                                                                timeHtml = `<span class="widget-49-meeting-time"> <strong class='time_remain_less'>Time Remaining: ${timeRemain} </strong> </span>`
                                                            }else {
                                                                timeHtml = `<span class="widget-49-meeting-time"> <strong class='time_remain_more'>Time Remaining: ${timeRemain} </strong> </span>`
                                                            }
                                                            
                                
                                
                                                          console.log(day)
                                                          console.log(month)
                                                                      ass +=  `<div class="col-lg-4" style='margin-top:20px;'>`
                                                                                    +`<div class="card card-margin">`
                                                                                    +    `<div class="card-header no-border">`
                                                                                    +        `<h6 class="card-title">${assessment.site}</h6>`
                                                                                    +    `</div>`
                                                                                    +    `<div class="card-body pt-0">`
                                                                                    +        `<div class="widget-49">`
                                                                                    +            `<div class="widget-49-title-wrapper">`
                                                                                    +                `<div class="widget-49-date-primary">`
                                                                                    +                    `<span class="widget-49-date-day">${day}</span>`
                                                                                    +                    `<span class="widget-49-date-month">${month}</span>`
                                                                                    +               `</div>`
                                                                                    +                `<div class="widget-49-meeting-info">`
                                                                                    +                    `<span class="widget-49-pro-title">${assessment.title}</span>`
                                                                                    +                    `<span class="widget-49-meeting-time">Tests and Quizes</span>`
                                                                                    +                    `<span class="widget-49-meeting-time">${assessment.due_date}</span>`
                                                                                    +                    timeHtml
                                                                                    +                `</div>`                 
                                                                                    +            `</div>`  
                                                                                    +       ` </div>`
                                                                                    +    `</div>`
                                                                                    +`</div>`
                                                                                    +`</div>`
                                
                                                                                    var domoo = string2dom(ass)
                                                                                  
                                                                                    document.getElementsByClassName('card-body')[0].innerHTML+=domoo.getElementsByClassName('col-lg-4')[0].outerHTML
                                                                                    //document.getElementsByClassName('cardxx')[0].remove()
                                                                                  // document.getElementsByClassName('cardxx')[0].remove();
                                                                                  
                                                                                  


                                            }



 
                  
                  
                                            
                                                                    
                                                                    })
                      

                    }


          }

          try {
            var removeBtn = document.getElementById("removeBtn");
            //console.log(removeBtn)
            var numBtns = document.getElementsByTagName('button');
            console.log(`remove buttons length : ${numBtns.length}`)
            for(var q=0;q<numBtns.length;q++){
              let myVar = q;
              numBtns[q].addEventListener("click", function(){
                    
                 //console.log(numBtns[myVar].name) 
                 console.log(  `${numBtns[myVar].name} is name of button...` )
                 removeAssessment(numBtns[myVar].name)

                });
            }
          
          }catch(err){
            console.log("no self tasks")
          }

  //  }

      
    
    

   


  });
 // chrome.storage.sync.clear();

 
function string2dom (html) {
                        var iframe, doc;
                        iframe = document.createElement('iframe');
                        iframe.style.display = 'none';
                        document.body.appendChild(iframe);
                        doc = iframe.contentDocument || iframe.contentWindow.document;
                        iframe.parentNode.removeChild(iframe);
                        doc.open();
                        doc.write(html);
                        doc.close();
                        return doc;
                        }

function selfAssessment(assessment){
          var txt = '';

          
          console.log(`SELF due date : ${assessment.due_date}`)
          var date_store = new Date(assessment.due_date)
          var month = date_store.toString().split(' ')[1]
          console.log(month)                  
                                      
          var day = date_store.toString().split(' ')[2]
          console.log(`${day} ${month}`)
          //console.log(month.length)
          if(month.length!==3){
            month = "";
            day = "";
          }  
          // if(month.trim().length!==3){
          //     month = "Mon"
          //     day = "00"
          // }

          if(dateInPast(new Date(assessment.due_date))){
            console.log(`SELF---- ${assessment.title} : has passed `)
            return;
          }
          console.log(`SELF---- ${assessment.title} : is soon.... `)
          // if(assessmentIsLate(assessment.dueDate)){
          //   return;
          // }
          
          

          var countDownDate = new Date(assessment.due_date).getTime();

          // Update the count down every 1 second
          // var x = setInterval(function() {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            //var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if(days===0){
              var timeRemain =   hours + "h "
              + minutes + "m "// + seconds + "s ";
                
            }else {
              var timeRemain = days + "d " + hours + "h "
              + minutes + "m "// + seconds + "s ";
                  
            }



            var timeHtml = '';
            if(days===0){
                timeHtml = `<span class="widget-49-meeting-time"> <strong class='time_remain_less'>Time Remaining: ${timeRemain} </strong> </span>`
            }else {
                timeHtml = `<span class="widget-49-meeting-time"> <strong class='time_remain_more'>Time Remaining: ${timeRemain} </strong> </span>`
            }
            


          console.log(day)
          console.log(month)
          var mm =  assessment.title
          txt +=  `<div class="col-lg-4" style='margin-top:20px;'>`
                                    +`<div class="card card-margin">`
                                    +    `<div class="card-header no-border">`
                                    +        `<h6 class="card-title">${assessment.site}</h6>`
                                    +    `</div>`
                                    +    `<div class="card-body pt-0">`
                                    +        `<div class="widget-49">`
                                    +            `<div class="widget-49-title-wrapper">`
                                    +                `<div class="widget-49-date-primary">`
                                    +                    `<span class="widget-49-date-day">${day}</span>`
                                    +                    `<span class="widget-49-date-month">${month}</span>`
                                    +               `</div>`
                                    +                `<div class="widget-49-meeting-info">`
                                    +                    `<span class="widget-49-pro-title">${assessment.title}</span>`
                                    +                    `<span class="widget-49-meeting-time">${assessment.type}</span>`
                                    +                    `<span class="widget-49-meeting-time">${assessment.due_date}</span>`
                                    +                    timeHtml
                                    +                `</div>`                 
                                    +            `</div>`  
                                    +       ` </div>`
                                    +    `</div>`
                                    + "<button class="+"\"button\" id="+"\"removeBtn\" name='"+mm+"'   >remove</button>"
                                    +`</div>` 
                                    +`</div>`
                                      
                                    var domoo = string2dom(txt)
                                    console.log(domoo)
                                    document.getElementsByClassName('card-body')[0].innerHTML+=domoo.getElementsByClassName('col-lg-4')[0].outerHTML
                                  // document.getElementsByClassName('cardxx')[0].remove()
                                  // document.getElementsByClassName('cardxx')[0].remove();
                                  
                                  
}

function removeAssessment(title){
  chrome.storage.sync.get(['Assessments'], function(result) {
    console.log(title)
    
    var assessmentsHolder = result.Assessments;

    var filtered = assessmentsHolder.filter(function(ass){ 
      console.log(ass)
      console.log(  `Removing ${title} ....` )
      return ass.title !== title;
    });

    console.log(filtered)
    chrome.storage.sync.set({Assessments: filtered}, function() {
      console.log(`${title} is now removed... :)`)
      window.location.href = 'popup.html';
});
    

 
    
});
}

 
 


