// IDs - buttons
let idBtn = document.getElementById("idBtn");
let firstBtn = document.getElementById("firstBtn");
let lastBtn = document.getElementById("lastBtn");
let heightBtn = document.getElementById("heightBtn");
let ageBtn = document.getElementById("ageBtn");
let idIcon = document.getElementById("idIcon");
let firstIcon = document.getElementById("firstIcon");
let lastIcon = document.getElementById("lastIcon");
let heightIcon = document.getElementById("heightIcon");
let ageIcon = document.getElementById("ageIcon");
// Divs for Creating Elements
let idDiv = document.getElementById("idDiv");
let firstNameDiv = document.getElementById("firstNameDiv");
let lastNameDiv = document.getElementById("lastNameDiv");
let emailDiv = document.getElementById("emailDiv");
let heightDiv = document.getElementById("heightDiv");
let ageDiv = document.getElementById("ageDiv");
// Pagination Buttons
let show10 = document.getElementById("show10");
let show20 = document.getElementById("show20");
let show30 = document.getElementById("show30");
let show40 = document.getElementById("show40");
let show50 = document.getElementById("show50");
// Previous & Next Buttons
let previousBtn = document.getElementById("previousBtn");
let nextBtn = document.getElementById("nextBtn");
// JavaScript Variable
let fieldDiv = [idDiv, firstNameDiv, lastNameDiv, emailDiv, heightDiv, ageDiv];
let limitShown = 10;
let sortType = "idBtn";
let ascendingOrder = true;
let startInc = 0;
let newPeopleList;

// Fetch Data Function
const getData = async () => {
    const promise = await fetch("../data/data.json");
    const data = await promise.json();
    const peopleList = data.People;
    return peopleList;
};

//Sort Functions
const SortId = async (ascending) => {
    if (ascending === true) {
        let peopleList = await getData();
        const sortedArr = peopleList.sort((a, b) => {
            a = a.Id;
            b = b.Id;
            return a - b;
        });
        return sortedArr;
    } else {
        let peopleList = await getData();
        const sortedArr = peopleList.sort((a, b) => {
            a = a.Id;
            b = b.Id;
            return b - a;
        });
        return sortedArr;
    }
};

const SortFirstName = async (ascending) => {
    if (ascending) {
        let peopleList = await getData();
        const sortedArr = peopleList.sort((a, b) => {
            a = a.FirstName;
            b = b.FirstName;
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            if (a === b) {
                return 0;
            }
        });
        return sortedArr;
    } else {
        let peopleList = await getData();
        const sortedArr = peopleList.sort((a, b) => {
            a = a.FirstName;
            b = b.FirstName;
            if (a > b) {
                return -1;
            }
            if (a < b) {
                return 1;
            }
            if (a === b) {
                return 0;
            }
        });
        return sortedArr;
    }
};

const SortLastName = async (ascending) => {
    if (ascending) {
        let peopleList = await getData();
        const sortedArr = peopleList.sort((a, b) => {
            a = a.LastName;
            b = b.LastName;
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            if (a === b) {
                return 0;
            }
        });
        return sortedArr;
    } else {
        let peopleList = await getData();
        const sortedArr = peopleList.sort((a, b) => {
            a = a.LastName;
            b = b.LastName;
            if (a > b) {
                return -1;
            }
            if (a < b) {
                return 1;
            }
            if (a === b) {
                return 0;
            }
        });
        return sortedArr;
    }
};

const SortHeight = async (ascending) => {
    if (ascending === true) {
        let peopleList = await getData();
        const sortedArr = peopleList.sort((a, b) => {
            a = a.Height.substr(0, 2);
            b = b.Height.substr(0, 2);
            return a - b;
        });
        return sortedArr;
    } else {
        let peopleList = await getData();
        const sortedArr = peopleList.sort((a, b) => {
            a = a.Height.substr(0, 2);
            b = b.Height.substr(0, 2);
            return b - a;
        });
        return sortedArr;
    }
};

const SortAge = async (ascending) => {
    if (ascending === true) {
        let peopleList = await getData();
        const sortedArr = peopleList.sort((a, b) => {
            a = a.Age;
            b = b.Age;
            return a - b;
        });
        return sortedArr;
    } else {
        let peopleList = await getData();
        const sortedArr = peopleList.sort((a, b) => {
            a = a.Age;
            b = b.Age;
            return b - a;
        });
        return sortedArr;
    }
};

// Create Elements
function createPeople(person) {
    const properties = ['Id', 'FirstName', 'LastName', 'Email', 'Height', 'Age'];
    const pTagArr = [];

    for (const prop of properties) {
        let p = document.createElement('p');
        p.textContent = person[prop];
        pTagArr.push(p);
    }

    fieldDiv.forEach((field, index) => {
        field.append(pTagArr[index]);
    });
}

// Populate Page Function
async function populate(sortType) {
    // this fetches our data and stores it into variable
    // let newPeopleList;

    // apply sort type
    switch (sortType) {
        case "idBtn":
            newPeopleList = await SortId(ascendingOrder);
            break;
        case "firstBtn":
            newPeopleList = await SortFirstName(ascendingOrder);
            break;
        case "lastBtn":
            newPeopleList = await SortLastName(ascendingOrder);
            break;
        case "heightBtn":
            newPeopleList = await SortHeight(ascendingOrder);
            break;
        case "ageBtn":
            newPeopleList = await SortAge(ascendingOrder);
            break;
        default:
            newPeopleList = await SortId(ascendingOrder);
            break;
    }

    // clears div so the array displayed will not constantly repeat    
    fieldDiv.forEach(field => { field.textContent = ""; });

    // map through each element in our array
    // newPeopleList.map((person, index) => {
    //     if (index < limitShown) {
    //         createPeople(person);
    //     }
    // });
    newPeopleList.slice(startInc, startInc + limitShown).map(person => {
        createPeople(person);
    });
}

