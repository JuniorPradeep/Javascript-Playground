const input = document.getElementById('inputdata');
const ulContainer = document.getElementById('dropdown');

class Node {

    constructor() {
        this.keymap = {}
        this.eow = false;
    }

}

class TrieNode {

    constructor() {
        this.root = new Node();
    }

    insertNode(word) {
        let node = this.root;
        for (let char of word) {
            if (!Object.hasOwnProperty.call(node.keymap, char)) {
                node.keymap[char] = new Node();
            }
            node = node.keymap[char];
        }
        node.eow = true;
    }

    searchKeyword(word, fragment) {

        let node = this.root;
        let searchedWord = '';
        for (let char of word) {
            if (Object.hasOwnProperty.call(node.keymap, char)) {
                node = node.keymap[char];
            } else {
                this.createSearchElement("No Result Found", fragment);
                return fragment;
            }
            searchedWord = searchedWord + char;

        }
        this.collectWords(node, searchedWord, fragment);

        return fragment;
    }

    collectWords(node, prefix, fragment) {
        if (node.eow === true) {
            this.createSearchElement(prefix, fragment);
        }
        for (const char in node.keymap) {
            this.collectWords(node.keymap[char], prefix + char, fragment);
        }
    }

    createSearchElement(searchedWord, fragment) {
        let li = document.createElement('li');
        li.innerText = searchedWord;
        fragment.append(li);
    }

    handleSearch() {
        console.log("df");
        let fragment = document.createDocumentFragment();
        fragment = typeAhead.searchKeyword(input.value, fragment);
        ulContainer.innerHTML = '';
        ulContainer.appendChild(fragment);
    }

}

/* Handling rate of function execution   */
const debounce = (cb, delay) => {
    let timeId;

    return function (...args) {
        if (timeId) {
            clearTimeout(timeId);
            timeId = null;
        }
        timeId = setTimeout((e) => {
            cb(...args)
        }, delay);
    }
}



let data = ["pradeep", "prad", "rahul", "ravi", "vijay", "vinod", "rds", "rdsd", "rdsdsds"]
const typeAhead = new TrieNode();

data.forEach(word => typeAhead.insertNode(word))

let debounceSearch = debounce(typeAhead.handleSearch.bind(typeAhead), 5000);

input.addEventListener('keyup', debounceSearch);

