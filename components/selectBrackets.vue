<template>
    <div class="wrapper" aria-hidden="true">
        <div class="select">
            <span class="corner"></span>
            <span class="corner"></span>
            <span class="corner"></span>
            <span class="corner"></span>
        </div>
        <div class="mask"></div>
    </div>
</template>

<!-- :: TODO : add input for size !!! -->
<!-- Maybe use it as parent component with slot, and border 1px transparent on slot -->
<!-- so no need to set padding=1px on the parent component each time  -->
<!-- <brackets>  -->
<!--    <slot>   -->
<!--    <mask>   -->
<!-- </brackets> -->
<!-- + finer detail on hover transitions if needed -->
<style scoped lang="scss">
.wrapper {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    transform: scale(1.05);
    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-delay: 0.025s;
    // animation: breathe .5s 1s infinite alternate cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.mask {
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    background-color: #eee;
    background-color: #dedede;
}

.select {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: 24px 24px;
    grid-template-rows: 24px 24px;
    gap: calc(100% - (24px * 2));
    background-color: #ccc;
}

span {
    display: block;
    width: 24px;
    height: 24px;
    background-color: #000;
}

// @keyframes breathe {
//     from {
//         transform: scale(1)
//     }

//     to {
//         transform: scale(1.035);
//     }
// }
</style>