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

//Vue component
const { createApp } = Vue;

createApp({
    data() {
        return {
            id: "cv-container",
            // body backgroundColor select parameters
            bg: [
                {
                    selector: "cv-container",
                    color: "rgb(35,35,35)",
                },
                {
                    selector: "form-container",
                    color: "rgb(35,35,35)",
                },
                {
                    selector: "projects-container",
                    color: "rgb(35,35,35)",
                },
                {
                    selector: "time-manager",
                    color: "rgb(35,35,35)",
                },
                {
                    selector: "audio-manager",
                    color: "rgb(35,35,35)",
                },
            ],
            colorPalette: ["#735cb0", "#00a4ef", '#6ab43e', "#e89d41", "#fd4084"],
            // carousel3d parameters
            carousel3d:
                {
                    it: 0,
                    items:
                        [
                            {
                                id: "trello-card",
                                myTranslate: 0,
                                translateX: [27.375, 27.375, -54.75],
                                scale: [1.35, 1, 1],
                                z_index: [2, 3, 1],
                            },
                            {
                                id: "timer-card",
                                myTranslate: 0,
                                translateX: [27.375, -54.75, 27.375],
                                scale: [1, 1, 1.35],
                                z_index: [3, 1, 2],
                            },
                            {
                                id: "audio-manager-card",
                                myTranslate: 0,
                                translateX: [-54.75, 27.375, 27.375],
                                scale: [1, 1.35, 1],
                                z_index: [1, 2, 3],
                            },
                        ],
                },
            // parameters for Timer function
            intervalStatus: null,
            isLaunched: false,
            isHover: false,
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
        audio_toggle()
        {
            this.id = "audio-manager";
            this.bg_select();
        },
        startWatch()
        {
            let obj = this;
            let body = document.body;
            let t_btn = document.getElementsByClassName("timer-button");
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
                body.style.transition = "background-color 1s";
                for (let j = 0; j < 2; j++)
                {
                    //t_btn[j].style.transition =  "background-color 1s, color 1s, border 1s";
                    t_btn[j].style.backgroundColor = obj.colorPalette[i];
                    if (obj.isHover === false)
                    {
                        t_btn[j].style.borderColor = "aliceblue"
                        t_btn[j].style.color = "aliceblue";
                        t_btn[j].style.backgroundColor = obj.colorPalette[i];
                    }
                    else
                    {
                        t_btn[j].style.borderColor = obj.colorPalette[i]
                        t_btn[j].style.color = obj.colorPalette[i];
                        t_btn[j].style.backgroundColor = "aliceblue";
                    }
                }
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
        carousel3d_prev()
        {
            /*let item = document.getElementsByClassName("card");
            for (let i = 0; i < item.length; i++)
            {
                this.carousel3d.items[i].myTranslate -= this.carousel3d.items[i].translateX[2 - this.carousel3d.it];
                item[i].style.zIndex = this.carousel3d.items[i].z_index[this.carousel3d.it];
                item[i].style.transform = "translateX(" + this.carousel3d.items[i].myTranslate + "vw) scale(" + this.carousel3d.items[i].scale[this.carousel3d.it] + ")";
            }*/
        },
        carousel3d_next()
        {
            let item = document.getElementsByClassName("card");
            for (let i = 0; i < item.length; i++)
            {
                this.carousel3d.items[i].myTranslate += this.carousel3d.items[i].translateX[this.carousel3d.it];
                item[i].style.zIndex = this.carousel3d.items[i].z_index[this.carousel3d.it];
                item[i].style.transform = "translateX(" + this.carousel3d.items[i].myTranslate + "vw) scale(" + this.carousel3d.items[i].scale[this.carousel3d.it] + ")";
            }
            console.log(this.carousel3d.it);
            if (this.carousel3d.it === 2)
            {
                this.carousel3d.it = 0;
            }
            else
            {
                ++this.carousel3d.it;
            }
        },
        audioPlay()
        {
            let sound = new Howl({
                src: ['./audio/Frank_Sinatra_-_Let_It_Snow_Let_It_Snow_Let_It_Snow.mp3'],
                html5: true
            });

            sound.play();
        }
    },
    mounted()
    {
        let body = document.body;
        body.style.backgroundColor = "rgb(35,35,35)";
    }
}).mount('#app');
