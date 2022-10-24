var backBtn = document.getElementById("backBtn");
var storeBtn = document.getElementById("storeBtn");

 
var title__ = document.getElementById("title")//[0].value;;
var courseCode = document.getElementById("courseCode")//.value;
var type = document.getElementById("type")//.value;
 
var date = document.getElementById("date")//.value;
var time = document.getElementById("time")//.value;

function storeAssessmentIfExists(assessment){
       
    chrome.storage.sync.get(['Assessments'], function(result) {
        var assessmentsHolder = result.Assessments;
        console.log(assessmentsHolder)
        if (assessmentsHolder.filter(e => e.title === assessment.title).length > 0) {
              
              console.log(`${assessment.title} - exists!`)
              alert(`${assessment.title} - exists!`)

        }else{
              console.log( `${assessment.title} - does not exist :)`)


              assessmentsHolder.push(assessment)
              chrome.storage.sync.set({Assessments: assessmentsHolder}, function() {
                console.log(`${assessment.title} is now stored... :)`)
                window.location.href = 'popup.html';
          });

        }

        
    });
     
}


  
backBtn.addEventListener("click", function(){ 
   
    window.location.href = 'popup.html'; 
});

storeBtn.addEventListener("click", function(){ 
   
    var assment = {
        "title":title__.value,
        "due_date":`${date.value} ${time.value}`,
        //"time_limit":'',
        'site':courseCode.value,
        'type':type.value,
        'self':true
      }
      console.log(assment)
    console.log(type.value)
    console.log(courseCode.value) 
    console.log(title__.value)
    
     
    if(title__.value.trim()==="" || courseCode.value.trim()==="" || date.value.trim()==="" || time.value.trim()===""){
        alert("Cannot add with empty field.")
    }else{
       // alert("adding")
         storeAssessmentIfExists(assment)
    }
    
   

});



  //