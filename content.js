

function storeAssessmentIfExists(assessment){
       
      chrome.storage.sync.get(['Assessments'], function(result) {
          var assessmentsHolder = result.Assessments;
          console.log(assessmentsHolder)
          if (assessmentsHolder.filter(e => e.title === assessment.title).length > 0) {
                //the assessment does exists
                //we do not store the assignment

                console.log(`${assessment.title} - exists!`)

          }else{
            //the assessment does not exist in storage
            //so we will add the assessment in storage
                console.log( `${assessment.title} - does not exist :)`)


                assessmentsHolder.push(assessment)
                chrome.storage.sync.set({Assessments: assessmentsHolder}, function() {
                  console.log(`${assessment.title} is now stored... :)`)
            });

          }

          
      });
       
}

 


function initalizeAssessments(){
      chrome.storage.sync.set({Assessments: []}, function() {
          console.log("Initialized My Assessments Storage List ")
    });

    chrome.storage.sync.set({AssessmentsTitles: []}, function() {
      console.log("Initialized My AssessmentTitles Storage List ")
});
}



chrome.storage.sync.get(['Assessments'], function(result) {
  console.log(result.Assessments);

      if(result.Assessments===undefined){
        initalizeAssessments();   
    }
    //initalizeAssessments(); 
});


 



 

