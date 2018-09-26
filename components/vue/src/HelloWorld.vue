<template>
    <div style="background-color: #F0747F">
        <h2>Vue</h2>
        <ul>
            <li :key="index" v-for="(item, index) in checklist" v-on:click="$emit('delete-item', index)">
                {{ item }}
            </li>
        </ul>
        <button v-on:click="$emit('counter-event')">Click me to decrement by 5</button>
        <p>Counter = {{ countervalue }}</p>
    </div>
</template>
<script>
    export default {
        props: ['countervalue', 'checklistvalue'],
        computed: {
            checklist: function () {
                return JSON.parse(this.checklistvalue || [])
            }
        }
    }

</script>