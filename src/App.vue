<template>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <header>
    <nav aria-label="Primary">
      <router-link to="/" class="nav-button" active-class="active" exact>Pizza Calculator</router-link>
      <router-link to="/bread" class="nav-button" active-class="active">Bread Calculator</router-link>
    </nav>
  </header>
  <main id="main-content" tabindex="-1">
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
header {
  margin-bottom: 20px;
}

nav {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.skip-link {
  position: absolute;
  left: 20px;
  top: 16px;
  transform: translateY(-200%);
  padding: 10px 14px;
  border-radius: 6px;
  background: #ffffff;
  color: #4a2200;
  border: 2px solid #4a2200;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  transform: translateY(0);
}

.skip-link:focus-visible,
.nav-button:focus-visible {
  outline: 3px solid #0f62fe;
  outline-offset: 3px;
}

.nav-button:hover {
  background-color: #ececec;
}

.nav-button {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 8px 16px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  color: #4a2200;
  font-weight: bold;
  text-decoration: none;
}

.nav-button.active {
  background-color: #4a2200;
  color: white;
  border-color: #331800;
}
</style>
