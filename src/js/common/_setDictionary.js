const SetDictionary = (array) => {

    let obl = {}

    for (var i = 0; i < array.length; i++) {

        let lists = array[i].list;

        for (var j = 0; j < lists.length; j++) {
            obl[lists[j].id] = lists[j]
        }

    }

    return obl

}

export default SetDictionary;
