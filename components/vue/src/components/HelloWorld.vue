<template>
    <div style="background-color: #F0747F">
        <h2>Vue</h2>
        <button v-on:click="$emit('custom-event')">Click me to decrement by 5</button>
        <p>Counter = {{ countervalue }}</p>
    </div>
</template>
<script>
    export default {
        props: ['countervalue'],
    }
</script>