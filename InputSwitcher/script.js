const inputs = document.querySelectorAll('input');
let lastfocused = null;
inputs.forEach((input) => {
    input.addEventListener('keyup', (e) => {
        if (isNaN(input.value) || input.value === '') {
            input.value = ''
        } else {
            if (input.nextElementSibling) {
                lastfocused = input.nextElementSibling;
                input.nextElementSibling.focus()
            }

        }
    });
});

document.addEventListener("keydown", KeyCheck);
function KeyCheck(event) {
    if (lastfocused === null) {
        return;
    }
    console.log(lastfocused.value);
    var KeyID = event.keyCode;
    switch (KeyID) {
        case 8:
            if (lastfocused.value === '' && lastfocused.previousElementSibling) {
                lastfocused.previousElementSibling.focus();
                lastfocused = lastfocused.previousElementSibling;
            }
            break;
        case 46:
            if (lastfocused.value !== '') {
                lastfocused.value = '';
            } else {
                if (lastfocused.previousElementSibling) {
                    lastfocused.previousElementSibling.value = '';
                    lastfocused.previousElementSibling.focus();
                    lastfocused = lastfocused.previousElementSibling;
                }

            }

            break;
        default:
            break;
    }
}