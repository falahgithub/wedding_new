const socket = io();
const header = {
    "Authorization": "Basic VGVhbS1HcmVlbi1DYXJkOnRlYU0tZ3JlZU4tY2FyRA=="
}

socket.on("connect", ()=>{
    console.log("I am connected")
}) 

function updation() {
    let url = 'https://api.sheety.co/c5eec0a10c42539c48b9e5b67ec1c290/weddingSheet1/sheet1';
fetch(url,{ headers: header})
.then((response) => response.json())
.then(json => {
  // Do something with the data
//   console.log(json.sheet1S)
data = json["sheet1"];
data.forEach(row => {
    const line =  row["comments"];
    const node = document.createElement("div");
        node.innerText = (line);
        // node.classList.add("wish-one");
        node.classList.add("comment-container");

        const ele = document.getElementById("wishes");
        ele.appendChild(node);
    
});
});
}
updation();



// socket.on("wishes_to_print", (line) => {
//     console.log(line);
    
//     const node = document.createElement("div");
//         node.innerText = (line);
//         // node.classList.add("wish-one");
//         node.classList.add("comment-container");

//         const ele = document.getElementById("wishes");
//         ele.appendChild(node);

// })  
   


// updation();


document.addEventListener("DOMContentLoaded", () => {  


    // First Function
    btn = document.getElementById("button-addon2")
    btn.addEventListener("click", ()=> {
        var val = document.getElementById("input");
        var name = document.getElementById("wisher");
        const wish = val.value +" -- " + name.value;   

        console.log(wish);
        // ///////////////////////////
        // socket.emit("wish", wish);

        let url = 'https://api.sheety.co/c5eec0a10c42539c48b9e5b67ec1c290/weddingSheet1/sheet1';
        let body = {
                sheet1: {
                 "comments": wish
                }
            }
        fetch(url, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(body)
            })
            .then((response) => response.json())
            .then(json => {
                // Do something with object
                console.log("Done");
            });



        /////////////////////////////////
        val.value = ""
        name.value = ""
        // location.reload()
        // function update() {
        //     location.reload()
        // };
        // setTimeout(update, 1000);

    })


    // Second function

    document.getElementById('writeToFile').addEventListener('click', function () {
        // Get the input value
        var inputValue = document.getElementById('numberInput');
        // socket.emit("number", inputValue.value)

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