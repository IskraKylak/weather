<template>
  <div class="container">
    <nav>
      <router-link to="/">Main</router-link>
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
  padding: desktop-vw(50) 0;
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
    font-size: desktop-vw(16);

    &.hidden-xs {
      visibility: hidden;
      opacity: 0;
    }
}

nav {
  display: flex;
  justify-content: flex-start;
  position: relative;
  margin-bottom: desktop-vw(20);

  &:after {
    content: "";
    display: block;
    background: #2c3e50;
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    height: desktop-vw(40);
    width: desktop-vw(100);
    border: 1px solid #2c3e50;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    background: #fff;
    font-size: desktop-vw(16);

    &:nth-child(2) {
      margin-left: -1px;
    }

    &.router-link-exact-active {
      background: #0a69d4;
      color: #fff;
    }
  }
}

@media screen and (max-width: $mobile) {
    #app {
      padding: mobile-vw(50) 0;
    }

    #message {
        padding: mobile-vw(20);
        top: 20vh;
        right: mobile-vw(20);
        font-size: mobile-vw(16);
    }

    nav {
      margin-bottom: mobile-vw(20);

      a {
        height: mobile-vw(40);
        width: mobile-vw(100);
        font-size: mobile-vw(16);
      }
    }
}
</style>
