alert("hhi")
console.log(4);
var createList = document.getElementById('create-list');
console.log(createList);
createList.addEventListener('click', () => {
	var title = document.getElementById('list-title');
	// console.log(title);
	title = title.value;
	// console.log(title);
	if (title != '') cbfun(title);
});

var cbfun = async value => {
	const res = await axios.post('http://localhost:3000/api/lists', {
		title: value,
	});
	// console.log(res);
};
