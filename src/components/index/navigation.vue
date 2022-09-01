<script>
import Contextmenu from './contextmenu.vue';

export default {
    props: ['is_active', 'navigators', 'nav_index'],
    emits: ['toggel', 'set_navIndex'],
    data() {
        document.body.onclick = this.cancel_contextmenu;
        document.body.oncontextmenu = this.cancel_contextmenu;
        return {
            contextmenu_state: false,
            x: 0,
            y: 0,
        }
    },
    methods: {
        contextmenu(e) {
            this.x = e.clientX;
            this.y = e.clientY;
            this.contextmenu_state = true;
            this.$emit('set_navIndex', e.target.id);
        },
        cancel_contextmenu(e) {
            e.preventDefault();
            this.contextmenu_state = false;
            this.$emit('set_navIndex', -1);
        },
        only_cancel_contextmenu(e) {
            e.preventDefault();
            this.contextmenu_state = false;
        },
        href(url, target='_blank') {
            window.open(url, target);
        },
        remove_navigator(){
            this.navigators.pop(this.navigators);
            const navs = [];
            for (let navigatior of this.navigators){
                navs.push(JSON.stringify(navigatior));
            }
            window.localStorage.setItem('navigators', JSON.stringify(navs));
        }
    },
    components: {
        Contextmenu,
    }
}
</script>

<template>
    <Contextmenu
        v-if="contextmenu_state"
        :style="{top:y+'px', left:x+'px'}"
        @toggel="$emit('toggel')"
        @remove_navigator="remove_navigator"
        @only_cancel_contextmenu="only_cancel_contextmenu"
        @contextmenu.stop="cancel_contextmenu($event, true)" />
    <ul class="navigation col-10 col-lg-6 col-xl-4">
        <div v-for="(navigator, index) in navigators">
            <li class="link"
                :id="index"
                :class="navigator.title"
                :style="{backgroundImage:'url(' + navigator.favicon + ')'}"
                @click="href(navigator.url)"
                @contextmenu.prevent.stop="contextmenu($event)">
            </li>
        </div>
        <div>
            <li class="link add bi bi-plus-lg" title="NewLink" @click="$emit('toggel')" @contextmenu="$emit('toggel')"></li>
        </div>
    </ul>
</template>

<style>
ul {
    margin: 0px;
    padding: 0px;
    list-style: none;
}

.navigation {
    position: relative;
    display: grid;
    padding: 0px;
    gap: 15% 5%;
    grid-template-columns: repeat(auto-fill, minmax(55px, 1fr));
    text-align: center;
    z-index: 1;
    margin: 0px auto;
    margin-top: 40px;
}

.link {
    display: inline-block;
    vertical-align: bottom;
    width: 55px;
    height: 55px;
    border-radius: 50px;
    background-color: rgba(40,40,40,0.3);
    backdrop-filter: blur(20px);
    cursor: pointer;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 26px;
}

.link:hover {
    box-shadow: 0px 0px 5px 0px rgba(40,40,40,0.6);
    backdrop-filter: blur(40px);
}

.link.add {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #aaa;
    font-weight: 900;
    font-size: 30px;
}

.link.add:hover {
    color: #ccc;
}
</style>