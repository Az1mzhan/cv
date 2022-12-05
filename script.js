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

//Vue components
const { createApp } = Vue;

createApp({
    data() {
        return {
            id: "cv-container",
            bg: [
                {
                    selector: "cv-container",
                    color: "rgb(35,35,35)",
                },
                {
                    selector: "form-container",
                    color: "'rgb(35,35,35)'",
                },
                {
                    selector: "projects-container",
                    color: "rgb(35,35,35)",
                },
                {
                    selector: "time-manager",
                    color: "rgb(35,35,35)",
                },
            ],
            colorPalette: ["#735cb0", "#00a4ef", '#6ab43e', "#e89d41", "#fd4084"],
            // parameters for Timer function
            intervalStatus: null,
            isLaunched: false,
            time: {
                s: 1,
                m: 0,
                h: 0,
                msg: "00:00:00"
            }
        }
    },
    methods: {
        bg_select()
        {
            let body = document.body;
            for (let val of this.bg)
            {
                if (this.id === val.selector)
                {
                    body.style.backgroundColor = val.color;
                }
            }
        },
        cv_toggle()
        {
            this.id = "cv-container";
            this.bg_select();
        },
        form_toggle()
        {
            this.id = "form-container";
            this.bg_select();
        },
        projects_toggle()
        {
            this.id = "projects-container";
            this.bg_select();
        },
        time_toggle()
        {
            this.id = "time-manager";
            this.bg_select();
        },
        startWatch()
        {
            let obj = this;
            let body = document.body;
            let r = document.querySelector(":root");
            let i = 0;
            let msg, h_msg, m_msg, s_msg;
            const delim = ':';
            obj.intervalStatus = setInterval(() => {
                if (obj.time.s < 10)
                {
                    s_msg = '0' + obj.time.s;
                }
                else
                {
                    s_msg = obj.time.s;
                }
                if (obj.time.m < 10)
                {
                    m_msg = '0' + obj.time.m;
                }
                else
                {
                    m_msg = obj.time.m;
                }
                if (obj.time.h < 10)
                {
                    h_msg = '0' + obj.time.h;
                }
                else
                {
                    h_msg = obj.time.h;
                }
                msg = h_msg + delim + m_msg + delim + s_msg;
                obj.time.msg = msg;
                if (obj.time.s >= 59)
                {
                    obj.time.m++;
                    obj.time.s = 0;
                }
                else
                {
                    obj.time.s++;
                }
                if (obj.time.m >= 59)
                {
                    obj.time.h++;
                    obj.time.m = 0;
                }
                r.style.transition =  "background-color 1s, color 1s, border 1s"
                body.style.transition = "background-color 1s";
                r.style.setProperty('--button-color', obj.colorPalette[i]);
                body.style.backgroundColor = obj.colorPalette[i];
                if (obj.time.s % 15 === 0)
                {
                    if (i > 4)
                    {
                        i = 0;
                    }
                    else
                    {
                        i++;
                    }
                }
            }, 1000)
        },
        stopWatch()
        {
            let obj = this;
            clearInterval(obj.intervalStatus);
        },
    },
    mounted()
    {
        let body = document.body;
        body.style.backgroundColor = "rgb(35,35,35)";
    }
}).mount('#app');
