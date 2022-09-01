<script>
import Logos from './logos.vue';

export default {
    data(){
        return {
            engine: this.get_engine(),
            input_name: 'q',
            key_word: '',
            is_active: false,
        }
    },
    methods: {
        toggel() {
            this.is_active = this.is_active ? false : true;
        },
        engine_toggel(engine) {
            this.engine = engine;
            this.toggel();
        },
        get_engine() {
            const engine = window.localStorage.getItem('engine');
            return engine?engine:'bing';
        },
        set_engine(engine='bing') {
            window.localStorage.setItem('engine', engine);
        }
    },
    computed: {
        engineURL() {
            switch (this.engine) {
                case 'baidu':
                    this.input_name = 'wd'
                    this.set_engine('baidu');
                    return 'https://www.baidu.com/s';
                case 'google':
                    this.input_name = 'q'
                    this.set_engine('google');
                    return 'https://www.google.com/search';
                case 'bing':
                    this.input_name = 'q'
                    this.set_engine('bing');
                    return 'https://cn.bing.com/search';
            }
        }
    },
    components: {
        Logos
    }
}
</script>

<template>
    <div class="blur-bg" :class="{'is_active': is_active}" @click="toggel()"></div>
    <div class="row justify-content-center">
        <form class="search col-10 col-lg-6 col-xl-4" :action="engineURL" method="get" target="_blank">
            <span class="engine">
                <Logos class="engine-logo" :class="{'is_active': is_active}" :logo="engine" @click="toggel()" />
                <ul class="engines" :class="{'is_active': is_active}">
                    <li>
                        <Logos class="engine-logo" logo="bing" @click="engine_toggel('bing')"/>
                    </li>
                    <li>
                        <Logos class="engine-logo" logo="baidu" @click="engine_toggel('baidu')"/>
                    </li>
                    <li>
                        <Logos class="engine-logo" logo="google" @click="engine_toggel('google')"/>
                    </li>
                </ul>
            </span>
            <button class="search-ico bi bi-search"></button>
            <input v-model="key_word" :name="input_name" type="search" autocomplete="off" autofocus>
        </form>
    </div>
</template>

<style scoped>
input {
    outline: none;
    border: none;
}

button {
    border: none;
}

ul {
    margin: 0px;
    padding: 0px;
    list-style: none;
    background-color: rgba(40,40,40,0.3);
    backdrop-filter: blur(20px);
}

.row {
    margin: 0px;
    padding-top: 160px;
}

.blur-bg {
    width: 100vw;
    height: 100vh;
    position: absolute;
    z-index: 98;
    transition: backdrop-filter 0.3s 0s;
    pointer-events: none;
}

.blur-bg.is_active {
    backdrop-filter: blur(15px);
    pointer-events: all;
}

.search {
    position: relative;
    height: 50px;
    padding: 0px 12px;
    border-radius: 50px 50px;
    background-color: rgba(40,40,40,0.3);
    backdrop-filter: blur(20px);
    display: flex;
    align-items: center;
    z-index: 99;
}

.engine {
    height: 100%;
    margin-right: 4px;
    padding: 7px 0px;
}

.engines {
    position: absolute;
    left: 6px;
    top: 55px;
    border-radius: 50px;
    box-shadow: 0px 0px 8px 2px rgba(40,40,40,0.6);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s 0s;
}

.engines.is_active {
    opacity: 1;
    pointer-events: all;
}

.engines>li {
    height: 50px;
    padding: 10px;
}

.engine-logo {
    padding: 5px;
    cursor: pointer;
    border-radius: 50%;
}

.engine-logo:hover, .is_active {
    box-shadow: 0px 0px 8px 2px rgba(40,40,40,0.5);
    backdrop-filter: blur(40px);
}

.search-ico {
    background-color: transparent;
    font-size: 20px;
    color: #aaa;
    font-weight: 700;
    cursor: pointer;
}

.search-ico:hover {
    color: #ccc;
}

.search>input {
    height: 100%;
    background-color: transparent;
    color: #FFF;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 2px;
    padding: 0px 10px;
    flex: 1;
}

.search>input::selection {
    background-color: rgba(180, 180, 180, 0.5);
}
</style>