
const maindiv = document.querySelector('.addedNotes');
// Getting Add button
const addbtn = document.getElementById('add') ;

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){
    notes.forEach(note => {
        addNewNotes(note)
    })
}

addbtn.addEventListener('click', () => {
    addNewNotes();
})

function addNewNotes(text = '') {
    const note = document.createElement('div');
    note.classList.add('note');

    note.innerHTML = `
    <div class="container notes">

        <header class="tools">
            <button class="editbtn"><i class="fas fa-edit"></i></button>
            <button class="deletebtn"><i class="fas fa-trash"></i></button>
        </header>
        <div class="main-conatiner ${text ? '' : 'hidden'}">

        </div>
        <textarea id="textArea" class="${text ? 'hidden' : ''}"></textarea>

    </div>
    `


    const editbtn = note.querySelector('.editbtn');
    const deletebtn = note.querySelector('.deletebtn');

    const main = note.querySelector('.main-conatiner');
    const textArea = note.querySelector('#textArea');

    textArea.value = text;

    main.innerHTML = marked(text);

    editbtn.addEventListener('click',() => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);

        updateLocalStorage();

    })

    deletebtn.addEventListener('click', () => {
        note.remove();
        updateLocalStorage();
    })

    maindiv.appendChild(note);

}

function updateLocalStorage(){

    const notesText = document.querySelectorAll('textarea');

    const notes = [];

    notesText.forEach(note => {
        notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}