// Onload
window.addEventListener('load', function () {
    populate(sortType);
});

// Sort Button AddEventListeners
idBtn.addEventListener('click', () => {
    startInc = 0;
    firstIcon.src = './assets/faUnsorted.png';
    lastIcon.src = './assets/faUnsorted.png';
    heightIcon.src = './assets/faUnsorted.png';
    ageIcon.src = './assets/faUnsorted.png';

    if (sortType === "idBtn" && ascendingOrder === true) {
        idIcon.src = './assets/faSortNumericUpAlt.png';
        ascendingOrder = false;
        populate(sortType);
    } else if (sortType === "idBtn" && ascendingOrder === false) {
        idIcon.src = './assets/faSortNumericAsc.png';
        ascendingOrder = true;
        populate(sortType);
    } else {
        ascendingOrder = true;
        idIcon.src = './assets/faSortNumericAsc.png';
        sortType = "idBtn";
        populate(sortType);
    }
});

firstBtn.addEventListener('click', () => {
    startInc = 0;
    idIcon.src = './assets/faUnsorted.png';
    lastIcon.src = './assets/faUnsorted.png';
    heightIcon.src = './assets/faUnsorted.png';
    ageIcon.src = './assets/faUnsorted.png';

    if (sortType === "firstBtn" && ascendingOrder === true) {
        firstIcon.src = './assets/faSortAlphaUpAlt.png';
        ascendingOrder = false;
        populate(sortType);
    } else if (sortType === "firstBtn" && ascendingOrder === false) {
        firstIcon.src = './assets/faSortAlphaAsc.png';
        ascendingOrder = true;
        populate(sortType);
    } else {
        ascendingOrder = true;
        firstIcon.src = './assets/faSortAlphaAsc.png';
        sortType = "firstBtn";
        populate(sortType);
    }
});

lastBtn.addEventListener('click', () => {
    startInc = 0;
    idIcon.src = './assets/faUnsorted.png';
    firstIcon.src = './assets/faUnsorted.png';
    heightIcon.src = './assets/faUnsorted.png';
    ageIcon.src = './assets/faUnsorted.png';

    if (sortType === "lastBtn" && ascendingOrder === true) {
        lastIcon.src = './assets/faSortAlphaUpAlt.png';
        ascendingOrder = false;
        populate(sortType);
    } else if (sortType === "lastBtn" && ascendingOrder === false) {
        lastIcon.src = './assets/faSortAlphaAsc.png';
        ascendingOrder = true;
        populate(sortType);
    } else {
        ascendingOrder = true;
        lastIcon.src = './assets/faSortAlphaAsc.png';
        sortType = "lastBtn";
        populate(sortType);
    }
});

heightBtn.addEventListener('click', () => {
    startInc = 0;
    idIcon.src = './assets/faUnsorted.png';
    firstIcon.src = './assets/faUnsorted.png';
    lastIcon.src = './assets/faUnsorted.png';
    ageIcon.src = './assets/faUnsorted.png';

    if (sortType === "heightBtn" && ascendingOrder === true) {
        heightIcon.src = './assets/faSortNumericUpAlt.png';
        ascendingOrder = false;
        populate(sortType);
    } else if (sortType === "heightBtn" && ascendingOrder === false) {
        heightIcon.src = './assets/faSortNumericAsc.png';
        ascendingOrder = true;
        populate(sortType);
    } else {
        ascendingOrder = true;
        heightIcon.src = './assets/faSortNumericAsc.png';
        sortType = "heightBtn";
        populate(sortType);
    }
});

ageBtn.addEventListener('click', () => {
    startInc = 0;
    idIcon.src = './assets/faUnsorted.png';
    firstIcon.src = './assets/faUnsorted.png';
    lastIcon.src = './assets/faUnsorted.png';
    heightIcon.src = './assets/faUnsorted.png';

    if (sortType === "ageBtn" && ascendingOrder === true) {
        ageIcon.src = './assets/faSortNumericUpAlt.png';
        ascendingOrder = false;
        populate(sortType);
    } else if (sortType === "ageBtn" && ascendingOrder === false) {
        ageIcon.src = './assets/faSortNumericAsc.png';
        ascendingOrder = true;
        populate(sortType);
    } else {
        ascendingOrder = true;
        ageIcon.src = './assets/faSortNumericAsc.png';
        sortType = "ageBtn";
        populate(sortType);
    }
});

// Pagination AddEventListeners
show10.addEventListener('click', () => { showBtnClick(10) });
show20.addEventListener('click', () => { showBtnClick(20) });
show30.addEventListener('click', () => { showBtnClick(30) });
show40.addEventListener('click', () => { showBtnClick(40) });
show50.addEventListener('click', () => { showBtnClick(50) });

function showBtnClick(limit) {
    limitShown = limit;
    populate(sortType);
}

// Previous & Next AddEventListeners
nextBtn.addEventListener('click', () => {
    startInc += limitShown;
    if (startInc >= newPeopleList.length) {
        startInc = 0;
    }
    populate(sortType);
});

previousBtn.addEventListener('click', () => {
    startInc -= limitShown;
    if (startInc < 0) {
        startInc = newPeopleList.length - limitShown;
    }
    populate(sortType);
});