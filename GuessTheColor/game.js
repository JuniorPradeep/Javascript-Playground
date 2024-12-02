class GuessTheColor {
    constructor() {

        this.colorInput = document.getElementById('guessed-color');
        this.errorMsg = document.getElementById('errorMsg');
        this.colorBoxContainer = document.getElementById('colorbox');
        //Event Listeners
        this.colorBoxContainer.addEventListener('click', this.GuessChecker.bind(this));
        this.score = document.getElementById('current-score');
        this.bestscore = document.getElementById('best-score');

    }

    GuessChecker(e) {
        if (e.target.classList.contains('color')) {
            const guessedColor = this.colorInput.value;
            if (/^#[0-9A-F]{6}$/i.test(guessedColor)) {

                if (guessedColor === '#' + e.target.dataset.hexcode) {
                    const score = parseInt(this.score.innerText);
                    const bestscore = parseInt(this.bestscore.innerText);
                    this.score.innerText = parseInt(score) + 5;
                    if (score + 5 > bestscore) {
                        this.bestscore.innerText = score + 5;
                    }
                    this.generateRandomColors();

                } else {
                    this.score.innerText = 0;
                    this.errorMsg.innerText = 'Color Not Matched, Game Over';
                    this.errorMsg.style.display = 'block';
                    this.errorMsg.style.color = 'red';
                    setTimeout(function () {
                        this.errorMsg.innerText = 'Restarted';
                        this.errorMsg.style.display = 'block';
                        this.errorMsg.style.color = 'green';
                    }, 1000);
                    setTimeout(function () {
                        this.errorMsg.innerText = '';
                        this.errorMsg.style.display = 'none';
                    }, 4000);
                }

            } else {
                this.errorMsg.innerText = 'Invalid color code';
                this.errorMsg.style.display = 'block';

            }

        }
    }


    generateRandomColors() {

        this.colorBoxContainer.innerHTML = '';
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 3; i++) {
            let colorCode = Math.floor(Math.random() * 16777215).toString(16);
            const element = this.createRandomElement(colorCode);
            element.setAttribute('data-hexcode', colorCode);
            fragment.append(element);
        }
        this.colorBoxContainer.appendChild(fragment);
    }

    createRandomElement(colorCode) {
        const div = document.createElement('div');
        div.classList.add('color');
        div.style.backgroundColor = '#' + colorCode;
        return div;
    }

}

let guessColorGame = new GuessTheColor();
guessColorGame.generateRandomColors();