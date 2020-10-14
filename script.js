function getHistory(){
    return document.getElementById("history-value").innerText;
}
function printHistory(num){
    document.getElementById("history-value").innerText =num;
}
function getOutput(){
    return document.getElementById("output-value").innerText ;
}
function printOutput(num){
    if(num == ""){   //for empty 
        document.getElementById("output-value").innerText =num;  
    }
    else{
        document.getElementById("output-value").innerText =getFormattedNumber(num);
    }  
}
//fucntion for reading number with commas 
function getFormattedNumber(num){
    if (num == "-"){        //for negative number like 9-12 =-3 then backspace is pressed it gives NaN value
        return "" ;
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}
// function to remove commas 
function reverseNumberFormat(num){
    return Number(num.replace(/,/g,''));
}

var operator = document.getElementsByClassName("operator");
for(var i=0;i<operator.length;i++){
    operator[i].addEventListener('click',function(){
        if(this.id=="clear"){
            printHistory("");
            printOutput("");
        }
        else if (this.id=="backspace"){
            var output=  reverseNumberFormat(getOutput()).toString();
            if(output){
                output=output.substr(0,output.length-1);
                printOutput(output);
            }
        }
        else {  //operator will not work if output is empty
            var output=getOutput();
            var history=getHistory();
            if(output=="" && history!=""){      //for 9*2* then we press + then last * cant convert into +
                //if last character is an operator then remove it by using substring fucntion
                if(isNaN(history[history.length-1]))
                {
                    history=history.substr(0,history.length-1);
                }
            }
            if(output!= "" || history!=""){
                //if both output and history are empty then it would be converted into empty
                output = output =="" ? output:reverseNumberFormat(output);
                //operator is clicked then output is added to history
                history=history+output;
                //if user clicks = then history is evaluated
                if(this.id=="=")
                {
                    var result= eval(history);      // result evaluation by eval()
                    printOutput(result);            // result displayed in panel
                    printHistory("");               // and history panel is left blank
                }
                else{   // for rest of operators 
                    history=history+this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }        
    });
}
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ //if output is a number
			output=output+this.id;
			printOutput(output);
		}
	});
}