
//document.querySelector('#backBtn').addEventListener("click", function(){ alert("Hello World!"); });
var donate = document.getElementById('donateBtn').addEventListener("click", function(){ 
    window.open("https://www.paypal.com/donate/?hosted_button_id=6K6EHGYEX9A8Y");
    //window.location.href =  "https://www.paypal.com/donate/?hosted_button_id=6K6EHGYEX9A8Y";
 });
console.log(donate)
console.log(document.querySelector('#donateBtn'))
console.log(document.getElementsByTagName('a')[1])
// //sk_test_f40a8719d13a446d01bf2204de833910504ef0eb
function payWithPaystack(){
    var handler = PaystackPop.setup({
        key: "pk_test_8b12d2e8a9fed236f4003e4c95f1282e8c08caae",
        email:'customer@email.com',
        amaount:25,
        metadata:{
            custom_fields:[
                {
                    display_name:"Mobile Number",
                    variable_name:"mobile_number",
                    value:"+27679240455"
                }
            ]
        },
        callback:function(response){
            alert('sucess.trans re is '+response);
        },
        onClose:function(){
            alert("Transaction cancelled")
        }

    });
    handler.openIframe();
}