var STUDENT_NUMBER = '';

 
const assessmentIsLate = function(str){
 
  if(str.includes('late')){
    return true;
  }

  if(str === 'n/a'){
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


function main(){

  

 
      var SITES = []
      
    

      const ul_html = document.querySelector('#topnav');
      const listItems = ul_html.getElementsByTagName('li');
       
      //getting student number

      var student_no = document.getElementsByClassName('Mrphs-userNav__submenuitem--displayid')[0].innerHTML
      student_no = student_no.split('                                            ')
      student_no = student_no[1].substring(0, 9)
      STUDENT_NUMBER = student_no;
      localStorage.setItem('STUDENT_NUMBER',student_no)


      chrome.storage.sync.set({STUDENT_NUMBER:student_no}, function() {
        console.log(`Student Number Set...:) :${student_no}`)
  });

      console.log(`Student Number from Storage : ${localStorage.getItem('STUDENT_NUMBER')}`)
      chrome.runtime.sendMessage({stu:localStorage.getItem('STUDENT_NUMBER'),command:'details'});
 
      console.log(`Student Number : ${student_no}`)
      for (let i = 0; i <= listItems.length - 1; i++) {
          var title = listItems[i].getElementsByClassName("link-container")[0].title;
          var href_link = listItems[i].getElementsByClassName("link-container")[0].href
          
          SITES.push(title.split(",")[0]);
          
          try{
                //getting the html document of the assignments tab of a site
              getAssignments(href_link,SITES[i],title.split(",")[1]);
          }catch(error){
              console.log(  `${SITES[i]} - Does not have Assignments Tab`)
          }

          try{
            //getting the html document of the tests and quizes tab of a site
              getTestsQuizes(href_link,SITES[i]);
          }catch(error){
              console.log(  `${SITES[i]} - Does not have Tests and Quizes Tab`)
         }

          

               
      }     
}

main();
 
//collecting the tests of A site....
function collectingEachTest(tr_array_html,site){
  var ee = []
  for(var x=0;x<tr_array_html.length;x++){

    var test = {
      "title":'',
      "due_date":'',
      "time_limit":'',
      'site':site,
      'type':"Test"
    }

    //first element is just titles of columns
    if(x===0){continue}
    console.log(tr_array_html[x])
    var title =  tr_array_html[x].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerHTML
    console.log(title)
    var time_limit = tr_array_html[x].getElementsByClassName('currentSort')[0].innerHTML
    console.log(time_limit)

    var due_date = tr_array_html[x].getElementsByTagName('td')[2].innerHTML
    console.log(`Due date of test : ${title} is ${due_date}`)
    var month = due_date.split(',')[0].split(' ')[0]
    var day = due_date.split(',')[0].split(' ')[1]

    //if the test was due in the past we move on to the next assignment in the site
    if(dateInPast(new Date(due_date))){
      continue;
    }
    //if the test was due in the past we move on to the next assignment in the site (its late...)
    if(assessmentIsLate(due_date)){
      continue;
    }

    test.title = title;
    test.due_date = due_date;
    test.time_limit = time_limit;
     
    console.log(test)
    //ll.insertFirst( test);

    //sending the test we got to the firebase.js (background file for extension)
    //i tried collecting all tests and putting them in an array then sending all of them
    //but js kept messing with the array
    storeAssessmentIfExists(test)
    
    //chrome.runtime.sendMessage({student_number:localStorage.getItem('STUDENT_NUMBER'),data: test,command:'post'});
    
  } 
                   
}

//the idea here is to get the tests and quizes html document 
function printTestAndQuizes(site_assignment_url,site){
  (async () => {
    
    const response = await fetch(site_assignment_url);
    const template = await response.text(); 
    htmlObject = document.createElement('div');
    htmlObject.innerHTML = template;   

     var tbody = htmlObject.getElementsByTagName('table')//.getElementById('selectIndexForm:selectTable')
    
    // console.log(tbody[0])
    // console.log(tbody[0].id)
        try{

                if(tbody[0].id==='selectIndexForm:selectTable'){
                  //im getting the up coming tests and quizes now
                  //checking if tests and quizes are up coming
                  //console.log('yes')
                  var tests = tbody[0].getElementsByTagName('tr')
                  //console.log(tests)
          
                  collectingEachTest(tests,site)
              }

        }catch(err){
                //console.log('id undefined!')
        }
   
     
  })();  
}

//here the collection of tests and quizes of a site start...
function getTestsQuizes(href,site){
  (async () => {
    var x = "https://vula.uct.ac.za/portal/site/5002dbe3-736f-451d-a464-8b3d882f794c/page/88a06424-8259-4d96-9824-41e50b774d1a?sakai.state.reset=true"
    
    //link from var a is a site with no assignmens tab
    var a = "https://vula.uct.ac.za/portal/site/59057b18-1518-4d5c-849a-c9da6387cfbb"
    const response = await fetch(href);
    const template = await response.text();
   
    htmlObject = document.createElement('div');
    htmlObject.innerHTML = template;   
     
    
    var nav_ = htmlObject.querySelector("#toolMenu")
    var listItems = nav_.getElementsByTagName('ul')[0].getElementsByTagName('li')
    
    for (let i = 0; i <= listItems.length - 1; i++) {
      //this is the <a html object that contains the link to the tab and title
      //e,g. Title = Assignments - XXX , tab is the assignments tab
      var item_title = listItems[i].getElementsByTagName('a')
       
      try{

              if(item_title[0].title==="Tests & Quizzes - For creating and taking online assessments"){
                // console.log("found Tests & Quizzes - For creating and taking online assessments...")
                // console.log('---------------printing the link of Tests & Quizzes - For creating and taking online assessments tab--link opens assingments html --------------------')
                // console.log(item_title[0].href)
                //print all assignments 
                printTestAndQuizes(item_title[0].href,site)
                break;
            }

      }catch(err){
              //console.log('title undefined!')
      }
       
    }
 
  })();
}
  
function getAssignments(url,site,year){
    
      var htmlObject;
      (async () => {
        var x = "https://vula.uct.ac.za/portal/site/5002dbe3-736f-451d-a464-8b3d882f794c/page/88a06424-8259-4d96-9824-41e50b774d1a?sakai.state.reset=true"
        
        //link from var a is a site with no assignmens tab
        var a = "https://vula.uct.ac.za/portal/site/59057b18-1518-4d5c-849a-c9da6387cfbb"
        const response = await fetch(url);
        const template = await response.text();
      
        htmlObject = document.createElement('div');
        htmlObject.innerHTML = template;    
        
        var nav_ = htmlObject.querySelector("#toolMenu")
        var listItems = nav_.getElementsByTagName('ul')[0].getElementsByTagName('li')
        
        for (let i = 0; i <= listItems.length - 1; i++) {
          //this is the <a html object that contains the link to the tab and title
          //e,g. Title = Assignments - XXX , tab is the assignments tab
          var item_title = listItems[i].getElementsByTagName('a')[0] 
          //console.log(  `site : ${site} ...item : ${item_title}`)
          try{
                if(item_title.title.split(' - ')[0]==="Assignments"){
                  // console.log("found assignments...")
                  // console.log('---------------printing the link of assignments tab--link opens assingments html --------------------')
                  // console.log(item_title.href)
                  //print all assignments 
                  collectingEachAssignment(item_title.href,site,year)
                 }
          }catch(err){
                //console.log('title is undefined!')
          }
           
        }
        
 
      })();

      
}

//collecting the assignments of A site....
function collectingEachAssignment(site_assignment_url,site,year){
        (async () => {
          
          const response = await fetch(site_assignment_url);
          const template = await response.text();
        
          htmlObject = document.createElement('div');
          htmlObject.innerHTML = template;   

          var tbody = htmlObject.getElementsByTagName('tbody')[0]
           
          var assignments_ = tbody.getElementsByTagName('tr')
          
          var __assignObjects = [] 
          //looping thru every assignment...
          for(x=0;x<assignments_.length;x++){
                  var AssignmentObject = {
                      "title":"",
                      "status":"",
                      "openDate":'',
                      "type":"Assignment",
                      "dueDate":'',
                      "site":site.toString(),
                  }

                  if(x==0){
                      continue
                  }
                 // console.log(assignments_[x])

                  var tds_ = assignments_[x].getElementsByTagName('td')
                  //going thruu every td to get title, status, openDate, dueDate
                  //console.log(tds_[0].headers)
                  
                  for(j=0;j<tds_.length;j++){
                        if(tds_[j].headers==='attachments'){
                            //  console.log("attachments")
                        }
                        if(tds_[j].headers==='title'){
                          
                          var title_name = await tds_[j].getElementsByTagName('strong')[0].getElementsByTagName('a')[0]
                          AssignmentObject.title = await title_name.innerHTML;
                          console.log( `title: ${title_name.innerHTML} here baby....` )
                         // console.log(AssignmentObject.title)
                        }
                        if(tds_[j].headers==='status'){
                          var status = await tds_[j].getElementsByTagName('span')[0]
                          AssignmentObject.status = await status.innerHTML;
                         // console.log(AssignmentObject.status)
                        }
                        if(tds_[j].headers==='openDate'){
                        
                          AssignmentObject.openDate = await tds_[j].innerHTML.trim();
                          //console.log(AssignmentObject.openDate)
                        } 
                        if(tds_[j].headers==='dueDate'){
                          var dueDate = await tds_[j].getElementsByTagName('span')[0]
                          // console.log( `TItle in Due: ${AssignmentObject.title} in duw....` )
                          // console.log(dueDate)
                          // console.log( `DUE Date : ${dueDate.innerHTML} sexyy....` )
                          AssignmentObject.dueDate = await dueDate.innerHTML;

                          // try {
                            
                          // }catch(err){
                          //     console.log(`Inner HTML for Due Date of ${AssignmentObject.title}...is undefined`)
                          // }
                          
                          
                          //console.log(AssignmentObject.dueDate)
                        }
                  }

                  if(dateInPast(new Date(AssignmentObject.dueDate))){
                    continue;
                  }

                  if(assessmentIsLate(AssignmentObject.dueDate)){
                    continue;
                  }

                  var month = AssignmentObject.dueDate .split(',')[0].split(' ')[1]
                  var day = AssignmentObject.dueDate .split(',')[0].split(' ')[0] 

                  console.log(AssignmentObject) 
                  var month = AssignmentObject.dueDate.split(',')[0].split(' ')[0]
                                                  
                                          
                                                  var day = AssignmentObject.dueDate.split(',')[0].split(' ')[1]
                                                  
                                                  console.log(`${day} ${month} : ${AssignmentObject.site}`)
                  
                   //ll.insertFirst(AssignmentObject);
                   //ll.printListData()

                  storeAssessmentIfExists(AssignmentObject)

                 // chrome.runtime.sendMessage({student_number:localStorage.getItem('STUDENT_NUMBER'),data: AssignmentObject,command:'post'});
                  
                  
                  
          }

          
           
        })();  
      }
    
 