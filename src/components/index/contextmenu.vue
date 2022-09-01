<script>
export default {
    emits: ['toggel', 'remove_navigator', 'only_cancel_contextmenu'],
    methods: {
        edit(e) {
            this.$emit('toggel');
            this.$emit('only_cancel_contextmenu', e)
        }
    }
}
</script>

<template>
    <ul class="contextmenu" @contextmenu.prevent.stop="">
        <li class="bi bi-pencil-square" @click.stop="edit($event)"> 编辑</li>
        <li class="bi bi-trash3" @click="$emit('remove_navigator')"> 删除</li>
    </ul>
</template>

<style>
ul {
    margin: 0px;
    padding: 0px;
    list-style: none;
}

.contextmenu {
    position: absolute;
    background-color: rgba(30,30,30,0.5);
    backdrop-filter: blur(40px);
    box-shadow: 0px 0px 15px 5px rgba(30,30,30,0.6);
    border-radius: 10px;
    padding: 5px 0px;
    z-index:110;
    text-align: right;
}

.contextmenu>li {
    padding: 12px 25px;
    color: #aaa;
    cursor: pointer;
    font-size: 16px;
    width: auto;
}
.contextmenu>li:hover {
    color: #eee;
}
</style>