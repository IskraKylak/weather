<template>
  <div class="container">
    <nav>
      <router-link to="/">Main</router-link> |
      <router-link to="/favorites">Favorites</router-link>
    </nav>
    <router-view/>
    <div id="message" class="hidden-xs"></div>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#message {
    padding: desktop-vw(20);
    position: fixed;
    top: 40vh;
    right: 10vh;
    background: #0a69d4;
    z-index: 100;
    color: #fff;
    visibility: visible;
    opacity: 1;
    transition: all 0.3s ease;
    border-radius: 5px;

    &.hidden-xs {
      visibility: hidden;
      opacity: 0;
    }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
