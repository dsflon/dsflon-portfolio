const BodyAdd = {
    Id: (id) => {
        document.body.id = id;
    },
    Class: (className) => {
        document.body.className = "fw";
        document.body.classList.add(className);
    }
}

export default BodyAdd;
