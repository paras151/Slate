console.log(5)
var boards = document.getElementsByClassName("card");

for(var i=0;i<boards.length;i++){
    boards[i].addEventListener("click",e=>{
			console.log("kkkkkk")
        var id = e.target.dataset.planId;
console.log(id)
        f(id);
    })
}

var f = async (id)=>{
    try {
        const res = await axios.get(`http://localhost:3000/api/plans/${id}`);
        window.location = `http://localhost:3000/plan/${id}`;

        window.open(`http://localhost:3000/plan/${id}`);
        console.log("kdscmk");
        console.log(res)
       
    } catch (err) {
        console.log(err);
    }
}

var createBoard = document.getElementById("create-board");
createBoard.addEventListener('click',()=>{
    var title = document.getElementById("board-title");
    console.log(title)
    title=title.value;
    console.log(title)
    if(title!="")
    cbfun(title);
    setTimeout(()=>{
        location.reload();
        location.reload();

    },2000);

})

var cbfun = async (value)=>{
    const res = await axios.post('http://localhost:3000/api/plans',{
        title:value
    });
    console.log(res)

}