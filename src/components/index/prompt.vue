<script>
import {Navigator} from '../../js/navigator';

export default {
    props: ['is_active', 'navigators', 'nav_index'],
    emits: ['toggel', 'set_navIndex'],
    methods: {
        add_navigator(title, url, favicon) {
            const nav = new Navigator(title, url, favicon);
            if (this.nav_index!=-1){
                this.navigators[this.nav_index] = nav
            } else {
                this.navigators.push(nav);
            }
            const navs = [];
            for (let navigatior of this.navigators){
                navs.push(JSON.stringify(navigatior));
            }
            window.localStorage.setItem('navigators', JSON.stringify(navs));
        },
        submit (){
            this.add_navigator(this.title, this.url, this.favicon);
            this.$emit('toggel');
            this.$emit('set_navIndex', -1);
            this.title='';
            this.url='';
            this.favicon='';
        },
        cancel (){
            this.$emit('toggel');
            this.$emit('set_navIndex', -1);
        }
    },
    data() {
        if (this.nav_index==-1){
            return {
                title: '',
                url: '',
                favicon: '',
            }    
        }else{
            return {
                title: this.navigators[this.nav_index].title,
                url: this.navigators[this.nav_index].url,
                favicon: this.navigators[this.nav_index].favicon,
            }    
        }
    }
}
</script>

<template>
    <div class="prompt-module" @click="$emit('toggel')">
        <div class="prompt col-9 col-lg-5 col-xl-3" @click.stop="">
            <input v-model="title" type="text" placeholder="Title">
            <input v-model="url" type="text" placeholder="URL">
            <input v-model="favicon" type="text" placeholder="Favicon">
            <div class="but">
                <button class="comfirm" @click.stop="submit()">Save</button>
                <button class="cancel" @click.stop="cancel()">Cancel</button>
            </div>
        </div>
    </div>
</template>

<style>
input {
    outline: none;
    border: none;
}

button {
    border: none;
}

.prompt-module {
    position: absolute;
    z-index: 100;
    backdrop-filter: blur(15px);
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.prompt {
    position: relative;
    padding: 40px 30px;
    background-color: rgba(30,30,30,0.5);
    backdrop-filter: blur(40px);
    box-shadow: 0px 0px 15px 5px rgba(30,30,30,0.6);
    border-radius: 15px;
}

.prompt>input {
    display: block;
    margin-bottom: 15px;
    height: 40px;
    width: 100%;
    background-color: transparent;
    color: #FFF;
    font-size: 18px;
    border-bottom: 1px solid #FFF;
}

.but {
    display: flex;
    justify-content: center;
    font-size: 22px;
    margin-top: 30px;
}

.but>button {
    flex: 1;
    color: #aaa;
    letter-spacing: 3px;
    font-weight: 700;
    background-color: transparent;
    padding: 5px 0px;
}

.but>button:hover {
    color: #FFF;
}
</style>