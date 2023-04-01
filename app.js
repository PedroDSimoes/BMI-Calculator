function calculateBMIMetric() {
    const weight = document.getElementById("weight").value;
    const height = document.getElementById("height").value / 100; 
    const bmi = weight / (height * height);
    document.getElementById("result").innerHTML = "Your Body Mass Index is: " + bmi.toFixed(2); //metric calculation and display

    createBarChart([20, 80, 120, 150], bmi);        //barChart

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        document.getElementById("result").innerHTML = "Invalid input. Please enter positive numbers."; //error handling
        return;
      }
    
    const message = document.getElementById("message");         //message display
      if (bmi < 18.5) {
          message.innerHTML = "You are underweight.";
      } else if (bmi < 25) {
          message.innerHTML = "You are at a healthy weight.";
      } else if (bmi < 30) {
          message.innerHTML = "You are overweight.";
      } else {
          message.innerHTML = "You are obese.";
      }  

  }

  function calculateBMIImperial() {

    if (document.getElementById("height-inches").value === '') {
        document.getElementById("height-inches").value = 0;
      }

    const weight = document.getElementById("weightpounds").value;
    const heightFeet = document.getElementById("height-feet").value;
    const heightInches = document.getElementById("height-inches").value;
    const height = (heightFeet * 12 + parseInt(heightInches)) * 0.0254;
    const bmi = (weight * 0.453592) / (height * height);
    document.getElementById("result").innerHTML = "Your Body Mass Index is: " + bmi.toFixed(2); //imperial calculation and display

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        document.getElementById("result").innerHTML = "Invalid input. Please enter positive numbers.";      //error handling
        return;
      }

      createBarChart([50, 80, 120, 90], bmi);       //barChart

      const message = document.getElementById("message");       //message display
      if (bmi < 18.5) {
          message.innerHTML = "You are underweight.";
      } else if (bmi < 25) {
          message.innerHTML = "You are at a healthy weight.";
      } else if (bmi < 30) {
          message.innerHTML = "You are overweight.";
      } else {
          message.innerHTML = "You are obese.";
      }    
}

function createBarChart(data, bmi) {
    const canvas = document.getElementById("chart");
    const ctx = canvas.getContext("2d");

    // Clear the canvas before drawing the new chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = 40;
    const spacing = 20;
    const maxValue = Math.max(...data, bmi);

    // Define the weight categories and their corresponding colors
    const categories = [
        { name: "Severely Underweight", color: "#FF3E3E" },
        { name: "Underweight", color: "#FF6F3E" },
        { name: "Normal", color: "#3EFF3E" },
        { name: "Overweight", color: "#FFD83E" },
        { name: "Obese", color: "#FF8E3E" },
        { name: "Morbidly Obese", color: "#FF3E7E" },
    ];

    // Divide the canvas height into equal sections for each weight category
    const sectionHeight = canvas.height / (categories.length - 1);

    // Label each section with the corresponding weight category
    categories.forEach((category, index) => {
        const y = canvas.height - index * sectionHeight;
        ctx.fillStyle = category.color;
        ctx.fillRect(50, y - sectionHeight, 30, sectionHeight);
        ctx.fillStyle = "#000000";
        ctx.font = "14px Arial";
        ctx.fillText(category.name, 100, y - sectionHeight / 2);
    });

    // Add a red line to indicate the user's BMI value
    ctx.beginPath();
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 1;
    let bmiCategory = "";
    if (bmi < 16) {
        bmiCategory = "Severely Underweight";
    } else if (bmi < 18.5) {
        bmiCategory = "Underweight";
    } else if (bmi < 25) {
        bmiCategory = "Normal";
    } else if (bmi < 30) {
        bmiCategory = "Overweight";
    } else if (bmi < 40) {
        bmiCategory = "Obese";
    } else {
        bmiCategory = "Morbidly Obese";
    }
    const bmiPosition = (canvas.height - sectionHeight) * (1 - (bmi - 13) / (36 - 16)) + sectionHeight / 2; 
    ctx.moveTo(50, bmiPosition);
    ctx.lineTo(canvas.width * 0.3, bmiPosition);    //calculate the position of the line on the chart
    ctx.stroke();
}