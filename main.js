
function reset() {
    document.getElementById('listContainer').innerHTML = '';
    localStorage.removeItem('htmlContent');
}


function searchBooks() {
    const searchBar = document.getElementById('searchBar');
    const search = searchBar.value;

    const searchItems = [];

    const addSearchItems = () => {
        const listItems = document.querySelectorAll('li');

        listItems.forEach(li => {
            const title = li.children[0].textContent;

            if (title.toLowerCase().includes(search.toLowerCase())) {
                searchItems.push(title);
            }
        });
    }

    addSearchItems();

    const displaySearchResults = () => {
        if (searchItems.length > 0) {
            const listContainer = document.getElementById('searchListContainer');

            listContainer.innerHTML = '';

            searchItems.forEach(title => {
                const li = document.createElement('li');

                li.classList.add('book');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';

                const label = document.createElement('label');
                label.htmlFor = title;

                const span = document.createElement('span');
                span.textContent = title;

                label.appendChild(checkbox);
                label.appendChild(span);

                li.appendChild(label);

                listContainer.appendChild(li);

                li.addEventListener('click', handleLiClick);

                checkbox.addEventListener('click', handleCheckboxClick);
            });

        }
        else {
            alert('No books found matching the search criteria.');
        }
    }

    displaySearchResults();
}


function handleLiClick(event) {

    
        const li = event.target;
        const checkbox = li.children[1];
        const checkBoxStatus = checkbox.checked;

        if (checkBoxStatus == true) {
            li.style.backgroundColor = 'white';
            checkbox.checked = false;
    
            localStorage.removeItem('htmlContent');
            localStorage.setItem('htmlContent', document.getElementById('listContainer').innerHTML);
        } else {
            li.style.backgroundColor = 'rgb(0, 255, 0)';
            checkbox.checked = true;
    
            localStorage.removeItem('htmlContent');
            localStorage.setItem('htmlContent', document.getElementById('listContainer').innerHTML);
        }
    }


function handleCheckboxClick(event) {
    const checkbox = event.target;
    const li = checkbox.parentElement;
    const checkBoxStatus = checkbox.checked;

    if (checkBoxStatus == true) {
        li.style.backgroundColor = 'rgb(0, 255, 0)';

        localStorage.clear('htmlContent');
        localStorage.setItem('htmlContent', document.getElementById('listContainer').innerHTML);
    }
    else {
        li.style.backgroundColor = 'white';

        localStorage.clear('htmlContent');
        localStorage.setItem('htmlContent', document.getElementById('listContainer').innerHTML);
    }
}


function loadBooks() {

    const tradeBooks =
        `Aqua Affinity
Bane of Arthropods
Blast Protection
Breach
Channeling
Curse of Binding
Curse of Vanishing
Density
Depth Strider
Efficiency
Feather Falling
Fire Aspect
Fire Protection
Flame
Fortune
Frost Walker
Impaling
Infinity
Knockback
Looting
Loyalty
Luck of the Sea
Lure
Mending
Multishot
Piercing
Power
Projectile Protection
Protection
Punch
Quick Charge
Respiration
Riptide
Sharpness
Silk Touch
Smite
Sweeping Edge
Thorns
Unbreaking`;

    const tradeBookArray = tradeBooks.split('\n');

    const tradeBookObject = tradeBookArray.forEach((book) => {
        const bookProperty = {
            name: book,
            checked: false
        };

        let li = document.createElement('li');

        let p = document.createElement('p');
        p.textContent = book;

        li.appendChild(p);

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');

        li.appendChild(checkbox);

        document.getElementById('listContainer').appendChild(li);

        checkbox.addEventListener('click', handleCheckboxClick);

        li.addEventListener('click', handleLiClick);
    });
}

const htmlContent = localStorage.getItem('htmlContent');

if (htmlContent) {
    document.getElementById('listContainer').innerHTML = htmlContent;

    const li = document.querySelectorAll('li');

    li.forEach((element) => {

        const checkbox = element.children[1];
        const li = element;
        if(li.style.backgroundColor == 'rgb(0, 255, 0)'){
            checkbox.checked = true;
        }
        else {
            checkbox.checked = false;
        }

        checkbox.onclick = () => {
            if (checkbox.checked) {
                li.style.backgroundColor = 'rgb(0, 255, 0)';

                localStorage.clear('htmlContent');
                localStorage.setItem('htmlContent', document.getElementById('listContainer').innerHTML);
            }
            else {
                li.style.backgroundColor = 'white';

                localStorage.clear('htmlContent');
                localStorage.setItem('htmlContent', document.getElementById('listContainer').innerHTML);
            }
        }

        li.addEventListener('click', handleLiClick);
    });

}
else {
    loadBooks();
}