//form submit function
let formSubmit = () => {
    let arr = [
        ['#user', '#password', '#name', '#surname', '#bday', '#email'],
        []
    ];
    let form, str, id;
    for (let j = 0; j < 6; j++)
    {
        form = document.querySelector(arr[0][j]).value;
        arr[1][j] = form;
    }
    for (let j = 0; j < 6; j++)
    {
        id = arr[0][j].replace('#', '');
        str = id + ": " + arr[1][j];
        alert(str);
    }
}

//preloader script
/*let preloader = document.querySelector('.preloader');
const fadeOutEffect = setInterval(() => {
    if (!preloader.style.opacity) {
        preloader.style.opacity = 1;
    }
    if (preloader.style.opacity > 0) {
        preloader.style.opacity -= 0.1;
    } else {
        clearInterval(fadeEffect);
    }
}, 300);*/

//Vue components
const { createApp } = Vue;

createApp({
    data() {
        return {
            id: 0
        }
    },
    methods: {
        mainToggle()
        {
            this.id = 0
        },
        sideToggle()
        {
            this.id = 1
        },

    }
}).mount('#app')
