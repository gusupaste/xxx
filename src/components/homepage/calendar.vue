<template>
    <vue-event-calendar :events="demoEvents"></vue-event-calendar>
</template>
<script>
export default {
    data(){
        return {
            demoEvents: [{
                date: '2016/12/15',
                title: 'eat',
                desc: 'longlonglong description'
            },{
                date: '2016/11/12',
                title: 'this is a title'
            }],
        }
    }
}
</script>