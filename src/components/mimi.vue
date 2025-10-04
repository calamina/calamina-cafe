<script setup lang='ts'>

</script>

<template>
  <div>
    <pre>
 |\_|\   .
( ᵔ.ᵔ )  )
 > ~ &lt;  /
/  #  \(
\_Y—Y_/—°
</pre>
    <pre>
 /\_/\  .
( ᵔ.ᵔ ) |
 > ~ &lt;  |
/  #  \ |
\_Y—Y_/—°
</pre>
    <pre>
 /|_/| .
( ᵔ.ᵔ )(
 > ~ &lt;  \
/  #  \  )
\_Y—Y_/—°
</pre>
  </div>
</template>

<style scoped>
div {
  position: relative;
  height: 6rem;
}

pre {
  visibility: hidden;
  font-size: 1rem;
  color: var(--color-light);
  line-height: 1rem;
  position: absolute;
  animation: 1s cat infinite;

  &:first-of-type {
    animation: 1s catstart infinite;
  }

  &:last-of-type {
    animation: 1s catend infinite;
  }
}

/* @keyframes catstart {
  0% {
    visibility: visible;
  }
  49% {
    visibility: visible;
  }
  50% {
    visibility: hidden;
  }
}
@keyframes catend {
  0% {
    visibility: hidden;
  }
  49% {
    visibility: hidden;
  }
  50% {
    visibility: visible;
  }
} */
@keyframes catstart {
  0% {
    visibility: visible;
  }

  34% {
    visibility: visible;
  }

  35% {
    visibility: hidden;
  }
}

@keyframes cat {
  34% {
    visibility: hidden;
  }

  35% {
    visibility: visible;
  }

  49% {
    visibility: visible;
  }

  50% {
    visibility: hidden;
  }

  84% {
    visibility: hidden;
  }

  85% {
    visibility: visible;
  }

  99% {
    visibility: visible;
  }

  100% {
    visibility: visible;
  }
}

@keyframes catend {
  0% {
    visibility: hidden;
  }

  49% {
    visibility: hidden;
  }

  50% {
    visibility: visible;
  }

  84% {
    visibility: visible;
  }

  85% {
    visibility: hidden;
  }
}
</style>