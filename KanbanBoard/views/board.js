export default class RenderBoard {

    constructor(container) {
        this.boardContainer = document.querySelector(container);
    }

    render(columns) {
        this.boardContainer.innerHTML = '';
        let fragment = document.createDocumentFragment();
        columns.forEach(column => {
            let li = document.createElement('li');
            li.classList.add('drag-column');
            li.innerHTML = `
                <span class="header">
                    <h1>${column.title}</h1>
                </span>`;
            li.id = column.id;
            fragment.appendChild(li);
        });
        this.boardContainer.appendChild(fragment);

    }

}