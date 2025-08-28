const outputDiv = document.getElementById('output');
const spinner = document.getElementById('spinner');
const toastEl = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

const toast = new bootstrap.Toast(toastEl);

function showToast(message, type) {
    toastEl.classList.remove('text-bg-success', 'text-bg-danger');
    toastEl.classList.add(`text-bg-${type}`);
    toastMessage.textContent = message;
    toast.show();
}


// function decleration by getting the  sample text file.
const getTextFIle = () => {
    fetch('sample.txt')
        .then((res) => res.text())
        .then((data) => outputDiv.innerHTML = data).catch((err) => console.log(err));
}

document.getElementById('getText').addEventListener('click', getTextFIle);


// function decleration by getting the  Json text file.

const getJSONFiles = () => {
    spinner.classList.remove('d-none');
    outputDiv.innerHTML = '';


    fetch('library.json')
        .then((res) => res.json())
        .then((data) => {
            spinner.classList.add('d-none');

            let output = `<h2 class="mb-4">Library Books</h2>`;
            data.forEach((elem) => {
                let { title, author, status: { own, reading, read } } = elem;
                output += `
                <ul class="list-group mb-4">
                    <li class="list-group-item"><strong>Title</strong>: ${title}</li>
                    <li class="list-group-item"><strong>Author</strong>: ${author}</li>
                    <li class="list-group-item"> <strong>Status</strong>: <oblique>Own: ${own}, Reading: ${reading} & Read: ${read}</oblique> </li>
                </ul>
                `
            });
            outputDiv.innerHTML = output;
            showToast(`Data fetched successfully!`, 'success');

        })
}

document.getElementById('getJSON').addEventListener('click', getJSONFiles);



// function decleration by getting the  Posts API DATA file.
const getAPIData = () => {
    spinner.classList.remove('d-none');
    outputDiv.innerHTML = '';

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then((data) => {
            spinner.classList.add('d-none');
            let output = `<h2>Posts</h2>`;
            data.forEach((elem) => {
                let { id, title, body } = elem;
                output += `
                <div class="card card-body mb-3">
                    <h2>${id}. ${title}</h2>
                    <p>${body}</p>
                </div>
                `
            });
            outputDiv.innerHTML = output;
            showToast(`Data fetched successfully!`, 'success');
        });

    return false;
}

document.getElementById('getPosts').addEventListener('click', getAPIData);


// By fetching the API data by making a POST request

const addPost = (e) => {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let body = document.getElementById('body').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ title: title, body: body })
    })
        .then((res) => res.json())
        .then((data) => console.log(data));
    showToast(`Data fetched successfully!`, 'success');

    return false;
}


document.getElementById('addPost').addEventListener('submit', addPost);
