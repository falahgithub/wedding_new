const socket = io();

socket.on("connect", ()=>{
    console.log("I am connected")
}) 


socket.on("wishes_to_print", (line) => {
    console.log(line);
    
    const node = document.createElement("div");
        node.innerText = (line);
        // node.classList.add("wish-one");
        node.classList.add("comment-container");

        const ele = document.getElementById("wishes");
        ele.appendChild(node);

})  
   


// updation();


document.addEventListener("DOMContentLoaded", () => {  


    // First Function
    btn = document.getElementById("button-addon2")
    btn.addEventListener("click", ()=> {
        var val = document.getElementById("input");
        var name = document.getElementById("wisher");
        const wish = val.value +" -- " + name.value;   

        console.log(wish);
        socket.emit("wish", wish);

        
        val.value = ""
        name.value = ""
        function update() {
            location.reload()
        };
        setTimeout(update, 1000);

    })


    // Second function

    document.getElementById('writeToFile').addEventListener('click', function () {
        // Get the input value
        var inputValue = document.getElementById('numberInput');
        socket.emit("number", inputValue.value)

        document.getElementById("numbers-group").style.display = "none";


        const node = document.createElement("div");
        // node.style.classList.add("card-title")
        node.innerText = "Thank You! With us you will never miss a happy event. Yay!"
        // node.classList.add("wish-one")
        node.style.color = "green";
        node.style.fontFamily = "Merriweather Sans', sans-serif;";
        node.style.fontSize = "18px"

        // node.style.classList.add("thankyou")
        const ele = document.getElementById("thanks")
        ele.appendChild(node)

        inputValue.value = ""
    });


})