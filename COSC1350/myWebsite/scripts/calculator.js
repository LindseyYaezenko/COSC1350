/*
Student Name: Lindsey Yaezenko
    File Name: calculator.js
    Date: 09/14/2024
    */
    function calculate(event) {
        // Prevent form from submitting and reloading the page
        event.preventDefault();
    
        // Bill Amount
        let billAmount = parseFloat(document.getElementById("billAmount").value);

        // Validation Check
    if (isNaN(billAmount) || billAmount <= 0) {
        document.getElementById("errorDisplay").innerHTML = "Bill cannot be $0.00";
        return; // Exit the function if validation fails
    } else {
        document.getElementById("errorDisplay").innerHTML = ""; 
    }
    
        // Drop Down Options for Tip %
        let selectedValue = document.getElementById("qualityOfService").value;
    
        // Convert Value
        let [serviceId, qualityOfService] = selectedValue.split('-');
        qualityOfService = parseFloat(qualityOfService); 
    
        //Tip Amount
        let tipAmount = billAmount * qualityOfService;
    
        // Bill+Tip
        let totalAmount = billAmount + tipAmount;
    
        //Display Totals
        document.getElementById("tipAmountDisplay").innerHTML = "$" + tipAmount.toFixed(2);
        document.getElementById("totalBillDisplay").innerHTML = "$" + totalAmount.toFixed(2);
    }
    
    
    
    
    


   

 

