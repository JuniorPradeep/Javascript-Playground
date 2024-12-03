const app = document.getElementById('replayContainer');
class CommentApp {
    constructor() {
        this.db = [{ id: 1, text: "this is the first game", parentId: null }]
        this.renderUI();
    }
    getParentComments(parentId = null) {
        return this.db.filter((comment) => comment.parentId === parentId);
    }
    renderRecursiveComments(parentId = null, fragment) {
        const comments = this.getParentComments(parentId);
        for (let comment of comments) {
            const div = document.createElement('div');
            div.classList.add('commentBox');
            const p = document.createElement('p');
            p.innerText = comment.text;
            const button = document.createElement('button');
            button.innerText = `ReplyTo:${comment.text}`;
            button.addEventListener('click', () => {
                let reply = prompt(`Enter Reply:${comment.text}`);
                this.db.push({ id: Date.now(), text: reply, parentId: comment.id });
                this.renderUI();
            });
            div.appendChild(p);
            div.appendChild(button);
            let recursiveChildFragement = document.createDocumentFragment();
            recursiveChildFragement = this.renderRecursiveComments(comment.id, recursiveChildFragement);
            div.appendChild(recursiveChildFragement);
            fragment.append(div);
        }
        return fragment;
    }
    renderUI() {
        let fragment = document.createDocumentFragment();
        fragment = this.renderRecursiveComments(null, fragment);
        app.innerHTML = '';
        app.appendChild(fragment);
    }

}

new CommentApp();